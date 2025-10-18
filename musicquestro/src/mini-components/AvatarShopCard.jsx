import React from 'react'
import musicoins from '../assets/store-assets/musicoins.png'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../components/CurrentUserContext'

function AvatarShopCard({image, name, price, setStatus, setApproved}) {

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [ avatarItems, setAvatarItems ] = React.useState(currentUser ? currentUser.items.avatars : null)

  React.useEffect(()=> {
    currentUser ? setAvatarItems(currentUser.items.avatars) : null
  }, [currentUser])


  const purchaseItem = async(e) => {
    const button = e.currentTarget;
    button.disabled = true;
      try {
        const response = await axios.put(`${import.meta.env.VITE_NETWORK_HOST}/add-avatar-item`, {
          userids: currentUser ? currentUser.userids : null,
          newItem: name,
          price: price
        })
        console.log(response.data)  

        if(response){
           setStatus('Item Purchased!') 
           setApproved(true)
          setTimeout(()=> {
            setStatus(false)
          }, 3000)
        }

        if(response.data.message === 'Not enough coins'){
          setApproved(false)
          setStatus("Not enough coins")
        }

      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div 
      className='flex fdc aic jc-c' style={{backgroundColor: '#7F03F3', borderRadius: '5px', padding: '0.3em 0.5em', 
      margin: '1em', textAlign: 'center', width: '100px', borderBottom: '0.7em solid rgb(54, 2, 85)'
      }}>
          <img width='100%' style={{border: '1px solid #6800c9ff', marginBottom: '1em', backgroundColor: '#38026aff'}} src={image} alt={name} />
          <h3 style={{margin: '0', color: 'white'}}>{name}</h3>
        <button
          disabled={avatarItems && avatarItems.includes(name) ? true : false}
        onClick={
          (e)=> purchaseItem(e)
        }
        className='flex fdr aic jc-c'  style={{width: '100%', margin: '0.5em', 
          backgroundColor: avatarItems && avatarItems.includes(name) ? '#2f3679ff' : 'green' }}><span>
            {avatarItems && avatarItems.includes(name) ? null : <img style={{marginRight: '0.2em'}} width='20px' src={musicoins} alt="musicoins" />}
          </span> {avatarItems && avatarItems.includes(name) ? 'OWNED' : price}</button>
    </div>
  )
}

export default AvatarShopCard
