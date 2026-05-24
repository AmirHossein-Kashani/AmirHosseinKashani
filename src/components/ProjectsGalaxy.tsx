import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { Billboard, Float, OrbitControls, Stars, Text } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import SectionHeader from './SectionHeader'
import { projects } from '../data/projects'
import { publications } from '../data/publications'

type GalaxyTrack = 'ai' | 'software' | 'research'

type GalaxyItem = {
  id: string
  title: string
  year: string
  track: GalaxyTrack
  scrollTargetId: string
  blurb: string
  meta: string
  tags: string[]
  primaryLink?: { label: string; href: string }
  projectRefId?: string
}

const items: GalaxyItem[] = [
  ...projects.map<GalaxyItem>((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    year: p.year,
    track: p.track,
    scrollTargetId: `project-${p.id}`,
    blurb: p.blurb,
    meta: p.track === 'ai' ? 'AI · Research' : 'Software · Engineering',
    tags: p.tags,
    primaryLink: p.links[0],
    projectRefId: p.id,
  })),
  ...publications.map<GalaxyItem>((pub, i) => ({
    id: `publication-${i}`,
    title: pub.title,
    year: pub.date.split(' ').pop() ?? pub.date,
    track: 'research',
    scrollTargetId: `publication-${i}`,
    blurb: pub.summary,
    meta: `Paper · ${pub.venue}`,
    tags: [pub.venue],
    primaryLink: pub.links[0],
  })),
]

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const out: [number, number, number][] = []
  const phi = Math.PI * (Math.sqrt(5) - 1)
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    out.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return out
}

const trackColor = (t: GalaxyTrack) =>
  t === 'ai' ? '#22d3ee' : t === 'software' ? '#34d399' : '#a78bfa'

function focusTarget(targetId: string) {
  const attempt = (n: number) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.remove('galaxy-flash')
      void el.offsetWidth
      el.classList.add('galaxy-flash')
      window.setTimeout(() => el.classList.remove('galaxy-flash'), 1900)
    } else if (n < 6) {
      window.setTimeout(() => attempt(n + 1), 90)
    }
  }
  attempt(0)
}

type NodeProps = {
  item: GalaxyItem
  position: [number, number, number]
  isActive: boolean
  onSelect: (item: GalaxyItem) => void
}

function ItemNode({ item, position, isActive, onSelect }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const color = trackColor(item.track)
  const isResearch = item.track === 'research'
  const highlighted = hovered || isActive

  useFrame((_, delta) => {
    if (meshRef.current) {
      const target = highlighted ? 1.55 : 1
      const k = Math.min(1, delta * 6)
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), k)
      meshRef.current.rotation.x += delta * 0.35
      meshRef.current.rotation.y += delta * 0.5
    }
    if (haloRef.current) {
      const target = highlighted ? 1.9 : 1.35
      haloRef.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        Math.min(1, delta * 5),
      )
      const mat = haloRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        highlighted ? 0.4 : 0.12,
        Math.min(1, delta * 5),
      )
    }
  })

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }
  const onOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(item)
  }

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group position={position} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
        <mesh ref={haloRef}>
          <sphereGeometry args={[0.36, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
        </mesh>
        <mesh ref={meshRef}>
          {isResearch ? (
            <octahedronGeometry args={[0.36, 0]} />
          ) : (
            <icosahedronGeometry args={[0.32, 1]} />
          )}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={highlighted ? 2.6 : 1.2}
            metalness={0.35}
            roughness={0.18}
          />
        </mesh>

        <Billboard position={[0, 0.82, 0]}>
          <Text
            fontSize={highlighted ? 0.22 : 0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.6}
            textAlign="center"
            outlineWidth={0.012}
            outlineColor="#000000"
            outlineOpacity={0.7}
          >
            {item.title}
          </Text>
        </Billboard>
        <Billboard position={[0, -0.62, 0]}>
          <Text
            fontSize={0.1}
            color={color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.006}
            outlineColor="#000000"
            outlineOpacity={0.5}
          >
            {isResearch ? `Paper · ${item.year}` : item.year}
          </Text>
        </Billboard>
      </group>
    </Float>
  )
}

function GalaxyScene({
  activeId,
  onSelect,
}: {
  activeId: string | null
  onSelect: (item: GalaxyItem) => void
}) {
  const positions = useMemo(() => fibonacciSphere(items.length, 3.4), [])
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[8, 8, 8]} intensity={1.5} />
      <pointLight position={[-8, -4, -6]} intensity={0.55} color="#a78bfa" />
      <Stars radius={60} depth={50} count={1200} factor={4} saturation={0} fade speed={0.5} />
      {items.map((item, i) => (
        <ItemNode
          key={item.id}
          item={item}
          position={positions[i]}
          isActive={activeId === item.id}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

function ProjectsGalaxy() {
  const [active, setActive] = useState<GalaxyItem | null>(null)
  const [visible, setVisible] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = stageRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.01 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const viewFullDetails = () => {
    if (!active) return
    if (active.projectRefId) {
      window.dispatchEvent(
        new CustomEvent('galaxy-reveal-project', { detail: { id: active.projectRefId } }),
      )
    }
    focusTarget(active.scrollTargetId)
  }

  return (
    <section
      id="galaxy"
      className="relative overflow-hidden border-y border-neutral-800/60 bg-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--color-software-soft)] opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <SectionHeader
          eyebrow="Explore in 3D"
          title="Project Galaxy"
          subtitle="Every project and paper as a floating world in space. Drag to orbit, hover to highlight, click a node to peek — then jump to its full details below."
        />
      </div>

      <div ref={stageRef} className="relative h-[640px] w-full select-none">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8.5], fov: 55 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          frameloop={visible ? 'always' : 'never'}
          onPointerMissed={() => setActive(null)}
        >
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 9, 22]} />
          <Suspense fallback={null}>
            <GalaxyScene activeId={active?.id ?? null} onSelect={setActive} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.35} intensity={0.9} radius={0.6} />
            </EffectComposer>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.45}
              minPolarAngle={Math.PI / 3.2}
              maxPolarAngle={Math.PI * 0.66}
              rotateSpeed={0.55}
            />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute top-4 left-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-wide text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ai)]" /> AI · Research
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-software)]" /> Software
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> Paper
          </span>
        </div>
        <div className="pointer-events-none absolute top-4 right-6 text-[11px] tracking-wide text-neutral-500">
          drag to orbit · click a node
        </div>

        {active && (
          <div className="absolute inset-x-4 bottom-4 max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/85 p-5 backdrop-blur md:inset-x-auto md:right-8 md:bottom-8 md:w-[22rem]">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: trackColor(active.track) }}
              />
              <span className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
                {active.meta}
              </span>
              <span className="ml-auto text-[11px] text-neutral-500">{active.year}</span>
            </div>
            <h3 className="text-lg leading-tight font-semibold text-neutral-50">{active.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{active.blurb}</p>
            {active.track !== 'research' && active.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {active.tags.slice(0, 4).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-neutral-800/70 px-2 py-0.5 text-[11px] text-neutral-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={viewFullDetails}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                View full details
                <span aria-hidden>↓</span>
              </button>
              {active.primaryLink && (
                <a
                  href={active.primaryLink.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-neutral-100"
                >
                  {active.primaryLink.label}
                  <span aria-hidden>↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="ml-auto text-xs text-neutral-400 transition-colors hover:text-neutral-200"
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsGalaxy
