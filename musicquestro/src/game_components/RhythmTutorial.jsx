import React, { useState } from 'react';
const durations = [
  { name: "Rest (silent beat)", beats: 1, duration: 600, freq: 0, img: 'https://i.ibb.co/67NSSxxn/Untitled-design-74.png' },
  { name: "Quarter", beats: 1, duration: 600, freq: 500, img: 'https://i.ibb.co/WqXZ1fd/Untitled-design-71.png' },
  { name: "Half", beats: 2, duration: 1200, freq: 500, img: 'https://i.ibb.co/gnXRSb1/Untitled-design-75.png' },
  { name: "Whole", beats: 4, duration: 2400, freq: 500, img: 'https://i.ibb.co/zC0gwgG/Untitled-design-77.png' },
];

function RhythmTutorial({ showTutorial, setShowTutorial }) {
  const [page, setPage] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [sampleBeat, setSampleBeat] = useState(0);

  const playNote = (freq, duration) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    gainNode.gain.setValueAtTime(1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration / 1000);

    osc.connect(gainNode);
    gainNode.connect(context.destination);

    osc.start();
    osc.stop(context.currentTime + duration / 1000);
  };

  const lightBeatCircle = (beats, duration) => {
    setSampleBeat(0); 

    for (let i = 0; i < beats; i++) {
      setTimeout(() => {
        setSampleBeat(i + 1);
      }, i * (duration / beats));
    }

    setTimeout(() => {
      setSampleBeat(0);
    }, beats * (duration / beats));
  };

  return (
    <div style={{ position: 'absolute', zIndex: '10', backgroundColor: 'purple', color: 'black' ,}} className='tutorial tutorial-bg fpage flex fdc aic jc-c'>
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
        <img width={100}  src="/assets/Maestro.png" alt="" />
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
          <h3 style={{textAlign: 'center'}}>Each note symbol has corresponding beats that fills the measure</h3>
          {durations.map((item, index) => (
            <div key={index} className='flex fdr aic glass-bg' style={{margin: '0.3em', width: '20em', justifyContent: 'space-between'}}>
              <img style={{ padding: '0.5em 1em', margin: '1em', borderRadius: '1em', backgroundColor: 'red' }} width={20} src={item.img} alt={item.name} />
              <h4 style={{width: '10em'}}>{item.name} - {item.beats}</h4>
              <div className='flex fdr aic jc-c'>
                {[...Array(item.beats)].map((_, beatIndex) => (
                  <span key={beatIndex} style={{ width: '0.3em', height: '0.3em', backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', margin: '0 0.1em' }}></span>
                ))}
                <span style={{marginLeft: '0.5em'}}>beat/s</span>
              </div>
            </div>
          ))}
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

          <h1>Good luck!</h1>
          <button onClick={() => setShowTutorial(false)}>Thanks</button>
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
          <div style={{width: '15em', justifyContent: 'space-between'}} className="tutorial-buttons flex fdr aic">
            {page > 0 && <button onClick={() => setPage(page - 1)}>Previous</button>}
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default RhythmTutorial;
