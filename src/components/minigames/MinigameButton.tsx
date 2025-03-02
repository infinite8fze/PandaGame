import React from 'react';

interface MinigameButtonProps {
  onClick: () => void;
  imageUrl?: string;
  width?: string;
  height?: string;
  className?: string;
  animate?: boolean;
}

export function MinigameButton({ 
  onClick, 
  imageUrl = '/images/minigame-icon.png',
  width = 'w-40',
  height = 'h-32',
  className = '',
  animate = true
}: MinigameButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative ${width} ${height} ${animate ? 'animate-float' : ''} ${className}`}
    >
      {/* Button image */}
      <img 
        src={imageUrl}
        alt="Minigame"
        className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
      />
    </button>
  );
}