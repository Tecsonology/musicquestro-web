import React, { useContext } from 'react'
import '../styles/Store.css'

import StoreCard from '../mini-components/StoreCard'
import ButtonBack from '../mini-components/ButtonBack'
import { useState } from 'react'
import { userids } from '../Token'
import axios from 'axios'
import ShopStatus from '../mini-components/ShopStatus'
import { UserContext } from './CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import friend from '../assets/AvatarShopItems/Friend.png'
import dog from '../assets/AvatarShopItems/Dog.png'
import cat from '../assets/AvatarShopItems/Cat.png'
import bunny from '../assets/AvatarShopItems/Bunny.png'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'

import musicoins from '../assets/store-assets/musicoins.png'
import MusicLife from '../assets/store-assets/MusicLife.png'


import flute  from '../assets/game-assets/Assets/Instrument/Flute.png'
import Clarinet from '../assets/game-assets/Assets/Instrument/Clarinet.png'
import Trumpet from '../assets/game-assets/Assets/Instrument/Trumpet.png'
import Violin from '../assets/game-assets/Assets/Instrument/Violin.png'
import AvatarShopCard from '../mini-components/AvatarShopCard'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


const ITEMS = {
  clarinet: {
    itemName: 'Clarinet',
    imgItem: Clarinet,
    description: 'Strum your way to rhythm.',
    price: 300,
    itemCode: "acoustic_guitar_nylon"
  },

  flute: {
    itemName: 'Flute',
    imgItem: flute,
    description: 'Bright and colorful tones.',
    price: 600
  },

  trumpet: {
    itemName: 'Trumpet',
    imgItem: Trumpet,
    description: 'Play smooth and airy notes.',
    price: 1000,
    itemCode: 'trumpet'
  },

  violin: {
    itemName: 'Violin',
    imgItem: Violin,
    description: 'Lead the music with style.',
    price: 1300,
    itemCode: 'violin'
  },

}

