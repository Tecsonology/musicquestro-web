import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Maps.css'
import ProtectedComponent from './ProtectedComponent'
import axios from 'axios'
import { token, userToken } from '../Token'
import ButtonBack from '../mini-components/ButtonBack'


const mapNames = {
  rhythm: {
    imgLink: 'https://i.ibb.co/VWV4wcPV/Untitled-design-15.png',
    location: '/rhythmGame'
  },
  melody: {
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/melodyGame'
  },
  harmony: {
    imgLink: 'https://i.ibb.co/FLZzsRfD/Untitled-design-61.png',
    location: '/harmonyGame'
  },
  pitch: {
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/pitchGame'
  },

}

const lockImgLink = 'https://i.ibb.co/8455cZ4G/Untitled-design-59.png'

function Maps() {

  let id = 0
  const mapAvailability = []
  const navigate = useNavigate()  
  const [ maps, setMaps ] = useState()
  const userids = userToken.userids
  

    useEffect(() => {
      getUserMap(userids);
    }, [userids]);

  async function getUserMap(userid) {
    try{

      const response = await axios.get('http://localhost:5000/api/player/maps',
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
    <ProtectedComponent>
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
          
          </div>
        </div>

      </div>
    </ProtectedComponent>
  )
}

export default Maps
