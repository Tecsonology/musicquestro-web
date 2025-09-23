import React from 'react'

function LoadingPage() {
  return (
    <div style={{ zIndex: '20'}} className='loadingBg fpage flex fdc aic jc-c'>
      <div className='loaderPage'></div>
      
      <h3 style={{marginTop: '4em'}}>Hang on there! Please wait...</h3>
    </div>
  )
}

export default LoadingPage



