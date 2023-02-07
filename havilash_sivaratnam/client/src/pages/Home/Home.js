import React, { useEffect, useRef, useState } from 'react'
import SortAlgorithm from '../../components/SortAlgorithm/SortAlgorithm'
import { FaArrowDown } from 'react-icons/fa';

import './Home.css'


export default function Home() {
  const [currentSort, setCurrentSort] = useState(null)
  const [sortIsRunning, setSortIsRunning] = useState(false)
  const [titleIsVisible, setTitleIsVisible] = useState(false)
  const sortResetRef = useRef(null);

  function variableNameToText(text){
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
  }

  useEffect(() => {
    setTitleIsVisible(!sortIsRunning)
    setTimeout(() => {
      if (!sortIsRunning) return
      setTitleIsVisible(true)
    }, 7000)

  }, [sortIsRunning])

  return (
    <section className='section p-0 m-0'>
      <div id='home' className='home flex items-center justify-center w-full h-screen relative m-0 left-0 top-0'>
        <SortAlgorithm className='absolute h-screen w-screen top-0 left-0 -z-50 overflow-hidden' width={window.innerWidth} setCurrentSort={setCurrentSort} setSortIsRunning={setSortIsRunning} resetRef={sortResetRef}/>
        <button 
          className='absolute text-sm bottom-1 right-1 z-0 button hidden md:block font-consolas font-semibold
          bg-body-color-2 hover:bg-body-color-2 mix-blend-difference
          text-body-color-1 opacity-60 hover:opacity-50' 
          onClick={sortResetRef.current}>
          {currentSort ? variableNameToText(currentSort) : ""}
        </button>
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
