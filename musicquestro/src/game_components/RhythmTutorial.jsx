import React, { useState, useRef, useCallback } from 'react';

const durations = [
  { name: "Rest (silent beat)", beats: 1, duration: 600, freq: 0, img: 'https://i.ibb.co/67NSSxxn/Untitled-design-74.png',
    desc: 'A rest is a musical symbol indicating a period of silence, just as a note indicates a period of sound.'
   },
  { name: "Quarter", beats: 1, duration: 600, freq: 500, img: 'https://i.ibb.co/WqXZ1fd/Untitled-design-71.png',
    desc: 'A quarter note gets one beat, meaning it has a duration of one beat in musical time'
   },
  { name: "Half", beats: 2, duration: 1200, freq: 500, img: 'https://i.ibb.co/gnXRSb1/Untitled-design-75.png',
    desc: 'This can refer to two things in music: a time signature of 2/2, where a half note gets the beat, or a 4/4 time signature where a single half note is held for two beats. '
   },
  { name: "Whole", beats: 4, duration: 2400, freq: 500, img: 'https://i.ibb.co/zC0gwgG/Untitled-design-77.png',
    desc: 'A whole note has four beats in most common time signatures, like \(4/4\), meaning its sound is sustained for the entire duration of a measure.'
   },
];

function RhythmTutorial({ showTutorial, setShowTutorial }) {
  const [page, setPage] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [sampleBeat, setSampleBeat] = useState(0);

  // 1. Create a persistent AudioContext using useRef
  const audioContextRef = useRef(null);

  const getAudioContext = () => {
    if (audioContextRef.current === null) {
      // Initialize the AudioContext only once
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // 2. Wrap playNote in useCallback to avoid recreating it on every render, 
  // and use the persistent context.
  const playNote = useCallback((freq, duration) => {
    // Only play sound if frequency is > 0
    if (freq === 0) return;
    
    const context = getAudioContext();
    
    // Resume context if it's suspended (common on initial user interaction)
    if (context.state === 'suspended') {
      context.resume();
    }
    
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    // Connect nodes
    osc.connect(gainNode);
    gainNode.connect(context.destination);

    // Envelope for click prevention/smooth stop
    gainNode.gain.setValueAtTime(1, now);
    // Use linearRampToValueAtTime for a smooth, audible stop before 0
    // exponentialRampToValueAtTime to 0.0001 can still cause clicks if it's too fast
    gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000); 

    // Start and stop the oscillator
    osc.start(now);
    osc.stop(now + duration / 1000);
    
    // Clean up oscillator and gain node after they stop to free up resources
    // This is less critical for short notes but good practice
    osc.onended = () => {
      osc.disconnect();
      gainNode.disconnect();
    };
  }, []); // Empty dependency array means this function is only created once

  const lightBeatCircle = (beats, duration) => {
    setSampleBeat(0); 

    for (let i = 0; i < beats; i++) {
      setTimeout(() => {
        setSampleBeat(i + 1);
      }, i * (duration / beats));
    }

    setTimeout(() => {
      setSampleBeat(0);
    }, duration); // Total duration is beats * (duration / beats), which simplifies to just duration
  };

  return (
    <div style={{ position: 'absolute', zIndex: '10', backgroundColor: 'purple', color: 'black' ,}} className='tutorial tutorial-bg fpage flex fdc aic jc-c'>
      {/* ... (Existing page 0, 1, 2, 4 components remain the same) ... */}

      {page === 0 && (
        <>

          <h3 style={{fontSize: '2em'}} className='gradient-text'>Welcome to Rhythm Idol!</h3>
                    <img width={300} src="/assets/Maestro.png" alt="" />

          <p style={{ textAlign: 'center', padding: '0.2em', backgroundColor: 'white', fontWeight: 'bold'}}>Hi, im Maestro! I'll guide you about this Rhythm Game, so you can help me to bring back the old 
            MusicQuestro land!
          </p>
        </>
      )}

      {page === 1 && (
        <>
        <img width={100}   src="/assets/Maestro.png" alt="" />
          <h3 style={{backgroundColor: 'white', padding: '1em'}}>This is the sample of a 1 Musical staff with 4 beats</h3>
          <div className='input-notes'>
            <hr /><hr /><hr /><hr /><hr />
            <div style={{
              width: '15em', display: 'flex', justifyContent: 'space-evenly',
              position: 'relative', top: '-2em', right: '-5em'
            }}>
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
            </div>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <div className='flex fdr aic'>
            <img width={100} src="/assets/Maestro.png" alt="" />
            <h3 style={{textAlign: 'left'}}>Each note symbol has corresponding beats that fills the measure</h3>
          </div>
          <div className='flex fdr aic jc-c' style={{flexWrap: 'wrap'}}>
            {durations.map((item, index) => (
            <div key={index} className='flex fdc aic glass-bg' style={{margin: '0.3em', width: '12em', height: '17em', justifyContent: 'flex-start', boxSizing: 'border-box'}}>
              <img
              onClick={()=> {
                playNote(item.freq, item.duration);
              }}
              
              style={{ padding: '0.5em 1em', margin: '1em', borderRadius: '1em', backgroundColor: '#344', cursor: 'pointer' }} width={20} src={item.img} alt={item.name} />
              <h4 style={{margin: 0}}>{item.name} - {item.beats}</h4>
              <p style={{
                fontSize: item.name === 'Half' ? '0.8em' : '1em'
              }}>{item.desc}</p>
              <div className='flex fdr aic jc-c'>
                {[...Array(item.beats)].map((_, beatIndex) => (
                  <span key={beatIndex} style={{ width: '0.3em', height: '0.3em', backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', margin: '0 0.1em' }}></span>
                ))}
                <span style={{marginLeft: '0.5em'}}>beat/s</span>
              </div>
            </div>
          ))}
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div className="flex fdc aic jc-c">
            <img style={{position: 'absolute', zIndex: '-1', bottom: '-15em'}} width={500} src="/assets/Maestro.png" alt="" />

            <h3>Great! Now you can try to play a rhythm by clicking the note buttons below</h3>

            <p style={{fontFamily: 'Arial', textWrap: 'wrap'}}>Click each music note to check its beats</p>

            <div style={{margin: '0.5em 0 3em 0'}} className="flex fdr">
              {[1, 2, 3, 4].map((beat) => (
                <div
                  className='flex fdr aic jc-c'
                  key={beat}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    margin: '0 10px',
                    backgroundColor: beat === sampleBeat ? 'green' : '#ccc',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <span style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                    {beat}
                  </span>
                </div>
              ))}
            </div>

            <div style={{backgroundColor: 'white', margin: '1em', borderRadius: '1em'}} className="flex fdr">
              {durations.map((item, index) => (
                <div
                  key={index}
                  className='flex fdr aic jc-c'
                  onClick={() => {
                    lightBeatCircle(item.beats, item.duration);
                    playNote(item.freq, item.duration);
                  }}
                >
                  <img style={{ backgroundColor: 'black', padding: '0.5em 1em', margin: '1em', borderRadius: '1em' }} width={15} src={item.img} alt={item.name} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {page === 4 && (
        <>
          <img style={{position: 'absolute', zIndex: '-1', bottom: '-10em'}} width={500} src="/assets/Maestro.png" alt="" />
          <h2 style={{color: 'black'}}>That's all for now.</h2>
          <h1 style={{color: 'black', margin: 0}}>Good luck!</h1>
          <button style={{width: '10em', backgroundColor: 'green'}} onClick={() => setShowTutorial(false)}>Got it</button>
          <button onClick={()=> setPage(page -1)} style={{position: 'absolute', bottom: '2em', right: '3em'}}>{`<`}</button>
        </>
      )}

      {page !== 4 && (
        <>
          <div className="tutorial-wrapper" >
            <button
              style={{ position: 'absolute', top: '1em', right: '1em', backgroundColor: 'transparent', textDecoration: 'underline', color: 'gray' }}
              onClick={() => setShowTutorial(false)}
            >
              Skip tutorial &gt;&gt;
            </button>
          </div>
          <div style={{width: '15em', justifyContent: 'space-between', position: 'absolute', bottom: '2em'}} className="tutorial-buttons flex fdr aic">
            {page > 0 && <button className='control-page-button' onClick={() => setPage(page - 1)}>Previous</button>}
            <button className='control-page-button' onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default RhythmTutorial;