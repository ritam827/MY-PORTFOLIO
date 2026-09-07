import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef } from 'react'

function DataCloud() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.08
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
  })
  const points = Array.from({ length: 180 }, (_, index) => {
    const angle = index * 2.4
    const radius = 1.6 + (index % 13) * 0.07
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * 1.2, Math.sin(angle) * radius]
  }).flat()
  return (
    <group ref={ref} rotation={[0.2, 0, 0.1]}>
      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial transparent color="#62d9ff" size={0.035} sizeAttenuation depthWrite={false} />
      </Points>
      <mesh scale={1.25}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#397bff" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="three-background" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <DataCloud />
      </Canvas>
    </div>
  )
}
