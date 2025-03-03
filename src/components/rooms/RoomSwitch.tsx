import { useState } from "react";
import { Bathroom } from "./Bathroom";
import { Bedroom } from "./Bedroom";
import { Kitchen } from "./Kitchen";
import { ParentRoom } from "./ParentRoom";
import { Playroom } from "./Playroom";
import { School } from "./School";
interface RoomSwitchProps {
  currentRoom?: string;
}
const RoomSwitch = ({ currentRoom }: RoomSwitchProps) => {
  const renderRoom = () => {

    switch (currentRoom) {
      case "bathroom":
        return <Bathroom />;
      case "bedroom":
        return <Bedroom />;
      case "kitchen":
        return <Kitchen />;
      case "school":
        return <School />;
      case "gameroom":
        return <Playroom />;
      case "parent":
        return <ParentRoom />;
      default:
        return null;
    }
  };

  return renderRoom();
};

export default RoomSwitch;
