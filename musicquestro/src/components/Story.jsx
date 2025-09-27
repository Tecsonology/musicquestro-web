import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import backBtn from '/src/assets/game-assets/Assets/Buttons/Back.png'
import arrowDown from '../assets/game-assets/AppAssets/arrowDown.png'
import CurrentUserContext, { UserContext } from './CurrentUserContext'


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
        <img src="/src/assets/game-assets/Scenes(HQ)/1.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/2.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/3.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/4.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/6.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/7.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/8.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/9.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/10.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/11.png" alt="" className="img-story" />
        <img src="/src/assets/game-assets/Scenes(HQ)/12(Before Rhythm Game).png" alt="" className="img-story" />

        {
          storyLoaded && storyLoaded.chapter1.isLocked == 'false' ?
          <div>
            <img src="/src/assets/game-assets/Scenes(HQ)/13.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/14(After Rhythm Game).png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/15.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/16.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/17.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/18.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/19.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/20.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/21.png" alt="" className="img-story" />
          </div> : <p>Chaper 2 Locked. Complete Rhythm Game first</p>
        }

         {
          storyLoaded && storyLoaded.chapter2.isLocked == 'false' ?
          <div>
            <img src="/src/assets/game-assets/Scenes(HQ)/22(Before Melody Game).png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/23.png" alt="" className="img-story" />
            <img src="/src/assets/game-assets/Scenes(HQ)/24(After Melody Game).png" alt="" className="img-story" />
           
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
