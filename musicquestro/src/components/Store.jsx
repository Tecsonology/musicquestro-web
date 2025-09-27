import React, { useContext } from 'react'
import '../styles/Store.css'
import ProtectedComponent from './ProtectedComponent'
import Lifebar from '../mini-components/Lifebar'
import PointsBar from '../mini-components/PointsBar'
import StoreCard from '../mini-components/StoreCard'
import ButtonBack from '../mini-components/ButtonBack'
import { useState } from 'react'
import { useEffect } from 'react'
import { userToken, userids } from '../Token'
import axios from 'axios'
import ShopStatus from '../mini-components/ShopStatus'
import { UserContext } from './CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import friend from '../assets/AvatarShopItems/friend.png'
import devil from '../assets/AvatarShopItems/devil.png'
import dog from '../assets/AvatarShopItems/Dog.png'
import cat from '../assets/AvatarShopItems/Cat.png'
import bunny from '../assets/AvatarShopItems/Bunny.png'
import heart from '../assets/game-assets/ItemAssets/heart.png'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'



import flute  from '../assets/game-assets/Assets/Instrument/Flute.png'
import guitar  from '../assets/game-assets/Assets/Instrument/Guitar.png'
import xylo  from '../assets/game-assets/Assets/Instrument/Xylo.png'
import AvatarShopCard from '../mini-components/AvatarShopCard'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';

import avatar from '../assets/game-assets/ProfilePics/Brim.png'


const ITEMS = {
  guitar: {
    itemName: 'Guitar',
    imgItem: guitar,
    description: 'Strum your way to rhythm.',
    price: 300,
    itemCode: "acoustic_guitar_nylon"
  },

  xylophone: {
    itemName: 'Xylophone',
    imgItem: xylo,
    description: 'Bright and colorful tones.',
    price: 600
  },

  flute: {
    itemName: 'Flute',
    imgItem: flute,
    description: 'Play smooth and airy notes.',
    price: 1000,
    itemCode: 'flute'
  },

  game: {
    itemName: 'Game',
    imgItem: 'https://i.ibb.co/Fkh3850k/Untitled-design-2025-07-31-T003603-716.png',
    description: 'Lead the music with style.',
    price: 1300
  },

}

function Store() {

1
  const userCollection = []
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)
  const [ status, setStatus ] = useState(false)
  const [ activeShow, setActiveShow ] = useState('instrument')
  const [ isOpen, setIsOpen ] = useState(true)


   async function  handleBuyItem (e, price, item) {

      try {

        const updateUserItems =  await axios.put(`${VITE_NETWORK_HOST}/api/update-user-from-shop`, {
            userids: userids,
            coinsDeduct: price,
            newItem: item

        })

        if(updateUserItems){ 
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

  const handleAddLife = async ()=> {
    
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
    try {

      const response = await axios.put(`${VITE_NETWORK_HOST}/update-spells`, {
        userids: "50593370411377618421",
        operator: 1,
        index: index
      })


    } catch (error) {
      console.log(error)
    }
  }

  const deductCoins = async (coins) => {
    try {
      const response = await axios.put(`${VITE_NETWORK_HOST}/deduct-coins`, 
        {
        userids: "50593370411377618421",
        coinsDeduct: coins
      })

      console.log(response)

      if(response.data === 'Success'){
        setStatus('Item purchased!') 
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
      } else {
        setStatus('Insufficient coins!') 
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
      }




    } catch (error) {
      console.log(error)
    } 
  }
  

  return (
    <>
      
      <ButtonBack />
      
      <div className='store-container flex fdc jc-c aic'>
        
        <img className='store-banner' src="https://i.ibb.co/nN9KC0dr/Untitled-design-83.png" alt="Untitled-design-83" border="0"/>
        { status && status ? <ShopStatus message={status} /> : null}
        <div className='store-wrapper flex fdc aic jc-c' style={{position: 'absolute', zIndex: '3'}}>
          <h1 className='animateBlingkingLights ' style={{textAlign: 'center', backgroundColor: 'orange', padding: '0.1em 1em', borderRadius: '1em', border: '3px dotted yellow'}}>Store</h1>
        <div className="item-lists flex fdc">
            
            <div className="survival-items flex fdc aic jc-c">
                
       
              <div className='flex fdr aic jc-c'>
                <div className='flex fdr aic jc-c' style={{marginBottom: '1em', backgroundColor: '#0199DA', color: 'black', borderRadius: '1em', padding: '0.4em'}}>
                <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em', marginRight: '0.6em'}}><span><img style={{width: '0.7em', marginRight: '0.5em', padding: '0'}} src="https://i.ibb.co/BVq668JC/Untitled-design-30.png"alt="" /></span>{currentUser && currentUser.life}</h3>
                 <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em'}}>
                  <span><img style={{width: '1em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
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
                      <StoreCard imgItem='https://i.ibb.co/BVq668JC/Untitled-design-30.png' itemName={'Music Energy'} itemPrice={50}
                            description={'Boosts your music energy!'}
                          children={
                            <span><button onClick={handleAddLife}>Buy</button></span>
                        } />

                        <StoreCard imgItem={hint} itemName={'Hint'} itemPrice={50}
                            description={'Get a spark of inspiration when the notes get tricky!'}
                          children={
                            <span><button onClick={()=> {
                              updateQty(0)
                              deductCoins(50)
                            }}>Buy</button></span>
                        } />

                        <StoreCard imgItem={replay} itemName={'Replay'} itemPrice={50}
                            description={'Rewind the performance and try again without missing a beat!'}
                          children={
                            <span><button onClick={()=> {
                              updateQty(2)
                              deductCoins(50)
                            }}>Buy</button></span>
                        } />

                        <StoreCard imgItem={heart} itemName={'Life'} itemPrice={50}
                            description={'Keep the music alive—restore your hearts and play on!'}
                          children={
                            <span><button onClick={()=> {
                              updateQty(1)
                              deductCoins(50)
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
                      description={item.description}
                      children={
                        !userCollection.includes(item.itemName) ? <span><button 
                        onClick={(e)=> handleBuyItem(e, item.price, item.itemName)}>
                          Buy</button></span>
                        : <span><button disabled>Buy</button></span>
                      }
                    />
                  ))
                }

                <p>-End-</p>
                </div> : null
               }

               {
                activeShow === 'avatars' ?
                <div className="menu-items ">
                  <div className='avatar-items'>
                    <AvatarShopCard setStatus={setStatus} name={'Friend'} image={friend} price={150} />
                    <AvatarShopCard setStatus={setStatus} name={'Devil'} image={devil} price={200} />
                    <AvatarShopCard setStatus={setStatus} name={'Doggie'} image={dog} price={250} />
                    <AvatarShopCard setStatus={setStatus} name={'Cat'} image={cat} price={250} />
                    <AvatarShopCard setStatus={setStatus} name={'Bunny'} image={bunny} price={250} />
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
