import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import { BrowserRouter, Link } from 'react-router-dom';
import CurrentUserContext from './components/CurrentUserContext';
import RhythmGame from './game_components/RhythmGame';

import logo from '../src/assets/game-assets/Assets/Logo&Menu/Logo.png'

import img1 from '../src/assets/main-home/1.png'
import img2 from '../src/assets/main-home/2.png'
import img3 from '../src/assets/main-home/3.png'
import img4 from '../src/assets/main-home/4.png'
import StoryPrev from '../src/assets/main-home/StoryPrev.png'

import { Outlet } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PilotTestingPrompt from './components/PilotTestingPrompt'
import BGMusic from './components/BGMusic'
import ClickEffect from './components/ClickEffect'
import arrowDown from './assets/game-assets/AppAssets/arrowDown.png'
import arrowUp from './assets/game-assets/AppAssets/arrowUp.png'
import headset from './assets/game-assets/AppAssets/headphone.png'



function App() {
  
  const navigate = useNavigate()
  const [ name, setName ] = useState()
  const [ logingIn, setLoggingIn ] = useState(false)


  return (
    <>
    
    <PilotTestingPrompt />
      
    
      <div id='main-app' className='log fpage flex fdc jc-c aic'>
        <h4 style={{position: 'absolute', background: 'transparent', padding: '1em', top: '0em', right: '1em', border: '1px solid #708993'}}><span><img style={{marginRight: '1em'}} width={20} src={headset} alt="" /></span>Best played with Headset</h4>

        {/**<ClickEffect play={true}/> */}
    
       { logingIn ? <Link onClick={()=> setLoggingIn(false)} className='navLink backHome'>X Cancel</Link> : null}
       <div  className="main-log flex fdc aic jc-c">
        
        <img width={!logingIn ? 300 : 200} className='main-logo' src={logo} alt="" />
        <p id='beta-version'>Beta Version: 1.000.002</p>
        <BGMusic />
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

        <h3  onClick={() => {
            document.getElementById("preview-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={{
            background: 'transparent',
            position: 'relative',
            bottom: '-4em',
            cursor: 'pointer'
          }} className='explore flex fdr aic jc-c'><span><img src={arrowDown} alt="" /></span>Explore</h3>


        <Outlet />

       </div>

        <section id='preview-section'>
          <h1>✨ Discover the magic of music in a creative and engaging way!</h1>
          <p style={{textAlign: 'center'}}>MusicQuestro is a fun and interactive music & rhythm game that blends storytelling with gamified challenges. Designed for youth, it introduces the basics of rhythm, melody, harmony, and pitch through exciting activities, 
            helping players learn while they play. 🎶🎮</p>
            <img width={500} style={{margin: '1em'}} src={StoryPrev} alt="" />
          <div className="game-preview-imgs">
            
            <img width={300} src={img1} alt="" />
            <img width={300} src={img2} alt="" />
            <img width={300} src={img3} alt="" />
            <img width={300} src={img4} alt="" />
          </div>

          <h3  onClick={() => {
            document.getElementById("main-app")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={{
            background: 'transparent',
            position: 'relative',
            bottom: '-4em',
            cursor: 'pointer'
          }} className='flex fdr aic jc-c'><span><img src={arrowUp} alt="" /></span>Back to top</h3>
        </section>
      
    </div>
    </>
  )
}

export default App
