import { useContext } from 'react'
import '../styles/Store.css'

import StoreCard from '../mini-components/StoreCard'
import ButtonBack from '../mini-components/ButtonBack'
import { useState } from 'react'
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
import StoreRoof from '../assets/StoreRoof.png'
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

  const token = localStorage.getItem('token')
  const userCollection = []
  const { currentUser, setCurrentUser, userids } = useContext(UserContext)
  const [ status, setStatus ] = useState(false)
  const [ approved, setApproved ] = useState()
  const [ activeShow, setActiveShow ] = useState('instrument')
  const [ isOpen, setIsOpen ] = useState(false)

   async function handleBuysItem(e, price, item) {
        let userids = currentUser.userids
        e.preventDefault();
        const btn = e.currentTarget;
        btn.disabled = true;

        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `${VITE_NETWORK_HOST}/api/update-user-from-shop`,
            {
              userids,
              coinsDeduct: price,
              newItem: item,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = response.data;

          if (!data.success) {
            setStatus(data.message || "Purchase failed");
            setTimeout(() => setStatus(false), 3000);
            btn.disabled = false; 
            return;
          }

          

          setStatus("Item purchased successfully!");
          setTimeout(() => setStatus(false), 3000);

        } catch (err) {
          console.error("Purchase error:", err);
          setStatus("Server error. Try again later.");
          setTimeout(() => setStatus(false), 3000);
        } finally {
          btn.disabled = false;
        }
}


  if(currentUser && currentUser.collection){
      Object.values(currentUser.collection).map((item, index)=> {
        userCollection.push(item)
      })
  }

  const handleAddLife = async (e) => {
  const token = localStorage.getItem('token');

  try {
    let userids = currentUser.userids
    const lifeAdded = 1;
    const coinDeduct = 50;

    const response = await axios.put(
      `${VITE_NETWORK_HOST}/api/user-add-life`,
      { userids, lifeAdded, coinDeduct },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


  } catch (err) {
    console.log(err.response?.data?.message || err.message);
  }
};



  const handleBuySpell = async (e, spellIndex, price) => {
    e.preventDefault()
    
    try {
      if(currentUser && currentUser.musicCoins >= price){
        const response = await axios.put(`${VITE_NETWORK_HOST}/buy-spell`, {
            userids: currentUser?.userids,
            spellIndex: spellIndex,
            price: price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )    

      

      if(response){
        setCurrentUser({...currentUser, musicCoins: currentUser.musicCoins - price})
        setStatus(response.data.message) 
        setApproved(true) 

        setTimeout(()=> {
          setIsOpen(true)
        }, 5000)
      }
      } else {
        return null
      }

    } catch (error) {
      console.log(error)
    }   
  }       

  

  return (
    <>
      
      <ButtonBack />
      
      <div className='store-container fpage flex fdc jc-c aic'>
        
        <img className='store-banner' src={StoreRoof} alt="Untitled-design-83" border="0"/>
        {
          isOpen ? 
          <ShopStatus message={status} approved={approved} isOpen={isOpen} setIsOpen={isOpen}/> : null
        }
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
                <button className='cat-btn' onClick={()=> {setActiveShow('instrument')}}>Instrument</button>
                <button className='cat-btn' onClick={()=> {setActiveShow('spells')}}>Spells</button>
                <button className='cat-btn' onClick={()=> {setActiveShow('avatars')}}>Avatars</button>
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
                            <span><button style={{margin: '0.3em'}} onClick={()=> {
                              handleAddLife()
                            }}><span><img src={musicoins} width={20} alt="" /></span> 50</button></span>
                        } />

                        <StoreCard imgItem={hint} itemName={'Hint'} itemPrice={50}
                            description={'Get a spark of inspiration when the notes get tricky!'}
                          children={
                            <span><button style={{margin: '0.3em'}} onClick={async(e)=> {
                              handleBuySpell(e, 0, 50)
                              
                            }}><span><img src={musicoins} width={20} alt="" /></span> 50</button></span>
                        } />

                        <StoreCard imgItem={replay} itemName={'Replay'} itemPrice={10}
                            description={'Rewind the performance and try again without missing a beat!'}
                          children={
                            <span><button style={{margin: '0.3em'}} onClick={async(e)=> {
                              handleBuySpell(e, 1, 10)
                            }}><span><img src={musicoins} width={20} alt="" /></span> 10</button></span>
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
                        style={{margin: 0}} 
                        className='flex fdr aic jc-c'
                        onClick={(e)=> {
                          if(currentUser && currentUser.musicCoins >= item.price){
                            handleBuysItem(e, item.price, item.itemName)
                          } else {
                            return null
                          }
                        }}>
                          <span><img style={{width: '1.3em', marginRight: '0.5em', color: 'white'}} src={musicoins} alt="" /></span>
                          <span>{item.price}</span>
                          </button>
                        : <button style={{backgroundColor: '#2f3679ff', color: 'white', margin: 0}} disabled>
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
