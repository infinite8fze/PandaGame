import { useState } from "react";
import { Scene } from "../Scene";
import { useAudio } from "../../hooks/useAudio";
import { ParentControlPanel } from "../parent/ParentControlPanel";
import RoomsButtons from "./RoomsButtons";
import RoomSwitch from "./RoomSwitch";
import { SafeArea } from "../SafeArea";
import { MinigameModal } from "../minigames/MinigameModal";
import { GameFrame } from "../minigames/GameFrame";

const Rooms = () => {
  const [currentRoom, setCurrentRoom] = useState("gameroom");
  const {
    isRecording,
    isLoading,
    isSpeaking,
    startRecording,
    stopRecording,
    lastMessage,
    isSupported,
  } = useAudio(currentRoom);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  {
    /* HANDLE ROOM CHANGING FOR PANDA ANIMATION */
  }
  // const [isRoomChanging, setIsRoomChanging] = useState(false);
  // const prevRoomRef = useRef(currentRoom);
  // useEffect(() => {
  //     if (prevRoomRef.current !== currentRoom) {
  //       setIsRoomChanging(true);
  //       const timer = setTimeout(() => {
  //         setIsRoomChanging(false);
  //       }, 1000);
  //       prevRoomRef.current = currentRoom;
  //       return () => clearTimeout(timer);
  //     }
  //   }, [currentRoom]);
  {
    /* HANDLE ROOM CHANGING FOR PANDA ANIMATION */
  }

  const handleMicMouseDown = () => {
    startRecording();
  };

  const handleMicMouseUp = () => {
    stopRecording();
  };
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Scene with background and character */}
      <RoomSwitch
        currentRoom={currentRoom}
        setIsMinigameModalOpen={setIsMinigameModalOpen}
      />
      {/* <div className="absolute inset-0"> */}
      <Scene />
      {/* </div> */}

      {/* Interactive UI elements in 9:16 safe area */}
      <SafeArea>
        <RoomsButtons
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          showControlPanel={showControlPanel}
          setShowControlPanel={setShowControlPanel}
          handleMicMouseDown={handleMicMouseDown}
          handleMicMouseUp={handleMicMouseUp}
          isSupported={isSupported}
          isLoading={isLoading}
          isRecording={isRecording}
          isMinigameModalOpen={isMinigameModalOpen}
        />
      </SafeArea>
      <MinigameModal
        isOpen={isMinigameModalOpen}
        onClose={() => setIsMinigameModalOpen(false)}
        onSelectGame={handleGameSelect}
        currentRoom={currentRoom}
      />
      {currentGameUrl && (
        <GameFrame
          url={currentGameUrl}
          onClose={() => setCurrentGameUrl(null)}
        />
      )}
      {/* Parent Control Panel */}
      {showControlPanel && (
        <ParentControlPanel onClose={() => setShowControlPanel(false)} />
      )}
    </div>
  );
};
export default Rooms;
