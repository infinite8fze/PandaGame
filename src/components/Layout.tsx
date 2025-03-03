import React from "react";
import { SafeArea } from "./SafeArea";
import { Table } from "./rooms/Table";

interface LayoutProps {
  children: React.ReactNode;
  background?: React.ReactNode;
  roomObjects?: React.ReactNode;
  outsideObjects?: React.ReactNode;
  character?: React.ReactNode;
  ui?: React.ReactNode;
  room?: string;
}

export function Layout({ background, roomObjects }: LayoutProps) {
  return (
    <div className="relative w-full h-full">
      {/* Layer 1-3: Background (floors, walls, carpets) */}
      <div className="relative  w-full h-full top-0 left-0">{background}</div>
      <SafeArea>
        <div className="absolute w-full h-full top-0 left-0 z-10">
          {roomObjects}
        </div>
      </SafeArea>
    </div>
  );
}
