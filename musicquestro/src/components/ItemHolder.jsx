import React, { useContext, useState} from 'react'
import heart from '../assets/game-assets/ItemAssets/heart.png'
import replay from '../assets/game-assets/ItemAssets/replay.png'
import hint from '../assets/game-assets/ItemAssets/hint.png'
import CountdownCircle from './CountdownCircle'
import axios from 'axios'
import { UserContext } from './CurrentUserContext'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function ItemHolder({life, useHint, useReplay, running, setRunning, children, userContext }) {

  const token = localStorage.getItem('token')
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const tempHintQty = userContext ? userContext.items.spells[0][1] : 0
  const tempReplayQty = userContext ? userContext.items.spells[1][1] : 0

  const [ spells, setSpells ] = useState(userContext ? userContext.items.spells : null)

  const [ hintQty, setHintQty ] = useState()
  const [ heartQty, setHeartQty ] = useState()
  const [ replayQty, setReplayQty ] = useState()
  const [ heartLeft, setHeartLeft ] = useState(5)

  useState(() => {
    setHintQty(spells ? spells[0][1] : 0)
    setReplayQty(spells ? spells[1][1] : 0)
  }, [userContext])


  const updateQty = async (index) => {
    try {
      setCurrentUser({...currentUser, items: {
        ...currentUser.items,
        spells: spells ? spells.map((spell, i) => { 
          if(i === index){
            return [spell[0], spell[1] - 1]
          } else {
            return spell
          }   
        }) : null
        }})        



      const response = await axios.put(`${VITE_NETWORK_HOST}/update-spells`, {
        userids: userContext ? userContext.userids : null,
        operator: -1,
        index: index
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    )

      console.log(response.data)
      

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='item-holder-container flex fdr'>
      <div className="left-items flex fdr aic jc-c">
       {
        hintQty >= 0 ?
         <div style={{
          opacity: hintQty == 0 ? 0.2 : 1
        }} id='hint-spell' onClick={()=> {
            if (hintQty > 0) {
              useHint()
              updateQty(0)
              setHintQty(hintQty - 1)
            } else {
              return null
            }
          }} className='item-wrapper glass-bg'>
            <img width={40} src={hint} alt="" />
            <h4 className='item-quantity'>{tempHintQty}</h4>
      </div> : null
       }

    
      {
        replayQty >= 0 ?
        <div style={{
          opacity: replayQty == 0 ? 0.2 : 1
        }} id='replay-spell' className='item-wrapper glass-bg'>
        <img onClick={()=> {
          if (replayQty >=  1) {
            useReplay()
            updateQty(1)
            setReplayQty(replayQty - 1)
          }
        }} width={40} src={replay} alt="" />
        <h4 className='item-quantity'>{tempReplayQty}</h4>
      </div> : null
      }
      </div>

      <div className="right-items flex fdr aic jc-c">
        <div className='item-wrapper glass-bg'>
          <img width={40} src={heart} alt="" />
          <h4 className='item-quantity'>{life}</h4>
        </div>
        {children}
      </div>
      
    </div>
  )
}

export default ItemHolder
