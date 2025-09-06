import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Story.css'


function Story() {

  const navigate = useNavigate()

  return (
    <div className='story-container fpage flex fdc aic jc-c'>
      <h1>Story</h1>
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
