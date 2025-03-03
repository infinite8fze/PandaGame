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
  SchoolIcon,
} from "../icons";
interface RoomButtonsProps {
  currentRoom?: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
}
const RoomsButtons = ({ currentRoom, setCurrentRoom }: RoomButtonsProps) => {
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
  const [showControlPanel, setShowControlPanel] = useState(false);

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
            <button
              onClick={() => setCurrentRoom("parent")}
              className="absolute top-4 right-4 z-20 w-28 h-28 transition-transform hover:scale-110"
            >
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/images/parent-frame.png)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/svg/parent.svg"
                  alt="Parent Room"
                  className="w-12 h-12"
                />
              </div>
            </button>
          )}

          {/* Back to Game Room Button - Only show in parent room */}
          {currentRoom === "parent" && (
            <button
              onClick={() => setCurrentRoom("gameroom")}
              className="absolute top-4 left-4 z-20 w-16 h-16 transition-transform hover:scale-110"
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
                className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-24 transition-transform hover:scale-105"
              >
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url(/images/Customization.png)" }}
                />
                <span className="relative z-10 text-[#4C3BAC] text-2xl font-bold">
                  Customization
                </span>
              </button>

              {/* Progress Center Button */}
              <button className="absolute top-40 left-1/2 -translate-x-1/2 w-64 h-24 transition-transform hover:scale-105">
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url(/images/Progress-Center.png)",
                  }}
                />
                <span className="relative z-10 text-[#9E009E] text-2xl font-bold">
                  Progress Center
                </span>
              </button>
            </>
          )}

          {/* Level Button - Now shown in all rooms except parent room */}
          {currentRoom !== "parent" && (
            <div className="absolute top-4 left-4 z-20">
              <LevelButton level={currentLevel} onClick={handleLevelClick} />
            </div>
          )}

          {/* Microphone Button */}
          <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onMouseDown={handleMicMouseDown}
              onMouseUp={handleMicMouseUp}
              onMouseLeave={handleMicMouseUp}
              onTouchStart={handleMicMouseDown}
              onTouchEnd={handleMicMouseUp}
              className={`w-24 h-24 relative flex items-center justify-center transition-transform ${
                !isSupported
                  ? "opacity-50 cursor-not-allowed"
                  : isRecording
                  ? "scale-110"
                  : "hover:scale-105"
              }`}
              title={
                isSupported
                  ? "Press and hold to record"
                  : "Speech recognition not supported"
              }
              disabled={!isSupported}
            >
              {/* Mic Frame Background - Different for parent room */}
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    currentRoom === "parent"
                      ? "url(/images/parent-mic-frame.png)"
                      : "url(/images/mic-frame.png)",
                }}
              />

              {/* Icon */}
              <div className="relative z-10">
                {isLoading ? (
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                ) : isRecording ? (
                  <Mic className="w-8 h-8 text-red-500" />
                ) : (
                  <MicOff className="w-8 h-8 text-gray-800" />
                )}
              </div>
            </button>
          </div>

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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2  z-10 w-full grid grid-cols-5 gap-4 h-auto">
              {rooms.map((room) => (
                <BubbleButton
                  icon={room.icon}
                  key={room.id}
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
