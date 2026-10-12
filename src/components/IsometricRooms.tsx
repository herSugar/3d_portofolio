import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { RoomId } from '../data'

interface IsometricRoomsProps {
  activeRoom: RoomId
  onSelectRoom?: (room: RoomId) => void
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
  isDetailOpen?: boolean
}

interface HotspotBeaconProps {
  position: [number, number, number]
  roomId: Exclude<RoomId, 'overview'>
  label: string
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
  isDetailOpen?: boolean
}

function HotspotBeacon({ position, roomId, label, onOpenCard, isDetailOpen }: HotspotBeaconProps) {
  if (isDetailOpen) return null

  return (
    <group position={position}>
      <Html center distanceFactor={14}>
        <button
          className="hotspot-beacon-btn"
          onClick={(e) => {
            e.stopPropagation()
            onOpenCard?.(roomId)
          }}
          aria-label={`Open ${label} details`}
        >
          <span className="beacon-pulse-ring ring-1" />
          <span className="beacon-pulse-ring ring-2" />
          <span className="beacon-core-dot" />
          <span className="beacon-tooltip">Detail: {label}</span>
        </button>
      </Html>
    </group>
  )
}

// Low-poly Stylized Character
interface CharacterProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  pose: 'mirror' | 'typing' | 'pointing' | 'studying' | 'calling'
}

