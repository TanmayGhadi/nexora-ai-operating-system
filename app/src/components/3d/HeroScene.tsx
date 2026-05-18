import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls, MeshTransmissionMaterial, Sparkles, Stars, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const DashboardElement = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={0.75}>
      {/* Main Glass Panel with Premium Rounded Corners */}
      <RoundedBox args={[4, 2.5, 0.05]} radius={0.2} smoothness={8} position={[0, 0, 0]} castShadow receiveShadow>
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.2}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#3B6AFF"
        />
      </RoundedBox>
      
      {/* Decorative UI elements on the panel */}
      <mesh position={[-1.2, 0.5, 0.05]}>
        <planeGeometry args={[1, 0.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh position={[0.5, 0.2, 0.05]}>
        <planeGeometry args={[2, 1.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
      
      {/* Floating abstract AI cores */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-1.5, -0.5, 0.5]}>
        <mesh>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial color="#7C3BFF" wireframe />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5} position={[1.5, 0.8, 0.3]}>
        <mesh>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#4ECDC4" emissive="#4ECDC4" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

export default function HeroScene() {
  return (
    <div className="absolute inset-0 lg:left-1/2 z-0 mt-20 lg:mt-0">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3BFF" />
        
        <PresentationControls 
          global 
          snap={true} 
          rotation={[0, -0.2, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <DashboardElement />
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#3B6AFF" />
        
        <Environment preset="city" />
        
        <Sparkles count={40} scale={10} size={2} speed={0.4} opacity={0.2} color="#4ECDC4" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
