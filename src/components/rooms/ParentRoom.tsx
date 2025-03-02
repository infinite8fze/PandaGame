import React from 'react';
import { Layout } from '../Layout';

interface ParentRoomProps {
  children?: React.ReactNode;
  character?: React.ReactNode;
}

export function ParentRoom({ children, character }: ParentRoomProps) {
  const background = (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/parentBG.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );

  return (
    <Layout 
      background={background}
      character={character}
    >
      {children}
    </Layout>
  );
}