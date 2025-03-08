import React, { useState } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface BedroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Bedroom({ children, character }: BedroomProps) {
  const outsideObjects = (
    <>
      {/* Wardrobe on the right */}
      <div className="absolute extra-sm:left-[-20%] md:left-[10%] lg:left-[32%]  extra-sm:top-[80%] md:top-[79%] translate-y-[-100%] translate-x-[-50%]">
        <img
          src="/images/rooms/bedroom/wardrobe.png"
          alt="Wardrobe"
          className=" h-auto"
        />
        <img
          src="/images/rooms/bedroom/left-table.png"
          alt="Wardrobe"
          className=" h-auto absolute translate-y-[-105%] left-[-70%] "
        />
      </div>

      {/* Bed on the left */}
      <div className="absolute extra-sm:right-[-140%] md:right-[-55%] lg:right-[5%] top-[80%] translate-y-[-100%] translate-x-[-50%]">
        <img
          src="/images/rooms/bedroom/bed.png"
          alt="Bed"
          className="w-[500px] h-auto"
        />
      </div>

      {/* Light at the top */}
      <div className="absolute extra-sm:right-[-80%] lg:right-[5%] top-[75%] -translate-x-1/2 translate-y-[-100%]">
        <img
          src="/images/rooms/bedroom/light.png"
          alt="Light"
          className="w-48 h-auto"
        />
      </div>
    </>
  );

  return (
    <Layout
      background={
        <RoomBackground room="bedroom" translateY="translate-y-[-61%]" />
      }
      character={character}
      outsideObjects={outsideObjects}
    >
      {children}
    </Layout>
  );
}
