import React, { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { use } from 'react';
import App from '../App';
import '../styles/Log.css'
import GoogleLoginButton, { userids } from './GoogleLoginButton';
import BackgroundMusic from '../BackgroundMusic';
import { token } from '../Token.js'
import { UserContext } from './CurrentUserContext.jsx';

function Login() {

    const navigate = useNavigate();
    const  userName  = React.useContext(UserContext)
    const [ username, setName ] = useState()
    const [ password, setPassword ] = useState();
    const [ id, setId ] = useState(455);
    const [ ready, setReady ] = useState(false)
    const [ log, setLog ] = useState(true);
    const [ error, setError ] = useState(false)
    const [ disabled, setDisabled ] = useState(false)


 
        useEffect(()=> {
        const getCount = async()=> {
            try{
                const response = await axios.get('http://localhost:5000/getUserCount')

            if(response){
                setReady(true)
            }

            let num = response.data.count
           
            setId(id + num+1)


            } catch(error){
                console.log(error)
            }
        }
        getCount()
         }, [])

         useEffect(()=> {
            if(token){
                navigate('/h')
            }
         }, [])


         const getUser = async (userids) => {
            try {
                const response = await axios.get('http://localhost:5000/player', {
                    params: { userids }
                });
                const user = response.data;
                console.log(user.token)
                localStorage.setItem("userLogged", JSON.stringify(user.userWithoutPassword))
                localStorage.setItem("token", response.data.token)

                console.log(localStorage.getItem('userLogged'))

                window.location.href = '/h'


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
            rhythm: {isLocked: 'false'}, 
            melody: {isLocked: 'true'},
            harmony: {isLocked: 'true'},
            pitch: {isLocked: 'true'},
            
        }
        let currentInstrument = 'sine'
        
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createUser', 
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

                });
            

                if(response){
                    setDisabled(true)
                    await getUser(userids)

                    console.log('dsadasdasd')

                  
                }
           
        } catch (error) {
            alert('Failed to add item');
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault()

            const postData = async () => {
            try {
                const response = await axios.post(
                'http://localhost:5000/auth',
                { username: username, password: password },
                {
                    headers: {
                    Authorization: `Bearer`,
                    },
                },
                {
                    withCredentials: true
                }
                );
                const user = response.data.userWithoutPassword;
                console.log(response.data.token)

                localStorage.setItem('token', response.data.token)
                localStorage.setItem("userLogged", JSON.stringify(user))


                window.location.href = '/h'
            } catch (error) {
                setError(true)
                console.error('Unauthorized:', error.response?.data || error.message);

                setInterval(removeErrorMessage, 5000)
            }
           
            };

            postData();

    }

    

    const removeErrorMessage =()=> {
        setError(false)
    }

    

  return (
    <div className='log fpage flex jc-c fdc'>
        
          {
            ready ? (
                <div className='flex fdc jc-c aic'>
                    <h1>{userName}</h1>
                    <img className='main-logo' src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
                     
                    {log ? (<div className="login flex fdc jc-c aic">
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                        required
                        />

                        <input type="password" name="password"  
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />

                         { error && error ? <p className='errorM'>Invalid username or password</p> : null}
                      
                        <button disabled={!ready} onClick={handleLogin}>Login</button>

                        <div id='or'>
                            <hr />
                            <p>or</p>
                            <hr />
                        </div>
                       <GoogleLoginButton /> 
                        <p>Need an account? <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(false)
                        }}>Click here</span></p>
                    </div>):(
                        <div className="register flex fdc jc-c aic">
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Create your username"
                        required
                    />

                    <input type="password" name="password" id="txtPass" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Create a password'
                        required
                    />
                 
                    <button id='btnRegister' disabled={disabled} onClick={handleSubmit}>Register</button>
                    <p>Already have an account? <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(true)
                        }}>Click here</span></p>
                    </div>
                    )}
                </div>
            ) : (
                <div className='flex aic jc-c fdc'>
                    <h1>Loading...</h1>
                    <p style={{color: 'white', textAlign: 'center'}}>Please wait, we are taking you to the world of MusicQuestro...</p>
                </div>
            )
          }
    </div>
  )
}

export default Login
