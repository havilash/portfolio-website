import {
  FaEnvelope,
  FaEnvelopeSquare,
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
  SiSpringboot,
  SiDjango,
  SiFlask,
  SiTensorflow,
  SiLinux,
  SiDotnet,
  SiLaravel,
  SiMicrosoftazure,
  SiExpress,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiGithubactions,
  SiJupyter,
  SiAnaconda,
  SiVim,
  SiUnity,
  SiBlender,
  SiGimp,
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
      href: "https://www.linkedin.com/in/havilash-sivaratnam-586083265/",
      icon: FaLinkedin,
    },
    {
      name: "E-Mail",
      href: "mailto:havilash.sivaratnam@protonmail.com",
      icon: FaEnvelopeSquare,
    },
  ],
  // home
  home: {
    whoAmI:
      "Mein Name ist Havilash Sivaratnam und ich bin ein Informatiker, der sich leiden\u00ADschaftlich für Künstliche Intelligenz und maschinelles Lernen interessiert. Mit einem breiten Spektrum an Programmier\u00ADkenntnissen habe ich Simulationen implementiert, Spiele auf Basis von maschinellem Lernen entwickelt, verschie\u00ADdene Webseiten erstellt und vieles mehr. Ich liebe es, komplexe Physik- und Mathematik\u00ADprobleme mit Sprachen wie Python, Rust und anderen zu lösen. Stets auf der Suche nach neuen Heraus\u00ADforderungen erweitere ich kontinuierlich mein Wissen und meine Fähigkeiten in der Informatik.",
    hobbys:
      "In meiner Freizeit genieße ich eine Vielzahl von Hobbys und Aktivitäten. Eines davon ist das Geigen\u00ADspiel, das ich im Alter von 10 Jahren begonnen habe und bei dem ich oft in kleinen Konzerten auftrete. Das Geigen\u00ADspiel bietet mir eine entspan\u00ADnende Möglich\u00ADkeit, abzu\u00ADschalten. Ein weiteres Hobby von mir ist das Zeichnen, bei dem ich gerne Skizzen von Gesichtern und Objekten anfertige. Gele\u00ADgentlich spiele ich Schach, um mein strategisches Denken heraus\u00ADzufordern. Beim Gamen gehören Minecraft, Terraria und Poly Bridge zu meinen Favoriten. Diese Spiele ermöglichen es mir, meine Kreativität und Problem\u00ADlösungs\u00ADfähigkeiten auf unterhaltsame Weise einzusetzen.",
  },
  // career
  career: [
    {
      date: "Aktuell",
      description:
        "3. Schuljahr IMS Informatikmittelschule Bern (Bwd, Gibb, Bbc)",
    },
    {
      date: "August 2021 - Juli 2023",
      description:
        "1-2. Schuljahr IMS Informatikmittelschule Bern (Bwd, Gibb, Bbc)",
    },
    {
      date: "August 2018 - Juli 2021",
      description: "7-9. Schuljahr Sekundarstufe 1, Dennigkofen Ostermundigen",
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
        percent: 70,
      },
      {
        title: "TypeScript",
        percent: 65,
      },
      {
        title: "HTML / CSS",
        percent: 85,
      },
      {
        title: "Rust",
        percent: 55,
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
        title: "React",
        icon: SiReact,
      },
      {
        title: "MySQL",
        icon: SiMysql,
      },
      {
        title: "Git",
        icon: SiGit,
      },
      {
        title: "Numpy",
        icon: SiNumpy,
      },
      {
        title: "Express.js",
        icon: SiExpress,
      },
      {
        title: "Flask",
        icon: SiFlask,
      },
      {
        title: "Tailwindcss",
        icon: SiTailwindcss,
      },
      {
        title: "Node.js",
        icon: SiNodedotjs,
      },
      {
        title: "Linux",
        icon: SiLinux,
      },
      {
        title: "Jupyter",
        icon: SiJupyter,
      },
      {
        title: "Anaconda",
        icon: SiAnaconda,
      },
      {
        title: "Gimp",
        icon: SiGimp,
      },
      {
        title: "Docker",
        icon: SiDocker,
      },
      {
        title: "Tensorflow",
        icon: SiTensorflow,
      },
      {
        title: "Django",
        icon: SiDjango,
      },
      {
        title: "Unity",
        icon: SiUnity,
      },
      {
        title: "Vim",
        icon: SiVim,
      },
      {
        title: "CI/CD",
        icon: SiGithubactions,
      },
      {
        title: "Blender",
        icon: SiBlender,
      },
      {
        title: "Laravel",
        icon: SiLaravel,
      },
      {
        title: "Spring Boot",
        icon: SiSpringboot,
      },
      {
        title: "Pandas",
        icon: SiPandas,
      },
      {
        title: "MongoDB",
        icon: SiMongodb,
      },
      {
        title: ".NET",
        icon: SiDotnet,
      },
      {
        title: "Microsoft Azure",
        icon: SiMicrosoftazure,
      },
      {
        title: "AWS",
        icon: SiAmazonaws,
      },
      {
        title: "Kubernetes",
        icon: SiKubernetes,
      },
      {
        title: "Terraform",
        icon: SiTerraform,
      },
      {
        title: "PostgreSQL",
        icon: SiPostgresql,
      },
      {
        title: "Redis",
        icon: SiRedis,
      },
    ],
  },
  // projects
  projects: [
    {
      repo: "Havilash/neural-network",
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
      href: "https://github.com/Havilash/neural-network",
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
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/portfolio-website-v1",
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
      href: "https://github.com/Havilash/portfolio-website-v1",
      repoDocument: "/docs/abstract.pdf",
      demo: "https://havilash-portfolio-website-v1.netlify.app/",
    },
    {
      repo: "Havilash/letsgo-ai",
      title: "LetsGo-AI",
      image: "./assets/projects/letsgo-ai.png",
      description:
        "LetsGo-AI is a game where players are paired with either a person or an AI, ask questions, and then guess if their counterpart is human or AI",
      tags: [
        "letsgo ai",
        "ai",
        "openai",
        "chatgpt",
        "java",
        "android app",
        "node express",
        "mongodb",
      ],
      href: "https://github.com/Havilash/letsgo-ai",
      repoDocument: "/docs/abstract.pdf",
      authors: [
        { name: "Havilash", href: "https://github.com/Havilash" },
        { name: "rergr", href: "https://github.com/rergr" },
        { name: "mike" },
      ],
    },
    {
      repo: "Havilash/softbody-simulation",
      title: "Softbody-Simulation",
      image: "./assets/projects/softbody-simulation.png",
      description:
        "A project that simulates soft deformable objects using soft-body dynamics.",
      tags: ["softbody simulation", "python", "pygame", "physics"],
      href: "https://github.com/Havilash/softbody-simulation",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/golf-game",
      title: "Golf-Game",
      image: "./assets/projects/golf-game.png",
      description:
        "A golf game with custom physics engine for realistic ball movement.",
      tags: ["golf game", "physics", "python", "ball", "pygame"],
      href: "https://github.com/Havilash/golf-game",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/chess-html5",
      title: "Chess-HTML5",
      image: "./assets/projects/chess-html5.png",
      description:
        "Chess-HTML5 is a simple chess game built using HTML5, JavaScript, and CSS. Playable directly in your web browser, it features intuitive controls and a clean design.",
      tags: ["chess html5", "javascript", "html", "css"],
      href: "https://github.com/Havilash/chess-html5",
      demo: "https://havilash-chess-html5.netlify.app/",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/trex-runner-ai",
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
      href: "https://github.com/Havilash/trex-runner-ai",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/a-star-algorithm",
      title: "A-Star-Algorithm",
      image: "./assets/projects/a-star-algorithm.png",
      description:
        "A Pygame visualization of the A-Star pathfinding algorithm, demonstrating how it finds the shortest path between two points.",
      tags: ["a star algorithm", "python", "pygame", "pathfinding"],
      href: "https://github.com/Havilash/a-star-algorithm",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/face-recognition",
      title: "Face-Recognition",
      image: "./assets/projects/face-recognition.jpg",
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
      href: "https://github.com/Havilash/face-recognition",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/hand-tracking",
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
      href: "https://github.com/Havilash/hand-tracking",
      repoDocument: "/docs/abstract.pdf",
    },
    {
      repo: "Havilash/conways-game-of-life-pygame",
      title: "Conways-Game-of-Life",
      image: "./assets/projects/conways-game-of-life.png",
      description:
        "A Pygame implementation of Conway’s Game of Life, simulating the evolution of a cellular automaton based on rules.",
      tags: ["conways game of life", "python", "pygame"],
      href: "https://github.com/Havilash/conways-game-of-life-pygame",
      repoDocument: "/docs/abstract.pdf",
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
          {
            title: "Überbetriebliche Kurse (Bbc)",
            document: "report_card_bbc.pdf",
          },
          {
            title: "Berufsfachschule (Gibb)",
            document: "report_card_gibb.pdf",
          },
          { title: "Berufsmaturität (Bwd)", document: "report_card_bwd.pdf" },
          { title: "Sekundarstufe 1", document: "report_card_schule.pdf" },
        ],
      },
      {
        title: "Zertifikat",
        documents: [
          { title: "Abacus", document: "certificate_abacus.pdf" },
          { title: "Violine", document: "certificate_violine.pdf" },
          { title: "Stellwerk-Check", document: "certificate_stellwerk.pdf" },
        ],
      },
    ],
  },
};
