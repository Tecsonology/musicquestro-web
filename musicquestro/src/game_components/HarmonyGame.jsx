import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import GameStatus from '../game_components/GameStatus.jsx';
import '../styles/HarmonyGame.css'; // Assuming this file exists and contains necessary styles
import HarmonyTutorial from './HarmonyTutorial.jsx';
import { UserContext } from '../components/CurrentUserContext.jsx';
import ItemHolder from '../components/ItemHolder.jsx';
import CountdownCircle from '../components/CountdownCircle.jsx';
import GamePrompt from '../mini-components/GamePrompt.jsx';

import CurrentUserContext from '../components/CurrentUserContext.jsx';
import GameSummary from './GameSummary.jsx';
import hint from '../assets/game-assets/ItemAssets/hint.png'


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
    const [gameStatus, setGameStatus] = useState("");
    const [life, setLife] = useState(5);
    const [showSummary, setShowSummary] = useState(false);
    const targetPoint = 50;

    const { id } = useParams();
    const { currentUser } = useContext(UserContext);
    const [currentNote, setCurrentNote] = useState('');
    const [message, setMessage] = useState();
    const [level, setLevel] = useState(0);
    const [wait, setWait] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);

    let countdownTimer = 180;

    const [score, setScore] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [gameRound, setGameRound] = useState(0);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState();

    const [ currentNotes, setCurrentNotes ] = useState()

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
    // NEW STATE: True when the sound is playing and the user should only listen
    const [isListeningPhase, setIsListeningPhase] = useState(false);
    // NEW STATE for the progressive hint
    const [hintedNotes, setHintedNotes] = useState([]);

    // 🔥 FIX: Trigger state to play sound AFTER targetChord is guaranteed to be updated
    const [playTrigger, setPlayTrigger] = useState(0);


    useEffect(() => {
        // Only reset on mount, don't play sound yet
        resetGame(false); 
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // 🔥 FIX: useEffect to handle playing the sound when a new chord is set
    useEffect(() => {
        // Only proceed if the game has started and a chord is ready
        if (start && targetChord && playTrigger > 0) {
            setRunning(true);
            setCurrentNotes(targetChord)
            
            // Increment round only when a new sound is played
            if (currentRound < gameRound) {
                setCurrentRound(prev => prev + 1);
            } else if(currentRound >= gameRound){
              setCurrentRound(prev => prev + 1)
              setGameOver()
            }

            setIsListeningPhase(true);
            
            const targetFrequencies = targetChord.notes.map(
                (noteName) => allNotes.find((note) => note.note === noteName).frequency
            );
            playFrequencies(targetFrequencies);

            // END LISTENING PHASE after sound plays
            setTimeout(() => {
                setIsListeningPhase(false);
            }, 2500); // 2.5 seconds to cover the 2-second note duration
        }
        // Dependency on playTrigger ensures this runs only when resetGame or replay forces it
    }, [playTrigger, start, targetChord]);


    useEffect(() => {
        if (currentRound > gameRound || life <= 0) {
            const timer = setTimeout(() => {
                setGameOver()
                setShowSummary(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [gameRound, currentRound, life]);

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

    // Utility to get/create AudioContext
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
            } catch (e) { }
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

    // --- Drag & Touch Handlers (omitted for brevity, assume they work) ---
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
    // --------------------------------------------------------------------


    // --- Shared logic ---
    const addNoteToBox = (noteObj) => {
        if (isListeningPhase) return; // Disable note adding during listening
        
        if (!notesInBox.find((n) => n.note === noteObj.note)) {
            const newNotesInBox = [...notesInBox, noteObj];
            setNotesInBox(newNotesInBox);
            const frequenciesToPlay = newNotesInBox.map((n) => n.frequency);
            playFrequencies(frequenciesToPlay);
        }
    };

    const handleCheckGuess = () => {
        if (!targetChord) return;
        const userNotes = notesInBox.map((note) => note.note);
        const targetNotes = targetChord.notes;
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

    // 📝 Added a parameter to optionally skip the playTrigger increment on initial setup
    const resetGame = (triggerPlay = true) => {
        setShowAnswer(false);
        setHintedNotes([]); // Reset hint state for new round
        stopCurrentSound(); // Ensure no sound is playing
        
        const randomChord = chords[Math.floor(Math.random() * chords.length)];
        setCurrentChord(randomChord.name);
        setTargetChord(randomChord); // <-- Setting the NEW target chord
        setNotesInBox([]);
        setFeedback('');

        if (triggerPlay) {
            setPlayTrigger(prev => prev + 1); // <-- Triggers the useEffect to play the sound
            
        } 

        
    };

    const increaseScoreAndPoints = () => {
        setScore(score + 1);
        setUserPoints(userPoints + 400);
        setShowAnswer(true);
    };

    const penaltyForHint = () => {
        // Deduct a smaller amount of points for using a hint
        if (userPoints >= 50) {
            setUserPoints((prev) => prev - 50);
        } else {
            setUserPoints(0);
        }
    };

    const useHint = () => {
        if (!targetChord || targetChord.notes.length === hintedNotes.length) {
            alert("The hints are all in. Used them!")
            document.getElementById("hint-spell").style.display = 'none' 
            document.getElementById("replay-spell").style.display = 'none' 
            return;
        }

        // Find the notes that haven't been hinted yet, sorted alphabetically for consistent reveal
        const unhintedNotes = targetChord.notes.filter(
            (note) => !hintedNotes.includes(note)
        ).sort();

        if (unhintedNotes.length > 0) {
            const nextNoteToReveal = unhintedNotes[0];
            setHintedNotes((prev) => [...prev, nextNoteToReveal]);
            penaltyForHint(); // Apply point penalty
            setFeedback(`🎶 Hint: The note "${nextNoteToReveal}" is in this chord!`);
        }
    };


    const useReplay = () => {
        // Simply replay the sound of the CURRENT targetChord
        if (!targetChord) return;

        setRunning(true);
        setIsListeningPhase(true);
        
        const targetFrequencies = targetChord.notes.map(
            (noteName) => allNotes.find((note) => note.note === noteName).frequency
        );
        playFrequencies(targetFrequencies);

        setTimeout(() => {
            setIsListeningPhase(false);
        }, 2500); 

        setFeedback('Chord replayed! Listen carefully.');
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
        setRunning(false)
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
            // Disable keyboard input during listening/answer phases
            if (isListeningPhase || showAnswer || showCorrection) return; 

            const key = e.key.toUpperCase();
            const matchedNote = allNotes.find((note) => note.note[0] === key);
            if (matchedNote) {
                addNoteToBox(matchedNote);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [notesInBox, isListeningPhase, showAnswer, showCorrection]);


    // Helper for rendering comparison
    const userNotes = notesInBox.map((note) => note.note);
    const wasNoteCorrectlyPlayed = (note) => userNotes.includes(note);

    currentNotes ? console.log(currentNotes, currentNotes.notes) :null

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
                <GamePrompt gameName={'Harmonic Highlands'} />
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

            <div style={{ marginTop: '6em' }} className='flex fdc aic jc-c'>
                {start ? (
                    <>
                        {!showCorrection ? (
                            <>
                                {!showAnswer && !showCorrection ? (
                                    <>
                                        {/* ItemHolder (Replay/Hint buttons) stays visible during listening */}
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
                                        
                                        {/* Conditional Rendering: Show input elements only AFTER the listening phase */}
                                        {!isListeningPhase ? (
                                            <>
                                                {/* HINT DISPLAY LOGIC - Moved to the bottom */}
                                                
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
                                                            stopCurrentSound();
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
                                                            onClick={() => addNoteToBox(note)}
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
                                            // Placeholder during the listening phase
                                            
                                            <div>
                                                <h1 style={{margin: '0'}}>{targetChord ? targetChord.name : ''}</h1>
                                                <h2 style={{ marginTop: '5em', color: 'white' }}>
                                                    <span role="img" aria-label="ear">👂</span> Listen Carefully...
                                                </h2>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="roundAnswer">
                                            <h3 style={{ color: 'white' }}>{feedback}</h3>


                                            {
                                                showAnswer ?
                                                    <>
                                                        {/* --- START OF CORRECTED BLOCK --- */}
                                                        <div className='glass-bg' style={{ margin: '2em', padding: '1em' }}>
                                                            <h2>{targetChord && targetChord.name}</h2>
                                                            <div className='flex fdr aic jc-c'>
                                                                {targetChord && targetChord.notes.map((note, index) => {
                                                                    const isCorrectlyPlayed = wasNoteCorrectlyPlayed(note); 
                                                                    return (
                                                                        <p
                                                                            style={{
                                                                                padding: '1em',
                                                                                borderRadius: '1em',
                                                                                margin: '1em 0.2em',
                                                                                color: 'white',
                                                                                fontSize: '2em',
                                                                                // Use green if the note was correctly played by the user, red if missed
                                                                                backgroundColor: isCorrectlyPlayed ? '#28a745' : '#dc3545', 
                                                                                boxShadow: isCorrectlyPlayed 
                                                                                    ? '0 0 10px rgba(40, 167, 69, 0.7)' 
                                                                                    : '0 0 10px rgba(220, 53, 69, 0.7)',
                                                                            }}
                                                                            key={index}
                                                                        >
                                                                            {note} 
                                                                        </p>
                                                                    );
                                                                })}
                                                            </div>
                                                                     <div>
                                                            <h4>Your answer:</h4>
                                                            {
                                                                notesInBox.map((note, index) => (
                                                                    <span style={{ margin: '0.6em' }} key={index}>
                                                                        {note.note}
                                                                    </span>
                                                                ))
                                                            }
                                                        </div>
                                                        </div>
                                                        {/* --- END OF CORRECTED BLOCK --- */}

                                               

                                                    </> : null
                                            }


                                            <button
                                                onClick={() => {
                                                    // 🔥 FIX: resetGame now correctly sets the new chord and triggers the play useEffect
                                                    resetGame(); 
                                                    setShowCorrection(false)
                                                    // Note: Removed the redundant handlePlayTargetChord call
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
                    <div className='flex fdc aic jc-c'>
                        <img width={150} src={HarmonyPic} alt="" />
                        <button
                            onClick={() => {
                                setStart(true);
                                // 🔥 FIX: Calls resetGame to get the first chord and trigger the useEffect
                                resetGame(); 
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
                    {/* --- START OF IMPROVED CORRECTION BLOCK --- */}
                    <div className='glass-bg' style={{ margin: '2em', padding: '1em' }}>
                        <h6>CORRECT ANSWER</h6>
                        <h2>{targetChord && targetChord.name}</h2>
                        <div className='flex fdr aic jc-c'>
                            {targetChord && targetChord.notes.map((note, index) => (
                                <p
                                    style={{
                                        padding: '1em',
                                        // Neutral color for simple reveal
                                        backgroundColor: '#007bff', 
                                        borderRadius: '1em',
                                        margin: '1em 0.2em',
                                        color: 'white'
                                    }}
                                    key={index}>{note} </p>
                            ))}
                        </div>
                    </div>
                    {/* --- END OF IMPROVED CORRECTION BLOCK --- */}
                    <button
                        onClick={() => {
                            setShowCorrection(false)
                            // 🔥 FIX: resetGame now handles the next chord logic
                            resetGame(); 
                        }}
                    >
                        Next
                    </button>
                </>
            ) : null}

            {hintedNotes.length > 0 && targetChord && (
                <div className='flex fdr aic' style={{position: 'fixed', color: 'white', padding: '1em', backgroundColor: 'rgba(30, 158, 1, 0.25)', 
                borderRadius: '10px', marginBottom: '1em', bottom: '1em', width: '90%', justifyContent: 'space-evenly', }}>
                    <div className='flex fdr aic jc-c' style={{position: 'absolute', 
                        top: '-2em', left: '1em', backgroundColor: '#344', padding: '0 1em', borderRadius: '1em', border: '2px solid yellow'}}>
                        <img style={{backgroundColor: 'rgba(68, 68, 85, 0.97)', padding: '0.5em', borderRadius: '50%', }} width={30} src={hint} alt="" />
                        <h3 style={{color: 'white'}}>Hint</h3>
                    </div>
                    <div className='flex fdr aic'>
                        {targetChord.notes.sort().map((note) => ( 
                                            <span
                                                key={note}
                                                style={{
                                                    margin: '0 5px',
                                                    padding: '5px 10px',
                                                    backgroundColor: hintedNotes.includes(note) ? 'yellow' : 'gray',
                                                    color: hintedNotes.includes(note) ? 'black' : 'white',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                {hintedNotes.includes(note) ? note : '?'}
                                            </span>
                        ))}
                    </div>
                </div>        
            )}

            {showSummary ? (
                <CurrentUserContext>
                    <GameSummary
                        userids={currentUser && currentUser.userids}
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