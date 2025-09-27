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

const durations = [
  { name: "rest", beats: 1, duration: 600, freq: 0, img: 'https://i.ibb.co/67NSSxxn/Untitled-design-74.png' },
  { name: "quarter", beats: 1, duration: 600, freq: 500, img: 'https://i.ibb.co/WqXZ1fd/Untitled-design-71.png' },
  { name: "half", beats: 2, duration: 1200, freq: 500, img: 'https://i.ibb.co/gnXRSb1/Untitled-design-75.png' },
  { name: "whole", beats: 4, duration: 2400, freq: 500, img: 'https://i.ibb.co/zC0gwgG/Untitled-design-77.png' },
  
];

const inititalState = {
  score: 0,
  userPoints: 0,
  level: 0
}

const reducer = (state, action) => {
  switch(action.type) { 
    case 'increase-score': return {score: state.score + 1}
    case 'increase-level': return { level: state.level + 1}
    case 'add-user-points': return { userPoints: state.userPoints + action.points}
  }
}

let totalBeats = 0
const sample = durations.filter(note => note.name !== 'rest' && note.beats <= (4 - totalBeats))


function RhythmGame() {
  const { id} = useParams()
  const { currentUser } = useContext(UserContext)
  const [ gameEnd, setGameEnd ] = useState(false)
  const [ state, dispatch ] = useReducer(reducer, inititalState)
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
  const [ showCorrection, setShowCorrection ] = useState(false)
  const [ showNextButton, setShowNextButton ] = useState(false)
  
  let currentLevel = 0
  let countdownTimer = 1000
  const targetPoint = 55;

    const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  let oscType;

  
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
    } else if(id == 1){
      setShowTutorial(false)
      setGameRound(7)
    } else if(id == 2){
      setGameRound(10)
      setShowTutorial(false)
    } else if(id == 3){
      setGameRound(13)
      setShowTutorial(false)
    } else if(id == 4){
      setGameRound(2)
      setShowTutorial(false)
    }

    if(level > gameRound){
      stopTime()
    }

  }, [id, level, gameRound])





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

  const playSequence = (seq) => {
    setRunning(true)
    setShowCorrection(false)
    startTime();
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

  if(inputSequence.length > 4){
    setInputSequence([])
  }

  const increaseScoreAndPoints =()=> {
    setScore(score + 1)
    setUserPoints(userPoints + 400)
    
  }

  function setGameOver() {
    setGameEnd(true)
  }


  const useHint =()=> {
     setShowCorrection(true)
  }

  const useReplay =()=> {
      playBeatAgain()
  }

  return (
    <div className='rhythm-game-container fpage flex fdc jc-c aic'>
      { showTutorial ? (<RhythmTutorial setShowTutorial={setShowTutorial}/>) : <GamePrompt gameName={'Rhythm Idol'}/>}
       
      <GameStatus score={score} userPoints={userPoints} level={gameRound} time={time} running={running} setRunning={setRunning} />
      {
        wait && !showCorrection ?
        <div style={{margin: '5em'}}>
        <ItemHolder userContext={currentUser} useHint={useHint} useReplay={useReplay} running={running} setGameOver={setGameOver} setRunning={setRunning} children={
          <div>
            <CountdownCircle time={countdownTimer} running={running} setRunning={setRunning} onComplete={setGameOver}/>
          </div>
        }/>
      </div> : ""
      }

      <h2 style={{fontWeight: 'bolder'}}><strong>{currentNote ? 'Listen to the rhythm...' : null  || "Listen carefully..."}</strong></h2>

     {
        !showCorrection ? 
         <div className="beat-indicator flex fdr jc-c aic" style={{ margin: '0' }}>
      {inputSequence && inputSequence.length > 0 ? <button style={{margin: '0', backgroundColor: 'transparent'}} onClick={()=> { setInputSequence([])}}>Clear</button> : null}

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


      { currentUser ? level && level && level >= 0 ? null : <button id='btnStartRhythm' onClick={()=>{
        playSequence()
        setRunning(true)
      }}>I'm Ready. Lez go!</button> : 'Loading...' }
  

      {
        inputSequence && inputSequence.length > 0 ?
        <div className="input-notes">
        <hr /><hr /><hr /><hr /><hr />
        <div className='input-overlay flex fdr aic'>
          { 
            inputSequence.map((note, index) => (
              <img key={index} className='inputNote' width={20} src={note.img} alt="" />
            ))
          }
        </div>
      </div> : null
      }

      { message && message ? <h1 style={{textAlign: 'center'}}>{message && message ? message : null}</h1> : null}
      
      {
        showCorrection ? 
        <div style={{position:'absolute', zIndex: '0', backgroundColor: 'white', color: 'black', padding: '0.5em 1em', width: '80%'}} className='flex fdc aic jc-c'>
          <h2>Correct Answer</h2>
          <div className='flex fdr aic jc-c'>
            {
              level  && showCorrection ? 
              sequence.map((note, index)=> {
                return (
                
                    <img key={index} width={30} src={note.img} alt="" />
                  
                )
              }) : null
            }
          </div>

          
            
            <button disabled={showNextButton} className='nextBtn' onClick={()=> {
              setTimeout(()=> {
              playSequence();
              setMessage()
            }, 2000)
            
            setInputSequence([]);
            setWait(false)
          }}>Next</button> 
          

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
        <div className='flex fdc aic jc-c'>
         
      <div className="beat-buttons flex fdr jc-c aic">
        {
          durations.map((note, index) => (
            <button className='btnButton' key={index} onClick={() => {
              pushInput(note);
              playNote(note.freq, note.duration);
            }}>
              <span><img width={15} src={note.img} alt="" /></span>
              <h4 style={{margin: 0}}>{note.name}</h4>
               <p>{note.beats} beats</p>
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
              padding:'0.6em 1em'
            }}
            onClick={() => {
            if (JSON.stringify(sequence) === JSON.stringify(inputSequence)) {              
              increaseScoreAndPoints()
              
              setWait(false)
              setMessage('✅ Great')
              setShowNextButton(true)
            } else {
              console.log('incorrect');
              setMessage(`❌ Oppss`)
              setRunning(false)
              setUserPoints(userPoints - 50)
              setShowCorrection(true)
            }

          }}>
            Compose
          </button>

          
      </div>
        </div> : null
      }
        {level > gameRound || gameEnd ? 
        
        <CurrentUserContext>
          <GameSummary userids={currentUser.userids} level={parseInt(id)} gameName={'rhythm'} score={score} points={userPoints} time={time} targetPoint={targetPoint} nextGameIndex={1}/>
        </CurrentUserContext> : null}
    </div>
    
  );
}

export default RhythmGame;
