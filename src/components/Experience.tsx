import SectionHeader from './SectionHeader'
import { experiences, teaching } from '../data/experience'

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SectionHeader eyebrow="Experience" title="Where I've built things." />

      <ol className="relative space-y-8 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {experiences.map((exp) => (
          <li key={exp.role} className="relative">
            <span className="absolute -left-[27px] mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-2 ring-accent dark:bg-neutral-950" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {exp.role}
              </h3>
              <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
                {exp.period}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">{exp.org}</p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {exp.description.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
          Teaching
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {teaching.map((t) => (
            <li
              key={t.role}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {t.role}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                {t.period}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Experience
