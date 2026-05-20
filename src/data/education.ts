export type Education = {
  degree: string
  school: string
  period: string
  details: string[]
  href?: string
}

export const education: Education[] = [
  {
    degree: 'PhD Candidate, Computer Science',
    school: 'Simon Fraser University (SFU)',
    period: 'May 2026 — Present',
    href: 'https://www.sfu.ca/computing.html',
    details: ['PhD candidate in Computer Science — started May 2026.'],
  },
  {
    degree: 'M.Sc. Computer Engineering (Software)',
    school: 'Amirkabir University of Technology (AUT)',
    period: 'Sep 2021 — Aug 2024',
    href: 'https://aut.ac.ir/en',
    details: [
      'GPA 18.00 / 20  (3.88 / 4.00) — Ranked 3rd in the Software MSc program.',
      'Supervisor: Dr. Mostafa Haghir Chehreghani.',
      'Thesis proposal: Leveraging Graph Neural Networks for Efficient Multi-Agent Path Planning.',
      'Selected courses: Advanced Databases 20/20 · Advanced Algorithms 19/20 · Machine Learning 18.1/20 · Deep Learning 17/20 · Complex Networks 18.4/20.',
      'AUT ranked 3rd in Iran and 403rd globally (QS World University Rankings).',
    ],
  },
  {
    degree: 'B.Sc. Computer Engineering',
    school: 'Amirkabir University of Technology (AUT)',
    period: 'Sep 2017 — Sep 2021',
    href: 'https://aut.ac.ir/en',
    details: [
      'GPA 18.27 / 20  (3.85 / 4.00) — Top 10% of class.',
      'Supervisor: Dr. Alireza Bagheri.',
      'Selected courses: Probability & Statistics 20/20 · AI 20/20 · IoT 19.75/20 · Algorithm Design 19.5/20 · Information Retrieval 17.15/20.',
    ],
  },
]

export const honors = [
  'Ranked 3rd in the Software MSc program at Amirkabir University of Technology.',
  'Top 0.5% in Iran’s national university entrance exam (Konkour) — 137,000+ participants.',
  'Directly admitted to MSc as an outstanding BSc student at Amirkabir University of Technology.',
  'Top 10% of class in BSc Computer Engineering.',
]
