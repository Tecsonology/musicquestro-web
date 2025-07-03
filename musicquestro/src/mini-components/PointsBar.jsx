import React from 'react'
import { userToken } from '../Token'
import { UserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'

const STYLES = {
    backgroundColor: 'white',
    color: 'black',
    width: '5em',
    padding: '0',
    fontWeight: 'bold'
}

function PointsBar() {

  const { currentUser } = useContext(UserContext)

  let coins = 0
  if(userToken){
    const user = JSON.parse(localStorage.getItem("userLogged"))
    coins = user.musicCoins
  }


  return (
    <div style={{ color: STYLES.color, width: STYLES.width,
         borderRadius: '1em', position: 'fixed', top: '4em', right: '2em', padding: '0.2em'
    }} className='flex fdr aic jc-c glass-bg'>
      <img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" />
      <p style={{margin: STYLES.padding}}>{currentUser && currentUser.musicCoins}</p>
    </div>
  )
}

export default PointsBar
