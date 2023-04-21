import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

export default function Block({children, className, title, subtitle, open, onIsOpenChange}) {
    const [isOpen, setIsOpen] = useState(open || false)

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    useEffect(() => {
        onIsOpenChange && onIsOpenChange(isOpen);
    }, [isOpen])

  return (
    <div className={`bg-block-color transition-all rounded-lg w-1/3 h-fit ${className}`}>
        <div onClick={() => setIsOpen(!isOpen)} className='shadow-lg p-4 flex flex-row items-center justify-between relative '>
            <h1 className='text-[5vw] xs:text-3xl text-white mr-4'>{title}</h1>
            <p className='absolute bottom-2 text-xs opacity-75'>{subtitle}</p>
            <FaAngleDown size="2.5rem" className={`transition-all delay-50 duration-200 cursor-pointer ${isOpen && 'rotate-180'}`}/>
        </div>
        <div className={`overflow-y-scroll transition-all duration-200 ${!isOpen ? 'h-0' : 'h-[50vh]'}`}>
            {children}
        </div>
    </div>
  )
}
