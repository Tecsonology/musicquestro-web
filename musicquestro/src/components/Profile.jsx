import React from 'react'
import ProtectedComponent from './ProtectedComponent'
import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css'
import CurrentUserContext from './CurrentUserContext'
import { UserContext } from './CurrentUserContext'

function Profile() {
  const [ userLogged, setUserLogged ] = useState()
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
      
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
                <h1>{currentUser ? currentUser.username : 'No data'}</h1>
                <h2>{userLogged && `${userLogged.username}`}</h2>
                <p>Player id: {currentUser ? currentUser.id : 'No data'}</p>
                <p>User id: {currentUser ? currentUser.userids : 'No data'}</p>

                <p className='flex fdr aic' style={{margin: '0.5em 0'}}><span><img src="https://i.ibb.co/N6w014ng/Currency.png" width={25}
                style={{marginRight: '0.5em'}} alt="" /></span>{currentUser ? currentUser.musicCoins : 'No data'}</p>
                <p><span><img width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span>Points: {currentUser ? currentUser.totalPoints : 'No data'}</p>
                <p>Current Rank: </p>
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
