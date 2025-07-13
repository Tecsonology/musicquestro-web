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



const ITEMS = {
  guitar: {
    itemName: 'Guitar',
    price: 300
  },

  xylophone: {
    itemName: 'Xylophone',
    price: 600
  },

  flute: {
    itemName: 'Flute',
    price: 1000
  },

  game: {
    itemName: 'Game',
    price: 1300
  },

}




function Store() {


  const userCollection = []
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)
  const [ status, setStatus ] = useState(false)


  


   async function  handleBuyItem (e, price, item) {

      try {

        const updateUserItems =  await axios.put('http://localhost:5000/api/update-user-from-shop', {
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
        const addLife = await axios.put('http://localhost:5000/api/user-add-life', {
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
  




  return (
    <ProtectedComponent>
      <ButtonBack />
      
      <div className='fpage shop  flex fdc jc-c aic'>
        <img className='store-banner' src="https://i.ibb.co/nN9KC0dr/Untitled-design-83.png" alt="Untitled-design-83" border="0"/>
        { status && status ? <ShopStatus message={status} /> : null}
        <div className='flex fdc aic jc-c' style={{position: 'absolute', zIndex: '3'}}>
          <h1 style={{textAlign: 'center', backgroundColor: 'orange', padding: '0.1em 1em', borderRadius: '1em', border: '3px dotted yellow'}}>Store</h1>
        <div className="item-lists flex fdc">
            
            <div className="survival-items flex fdc aic jc-c">
              <div className='flex fdr aic jc-c'>
                <div className='flex fdr aic jc-c' style={{margin: '1em', backgroundColor: '#0199DA', color: 'black', borderRadius: '1em', padding: '0.4em'}}>
                <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em', marginRight: '0.6em'}}><span><img style={{width: '0.7em', marginRight: '0.5em', padding: '0'}} src="https://i.ibb.co/BVq668JC/Untitled-design-30.png"alt="" /></span>{currentUser && currentUser.life}</h3>
                 <h3 style={{color: 'white', margin: '0', backgroundColor: '#025B82', padding: '0.4em 0.8em', borderRadius: '1em'}}>
                  <span><img style={{width: '1em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" /></span>
                  {currentUser && currentUser.musicCoins}</h3>
              </div>
              <button style={{backgroundColor: 'green'}} onClick={()=> {navigate('/collections')}}>My Collections</button>
              </div>
              <StoreCard itemName={'MusicLife'} itemPrice={50}
                children={
                  <span><button onClick={handleAddLife}>Buy</button></span>
                }
              />

              <div className="menu-items flex fdr aic jc-c">
                {
                Object.values(ITEMS).map((item, index)=> (
                  <StoreCard key={index}  itemName={item.itemName} itemPrice={item.price}
                    children={
                      !userCollection.includes(item.itemName) ? <span><button onClick={(e)=> handleBuyItem(e, item.price, item.itemName)}>Buy</button></span>
                      : <span><button disabled>Buy</button></span>
                    }
                  />
                ))
              }
              </div>
             

            
            </div>
        </div>
        </div>
      </div>
    </ProtectedComponent>
  )
}

export default Store
