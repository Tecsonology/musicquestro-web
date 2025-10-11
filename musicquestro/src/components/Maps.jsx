import React, { useEffect, useState, useContext, lazy } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../styles/Maps.css'
import ProtectedComponent from './ProtectedComponent'
import axios from 'axios'
import { token, userToken } from '../Token'
import ButtonBack from '../mini-components/ButtonBack'
import CurrentUserContext, { UserContext } from './CurrentUserContext'
import Loader from '../components/Loader.jsx'
import LockCat from '../assets/game-assets/Assets/Categories/LockCat.png'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;



const main = lazy(()=> import('https://i.ibb.co/VWV4wcPV/Untitled-design-15.png'))



const mapNames = {
  rhythm: {
    imgLink: '/assets/Maps/Rhythm.png',
    location: '/h/rhythmLevels'
  },
  melody: {
    imgLink: '/assets/Maps/Melody-2.png',
    location: '/h/melodyLevels'
  },

  harmony: {
    imgLink: '/assets/Maps/Harmony.png',
    location: '/h/harmonyLevels'
  },

  pitch: {
    imgLink: '/assets/Maps/Pitch.png',
    location: '/h/pitchLevels'
  },

}

const lockImgLink = 'https://i.ibb.co/8455cZ4G/Untitled-design-59.png'

function Maps() {

  let id = 0
  const mapAvailability = []
  const navigate = useNavigate()  
  const [ maps, setMaps ] = useState()
  const userids = userToken ? userToken.userids : '46546546'
  const { currentUser } = useContext(UserContext)  

    useEffect(() => {
      getUserMap(userids);
    }, [userids]);
 
  async function getUserMap(userid) {
    try{

      const response = await axios.get(`${VITE_NETWORK_HOST}/api/player/maps`,
        {
          params: {userids}
        }
      )

      const data = await response.data
      setMaps(data)
      

    }catch(err){
      console.error('Error: ', err)
     
    }
  }

  if(maps){
      maps && maps ?  Object.values(maps).map((val, indx)=> {
          mapAvailability.push(val.isLocked)
      }) : null
  }


  return (
   
        <CurrentUserContext>
            <div className='maps fpage'>
        <ButtonBack />
        <div className="maps-wrapper">
          <h1 className='title'>Map</h1>
          {
            currentUser ?
            <div className="map-selection">
              {
                 Object.values(mapNames).map((value, index)=> {
                    
                  return <img  key={index} src={mapAvailability[index] == true ? LockCat : value.imgLink} alt='' className='cat-card' 
                    onClick={()=> {
                        mapAvailability[index] == true ? null : navigate(`${value.location}`)
                    }}
                   />
        
                }   )
              }
              <br /><br /><br /><br /><br /><br /><br />
              <Outlet />
          
          </div> : <Loader />
          }
        </div>

      </div>

        </CurrentUserContext>
  
  )
}

export default Maps
