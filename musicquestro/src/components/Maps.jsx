import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Maps.css'
import ProtectedComponent from './ProtectedComponent'


function Maps() {

  const navigate = useNavigate()

  return (
    <ProtectedComponent>
        <div className='maps fpage'>
        <img onClick={()=> {
          navigate(-1)
        }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
        <div className="maps-wrapper">
          <h1 className='title'>Category</h1>
        
          <div className="map-selection">
              <img onClick={()=> {
                window.location.href = '/rhythmGame'
              }} className='cat-card' src="https://i.ibb.co/VWV4wcPV/Untitled-design-15.png" alt="" />
              <img onClick={()=> {
                window.location.href = '/melodyGame'}} className='cat-card' src="https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png" alt="" />
              <img className='cat-card' src="https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png" alt="" />
              <img className='cat-card' src="https://i.ibb.co/yFrnh25k/Untitled-design-24-1.png" alt="" />
              <br /><br /><br /><br /><br /><br /><br />
          
          </div>
        </div>

      </div>
    </ProtectedComponent>
  )
}

export default Maps
