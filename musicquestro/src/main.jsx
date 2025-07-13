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

<BackgroundMusic />

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, 

  {
    path: '/h',
    element: <CurrentUserContext><Homepage /></CurrentUserContext>
  },

  {
    path: '/m',
    element: <CurrentUserContext><Maps /></CurrentUserContext>
  },

  {
    path: '/leaderboards',
    element: <Leaderboards />
  },

  {
    path: '/user',
    element: <CurrentUserContext><Profile /></CurrentUserContext>
  },

  {
    path: '/collections',
    element: <CurrentUserContext><Collections /></CurrentUserContext>
  },

  {
    path: '/store',
    element: <CurrentUserContext><Store /></CurrentUserContext>
  },

   {
    path: '/rhythmGame',
    element: <CurrentUserContext><RhythmGame /></CurrentUserContext>
  },

  {
    path: '/melodyGame',
    element: <CurrentUserContext><MelodyGame /></CurrentUserContext>
  },

   {
    path: '/harmonyGame',
    element: <CurrentUserContext><HarmonyGame /></CurrentUserContext>
  },

  {
    path: '/pitchGame',
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




])

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)



