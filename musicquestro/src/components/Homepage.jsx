import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { token } from '../Token'
import '../styles/Homepage.css'
import ProtectedComponent from './ProtectedComponent'
import Lifebar from '../mini-components/Lifebar'
import StoreButton from '../mini-components/StoreButton'
import ButtonSettings from '../mini-components/ButtonSettings'
import PointsBar from '../mini-components/PointsBar'
import { UserContext } from './CurrentUserContext'

function Homepage() {

    const navigate = useNavigate()

    const [ userLogged, setUserLogged ] = useState()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    
    useEffect(()=> {
       setUserLogged(JSON.parse(localStorage.getItem("userLogged")))
    }, [])

    const menuRedirect =(e)=> {
        const directTo = e.target.id
        switch(directTo){
            case 'newg':
                navigate('/m') 
                break;

            case 'playg':
                navigate('/m')
                break;
              
            case 'user':
              navigate('/user')
              break;
            
            case 'leaderb':
                navigate('/leaderboards')
                break;
        }
    }

      

  return (
    <ProtectedComponent children={
      <div className='homepage flex jc-c aic fdc fpage'>
        <Lifebar />
        <PointsBar />
        <StoreButton />
      <img className='main-logo' src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />

      <button className='btnMenu' id='playg' onClick={menuRedirect}>Play Game</button>
      <button className='btnMenu' id='user' onClick={menuRedirect}>Profile</button>
      <button className='btnMenu' id='leaderb' onClick={menuRedirect}>Leaderboards</button>
      <button className='btnMenu' onClick={()=> {
        localStorage.removeItem("userLogged")
        window.location.href = '/'
      }}>Logout</button>
      <ButtonSettings />
    </div>
    }/>
      
  )
}

export default Homepage
