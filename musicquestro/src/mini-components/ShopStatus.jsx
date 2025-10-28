import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root');

function ShopStatus({ pic, message, approved, isOpen, setIsOpen }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
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
          width: '70%',
          borderRadius: '1em',
          textAlign: 'center',
          padding: '1em',
          backgroundColor: approved ? 'rgba(4, 87, 176, 0.99)' : '#7d1717ff',
          color: 'white',
          border: '3px solid yellow',
          zIndex: 100,
          boxSizing: 'content-box'
        },
      }}
    >
      <div className='flex fdc aic jc-c'>
        <h3 style={{color: 'white'}}>{approved ? '✅ Purchase successful!' : '❌ Purchase failed'}</h3>
      <img style={{border: '1px solid rgba(255, 255, 255, 0.17)', backgroundColor: 'rgba(99, 99, 99, 0.33)', padding: '0.5em', borderRadius: '50%'}} width={100} src={pic} alt="" />
      <button style={{width: '10em', backgroundColor: 'rgba(46, 51, 96, 0.28)'}} onClick={() => setIsOpen(false)}>Okay</button>
      </div>
    </Modal>
  )
}

export default ShopStatus;
