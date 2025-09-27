import React, {useContext, useState,} from 'react'
import { UserContext } from '../components/CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


function EditProfile() {

  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [ username, setUsername ] = React.useState(currentUser ? currentUser.username : null)
  const [ newUsername, setNewUsername ] = useState()
  const [ bio, setBio ] = React.useState()

console.log(currentUser ? currentUser.username : null)
  const updateProfile = async()=> {
        
        

    try {
      
      const updateUser = await axios.put(`${VITE_NETWORK_HOST}/update-user-profile`,
          {
            userids: currentUser ? currentUser.userids : null,
            newUsername: newUsername,
            bio: bio
          }
      )

      if(updateUser){
        console.log("User updated!")
        return true
      }

    } catch (error) {
      console.log("Error")
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
    <div style={{textAlign: 'center', overflow: 'hidden'}} className='edit-profile fpage flex fdc aic'>
      <img style={{backgroundColor: '#38026aff'}}  width={80} src={currentUser ? currentUser.avatar : null} alt="" />
      <button onClick={()=> {
        navigate('/set-up-account')
      }} style={{fontSize: '0.7em'}}>Change avatar</button>
      <h2>{username}</h2>
      <p style={{fontWeight: 'normal'}}>{bio}</p>

      <input style={{borderRadius: '1em'}} onChange={handleUsernameChange} type="text" placeholder={currentUser ? currentUser.username : null} />

      <label>Choose your Bio:</label>

        <select onChange={handleBioChange} className='flex fdc aic jc-c' style={{width: '90%', marginTop: '1em'}} name="bio-list" id="bio-list">
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

        <div style={{position: 'absolute', bottom: '7em', width: '80%'}} className="edit-buttons">
          <button onClick={()=> {
          if(updateProfile()){
            alert("User saved!")
            window.location.href = '/h/user'
          }
        }} style={{width: '80%', backgroundColor: 'green'}}>SAVE</button>

        <button style={{width: '80%', backgroundColor: 'red'}} onClick={()=> {
          navigate(-1)
        }} >CANCEL</button>
        </div>
    </div>
  )
}

export default EditProfile
