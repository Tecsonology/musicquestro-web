import { lazy, Suspense } from 'react'
import {  useNavigate, Outlet } from 'react-router-dom'
import '../styles/Homepage.css'
import BottonNavigation from './BottonNavigation'
import BGMusic from './BGMusic'
import LoadingPage from './LoadingPage'

function Homepage() {

  return (
      
      <div className='homepage flex jc-c aic fdc fpage'>
        <BGMusic />
          <Suspense fallback={<LoadingPage />}>
            
            <Outlet />
          </Suspense>
          
        <BottonNavigation />
    </div>

      
  )
}

export default Homepage
