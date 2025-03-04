import React from "react";

const BubbleButton = ({
  bgColor = "bg-green-button", // Default to red like in the image
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`clickable relative w-20 h-20 transition-transform duration-300 flex items-center justify-center rounded-[30px] shadow-xl border-4 border-white ${bgColor} transition-all active:scale-95 ${
        isActive ? "scale-105" : "hover:scale-105"
      }`}
      style={{
        boxShadow:
          "0px 5px 6px rgba(0, 0, 0, 0.2), inset 0px -4px 6px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Inner Border */}
      <div className="absolute inset-0 rounded-[30px] border-2 border-black/20"></div>

      {/* Centered Icon */}
      {Icon && <Icon className="w-40 h-40 text-black" />}

      {/* Glossy Bubble Effect */}
      <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full opacity-40 shadow-md"></div>
      <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full opacity-40"></div>
    </button>
  );
};


export default BubbleButton;
