import React, { useEffect } from 'react'
import { useState } from 'react'
import logo from '../assets/game-assets/Assets/Logo&Menu/Logo.png'


function PilotTestingPrompt({showPrompt, setShowPrompt}) {

    const [ active, setActive ] = useState(true)
    const [ agreed, setAgreed ] = useState(true)
    const [ showAgreement, setShowAgreement] = useState(false)
    

    useEffect(()=> {
        if(localStorage.getItem('agreedToTerms')){
            console.log('dsadsadsadsad')
            setShowPrompt(false)
        } else {
            setShowPrompt(true)
        }
    })

    const handleCheckBox =(e)=> {
        console.log(e.target.value)
        setAgreed(false)
        
    }

  return (
    <>
        {
            showPrompt && active ? 
            <div className='fpage flex fdc aic jc-c' style={{backgroundColor: 'black', position: 'fixed', zIndex: '3', color: 'black'}}>
                <div className='pilot-prompt flex fdc aic jc-c' style={{backgroundColor: 'white', padding: '1em', border: '3px solid yellow'}}>
                <img width={100} src={logo} alt="" />
                {
                    !showAgreement ? 
                    <div>
                        <p style={{textAlign: 'center'}}>MusicQuestro is currently in its beta version and undergoing pilot testing. During this 
                    phase, we are refining the platform’s features, improving gameplay performance, and gathering valuable feedback from early users. 
                    <br></br><br />
                    As a work in progress, some elements may still change or be enhanced to ensure the best possible experience for our players. 
                    We appreciate your patience and support 
                    as we continue to shape MusicQuestro into a fun, engaging, and adventurous music-driven journey for everyone.</p>

                    <p style={{textAlign: 'center', cursor: 'pointer', textDecoration: 'underline'}} onClick={()=> setShowAgreement(true)}>View User Agreement</p>

                    </div> : null
                }


                    <div>
                        {
                            showAgreement ? 
                            <div>
                                <p style={{overflowY: 'auto', height: '20em', backgroundColor: 'whitesmoke'}}>
                            MusicQuestro User Agreement and Parental Consent

                                Welcome to MusicQuestro! Our mission is to provide children with a fun, safe, and educational music experience. Because our app is designed for children ages 6–12, we require both users and parents/guardians to review and agree to the following terms:

                                Safe and Respectful Use
                                Children must use MusicQuestro in a safe and respectful way. They should not attempt to share personal information, use offensive language, or misuse the platform in any way that could harm themselves or others.

                                Educational Purpose
                                MusicQuestro is designed to support creativity, musical discovery, and storytelling. It is not a substitute for formal music lessons, but it can enrich learning and inspire children to explore music in a fun, interactive way.

                                Privacy and Safety
                                We value the privacy and safety of all children. No personal data will be collected without parental knowledge and consent. Children should never share identifying information (such as real names, addresses, or phone numbers) within the app.

                                Parental Consent
                                By providing consent, parents/guardians acknowledge that their child has permission to use MusicQuestro and that they understand the app involves interactive learning features, stories, and sound-based activities. Parents are encouraged to supervise their child’s use of the app.

                                Agreement to Terms
                                By checking the boxes below during registration, both the child and parent/guardian confirm that they have read, understood, and agreed to these terms. This ensures that MusicQuestro remains a safe, fun, and creative environment for all young learners.
                        </p>

                            <p style={{textAlign: 'center', cursor: 'pointer', textDecoration: 'underline'}} onClick={()=> setShowAgreement(false)}>Hide User Agreement</p>

                            </div> : null
                        }
                    </div>

                    <div className='flex fdr aic jc-c'>
                        <label htmlFor="Agree" />
                        <input onChange={handleCheckBox} type="checkbox" name="dasdsa" id="Agree" value={'dsadasd'} />
                        <p>Agree to user agreement policy</p>
                   
                    </div>

                    <button onClick={()=> {
                        setActive(false)
                        localStorage.setItem('agreedToTerms', 'true')
                    }}
                    style={{
                        width: '95%',
                        backgroundColor: 'green'
                    }}
                    disabled={agreed}
                    >Okay</button>


                

                </div>
            </div> : null
        }
    </>
  )
}

export default PilotTestingPrompt
