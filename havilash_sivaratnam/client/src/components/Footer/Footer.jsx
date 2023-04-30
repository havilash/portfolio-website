import React, { useEffect, useRef } from 'react'
import { generateBars } from 'src/services/Utils';
import data from 'src/data.js'

import './Footer.css'

const BODY_COLOR_2 = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2')

export default function Footer(props) {
  const canvasRef = useRef(null);
  var ctx;

  useEffect(() => {
    var canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => handleResize(ctx));

    run(ctx)

    return () => {
      window.removeEventListener('resize', () => handleResize(ctx));
    }
  }, [])

  async function run(ctx) {
    var bars = generateBars(canvasRef.current, true)
    draw(ctx, bars)
  }

  function draw(ctx, bars) {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = BODY_COLOR_2;
    bars.forEach((bar, i) => {
      bar.draw(ctx, canvasRef.current, i)
    })
  }

  function handleResize(ctx) {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    run(ctx)
  }

  return (
    <div className={`footer relative h-auto w-screen ${props.className}`}>
      <canvas ref={canvasRef} className='w-full h-32' />
      <div className='footer__content'>
        <div className='footer__content__text'>
          <div>
            <img src='/assets/logo.svg' alt="Logo" className='w-24 mix-blend-difference' />
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl text-text-color font-medium opacity-80'>
              Contact
            </h1>
            <ul className='footer__social opacity-80'>
              {   
                data.social.map((item, i) => (
                  <li key={`footer-social-item-${i}`} className='footer__social__item'>
                    <a target="_blank" className='footer__social__link' href={item.href}>
                      <item.icon className="footer__social__icon"/>
                    </a>
                  </li>
                ))
              }
            </ul>
            <p className='font-extralight opacity-80'>
              E-Mail: <a href='mailto:havilash.sivaratnam@protonmail.com'>havilash.sivaratnam@protonmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer__content__copyright opacity-75">
          Copyright © 2023 Havilash Sivaratnam
        </div>
      </div>
    </div>
  )
}
