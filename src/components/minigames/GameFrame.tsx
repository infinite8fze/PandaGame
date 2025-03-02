import React from 'react';
import { SafeArea } from '../SafeArea';

interface GameFrameProps {
  url: string;
  onClose: () => void;
}

export function GameFrame({ url, onClose }: GameFrameProps) {
  return (
    <div className="fixed inset-0 z-50">
      {/* Full screen background */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Safe area content */}
      <SafeArea>
        <div className="relative w-full h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 transition-transform hover:scale-110 z-10"
          >
            <img 
              src="/images/Close.png" 
              alt="Close"
              className="w-full h-full object-contain"
            />
          </button>
          
          <iframe
            src={url}
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Minigame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </SafeArea>
    </div>
  );
}