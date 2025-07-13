import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext'

function CollectionCard({itemName, instrCode}) {

  const { currentUser } = useContext(UserContext)

  const updateCurrentInstrument =async()=> {
    if(currentUser){
      const userids = currentUser.userids
      const instrument = instrCode
      const updateInstrument = await axios.put('http://localhost:5000/api/change-instrument',
          {
            userids,
            instrument
          }
        )

        console.log(updateInstrument)
    }
  }



  return (
    <CurrentUserContext>
        <div className='collection-card flex fdc jc-c aic'>
        <img src="https://i.ibb.co/BVq668JC/Untitled-design-30.png" alt="" />
        <h3>{itemName}</h3>
        <h3>{instrCode}</h3>
        <button onClick={updateCurrentInstrument}>Use</button>
      
      
    </div>
    </CurrentUserContext>
  )
}

export default CollectionCard
