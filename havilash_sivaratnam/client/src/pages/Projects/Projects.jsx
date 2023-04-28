import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './Projects.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const projects = [
  {
    title: 'Project 1',
    image: 'https://via.placeholder.com/150',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Project 2',
    image: 'https://via.placeholder.com/150',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Project 3',
    image: 'https://via.placeholder.com/150',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Project 4',
    image: 'https://via.placeholder.com/150',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className='section h-screen w-full flex justify-center items-center'>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        navigation={!isMobile && {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {
          projects.map((project) => (
            <SwiperSlide key={project.title}>
              <Project {...project} />
            </SwiperSlide>
          ))
        }
        {!isMobile && <div className='swiper-button-next'></div>}
        {!isMobile && <div className='swiper-button-prev'></div>}
      </Swiper>
    </section>
  );
}

function Project({ title, image, description }) {
  return (
    <div className='bg-block-color w-full h-[60vh] rounded-lg'>
      <img src={image} alt={title} className='w-full h-1/2 object-cover rounded-t-lg' />
      <div className='p-4'>
        <h2 className='text-primary mt-4'>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
