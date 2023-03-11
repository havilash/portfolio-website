import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer';

import data from 'src/data.json'
import Nav from './components/Nav/Nav'
import SortAlgorithm from './components/SortAlgorithm/SortAlgorithm';
// Pages
import Error404 from './pages/Errors/Error404';
import Home from './pages/Home/Home';
import Education from './pages/Education/Education';


function App() {

  return (
    <BrowserRouter>
      <div className="app relative h-auto w-full">
        <Nav />
        <SortAlgorithm sorted={true} className="rotate-180" />
        <div className='content h-auto w-full flex justify-center items-center z-10'>
          <Routes>
            <Route exact path="/*" element={<Error404/>} />
            <Route exact path={data.pages.Home} element={<Home/>} />
            <Route exact path={data.pages.Education} element={<Education/>} />
          </Routes>
        </div>
        <Footer />
      </div>
   </BrowserRouter>
  );
}

export default App;
