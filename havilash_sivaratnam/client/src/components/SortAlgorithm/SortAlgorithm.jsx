import React, { useEffect, useRef, useState } from 'react'
import { bubbleSort, combSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort, shellSort, bogoSort } from './SortFunctions'

import '../../index.css'

const BODY_COLOR_2 = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2')
const FPS = 12;
const BAR_WIDTH = 10;
const SORT_FUNCTIONS = [insertionSort, selectionSort, mergeSort, quickSort, shellSort, bubbleSort, combSort, heapSort]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Game( props ) {  // { className, sortRef, sortFunc, isRunningRef, resetRef }
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false)
  const [sortFunc, setSortFunc] = useState(() => (props.sortFunc || SORT_FUNCTIONS[Math.floor(Math.random()*SORT_FUNCTIONS.length)]))
  var bars = [];
  var canvas;
  var ctx;

  class Bar{
    constructor(h) {
      this.h = h
    }
  
    draw(ctx, i) {
      ctx.fillRect(i * BAR_WIDTH, canvasRef.current.height - this.h, BAR_WIDTH, this.h)
    }
  
    valueOf() {
      return this.h
    }
  }

  function reset() {
    // var canvas = canvasRef.current;
    // var ctx = canvas.getContext("2d")
    start(ctx)
  }

  useEffect(() => {
    setSortFunc(() => (props.sortFunc || SORT_FUNCTIONS[Math.floor(Math.random()*SORT_FUNCTIONS.length)]))
  }, [props.sortFunc])

  useEffect(() => {
    props.setCurrentSort(sortFunc.name);
  }, [sortFunc])

  useEffect(() => {
    props.resetRef.current = reset;
  }, [props.resetRef])

  function generateBars(isRandom) {
    var genBars = []
    var barHeights = []
    var barAmt = canvasRef.current.width / BAR_WIDTH
    var dh = canvasRef.current.height / barAmt  // height difference
    for (let i = 1; i < barAmt+1; i++){
      barHeights.push(i * dh)
    }
    for (let i = 0; i < barHeights.length; i++){
      genBars.push(new Bar(barHeights[i]))
    }

    if (isRandom)
      genBars = genBars.sort(() => Math.random() - 0.5);

    return genBars
  }

  function handleResize(ctx) {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    bars = generateBars()
    draw(ctx)
  }

  useEffect(() => {
    props.isRunningRef.current = isRunning
  }, [isRunning])

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => handleResize(ctx));

    start(ctx)
  }, []) 

  async function start(ctx) {
    if (isRunning)
      return
    setIsRunning(true)

    bars = generateBars(true)
    draw(ctx)
    await sortFunc(bars, () => draw(ctx))

    setIsRunning(false)
  }
  
  function draw(ctx) {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = BODY_COLOR_2;
    bars.forEach((bar, i) => {
      bar.draw(ctx, i)
    })
  }

  return (
    <canvas ref={canvasRef} className={props.className}></canvas>
  )
}
