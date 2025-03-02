import React from 'react';

interface LevelButtonProps {
  level: number;
  onClick: () => void;
}

export function LevelButton({ level, onClick }: LevelButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-24 h-24 transition-transform hover:scale-110 mt-2"
    >
      {/* Frame Background */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/level-frame.png)' }}
      />
      
      {/* Level Number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[50px] font-bold text-[#607E37] drop-shadow-lg">
          {level}
        </span>
        <span className="text-[10px] font-bold text-[#607E37] drop-shadow-lg translate-y-4">
          LVL
        </span>
        
      </div>
    </button>
  );
}