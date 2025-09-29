import React, { useState, useRef, useEffect } from 'react';

import GameStatus from '../game_components/GameStatus.jsx'
import '../styles/HarmonyGame.css';
import HarmonyTutorial from './HarmonyTutorial.jsx';

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
  const [score, setScore] = useState(0)
  const [userPoints, setUserPoints] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [gameRound, setGameRound] = useState(0)
  const [time, setTime] = useState()
  const [running, setRunning] = useState()

  const [notesInBox, setNotesInBox] = useState([]);
  const [currentChord, setCurrentChord] = useState()
  const [targetChord, setTargetChord] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true)
  const [feedback, setFeedback] = useState('');
  const [draggedNote, setDraggedNote] = useState(null); // mobile support

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  useEffect(() => {
    resetGame();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const stopCurrentSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Ignore if already stopped
      }
    });
    oscillatorsRef.current = [];
  };

  const playFrequencies = (frequencies) => {
    stopCurrentSound();
    const audioContext = getAudioContext();
    const newOscillators = [];
    const duration = 2;
    const now = audioContext.currentTime;

    frequencies.forEach(freq => {
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
    if (targetChord) {
      const targetFrequencies = targetChord.notes.map(noteName =>
        allNotes.find(note => note.note === noteName).frequency
      );
      playFrequencies(targetFrequencies);
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
    if (!notesInBox.find(n => n.note === noteObj.note)) {
      const newNotesInBox = [...notesInBox, noteObj];
      setNotesInBox(newNotesInBox);
      const frequenciesToPlay = newNotesInBox.map(n => n.frequency);
      playFrequencies(frequenciesToPlay);
    }
  };

  const handleCheckGuess = () => {
    if (!targetChord) return;

    const userNotes = notesInBox.map(note => note.note).sort();
    const targetNotes = targetChord.notes.sort();

    const isCorrect = JSON.stringify(userNotes) === JSON.stringify(targetNotes);

    if (isCorrect) {
      setFeedback('✅ Correct! You guessed the ' + targetChord.name + ' chord!');
    } else {
      setFeedback('❌ Incorrect. Try again!');
    }
  };

  const resetGame = () => {
    const randomChord = chords[Math.floor(Math.random() * chords.length)];
    setCurrentChord(randomChord.name)
    setTargetChord(randomChord);
    setNotesInBox([]);
    setFeedback('');
    stopCurrentSound();

    console.log('--- New Round ---');
    console.log('The target chord is:', randomChord.name);
    console.log('The correct notes are:', randomChord.notes);

    setTimeout(handlePlayTargetChord, 500);
  };

  return (
    <div style={{justifyContent: 'flex-start',}} className="harmony-game-container fpage flex fdc jc-c">

      {
        showTutorial ? 
        <HarmonyTutorial  
        chords={chords} 
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
        allNotes={allNotes} 
        playFrequencies={playFrequencies} 
        onStartGame={''} 
      /> : null
      }

      <GameStatus score={score} userPoints={userPoints} currentRound={currentRound} level={gameRound} time={time} running={running} setRunning={setRunning} />

    

      <div className="flex fdr aic jc-c">
        <h1 style={{marginRight: '1em'}}>{currentChord}</h1>
        <button style={{margin: 0}} onClick={handlePlayTargetChord}>Listen to Chord</button>
      </div>

      <div className="feedback-container">
        {feedback && <p className="feedback-text">{feedback}</p>}
      </div>

      <div className="chord-box" onDragOver={handleDragOver} onDrop={handleDrop}>
        {notesInBox.length > 0 ? (
          notesInBox.map((note, index) => (
            <span key={index} className="note-in-box">
              {note.note}
            </span>
          ))
        ) : (
          <span>Drag notes here!</span>
        )}
      </div>
      <button onClick={()=>{setNotesInBox([])}}>Reset</button>

      <div className="notes-library">
        {allNotes.map(note => (
          <div
            key={note.note}
            className="note"
            draggable
            onDragStart={(e) => handleDragStart(e, note.note, note.frequency)}
            onTouchStart={() => handleTouchStart(note.note, note.frequency)}
            onTouchEnd={handleTouchEnd}
          >
            {note.note}
          </div>
        ))}
      </div>

      <button className='navLink flex fdc aic jc-c' style={{width: '10em'}} onClick={handleCheckGuess}>COMPOSE</button>
      <button onClick={resetGame} className="reset-button">Next Chord</button>
    </div>
  );
}

export default HarmonyGame;
