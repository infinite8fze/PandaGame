import { useState } from "react";
import { Bathroom } from "./Bathroom";
import { Bedroom } from "./Bedroom";
import { Kitchen } from "./Kitchen";
import { ParentRoom } from "./ParentRoom";
import { Playroom } from "./Playroom";
import { School } from "./School";
import { ShoppingPage } from "./ShoppingPage";
interface RoomSwitchProps {
  currentRoom?: string;
  setIsMinigameModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsShopModalOpen: Dispatch<SetStateAction<boolean>>;
}
const RoomSwitch = ({
  currentRoom,
  setIsMinigameModalOpen,
  setIsShopModalOpen
}: RoomSwitchProps) => {
  const renderRoom = () => {
    switch (currentRoom) {
      case "bathroom":
        return <Bathroom />;
      case "bedroom":
        return <Bedroom />;
      case "kitchen":
        return <Kitchen  setIsShopModalOpen={setIsShopModalOpen} />;
      case "school":
        return <School setIsMinigameModalOpen={setIsMinigameModalOpen} />;
      case "gameroom":
        return <Playroom setIsMinigameModalOpen={setIsMinigameModalOpen} />;
      case "parent":
        return <ParentRoom />;
      default:
        return null;
    }
  };

  return renderRoom();
};

export default RoomSwitch;
