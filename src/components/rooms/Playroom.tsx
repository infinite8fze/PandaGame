import React, { useState } from 'react';
import { RoomBackground } from './RoomBackground';
import { Layout } from '../Layout';
import { MinigameButton } from '../minigames/MinigameButton';
import { MinigameModal } from '../minigames/MinigameModal';
import { GameFrame } from '../minigames/GameFrame';

interface PlayroomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function Playroom({ children, character }: PlayroomProps) {
  const [isMinigameModalOpen, setIsMinigameModalOpen] = useState(false);
  const [currentGameUrl, setCurrentGameUrl] = useState<string | null>(null);

  const handleGameSelect = (url: string) => {
    setCurrentGameUrl(url);
    setIsMinigameModalOpen(false);
  };

  const outsideObjects = (
    <>
      {/* Balloons outside safe area */}
      <div className="absolute top-0 left-8 translate-x-1/4">
        <img 
          src="/images/rooms/gameroom/balloon-1.png" 
          alt="Balloon 1"
          className="w-64 h-auto"
        />
      </div>
      <div className="absolute top-0 right-8 -translate-x-1/4">
        <img 
          src="/images/rooms/gameroom/balloon-2.png" 
          alt="Balloon 2"
          className="w-80 h-auto"
        />
      </div>
    </>
  );

  const roomObjects = (
    <>
      {/* Left side - Game chair and minigame button */}
      <div className="absolute left-4 top-1/2 -translate-y-1/3 flex flex-col items-start">
        <div className="ml-4">
          <MinigameButton onClick={() => setIsMinigameModalOpen(true)} />
        </div>
        <img 
          src="/images/game-chair.png" 
          alt="Gaming Chair"
          className="w-64 h-auto mb-20"
        />
      </div>

      {/* Right side - Ball */}
      <div className="absolute right-0 top-2/3 -translate-y-1/2">
        <MinigameButton 
          onClick={() => setIsMinigameModalOpen(true)}
          imageUrl="/images/rooms/gameroom/ball.png"
          width="w-auto"
          height="h-40"
          animate={false}
        />
      </div>
    </>
  );

  return (
    <Layout
      background={<RoomBackground room="gameroom" />}
      roomObjects={roomObjects}
      outsideObjects={outsideObjects}
      character={character}
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