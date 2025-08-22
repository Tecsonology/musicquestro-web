import React from 'react'
import '../styles/BottomNavigation.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faStore, faUser, faRankingStar } from '@fortawesome/free-solid-svg-icons'



function BottonNavigation() {
  return (
    <div className='bottom-navigation'>
      <div className="nav-wrapper">

         <div className="nav-item">
            <Link to={'store'}><span><FontAwesomeIcon icon={faStore} style={{fontSize: '2em'}}/></span></Link>
        </div>
        
        <div className="nav-item">
            <Link to={''}><span><FontAwesomeIcon icon={faHouse} style={{fontSize: '2em'}}/></span></Link>
        </div>

        

         <div className="nav-item">
            <Link to={'user'}><span><FontAwesomeIcon icon={faUser} style={{fontSize: '2em'}}/></span></Link>
        </div>

        <div className="nav-item">
            <Link to={'leaderboards'}><span><FontAwesomeIcon icon={faRankingStar} style={{fontSize: '2em'}}/></span></Link>
        </div>
      </div>
    </div>
  )
}

export default BottonNavigation
