import React from 'react'
import { playInstrument} from '../components/IntstrumentPlayer'

function StoreCard({sound, imgItem, itemName, itemPrice, children, description, setStatus }) {
  return (
    <div style={{width: '170px', padding:'1em', minHeight: '300px'}} className='store-card flex fdc aic'>
        <div style={{position: 'relative', backgroundColor: ' rgb(54, 2, 85)',
          width: '100%', height: '5em'}} className='flex fdc aic jc-c'>
          <img height={40} width={40} src={imgItem} alt="" 
          onClick={()=> {
            playInstrument(sound)
        }}/>

        </div>
        <h3 style={{fontWeight: 'bolder', color: 'white', marginTop: '1em', marginBottom: '0em'}}>{itemName}</h3>

        <p style={{textAlign: 'center', margin: '0 0 0.8em 0', color: '#F5F5F5', height: '3em',
         
        }}>{description}</p>
        <div>
          <h4 className='flex fdr aic jc-c'><span><img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
        {itemPrice}{children}</h4>
        </div>
      
    </div>
  )
}

export default StoreCard
