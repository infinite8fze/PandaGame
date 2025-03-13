import React, { useState, Dispatch } from "react";
import { SetStateAction } from "react";
import { RoomBackground } from "./RoomBackground";
import { Layout } from "../Layout";
import { MinigameButton } from "../minigames/MinigameButton";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

interface KitchenProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
 setIsShopModalOpen: Dispatch<SetStateAction<boolean>>;
}
export function Kitchen({ children, character, setIsShopModalOpen }: KitchenProps) {
  const outsideObjects = (
    <>
      {/* Stove on the left */}
      <div className="absolute extra-sm:left-0 md:left-[25%] lg:left-[40%] top-[74%] translate-y-[-100%] translate-x-[-50%]">
        <img
          src="/images/rooms/kitchen/stove.png"
          alt="Stove"
          className="w-96 h-auto"
        />
      </div>

      {/* Refrigerator on the right */}
   
      <div className="absolute extra-sm:right-0 md:right-[20%] lg:right-[40%] top-[75%] translate-y-[-100%] translate-x-1/2">
        <button className="clickable" onClick={() =>setIsShopModalOpen(true)}>
        <img
          src="/images/rooms/kitchen/refrigerator.png"
          alt="Refrigerator"
          className="w-80 h-auto"
        />
        </button>
      </div>
    </>
  );

  return (
    <Layout
      background={
        <RoomBackground room="kitchen" translateY="translate-y-[-52%]" />
      }
      character={character}
      outsideObjects={outsideObjects}
      room="kitchen"
    >
      {children}
    </Layout>
  );
}
