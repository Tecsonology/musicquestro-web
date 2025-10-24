import React, { useState, useReducer, useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameStatus from './GameStatus';
import GamePrompt from '../mini-components/GamePrompt';
import GameSummary from './GameSummary';
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext';
import '../styles/RhythmGame.css'
import RhythmTutorial from './RhythmTutorial';
import CountdownCircle from '../components/CountdownCircle.jsx'
import ItemHolder from '../components/ItemHolder.jsx';
import hint from '../assets/game-assets/ItemAssets/hint.png'
import LevelInfo from '../components/LevelInfo.jsx';

import whole from '../assets/rhythmnotes/WholeNote.png'
import half from '../assets/rhythmnotes/HalfNote.png'
import quarter from '../assets/rhythmnotes/QuarterNote.png'
import rest from '../assets/rhythmnotes/RestNote.png'


const durations = [
  { name: "rest", beats: 1, duration: 600, freq: 0, img: rest },
  { name: "quarter", beats: 1, duration: 600, freq: 600, img: quarter },
  { name: "half", beats: 2, duration: 1200, freq: 600, img: half },
  { name: "whole", beats: 4, duration: 2400, freq: 600, img: whole },
  
];

function RhythmGame() {

  const [ start, setStart ] = useState(false)
  const [ gameStatus, setGameStatus ] = useState("")
 
  const [ life, setLife ] = useState(5)
  const [showSummary, setShowSummary] = useState(false);

  const { id} = useParams()
  const { currentUser } = useContext(UserContext)
  const [ gameEnd, setGameEnd ] = useState(false)
  const [currentNote, setCurrentNote] = useState('');
  const [ message, setMessage ] = useState()
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);
  const [score, setScore] = useState(0); 
  const [userPoints, setUserPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [ running, setRunning ] = useState(false)
  const [level, setLevel] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [ wait, setWait ] = useState(false)
  const [ showTutorial, setShowTutorial ] = useState(true);
  const [ gameRound, setGameRound ] = useState(0)
  const [ currentRound, setCurrentRound ] = useState(0)
  const [ showCorrection, setShowCorrection ] = useState(false)
  const [ showNextButton, setShowNextButton ] = useState(false)
  const [ countdownTimer, setCountdownTimer ] = useState(30)
  
  const [revealedNotesCount, setRevealedNotesCount] = useState(0); 
  
  let currentLevel = 0
  
  const targetPoint = 55;

    const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  let oscType;

  useEffect(() => {
       if (currentRound > gameRound || gameEnd) {
         const timer = setTimeout(() => {
           setShowSummary(true);
         }, 4000);
     
         return () => clearTimeout(timer);
       }
     }, [gameRound, currentRound]);

  
useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running]); // ✅ only restart when running changes

  useEffect(()=> {

    if(id == 0){
      setGameRound(5)
      setCountdownTimer(30)
    } else if(id == 1){
      setShowTutorial(false)
      setGameRound(5)
      setCountdownTimer(25)
    } else if(id == 2){
      setGameRound(5)
      setShowTutorial(false)
      setCountdownTimer(20)
    } else if(id == 3){
      setGameRound(5)
      setCountdownTimer(15)
      setShowTutorial(false)
    } else if(id == 4){
      setCountdownTimer(12)
      setGameRound(5)
      setShowTutorial(false)
    }

    if(level > gameRound){
      stopTime()
    }

  }, [id, level, gameRound])

  useEffect(()=> {
    if(level >= gameRound || gameEnd){
      stopTime()
    }

   


    

  
  }, [level] )


  useEffect(() => {
    if (life <= 0) {
      const timeout = setTimeout(setGameOver, 2000);
      return () => clearTimeout(timeout);
    }
  }, [life]);


  useEffect(()=> {
    if(currentUser && currentUser.admin){
      let answerKey = ""
      if(sequence){
        sequence.map((note, index)=> {
          answerKey += note.name + " "
        })
      }
      answerKey ? console.log("Round",currentRound +" answer: ", answerKey ) : null
    }
  }, [sequence])



  if(currentUser){
    oscType = currentUser.currentInstrument
    currentLevel = currentUser.maps.rhythm.levels.length
    
  }

  

     const startTime = () => {
     if (intervalRef.current) return;
     intervalRef.current = setInterval(() => {
       setTime(prev => prev + 1);
     }, 1000);
   };

   const stopTime = () => {
     clearInterval(intervalRef.current);
     intervalRef.current = null;
   };




   const playNote = (freq, duration) => {
     
     if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
       audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
     }

     const context = audioCtxRef.current;
     if (context.state === 'suspended') {
       context.resume();
     }

     const osc = context.createOscillator();
     const gainNode = context.createGain();

     osc.type = oscType;
     osc.frequency.value = freq;

     gainNode.gain.setValueAtTime(1, context.currentTime);
     gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration / 1000);


     osc.connect(gainNode);
     gainNode.connect(context.destination);

     osc.start();
     osc.stop(context.currentTime + duration / 1000);
   };

   const generateRandomSequence = () => {
   let totalBeats = 0;
   const selected = [];



   const nonRestOptions = durations.filter(note => note.name !== "rest" && note.beats <= (4 - totalBeats));
   const firstNote = nonRestOptions[Math.floor(Math.random() * nonRestOptions.length)];
   selected.push(firstNote);
   totalBeats += firstNote.beats;


   while (totalBeats < 4) {
     const options = durations.filter(note => note.beats <= (4 - totalBeats));
     const randomNote = options[Math.floor(Math.random() * options.length)];
     selected.push(randomNote);
     totalBeats += randomNote.beats;
   }

   return selected;
};

   const playSequence = () => {
     
     if(currentRound < gameRound){
// START MODIFIED
      setRunning(true)
      setShowCorrection(false)
      setRevealedNotesCount(0); // Reset revealed notes count for a new round
      startTime();
// END MODIFIED

     const rhythm = generateRandomSequence();
     setSequence(rhythm);
     setIsPlaying(true);
     setInputSequence([]);
     setCurrentNote('...');
     setCurrentBeat(0);

     setTimeout(() => {
       setCurrentNote(rhythm.map(n => n.name).join(' - '));


       let delay = 0;
       rhythm.forEach(note => {
         setTimeout(() => {
           playNote(note.freq, note.duration);
         }, delay);
         delay += note.duration;
       });
       
       let beat = 0;
       const beatInterval = setInterval(() => {
         beat += 1;
         setCurrentBeat(beat);
         if (beat >= 4) {
           clearInterval(beatInterval);
           setTimeout(() => {
             setCurrentBeat(0);
             setIsPlaying(false);
             setCurrentNote('');
             setWait(true)
           }, 600);
         }
         
       }, 400);
       
     }, 2000);

     setLevel(prev => prev + 1);
     setCurrentRound( prev => prev + 1)
     } else {
       setMessage("Game Complete")
       setShowSummary(true)
     }

     
     
     
   };


   const pushInput = (note) => {
     setInputSequence(prev => [...prev, note]);
   };

   const playBeatAgain =()=> {

     setWait(false)
     setTimeout(() => {
   
       let delay = 0;
       let beat = 0;

       sequence.forEach(note => {
         setTimeout(() => {
           playNote(note.freq, note.duration);
         }, delay);
         delay += note.duration;
       });

      
       const beatInterval = setInterval(() => {
         beat += 1;
         setCurrentBeat(beat);
         if (beat >= 4) {
           clearInterval(beatInterval);
           setTimeout(() => {
             setCurrentBeat(0);
             setIsPlaying(false);
             setCurrentNote('');
           }, 600);  
           setWait(true)
         }
       }, 400);
     }, 0); 
     
   }

   const playInputSequence = () => {
   if (!inputSequence || inputSequence.length === 0) {
     setMessage('No notes to play!');
     return;
   }

   let delay = 0;
   let beat = 0;

   inputSequence.forEach(note => {
     setTimeout(() => {
       playNote(note.freq, note.duration);
     }, delay);
     delay += note.duration;
   });

   const beatInterval = setInterval(() => {
     beat += 1;
     setCurrentBeat(beat);
     if (beat >= 4) {
       clearInterval(beatInterval);
       setTimeout(() => {
         setCurrentBeat(0);
       }, 600);
     }
   }, 400);
};

   if(inputSequence.length > 4){
     setInputSequence([])
   }

   const increaseScoreAndPoints =()=> {
     setScore(score + 1)
     setUserPoints(userPoints + 400)
     
   }


   function setGameOver() {
     console.log("Game over!!!!")
     setShowSummary(true)
     setGameStatus("Game Over")
     
   }


