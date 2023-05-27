import React, { useEffect, useRef, useState } from "react";
import { generateBars } from "src/services/Utils";
import data from "src/data.js";
import "./Footer.css";
import Imprint from "../Imprint/Imprint";
import Modal from "../modals/Modal/Modal";
import { ReactComponent as Logo } from "src/assets/logo.svg";

export default function Footer({ className, divRef }) {
  const BODY_COLOR_2 = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--body-color-2");
  const [imprintOpen, setImprintOpen] = useState(false);
  const canvasRef = useRef(null);
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", handleResize);
    run(ctx);
    return () => {
      window.removeEventListener("resize", handleResize);
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

  const handleResize = () => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    run(ctx);
  };

  return (
    <footer
      ref={divRef}
      className={`footer relative h-auto w-screen ${className}`}
    >
      <Modal open={imprintOpen} onClose={() => setImprintOpen(false)}>
        <Imprint />
      </Modal>
      <canvas ref={canvasRef} className="w-full h-32" />
      <div className="footer__content">
        <div className="footer__content__text">
          <div>
            <Logo className="w-24 mix-blend-difference" />
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
                    className="footer__social__link"
                    href={item.href}
                  >
                    <item.icon className="footer__social__icon" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-extralight opacity-80">
              E-Mail:{" "}
              <a href="mailto:havilash.sivaratnam@protonmail.com">
                havilash.sivaratnam@protonmail.com
              </a>
            </p>
            <button
              className="self-start mt-2"
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
    </footer>
  );
}
