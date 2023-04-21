import React, { useEffect, useRef, useState } from 'react'
import Block from 'src/components/Block/Block'
import { FaDocker, FaGitAlt } from 'react-icons/fa';

import './Skills.css'

export default function Skills() {
  const [isLargeDevice, setIsLargeDevice] = useState(!window.matchMedia("(min-width: 1024px)").matches);
  const [isOpen1, setIsOpen1] = useState(!isLargeDevice)
  const [isOpen2, setIsOpen2] = useState(!isLargeDevice)
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const columnWidth = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ')[0];
      gridRef.current.style.gridAutoRows = columnWidth;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.matchMedia("(min-width: 1024px)").matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <section 
      className='section h-screen w-full 
      flex flex-col lg:flex-row justify-center items-center gap-[1rem] lg:gap-[10vw]'>
        <Block 
          className='skills__block' 
          title="Programming Languages"
          open={isOpen1}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            setIsOpen1(o)
            o && setIsOpen2(false)
          }}>
          <SkillBar title='Python' percent='80%'/>
          <SkillBar title='JavaScript' percent='60%'/>
          <SkillBar title='C#' percent='45%'/>
          <SkillBar title='Java' percent='45%'/>
          <SkillBar title='HTML / CSS' percent='85%'/>
        </Block>
        <Block 
          className='skills__block' 
          title="Technologies" 
          subtitle="Sorted by experience"
          open={isOpen2}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            setIsOpen2(o)
            o && setIsOpen1(false)
          }}>
          <div className='skills__technologies'>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Docker' icon={<FaDocker size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
            <SkillBox title='Git' icon={<FaGitAlt size='4rem'/>}/>
          </div>
        </Block>
    </section>
  )
}


function SkillBar({title, percent}) {
  return (
    <div className='mt-6 w-full flex flex-col gap-4'>
      <h2 className='text-white'>{title}</h2>
      <div className='w-full bg-body-color-2 h-4'>
        <div className='h-full bg-primary-color' style={{width: percent}} />
      </div>
    </div>
  )
}

function SkillBox({title, icon}) {
  return (
    <div 
      className='w-28 h-28 border-4 border-primary-color rounded-2xl 
      flex flex-col justify-center items-center'>
      {icon}
      <h2 className='text-white text-2xl'>{title}</h2>
    </div>
  )
}