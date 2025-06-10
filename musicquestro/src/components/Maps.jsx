import React from 'react'
import { useNavigate } from 'react-router-dom'

function Maps() {

  const navigate = useNavigate()

  return (
    <div className='fpage' style={{backgroundImage: "url('https://i.ibb.co/HmSgs4B/Roblox-Screen-Shot20241125-112428379.png')"}}>
      <h1>Maps</h1>
      <button onClick={()=> {
        navigate('/rhythmGame')
      }}>Rhytm</button>

    </div>
  )
}

export default Maps
