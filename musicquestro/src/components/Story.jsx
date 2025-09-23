import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backBtn from '/src/assets/game-assets/Assets/Buttons/Back.png'
import arrowDown from '../assets/game-assets/AppAssets/arrowDown.png'

import '../styles/Story.css'


function Story() {

  const navigate = useNavigate()
  const [ scrollDown, setScrollDown ] = useState(false)


  return (
    <div className='story-container fpage flex fdc aic jc-c'>
      <div className='flex aic jc-c' style={{position: 'relative', width: '100%'}}  >
          <h1>Story</h1>
          <div className='flex fdc aic jc-c' style={{backgroundColor: 'white', borderRadius: '50%', position: 'fixed', right: '1em', top: '1em',  }}>
            <img onClick={()=> navigate(-1)} width={40} src={backBtn} alt="" />
            
          </div>
          <img onClick={()=> {
             if(!scrollDown){
                window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
              setScrollDown(true)
             } else if(scrollDown){
                window.scrollTo({
                  top: document.body.scrollTop = 0,
                  behavior: "smooth",
                })
                setScrollDown(false)
             }

          }} style={{position: 'fixed', right: '1em', top: '4em', opacity: '0.2',
            transform: scrollDown ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s ease-in-out', cursor: 'pointer'
          }} src={arrowDown} alt="" />
      </div>
      <div className="story-wrapper flex fdc aic jc-c">
        <img src="https://i.ibb.co/Zp4p9k10/1.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/VY5Pjk3G/2.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/Kj5Lpyb3/3.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/C5sDcFM9/4.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/HD9BHDh1/5.png" alt="" className="img-story" />
      <p style={{backgroundColor: 'gray'}}>Complete games to continue story...</p>
      <button onClick={()=> {
        navigate('/h/m')
      }}>Play Game</button>
      </div>
    </div>
  )
}
 
export default Story
