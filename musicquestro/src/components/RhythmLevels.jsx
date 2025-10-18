import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate,  } from 'react-router-dom'
import CurrentUserContext,{ UserContext } from './CurrentUserContext'
import Loader from './Loader'
import star from '../assets/star.png'
import '../styles/Maps.css'


function RhythmLevels() {

    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [ levels, setLevels ] = useState()
    const numberOfLevels = [ 1, 2, 3, 4, 5]

    useEffect(()=> {
        if(currentUser){
            setLevels(currentUser.maps.rhythm.levels)
        }
    }, [currentUser])
    
  return (
    <div className='rhythm-levels-container fpage flex fdc aic jc-c' style={{position: 'absolute'}}>
      <h1 style={{textAlign: 'center'}}>Rhythmic Ruins</h1>
      <div className="level-button-wrapper flex fdr aic jc-c flex-wrap">
        {
            levels ? 
            Object.values(numberOfLevels).map((level, index)=> (
                <button key={index} disabled={level != levels[index]} className='level-buttons'
                style={{border: level != levels[index] ? '1px solid white' : '3px solid yellow',
                  background: level != levels[index] && 'black'
                }}
                onClick={()=> {
                    navigate(`/rhythmGame/${index}`)
                }}>{level != levels[index] ? '🔒' : level}</button>
            ))
            : <Loader />
        }
        {
            levels && levels.length == 5 ? 
            <div className='flex fdc aic jc-c' style={{
              backgroundColor: 'rgba(109, 105, 105, 0.5)',
              padding: '1em',
              borderRadius: '0.5em',
              border: '0.2px solid gold',
            }}>
              <p style={{color: 'gold'}}>👏 LEVELS COMPLETED</p>
              <button
                style={{margin: 0, backgroundColor: 'transparent', textTransform: 'underline',}}
                onClick={()=> { navigate('/h/story#13')}}>View chapter story</button>
            </div>
            : null
        }
      </div>
     
    </div>
  )
}

export default RhythmLevels
