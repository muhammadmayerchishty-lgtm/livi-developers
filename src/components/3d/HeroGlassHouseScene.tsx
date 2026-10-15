import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  inView: boolean;
}

// Stylized Glass House constructed strictly from Three.js primitives
const GlassHousePrimitives: React.FC = () => {
  const houseGroupRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Slow continuous rotation
    if (houseGroupRef.current) {
      houseGroupRef.current.rotation.y += delta * 0.04;
    }

    // Mouse-driven camera parallax with smooth damping
    const targetX = 8 + state.pointer.x * 2.2;
    const targetY = 4.2 - state.pointer.y * 1.6;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 2.5, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 2.5, delta);
    state.camera.lookAt(0, 1.4, 0);

    // Subtle water surface shimmer
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.05 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      }
    }
  });

  return (
    <group ref={houseGroupRef} position={[0, -0.6, 0]}>
      {/* 1. Dark Reflective Ground / Terrace Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial
          color="#0B0F11"
          roughness={0.12}
          metalness={0.65}
        />
      </mesh>

      {/* Travertine Ground Podium Slab */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[14, 0.25, 10]} />
        <meshStandardMaterial color="#192024" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* 2. Reflection Pool Basin & Water Plane */}
      <group position={[2.2, 0.23, 2.8]}>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[6.4, 0.22, 3.4]} />
          <meshStandardMaterial color="#0A0E10" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh
          ref={waterRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
        >
          <planeGeometry args={[6.2, 3.2]} />
          <meshStandardMaterial
            color="#122A36"
            roughness={0.05}
            metalness={0.85}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Floating Stepping Stones */}
        {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
          <mesh key={i} position={[x, 0.04, 0]}>
            <boxGeometry args={[0.9, 0.08, 1.2]} />
            <meshStandardMaterial color="#222B30" roughness={0.7} />
          </mesh>
        ))}

        {/* Sunken Lounge Glow */}
        <pointLight position={[1.5, 0.3, 0]} color="#FF7B25" intensity={1.8} distance={4} />
      </group>

      {/* 3. Ground Level Glass Pavilion */}
      <group position={[-1.6, 1.25, -0.2]}>
        {/* Ground Floor Roof / Intermediate Concrete Slab */}
        <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.4, 0.28, 6.2]} />
          <meshStandardMaterial color="#21292E" roughness={0.75} />
        </mesh>

        {/* Rear Monolithic Wall */}
        <mesh position={[0, 0, -2.9]} castShadow receiveShadow>
          <boxGeometry args={[8.4, 2.05, 0.25]} />
          <meshStandardMaterial color="#1B2226" roughness={0.85} />
        </mesh>

        {/* Side Structural Pier */}
        <mesh position={[-4.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 2.05, 6.0]} />
          <meshStandardMaterial color="#1E262B" roughness={0.8} />
        </mesh>

        {/* Front Transparent Glass Curtain Wall */}
        <mesh position={[0, 0, 2.95]}>
          <boxGeometry args={[8.2, 2.05, 0.05]} />
          <meshStandardMaterial
            color="#A7C7D9"
            roughness={0.04}
            metalness={0.25}
            transparent
            opacity={0.32}
          />
        </mesh>

        {/* Side Glass Curtain Wall */}
        <mesh position={[4.1, 0, 0]}>
          <boxGeometry args={[0.05, 2.05, 5.8]} />
          <meshStandardMaterial
            color="#A7C7D9"
            roughness={0.04}
            metalness={0.25}
            transparent
            opacity={0.32}
          />
        </mesh>

        {/* Interior Bookmatched Marble Spine Wall */}
        <mesh position={[0.2, 0, -1.2]}>
          <boxGeometry args={[2.8, 2.0, 0.15]} />
          <meshStandardMaterial color="#E5DFD5" roughness={0.3} metalness={0.15} />
        </mesh>

        {/* Interior Warm Ambient Point Lights */}
        <pointLight position={[-0.8, 0.4, 0]} color="#FFAE68" intensity={2.4} distance={7} />
        <pointLight position={[1.5, 0.4, -0.5]} color="#FFC488" intensity={1.8} distance={6} />
      </group>

      {/* 4. Upper Cantilevered Master Suite */}
      <group position={[0.8, 3.4, 0.6]}>
        {/* Cantilever Roof Slab */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.6, 0.26, 6.4]} />
          <meshStandardMaterial color="#263036" roughness={0.7} />
        </mesh>

        {/* Cantilever Base Floor Slab */}
        <mesh position={[0, -1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.6, 0.26, 6.4]} />
          <meshStandardMaterial color="#263036" roughness={0.7} />
        </mesh>

        {/* Corner Wrap Glass Box */}
        <mesh position={[0.6, 0.02, 0.4]}>
          <boxGeometry args={[6.8, 1.9, 4.8]} />
          <meshStandardMaterial
            color="#A7C7D9"
            roughness={0.04}
            metalness={0.3}
            transparent
            opacity={0.36}
          />
        </mesh>

        {/* Vertical Brushed Bronze Louvers / Brise-Soleil */}
        <group position={[-3.2, 0, 2.0]}>
          {Array.from({ length: 11 }).map((_, i) => (
            <mesh key={i} position={[i * 0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 1.9, 0.38]} />
              <meshStandardMaterial
                color="#C9A66B"
                metalness={0.88}
                roughness={0.22}
              />
            </mesh>
          ))}
        </group>

        {/* Upper Master Suite Warm Glowing Point Light */}
        <pointLight position={[0.5, 0.3, 0.4]} color="#FFAA5E" intensity={2.6} distance={7} />

        {/* Floating Glass Balcony Railing */}
        <mesh position={[1.0, -0.65, 3.1]}>
          <boxGeometry args={[5.8, 0.65, 0.04]} />
          <meshStandardMaterial
            color="#C9A66B"
            roughness={0.15}
            metalness={0.9}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>

      {/* 5. Minimalist Sculptural Cypress Trees (Cylinders & Cones) */}
      <group position={[-5.4, 0.2, 2.5]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 1.6, 6]} />
          <meshStandardMaterial color="#2E241E" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <coneGeometry args={[0.55, 2.4, 7]} />
          <meshStandardMaterial color="#19271E" roughness={0.8} />
        </mesh>
      </group>

      <group position={[5.2, 0.2, -2.8]}>
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.07, 0.11, 2.0, 6]} />
          <meshStandardMaterial color="#2E241E" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.4, 0]}>
          <coneGeometry args={[0.6, 2.6, 7]} />
          <meshStandardMaterial color="#1B2B20" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export const HeroGlassHouseScene: React.FC<SceneProps> = ({ inView }) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [8, 4.2, 9], fov: 42 }}
      frameloop={inView ? 'always' : 'never'}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      className="w-full h-full pointer-events-none"
    >
      <color attach="background" args={['#0E1214']} />
      <ambientLight intensity={0.45} color="#354857" />
      <hemisphereLight args={['#243340', '#0E1214', 0.65]} />
      <directionalLight
        position={[10, 8, 6]}
        color="#FFAE68"
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <GlassHousePrimitives />
    </Canvas>
  );
};

export default HeroGlassHouseScene;
