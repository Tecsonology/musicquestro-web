import React, { useState } from 'react'
import Maestro from '/Maestro.png'

function ErrorPage() {
 

  return (
    <div className='fpage flex fdc aic jc-c'>
       
      <img width={100} src={Maestro} alt="" />
      <h3 style={{color: 'white'}}>You're out of tune!</h3>
      <p style={{textAlign: 'center'}}>Something went wrong. Either redirect you to homepage or login.</p>

      <button 
        onClick={()=> {
          if(localStorage.getItem('token') && localStorage.getItem('userLogged')){
            
            window.location.href = '/h'
          } else {
            alert('Redirect you to login')
            window.location.href = '/login'
          }
        }}
      >Retry</button>
    </div>
  )
}

export default ErrorPage
