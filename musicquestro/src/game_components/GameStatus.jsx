import React from 'react'
import '../styles/GameStyles.css'

function GameStatus(props) {

  return (
    <div className='game-status-container glass-bg'>
      {props.level <= 15 ? (
        <div className='game-status-wrapper flex fdr'>
            <div>
              <p> Score {props.score && props.score}</p>
            </div>
            <div>
              <img src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" />
              <p>Points: {props.userPoints}</p>
            </div>
            <div>
              <p>Level: {props.level}/15</p>
            </div>
        </div>
        
      ) : null}
    </div>
  )
}

export default GameStatus
