import { useEffect, useRef, useState } from "react";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import data from "src/data.js";
import { generateBars } from "src/services/Utils";
import Imprint from "../Imprint/Imprint";
import Popup from "../popups/Popup/Popup";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer({ className, divRef }) {
  const BODY_COLOR_2 = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--body-color-2");
  const [imprintOpen, setImprintOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => handleResize(ctx));
    run(ctx);
    return () => {
      window.removeEventListener("resize", () => handleResize(ctx));
    };
  }, []);

  async function run(ctx) {
    const bars = generateBars(canvasRef.current, true);
    draw(ctx, bars);
  }

  function draw(ctx, bars) {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = BODY_COLOR_2;
    bars.forEach((bar, i) => {
      bar.draw(ctx, canvasRef.current, i);
    });
  }

  const handleResize = (ctx) => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    run(ctx);
  };

  return (
    <footer
      ref={divRef}
      className={`footer relative h-auto w-screen ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-32 -mb-1" />
      <div className="footer__content">
        <div className="footer__content__text">
          <div>
            <Link to="/">
              <Logo className="w-24 mix-blend-difference" />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-text-color font-medium opacity-80">
              Contact
            </h1>
            <ul className="footer__social opacity-80">
              {data.social.map((item, i) => (
                <li
                  key={`footer-social-item-${i}`}
                  className="footer__social__item"
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="footer__social__link"
                    href={item.href}
                  >
                    <item.icon className="footer__social__icon" />
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="self-start mt-2 opacity-80"
              onClick={() => setImprintOpen(true)}
            >
              Impressum
            </button>
          </div>
        </div>

        <div className="footer__content__copyright opacity-75">
          Copyright © 2023 Havilash Sivaratnam
        </div>
      </div>
      <Popup open={imprintOpen} onClose={() => setImprintOpen(false)}>
        <Imprint />
      </Popup>
    </footer>
  );
}
