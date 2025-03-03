import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface SchoolProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function School({ children, character }: SchoolProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  const roomObjects = (
    <>
      {/* Pencil on the left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <MinigameButton
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/school/pencil.png"
          width="w-auto"
          height="h-96"
          animate={false}
        />
      </div>

      {/* Calculator on the right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/3 translate-x-1/4">
        <MinigameButton
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/school/calc.png"
          width="w-auto"
          height="h-64"
          animate={false}
        />
      </div>
    </>
  );

  return (
    <Layout
      background={
        <RoomBackground room="school" translateY="translate-y-[-46%]" />
      }
      character={character}
      roomObjects={roomObjects}
      room="school"
    >
      {/* Modals */}
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
