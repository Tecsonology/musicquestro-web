import React, { useState, useContext,  } from 'react'
import { useNavigate } from 'react-router-dom'
import CalculateGame from '../CalculateGame.js'
import axios from 'axios'
import { token, userToken} from '../Token.js'
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext.jsx'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';

const mapNames = {
  rhythm: {
    imgLink: 'https://i.ibb.co/VWV4wcPV/Untitled-design-15.png',
    location: '/rhythmGame'
  },
  melody: {
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/melodyGame'
  },
  harmony: {
    imgLink: 'https://i.ibb.co/FLZzsRfD/Untitled-design-61.png',
    location: '/harmonyGame'
  },
  pitch: {
    imgLink: 'https://i.ibb.co/W4bb6H3f/Untitled-design-79.png',
    location: '/pitchGame'
  },

}

function GameSummary(props) {

  const navigate = useNavigate()
  const calculate = new CalculateGame(props.score, props.points, props.time)
  const gamePoints = calculate.calculateGame()
  const coinedGained = calculate.getCoins()

  const userids = userToken.userids

  const  { currentUser }  = useContext(UserContext)
  const [ btnOk, setBtnOk ] = useState('Okay')
  const [ nextMapPrompt, setNextMapPrompt ] = useState(false)
  const [ nextGameImg, setNextGameImg ] = useState()
  

    
    const mapUnlocker = async (mapIndex) => {

      console.log('unlocking next game...')
        let userids = props.userids


        const getKey =()=> {
          switch(mapIndex){
            case 1: setNextGameImg(mapNames.melody.imgLink)
            return 'maps.melody.isLocked' 

            case 2: setNextGameImg(mapNames.harmony.imgLink)
            return 'maps.harmony.isLocked'

            case 3: setNextGameImg(mapNames.pitch.imgLink)
            return 'maps.pitch.isLocked'
          }
        }

        let categoryKey = getKey()
        console.log(categoryKey)
     
        const unlockMap = await axios.put(`${VITE_NETWORK_HOST}/unlockedCategory`,
          {
            userids,
            categoryKey
          }
        )

        if(!unlockMap) return false

        if(unlockMap){
          console.log(unlockMap)
          return true
        }

    }


    const unlockNextLevel = async()=> {
        console.log(props.level+1)
        try {

            const nextMapLevel = await axios.put(`${VITE_NETWORK_HOST}/update-map-level`,
              { userids: props.userids, 
                map: props.gameName,
                level: props.level+2
              }
            )
            
            if(!nextMapLevel){
              console.log(error)
            }
            

            console.log("Yey unlock next level")
            console.log(nextMapLevel)

          
        } catch (error) {
          console.log(error)
        }
    }

  const gameUpload  = async ()=> {

            await unlockNextLevel()
   
            try {
              const updateUser = await axios.put(`${VITE_NETWORK_HOST}/api/update-user`,
                { userids: userids,
                  updates: {
                    musicCoins: currentUser ? currentUser.musicCoins + parseInt(coinedGained) : null,
                    totalPoints: currentUser ? currentUser.totalPoints + parseFloat(gamePoints) : null
                  }
                }
              )

              console.log("Updated User:", updateUser.data)

              if(props.level === 4){
                if(updateUser){
                setTimeout(async()=> {
              
                  console.log("Game uploaded")
                  const mapindex = props.nextGameIndex
                  if(await mapUnlocker(mapindex)){
                    console.log("map unlocked!!!!!!")
                    setNextMapPrompt(true)
                  }

                  

                  return () => {
                      window.removeEventListener('beforeunload', handleBeforeUnload);
                      stopTime(); 
                  };
                }, 2000)
              }
              } else {
                if(props.gameName === 'rhythm'){
                  navigate('/h/rhythmLevels')
                } else if(props.gameName === 'melody'){
                  navigate('/h/melodyLevels')
                } else if(props.gameName === 'harmony'){
                  navigate('/h/harmonyLevels')
                } else if(props.gameName === 'pitch'){
                  navigate('/h/pitchLevels')
                }
              }

          } catch(err){
            console.log('dasd')
          }
 
      
  }

  

  return (
      <div className='game-summary fpage flex fdc jc-c aic' style={{position: 'fixed'}}>
      {
        !nextMapPrompt ?
        <div className="game-summary-wrapper flex fdc aic jc-c">
        
        <h1 style={{textAlign: 'center'}}>{gamePoints >= props.targetPoint.toFixed(2) ? 'Congrats' : 'Better Luck Next Time'}</h1>

        <div className='flex fdr aic jc-c'>
          
          <p>Score: {props.score}</p>
          <p>Points: {props.points}</p>
          <p>Time: {calculate.getTime()}</p>
        </div>
        
      
        <div className='flex fdr aic jc-c'><span><img width={25} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span>
        <span><progress value={gamePoints} max={props.targetPoint.toFixed(2)}></progress></span>
        <span>{gamePoints >= props.targetPoint.toFixed(2) ? <p>✅</p> : <p>❌</p>}</span></div>
        <div className='flex fdr aic jc-c'>
          <p><span>YOU: </span>{calculate.calculateGame()}</p>
          <p><span>Target: </span>{props.targetPoint}</p>

          

          
        
        </div>

          <h3>Rewards</h3>
        <div style={{backgroundColor: '#E8E8E8', padding: '0.5em 1em', borderRadius: '1em'}} className='flex fdr aic jc-c'>
          <h4 style={{marginRight: '1em'}}><span><img width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span> {gamePoints}</h4>
          <h4><span><img width={20} src="https://i.ibb.co/Rpkrgr9x/Untitled-design-92.png" alt="" /></span> {coinedGained}</h4>
        </div>

        {gamePoints >= props.targetPoint.toFixed(2) ? <button onClick={()=> {  
                setBtnOk('Game uploading, please wait...')
                 gameUpload()
                 
            }}>{btnOk}</button> : 

            <div> 
                    <button style={{marginRight: '0.5em', backgroundColor: 'red'}} onClick={()=> {
                  window.location.reload()
                }}>Retry</button>

                <button style={{backgroundColor: 'blue'}} onClick={()=> {
                  window.location.href = '/h/m'
                }}>Back to map</button>
            </div>
              
        }
      </div> : null
      }

      {
        nextMapPrompt ?
        <>
          <div className=' next-game-container flex fdc aic jc-c'>
              <h3>Congratulations</h3>
              <h2 style={{textAlign: 'center'}}>You unlocked the next game</h2>

              <img width={200} src={nextGameImg} alt="" />
              <button onClick={()=> {
                window.location.href = '/h/m'
              }}>Go to Maps</button>
          </div>
        </> : null
      }
    </div>
  )
}

export default GameSummary
