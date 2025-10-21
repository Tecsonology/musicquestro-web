import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;

function Register() {
  const navigate = useNavigate();
  const [username, setName] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState();
  const [ userNameError, setUsernameError ] = useState()
  const [success, setSuccess] = useState(false);
  const [passwordValid, setPasswordValid] = useState(
    {
      minLength: false,
      upper: false,
      number: false,
      special: false, 
    }
  )


  const validatePassword = (pwd) => {
    if(password && password.length >= 0){
      const minLength = /.{8,}/;
      const upper = /[A-Z]/;  
      const number = /[0-9]/;
      const special = /[!@#$%^&*(),.?":{}|<>]/;

      if (minLength.test(pwd)){
        setPasswordValid(prevState => ({ ...prevState, minLength: true }));
      } else {
        setPasswordValid(prevState => ({ ...prevState, minLength: false }));
        setDisabled(false)
      }
        
      if (upper.test(pwd)){
        setPasswordValid(prevState => ({ ...prevState, upper: true }));
      } else {
        setPasswordValid(prevState => ({ ...prevState, upper: false }));
      }
        
      if (number.test(pwd)){
        setPasswordValid(prevState => ({ ...prevState, number: true }));
        
      } else {
        setPasswordValid(prevState => ({ ...prevState, number: false }));
      }
      if (special.test(pwd)){
        setPasswordValid(prevState => ({ ...prevState, special: true }));
      } else {
        setPasswordValid(prevState => ({ ...prevState, special: false }));

      }
      
    } 
  };

  useEffect(()=> {

    if(username && username.length >= 12){
      setUsernameError("*Username must not exceed in 12 characters")
    } else if(username && username.length <= 12){
      setUsernameError()
    } 

  },[username])

  useEffect(() => {
    

    if (passwordValid.minLength && passwordValid.upper && passwordValid.number && passwordValid.special){
      setDisabled(false)
    } else {
      setDisabled(true)
    }

    
  }, [password]);

  const getUser = async (userids) => {
    try {
      const response = await axios.get(`${VITE_NETWORK_HOST}/player`, {
        params: { userids },
      });
      const user = response.data;
      localStorage.setItem(
        "userLogged",
        JSON.stringify(user.userWithoutPassword)
      );
      localStorage.setItem("token", response.data.token);

      setSuccess(true);
      navigate("/set-up-account");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e) => {
    
       const userNameValidation = await axios.get(
      `${VITE_NETWORK_HOST}/users`,
      {
        params: { username },
      })

      if(userNameValidation.data.message === "User exists") {
        setError("Username already exists. Please choose another one.");
        return;
      } else {
          e.preventDefault();

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

            if (response) {
              setDisabled(true);
              await getUser(userids);
            }
            setSuccess(true);
          } catch (error) {
            alert("Failed to add user. Please try again.");
            console.error("Failed to add user:", error);
          }
      }
                    
    
   

  }

  return (
    <div style={{ margin: "1em 0" }} className="register glass-bg flex fdc jc-c aic">
      <h2>REGISTER</h2>
      {!success ? (
        <>
          <input
            type="text"
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create your username"
            required
          />
          { userNameError ? 
          <p style={{ color: "red", fontSize: "0.9em", marginTop: "0.5em" }}>{userNameError}</p> : null}

          <input
            type="password"
            name="password"
            id="txtPass"
            onChange={(e) => {
              validatePassword(e.target.value);
              setPassword(e.target.value)
            }}
            placeholder="Create a password"
            required
          />
          <div className="password-requirements">
            <p style={{textAlign: 'left', margin: 0, fontSize: '0.8em', color: 'white'}}>
              <span>{passwordValid.minLength ? '✅' : '❌ '}</span>
              Minimum of 8 characters</p>

            <p style={{textAlign: 'left', margin: 0, fontSize: '0.8em', color: 'white'}}>
              <span>{passwordValid.upper ? '✅' : '❌ '}</span>
              With uppercase letter</p>

            <p style={{textAlign: 'left', margin: 0, fontSize: '0.8em', color: 'white'}}>
              <span>{passwordValid.number ? '✅' : '❌ '}</span>
              With number</p>

            <p style={{textAlign: 'left', margin: 0, fontSize: '0.8em', color: 'white'}}>
              <span>{passwordValid.special ? '✅' : '❌ '}</span>
              With special character (!@#$%^&* etc.)</p>

            
            
            
          </div>

          {error ? 
            <p style={{ color: "red", fontSize: "0.9em", marginTop: "0.5em" }}>
              {error}
            </p> : null
          }

          <button id="btnRegister" disabled={disabled} onClick={(e) => handleSubmit(e)}>
            Register
          </button>

          <p style={{ color: "white" }}>
            Already have an account?{" "}
            <Link
              to={"/login"}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Click here
            </Link>
          </p>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Register;
