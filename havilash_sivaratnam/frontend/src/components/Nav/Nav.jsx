import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import data from 'src/data.js'

import './Nav.css'


export default function Nav() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const headerRef = useRef();

  const handleClick = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setIsNavOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <header ref={headerRef} className={`${!isNavOpen && "-left-full mix-blend-difference"} sm:mix-blend-difference`}>
      <nav className='nav'>
        {/* nav bars, logo */}
        <i className={`fixed left-8 sm:relative sm:left-0 z-[51] transition-all ${isNavOpen ? "left-[60vw]" : "left-8"}`}>
          <FaBars
            onClick={() => setIsNavOpen(!isNavOpen)}
            className='nav__bars nav__link'
          />
        </i>


        {/* nav list */}
        <ul className='nav__list'>
          {
            data.pages.map((item, i) => (
              <li key={`nav-item-${i}`} className={`nav__item ${location.pathname === item.href && "active"}`}>
                <div className='line'></div>
                <Link to={item.href} className="nav__link">
                  {item.name}
                </Link>
              </li>
            ))
          }
        </ul>

        <ul className='nav__social'>
          {
            data.social.map((item, i) => (
              <li key={`nav-social-item-${i}`} className='nav__social__item'>
                <a target="_blank" rel="noreferrer" className='nav__link' href={item.href}>
                  <item.icon className="nav__social__icon"/>
                </a>
              </li>
            ))
          }
        </ul>

      </nav>
    </header>
  )
}
