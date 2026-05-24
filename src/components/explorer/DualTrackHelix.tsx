import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { aiTrack, bridges, softwareTrack, type TrackNode } from '../../data/dualTrack'

type Props = {
  hoveredId: string | null
  onHover: (id: string | null) => void
}

const HELIX_HEIGHT = 6
const HELIX_RADIUS = 1.4
const HELIX_TURNS = 2
const TUBE_SEGMENTS = 200
const TUBE_RADIUS = 0.045

const AI_COLOR = '#22d3ee' // cyan
const SW_COLOR = '#22c55e' // green
const BRIDGE_COLOR = '#f59e0b' // amber
const CORE_COLOR_A = '#22d3ee'
const CORE_COLOR_B = '#22c55e'

// Phase offset puts the two strands on opposite sides of the helix.
const AI_PHASE = 0
const SW_PHASE = Math.PI

function helixPosition(t: number, phase: number): THREE.Vector3 {
  // t in [0, 1] from bottom to top
  const y = -HELIX_HEIGHT / 2 + t * HELIX_HEIGHT
  const theta = 2 * Math.PI * HELIX_TURNS * t + phase
  return new THREE.Vector3(
    Math.cos(theta) * HELIX_RADIUS,
    y,
    Math.sin(theta) * HELIX_RADIUS,
  )
}

function HelixStrand({ phase, color }: { phase: number; color: string }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= TUBE_SEGMENTS; i++) {
      points.push(helixPosition(i / TUBE_SEGMENTS, phase))
    }
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1)
  }, [phase])

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, TUBE_SEGMENTS, TUBE_RADIUS, 12, false),
    [curve],
  )

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

function Node({
  node,
  position,
  color,
  hovered,
  onHover,
}: {
  node: TrackNode
  position: THREE.Vector3
  color: string
  hovered: boolean
  onHover: (id: string | null) => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      const scale = hovered ? 1.5 : 1 + Math.sin(t * 2 + position.y) * 0.05
      ref.current.scale.setScalar(scale)
    }
    if (glowRef.current) {
      const pulse = 0.55 + Math.sin(t * 2 + position.y) * 0.15
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered
        ? 0.55
        : pulse * 0.35
    }
  })

  return (
    <group position={position}>
      {/* Soft glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
      </mesh>

      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(node.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.4 : 0.8}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Label appears on hover via Html overlay */}
      {hovered && (
        <Html
          position={[0, 0.4, 0]}
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(10,10,15,0.92)',
              border: `1px solid ${color}88`,
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 20px -2px ${color}55`,
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  )
}

function BridgeRung({
  a,
  b,
  label,
  hovered,
  onHover,
  id,
}: {
  a: THREE.Vector3
  b: THREE.Vector3
  label: string
  hovered: boolean
  onHover: (id: string | null) => void
  id: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  const { geometry, midpoint } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a)
    const len = dir.length()
    const geo = new THREE.CylinderGeometry(0.025, 0.025, len, 8)
    // Translate so cylinder starts at a and points toward b
    geo.translate(0, len / 2, 0)
    return {
      geometry: geo,
      midpoint: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
    }
  }, [a, b])

  // Build rotation that aligns +Y axis to (b - a)
  const quaternion = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir)
    return q
  }, [a, b])

  return (
    <>
      <mesh
        ref={ref}
        position={a}
        quaternion={quaternion}
        geometry={geometry}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
      >
        <meshStandardMaterial
          color={BRIDGE_COLOR}
          emissive={BRIDGE_COLOR}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {hovered && (
        <Html
          position={[midpoint.x, midpoint.y, midpoint.z]}
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(10,10,15,0.92)',
              border: `1px solid ${BRIDGE_COLOR}aa`,
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 20px -2px ${BRIDGE_COLOR}66`,
            }}
          >
            ⇄ {label}
          </div>
        </Html>
      )}
    </>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.08
      coreRef.current.scale.setScalar(s)
      coreRef.current.rotation.y = t * 0.3
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.18
      glowRef.current.scale.setScalar(s)
    }
  })

  // A small bi-colored crystal at the origin: AI side cyan, software side green.
  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={CORE_COLOR_A}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={CORE_COLOR_B}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

function SceneRotator({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12
  })
  return <group ref={ref}>{children}</group>
}

function DualTrackHelix({ hoveredId, onHover }: Props) {
  // Pre-compute node positions on each strand (evenly spaced t in (0, 1))
  const aiPositions = useMemo(
    () =>
      aiTrack.map((_, i) => {
        const t = (i + 1) / (aiTrack.length + 1)
        return helixPosition(t, AI_PHASE)
      }),
    [],
  )
  const swPositions = useMemo(
    () =>
      softwareTrack.map((_, i) => {
        const t = (i + 1) / (softwareTrack.length + 1)
        return helixPosition(t, SW_PHASE)
      }),
    [],
  )

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 7.5], fov: 45 }}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#05060f', 8, 22]} />

      <Stars
        radius={50}
        depth={50}
        count={2200}
        factor={3.2}
        saturation={0.1}
        fade
        speed={0.7}
      />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={1.2} distance={8} color="#ffffff" />
      <pointLight position={[3, 4, 3]} intensity={0.5} color={AI_COLOR} distance={12} />
      <pointLight position={[-3, -4, -3]} intensity={0.5} color={SW_COLOR} distance={12} />

      <SceneRotator>
        <HelixStrand phase={AI_PHASE} color={AI_COLOR} />
        <HelixStrand phase={SW_PHASE} color={SW_COLOR} />

        {/* Bridge rungs connecting paired indices across strands */}
        {bridges.map((b) => (
          <BridgeRung
            key={`bridge-${b.aiIdx}-${b.swIdx}`}
            id={`bridge-${b.aiIdx}-${b.swIdx}`}
            a={aiPositions[b.aiIdx]}
            b={swPositions[b.swIdx]}
            label={b.label}
            hovered={hoveredId === `bridge-${b.aiIdx}-${b.swIdx}`}
            onHover={onHover}
          />
        ))}

        {/* AI strand nodes */}
        {aiTrack.map((node, i) => (
          <Node
            key={node.id}
            node={node}
            position={aiPositions[i]}
            color={AI_COLOR}
            hovered={hoveredId === node.id}
            onHover={onHover}
          />
        ))}

        {/* Software strand nodes */}
        {softwareTrack.map((node, i) => (
          <Node
            key={node.id}
            node={node}
            position={swPositions[i]}
            color={SW_COLOR}
            hovered={hoveredId === node.id}
            onHover={onHover}
          />
        ))}

        <CentralCore />
      </SceneRotator>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}

export default DualTrackHelix
