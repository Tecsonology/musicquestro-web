import React, { useContext} from 'react'
import { UserContext } from '../components/CurrentUserContext'


const STYLES = {
    backgroundColor: 'white',
    color: 'black',
    width: 'auto',
    padding: '0',
    fontWeight: 'bold'
}

function Lifebar() {


  const { currentUser } = useContext(UserContext)

  let life = 0
  if(localStorage.getItem("userLogged")){
    const user = JSON.parse(localStorage.getItem("userLogged")) 
    life = user.life
  }

  const lifeArr = []

  for(let x = 0; x < life; x++){
    lifeArr.push(1)
  }


  return (
    <div style={{ color: STYLES.color, width: STYLES.width,
         borderRadius: '1em', position: 'fixed', top: '1em', right: '2em', padding: '0.5em'
    }} className='life-container flex fdr aic jc-c'>
         <p>{currentUser && currentUser.life}</p>
        <img  style={{width: '1em', marginRight: '0.5em'}} src="https://i.ibb.co/BVq668JC/Untitled-design-30.png" alt="" />
       
    
    </div>
  )
}

export default Lifebar
