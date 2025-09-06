import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate,  } from 'react-router-dom'
import CurrentUserContext,{ UserContext } from './CurrentUserContext'
import Loader from './Loader'
import star from '../assets/star.png'


function HarmonyLevels() {

    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [ levels, setLevels ] = useState()
    const numberOfLevels = [ 1, 2, 3, 4, 5]

    useEffect(()=> {
        if(currentUser){
            setLevels(currentUser.maps.harmony.levels)
        }
    }, [currentUser])
    
  return (
    <div className='rhythm-levels-container fpage flex fdc aic jc-c' style={{position: 'absolute'}}>
      <h1>Levels</h1>
      <div className="level-button-wrapper flex fdr aic jc-c flex-wrap">
        {
            levels ? 
            Object.values(numberOfLevels).map((level, index)=> (
                <button key={index} disabled={level != levels[index]} className='level-buttons'
                onClick={()=> {
                    navigate(`/harmonyGame/${index}`)
                }}>{level}</button>
            ))
            : <Loader />
        }
      </div>
      {
        numberOfLevels.length >= 5 ? <p>Complete all of these levels <span><img width={20} src={star} alt="" /></span></p> : null
      }
    </div>
  )
}

export default HarmonyLevels
