import React, { useState, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer';

import data from 'src/data.json'
import Nav from 'src/components/Nav/Nav'
import SortAlgorithm from 'src/components/SortAlgorithm/SortAlgorithm';
// Pages
import Error404 from 'src/pages/errors/Error404';
import Home from 'src/pages/Home/Home';
import Education from 'src/pages/Education/Education';
import Skills from 'src/pages/Skills/Skills';
import Projects from './pages/Projects/Projects';


function App() {
  const location = useLocation()

  return (
    <div className="app relative h-auto w-full">
      <Nav />
      { 
        (location.pathname !== data.pages.Home) &&
        <SortAlgorithm sorted={true} className="rotate-180 absolute top-0 left-0 -z-50" />
      }
      
      <div className='content h-auto w-full flex justify-center items-center z-10'>
        <Routes>
          <Route exact path="/*" element={<Error404/>} />
          <Route exact path={data.pages.Home} element={<Home/>} />
          <Route exact path={data.pages.Education} element={<Education/>} />
          <Route exact path={data.pages.Skills} element={<Skills/>} />
          <Route exact path={data.pages.Projects} element={<Projects/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
