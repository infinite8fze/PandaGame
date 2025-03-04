import { useState } from "react";
import { Scene } from "../Scene";
import { useAudio } from "../../hooks/useAudio";
import { ParentControlPanel } from "../parent/ParentControlPanel";
import RoomsButtons from "./RoomsButtons";
import { Bathroom } from "./Bathroom";
import { Bedroom } from "./Bedroom";
import { Kitchen } from "./Kitchen";
import { School } from "./School";
import { Playroom } from "./Playroom";
import { ParentRoom } from "./ParentRoom";
import RoomSwitch from "./RoomSwitch";
import { SafeArea } from "../SafeArea";

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

  // const handleMicMouseDown = () => {
  //   startRecording();
  // };

  // const handleMicMouseUp = () => {
  //   stopRecording();
  // };

  // const handleLevelClick = () => {
  //   setCurrentLevel((prev) => (prev % 10) + 1);
  // };
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Scene with background and character */}
      <RoomSwitch currentRoom={currentRoom} />
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
        />
      </SafeArea>
      {/* Parent Control Panel */}
      {showControlPanel && (
        <ParentControlPanel onClose={() => setShowControlPanel(false)} />
      )}
    </div>
  );
};
export default Rooms;
