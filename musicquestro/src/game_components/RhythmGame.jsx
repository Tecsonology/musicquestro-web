import React, { useState, useReducer, useContext } from 'react';
import GameStatus from './GameStatus';
import GamePrompt from '../mini-components/GamePrompt';
import GameSummary from './GameSummary';
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext';
import '../styles/RhythmGame.css'

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
  const { currentUser } = useContext(UserContext)
  const [ state, dispatch ] = useReducer(reducer, inititalState)
  const [currentNote, setCurrentNote] = useState('');
  const [ message, setMessage ] = useState()
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);
  const [score, setScore] = useState(0);  
  const [userPoints, setUserPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [ wait, setWait ] = useState(false)
  const targetPoint = 85.00;


  let context;
  let oscType;

  if(currentUser){
    console.log(currentUser.currentInstrument)
    oscType = currentUser.currentInstrument
  }

  const initializeAudio = () => {
    if (!context || context.state === 'closed') {
      context = new (window.AudioContext || window.webkitAudioContext)();
    } else if (context.state === 'suspended') {
      context.resume();
    }
  };

  const playNote = (freq, duration) => {
    if (!context) initializeAudio();
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    osc.type = oscType;
    osc.frequency.value = freq;

    gainNode.gain.setValueAtTime(1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration / 1000);

    const now = context.currentTime;

const attackTime = 0.3;  // fade in (soft)
const decayTime = 0.2;   // reduce volume slightly
const sustainLevel = 0.6; // hold this level
const releaseTime = 0.5;  // fade out when stopping

// Attack
gainNode.gain.linearRampToValueAtTime(1.0, now + attackTime);

// Decay
gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);

// Release (when key is released or sound ends)
const stopTime = now + 1.5;
gainNode.gain.linearRampToValueAtTime(0.0, stopTime + releaseTime);

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
    initializeAudio();
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

  return (
    <div className='rhythm-game-container fpage flex fdc jc-c aic'>
 
      <GameStatus score={score} userPoints={userPoints} level={level} time={time} />
      <p><strong>{currentNote ? 'Listen to the rhythm...' : null  || "Guess the rhythm played"}</strong></p>

      <div className="beat-indicator flex fdr jc-c aic" style={{ margin: '0' }}>
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
              transition: 'background-color 0.2s ease'
            }}
          >
            <span style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
              {beat}
            </span>
          </div>
        ))}


        {inputSequence && inputSequence.length > 0 ? <button style={{margin: '0', backgroundColor: 'transparent'}} onClick={()=> { setInputSequence([])}}>Clear</button> : null}
      </div>
      { currentUser ? level && level && level >= 0 ? null : <button id='btnStartRhythm' onClick={playSequence}>Lez go!</button> : 'Loading...' }
  

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
        wait && wait ? 
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

      <div className='bottom-buttons flex fdr aic jc-c'>
            <button id='playRhythm' onClick={() => {
            if (JSON.stringify(sequence) === JSON.stringify(inputSequence)) {
              console.log('correct');
              
              increaseScoreAndPoints()
              

              setWait(false)
              setMessage('✅ Nays galing ah')
            } else {
              console.log('incorrect');
              setMessage(`❌ MALI ka boi`)
            }

            setTimeout(()=> {
              playSequence();
              setMessage()
            }, 2000)
            
            setInputSequence([]);
            setWait(false)
          }}>
            PLAY MY RHYTHM
          </button>

          <button onClick={playBeatAgain}>Replay</button>
          
      </div>
        </div> : null
      }
        {level > 15 ? 
        <CurrentUserContext>
          <GameSummary score={score} points={userPoints} time={time} targetPoint={targetPoint}/>
        </CurrentUserContext> : null}
    </div>
    
  );
}

export default RhythmGame;
