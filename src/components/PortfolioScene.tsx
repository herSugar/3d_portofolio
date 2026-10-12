import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { RoomId } from '../data'
import { rooms } from '../data'
import IsometricRooms from './IsometricRooms'

function CameraDirector({ activeRoom }: { activeRoom: RoomId }) {
  const { camera, controls } = useThree()
  const orbit = controls as unknown as { target: THREE.Vector3; update: () => void } | null
  const destination = useRef(new THREE.Vector3(12.0, 13.0, 14.0))
  const lookAt = useRef(new THREE.Vector3(0, 1.4, 0))

  useEffect(() => {
    if (activeRoom === 'overview') {
      destination.current.set(12.0, 13.0, 14.0)
      lookAt.current.set(0, 1.4, 0)
    } else {
      const room = rooms.find((item) => item.id === activeRoom)
      if (room) {
        destination.current.set(...room.position)
        lookAt.current.set(...room.target)
      }
    }
  }, [activeRoom])

  useFrame((_, delta) => {
    const smooth = 1 - Math.exp(-delta * 2.2)
    camera.position.lerp(destination.current, smooth)
    if (orbit) {
      orbit.target.lerp(lookAt.current, smooth)
      orbit.update()
    } else {
      camera.lookAt(lookAt.current)
    }
  })

  return null
}

function LoadingLabel() {
  return (
    <Html center>
      <div className="loading-pill">Loading 3D space…</div>
    </Html>
  )
}

interface PortfolioSceneProps {
  activeRoom: RoomId
  isDetailOpen?: boolean
  onSelectRoom?: (room: RoomId) => void
  onOpenCard?: (room: Exclude<RoomId, 'overview'>) => void
}

export default function PortfolioScene({
  activeRoom,
  isDetailOpen,
  onSelectRoom,
  onOpenCard,
}: PortfolioSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [12.0, 13.0, 14.0], fov: 38, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#101218']} />

      {/* Warm Ambient & Hemisphere Lighting */}
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#fdfbf7', '#181b22', 0.8]} />

      {/* Main Isometric Sun Light with Soft Shadows */}
      <directionalLight
        position={[12, 18, 14]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 0.1, 50]} />
      </directionalLight>

      {/* Subtle Cool Rim Light */}
      <directionalLight position={[-10, 12, -10]} intensity={0.6} color="#94a3b8" />

      <Suspense fallback={<LoadingLabel />}>
        <IsometricRooms
          activeRoom={activeRoom}
          isDetailOpen={isDetailOpen}
          onSelectRoom={onSelectRoom}
          onOpenCard={onOpenCard}
        />
      </Suspense>

      <CameraDirector activeRoom={activeRoom} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={42}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={activeRoom === 'overview'}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}
