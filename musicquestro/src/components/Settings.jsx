import React from 'react'
import '../styles/Settings.css'
import ButtonBack from '../mini-components/ButtonBack'
import BGMusic from './BGMusic'
import { useState } from 'react'

function Settings() {

  const [ volume, setVolume ] = useState(1)

  return (
    <div className='settings-container fpage flex fdc jc-c aic'>
      <ButtonBack />
      <BGMusic volume={volume} />
      <h1>Settings</h1>
      <input type="range" name="" id="" value={volume} />

    </div>
  )
}

export default Settings
