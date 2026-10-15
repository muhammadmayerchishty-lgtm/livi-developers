import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, Sun, Moon, Sunset, Layers, Maximize2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

// Time of day lighting modes
type LightingMode = 'dusk' | 'golden' | 'night';

// Camera preset views
type CameraPreset = 'overview' | 'cantilever' | 'pool' | 'aerial';

interface VillaModelProps {
  lightingMode: LightingMode;
  exploded: boolean;
  selectedArea: string | null;
  onSelectArea: (area: string | null) => void;
}

// Procedural Luxury Villa Architecture
const VillaArchitecture: React.FC<VillaModelProps> = ({
  lightingMode,
  exploded,
  selectedArea,
  onSelectArea,
}) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const upperFloorRef = useRef<THREE.Group>(null);
  const lightsGroupRef = useRef<THREE.Group>(null);

  // Smooth animation for exploded view separation
  useFrame((_, delta) => {
    if (upperFloorRef.current) {
      const targetY = exploded ? 2.4 : 0;
      upperFloorRef.current.position.y = THREE.MathUtils.damp(
        upperFloorRef.current.position.y,
        targetY,
        5,
        delta
      );
    }

    // Subtle water surface motion
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.04 + Math.sin(Date.now() * 0.002) * 0.02;
      }
    }
  });

  // Dynamic colors based on time of day
  const interiorLightColor = useMemo(() => {
    switch (lightingMode) {
      case 'dusk':
        return '#FFB859';
      case 'golden':
        return '#FFD285';
      case 'night':
        return '#FF9533';
    }
  }, [lightingMode]);

  const interiorLightIntensity = lightingMode === 'night' ? 2.8 : 2.0;

  return (
    <group position={[0, -0.6, 0]}>
      {/* 1. Ground Travertine Terrace & Foundation */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[13, 0.4, 9]} />
        <meshStandardMaterial
          color="#1C2226"
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative Lawn & Landscaped Platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[15.5, 0.3, 11]} />
        <meshStandardMaterial color="#0F1416" roughness={0.9} />
      </mesh>

      {/* 2. Reflection Infinity Pool */}
      <group position={[1.5, 0.22, 2.2]}>
        {/* Pool basin */}
        <mesh receiveShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[5.8, 0.32, 3.2]} />
          <meshStandardMaterial color="#0A0E10" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Water surface */}
        <mesh
          ref={waterRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
          receiveShadow
        >
          <planeGeometry args={[5.6, 3.0]} />
          <meshStandardMaterial
            color="#142B36"
            roughness={0.05}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Floating Sunken Lounge with Fire Pit */}
        <group position={[1.5, 0.08, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[1.6, 0.18, 1.6]} />
            <meshStandardMaterial color="#1E2529" roughness={0.7} />
          </mesh>
          {/* Fire pit glow */}
          <pointLight
            position={[0, 0.25, 0]}
            color="#FF7B25"
            intensity={lightingMode === 'night' ? 2.5 : 1.2}
            distance={4}
          />
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.5, 0.06, 0.5]} />
            <meshStandardMaterial color="#FF5500" emissive="#FF6600" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </group>

      {/* 3. Ground Level Living Pavilion */}
      <group
        position={[-1.8, 1.1, -0.5]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectArea(selectedArea === 'living' ? null : 'living');
        }}
      >
        {/* Rear Monolithic Wall */}
        <mesh position={[0, 0, -2.2]} castShadow receiveShadow>
          <boxGeometry args={[6.4, 2.0, 0.3]} />
          <meshStandardMaterial color="#21292E" roughness={0.8} />
        </mesh>

        {/* Side Structural Shear Wall */}
        <mesh position={[-3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 2.0, 4.4]} />
          <meshStandardMaterial color="#1E2529" roughness={0.75} />
        </mesh>

        {/* Ultra-Clear Structural Glass Curtain Walls */}
        <mesh position={[0, 0, 2.1]}>
          <boxGeometry args={[6.2, 1.95, 0.08]} />
          <meshStandardMaterial
            color="#A7C7D9"
            roughness={0.05}
            metalness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Interior Bookmatched Marble Feature Spine */}
        <mesh position={[0, 0, -1.8]}>
          <boxGeometry args={[2.2, 1.9, 0.15]} />
          <meshStandardMaterial color="#E8E2D8" roughness={0.3} metalness={0.15} />
        </mesh>

        {/* Minimalist Italian Lounge Sofa */}
        <mesh position={[-0.8, -0.65, 0.2]}>
          <boxGeometry args={[2.4, 0.35, 1.4]} />
          <meshStandardMaterial color="#2F383E" roughness={0.85} />
        </mesh>

        {/* Ground Floor Interior Ambient Uplight */}
        <pointLight
          position={[0, 0.3, 0]}
          color={interiorLightColor}
          intensity={interiorLightIntensity}
          distance={7}
          castShadow
        />

        {/* Interactive Annotation Flag */}
        {selectedArea === 'living' && (
          <Html position={[0, 1.3, 0]} center distanceFactor={12}>
            <div className="bg-[#161C1F]/95 backdrop-blur-md border border-[#C9A66B] px-3 py-1.5 rounded text-left whitespace-nowrap shadow-2xl pointer-events-none">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#C9A66B] block">
                GRAND LIVING & DINING ATRIUM
              </span>
              <span className="text-[9px] text-[#F2EFE9] block">
                Double-height glass facade overlooking reflection pool
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* 4. Upper Level Cantilevered Master Residence (Floats with Exploded View) */}
      <group
        ref={upperFloorRef}
        position={[0.4, 3.1, 0.2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectArea(selectedArea === 'master' ? null : 'master');
        }}
      >
        {/* Monolithic Floating Concrete Slab Roof */}
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.28, 5.2]} />
          <meshStandardMaterial color="#252E34" roughness={0.7} />
        </mesh>

        {/* Floating Cantilever Floor Slab */}
        <mesh position={[0, -1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.28, 5.2]} />
          <meshStandardMaterial color="#252E34" roughness={0.7} />
        </mesh>

        {/* Master Glass Box with Corner Wrap */}
        <mesh position={[0.8, 0, 0.6]}>
          <boxGeometry args={[4.8, 1.85, 3.4]} />
          <meshStandardMaterial
            color="#A7C7D9"
            roughness={0.05}
            metalness={0.3}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Luxury Brushed Bronze Vertical Louvers / Brise-Soleil */}
        <group position={[-2.4, 0, 1.5]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[i * 0.25, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 1.85, 0.35]} />
              <meshStandardMaterial
                color="#C9A66B"
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
          ))}
        </group>

        {/* Master Bedroom Interior Soft Light */}
        <pointLight
          position={[0.8, 0.2, 0.4]}
          color={interiorLightColor}
          intensity={interiorLightIntensity * 1.1}
          distance={6}
        />

        {/* Sleek Master Suite Balcony Railing */}
        <mesh position={[1.2, -0.6, 2.5]}>
          <boxGeometry args={[4.2, 0.7, 0.05]} />
          <meshStandardMaterial
            color="#C9A66B"
            roughness={0.15}
            metalness={0.9}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Interactive Annotation Flag */}
        {selectedArea === 'master' && (
          <Html position={[0.8, 1.4, 0.6]} center distanceFactor={12}>
            <div className="bg-[#161C1F]/95 backdrop-blur-md border border-[#C9A66B] px-3 py-1.5 rounded text-left whitespace-nowrap shadow-2xl pointer-events-none">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#C9A66B] block">
                CANTILEVERED MASTER SUITE
              </span>
              <span className="text-[9px] text-[#F2EFE9] block">
                900 sq ft master retreat with private sunrise terrace
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* 5. Architectural Landscape & Perimeter Sculptural Trees */}
      <group position={[-4.8, 0.2, 2.8]}>
        {/* Palm tree trunk */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 2.4, 7]} />
          <meshStandardMaterial color="#30261E" roughness={0.85} />
        </mesh>
        {/* Sculptural tropical canopy */}
        <group position={[0, 2.3, 0]}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <mesh
              key={idx}
              rotation={[0.35, (idx * Math.PI) / 3, 0.2]}
              position={[0, 0, 0]}
              castShadow
            >
              <coneGeometry args={[0.55, 1.4, 5]} />
              <meshStandardMaterial color="#1B281E" roughness={0.8} />
            </mesh>
          ))}
        </group>
      </group>

      <group position={[4.9, 0.2, -2.5]}>
        {/* Second Palm */}
        <mesh castShadow position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 2.8, 7]} />
          <meshStandardMaterial color="#30261E" roughness={0.85} />
        </mesh>
        <group position={[0, 2.7, 0]}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <mesh
              key={idx}
              rotation={[0.3, (idx * Math.PI) / 3 + 0.3, 0.18]}
              position={[0, 0, 0]}
              castShadow
            >
              <coneGeometry args={[0.5, 1.3, 5]} />
              <meshStandardMaterial color="#1D2A20" roughness={0.8} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Recessed Linear Ground Uplights */}
      <group ref={lightsGroupRef} position={[0, 0.22, 0]}>
        {[-3, -1, 1, 3].map((x) => (
          <mesh key={x} position={[x, 0.01, 3.8]}>
            <boxGeometry args={[0.35, 0.02, 0.08]} />
            <meshStandardMaterial
              color="#FFD494"
              emissive="#FFB554"
              emissiveIntensity={lightingMode === 'night' ? 2 : 1}
            />
          </mesh>
        ))}
      </group>

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.65}
        scale={20}
        blur={1.5}
        far={6}
        resolution={512}
        color="#05080A"
      />
    </group>
  );
};

