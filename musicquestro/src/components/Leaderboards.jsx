import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProtectedComponent from './ProtectedComponent'
import '../styles/Leaderboards.css'
import axios from 'axios'
import ButtonBack from '../mini-components/ButtonBack'

function Leaderboards() {

  const navigate = useNavigate()

  const [ players, setplayers ] = useState()

  useEffect(()=> {

    const getPlayers = async()=> {
        try{

      const getPlayers = await axios.get('http://localhost:5000/api/get/leaderboards')


        setplayers(getPlayers.data)

      } catch(err){
        console.log(err)
      }
    }

    getPlayers()

    return ()=> {}
  }, [])


  return (
    <ProtectedComponent>
      <div className='leaderboard fpage flex fdc aic jc-c'>
        <div className="leaderboard-wrapper">
            <h1>Leaderboard</h1>
            <ButtonBack />
            <div className="ranks-container flex fdc jc-c aic">
          {
              players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 10).map((user, index)=> (
                 user.totalPoints > 0 ? 
                 <div className='flex fdr aic jc-c' key={index} style={{width: '90%', backgroundColor: 'rgb(103, 115, 245)', borderRadius: '2em'
                  , padding: '0', margin: '0.5em 0'
                 }}>
                  <h2>{index+1}</h2>
                    <div className="profile-rank flex jc-c aic" style={{width: '3em', height: '3em', 
                      borderRadius: '50%', backgroundColor: 'white', margin: '0 1em'}}>
                      <p>p</p>
                    </div>
                    <h2>{user.username}</h2>
                    <p style={{marginLeft: '3em'}}>{user.totalPoints}</p>
                 </div> : null
              ))
          }
          </div>
        </div>
      </div>
    </ProtectedComponent>
  )
}

export default Leaderboards
