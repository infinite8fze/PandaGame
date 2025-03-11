import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useCharacterAnimations } from "../hooks/useCharacterAnimations";
import { Group } from "three";
interface Character3DProps {
  isListening?: boolean;
  isTalking?: boolean;
  onAnimationComplete?: () => void;
  position?: [number, number, number];
  scale?: number;
}

export function Character3D({
  isListening = false,
  isTalking = false,
  position = [0, 0, 0],
  scale = 1,
  onAnimationComplete,
}: Character3DProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/3D-assets/72.glb");
  const {
    currentAnimation,
    startListening,
    stopListening,
    startTalking,
    mixer,
    playAnimation,
    isReady,
  } = useCharacterAnimations({ scene, animations });

  // Start idle animation only after the model and animations are ready
  useEffect(() => {
    if (isReady) {
      playAnimation("Idle", { loop: true });
    }
  }, [isReady, playAnimation]);
  // Start idle animation immediately when component mounts
  useEffect(() => {
    playAnimation("Idle", { loop: true });
  }, [playAnimation]);

  // Handle animation updates
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  // Handle listening state changes
  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening, startListening, stopListening]);

  // Handle talking state changes
  useEffect(() => {
    if (isTalking) {
      startTalking(500);
    }
  }, [isTalking, startTalking]);

  useEffect(() => {
    if (scene && animations) {
      playAnimation("Idle", { loop: true });
    }
  }, [scene, animations, playAnimation]);

  return (
    <group ref={group} position={position} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}

// Pre-load the model
useGLTF.preload("/3D-assets/72.glb");
