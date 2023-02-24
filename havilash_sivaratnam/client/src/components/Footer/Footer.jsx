import React, { useEffect, useRef } from 'react'
import { Bar, generateBars } from 'src/javascript/Utils';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin, } from 'react-icons/fa';
import data from 'src/data.json'


import './Footer.css'

const BODY_COLOR_2 = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2')

export default function Footer(props) {
  const canvasRef = useRef(null);
  var bars = [];
  var ctx;

  useEffect(() => {
    var canvas = canvasRef.current;
    console.log(canvas)
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
    bars = generateBars(canvasRef.current, true)
    draw(ctx)
  }

  function draw(ctx) {
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

  function renderFooterSocialItems(items, icons) {
    let output = [];
    Object.keys(items).forEach((name, i) => {
      let link = items[name]
      output.push(
        <li key={`footer-social-item-${i}`} className='footer__social__item'>
          <a target="_blank" className='footer__social__link' href={link}>
            {icons[i]}
          </a>
        </li>
      )
    })
    return output;
  }

  return (
    <div className={`footer relative h-auto w-screen ${props.className}`}>
      <canvas ref={canvasRef} className='w-full h-36' />
      <div className='footer__content'>
        <div className='footer__content__text'>
          <div>
            <img className='w-40'
              src="https://www.goomlandscapes.co.nz/wp-content/uploads/2018/08/logo-placeholder.png"
              alt="Logo" />
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl text-text-color font-'>
              Contact
            </h1>
            <ul className='footer__social'>
              {renderFooterSocialItems(data.social, [
                <FaGithubSquare className='footer__social__icon' />,
                <FaLinkedin className='footer__social__icon' />,
                <FaFacebookSquare className='footer__social__icon' />
              ])}
            </ul>
            <p className='font-extralight'>
              E-Mail: <a href='mailto:havilash.sivaratnam@protonmail.com'>havilash.sivaratnam@protonmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer__content__copyright">
          Copyright © 2023 Havilash Sivaratnam
        </div>
      </div>
    </div>
  )
}
