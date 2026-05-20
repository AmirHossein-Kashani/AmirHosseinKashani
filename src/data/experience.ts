export type Experience = {
  role: string
  org: string
  period: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Game Engine Developer & Data Scientist (RA)',
    org: 'Amirkabir University of Technology  ×  University of Tokyo',
    period: 'Sep 2023 — 2026',
    description: [
      'Joint research collaboration between AUT and the University of Tokyo.',
      'Lead development and research on open-source simulation of autonomous buses on top of AWSIM (Autoware-compatible driving simulator).',
    ],
  },
  {
    role: 'Unity Developer (Freelance)',
    org: 'Independent',
    period: '2019 — 2021',
    description: [
      'Designed and shipped multiple Unity 2D/3D projects spanning games, digital twins, and interactive simulations.',
    ],
  },
]

export type Teaching = {
  role: string
  period: string
}

export const teaching: Teaching[] = [
  {
    role: 'Instructor — Advanced Programming Workshops (Java)',
    period: 'Spring 2022, Spring 2023',
  },
  { role: 'Instructor — Operating Systems Lab', period: 'Fall 2022' },
  {
    role: 'TA — Big Data, Complex Networks, Machine Learning',
    period: 'Fall & Spring 2023',
  },
]
