import type { ExplorerCard } from '../../data/explorer'
import { asset } from '../../utils/asset'

type Props = {
  card: ExplorerCard | null
}

function ExplorerDetail({ card }: Props) {
  if (!card) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Pick a section and click a card on the table to see its details here.
        </p>
      </div>
    )
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/60">
      {card.image && (
        <div className="mb-5 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
          <img
            src={asset(card.image)}
            alt={card.title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        {card.section}
      </p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        {card.title}
      </h3>
      {card.meta && (
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {card.meta}
        </p>
      )}

      {card.body.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {card.body.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      {card.tags && card.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {card.links && card.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {card.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-800 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-500"
            >
              {l.label} →
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default ExplorerDetail
