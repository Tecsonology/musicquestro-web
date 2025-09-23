import React from 'react'
import heart from '../assets/game-assets/ItemAssets/heart.png'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'
import CountdownCircle from './CountdownCircle'

function ItemHolder({useHint, useReplay, running, setRunning, setGameOver, children }) {
  return (
    <div className='flex fdr' style={{position: 'fixed', left: '0', top: '5em'}}>
      <div onClick={()=> useHint()} className='item-wrapper glass-bg'>
        <img width={40} src={hint} alt="" />
        <h4 className='item-quantity'>1</h4>
      </div>
      <div onClick={()=> setGameOver()} className='item-wrapper glass-bg'>
        <img width={40} src={heart} alt="" />
        <h4 className='item-quantity'>1</h4>
      </div>
      <div className='item-wrapper glass-bg'>
        <img onClick={()=> useReplay()} width={40} src={replay} alt="" />
        <h4 className='item-quantity'>1</h4>
      </div>
      {children}
      
    </div>
  )
}

export default ItemHolder
