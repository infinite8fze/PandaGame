import React, { useState } from 'react';
import { RoomBackground } from './RoomBackground';
import { Layout } from '../Layout';
import { MinigameButton } from '../minigames/MinigameButton';
import { MinigameModal } from '../minigames/MinigameModal';
import { GameFrame } from '../minigames/GameFrame';

interface KitchenProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Kitchen({ children, character }: KitchenProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  const outsideObjects = (
    <>
      {/* Stove on the left */}
      <div className="absolute left-1/3 top-2/3 translate-y-[-100%] translate-x-[-20%]">
        <img 
          src="/images/rooms/kitchen/stove.png" 
          alt="Stove"
          className="w-96 h-auto"
        />
      </div>

      {/* Refrigerator on the right */}
      <div className="absolute right-1/3 top-2/3 translate-y-[-100%] translate-x-1/2">
        <img 
          src="/images/rooms/kitchen/refrigerator.png" 
          alt="Refrigerator"
          className="w-80 h-auto"
        />
      </div>
    </>
  );

  return (
    <Layout
      background={<RoomBackground room="kitchen" />}
      character={character}
      outsideObjects={outsideObjects}
      room="kitchen"
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