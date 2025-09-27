import { useState } from 'react'
import './App.css'
import './styles/Log.css'
import {  Link } from 'react-router-dom';

import logo from '../src/assets/game-assets/Assets/Logo&Menu/Logo.png'

import img1 from '../src/assets/main-home/1.png'
import img2 from '../src/assets/main-home/2.png'
import img3 from '../src/assets/main-home/3.png'
import img4 from '../src/assets/main-home/4.png'
import StoryPrev from '../src/assets/main-home/StoryPrev.png'

import { Outlet } from 'react-router-dom';
import PilotTestingPrompt from './components/PilotTestingPrompt'
import BGMusic from './components/BGMusic'
import arrowDown from './assets/game-assets/AppAssets/arrowDown.png'
import arrowUp from './assets/game-assets/AppAssets/arrowUp.png'
import headset from './assets/game-assets/AppAssets/headphone.png'



function App() {

  const [ logingIn, setLoggingIn ] = useState(false)
  const [ showPrompt, setShowPrompt ] = useState(true)


  return (
    <>
    
    <PilotTestingPrompt showPrompt={showPrompt} setShowPrompt={setShowPrompt}/>
    
      <div id='main-app' className='log fpage flex fdc jc-c aic'>
        <h4 style={{position: 'absolute', background: 'transparent', padding: '1em', top: '0em', right: '1em', border: '1px solid #708993', color: 'white'}}><span><img style={{marginRight: '1em'}} width={20} src={headset} alt="" /></span>Best played with Headset</h4>

        {/**<ClickEffect play={true}/> */}
    
       { logingIn ? <Link onClick={()=> setLoggingIn(false)} className='navLink backHome'>X Cancel</Link> : null}
       <div  className="main-log flex fdc aic jc-c">
        
        <img width={!logingIn ? 300 : 200} className='main-logo' src={logo} alt="" />
        <p id='beta-version'>Beta Version: 1.000.002</p>
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

        {
          !logingIn ? 
            <h3  onClick={() => {
            document.getElementById("preview-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={{
            background: 'transparent',
            cursor: 'pointer',
            color: 'white'
          }} className='explore flex fdr aic jc-c'><span><img className='animateGoingUp ' style={{marginRight: '0.5em'}} src={arrowDown} alt="" /></span>Scroll down for more</h3> : null
        }


        <Outlet />

       </div>

        <section id='preview-section' className='flex fdc aic jc-c'>
          <h1 style={{textAlign: 'center'}}>✨ Discover the magic of music in a creative and engaging way!</h1>
          <p style={{textAlign: 'center'}}>MusicQuestro is a fun and interactive music & rhythm game that blends storytelling with gamified challenges. Designed for youth, it introduces the basics of rhythm, melody, harmony, and pitch through exciting activities, 
            helping players know the basics of music. 🎶🎮</p>
            

            <div className='flex fdc aic jc-c'>
              <img width={500} style={{margin: '1em'}} src={StoryPrev} alt="" />
              <h3 id='story-desc' style={{textAlign: 'center', color: 'white'}}>✨ Uncover the magical origins of MusicQuestro Land. Follow the story, meet new characters, and unlock the secrets hidden within the world of music.</h3>
            </div>


          <div className="game-preview-imgs">
            
            <div className='game-preview-wrapper'>
              <img src={img1} alt="" />
              <h2>🎵 Test your rhythm skills by matching notes to the correct beat. Can you keep the music flowing?</h2>
            </div>

            <div className='game-preview-wrapper'>
              <img src={img2} alt="" />
              <h2>🎶 Arrange the solfege syllables (Do, Re, Mi…) to create melodies and unlock musical patterns.</h2>
            </div>

            <div className='game-preview-wrapper'>
              <img src={img3} alt="" />
              <h2>👂 Train your ears to recognize high and low sounds in this fun pitch comparison game.</h2>
            </div>

            <div className='game-preview-wrapper'>
              <img src={img4} alt="" />
              <h2>🛒 Collect points and unlock instruments and rewards to power up your adventure.</h2>
            </div>

            
            
          </div>

          <div  style={{marginTop: '3em'}}>
              <video width={300} src="src/assets/Tutorial.mp4" autoPlay muted loop controls></video>
              <h2>MusicQuestro Gameplay</h2>
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
            cursor: 'pointer',
            color: 'white'
          }} className='flex fdr aic jc-c'><span><img className='animateGoingDown' style={{marginRight: '0.5em '}} src={arrowUp} alt="" /></span>Back to top</h3>
        </section>
      
    </div>
    </>
  )
}

export default App
