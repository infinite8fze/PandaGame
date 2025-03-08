import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface SchoolProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
  setIsMinigameModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function School({
  children,
  character,
  setIsMinigameModalOpen,
}: SchoolProps) {
  const roomObjects = (
    <>
      {/* Pencil on the left */}
      <div className="relative left-[-8%] extra-sm:top-[57%] md:top-[60%] -translate-y-1/2 clickable">
        <MinigameButton
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/school/pencil.png"
          width="extra-sm:w-[40%] md:w-[30%]"
          height="h-auto"
          animate={false}
        />
      </div>

      {/* Calculator on the right */}
      <div className="relative extra-sm:right-[32%] md:right-[26%] extra-sm:top-[38%] md:top-[43%] translate-y-[-100%] translate-x-[100%]">
        <MinigameButton
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/school/calc.png"
          width="extra-sm:w-[50%] md:w-[40%]"
          height="h-auto"
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
      {children}
    </Layout>
  );
}
