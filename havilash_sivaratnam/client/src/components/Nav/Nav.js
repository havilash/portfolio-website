import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaFacebookSquare, FaGithubSquare, FaLinkedin, } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import './Nav.css'


export default function Nav() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const headerRef = useRef(null);
  const navBarsRef = useRef(null);
  
  useEffect(() => {
    if (location.pathname === "/"){
      // headerRef.current.classList.add("sm:sticky", "sm:top-[100vw]")
    }
  }, [location])

  useEffect(() => {
    const header = headerRef.current;
    const navBars = navBarsRef.current;

    header.classList.toggle("-left-full", !isNavOpen);
    navBars.classList.toggle("left-8", !isNavOpen);
    navBars.classList.toggle("left-[80vw]", isNavOpen);
  }, [isNavOpen]);

  function activeFunc(url) {
    return (location.pathname === url) ? "active" : "";
  }


  return (
    <header ref={headerRef} className='transition-all fixed'>
      <nav className='nav'>

        {/* nav bars, logo */}
        <i ref={navBarsRef} className="fixed left-8 sm:relative sm:left-0 z-[51]
        transition-all">
          <FaBars
            onClick={() => setIsNavOpen(!isNavOpen)}
            className='nav__bars nav__link'
          />
        </i>

        {/* nav list */}
        <ul className='nav__list'>
          <li className={'nav__item ' + activeFunc("/")}>
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className={'nav__item ' + activeFunc("/education")}>
            <Link to="/education" className="nav__link">
              Education
            </Link>
          </li>
          <li className={'nav__item ' + activeFunc("/skills")}>
            <Link to="/skills" className="nav__link">
              Skills
            </Link>
          </li>
          <li className={'nav__item ' + activeFunc("/projects")}>
            <Link to="/projects" className="nav__link">
              Projects
            </Link>
          </li>
          <li className={'nav__item ' + activeFunc("/portfolio")}>
            <Link to="/portfolio" className="nav__link">
              Portfolio
            </Link>
          </li>
        </ul>

        <ul className='nav__social sm:hidden'>
          <li className='nav__social__item'>
            <a target="_blank" className='nav__link' href='https://github.com/Havilash'>
              <FaGithubSquare className='nav__social__icon'/>
            </a>
          </li>
          <li className='nav__social__item'>
            <a target="_blank" className='nav__link'>
              <FaLinkedin className='nav__social__icon'/>
            </a>
          </li>
          <li className='nav__social__item'>
            <a target="_blank" className='nav__link'>
              <FaFacebookSquare className='nav__social__icon'/>
            </a>
          </li>
        </ul>

      </nav>
    </header>
  )
}
