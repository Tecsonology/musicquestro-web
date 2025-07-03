import React from 'react'

function ShopStatus({message}) {
  return (
   
      <p style={{ position: 'fixed', zIndex: '5', backgroundColor: 'black', textAlign: 'center'}}>{ message && message }</p>

  )
}

export default ShopStatus
