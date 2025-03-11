import { useEffect, useRef, useState, useCallback } from "react";
import { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type AnimationState =
  | "idle"
  | "listening"
  | "talking"
  | "jumping"
  | "falling"
  | "laughing"
  | "happy";

export const useCharacterAnimations = ({ scene, animations }: GLTF) => {
  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionsRef = useRef<Map<string, AnimationAction>>(new Map());
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationState>("idle");
  const [isReady, setIsReady] = useState(false);
  const talkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scene || !animations) return;

    // Create animation mixer
    mixerRef.current = new AnimationMixer(scene);

    // Create animation actions
    animations.forEach((clip: AnimationClip) => {
      const action = mixerRef.current!.clipAction(clip);
      actionsRef.current.set(clip.name, action);
    });

    // Set ready state after initialization
    setIsReady(true);

    return () => {
      if (talkIntervalRef.current) {
        clearInterval(talkIntervalRef.current);
      }
      mixerRef.current?.stopAllAction();
    };
  }, [scene, animations]);

  const playAnimation = useCallback(
    (
      animationName: string,
      options: { loop?: boolean; crossFadeDuration?: number } = {}
    ) => {
      if (!mixerRef.current || !actionsRef.current.has(animationName)) return;

      const { loop = false, crossFadeDuration = 0.5 } = options;
      const newAction = actionsRef.current.get(animationName)!;
      const currentAction = Array.from(actionsRef.current.values()).find(
        (action) => action.isRunning()
      );

      if (currentAction && currentAction !== newAction) {
        currentAction.fadeOut(crossFadeDuration);
      }

      newAction.reset();
      newAction.fadeIn(crossFadeDuration);
      newAction.play();
      newAction.loop = loop;

      if (!loop) {
        newAction.clampWhenFinished = true;
      }
    },
    []
  );

  const startListening = useCallback(() => {
    setCurrentAnimation("listening");
    playAnimation("ear", { loop: true });
  }, [playAnimation]);

  const stopListening = useCallback(() => {
    setCurrentAnimation("idle");
    playAnimation("Idle", { loop: true });
  }, [playAnimation]);

  const playRandomTalkAnimation = useCallback(() => {
    const talkAnimations = ["talk01", "talk02", "talk03"];
    const randomTalk =
      talkAnimations[Math.floor(Math.random() * talkAnimations.length)];
    const talkAction = actionsRef.current.get(randomTalk);

    if (talkAction) {
      playAnimation(randomTalk, { loop: false });
      return talkAction.getClip().duration * 1000; // Return duration in milliseconds
    }
    return 0;
  }, [playAnimation]);

  const startTalking = useCallback(
    (duration: number) => {
      setCurrentAnimation("talking");

      // Clear any existing interval
      if (talkIntervalRef.current) {
        clearInterval(talkIntervalRef.current);
      }

      // Play first animation immediately
      const firstAnimDuration = playRandomTalkAnimation();

      // Set up interval to play random talk animations
      let totalTime = 0;
      talkIntervalRef.current = setInterval(() => {
        const animDuration = playRandomTalkAnimation();
        totalTime += animDuration;

        // If we've exceeded the total duration, clear the interval
        if (totalTime >= duration) {
          if (talkIntervalRef.current) {
            clearInterval(talkIntervalRef.current);
          }
        }
      }, firstAnimDuration); // Wait for first animation to complete before starting next
    },
    [playRandomTalkAnimation]
  );

  const stopTalking = useCallback(() => {
    if (talkIntervalRef.current) {
      clearInterval(talkIntervalRef.current);
    }
    stopListening(); // Return to idle
  }, [stopListening]);

  const jump = useCallback(() => {
    setCurrentAnimation("jumping");
    playAnimation("jump", { loop: false });

    const jumpAction = actionsRef.current.get("jump");
    if (jumpAction) {
      setTimeout(() => {
        setCurrentAnimation("falling");
        playAnimation("Fall", { loop: false });

        // Return to idle after fall animation
        const fallAction = actionsRef.current.get("Fall");
        if (fallAction) {
          setTimeout(() => {
            stopListening(); // This will return to idle
          }, fallAction.getClip().duration * 1000);
        }
      }, jumpAction.getClip().duration * 1000);
    }
  }, [playAnimation, stopListening]);

  const laugh = useCallback(() => {
    setCurrentAnimation("laughing");
    playAnimation("laugh", { loop: false });

    const laughAction = actionsRef.current.get("laugh");
    if (laughAction) {
      setTimeout(() => {
        stopListening(); // This will return to idle
      }, laughAction.getClip().duration * 1000);
    }
  }, [playAnimation, stopListening]);

  const happy = useCallback(() => {
    setCurrentAnimation("happy");
    playAnimation("happy", { loop: false });

    const happyAction = actionsRef.current.get("happy");
    if (happyAction) {
      setTimeout(() => {
        stopListening(); // This will return to idle
      }, happyAction.getClip().duration * 1000);
    }
  }, [playAnimation, stopListening]);

  return {
    currentAnimation,
    startListening,
    stopListening,
    startTalking,
    stopTalking,
    jump,
    laugh,
    happy,
    mixer: mixerRef.current,
    playAnimation,
    isReady,
  };
};
