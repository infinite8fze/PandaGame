import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterProps {
  isTalking?: boolean;
  isHappy?: boolean;
}

export function Character({ isTalking = false, isHappy = false, ...props }: CharacterProps) {
  const group = useRef<THREE.Group>();
  const [isPoking, setIsPoking] = useState(false);
  
  // Animation parameters
  const talkingTime = useRef(0);
  const happyTime = useRef(0);
  const initialRotation = useRef<THREE.Euler>();

  // Store initial rotation
  useEffect(() => {
    if (group.current) {
      initialRotation.current = group.current.rotation.clone();
    }
  }, []);
  
  useFrame((state, delta) => {
    if (!group.current) return;

    // Talking animation
    if (isTalking) {
      talkingTime.current += delta * 10;
      group.current.position.y = Math.sin(talkingTime.current) * 0.1;
    } else {
      talkingTime.current = 0;
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        0,
        delta * 5
      );
    }

    // Happy animation
    if (isHappy) {
      happyTime.current += delta * 5;
      group.current.rotation.z = (initialRotation.current?.z || 0) + Math.sin(happyTime.current) * 0.2;
    } else {
      happyTime.current = 0;
      if (initialRotation.current) {
        group.current.rotation.z = THREE.MathUtils.lerp(
          group.current.rotation.z,
          initialRotation.current.z,
          delta * 5
        );
      }
    }

    // Poke reaction
    if (isPoking) {
      group.current.rotation.z = (initialRotation.current?.z || 0) + Math.sin(state.clock.getElapsedTime() * 15) * 0.1;
    } else if (!isHappy && initialRotation.current) {
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        initialRotation.current.z,
        delta * 5
      );
    }
  });

  const handlePointerDown = () => {
    setIsPoking(true);
    setTimeout(() => setIsPoking(false), 500);
  };

  return (
    <group 
      ref={group} 
      {...props}
      onPointerDown={handlePointerDown}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 0.75, 0.25]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.75, 0.25]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.7, 0.3]}>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.25, 0.9, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.25, 0.9, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <mesh castShadow position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh castShadow position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh castShadow position={[-0.2, -0.6, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh castShadow position={[0.2, -0.6, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}