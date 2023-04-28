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
    title: 'Neural Network',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: 'Convolutional Neural Network from scratch',
    tags: ['neural network', 'python', 'ai'],
  },
  {
    title: 'Portfolio Website',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: 'A personal portfolio website to showcase your work and skills.',
    tags: ['portfolio website', 'website', 'html', 'css', 'javascript'],
  },
  {
    title: 'Spring Simulation',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: 'A simulation of a spring-mass system using physics equations.',
    tags: ['spring simulation', 'spring', 'simulation', 'physics'],
  },
  {
    title: 'Golf Game',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: 'A golf game with custom physics engine for realistic ball movement.',
    tags: ['golf game', 'golf', 'game', 'physics'],
  },
  {
    title: 'Django Backend',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: 'A backend for a web application built using the Django framework.',
    tags: ['django backend', 'django', 'backend', 'web development'],
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function filterProjects(e) {
    const filtered = projects.filter((project) => {
      const tags = project.tags.map((tag) => tag.toLowerCase());
      return tags.some(tag => tag.toLowerCase().includes(e.target.value.toLowerCase()))
    });
    setFilteredProjects(filtered)
  }

  return (
    <section className='section h-screen w-full flex flex-col justify-center'>
      <input className='self-start mix-blend-difference bg-black' type="text" placeholder='Search' onChange={filterProjects} />
      <div className='h-[65vh] w-full flex justify-center items-center'>
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
            filteredProjects.map((project) => (
              <SwiperSlide key={project.title}>
                <Project {...project} />
              </SwiperSlide>
            ))
          }
          {!isMobile && <div className='swiper-button-next'></div>}
          {!isMobile && <div className='swiper-button-prev'></div>}
        </Swiper>
      </div>
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
