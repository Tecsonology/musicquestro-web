import React from 'react'

function ShopStatus({message, approved}) {
  return (
    <div style={{ position: 'absolute', zIndex: '5', 
    backgroundColor: approved ? 'rgba(4, 87, 176, 0.99)': '#7d1717ff', textAlign: 'center', 
    top: '2em', padding: '1em', borderRadius: '1em', border: '3px solid yellow'}} className="shop-status">
      <h2>{approved ? '✅' : '🥺'}</h2>
      <h2 >{ message && message }</h2>
    </div>
  )
}

export default ShopStatus
