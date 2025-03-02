import React from 'react';

interface ControlPanelCardProps {
  icon: string;
  title: string;
  titleColor: string;
  bgColor: string;
  onClick?: () => void;
}

export function ControlPanelCard({ icon, title, titleColor, bgColor, onClick }: ControlPanelCardProps) {
  // Split the title into two lines if needed
  const formatTitle = (title: string) => {
    const words = title.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    
    const firstLine = words.slice(0, midpoint).join(' ');
    const secondLine = words.slice(midpoint).join(' ');
    
    return (
      <>
        <div>{firstLine}</div>
        <div>{secondLine}</div>
      </>
    );
  };

  return (
    <button
      onClick={onClick}
      className="w-full h-40 flex items-center p-4 rounded-xl mb-4 transition-transform hover:scale-105 active:scale-95 relative overflow-hidden"
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Background with radial gradient centered on icon */}
      <div 
        className="absolute inset-0" 
        style={{
          background: bgColor,
          backgroundPosition: 'left center'
        }}
      />
      
      {/* Icon */}
      <div className="w-32 h-32 flex-shrink-0 mr-4 relative z-10 flex items-center justify-center">
        <img 
          src={icon} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Title */}
      <div className="flex-1 relative z-10">
        <h3 
          className="text-[32px] font-bold text-left leading-tight flex flex-col"
          style={{ color: titleColor }}
        >
          {formatTitle(title)}
        </h3>
      </div>
    </button>
  );
}