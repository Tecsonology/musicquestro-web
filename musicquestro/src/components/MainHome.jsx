import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/MainHome.css'

function MainHome() {

  const navigate = useNavigate() 

  return (
    <div className='fpage flex fdc aic jc-c' style={{marginBottom: '3em'}}>
         <img width={300} src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
         
         <div className='main-home-button flex fdc aic jc-c'>
            <button id='btnStory' onClick={()=> {
              navigate('story')
            }}>STORY</button>

          <button id='btnPlayGame' onClick={()=> {
              navigate('m')
          }}>PLAY</button>
         </div>

    </div>
  )
}

export default MainHome
