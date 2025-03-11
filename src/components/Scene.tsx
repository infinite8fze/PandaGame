import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Character3D } from "./Panda";

export function Scene({ currentRoom = "school", isRecording, isSpeaking }) {
  const [isLoading, setIsLoading] = useState(true);

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
          {/* <Panda animation="Idle" /> */}
          <Character3D
            isListening={isRecording}
            isTalking={isSpeaking}
            position={[0, -0.45, 0]}
            scale={0.25}
            // talkDuration={5000} // 5 seconds of talking
            // onAnimationComplete={() => setIsTalking(false)}
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
