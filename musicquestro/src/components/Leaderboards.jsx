import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProtectedComponent from './ProtectedComponent'

function Leaderboards() {

  const navigate = useNavigate()

  return (
    <ProtectedComponent>
        <div className='fpage flex fdc jc-c aic'>
        <h1>Leaderboard</h1>
        <img onClick={()=> {
          navigate(-1)
        }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
      </div>
    </ProtectedComponent>
  )
}

export default Leaderboards
