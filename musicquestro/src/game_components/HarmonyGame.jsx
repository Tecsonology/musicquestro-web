import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import GameStatus from '../game_components/GameStatus.jsx';
import '../styles/HarmonyGame.css';
import HarmonyTutorial from './HarmonyTutorial.jsx';
import { UserContext } from '../components/CurrentUserContext.jsx';
import ItemHolder from '../components/ItemHolder.jsx';
import CountdownCircle from '../components/CountdownCircle.jsx';
import GamePrompt from '../mini-components/GamePrompt.jsx';

import CurrentUserContext from '../components/CurrentUserContext.jsx';
import GameSummary from './GameSummary.jsx';

import HarmonyPic from '../assets/game-assets/Assets/Logo&Menu/HarmonyPic.png'

const allNotes = [
  { note: 'C', frequency: 261.63 },
  { note: 'D', frequency: 293.66 },
  { note: 'E', frequency: 329.63 },
  { note: 'F', frequency: 349.23 },
  { note: 'G', frequency: 392.00 },
  { note: 'A', frequency: 440.00 },
  { note: 'B', frequency: 493.88 },
  { note: 'F#', frequency: 369.99 },
  { note: 'G#', frequency: 415.30 },
];

const chords = [
  { name: 'C Major', notes: ['C', 'E', 'G'] },
  { name: 'G Major', notes: ['G', 'B', 'D'] },
  { name: 'A Minor', notes: ['A', 'C', 'E'] },
  { name: 'F Major', notes: ['F', 'A', 'C'] },
  { name: 'D Minor', notes: ['D', 'F', 'A'] },
  { name: 'E Minor', notes: ['E', 'G', 'B'] },
  { name: 'C7', notes: ['C', 'E', 'G', 'B'] },
  { name: 'G7', notes: ['G', 'B', 'D', 'F'] },
  { name: 'D Major', notes: ['D', 'F#', 'A'] },
  { name: 'B Minor', notes: ['B', 'D', 'F#'] },
  { name: 'E Major', notes: ['E', 'G#', 'B'] },
];

