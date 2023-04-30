import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { SiGit, SiDocker, SiAmazonaws, SiReact, SiNodedotjs, SiMongodb, SiMysql, SiPostgresql, SiRedis, SiNginx, SiApache, SiTerraform, SiKubernetes } from 'react-icons/si';


export default {
    pages: [
        {name: "Home", href: "/"},
        {name: "Career", href: "/career"},
        {name: "Skills", href: "/skills"},
        {name: "Projects", href: "/projects"},
        {name: "Portfolio", href: "/portfolio"}
    ],
    social: [
        {
          name: "GitHub", 
          href: "https://github.com/Havilash",
          icon: FaGithubSquare
        },
        {
          name: "Linkedin", 
          href: "",
          icon: FaLinkedin
        },
        {
          name: "Facebook", 
          href: "",
          icon: FaFacebookSquare
        }
    ],
    skills: {
        programmingLanguage: [
          { title: "Python", percent: 80 },
          { title: "JavaScript", percent: 65 },
          { title: "HTML / CSS", percent: 85 },
          { title: "PHP", percent: 45 },
          { title: "C", percent: 35 },
          { title: "C#", percent: 45 },
          { title: "Java", percent: 45 },
          { title: "Lua", percent: 55 }
        ],
        technologies: [
          { title: "Git", icon: SiGit },
          { title: "Docker", icon: SiDocker },
          { title: "AWS", icon: SiAmazonaws },
          { title: "React", icon: SiReact },
          { title: "Node.js", icon: SiNodedotjs },
          { title: "MongoDB", icon: SiMongodb },
          { title: "MySQL", icon: SiMysql },
          { title: "PostgreSQL", icon: SiPostgresql },
          { title: "Redis", icon: SiRedis },
          { title: "Nginx", icon: SiNginx },
          { title: "Apache", icon: SiApache },
          { title: "Terraform", icon: SiTerraform },
          { title: "Kubernetes", icon: SiKubernetes }
        ]
      },
    projects: [
        {
          repo_name: "Havilash/Neural-Network",
          title: "Neural-Network",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A versatile neural network package for classification tasks, including image recognition.",
          tags: ["neural network", "classification", "deep learning", "image recognition", "python", "ai"],
          href:  "https://github.com/Havilash/Neural-Network"
        },
        {
          repo_name: "Havilash/Portfolio-Website-v1",
          title: "Portfolio-Website-v1",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A personal portfolio website to showcase your work and skills.",
          tags: ["portfolio website v1", "version 1", "website", "html", "css", "javascript"],
          href:  "https://github.com/Havilash/Portfolio-Website-v1"
        },
        {
          repo_name: "Havilash/Softbody-Simulation",
          title: "Softbody-Simulation",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A project that simulates soft deformable objects using soft-body dynamics.",
          tags: ["Python", "soft-body dynamics", "animation", "simulation", "python", "pygame", "physics"],
          href:  "https://github.com/Havilash/Softbody-Simulation"
        },
        {
          repo_name: "Havilash/Golf-Game",
          title: "Golf Game",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A golf game with custom physics engine for realistic ball movement.",
          tags: ["golf game", "physics", "python", "ball", "pygame"],
          href:  "https://github.com/Havilash/Golf-Game"
        },
        {
          repo_name: "Havilash/Anmeldesystem",
          title: "Anmeldesystem",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A backend for a web application built using the Django framework.",
          tags: ["django backend", "anmeldesystem", "django", "backend", "web development", "python"],
          href:  ""
        },
        {
          repo_name: "Havilash/OneCalc",
          title: "OneCalc",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          description: "A simple and easy-to-understand calculator application with a history that can be filtered by date and a graphing calculator build wit .NET MAUI",
          tags: ["calculator", "math", "history", "graphing calculator", "windows", "android", ".net maui", "c#"],
          href:  "https://github.com/Havilash/OneCalc"
        }
      ]
}