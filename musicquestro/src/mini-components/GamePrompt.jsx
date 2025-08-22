import axios from 'axios'
import React from 'react'
import { useState, useContext, createContext} from 'react'
import { UserContext } from '../components/CurrentUserContext'
import { userids } from '../Token'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function GamePrompt({ gameName, instr }) {

    const [ showPrompt, setShowPromt ] = useState(true)
    const [ showError, setShowError ] = useState(false)
    const [ begin, setBegin ] = useState(false)

    const { currentUser, setCurrentUser } = useContext(UserContext)


    const deductLife = async ()=> {
        
        try {
            
            let lifeDeduct = 5
            let userids = currentUser && currentUser.userids
            const action = await axios.put(`${VITE_NETWORK_HOST}/api/user-deduct-life`,
                {
                    userids,
                    lifeDeduct  
                }
            )

            console.log(action.status)

        } catch (error) {
            setShowError(true)
        }
    }

      
    const hidePrompt =async ()=> {
        
    
            deductLife()
            setShowPromt(false)
        
    }

  return (
    <>
        {
            showPrompt && showPrompt ? 
            <div className='fpage flex fdc jc-c aic' style={{position: 'fixed', zIndex: '10', backgroundColor: 'rgba(0, 0, 0, 0.63)', height: '100%'}}>
            <div className='flex fdc aic jc-c' style={{backgroundColor: 'white', color: 'black', padding: '1em', width: '17em', borderRadius: '1em'}}>
                {/**<h3 onClick={hidePrompt} style={{position: 'relative', right: '-7em', top: '-1.5em', color: 'red'}}>x</h3> */}
                <h3>{ gameName && gameName }</h3>
                <span><span><img width={15} src="https://i.ibb.co/BVq668JC/Untitled-design-30.png" alt="" /></span> -5 </span>
                { currentUser ? <button disabled={begin} onClick={hidePrompt}>Alright!</button> : null}
            </div>
            </div> : null
        }

        {
            showError && showError ? 
             <div className='fpage flex fdc jc-c aic' style={{position: 'fixed', zIndex: '10', backgroundColor: 'rgba(0, 0, 0, 0.63)', height: '100%'}}>
            <div className='flex fdc aic jc-c' style={{backgroundColor: 'white', color: 'black', padding: '1em', width: '17em', borderRadius: '1em'}}>
                <h3 onClick={hidePrompt} style={{position: 'relative', right: '-7em', top: '-1.5em', color: 'red'}}>x</h3>
                <h3>Insufficient MusicLife</h3>
                <button onClick={()=> {
                    window.location.href = '/h'
                }}>Back to Home</button>
                <button style={{backgroundColor: 'green'}} onClick={()=> { window.location.href = '/h/store'}}>Go to Shop</button>
            </div>
            </div> : null
        }
    </>
  )
}

export default GamePrompt
