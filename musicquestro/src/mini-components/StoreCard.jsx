import React from 'react'
import { playInstrument} from '../components/IntstrumentPlayer'

function StoreCard({sound, imgItem, itemName, itemPrice, children, description}) {
  return (
    <div className='store-card flex fdc jc-c aic'>
        <img width={50} height={40} style={{margin: '0.4em 0'}} src={imgItem} alt="Untitled-design-85" border="0"
        onClick={()=> {
          playInstrument(sound)
        }}/>
        <h3 style={{fontWeight: 'bolder'}}>{itemName}</h3>

        <p style={{textAlign: 'center', marginTop: '1.5em', color: '#F5F5F5'}}>{description}</p>
        <h4 className='flex fdr aic jc-c'><span><img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
        {itemPrice}{children}</h4>
      
    </div>
  )
}

export default StoreCard
