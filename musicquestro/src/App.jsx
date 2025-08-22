import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import BackgroundMusic from './BackgroundMusic';
import { BrowserRouter, Link } from 'react-router-dom';
import CurrentUserContext from './components/CurrentUserContext';
import RhythmGame from './game_components/RhythmGame';
import { Outlet } from 'react-router-dom';


function App() {
 
  const [ name, setName ] = useState()
  const [ logingIn, setLoggingIn ] = useState(false)


  return (
    <div className='log fpage flex fdc jc-c aic'>
       { logingIn ? <Link onClick={()=> setLoggingIn(false)} className='navLink backHome'>{`<`}</Link> : null}
       <img width={400} className='main-logo' src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
        {
          !logingIn && !logingIn ? <Link onClick={()=> setLoggingIn(true)} className='navLink' to={'login'}>PLAY</Link> : null
        }
        <Outlet />

    </div>
  )
}

export default App
