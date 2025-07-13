import React, { useEffect, useRef, useContext,useState } from 'react';
import { PitchScore } from './PitchGame';

const noteYPositions = {
  'do': 400,
  're': 350,
  'mi': 300,
  'fa': 250,
  'so': 200,
  'la': 150,
  'ti': 100,
  'do_high': 50
};

const noteFrequencies = {
  'do': 100.63,
  're': 200.66,
  'mi': 300.63,
  'fa': 400.23,
  'so': 500.0,
  'la': 600.0,
  'ti': 800.88,
  'do_high': 1000.25
};

const notes = Object.keys(noteYPositions);


const HighPitch = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const [pitchIndex, setPitchIndex] = useState(0);
  const { score, setScore } = useContext(PitchScore)

  const [gameRunning, setGameRunning] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const [pipeConfig, setPipeConfig] = useState({
    width: 120,
    spacing: 150,
    rate: 170,
  });

  const pipes = useRef([]);
  const stars = useRef([]);
  const frame = useRef(0);
  const pipeSpeed = useRef(1.5);
  const animationRef = useRef();
  const birdYRef = useRef(240);

  // Responsive pipe config
  useEffect(() => {
    const updatePipeConfig = () => {
      if (window.innerWidth <= 767) {
        setPipeConfig({
          width: 80,
          spacing: 100,
          rate: 300,
        });
      } else {
        setPipeConfig({
          width: 120,
          spacing: 150,
          rate: 170,
        });
      }
    };
    updatePipeConfig();
    window.addEventListener('resize', updatePipeConfig);
    return () => window.removeEventListener('resize', updatePipeConfig);
  }, []);

  // Prevent scroll when sliding range input on mobile
  useEffect(() => {
    const slider = sliderRef.current;
    let startX = 0, startY = 0;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);
      if (dy > dx) e.preventDefault();
    };

    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart, { passive: false });
      slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  const playNote = async (freq) => {
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.7, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2);
  };

  const resetGame = () => {
    pipes.current = [];
    stars.current = [];
    frame.current = 0;
    pipeSpeed.current = 1.5;
    birdYRef.current = canvasRef.current.height / 2;
    setScore(0);
    setGameRunning(true);
    setShowDialog(false);
  };

  const drawBird = (ctx) => {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('♪', 50, birdYRef.current + 15);
  };

  const drawPipes = (ctx) => {
    for (let pipe of pipes.current) {
      ctx.fillStyle = '#22822';
      ctx.fillRect(pipe.x, 0, pipeConfig.width, pipe.topHeight);
      ctx.fillRect(pipe.x, pipe.topHeight + pipeConfig.spacing, pipeConfig.width, ctx.canvas.height);
    }
  };

  const drawStars = (ctx) => {
    ctx.fillStyle = 'yellow';
    for (let star of stars.current) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const moveObjects = () => {
    // Pipes
    for (let i = pipes.current.length - 1; i >= 0; i--) {
      pipes.current[i].x -= pipeSpeed.current;
      if (pipes.current[i].x + pipeConfig.width < 0) {
        pipes.current.splice(i, 1);
        setScore(prev => prev + 1);
      }
    }

    // Stars
    for (let i = stars.current.length - 1; i >= 0; i--) {
      stars.current[i].x -= pipeSpeed.current;
      if (stars.current[i].x + 8 < 0) {
        stars.current.splice(i, 1);
      }
    }
  };

  const spawnPipesAndStars = () => {
    if (frame.current % pipeConfig.rate === 0) {
      const topHeight = Math.floor(Math.random() * (canvasRef.current.height - pipeConfig.spacing));
      const pipeX = canvasRef.current.width;

      pipes.current.push({ x: pipeX, topHeight });

      // Add a star inside the pipe gap
      const gapStart = topHeight;
      const gapEnd = topHeight + pipeConfig.spacing;
      const starY = Math.floor(Math.random() * (gapEnd - gapStart - 20)) + gapStart + 10;
      stars.current.push({ x: pipeX + pipeConfig.width + 50, y: starY });
    }
  };

  const checkCollisions = () => {
    for (let pipe of pipes.current) {
      if (50 + 20 > pipe.x && 50 < pipe.x + pipeConfig.width) {
        if (birdYRef.current < pipe.topHeight || birdYRef.current + 20 > pipe.topHeight + pipeConfig.spacing) {
          return true;
        }
      }
    }
    return birdYRef.current + 20 > canvasRef.current.height || birdYRef.current < 0;
  };

  const checkStarCollection = () => {
    for (let i = stars.current.length - 1; i >= 0; i--) {
      const star = stars.current[i];
      const dx = star.x - 50;
      const dy = star.y - birdYRef.current;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        stars.current.splice(i, 1);
        setScore(prev => prev + 5);
      }
    }
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pipeSpeed.current = 1.5 + Math.min(score * 0.05, 3);

    moveObjects();
    spawnPipesAndStars();
    drawBird(ctx);
    drawPipes(ctx);
    drawStars(ctx);
    checkStarCollection();

    if (checkCollisions()) {
      setGameRunning(false);
      setShowDialog(true);
      return;
    }

    frame.current++;
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    birdYRef.current = noteYPositions[notes[pitchIndex]];
    playNote(noteFrequencies[notes[pitchIndex]]);
  }, [pitchIndex]);

  useEffect(() => {
    if (gameRunning) {
      resetGame();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameRunning]);

  return (
       <div className="pitch-container fpage flex fdc aic jc-c">
     
      <div id="gameContainer">
        <canvas
          id="gamecanvas"
          ref={canvasRef}
          width="1000"
          height="480"
          style={{ backgroundColor: 'transparent', border: '1px solid white', maxWidth: '100%' }}
        ></canvas>
      </div>

      <div className="slider-container flex fdr aic jc-c" style={{ marginTop: '1em' }}>
        <p>Low</p>
        <input
          ref={sliderRef}
          type="range"
          id="pitchSlider"
          min="0"
          max="7"
          step="1"
          value={pitchIndex}
          onChange={(e) => setPitchIndex(parseInt(e.target.value))}
          style={{ width: '20em', margin: '0 1em' }}
        />
        <p>High</p>
      </div>

      {showDialog && (
        <div
          id="gameOverDialog"
          style={{
            background: '#fff',
            padding: 20,
            position: 'absolute',
            color: 'black',
            borderRadius: 8,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <h2>🎶 Game Over 🎶</h2>
          <p>Your score: {score}</p>
          <button onClick={() => setGameRunning(true)}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default HighPitch;
