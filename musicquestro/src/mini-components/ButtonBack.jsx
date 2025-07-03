import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonBack() {

    const navigate = useNavigate()

  return (
     <img onClick={()=> {
            navigate('/h')
    }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
  )
}

export default ButtonBack
