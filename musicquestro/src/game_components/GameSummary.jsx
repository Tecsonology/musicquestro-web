import React, { useState } from 'react'
import CalculateGame from '../CalculateGame.js'
import axios from 'axios'
import { token, userToken} from '../Token.js'

function GameSummary(props) {

  const calculate = new CalculateGame(props.score, props.points, props.time)
  const gamePoints = calculate.calculateGame()
  const coinedGained = calculate.getCoins()

  const userids = userToken.userids

  const [ currentUser, setCurrentUser ] = useState()
  const [ btnOk, setBtnOk ] = useState('Okay')

  const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/player', {
                params: { userids }
            });
          
            const user = response.data;
            
             setCurrentUser(user)

             return true
            
  
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
  
  const gameUpload  = async ()=> {
       if(getUser()){
            try {
              const updateUser = await axios.put('http://localhost:5000/api/update-user',
                { userids: userids,
                  updates: {
                    musicCoins: currentUser.musicCoins + parseInt(coinedGained),
                    totalPoints: currentUser.totalPoints + parseFloat(gamePoints)
                  }
                }
              )

              console.log("Updated User:", updateUser.data)

              if(updateUser){
                setTimeout(()=> {
              
                  console.log("Game uploaded")
                  
                  window.location.href = '/m'
                  return () => {
                      window.removeEventListener('beforeunload', handleBeforeUnload);
                      stopTime(); 
                  };
                }, 2000)
              }

          } catch(err){
            console.log('dasd')
          }

          
       }
      
  }

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
                setBtnOk('Game uploading, please wait...')
                 gameUpload()
                 
            }}>{btnOk}</button> : 

            <div>
                    <button onClick={()=> {
                  window.location.reload()
                }}>Retry</button>
                <button onClick={()=> {
                  window.location.href = '/m'
                }}>Back to map</button>
            </div>
              
        }
      </div>
    </div>
  )
}

export default GameSummary
