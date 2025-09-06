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

function Profile() {
  const [ userLogged, setUserLogged ] = useState()
  const { currentUser } = useContext(UserContext)
  const [ edit, setEdit] = useState(false)
  const navigate = useNavigate()
      
  return (
    <>
      <div className='profile fpage flex fdc jc-c aic'>
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
                <>
                  <div className="profile-container fdc flex jc-c aic">
                    <img width={100} src={currentUser ? currentUser.avatar : null} alt="" />
                    <div onClick={()=> {
                      navigate('/set-up-account')
                    }}  style={{borderRadius: '50%', position: 'relative', right: '-2em', top: '-1.5em', 
                      backgroundColor: 'white', width: '1.5em', height: '1.5em', cursor: 'pointer'}} className='edit-avatar flex fdc aic jc-c'>
                      <span><FontAwesomeIcon icon={faPen}/></span>
                    </div>
                 </div> 
              <div className="right">
                <h1 style={{margin: '0.2em 0', borderBottom: '1px solid white'}}>{currentUser ? currentUser.username : 'No data'}</h1>
                
                <div style={{background: 'rgba(0, 0, 0, 0.212)'}} className='flex fdr aic jc-c'>
                  <p className='flex fdr aic' style={{margin: '0.5em'}}><span><img src="https://i.ibb.co/N6w014ng/Currency.png" width={25}
                style={{marginRight: '0.5em'}} alt="" /></span>{currentUser ? currentUser.musicCoins : 'No data'}</p>
                <p><span><img width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span>Points: {currentUser ? currentUser.totalPoints : 'No data'}</p>
                
                </div>

               {
                /** <button onClick={()=> {
                  setEdit(true)
                }}>Edit Profile</button>
                {
                  edit && edit ? <EditProfile /> : null
                } */
               }
              </div>
                </> : <p>Loading... please wait</p>
              }
          </div>
          <div style={{margin: '1em 0'}} className='blackUI'>
            <h3>Progress</h3>
            
            <div className="progress">
              <p>Levels</p>
            </div>
            <div >
              <h3>AWARDS / BADGES</h3>
            </div>
          </div>
            </> : <Loader/>
           }
        </div>
      
    </>
  
  )
}

export default Profile
