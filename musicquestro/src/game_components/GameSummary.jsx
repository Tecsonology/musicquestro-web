import React from 'react'
import CalculateGame from '../CalculateGame.js'

function GameSummary(props) {

  const calculate = new CalculateGame(props.score, props.points, props.time)
  const gamePoints = calculate.calculateGame()
  const coinedGained = calculate.getCoins()
  console.log()

  return (
    <div className='game-summary fpage flex fdc jc-c aic' style={{position: 'fixed'}}>
      <div className="game-summary-wrapper">
        <h2>Summary</h2>
        <p>Score: {props.score}</p>
        <p>Points: {props.points}</p>
        <p>Time: {calculate.getTime()}</p>
        <p>Total Points {gamePoints}</p>
        <p>Coins Gained: {coinedGained}</p>
        <p>Target Points: atleast {props.targetPoint.toFixed(2)}</p>

        {gamePoints >= props.targetPoint ? <button onClick={()=> {
            window.location.href = '/m'
        }}>Ok</button> : <button onClick={()=> {
          window.location.reload()
        }}>Retry</button>}
      </div>
    </div>
  )
}

export default GameSummary
