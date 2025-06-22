import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export let userids;

function GoogleLoginButton() {
  const navigate = useNavigate();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "1026459441023-6cv4c8b05emppfi19q7ehbdne7o248ii.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:5000/player', {
              params: { userids }
          });
        
          const user = response.data;
          localStorage.setItem("userLogged", JSON.stringify(user))
          

      } catch (error) {
          console.error('Error fetching user:', error);
      }
  };

  const handleCredentialResponse = (response) => {
    if (response && response.credential) {
      const decoded = jwtDecode(response.credential);

      const userId = decoded.sub;      // 👈 Unique ID

      userids = userId
      console.log(userids)
      const email = decoded.email;     // 👈 Email address
   
      localStorage.setItem('googleLogged', userId);

      // Optional: Send to backend
      const postData = async () => {
        try {
          const result = await axios.post(
            'http://localhost:5000/authCheck',
            {  userids },
            {
              headers: {
                Authorization: `Bearer ${response.credential}`,
              },
            }
          );
          console.log(result.data);
          navigate('/createUser');
        } catch (error) {
            console.log('Getting existing account...');
            await getUser()
            window.location.href = '/h'
        }
      };

      postData();

      
    }
  };

  return <div id="googleSignInDiv"></div>;
}

export default GoogleLoginButton;
