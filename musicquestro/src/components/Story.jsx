import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import backBtn from '/src/assets/game-assets/Assets/Buttons/Back.png'
import arrowDown from '../assets/game-assets/AppAssets/arrowDown.png'
import { UserContext } from './CurrentUserContext'

import slide1 from "/src/assets/game-assets/Scenes(HQ)/1.png"
import slide2 from "/src/assets/game-assets/Scenes(HQ)/2.png"
import slide3 from "/src/assets/game-assets/Scenes(HQ)/3.png"
import slide4 from "/src/assets/game-assets/Scenes(HQ)/4.png"
import slide5 from "/src/assets/game-assets/Scenes(HQ)/5.png"
import slide6 from "/src/assets/game-assets/Scenes(HQ)/6.png"
import slide7 from "/src/assets/game-assets/Scenes(HQ)/7.png"
import slide8 from "/src/assets/game-assets/Scenes(HQ)/8.png"
import slide9 from "/src/assets/game-assets/Scenes(HQ)/9.png"
import slide10 from "/src/assets/game-assets/Scenes(HQ)/10.png"
import slide11 from "/src/assets/game-assets/Scenes(HQ)/11.png"
import slide12 from "/src/assets/game-assets/Scenes(HQ)/12(Before Rhythm Game).png"

import slide13 from "/src/assets/game-assets/Scenes(HQ)/13.png"
import slide14 from "/src/assets/game-assets/Scenes(HQ)/14(After Rhythm Game).png"
import slide15 from "/src/assets/game-assets/Scenes(HQ)/15.png"
import slide16 from "/src/assets/game-assets/Scenes(HQ)/16.png"
import slide17 from "/src/assets/game-assets/Scenes(HQ)/17.png"
import slide18 from "/src/assets/game-assets/Scenes(HQ)/18.png"
import slide19 from "/src/assets/game-assets/Scenes(HQ)/19.png"
import slide20 from "/src/assets/game-assets/Scenes(HQ)/20.png"
import slide21 from "/src/assets/game-assets/Scenes(HQ)/21.png"
import slide22 from "/src/assets/game-assets/Scenes(HQ)/22(Before Melody Game).png"
import slide23 from "/src/assets/game-assets/Scenes(HQ)/23.png"
import slide24 from "/src/assets/game-assets/Scenes(HQ)/24(After Melody Game).png"




import '../styles/Story.css'


function Story() {

  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [ scrollDown, setScrollDown ] = useState(false)
  const [ storyLoaded, setStoryLoaded ] = useState()

  useState(()=> {
    if(currentUser){
      setStoryLoaded(currentUser.story)
    }
  }, [currentUser])




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
        <img src={slide1} alt="" className="img-story" />
        <img src={slide2} alt="" className="img-story" />
        <img src={slide3} alt="" className="img-story" />
        <img src={slide4} alt="" className="img-story" />
        <img src={slide5} alt="" className="img-story" />
        <img src={slide6} alt="" className="img-story" />
        <img src={slide7} alt="" className="img-story" />
        <img src={slide8} alt="" className="img-story" />
        <img src={slide9} alt="" className="img-story" />
        <img src={slide10} alt="" className="img-story" />
        <img src={slide11} alt="" className="img-story" />
        <img src={slide12} alt="" className="img-story" />

        {
          currentUser && currentUser.maps.melody.isLocked === 'false' ?
          <div>
            <img src={slide12} alt="" className="img-story" />
            <img src={slide13} alt="" className="img-story" />
            <img src={slide14} alt="" className="img-story" />
            <img src={slide15} alt="" className="img-story" />
            <img src={slide16} alt="" className="img-story" />
            <img src={slide17} alt="" className="img-story" />
            <img src={slide18} alt="" className="img-story" />
            <img src={slide19} alt="" className="img-story" />
            <img src={slide20} alt="" className="img-story" />
            <img src={slide21} alt="" className="img-story" />
          
          </div> : <p>Chaper 2 Locked. Complete Rhythm Game first</p>
        }

         {
          currentUser && currentUser.maps.harmony.isLocked === 'false' ?
          <div>
            <img src={slide22} alt="" className="img-story" />
            <img src={slide23} alt="" className="img-story" />
            <img src={slide24} alt="" className="img-story" />
           
          </div> : <p>Chaper 3 Locked. Complete Melody Game first</p>
        }



      <button onClick={()=> {
        navigate('/h/m')
      }}
      style={{width: '90%', margin: '2em', padding: '0.5em 1em', fontSize: '1.2em', backgroundColor: 'green', borderRadius: '5px'}}
      >Play Game</button>
      </div>
    </div>
  )
}
 
export default Story
