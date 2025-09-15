import React, { useState } from 'react'
import '../styles/BottomNavigation.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faStore, faUser, faRankingStar } from '@fortawesome/free-solid-svg-icons'
import HomeIcon from '../assets/nav-icons/3d-house.png'
import MusicIcon from '../assets/nav-icons/shop.png'
import LeaderboardIcon from '../assets/nav-icons/podium.png'

import home from '../assets/game-assets/Assets/Buttons/Play(B&B).png'
import profile from '../assets/game-assets/Assets/Buttons/Profile(B&B).png'
import shop from '../assets/game-assets/Assets/Buttons/Shop(B&B).png'
import leaderboard from '../assets/game-assets/Assets/Buttons/podium.png'


function BottonNavigation() {

  const [ avatar, setAvatar ] = useState(localStorage.getItem('avatar'))

  return (
    <div className='bottom-navigation'>
      <div className="nav-wrapper">

            <div className="nav-item">
            <Link to={''}><span><img width={50} src={HomeIcon} alt="" /></span></Link>
            
        </div>

         <div className="nav-item">
            <Link to={'store'}><span><img width={50} src={MusicIcon} alt="" /></span></Link>
        </div>
        
  
         <div className="nav-item"> 
            <Link to={'user'}><span><img width={50} src={avatar} alt="" /></span></Link>
        </div>

        <div className="nav-item">
            <Link to={'leaderboards'}><span><img width={50} src={leaderboard} alt="" /></span></Link>
        </div>
      </div>
    </div>
  )
}

export default BottonNavigation
