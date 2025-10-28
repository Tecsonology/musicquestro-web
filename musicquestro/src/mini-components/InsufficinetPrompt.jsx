import React from 'react'
import Modal from 'react-modal'

function InsufficinetPrompt({insufficientMessage}) {
  return (
    <Modal
         isOpen={insufficientMessage}
         contentLabel="Shop Status"
         style={{
           overlay: {
             backgroundColor: "rgba(0, 0, 0, 0.8)",
             zIndex: 100,
           },
           content: {
             top: "50%",
             left: "50%",
             transform: "translate(-50%, -50%)",
             width: '50%',
             height: '2em',
             borderRadius: '0.5em',
             textAlign: 'center',
             padding: '0.5em 1em',
             color: 'white',
             backgroundColor: 'rgba(26, 22, 29, 1)',
             zIndex: 100,
             boxSizing: 'content-box',
             overflow: 'hidden'
           },
         }}
       >
        <div className='flex fdc aic jc-c'>
            <h5 style={{margin: 0}}>🥺 {insufficientMessage}</h5>
        </div>
       </Modal>
  )
}

export default InsufficinetPrompt
