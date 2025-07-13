import axios from 'axios'
import React, { useEffect, useState }  from 'react'
import { createContext } from 'react'

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
            const getUser = await axios.get('http://localhost:5000/player', {
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

    


    if(currentUser){
        const mapUnlocker =async (mapIndex) => {
        let userids = currentUser.userids
        let catIndex = mapIndex
        const updateUser = await axios.put('http://localhost:5000/unlockedCategory', { 
            userids, 
            catIndex 
        })


    }

    mapUnlocker(1)
    }



  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default CurrentUserContext
