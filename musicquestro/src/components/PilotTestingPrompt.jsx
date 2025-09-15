import React from 'react'
import { useState } from 'react'

function PilotTestingPrompt() {

    const [ active, setActive ] = useState(true)

  return (
    <>
        {
            active ? 
            <div className='fpage flex fdc aic jc-c' style={{backgroundColor: 'black', position: 'fixed', zIndex: '3', color: 'black'}}>
                <div className='pilot-prompt flex fdc aic jc-c' style={{backgroundColor: 'white', padding: '1em',}}>
                <img width={100} src="https://i.ibb.co/MkgK8X5q/MUSIC-QUESTRO-NEW-LOGO-NO-STARS.png" alt="" />
                <p style={{textAlign: 'center'}}>MusicQuestro is currently in its beta version and undergoing pilot testing. During this 
                    phase, we are refining the platform’s features, improving gameplay performance, and gathering valuable feedback from early users. 
                    <br></br><br />
                    As a work in progress, some elements may still change or be enhanced to ensure the best possible experience for our players. 
                    We appreciate your patience and support 
                    as we continue to shape MusicQuestro into a fun, engaging, and adventurous music-driven journey for everyone.</p>

                    <button onClick={()=> {
                        setActive(false)
                    }}>Okay</button>
                </div>
            </div> : null
        }
    </>
  )
}

export default PilotTestingPrompt
