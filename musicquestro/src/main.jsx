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
import HarmonyGame from './game_components/HarmonyGAme.jsx';
import PitchGame from './game_components/PitchGame.jsx';
import CurrentUserContext from './components/CurrentUserContext.jsx';

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
    element: <Maps />
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
    element: <Collections />
  },

  {
    path: '/store',
    element: <CurrentUserContext><Store /></CurrentUserContext>
  },

   {
    path: '/rhythmGame',
    element: <RhythmGame />
  },

  {
    path: '/melodyGame',
    element: <CurrentUserContext><MelodyGame /></CurrentUserContext>
  },

   {
    path: '/harmonyGame',
    element: <HarmonyGame />
  },

  {
    path: '/pitchGame',
    element: <PitchGame />
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
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)



