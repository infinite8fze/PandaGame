import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface PandaProps {
  position?: [number, number, number];
  scale?: number;
  isChangingRoom?: boolean;
  onLoad?: () => void;
}

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
  scene: THREE.Group;
};

export function Panda({ 
  position = [0, 0, 0], 
  scale = 1,
  isChangingRoom = false,
  onLoad 
}: PandaProps) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF('/3D-assets/72.glb') as GLTFResult;
  const { actions, mixer } = useAnimations(gltf.animations, group);
  const [isReady, setIsReady] = useState(false);
  const currentAction = useRef<THREE.AnimationAction | null>(null);
  const isAnimating = useRef(false);

  // Handle room change animation
  useEffect(() => {
    if (!actions || !isReady) return;

    if (isChangingRoom && !isAnimating.current) {
      isAnimating.current = true;
      
      // Stop current animation
      if (currentAction.current) {
        currentAction.current.fadeOut(0.3);
      }

      // Play jump animation
      const jumpAction = actions['jump'];
      if (jumpAction) {
        jumpAction.reset();
        jumpAction.setLoop(THREE.LoopOnce, 1);
        jumpAction.clampWhenFinished = true;
        jumpAction.fadeIn(0.3);
        jumpAction.play();

        // Return to idle after jump completes
        const duration = jumpAction.getClip().duration * 1000;
        setTimeout(() => {
          jumpAction.fadeOut(0.3);
          const idleAction = actions['Idle'];
          if (idleAction) {
            idleAction.reset();
            idleAction.fadeIn(0.3);
            idleAction.play();
            currentAction.current = idleAction;
          }
          isAnimating.current = false;
        }, duration);

        currentAction.current = jumpAction;
      }
    }
  }, [isChangingRoom, actions, isReady]);

  // Initialize model and animations
  useEffect(() => {
    if (!gltf.scene || !actions) return;

    const textureLoader = new THREE.TextureLoader();
    const texturePromises = [];

    // Setup textures
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Create promises for texture loading
        texturePromises.push(
          new Promise<void>((resolve) => {
            textureLoader.load('/3D-assets/Panda_0_ALBD-TRANS.jpg', (texture) => {
              texture.flipY = false;
              texture.encoding = THREE.sRGBEncoding;
              child.material.map = texture;
              child.material.needsUpdate = true;
              resolve();
            });
          }),
          new Promise<void>((resolve) => {
            textureLoader.load('/3D-assets/Panda_0_Normal.jpg', (texture) => {
              texture.flipY = false;
              texture.encoding = THREE.sRGBEncoding;
              child.material.normalMap = texture;
              child.material.normalScale.set(0.5, 0.5);
              child.material.needsUpdate = true;
              resolve();
            });
          }),
          new Promise<void>((resolve) => {
            textureLoader.load('/3D-assets/Panda_0_Emission.jpg', (texture) => {
              texture.flipY = false;
              texture.encoding = THREE.sRGBEncoding;
              child.material.emissiveMap = texture;
              child.material.emissive = new THREE.Color(0xffffff);
              child.material.emissiveIntensity = 0.2;
              child.material.needsUpdate = true;
              resolve();
            });
          })
        );

        child.material.roughness = 0.8;
        child.material.metalness = 0.1;
        child.material.envMapIntensity = 1.0;
      }
    });

    // Wait for all textures to load
    Promise.all(texturePromises)
      .then(() => {
        // Start idle animation
        const idleAction = actions['Idle'];
        if (idleAction) {
          idleAction.reset().play();
          idleAction.setLoop(THREE.LoopRepeat, Infinity);
          currentAction.current = idleAction;
        }
        
        setIsReady(true);
        onLoad?.();
      })
      .catch(error => {
        console.error('Error loading textures:', error);
        // Still mark as ready even if textures fail
        setIsReady(true);
        onLoad?.();
      });

    return () => {
      // Cleanup animations
      Object.values(actions).forEach(action => action?.stop());
    };
  }, [gltf.scene, actions, onLoad]);

  // Update animation mixer
  useFrame((_, delta) => {
    mixer.update(delta);
  });

  if (!isReady) return null;

  return (
    <group 
      ref={group} 
      position={position} 
      scale={[scale, scale, scale]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/3D-assets/72.glb');