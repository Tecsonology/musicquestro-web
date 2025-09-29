import React, { useState } from 'react'
import '../styles/BottomNavigation.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import HomeIcon from '../assets/game-assets/Navigation/Home.png';
import Shop from '../assets/game-assets/Navigation/Shop.png';
import Leaderborad from '../assets/game-assets/Navigation/Leader-Board.png';



function BottonNavigation() {

  const location = useLocation();
  
  const [ avatar, setAvatar ] = useState(localStorage.getItem('avatar'))

  return (
    <div className='bottom-navigation'>
      <div className="nav-wrapper">

            <div id={location.pathname === '/h' ? 'activeNav' : null} className="nav-item">
            <Link className='link' to={''}><span><img width={50} src={HomeIcon} alt="" /><span><h3 style={{textDecoration: 'none'}} className='icon-label'>Home</h3></span></span></Link>
            
            </div>

         <div id={location.pathname === '/h/store' ? 'activeNav' : null} className="nav-item">
            <Link className='link' to={'store'}><span><img width={50} src={Shop} alt="" /></span><span><h3 style={{textDecoration: 'none'}} className='icon-label'>Store</h3></span></Link>
        </div>
        
  
         <div id={location.pathname === '/h/user' ? 'activeNav' : null} className="nav-item"> 
            <Link className='link'  to={'user'}><span><img width={50} src={avatar} alt="" /></span><span><h3 style={{textDecoration: 'none'}} className='icon-label'>User</h3></span></Link>
        </div>

        <div id={location.pathname === '/h/leaderboards' ? 'activeNav' : null} className="nav-item">
            <Link className='link' to={'leaderboards'}><span><img width={60} src={Leaderborad} alt="" /></span><span><h3 style={{textDecoration: 'none'}} className='icon-label'>Leaderboard</h3></span></Link>
            
        </div>
      </div>
    </div>  
  )
}

export default BottonNavigation
