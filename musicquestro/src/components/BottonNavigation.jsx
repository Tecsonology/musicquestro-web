import React, { useState } from 'react'
import '../styles/BottomNavigation.css'
import { Link } from 'react-router-dom'

import HomeIcon from '../assets/game-assets/Navigation/Home.png';
import Shop from '../assets/game-assets/Navigation/Shop.png';
import Leaderborad from '../assets/game-assets/Navigation/Leader-Board.png';



function BottonNavigation() {

  const [ avatar, setAvatar ] = useState(localStorage.getItem('avatar'))

  return (
    <div className='bottom-navigation'>
      <div className="nav-wrapper">

            <div className="nav-item">
            <Link to={''}><span><img width={50} src={HomeIcon} alt="" /></span></Link>
            
        </div>

         <div className="nav-item">
            <Link to={'store'}><span><img width={50} src={Shop} alt="" /></span></Link>
        </div>
        
  
         <div className="nav-item"> 
            <Link to={'user'}><span><img width={50} src={avatar} alt="" /></span></Link>
        </div>

        <div className="nav-item">
            <Link to={'leaderboards'}><span><img width={60} src={Leaderborad} alt="" /></span></Link>
        </div>
      </div>
    </div>
  )
}

export default BottonNavigation