function Character({ position, rotation = [0, 0, 0], pose }: CharacterProps) {
  const armRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pose === 'typing' && armRef.current) {
      armRef.current.position.y = 0.52 + Math.sin(t * 8) * 0.015
    } else if (pose === 'pointing' && armRef.current) {
      armRef.current.rotation.z = -0.4 + Math.sin(t * 2) * 0.05
    } else if (pose === 'calling' && headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.5) * 0.08
    } else if (pose === 'mirror' && headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.06
    }
  })

  const skinMat = <meshStandardMaterial color="#f8c8a2" roughness={0.6} />
  const hairMat = <meshStandardMaterial color="#211e1d" roughness={0.9} />
  const hoodieMat = <meshStandardMaterial color="#282b33" roughness={0.8} />
  const pantsMat = <meshStandardMaterial color="#1c1f24" roughness={0.85} />
  const shoeMat = <meshStandardMaterial color="#f0eee9" roughness={0.5} />

  const isSitting = pose === 'typing' || pose === 'studying'

  return (
    <group position={position} rotation={rotation}>
      {/* Shoes */}
      <mesh position={[-0.14, 0.06, isSitting ? 0.28 : 0]} castShadow>
        <boxGeometry args={[0.13, 0.12, 0.26]} />
        {shoeMat}
      </mesh>
      <mesh position={[0.14, 0.06, isSitting ? 0.28 : 0]} castShadow>
        <boxGeometry args={[0.13, 0.12, 0.26]} />
        {shoeMat}
      </mesh>

      {/* Legs */}
      {isSitting ? (
        <>
          <mesh position={[-0.14, 0.44, 0.14]} castShadow>
            <boxGeometry args={[0.13, 0.14, 0.36]} />
            {pantsMat}
          </mesh>
          <mesh position={[0.14, 0.44, 0.14]} castShadow>
            <boxGeometry args={[0.13, 0.14, 0.36]} />
            {pantsMat}
          </mesh>
          <mesh position={[-0.14, 0.24, 0.3]} castShadow>
            <boxGeometry args={[0.12, 0.28, 0.12]} />
            {pantsMat}
          </mesh>
          <mesh position={[0.14, 0.24, 0.3]} castShadow>
            <boxGeometry args={[0.12, 0.28, 0.12]} />
            {pantsMat}
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[-0.14, 0.38, 0]} castShadow>
            <boxGeometry args={[0.13, 0.52, 0.15]} />
            {pantsMat}
          </mesh>
          <mesh position={[0.14, 0.38, 0]} castShadow>
            <boxGeometry args={[0.13, 0.52, 0.15]} />
            {pantsMat}
          </mesh>
        </>
      )}

      {/* Torso */}
      <mesh position={[0, isSitting ? 0.76 : 0.88, isSitting ? -0.04 : 0]} castShadow>
        <boxGeometry args={[0.42, 0.54, 0.26]} />
        {hoodieMat}
      </mesh>
      <mesh position={[0, isSitting ? 0.52 : 0.64, isSitting ? -0.04 : 0]}>
        <boxGeometry args={[0.43, 0.08, 0.27]} />
        <meshStandardMaterial color="#202227" roughness={0.8} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, isSitting ? 1.18 : 1.3, isSitting ? -0.04 : 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.32, 0.28]} />
          {skinMat}
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[0.33, 0.14, 0.31]} />
          {hairMat}
        </mesh>
        <mesh position={[0, 0.02, -0.1]} castShadow>
          <boxGeometry args={[0.32, 0.24, 0.12]} />
          {hairMat}
        </mesh>
        <mesh position={[0, 0.12, 0.13]} castShadow>
          <boxGeometry args={[0.28, 0.08, 0.06]} />
          {hairMat}
        </mesh>
      </group>

      {/* Arms */}
      {pose === 'typing' && (
        <group ref={armRef}>
          <mesh position={[-0.18, 0.64, 0.16]} rotation={[0.8, 0.2, 0]} castShadow>
            <boxGeometry args={[0.11, 0.34, 0.11]} />
            {hoodieMat}
          </mesh>
          <mesh position={[-0.14, 0.52, 0.28]} castShadow>
            <boxGeometry args={[0.08, 0.07, 0.1]} />
            {skinMat}
          </mesh>
          <mesh position={[0.18, 0.64, 0.16]} rotation={[0.8, -0.2, 0]} castShadow>
            <boxGeometry args={[0.11, 0.34, 0.11]} />
            {hoodieMat}
          </mesh>
          <mesh position={[0.14, 0.52, 0.28]} castShadow>
            <boxGeometry args={[0.08, 0.07, 0.1]} />
            {skinMat}
          </mesh>
        </group>
      )}

      {pose === 'pointing' && (
        <group>
          <mesh position={[-0.26, 0.82, 0]} castShadow>
            <boxGeometry args={[0.11, 0.44, 0.11]} />
            {hoodieMat}
          </mesh>
          <group ref={armRef} position={[0.22, 0.98, 0]}>
            <mesh position={[0.14, 0.08, 0.2]} rotation={[-0.5, 0.4, -0.6]} castShadow>
              <boxGeometry args={[0.11, 0.44, 0.11]} />
              {hoodieMat}
            </mesh>
            <mesh position={[0.28, 0.22, 0.36]} castShadow>
              <boxGeometry args={[0.08, 0.08, 0.12]} />
              {skinMat}
            </mesh>
          </group>
        </group>
      )}

      {pose === 'studying' && (
        <group>
          <mesh position={[-0.18, 0.62, 0.15]} rotation={[0.7, 0.3, 0]} castShadow>
            <boxGeometry args={[0.11, 0.34, 0.11]} />
            {hoodieMat}
          </mesh>
          <mesh position={[0.18, 0.62, 0.15]} rotation={[0.7, -0.3, 0]} castShadow>
            <boxGeometry args={[0.11, 0.34, 0.11]} />
            {hoodieMat}
          </mesh>
        </group>
      )}

      {pose === 'calling' && (
        <group>
          <mesh position={[-0.26, 0.82, 0]} castShadow>
            <boxGeometry args={[0.11, 0.44, 0.11]} />
            {hoodieMat}
          </mesh>
          <mesh position={[0.24, 1.05, 0.08]} rotation={[-1.2, 0.3, 0.5]} castShadow>
            <boxGeometry args={[0.1, 0.36, 0.1]} />
            {hoodieMat}
          </mesh>
          <mesh position={[0.22, 1.25, 0.05]} rotation={[0, 0, 0.1]} castShadow>
            <boxGeometry args={[0.04, 0.14, 0.08]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}

      {pose === 'mirror' && (
        <group>
          <mesh position={[-0.24, 0.8, 0.04]} rotation={[0.3, 0.1, 0.1]} castShadow>
            <boxGeometry args={[0.11, 0.4, 0.11]} />
            {hoodieMat}
          </mesh>
          <mesh position={[0.24, 0.8, 0.04]} rotation={[0.3, -0.1, -0.1]} castShadow>
            <boxGeometry args={[0.11, 0.4, 0.11]} />
            {hoodieMat}
          </mesh>
        </group>
      )}
    </group>
  )
}