// START MODIFIED useHint
   const useHint =()=> {
     if (revealedNotesCount < sequence.length) {
       setRevealedNotesCount(prev => prev + 1);
     } else {
       alert("The hints are all in. Used them!")
       document.getElementById("hint-spell").style.display = 'none' 
       document.getElementById("replay-spell").style.display = 'none' 
     }
   }
// END MODIFIED useHint

   const useReplay =()=> {
      playBeatAgain()
   }

   const penalty =()=> {
     console.log('incorrect');
     setMessage(`-1💔`)
     setLife(prev => prev - 1)
     setRunning(false)
     if(userPoints >= 50){
       setUserPoints(userPoints - 50)
     }
     setShowCorrection(true)
   }

  // Helper to determine what to show in the input area
  const currentInputSequence = wait && !showCorrection && sequence.length > 0 && revealedNotesCount > 0
    ? inputSequence.length < revealedNotesCount 
      ? sequence.slice(0, revealedNotesCount) // Show hint if user hasn't input up to the hint count
      : inputSequence
    : inputSequence;


   return (
     <div className='rhythm-game-container fpage flex fdc aic'>
       { showTutorial ? (<RhythmTutorial setShowTutorial={setShowTutorial}/>) : <GamePrompt gameName={'Rhythmic Ruins'}/>}

        {
// START MODIFIED ItemHolder condition for revealing hint
         wait && !showCorrection ?
         
         <ItemHolder life={life} userContext={currentUser} useHint={useHint} useReplay={useReplay} running={running} setRunning={setRunning} children={
           <div>
             <CountdownCircle time={countdownTimer} running={running} setRunning={setRunning} onComplete={setGameOver}/>
           </div>
         }/>
           : null
// END MODIFIED ItemHolder condition

       }
        
       <GameStatus showSummary={showSummary} score={score} userPoints={userPoints} 
       currentRound={currentRound} level={gameRound} time={time} 
       running={running} setRunning={setRunning} gameStatus={gameStatus} setGameStatus={setGameStatus}/>
       
        <div className='flex fdc aic' style={{marginTop: '6em'}}>
          {
        start ?
        <div style={{justifyContent: 'flex-start'}} className='flex fdc aic'>
          { message && message ? <h1 style={{textAlign: 'center', marginTop: '2em'}}>{message && message ? message : null}</h1> : null}
      { !showCorrection && inputSequence.length <= 0 && revealedNotesCount === 0 ? <h2 style={{fontWeight: 'bolder'}}><strong>{currentNote ? '👂 Listen to the rhythm...' : null  || "🫵 Your turn"}</strong></h2> : null}

      {
        !showCorrection ? 
          <div className="beat-indicator flex fdr jc-c aic" style={{ margin: '1em 0 0 0' }}>

        {[1, 2, 3, 4].map((beat) => (
          <div
          className='flex fdr aic jc-c'  
            key={beat}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              margin: '0 10px',
              backgroundColor: beat === currentBeat ? 'green' : '#ccc',
              transition: 'background-color 0.2s ease',
              animation: beat === currentBeat ? "bounce 0.6s ease-out infinite" : "none",
            }}
          >
            <span style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
              {beat}
            </span>
          </div>
        ))}


      </div> : null
      }

      {
        inputSequence && inputSequence.length > 0 && !showCorrection?
        <div className="input-notes">
        <hr /><hr /><hr /><hr /><hr />
        <div className='input-overlay flex fdr aic'>
          { 
            inputSequence.map((note, index) => (
              <img 
              style={{
                width: note.name === 'whole' ? '3em' : '1.2em'
              }}
              key={index} className='inputNote'  src={note.img} alt="" />
            ))
          }
        {inputSequence && inputSequence.length > 0  && wait ? 
          <button style={{
            margin: '0', backgroundColor: 'black', position: 'absolute', top: '4.5em', left: '15em',
            border: '1px solid white', padding: '0.4em'
            }} onClick={()=> { setInputSequence([])}}>Reset</button> : null}

        </div>

      </div> : null
      }

      

      
      
      {
        showCorrection ? 
        <div style={{backgroundColor: 'white', color: 'black', padding: '0.5em 1em', width: '20em'}} className='flex fdc aic jc-c'>
          <h2 style={{color: 'black'}}>Correct Answer</h2>
          <div className='flex fdr aic jc-c'>
            {
              level  && showCorrection ? 
              sequence.map((note, index)=> {
              
                return (
                
                    <img
                      style={{
                        backgroundColor: '#342',
                        margin: '0 0.5em',
                        padding: '0.3em',
                        borderRadius: '1em',
                        cursor: 'pointer'
                      }}
                    onClick={()=> { playBeatAgain()}} key={index} width={30} src={note.img} alt="" />
                  
                )
              }) : null
            }
          </div>

          

          <div className='flex fdc aic'>
            <p style={{color: 'black'}}>Your answer:</p>
            <div className='flex fdr aic jc-c'>
              { 
                inputSequence.map((note, index) => (
                  <img style={{margin: '0.5em'}} key={index} width={15} src={note.img} alt="" />
                ))
              }
            </div>
          </div>

          
          
            
            <button disabled={showNextButton} className='nextBtn' onClick={()=> {
              
              playSequence();
              setMessage()
            
            
            setInputSequence([]);
            setWait(false)
            }}>NEXT RHYTHM</button> 
          

        </div> : 
        null

      }

      {
        showNextButton ? 
          <button  className='nextBtn' onClick={()=> {
              playSequence();
              setMessage()
            
            
            setInputSequence([]);
            setWait(false)
            setShowNextButton(false)
          }}>Next</button> : null
      }
        
      {
        wait && !showCorrection  ? 
        <div style={{margin: 0, padding: 0}} className='flex fdc aic jc-c'>
          
      <div className="beat-buttons flex fdr jc-c aic">
        {
          durations.map((note, index) => (
            <button  className='btnButton' key={index} onClick={() => {
              pushInput(note);
              playNote(note.freq, note.duration);
            }}>
              <span><img width={15} src={note.img} alt="" /></span>
              <h4 style={{margin: 0, color: 'black'}}>{note.name}</h4>
              
            </button>
          ))
        }
      </div>

      <div className='bottom-buttons flex fdc aic jc-c'>
            <button id='playRhythm'
            style={{
              
              width: '10em',
              backgroundColor: 'orange',
              fontSize: '1.4em',
              padding:'0.6em 1em',
              borderBottom: '4px solid rgba(246, 7, 7, 1)',
              fontWeight: 'bolder'
            }}
            onClick={() => {
// START MODIFIED CHECK
            // Check if the input sequence matches the correct sequence starting from the first non-hint note
            const checkSequence = sequence.slice(revealedNotesCount);
            const checkInput = inputSequence.slice(revealedNotesCount);

            if (checkSequence.length === checkInput.length && JSON.stringify(checkSequence) === JSON.stringify(checkInput)) { 
               
              increaseScoreAndPoints()
              
              setWait(false)
              setMessage('✅ Great')
              setShowNextButton(true)
            } else {
              penalty()
            }
            setRevealedNotesCount(0); // Reset hint state after composition attempt
// END MODIFIED CHECK

          }}>
            Compose
          </button>

          
      </div>
        </div> : null
      }

        </div> :
        <>
            { currentUser ? level && level && level >= 0 ? null : 
            <>
            <LevelInfo targetPoint={targetPoint} countdownTimer={countdownTimer} gameRound={gameRound}/>
              <button id='btnStartRhythm' onClick={()=>{
              playSequence()
              setRunning(true)
              setStart(true)
            }}>START</button>
            </>
            
            : 'Loading...' }
        </>
        }
        </div>

      {showSummary ? (
          <CurrentUserContext>
            <GameSummary
              userids={currentUser.userids}
              level={parseInt(id)}
              gameName={'rhythm'}
              score={score}
              points={userPoints}
              MAX_SCORE={gameRound}
              MAX_POINTS={400*gameRound}
              VICTORY_THRESHOLD={targetPoint}
              nextGameIndex={1}
            />
          </CurrentUserContext>
        ) : null}

        { wait && revealedNotesCount > 0 && !showCorrection && 
        <div className='flex fdr aic' style={{position: 'fixed', color: 'white', padding: '1em', backgroundColor: 'rgba(30, 158, 1, 0.25)', 
        borderRadius: '10px', marginBottom: '1em', bottom: '1em', width: '90%', justifyContent: 'space-evenly', }}>
          <div className='flex fdr aic jc-c' style={{position: 'absolute', 
            top: '-2em', left: '1em', backgroundColor: '#344', padding: '0 1em', borderRadius: '1em', border: '2px solid yellow'}}>
            <img style={{backgroundColor: 'rgba(68, 68, 85, 0.97)', padding: '0.5em', borderRadius: '50%', }} width={30} src={hint} alt="" />
            <h3 style={{color: 'white'}}>Hint</h3>
          </div>
          <div className='flex fdr aic'>
            {
              sequence.slice(0, revealedNotesCount).map((note, index) => (
                <img key={`hint-${index}`} width={20} src={note.img} alt="" style={{margin: '0 5px'}} />
              ))
            }
            {
              sequence.slice(revealedNotesCount).map((_, index) => (
                <span className='flex fdc aic jc-c' key={`blank-${index}`} style={{width: '2em', height: '2em', backgroundColor: 'gray', margin: '0 5px', borderRadius: '5px',}}>?</span>
              ))
            }
          </div>
        </div>
      }
        

    </div>
    
  );
}

export default RhythmGame;