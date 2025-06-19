import React, { Children, useEffect } from 'react'
import { token } from '../Token'
import { useNavigate } from 'react-router-dom'

function ProtectedComponent(props) {

    const navigate = useNavigate()

  

    const handleGoToLogin =()=> {
        navigate('/')
    }

  return (
    <div>
       { token ?  
        <div>
            {props.children}
        </div> :
        
        <div>
            <h1>MusicQuesto</h1>
            <p>You must login first</p>
            <button onClick={handleGoToLogin}>Go to Login</button>
        </div>
        
        }
    </div>
  )
}

export default ProtectedComponent
