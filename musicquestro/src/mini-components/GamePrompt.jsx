import axios from 'axios'
import { useState, useContext} from 'react'
import { UserContext } from '../components/CurrentUserContext'
import '../styles/GameStyles.css'
import Loader from '../components/Loader'
import musicLife from '../assets/store-assets/MusicLife.png'
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
            <div className='game-prompt-container fpage flex fdc jc-c aic' style={{position: 'absolute', zIndex: '10', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.89)'}}>
            <div className='game-prompt-wrapper flex fdc aic jc-c' style={{ color: 'black', padding: '1em', width: '17em', borderRadius: '1em'}}>
                {/**<h3 onClick={hidePrompt} style={{position: 'relative', right: '-7em', top: '-1.5em', color: 'red'}}>x</h3> */}
                <h3 style={{color:' white'}}>{ gameName && gameName }</h3><br />
                <div style={{position: 'relative', background: '#0073ffff', padding: '1em', borderRadius: '2em 0 2em 0', border: '5px solid rgba(113, 206, 209, 0.94)'}} className='flex fdr aic jc-c'>
                    <span><img width={30} src={musicLife} alt="" />
                    <p className='flex fdc aic jc-c' 
                    style={{position: 'absolute', backgroundColor: 'black', borderRadius: '50%', width: '2em', 
                    height: '2em', top: '3em', left: '2em', color: 'white', fontWeight: 'bolder'}}>5</p>
                </span><p style={{color: 'white'}}></p></div>
                <p style={{color: 'rgba(0, 251, 0, 1)'}}>This game needs music energy</p>
                { currentUser ? <button style={{width: '100%', backgroundColor: 'blue'}} disabled={begin} onClick={hidePrompt}>Okay</button> : 
                    <Loader />
                }
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
