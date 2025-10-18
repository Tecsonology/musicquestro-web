import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CalculateGame from '../CalculateGame.js';
import axios from 'axios';
import { UserContext } from '../components/CurrentUserContext.jsx';

// Environment variable for the host
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';

// Asset imports
import MelodyCard from '../assets/game-assets/Assets/Categories/Melody.png';

// Map metadata for navigation and unlocking
const mapNames = {
  rhythm: {
    imgLink: '/assets/Maps/Rhythm.png',
    location: '/rhythmGame'
  },
  melody: {
    imgLink: '/assets/Maps/Rhythm.png',
    location: '/melodyGame'
  },
  harmony: {
    imgLink: '/assets/Maps/Harmony.png',
    location: '/harmonyGame'
  },
  pitch: {
    imgLink: '/assets/Maps/Pitch.png',
    location: '/pitchGame'
  },
};

function GameSummary(props) {
  const navigate = useNavigate();
  // Get both currentUser and the function to update it
  const { currentUser, setCurrentUser } = useContext(UserContext); 

  // --- 1. GAME CALCULATION ---
  // IMPORTANT: The CalculateGame constructor now only takes (score, points, MAX_SCORE, MAX_POINTS, VICTORY_THRESHOLD)
  const calculate = new CalculateGame(
    props.score,
    props.points,
    props.MAX_SCORE,
    props.MAX_POINTS,
    props.VICTORY_THRESHOLD
  );

  const finalRating = parseFloat(calculate.calculatePerformanceRating()); // Precise rating (e.g., 73.45)
  const gamePoints = Math.floor(finalRating);                            // Rounded down for display (e.g., 73)
  const coinedGained = calculate.getCoins();
  const isVictory = finalRating >= props.VICTORY_THRESHOLD;               // Check against the threshold

  // --- 2. STATE & USER DATA ---
  const [btnText, setBtnText] = useState('Okay');
  const [showNextMapPrompt, setShowNextMapPrompt] = useState(false);
  const [nextGameImg, setNextGameImg] = useState(null);

  // Safely get userids
  const userids = currentUser?.userids || props.userids;

  // --- 3. ASYNC HANDLERS ---

  const mapUnlocker = async (mapIndex) => {
    if (!userids) return false;
    setShowNextMapPrompt(true);
    console.log('Attempting to unlock map index:', mapIndex);
    
    let categoryKey;
    switch (mapIndex) {
      case 1:
        setNextGameImg(mapNames.melody.imgLink);
        categoryKey = 'maps.melody.isLocked';
        break;
      case 2:
        setNextGameImg(mapNames.harmony.imgLink);
        categoryKey = 'maps.harmony.isLocked';
        break;
      case 3:
        setNextGameImg(mapNames.pitch.imgLink);
        categoryKey = 'maps.pitch.isLocked';
        break;
      default:
        return false;
    }

    try {
      const unlockMap = await axios.put(`${VITE_NETWORK_HOST}/unlockedCategory`, {
        userids,
        categoryKey,
      });

      // Assuming API returns a success indicator in its data
      if (unlockMap.data.success) {
        setShowNextMapPrompt(true)
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unlocking map:', error);
      return false;
    }
  };


  const unlockNextLevel = async () => {
    if (!userids || props.level >= 4) {
      return; // Stop if no user or already at max level (Level 4 is the last)
    }

    try {
      await axios.put(`${VITE_NETWORK_HOST}/update-map-level`, {
        userids: userids,
        map: props.gameName,
        level: props.level + 2, // e.g., current level 1 -> new level 3 unlocked
      });
      // console.log('Next level unlocked successfully.');
    } catch (error) {
      console.error('Error unlocking next level:', error);
    }
  };


  const gameUpload = async () => {
    if (!userids) {
      console.error("User ID not available. Cannot upload game results.");
      return;
    }

    setBtnText('Game uploading, please wait...');

    // Only unlock the next level if the player won (isVictory)
    if (isVictory) {
      await unlockNextLevel();
    }


    try {
      // 1. Calculate new user totals
      const newCoins = currentUser && currentUser.musicCoins + coinedGained;  
      const newTotalPoints = currentUser && currentUser.totalPoints + gamePoints;

      // 2. Update User Stats (Coins and Total Points)
      const updateUser = await axios.put(`${VITE_NETWORK_HOST}/api/update-user`, {
        userids: userids,
        updates: {
          musicCoins: newCoins,
          totalPoints: newTotalPoints,
        }
      });

      console.log('User update response:', updateUser.data);

      // 3. Update the user context state locally immediately after success
      {
        /**
         * if(updateUser.data.success && setCurrentUser) {
        setCurrentUser(prevUser => ({
          ...prevUser,
          musicCoins: newCoins,
          totalPoints: newTotalPoints,
        }));
      }
         */
      }

      // 4. Handle Navigation/Map Unlock
      if (props.level === 4 && isVictory) {
        // If max level AND victory, attempt to unlock the next game category
        const mapindex = props.nextGameIndex;
        if (await mapUnlocker(mapindex)) {
          setShowNextMapPrompt(true);
          console.log('1 Next game unlocked!');
        } 
      } else {
        // Otherwise, navigate to the level selection screen for the current game
        const baseLocation = mapNames[props.gameName]?.location;

        if (baseLocation) {
          // Construct the route: /h/m + /rhythmLevels
          const levelScreenPath = baseLocation.replace('Game', 'Levels');
          window.location.href = `/h${levelScreenPath}`; 
        } else {
          // Fallback
          //navigate('/h/m'); 
          console.log('3 Next game unlocked!');
        }
      }

    } catch (err) {
      console.error('Error during game upload or user update:', err);
      setBtnText('Error uploading! Try again.');
    }
  };

  // --- 4. RENDER ---

  return (
    <div className='game-summary fpage flex fdc jc-c aic' style={{ position: 'fixed' }}>
      {!showNextMapPrompt ? (
        <div style={{
          backgroundColor: !isVictory && 'rgba(81, 16, 0, 0.63)',
        }} className="game-summary-wrapper fpage flex fdc aic jc-c">
          <h1  style={{ textAlign: 'center', color: '#6ac3ffff' }}>
            {isVictory ? 'Congrats! Level Complete!' : 'Keep practicing, try again next time!'}
          </h1>
          <div style={{ backgroundColor: 'rgba(132, 134, 134, 0.49)', borderRadius: '1em' }} className='flex fdr aic jc-c'>
            
             <div className='flex fdr aic jc-c'>
            <p>Score: {props.score}</p>
            <p>Points: {props.points}</p>
          </div>
            <p><span>Overall: </span>{finalRating.toFixed(2)}</p>
            <p style={{marginLeft: '10px'}}><span>Target: </span>{props.VICTORY_THRESHOLD}</p>
          </div>

            <div className='flex fdr aic jc-c'>
            <span>{isVictory ? <p>✅</p> : <p>❌</p>}</span>

            
            <span style={{ margin: '0 10px' }}>
                <progress value={finalRating} max={props.VICTORY_THRESHOLD}></progress>
            </span>
            <span><p>Next Level</p></span>
          </div>

       
          <div style={{border: '1px solid white', padding: '0.5em', borderRadius: '1em', color: 'black' }} className='flex fdr aic jc-c'>
            <h3 style={{ marginRight: '2em', color: 'white' }}>Rewards</h3>
            <h4 style={{ marginRight: '1em', color: 'white' }}><span><img width={20}  style={{margin: 0}} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span> {gamePoints}</h4>
            <h4 style={{ color: 'white' }}><span><img width={20} src="https://i.ibb.co/Rpkrgr9x/Untitled-design-92.png" alt="" /></span> {coinedGained}</h4>
          </div>
          

          {/* Conditional Buttons based on Victory */}
          {isVictory ? (
            <button
              style={{ color: 'white', backgroundColor: 'green', width: '60%',}}
              onClick={gameUpload}
              disabled={btnText === 'Game uploading, please wait...'}
            >
              {btnText}
            </button>
          ) : (
            <div>
              <button style={{ marginRight: '0.5em', backgroundColor: 'red' }} onClick={() => window.location.reload()}>
                Try Again
              </button>
              <button style={{ backgroundColor: 'blue' }} onClick={() => navigate('/h/m')}>
                Back to Map
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Next Map Prompt */}
      {showNextMapPrompt ? (
        <div style={{ backgroundColor: 'rgba(1, 19, 37, 1)' }} className='fpage flex gdc aic jc-c'>
          <div className=' next-game-container flex fdc aic jc-c'>
            <h3 style={{ color: 'yellow' }}>Congratulations</h3>
            <img loading='lazy' width={200} src={nextGameImg} alt="Next Game" />
            <h2 style={{ textAlign: 'center' }}>You unlocked the next game!</h2>
            <button style={{ width: '10em', borderRadius: '2em' }} className='navLink' onClick={() => navigate('/h/m')}>
              Go to Maps
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GameSummary;