import axios from 'axios'
import React, { useEffect, useState }  from 'react'
import { createContext } from 'react'
import { userids } from '../Token.js'

export const UserContext = React.createContext()

function CurrentUserContext({children}) {

    const [ currentUser, setCurrentUser ] = useState()

    useEffect(()=> {

        const getPlayer = async()=> {
            const getUser = await axios.get('http://localhost:5000/player', {
                params: { userids }
            })

            const currUser = getUser.data
            setCurrentUser(currUser)
        }

        const interval = setInterval(()=> {
            getPlayer()
        }, 1000)

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
