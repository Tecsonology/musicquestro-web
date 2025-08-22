import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom'
import { token } from '../Token'
import '../styles/Homepage.css'
import ProtectedComponent from './ProtectedComponent'
import Lifebar from '../mini-components/Lifebar'
import StoreButton from '../mini-components/StoreButton'
import ButtonSettings from '../mini-components/ButtonSettings'
import PointsBar from '../mini-components/PointsBar'
import { UserContext } from './CurrentUserContext'
import AttributeBar from '../mini-components/AttributeBar'
import BottonNavigation from './BottonNavigation'
import axios from 'axios'
import Maps from './Maps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
function Homepage() {

    const navigate = useNavigate()

    const menuRedirect =(e)=> {
        const directTo = e.target.id
        switch(directTo){
            case 'newg':
                navigate('/m') 
                break;

            case 'playg':
                navigate('/m')
                break;
              
            case 'user':
              navigate('/user')
              break;
            
            case 'leaderb':
                navigate('/leaderboards')
                break;

            case 'shop':
                navigate('/store')
                break;
        }
    }


  return (

      <div className='homepage flex jc-c aic fdc fpage'>

         
      <Outlet />
      <BottonNavigation />
    </div>

      
  )
}

export default Homepage
