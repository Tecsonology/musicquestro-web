import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useContext,  } from 'react';
import GameStatus from './GameStatus';
import { UserContext } from '../components/CurrentUserContext';
import GamePrompt from '../mini-components/GamePrompt';
import GameSummary from './GameSummary';

const noteValues = [
  300, 350, 400, 450, 500, 600
]

function HarmonyGame() {
  const { id } = useParams()
  const { currentUser, setCurrentUser } = useContext(UserContext) 
   const [score, setScore] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [level, setLevel] = useState(0);
    const [ time, setTime ] = useState(0)
    const targetPoint = 0;

  let context;

  const initializeAudio =()=> {
    if(!context || context.state === 'closed'){
      context = new (window.AudioContext || window.webAudioContext)()
    } else if(context.state === 'suspended'){
      context.resume()
    }
  }

  const playSequence =async()=> {
     playFirstSeq()
     playSecondSeq()
     setScore(score+1)
     setUserPoints(userPoints+400)
     setLevel(level+1)
  }

  const generateSequence =()=> {
    let noteSequence = []

    for(let x = 0; 4 >= x; x++){
      noteSequence.push(Math.floor(Math.random() * noteValues.length))
    }
    return noteSequence

  }

  const playNote =(freq, type)=> {
    if(!context) initializeAudio()

        const seq = generateSequence()

        const osc = context.createOscillator()
        const gainNode = context.createGain()

        osc.type = type
        osc.frequency.value = freq

        gainNode.gain.setValueAtTime(1, context.currentTime )
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1000);

        osc.connect(gainNode)
        gainNode.connect(context.destination)

        osc.start()
        osc.stop(context.currentTime + 800 / 1000)
  }


  const playFirstSeq = async()=> {
    const sequence = generateSequence()
    console.log(sequence)
    let delay = 0
    sequence.forEach(element => {
      setTimeout(()=> {
        playNote(noteValues[element], 'triangle')
      }, 1000 + delay)

      delay += 1000  
    })
  }

  const playSecondSeq = async()=> {
    const sequence = generateSequence()
    console.log(sequence)
    let delay = 0
    sequence.forEach(element => {
      setTimeout(()=> {
        playNote(noteValues[element], 'sawtooth')
      }, 1000 + delay)

      delay += 1000  
    })
  }


  return (
    <div className='fpage flex fdc aic jc-c'>
      <GamePrompt gameName={'Pitchy pitchy'}/>
      {
        level < 15 ?
        <>
          <GameStatus score={score} userPoints={userPoints} level={level} />
          <h1>Harmonia</h1>
          <button onClick={()=> {
            playSequence()
          }}>Play Note</button>
        </> :
        <>
          <GameSummary userids={currentUser.userids} level={parseInt(id)}  gameName={'harmony'} score={score} points={userPoints} time={time} targetPoint={targetPoint} nextGameIndex={3} />
        </>
      }
    </div>
  )
}

export default HarmonyGame
