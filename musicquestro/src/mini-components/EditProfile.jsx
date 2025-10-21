import React, {useContext, useEffect, useState,} from 'react'
import { UserContext } from '../components/CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Profile.css'

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function EditProfile() {

  const token = localStorage.getItem('token')
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [ username, setUsername ] = React.useState(currentUser ? currentUser.username : null)
  const [ newUsername, setNewUsername ] = useState()
  const [ bio, setBio ] = React.useState(currentUser ? currentUser.bio : null)
  const [ maxLength, setMaxLength ] = useState(false)

  useEffect(()=> {
    if(newUsername && newUsername.length >= 12){
      setMaxLength("*Maxumum of 12 characters only")
    } else if(newUsername && newUsername.length <= 12) {
      setMaxLength(null)
    }
  }, [newUsername])


  const checkUserAvail = async()=> {
    try {
      const checkUser = await axios.get(`${VITE_NETWORK_HOST}/users`,{ params: { username: newUsername}})
      if(checkUser.data.message === 'User exists'){
        return false
      } else {
        return true
      }
    } catch (error) {
      
    }
  }

  const updateProfile = async()=> {

    const checker = await checkUserAvail()
    console.log(checker)
        
    if(checker === true){
          const updateUser = await axios.put(`${VITE_NETWORK_HOST}/update-user-profile`,
              {
                userids: currentUser ? currentUser.userids : null,
                newUsername: newUsername,
                bio: bio
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
          )

        alert("User updated")
        navigate(-1)
    } else if(checker === false){
      alert("User exist, please try another one!")
    }
  }

  const handleUsernameChange = (e) => { 
    if(e.target.value.length <= 0) {
      setUsername(currentUser.username)
    } else {
      setUsername(e.target.value)
      setNewUsername(e.target.value)
    }
  }

  const handleBioChange = (e) => {
    setBio(e.target.value)
  }

  return (
    <div className='edit-profile fpage flex fdc aic jc-c'>
      <div className="header">
        <h2>Edit Profile</h2>
      </div>
      <div className="edit-section">
        <h2>Avatar</h2>
        <div className="flex fdc aic jc-c">
        <img style={{backgroundColor: '#38026aff', margin: 0}}  width={80} src={currentUser ? currentUser.avatar : null} alt="" />
        <button onClick={()=> {
          navigate('/set-up-account')
        }} style={{fontSize: '0.7em'}}>Change avatar</button>
      </div>
      </div>

      <div className="edit-section">
        <h2>Username</h2>
          <h2 style={{ backgroundColor: '#191919ff', padding: '0.5em'}}>{username}</h2>
      

      <input maxLength={12} style={{borderRadius: '1em', color: 'black'}} onChange={handleUsernameChange} type="text" placeholder={currentUser ? currentUser.username : null} />
        <p style={{margin: '0', color: 'red',}}>{maxLength}</p>
      </div>
    
      <div className="edit-section">
        <h2>Bio</h2>
        <p style={{fontWeight: 'normal', margin: '1em', backgroundColor: '#191919ff', padding: '0.5em 0'}}>{bio}</p>
         <label >Choose your Bio:</label>

        <select onChange={handleBioChange} className='flex fdc aic jc-c' style={{width: '90%', marginTop: '1em', color: 'black'}} name="bio-list" id="bio-list">
          <option value="Living life one beat at a time.">Living life one beat at a time.</option>
          <option value="Where words fail, music speaks.">Where words fail, music speaks.</option>
          <option value="Dancing through life’s melody.">Dancing through life’s melody.</option>
          <option value="Fueled by rhythm, guided by harmony.">Fueled by rhythm, guided by harmony.</option>
          <option value="Music is my superpower.">Music is my superpower.</option>
          <option value="Every note tells a story.">Every note tells a story.</option>
          <option value="Made of chords and dreams.">Made of chords and dreams.</option>
          <option value="Heart in sync with the beat.">Heart in sync with the beat.</option>
          <option value="A soul stitched together with sound.">A soul stitched together with sound.</option>
          <option value="Lost in melodies, found in harmony.">Lost in melodies, found in harmony.</option>
          <option value="Writing my story in notes, not words.">Writing my story in notes, not words.</option>
          <option value="Each song is a universe of its own.">Each song is a universe of its own.</option>
          <option value="Professional shower singer.">Professional shower singer.</option>
          <option value="Collector of good vibes and better beats.">Collector of good vibes and better beats.</option>
          <option value="Turning life into a playlist.">Turning life into a playlist.</option>
          <option value="Always out of tune, but never out of love for music.">Always out of tune, but never out of love for music.</option>
          <option value="Half human, half melody.">Half human, half melody.</option>

        
        </select> 
      </div>

        <div style={{width: '80%'}} className="edit-buttons flex fdr aic jc-c">
          <button onClick={()=> {
            updateProfile()
        }} style={{ backgroundColor: 'green', marginRight: '0.4em' }}>SAVE</button>

        <button style={{backgroundColor: 'red'}} onClick={()=> {
          navigate(-1)
        }} >CANCEL</button>
        </div>
    </div>
  )
}

export default EditProfile
