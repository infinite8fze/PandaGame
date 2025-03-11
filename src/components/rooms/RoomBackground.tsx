import React, { useState } from "react";

interface RoomBackgroundProps {
  room: string;
  translateY: string;
}

export function RoomBackground({ room, translateY }: RoomBackgroundProps) {
  const className = `relative h-[100%] ${translateY}`;
  return (
    <div className="relative  w-full h-full">
      {/* Layer 1: Wall */}
      <div
        className="relative  h-[70%]"
        style={{
          backgroundImage: `url(/images/rooms/${room}/wall.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        <div className="absolute  bg-black/20" />
      </div>
      {/* Layer 2: Floor */}
      <div
        className={className}
        style={{
          
          backgroundImage: `url(/images/rooms/${room}/floor.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          zIndex: 2,
        }}
      />
    </div>
  );
}
