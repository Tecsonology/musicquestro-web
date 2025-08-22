import React from 'react'

function StoreCard({imgItem, itemName, itemPrice, children}) {
  return (
    <div className='store-card flex fdc jc-c aic'>
        <img width={40} height={40} style={{margin: '0.4em 0'}} src={imgItem} alt="Untitled-design-85" border="0"/>
        <h3>{itemName}</h3>
        <h4><span><img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
        {itemPrice}{children}</h4>
      
    </div>
  )
}

export default StoreCard
