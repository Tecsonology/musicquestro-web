import { useState, useContext, useEffect } from 'react'
import '../styles/BottomNavigation.css'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '../assets/game-assets/Navigation/Home.png';
import Shop from '../assets/game-assets/Navigation/Shop.png';
import Leaderborad from '../assets/game-assets/Navigation/Leader-Board.png';
import { UserContext } from './CurrentUserContext';
import Loader from './Loader';
import LoadingPage from './LoadingPage';



function BottonNavigation() {
    const location = useLocation();
    const { currentUser } = useContext(UserContext);

    useEffect(()=> {
       
    }), [currentUser]

    const shouldShowNavigation = location.pathname !== '/h/story';

    const isStoryPath = location.pathname.startsWith('/h/story');
    
    if (isStoryPath) {
        return null; 
    }
 

    return (
        <div className='bottom-navigation'>
            <div className="nav-wrapper"> 


                <div id={location.pathname === '/h' ? 'activeNav' : null} className="nav-item">
               
                    <Link className='link' to={'/h'}> 
                        <img src={HomeIcon} alt="Home" />
                        <h3 className='icon-label'>Home</h3>
                    </Link>
                </div>

  
                <div id={location.pathname === '/h/store' ? 'activeNav' : null} className="nav-item">
                    <Link className='link' to={'/h/store'}>
                        <img src={Shop} alt="Store" />
                        <h3 className='icon-label'>Store</h3>
                    </Link>
                </div>
                
          
                <div 
                    style={{
                        backgroundColor: currentUser ? 'transparent' : "rgba(100, 100, 100, 0.5)"
                    }} 
                    id={location.pathname === '/h/user' ? 'activeNav' : null} 
                    className="nav-item"
                > 
                    <Link className='link' to={'/h/user'}>
                        {
                            currentUser ? 
                            <img src={currentUser && currentUser.avatar} alt="User Avatar" className="user-menu-icon" />
                            : <div className='loaderPage'></div>
                        }
                        <h3 className='icon-label'>User</h3>
                    </Link>
                </div>


                <div id={location.pathname === '/h/leaderboards' ? 'activeNav' : null} className="nav-item">
                    <Link className='link' to={'/h/leaderboards'}>
                        <img src={Leaderborad} alt="Leaderboard" style={{ width: '50px' }}/> 
                        <h3 className='icon-label'>Leaderboard</h3>
                    </Link>
                </div>
            </div>
        </div> 
    );
}

export default BottonNavigation;