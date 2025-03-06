import { useState } from "react";

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
        className={`clickable px-4 py-3 rounded-[30px] transition-all duration-200 flex items-center mr-4 ${
          isEnabled
            ? "bg-[#FF9E2D] text-white"
            : "bg-white text-[#1F2020] border-2 border-[#FF9E2D]"
        }`}
      >
        <div className="extra-sm:w-3 extra-sm:h-3 md:w-5 md:h-5">
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

interface ToggleOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function ToggleOption({ label, isSelected, onClick }: ToggleOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`clickable px-4 py-2  rounded-lg font-medium ${
        isSelected
          ? "bg-[#FF9E2D] text-white"
          : "bg-white text-[#FF9E2D] border border-[#FF9E2D]"
      }`}
    >
      <span className="font-bold">{label}</span>
    </button>
  );
}

export function NotificationsAlertsPage() {
  const [excessiveUseEnabled, setExcessiveUseEnabled] = useState(true);
  const [inappropriateContentEnabled, setInappropriateContentEnabled] =
    useState(true);
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(true);
  const [extraTimeEnabled, setExtraTimeEnabled] = useState(false);
  const [notificationMethod, setNotificationMethod] = useState<
    "email" | "sms" | "pushNotification"
  >("email");
  const [notificationFrequency, setNotificationFrequency] = useState<
    "immediate" | "dailyDigest" | "weeklySummary"
  >("immediate");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Description */}

      {/* Excessive Use */}
      <div className="p-6 mb-8">
        <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
          1. Excessive Use
        </h3>

        <FeatureOption
          title="Usage Alerts"
          description="Send notifications to parents if their child uses the system for too long."
          isEnabled={excessiveUseEnabled}
          onToggle={() => setExcessiveUseEnabled(!excessiveUseEnabled)}
        />
      </div>

      {/* Inappropriate Content */}
      <div className="p-6 mb-8">
        <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
          2. Inappropriate Content
        </h3>

        <FeatureOption
          title="Content Warnings"
          description="Receive a warning if the child attempts to access inappropriate content."
          isEnabled={inappropriateContentEnabled}
          onToggle={() =>
            setInappropriateContentEnabled(!inappropriateContentEnabled)
          }
        />
      </div>

      {/* Weekly Report Summary */}
      <div className="p-6 mb-8">
        <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
          3. Weekly Report Summary
        </h3>

        <FeatureOption
          title="Usage Reports"
          description="Receive weekly summary reports detailing the amount and method of usage."
          isEnabled={weeklyReportEnabled}
          onToggle={() => setWeeklyReportEnabled(!weeklyReportEnabled)}
        />
      </div>

      {/* Extra Time for Children */}
      <div className="p-6 mb-8">
        <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
          4. Extra Time for Children
        </h3>

        <FeatureOption
          title="Time Management"
          description="Parents can extend or reduce the playtime."
          isEnabled={extraTimeEnabled}
          onToggle={() => setExtraTimeEnabled(!extraTimeEnabled)}
        />
      </div>

      {/* Notification Preferences */}
      <div className="p-6 mb-8">
        <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
          5. Notification Preferences
        </h3>

        <div className=" bg-white p-6 rounded-xl shadow-sm border border-[#FFE0B2]">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-[#1F2020] mb-2">
              Notification Method
            </h4>
            <div className="flex flex-wrap gap-3">
              <ToggleOption
                label="Email"
                isSelected={notificationMethod === "email"}
                onClick={() => setNotificationMethod("email")}
              />
              <ToggleOption
                label="Push Notification"
                isSelected={notificationMethod === "pushNotification"}
                onClick={() => setNotificationMethod("pushNotification")}
              />
              <ToggleOption
                label="SMS"
                isSelected={notificationMethod === "sms"}
                onClick={() => setNotificationMethod("sms")}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#1F2020] mb-2">
              Notification Frequency
            </h4>
            <div className="flex flex-wrap gap-3">
              <ToggleOption
                label="Immediate"
                isSelected={notificationFrequency === "immediate"}
                onClick={() => setNotificationFrequency("immediate")}
              />
              <ToggleOption
                label="Daily Digest"
                isSelected={notificationFrequency === "dailyDigest"}
                onClick={() => setNotificationFrequency("dailyDigest")}
              />
              <ToggleOption
                label="Weekly Summary"
                isSelected={notificationFrequency === "weeklySummary"}
                onClick={() => setNotificationFrequency("weeklySummary")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
