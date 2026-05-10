import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';

function Ring() {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.2;
  });

  return (
    <group>
      {/* Outer Ring */}
      <Torus ref={mesh} args={[2, 0.15, 16, 100]}>
        <meshStandardMaterial 
          color="#E1C699" 
          metalness={1} 
          roughness={0.1} 
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </Torus>
      
      {/* Glowing Core */}
      <Sphere args={[0.5, 32, 32]}>
        <MeshDistortMaterial
          color="#FFF0D1"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#E1C699"
          emissiveIntensity={2}
        />
      </Sphere>
      
      {/* Orbital Ring */}
      <Torus args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#E1C699" transparent opacity={0.5} />
      </Torus>
    </group>
  );
}

export default function FloatingRing() {
  return (
    <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="gold" intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Ring />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
