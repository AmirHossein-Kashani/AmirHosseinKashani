import SectionHeader from './SectionHeader'
import { publications } from '../data/publications'
import { asset } from '../utils/asset'

function Publications() {
  return (
    <section
      id="publications"
      className="border-y border-neutral-200/70 bg-neutral-50/60 py-20 md:py-28 dark:border-neutral-800/70 dark:bg-neutral-900/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Publications"
          title="Peer-reviewed research."
        />

        <ul className="space-y-6">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              id={`publication-${i}`}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
                {pub.image && (
                  <div className="relative flex items-center justify-center border-b border-neutral-200 bg-gradient-to-br from-white to-neutral-100 p-6 md:border-r md:border-b-0 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
                    <img
                      src={asset(pub.image)}
                      alt={`${pub.title} figure`}
                      loading="lazy"
                      className="max-h-40 w-full object-contain"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {pub.title}
                    </h3>
                    <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
                      {pub.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {pub.venue}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {pub.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800/60">
                    {pub.links.map((link) => (
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Publications
