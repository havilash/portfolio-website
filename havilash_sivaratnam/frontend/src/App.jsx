import React, { useState, useRef, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer';

import Nav from 'src/components/Nav/Nav'
import SortAlgorithm from 'src/components/SortAlgorithm/SortAlgorithm';
// Pages
import Error404 from 'src/pages/errors/Error404';
import Home from 'src/pages/Home/Home';
import Career from 'src/pages/Career/Career';
import Skills from 'src/pages/Skills/Skills';
import Projects from 'src/pages/Projects/Projects';
import Portfolio from 'src/pages/Portfolio/Portfolio';
import PortfolioDocument from 'src/pages/Document/PortfolioDocument';
import ProjectDocument from 'src/pages/Document/ProjectDocument';
import Login from 'src/pages/Login/Login';
import useSession from 'src/hooks/useSession';
import Registration from 'src/pages/Registration/Registration';
import Admin from 'src/pages/Admin/Admin';


function App() {
  const session = useSession()
  const location = useLocation()
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(96);

  function handleResize() {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    handleResize();
  }, [footerRef.current])

  return (
    <div className="app relative h-auto w-full overflow-hidden">
      <Nav session={session} />
      { 
        (location.pathname !== "/") &&
        <SortAlgorithm 
          sorted={true} 
          className='rotate-180 absolute top-0 left-0 -z-50 w-full' 
          style={{height: `calc(100% - ${footerHeight}px - 1rem)`}} 
        />
      }
      <main className='content h-auto w-full flex justify-center items-center z-10'>
        <Routes>
          <Route exact path="/*" element={<Error404 />} />
          <Route path="/projects/:project" element={<ProjectDocument />} />
          <Route path="/portfolio/:document" element={<PortfolioDocument session={session} />} />

          <Route exact path="/" element={<Home />} />
          <Route exact path="/career" element={<Career />} />
          <Route exact path="/skills" element={<Skills />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/portfolio" element={<Portfolio session={session} />} />
          <Route exact path="/login" element={<Login session={session} />} />
          <Route exact path="/registration" element={<Registration session={session} />} />
          <Route exact path="/admin" element={<Admin session={session} />} />
        </Routes>
      </main>
      <Footer divRef={footerRef} />
    </div>
  );
}

export default App;
