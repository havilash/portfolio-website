import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaFacebookSquare, FaGithubSquare, FaLinkedin, } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import data from 'src/data.json'

import './Nav.css'


export default function Nav() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  function renderNavItems(items){
    let output = []
    Object.keys(items).forEach((name, i) => {
      let url = items[name]
      output.push(
        <li key={`nav-item-${i}`} className={'nav__item ' + ((location.pathname === url) ? "active" : "")}>
          <div className='line'></div>
          <Link to={url} className="nav__link">
            {name}
          </Link>
        </li>
      )
    })

    return output
  }

  function renderNavSocialItems(items, icons){
    let output = [];
    Object.keys(items).forEach((name, i) => {
      let link = items[name]
      output.push(
        <li key={`nav-social-item-${i}`} className='nav__social__item'>
          <a target="_blank" rel="noreferrer" className='nav__link' href={link}>
            {icons[i]}
          </a>
        </li>
      )
    })
    return output;
  }

  return (
    <header className={`${(!isNavOpen ? "-left-full mix-blend-difference" : "")} sm:mix-blend-difference`}>
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
          {renderNavItems(data.pages)}
        </ul>

        <ul className='nav__social'>
          {renderNavSocialItems(data.social, [
            <FaGithubSquare className='nav__social__icon' />,
            <FaLinkedin className='nav__social__icon' />,
            <FaFacebookSquare className='nav__social__icon' />
          ])}
        </ul>

      </nav>
    </header>
  )
}
