import { useEffect, useRef, useState } from "react";
import "src/index.css";
import { generateBars } from "src/services/Utils";
import * as SortFunctions from "./SortFunctions";

const BODY_COLOR_2 = getComputedStyle(
  document.documentElement
).getPropertyValue("--body-color-2");
const SORT_FUNCTIONS = Object.values(SortFunctions);

export default function SortAlgorithm({
  className,
  style,
  setIsRunning: setParentIsRunning,
  resetRef,
  sorted,
  sortFunc: parentSortFunc,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const barsRef = useRef([]);
  const [isRunning, setIsRunning] = useState(false);
  const [sortFunc, setSortFunc] = useState(
    () =>
      parentSortFunc ||
      SORT_FUNCTIONS[Math.floor(Math.random() * SORT_FUNCTIONS.length)]
  );
  let animationFrameId;

  // Initialize the canvas and add event listeners
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => handleResize(ctxRef.current));
    if (!Boolean(sorted)) start(ctxRef.current, sortFunc);
    else barsRef.current = generateBars(canvasRef.current, false);
    draw(ctxRef.current);
    return () => {
      window.removeEventListener("resize", () => handleResize(ctxRef.current));
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    setSortFunc(() => parentSortFunc);
  }, [parentSortFunc]);

  useEffect(() => {
    if (resetRef) resetRef.current = reset;
  }, [reset, resetRef]);

  useEffect(() => {
    if (setParentIsRunning) setParentIsRunning(isRunning);
  }, [isRunning]);

  // Handle window resize event
  function handleResize(ctx) {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    barsRef.current = generateBars(canvasRef.current);
    draw(ctx);
  }

  // Reset the canvas and start sorting with the given sort function
  function reset(sortFunc) {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    start(ctxRef.current, sortFunc);
  }

  // Start sorting with the given sort function
  async function start(ctx, sortFunc) {
    setIsRunning(true);
    barsRef.current = generateBars(canvasRef.current, true);
    draw(ctx);
    await sortFunc(barsRef.current, () => requestDraw(ctx));
    setIsRunning(false);
  }

  // Request an animation frame to draw on the canvas
  function requestDraw(ctx) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => draw(ctx));
  }

  // Draw the bars on the canvas
  function draw(ctx) {
    if (!canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = BODY_COLOR_2;
    barsRef.current.forEach((bar, i) => {
      bar.draw(ctx, canvasRef.current, i);
    });
  }

  return <canvas ref={canvasRef} className={className} style={style}></canvas>;
}
