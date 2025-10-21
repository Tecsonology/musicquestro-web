import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { authenticateToken } from '../AthenticateToken';

export const UserContext = createContext();

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;

function CurrentUserContext({ children }) {


  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [ userids, setUserids ] = useState()
  const navigate = useNavigate();

 {/**
     useEffect(() => {
  const verifyUserToken = async () => {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
        navigate("/login");
        return;
        }

        const response = await authenticateToken();
        setUserids(response)
        
        if (!response) {
        
        localStorage.clear();
        navigate("/login");
        }
    };

    verifyUserToken();
    }, []); */}


  useEffect( () => {
    const player = JSON.parse(localStorage.getItem('userLogged'));

    if (!player) {
      console.log("No player found in local storage");
      navigate('/login');
      return;
    }


    const getPlayer = async () => {
        const userids = await authenticateToken()
        setUserids(userids)

      try {
        const response = await axios.get(`${VITE_NETWORK_HOST}/player`, {
          params: { userids },
        });

        if (response.data.message === 'No player found') {
          console.log("Can't find userids");
          navigate('/error')
          localStorage.clear();
          navigate('/login');
          return;
        }

        setCurrentUser(response.data.userWithoutPassword);
      } catch (error) {
        console.error('Error fetching user:', error);
        alert("Something went wrong. Redirecting to login.");
        localStorage.clear();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    getPlayer();

    const interval = setInterval(getPlayer, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  

  

 
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, audioActive, setAudioActive, userids }}>
      {children}
    </UserContext.Provider>
  );
}

export default CurrentUserContext;
