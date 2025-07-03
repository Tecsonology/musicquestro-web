import React from 'react'

function CollectionCard({itemName}) {
  return (
    <div className='collection-card flex fdc jc-c aic'>
        <img src="https://i.ibb.co/BVq668JC/Untitled-design-30.png" alt="" />
        <h3>{itemName}</h3>

        <button>Use</button>
      
      
    </div>
  )
}

export default CollectionCard
