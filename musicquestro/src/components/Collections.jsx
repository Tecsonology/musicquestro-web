import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { userids } from '../Token'
import { useState, useContext } from 'react'
import CollectionCard from '../mini-components/CollectionCard'
import ButtonBack from '../mini-components/ButtonBack'
import { UserContext } from './CurrentUserContext'

function Collections() {

  const [ collections, setCollections ] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  let instrCode;

  useEffect(()=> {
    currentUser ? setCollections(currentUser.collection) : null
  }, [])


  return (
    <div className='flex fdc jc-c aic'>
      
      <h1>Collections</h1>
      <p>Current Instrument: {currentUser ? currentUser.currentInstrument : null}</p>
        {
            currentUser ? 
            <>
                <CollectionCard itemName={`MusicLife X${currentUser && currentUser.life}`} />
                <div className="collection-list flex fdr aic jc-c">
                    {
                      currentUser && Object.values(currentUser.collection).map((item ,index)=> {

                        if(item==='Guitar'){
                          instrCode = 'sine'
                        } else if(item==='Game'){
                           instrCode = 'sawtooth'
                        } else if(item==='Flute'){
                           instrCode = 'sawtooth'
                        } else if(item==='Xylophone'){
                          instrCode = 'square'
                        }

                          return <CollectionCard key={index} itemName={item} instrCode={instrCode}/>
                        })
                    }
                </div>
                <button onClick={()=> {
                  window.location.href = '/store'
                }}>Back to Store</button>
            </> : <p>Getting your collections...</p>
        }
    </div>
  )
}

export default Collections
