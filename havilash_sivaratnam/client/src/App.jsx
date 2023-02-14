import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer';

import Nav from './components/Nav/Nav'
import Error404 from './pages/errors/Error404';
// Pages
import Home from './pages/Home/Home';


function App() {
  var foregroundRef = useRef(null);

  return (
    <BrowserRouter>
      <div className="app relative h-auto w-full">
        <Nav />
        <div className='content h-auto w-full flex justify-center items-center z-10'>
          <Routes>
            <Route exact path="/*" element={<Error404/>} />
            <Route exact path="/" element={<Home/>} />
          </Routes>
        </div>
        <Footer />
      </div>
   </BrowserRouter>
  );
}

export default App;
