import React, { useState, useEffect, useRef, useContext } from 'react';
import '../styles/GameStyles.css';
import GameSummary from './GameSummary';
import GameStatus from './GameStatus';
import GamePrompt from '../mini-components/GamePrompt';
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext';
import { useParams } from 'react-router-dom';
import PauseGame from '../mini-components/PauseGame';
import ItemHolder from '../components/ItemHolder.jsx';

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
  const { id } = useParams()
  const { currentUser } = useContext(UserContext);
  const [melody, setMelody] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [result, setResult] = useState('');
  const [noteLength, setNoteLength] = useState(1);
  const [score, setScore] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(null);
  const [message, setMessage] = useState('Listen to the melody and match the notes!');
  const [wait, setWait] = useState(false);
  const [ gameRound, setGameRound ] = useState()
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const targetPoint = 70;


  
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
    setWait(false);

    const newMelody = Array.from({ length: noteLength }, () =>
      noteNames[Math.floor(Math.random() * noteNames.length)]
    );

    setMelody(newMelody);
    setUserInput([]);
    setResult('');
    setMessage('Listen...');
    setLevel(prev => (prev !== null ? prev + 1 : 1));

    for (const note of newMelody) {
      console.log(note)
      playNote(notesMap[note]);
      await new Promise(res => setTimeout(res, 700));
    }

    setWait(true);
    setMessage('Show what you listen');
  };

  const handleNoteClick = (note) => {
    playNote(notesMap[note]);
    setUserInput(prev => [...prev, note]);
  };

  const releaseNotes = () => {
    const isCorrect = userInput.length === melody.length && userInput.every((n, i) => n === melody[i]);

    if (isCorrect) {
      setUserPoints(prev => prev + 400);
      setScore(prev => prev + 1);
      setMessage("✅ Correct");
    } else {
      setMessage(`❌ Wrong, it's ${melody.join(' ')}`);
      setUserPoints(prev => (prev >= 200 ? prev - 10 : 0));
    }

    setTimeout(() => {
      if (level < 15) {
        playMelody();
      } else {
        setLevel(prev => prev + 1);
        stopTime();
      }
    }, 3000);
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
    return !wait ? <img width={300} src='https://i.ibb.co/rRvk4jHQ/Untitled-design-4-removebg-preview.png' alt="Listen mode" /> : null;
  };


  //Item Functions

  const useHint =()=> {
     playAgain();
    setUserPoints(prev => prev - 150);
     setMessage(melody.join(' '));
  }

  const useReplay =()=> {
       playAgain();
      setUserPoints(prev => prev - 50);
  }

  return (
    <CurrentUserContext>
      <div className='melody-game-container fpage flex fdc aic jc-c'>
        <GamePrompt gameName={'MELODIC PEAK'}/>
        <GameStatus score={score} userPoints={userPoints} level={level} time={time} />
        { wait ? <ItemHolder useHint={useHint} useReplay={useReplay}/> : null}

          <div className='flex fdc aic jc-c' style={{marginTop: '5em',}}>
            <h2 style={{textAlign: 'center', position: 'relative'}}>{message}</h2>
        {listenMode()}

        { level < 1 ? <button onClick={playMelody} style={{fontSize: '1.5em', background: 'green' }}>Let's Begin!</button> : null}
        <h1 style={{margin: '0 0 0.4em 0', textAlign: 'center', 
          backgroundColor: userInput.length > 0 ? '#0000005c' : 'transparent', border: userInput.length > 0 ? '3px solid white' : '0px solid white', borderRadius: '3em', padding: '0.2em 0.4em'}}>{userInput.join(' ')}</h1>
 
        {wait && (
          <div className='m-btn-container glass-bg'>
            <div className='melody-wrapper flex fdr jc-c aic'>
              {noteNames.map(note => (
                <button
                  key={note}
                  onClick={() => handleNoteClick(note)}
                  style={{
                    margin: '5px',
                    padding: '10px 20px',
                    fontSize: '2em',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {note}
                </button>
              ))}
            </div>

            <div className="lower-buttons">
              <button style={{width: '10em', backgroundColor: 'orange'}} onClick={releaseNotes}>Compose</button>
              <button onClick={() => {
                setUserInput([]);
                if (userPoints > 0) setUserPoints(prev => prev - 5);
              }} style={{ marginLeft: '1em' }}>Clear</button>
            </div>
          </div>
        )}
        {
          level > 5 
        }
        {level > 5 && (
          <GameSummary userids={currentUser.userids} level={parseInt(id)} gameName={'melody'} score={score} points={userPoints} time={time} targetPoint={targetPoint} nextGameIndex={2} />
        )}
          </div>
      </div>
    </CurrentUserContext>
  );
}

export default MelodyGame;