// Plant Component
function IndoorPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.44, 16]} />
        <meshStandardMaterial color="#dedcd6" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.04, 16]} />
        <meshStandardMaterial color="#423528" roughness={0.9} />
      </mesh>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <mesh
            key={i}
            position={[Math.cos(rad) * 0.14, 0.58 + (i % 2) * 0.08, Math.sin(rad) * 0.14]}
            rotation={[0.35, rad, 0.4]}
            castShadow
          >
            <boxGeometry args={[0.18, 0.02, 0.32]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#4e8c4a' : '#3d7739'} roughness={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

// Room Base Shell
interface RoomShellProps {
  size: [number, number]
  position: [number, number, number]
  wallHeight?: number
  floorColor?: string
  hasEastWall?: boolean
  hasWestWall?: boolean
  hasNorthWall?: boolean
  hasSouthWall?: boolean
}

function RoomShell({
  size,
  position,
  wallHeight = 3.0,
  floorColor = '#dbc5ad',
  hasEastWall = false,
  hasWestWall = true,
  hasNorthWall = true,
  hasSouthWall = false,
}: RoomShellProps) {
  const [width, depth] = size
  const wallThick = 0.2
  const baseHeight = 0.35

  return (
    <group position={position}>
      {/* Plinth */}
      <mesh position={[0, -baseHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[width + wallThick * 2, baseHeight, depth + wallThick * 2]} />
        <meshStandardMaterial color="#181b22" roughness={0.8} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[width, 0.02, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.7} />
      </mesh>

      {/* North Wall */}
      {hasNorthWall && (
        <mesh position={[0, wallHeight / 2, -depth / 2 - wallThick / 2]} castShadow receiveShadow>
          <boxGeometry args={[width + wallThick * 2, wallHeight, wallThick]} />
          <meshStandardMaterial color="#f0ece4" roughness={0.85} />
        </mesh>
      )}

      {/* South Wall */}
      {hasSouthWall && (
        <mesh position={[0, wallHeight / 2, depth / 2 + wallThick / 2]} castShadow receiveShadow>
          <boxGeometry args={[width + wallThick * 2, wallHeight, wallThick]} />
          <meshStandardMaterial color="#f0ece4" roughness={0.85} />
        </mesh>
      )}

      {/* West Wall */}
      {hasWestWall && (
        <mesh position={[-width / 2 - wallThick / 2, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThick, wallHeight, depth + wallThick * 2]} />
          <meshStandardMaterial color="#e5e0d7" roughness={0.85} />
        </mesh>
      )}

      {/* East Wall */}
      {hasEastWall && (
        <mesh position={[width / 2 + wallThick / 2, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThick, wallHeight, depth + wallThick * 2]} />
          <meshStandardMaterial color="#dad5cb" roughness={0.85} />
        </mesh>
      )}
    </group>
  )
}

// Room Label Badge
function RoomBadge({
  title,
  icon,
  position,
  isDetailOpen,
}: {
  title: string
  icon: string
  position: [number, number, number]
  isDetailOpen?: boolean
}) {
  if (isDetailOpen) return null

  return (
    <group position={position}>
      <Html transform distanceFactor={9} position={[0, 0, 0.01]}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(23, 26, 33, 0.92)',
            color: '#f4f2ed',
            padding: '7px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '13px' }}>{icon}</span>
          <span>{title}</span>
        </div>
      </Html>
    </group>
  )
}

// Courtyard Central Tree Feature
function CourtyardTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Square Stone Planter Box */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial color="#22252c" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.49, 0]}>
        <boxGeometry args={[1.08, 0.04, 1.08]} />
        <meshStandardMaterial color="#382d24" roughness={0.9} />
      </mesh>
      {/* Trunk */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.14, 1.3, 10]} />
        <meshStandardMaterial color="#5c4028" roughness={0.8} />
      </mesh>
      {/* Foliage Layers */}
      <mesh position={[0, 1.9, 0]} castShadow>
        <dodecahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#4f8c42" roughness={0.6} />
      </mesh>
      <mesh position={[0.2, 2.3, -0.1]} castShadow>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#60a852" roughness={0.6} />
      </mesh>
      {/* Warm Uplight on Tree */}
      <pointLight position={[0, 0.6, 0]} intensity={1.5} color="#ffe4b5" distance={3} />
    </group>
  )
}

