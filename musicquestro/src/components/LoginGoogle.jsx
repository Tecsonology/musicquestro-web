import React from 'react'
import { useState } from 'react';
import { userids } from './GoogleLoginButton';
import axios from 'axios';
import { token } from '../Token';

function LoginGoogle() {

    const [ id, setId ] = useState(454)
    const [ username, setUserName ] = useState()
    const [ password, setPassword ] = useState()

    function generate6DigitId() {
        return Math.floor(100000 + Math.random() * 900000);
    }

   const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:5000/player', {
              params: { userids }
          });
          const user = response.data;
          console.log(user)
          localStorage.setItem("userLogged", JSON.stringify(user))
          

      } catch (error) {
          console.error('Error fetching user:', error);
      }
  };


    const handleSubmit = async (e) => {
    
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createUser', { id, username, password, userids: userids});
            alert(response.data.message);

            await getUser()

            window.location.href = '/h'


        } catch (error) {
            alert('Failed to add item');
        }
    };

  return (
    <div className='flex fdc jc-c aic'>
     <h1 style={{textAlign: 'center'}}>Let's set up your Account</h1>
     <p style={{textAlign: 'center'}}>{userids}</p>
      <input onChange={(e)=> setUserName(e.target.value)} type="text" placeholder='Create a username' />
      <input onChange={(e)=> setPassword(e.target.value)} type="password" name="" id="" />
      <input onClick={handleSubmit}  type="button" value={"Create"} name="Create" id=""/>
    </div>
  )
}

export default LoginGoogle
