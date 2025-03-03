import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface BathroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Bathroom({ children, character }: BathroomProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  const outsideObjects = (
    <>
      {/* Bath on the left */}
      <div className="absolute top-1/3 left-0 translate-x-1/4 translate-y-1/3">
        <img
          src="/images/rooms/bathroom/bath.png"
          alt="bath"
          width="591px"
          className="h-auto"
        />
      </div>
    </>
  );
  const roomObjects = (
    <>
      {/* Toilet on the right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/3">
        <img
          src="/images/rooms/bathroom/toilet.png"
          alt="toilet"
          className="w-64 h-auto"
        />
      </div>
    </>
  );

  return (
    <Layout
      background={
        <RoomBackground room="bathroom" translateY="translate-y-[-1.5%]" />
      }
      character={character}
      outsideObjects={outsideObjects}
      roomObjects={roomObjects}
    >
      <MinigameModal
        isOpen={isMinigameModalOpen}
        onClose={() => setIsMinigameModalOpen(false)}
        onSelectGame={handleGameSelect}
      />
      {currentGameUrl && (
        <GameFrame
          url={currentGameUrl}
          onClose={() => setCurrentGameUrl(null)}
        />
      )}
      {children}
    </Layout>
  );
}
