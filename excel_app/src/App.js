import { useState, useEffect, useRef, } from 'react';

import './App.css';
import Sheet from './components/Sheet.js'
import Home from './components/Home.js'
import {Route, Routes, Link} from 'react-router-dom';

function App() {
  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();

  // const sheetCells = {
  //   A : [useRef('add'), useRef('sdf'), useRef('')],
  //   B : [useRef(''), useRef('fsfsd'), useRef('')],
  //   C : [useRef(''), useRef(''), useRef('')],
  //   D : [useRef(''), useRef(''), useRef('')],
  //   E : [useRef(''), useRef(''), useRef('')]
  // }

  const setScreenSize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  window.addEventListener('resize', setScreenSize);

  useEffect(() => {
    // Set initial screen size
    setScreenSize();

    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  useEffect(() => {
    console.log(`screen width is ${screenWidth}`);
    console.log(`screen height is ${screenHeight}`);
  }, [screenWidth, screenHeight]);

  return (
    <Routes>
      <Route path = "/" element={<Home />}/>
      <Route path = "/sheets" element={<Sheet />}/>

    </Routes>
  );
}

export default App;