// -------------------------------------------------------------
// 1. EXPERIENCE: Central Open-Air Pavilion (NO WALLS, Ground Floor Center)
// -------------------------------------------------------------
function ExperienceRoom({
  isActive,
  onOpenCard,
}: {
  isActive: boolean
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Waving Hotspot Beacon */}
      <HotspotBeacon position={[0, 1.4, 0]} roomId="experience" label="Experience" onOpenCard={onOpenCard} />

      {/* Open-Air Courtyard Deck - NO WALLS! */}
      <RoomShell
        size={[4.8, 4.8]}
        position={[0, 0, 0]}
        floorColor="#c7a784"
        hasNorthWall={false}
        hasWestWall={false}
        hasEastWall={false}
        hasSouthWall={false}
      />

      <RoomBadge title="Experience (Courtyard)" icon="💼" position={[0, 2.5, -1.8]} />
      <pointLight position={[0, 2.2, 0]} intensity={isActive ? 3.5 : 1.3} color="#ffe4bd" distance={5} />

      {/* Central Garden Tree */}
      <CourtyardTree position={[1.4, 0, -1.3]} />

      {/* Freestanding Milestone Display Totem */}
      <group position={[-0.8, 0, -1.4]}>
        <mesh position={[-0.75, 0.95, 0]} castShadow>
          <boxGeometry args={[0.06, 1.9, 0.06]} />
          <meshStandardMaterial color="#1e2229" metalness={0.8} />
        </mesh>
        <mesh position={[0.75, 0.95, 0]} castShadow>
          <boxGeometry args={[0.06, 1.9, 0.06]} />
          <meshStandardMaterial color="#1e2229" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
          <boxGeometry args={[1.8, 1.1, 0.04]} />
          <meshStandardMaterial color="#1a1d24" roughness={0.3} metalness={0.4} />
        </mesh>
        {[-0.28, 0, 0.28].map((y, idx) => (
          <group key={idx} position={[-0.55, 1.25 + y, 0.03]}>
            <mesh>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#c9f27a" emissive="#c9f27a" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0.55, 0, 0]}>
              <boxGeometry args={[0.95, 0.05, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Workstation Desk */}
      <group position={[-0.2, 0, 0.6]}>
        <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.08, 0.8]} />
          <meshStandardMaterial color="#7a5538" roughness={0.5} />
        </mesh>
        <mesh position={[-0.7, 0.43, 0]} castShadow>
          <boxGeometry args={[0.06, 0.86, 0.7]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.7, 0.43, 0]} castShadow>
          <boxGeometry args={[0.06, 0.86, 0.7]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.91, 0]}>
          <boxGeometry args={[0.38, 0.02, 0.28]} />
          <meshStandardMaterial color="#64748b" metalness={0.7} />
        </mesh>
      </group>

      {/* Chair */}
      <mesh position={[-0.2, 0.46, 1.25]} castShadow>
        <boxGeometry args={[0.48, 0.08, 0.46]} />
        <meshStandardMaterial color="#2a303c" />
      </mesh>
      <mesh position={[-0.2, 0.86, 1.48]} castShadow>
        <boxGeometry args={[0.46, 0.65, 0.08]} />
        <meshStandardMaterial color="#2a303c" />
      </mesh>

      {/* Character Seated Studying */}
      <Character position={[-0.2, 0.06, 1.2]} rotation={[0, Math.PI, 0]} pose="studying" />

      {/* Perimeter Plants */}
      <IndoorPlant position={[-1.7, 0, 1.5]} />
      <IndoorPlant position={[1.7, 0, 1.5]} />
    </group>
  )
}

