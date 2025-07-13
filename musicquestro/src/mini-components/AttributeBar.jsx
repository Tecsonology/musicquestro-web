import React, { useContext, useState} from 'react'
import CurrentUserContext from '../components/CurrentUserContext'
import { UserContext } from '../components/CurrentUserContext'

function AttributeBar({onClick, children }) {

    const { currentUser } = useContext(UserContext)

  return (
     <CurrentUserContext>
        <div className='attribute-bar flex fdr aic jc-c' style={{margin: '1em', backgroundColor: '#0199DA', color: 'black', borderRadius: '1em', padding: '0.4em'}}>
                <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em', marginRight: '0.6em'}}>
                  <span><img style={{width: '0.7em', marginRight: '0.5em', padding: '0'}} src="https://i.ibb.co/BVq668JC/Untitled-design-30.png"alt="" /></span>{currentUser && currentUser.life}
                 </h3> 
                 <span >
                  <button className='flex fdc aic jc-c' id='shop' onClick={onClick} style={{padding: '0.5em', position: 'relative', left: '-1.3em', backgroundColor: 'black', borderRadius: '1em', width: '0.5em', height: '0.5em'}}>+</button></span>
                 <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em'}}>
                  <span><img style={{width: '1em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
                  {currentUser && currentUser.musicCoins}</h3>

                  {children}
        </div>
     </CurrentUserContext>
  )
}

export default AttributeBar
