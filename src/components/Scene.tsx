import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Panda } from './Panda';
import { Professor } from './Professor';
import { Loader2 } from 'lucide-react';
import { Layout } from './Layout';
import { Bathroom } from './rooms/Bathroom';
import { Bedroom } from './rooms/Bedroom';
import { Kitchen } from './rooms/Kitchen';
import { School } from './rooms/School';
import { Playroom } from './rooms/Playroom';
import { ParentRoom } from './rooms/ParentRoom';

interface SceneProps {
  currentRoom: string;
  isTalking?: boolean;
  isSpeaking?: boolean;
  children?: React.ReactNode;
}

export function Scene({ currentRoom, isTalking, isSpeaking, children }: SceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRoomChanging, setIsRoomChanging] = useState(false);
  const prevRoomRef = useRef(currentRoom);

  useEffect(() => {
    if (prevRoomRef.current !== currentRoom) {
      setIsRoomChanging(true);
      const timer = setTimeout(() => {
        setIsRoomChanging(false);
      }, 1000);
      prevRoomRef.current = currentRoom;
      return () => clearTimeout(timer);
    }
  }, [currentRoom]);

  const renderCharacter = () => {
    if (currentRoom === 'parent') {
      return <Professor onLoad={() => setIsLoading(false)} />;
    }

    return (
      <div className="absolute inset-0 h-full translate-y-28">
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 4]}
            fov={39}
            near={0.1}
            far={1000}
          />

          <ambientLight intensity={.6} />
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
          <directionalLight position={[2, 2, 1]} intensity={0.2} />
          <directionalLight position={[0, 0, -1]} intensity={0.1} />
          
          <Suspense fallback={null}>
            <Panda 
              position={[0, -0.45, 0]}
              scale={0.25}
              isChangingRoom={isRoomChanging}
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
  };

  const renderRoom = () => {
    const character = renderCharacter();
    const loadingIndicator = isLoading ? (
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
        <div className="bg-white/90 rounded-lg p-4 shadow-lg flex items-center space-x-3">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="text-gray-700 font-medium">Loading character...</span>
        </div>
      </div>
    ) : null;

    switch (currentRoom) {
      case 'bathroom':
        return <Bathroom character={character}>{loadingIndicator}{children}</Bathroom>;
      case 'bedroom':
        return <Bedroom character={character}>{loadingIndicator}{children}</Bedroom>;
      case 'kitchen':
        return <Kitchen character={character}>{loadingIndicator}{children}</Kitchen>;
      case 'school':
        return <School character={character}>{loadingIndicator}{children}</School>;
      case 'gameroom':
        return <Playroom character={character}>{loadingIndicator}{children}</Playroom>;
      case 'parent':
        return <ParentRoom character={character}>{loadingIndicator}{children}</ParentRoom>;
      default:
        return null;
    }
  };

  return renderRoom();
}