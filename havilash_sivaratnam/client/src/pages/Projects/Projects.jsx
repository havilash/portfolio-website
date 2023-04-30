import React, { useState, useEffect } from 'react';
import data from 'src/data.js'
import useDebounce from 'src/hooks/useDebounce.js'

import './Projects.css'
import { getRepo, getRepoContributors } from 'src/lib/api';


export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState(projects)

  function filterProjects(searchTerm) {
    const filtered = projects.filter((project) => {
      const tags = project.tags.map((tag) => tag.toLowerCase());
      return tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    });
    setFilteredProjects(filtered)
  }

  useEffect(() => {
    filterProjects(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    async function loadProject(project) {
      if (!project.repo_name) return project;
      try {
        const resp = await getRepo(project.repo_name)
        const newProject = {
          ...project,
          title: project.title || resp.name,
          description: project.description || resp.description,
          href: project.href || resp.html_url,
          authors: project.authors || await getRepoContributors(project.repo_name)
        }
        return newProject
      } catch (error) {
        // alert('fetch failed')
        console.log(error)
        return project
      }
    }

    async function loadProjects() {
      const projects = await Promise.all(data.projects.map(loadProject))
      setProjects(projects)
      console.log(projects)
    }
    
    loadProjects()
  }, [])

  return (
    <section className='section min-h-screen h-auto w-full flex flex-col py-24 md:px-8'>
      <div className=' border-b-4 border-solid border-white mix-blend-difference justify-self-start'>
        <input 
          className='w-full bg-transparent border-none outline-none focus:outline-none' 
          type="text" 
          placeholder='Search' 
          onChange={(e) => setSearchTerm(e.target.value)} />
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