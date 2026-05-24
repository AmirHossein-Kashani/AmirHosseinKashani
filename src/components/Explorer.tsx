import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import ExplorerDetail from './explorer/ExplorerDetail'
import {
  explorerCards,
  explorerSections,
  type ExplorerSectionId,
} from '../data/explorer'

const CoverflowCarousel = lazy(() => import('./explorer/CoverflowCarousel'))

const SECTION_ACCENT: Record<ExplorerSectionId, string> = {
  projects: '#22c55e',
  education: '#60a5fa',
  publications: '#38bdf8',
  experiences: '#f59e0b',
  skills: '#a78bfa',
}

function Explorer() {
  const [activeSection, setActiveSection] = useState<ExplorerSectionId>('projects')
  const [selectedIndexBySection, setSelectedIndexBySection] = useState<
    Record<ExplorerSectionId, number>
  >({
    projects: 0,
    education: 0,
    publications: 0,
    experiences: 0,
    skills: 0,
  })

  const cardsInSection = useMemo(
    () => explorerCards.filter((c) => c.section === activeSection),
    [activeSection],
  )
  const selectedIndex = selectedIndexBySection[activeSection]
  const selectedCard = cardsInSection[selectedIndex] ?? null
  const total = cardsInSection.length

  const setIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(total - 1, i))
    setSelectedIndexBySection((prev) => ({ ...prev, [activeSection]: clamped }))
  }

  const next = () => setIndex(selectedIndex + 1)
  const prev = () => setIndex(selectedIndex - 1)

  const handleSelectSection = (id: ExplorerSectionId) => {
    setActiveSection(id)
  }

  // Keyboard nav — only when the section is on-screen
  const sectionRef = useRef<HTMLElement>(null)
  const visibleRef = useRef(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visibleRef.current) return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'))
        return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex(selectedIndex - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setIndex(selectedIndex + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, total, activeSection])

  // Mouse-wheel horizontal scroll = navigate
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    let acc = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      acc += delta
      if (Math.abs(acc) > 60) {
        setIndex(selectedIndex + Math.sign(acc))
        acc = 0
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, total, activeSection])

  const accent = SECTION_ACCENT[activeSection]
  const cardCounts = useMemo(() => {
    const counts = {} as Record<ExplorerSectionId, number>
    for (const s of explorerSections) {
      counts[s.id] = explorerCards.filter((c) => c.section === s.id).length
    }
    return counts
  }, [])

  return (
    <section
      ref={sectionRef}
      id="explorer"
      className="relative overflow-hidden border-y border-neutral-200/70 bg-neutral-50/60 py-20 md:py-28 dark:border-neutral-800/70 dark:bg-neutral-900/30"
    >
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[var(--color-ai-soft)] blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[var(--color-software-soft)] blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Interactive"
          title="Flip through the deck."
          subtitle="Pick a section and scrub the carousel — use the arrows, the keyboard, or click any side card to bring it to the front."
        />

        {/* Section tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {explorerSections.map((s) => {
            const isActive = s.id === activeSection
            const c = SECTION_ACCENT[s.id]
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSection(s.id)}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${c}, ${c}dd)`,
                        borderColor: 'transparent',
                        color: '#0a0a0a',
                        boxShadow: `0 8px 24px -8px ${c}66`,
                      }
                    : undefined
                }
                className={
                  'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ' +
                  (isActive
                    ? ''
                    : 'border-neutral-300 bg-white text-neutral-700 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-500')
                }
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: isActive ? '#0a0a0a' : c,
                    opacity: isActive ? 0.5 : 1,
                  }}
                />
                {s.label}
                <span
                  className={
                    'ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide ' +
                    (isActive
                      ? 'bg-black/15 text-neutral-900'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400')
                  }
                >
                  {cardCounts[s.id]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Carousel canvas + nav */}
        <div
          ref={canvasWrapRef}
          className="relative h-[440px] overflow-hidden rounded-2xl border border-neutral-200 shadow-2xl md:h-[520px] dark:border-neutral-800"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, #1a1d2e 0%, #070912 75%)',
          }}
        >
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-neutral-400">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-300" />
                Loading the carousel…
              </div>
            }
          >
            <CoverflowCarousel
              section={activeSection}
              selectedIndex={selectedIndex}
              onSelectIndex={setIndex}
            />
          </Suspense>

          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={selectedIndex === 0}
            aria-label="Previous"
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur transition-all hover:scale-110 hover:bg-black/60 disabled:opacity-30 disabled:hover:scale-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            disabled={selectedIndex >= total - 1}
            aria-label="Next"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur transition-all hover:scale-110 hover:bg-black/60 disabled:opacity-30 disabled:hover:scale-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Counter + progress dots */}
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-200 backdrop-blur">
            <span style={{ color: accent }}>{selectedIndex + 1}</span>
            <span className="opacity-60"> / {total}</span>
          </div>

          {/* Dot navigation */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {cardsInSection.map((_, i) => {
              const isActiveDot = i === selectedIndex
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to card ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: isActiveDot ? 24 : 8,
                    height: 8,
                    background: isActiveDot ? accent : 'rgba(255,255,255,0.3)',
                  }}
                />
              )
            })}
          </div>

          {/* Hint */}
          <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-300 backdrop-blur">
            ← scroll, arrows, or click →
          </div>
        </div>

        {/* Detail panel below the carousel */}
        <div className="mt-6">
          <ExplorerDetail card={selectedCard} />
        </div>
      </div>
    </section>
  )
}

export default Explorer
