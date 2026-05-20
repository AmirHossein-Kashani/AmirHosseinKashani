export type Track = 'ai' | 'software'

export type Project = {
  id: string
  title: string
  year: string
  track: Track
  tags: string[]
  blurb: string
  image: string
  imageFit?: 'cover' | 'contain'
  video?: string
  videoStart?: number
  highlights?: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'fjsp',
    title: 'Flexible Job Shop Scheduling (FJSP)',
    year: '2025',
    track: 'ai',
    tags: ['Python', 'Machine Learning', 'Optimization'],
    blurb:
      'Hybrid learning-based and algorithmic methods for the flexible job shop scheduling problem — improving operational efficiency and throughput.',
    image: '/projects/fjsp.gif',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/amkkashani/FJSP-Flexible-Job-Shop-Problem-',
      },
    ],
  },
  {
    id: 'reaction-time',
    title: 'Learning Reaction Time from Eye Movement',
    year: '2025',
    track: 'ai',
    tags: ['Python', 'Sequential Models', 'HCI'],
    blurb:
      'Machine learning approach for predicting human reaction time from ocular features. A sequential model captures temporal eye dynamics to estimate awareness-related response latency.',
    image: '/projects/reaction-time.svg',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/amkkashani/Learning-Reaction-Time',
      },
    ],
  },
  {
    id: 'awsim',
    title: 'Autonomous Driving Simulation (AWSIM extension)',
    year: '2023 – 2025',
    track: 'ai',
    tags: ['Unity 3D', 'Autoware', 'ROS', 'V2X'],
    blurb:
      'Extension of the AWSIM open-source simulator for autonomous buses — focused on blind-spot detection and autonomous-vehicle safety analysis. Collaboration between Amirkabir University and University of Tokyo.',
    image: '/projects/awsim.png',
    video: '/projects/awsim.mp4',
    links: [
      {
        label: 'Project Page',
        href: 'https://tlab-wide.github.io/V2X_E2E_Simulator/',
      },
    ],
  },
  {
    id: 'mega-maze',
    title: 'Mega Maze — RL Maze Solver & Difficulty Ranker',
    year: '2021',
    track: 'ai',
    tags: ['Unity 3D', 'Reinforcement Learning'],
    blurb:
      'An RL-based agent that evaluates whether complex hand-designed mazes are solvable, and ranks them by difficulty.',
    image: '/projects/mega-maze.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/amkkashani/Mega_Maze' },
    ],
  },
  {
    id: 'parametric-3d',
    title: 'Parametric 3D Model Framework',
    year: '2025',
    track: 'software',
    tags: ['Three.js', 'TypeScript', '3D'],
    blurb:
      'A framework that converts static 3D models into parametric models via a standardized naming convention — accessible from a live web viewer.',
    image: '/projects/parametric-3d.svg',
    links: [{ label: 'Live Demo', href: 'http://46.62.161.208:8080/' }],
  },
  {
    id: 'crane-twin',
    title: 'Crane Digital Twin',
    year: '2021',
    track: 'software',
    tags: ['Unity 3D', 'Go', 'Android', 'GPS'],
    blurb:
      'Android app delivering real-time crane status and construction progress using GPS-based tracking — enhancing on-site safety with clear head-of-crane visualization. Unity client; Go broker on the server.',
    image: '/projects/crane-twin.svg',
    links: [
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/watch?v=lSZYTlapj-cs',
      },
    ],
  },
  {
    id: 'backgammon-3d',
    title: 'Backgammon 3D',
    year: '2020',
    track: 'software',
    tags: ['Unity 3D', 'Photon', 'AI', 'Networking'],
    blurb:
      '3D backgammon game with an AI opponent and online multiplayer over Photon. Led the networking systems and team coordination.',
    image: '/projects/backgammon3d.svg',
    video: '/projects/backgammon3d.mp4',
    links: [
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/watch?v=54Xh9yhKRNs',
      },
    ],
  },
  {
    id: 'hit-the-germs',
    title: 'Hit the Germs — 2D Educational Game',
    year: '2021',
    track: 'software',
    tags: ['Unity 2D', 'Game Design'],
    blurb:
      'A fun 2D adventure game for kids about health-care and viruses — game programming and level design.',
    image: '/projects/hit-the-germs.svg',
    video: '/projects/hit-the-germs.mp4',
    videoStart: 20,
    links: [
      {
        label: 'Build (Drive)',
        href: 'https://drive.google.com/file/d/1h3uVZuH1RdJ90OG9J6FGelRRBw18frOY/view?usp=sharing',
      },
    ],
  },
]
