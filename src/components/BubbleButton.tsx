import React from "react";
interface SvgIconProps {
  width?: number;
  height?: number;
  className?: string;
  bgColor: string;
  borderColor: string;
  isActive: boolean;
  icon: React.ElementType;
  onClick: () => Void;
}
const BubbleButton = ({
  width = 100,
  height = 100,
  className = "",
  icon: Icon,
  onClick,
  bgColor,
  borderColor = "defaultBorder",
}) => {
  return (
    <button onClick={onClick} className="clickable w-full relative inset-0">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 204 204"
        className={`relative extra-sm:w-[4rem] extra-sm:h-[4rem] md:w-[6.25rem] md:h-[6.25rem]`}
      >
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#33DE44" />
            <stop offset="100%" stopColor="#6AFF52" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF711F" />
            <stop offset="100%" stopColor="#FFC301" />
          </linearGradient>
          <linearGradient
            id="borderOrangeGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FED906" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="defaultBorder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <style type="text/css">
          {`
          .st0{opacity:0.2;}
          .st1{fill:#FFFFFF;}
          .st2{fill:#CBCFD1;}
          .st3{fill:#666666;}
          .st4{opacity:0.3;enable-background:new;}
        `}
        </style>
        <g className="st0">
          <path
            d="M84.4,204c-20.3,0-54.4,0-73.8-35.8C-2.6,143.9,0,91,3.4,66.4c8-60.1,56.4-60.1,91.9-60.1h14c35.2,0,83.8,0,91.9,60.1
          c3.4,24.6,6,77.2-7.2,101.9C174.5,204,140.5,204,120.1,204C119.9,204,84.4,204,84.4,204z"
          />
        </g>
        <path
          fill={`url(#${borderColor})`}
          d="M84.4,198.6c-20.3,0-54.4,0-73.8-35.8C-2.6,138.5,0,85.6,3.4,60.9c8-60.1,56.4-60.1,91.9-60.1h14
        c35.2,0,83.8,0,91.9,60.1c3.4,24.6,6,77.2-7.2,101.9c-19.5,35.8-53.5,35.8-73.8,35.8C119.9,198.6,84.4,198.6,84.4,198.6z"
        />
        <path
          fill={`url(#${bgColor})`}
          d="M190,61.2C183.7,14.9,153.3,12,109.3,12H94.7C50.9,12,20.3,14.9,14,61.2c-4.3,32.6-4,78.7,5.7,97
        c17.2,31.5,46.9,29.2,74.7,29.2H109c27.8,0,57.5,2.6,74.7-29.2C194,139.9,194.2,93.8,190,61.2z"
        />
        <path
          className="st3"
          d="M120.7,189c-2,0-4,0-5.9,0c-1.9,0-3.9,0-5.8,0H94.4c-1.8,0-3.5,0-5.3,0c-26.7,0.1-54.2,0.3-70.7-30
        C8.6,140.5,8,94.8,12.5,61c3-22.2,11.6-35.9,27.1-43.1c14.5-6.8,34.3-7.4,55-7.4h14.6c45.5,0,75.8,3.5,82.2,50.5l0,0
        c4.5,33.9,3.7,79.8-6.5,97.9C169.8,187,145.3,189,120.7,189z M94.4,185.9H109c1.9,0,3.9,0,5.8,0c25.5,0.2,52,0.3,67.5-28.4
        c9.9-17.6,10.5-62.6,6.1-96.1c-6.1-44.7-34-47.9-79.2-47.9H94.7c-20.4,0-39.8,0.5-53.8,7.1c-14.5,6.8-22.6,19.8-25.4,40.8
        c-4.4,33.3-3.9,78.2,5.6,96.1c15.6,28.7,42.3,28.5,68.1,28.4C90.9,185.9,92.6,185.9,94.4,185.9z"
        />
        <path
          className="st1"
          d="M175.7,40.3c4.9,7.4,3.7,16.6-2.3,20.6c-6,4-14.9,1.1-19.7-6.3c-4.9-7.4-3.7-16.6,2.3-20.6
        C161.9,30,170.8,32.9,175.7,40.3z"
        />
        <path
          className="st1"
          d="M178.5,71.8c0,2.6-2,4.6-4.6,4.6c-2.6,0-4.6-2-4.6-4.6c0-2.6,2-4.6,4.6-4.6C176.5,67,178.5,69.2,178.5,71.8z"
        />
        <path
          className="st4"
          d="M147,174.5c-25.8,3.4-53.8,0.9-88.4,0C26,173.7,17.7,124.7,12,95c-1.1,17.7,3.7,56.1,7.4,63.2
        c17.2,31.5,46.9,29.2,74.7,29.2h-0.3h14.9c27.8,0,57.8,2.6,74.7-29.2c2.9-5.4,7.2-37.8,8.3-46.9C188.5,136.2,174.8,170.8,147,174.5z
        "
        />
      </svg>
      {Icon && (
        <Icon className="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
};

export default BubbleButton;
