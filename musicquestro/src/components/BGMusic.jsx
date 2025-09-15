import React, { useEffect, useRef, useState, useContext } from 'react'
import bgmusic from '../assets/musics/bgmusic2.mp3'
import { useLocation } from 'react-router-dom'

function BGMusic(props) {
  
  const location = useLocation()
  const audioRef = useRef(null)

  
 useEffect(()=> {
    if(location.pathname.includes('/h')){
      audioRef.current.play()

      
    } else {
      audioRef.current.pause()
    }


 }, [location])

  return (

        <audio ref={audioRef} src={bgmusic} volume={0} autoPlay loop></audio> 
      

 
  )
}
    
export default BGMusic
