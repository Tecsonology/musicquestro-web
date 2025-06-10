import React, { useEffect, useState,} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { use } from 'react';
import App from '../App';

function Login() {

    const navigate = useNavigate();

    const [ username, setName ] = useState()
    const [ password, setPassword ] = useState();
    const [ id, setId ] = useState(12000);
    const [ ready, setReady ] = useState(false)
    const [ log, setLog ] = useState(true);
    const [ error, setError ] = useState(false)


 
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
    

  const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createUser', { id, username, password});
            alert(response.data.message);
           
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
                }
                );
                const user = response.data.userWithoutPassword;
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
        <img className='main-logo' src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
          {
            ready ? (
                <div>
                      { error && error ? <p className='errorM'>Invalid username or password</p> : null}
                    {log ? (<div className="login flex fdc jc-c">
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
                      
                        <button disabled={!ready} onClick={handleLogin}>Login</button>
                        <p>Need an account? <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(false)
                        }}>Click here</span></p>
                    </div>):(
                        <div className="register flex fdc jc-c">
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
                    <button disabled={!ready} onClick={handleSubmit}>Register</button>
                    <p>Already have an account? <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(true)
                        }}>Click here</span></p>
                    </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
          }
    </div>
  )
}

export default Login
