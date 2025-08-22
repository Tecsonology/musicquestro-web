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
import { Link } from 'react-router-dom';
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';
console.log("Network Host:", VITE_NETWORK_HOST);    

function Login() {

    const navigate = useNavigate();
    const [ username, setName ] = useState()
    const [ password, setPassword ] = useState();
    const [ id, setId ] = useState(455);
    const [ ready, setReady ] = useState(false)
    const [ log, setLog ] = useState(true);
    const [ error, setError ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)



    useEffect(()=> {

        if(username && username.length >= 0){
            setDisabled(false)
        } else {
            setDisabled(true)
        }


        if(token){
            navigate('/h')
         }
    }, [username])    

    const handleLogin = async (e) => {
        e.preventDefault()

            const postData = async () => {
            try {
                const response = await axios.post(
                `${VITE_NETWORK_HOST}/auth`,
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
    <div className='flex jc-c fdc'>
        <div className='flex fdc jc-c aic'>
                 
                     
               <div className="login flex fdc jc-c aic">
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
                      
                        <button disabled={disabled} onClick={handleLogin}>Login</button>

                        <div id='or'>
                            <hr />
                            <p>or</p>
                            <hr />
                        </div>
                      { /** <GoogleLoginButton />  */}
                        <p>Need an account? <Link to={'/register'} style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(false)
                        }}>Click here</Link></p>
                    </div>
                </div>
    </div>
  )
}

export default Login
