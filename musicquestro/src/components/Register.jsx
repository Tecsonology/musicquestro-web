import React, { useState, } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SetupAccount from './SetupAccount'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;


function Register() {

    const navigate = useNavigate()
    const [ username, setName ] = useState()
    const [ password, setPassword ] = useState()
    const [ disabled, setDisabled ] = useState(false)
    const [ success, setSuccess ] = useState(false)


    const getUser = async (userids) => {
            try {
                const response = await axios.get(`${VITE_NETWORK_HOST}/player`, {
                    params: { userids }
                });
                const user = response.data;
                localStorage.setItem("userLogged", JSON.stringify(user.userWithoutPassword))
                localStorage.setItem("token", response.data.token)

                setSuccess(true)
                navigate('/set-up-account')


            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

     const handleSubmit = async (e) => {
        const idRandomizer = []
        for(let x = 0; x < 20; x++){
            idRandomizer.push(Math.floor(Math.random()*10))
        }

        const userids = idRandomizer.join('').toString()
        let id = 555
        let musicCoins = 1000
        let totalPoints = 0
        let life = 5
          let maps = {
            rhythm: {
                isLocked: 'false',
                levels: [1]
            }, 
            melody: {isLocked: 'true',
                levels: [1]
            },
            harmony: {isLocked: 'true',
                levels: [1]
            },
            pitch: {isLocked: 'true',
                levels: [1]
            },
            
        }
        let currentInstrument = 'sine'
        let avatar = 'https://i.ibb.co/8455cZ4G/Untitled-design-59.png'
        
        try {
            const response = await axios.post(`${VITE_NETWORK_HOST}/createUser`, 
                { 
                    id, 
                    username, 
                    password,
                    userids,
                    musicCoins,
                    life,
                    totalPoints,
                    maps,
                    currentInstrument,
                    avatar,

                });

                if(response){
                    setDisabled(true)
                    await getUser(userids)
                  
                }

                console.log('User created successfully:', response.data);
                setSuccess(true); 
           
        } catch (error) {
            alert('Failed to add user. Please try again.', error);
            console.error('Failed to add user:', error);
        }
    };3


  return (
    <div style={{margin: '1em 0'}} className="register flex fdc jc-c aic">
        {
            !success && !success ?
            <>
                 <input
                        type="text"
                
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Create your username"
                        required
                    />

                    <input type="password" name="password" id="txtPass" 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Create a password'
                        required
                    />
                 
                    <button id='btnRegister' disabled={disabled} onClick={handleSubmit}>Register</button>


                    <p>Already have an account? <Link to={'/login'} style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                        }}>Click here</Link></p>
            </> : <Outlet />
        }
                         
    </div>
                   
  )
}

export default Register
