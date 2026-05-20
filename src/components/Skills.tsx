import SectionHeader from './SectionHeader'
import { skillGroups, certificates, languages } from '../data/skills'

function trackAccent(track: 'ai' | 'software' | 'shared') {
  if (track === 'ai')
    return {
      ring: 'ring-[var(--color-ai)]/30',
      dot: 'bg-[var(--color-ai)]',
      chip: 'bg-[var(--color-ai-soft)] text-cyan-700 dark:text-cyan-300',
    }
  if (track === 'software')
    return {
      ring: 'ring-[var(--color-software)]/30',
      dot: 'bg-[var(--color-software)]',
      chip: 'bg-[var(--color-software-soft)] text-emerald-700 dark:text-emerald-300',
    }
  return {
    ring: 'ring-accent/30',
    dot: 'bg-accent',
    chip: 'bg-accent-soft text-accent',
  }
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SectionHeader
        eyebrow="Skills"
        title="The toolkit."
        subtitle="Tools I reach for daily, organized by track. Shared infrastructure underpins both."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((group) => {
          const accent = trackAccent(group.track)
          return (
            <article
              key={group.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${accent.chip}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                {group.title}
              </span>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
            Certificates
          </h3>
          <ul className="space-y-2">
            {certificates.map((c) => (
              <li
                key={c.title}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900/40"
              >
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-neutral-900 hover:text-accent dark:text-neutral-100"
                >
                  {c.title}
                </a>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                  {c.issuer}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
            Languages
          </h3>
          <ul className="space-y-2">
            {languages.map((l) => (
              <li
                key={l.name}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900/40"
              >
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {l.name}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                  {l.level}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Skills
