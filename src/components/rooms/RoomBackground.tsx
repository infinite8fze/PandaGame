import React from 'react';

interface RoomBackgroundProps {
  room: string;
}

export function RoomBackground({ room }: RoomBackgroundProps) {
  const hasCarpet = ['bathroom', 'bedroom', 'gameroom'].includes(room);
  const hasExtra = ['bathroom', 'kitchen', 'gameroom', 'school', 'bedroom'].includes(room);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Layer 1: Floor */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/rooms/${room}/floor.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

      {/* Layer 2: Wall */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/rooms/${room}/wall.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 2
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Layer 2.5: Extra elements - Between wall and carpet */}
      {hasExtra && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/rooms/${room}/extra.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 2
          }}
        />
      )}
      
      {/* Layer 3: Carpet - Only for specific rooms */}
      {hasCarpet && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0"
          style={{
            backgroundImage: `url(/images/rooms/${room}/carpet.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            width: '60%',
            height: '20%',
            zIndex: 3
          }}
        />
      )}
    </div>
  );
}