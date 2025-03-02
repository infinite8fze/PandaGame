import { useEffect } from 'react';

interface ProfessorProps {
  onLoad?: () => void;
}

export function Professor({ onLoad }: ProfessorProps) {
  useEffect(() => {
    // Create an image to preload
    const img = new Image();
    img.src = '/images/professor.png';
    img.onload = () => {
      onLoad?.();
    };
  }, [onLoad]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src="/images/professor.png" 
        alt="Professor"
        className="h-[55%] w-auto object-contain"
      />
    </div>
  );
}