import React, { Children, useEffect, useState, useContext } from 'react'
import { token } from '../Token'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './CurrentUserContext'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;


function ProtectedComponent(props) {

    const navigate = useNavigate()
    const [ isProtected, setIsProtected ] = useState(false)


    const handleGoToLogin =()=> {
      localStorage.clear()
      window.location.href = '/'
        
    }

    useEffect(() => {
      const token = localStorage.getItem('token');
      const verifyUser = async () => {
        try {
          const res = await axios.post(`${VITE_NETWORK_HOST}/authenticateToken`, { token });
          
          setIsProtected(true);
        } catch (err) {
          console.log("Token invalid or expired", err.response?.data);
      
          setIsProtected(false); // optional fallback
        }
      };

      if (token) {
        verifyUser();
      } else {
        console.log("No token found");
        setIsProtected(false); // optional fallback
      }
    }, []);


  

  return (
    <div>
       { isProtected && isProtected ?  
        <div>
            {props.children}
        </div> :
        
        <div className='fpage flex fdc aic jc-c'>
            <h1>Loading...</h1>
            <p>If it is too long, please log out and try again.</p>
            <button onClick={handleGoToLogin}>Go to Login</button>
            <button onClick={()=> {setIsProtected(true)}}>Play Offline</button>
        </div>
        
        }
    </div>
  )
}

export default ProtectedComponent
