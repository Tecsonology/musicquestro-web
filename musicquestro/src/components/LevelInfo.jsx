import React from 'react'

const styles = {
  margin: 0,
  width: '15em',
  height: 'auto',
  backgroundColor: '#7f6802ff',
  clipPath: 'polygon(99.15802422016375% 5.227879076344162%, 86.69040837913029% 94.3699720524841%, 19.98056777515899% 78.95442213931703%, 11.07512788870651% 55.831097269566456%, 0% 48.793563613555406%, 12.046630421774053% 43.43163320897556%, 18.685231064402267% 21.98391159065618%)'

}

function LevelInfo({targetPoint, countdownTimer, gameRound, noteLength,}) {
  return (
    <div className='flex fdc aic jc-c 'style={{position: 'relative'}}>
              <h3 style={{margin: styles.margin, 
                backgroundColor: '#5d0202ff', padding: '0.1em 1em',
                position: 'absolute', top: '-0.5em', right: '2em', color: 'white'}} >LEVEL INFO</h3>
        <div className='flex fdr aic jc-c 'style={{position: 'relative'}}>
        
      <img width={70} src='../assets/Maestro.png' alt="" />
     <div style={{
        border: '4px solid black',
        padding: '2em',
        clipPath: styles.clipPath,
        width: styles.width,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
     }} className='flex fdc aic jc-c'>
  
        <p style={{margin: styles.margin}}>{noteLength && `Number of note: ${noteLength}`}</p>
    <p style={{margin: styles.margin}}>Your target points is {targetPoint}</p>
      <p style={{margin: styles.margin}}>Round timer: {countdownTimer}s</p>
      <p style={{margin: styles.margin}}>You have {gameRound} rounds to play</p>
      <h4 style={{margin: styles.margin}}>Goodluck! 💪</h4>
     </div>
    </div>
    </div>
  )
}

export default LevelInfo
