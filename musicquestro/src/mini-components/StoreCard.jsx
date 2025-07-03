import React from 'react'

function StoreCard({itemName, itemPrice, children}) {
  return (
    <div className='store-card flex fdc jc-c aic'>
        <img src="https://i.ibb.co/BVq668JC/Untitled-design-30.png" alt="" />
        <h3>{itemName}</h3>
        <h4><span><img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
        {itemPrice}{children}</h4>
      
    </div>
  )
}

export default StoreCard
