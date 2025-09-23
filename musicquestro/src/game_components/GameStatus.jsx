import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/GameStyles.css'
import PauseGame from '../mini-components/PauseGame'
import CountdownCircle from '../components/CountdownCircle'
import settings from '../assets/game-assets/Assets/Buttons/settings.png'

//https://icons8.com/icons/set/settings

function GameStatus(props) {

    const [rotate, setRotate] = useState(false)
    const [ isOpen, setIsOpen ]= useState(false)
    


  useEffect(()=> {
    if (props.score) {
      setRotate(true)

      const timer = setTimeout(() => setRotate(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [props.score])



  return (
    <>
      <div className='game-status-container flex aic jc-c fdr'>
      {props.level <= 15 ? (
        <div className='game-status-wrapper flex fdr aic jc-c'>
            <div>
              <p> Score: {props.score && props.score}</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <img style={{marginRight: '0.5em'}}  className={rotate ? 'rotate-once' : ''} width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" />
              <p>Points: {props.userPoints}</p>
            </div>
            <div>
              <p>Level: {props.level}</p>
            </div>
            {/*<CountdownCircle time={10} running={props.running} onComplete={()=>console.log('done')} />*/}
           
           <div style={{padding: '0.2em', backgroundColor: 'gray', borderRadius: '50%'}}>
              <img onClick={()=> {
                setIsOpen(true)
              }} width={40} src={settings} alt="" />
           </div>
          

            
        </div>
        
      ) : null}
   
    </div>
      {
        isOpen ? 
        <PauseGame isOpen={isOpen}  setIsOpen={setIsOpen} setRunning={props.setRunning}/> : null
      }
    </>
  )
}

export default GameStatus