// -------------------------------------------------------------
// 2. PROFILE: Upper North-West Room (2F, Y = 2.8)
// -------------------------------------------------------------
function ProfileRoom({
  isActive,
  onOpenCard,
}: {
  isActive: boolean
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}) {
  return (
    <group position={[-4.2, 2.8, -4.2]}>
      {/* Waving Hotspot Beacon */}
      <HotspotBeacon position={[0, 1.3, 0]} roomId="profile" label="Profile" onOpenCard={onOpenCard} />

      <RoomShell size={[4.4, 4.4]} position={[0, 0, 0]} floorColor="#d8c1a7" hasNorthWall hasWestWall />
      <RoomBadge title="Profile (2F)" icon="👤" position={[-0.6, 2.6, -2.15]} />

      <pointLight position={[0.5, 2.0, -0.8]} intensity={isActive ? 2.8 : 1.0} color="#ffdfb5" distance={5} />

      {/* Mirror */}
      <group position={[-1.2, 0, -1.0]} rotation={[0, 0.4, 0]}>
        <mesh position={[0, 1.35, 0]} castShadow>
          <boxGeometry args={[0.85, 2.3, 0.08]} />
          <meshStandardMaterial color="#c49a62" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.35, 0.045]}>
          <boxGeometry args={[0.73, 2.15, 0.02]} />
          <meshStandardMaterial color="#b2c9db" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      <Character position={[-0.6, 0, -0.5]} rotation={[0, -2.1, 0]} pose="mirror" />

      {/* Dresser & Lamp */}
      <group position={[0.8, 0, -1.6]}>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.1, 0.6]} />
          <meshStandardMaterial color="#7a5538" roughness={0.6} />
        </mesh>
        <mesh position={[-0.3, 1.32, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.12, 0.24, 12]} />
          <meshStandardMaterial color="#423932" />
        </mesh>
        <mesh position={[-0.3, 1.54, 0]}>
          <cylinderGeometry args={[0.16, 0.22, 0.26, 16]} />
          <meshStandardMaterial color="#ffeed1" emissive="#ffc47d" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <IndoorPlant position={[-1.5, 0, 1.0]} />
    </group>
  )
}

// -------------------------------------------------------------
// 3. PROJECTS: Upper North-East Room (2F, Y = 2.8)
// -------------------------------------------------------------
function ProjectsRoom({
  isActive,
  onOpenCard,
}: {
  isActive: boolean
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}) {
  return (
    <group position={[4.2, 2.8, -4.2]}>
      {/* Waving Hotspot Beacon */}
      <HotspotBeacon position={[0, 1.3, 0]} roomId="projects" label="Projects" onOpenCard={onOpenCard} />

      <RoomShell size={[4.4, 4.4]} position={[0, 0, 0]} floorColor="#d4be9f" hasNorthWall hasEastWall />
      <RoomBadge title="Projects (2F)" icon="</>" position={[-0.4, 2.6, -2.15]} />

      <pointLight position={[0.1, 1.25, -0.6]} intensity={isActive ? 3.2 : 1.2} color="#4fc3f7" distance={4} />

      {/* Desk */}
      <group position={[0, 0, -0.8]}>
        <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.08, 0.9]} />
          <meshStandardMaterial color="#8b5e3c" roughness={0.5} />
        </mesh>
        <mesh position={[-0.85, 0.44, 0]} castShadow>
          <boxGeometry args={[0.08, 0.88, 0.8]} />
          <meshStandardMaterial color="#2d2a29" />
        </mesh>
        <mesh position={[0.85, 0.44, 0]} castShadow>
          <boxGeometry args={[0.08, 0.88, 0.8]} />
          <meshStandardMaterial color="#2d2a29" />
        </mesh>
        {/* Laptop */}
        <group position={[-0.1, 0.92, -0.05]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.48, 0.02, 0.36]} />
            <meshStandardMaterial color="#8a8d94" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.18, -0.16]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.48, 0.34, 0.02]} />
            <meshStandardMaterial color="#0d1424" emissive="#38bdf8" emissiveIntensity={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Chair */}
      <group position={[0, 0, -0.1]}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.5]} />
          <meshStandardMaterial color="#21252d" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.92, 0.22]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.52, 0.72, 0.08]} />
          <meshStandardMaterial color="#21252d" roughness={0.7} />
        </mesh>
      </group>

      <Character position={[0, 0.08, -0.12]} rotation={[0, 0, 0]} pose="typing" />

      {/* Bookshelf on East Wall */}
      <mesh position={[2.1, 1.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 2.2, 1.2]} />
        <meshStandardMaterial color="#754f30" roughness={0.6} />
      </mesh>

      <IndoorPlant position={[-1.5, 0, -1.4]} />
    </group>
  )
}

