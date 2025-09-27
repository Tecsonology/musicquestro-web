import React from 'react'
import heart from '../assets/game-assets/ItemAssets/heart.png'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'



function SpellCard({name, quantity, image}) {
  return (
     <div className='flex fdc aic jc-c' style={{backgroundColor: '#7F03F3', borderRadius: '5px', padding: '0.3em', 
        margin: '1em', textAlign: 'center', width: '5em', borderBottom: '0.7em solid rgb(54, 2, 85)', border: '1px solid white'
        }}>
            <img width={50} src={
              name === 'Heart' ? heart :
              name === 'Replay' ? replay :
              name === 'Hint' ? hint : null
            } alt="" 
            style={{border: '1px solid #6800c9ff', marginBottom: '1em', backgroundColor: '#38026aff'}}
            />
            <h3 style={{margin: '0', color: 'white'}}>{name}</h3>
            <p className='flex fdc aic jc-c' style={{backgroundColor: '#38026a59', width: '100%', borderRadius: '1em', margin: '0.3em', padding: '0.1em 0.3em',
             color: 'white', fontWeight: 'bold',
            }}>X{quantity}</p>
        </div>
  )
}

export default SpellCard
