import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'
import { RxFile } from 'react-icons/rx'

import './Portfolio.css'
import { Link } from 'react-router-dom'
import data from 'src/data'

export default function Portfolio() {
  return (
    <section className='section w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        <a href='assets/documents/Portfolio.zip' className='portfolio__button' download>
            <MdOutlineFileDownload className='portfolio__button__icon' />
        </a>
        <div className='w-80 flex flex-col gap-4'>
            {
                data.portfolio.documents.map((item, index) => (
                    <div key={`document-${index}`} className='flex flex-row gap-2'>
                        <Link to={`/portfolio/${item.document}`} className='portfolio__button w-full'>
                            {item.title}
                            <RxFile className='portfolio__button__icon' />
                        </Link>
                        {/* <a href={`/assets/documents/${item.document}`} className='portfolio__button' download>
                            <MdOutlineFileDownload className='portfolio__button__icon' />
                        </a> */}
                    </div>              
                ))
            }
        </div>
    </section>
  )
}
