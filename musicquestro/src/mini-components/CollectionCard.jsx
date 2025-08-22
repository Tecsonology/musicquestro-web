import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import CurrentUserContext, { UserContext } from '../components/CurrentUserContext'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function CollectionCard({itemName, instrCode}) {

  const { currentUser } = useContext(UserContext)

  const updateCurrentInstrument =async()=> {
    if(currentUser){
      const userids = currentUser.userids
      const instrument = instrCode
      const updateInstrument = await axios.put(`${VITE_NETWORK_HOST}/api/change-instrument`,
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
          <button disabled={currentUser.currentInstrument === instrCode} onClick={updateCurrentInstrument}>
            {currentUser.currentInstrument === instrCode ? 'Already used' : 'Use this'}
          </button>
      </div>
    </CurrentUserContext>
  )
}

export default CollectionCard
