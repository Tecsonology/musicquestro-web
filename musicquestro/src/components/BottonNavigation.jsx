import { useState, useContext } from 'react'
import '../styles/BottomNavigation.css'
import { Link, useLocation } from 'react-router-dom' // Link and useLocation are already here
import HomeIcon from '../assets/game-assets/Navigation/Home.png';
import Shop from '../assets/game-assets/Navigation/Shop.png';
import Leaderborad from '../assets/game-assets/Navigation/Leader-Board.png';
import { UserContext } from './CurrentUserContext';
import Loader from './Loader'; // Assuming you use this Loader component
import LoadingPage from './LoadingPage';

// Note: You can remove the unused avatar imports (friend, devil, dog, cat, bunny)
// They are not used in the component's logic.

function BottonNavigation() {
    const location = useLocation();
    const { currentUser } = useContext(UserContext);

    // --- FIX: Correct the conditional logic for hiding the bar ---
    // The bar should NOT render if location.pathname is '/h/story'
    const shouldShowNavigation = location.pathname !== '/h/story';

    // Check if the current path starts with '/h/story' to catch hash links (e.g., /h/story#12)
    const isStoryPath = location.pathname.startsWith('/h/story');
    
    if (isStoryPath) {
        return null; // Don't render the navigation bar on the story page
    }
    // -----------------------------------------------------------------

    return (
        <div className='bottom-navigation'>
            {/* The condition check is now simplified to only render the wrapper if not on the story page */}
            <div className="nav-wrapper"> 

                {/* Home */}
                <div id={location.pathname === '/h' ? 'activeNav' : null} className="nav-item">
                    {/* The nested span/h3 structure is slightly redundant; simplified link structure */}
                    <Link className='link' to={'/h'}> 
                        <img src={HomeIcon} alt="Home" />
                        <h3 className='icon-label'>Home</h3>
                    </Link>
                </div>

                {/* Store */}
                <div id={location.pathname === '/h/store' ? 'activeNav' : null} className="nav-item">
                    <Link className='link' to={'/h/store'}>
                        <img src={Shop} alt="Store" />
                        <h3 className='icon-label'>Store</h3>
                    </Link>
                </div>
                
                {/* User/Avatar */}
                <div 
                    // Set background color conditionally only if currentUser is null/loading
                    style={{
                        backgroundColor: currentUser ? 'transparent' : "rgba(100, 100, 100, 0.5)"
                    }} 
                    id={location.pathname === '/h/user' ? 'activeNav' : null} 
                    className="nav-item"
                > 
                    <Link className='link' to={'/h/user'}>
                        {
                            // Use the Loader component while currentUser is null/loading
                            currentUser ? 
                            <img src={currentUser.avatar} alt="User Avatar" className="user-menu-icon" />
                            : <div className='loaderPage'></div>// Assuming Loader takes a size prop or styles the div
                        }
                        <h3 className='icon-label'>User</h3>
                    </Link>
                </div>

                {/* Leaderboard */}
                <div id={location.pathname === '/h/leaderboards' ? 'activeNav' : null} className="nav-item">
                    <Link className='link' to={'/h/leaderboards'}>
                        {/* Adjusted width to 50px for consistency, check your CSS for .nav-item img width */}
                        <img src={Leaderborad} alt="Leaderboard" style={{ width: '50px' }}/> 
                        <h3 className='icon-label'>Leaderboard</h3>
                    </Link>
                </div>
            </div>
        </div> 
    );
}

export default BottonNavigation;