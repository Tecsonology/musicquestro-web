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
        <div className="leaderboard-wrapper flex fdc aic jc-c">
            <img id='leaderboardBanner' src="https://i.ibb.co/xKsdRQH1/Untitled-design-64.png" alt="" />
            <ButtonBack />
             <div className='flex fdc aic jc-c'>
              <div style={{marginTop: '3em', alignItems: 'flex-end'}} className='flex fdr'>
                {
                  players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 3).map((user, index)=> (
                    user.totalPoints > 0 ? 
                      <div 
                      key={index}
                      style={{
                        height: '100%',
                        minHeight: index === 0 ? '18em' : index === 1 ? '12em' : '10em',
                        justifyContent: 'flex-start',  margin: '0.2em', width: '6em', boxSizing: 'content-box',
                        padding: '1em 0.5em', borderRadius: '1em'}} className='glass-bg flex fdc aic'>
                        
                        <div className='flex fdc aic'> 
                          <h2>{index+1}</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={user.avatar} alt="" />
                        </div>
                        <h4>{user.username}</h4>
                        <div className='flex fdc aic jc-c'>
                          <img  width={20} src={star} alt="" />
                          <p style={{margin: 0}}> {user.totalPoints.toFixed(0)}</p>
                        </div>

                      </div>
                    : null
                  ))
              }
              </div>
             {
                  
                  players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(3, 10).map((user, index)=> (
                    user.totalPoints > 0 ? 
                      <div 
                      key={index}
                      style={{
                        justifyContent: 'space-between',  margin: '0.5em 0',
                        padding: '1em', borderRadius: '1em'}} className='rank-container glass-bg flex fdr aic'>
                        
                        <div className='flex fdr aic'> 
                          <h2>{index+4}</h2>
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
