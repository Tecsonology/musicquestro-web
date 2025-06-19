import React from 'react'
import ProtectedComponent from './ProtectedComponent'
import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css'

function Profile() {

  const [ userLogged, setUserLogged ] = useState()
  const navigate = useNavigate()
        
      useEffect(()=> {
         setUserLogged(JSON.parse(localStorage.getItem("userLogged")))
      }, [])

  return (
    <ProtectedComponent 
      children={
        <div className='profile fpage flex fdc jc-c aic'>
           <img onClick={()=> {
        navigate(-1)
      }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
          <div className="profile-wrapper flex fdr jc-c aic">
              <div className="profile-container fdc flex jc-c aic">
                <img src="https://i.ibb.co/1JmMD64Q/Maps-removebg-preview.png" alt="" />
              </div>
              <div className="right">
                <h2>{userLogged && `${userLogged.username}`}</h2>
                <p>Player id: {userLogged && `${userLogged.id}`}</p>
                <p>User id: {userLogged && `${userLogged.userids}`}</p>

                <p className='flex fdr aic' style={{margin: '0.5em 0'}}><span><img src="https://i.ibb.co/N6w014ng/Currency.png" width={25}
                style={{marginRight: '0.5em'}} alt="" /></span>9000</p>
              </div>
          </div>
          <h3>Progress</h3>
          <div className="progress glass-bg">
            <p>Levels</p>
          </div>
        </div>
      }
    />
  )
}

export default Profile
