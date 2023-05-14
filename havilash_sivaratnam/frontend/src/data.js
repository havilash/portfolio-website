import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { SiGit, SiDocker, SiAmazonaws, SiReact, SiNodedotjs, SiMongodb, SiMysql, SiPostgresql, SiRedis, SiNginx, SiApache, SiTerraform, SiKubernetes, SiTailwindcss } from 'react-icons/si';


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
  // career
  career: [
    {
      "date": "Aktuell",
      "description": "2. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)"
    },
    {
      "date": "August 2021 - Juli 2022",
      "description": "1. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)"
    },
    {
      "date": "August 2018 - Juli 2021",
      "description": "7-9. Schuljahr Sek, Dennigkofen Ostermundigen"
    },
    {
      "date": "August 2012 - Juli 2018",
      "description": "1-6. Schuljahr, Dennigkofen Ostermundigen"
    },
  ],
  // skills
  skills: {
    programmingLanguage: [
      {
        title: 'Python',
        percent: 80,
        details: ['Advanced', 'Pygame', 'Tkinter', 'Kivy', 'TensorFlow', 'Keras']
      },
      {
        title: 'JavaScript',
        percent: 65,
        details: ['Intermediate', 'React', 'Node.js', 'Express']
      },
      {
        title: 'HTML / CSS',
        percent: 85,
        details: ['Advanced', 'HTML5', 'CSS3', 'Responsive Design']
      },
      {
        title: 'PHP',
        percent: 45,
        details: ['Intermediate', 'Laravel', 'WordPress']
      },
      {
        title: 'C',
        percent: 35,
        details: ['Beginner', 'Data Structures', 'Algorithms']
      },
      {
        title: 'C#',
        percent: 45,
        details: ['Intermediate', '.NET', 'Unity']
      },
      {
        title: 'Java',
        percent: 45,
        details: ['Intermediate', 'Spring', 'Android']
      },
      {
        title: 'Lua',
        percent: 55,
        details: ['Beginner']
      }
    ],
    technologies: [
      {
        title: 'Git',
        icon: SiGit,
        details: ['Advanced', 'Version Control']
      },
      {
        title: 'Docker',
        icon: SiDocker,
        details: ['Intermediate', 'Containerization']
      },
      {
        title: 'AWS',
        icon: SiAmazonaws,
        details:
          ['Intermediate', 'EC2', 'S3', 'Lambda']
      },
      {
        title: 'React',
        icon: SiReact,
        details: ['Intermediate', 'Frontend Development']
      },
      {
        title: 'Node.js',
        icon: SiNodedotjs,
        details: ['Intermediate', 'Backend Development']
      },
      {
        title: 'MongoDB',
        icon: SiMongodb,
        details: ['Intermediate', 'NoSQL Database']
      },
      {
        title: 'MySQL',
        icon: SiMysql,
        details: ['Intermediate', 'SQL Database']
      },
      {
        title: 'PostgreSQL',
        icon: SiPostgresql,
        details:
          ['Intermediate', 'SQL Database']
      },
      {
        title: 'Redis',
        icon: SiRedis,
        details:
          ['Intermediate', 'In-memory Data Store']
      },
      {
        title: 'Nginx',
        icon: SiNginx,
        details:
          ['Intermediate', 'Web Server']
      },
      {
        title: 'Apache',
        icon: SiApache,
        details:
          ['Intermediate', 'Web Server']
      },
      {
        title: 'Terraform',
        icon: SiTerraform,
        details:
          ['Intermediate', 'Infrastructure as Code']
      },
      {
        title: 'Kubernetes',
        icon: SiKubernetes,
        details:
          ['Intermediate', 'Container Orchestration']
      }
    ]
  },
  // projects
  projects: [
    {
      repo: "Neural-Network",
      title: "Neural-Network",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      // description: "A versatile neural network package for classification tasks, including image recognition.",
      tags: ["neural network", "classification", "deep learning", "image recognition", "python", "ai"],
      href:  "https://github.com/Havilash/Neural-Network",
      document: "placeholder.pdf",
      demo: "asdf"
    },
    {
      repo: "Portfolio-Website-v1",
      title: "Portfolio-Website-v1",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      // description: "A personal portfolio website to showcase your work and skills.",
      tags: ["portfolio website v1", "version 1", "website", "html", "css", "javascript"],
      href:  "https://github.com/Havilash/Portfolio-Website-v1",
      document: "placeholder.pdf",
    },
    {
      repo: "Softbody-Simulation",
      title: "Softbody-Simulation",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      description: "A project that simulates soft deformable objects using soft-body dynamics.",
      tags: ["Python", "softbody dynamics", "animation", "simulation", "python", "pygame", "physics"],
      href:  "https://github.com/Havilash/Softbody-Simulation",
      document: "placeholder.pdf",
    },
    {
      repo: "Golf-Game",
      title: "Golf-Game",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      description: "A golf game with custom physics engine for realistic ball movement.",
      tags: ["golf game", "physics", "python", "ball", "pygame"],
      href:  "https://github.com/Havilash/Golf-Game",
      document: "placeholder.pdf",
    },
    {
      title: "Anmeldesystem",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      description: "A backend for a web application built using the Django framework.",
      tags: ["django backend", "anmeldesystem", "django", "backend", "web development", "python"],
      href:  "",
      document: "test.pdf",
    },
    {
      repo: "OneCalc",
      title: "OneCalc",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
      description: "A simple and easy-to-understand calculator application with a history that can be filtered by date and a graphing calculator build wit .NET MAUI",
      tags: ["calculator", "math", "history", "graphing calculator", "windows", "android", ".net maui", "c#"],
      href:  "https://github.com/Havilash/OneCalc",
      document: "placeholder.pdf",
    }
  ],
  // portfolio
  portfolio: {
    documents: [
      {
        title: "Lebenslauf",
        documents: [
          { title: "Klassisch", document: "cv_classic.pdf" },
          { title: "Modern", document: "cv_modern.pdf" },
        ]
      },
      {
        title: "Zeugnis",
        documents: [
          { title: "IMS 1", document: "report_card_ims_1.pdf" },
          { title: "IMS 2", document: "report_card_ims_2.pdf" },
        ]
      },
      {
        title: "Zertifikat",
        documents: [
          { title: "Abacus", document: "certificate_abacus.pdf" },
          { title: "EFZ", document: "certificate_efz.pdf" },
        ]
      },      
    ]
  }
}