import axios from 'axios'
import React, { useEffect, useState, lazy, Suspense }  from 'react'
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;
import LoadingPage from './LoadingPage';

export const UserContext = React.createContext()

function CurrentUserContext({children}) {

    const [ currentUser, setCurrentUser ] = useState()
    const [ audioActive, setAudioACtive ] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {

        const player = JSON.parse(localStorage.getItem('userLogged'))

        if(!player){
            console.log("Cant find userids")
            navigate('/login')
            
        }
        const userids = player.userids

        const getPlayer = async()=> {
            const getUser = await axios.get(`${VITE_NETWORK_HOST}/player`, {
                params: { userids }
            })
            const currUser = getUser.data.userWithoutPassword
            setCurrentUser(currUser)
        }


        const interval = setInterval(()=> {
             getPlayer()
        }, 3000)

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
