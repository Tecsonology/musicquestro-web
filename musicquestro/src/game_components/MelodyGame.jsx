import React, { useState, useEffect, useRef, useContext } from 'react';
import '../styles/GameStyles.css';
import GameSummary from './GameSummary';
import GameStatus from './GameStatus';
import GamePrompt from '../mini-components/GamePrompt';
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext';
import { useParams } from 'react-router-dom';
import PauseGame from '../mini-components/PauseGame';
import ItemHolder from '../components/ItemHolder.jsx';
import CountdownCircle from '../components/CountdownCircle.jsx';
import hint from '../assets/game-assets/ItemAssets/hint.png'


const notesMap = {
  DO: 261.63,
  RE: 293.66,
  MI: 329.63,
  FA: 349.23,
  SO: 392.00,
  LA: 440.00,
  TI: 493.88,
};

const noteNames = Object.keys(notesMap);

function MelodyGame() {

  const [revealedNotesCount, setRevealedNotesCount] = useState(0);
  const { id } = useParams()
  const [showSummary, setShowSummary] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [melody, setMelody] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [result, setResult] = useState('');
  const [noteLength, setNoteLength] = useState(1);
  const [score, setScore] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState('Listen to the melody and match the notes!');
  const [wait, setWait] = useState(false);
  const [ gameRound, setGameRound ] = useState()
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [ showTutorial, setShowTutorial ] = useState(true);
  
  
  const [ gameStatus, setGameStatus ] = useState("")
  const [ life, setLife ] = useState(5)
  const [ running, setRunning ] = useState(false)
  const [ gameEnd, setGameEnd ] = useState(false)
  const [ currentRound, setCurrentRound ] = useState(0)

  const [ showAnswer, setShowAnswer ] = useState(false)
  
  

  let currentLevel = 0
  let countdownTimer = 120
  const targetPoint = 30;

  useEffect(() => {
        if (currentRound > gameRound || life <= 0) {
          const timer = setTimeout(() => {
            setShowSummary(true);
            
          }, 4000);
      
          return () => clearTimeout(timer);
        }
  }, [gameRound, currentRound]);

  function setGameOver() {
    setShowSummary(true)
    setGameStatus("Game Over")
  }

  const stopTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  

  useEffect(()=> {
  
      if(id == 0){
        setGameRound(5)
      } else if(id == 1){
        setShowTutorial(false)
        setGameRound(7)
      } else if(id == 2){
        setGameRound(8)
        setShowTutorial(false)
      } else if(id == 3){
        setGameRound(9)
        setShowTutorial(false)
      } else if(id == 4){
        setGameRound(10)
        setShowTutorial(false)
      }
  
      if(level > gameRound){
        stopTime()
      }
  
    }, [id, level, gameRound])
  
  useEffect(() => {
    if(id == 0){
      setNoteLength(1)
    } else if(id == 1){
      setNoteLength(2)
    } else if(id == 2){
      setNoteLength(3)
    } else if(id == 3){
      setNoteLength(4)
    } else if(id == 4){
      setNoteLength(5)
    }

    if(level > 5){
      stopTime()
    }
  }, [id]);

  useEffect(()=> {
      let answerKey = ""
      if(melody){
        melody.map((note, index)=> {
          answerKey += note + " "
        })
      }
      answerKey ? console.log("Round",currentRound +" answer: ", answerKey ) : null
    }, [melody])


  useEffect(() => {
    if (userInput.length > 6) setUserInput([]);
  }, [userInput]);

  const playNote = (freq, duration = 3000) => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const context = audioCtxRef.current;
    if (context.state === 'suspended') {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = currentUser?.currentInstrument || 'sine';
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + duration / 1000);
  };

  const playMelody = async () => {
    setCurrentRound(prev => prev + 1)
    setWait(false);
        setRevealedNotesCount(0); // Reset hint count for the new round


    const newMelody = Array.from({ length: noteLength }, () =>
      noteNames[Math.floor(Math.random() * noteNames.length)]
    );

    setMelody(newMelody);
    setUserInput([]);
    setResult('');
    setMessage('Listen...');
    setLevel(prev => (prev !== null ? prev + 1 : 1));

    for (const note of newMelody) {
      playNote(notesMap[note]);
      await new Promise(res => setTimeout(res, 700));
    }

    setWait(true);
    setMessage('Show what you listen');
    setRunning(true)
  };

  const handleNoteClick = (note) => {
    playNote(notesMap[note]);
    setUserInput(prev => [...prev, note]);
  };

  const releaseNotes = () => {
    setWait(false)
    
    // Adjusted logic to check for correctness while accounting for hints
    const isCorrect = userInput.length === melody.length && 
      userInput.every((n, i) => {
        if (i < revealedNotesCount) {
          // If the note was hinted, only check if the input matches
          return n === melody[i];
        }
        // For non-hinted notes, check against the melody
        return n === melody[i];
      });

    if (isCorrect) {
      increaseScoreAndPoints()
      setMessage("✅ Correct");
    } else {
      setMessage(`❌ Wrong, it's ${melody.join(' ')}`);
      penalty()
    }

    // Reset hint state after composition attempt
    setRevealedNotesCount(0); 

   
  };


  const playAgain = async () => {
    setWait(false);
    for (const note of melody) {
      playNote(notesMap[note]);
      await new Promise(res => setTimeout(res, 700));
    }
    setUserInput([]);
    setWait(true);
  };

  const listenMode = () => {
    return !wait && !showAnswer ? <img width={300} src='https://i.ibb.co/rRvk4jHQ/Untitled-design-4-removebg-preview.png' alt="Listen mode" /> : null;
  };

  const increaseScoreAndPoints =()=> {
    setScore(score + 1)
    setUserPoints(userPoints + 400)
    
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


  //Item Functions

  const useHint =()=> {
     if (revealedNotesCount < melody.length) {
        setRevealedNotesCount(prev => prev + 1);
      } else {
         alert("The hints are all in. Used them!")
        document.getElementById("hint-spell").style.display = 'none' 
        document.getElementById("replay-spell").style.display = 'none' 
      }
   
  }

  const displayedInput = () => {
    if (revealedNotesCount > 0) {
      const revealed = melody.slice(0, revealedNotesCount).join(' ');
      const hiddenCount = melody.length - revealedNotesCount;
      const hidden = Array(hiddenCount).fill('?').join(' ');
      
      return `${revealed} ${hidden}`.trim();

    }
    return userInput.join(' ');
  };

  const useReplay =()=> {
       playAgain();
       
  }

  let answerKey

  

  return (
    <CurrentUserContext>
      <div className='melody-game-container fpage flex fdc aic jc-c'>
        <GamePrompt gameName={'MELODIC PEAK'}/>
        <GameStatus score={score} userPoints={userPoints} level={gameRound} time={time} 
        currentRound={currentRound} running={running} 
        setRunning={setRunning} gameStatus={gameStatus} setGameStatus={setGameStatus}/>
        { wait ? 
        <ItemHolder life={life} userContext={currentUser} useHint={useHint} useReplay={useReplay} running={running} setRunning={setRunning} children={
          <div>
            <CountdownCircle time={countdownTimer} running={running} setRunning={setRunning} onComplete={setGameOver}/>
          </div>
        }/>
         : null}

          

          <div className='flex fdc aic jc-c' style={{marginTop: '5em',}}>
           { userInput.length <= 0 &&  <h2 style={{textAlign: 'center', position: 'relative'}}>{message}</h2>}
        {listenMode()}

        { level < 1 ? <button onClick={playMelody} style={{fontSize: '1.5em', background: 'green' }}>Let's Begin!</button> : null}

       {
          !showAnswer &&
         <h2 style={{margin: '0 0 0.4em 0', textAlign: 'center', 
          backgroundColor: userInput.length > 0 ? '#0000005c' : 'transparent', border: userInput.length > 0 ? '3px solid white' : '0px solid white', 
          borderRadius: '3em', padding: '0.2em 0.4em'}}>{userInput.join(' ')}</h2>
       }
 
        {wait && (
          <div style={{position: 'relative'}} className='m-btn-container glass-bg'>
            <div className='melody-wrapper flex fdr jc-c aic'>
              {noteNames.map(note => (
                <button
                  key={note}
                  onClick={() => handleNoteClick(note)}
                  style={{
                    margin: '5px',
                    padding: '10px 20px',
                    fontSize: revealedNotesCount > 0  ? '1em' : '2em',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {note}
                </button>
              ))}
            </div>

            <div className="lower-buttons">
              <button style={{width: '10em', backgroundColor: 'orange'}} onClick={
                ()=> {
                  setShowAnswer(true)
                  setWait(false)
                  releaseNotes()
                  
                }
              }>Compose</button>
              <button onClick={() => {
                setUserInput([])
                if (userPoints > 0) setUserPoints(prev => prev - 5);
              }} style={{ marginLeft: '1em', color: 'white' }}>Clear</button>
            </div>
          </div>
        )}

        {
          showAnswer ?
          <>
             
            <div style={{padding: '1em'}} className='glass-bg flex fdc aic jc-c'>
              <h3 style={{color: 'white'}}>Correct Answer</h3>
              <div className="flex fdr aic jc-c">
                 {
               melody.map((note, index) => {
                    answerKey += note + " ";
                    return <div style={{
                      padding: '1em',
                      backgroundColor: 'rgba(1, 43, 1, 1)',
                      margin: '0 0.5em'
                    }} key={index}>
                      <h4>{note}</h4>
                    </div>;
                  })
                }
              </div>

              <p>Your Answer</p>
                <h4 style={{color: 'black', margin: 0}}>{userInput.join(' ')}</h4>
            </div>


            <button style={{width: '100%', backgroundColor: 'green'}} onClick={()=> {
              setShowAnswer(false)
              playMelody()
            }}>Next Melody</button>
          </> : null
        }

         { wait && revealedNotesCount > 0  && 
                <div className='flex fdr aic' style={{position: 'relative', color: 'white', padding: '1em', backgroundColor: 'rgba(30, 158, 1, 0.25)', 
                borderRadius: '10px', width: '90%', marginTop: '31.000.0.005em', justifyContent: 'space-evenly', }}>
                  <div className='flex fdr aic jc-c' style={{position: 'absolute', 
                    top: '-2em', left: '1em', backgroundColor: '#344', padding: '0 1em', borderRadius: '1em', border: '2px solid yellow'}}>
                    <img style={{backgroundColor: 'rgba(68, 68, 85, 0.97)', padding: '0.5em', borderRadius: '50%', }} width={30} src={hint} alt="" />
                    <h3 style={{color: 'white'}}>Hint</h3>
                  </div>
                  <div className='flex fdr aic'>
                     <h3 style={{margin: '0 0 0.4em 0', textAlign: 'center', 
                        backgroundColor: (userInput.length > 0 || revealedNotesCount > 0) ? '#0000005c' : 'transparent', 
                        padding: '1em',
                        color: 'white'
                        }}>
                        {wait ? displayedInput() : userInput.join(' ')}
                      </h3>
                  </div>
                </div>
          }
     
       {showSummary ? (
          <CurrentUserContext>
            <GameSummary
              userids={currentUser.userids}
              level={parseInt(id)}
              gameName={'melody'}
              score={score}
              points={userPoints}
              time={time}
              targetPoint={targetPoint}
              nextGameIndex={2}
            />
          </CurrentUserContext>
        ) : null}
          </div>
      </div>
    </CurrentUserContext>
  );
}

export default MelodyGame;
