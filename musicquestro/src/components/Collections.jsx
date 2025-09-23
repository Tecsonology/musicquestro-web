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
import close from '../assets/game-assets/Prompts/Close.png'


function Collections() {

  const navigate = useNavigate()
  const [ collections, setCollections ] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  let instrCode;

  useEffect(()=> {
    currentUser ? setCollections(currentUser.collection) : null
  }, [])


  return (
    <div className='collection-container fpage flex fdc aic'>
      
        {
            currentUser ? 
            <>
                
                <div className="collection-list glass-bg flex fdc aic jc-c">
                   <h3>My Collections</h3>
                    <img onClick={()=> navigate(-1)} style={{position: 'absolute', right: '0em', top: '0.2em', cursor: 'pointer', zIndex: '9'}} width={40} src={close} alt="" />
                    <div className='collection-cards'>
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
                  

                   
                </div>
                
            </> : <Loader />
        }
    </div>
  )
}

export default Collections
