import React, { useState } from 'react';

const instruments = [
  { name: 'Piano', type: 'sine' },
  { name: 'Guitar', type: 'square' },
  { name: 'Violin', type: 'sawtooth' },
  { name: 'Flute', type: 'triangle' },
  { name: 'Xylophone', type: 'custom' }
];

function HarmonyGame() {
  const [harmonicCombo, setHarmonicCombo] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState('');

  const customWave = (audioCtx) => {
    const real = new Float32Array([0, 1, 0.5, 0.2]);
    const imag = new Float32Array(real.length);
    return audioCtx.createPeriodicWave(real, imag);
  };

  const playNote = (oscType, audioCtx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    gain.gain.value =   20;

    if (oscType === 'custom') {
      osc.setPeriodicWave(customWave(audioCtx));
    } else {
      osc.type = oscType;
    }

    osc.frequency.value = 440; // A4
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1);
  };

  const playHarmonic = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const combo = [];

    while (combo.length < 2) {
      const rand = instruments[Math.floor(Math.random() * instruments.length)];
      if (!combo.includes(rand)) {
        combo.push(rand);
        playNote(rand.type, audioCtx);
      }
    }

    setHarmonicCombo(combo);
    setAnswer([]);
    setMessage('');
  };

      console.log(harmonicCombo)


  const onDrop = (e) => {
    const dropped = e.dataTransfer.getData('instrument');
    const found = instruments.find((i) => i.name === dropped);
    if (found && !answer.includes(found)) {
      setAnswer([...answer, found]);
    }
  };

  const onDragStart = (e, instrumentName) => {
    e.dataTransfer.setData('instrument', instrumentName);
  };

  const checkAnswer = () => {
    if (answer.length !== 2) {
      setMessage('Pick exactly 2 instruments!');
      return;
    }

    const correct = harmonicCombo.every(h => answer.find(a => a.name === h.name));
    setMessage(correct ? '✅ Correct!' : '❌ Try Again!');
  };

  return (
    <div className="game">
      <button onClick={playHarmonic}>🎵 Play Harmonic Sound</button>

      <div className="instruments">
        <h3>Instruments</h3>
        {instruments.map((inst) => (
          <div
            key={inst.name}
            className="instrument"
            draggable
            onDragStart={(e) => onDragStart(e, inst.name)}
          >
            {inst.name}
          </div>
        ))}
      </div>

      <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
        <h3>Drop your guess here</h3>
        {answer.map((a, idx) => (
          <div key={idx} className="selected">{a.name}</div>
        ))}
      </div>

      <button onClick={checkAnswer}>✅ Submit</button>
      {message && <h3>{message}</h3>}
    </div>
  );
}

export default HarmonyGame;
