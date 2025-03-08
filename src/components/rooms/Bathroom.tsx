import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface BathroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Bathroom({ children, character }: BathroomProps) {
  const outsideObjects = (
    <>
      {/* Stove on the left */}
      <div className="absolute extra-sm:left-[-30%] md:left-0 lg:left-[27%] top-[77%] translate-y-[-100%] translate-x-[-50%]">
        <img
          src="/images/rooms/bathroom/bath.png"
          alt="Bath"
          className="w-auto extra-sm:h-72 md:h-80"
        />
        <img
          src="/images/rooms/bathroom/Stool.png"
          alt="Stool"
          className="w-50 h-auto absolute translate-y-[-70%] translate-x-[-50%] extra-sm:left-[50%] md:left-[45%] lg:left-[47%] top-[100%]"
        />
        <img
          src="/images/rooms/bathroom/Soap2.png"
          alt="Soap"
          className="extra-sm:w-20 md:w-24 lg:w-24 h-auto absolute translate-y-[-70%] translate-x-[-50%] extra-sm:left-[66%] md:left-[56%] lg:left-[60%] top-[65%]"
        />
        <img
          src="/images/rooms/bathroom/Soap.png"
          alt="Soap"
          className="extra-sm:w-20 md:w-24 lg:w-20 h-auto absolute translate-y-[-70%] translate-x-[-50%] extra-sm:left-[66%] md:left-[40%] lg:left-[45%] top-[65%]"
        />
      </div>

      {/* Toilet on the right */}
      <div className="absolute extra-sm:right-[20%] md:right-[20%] lg:right-[37%] top-[78%] translate-y-[-100%] translate-x-1/2">
        <img
          src="/images/rooms/bathroom/toilet.png"
          alt="Toilet"
          className="w-56 h-auto"
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
    >
      {children}
    </Layout>
  );
}
