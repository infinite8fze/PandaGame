import { Dispatch, SetStateAction, useState } from "react";
import { CurrencyDisplay } from "../CurrencyDisplay";
import { Loader2, Mic, MicOff } from "lucide-react";
import { RoomButton } from "../RoomButton";
import { LevelButton } from "../LevelButton";
import { useAudio } from "../../hooks/useAudio";
import BubbleButton from "../BubbleButton";
import {
  BathroomIcon,
  BedroomIcon,
  GameRoomIcon,
  KitchenIcon,
  ParentIcon,
  SchoolIcon,
  KingIcon,
} from "../icons";
interface RoomButtonsProps {
  currentRoom?: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  showControlPanel?: boolean;
  setShowControlPanel: Dispatch<SetStateAction<boolean>>;
}
const RoomsButtons = ({
  currentRoom,
  setCurrentRoom,
  showControlPanel,
  setShowControlPanel,
}: RoomButtonsProps) => {
  const rooms = [
    { id: "gameroom", name: "Playroom", icon: GameRoomIcon },
    { id: "kitchen", name: "Kitchen", icon: KitchenIcon },
    { id: "bathroom", name: "Bathroom", icon: BathroomIcon },
    { id: "school", name: "School", icon: SchoolIcon },
    { id: "bedroom", name: "Bedroom", icon: BedroomIcon },
  ];
  const {
    isRecording,
    isLoading,
    isSpeaking,
    startRecording,
    stopRecording,
    lastMessage,
    isSupported,
  } = useAudio(currentRoom);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coins, setCoins] = useState(150);

  const handleMicMouseDown = () => {
    startRecording();
  };

  const handleMicMouseUp = () => {
    stopRecording();
  };

  const handleLevelClick = () => {
    setCurrentLevel((prev) => (prev % 10) + 1);
  };
  return (
    <>
      {/* Interactive UI elements in 9:16 safe area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full">
          {/* Currency Display - Only show when not in parent room */}
          {currentRoom !== "parent" && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <CurrencyDisplay amount={coins} />
            </div>
          )}

          {/* Parent Room Button - Only show when not in parent room */}
          {currentRoom !== "parent" && (
            <div className="absolute top-4 right-4 z-20 w-auto">
              <BubbleButton
                bgColor={"orangeGradient"}
                borderColor={"borderOrangeGradient"}
                icon={ParentIcon}
                onClick={() => setCurrentRoom("parent")}
              />
              <div className="w-full h-full absolute top-0 left-0 inset-0 z-20">
                <KingIcon className="w-6 h-6 relative top-2 left-1/2 -translate-x-1/2 translate-y-[-100%] text-[#FEDA0C]"></KingIcon>
              </div>
            </div>
          )}

          {/* Back to Game Room Button - Only show in parent room */}
          {currentRoom === "parent" && (
            <button
              onClick={() => setCurrentRoom("gameroom")}
              className="clickable absolute top-4 left-4 z-20 w-16 h-16 transition-transform hover:scale-110"
            >
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/images/home.png)" }}
              />
            </button>
          )}

          {/* Parent Room Specific Buttons */}
          {currentRoom === "parent" && (
            <>
              {/* Customization Button */}
              <button
                onClick={() => setShowControlPanel(true)}
                className="clickable absolute top-20 left-1/2 -translate-x-1/2 w-64 h-20
                transition-transform hover:scale-105 px-6 py-2 text-2xl  font-bold text-customization-icon bg-gradient-to-b from-white to-blue-200 border-4 border-customization-icon rounded-full
                border-customization-icon rounded-full shadow-md hover:bg-purple-100 transition-all"
              >
                Customization
              </button>
              <button
                className="clickable absolute top-44 left-1/2 -translate-x-1/2 w-64 h-20
                transition-transform hover:scale-105 px-6 py-2 text-2xl border-4 border-progressCenter-icon rounded-full font-bold text-progressCenter-icon bg-gradient-to-b from-white to-purple-200
                border-progressCenter-icon rounded-full shadow-md hover:bg-purple-100 transition-all"
              >
                Progress Center
              </button>
              {/* Progress Center Button */}
            </>
          )}

          {/* Level Button - Now shown in all rooms except parent room */}
          {currentRoom !== "parent" && (
            <div className="absolute top-4 left-4 z-20">
              <LevelButton level={currentLevel} onClick={handleLevelClick} />
            </div>
          )}

          {/* Microphone Button */}

          {currentRoom !== "parent" && (
            <div className=" clickable absolute bottom-36 left-1/2 transform -translate-x-1/2 z-10">
              <button
                onMouseDown={handleMicMouseDown}
                onMouseUp={handleMicMouseUp}
                onMouseLeave={handleMicMouseUp}
                onTouchStart={handleMicMouseDown}
                onTouchEnd={handleMicMouseUp}
                title={
                  isSupported
                    ? "Press and hold to record"
                    : "Speech recognition not supported"
                }
                disabled={!isSupported}
                className="relative flex items-center justify-center w-24 h-24 relative p-4 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 shadow-lg hover:scale-105 transition-transform"
              >
                <div className="absolute inset-1 rounded-full border-2 border-orange-500"></div>
                <div className="absolute inset-0 rounded-full border-4 border-white"></div>
                <div className="relative z-10">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  ) : isRecording ? (
                    <Mic className="w-8 h-8 text-red-500 " />
                  ) : (
                    <MicOff className="w-8 h-8 text-gray-800" />
                  )}
                </div>
              </button>
            </div>
          )}
          {currentRoom === "parent" && (
            <div className=" clickable absolute bottom-36 left-1/2 transform -translate-x-1/2 z-10">
              <button
                onMouseDown={handleMicMouseDown}
                onMouseUp={handleMicMouseUp}
                onMouseLeave={handleMicMouseUp}
                onTouchStart={handleMicMouseDown}
                onTouchEnd={handleMicMouseUp}
                title={
                  isSupported
                    ? "Press and hold to record"
                    : "Speech recognition not supported"
                }
                disabled={!isSupported}
                className="relative flex items-center justify-center w-24 h-24 relative p-4 rounded-full bg-gradient-to-b from-[#29A0D4] to-[#A8E2EE] shadow-lg hover:scale-105 transition-transform"
              >
                <div className="absolute inset-1 rounded-full border-2 border-[#0D5386]"></div>
                <div className="absolute inset-0 rounded-full border-4 border-white"></div>
                <div className="relative z-10">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 text-[#0D5386] animate-spin" />
                  ) : isRecording ? (
                    <Mic className="w-8 h-8 text-red-500 " />
                  ) : (
                    <MicOff className="w-8 h-8 text-gray-800" />
                  )}
                </div>
              </button>
            </div>
          )}
          {/* Free Trial Button - Only in parent room */}
          {currentRoom === "parent" && (
            <button className="absolute bottom-5 left-1/2 -translate-x-1/2 w-64 h-32 transition-transform hover:scale-105">
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/images/Free-trial.png)" }}
              />
              <span className="relative z-10 text-[#1B1B1B] text-2xl font-bold">
                Free Trial
              </span>
            </button>
          )}

          {/* Room Selection - Only show when not in parent room */}
          {currentRoom !== "parent" && (
            <div className="flex flex-row  gap-4  w-auto h-auto  absolute bottom-8 left-1/2 transform -translate-x-1/2  z-10">
              {rooms.map((room) => (
                <BubbleButton
                  icon={room.icon}
                  key={room.id}
                  bgColor={"greenGradient"}
                  isActive={currentRoom === room.id}
                  onClick={() => setCurrentRoom(room.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default RoomsButtons;
