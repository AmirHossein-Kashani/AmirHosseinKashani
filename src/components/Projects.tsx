import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { projects, type Project, type Track } from '../data/projects'
import { asset } from '../utils/asset'

type Filter = Track | 'all'

const filters: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: projects.length },
  { id: 'ai', label: 'AI / Research', count: projects.filter((p) => p.track === 'ai').length },
  {
    id: 'software',
    label: 'Software / Engineering',
    count: projects.filter((p) => p.track === 'software').length,
  },
]

function trackStyles(track: Track) {
  if (track === 'ai') {
    return {
      label: 'AI · Research',
      dot: 'bg-[var(--color-ai)]',
      chip: 'bg-[var(--color-ai-soft)] text-cyan-700 dark:text-cyan-300',
      border: 'hover:border-[var(--color-ai)]/60',
      ring: 'group-hover:ring-[var(--color-ai)]/40',
    }
  }
  return {
    label: 'Software · Engineering',
    dot: 'bg-[var(--color-software)]',
    chip: 'bg-[var(--color-software-soft)] text-emerald-700 dark:text-emerald-300',
    border: 'hover:border-[var(--color-software)]/60',
    ring: 'group-hover:ring-[var(--color-software)]/40',
  }
}

function Projects() {
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail
      const proj = projects.find((p) => p.id === detail?.id)
      if (!proj) return
      setFilter((prev) => (prev === 'all' || prev === proj.track ? prev : 'all'))
    }
    window.addEventListener('galaxy-reveal-project', handler as EventListener)
    return () => window.removeEventListener('galaxy-reveal-project', handler as EventListener)
  }, [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.track === filter)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SectionHeader
        eyebrow="Projects"
        title="Two tracks, one engineer."
        subtitle="Filter between AI/Research projects and Software/Engineering work. Every card links to the code, paper, or live build."
      />

      <div className="mb-8 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                active
                  ? 'inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900'
                  : 'inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300 dark:hover:border-neutral-600'
              }
            >
              {f.id === 'ai' && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ai)]" />}
              {f.id === 'software' && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-software)]" />
              )}
              {f.label}
              <span
                className={
                  active
                    ? 'rounded-full bg-white/20 px-1.5 text-xs dark:bg-neutral-900/20'
                    : 'rounded-full bg-neutral-100 px-1.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                }
              >
                {f.count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const styles = trackStyles(project.track)
  return (
    <article
      id={`project-${project.id}`}
      className={`group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/40 ${styles.border}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
        {project.video ? (
          <video
            src={`${asset(project.video)}#t=${project.videoStart ?? 0}`}
            poster={asset(project.image)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              const start = project.videoStart ?? 0
              if (start > 0) e.currentTarget.currentTime = start
            }}
            onTimeUpdate={(e) => {
              const start = project.videoStart ?? 0
              if (start > 0 && e.currentTarget.currentTime < start - 0.5) {
                e.currentTarget.currentTime = start
              }
            }}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={asset(project.image)}
            alt={`${project.title} preview`}
            loading="lazy"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
              project.imageFit === 'contain'
                ? 'object-contain p-3'
                : 'object-cover'
            }`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${styles.chip}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {styles.label}
          </span>
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.blurb}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800/60">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 underline-offset-4 hover:text-accent hover:underline dark:text-neutral-300"
            >
              {link.label}
              <span aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Projects
