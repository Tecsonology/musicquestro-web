import { StrictMode } from 'react'
import { lazy, Suspense } from 'react';

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import './App.css'
import '../src/styles/GameStyles.css'
import Loader from './components/Loader.jsx';
import LoadingPage from './components/LoadingPage.jsx';

const Homepage = lazy(()=> import('./components/Homepage.jsx'));


const Leaderboards = lazy(() => import('./components/Leaderboards.jsx'));
const Profile = lazy(() => import('./components/Profile.jsx'));
const Collections = lazy(() => import('./components/Collections.jsx'));
const Store = lazy(() => import('./components/Store.jsx'));
const Settings = lazy(() => import('./components/Settings.jsx'));
const LoginGoogle = lazy(() => import('./components/LoginGoogle.jsx'));
const CurrentUserContext = lazy(() => import('./components/CurrentUserContext.jsx'));
const LayoutComponent = lazy(() => import('./components/LayoutComponent.jsx'));
const ButtonBack = lazy(() => import('./mini-components/ButtonBack.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const SetupAccount = lazy(() => import('./components/SetupAccount.jsx'));
const Story = lazy(() => import('./components/Story.jsx'));

// Game Components
const RhythmGame = lazy(() => import('./game_components/RhythmGame.jsx'));
const MelodyGame = lazy(() => import('./game_components/MelodyGame.jsx'));
const HarmonyGame = lazy(() => import('./game_components/HarmonyGame.jsx'));
const PitchGame = lazy(() => import('./game_components/PitchGame.jsx'));
const HighPitch = lazy(() => import('./game_components/HighPitch.jsx'));

// Levels
const RhythmLevels = lazy(() => import('./components/RhythmLevels.jsx'));
const MelodyLevels = lazy(() => import('./components/MelodyLevels.jsx'));
const HarmonyLevels = lazy(() => import('./components/HarmonyLevels.jsx'));
const PitchLevels = lazy(() => import('./components/PitchLevels.jsx'));

const App = lazy(()=> import('./App.jsx')); 
const Maps = lazy(()=> import('./components/Maps.jsx')) ;

const Login = lazy(()=> import('./components/Login.jsx'));
const MainHome = lazy(()=> import('./components/MainHome.jsx'));



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
        element: <CurrentUserContext>
          <Suspense fallback={<LoadingPage />}>
            <MainHome  />
          </Suspense>
        </CurrentUserContext>
      },
    

      {
        path: 'm',
        element: <CurrentUserContext>
          <Suspense fallback={<Loader />}>
            <Maps />
          </Suspense>
        </CurrentUserContext>
        
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
      },

       {
        path: 'settings',
        element: <CurrentUserContext><Settings  /></CurrentUserContext>
      },


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



