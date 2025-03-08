import React, { useEffect, useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface PlayroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
  setIsMinigameModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function Playroom({
  children,
  character,
  setIsMinigameModalOpen,
}: PlayroomProps) {
  const roomObjects = (
    <>
      {/* Left side - Game chair and minigame button */}
      <div className="relative left-4 top-[82%] translate-y-[-100%] flex flex-col items-start">
        <div className="extra-sm:ml-2 md:ml-4 w-[20%] ">
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
      {children}
    </Layout>
  );
}
