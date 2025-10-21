import React from 'react'
import Modal from 'react-modal'
import { useState } from 'react';

Modal.setAppElement("#root");

function ShopStatus({message, approved, isOpen, setIsOpen}) {


  return (
    <Modal
          className={'pause-prompt flex fdc aic jc-c'}
            isOpen={isOpen}
            contentLabel="Example Modal"
            style={{
              content: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width:'80%',
                borderRadius: '2em', position: 'absolute', zIndex: '10', 
                backgroundColor: approved ? 'rgba(4, 87, 176, 0.99)': '#7d1717ff', textAlign: 'center', 
                bottom: '5em', padding: '1em', borderRadius: '1em', border: '3px solid yellow'
                      },
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.94)", // dim background
                      },
            }}
          >
           
          <h2>{approved ? '✅' : '🥺'}</h2>
          <h2 >{ message && message }</h2>

    </Modal>
  
  )
}

export default ShopStatus
