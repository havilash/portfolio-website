import React, { useEffect, useRef, useState } from 'react'
import SortAlgorithm from '../../components/SortAlgorithm/SortAlgorithm'
import { FaArrowDown } from 'react-icons/fa';
import { bubbleSort, cycleSort, cocktailShakerSort, combSort, heapsort, insertionSort, mergeSort, quicksort, selectionSort, shellsort, gnomeSort, bitonicSort, sleepSort, bogoSort } from '../../components/SortAlgorithm/SortFunctions';

import './Home.css'

const SORT_NAMES_FUNCTIONS = {
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Merge Sort": mergeSort,
  "Quicksort": quicksort,
  "Shellsort": shellsort,
  "Bubble Sort": bubbleSort,
  "Comb Sort": combSort,
  "Heapsort": heapsort,
  "Cocktail Shaker Sort": cocktailShakerSort,
  "Cycle Sort": cycleSort,
  "Gnome Sort": gnomeSort,
  "Bitonic Sort": bitonicSort,
  "Sleep Sort": sleepSort,
  "Bogo Sort": bogoSort,
}

const SORT_FUNCTIONS = Object.values(SORT_NAMES_FUNCTIONS)
// const SORT_FUNCTIONS = [insertionSort, selectionSort, mergeSort, quicksort, shellsort, bubbleSort, combSort, heapsort, cocktailShakerSort, cycleSort, gnomeSort, bitonicSort, sleepSort]

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export default function Home() {
  const [sortIsRunning, setSortIsRunning] = useState(false)
  const [titleIsVisible, setTitleIsVisible] = useState(false)
  const sortResetRef = useRef(null);
  const [sortFunc, setSortFunc] = useState(() => SORT_FUNCTIONS[Math.floor(Math.random()*SORT_FUNCTIONS.length)])
  const [isSortFuncsElemOpen, setIsSortFuncsElemOpen] = useState(false);  // sort-functions element visibility state

  useEffect(() => {
    setTitleIsVisible(!sortIsRunning)
    setTimeout(() => {
      if (!sortIsRunning) return
      setTitleIsVisible(true)
    }, 7500)
  }, [sortIsRunning])


  function renderSortFunctions() {
    let output = [];
    Object.keys(SORT_NAMES_FUNCTIONS).forEach((key, i) => {
      let value = SORT_NAMES_FUNCTIONS[key];

      output.push(
        <li key={`sort-function-${i}`} className={'sort-functions__item' + ((sortFunc == value) ? " active" : "")} 
          onClick={() => {
              sortResetRef.current(value)
              setSortFunc(() => value)
            }}>
          {key}
        </li>
      )
    })

    return output;
  }

  return (
    <section className='section p-0 m-0'>
      <div id='home' 
        className='home'>
        <SortAlgorithm className='sort-algorithm' 
          width={window.innerWidth} sortFunc={sortFunc} setIsRunning={setSortIsRunning} resetRef={sortResetRef}/>

        <button className='sort-button button' 
          onClick={() => setIsSortFuncsElemOpen(!isSortFuncsElemOpen)}>
          {getKeyByValue(SORT_NAMES_FUNCTIONS, sortFunc)}
        </button>
        <div className={'sort-functions transition-all' + (isSortFuncsElemOpen ? " " : " max-h-0")}>
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
      <div id='aboutme' className='aboutme flex items-center justify-center w-full h-[200vh] relative'>

      </div>
    </section>
  )
}
