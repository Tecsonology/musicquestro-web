import React from 'react'

function ErrorPage() {
  return (
    <div className='flex fdc aic jc-c'>
        <h1 style={{textAlign: 'center'}}>Your'e out of tune! </h1>
      <h2>Opppss, something went wrong!</h2>

      <button 
        onClick={()=> {
            window.location.href = '/h'
        }}
      >Back to Homepage</button>
    </div>
  )
}

export default ErrorPage
