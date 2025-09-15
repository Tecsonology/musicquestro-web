import React from 'react'

function UserRank({avatar, rank, username, userPoints}) {
  return (
 
    <tr>
        <td><h2>{rank}</h2></td>
        <td><img width='50' src={avatar} alt="" 
        /></td>
        <td><h2>{username}</h2></td>
        <td><span><img width={20} src="https://i.ibb.co/whLc7nMH/Untitled-design-57.png" alt="" /></span>{userPoints}</td>
    </tr>


  )
}

export default UserRank
