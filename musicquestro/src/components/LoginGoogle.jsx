import React from 'react'
import { useState } from 'react';
import { userids } from './GoogleLoginButton';
import axios from 'axios';
import { token } from '../Token';


const AVATARS = [
    'https://ibb.co/Kpn42d5x',
    'https://ibb.co/Nn152Pc9',
    'https://ibb.co/TBMKmnq9',
    'https://ibb.co/5hzF2rQc',
    'https://ibb.co/G3VxWjHf',
    'https://ibb.co/PsjDxbPj'
]


function LoginGoogle() {

    const [ id, setId ] = useState(454)
    const [ username, setUserName ] = useState()
    const [ password, setPassword ] = useState()
    const [ avatar, setAvatar ] = useState()

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
         let musicCoins = 1000
        let totalPoints = 0
        let life = 5
        let maps = {
            rhythm: {isLocked: 'false'}, 
            melody: {isLocked: 'true'},
            harmony: {isLocked: 'true'},
            pitch: {isLocked: 'true'},
            
        }
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createUser', 
                 { 
                    id, 
                    username, 
                    password,
                    userids: userids,
                    musicCoins,
                    life,
                    totalPoints,
                    maps,

                });

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

        { AVATARS.map((avatar) => {
            
        })}
      <input onChange={(e)=> setUserName(e.target.value)} type="text" placeholder='Create a username' />
      <input onChange={(e)=> setPassword(e.target.value)} type="password" name="" id="" />
      <input onClick={handleSubmit}  type="button" value={"Create"} name="Create" id=""/>
    </div>
  )
}

export default LoginGoogle
