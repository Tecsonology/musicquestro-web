import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import img1 from '../src/assets/main-home/1.png'
import img2 from '../src/assets/main-home/2.png'
import img3 from '../src/assets/main-home/3.png'
import img4 from '../src/assets/main-home/4.png'
import StoryPrev from '../src/assets/main-home/StoryPrev.png'

import { Outlet } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PilotTestingPrompt from './components/PilotTestingPrompt'


function App() {
  
  const navigate = useNavigate()
  const [ name, setName ] = useState()
  const [ logingIn, setLoggingIn ] = useState(false)


  return (
    <>
    
    <PilotTestingPrompt />
      <div className='log fpage flex fdc jc-c aic'>
        
        <div className='user flex fdc aic jc-c'
          style={{cursor: 'pointer'}}
          onClick={()=> {
            navigate('/h')
          }}>
          <FontAwesomeIcon icon={faUser}/>
        </div>
    
       { logingIn ? <Link onClick={()=> setLoggingIn(false)} className='navLink backHome'>X Cancel</Link> : null}
       <div className="main-log flex fdc aic jc-c">
        <img width={!logingIn ? 300 : 200} className='main-logo' src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
        <p id='beta-version'>Beta Version: 1.000.001</p>
        {
          !logingIn ? 
          <>
              <h2 style={{color: '#22E1E7'}}>Music & Rhythm Game for Kids</h2>
       <p style={{textAlign: 'center', color: 'white', marginBottom: '2.5em'}}>Step into the world of MusicQuestro – a magical adventure where music comes alive!</p>
          </> : null
        }
        {
          !logingIn && !logingIn ? <Link onClick={()=> setLoggingIn(true)} className='navLink' to={'login'}>PLAY</Link> : null
        }

        <Outlet />

       </div>

        <section id='preview-section'>
          <h1>✨ Discover the magic of music in a creative and engaging way!</h1>
          <p style={{textAlign: 'center', color: 'white'}}>MusicQuestro is a fun and interactive music & rhythm game that blends storytelling with gamified challenges. Designed for youth, it introduces the basics of rhythm, melody, harmony, and pitch through exciting activities, 
            helping players learn while they play. 🎶🎮</p>
            <img width={500} style={{margin: '1em'}} src={StoryPrev} alt="" />
          <div className="game-preview-imgs">
            
            <img width={300} src={img1} alt="" />
            <img width={300} src={img2} alt="" />
            <img width={300} src={img3} alt="" />
            <img width={300} src={img4} alt="" />
          </div>
        </section>
        

        



        

    </div>
    </>
  )
}

export default App