function Store() {


  const userCollection = []
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [ status, setStatus ] = useState(false)
  const [ approved, setApproved ] = useState()
  const [ activeShow, setActiveShow ] = useState('instrument')
  const [ isOpen, setIsOpen ] = useState(true)
  const [ loading, setLoading ] = useState(false)


   async function  handleBuyItem (e, price, item) {

      try {

        const updateUserItems =  await axios.put(`${VITE_NETWORK_HOST}/api/update-user-from-shop`, {
            userids: userids,
            coinsDeduct: price,
            newItem: item

        })

        if(updateUserItems){ 

          if(updateUserItems.status === 201){
            setApproved(false)
          }

          setStatus(updateUserItems.data.message) 
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
        } 

      } catch (err){
        console.log(err)
      }

  }

  if(currentUser && currentUser.collection){
      Object.values(currentUser.collection).map((item, index)=> {
        userCollection.push(item)
      })
  }

  const handleAddLife = async (e)=> {

      try {
        const lifeAdded = 1
        const coinDeduct = 50
        const addLife = await axios.put(`${VITE_NETWORK_HOST}/api/user-add-life`, {
            userids,
            lifeAdded,
            coinDeduct
        })

        if(addLife){
          setStatus(addLife.data.message) 
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
        }

        !addLife ? setStatus(addLife.data) : null

      } catch(err){
        console.log(err.response?.data?.message || err.message)
      }
  }

  const updateQty = async (index) => {
    if(approved){

      try {
        
        const response = await axios.put(`${VITE_NETWORK_HOST}/update-spells`, {
          userids: currentUser?.userids,
          operator: 1,
          index
        })

        setCurrentUser({...currentUser, spells: response.data.spells})  


      } catch (error) {
        console.log(error)
      }
    } 
  }

  const deductCoins = async (coins) => {
    try {
      const response = await axios.put(`${VITE_NETWORK_HOST}/deduct-coins`, 
        {
        userids: currentUser ? currentUser.userids : null,
        coinsDeduct: coins
      })

      if(response.data === 'Success'){
        setStatus('Item purchased!') 
        setApproved(true)
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
      } else {
        setStatus('Insufficient coins!') 
          setTimeout(()=> {
            setStatus(false)
            setApproved(false)
          }, 3000)
      }




    } catch (error) {
      console.log(error)
    } 
  }
  

  return (
    <>
      
      <ButtonBack />
      
      <div className='store-container fpage flex fdc jc-c aic'>
        
        <img className='store-banner' src="https://i.ibb.co/nN9KC0dr/Untitled-design-83.png" alt="Untitled-design-83" border="0"/>
        { status && status ? <ShopStatus message={status} approved={approved}/> : null}
        <div className='store-wrapper flex fdc aic jc-c' style={{position: 'absolute', zIndex: '3'}}>
          <h1 className='animateBlingkingLights ' style={{textAlign: 'center', backgroundColor: 'orange', padding: '0.1em 1em', borderRadius: '1em', border: '3px dotted yellow'}}>Store</h1>
        <div className="item-lists flex fdc">
            
            <div className="survival-items flex fdc aic jc-c">
                
              <div className='flex fdr aic jc-c'>
                <div className='flex fdr aic jc-c' style={{marginBottom: '1em', backgroundColor: '#0199DA', color: 'black', borderRadius: '1em', padding: '0.4em'}}>
                <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em', marginRight: '0.6em'}}><span><img style={{width: '0.7em', marginRight: '0.5em', padding: '0'}} src={MusicLife} alt="" /></span>{currentUser && currentUser.life}</h3>
                 <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em'}}>
                  <span><img style={{width: '1em', marginRight: '0.5em'}} src={musicoins} alt="" /></span>
                  {currentUser && currentUser.musicCoins}</h3>
              </div>

              </div>

              <div style={{marginBottom: '1em'}} className='cat-items-wrapper flex fdr aic jc-c'>
                <button onClick={()=> {setActiveShow('instrument')}}>Instrument</button>
                <button onClick={()=> {setActiveShow('spells')}}>Spells</button>
                <button onClick={()=> {setActiveShow('avatars')}}>Avatars</button>
              </div>
              {
                currentUser && currentUser ?
                <div>
                  {
                    activeShow === 'spells' ?
                    <div className='menu-items flex fdc aic jc-c'>
                      <StoreCard imgItem={MusicLife} itemName={'Music Energy'} itemPrice={50}
                            description={'Boosts your music energy!'}
                          children={
                            <span><button onClick={()=> {
                              handleAddLife()

                                setStatus('Item purchased!') 
                                  setApproved(true)
                                    setTimeout(()=> {
                                      setStatus(false)
                                    }, 3000)
                            }}>Buy</button></span>
                        } />

                        <StoreCard imgItem={hint} itemName={'Hint'} itemPrice={50}
                            description={'Get a spark of inspiration when the notes get tricky!'}
                          children={
                            <span><button onClick={async()=> {
                              await deductCoins(50)
                              await updateQty(0)
                              
                            }}>Buy</button></span>
                        } />

                        <StoreCard imgItem={replay} itemName={'Replay'} itemPrice={10}
                            description={'Rewind the performance and try again without missing a beat!'}
                          children={
                            <span><button onClick={async()=> {
                              await deductCoins(10)
                              await updateQty(1)
                            }}>Buy</button></span>
                        } />

                 
                                 
                  </div> : null
                  }

               {
                activeShow === 'instrument' ?
                 <div className="menu-items flex fdr aic jc-c">
                  
                  {
                  Object.values(ITEMS).map((item, index)=> (
                    <StoreCard sound={item.itemCode} key={index} imgItem={item.imgItem}  itemName={item.itemName} itemPrice={item.price}
                      description={item.description} owned={!userCollection.includes(item.itemName) ? false : true}
                      children={
                        !userCollection.includes(item.itemName) ? <button 
                        className='flex fdr aic jc-c'
                        onClick={(e)=> handleBuyItem(e, item.price, item.itemName)}>
                          <span><img style={{width: '1.3em', marginRight: '0.5em'}} src={musicoins} alt="" /></span>
                          <span>{item.price}</span>
                          </button>
                        : <button style={{backgroundColor: '#2f3679ff'}} disabled>
                          ✅ OWNED</button>
                      }
                    />
                  ))
                }
                </div> : null
               }

               {
                activeShow === 'avatars' ?
                <div className="menu-items ">
                  <div className='avatar-items'>
                    <AvatarShopCard setApproved={setApproved} setStatus={setStatus} name={'Friend'} image={friend} price={150} />
                    <AvatarShopCard setApproved={setApproved} setStatus={setStatus} name={'Doggie'} image={dog} price={250} />
                    <AvatarShopCard setApproved={setApproved} setStatus={setStatus} name={'Cat'} image={cat} price={250} />
                    <AvatarShopCard setApproved={setApproved} setStatus={setStatus} name={'Bunny'} image={bunny} price={250} />
                  </div>
                </div> : null
               }
                </div> : <Loader />
                 
              }
             

            
            </div>
        </div>
        </div>
      </div>
    </>
 
  )
}

export default Store
