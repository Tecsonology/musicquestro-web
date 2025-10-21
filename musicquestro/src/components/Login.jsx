import { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Log.css'
import { token } from '../Token.js'
import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton.jsx'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;


function Login() {

    const navigate = useNavigate();
    const [ username, setName ] = useState()
    const [ password, setPassword ] = useState();
    const [ log, setLog ] = useState(true);
    const [ error, setError ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)



    useEffect(()=> {

        if(username && username.length >= 0 && password && password.length >=0){
            setDisabled(false)
        } else {
            setDisabled(true)
        }

        if(token){
            window.location.href = '/h'
         }
    }, [username, password])    

    const handleLogin = async (e) => {
        const btn = e.currentTarget
        btn.disabled = true
        btn.innerHTML = 'Loading... Please wait'
        e.preventDefault()

            const postData = async () => {
            try {
                const response = await axios.post(
                `${VITE_NETWORK_HOST}/auth`,
                { username: username, password: password },
                { withCredentials: true}
                 
            
                );
                const user = response.data.userWithoutPassword;
                console.log(user.avatar)

                localStorage.setItem('token', response.data.token)
                localStorage.setItem("userLogged", JSON.stringify(user))
                localStorage.setItem("avatar", user.avatar)


                navigate('/h')
            } catch (error) {
                setError(true)
                console.error('Unauthorized:', error.response?.data || error.message);
                btn.disabled = false
                btn.innerHTML = 'Login'
                setInterval(removeErrorMessage, 5000)
            }
           
            };

            postData();

    }

    
    const removeErrorMessage =()=> {
        setError(false)
    }

  return (
    <div className='glass-bg flex jc-c fdc'>
        <div className='flex fdc jc-c aic'>
            
                <h2>LOGIN</h2>
               <div className="login flex fdc jc-c aic">
                        <input
                        type="text"
                        maxLength={20}
                        name="username"
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

                         { error && error ? <p style={{textAlign: 'center'}} className='errorM'>Invalid username or password</p> : null}
                      
                        <button disabled={disabled} onClick={(e) => handleLogin(e)}>
                            Login
                        </button>

                       
                      {/**<GoogleLoginButton /> */}
                        <p style={{color: 'white'}}>Need an account? <Link to={'/register'} style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=> {
                            setLog(false)
                        }}>Click here</Link></p>
                    </div>
                </div>
    </div>
  )
}

export default Login
