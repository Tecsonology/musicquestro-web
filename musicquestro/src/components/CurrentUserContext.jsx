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
            console.log("No player found in local storage")
            children = 'Oppppsss'
            
            
        }
        const userids = player?.userids
        

        const getPlayer = async()=> {
            
            try {
                const getUser = await axios.get(`${VITE_NETWORK_HOST}/player`, {
                params: { userids }
            })


    
            if(getUser.data.message === 'No player found'){
                
                console.log("Cant find userids")
                localStorage.clear()
                console.log("All local storage are deleted...")
                navigate('/login')
            }
            const currUser = getUser.data.userWithoutPassword
            setCurrentUser(currUser)
            } catch (error) {
                            

                alert("Something went wrong. We are redirecting you to login.")
                localStorage.clear()
                navigate('/login')
            }

            
        }

        const interval = setInterval(()=> {
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
