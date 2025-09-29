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

  const validatePassword = (pwd) => {
    if(password && password.length >= 0){
      const minLength = /.{8,}/;
      const upper = /[A-Z]/;
      const lower = /[a-z]/;
      const number = /[0-9]/;
      const special = /[!@#$%^&*(),.?":{}|<>]/;

      if (!minLength.test(pwd))
        return "Password must be at least 8 characters long.";
      if (!upper.test(pwd))
        return "Password must contain at least one uppercase letter.";
      if (!lower.test(pwd))
        return "Password must contain at least one lowercase letter.";
      if (!number.test(pwd))
        return "Password must contain at least one number.";
      if (!special.test(pwd))
        return "Password must contain at least one special character.";
      return "";
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

    if(password && password.length >= 0){
      const validationError = validatePassword(password);
      setError(validationError);
      setDisabled(validationError !== "");
    } else if(password && password.length <= 0){
      
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
            rhythm: { isLocked: "false", levels: [1] },
            melody: { isLocked: "true", levels: [1] },
            harmony: { isLocked: "true", levels: [1] },
            pitch: { isLocked: "true", levels: [1] },
          };
          let story = {
            chapter1: { isLocked: "true"},
            chapter2: { isLocked: "true"},
            chapter3: { isLocked: "true"},
            chapter4: { isLocked: "true"},
           
          }


          let items = {
            spells: [
              ["Hint", 10, '../assets/game-assets/ItemAssets/hint.png'],
              ["Heart", 15 , '../assets/game-assets/ItemAssets/heart.png'],
              ["Replay", 10, '../assets/game-assets/ItemAssets/replay.png']
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
    <div style={{ margin: "1em 0" }} className="register flex fdc jc-c aic">
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />

          {error ? 
            <p style={{ color: "red", fontSize: "0.9em", marginTop: "0.5em" }}>
              {error}
            </p> : null
          }

          <button id="btnRegister" disabled={disabled} onClick={handleSubmit}>
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
