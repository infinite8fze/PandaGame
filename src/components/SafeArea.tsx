import React, { useEffect, useState } from "react";

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  const [aspectRatio, setAspectRatio] = useState("9 / 16");

  useEffect(() => {
    const updateAspectRatio = () => {
      setAspectRatio(
        window.innerWidth > window.innerHeight
          ? "9 / 16"
          : `${window.innerWidth} / ${window.innerHeight}`
      );
    };

    updateAspectRatio(); // Set initially
    window.addEventListener("resize", updateAspectRatio);

    console.log("🚀 ~ SafeArea ~ aspectRatio:", aspectRatio);
    return () => window.removeEventListener("resize", updateAspectRatio);
  }, []);
  return (
    // <div className="relative w-full h-full">
    <div
      className="absolute w-full h-full top-0 left-0 z-10"
      style={
        {
          aspectRatio,
          maxHeight: "100vh",
          maxWidth: "calc(100vh * 9/16)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
    // </div>
  );
}
