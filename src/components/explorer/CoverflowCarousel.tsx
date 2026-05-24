import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import {
  explorerCards,
  type ExplorerCard,
  type ExplorerSectionId,
} from '../../data/explorer'
import { asset } from '../../utils/asset'

type Props = {
  section: ExplorerSectionId
  selectedIndex: number
  onSelectIndex: (i: number) => void
}

const CARD_WIDTH = 1.7
const CARD_HEIGHT = 2.3
const CARD_DEPTH = 0.05

// Tunables for the cover-flow arc.
const ANGLE_STEP = 0.55 // radians per side-card
const X_STEP_NEAR = 1.55 // x-gap between center and first side card
const X_STEP_FAR = 0.55 // additional x-gap per further-out card
const Z_STEP = 0.55 // each side card recedes in z by this much
const SCALE_NEAR = 0.82
const SCALE_FAR = 0.65
const MAX_VISUAL_OFFSET = 4 // cap how far side cards drift visually

const SECTION_ACCENT: Record<ExplorerSectionId, string> = {
  projects: '#22c55e',
  education: '#60a5fa',
  publications: '#38bdf8',
  experiences: '#f59e0b',
  skills: '#a78bfa',
}

function computeTransform(offset: number) {
  const sign = Math.sign(offset)
  const abs = Math.abs(offset)
  const capped = Math.min(abs, MAX_VISUAL_OFFSET)

  let x = 0
  if (capped >= 1) {
    x = sign * (X_STEP_NEAR + (capped - 1) * X_STEP_FAR)
  }
  const z = -capped * Z_STEP
  const rotY = -sign * Math.min(capped, 1.6) * ANGLE_STEP
  const scale =
    abs === 0
      ? 1
      : abs === 1
        ? SCALE_NEAR
        : SCALE_FAR - Math.max(0, capped - 2) * 0.05
  // Slight y-drop for far cards so they sit lower (like a curved deck)
  const y = abs === 0 ? 0 : -0.04 * (capped - 1)
  // Fade out cards that are beyond the visible range
  const opacity = abs > MAX_VISUAL_OFFSET + 0.5 ? 0 : 1
  return { x, y, z, rotY, scale, opacity }
}

