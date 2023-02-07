import React, { useEffect, useRef, useState } from 'react'
import { bubbleSort, combSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort, shellSort } from './SortFunctions'

import '../../index.css'

const BODY_COLOR_2 = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2')
const FPS = 12;
const BAR_WIDTH = 10;
const SORT_ALGORITHMS = [insertionSort, selectionSort, mergeSort, quickSort, shellSort, bubbleSort, combSort]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Game( { className, setCurrentSort, setSortIsRunning, resetRef } ) {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false)
  var canvas;
  var ctx;
  var bars = [];
  const sortAlgorithm = SORT_ALGORITHMS[Math.floor(Math.random()*SORT_ALGORITHMS.length)];

  class Bar{
    constructor(h) {
      this.h = h
    }
  
    draw(ctx, i) {
      ctx.fillRect(i * BAR_WIDTH, canvas.height - this.h, BAR_WIDTH, this.h)
    }
  
    valueOf() {
      return this.h
    }
  }

  function reset() {
    start()
  }

  useEffect(() => {
    resetRef.current = reset;
  }, [resetRef])

  function generateBars() {
    var genBars = []
    var barHeights = []
    var barAmt = canvas.width / BAR_WIDTH
    var dh = canvas.height / barAmt  // height difference
    for (let i = 1; i < barAmt+1; i++){
      barHeights.push(i * dh)
    }
    barHeights = barHeights.sort(() => Math.random() - 0.5);
    for (let i = 0; i < barHeights.length; i++){
      genBars.push(new Bar(barHeights[i]))
    }
    return genBars
  }

  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    start()
  }

  useEffect(() => {
    setSortIsRunning(isRunning)
  }, [isRunning])

  useEffect(() => {
    setCurrentSort(sortAlgorithm.name);
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', handleResize);

    start()
  }, []) 

  async function start() {
    if (isRunning)
      return
    setIsRunning(true)

    bars = generateBars()
    draw()
    await sortAlgorithm(bars, draw)

    setIsRunning(false)
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--body-color-2');
    bars.forEach((bar, i) => {
      bar.draw(ctx, i)
    })
  }

  return (
    <canvas ref={canvasRef} className={className}></canvas>
  )
}
