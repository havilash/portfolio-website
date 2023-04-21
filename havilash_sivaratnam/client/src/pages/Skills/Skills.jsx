import React, { useEffect, useState } from 'react'
import Block from 'src/components/Block/Block'

export default function Skills() {
  const [isLargeDevice, setIsLargeDevice] = useState(!window.matchMedia("(min-width: 1024px)").matches);
  const [isOpen1, setIsOpen1] = useState(!isLargeDevice)
  const [isOpen2, setIsOpen2] = useState(!isLargeDevice)

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
          className='min-w-full sm:min-w-[24ch] text-xl xs:text-2xl sm:text-3xl' 
          title="Programming Languages"
          open={isOpen1}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            console.log("lg1", isLargeDevice)
            setIsOpen1(o)
            o && setIsOpen2(false)
          }}>

        </Block>
        <Block 
          className='min-w-full sm:min-w-[24ch] text-xl xs:text-2xl sm:text-3xl' 
          title="Technologies" 
          subtitle="Sorted by experience"
          open={isOpen2}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            console.log("lg2", isLargeDevice)
            setIsOpen2(o)
            o && setIsOpen1(false)
          }}>
            
        </Block>
    </section>
  )
}
