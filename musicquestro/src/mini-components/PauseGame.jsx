import React from 'react'
import close from '../assets/game-assets/Prompts/Close.png'
import home from '../assets/game-assets/Prompts/home.png'
import retry from '../assets/game-assets/Prompts/retry.png'

function PauseGame(props) {

  return (
      <div className="pause-prompt flex fdc aic jc-c">
      <div className='flex fdr aic jc-c'>
        <h1>Settings</h1>
        <img style={{position: 'relative', right: '-3em'}} width={50} src={close} alt="" />
      </div>
        <button onClick={()=> {
          props.setPause(false)
        }}>Resume</button>
        <button className='flex fdr aic jc-c' style={{background: 'red',}} onClick={()=> {
          window.location.reload()
        }}><span><img style={{marginRight: '0.5em'}} width={40} src={retry} alt="" /></span>Retry</button>
        <button style={{background: 'blue', padding: '0', width: '8em'}} onClick={()=> {
          window.location.href = '/h'
        }}><span><img src={home} width={50} alt="" style={{background: 'transparent'}}/></span></button>

    </div>
  )
}

export default PauseGame