function HarmonyGame() {
  const [start, setStart] = useState(false);
  const [ gameStatus, setGameStatus ] = useState("")
  const [life, setLife] = useState(5);
  const [showSummary, setShowSummary] = useState(false);
  const targetPoint = 50

  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [gameEnd, setGameEnd] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [message, setMessage] = useState();
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);
  const [level, setLevel] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [wait, setWait] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  let countdownTimer = 30;

  const [score, setScore] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState();

  const [notesInBox, setNotesInBox] = useState([]);
  const [currentChord, setCurrentChord] = useState();
  const [targetChord, setTargetChord] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [draggedNote, setDraggedNote] = useState(null);

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const intervalRef = useRef(null);

  const [showAnswer, setShowAnswer] = useState(true);

  

  useEffect(() => {
    resetGame();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
      if (currentRound > gameRound || life <= 0) {
        const timer = setTimeout(() => {
          setShowSummary(true);
          
        }, 4000);
    
        return () => clearTimeout(timer);
      }
    }, [gameRound, currentRound]);

  useEffect(() => {
    if (id == 0) {
      setGameRound(5);
    } else if (id == 1) {
      setShowTutorial(false);
      setGameRound(7);
    } else if (id == 2) {
      setGameRound(10);
      setShowTutorial(false);
    } else if (id == 3) {
      setGameRound(13);
      setShowTutorial(false);
    } else if (id == 4) {
      setGameRound(15);
      setShowTutorial(false);
    }

    if (level > gameRound) {
      stopTime();
    }
  }, [id, level, gameRound]);

  useEffect(() => {
      let answerKey = "";

      if (targetChord && targetChord.notes) {
          targetChord.notes.forEach((note) => {
              answerKey += note + " ";
          });
      }

      if (answerKey.trim()) {
          currentRound > 0 ? console.log("Round", currentRound + " answer: ", answerKey.trim()) : null
      }
  }, [currentRound]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const stopCurrentSound = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  const playFrequencies = (frequencies) => {
    
    stopCurrentSound();
    const audioContext = getAudioContext();
    const newOscillators = [];
    const duration = 2;
    const now = audioContext.currentTime;

    frequencies.forEach((freq) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.exponentialRampToValueAtTime(0.5 / frequencies.length, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(now + duration);
      newOscillators.push(oscillator);
    });

    oscillatorsRef.current = newOscillators;
  };

  const handlePlayTargetChord = () => {
    if(currentChord < gameRound){
      setCurrentRound(prev => prev + 1)
      if (targetChord) {
        const targetFrequencies = targetChord.notes.map(
          (noteName) => allNotes.find((note) => note.note === noteName).frequency
        );
        playFrequencies(targetFrequencies);
      }
      setRunning(true);
      setShowCorrection(false);
    } else {
      setMessage("Calculating game...")
    }
  };

  // --- Desktop Drag ---
  const handleDragStart = (e, note, frequency) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ note, frequency }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const droppedNote = JSON.parse(data);
    addNoteToBox(droppedNote);
  };

  // --- Mobile Touch ---
  const handleTouchStart = (note, frequency) => {
    setDraggedNote({ note, frequency });
  };

  const handleTouchEnd = (e) => {
    if (!draggedNote) return;
    const chordBox = document.querySelector('.chord-box');
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    if (chordBox && chordBox.contains(dropTarget)) {
      addNoteToBox(draggedNote);
    }
    setDraggedNote(null);
  };

  // --- Shared logic ---
  const addNoteToBox = (noteObj) => {
    if (!notesInBox.find((n) => n.note === noteObj.note)) {
      const newNotesInBox = [...notesInBox, noteObj];
      setNotesInBox(newNotesInBox);
      const frequenciesToPlay = newNotesInBox.map((n) => n.frequency);
      playFrequencies(frequenciesToPlay);
    }
  };

  const handleCheckGuess = () => {
    if (!targetChord) return;
    const userNotes = notesInBox.map((note) => note.note).sort();
    const targetNotes = targetChord.notes.sort();
    const isCorrect = JSON.stringify(userNotes) === JSON.stringify(targetNotes);
    if (isCorrect) {
      setFeedback('✅ Correct! You guessed the ' + targetChord.name + ' chord!');
      increaseScoreAndPoints();
    } else {
      
      setFeedback('❌ Incorrect. -1💔');
      setShowAnswer(true)
      penalty()
    }
  };

  const resetGame = () => {
    setShowAnswer(false);
    const randomChord = chords[Math.floor(Math.random() * chords.length)];
    setCurrentChord(randomChord.name);
    setTargetChord(randomChord);
    setNotesInBox([]);
    setFeedback('');
    stopCurrentSound();
    
  };

  const increaseScoreAndPoints = () => {
    setScore(score + 1);
    setUserPoints(userPoints + 400);
    setShowAnswer(true);
  };

  const useHint = () => {
    setShowCorrection(true);
    increaseScoreAndPoints();
  };

  const useReplay = () => {
    handlePlayTargetChord();
  };

  const penalty = () => {
    setMessage(`💔 -1`);
    setLife((prev) => prev - 1);
    setRunning(false);
    if (userPoints >= 50) {
      setUserPoints(userPoints - 50);
    }
    setShowAnswer(true);
  };

  function setGameOver() {
    setShowSummary(true)
    setGameStatus("Game Over")
    stopTime();
  }

  const stopTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // ✅ Keyboard controls for A–G
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const matchedNote = allNotes.find((note) => note.note[0] === key);
      if (matchedNote) {
        addNoteToBox(matchedNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notesInBox]);

  return (
    <div style={{ justifyContent: 'flex-start' }} className="harmony-game-container fpage flex fdc jc-c">
      {showTutorial ? (
        <HarmonyTutorial
          chords={chords}
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}
          allNotes={allNotes}
          playFrequencies={playFrequencies}
          onStartGame={''}
        />
      ) : (
        <GamePrompt gameName={'Echoic Highlands'} />
      )}

      <GameStatus
        score={score}
        userPoints={userPoints}
        currentRound={currentRound}
        level={gameRound}
        time={time}
        running={running}
        setRunning={setRunning}
        gameStatus={gameStatus}
      />

     <div style={{marginTop: '6em'}} className='flex fdc aic jc-c'>
       {start ? (
        <>
          {!showCorrection ? (
            <>
              {!showAnswer && !showCorrection ? (
                <>
                  <div style={{ marginTop: '6em' }} className="flex fdc aic jc-c">
                    <ItemHolder
                      life={life}
                      userContext={currentUser}
                      useHint={useHint}
                      useReplay={useReplay}
                      running={running}
                      setRunning={setRunning}
                      children={
                        <div>
                          <CountdownCircle
                            time={countdownTimer}
                            running={running}
                            setRunning={setRunning}
                            onComplete={setGameOver}
                          />
                        </div>
                      }
                    />
                  </div>

                  <div className="feedback-container">
                    {feedback && <p className="feedback-text">{feedback}</p>}
                  </div>

                  <div className="chord-box" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div
                      style={{
                        position: 'absolute',
                        backgroundColor: 'green',
                        top: '-3em',
                        padding: '0.2rem 1rem',
                        borderRadius: '1em',
                      }}
                      className="flex fdr aic jc-c"
                    >
                      <h1>{currentChord}</h1>
                    </div>
                    {notesInBox.length > 0 ? (
                      notesInBox.map((note, index) => (
                        <span key={index} className="note-in-box">
                          {note.note}
                        </span>
                      ))
                    ) : (
                      <span>Drag notes here!</span>
                    )}
                    <button
                      style={{
                        position: 'absolute',
                        right: '0',
                        bottom: 0,
                        backgroundColor: 'rgba(51, 68, 85, 0.15)',
                      }}
                      onClick={() => {
                        setNotesInBox([]);
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="notes-library">
                    {allNotes.map((note) => (
                      <div
                        key={note.note}
                        className="note"
                        draggable
                        onDragStart={(e) => handleDragStart(e, note.note, note.frequency)}
                        onTouchStart={() => handleTouchStart(note.note, note.frequency)}
                        onTouchEnd={handleTouchEnd}
                        onClick={() => addNoteToBox(note)} // ✅ CLICK event support
                      >
                        {note.note}
                      </div>
                    ))}
                  </div>

                  <button
                    className="navLink flex fdc aic jc-c"
                    style={{ width: '10em' }}
                    onClick={() => {
                      setShowAnswer(true);
                      handleCheckGuess();
                    }}
                  >
                    COMPOSE
                  </button>
                </>
              ) : (
                <>
                  <div className="roundAnswer">
                    <h3 style={{color: 'white'}}>{feedback}</h3>

                   
                      {
                      showAnswer ?
                      <>
                        <div className='glass-bg' style={{margin: '2em', padding: '1em'}}>
                          <h6>CORRECT ANSWER</h6>
                          <h2>{targetChord.name}</h2>
                            <div className='flex fdr aic jc-c'>
                                { targetChord && targetChord.notes.map((note, index) => (
                              <p
                              style={{
                                padding: '1em',
                                backgroundColor: 'blue',
                                borderRadius: '1em',
                                margin: '1em 0.2em',

                              }}
                              key={index}>{note} </p>
                            ))} 
                            </div>
                        </div>

                            <div>
                              <h4>Your answer:</h4>
                              {
                                notesInBox.map((note, index) => (
                                  <span style={{margin: '0.6em'}} key={index}>
                                    {note.note}
                                  </span>
                                ))
                              }
                            </div>

                        </> : null
                    }
                    

                    <button
                      onClick={() => {
                        resetGame();
                        setTimeout(handlePlayTargetChord, 1000);
                      }}
                      className="reset-button"
                    >
                      Next Chord
                    </button>
                  </div>
                </>
              )}
            </>
          ) : null}
        </>
      ) : (
        <div>
          <img width={150} src={HarmonyPic} alt="" />
          <button
            onClick={() => {
              setStart(true);
              handlePlayTargetChord();
            }}
            style={{
              width: '15em',
              backgroundColor: 'rgba(254, 255, 182, 1)',
              color: 'rgba(3, 0, 62, 1)',
              fontWeight: 'bolder'
            }}
          >
            START
          </button>
        </div>
      )}
     </div>

      {showCorrection && showCorrection ? (
        <>
          <h1>MAGIC REVEAL</h1>
           <div className='glass-bg' style={{margin: '2em', padding: '1em'}}>
                          <h6>CORRECT ANSWER</h6>
                          <h2>{targetChord.name}</h2>
                            <div className='flex fdr aic jc-c'>
                                { targetChord && targetChord.notes.map((note, index) => (
                              <p
                              style={{
                                padding: '1em',
                                backgroundColor: 'blue',
                                borderRadius: '1em',
                                margin: '1em 0.2em',

                              }}
                              key={index}>{note} </p>
                            ))} 
                            </div>
                        </div>
          <button
            onClick={() => {
              setShowCorrection(false)
              resetGame();
            }}
          >
            Next
          </button>
        </>
      ) : null}

      {showSummary ? (
          <CurrentUserContext>  
            <GameSummary
              userids={currentUser.userids}
              level={parseInt(id)}
              gameName={'harmony'}
              score={score}
              points={userPoints}
              time={time}
              targetPoint={targetPoint}
              nextGameIndex={3}
            />
          </CurrentUserContext>
        ) : null}

    </div>
  );
}

export default HarmonyGame;
