import React from 'react'
import { useNavigate, } from 'react-router-dom'
import { useContext } from 'react'
import '../styles/MainHome.css'
import MainHomeVisual from '../assets/MainHomeVisual.png'
import { Link } from 'react-router-dom'
import musicoins from '../assets/store-assets/musicoins.png'
import HomeIcon from '../assets/nav-icons/3d-house.png'
import MusicIcon from '../assets/nav-icons/shop.png'
import LeaderboardIcon from '../assets/nav-icons/podium.png'
import CurrentUserContext from './CurrentUserContext'
import { UserContext } from './CurrentUserContext'
import MusicLife from '../assets/store-assets/MusicLife.png'
import BGMusic from './BGMusic'
import mainVisual from '../assets/game-assets/Assets/Logo&Menu/Menu.png'
import logo from '../assets/game-assets/Assets/Logo&Menu/Logo.png'

import '../styles/Animation.css'
import { useState } from 'react'


function MainHome() {

  const navigate = useNavigate() 
  const { currentUser } = useContext(UserContext)
      const [ audioActive, setAudioACtive ] = useState(true)
  

  return (
    <div className='mainhome-container fpage flex fdc aic jc-c' style={{marginBottom: '3em'}}>
         
         <img width={100} className='scaling' src={logo} alt="" 
          style={{position: 'fixed', top: '1em', left: '1em', zIndex: '3', cursor: 'pointer'}}
          onClick={()=> {
            navigate('/')
          }}
         />

         <div className="user-attributes flex fdr aic jc-c">

            <div  style={{marginRight: '1em'}} className='flex fdr aic jc-c'>
              <img className='scaleWithLight' style={{color: 'white', marginRight: '0.7em'}} width={30} src={MusicLife} alt="" />
              { currentUser ? <h2>{currentUser.life}</h2> : 'Loading...'}
            </div>

            <img className='rotating'  width={30} src={musicoins} alt="" style={{marginRight: '0.5em', color: 'white'}} />
            { currentUser ? <h2>{currentUser.musicCoins}</h2> : 'Loading'}
         </div>

         <div className="main-nav">
          <ul className='flex fdr aic jc-c'>
            <li>
              <span><img width={30} src={HomeIcon} alt="" /></span> <Link to={''}>Home</Link>
            </li>
            <li>
              <span><img width={30} src={MusicIcon} alt="" /></span><Link to={'store'}>Store</Link>
            </li>
            <li>
              <span><img width={30} src={LeaderboardIcon} alt="" /></span><Link to={'leaderboards'}>Leaderboard</Link>
            </li>
            <li>
              <Link to={'user'}>User</Link>
            </li>
          </ul>
         </div>
         
         <div className="main-content flex fdc aic jc-c">
          <div className="main-left">
            <img src={MainHomeVisual} alt="" />
         </div>
         <div className="main-right flex fdc aic jc-c">
            <div className='main-home-button flex fdc aic jc-c'>
                <button id='btnStory' onClick={()=> {
                      navigate('story')
                    }}>STORY</button>

                  <button id='btnPlayGame' onClick={()=> {
                      navigate('m')
                  }}>PLAY</button>
            </div>
         </div>

         </div>

    </div>
  )
}

export default MainHome
