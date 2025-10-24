import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, Suspense, lazy } from 'react'
import '../styles/MainHome.css'
import MainHomeVisual from '../assets/MainHomeVisual.png'
import musicoins from '../assets/store-assets/musicoins.png'
import { UserContext } from './CurrentUserContext'
import MusicLife from '../assets/store-assets/MusicLife.png'
import logo from '../assets/game-assets/Assets/Logo&Menu/Logo.png'

const MainBG = lazy(()=> import('../assets/game-assets/Assets/BackGround/NormalBG/MainBG.png'))

import '../styles/Animation.css'
import { useState } from 'react'
import LoadingPage from './LoadingPage'
import DailyReward from './DailyReward'
import gift from '../assets/main-home/free-gift.gif'



function MainHome() {

  const navigate = useNavigate() 
  const { currentUser } = useContext(UserContext)
  const [ openReward, setOpenReward ] = useState(false)
  const dateToday = new Date().toLocaleDateString('en-CA'); // "2025-10-07"

  

  return (
    <div className='mainhome-container fpage flex fdc' style={{
      backgroundImage: {MainBG}
      }}>
      
          <DailyReward /> 
      
         <img width={100} className='scaling main-home-logo' src={logo} alt="" 
          style={{position: 'fixed', top: '1em', left: '1em', zIndex: '3', cursor: 'pointer'}}
          onClick={()=> {
            window.location.href = '/'
          }}
         />

         {
           currentUser ? 
           <>
            <div className="user-attributes flex fdr aic jc-c">

            <div  style={{marginRight: '1em'}} className='flex fdr aic jc-c'>
              <img className='scaleWithLight' style={{color: 'white', marginRight: '0.7em'}} width={30} src={MusicLife} alt="" />
              { currentUser ? <h2>{currentUser.life}</h2> : 'Loading...'}
            </div>

            <img className='rotating'  width={30} src={musicoins} alt="" style={{marginRight: '0.5em', color: 'white'}} />
            { currentUser ? <h2>{currentUser.musicCoins}</h2> : 'Loading'}
         </div>

          
         {
          currentUser && currentUser.lastClaimedDate === dateToday &&
          <img
              onClick={()=> openReward === false ? setOpenReward(true) : setOpenReward(false)}
            style={{position: 'absolute', bottom: '6em', border: '4px solid rgba(238, 255, 0, 1)',
            right: '1em', zIndex: '5', borderRadius: '50%'}} width={60} src={gift} alt="" />
         }


         <div className="main-content fpage flex fdc aic">
          <div className="main-left">

            <img id='main-home-visual' src={MainHomeVisual} alt="" />
            <h4 id='bio-text' style={{textAlign: 'center', margin: 0, color: 'white'}}>{currentUser ? currentUser.bio : null}</h4>
         </div>
         <div className="main-right flex fdc aic jc-c">
            <div className='main-home-button flex fdc aic jc-c'>
                <button id='btnStory' onClick={()=> {
                      
                      let currentPage = localStorage.getItem('current-reading-page')
                      //console.log(currentPage)
                      navigate(`story#${currentPage}`)
                    }}>STORY</button>

                  <button id='btnPlayGame' onClick={()=> {
                      navigate('m')
                  }}>PLAY</button>
            </div>
         </div>

         </div>
           </> : <LoadingPage />
         }

    </div>
  )
}

export default MainHome
