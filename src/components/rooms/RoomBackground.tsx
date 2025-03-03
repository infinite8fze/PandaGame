import React, { useState } from "react";

interface RoomBackgroundProps {
  room: string;
}

export function RoomBackground({ room }: RoomBackgroundProps) {
  return (
    <div className="relative  w-full h-full">
      {/* Layer 1: Wall */}
      <div
        className="relative  h-[70%]"
        style={{
          backgroundImage: `url(/images/rooms/${room}/wall.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        <div className="absolute  bg-black/20" />
      </div>
      {/* Layer 2: Floor */}
      <div
        className={`relative h-[100%] translate-y-[--${room}floor-translate]`}
        style={{
          backgroundImage: `url(/images/rooms/${room}/floor.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          zIndex: 2,
          "--gameroomfloor-translate": "-30%",
          "--kitchenfloor-translate": "-52%",
          "--bathroomfloor-translate": "-1.5%",
          "--schoolfloor-translate": "-46%",
          "--bedroomfloor-translate": "-33%",
        }}
      />
    </div>
  );
}
