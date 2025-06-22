import React, { useState, useEffect, useRef, use } from 'react';
import '../styles/GameStyles.css';
import GameSummary from './GameSummary';
import GameStatus from './GameStatus';

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
  const [melody, setMelody] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [result, setResult] = useState('');
  const [noteLength, setNoteLength] = useState(1);
  const [score, setScore] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(null);
  const [message, setMessage] = useState('Listen to the melody and match the notes!');
  const intervalRef = useRef(null); 
  const [ wait, setWait ] = useState(false)

  const targetPoint = 85.00;
  let newMelody;

  const startTime = () => {
    if (intervalRef.current) return; 
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  // Stop the timer
  const stopTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(()=> {
    if(userInput.length > 6){
      setUserInput([])
    }
  })

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopTime(); 
    };
  }, []);

  useEffect(() => {
    if (score == 3 || score == 11 || score == 13) {
      setNoteLength(noteLength + 1);
    }
  }, [score]);

  const playNote = (freq, duration = 3000) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    osc.connect(gainNode);
    gainNode.connect(context.destination);
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    osc.start();

    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + duration / 1000
    );

    osc.stop(context.currentTime + duration / 1000);
  };

  const playMelody = async () => {
    setWait(false)
    startTime();
    

    newMelody = Array.from({ length: noteLength }, () =>
      noteNames[Math.floor(Math.random() * noteNames.length)]
    );



    setMelody(newMelody);
    setUserInput([]);
    setResult('');
    setMessage('Listen...');
    setLevel(level+1)

    for (let i = 0; i < newMelody.length; i++) {
  
      console.log(newMelody[i]);
      playNote(notesMap[newMelody[i]]);
      await new Promise((res) => setTimeout(res, 700));
    }
   
    setWait(true)
    setMessage('???');
    
    if(level <= 0 && level === 1){
      setLevel(prev => prev + 1);
    }
    setWait(true)
  };

  const handleNoteClick = (note) => {
    playNote(notesMap[note]);
    const updatedInput = [...userInput, note];
    setUserInput(updatedInput);
  };

  const releaseNotes =(e) => {
    console.log(e.target.disabled='true')
    if (userInput.length === melody.length) {
      const isCorrect = userInput.every((n, i) => n === melody[i]);
      if (isCorrect) {
        setUserPoints(userPoints + 400);
        setScore(score + 1);
        setMessage("✅ Correct");
      } else {
        setMessage("❌ Wrong, its "+melody.join(' '));
      }
    } else {
      setMessage(`❌ Wrong, its `+melody.join(' '));
    }

    setTimeout(() => {
      if (level < 15) {
        playMelody();
      } else {
        setLevel(level+1)
        stopTime(); // Stop timer at final level
      }
    }, 3000);

   
  };

  const playAgain = async () => {
    setWait(false)
    for (let i = 0; i < melody.length; i++) {
      playNote(notesMap[melody[i]]);
      await new Promise((res) => setTimeout(res, 700));
    }
    setUserInput([])
    setWait(true)
  };

  const listenMode = ()=> {
    if(!wait){
      return <img width={300} src='https://i.ibb.co/rRvk4jHQ/Untitled-design-4-removebg-preview.png' />
    }
  }

  

  return (
    <div className='melody-game-container fpage flex fdc aic jc-c' style={{ padding: 20, fontFamily: 'sans-serif', textAlign: 'center' }}>
  
      <GameStatus score={score} userPoints={userPoints} level={level} time={time} />
      <h2>{message}</h2>
      {listenMode()}
      <button onClick={(e) => {
        playMelody();
        console.log(e.target.style.display = 'none');
      }} style={{ marginBottom: 20 }}>▶️ Play Melody</button>
      <h1>{userInput.join(' ')}</h1>
      { wait && wait ? 
      <div className='m-btn-container glass-bg'>
        <div>
        {noteNames.map((note) => (
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
        <button onClick={releaseNotes}>Release Notes</button>
        <button onClick={() => { setUserInput([]); 
            if(userPoints > 0){
              setUserPoints(userPoints - 5);
            }
         }} style={{ marginLeft: '1em' }}>Reset</button>
      </div>

  
      </div> : null}

      {wait && userPoints > 50 ? (
        <div className="btom-spells glass-bg">
          <button className='btnPlayAgain' onClick={() => {
          playAgain();
          setUserPoints(userPoints - 50);
        }}><span><img width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span> 50 <br />
        <span>Play Melody</span></button>

        { userPoints > 150 && <button onClick={()=> {
        
          playAgain()
          setUserPoints(userPoints-150)
          setMessage(melody.join(' '))
        }}>Hint</button>}

        </div>
      ) : null}

      <div style={{ marginTop: 20 }}></div>
      <div style={{ fontSize: 24, marginTop: 10 }}>{result}</div>

      {level > 15 ? <GameSummary score={score} points={userPoints} time={time} targetPoint={targetPoint}/> : null}
    </div>
  );
}

export default MelodyGame;
