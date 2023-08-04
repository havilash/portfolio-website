import {
  FaEnvelope,
  FaFacebookSquare,
  FaGithubSquare,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiGit,
  SiDocker,
  SiAmazonaws,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiNginx,
  SiApache,
  SiTerraform,
  SiKubernetes,
  SiTailwindcss,
} from "react-icons/si";

export default {
  pages: [
    { name: "Home", href: "/" },
    { name: "Career", href: "/career" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Portfolio", href: "/portfolio" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/Havilash",
      icon: FaGithubSquare,
    },
    {
      name: "Linkedin",
      href: "",
      icon: FaLinkedin,
    },
    {
      name: "Facebook",
      href: "",
      icon: FaEnvelope,
    },
  ],
  // home
  home: {
    whoAmI:
      "Mein Name ist Havilash Sivaratnam, ein Informatiker mit einer Leidenschaft für KI und maschinelles Lernen. Ich verfüge über ein breites Spektrum an Programmierkenntnissen. Ich habe Simulationen implementiert, maschinelles Lernen-basierte Spiele entwickelt, verschiedene webseiten erstellt und vieles mehr. Ich habe Freude daran, komplexe Physik- und Mathematikprobleme mit Sprachen wie Python, Rust und anderen zu lösen. Immer auf der Suche nach neuen Herausforderungen erweitere ich kontinuierlich mein Wissen und meine Fähigkeiten in der Informatik.",
    hobbys:
      "In meiner Freizeit beschäftige ich mich gerne mit verschiedenen Hobbys und Aktivitäten. Eines davon ist das Geigenspiel, das ich im Alter von 10 Jahren begonnen habe und oft in kleinen Konzerten auftrete. Das Geigenspiel ist für mich eine entspannende Möglichkeit, abzuschalten. Ein weiteres Hobby von mir ist das Zeichnen, wo ich gerne Skizzen von Gesichtern und Objekten erstelle. Gelegentlich spiele ich Schach, um mein strategisches Denken herauszufordern. Beim Gamen gehören Minecraft, Terraria und Poly Bridge zu meinen Favoriten. Diese Spiele ermöglichen es mir, meine Kreativität und Problemlösungsfähigkeiten auf unterhaltsame Weise einzusetzen.",
  },
  // career
  career: [
    {
      date: "Aktuell",
      description: "3. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)",
    },
    {
      date: "August 2021 - Juli 2023",
      description: "1-2. Schuljahr Informatikmittelschule (BWD, Gibb, BBC)",
    },
    {
      date: "August 2018 - Juli 2021",
      description: "7-9. Schuljahr Sek, Dennigkofen Ostermundigen",
    },
    {
      date: "August 2012 - Juli 2018",
      description: "1-6. Schuljahr, Dennigkofen Ostermundigen",
    },
  ],
  // skills
  skills: {
    programmingLanguage: [
      {
        title: "Python",
        percent: 80,
      },
      {
        title: "JavaScript",
        percent: 65,
      },
      {
        title: "HTML / CSS",
        percent: 85,
      },
      {
        title: "PHP",
        percent: 45,
      },
      {
        title: "C",
        percent: 35,
      },
      {
        title: "C#",
        percent: 45,
      },
      {
        title: "Java",
        percent: 45,
      },
      {
        title: "Lua",
        percent: 55,
      },
    ],
    technologies: [
      {
        title: "Git",
        icon: SiGit,
      },
      {
        title: "Docker",
        icon: SiDocker,
      },
      {
        title: "AWS",
        icon: SiAmazonaws,
      },
      {
        title: "React",
        icon: SiReact,
      },
      {
        title: "Node.js",
        icon: SiNodedotjs,
      },
      {
        title: "MongoDB",
        icon: SiMongodb,
      },
      {
        title: "MySQL",
        icon: SiMysql,
      },
      {
        title: "PostgreSQL",
        icon: SiPostgresql,
      },
      {
        title: "Redis",
        icon: SiRedis,
      },
      {
        title: "Nginx",
        icon: SiNginx,
      },
      {
        title: "Apache",
        icon: SiApache,
      },
      {
        title: "Terraform",
        icon: SiTerraform,
      },
      {
        title: "Kubernetes",
        icon: SiKubernetes,
      },
    ],
  },
  // projects
  projects: [
    {
      repo: "Havilash/Neural-Network",
      title: "Neural-Network",
      image: "./assets/projects/neural-network.png",
      description:
        "A versatile neural network package for classification tasks, including image recognition.",
      tags: [
        "neural network",
        "classification",
        "deep learning",
        "image recognition",
        "python",
        "ai",
      ],
      href: "https://github.com/Havilash/Neural-Network",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "TD99/planet-go",
      title: "Planet-Go",
      image: "./assets/projects/planet-go.png",
      description:
        "An educational app that represents the solar system on a city map. Players walk to planets and learn about the solar system.",
      tags: [
        "planet go",
        "typescript",
        "html",
        "css",
        "ionic",
        "solar system",
        "pokemon go",
        "website",
        "maps",
        "education",
        "health",
        "fitness",
      ],
      href: "https://github.com/TD99/planet-go",
    },
    {
      repo: "Havilash/Portfolio-Website-v1",
      title: "Portfolio-Website-v1",
      image: "./assets/projects/portfolio-website-v1.png",
      description:
        "A provisional portfolio website for future applications, created with React and TailwindCSS for the frontend and Node Express for the backend.",
      tags: [
        "portfolio website v1",
        "website",
        "html",
        "css",
        "javascript",
        "react",
        "tailwindcss",
      ],
      href: "https://github.com/Havilash/Portfolio-Website-v1",
      repoDocument: "/docs/abstract.pdf",
      demo: "https://havilash-portfolio-website-v1.netlify.app/",
    },
    {
      repo: "Havilash/Softbody-Simulation",
      title: "Softbody-Simulation",
      image: "./assets/projects/softbody-simulation.png",
      description:
        "A project that simulates soft deformable objects using soft-body dynamics.",
      tags: ["softbody simulation", "python", "pygame", "physics"],
      href: "https://github.com/Havilash/Softbody-Simulation",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/Golf-Game",
      title: "Golf-Game",
      image: "./assets/projects/golf-game.png",
      description:
        "A golf game with custom physics engine for realistic ball movement.",
      tags: ["golf game", "physics", "python", "ball", "pygame"],
      href: "https://github.com/Havilash/Golf-Game",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/Chess-HTML5",
      title: "Chess-HTML5",
      image: "./assets/projects/chess-html5.png",
      description:
        "Chess-HTML5 is a simple chess game built using HTML5, JavaScript, and CSS. Playable directly in your web browser, it features intuitive controls and a clean design.",
      tags: ["chess html5", "javascript", "html", "css"],
      href: "https://github.com/Havilash/Chess-HTML5",
      demo: "https://havilash-chess-html5.netlify.app/",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/TRex-Runner-AI",
      title: "TRex-Runner-AI",
      image: "./assets/projects/trex-runner-ai.png",
      description:
        "A T-Rex runner game with an AI that learns to play it. The AI uses the NEAT algorithm.",
      tags: [
        "trex runner ai",
        "python",
        "pygame",
        "neat",
        "ai",
        "neural network",
      ],
      href: "https://github.com/Havilash/TRex-Runner-AI",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/A-Star-Algorithm",
      title: "A-Star-Algorithm",
      image: "./assets/projects/a-star-algorithm.png",
      description:
        "A Pygame visualization of the A-Star pathfinding algorithm, demonstrating how it finds the shortest path between two points.",
      tags: ["a star algorithm", "python", "pygame", "pathfinding"],
      href: "https://github.com/Havilash/A-Star-Algorithm",
    },
    {
      repo: "Havilash/Face-Recognition",
      title: "Face-Recognition",
      image: "./assets/projects/face-recognition.png",
      description:
        "A machine learning project that detects faces in images, using a custom-trained model on a self-made dataset.",
      tags: [
        "face recognition",
        "python",
        "tensorflow",
        "ai",
        "neural network",
        "label me",
        "data",
      ],
      href: "https://github.com/Havilash/Face-Recognition",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/Hand-Tracking",
      title: "Hand-Tracking",
      image: "./assets/projects/hand-tracking.png",
      description:
        "A Mediapipe project that tracks hand movements and gestures, with features such as volume and mouse control.",
      tags: [
        "face recognition",
        "python",
        "ai",
        "neural network",
        "mediapipe",
        "mouse control",
      ],
      href: "https://github.com/Havilash/Hand-Tracking",
    },
    {
      repo: "Havilash/Conways-Game-of-Life_Pygame",
      title: "Conways-Game-of-Life",
      image: "./assets/projects/conways-game-of-life.png",
      description:
        "A Pygame implementation of Conway’s Game of Life, simulating the evolution of a cellular automaton based on rules.",
      tags: ["conways game of life", "python", "pygame"],
      href: "https://github.com/Havilash/Conways-Game-of-Life_Pygame",
    },
  ],
  // portfolio
  portfolio: {
    documents: [
      {
        title: "Lebenslauf",
        document: "cv.pdf",
      },
      {
        title: "Zeugnis",
        documents: [
          { title: "IMS 2", document: "report_card_ims_2.pdf" },
          { title: "IMS 1", document: "report_card_ims_1.pdf" },
          { title: "Schule 9", document: "report_card_schule_9.pdf" },
          { title: "Schule 8", document: "report_card_schule_8.pdf" },
          { title: "Schule 7", document: "report_card_schule_7.pdf" },
        ],
      },
      {
        title: "Zertifikat",
        documents: [
          { title: "Abacus", document: "certificate_abacus.pdf" },
          { title: "Violine", document: "certificate_violine.pdf" },
        ],
      },
    ],
  },
};
