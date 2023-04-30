import React from 'react';
import { FaCircle } from 'react-icons/fa';
import './Career.css';

export default function Career() {
  function renderTimelineItems(items) {
    let length = Math.max(...items.map(item => item[0].length));
    
    return items.map((o, i) => (
      <tr key={`timeline-${i}`} className='relative h-full grid gap-x-4 gap-y-0 sm:flex sm:flex-row' style={{ gridTemplateColumns: '0.2rem auto' }}>
        <td className='text-xl opacity-50 sm:opacity-100 text-left sm:text-right 
        w-auto sm:min-w-[40vw] order-2 sm:order-1 ml-4 sm:ml-0'>
          {o[0]}
        </td>
        <td className={`bg-body-color-2 w-2 relative z-10 order-1 sm:order-2 row-span-2 ${i === 0 ? 'rounded-t-full' : ''}`}>
          <FaCircle className='absolute left-1/2 transform -translate-x-1/2' size={'1.2rem'} />
        </td>
        <td className='text-xl ml-4 max-w-sm order-3 pb-24'>
          {o[1]}
        </td>
      </tr>
    ));
  }

  return (
    <section className='section'>
      <div className='relative h-screen mix-blend-difference mt-48 flex justify-center'>
        <table className='relative mt-5 text-left w-full'>
          <tbody>
            {renderTimelineItems([
              ['Aktuell', '2. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)'],
              ['August 2021 - Juli 2022', '1. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)'],
            ])}

            <tr className='absolute h-full grid gap-x-4 gap-y-0 sm:flex sm:flex-row' style={{ gridTemplateColumns: '0.2rem auto' }}>
              <td className='w-auto sm:min-w-[40vw] order-2 sm:order-1 ml-4 sm:ml-0'>
              </td>
              <td className='bg-body-color-2 w-2 relative z-10 order-1 sm:order-2 row-span-2'>
              </td>
              <td className='text-xl ml-4 max-w-sm order-3'>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}