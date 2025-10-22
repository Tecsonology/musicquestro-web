import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Leaderboards.css'
import axios from 'axios'
import ButtonBack from '../mini-components/ButtonBack'
import UserRank from '../mini-components/UserRank'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST
import star from '../assets/star.png'

import Gold from '../assets/game-assets/Badges/GoldMedal.png'
import Silver from '../assets/game-assets/Badges/SilverMedal.png'
import Bronze from '../assets/game-assets/Badges/BronzeMEdal.png'


function Leaderboards() {

  const navigate = useNavigate()

  const [ players, setplayers ] = useState()
  const [ topPlayers, setTopPlayers ] = useState()

  useEffect(()=> {

    const getPlayers = async()=> {
        try{

      const getPlayers = await axios.get(`${VITE_NETWORK_HOST}/api/get/leaderboards`)


        setplayers(getPlayers.data)
        setTopPlayers([...getPlayers.data].sort((a, b)=> b.totalPoints - a.totalPoints).slice(0, 3))

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
          <h1 style={{fontSize: '2.5em', padding: '0.5em', borderRadius: '0.7em', backgroundColor: 'rgba(11, 93, 176, 1)'}}>LEADERBOARD</h1>
            <ButtonBack />
             <div style={{width: '100%'}} className='flex fdc aic jc-c'>
               <div className='flex fdr jc-c' style={{marginTop: '0',alignItems: 'flex-end',  width: '100%',
               }}>
                  <div className='topBar'>
                    <img width={50} src={Bronze} alt="" />

                    <div 
                      style={{
                        height: '100%',
                        minHeight: '11em',
                        justifyContent: 'flex-start', width: '100%',
                        padding: '1em 0.5em', borderRadius: '1em', backgroundColor: 'red  '}} className='flex fdc aic'>
                        
                        <div className='flex fdc aic'> 
                          <h2>3</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={topPlayers && topPlayers[2].avatar} alt="" />
                        </div>
                        <h4 style={{backgroundColor: 'rgba(0, 72, 131, 1)', padding: '0.3em', borderRadius: '0.5em'}} >{topPlayers && topPlayers[2].username}</h4>
                        <div className='flex fdc aic jc-c'>
                          <img  width={20} src={star} alt="" />
                          <p style={{margin: 0}}> {topPlayers && topPlayers[2].totalPoints.toFixed(0)}</p>
                        </div>

                  </div>
                  </div>
                  <div className='topBar'>
                    <img width={50} src={Gold} alt="" />

                    <div 
                      style={{
                        height: '100%',
                        minHeight: '20em',
                        justifyContent: 'flex-start', width: '100%',
                        padding: '1em 0.5em', borderRadius: '1em', backgroundColor: 'green'}} className='flex fdc aic'>
                        <div className='flex fdc aic'> 
                          <h2>1</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={topPlayers && topPlayers[0].avatar} alt="" />
                        </div>
                        <h4 style={{backgroundColor: 'rgba(0, 72, 131, 1)', padding: '0.3em', borderRadius: '0.5em'}}>{topPlayers && topPlayers[0].username}</h4>
                        <div className='flex fdc aic jc-c'>
                          <img  width={20} src={star} alt="" />
                          <p style={{margin: 0}}> {topPlayers && topPlayers[0].totalPoints.toFixed(0)}</p>
                        </div>

                    </div>
                  </div>
                  <div className='topBar'> 
                    <img width={50} src={Silver} alt="" />
                    <div 
                      style={{
                        height: '100%',
                        minHeight: '16em',
                        justifyContent: 'flex-start', width: '100%',
                        padding: '1em 0.5em', borderRadius: '1em', backgroundColor: 'gold'}} className='flex fdc aic'>

                        <div className='flex fdc aic'> 
                          <h2>2</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={topPlayers && topPlayers[1].avatar} alt="" />
                        </div>
                        <h4 style={{backgroundColor: 'rgba(0, 72, 131, 1)', padding: '0.3em', borderRadius: '0.5em'}}>{topPlayers && topPlayers[1].username}</h4>
                        <div className='flex fdc aic jc-c'>
                          <img  width={20} src={star} alt="" />
                          <p style={{margin: 0}}> {topPlayers && topPlayers[1].totalPoints.toFixed(0)}</p>
                        </div>

                    </div>
                  </div>
                  
                </div>
              
               {
                  
                  players && [...players].sort((a, b)=> b.totalPoints - a.totalPoints).slice(3, 10).map((user, index)=> (
                    user.totalPoints > 0 ? 
                      <div 
                      key={index}
                      style={{
                        justifyContent: 'space-between',  margin: '0.5em 0',
                        padding: '0.5em 1em', borderRadius: '1em'}} className='rank-container flex fdr aic'>
                        
                        <div className='flex fdr aic'> 
                          <h2 style={{margin: 0}}>{index+4}</h2>
                          <img style={{marginLeft: '1em'}} width={50} src={user.avatar} alt="" />
                        </div>
                        <h4 style={{margin: 0}}>{user.username}</h4>
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
