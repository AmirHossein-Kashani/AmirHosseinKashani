import { projects } from './projects'
import { publications } from './publications'
import { experiences } from './experience'
import { education } from './education'
import { skillGroups } from './skills'

export type ExplorerSectionId =
  | 'projects'
  | 'education'
  | 'publications'
  | 'experiences'
  | 'skills'

export type ExplorerSection = {
  id: ExplorerSectionId
  label: string
  accent: string
}

export type ExplorerCard = {
  id: string
  section: ExplorerSectionId
  title: string
  meta?: string
  body: string[]
  tags?: string[]
  image?: string
  links?: { label: string; href: string }[]
}

export const explorerSections: ExplorerSection[] = [
  { id: 'projects', label: 'Projects', accent: 'var(--color-software)' },
  { id: 'education', label: 'Education', accent: 'var(--color-ai)' },
  { id: 'publications', label: 'Publications', accent: 'var(--color-ai)' },
  { id: 'experiences', label: 'Experiences', accent: 'var(--color-software)' },
  { id: 'skills', label: 'Skills', accent: '#a78bfa' },
]

export const explorerCards: ExplorerCard[] = [
  ...projects.map<ExplorerCard>((p) => ({
    id: `project-${p.id}`,
    section: 'projects',
    title: p.title,
    meta: p.year,
    body: p.highlights?.length ? [p.blurb, ...p.highlights] : [p.blurb],
    tags: p.tags,
    image: p.image,
    links: p.links,
  })),
  ...education.map<ExplorerCard>((e, i) => ({
    id: `edu-${i}`,
    section: 'education',
    title: e.degree,
    meta: `${e.school} · ${e.period}`,
    body: e.details,
    links: e.href ? [{ label: e.school, href: e.href }] : undefined,
  })),
  ...publications.map<ExplorerCard>((p, i) => ({
    id: `pub-${i}`,
    section: 'publications',
    title: p.title,
    meta: `${p.venue} · ${p.date}`,
    body: [p.summary],
    image: p.image,
    links: p.links,
  })),
  ...experiences.map<ExplorerCard>((x, i) => ({
    id: `exp-${i}`,
    section: 'experiences',
    title: x.role,
    meta: `${x.org} · ${x.period}`,
    body: x.description,
  })),
  ...skillGroups.map<ExplorerCard>((g) => ({
    id: `skill-${g.title}`,
    section: 'skills',
    title: g.title,
    meta: g.track === 'ai' ? 'AI / Research' : g.track === 'software' ? 'Software / Engineering' : 'Shared',
    body: [],
    tags: g.items,
  })),
]
