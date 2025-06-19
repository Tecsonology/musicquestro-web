// BackgroundMusic.js
import React, { useEffect, useRef, useState } from 'react';
const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch((e) => {
          console.warn("Autoplay failed:", e);
        });
      }
      window.removeEventListener('click', tryPlay);
    };

    // Attempt to play music on first user interaction
    window.addEventListener('click', tryPlay);
    return () => window.removeEventListener('click', tryPlay);
  }, []);

  return (
    <audio ref={audioRef} autoPlay loop muted>
      <source src="" type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundMusic;