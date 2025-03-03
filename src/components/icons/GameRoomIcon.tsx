import React from "react";

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const GameRoomIcon: React.FC<LogoProps> = ({
  className = "",
  width = 80,
  height = 81,
  color = "#fff",
}) => {
  return (
    <svg
      viewBox="0 0 79.47 80.88"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <style>{`.logo-fill{fill:${color};}`}</style>
      </defs>
      <path
        className="logo-fill"
        d="M66.25,32.58c-.93.65-1.87,1.26-2.83,1.83a49.62,49.62,0,0,1-51.55.29c-1.06-.63-2.10-1.30-3.14-2,.08,1.18.17,2.43.28,3.73,1.52,17.84,6.68,46.18,29,44.37C60,79,65.08,54.35,66.31,36.19c.06-.95.12-1.88.16-2.79A1.32,1.32,0,0,0,66.25,32.58Zm-26.5,45C33.3,78.78,28.34,77,24.52,73.43,23.26,65,36.11,62.53,41.42,63.11a20.12,20.12,0,0,1,12.27,6.12A22.93,22.93,0,0,1,39.75,77.55Z"
      />
      <path
        className="logo-fill"
        d="M20.05,13.33a8.59,8.59,0,0,0-8.36-10,8.59,8.59,0,0,0-8.3,10c.3,2.12-2.94,3-3.25.89C-.91,7,4,0,11.69,0S24.31,6.94,23.3,14.22C23,16.36,19.76,15.44,20.05,13.33ZM67.73,0C60,0,55.14,7,56.19,14.27c.31,2.14,3.55,1.23,3.24-.89a8.47,8.47,0,1,1,16.67-.05c-.3,2.11,2.94,3,3.24.89C80.35,6.94,75.48,0,67.73,0Z"
      />
    </svg>
  );
};

export default GameRoomIcon;
