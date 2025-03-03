import React from "react";

const BubbleButton = ({
  bgColor = "bg-green-button",
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full h-auto transition-transform duration-300  aspect-square flex items-center p-4 justify-center rounded-[30%] shadow-xl 
                  border-4 border-white ${bgColor} transition-all active:scale-95 ${
        isActive ? "scale-125" : "hover:scale-105"
      }`}
      style={{
        boxShadow: `
          0px 4px 6px rgba(0, 0, 0, 0.2), 
          inset 0px -4px 6px rgba(0, 0, 0, 0.3)`,
      }}
    >
      <div className="absolute inset-0 rounded-[30%] border-2 border-black/30" />
      {Icon && <Icon className="w-1/2 h-1/2 text-black" />}
      <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full opacity-80 shadow-md"></div>
      <div className="absolute top-6 right-1 w-2 h-2 bg-white rounded-full opacity-70"></div>
    </button>
  );
};

export default BubbleButton;
