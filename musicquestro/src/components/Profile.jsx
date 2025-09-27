import React from 'react'
import ProtectedComponent from './ProtectedComponent'
import { useState, useEffect, useContext} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../styles/Profile.css'
import CurrentUserContext from './CurrentUserContext'
import { UserContext } from './CurrentUserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Suspense, lazy } from 'react'
import Loader from './Loader'
import EditProfile from '../mini-components/EditProfile'
const lazzzy = lazy(()=> import('./Loader'))
import musLife from '../assets/store-assets/MusicLife.png'
import muscoins from '../assets/store-assets/musicoins.png'
import EditIcon from '../assets/EditIcon.png'

import star from '../assets/star.png'

import image from '../assets/game-assets/Badges/image.png'

function Profile() {
  const { currentUser } = useContext(UserContext)
  const [ edit, setEdit] = useState(false)
  const navigate = useNavigate()
      
  return (
    <>
      <div className='profile fpage flex fdc'>
        <Outlet />
        {
          /**<Suspense fallback={<Loader/>}>
          <h1>dasds</h1>

        </Suspense> */
        }
           {
            currentUser ? 
            <>
              <img onClick={()=> {
        navigate(-1)
      }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
          <div className="profile-wrapper flex fdr jc-c aic">
              {
                /**
                 * <button className='btnLogout'
                  onClick={()=> {
                  localStorage.clear()
                  window.location.href = '/'
              }}>Logout</button>
                 */
              }

              {
                currentUser && currentUser ?
                <div style={{margin: '2em 0', justifyContent: 'flex-start'}} className='flex fdc aic'>
                  <div className="profile-container fdr flex">
                    <img width={80} src={currentUser ? currentUser.avatar : null} alt="" />
                 
                    <div>
                      <h2 style={{margin: '0.2em 0', color: 'white'}}>{currentUser ? currentUser.username : 'No data'}</h2>
                      <p><span><img style={{margin: 0}} width={20} src={star} alt="" /></span>{currentUser ? currentUser.totalPoints : 0}</p>
                    </div>


                    <img  
                      onClick={()=> {
                        navigate('edit')
                      }}
                      style={{position: 'absolute', right: 0, bottom: '0.5em', backgroundColor: 'black', borderRadius: '50%'}} height={30} src={EditIcon} alt="" />
                 </div> 

                    <p style={{fontWeight: 'normal', color: '#d2ccccd1', margin: '2em 0 0 0'}}>{currentUser && currentUser.bio ? currentUser.bio : ''}</p>

                 
                </div> : <p>Loading... please wait</p>
              }
          </div>
              <div style={{margin: '0.7em 0'}} className="atts-container flex fdr aic jc-c">
                
                <div className="life flex fdr aic jc-c">
                  <img width={30} src={musLife} alt="" />
                  <p>{currentUser.life}</p>
                </div>

                <div className="coins flex fdr aic jc-c">
                  <img width={30} src={muscoins} alt="" />
                  <p>{currentUser.musicCoins}</p>
                </div>
                <button style={{backgroundColor: '#6EADFF', margin: '0', color: 'white'}} onClick={()=> {navigate('/h/collections')}}>My Collections</button>


                
              </div>

              <div style={{padding: '0 0.5em', margin: '1em', backgroundColor: 'rgba(22, 29, 50)',}} className="items">
                <h5>AVATARS: {currentUser ? currentUser.items.avatars.length : 'No data'}</h5>
                <h5>INSTRUMENTS: {currentUser ? currentUser.collection.length : 'No data'}</h5>               
              </div>

              <div style={{backgroundColor: 'rgba(22, 29, 50)'}} className='flex fdc aic jc-c glass-bg '>
                <h4>BADGES</h4>
                  <div className="badges-container flex fdr aic jc-c">
                    <img width={80} src={image} alt="" />
                    <img width={80} src={image} alt="" />
                    <img width={80} src={image} alt="" />
                  </div>
              </div>

              <div style={{backgroundColor: 'rgba(22, 29, 50)', marginTop: '1em'}} className="current-rank glass-bg">
                <h4>Current Rank: </h4>
                <h2>+100</h2>
              </div>

            </> : <Loader/>
           }
        </div>
      
    </>
  
  )
}

export default Profile
