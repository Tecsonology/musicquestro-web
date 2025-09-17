import React, { useEffect, useRef } from 'react'
import bgmusic from '../assets/musics/bgmusic2.mp3'
import { useLocation } from 'react-router-dom'

function BGMusic() {
  const location = useLocation()
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1 // ✅ set volume here once
    }

    if (location.pathname.includes('/h')) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [location])

  return (
    <audio
      ref={audioRef}
      src={bgmusic}
      autoPlay
      loop
    />
  )
}

export default BGMusic
