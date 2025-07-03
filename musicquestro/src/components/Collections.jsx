import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { userids } from '../Token'
import { useState } from 'react'
import CollectionCard from '../mini-components/CollectionCard'
import ButtonBack from '../mini-components/ButtonBack'

function Collections() {

  const [ collections, setCollections ] = useState()
  const [ currentUser, setCurrentUser ] = useState()

  useEffect(()=> {

      const getUserCollection = async ()=> {
          if(userids){
              try{

                  const getCollection = await axios.get('http://localhost:5000/api/get-user-collection',
                    {
                      params: { userids }
                    }
                  )

                  if(getCollection){
                    setCollections(getCollection.data)
                  }

                   const getUser = await axios.get('http://localhost:5000/player', {
                                params: { userids}
                  })

                  if(getUser){
                    setCurrentUser(getUser.data)
                  }

              } catch(err){
                console.log(err)
              }
              
          }
      }

      getUserCollection()

  }, [])


  return (
    <div className='flex fdc jc-c aic'>
      
      <h1>Collections</h1>
      <CollectionCard itemName={`MusicLife X${currentUser && currentUser.life}`} />
      <div className="collection-list flex fdr aic jc-c">
          {
            collections && Object.values(collections).map((item ,index)=> (
              <CollectionCard key={index} itemName={item}/>
            ))
          }
      </div>
      <button onClick={()=> {
        window.location.href = '/store'
      }}>Go to Shop</button>
    </div>
  )
}

export default Collections