// -------------------------------------------------------------
// 4. SKILLS: Ground South-West Room (1F, Y = 0)
// -------------------------------------------------------------
function SkillsRoom({
  isActive,
  onOpenCard,
}: {
  isActive: boolean
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}) {
  return (
    <group position={[-4.2, 0, 4.2]}>
      {/* Waving Hotspot Beacon */}
      <HotspotBeacon position={[0, 1.3, 0]} roomId="skills" label="Skills" onOpenCard={onOpenCard} />

      <RoomShell size={[4.4, 4.4]} position={[0, 0, 0]} floorColor="#d8c1a7" hasSouthWall hasWestWall />
      <RoomBadge title="Skills (1F)" icon="⚙" position={[-0.5, 2.6, 2.15]} />

      <pointLight position={[0, 1.8, 1.0]} intensity={isActive ? 3.5 : 1.4} color="#61dafb" distance={4.5} />

      {/* Interactive Tech Screen on South Wall */}
      <group position={[0, 1.8, 2.16]} rotation={[0, Math.PI, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 1.6, 0.06]} />
          <meshStandardMaterial color="#1a1d24" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[2.45, 1.45, 0.01]} />
          <meshStandardMaterial color="#0b0e14" roughness={0.2} />
        </mesh>
        {[
          { color: '#61dafb', x: -0.7, y: 0.32 },
          { color: '#3178c6', x: 0, y: 0.32 },
          { color: '#4ade80', x: 0.7, y: 0.32 },
          { color: '#facc15', x: -0.7, y: -0.32 },
          { color: '#f43f5e', x: 0, y: -0.32 },
          { color: '#c084fc', x: 0.7, y: -0.32 },
        ].map((item, i) => (
          <group key={i} position={[item.x, item.y, 0.05]}>
            <mesh>
              <boxGeometry args={[0.58, 0.4, 0.02]} />
              <meshStandardMaterial color="#141821" emissive={item.color} emissiveIntensity={isActive ? 0.7 : 0.3} />
            </mesh>
          </group>
        ))}
      </group>

      <Character position={[0.2, 0, 0.8]} rotation={[0, 2.9, 0]} pose="pointing" />
      <IndoorPlant position={[-1.5, 0, -1.2]} />
    </group>
  )
}

// -------------------------------------------------------------
// 5. CONTACT: Ground South-East Room (1F, Y = 0)
// -------------------------------------------------------------
function ContactRoom({
  isActive,
  onOpenCard,
}: {
  isActive: boolean
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}) {
  return (
    <group position={[4.2, 0, 4.2]}>
      {/* Waving Hotspot Beacon */}
      <HotspotBeacon position={[0, 1.3, 0]} roomId="contact" label="Contact" onOpenCard={onOpenCard} />

      <RoomShell size={[4.4, 4.4]} position={[0, 0, 0]} floorColor="#d8c1a7" hasSouthWall hasEastWall />
      <RoomBadge title="Contact (1F)" icon="📞" position={[0, 2.6, 2.15]} />

      <pointLight position={[0, 2.0, 0.8]} intensity={isActive ? 2.8 : 1.0} color="#c9f27a" distance={4} />

      {/* Social Media Wall Plaque on South Wall */}
      <group position={[0, 1.8, 2.16]} rotation={[0, Math.PI, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.1, 0.04]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.5} />
        </mesh>
        {[
          { color: '#ea4335', x: -0.6 },
          { color: '#25d366', x: 0 },
          { color: '#0a66c2', x: 0.6 },
        ].map((item, i) => (
          <group key={i} position={[item.x, 0, 0.03]}>
            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.02]} />
              <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[-0.4, 0.85, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.08, 0.7]} />
        <meshStandardMaterial color="#7a5538" />
      </mesh>

      <Character position={[0.6, 0, 0.5]} rotation={[0, 2.5, 0]} pose="calling" />
      <IndoorPlant position={[1.4, 0, -1.2]} />
    </group>
  )
}

