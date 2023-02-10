import React, { useEffect, useRef, useState } from 'react'
import SortAlgorithm from '../../components/SortAlgorithm/SortAlgorithm'
import { FaArrowDown } from 'react-icons/fa';
import { bubbleSort, combSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort, shellSort } from '../../components/SortAlgorithm/SortFunctions';

import './Home.css'

const SORT_NAMES_FUNCTIONS = {
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Merge Sort": mergeSort,
  "Quicksort": quickSort,
  "Shellsort": shellSort,
  "Bubble Sort": bubbleSort,
  "Comb Sort": combSort,
  "Heapsort": heapSort,
}

const SORT_FUNCTIONS = Object.values(SORT_NAMES_FUNCTIONS)

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export default function Home() {
  const [sortIsRunning, setSortIsRunning] = useState(false)
  const [titleIsVisible, setTitleIsVisible] = useState(false)
  const sortResetRef = useRef(null);
  const [sortFunc, setSortFunc] = useState(() => SORT_FUNCTIONS[Math.floor(Math.random()*SORT_FUNCTIONS.length)])
  const [isSortFOpen, setIsSortFOpen] = useState(false);  // sort-functions element visibility state

  useEffect(() => {
    setTitleIsVisible(!sortIsRunning)
    setTimeout(() => {
      if (!sortIsRunning) return
      setTitleIsVisible(true)
    }, 7000)

  }, [sortIsRunning])

  function renderSortFunctions() {
    let output = [];
    Object.keys(SORT_NAMES_FUNCTIONS).forEach((key, i) => {
      let value = SORT_NAMES_FUNCTIONS[key];

      output.push(
        <li key={`sf-${i}`} className={'sort-functions__item' + ((sortFunc == value) ? " active" : "")} 
          onClick={() => setSortFunc(() => value)}>
          {key}
        </li>
      )
    })

    return output;
  }

  return (
    <section className='section p-0 m-0'>
      <div id='home' className='home flex items-center justify-center w-full h-screen relative m-0 left-0 top-0'>
        <SortAlgorithm className='absolute h-screen w-screen top-0 left-0 -z-50 overflow-hidden' 
          width={window.innerWidth} sortFunc={sortFunc} setIsRunning={setSortIsRunning} resetRef={sortResetRef}/>
        <button className='sort-button button' 
          onClick={() => setIsSortFOpen(!isSortFOpen)}>
          {getKeyByValue(SORT_NAMES_FUNCTIONS, sortFunc)}
        </button>
        <div className={'sort-functions' + (isSortFOpen ? "" : " hidden")}>
          <ul className='sort-functions__list'>
            {renderSortFunctions()}
          </ul>
        </div>
        <div className={"typing-effect w-[12ch] overflow-hidden font-consolas text-5xl xs:text-6xl sm:text-7xl md:text-8xl" + (!titleIsVisible ? " hidden" : "")}>
          <p>Hello!</p>
          <p>I'm Havilash</p>
        </div>

        <a className='absolute flex self-end text-4xl m-8
            mix-blend-difference hover:opacity-80'
          href='#aboutme'>
          <FaArrowDown />
        </a>
      </div>
      <div id='aboutme' className='aboutme flex items-center justify-center w-full h-screen relative'>

      </div>
    </section>
  )
}
