export type SkillGroup = {
  title: string
  track: 'ai' | 'software' | 'shared'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI / ML Stack',
    track: 'ai',
    items: [
      'PyTorch',
      'PyTorch Geometric',
      'TensorFlow',
      'scikit-learn',
      'Python',
      'Reinforcement Learning',
      'Graph Neural Networks',
      'Computer Vision',
    ],
  },
  {
    title: 'Software & Game Engines',
    track: 'software',
    items: [
      'Unity (C#)',
      'Three.js',
      'React',
      'TypeScript / JavaScript',
      'Java',
      'Go',
      'C / C++',
      'ROS',
    ],
  },
  {
    title: 'Data & Infrastructure',
    track: 'shared',
    items: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Cassandra',
      'Docker',
      'Kubernetes',
      'Git',
    ],
  },
]

export const certificates = [
  {
    title:
      'Supervised ML, Advanced Learning Algorithms, Unsupervised Learning & Recommenders, Reinforcement Learning',
    issuer: 'DeepLearning.AI / Stanford — Coursera',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CAZNWZN626RA',
  },
  {
    title: 'Fundamentals of Reinforcement Learning',
    issuer: 'University of Alberta — Coursera',
    href: 'https://www.coursera.org/account/accomplishments/certificate/XWK9ZGZBPAZ5',
  },
  {
    title: 'Advanced React',
    issuer: 'Meta — Coursera',
    href: 'https://www.coursera.org/account/accomplishments/certificate/KM7R2GD9ZNCN',
  },
  {
    title: 'React Basics',
    issuer: 'Meta — Coursera',
    href: 'https://www.coursera.org/account/accomplishments/certificate/Q8T2QSN8DUY6',
  },
]

export const languages = [
  { name: 'Persian (Farsi)', level: 'Native' },
  {
    name: 'English',
    level: 'IELTS 7.0 (R 7 · L 7 · S 6.5 · W 6.5) — Nov 2024',
  },
]
