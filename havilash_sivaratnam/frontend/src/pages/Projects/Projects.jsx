import { useEffect, useState } from "react";
import data from "src/data.js";

import { Link } from "react-router-dom";
import Skeleton from "src/components/skeletons/Skeleton/Skeleton";
import { getRepo, getRepoCollaborators } from "src/lib/api";
import "./Projects.css";

function sortByNothing(data) {
  return data;
}

function sortByTitle(data) {
  return data.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByRecent(data) {
  return data.sort((a, b) => {
    const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
    const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
    if (!a.updated_at) return 1;
    if (!b.updated_at) return -1;
    return dateB - dateA;
  });
}

function sortByCreationDate(data) {
  return data.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
    const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
    if (!a.created_at) return 1;
    if (!b.created_at) return -1;
    return dateB - dateA;
  });
}

function sortBySize(data) {
  return data.sort((a, b) => {
    if (!a.size) return 1;
    if (!b.size) return -1;
    return a.size - b.size;
  });
}

function sortByStars(data) {
  return data.sort((a, b) => {
    if (!a.stars) return 1;
    if (!b.stars) return -1;
    return b.stars - a.stars;
  });
}

const sortFunctions = {
  sortByNothing,
  sortByTitle,
  sortByRecent,
  sortByCreationDate,
  sortBySize,
  sortByStars,
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState(data.projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [sortBy, setSortBy] = useState(() => sortByNothing);

  function filterProjects(searchTerm) {
    const filtered = projects.filter((project) => {
      const tags = project.tags.map((tag) => tag.toLowerCase());
      return tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProjects(filtered);
  }

  useEffect(() => {
    filterProjects(searchTerm);
  }, [searchTerm, projects]);

  useEffect(() => {
    async function loadContributors(project) {
      if (!project.repo) return;
      const resp = await getRepoCollaborators(project.repo);
      const newAuthors = resp.map((author) => ({
        name: author.login,
        href: author.html_url,
      }));
      return newAuthors;
    }
    async function loadProject(project) {
      if (!project.repo) return project;
      try {
        const resp = await getRepo(project.repo);
        const newProject = {
          ...project,
          title: project.title || resp.name,
          description: project.description || resp.description,
          href: project.href || resp.html_url,
          authors: project.authors || (await loadContributors(project)),
          updated_at: project.updated_at || resp.updated_at,
          created_at: project.created_at || resp.created_at,
          size: project.size || resp.size,
          stars: project.stars || resp.stargazers_count,
        };
        return newProject;
      } catch (error) {
        // alert('fetch failed')
        console.error(error);
        return project;
      }
    }

    async function loadProjects() {
      const projects = await Promise.all(data.projects.map(loadProject));
      setProjects(projects);
    }

    loadProjects();
  }, []);

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
    setSortBy(() => sortFunctions[selectedValue]);
  }

  return (
    <section className="section min-h-screen h-auto w-full flex flex-col py-24 md:px-8">
      <div className="flex flex-row border-b-4 border-solid border-white mix-blend-difference items-end pb-1 gap-4">
        <input
          className="w-full bg-transparent border-none outline-none focus:outline-none h-full ml-4"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="select mr-4" onChange={handleSelectChange}>
          <option value={sortByNothing.name}>Sort By</option>
          <option value={sortByRecent.name}>Recent</option>
          <option value={sortByStars.name}>Stars</option>
          <option value={sortByTitle.name}>Title</option>
          <option value={sortBySize.name}>Size</option>
          <option value={sortByCreationDate.name}>Creation</option>
        </select>
      </div>
      <div className="projects__grid py-8 md:px-8 transition-all">
        {filteredProjects &&
          sortBy(filteredProjects).map((project, index) => (
            <Project key={`project-${index}`} {...project} />
          ))}
      </div>
    </section>
  );
}

function Project({ title, image, description, authors }) {
  return (
    <div className="bg-block-color w-[20rem] h-[26rem] rounded-lg relative">
      <Link to={`/projects/${title.toLowerCase()}`}>
        <img
          src={image}
          alt={title}
          className="bg-[#fffc] text-center w-full h-1/2 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-primary mt-4">{title ? title : <Skeleton />}</h2>
          {description ? (
            <p>{description}</p>
          ) : (
            <>
              <p>
                <Skeleton />
              </p>
              <p>
                <Skeleton />
              </p>
              <p>
                <Skeleton width="30%" />
              </p>
            </>
          )}
        </div>
      </Link>
      <ul
        className="flex flex-row flex-wrap absolute my-2 mx-3 bottom-0 right-0 text-xs 
        font-extralight gap-2 opacity-50 overflow-hidden whitespace-nowrap overflow-ellipsis"
      >
        {authors ? (
          authors.map((author, index) => (
            <li key={`${title}-author-${index}`}>
              <a href={author.href} target="_blank" rel="noreferrer">
                {author.name}
              </a>
            </li>
          ))
        ) : (
          <li>
            <Skeleton width="4rem" />
          </li>
        )}
      </ul>
    </div>
  );
}
