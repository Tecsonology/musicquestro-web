import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Story.css'


function Story() {

  const navigate = useNavigate()

  return (
    <div className='story-container fpage flex fdc aic jc-c'>
      <h1>Story</h1>
      <div className="story-wrapper flex fdc aic jc-c">
        <img src="https://i.ibb.co/Jj3MS4dQ/1.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/6RtX6FzG/2.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/Q3JTrWT4/3.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/9DyfVfs/4.png" alt="" className="img-story" />
      <img src="https://i.ibb.co/SLNCjpH/5.png" alt="" className="img-story" />
      <p style={{backgroundColor: 'gray'}}>Complete games to continue story...</p>
      <button onClick={()=> {
        navigate('/h/m')
      }}>Play Game</button>
      </div>
    </div>
  )
}
 
export default Story