// -------------------------------------------------------------
// Connecting Mezzanine Bridge, Walkways & Floating Stairs
// -------------------------------------------------------------
function CourtyardConnections() {
  const steps = 7
  return (
    <group>
      {/* Upper 2F Balcony Bridge between Profile and Projects */}
      <group position={[0, 2.8, -4.2]}>
        <mesh position={[0, -0.16, 0]} receiveShadow>
          <boxGeometry args={[4.2, 0.32, 2.2]} />
          <meshStandardMaterial color="#1f232b" roughness={0.7} />
        </mesh>
        {/* Parquet Walkway */}
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[4.0, 0.02, 2.0]} />
          <meshStandardMaterial color="#cbb497" roughness={0.6} />
        </mesh>
        {/* Glass Front Railing overlooking Courtyard */}
        <mesh position={[0, 0.45, 1.05]} castShadow>
          <boxGeometry args={[4.0, 0.9, 0.04]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.92, 1.05]}>
          <boxGeometry args={[4.0, 0.06, 0.08]} />
          <meshStandardMaterial color="#22252c" metalness={0.8} />
        </mesh>
      </group>

      {/* Floating Wooden Stairs from Central Courtyard up to 2F Bridge */}
      <group position={[0, 0, -2.1]}>
        {Array.from({ length: steps }).map((_, i) => {
          const progress = i / (steps - 1)
          const y = 0.2 + progress * 2.5
          const z = 0.6 - progress * 1.8
          return (
            <mesh key={i} position={[0, y, z]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.08, 0.35]} />
              <meshStandardMaterial color="#8a5c3b" roughness={0.6} />
            </mesh>
          )
        })}
        {/* Handrail */}
        <mesh position={[0.58, 1.5, -0.3]} rotation={[0.95, 0, 0]}>
          <boxGeometry args={[0.04, 3.4, 0.04]} />
          <meshStandardMaterial color="#2d3037" metalness={0.8} />
        </mesh>
      </group>

      {/* Structural Pillars Holding 2F */}
      {[
        [-4.2, -1.8],
        [-1.8, -4.2],
        [1.8, -4.2],
        [4.2, -1.8],
      ].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.4, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.1, 2.8, 12]} />
          <meshStandardMaterial color="#22262f" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function IsometricRooms({ activeRoom, onOpenCard }: IsometricRoomsProps) {
  return (
    <group>
      {/* 1. Central Courtyard: Experience Room (Open-Air, No Walls) */}
      <ExperienceRoom isActive={activeRoom === 'experience'} onOpenCard={onOpenCard} />

      {/* 2. Surrounding 2F Wings (North) */}
      <ProfileRoom isActive={activeRoom === 'profile'} onOpenCard={onOpenCard} />
      <ProjectsRoom isActive={activeRoom === 'projects'} onOpenCard={onOpenCard} />

      {/* 3. Surrounding 1F Wings (South) */}
      <SkillsRoom isActive={activeRoom === 'skills'} onOpenCard={onOpenCard} />
      <ContactRoom isActive={activeRoom === 'contact'} onOpenCard={onOpenCard} />

      {/* 4. Mezzanine Bridge, Walkways, and Stairs */}
      <CourtyardConnections />
    </group>
  )
}
