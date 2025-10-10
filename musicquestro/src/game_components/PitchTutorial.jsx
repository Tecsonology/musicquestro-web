import React, { useState } from 'react';

// NOTE: Since this component is outside of PitchGame.jsx, 
// you must redefine the NOTES array or import it.
const NOTES = [
    300, 350, 400, 450, 500, 600, 650, 700, 750, 800,
    850, 900, 950, 1000
];

const PITCH_TUTORIAL_STEPS = [
    {
        title: "Welcome to Echoic Highlands! 🏔️",
        text: "This tutorial will guide you through the game's mechanics. You'll need to listen carefully to compare musical pitches. Ready to train your ears?",
        button: "Next",
    },
    {
        title: "The Task: Pitch Comparison",
        text: "In each round, you'll hear a short sequence of two distinct tones. The prompt will ask you to identify either the **HIGHEST** or **LOWEST** pitch. Listen to an example now!",
        button: "Listen to the notes 👂", 
    },
    {
        title: "High vs. Low Pitch",
        text: "A **HIGH** pitch sounds 'tinny' (a small whistle 🌬️). A **LOW** pitch sounds 'deep' or 'bassy' (a large bell 🔔). Try to identify which pitch was higher in the example you just heard.",
        button: "Next",
    },
    {
        title: "How to Answer",
        text: "After the tones play, you click on the Pitch Card (the '?') that corresponds to the correct tone. You're timed, so be quick and confident!",
        button: "Next",
    },
    {
        title: "Training Complete!",
        text: "You are now ready for the Echoic Highlands. Remember to use the Replay and Hint items when you need them. Good luck!",
        button: "Start Game 🚀",
    },
];

let context; // Audio context is defined outside to be persistent or accessible

// Function to initialize the Web Audio API context
const initializeAudio = () => {
    if (!context || context.state === 'closed') {
        // @ts-ignore
        context = new (window.AudioContext || window.webkitAudioContext)();
    } else if (context.state === 'suspended') {
        context.resume();
    }
};

// Simplified play notes function for the tutorial
const playTutorialNotes = async (noteIndices) => {
    initializeAudio();

    let delay = 0;
    // noteIndices should be an array of indexes from the NOTES array
    for (let x = 0; x < noteIndices.length; x++) {
        setTimeout(() => {
            // @ts-ignore
            const osc = context.createOscillator();
            // @ts-ignore
            const gainNode = context.createGain();
            const noteIndex = noteIndices[x];

            osc.type = 'sawtooth';
            osc.frequency.value = NOTES[noteIndex];

            gainNode.gain.setValueAtTime(1, context.currentTime);
            // Quick decay for a distinct sound
            gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 5000);

            osc.connect(gainNode);
            gainNode.connect(context.destination);

            osc.start();
            osc.stop(context.currentTime + 600 / 1000); // Stop after 600ms

        }, delay);
        delay += 2000; // 2 second pause between notes
    }
    return delay; // Return total duration for waiting
};


function PitchTutorial({ showTutorial, setShowTutorial }) {
    const [step, setStep] = useState(0);
    const [isListening, setIsListening] = useState(false);

    const currentStep = PITCH_TUTORIAL_STEPS[step];

    const handleNext = () => {
        if (step < PITCH_TUTORIAL_STEPS.length - 1) {
            setStep(step + 1);
        } else {
            // Last step: start the actual game
            setShowTutorial(false)
        }
    };

    const handleListenClick = () => {
        setIsListening(true);
        
        // Example: Play a low pitch (index 1) then a high pitch (index 12)
        // NOTES[1] = 350Hz, NOTES[12] = 950Hz
        const duration = playTutorialNotes([1, 12]); 

        // Wait for the notes to finish playing before enabling the "Next" button
        setTimeout(() => {
            setIsListening(false);
            setStep(step + 1); // Automatically move to the next step (step 2)
        }, duration + 500); // 500ms buffer after last note stops
    };

    return (
        <div className='pitch-tutorial-container tutorial tutorial-bg fpage flex fdc aic jc-c'>
            <p onClick={()=> setShowTutorial(false)}>{`Skip Tutorial >>>`}</p>
            <h1>{currentStep.title}</h1>
            <p className='tutorial-text'>{currentStep.text}</p>
            
            {/* Step 1: The Listening Demonstration */}
            {step === 1 ? (
                <button 
                    onClick={handleListenClick} 
                    className='tutorial-listen-button'
                    disabled={isListening}
                >
                    {isListening ? "Listening... 🎶" : currentStep.button}
                </button>
            ) : (
                // Default Next Button for all other steps
                <button 
                    onClick={handleNext} 
                    className='tutorial-next-button'
                    disabled={isListening}
                >
                    {currentStep.button}
                </button>
            )}

            {isListening && <p>Listen closely to the two tones!</p>}
        </div>
    );
}

export default PitchTutorial;