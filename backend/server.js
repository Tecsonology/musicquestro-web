
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt');


require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json())



const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const UserSchema = new mongoose.Schema({ 
    id: { type: Number, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    userids: { type: String,},
    musicCoins: { type: Number }, 
    life: { type: Number},
    totalPoints: { type: Number },
    maps: { type: Object, default: {} },
    collection: { type: Object, default: {}}

});

const User = mongoose.model('User', UserSchema);

app.post('/createUser', async (req, res) => {
    
    const { id, username, password, userids, musicCoins, life, totalPoints, maps } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ id, username, password: hashedPassword, userids, musicCoins, life, totalPoints, maps});

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});


app.get('/getUserCount', async (req, res)=> {
    try{
        const count = await User.countDocuments()
        res.status(200).json({count})
    } catch(error){
        console.log(error)
        res.status(500).json({error: 'count error'})
    }

})


app.post('/auth', async (req, res)=> {
    const { username, password } = req.body;

    try{
        
        const checkUser = await User.findOne({username});

        if(!checkUser){
            return res.status(401).json({message: 'Invalid username or password'})
        }

        const isMatch = await bcrypt.compare(password, checkUser.password)

        if(!isMatch){
            return res.status(401).json({message: 'Invalid username or password'})
        }

        const userWithoutPassword = checkUser.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({message: 'Login successfull', userWithoutPassword})

    } catch(error){
        console.log(error)
    }
})

app.post('/authCheck', async (req, res)=> {
    const { userids } = req.body;


        const checkUser = await User.findOne({userids: userids})

        if(checkUser){
            console.log('getting existing account...')
            res.status(401).json({message: `User is existing${userids}`})
        } else {
            console.log("user not existing...")
            res.status(200).json({message: `User not existing ${userids}`})
        }

})

app.get('/player', async (req, res) => {
    const { userids } = req.query;
    if (!userids) {
        return res.status(400).json({ message: 'Missing userids' });
    }
    const user = await User.findOne({ userids }); 
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
});


app.get('/api/player/maps', async ( req, res )=> {
    const { userids } = req.query

    const user = await User.findOne({userids: userids})
    console.log('Result', user)
    res.json(user.maps)
})


app.put('/api/update-user', async ( req, res)=> {

    const { userids, updates } = req.body

    try {

        const updateUser = await User.updateOne({userids: userids},
            { $set: updates }
        )   

        if(!updateUser){
            res.status(404).json({message: 'User not found'})
        }

        res.json(updateUser)

    } catch(err){
        res.status(505).json({message: "ssss",})
    }
})

app.get('/api/get/leaderboards', async (req, res)=> {

    try {

        const players = await User.find({}, { username: 1, totalPoints: 1, _id: 0})

        res.json(players)
        

    } catch(err){
        res.status(505).json({messsage: 'Error accessing leaderboards'})
    }
})

app.put('/api/update-user-from-shop', async (req, res)=> {

    const { userids, coinsDeduct, newItem } = req.body
    
    try {

        const checkUser = await User.findOne({userids})

        if(checkUser.musicCoins > coinsDeduct){
            const updateUser = await User.findOneAndUpdate({userids: userids},
            {
                $inc: { musicCoins: - coinsDeduct},
                $push: { collection: newItem}
            },

            { new: true}
            )

            if(!updateUser){
                res.status(404).json({message: 'Error'})
            }

            res.status(200).json(updateUser)
        } else {
            res.status(200).json({message: 'Not enough coinds'})
        }

    } catch(err){
        res.status(404).json({message: 'Error updating user from shop'})
    }
})


app.put('/api/user-add-life', async ( req, res)=> {

    const { userids, lifeAdded, coinDeduct } = req.body

    try{


        const checkUser = await User.findOne({userids})

        if(checkUser.musicCoins < coinDeduct){
            res.send('dsadsa');
        } else {
            const user = await User.findOneAndUpdate({userids: userids}, 
            {
                $inc: { life: + lifeAdded, musicCoins: - coinDeduct},
            
            },

            { new: true}

            )
            res.status(200).json(user)
        }

        

    } catch(err){
        res.status(500).json({message: ' Error'})
    }

})

app.put('/api/user-deduct-life', async ( req, res)=> {

    const { userids, lifeDeduct } = req.body

    try{

        const checkUser = await User.findOne({userids})

        if(checkUser.life >= lifeDeduct){
            const user = await User.findOneAndUpdate({userids: userids}, 
                {
                    $inc: { life: - lifeDeduct},
                
                },

                { new: true}

            )
            res.status(200).json(user)
        } else {
            res.status(300).json({message: 'insufficient Life'})
        }

        

    } catch(err){
        res.status(400).json({message: ' Error'})
    }

})


app.get('/api/get-user-collection', async ( req, res)=> {

    const { userids } = req.query

    try {

        const user = await User.findOne({userids: userids})

        console.log(user)

        res.json(user.collection)

    } catch(err){
        res.status(400).json({message: `Error getting user's collection`})
    }
})

app.get('/api/check-collection', async ( req, res)=> {

    const { userids, item } = req.query

    try {

        const checkItem = await User.findOne({userids: userids}, {collection: item })

        res.json(checkItem)


    } catch(err){
        res.status(500).json({message: 'Error checking collection'})
    }

})


