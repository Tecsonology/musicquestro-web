import React, { useState, useContext } from 'react'
import { PitchScore } from './PitchGame'
import HighPitch from './HighPitch'
import cardImg from '../assets/sampleCardImg.png'
import noteImg from '../assets/Note.png'

const noteValues = [
  300, 350, 400, 450, 500, 600
]

function SecondPitchGame(props) {

    const [ start, setStart ] = useState(false)
    const [ message, setMessage ] = useState()
    const [ pitchCard, setPitchCard ] = useState([])
    const [ secPitchCard, setSecPitchCard ] = useState([])
    const [ key, setKey ] = useState()
    const { score, setScore } = useContext(PitchScore)
    const [ lightOn, setLightOn ] = useState(false)

    let noteLength = 3
    let seq;
    let context;

    const initializeAudio = () => {
       if(!context || context.state === 'closed'){
            context = new (window.AudioContext || window.webkitAudioContext)(); 
       } else if(context.state === 'suspended'){
        context.resume()
       }
    } 

    const playNotes =(freq)=> {
        if(!context) initializeAudio()
        const osc = context.createOscillator()
        const gainNode = context.createGain()


        osc.type = 'square'
        osc.frequency.value = freq

        gainNode.gain.setValueAtTime(1, context.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1000 / 1000);


        osc.connect(gainNode)
        gainNode.connect(context.destination)

        osc.start()
        osc.stop(context.currentTime * 2400 / 1000)
    }

    const generateSequence = ()=> {
        let noteSequence = []
        for(let x = 0; x < noteLength; x++){
            noteSequence.push(Math.floor(Math.random() * 5))
        }

        return noteSequence
    }

    const playSequence =async()=> {
        setPitchCard([])
        setSecPitchCard([])
        setMessage('First MElody')
         playFirstSequence()
        
         setTimeout(()=> {
            setMessage('Second melody...')
            playSecondSequence()
           
         },5000)

         setTimeout(()=> {
            setMessage('Who is the impostor pitch?')
            setLightOn(true)
         },9000)

        
    }

    const playFirstSequence =async()=> {
         initializeAudio()
        seq = generateSequence()
        console.log(seq)
        let delay = 0
        console.log('First sequence: ', seq)
        seq.forEach(element => {
            setTimeout(()=> {
                setPitchCard(prev => [...prev, element])
                playNotes(noteValues[element])
                
            }, 1000 + delay)

            delay += 1000
        })
    }

    const playSecondSequence =async ()=> {
        setSecPitchCard([])
        setLightOn(false)
        console.log("Await....")
        const seqCopy = seq
        const rand = Math.floor(Math.random()* seqCopy.length)
        setKey(rand)
        seqCopy[rand] = Math.floor(Math.random() * noteValues.length)
         console.log('Second Sequence: ',seqCopy, rand)

          let delay = 0
        seqCopy.forEach(element => {
            setTimeout(()=> {
                setSecPitchCard(prev => [...prev, element])
                playNotes(noteValues[element])
                
            }, 1000 + delay)

            delay += 1000
        })

         

    }

    const checkAnswer =(answer)=> {
        console.log(answer)
        if(answer === key){
            console.log('ognrats')
            setMessage("Correct")
            setScore(score + 1)
            
        } else if(answer!=key){
            console.log('incorrect')
            setMessage('Wrong')
        }

        setTimeout(()=> {
            playSequence()
        }, 2000)
    }

    if(score > 10){

        noteLength + 1
        console.log("hoyyyyyyyyyyyyy")
    }


  return (
    <div className='flex fdc aic jc-c'>
      
            <div>
                  {
        !start ? 
        <div className='flex fdc aic jc-c'>
            <h1 style={{textAlign: 'center'}}>This is the second round game. Are you ready?</h1>   
            <button onClick={()=>       
                {
                    setStart(true)
                    playNotes()
                }
            }>Im ready  </button>
        </div> : 
        <div className='flex fdc aic jc-c'>
             <h3 style={{textAlign: 'center'}}>{message}</h3>
             <div className='first-note-container flex fdr aic jc-c'>
                 {
                    pitchCard && pitchCard.length > 0 ?
                    pitchCard.map((note, index)=> (
                        <h1 key={index} style={{margin: '0.2em', backgroundColor: 'white', padding: '0.3em', color: 'black'}}>
                            <span><img style={{position: 'relative'}} width={60} src={noteImg} alt="" /></span>
                        </h1>
                    )) : null
                }
             </div>

              <div className='second-note-container flex fdr aic jc-c'>
                 {
                    secPitchCard && secPitchCard.length > 0 ?
                    secPitchCard.map((note, index)=> (
                        <h1 className={lightOn ? 'cardLightOn' : null} onClick={()=> {
                            checkAnswer(index)
                           
                        }} key={index} style={{margin: '0.2em', backgroundColor: 'white', padding: '0.5em', color: 'black', cursor: 'pointer'}}>?</h1>
                    )) : null
                }
             </div>
            <button onClick={()=> {
                playSequence()}}>Play Note</button>
        </div>
      }
            </div> 
      
    </div>
  )
}

export default SecondPitchGame
