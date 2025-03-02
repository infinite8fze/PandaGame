import React from 'react';

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  return (
    <div className="relative w-full h-full">
      <div 
        className="absolute w-full h-full"
        style={{
          aspectRatio: '9/16',
          maxHeight: '100vh',
          maxWidth: 'calc(100vh * 9/16)',
          left: '50%',
          top: '50%',
          '--scale': 'min(1, min(100vw / (100vh * 9/16), 100vh / (100vw * 16/9)))',
          transform: 'translate(-50%, -50%)'
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}