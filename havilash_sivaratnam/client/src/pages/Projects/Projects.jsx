import React, { useState, useEffect } from 'react';
import data from 'src/data.js'

import './Projects.css'
import { Link } from 'react-router-dom';

const projects = data.projects;

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
      <div className='projects__grid py-8 md:px-8 transition-all'>
        {
          filteredProjects.map((project) => (
            <Project {...project} />
          ))
        }
      </div>
    </section>
  );
}

function Project({ title, image, description }) {
  return (
    <div className='bg-block-color w-[20rem] h-[26rem] rounded-lg'>
      <Link to={`/projects/${title}/document`}>
        <img src={image} alt={title} className='w-full h-1/2 object-cover rounded-t-lg' />
        <div className='p-4'>
          <h2 className='text-primary mt-4'>{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}