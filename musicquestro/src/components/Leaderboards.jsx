import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProtectedComponent from './ProtectedComponent'
import '../styles/Leaderboards.css'
import axios from 'axios'
import ButtonBack from '../mini-components/ButtonBack'
import UserRank from '../mini-components/UserRank'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST
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
      
          <table>
            <tbody>
             
               {
                  players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 10).map((user, index)=> (
                    user.totalPoints > 0 ? 
                    
                      <UserRank key={index} rank={index+1} username={user.username} userPoints={user.totalPoints}/>
                    : null
                  ))
              }
            
            </tbody>
          </table>
       
        </div>
      </div>
   
  )
}

export default Leaderboards
