import axios from 'axios'
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SetupAccount.css'
import { lazy, Suspense } from 'react'
import Loader from './Loader'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';

import avatar1 from '../assets/game-assets/ProfilePics/Brim.png'
import avatar2 from '../assets/game-assets/ProfilePics/Iso.png'
import avatar3 from '../assets/game-assets/ProfilePics/Neon.png'
import avatar4 from '../assets/game-assets/ProfilePics/Pink.png'
import avatar5 from '../assets/game-assets/ProfilePics/Skye.png'
import avatar6 from '../assets/game-assets/ProfilePics/Tejo.png'


function SetupAccount() {

    const navigate = useNavigate()
    
    const avatars = [
        avatar1, avatar2, avatar3, avatar4, avatar5, avatar6
    ]

    const [ selected, setSelected ] = useState("https://i.ibb.co/7tVHp34s/Avatar-4.png")

    const finishSettingUp = async(e)=> {
      const selBtn = e.currentTarget
      selBtn.innerHTML = 'Changing avatar...'
      console.log(selBtn)
      try {
        const userid = JSON.parse(localStorage.getItem('userLogged'))
        const token = localStorage.getItem('token')
        let avatar = selected

        if(token){
          
          let userids = userid
          

          const setUpAvatar = await axios.put(`${VITE_NETWORK_HOST}/update-avatar`,
            {
              userids,
              avatar
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )


          if(setUpAvatar){
            localStorage.setItem('avatar', selected)
            setTimeout(()=> {
              navigate('/h')
            }, 1000)
          }

        }
        
      } catch (error) {
        alert('Oppooo', error)
        console.log(error)
      }
    }

  return (
    <div className='set-up-container fpage flex  fdc aic jc-c'>
        <Suspense fallback={<Loader/>}>
        <h2>Hi, welcome!</h2>
          <p style={{textAlign: 'center'}}>Please choose your profile avatar</p>
       
        <img style={{margin: '0.5em'}} width={140} src={selected} alt="" />

       <div style={{flexWrap: 'wrap'}} className='flex fdr aic jc-c'>
         {
            Object.values(avatars).map((item, index)=> {
                return <img onClick={()=> {
                    setSelected(item)
                }} style={{margin: '0.5em'}} width={75} key={index} src={item} alt="" />
            })
        }

        

       </div>
       <button style={{backgroundColor: 'green', color: 'white', fontWeight: '1000', width: '20em'}} 
       onClick={(e)=> {
        finishSettingUp(e)
       }}>Choose this avatar</button>
        </Suspense>
    </div>
  )
}
 
export default SetupAccount
