import React from 'react'
import '../styles/BottomNavigation.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faStore, faUser, faRankingStar } from '@fortawesome/free-solid-svg-icons'
import HomeIcon from '../assets/nav-icons/3d-house.png'
import MusicIcon from '../assets/nav-icons/shop.png'
import LeaderboardIcon from '../assets/nav-icons/podium.png'


function BottonNavigation() {
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
            <Link to={'user'}><span><FontAwesomeIcon className='user-menu-icon' icon={faUser} style={{fontSize: '2.5em'}}/></span></Link>
        </div>

        <div className="nav-item">
            <Link to={'leaderboards'}><span><img width={50} src={LeaderboardIcon} alt="" /></span></Link>
        </div>
      </div>
    </div>
  )
}

export default BottonNavigation
