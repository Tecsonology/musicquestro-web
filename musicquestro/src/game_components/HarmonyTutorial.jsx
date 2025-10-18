import React from 'react'
import { useState } from 'react';

function HarmonyTutorial({ showTutorial, setShowTutorial, allNotes, chords, playFrequencies, onStartGame }) {
  const [currentTutorialChord, setCurrentTutorialChord] = useState(null);

  /**
   * Handles clicking a chord button in the tutorial.
   * Plays the chord audio and displays its constituent notes.
   * @param {Object} chord - The chord object to demonstrate.
   */
  const handleTutorialChordClick = (chord) => {
    setCurrentTutorialChord(chord);
    
    // Find frequencies for the chord notes
    const frequencies = chord.notes.map(noteName => {
      const note = allNotes.find(n => n.note === noteName);
      if (!note) {
        console.error(`Frequency not found for note: ${noteName}`);
        return null;
      }
      return note.frequency;
    }).filter(f => f !== null);

    // Play the sounds
    if (frequencies.length > 0) {
      playFrequencies(frequencies);
    }
  };

  return (
    <>
        {
                showTutorial ? 
                    <div style={{position: 'absolute', zIndex: '10'}} className='tutorial tutorial-bg fpage flex fdc aic jc-c'>
            <button
              style={{ position: 'absolute', top: '1em', right: '1em', backgroundColor: 'transparent', textDecoration: 'underline', color: 'gray' }}
              onClick={() => setShowTutorial(false)}
            >
              Skip tutorial &gt;&gt;
            </button>
                        
            <h1 style={{color: 'rgba(125, 0, 251, 0.91)'}}>Chord Harmony Tutorial</h1>
            <div className="flex fdr aic jc-c">
              <img width={40} src="../assets/Maestro.png" alt="" />
              <p>
                Click on any chord below to hear how it sounds and see exactly which notes are used to build it.
            </p>
            </div>

            {/* Display Current Chord Information */}
            <div className="w-full max-w-4xl min-h-[100px] flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-inner transition-all duration-300">
                {currentTutorialChord ? (
                <div className="text-center">
                    <h2 style={{color: 'black'}}>{currentTutorialChord.name}</h2>
                    <p className="text-xl text-gray-100 mt-2">
                    <span className="font-medium text-blue-300">Notes:</span> 
                    <span style={{color: 'white', padding: '0.5em', backgroundColor: 'green'}}>
                        {currentTutorialChord.notes.join(' - ')}
                    </span>
                    </p>
                </div>
                ) : (
                <p className="text-gray-400 text-xl animate-pulse">Select a chord to begin learning!</p>
                )}
            </div>

            {/* Chord Selection Buttons - No longer need the Array.isArray check since chords is guaranteed in module scope */}
            <div className="flex fdr aic jc-c" style={{flexWrap: 'wrap'}}>
                {chords.map(chord => (
                <button 
                    key={chord.name} 
                    onClick={() => handleTutorialChordClick(chord)}
                    className='tut-btn'
        
                >
                    {chord.name}
                </button>
                ))}
            </div>

            </div> : null
        }
    </>
  );
}

export default HarmonyTutorial
