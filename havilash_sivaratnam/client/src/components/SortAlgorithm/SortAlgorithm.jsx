import React, { useEffect, useRef, useState, useAsyncTask, useAsyncRun } from 'react'
import { bubbleSort, cycleSort, cocktailShakerSort, combSort, heapsort, insertionSort, mergeSort, quicksort, selectionSort, shellsort, gnomeSort, bitonicSort, sleepSort, bogoSort } from './SortFunctions';
import { generateBars } from 'src/services/Utils';

import 'src/index.css'

const BODY_COLOR_2 = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2')
const FPS = 12;
const SORT_FUNCTIONS = [insertionSort, selectionSort, mergeSort, quicksort, shellsort, bubbleSort, combSort, heapsort, cocktailShakerSort, cycleSort, gnomeSort, bitonicSort, sleepSort, bogoSort]

export default function SortAlgorithm( props ) {  // { className, sortRef, sortFunc, setIsRunning, resetRef, sorted }
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false)
  const [sortFunc, setSortFunc] = useState(() => (props.sortFunc || SORT_FUNCTIONS[Math.floor(Math.random()*SORT_FUNCTIONS.length)]))
  var bars = [];
  var ctx;


  function reset(sortFunc) {
    var canvas = canvasRef.current;
    ctx = canvas.getContext("2d")

    start(ctx, sortFunc)
  }

  useEffect(() => {
    setSortFunc(() => (props.sortFunc))
  }, [props.sortFunc])

  useEffect(() => {
    // reset(sortFunc)
  }, [sortFunc])

  useEffect(() => {
    if (props.resetRef)
      props.resetRef.current = reset;
  }, [props.resetRef])

  function handleResize(ctx) {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    bars = generateBars(canvasRef.current, !Boolean(props.sorted))
    draw(ctx)
  }

  useEffect(() => {
    if (props.setIsRunning)
      props.setIsRunning(isRunning)
  }, [isRunning])

  useEffect(() => {
    var canvas = canvasRef.current;
    ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => handleResize(ctx));
    
    console.log(props.sorted)
    if (!Boolean(props.sorted))
      start(ctx, sortFunc);
    else
      bars = generateBars(canvasRef.current, false)
      draw(ctx)

    return () => {
      window.removeEventListener('resize', () => handleResize(ctx));
    }
  }, []) 

  async function start(ctx, sortFunc) {
    if (isRunning)
      return

    setIsRunning(true)

    bars = generateBars(canvasRef.current, true)
    draw(ctx)
    await sortFunc(bars, () => draw(ctx))

    setIsRunning(false)
  }
  
  function draw(ctx) {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = BODY_COLOR_2;
    bars.forEach((bar, i) => {
      bar.draw(ctx, canvasRef.current, i)
    })
  }

  return (
    <canvas ref={canvasRef} className={props.className}></canvas>
  )
}
