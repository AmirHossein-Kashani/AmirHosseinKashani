export type Publication = {
  title: string
  venue: string
  date: string
  summary: string
  image?: string
  links: { label: string; href: string }[]
}

export const publications: Publication[] = [
  {
    title: 'Content Augmented Graph Neural Networks',
    venue: 'ACM Transactions on the Web (TWEB)',
    date: 'October 2024',
    summary:
      'Introduced an encoder used as a skip connection to mitigate over-smoothing and preserve initial features in graph neural networks — two well-known limitations of message-passing GNNs.',
    image: '/projects/augs-gnn.png',
    links: [
      { label: 'ACM', href: 'https://dl.acm.org/doi/abs/10.1145/3700790' },
      { label: 'GitHub', href: 'https://github.com/amkkashani/AugS-GNN' },
    ],
  },
]
