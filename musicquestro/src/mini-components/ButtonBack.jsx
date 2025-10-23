import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReturnBTn from '../assets/game-assets/Assets/Buttons/Returnbtn.png'

function ButtonBack() {

    const navigate = useNavigate()

  return (
     <img  onClick={()=> {
            navigate('/h')
    }} className='btn-back' src={ReturnBTn} alt="" />
  )
}

export default ButtonBack
