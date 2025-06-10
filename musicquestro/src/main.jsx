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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }, 

  {
    path: '/h',
    element: <Homepage />
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
    element: <Profile />
  },

  {
    path: '/collections',
    element: <Collections />
  },

  {
    path: '/store',
    element: <Store />
  },

   {
    path: '/rhythmGame',
    element: <RhythmGame />
  },


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)



