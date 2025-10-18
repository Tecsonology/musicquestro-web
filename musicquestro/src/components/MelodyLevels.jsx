import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { UserContext } from './CurrentUserContext'
import star from '../assets/star.png'
import '../styles/Maps.css'

function MelodyLevels() {
   const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [ levels, setLevels ] = useState()
    const numberOfLevels = [ 1, 2, 3, 4, 5]

    useEffect(()=> {
        if(currentUser){
            setLevels(currentUser.maps.melody.levels)
        }
    }, [currentUser])
    
  return (
    <div className='melody-levels-container fpage flex fdc aic jc-c' style={{position: 'absolute'}}>
      <h1 style={{textAlign: 'center'}}>Melodic Peak</h1>
      <div className="level-button-wrapper flex fdr aic jc-c flex-wrap">
        {
            levels ? 
            Object.values(numberOfLevels).map((level, index)=> (
                <button key={index} disabled={level != levels[index]} className='level-buttons'
                style={{border: level != levels[index] ? '1px solid white' : '3px solid yellow',
                  background: level != levels[index] && 'black'
                }}
                onClick={()=> {
                    navigate(`/melodyGame/${index}`)
                }}>{level != levels[index] ? '🔒' : level}</button>
            ))
            : <p>Loading...</p>
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
                onClick={()=> { navigate('/h/story#22')}}>View chapter story</button>
            </div>
            : null
        }
      </div>
    
    </div>
  )
}

export default MelodyLevels
