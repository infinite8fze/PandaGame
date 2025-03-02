import React from 'react';

interface TableProps {
  room: string;
}

export function Table({ room }: TableProps) {
  // Only render table for rooms that should have one
  if (!['kitchen', 'school'].includes(room)) return null;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[890px]">
      <img 
        src={`/images/rooms/${room}/table.png`}
        alt={`${room} Table`}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}