import React from 'react'

function AvatarChangePrompt({active, image, name}) {
  return (
    <div className='flex fdc aic jc-c' style={{ backgroundColor: 'rgba(4, 87, 176, 0.99)', textAlign: 'center', zIndex: '5',
    top: '7em', padding: '1em', borderRadius: '1em', border: '3px solid yellow', position: 'fixed'}}>
      <h4 style={{color: 'white'}}>Avatar changed</h4>
      <img width={150} src={image} alt="" />
      <h2>{name}</h2>
    </div>
  )
}

export default AvatarChangePrompt
