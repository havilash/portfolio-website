import React, { useEffect, useRef, useState } from 'react'
import SortAlgorithm from 'src/components/SortAlgorithm/SortAlgorithm'
import { FaArrowDown } from 'react-icons/fa';
import { bubbleSort, cycleSort, cocktailShakerSort, combSort, heapsort, insertionSort, mergeSort, quicksort, selectionSort, shellsort, gnomeSort, bitonicSort, sleepSort, bogoSort } from 'src/components/SortAlgorithm/SortFunctions';

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
  const age = getAge("2005-06-25");

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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        age--;
    return age;
  }

  return (
    <section className='section p-0 m-0'>
      {/* home */}
      <div id='home' 
        className='home'>
        <SortAlgorithm className='sort-algorithm' 
          width={window.innerWidth} sortFunc={sortFunc} setIsRunning={setSortIsRunning} resetRef={sortResetRef}/>

        <button className='sort-button button' 
          onClick={() => setIsSortFuncsElemOpen(!isSortFuncsElemOpen)}>
          {getKeyByValue(SORT_NAMES_FUNCTIONS, sortFunc)}
        </button>
        <div className={'sort-functions transition-all' + (isSortFuncsElemOpen ? " max-h-[40vh]" : " max-h-0")}>
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
      <div id='aboutme' className='aboutme flex flex-col items-center justify-center w-full py-[20rem] relative gap-60'>
        {/* 1 */}
        <div className='gap-12 md:gap-28 w-full
          flex flex-col md:flex-row justify-center items-center'>
          <div className='bg-body-color-2 w-[250px] h-[300px]'></div>
          {/* <img src="https://picsum.photos/300/400" alt="Portrait" /> */}
          <div className='flex flex-col self-center items-center md:items-start'>
            <h1 className='font-extrabold text-[2rem] xs:text-4xl'>Havilash Sivaratnam</h1>
            <table className='aboutme__data-table w-full md:w-[24rem] border-spacing-4 h-40 text-xl xs:text-2xl'>
              <tbody>
                <tr>
                  <td>Birthday:</td>
                  <td>25.06.2005</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>{age}</td>
                </tr>
                <tr>
                  <td>Nationality:</td>
                  <td>Sri Lanka, Swiss</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2 */}
        <div className='home__block'>
          <div className='max-w-5xl'>
            <h1 className=''>Who am I?</h1>
            <p className='text-justify text-xl font-semibold'>
              Consectetur pariatur dolore cupidatat veniam sint amet ipsum magna. Officia aute ut officia velit id proident ullamco. Elit fugiat ex dolore laborum consectetur id consectetur cillum nulla cupidatat aute. Fugiat duis voluptate amet sint culpa sit cupidatat minim occaecat sint excepteur ad. Culpa consectetur ut duis laborum reprehenderit minim fugiat in tempor amet pariatur nostrud mollit consectetur.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className='relative home__block home__block__hobbys'>
          <img src='/assets/violin.png' alt="Violin" 
            className='h-[28rem] absolute left-1/2 -translate-x-1/2 z-10 opacity-20
            md:relative md:translate-x-0 md:opacity-100 md:left-0' />
          <div className='z-20'>
            <h1>Hobbys</h1>
            <p className='text-justify text-xl font-semibold max-w-3xl'>
              Consectetur pariatur dolore cupidatat veniam sint amet ipsum magna. Officia aute ut officia velit id proident ullamco. Elit fugiat ex dolore laborum consectetur id consectetur cillum nulla cupidatat aute. Fugiat duis voluptate amet sint culpa sit cupidatat minim occaecat sint excepteur ad. Culpa consectetur ut duis laborum reprehenderit minim fugiat in tempor amet pariatur nostrud mollit consectetur.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
