import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function DataLandscape() {
  const mesh = useRef()
  const group = useRef()
  const { size } = useThree()
  const isMobile = size.width < 700
  const columns = isMobile ? 22 : 44
  const rows = isMobile ? 14 : 24
  const count = columns * rows
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colors = useMemo(() => [new THREE.Color('#7547d8'), new THREE.Color('#3478e8'), new THREE.Color('#58d7e6')], [])
  const coordinates = useMemo(() => Array.from({ length: count }, (_, index) => ({ x: index % columns, z: Math.floor(index / columns) })), [columns, count])
  const heights = useMemo(() => Array.from({ length: count }, (_, index) => {
    const { x, z } = coordinates[index]
    const nx = x / columns - 0.5
    const nz = z / rows - 0.5
    const peakA = Math.exp(-((nx + 0.22) ** 2 * 18 + (nz + 0.08) ** 2 * 13))
    const peakB = Math.exp(-((nx - 0.25) ** 2 * 22 + (nz - 0.18) ** 2 * 20))
    const ripple = (Math.sin(x * 0.72 + z * 0.33) + Math.cos(z * 0.58 - x * 0.16)) * 0.12
    const seed = (Math.sin(index * 12.9898) * 43758.5453) % 1
    return Math.max(0.12, 0.25 + peakA * 1.25 + peakB * 1.05 + ripple + Math.abs(seed) * 0.18)
  }), [columns, coordinates, count, rows])

  useEffect(() => {
    if (!mesh.current) return
    const color = new THREE.Color()
    heights.forEach((height, index) => {
      const { x, z } = coordinates[index]
      const t = Math.min(1, Math.max(0, (height - 0.12) / 1.45))
      color.copy(colors[t < 0.42 ? 0 : t < 0.72 ? 1 : 2])
      mesh.current.setColorAt(index, color)
      dummy.position.set((x - columns / 2) * 0.18, height / 2, (z - rows / 2) * 0.18)
      dummy.scale.set(0.105, height, 0.105)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(index, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.instanceColor.needsUpdate = true
  }, [colors, coordinates, dummy, heights, columns, rows])

  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  useEffect(() => {
    const onPointer = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scroll.current = Math.min(1, window.scrollY / window.innerHeight) }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('pointermove', onPointer); window.removeEventListener('scroll', onScroll) }
  }, [])

  const frame = useRef(0)
  useFrame((state) => {
    if (!mesh.current || !group.current) return
    const elapsed = state.clock.elapsedTime
    const progress = Math.min(1, elapsed / 2.4)
    group.current.rotation.x = -0.62 + pointer.current.y * 0.035
    group.current.rotation.z = pointer.current.x * 0.035
    group.current.rotation.y = pointer.current.x * 0.045 + Math.sin(elapsed * 0.16) * 0.018
    group.current.position.y = -0.32 - scroll.current * 0.35
    group.current.scale.setScalar(1 - scroll.current * 0.08)
    frame.current += 1
    if (frame.current % 2 !== 0) return
    heights.forEach((height, index) => {
      const { x, z } = coordinates[index]
      const wave = Math.min(1, Math.max(0, (progress * 1.35 - (x / columns) * 0.62 - (z / rows) * 0.18)))
      const pulse = 1 + Math.sin(elapsed * 1.4 + index * 0.17) * 0.035
      const eased = 1 - (1 - wave) ** 3
      dummy.position.set((x - columns / 2) * 0.18, height * eased * pulse / 2, (z - rows / 2) * 0.18)
      dummy.scale.set(0.105, Math.max(0.01, height * eased * pulse), 0.105)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(index, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return <group ref={group} position={[0, -0.32, 0]}><instancedMesh ref={mesh} args={[null, null, count]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial vertexColors roughness={0.5} metalness={0.25} emissive="#25204b" emissiveIntensity={0.7} /></instancedMesh></group>
}

function AmbientStars() {
  const positions = useMemo(() => Float32Array.from(Array.from({ length: 240 }, (_, index) => {
    const seed = (Math.sin(index * 78.233) * 43758.5453) % 1
    return (seed - 0.5) * 12
  })), [])
  const stars = useRef()

  useFrame((state) => {
    if (!stars.current) return
    stars.current.rotation.y = state.clock.elapsedTime * 0.008
    stars.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.025
  })

  return <points ref={stars} position={[0, 0.5, -2]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#b8a9ff" size={0.018} transparent opacity={0.42} depthWrite={false} /></points>
}

export default function ThreeBackground() {
  return <div className="three-background" aria-hidden="true"><Canvas camera={{ position: [0, 2.8, 6.2], fov: 42 }} dpr={[1, 1.1]} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}><color attach="background" args={['#070b17']} /><ambientLight intensity={0.55} /><directionalLight position={[-2, 4, 4]} intensity={2.2} color="#b9b0ff" /><pointLight position={[3, 1, 2]} intensity={22} color="#3c9eff" /><pointLight position={[-3, 0, 1]} intensity={18} color="#8a52ff" /><AmbientStars /><DataLandscape /></Canvas></div>
}
