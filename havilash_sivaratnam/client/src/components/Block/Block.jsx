import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

export default function Block({children, className, title, subtitle, open}) {
    const [isOpen, setIsOpen] = useState(open || true)

    // useEffect(() => {
        
    // }, [isOpen])

  return (
    <div className={`bg-block-color rounded-lg w-1/3 h-3/5 ${className}`}>
        <div className='shadow-lg p-4 flex flex-row content-center justify-between relative'>
            <h1 className='text-3xl text-white'>{title}</h1>
            <p className='absolute bottom-1 text-sm'>{subtitle}</p>
            <FaAngleDown size="2.5rem"/>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}
