import React from 'react'
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
  const [ currentUser, setCurrentUser ] = useState()
  const [ status, setStatus ] = useState(false)


  useEffect(()=> {

    const getCurrentUser  = async ()=> {
        if(userids){
            try {

            const getUser = await axios.get('http://localhost:5000/player', {
              params: { userids}
            })
            
          setCurrentUser(getUser.data)

          } catch(err){
            console.log(err)
        }
        }
    }

     getCurrentUser()

     const interval = setInterval(()=> {
      getCurrentUser()
     }, 1000)

     return ()=> {
      clearInterval(interval)
     }

  }, [userids])


   async function  handleBuyItem (e, price, item) {


      console.log(item, price)

      try {

        const updateUserItems =  await axios.put('http://localhost:5000/api/update-user-from-shop', {
            userids: userids,
            coinsDeduct: price,
            newItem: item

        })

        console.log(updateUserItems.data.message)
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

        !addLife ? setStatus(addLife.data) : null

      } catch(err){
        console.log(err.response?.data?.message || err.message)
      }
  }
  




  return (
    <ProtectedComponent>
      <ButtonBack />
      
      <div className='shop fpage flex fdc jc-c aic'>
        { status && status ? <ShopStatus message={status} /> : null}
        <h1>Store</h1>
        <div className="item-lists">
            <h3>MusicLife: {currentUser && currentUser.life}</h3>
            <h3>Coins: {currentUser && currentUser.musicCoins}</h3>
            <div className="survival-items">
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
              <button onClick={()=> {
                window.location.href = '/collections'
              }}>View Collections</button>

            
            </div>
        </div>
      </div>
    </ProtectedComponent>
  )
}

export default Store
