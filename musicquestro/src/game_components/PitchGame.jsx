import React, { useEffect } from 'react'
import { useState, useContext, createContext} from 'react';
import SecondPitchGame from './SecondPitchGame';
import HighPitch from './HighPitch';
import GameStatus from '../game_components/GameStatus.jsx'
import GamePrompt from '../mini-components/GamePrompt.jsx';

export const PitchScore = createContext()

const NOTES = [
  300, 350, 400, 450, 500, 600, 650, 700, 750, 800,
  850, 900, 950, 1000
];

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
  const [ status, setStatus ] = useState()
  const [ hidePlayButton , setHidePlayButton ] = useState(false)
  const [ wait, setWait ] = useState(false)
  

  useEffect(()=> {
    if(score === 2 || score === 3 || score === 4 || score === 5 || score === 6 || score === 7 || score === 8 || score === 9){
      setNoteLength(noteLength + 1)
      console.log(`note length increased to ${noteLength + 1} next level ` )
    }
  }, [score])

  if(score === 10){
    context = null
  }

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
      let rand = Math.floor(Math.random() * NOTES.length)
      if(noteSequence.includes(rand)){
        x++
        continue
      }
      noteSequence.push(rand)
      
    }
    
    return noteSequence
  }
  
  const playNote =async ()=> {
    setWait(true)
   
      setStatus(false)
     setLevel(level + 1)
    setHidePlayButton(true)

    setMessage(`Which of this has the ${generateQuestion()} pitch?`)
    let delay = 0
    setPitchKey([])
    setPitchCards([])
    noteSequence = generateSequence()
      for(let x = noteLength-1; x >= 0; x--){

          setTimeout(()=> {
            if(!context) initializeAudio()
            const osc = context.createOscillator()
            const gainNode = context.createGain()

            osc.type = 'sawtooth'
            osc.frequency.value = NOTES[noteSequence[x]]


            gainNode.gain.setValueAtTime(1, context.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 5000);

            osc.connect(gainNode)
            gainNode.connect(context.destination)

            osc.start()
            osc.stop(context.currentTime + 600 / 1000)
            setPitchCards(prev => [...prev, parseInt(NOTES[noteSequence[x]])])
            
          }, delay)
          delay += 2000

      }

      setTimeout(()=> {
        setWait(false) 
        let noteCopy = noteSequence
        noteCopy.reverse()
        console.log(noteCopy)
      
      }, delay)
    
      
  }

  const checkAnswer =(e, index)=> {
    switch(question){
      case 'highest' : 
        if(pitchCards[index] === Math.max(...pitchCards)){
          console.log('Correct')
          setStatus('✅ Great!')
          setScore(score +1)
          setUserPoints(userPoints + 400)
        } else {
          console.log('Incorrect')
          setStatus('❌ Wrong')
        }
        break

      case 'lowest' : 
        if(pitchCards[index] === Math.min(...pitchCards)){
          console.log('Correct')
          setStatus('✅ Correct')
          setScore(score +1)
          setUserPoints(userPoints + 400)

        } else {
          console.log('Incorrect')
          setStatus('❌ Opppss')
        }
        break
    }
   
  }

  return (
    <div className='pitch-game-container fpage flex fdc aic jc-c'>
      <GameStatus score={score} userPoints={userPoints} level={level} />
      {status && status ? <h2 style={{textAlign: 'center'}}>{status}</h2> : null}
      {
        score < 10 ? 
        <div className='flex fdc'>
             <h2 style={{textAlign: 'center'}}>{message}</h2>
        <div>
            <div className='pitches flex fdr aic jc-c'>
              {
                pitchCards && pitchCards.length > 0 ? 
                pitchCards.map((note, index)=> (

                  <div className='pitchcards-container' key={index}>
                    <img className='pitchCards' width={100} src="https://i.ibb.co/QvndJW0S/R-1.png" alt="" 
                      onClick={(e)=> {
                        if(wait){
                          return false
                        }

                        checkAnswer(e, index)
                        setShowKey(true)
                        setTimeout(()=> {
                          playNote()
                          setShowKey(false)
                        }, 1500)
                      }}
                    />
                  </div>
                
                )) : null
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
          <PitchScore.Provider value={{score, setScore, level, setLevel, userPoints, setUserPoints}}><SecondPitchGame /></PitchScore.Provider>
        </div>
      }

      
         
     
    </div>
  )
}

export default PitchGame
