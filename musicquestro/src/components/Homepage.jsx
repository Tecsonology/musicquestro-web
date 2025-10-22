import { lazy, Suspense, useEffect } from 'react'
import {  useNavigate, Outlet } from 'react-router-dom'
import '../styles/Homepage.css'
import BottonNavigation from './BottonNavigation'
import BGMusic from './BGMusic'
import LoadingPage from './LoadingPage'
import { authenticateToken } from '../AuthenticateToken'

function Homepage() {


  useEffect(()=> {

    const authenticate = async()=> {
     
      const authStatus = authenticateToken()
      if(!authStatus){
        console.log("Invaldiasdsa")
      }
    }

    authenticate()
  }, [])

  useEffect(() => {
      const enableFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen();
        window.removeEventListener("click", enableFullscreen);
      };
  
      window.addEventListener("click", enableFullscreen);
  
      return () => {
        window.removeEventListener("click", enableFullscreen);
      };
    }, []);

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
