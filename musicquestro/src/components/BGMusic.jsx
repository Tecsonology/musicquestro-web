import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import bgmusic from "../assets/musics/bgmusic2.mp3";

function BGMusic() {
  const location = useLocation();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (location.pathname.includes("/h")) {
      audio.play().catch(err => {
        console.warn("Autoplay blocked until user interacts:", err);
      });
    } else {
      audio.pause();
      audio.currentTime = 0; // reset if you want
    }

    return () => {
      audio.pause(); // stop on unmount
    };
  }, [location]);

  return (
    <audio ref={audioRef} src={bgmusic} loop />
  );
}

export default BGMusic;
