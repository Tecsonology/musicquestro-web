import React from 'react'
import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css'
import { UserContext } from './CurrentUserContext'
import Loader from './Loader'
import musLife from '../assets/store-assets/MusicLife.png'
import muscoins from '../assets/store-assets/musicoins.png'
import EditIcon from '../assets/EditIcon.png'
import logout from '../assets/logout.png'

import star from '../assets/star.png'

import image from '../assets/game-assets/Badges/image.png'

function Profile() {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

      
  return (
    <>
      <div className='profile fpage flex fdc aic jc-c'>
        {
          currentUser ? 
            <>
              <img onClick={()=> {
                navigate(-1)
              }} className='btn-back' src="https://i.ibb.co/KzBKmLC3/Untitled-design-2.png" alt="" />
          <div className="profile-wrapper flex fdr jc-c aic">
              {
                currentUser && currentUser ?
                <div style={{margin: '2em 0', justifyContent: 'flex-start'}} className=' flex fdc aic'>
                  <div className="profile-container fdr flex">
                    

                    <img width={80} src={currentUser ? currentUser.avatar : null} alt="" />
                 
                    <div>
                      <h2 style={{margin: '0.2em 0', color: 'white'}}>{currentUser ? currentUser.username : 'No data'}</h2>
                      <p><span><img style={{margin: 0}} width={20} src={star} alt="" /></span>{currentUser ? currentUser.totalPoints.toFixed(0) : 0}</p>
                    </div>


                    <img  
                      onClick={()=> {
                        navigate('edit')
                      }}
                      style={{position: 'absolute', right: 0, bottom: '0.5em', cursor: 'pointer', 
                      backgroundColor: 'black', borderRadius: '50%'}} height={30} src={EditIcon} alt="" />
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
                <button style={{backgroundColor: '#00306fff', margin: '0', color: 'white'}} onClick={()=> {navigate('/h/collections')}}>My Collections</button>


                
              </div>

              <div style={{backgroundColor: '#33333348', padding: '1em', boxSizing: 'border-box'}} className="stats flex fdc aic jc-c">
                <h6 style={{margin: '1em'}}>STATS</h6>
                <div>
                  <label htmlFor="rhythmStat">Rhythm: </label>
                  <progress id='rhythmStat' value={currentUser && currentUser.maps.rhythm.levels.length} max={5}></progress>
                </div>
                {
                  currentUser && currentUser.maps.melody.isLocked == false ?
                  <div>
                    <label htmlFor="rhythmStat">Melody: </label>
                    <progress id='rhythmStat' value={currentUser && currentUser.maps.melody.levels.length} max={5}></progress>
                  </div> : null
                }
                {
                  currentUser && currentUser.maps.harmony.isLocked == false ?
                  <div>
                    <label htmlFor="rhythmStat">Harmony: </label>
                    <progress id='rhythmStat' value={currentUser && currentUser.maps.harmony.levels.length} max={5}></progress>
                  </div> : null
                }
                {
                  currentUser && currentUser.maps.harmony.isLocked == false ?
                    <div>
                    <label htmlFor="rhythmStat">Pitch: </label>
                    <progress id='rhythmStat' value={currentUser && currentUser.maps.pitch.levels.length} max={5}></progress>
                  </div> : null
                }
              </div>

    

              <div style={{backgroundColor: '#33333348', justifyContent: 'space-between',
                padding: '1em', boxSizing: 'border-box', margin: '0.5em 0'}} className='badges flex fdr aic'>
                <h4>BADGES</h4>
                  <div style={{ backgroundColor: '#53535348', padding: '0.5em', flexWrap: 'wrap'}} className="badges-container flex fdr aic jc-c">
                    {
                      currentUser && currentUser.items.badges > 0 ?
                      <div></div> : <>Coming soon...</>
                    }
                  </div>
              </div>

              <div style={{backgroundColor: '#33333348', justifyContent: 'space-between',
                padding: '1em', boxSizing: 'border-box', margin: '0.5em 0'}}  className="current-rank flex fdr aic jc-c">
                <h4>Current Rank: </h4>
                <h2>+100</h2>
              </div>

               {
                /**
                 * <div className='item-count' style={{backgroundColor: '#33333348', justifyContent: 'space-between',
                padding: '1em', boxSizing: 'border-box', margin: '0.5em 0'}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>dsfds</td>
                        <td>dsfds</td>
                        <td>dsfds</td>
                      </tr>
                      <tr>
                        <td>dsfds</td>
                        <td>dsfds</td>
                        <td>dsfds</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
                 */
               }

              <div style={{
                position: 'relative', bottom: '-4em',}} className="bottom-buttons flex fdr">
                <div onClick={()=> {
                        let userConfirm = confirm("Are you sure you want to log out?")

                        if(userConfirm){
                          localStorage.clear()
                          window.location.href = '/'
                        } else {
                          
                        }
                        
                    }} className='flex fdc aic jc-c' 
                      style={{backgroundColor: 'rgba(59, 61, 59, 0.9)', height: '2.5em', border: '1px solid rgba(170, 170, 170, 0.9)',
                     borderRadius: '1em', }}>
                      <div className='flex fdr aic'>
                        
                      <img style={{margin: 0}} width={20} height={20} src={logout} alt="" />

                      <h4>Logout</h4>
                      </div>
                </div>  
              </div>

             

            </> : 
            <div className='flex fdc aic jc-c'>

              <div className='loaderPage'></div>
            </div>
           }
        </div>
      
    </>
  
  )
}

export default Profile
