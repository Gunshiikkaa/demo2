import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Petal({ index, ...props }) {
  const ref = useRef();
  const [speed] = useState(() => 0.1 + Math.random() * 0.5);
  const [rotationSpeed] = useState(() => Math.random());
  const [factor] = useState(() => 2 + Math.random() * 4);
  const [xFactor] = useState(() => Math.random() * 4);
  const [zFactor] = useState(() => Math.random() * 4);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.cos(t) * xFactor,
      Math.sin(t) * factor + Math.cos(t * index * 0.1) * 2,
      Math.sin(t) * zFactor
    );
    ref.current.rotation.set(t * rotationSpeed, t * rotationSpeed, t * rotationSpeed);
  });

  return (
    <Float speed={speed * 5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} {...props}>
        <dodecahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial 
          color="#E1C699" 
          emissive="#E1C699" 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
    </Float>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, camera.position.z), 0.02);
    camera.lookAt(0, 0, 0);
  });
}

export default function Background3D() {
  const petals = useMemo(() => {
    return new Array(40).fill().map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ]
    }));
  }, []);

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <fog attach="fog" args={['#0F0F0F', 10, 40]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#E1C699" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B8860B" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {petals.map((petal) => (
        <Petal key={petal.id} index={petal.id} position={petal.position} />
      ))}
      
      <Rig />
    </Canvas>
  );
}
