import React, { useState, useContext } from 'react'
import CalculateGame from '../CalculateGame.js'
import axios from 'axios'
import { token, userToken} from '../Token.js'
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext.jsx'

function GameSummary(props) {

  const calculate = new CalculateGame(props.score, props.points, props.time)
  const gamePoints = calculate.calculateGame()
  const coinedGained = calculate.getCoins()

  const userids = userToken.userids

  const  { currentUser }  = useContext(UserContext)
  const [ btnOk, setBtnOk ] = useState('Okay')

  

  if(currentUser){
        const mapUnlocker =async (mapIndex) => {
        let userids = currentUser.userids
        let catIndex = mapIndex
        console.log(userids, catIndex)
        const updateUser = await axios.put('http://localhost:5000/unlockedCategory', { 
            userids, 
            catIndex 
        })

        console.log(updateUser)

    }

    mapUnlocker(1)
  }
  
  const gameUpload  = async ()=> {
   
            try {
              const updateUser = await axios.put('http://localhost:5000/api/update-user',
                { userids: userids,
                  updates: {
                    musicCoins: currentUser ? currentUser.musicCoins + parseInt(coinedGained) : null,
                    totalPoints: currentUser ? currentUser.totalPoints + parseFloat(gamePoints) : null
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
