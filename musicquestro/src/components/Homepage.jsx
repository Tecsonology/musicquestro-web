import { lazy, Suspense } from 'react'
import {  useNavigate, Outlet } from 'react-router-dom'
import '../styles/Homepage.css'
import BottonNavigation from './BottonNavigation'
import BGMusic from './BGMusic'

function Homepage() {

  return (
      
      <div className='homepage flex jc-c aic fdc fpage'>
        <BGMusic />
          <Suspense fallback={<h1>Loadong pa po...</h1>}>
            
            <Outlet />
          </Suspense>
          
        <BottonNavigation />
    </div>

      
  )
}

export default Homepage
