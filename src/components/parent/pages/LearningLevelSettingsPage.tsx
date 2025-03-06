import React, { useState } from "react";
import { SafeArea } from "../../SafeArea";
import { ControlPanelIcon } from "../../icons";

interface ToggleOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function ToggleOption({ label, isSelected, onClick }: ToggleOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-[30px] transition-all duration-200 extra-sm:text-ms md:text-lg clickable ${
        isSelected
          ? "bg-[#6A6AF1] text-white"
          : "bg-white text-[#6A6AF1] border border-[#6A6AF1]"
      }`}
    >
      <span className="font-bold">{label}</span>
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
      className={`px-6 py-3 rounded-[30px] transition-all duration-200 flex items-center extra-sm:text-ms md:text-lg clickable ${
        isSelected
          ? "bg-[#6A6AF1] text-white"
          : "bg-white text-[#6A6AF1] border border-[#6A6AF1]"
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

interface LearningLevelSettingsPageProps {
  onBack: () => void;
}

export function LearningLevelSettingsPage({
  onBack,
}: LearningLevelSettingsPageProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("beginner");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "reading",
    "math",
  ]);

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Full screen background with linear gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #f1f1ff, white)",
        }}
      />

      {/* Safe area content */}
      <SafeArea>
        <div className="relative w-full h-full flex flex-col p-6">
          {/* Header with back button and title */}
          <div className="flex items-center mt-8 mb-10">
          <button
              onClick={onBack}
              className="clickable extra-sm:w-8 extra-sm:h-8 md:w-12 md:h-12 mr-4 
              transition-transform hover:scale-110 text-[#6A6AF1]"
            >
           <ControlPanelIcon className="fill-[#6A6AF1]" />
            </button>
            <h2 className="extra-sm:text-xl md:text-3xl font-bold text-[#6A6AF1]">
              Learning Level Settings
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 clickable scrollbar-custom">
            <div className="max-w-2xl mx-auto">
              {/* Description */}
              <p className="text-[#1F2020] extra-sm:text-sm md:text-lg mb-10">
                Content is set by age by default, but parents can adjust
                difficulty for a personalized learning experience
              </p>

              {/* Difficulty Level Selection */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  1. Difficulty Level Selection
                </h3>

                <div className="flex flex-wrap gap-4 justify-left">
                  <ToggleOption
                    label="Beginner"
                    isSelected={selectedDifficulty === "beginner"}
                    onClick={() => handleDifficultySelect("beginner")}
                  />
                  <ToggleOption
                    label="Intermediate"
                    isSelected={selectedDifficulty === "intermediate"}
                    onClick={() => handleDifficultySelect("intermediate")}
                  />
                  <ToggleOption
                    label="Advanced"
                    isSelected={selectedDifficulty === "advanced"}
                    onClick={() => handleDifficultySelect("advanced")}
                  />
                </div>
              </div>

              {/* Subjects Selection */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  2. Subjects Selection
                </h3>

                <div className="flex flex-wrap gap-4 justify-left">
                  <CheckboxOption
                    label="Writing"
                    isSelected={selectedSubjects.includes("writing")}
                    onClick={() => handleSubjectToggle("writing")}
                  />
                  <CheckboxOption
                    label="Reading"
                    isSelected={selectedSubjects.includes("reading")}
                    onClick={() => handleSubjectToggle("reading")}
                  />
                  <CheckboxOption
                    label="Pronunciation"
                    isSelected={selectedSubjects.includes("pronunciation")}
                    onClick={() => handleSubjectToggle("pronunciation")}
                  />
                  <CheckboxOption
                    label="Math"
                    isSelected={selectedSubjects.includes("math")}
                    onClick={() => handleSubjectToggle("math")}
                  />
                  <CheckboxOption
                    label="Art"
                    isSelected={selectedSubjects.includes("art")}
                    onClick={() => handleSubjectToggle("art")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
}
