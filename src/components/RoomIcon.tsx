import React from 'react';

interface RoomIconProps {
  room: string;
}

export function RoomIcon({ room }: RoomIconProps) {
  return (
    <img 
      src={`/svg/${room}.svg`}
      alt={`${room} icon`}
      className="w-8 h-8 fill-[#00854B]" // Make SVG white
    />
  );
}