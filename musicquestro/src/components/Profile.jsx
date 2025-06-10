import React from 'react'
import ProtectedComponent from './ProtectedComponent'

function Profile() {
  return (
    <ProtectedComponent 
      children={
        <div>
          <h1>Profile</h1>
        </div>
      }
    />
  )
}

export default Profile
