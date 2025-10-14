import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { useState, useContext } from 'react'
import musicCoin from '../assets/store-assets/musicoins.png'
import gift from '../assets/main-home/GiftUpper.png'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';



Modal.setAppElement("#root"); 
import { UserContext } from './CurrentUserContext'
import axios from 'axios';

function DailyReward({open}) {

    const [ isOpen, setIsOpen ] = useState(true)
    const { currentUser } = useContext(UserContext)
    const [ claimed, setClaimed ] = useState()
    const dateToday = new Date().toLocaleDateString('en-CA'); // "2025-10-07"


    useEffect(()=> {
      if(currentUser && currentUser.lastClaimedDate === dateToday){
        setClaimed(true)
      } else {
        setClaimed(false)
      }
    }, [currentUser])

    const claimReward = async()=> {
      try {
        const recipient = await axios.post(`${VITE_NETWORK_HOST}/rewards-claim`, 
          {
            userids: currentUser && currentUser.userids
        })

        if(recipient){
          setClaimed(true)
        }

       
      } catch (error) {
        
      }
    }


  return (
   <Modal
  isOpen={open}
  contentLabel="Daily Reward Modal"
  style={{
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "20em",
      borderRadius: "2em",
      position: "fixed",
      zIndex: "100",
      color: "black",
      height: "60%",
      padding: "0",
      border: '4px solid yellow',
      overflow: "visible", // ✅ allows the gift to show outside the box
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.94)",
    },
  }}
>
  {/* 🎁 Floating Gift Image */}
  <img
    src={gift}
    alt="Gift"
    width={100}
    style={{
      position: "absolute",
      top: "-40px", // move above the modal
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
    }}
  />

  {/* Modal Body */}
  <div
    style={{
      width: "100%",
      height: "100%",
      paddingTop: "2em",
    }}
    className="daily-reward flex fdc aic jc-c"
  >
    <h2 style={{ color: "black", textAlign: "center" }}>Daily Rewards</h2>
    <img 
    style={{
      padding: '1em',
      backgroundColor: 'rgba(42, 2, 58, 0.84)',
      borderRadius: '1em'
    }}
    width={60} src={musicCoin} alt="Music Coin" />
    <h2 style={{ color: "black" }}>100 MusicCoins</h2>

    {!claimed ? (
      <button
        style={{
          width: "90%",
          marginTop: "1em",
          borderRadius: "1em",
          padding: "0.5em 1em",
        }}
        onClick={claimReward}
      >
        Claim
      </button>
    ) : (
      <>
        <p style={{ color: "black", fontWeight: "bold" }}>✅ Claimed</p>
        <p style={{color: '#343'}}>See you again tommorow!</p>
      </>
    )}
  </div>
</Modal>

  )
}

export default DailyReward
