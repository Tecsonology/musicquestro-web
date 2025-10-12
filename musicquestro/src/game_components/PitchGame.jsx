import React, { useEffect,  } from 'react'
import { useParams } from 'react-router-dom';
import { useState, useContext, createContext} from 'react';
import SecondPitchGame from './SecondPitchGame';
import HighPitch from './HighPitch';
import GameStatus from '../game_components/GameStatus.jsx'
import lavaBtn from '../assets/game-assets/Assets/Buttons/LavaBtn.png'
import '../styles/PitchGame.css'
import hint from '../assets/game-assets/ItemAssets/hint.png'


import ItemHolder from '../components/ItemHolder.jsx';
import CountdownCircle from '../components/CountdownCircle.jsx';
import GamePrompt from '../mini-components/GamePrompt.jsx';
import { UserContext } from '../components/CurrentUserContext.jsx';
import CurrentUserContext from '../components/CurrentUserContext.jsx';
import PitchTutorial from './PitchTutorial.jsx';
import GameSummary from './GameSummary.jsx';
export const PitchScore = createContext()

const NOTES = [
  300, 350, 400, 450, 500, 600, 650, 700, 750, 800,
  850, 900, 950, 1000
];

function PitchGame() {

  const [start, setStart] = useState(false);
    const [ gameStatus, setGameStatus ] = useState("")
    const [ showHint, setShowHint ] = useState(false)
  
    const [showTutorial, setShowTutorial] = useState(true);
    const [life, setLife] = useState(5);
    const [savedSequence, setSavedSequence] = useState([]);
    const [correctIndex, setCorrectIndex] = useState(null);

    const [showSummary, setShowSummary] = useState(false);
  
    const { id } = useParams();
    const { currentUser } = useContext(UserContext);
    const [gameEnd, setGameEnd] = useState(false);
    const [currentNote, setCurrentNote] = useState('');
    const [sequence, setSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [showCorrection, setShowCorrection] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
  
    let countdownTimer = 30;
  
    const [currentRound, setCurrentRound] = useState(0);
    const [gameRound, setGameRound] = useState(0);
    const [running, setRunning] = useState();

  
    const [showAnswer, setShowAnswer] = useState(false);

  let context;
  let noteSequence = []

  const [ noteLength, setNoteLength ] = useState(0)
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

    const targetPoint = 55;


  useEffect(() => {
    if (currentRound > gameRound || gameEnd) {
      const timer = setTimeout(() => {
        setShowSummary(true);
        setGameStatus("Game Over")
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [gameRound, currentRound]);

  useEffect(() => {
    let answerKey = ""
      if(savedSequence){
        savedSequence.forEach((note, index)=> {
          answerKey += note + " ";
        })
      }
      
        if (answerKey.trim()) {
          currentRound > 0 ? console.log("Round", currentRound + " answer: ", answerKey.trim()) : null
      }

    }, [savedSequence]);
  

  useEffect(() => {
      if (id == 0) {
        setGameRound(5);
        setNoteLength(2)
      } else if (id == 1) {
        setShowTutorial(false);
        setGameRound(7);
        setNoteLength(3)
      } else if (id == 2) {
        setGameRound(10);
        setShowTutorial(false);
        setNoteLength(4)
      } else if (id == 3) {
        setGameRound(13);
        setNoteLength(5)
        setShowTutorial(false);
      } else if (id == 4) {
        setGameRound(10);
        setShowTutorial(false);
        setNoteLength(6)
      }

    }, [id, level, gameRound]);

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
    setShowHint(false)
    if(currentRound < gameRound ){
      setWait(true)
   
      setStatus(false)
    setCurrentRound(prev => prev + 1)
    setHidePlayButton(true)

    setMessage(`Which of these has the ${generateQuestion()} pitch?`)
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
        let noteCopy = [...noteSequence].reverse()
        setSavedSequence(noteCopy)
        console.log(noteCopy)

        setRunning(true)
        

      
      }, delay)

     
    } else {
      setMessage("Calculating game results...")
      setCurrentRound(prev => prev + 1)
    }
  }

  const replayNotes = async () => {
  if (!savedSequence || savedSequence.length === 0) {
    console.log("No notes to replay yet!");
    return;
  }

  setWait(true);
  setStatus(false);
  setMessage("🎵 Replaying notes...");

  let delay = 0;
  savedSequence.reverse()

  for (let x = savedSequence.length - 1; x >= 0; x--) {
    setTimeout(() => {
      if (!context) initializeAudio();

      const osc = context.createOscillator();
      const gainNode = context.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = NOTES[savedSequence[x]];

      gainNode.gain.setValueAtTime(1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 5000);

      osc.connect(gainNode);
      gainNode.connect(context.destination);

      osc.start();
      osc.stop(context.currentTime + 600 / 1000);
        }, delay);

        delay += 2000;

      }

      setTimeout(() => {
        savedSequence.reverse()
        setWait(false);
        setMessage(`Which of these has the ${question} pitch?`);
      }, delay);
    };






  //Answer checker
  const checkAnswer =(e, index)=> {
    let correctIdx;
    if(!wait){
      switch(question){
        case 'highest' : 
          correctIdx = pitchCards.indexOf(Math.max(...pitchCards));
          if(pitchCards[index] === Math.max(...pitchCards)){
            setStatus('✅ Great!')
            increaseScoreAndPoints()
          } else {
            setStatus('❌ Wrong')
            penalty()
          }
          break

        case 'lowest' : 
          correctIdx = pitchCards.indexOf(Math.max(...pitchCards));
          if(pitchCards[index] === Math.min(...pitchCards)){
            setStatus('✅ Correct')
            increaseScoreAndPoints()

          } else {
            setStatus('❌ Opppss')
            penalty()
          }
          break
      }
    } else if(wait) {
      console.log("waiting...")
    }

    setCorrectIndex(correctIdx);

   
  }

  
  


  //Game stats and status functions
  const increaseScoreAndPoints =()=> {
    setScore(score + 1)
    setUserPoints(userPoints + 400)
    
  }

  function setGameOver() {

    setShowSummary(true)
    setGameStatus("Game Over")
  }


  const useHint =()=> {
    setShowHint(true)
  }

  const useReplay =()=> {
    
      replayNotes()
  }

  const penalty =()=> {
    console.log('incorrect');
    setMessage(`💔 -1`)
    setLife(prev => prev - 1)
    setRunning(false)
    if(userPoints >= 50){
      setUserPoints(userPoints - 50)
    }
    
  }

  return (
    <div className='pitch-game-container fpage flex fdc aic jc-c'>
            <GameStatus gameStatus={gameStatus} score={score} userPoints={userPoints} currentRound={currentRound} level={gameRound} time={time} running={running} setRunning={setRunning} />
      {showTutorial ? (
        <PitchTutorial
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}

        />
      ) : (
        <GamePrompt gameName={'Echoic Cliff'} />
      )}
      {status && status ? <h2 style={{textAlign: 'center'}}>{status}</h2> : null}
      {
        start ?
            <div>
                {
                !showAnswer && !showCorrection ?
                <div className='flex fdc aic jc-c'>
                    {
                      !wait && 
                      (
                        <ItemHolder life={life} userContext={currentUser} useHint={useHint} useReplay={useReplay} running={running} setRunning={setRunning} children={
                          <div>
                            <CountdownCircle time={countdownTimer} running={running} setRunning={setRunning} onComplete={setGameOver}/>
                          </div>
                        }/>
                      )
                    }
                    <h2 style={{textAlign: 'center'}}>{message}</h2>
                <div>
                    <div className='pitches flex fdr aic jc-c'>
                      {
                        pitchCards && pitchCards.length > 0 ? 
                        pitchCards.map((note, index)=> (

                          <button
                            style={{ pointerEvents: !wait ? 'auto' : 'none', opacity: !wait ? 1 : 0.5 }}
                            onClick={(e) => {
                              checkAnswer(e, index);
                              setShowKey(true);
                              setShowAnswer(true)
                              
                            }}
                            className='pitchcards-container flex fdc aic jc-c'
                            key={index}
                          >
                            <h2>?</h2>
                          </button>

                        
                        )) : <h1></h1>
                      }
                  </div>

              
                </div>

              
                { inputSequence && inputSequence.length >= 0?
                  inputSequence.map((note, index)=> (
                    <span key={index}>{note}</span>
                  ))
                  : null
                }
              

                </div> : 
                !showCorrection &&
                (
                   <>
                  <div className="roundAnswer flex fdc aic jc-c">

                            <div className='pitches flex fdr aic jc-c'>
                              {
                                pitchCards && pitchCards.length > 0 ? 
                                pitchCards.map((note, index)=> (

                                  <button
                                    style={{ pointerEvents: !wait ? 'auto' : 'none', opacity: !wait ? 1 : 0.5 }}
                                    onClick={(e) => {
                                      
                                      
                                    }}
                                    className='pitchcards-container flex fdc aic jc-c'
                                    key={index}
                                  >
                                    <h2>{note}</h2>
                                  </button>

                                
                                )) : null
                              }
                          </div>

                            <button
                              onClick={() => {
                              setTimeout(() => {
                                playNote();
                                setShowKey(false);
                              }, 0);

                              setShowAnswer(false)

                              }}

                              style={{
                                backgroundColor: 'red',
                                fontSize: '1.5em',
                                padding: '0.5em 1em'
                              }}
                              
                              className="reset-button"
                            >
                              Next
                            </button>
                          </div>
                </>
                )

               
                
              
              }
          </div> : 
          <button className='pitch-start-btn' onClick={()=> {
            setStart(true)
            setShowAnswer(false)
            playNote()
          }}>Start</button>
      }

      {
        showHint &&  
        (
          <div className='flex fdr aic' style={{position: 'fixed', color: 'white', padding: '1em', backgroundColor: 'rgba(30, 158, 1, 0.25)', 
                  borderRadius: '10px', marginBottom: '1em', bottom: '1em', width: '90%', justifyContent: 'space-evenly', }}>
                    <div className='flex fdr aic jc-c' style={{position: 'absolute', 
                      top: '-2em', left: '1em', backgroundColor: '#344', padding: '0 1em', borderRadius: '1em', border: '2px solid yellow'}}>
                      <img style={{backgroundColor: 'rgba(68, 68, 85, 0.97)', padding: '0.5em', borderRadius: '50%', }} width={30} src={hint} alt="" />
                      <h3 style={{color: 'white'}}>Hint</h3>
                    </div>
                    <div className='flex fdc aic'>
                      <h6>Corresponding frequency:</h6>
                      <div className='flex fdr aic jc-c'>
                        {
                          pitchCards && pitchCards.length > 0 ? 
                             pitchCards.map((note, index)=> (
                                    <p key={index} style={{margin: '0 0.5em'}}>{note} hz</p>
                                )) : null
                              }
                      </div>
                    </div>
                  </div>
        )
      }

      {showSummary ? (
          <CurrentUserContext>
            <GameSummary
              userids={currentUser.userids}
              level={parseInt(id)}
              gameName={'pitch'}
              score={score}
              points={userPoints}
              time={time}
              targetPoint={targetPoint}
              nextGameIndex={4}
            />
          </CurrentUserContext>
        ) : null}

      
         
     
    </div>
  )
}

export default PitchGame
