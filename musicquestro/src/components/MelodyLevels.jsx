import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { UserContext } from './CurrentUserContext'
import star from '../assets/star.png'

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
      <h1>Levels</h1>
      <div className="level-button-wrapper flex fdr aic jc-c flex-wrap">
        {
            levels ? 
            Object.values(numberOfLevels).map((level, index)=> (
                <button key={index} disabled={level != levels[index]} className='level-buttons'
                onClick={()=> {
                    navigate(`/melodyGame/${index}`)
                }}>{level}</button>
            ))
            : <p>Loading...</p>
        }
      </div>
      {
        numberOfLevels.length >= 5 ? <p>You complete all of these levels <span><img width={20} src={star} alt="" /></span></p> : null
      }
    </div>
  )
}

export default MelodyLevels
