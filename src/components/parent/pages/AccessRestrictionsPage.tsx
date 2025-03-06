import React, { useState, useRef } from "react";
import { SafeArea } from "../../SafeArea";
import { Clock } from "lucide-react";
import { ControlPanelIcon } from "../../icons";

interface DayButtonProps {
  day: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function DayButton({ day, label, isSelected, onClick }: DayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`extra-sm:w-8 extra-sm:h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 clickable  ${
        isSelected
          ? "bg-[#229654] text-white"
          : "bg-white text-[#1F2020] border-2 border-[#229654]"
      }`}
    >
      <span className="font-bold extra-sm:text-sm md:text-lg">{label}</span>
    </button>
  );
}

interface CheckboxOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function CheckboxOption({ label, isSelected, onClick }: CheckboxOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-[30px] transition-all duration-200 flex items-center clickable ${
        isSelected
          ? "bg-[#229654] text-white"
          : "bg-white text-[#1F2020] border-2 border-[#229654]"
      }`}
    >
      <div className="w-5 h-5 mr-2">
        {isSelected && (
          <img src="/svg/checked.svg" alt="Selected" className="w-5 h-5" />
        )}
      </div>
      <span className="font-bold">{label}</span>
    </button>
  );
}

interface FeatureOptionProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

function FeatureOption({
  title,
  description,
  isEnabled,
  onToggle,
}: FeatureOptionProps) {
  return (
    <div className="flex items-start mb-6">
      <button
        onClick={onToggle}
        className={`px-4 py-3 rounded-[30px] transition-all duration-200 flex items-center mr-4 clickable ${
          isEnabled
            ? "bg-[#229654] text-white"
            : "bg-white text-[#1F2020] border-2 border-[#229654]"
        }`}
      >
        <div className="extra-sm:w-3 extra-sm:h-3 md:w-5 md:h-5 ">
          {isEnabled && (
            <img
              src="/svg/checked.svg"
              alt="Enabled"
              className="extra-sm:w-3 extra-sm:h-3 md:w-5 md:h-5"
            />
          )}
        </div>
      </button>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-[#1F2020] mb-1">{title}</h4>
        <p className="text-gray-600 extra-sm:text-sm md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

interface AccessRestrictionsPageProps {
  onBack: () => void;
}

export function AccessRestrictionsPage({
  onBack,
}: AccessRestrictionsPageProps) {
  const [timeLimit, setTimeLimit] = useState(120); // in minutes
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
  ]);
  const [remainingTime, setRemainingTime] = useState(45); // in minutes
  const [selectedDevices, setSelectedDevices] = useState<string[]>([
    "mobile",
    "tablet",
    "web",
  ]);
  const [externalLinksRestricted, setExternalLinksRestricted] = useState(true);
  const [remoteControlEnabled, setRemoteControlEnabled] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);

  // Use unique keys for each day
  const days = [
    { key: "sun", label: "S" },
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
  ];

  // Device options
  const devices = [
    { key: "mobile", label: "Mobile" },
    { key: "tablet", label: "Tablet" },
    { key: "web", label: "Web" },
  ];

  // Convert minutes to hours and minutes
  const hours = Math.floor(timeLimit / 60);
  const minutes = timeLimit % 60;

  // Calculate the angle for the arc based on time limit (max 4 hours = 240 minutes)
  const maxTime = 240; // 4 hours in minutes
  const arcAngle = (timeLimit / maxTime) * 180; // 180 degrees is the full semi-circle

  // Calculate the position of the handle along the arc
  const handleX = 100 - 90 * Math.cos((arcAngle * Math.PI) / 180);
  const handleY = 100 - 90 * Math.sin((arcAngle * Math.PI) / 180);

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDeviceToggle = (device: string) => {
    if (selectedDevices.includes(device)) {
      setSelectedDevices(selectedDevices.filter((d) => d !== device));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  // Handle mouse/touch events for the arc slider
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    isDragging.current = true;
    updateTimeFromPosition(e.nativeEvent);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      updateTimeFromPosition(e);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    isDragging.current = true;
    updateTimeFromPosition(e.nativeEvent.touches[0]);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (isDragging.current) {
      updateTimeFromPosition(e.nativeEvent.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Calculate time based on mouse/touch position
  const updateTimeFromPosition = (event: MouseEvent | Touch) => {
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const centerX = svgRect.left + svgRect.width / 2;
    const centerY = svgRect.top + svgRect.height;

    // Calculate angle from center point
    const x = event.clientX - centerX;
    const y = centerY - event.clientY;

    // Calculate angle in radians, then convert to degrees
    // Use Math.atan2 to get the correct angle in all quadrants
    let angle = Math.atan2(y, x) * (180 / Math.PI); // Remove Math.abs(x)
    if (angle < 0) {
      angle += 180; // Ensure the angle remains positive
    }

    // Clamp angle between 0 and 180 degrees
    angle = Math.max(0, Math.min(180, angle));

    // Convert angle to time
    const newTimeLimit = Math.round(((angle / 180) * maxTime) / 15) * 15;
    setTimeLimit(newTimeLimit);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Full screen background with linear gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #e8fff0, white)",
        }}
      />

      {/* Safe area content */}
      <SafeArea>
        <div className="relative w-full h-full flex flex-col p-6">
          {/* Header with back button and title */}
          <div className="flex items-center mt-8 mb-10">
            <button
              onClick={onBack}
              className="clickable w-12 h-12 mr-4 transition-transform hover:scale-110"
            >
              <ControlPanelIcon className="fill-[#229654]" />
            </button>
            <h2 className="extra-sm:text-xl md:text-3xl font-bold text-[#229654]">
              Access Restrictions
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 clickable scrollbar-custom">
            <div className="max-w-2xl mx-auto">
              <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                1. Usage Restrictions
              </h3>
              {/* Description */}
              <p className="text-[#1F2020] extra-sm:text-sm md:text-lg mb-10">
                Set specific dates and time periods for game usage to ensure
                balanced playtime.
              </p>

              {/* Time Limit Selector */}
              <div className="p-6 mb-12">
                <div className="relative w-full max-w-md mx-auto h-64">
                  {/* Semi-circular gauge background */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <svg
                      ref={svgRef}
                      viewBox="0 0 200 100"
                      className="w-full h-full cursor-pointer clickable"
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {/* Gray background arc */}
                      <path
                        d="M10,100 A90,90 0 0,1 190,100"
                        fill="none"
                        stroke="#E0E0E0"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      {/* Green active arc */}
                      <path
                        d="M10,100 A90,90 0 0,1 190,100"
                        fill="none"
                        stroke="#229654"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 - (arcAngle / 180) * 282.6}
                      />

                      {/* Invisible touch area that follows the arc path */}
                      <path
                        d="M10,100 A90,90 0 0,1 190,100"
                        fill="none"
                        stroke="transparent"
                        strokeWidth="30"
                        strokeLinecap="round"
                        style={{ cursor: "pointer" }}
                      />

                      {/* Draggable handle - positioned along the arc */}
                      <circle
                        cx={handleX}
                        cy={handleY}
                        r="12"
                        fill="#229654"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        style={{ cursor: "pointer" }}
                      />
                    </svg>
                  </div>

                  {/* Time display in center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-4xl font-bold text-[#229654]">
                      {hours.toString().padStart(2, "0")} Hours
                    </div>
                    <div className="text-xl text-[#229654]">in Day</div>
                    <div className="text-lg text-[#FF5252] mt-2">
                      {remainingTime} min Left
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Selection */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6 text-center">
                  Allowed Days
                </h3>

                <div className="flex justify-center gap-3">
                  {days.map((day) => (
                    <DayButton
                      key={day.key}
                      day={day.key}
                      label={day.label}
                      isSelected={selectedDays.includes(day.key)}
                      onClick={() => handleDayToggle(day.key)}
                    />
                  ))}
                </div>
              </div>

              {/* Device Restrictions */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  2. Device Restrictions
                </h3>
                <p className="text-[#1F2020] extra-sm:text-sm md:text-lg mb-6">
                  Choose the devices your child can use to access the game.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  {devices.map((device) => (
                    <CheckboxOption
                      key={device.key}
                      label={device.label}
                      isSelected={selectedDevices.includes(device.key)}
                      onClick={() => handleDeviceToggle(device.key)}
                    />
                  ))}
                </div>
              </div>

              {/* Feature Access Restrictions */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  3. Feature Access Restrictions
                </h3>

                <FeatureOption
                  title="External Content Sharing"
                  description="Restrict the ability to send links and images to external sources to maintain a controlled and safe experience for your child"
                  isEnabled={externalLinksRestricted}
                  onToggle={() =>
                    setExternalLinksRestricted(!externalLinksRestricted)
                  }
                />
              </div>

              {/* Remote Parental Control */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  4. Remote Parental Control
                </h3>

                <FeatureOption
                  title="Remote Management"
                  description="Manage settings and review activities remotely through the parental control panel, accessible via the app or web dashboard."
                  isEnabled={remoteControlEnabled}
                  onToggle={() =>
                    setRemoteControlEnabled(!remoteControlEnabled)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
}
