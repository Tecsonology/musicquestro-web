import React, { useState } from 'react'
import close from '../assets/game-assets/Prompts/Close.png'
import home from '../assets/game-assets/Prompts/home.png'
import retry from '../assets/game-assets/Prompts/retry.png'
import Modal from 'react-modal'

Modal.setAppElement("#root"); 

function PauseGame({isOpen, setIsOpen, setRunning}) {


  return (
      <Modal
      className={'pause-prompt flex fdc aic jc-c'}
        isOpen={isOpen}
        contentLabel="Example Modal"
        style={{
          content: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width:'80%',
            borderRadius: '2em'
           },
          overlay: {
             backgroundColor: "rgba(0, 0, 0, 0.94)", // dim background
          },
        }}
      >
        <div className='flex fdr aic jc-c'>
          <h1>Settings</h1>
          <img onClick={()=> {
            setIsOpen(false)
            setRunning(true)
          }} style={{position: 'absolute', right: '0em', top: '-1em', cursor: 'pointer'}} width={60} src={close} alt="" />
        </div>
        <button style={{border: '2px solid white'}} onClick={()=> {
          setIsOpen(false)
          setRunning(true)
        }}>Resume</button>
        <button className='flex fdr aic jc-c' style={{background: 'rgba(161, 53, 11, 1)', border: '2px solid white'}} 
          onClick={()=> {
            const userConfirm  = confirm("Are you sure you want to retry?")

            if(userConfirm){
              window.location.reload()
            }

        }}><span><img style={{marginRight: '0.5em'}} width={40} src={retry} alt="" /></span>Retry</button>
       {/** <button style={{backgroundColor: 'rgba(71, 5, 195, 1)', border: '2px solid white'}}>
          Back to Levels
        </button> */}
        <button style={{background: '#454', padding: '0', width: '8em', marginTop: '4em'}} onClick={()=> {
          const userConfirm = confirm("The game won't saved. Are you sure you want to leave the game?")
          if(userConfirm){
            window.location.href = '/h'
          }
        }}><span><img src={home} width={50} alt="" style={{background: 'transparent'}}/></span></button>

      </Modal>
  )
}

export default PauseGame
