import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Maps.css'
import ProtectedComponent from './ProtectedComponent'
import axios from 'axios'
import { token, userToken } from '../Token'


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
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/melodyGame'
  },
  pitch: {
    imgLink: 'https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png',
    location: '/melodyGame'
  },
}

function Maps() {

  let id = 0
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
    Object.values(maps).map((value, index)=> {
      
    })
  }

  return (
    <ProtectedComponent>
        <div className='maps fpage'>
        <img onClick={()=> {
          navigate(-1)
        }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
        <div className="maps-wrapper">
          <h1 className='title'>Category</h1>
          <div className="map-selection">
              {
                Object.values(mapNames).map((value, index)=> (
                   <img key={index} src={value.imgLink} alt='' className='cat-card' 
                    onClick={()=> {
                      window.location.href = `${value.location}`
                    }}
                   />
        
                ))
              }
              <br /><br /><br /><br /><br /><br /><br />
          
          </div>
        </div>

      </div>
    </ProtectedComponent>
  )
}

export default Maps
