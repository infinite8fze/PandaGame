import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface PlayroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Playroom({ children, character }: PlayroomProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };
  const roomObjects = (
    <>
      {/* Left side - Game chair and minigame button */}
      <div className="relative left-4 top-[80%] translate-y-[-100%] flex flex-col items-start">
        <div className="ml-4 w-[20%]">
          <MinigameButton onClick={() => setIsMinigameModalOpen(true)} />
        </div>
        <img
          src="/images/game-chair.png"
          alt="Gaming Chair"
          className="w-[30%] h-auto mb-20"
        />
      </div>

      {/* Right side - Ball */}
      <div className="relative right-[20%] top-[45%] translate-y-[-100%] translate-x-[100%]">
        <MinigameButton
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/gameroom/ball.png"
          width="w-[30%]"
          height="h-auto"
          animate={false}
        />
      </div>
    </>
  );
  return (
    <Layout
      background={
        <RoomBackground room="gameroom" translateY="translate-y-[-30%]" />
      }
      roomObjects={roomObjects}
      character={character}
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
