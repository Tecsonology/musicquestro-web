import React from 'react'
import ProtectedComponent from './ProtectedComponent'
import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
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

function Profile() {
  const [ userLogged, setUserLogged ] = useState()
  const { currentUser } = useContext(UserContext)
  const [ edit, setEdit] = useState(false)
  const navigate = useNavigate()
      
  return (
    <>
      <div className='profile fpage flex fdc'>
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
              <button className='btnLogout'
              onClick={()=> {
                localStorage.clear()
                window.location.href = '/'
              }}>Logout</button>
              {
                currentUser && currentUser ?
                <div style={{margin: '2em 0', justifyContent: 'flex-start'}} className='flex fdc aic'>
                  <div className="profile-container fdr flex">
                    <img width={100} src={currentUser ? currentUser.avatar : null} alt="" />
                 
                    <div>
                      <h1 style={{margin: '0.2em 0'}}>{currentUser ? currentUser.username : 'No data'}</h1>
                      <p>@dsfdsfds</p>
                    </div>
                 </div> 
                 
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
                <button style={{backgroundColor: 'black', margin: '0'}} onClick={()=> {navigate('/h/collections')}}>My Collections</button>
              </div>

            </> : <Loader/>
           }
        </div>
      
    </>
  
  )
}

export default Profile
