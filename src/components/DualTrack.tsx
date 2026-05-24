import { Suspense, lazy, useMemo, useState } from 'react'
import SectionHeader from './SectionHeader'
import { aiTrack, bridges, softwareTrack } from '../data/dualTrack'

const DualTrackHelix = lazy(() => import('./explorer/DualTrackHelix'))

function DualTrack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const hoveredDetail = useMemo(() => {
    if (!hoveredId) return null
    const ai = aiTrack.find((n) => n.id === hoveredId)
    if (ai) return { kind: 'ai' as const, label: ai.label, detail: ai.detail }
    const sw = softwareTrack.find((n) => n.id === hoveredId)
    if (sw) return { kind: 'sw' as const, label: sw.label, detail: sw.detail }
    const bridge = bridges.find(
      (b) => `bridge-${b.aiIdx}-${b.swIdx}` === hoveredId,
    )
    if (bridge) return { kind: 'bridge' as const, label: bridge.label, detail: bridge.detail }
    return null
  }, [hoveredId])

  return (
    <section
      id="dual-track"
      className="relative overflow-hidden border-y border-neutral-200/70 bg-white py-20 md:py-28 dark:border-neutral-800/70 dark:bg-neutral-950"
    >
      {/* Deep-space gradient overlay so the canvas blends into the page */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.08), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.06), transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Two intertwined paths"
          title="Research and engineering — one helix."
          subtitle="Two strands rise side by side: AI/Research in cyan, Software/Engineering in green. Amber bridges mark the projects that live in both worlds. Hover a node to learn more — drag to rotate the structure."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,2fr)_1fr]">
          {/* AI strand legend */}
          <div className="order-2 lg:order-1">
            <TrackLegend
              title="AI · Research"
              color="#22d3ee"
              items={aiTrack}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          </div>

          {/* 3D Canvas */}
          <div className="order-1 lg:order-2">
            <div
              className="relative h-[460px] overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl md:h-[600px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, #0d1024 0%, #05060f 70%)',
              }}
            >
              <Suspense
                fallback={
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-neutral-400">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-cyan-300" />
                    Spinning up the helix…
                  </div>
                }
              >
                <DualTrackHelix hoveredId={hoveredId} onHover={setHoveredId} />
              </Suspense>

              {/* Hover info panel — floats over the canvas */}
              <div
                className="pointer-events-none absolute top-3 left-1/2 max-w-md -translate-x-1/2 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-center backdrop-blur transition-opacity duration-200"
                style={{ opacity: hoveredDetail ? 1 : 0 }}
              >
                {hoveredDetail && (
                  <>
                    <div
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{
                        color:
                          hoveredDetail.kind === 'ai'
                            ? '#22d3ee'
                            : hoveredDetail.kind === 'sw'
                              ? '#22c55e'
                              : '#f59e0b',
                      }}
                    >
                      {hoveredDetail.kind === 'ai'
                        ? 'AI · Research'
                        : hoveredDetail.kind === 'sw'
                          ? 'Software · Engineering'
                          : 'Bridge — both worlds'}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-white">
                      {hoveredDetail.label}
                    </div>
                    <div className="mt-1 text-xs text-neutral-300">
                      {hoveredDetail.detail}
                    </div>
                  </>
                )}
              </div>

              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-300 backdrop-blur">
                Drag to rotate · hover a node
              </div>
            </div>
          </div>

          {/* Software strand legend */}
          <div className="order-3">
            <TrackLegend
              title="Software · Engineering"
              color="#22c55e"
              items={softwareTrack}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          </div>
        </div>

        {/* Bridge legend */}
        {bridges.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
              ⇄ Bridges:
            </span>
            {bridges.map((b) => {
              const id = `bridge-${b.aiIdx}-${b.swIdx}`
              const isHover = hoveredId === id
              return (
                <button
                  key={id}
                  type="button"
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ' +
                    (isHover
                      ? 'border-amber-400/60 bg-amber-400/10 text-amber-600 dark:text-amber-300'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-amber-400/40 hover:text-amber-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-amber-300')
                  }
                >
                  {b.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function TrackLegend({
  title,
  color,
  items,
  hoveredId,
  onHover,
}: {
  title: string
  color: string
  items: { id: string; label: string; detail: string }[]
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="mb-4 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color }}
        >
          {title}
        </p>
      </div>
      <ul className="space-y-1.5">
        {items.map((node) => {
          const isHover = hoveredId === node.id
          return (
            <li key={node.id}>
              <button
                type="button"
                onMouseEnter={() => onHover(node.id)}
                onMouseLeave={() => onHover(null)}
                className={
                  'block w-full rounded-lg border px-3 py-2 text-left text-sm transition-all ' +
                  (isHover
                    ? 'translate-x-0.5 border-transparent text-neutral-900 shadow-sm dark:text-white'
                    : 'border-transparent text-neutral-700 hover:translate-x-0.5 dark:text-neutral-300')
                }
                style={
                  isHover
                    ? {
                        background: `${color}1a`,
                        borderColor: `${color}55`,
                      }
                    : undefined
                }
              >
                <span className="font-medium">{node.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DualTrack
