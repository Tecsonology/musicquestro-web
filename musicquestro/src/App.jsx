import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';


function App() {
 
  const [ sample, setSample ] = useState()
   useEffect(() => {
       const fetchOrder = async () =>{
              try {
                  const response = await fetch("http://localhost:5000");
                  const data = await response.json();
                  console.log(data)
              } catch (error) {
                  console.log(error)
              }
          };
          fetchOrder();
    }, []);

  return (
    <>
      <h1>dsadsa</h1>
    </>
  )
}

export default App
