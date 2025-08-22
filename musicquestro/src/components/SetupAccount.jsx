import axios from 'axios'
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SetupAccount.css'
import { lazy, Suspense } from 'react'
import Loader from './Loader'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function SetupAccount() {

    const navigate = useNavigate()
    
    const avatars = [

        "https://i.ibb.co/20TQFdqK/Untitled-design-2025-07-23-T010047-710.png",
        "https://i.ibb.co/PGqHJmVV/Untitled-design-2025-07-23-T004756-525.png",
        "https://i.ibb.co/7tVHp34s/Avatar-4.png",
        "https://i.ibb.co/JWkg854C/Untitled-design-2025-07-23-T000122-120.png",
        "https://i.ibb.co/KjXh2nkC/Untitled-design-2025-07-22-T234147-568.png",
        "https://i.ibb.co/ZRqxcJhc/Untitled-design-2025-07-22-T233822-647.png"
    ]

    const [ selected, setSelected ] = useState("https://i.ibb.co/7tVHp34s/Avatar-4.png")

    const finishSettingUp =async()=> {
      try {
        const token = JSON.parse(localStorage.getItem('userLogged'))
        let avatar = selected

        if(token){
          
          let userids = token.userids

          const setUpAvatar = await axios.put(`${VITE_NETWORK_HOST}/update-avatar`,
            {
              userids,
              avatar
            }
          )


          if(setUpAvatar){
            setTimeout(()=> {
              navigate('/h')
            }, 1000)
          }

        }
        
      } catch (error) {
        alert(error)
      }
    }

  return (
    <div className='set-up-container fpage flex  fdc aic jc-c'>
        <Suspense fallback={<Loader/>}>
          <h4>Choose your AVatar</h4>
       
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
       <button style={{backgroundColor: 'red', color: 'white', fontWeight: '1000', width: '20em'}} 
       onClick={finishSettingUp}>Finish</button>
        </Suspense>
    </div>
  )
}
 
export default SetupAccount
