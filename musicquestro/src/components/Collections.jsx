import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { userids } from '../Token'
import { useState, useContext } from 'react'
import CollectionCard from '../mini-components/CollectionCard'
import ButtonBack from '../mini-components/ButtonBack'
import { UserContext } from './CurrentUserContext'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import '../styles/Animation.css'

function Collections() {

  const navigate = useNavigate()
  const [ collections, setCollections ] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  let instrCode;

  useEffect(()=> {
    currentUser ? setCollections(currentUser.collection) : null
  }, [])


  return (
    <div className='collection-container fpage flex fdc aic' style={{paddingTop: '5em',}}>
      <button style={{position: 'absolute', top: '1em', left: '1em', backgroundColor: 'transparent'}} 
        onClick={()=> { navigate(-1)}}>{`< Back to Profile`}</button>
      
        <h2>Collections</h2>
     
        {
            currentUser ? 
            <>
                
                <div className="collection-list glass-bg">
                    {
                      currentUser.collection && currentUser.collection.length > 0 ? Object.values(currentUser.collection).map((item ,index)=> {

                        if(item==='Guitar'){
                          instrCode = 'sine'
                        } else if(item==='Game'){
                           instrCode = 'triangle'
                        } else if(item==='Flute'){
                           instrCode = 'sawtooth'
                        } else if(item==='Xylophone'){
                          instrCode = 'square'
                        }

                          return <CollectionCard key={index} itemName={item} instrCode={instrCode}/>
                        }) : ( <p>No collections yet</p>)
                    }
                </div>
                
            </> : <Loader />
        }
    </div>
  )
}

export default Collections
