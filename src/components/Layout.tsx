import React from 'react';
import { SafeArea } from './SafeArea';
import { Table } from './rooms/Table';

interface LayoutProps {
  children: React.ReactNode;
  background?: React.ReactNode;
  roomObjects?: React.ReactNode;
  outsideObjects?: React.ReactNode;
  character?: React.ReactNode;
  ui?: React.ReactNode;
  room?: string;
}

export function Layout({ background, roomObjects, outsideObjects, character, ui, children, room }: LayoutProps) {
  return (
    <div className="relative w-full h-full">
      {/* Layer 1-3: Background (floors, walls, carpets) */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {background}
      </div>

      {/* Objects outside safe area */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {outsideObjects}
      </div>

      {/* Safe area container */}
      <SafeArea>
        <div className="relative w-full h-full">
          {/* Layer 4: Room-specific objects */}
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            {roomObjects}
          </div>
          
          {/* Layer 5: Character */}
          <div className="absolute inset-0" style={{ zIndex: 30 }}>
            {character}
          </div>

          {/* Layer 5.5: Table - Between character and UI */}
          <div className="absolute inset-0" style={{ zIndex: 35 }}>
            {room && <Table room={room} />}
          </div>
          
          {/* Layer 6: UI Elements */}
          <div className="absolute inset-0" style={{ zIndex: 40 }}>
            {ui}
          </div>
          
          {/* Additional content (modals, overlays, etc.) */}
          <div className="absolute inset-0" style={{ zIndex: 50 }}>
            {children}
          </div>
        </div>
      </SafeArea>
    </div>
  );
}