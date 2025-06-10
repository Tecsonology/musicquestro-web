import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';


function App() {
 
  const [ name, setName ] = useState()



  return (
    <>
      <h1>MusicQuestro</h1>
       <Login />
    </>
  )
}

export default App
