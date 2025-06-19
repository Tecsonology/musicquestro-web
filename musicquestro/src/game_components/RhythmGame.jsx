import React from 'react'
import { useState } from 'react';

const RHYTHMS = {
  "Whole Note": { beatCount: 1, spacing: 2000 },
  "Half Note": { beatCount: 2, spacing: 1000 },
  "Quarter Note": { beatCount: 4, spacing: 500 },
  "Eighth Note": { beatCount: 8, spacing: 250 },
};


function RhythmGame() {
 const [correctRhythm, setCorrectRhythm] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  // Create a basic heartbeat-like sound
  const playBeat = (audioCtx, startTime) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(100, startTime); // Low bass freq

    gain.gain.setValueAtTime(1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3); // Fade out

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.3);
  };

  // Play rhythm by sequencing multiple beats
  const playBeatRhythm = ({ beatCount, spacing }) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const start = audioCtx.currentTime;

    for (let i = 0; i < beatCount; i++) {
      playBeat(audioCtx, start + (i * spacing) / 1000);
    }
  };

  const playRandomRhythm = () => {
    const rhythmNames = Object.keys(RHYTHMS);
    const random = rhythmNames[Math.floor(Math.random() * rhythmNames.length)];
    setCorrectRhythm(random);
    setGuess("");
    setFeedback("");
    playBeatRhythm(RHYTHMS[random]);
  };

  const handleGuess = (choice) => {
    setGuess(choice);
    setFeedback(choice === correctRhythm ? "✅ Correct!" : `❌ Nope, it was ${correctRhythm}.`);
  };

  return (
    
    <div className="fdc min-h-screen flex flex-col items-center justify-center bg-rose-50 p-6">
      <audio controls autoPlay>
        <source src="http://www.sndup.net/rykws" type='audio/mpeg'/>
      </audio>
      <h1 className="text-3xl font-bold mb-6 text-red-700">🫀 Heartbeat Rhythm Game</h1>
      <button
        onClick={playRandomRhythm}
        className="bg-red-500 text-white px-6 py-3 rounded-full mb-6 hover:bg-red-600 shadow-md"
      >
        Play Beat Pattern
      </button>

      <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-md">
        {Object.keys(RHYTHMS).map((name) => (
          <button
            key={name}
            onClick={() => handleGuess(name)}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
              guess
                ? name === correctRhythm
                  ? "bg-green-500"
                  : name === guess
                  ? "bg-red-500"
                  : "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {feedback && <p className="text-xl mt-4">{feedback}</p>}
    </div>
  )
}

export default RhythmGame
