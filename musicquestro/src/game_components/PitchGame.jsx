import React, { useEffect } from 'react'
import { useState, useContext, createContext} from 'react';
import SecondPitchGame from './SecondPitchGame';
import HighPitch from './HighPitch';
import GameStatus from '../game_components/GameStatus.jsx'
import GamePrompt from '../mini-components/GamePrompt.jsx';

export const PitchScore = createContext()

const NOTES = [
  300, 350, 400, 450, 500, 600
]

function PitchGame() {

  let context;
  let noteSequence = []

  const [ noteLength, setNoteLength ] = useState(2)
  const [ prevSequence, setPrevSequence ] = useState()
  const [ question, setQuestion ] = useState()
  const [ inputSequence, setInputSequence ] = useState([])
  const [ pitchKey , setPitchKey ] = useState([])
  const [ pitchCards, setPitchCards ] = useState([])
  const [ message, setMessage ] = useState('PITCH')
  const [ score, setScore ] = useState(0)
  const [ userPoints, setUserPoints ] = useState(0)
  const [ time, setTime ] = useState(0)
  const [ level, setLevel ] = useState(0)
  const [ showKey, setShowKey ] = useState(false)
  const [ showEqualBtn, setShowEqualBtn ] = useState(false)
  const [ status, setStatus ] = useState()
  const [ hidePlayButton , setHidePlayButton ] = useState(false)

  useEffect(()=> {
    if(score === 7 || score === 10){
      setNoteLength(noteLength + 1)
    }
  }, [score])

  const initializeAudio =()=> {
    if(!context || context.state === 'closed'){
      context = new (window.AudioContext || window.webkitAudioContext)();

    } else if (context.state === 'suspended'){  
      context.resume()
    }
  }

  const generateQuestion =()=> {
      let pickQuestion =  [ 'highest', 'lowest']
      let questionNo = Math.floor(Math.random() * pickQuestion.length)
      setQuestion(pickQuestion[questionNo])
      return pickQuestion[questionNo]
      
    }

  const generateSequence =()=> {
    
    for(let x = noteLength -1; x >= 0; x--){
      noteSequence.push(Math.floor(Math.random() * NOTES.length))
      
    }

    return noteSequence
  }
  
  const playNote =()=> {
    setShowEqualBtn(false)
    setHidePlayButton(true)

    setMessage(`Which card has the ${generateQuestion()} pitch?`)
    let delay = 0
    setPitchKey([])
    setPitchCards([])
    noteSequence = generateSequence()
    for(let x = noteLength-1; x >= 0; x--){
      setTimeout(()=> {
        if(!context) initializeAudio()
        const osc = context.createOscillator()
        const gainNode = context.createGain()

        osc.type = 'square'
        osc.frequency.value = NOTES[noteSequence[x]]


        gainNode.gain.setValueAtTime(1, context.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1000);

        osc.connect(gainNode)
        gainNode.connect(context.destination)

        osc.start()
        osc.stop(context.currentTime + 600 / 1000)
        setPitchCards(prev => [...prev, parseInt(NOTES[noteSequence[x]])])
      }, delay)
      delay += 2000
    }

    setTimeout(()=> {
      setShowEqualBtn(true)
    }, 3000)
  }


  const checkAnswer =(e, index)=> {
    switch(question){
      case 'highest' : 
      console.log(pitchCards[index], Math.max(...pitchCards))
        if(pitchCards[index] === Math.max(...pitchCards)){
          console.log('Correct')
          setStatus('✅')
          setScore(score +1)
        } else {
          console.log('Incorrect')
          setStatus('❌')
        }
        break

      case 'lowest' : 
        if(pitchCards[index] === Math.min(...pitchCards)){
          console.log('Correct')
          setStatus('✅')
          setScore(score +1)

        } else {
          console.log('Incorrect')
          setStatus('❌')
        }
        break
    }
   
  }

  

  

  return (
    <div className='pitch-game-container fpage flex fdc aic jc-c'>
      <GamePrompt gameName={'Pitchy pitchy'}/>
      <GameStatus score={score} userPoints={userPoints} level={level} />
      <h3>Score: {score}</h3>

      {
        score < 1 ? 
        <div className='flex fdc'>
             <h2 style={{textAlign: 'center'}}>{message}</h2>
        <div>
               <div className='flex fdr aic jc-c'>
      {
        pitchCards && pitchCards.length > 0 ? 
        pitchCards.map((note, index)=> (
          
            <h1 className='pitchCards' key={index} style={{backgroundColor: 'white', color: 'black', padding: '1em', margin: '0 0.3em', borderRadius: '0.2em', cursor: 'pointer'}}  

              onClick={(e)=> {
                setShowEqualBtn(false)
                checkAnswer(e, index)
                setShowKey(true)
                setTimeout(()=> {
                  playNote()
                  setShowKey(false)
                }, 1500)
              }}
            
            >{!showKey ? '?' : `${note} ${status}`}</h1>
        
        )) : null
      }
        
     
        </div>

        <div className='flex fdc aic jc-c'>
          {
          showEqualBtn ? <button onClick={()=> {
            if(pitchCards[0] === pitchCards[1]){
              console.log('Correct')
              setStatus('✅')
              setScore(score +1)

            } else {
              console.log('Incorrect')
              setStatus('❌')
            }

            setShowKey(true)
            setTimeout(()=> {
                  playNote()
                  setShowKey(false)
                }, 1500)
            
            
          }}>Or Same?</button> : null
        }
        </div>
        </div>

      {
        !hidePlayButton  ? 
        <button style={{backgroundColor: 'red', borderRadius: '0', fontWeight: 'bold', height: ''}} onClick={()=> {
            playNote()
          }}>START
        </button> : null
      }
      { inputSequence && inputSequence.length >= 0?
        inputSequence.map((note, index)=> (
          <span key={index}>{note}</span>
        ))
        : null
      }
      

        </div> : 
        
        <div>
          <PitchScore.Provider value={{score, setScore}}><SecondPitchGame /></PitchScore.Provider>
        </div>
      }

      
         
     
    </div>
  )
}

export default PitchGame
