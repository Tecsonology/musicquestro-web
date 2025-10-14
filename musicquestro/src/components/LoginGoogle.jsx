import { useState } from 'react';
import { userids } from './GoogleLoginButton';
import axios from 'axios';
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || 'http://localhost:5000';


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
          const response = await axios.get(`${VITE_NETWORK_HOST}/player`, {
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
        const idRandomizer = [];
          for (let x = 0; x < 20; x++) {
            idRandomizer.push(Math.floor(Math.random() * 10));
          }
          const userids = idRandomizer.join("").toString();

        let id = 555;
          let musicCoins = 3000.0;
          let totalPoints = 0;
          let life = 1000.0;
          let maps = {
            rhythm: { isLocked: false, levels: [1] },
            melody: { isLocked: true, levels: [1] },
            harmony: { isLocked: true, levels: [1] },
            pitch: { isLocked: true, levels: [1] },
          };
          let story = {
            chapter1: { isLocked: "true"},
            chapter2: { isLocked: "true"},
            chapter3: { isLocked: "true"},
            chapter4: { isLocked: "true"},
           
          }


          let items = {
            spells: [
              ["Hint", 30, '../assets/game-assets/ItemAssets/hint.png'],
              ["Replay", 50, '../assets/game-assets/ItemAssets/replay.png']
            ],
            
            avatars: [],
            instruments: [],
            badges: []
          }
          let bio = ''
          let currentInstrument = "sine";
          let avatar = "https://i.ibb.co/8455cZ4G/Untitled-design-59.png";

          try {
            const response = await axios.post(`${VITE_NETWORK_HOST}/createUser`, {
              id,
              username,
              password,
              userids,
              musicCoins,
              life,
              totalPoints,
              maps,
              currentInstrument,
              avatar,
              story,
              items,
              bio,
            });

            alert(response.data.message);

            await getUser()

            window.location.href = '/h'
          } catch(err){

          }


     
    }

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
