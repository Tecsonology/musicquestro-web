import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import BackgroundMusic from './BackgroundMusic';
import { BrowserRouter } from 'react-router-dom';
import CurrentUserContext from './components/CurrentUserContext';
import RhythmGame from './game_components/RhythmGame';


function App() {
 
  const [ name, setName ] = useState()


  return (
    <>
       
            <Login />
    
    </>
  )
}

export default App
