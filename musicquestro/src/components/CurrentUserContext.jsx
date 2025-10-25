import axios from 'axios'
import React, { useEffect, useState, lazy, Suspense }  from 'react'
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;
import LoadingPage from './LoadingPage';
import { authenticateToken } from '../AuthenticateToken';

export const UserContext = React.createContext()
'['
function CurrentUserContext({children}) {

    const [ currentUser, setCurrentUser ] = useState()
    const [ audioActive, setAudioACtive ] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {

      let interval;

        const player = JSON.parse(localStorage.getItem('userLogged'))

        if(!player){
            console.log("No player found in local storage")
        
            
        }
        const userids = player
        

        const getPlayer = async()=> {
            
            try {
                const getUser = await axios.get(`${VITE_NETWORK_HOST}/player`, {
                params: { userids }
            })


            const currUser = getUser.data.userWithoutPassword
            setCurrentUser(currUser)
            } catch (error) {
                navigate('/*')
            }

            
        }

         interval = setInterval(()=> {
             getPlayer()
        }, 1000)

        return ()=> {
            clearInterval(interval)
        }


    }, [])


  return (
    <Suspense fallback={<LoadingPage />}>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
       
        {children}
    </UserContext.Provider>
    </Suspense>
  )
}

export default CurrentUserContext