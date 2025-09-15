import React from 'react'

function ClickEffect({play, type}) {

    


   const playMelody = (type = type)=> {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Define a simple melody: [frequency, duration, oscType]
  const melody = [
    { freq: 261.63, dur: 1, type: type },     // C4
    { freq: 293.66, dur: 0.5, type: type },   // D4
    { freq: 329.63, dur: 1, type: type }, // E4
    { freq: 349.23, dur: 2, type: type }, // F4
  ];

  let currentTime = audioCtx.currentTime;

  melody.forEach((note) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = note.type;
    osc.frequency.value = note.freq;

    // smooth fade-out
    gain.gain.setValueAtTime(0.3, currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.dur);

    osc.connect(gain).connect(audioCtx.destination);

    osc.start(currentTime);
    osc.stop(currentTime + note.dur);

    currentTime += note.dur;
  });
   }

   return(
    <>
        <button onClick={()=> {playMelody('sine')}}>sine</button>
        <button onClick={()=> {playMelody('square')}}>square</button>
        <button onClick={()=> {playMelody('sawtooth')}}>sawtooth</button>
        <button onClick={()=> {playMelody('triangle')}}>triangle</button>
        
    </>
   )
}

export default ClickEffect
