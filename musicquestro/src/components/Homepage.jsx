import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { token } from '../Token'
import ProtectedComponent from './ProtectedComponent'

function Homepage() {

    useEffect(()=> {
      setUserLogged(JSON.parse(localStorage.getItem("userLogged")))
    }, [])

    const navigate = useNavigate()
    const [ userLogged, setUserLogged ] = useState()

    const menuRedirect =(e)=> {
        const directTo = e.target.id

        console.log(directTo)

        switch(directTo){
            case 'newg':
                navigate('/m') 
                break;

            case 'playg':
                navigate('/m')
                break;
            
            case 'leaderb':
                navigate('/leaderboards')
                break;
        }
    }

      

  return (
    <ProtectedComponent children={
      <div className='flex jc-c fdc'>
      <h1>MusicQuestro</h1>
      <h2>Hi {userLogged ? userLogged.username : ""}</h2>
      <button id='newg' onClick={menuRedirect}>New Game</button>
      <button id='playg' onClick={menuRedirect}>Play Game</button>
      <button id='leaderb' onClick={menuRedirect}>Leaderboards</button>
      <button onClick={()=> {
        localStorage.removeItem("userLogged")
        navigate('/')
      }}>Logout</button>
    </div>
    }/>
      
  )
}

export default Homepage
