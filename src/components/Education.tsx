import SectionHeader from './SectionHeader'
import { education, honors } from '../data/education'

function Education() {
  return (
    <section
      id="education"
      className="border-y border-neutral-200/70 bg-neutral-50/60 py-20 md:py-28 dark:border-neutral-800/70 dark:bg-neutral-900/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Education" title="Academic background." />

        <div className="grid gap-5">
          {education.map((edu, idx) => (
            <article
              key={edu.degree + edu.school}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {edu.degree}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">
                    {edu.href ? (
                      <a
                        href={edu.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:underline"
                      >
                        {edu.school}
                      </a>
                    ) : (
                      edu.school
                    )}
                  </p>
                </div>
                <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
                  {edu.period}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {edu.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {idx === 0 && (
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Current
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
            Honors & Awards
          </h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {honors.map((honor) => (
              <li
                key={honor}
                className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300"
              >
                <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[var(--color-ai)] to-[var(--color-software)]" />
                {honor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Education
