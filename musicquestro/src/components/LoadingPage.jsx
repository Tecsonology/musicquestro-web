import React from 'react'
import bg from '../assets/game-assets/Assets/BackGround/NormalBG/MainBG.png'
function LoadingPage() {
  return (
    <div style={{ zIndex: '20',
        background: '#140394',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        position: 'fixed'
      }} 
    
    className='loadingBg fpage flex fdc aic jc-c'>
      <div className='loaderPage'></div>
      
      <h3 style={{marginTop: '4em', color: 'white'}}>Hang on there! Please wait...</h3>
    </div>
  )
}

export default LoadingPage



