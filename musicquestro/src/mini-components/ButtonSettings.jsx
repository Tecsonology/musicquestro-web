import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonSettings() {

    const navigate = useNavigate()

  return (
    <button style={{position: 'absolute', bottom: '2em', right: '2em'}}
    onClick={()=> {
        navigate('/01')
    }}>
        Settings
    </button>
  )
}

export default ButtonSettings