export const VillaViewer3D: React.FC = () => {
  const [lightingMode, setLightingMode] = useState<LightingMode>('dusk');
  const [exploded, setExploded] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<CameraPreset>('overview');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const controlsRef = useRef<any>(null);

  // Set camera preset angles
  const applyCameraPreset = (preset: CameraPreset) => {
    setActivePreset(preset);
    if (!controlsRef.current) return;

    switch (preset) {
      case 'overview':
        controlsRef.current.setLookAt(8, 5, 9, 0, 1.2, 0, true);
        break;
      case 'cantilever':
        controlsRef.current.setLookAt(4, 2.5, 6, 0.5, 2.2, 0, true);
        break;
      case 'pool':
        controlsRef.current.setLookAt(3, 1.2, 5.5, 1.5, 0.6, 2.2, true);
        break;
      case 'aerial':
        controlsRef.current.setLookAt(0.1, 12, 5, 0, 0.5, 0, true);
        break;
    }
  };

  // Sky and ambient light color grading based on lighting mode
  const environmentSettings = useMemo(() => {
    switch (lightingMode) {
      case 'dusk':
        return {
          bg: '#0E1214',
          ambientIntensity: 0.5,
          sunColor: '#FFAE68',
          sunPosition: [12, 6, 8] as [number, number, number],
          sunIntensity: 2.2,
          hemiSky: '#2A3C4D',
          hemiGround: '#0E1214',
        };
      case 'golden':
        return {
          bg: '#121214',
          ambientIntensity: 0.7,
          sunColor: '#FFD79E',
          sunPosition: [14, 8, 6] as [number, number, number],
          sunIntensity: 2.8,
          hemiSky: '#4D473A',
          hemiGround: '#141416',
        };
      case 'night':
        return {
          bg: '#080A0B',
          ambientIntensity: 0.2,
          sunColor: '#6E8DA8',
          sunPosition: [-8, 12, -6] as [number, number, number],
          sunIntensity: 0.5,
          hemiSky: '#121B24',
          hemiGround: '#060708',
        };
    }
  }, [lightingMode]);

  return (
    <section
      id="virtual-tour"
      className="relative w-full py-24 bg-[#0E1214] border-t border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
            <span>SPATIAL ARCHITECTURAL STUDIO</span>
            <span aria-hidden="true">·</span>
            <span>REAL-TIME 3D</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
            THE SANCTUARY — VILLA 3D
          </h2>
          <p className="text-sm sm:text-base text-[#9AA3A8] mt-2 max-w-xl">
            Interactive spatial walkthrough of LIVI’s flagship DHA Phase 6 signature residence.
            Rotate, explode structural slabs, and toggle daylight ambiance.
          </p>
        </div>

        {/* Quick status spec label */}
        <div className="flex items-center gap-4 text-xs font-syne text-[#9AA3A8] border border-white/10 px-4 py-2.5 rounded-sm bg-[#161C1F]">
          <span className="text-[#F2EFE9] font-semibold">PLOT SIZE: 2 KANAL</span>
          <span className="text-white/20">|</span>
          <span className="text-[#C9A66B]">COVERED AREA: 9,200 SQ FT</span>
          <span className="text-white/20">|</span>
          <span>DHA LAHORE</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative w-full h-[600px] lg:h-[680px] bg-gradient-to-b from-[#13191D] via-[#0E1214] to-[#0A0D0E] overflow-hidden rounded-md border border-white/[0.08] max-w-7xl mx-auto">
        <Canvas
          shadows
          camera={{ position: [8, 5, 9], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
        >
          {/* Lighting Rig */}
          <color attach="background" args={[environmentSettings.bg]} />
          <ambientLight intensity={environmentSettings.ambientIntensity} />
          <hemisphereLight
            args={[
              environmentSettings.hemiSky,
              environmentSettings.hemiGround,
              0.8,
            ]}
          />
          <directionalLight
            position={environmentSettings.sunPosition}
            intensity={environmentSettings.sunIntensity}
            color={environmentSettings.sunColor}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-camera-near={0.5}
            shadow-camera-far={25}
            shadow-bias={-0.0005}
          />

          {/* Villa Subject */}
          <VillaArchitecture
            lightingMode={lightingMode}
            exploded={exploded}
            selectedArea={selectedArea}
            onSelectArea={setSelectedArea}
          />

          {/* Smooth Damped Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={4}
            maxDistance={18}
          />
        </Canvas>

        {/* Minimal Spec / Hint Overlay Top-Left */}
        <div className="absolute top-5 left-5 z-10 pointer-events-none flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-[#161C1F]/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-[11px] font-syne tracking-wider uppercase text-[#F2EFE9]">
            <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
            <span>INTERACTIVE 3D · DRAG TO ROTATE · SCROLL TO ZOOM</span>
          </div>
        </div>

        {/* Unified Collapsible Bottom Dock (Zero Viewport Occlusion Directive) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl flex flex-col items-center">
          {/* Collapse/Expand Toggle Tab */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="mb-1.5 px-3 py-1 bg-[#161C1F]/90 backdrop-blur-md border border-white/10 rounded-t-md text-[11px] font-syne tracking-widest text-[#9AA3A8] hover:text-[#C9A66B] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Toggle controls dock"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>SHOW CONTROLS</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>CINEMA VIEW</span>
              </>
            )}
          </button>

          {/* Main Control Dock */}
          {!isDockCollapsed && (
            <div className="w-full bg-[#161C1F]/90 backdrop-blur-md border border-white/10 rounded-sm p-3.5 flex flex-wrap items-center justify-between gap-4 shadow-2xl transition-all">
              {/* Lighting Mode Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mr-1 hidden sm:inline">
                  LIGHTING:
                </span>
                <button
                  onClick={() => setLightingMode('dusk')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-syne tracking-wider flex items-center gap-1.5 transition-all ${
                    lightingMode === 'dusk'
                      ? 'bg-[#C9A66B] text-[#0E1214] font-bold shadow-sm'
                      : 'text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" />
                  Dusk
                </button>
                <button
                  onClick={() => setLightingMode('golden')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-syne tracking-wider flex items-center gap-1.5 transition-all ${
                    lightingMode === 'golden'
                      ? 'bg-[#C9A66B] text-[#0E1214] font-bold shadow-sm'
                      : 'text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Golden
                </button>
                <button
                  onClick={() => setLightingMode('night')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-syne tracking-wider flex items-center gap-1.5 transition-all ${
                    lightingMode === 'night'
                      ? 'bg-[#C9A66B] text-[#0E1214] font-bold shadow-sm'
                      : 'text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Midnight
                </button>
              </div>

              {/* Exploded Architecture Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExploded(!exploded)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-syne tracking-wider flex items-center gap-1.5 transition-all ${
                    exploded
                      ? 'bg-[#C9A66B] text-[#0E1214] font-bold'
                      : 'border border-[#C9A66B]/50 text-[#C9A66B] hover:bg-[#C9A66B]/15'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  {exploded ? 'Collapse Slabs' : 'Exploded View'}
                </button>
              </div>

              {/* Camera Presets */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mr-1 hidden sm:inline">
                  CAMERA:
                </span>
                <button
                  onClick={() => applyCameraPreset('overview')}
                  className={`px-2.5 py-1 rounded text-xs font-syne tracking-wider transition-colors ${
                    activePreset === 'overview'
                      ? 'bg-white/20 text-[#F2EFE9] font-semibold'
                      : 'text-[#9AA3A8] hover:text-white'
                  }`}
                  title="Overview Angle"
                >
                  Front
                </button>
                <button
                  onClick={() => applyCameraPreset('cantilever')}
                  className={`px-2.5 py-1 rounded text-xs font-syne tracking-wider transition-colors ${
                    activePreset === 'cantilever'
                      ? 'bg-white/20 text-[#F2EFE9] font-semibold'
                      : 'text-[#9AA3A8] hover:text-white'
                  }`}
                  title="Cantilever Master Wing"
                >
                  Cantilever
                </button>
                <button
                  onClick={() => applyCameraPreset('pool')}
                  className={`px-2.5 py-1 rounded text-xs font-syne tracking-wider transition-colors ${
                    activePreset === 'pool'
                      ? 'bg-white/20 text-[#F2EFE9] font-semibold'
                      : 'text-[#9AA3A8] hover:text-white'
                  }`}
                  title="Pool & Lounge View"
                >
                  Pool
                </button>
                <button
                  onClick={() => applyCameraPreset('aerial')}
                  className={`px-2.5 py-1 rounded text-xs font-syne tracking-wider transition-colors ${
                    activePreset === 'aerial'
                      ? 'bg-white/20 text-[#F2EFE9] font-semibold'
                      : 'text-[#9AA3A8] hover:text-white'
                  }`}
                  title="Aerial Bird's Eye"
                >
                  Aerial
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
