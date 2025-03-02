import React from 'react';
import { RoomIcon } from './RoomIcon';

interface RoomButtonProps {
  id: string;
  isActive: boolean;
  onClick: () => void;
}

export function RoomButton({ id, isActive, onClick }: RoomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-20 h-20 transition-transform duration-300 overflow-hidden rounded-[30px] ${
        isActive ? 'scale-125' : 'hover:scale-105'
      }`}
    >
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #6AFF52, #33DE44)',
          opacity: isActive ? 1 : 0.9
        }}
      />

      {/* Frame Image */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/images/button-frame.png)' }}
      />

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <RoomIcon room={id} />
      </div>
    </button>
  );
}