import React from 'react'

function StoreButton() {
  return (
    <div className='store-btn-container'>
      <button onClick={()=> {
        window.location.href = '/store'
      }}>Store</button>
    </div>
  )
}

export default StoreButton
