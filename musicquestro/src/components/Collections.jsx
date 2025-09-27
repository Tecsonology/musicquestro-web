import axios from 'axios'
import React from 'react'
import { useEffect, useContext } from 'react'
import { useState,  } from 'react'
import CollectionCard from '../mini-components/CollectionCard'
import ButtonBack from '../mini-components/ButtonBack'
import { UserContext } from './CurrentUserContext'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import '../styles/Animation.css'
import close from '../assets/game-assets/Prompts/Close.png'
import AvatarShopCard from '../mini-components/AvatarShopCard'
import SpellCard from '../mini-components/SpellCard'

import devil from '../assets/AvatarShopItems/devil.png'
import dog from '../assets/AvatarShopItems/Dog.png'
import cat from '../assets/AvatarShopItems/Cat.png'
import bunny from '../assets/AvatarShopItems/Bunny.png'

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';

function Collections() {

  const navigate = useNavigate()
  const [ collections, setCollections ] = useState()
  const [ userItems, setUserItems ] = useState()
  const [ activeShow, setActiveShow ] = useState('instrument')
  const { currentUser, setCurrentUser } = useContext(UserContext)
  let instrCode;

  useEffect(()=> {
    currentUser ? setCollections(currentUser.collection) : null
    if(currentUser){
      setUserItems(currentUser.items)
    }
  }, [])

  const changeAvatar = async (image) => {
    image = image === 'Friend' ? friend :
            image === 'Devil' ? devil :
            image === 'Doggie' ? dog :
            image === 'Cat' ? cat :
            image === 'Bunny' ? bunny : null

     const userid = currentUser ? currentUser.userids : null

     console.log(this)

    try {
      
       const change = await axios.put(`${VITE_NETWORK_HOST}/update-avatar`,
          {
              userids: userid,
              avatar: image
            })

        if(change){
          const updatedUser = {...currentUser, avatar: image}
          setCurrentUser(updatedUser)
          localStorage.setItem('avatar', image)
        }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='collection-container fpage flex fdc aic'>
      
        {
            currentUser ? 
            <>
                
                <div className="collection-list glass-bg flex fdc aic jc-c">
                   <h3 style={{color: 'white'}}>My Collections</h3>
                    <div style={{marginBottom: '1em'}} className='cat-items-wrapper flex fdr aic jc-c'>
                        <button onClick={()=> {setActiveShow('instrument')}}>Instrument</button>
                        <button onClick={()=> {setActiveShow('spells')}}>Spells</button>
                        <button onClick={()=> {setActiveShow('avatars')}}>Avatars</button>
                      </div>
                 
                    <img onClick={()=> navigate(-1)} style={{position: 'absolute', right: '0em', top: '0.2em', cursor: 'pointer', zIndex: '9'}} width={40} src={close} alt="" />
                    {
                      activeShow === 'instrument' ?
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
                    </div> : null
                    }
                   {
                      activeShow === 'spells' ?
                      <div className='flex fdr aic jc-c' style={{flexWrap: 'wrap',}}>
                        {userItems && userItems.spells.map((spell, index) => (
                          <SpellCard key={index}  name={spell[0]} quantity={spell[1]} image={spell[2]}/>
                        ))}
                      </div>
                      : null
                    }


                    {
                      activeShow === 'avatars' ?
                      <div className='flex fdr aic jc-c' style={{flexWrap: 'wrap',}}>
                        {userItems && userItems.avatars.map((avatar, index) => (
                            
                          
                          <div className='flex fdc aic jc-c' key={index} 
                          style={{backgroundColor: '#7F03F3', borderRadius: '5px', padding: '0.3em 0.5em', 
                          margin: '1em', textAlign: 'center', width: '100px', borderBottom: '0.7em solid rgb(54, 2, 85)', border: '1px solid white'}}  >
                              <img width={100} key={index} src={
                                avatar === 'Friend' ? friend :
                                avatar === 'Devil' ? devil :
                                avatar === 'Doggie' ? dog :
                                avatar === 'Cat' ? cat :
                                avatar === 'Bunny' ? bunny : null
                              }
                              style={{border: '1px solid #6800c9ff', marginBottom: '1em', backgroundColor: '#38026aff'}}
                              />
                              <button 
                              onClick={()=> {
                                changeAvatar(avatar)
                              }}
                              style={{margin: 0, backgroundColor: 'green'}}>USE</button>
                          </div>
                          
                          
                          ))}
                           </div> : null
                    }
                  

                   
                </div>
                
            </> : <Loader />
        }
    </div>
  )
}

export default Collections
