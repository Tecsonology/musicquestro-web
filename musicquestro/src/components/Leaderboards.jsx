import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProtectedComponent from './ProtectedComponent'
import '../styles/Leaderboards.css'
import axios from 'axios'
import ButtonBack from '../mini-components/ButtonBack'
import UserRank from '../mini-components/UserRank'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST
import star from '../assets/star.png'

function Leaderboards() {

  const navigate = useNavigate()

  const [ players, setplayers ] = useState()

  useEffect(()=> {

    const getPlayers = async()=> {
        try{

      const getPlayers = await axios.get(`${VITE_NETWORK_HOST}/api/get/leaderboards`)


        setplayers(getPlayers.data)

      } catch(err){
        console.log(err)
      }
    }

    getPlayers()

    return ()=> {}
  }, [])


  return (
 
      <div className='leaderboard fpage flex fdc aic jc-c'>
        <div className="leaderboard-wrapper flex fdc aic">
            <img id='leaderboardBanner' width={350} src="https://i.ibb.co/xKsdRQH1/Untitled-design-64.png" alt="" />
            <ButtonBack />
             <div>
             {
                  players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 10).map((user, index)=> (
                    user.totalPoints > 0 ? 
                      <div 
                      key={index}
                      style={{
                        justifyContent: 'space-between',  margin: '0.5em 0',
                        padding: '1em', borderRadius: '1em'}} className='rank-container glass-bg flex fdr aic'>
                        
                        <div className='flex fdr aic'> 
                          <h2>{index+1}</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={user.avatar} alt="" />
                        </div>
                        <h2>{user.username}</h2>
                        <div className='flex fdc aic jc-c'>
                          <img  width={20} src={star} alt="" />
                          <p style={{margin: 0}}> {user.totalPoints.toFixed(0)}</p>
                        </div>

                      </div>
                    : null
                  ))
              }
          </div>
          
       
        </div>
       
      </div>
   
  )
}

export default Leaderboards
