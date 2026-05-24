// Two intertwined tracks that define the portfolio.
// Each strand is rendered as a helix; items appear at evenly-spaced positions
// from bottom (origin) to top (current/future). A "bridge" entry connects two
// nodes across strands to highlight projects that live in both worlds.

export type TrackNode = {
  id: string
  label: string
  detail: string
}

export type Bridge = {
  aiIdx: number
  swIdx: number
  label: string
  detail: string
}

export const aiTrack: TrackNode[] = [
  {
    id: 'ai-foundations',
    label: 'ML Foundations',
    detail: 'Stanford/DeepLearning.AI specialization + linear algebra & probability roots.',
  },
  {
    id: 'ai-pytorch',
    label: 'PyTorch · scikit-learn',
    detail: 'Hands-on deep learning frameworks across vision, sequences, and graphs.',
  },
  {
    id: 'ai-rl',
    label: 'Reinforcement Learning',
    detail: 'University of Alberta RL specialization · maze solvers · driving policies.',
  },
  {
    id: 'ai-gnn',
    label: 'Graph Neural Networks',
    detail: 'Thesis: leveraging GNNs for efficient multi-agent path planning.',
  },
  {
    id: 'ai-tweb',
    label: 'ACM TWEB Publication',
    detail: 'Content Augmented Graph Neural Networks — mitigating GNN over-smoothing.',
  },
  {
    id: 'ai-phd',
    label: 'PhD · Simon Fraser',
    detail: 'Joining SFU Computing Science in May 2026 — research track.',
  },
]

export const softwareTrack: TrackNode[] = [
  {
    id: 'sw-cpp',
    label: 'C / C++ · Algorithms',
    detail: 'Algorithm Design 19.5/20 · low-level systems foundations.',
  },
  {
    id: 'sw-unity',
    label: 'Unity · Game Engines',
    detail: '5+ Unity projects spanning games, digital twins, and simulators.',
  },
  {
    id: 'sw-go',
    label: 'Go · Networking',
    detail: 'Server brokers · real-time messaging · backend infrastructure.',
  },
  {
    id: 'sw-react',
    label: 'React · TypeScript',
    detail: 'Meta React specialization · this portfolio · production frontends.',
  },
  {
    id: 'sw-three',
    label: 'Three.js · 3D Web',
    detail: 'Parametric 3D framework · the table & helix you are exploring now.',
  },
  {
    id: 'sw-systems',
    label: 'Production Systems',
    detail: 'Docker · Kubernetes · PostgreSQL · Redis — full data infrastructure.',
  },
]

// Bridges connect a node on the AI strand to a node on the Software strand,
// representing real work that lives in both worlds.
export const bridges: Bridge[] = [
  {
    aiIdx: 2, // RL
    swIdx: 1, // Unity
    label: 'Mega Maze',
    detail: 'RL agent (AI) inside a Unity 3D environment (Software).',
  },
  {
    aiIdx: 3, // GNN
    swIdx: 1, // Unity
    label: 'AWSIM Autonomous Driving',
    detail: 'Neural perception + Unity-based simulator co-developed with U-Tokyo.',
  },
  {
    aiIdx: 4, // ACM TWEB
    swIdx: 4, // Three.js
    label: 'Open-source GNN tooling',
    detail: 'Published research backed by reusable, engineered systems.',
  },
]
