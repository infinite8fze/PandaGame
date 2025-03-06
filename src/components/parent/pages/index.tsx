import { ControlPanelIcon } from "../../icons";
import { SafeArea } from "../../SafeArea";
import { AccessRestrictionsPage } from "./AccessRestrictionsPage";
import { LearningLevelSettingsPage } from "./LearningLevelSettingsPage";
import { NotificationsAlertsPage } from "./NotificationsAlertsPage";
import { PersonalizedDialoguePage } from "./PersonalizedDialoguePage";
import { ProgressCenterPage } from "./ProgressCenterPage";

const ControlPanelPage = ({
  currentPage,
  setCurrentPage,
  title,
  bgColor,
  titleColor,
}) => {
  console.log("🚀 ~ bgColor:", bgColor);
  // Render specific page based on selection
  const renderPage = (page: string) => {
    switch (page) {
      case "dialog":
        return <PersonalizedDialoguePage />;
      case "learning":
        return <LearningLevelSettingsPage />;
      case "access":
        return <AccessRestrictionsPage />;
      case "notification":
        return <NotificationsAlertsPage />;
      case "progress-center":
        return <ProgressCenterPage />;
      default:
        return null;
    }
  };
  return (
    <div className="fixed inset-0 z-50">
      {/* Full screen background with linear gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: bgColor,
        }}
      />

      {/* Safe area content */}
      <SafeArea>
        <div className="relative w-full h-full flex flex-col ">
          {/* Header with back button and title */}
          <div className="flex items-center mt-8 mb-10">
            <button
              onClick={() => setCurrentPage(null)}
              className="clickable w-12 h-12 mx-4 transition-transform hover:scale-110"
            >
              <ControlPanelIcon className={`fill-current ${titleColor}`} />
            </button>
            <h2
              className={`extra-sm:text-xl md:text-3xl font-bold ${titleColor}`}
            >
              {title}
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto clickable scrollbar-custom">
            {renderPage(currentPage)}
          </div>
        </div>
      </SafeArea>
    </div>
  );
};
export default ControlPanelPage;
