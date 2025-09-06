import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../styles/Maps.css'
import ProtectedComponent from './ProtectedComponent'
import axios from 'axios'
import { token, userToken } from '../Token'
import ButtonBack from '../mini-components/ButtonBack'
import CurrentUserContext, { UserContext } from './CurrentUserContext'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;




const mapNames = {
  rhythm: {
    imgLink: 'https://i.ibb.co/VWV4wcPV/Untitled-design-15.png',
    location: '/h/rhythmLevels'
  },
  melody: {
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/h/melodyLevels'
  },

  pitch: {
    imgLink: 'https://i.ibb.co/W4bb6H3f/Untitled-design-79.png',
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
          <h1 className='title'>Category</h1>
          <div className="map-selection">
              {
                 Object.values(mapNames).map((value, index)=> {
                    
                  return <img key={index} src={mapAvailability[index] == 'true' ? lockImgLink : value.imgLink} alt='' className='cat-card' 
                    onClick={()=> {
                        mapAvailability[index] == 'true' ? null : window.location.href = `${value.location}`
                    }}
                   />
        
                }   )
              }
              <br /><br /><br /><br /><br /><br /><br />
              <Outlet />
          
          </div>
        </div>

      </div>

        </CurrentUserContext>
  
  )
}

export default Maps
