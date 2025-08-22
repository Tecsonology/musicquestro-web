import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import Maps from './components/Maps.jsx';
import Leaderboards from './components/Leaderboards.jsx';
import Profile from './components/Profile.jsx';
import Collections from './components/Collections.jsx';
import Store from './components/Store.jsx';
import RhythmGame from './game_components/RhythmGame.jsx';
import Settings from './components/Settings.jsx';
import LoginGoogle from './components/LoginGoogle.jsx';
import BackgroundMusic from './BackgroundMusic.jsx';
import MelodyGame from './game_components/MelodyGame.jsx';
import HarmonyGame from './game_components/HarmonyGame.jsx';
import PitchGame from './game_components/PitchGame.jsx';
import CurrentUserContext from './components/CurrentUserContext.jsx';
import HighPitch from './game_components/HighPitch.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
import ChildLayout from './components/ChildLayout.jsx';
import ButtonBack from './mini-components/ButtonBack.jsx';
import Register from './components/Register.jsx';
import SetupAccount from './components/SetupAccount.jsx';
import BottonNavigation from './components/BottonNavigation.jsx';
import MainHome from './components/MainHome.jsx';
import Story from './components/Story.jsx';
import RhythmLevels from './components/RhythmLevels.jsx';
import MelodyLevels from './components/MelodyLevels.jsx';
import HarmonyLevels from './components/HarmonyLevels.jsx';
import PitchLevels from './components/PitchLevels.jsx';

<BackgroundMusic />

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />
      },

      {
        path: 'register',
        element: <Register />,
      }
    ]
  }, 

  {
    path: '/set-up-account',
    element: <SetupAccount />
  },

  {
    path: '/h',
    element: <CurrentUserContext><Homepage /></CurrentUserContext>,
    children: [

      {
        path: '',
        element: <MainHome  />
      },
    

      {
        path: 'm',
        element: <CurrentUserContext><Maps /></CurrentUserContext>
        
      },

      {
        path: 'story',
        element: <CurrentUserContext><Story /></CurrentUserContext>
      },

      {
        path: 'leaderboards',
        element: <Leaderboards />
      },

      {
        path: 'user',
        element: <CurrentUserContext><Profile /></CurrentUserContext>
      },

      
      {
        path: 'store',
        element: <CurrentUserContext><Store /></CurrentUserContext>
      },

      {
        path: 'collections',
        element: <CurrentUserContext><Collections /></CurrentUserContext>
      },

      {
        path: 'rhythmLevels',
        element: <CurrentUserContext><RhythmLevels /></CurrentUserContext>
      },

      {
        path: 'melodyLevels',
        element: <CurrentUserContext><MelodyLevels /></CurrentUserContext>
      },

      {
        path: 'harmonyLevels',
        element: <CurrentUserContext><HarmonyLevels /></CurrentUserContext>
      },

      {
        path: 'pitchLevels',
        element: <CurrentUserContext><PitchLevels /></CurrentUserContext>
      }


    ]
  
  },

   {
    path: '/rhythmGame/:id',
    element: <CurrentUserContext><RhythmGame /></CurrentUserContext>
  },

  {
    path: '/melodyGame/:id',
    element: <CurrentUserContext><MelodyGame /></CurrentUserContext>
  },

   {
    path: '/harmonyGame/:id',
    element: <CurrentUserContext><HarmonyGame /></CurrentUserContext>
  },

  {
    path: '/pitchGame/:id',
    element: <CurrentUserContext><PitchGame /></CurrentUserContext>
  },

  {
    path: '/highPitch',
    element: <HighPitch />
  },

  {
    path: '/01',
    element: <Settings />
  },

  {
    path: '/createUser',
    element: <LoginGoogle />
  },

  {
    path: '/layout',
    element: <LayoutComponent />,
    children: [
      {
        path: 'child-layout',
        element: <ButtonBack />
      }
    ]
  }




])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)



