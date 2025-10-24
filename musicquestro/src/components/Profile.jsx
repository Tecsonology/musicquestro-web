import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css'
import { UserContext } from './CurrentUserContext'
import musLife from '../assets/store-assets/MusicLife.png'
import muscoins from '../assets/store-assets/musicoins.png'
import EditIcon from '../assets/EditIcon.png'
import logout from '../assets/logout.png'
import axios from 'axios'
import ButtonBack from '../mini-components/ButtonBack'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST

import star from '../assets/star.png'


function Profile() {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [ rankings, setRankings ] = useState()
  const [ userRank, setUserRank ] = useState()

  useEffect(()=> {
    const checkUserRank =()=> {
      
      if(rankings){
        console.log("dasdasd")
        for(let x = 0; rankings.length-1 >= x; x++){
          console.log(currentUser && currentUser.username === rankings[x].username)
          if( currentUser && currentUser.username === rankings[x].username){
              setUserRank(x+1)
          }
        }
    } 
    }

     const interval = setInterval(()=> {
             checkUserRank()
        }, 1000)

     return ()=> {
        clearInterval(interval)
    }

  }, [rankings])

  useEffect(()=> {

    const getPlayers = async()=> {
        try{

      const getPlayers = await axios.get(`${VITE_NETWORK_HOST}/api/get/leaderboards`)


        setRankings([...getPlayers.data].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 10))
        

      } catch(err){
        console.log(err)
      }
    }

    getPlayers()

    return ()=> {}
  }, [])

     
  return (
    <>
      <div className='profile fpage flex'>
        {
          currentUser ? 
            <>
              

              <div className='main-profile-content'>
                <div className='user-profile-container'>
                <div className="profile-wrapper flex fdr jc-c aic">
              {
                currentUser && currentUser ?
                <div style={{margin: '2em 0', justifyContent: 'flex-start', }} className=' flex fdc aic'>
                  <img  
                        onClick={()=> {
                          navigate('edit')
                        }}
                        style={{position: 'absolute', cursor: 'pointer', top: '1em', right: '0', padding: '0.2em',    
                        backgroundColor: 'black', borderRadius: '50%'}} height={30} src={EditIcon} alt="" />
                  <div style={{position: 'relative'}} className="profile-container fdr flex">
                    

                    <img width={80} src={currentUser ? currentUser.avatar : null} alt="" />
                 
                    <div style={{position: 'relative'}}>
                      <h2 style={{margin: '0.2em 0', color: 'white'}}>{currentUser ? currentUser.username : 'No data'}</h2>
                      <p><span><img style={{margin: 0}} width={20} src={star} alt="" /></span>{currentUser ? currentUser.totalPoints.toFixed(0) : 0}</p>
                      
                    </div>


           
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


              <div className="collections-section flex fdr">
                <div className='item-spell'>
                  <img width={30} style={{margin: 0}} src={hint} alt="" /><p>{currentUser && currentUser.items.spells[0][1]}</p>
                </div>
                <div className='item-spell'>
                  <img width={30} style={{margin: 0}} src={replay} alt="" /> <p>{currentUser && currentUser.items.spells[1][1]}</p>
                </div>
              </div>

              </div>

              {/** */}

              <div className="stats-container flex fdc aic jc-c">
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
                <h2>{userRank && userRank}</h2>
              </div>

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

                      <h4 style={{marginLeft: '0.5em'}}>Logout</h4>
                      </div>
                </div>  

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