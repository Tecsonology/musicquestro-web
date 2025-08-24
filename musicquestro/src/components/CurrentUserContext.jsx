import axios from 'axios'
import React, { useEffect, useState }  from 'react'
import { createContext } from 'react'
const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST;

export const UserContext = React.createContext()

function CurrentUserContext({children}) {

    const [ currentUser, setCurrentUser ] = useState()

    useEffect(()=> {

        const player = JSON.parse(localStorage.getItem('userLogged'))

        if(!player){
            console.log("Cant find userids")
            
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
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default CurrentUserContext
