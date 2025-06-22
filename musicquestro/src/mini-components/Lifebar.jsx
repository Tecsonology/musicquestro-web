import React from 'react'

const STYLES = {
    backgroundColor: 'white',
    color: 'black',
    width: '5em',
    padding: '0',
    fontWeight: 'bold'
}

function Lifebar() {
  let coins = 0
  if(localStorage.getItem("userLogged")){
    const user = JSON.parse(localStorage.getItem("userLogged"))
    coins = user.musicCoins
  }


  return (
    <div style={{ color: STYLES.color, width: STYLES.width,
         borderRadius: '1em', position: 'fixed', top: '1em', right: '2em', padding: '0.2em'
    }} className='flex fdr aic jc-c glass-bg'>
      <img style={{width: '1.3em', marginRight: '0.5em'}} src="https://i.ibb.co/N6w014ng/Currency.png" alt="" />
      <p style={{margin: STYLES.padding}}>{coins}</p>
    </div>
  )
}

export default Lifebar
