import React, { useState } from 'react';
import { RoomBackground } from './RoomBackground';
import { Layout } from '../Layout';
import { MinigameModal } from '../minigames/MinigameModal';
import { GameFrame } from '../minigames/GameFrame';

interface BedroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Bedroom({ children, character }: BedroomProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  const outsideObjects = (
    <>
      {/* Wardrobe on the right */}
      <div className="absolute left-1/3 top-2/3 translate-y-[-90%] translate-x-[-50%]">
        <img 
          src="/images/rooms/bedroom/wardrobe.png" 
          alt="Wardrobe"
          className="w-96 h-auto"
        />
      </div>

      {/* Bed on the left */}
      <div className="absolute right-1/3 top-2/3 translate-y-[-90%] translate-x-[70%]">
        <img 
          src="/images/rooms/bedroom/bed.png" 
          alt="Bed"
          className="w-[500px] h-auto"
        />
      </div>

      {/* Light at the top */}
      <div className="absolute right-0 top-1/2 -translate-x-1/2 translate-y-[-50%]">
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
      background={<RoomBackground room="bedroom" />}
      character={character}
      outsideObjects={outsideObjects}
    >
      <MinigameModal
        isOpen={isMinigameModalOpen}
        onClose={() => setIsMinigameModalOpen(false)}
        onSelectGame={handleGameSelect}
      />
      {currentGameUrl && (
        <GameFrame
          url={currentGameUrl}
          onClose={() => setCurrentGameUrl(null)}
        />
      )}
      {children}
    </Layout>
  );
}