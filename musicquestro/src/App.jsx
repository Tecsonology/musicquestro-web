import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import BackgroundMusic from './BackgroundMusic';
import { BrowserRouter } from 'react-router-dom';


function App() {
 
  const [ name, setName ] = useState()


  return (
    <>
       <Login />
    </>
  )
}

export default App
