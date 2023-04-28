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
    "title": "Neural-Network",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A versatile neural network package for classification tasks, including image recognition.",
    "tags": ["neural network", "classification", "deep learning", "image recognition", "python", "ai"],
    "href":  "https://github.com/Havilash/Neural-Network"
  },
  {
    "title": "Portfolio Website v1",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A personal portfolio website to showcase your work and skills.",
    "tags": ["portfolio website v1", "version 1", "website", "html", "css", "javascript"],
    "href":  "https://github.com/Havilash/Portfolio-Website-v1"
  },
  {
    "title": "Softbody-Simulation",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A project that simulates soft deformable objects using soft-body dynamics.",
    "tags": ["Python", "soft-body dynamics", "animation", "simulation", "python", "pygame", "physics"],
    "href":  "https://github.com/Havilash/Softbody-Simulation"
  },
  {
    "title": "Golf Game",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A golf game with custom physics engine for realistic ball movement.",
    "tags": ["golf game", "physics", "python", "ball", "pygame"],
    "href":  "https://github.com/Havilash/Golf-Game"
  },
  {
    "title": "Anmeldesystem",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A backend for a web application built using the Django framework.",
    "tags": ["django backend", "anmeldesystem", "django", "backend", "web development", "python"],
    "href":  "https://github.com/Havilash/Anmeldesystem"
  },
  {
    "title": "OneCalc",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
    "description": "A simple and easy-to-understand calculator application with a history that can be filtered by date and a graphing calculator build wit .NET MAUI",
    "tags": ["calculator", "math", "history", "graphing calculator", "windows", "android", ".net maui", "c#"],
    "href":  "https://github.com/Havilash/OneCalc"
  }
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
    <section className='section min-h-screen h-auto w-full flex flex-col py-24 md:px-8'>
      <div className=' border-b-4 border-solid border-white mix-blend-difference justify-self-start'>
        <input className='w-full bg-transparent border-none outline-none focus:outline-none' type="text" placeholder='Search' onChange={filterProjects} />
      </div>
      <div className='projects__grid py-8 md:px-8'>
        {
          filteredProjects.map((project) => (
            <Project {...project} />
          ))
        }
      </div>
    </section>
  );
}

function Project({ title, image, description, href }) {
  return (
    <div className='bg-block-color w-[20rem] h-[26rem] rounded-lg'>
      <a href={href}>
        <img src={image} alt={title} className='w-full h-1/2 object-cover rounded-t-lg' />
        <div className='p-4'>
          <h2 className='text-primary mt-4'>{title}</h2>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}
