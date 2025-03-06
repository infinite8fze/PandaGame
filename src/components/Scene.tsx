import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Panda } from "./Panda";
import { Professor } from "./Professor";
import { Loader2 } from "lucide-react";
import { Layout } from "./Layout";
import { Bathroom } from "./rooms/Bathroom";
import { Bedroom } from "./rooms/Bedroom";
import { Kitchen } from "./rooms/Kitchen";
import { School } from "./rooms/School";
import { Playroom } from "./rooms/Playroom";
import { ParentRoom } from "./rooms/ParentRoom";

interface SceneProps {
  children?: React.ReactNode;
}

export function Scene() {
  const [isLoading, setIsLoading] = useState(true);

  // const renderCharacter = () => {
  // if (currentRoom === 'parent') {
  //   return <Professor onLoad={() => setIsLoading(false)} />;
  // }

  return (
    <div className="absolute inset-0 h-full translate-y-28 z-10">
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 4]}
          fov={39}
          near={0.1}
          far={1000}
        />

        <ambientLight intensity={0.9} />
        <directionalLight
          castShadow
          position={[0, 0, 4]}
          intensity={2}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-near={0.1}
          shadow-camera-far={10}
          shadow-bias={-0.001}
        />
        <directionalLight position={[-2, 2, 1]} intensity={0.5} />
        <directionalLight position={[2, 2, 1]} intensity={0.5} />
        <directionalLight position={[0, 0, -1]} intensity={0.1} />

        <Suspense fallback={null}>
          <Panda
            position={[0, -0.45, 0]}
            scale={0.25}
            isChangingRoom={false}
            onLoad={() => setIsLoading(false)}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
  // };
}