function CardImage({
  url,
  width,
  height,
  z,
}: {
  url: string
  width: number
  height: number
  z: number
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let active = true
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = 'anonymous'
    loader.load(
      url,
      (tex) => {
        if (!active) {
          tex.dispose()
          return
        }
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = 8
        setTexture(tex)
      },
      undefined,
      () => {
        if (active) setTexture(null)
      },
    )
    return () => {
      active = false
    }
  }, [url])

  useEffect(() => {
    return () => {
      texture?.dispose()
    }
  }, [texture])

  if (!texture) {
    return (
      <mesh position={[0, 0, z]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#e5e7eb" />
      </mesh>
    )
  }

  return (
    <mesh position={[0, 0, z]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

function Card({
  card,
  offset,
  accent,
  onClick,
}: {
  card: ExplorerCard
  offset: number
  accent: string
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const hoverRef = useRef(false)

  const target = useMemo(() => computeTransform(offset), [offset])
  const isSelected = offset === 0

  useFrame((state, dt) => {
    const g = groupRef.current
    if (!g) return
    const damp = 1 - Math.exp(-dt * 7)

    // Subtle hover lift when off-center
    const hoverLift = hoverRef.current && !isSelected ? 0.08 : 0
    // Gentle bob on the selected card for life
    const bob = isSelected ? Math.sin(state.clock.elapsedTime * 1.3) * 0.025 : 0

    g.position.x += (target.x - g.position.x) * damp
    g.position.y += (target.y + hoverLift + bob - g.position.y) * damp
    g.position.z += (target.z - g.position.z) * damp
    g.rotation.y += (target.rotY - g.rotation.y) * damp
    g.scale.x += (target.scale - g.scale.x) * damp
    g.scale.y += (target.scale - g.scale.y) * damp
    g.scale.z += (target.scale - g.scale.z) * damp
  })

  const showContent = Math.abs(offset) <= 2
  const showImage = !!card.image

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        hoverRef.current = true
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        hoverRef.current = false
        document.body.style.cursor = 'auto'
      }}
      visible={target.opacity > 0}
    >
      {/* Subtle glow under selected card */}
      {isSelected && (
        <mesh position={[0, -CARD_HEIGHT / 2 - 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 1.4, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={0.25} />
        </mesh>
      )}

      <RoundedBox
        args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
        radius={0.08}
        smoothness={5}
        castShadow
      >
        <meshPhysicalMaterial
          color="#fafaf9"
          metalness={0.1}
          roughness={0.32}
          clearcoat={0.9}
          clearcoatRoughness={0.18}
          emissive={isSelected ? accent : '#000000'}
          emissiveIntensity={isSelected ? 0.18 : 0}
        />
      </RoundedBox>

      {/* Accent strip along the top of the card */}
      <mesh position={[0, CARD_HEIGHT / 2 - 0.13, CARD_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[CARD_WIDTH - 0.2, 0.08]} />
        <meshBasicMaterial color={accent} />
      </mesh>

      {showContent && (
        <>
          {showImage ? (
            <>
              <CardImage
                url={asset(card.image!)}
                width={CARD_WIDTH * 0.84}
                height={CARD_WIDTH * 0.84}
                z={CARD_DEPTH / 2 + 0.002}
              />
              <Html
                position={[0, -CARD_HEIGHT / 2 + 0.34, CARD_DEPTH / 2 + 0.002]}
                transform
                distanceFactor={1.5}
                occlude="blending"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                <div
                  style={{
                    width: 240,
                    textAlign: 'center',
                    color: '#0a0a0a',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>
                    {card.title}
                  </div>
                  {card.meta && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        opacity: 0.7,
                        lineHeight: 1.25,
                      }}
                    >
                      {card.meta}
                    </div>
                  )}
                </div>
              </Html>
            </>
          ) : (
            <Html
              position={[0, 0, CARD_DEPTH / 2 + 0.002]}
              transform
              distanceFactor={1.5}
              occlude="blending"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <div
                style={{
                  width: 240,
                  height: 320,
                  padding: '0 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  textAlign: 'center',
                  color: '#0a0a0a',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.title}
                </div>
                {card.meta && (
                  <div
                    style={{
                      fontSize: 14,
                      opacity: 0.7,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.meta}
                  </div>
                )}
                {card.tags && card.tags.length > 0 && (
                  <div
                    style={{
                      marginTop: 4,
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: 4,
                    }}
                  >
                    {card.tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: '2px 8px',
                          borderRadius: 999,
                          fontSize: 11,
                          background: `${accent}22`,
                          color: '#374151',
                          fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Html>
          )}
        </>
      )}
    </group>
  )
}

function Floor() {
  return (
    <mesh
      position={[0, -CARD_HEIGHT / 2 - 0.08, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#0a0c14" roughness={0.95} metalness={0} />
    </mesh>
  )
}

function CoverflowCarousel({ section, selectedIndex, onSelectIndex }: Props) {
  const cards = useMemo(
    () => explorerCards.filter((c) => c.section === section),
    [section],
  )
  const accent = SECTION_ACCENT[section]

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5.2], fov: 42 }}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#070912']} />
      <fog attach="fog" args={['#070912', 6, 18]} />

      {/* Three-point lighting tilted slightly toward the center card */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[0, 5, 5]} intensity={0.9} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-4, 2, 2]} intensity={0.5} color="#6366f1" distance={14} />
      <pointLight position={[4, 2, 2]} intensity={0.5} color={accent} distance={14} />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#ffffff" distance={10} />

      <Floor />

      <ContactShadows
        position={[0, -CARD_HEIGHT / 2 - 0.07, 0]}
        opacity={0.55}
        scale={14}
        blur={2.4}
        far={3}
      />

      {cards.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          offset={i - selectedIndex}
          accent={accent}
          onClick={() => onSelectIndex(i)}
        />
      ))}
    </Canvas>
  )
}

export default CoverflowCarousel
