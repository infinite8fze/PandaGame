import React, { useState } from "react";
import { ControlPanelCard } from "./ControlPanelCard";
import { SafeArea } from "../SafeArea";
import { ControlPanelIcon } from "../icons";
import ControlPanelPage from "./pages";

interface ParentControlPanelProps {
  onClose: () => void;
}

export function ParentControlPanel({ onClose }: ParentControlPanelProps) {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [pageTitleColor, setPageTitleColor] = useState<string | null>(null);
  const [pageBgColor, setPageBgColor] = useState<string | null>(null);
  const controlPanelItems = [
    {
      id: "dialog",
      title: "Personalized Dialogue Page",
      titleColor: "#003A51",
      icon: "/images/parent/contol-panel-icons/dialog.png",
      bgColor: "radial-gradient(circle at 15% 50%, #B7EBFF, #16BDFF)",
    },
    {
      id: "learning",
      title: "Learning Level Settings",
      titleColor: "#1E1E7F",
      icon: "/images/parent/contol-panel-icons/learning.png",
      bgColor: "radial-gradient(circle at 15% 50%, #D0D0FF, #8C8CF8)",
    },
    {
      id: "access",
      title: "Access Restrictions",
      titleColor: "#E04E2D",
      icon: "/images/parent/contol-panel-icons/access.png",
      bgColor: "radial-gradient(circle at 15% 50%, #FFF2C7, #FFDD6B)",
    },
    {
      id: "notification",
      title: "Notifications & Alerts",
      titleColor: "#50320A",
      icon: "/images/parent/contol-panel-icons/notification.png",
      bgColor: "radial-gradient(circle at 15% 50%, #FFE676, #FE9818)",
    },
    {
      id: "progress-center",
      title: "Progress Center",
      titleColor: "#1E6957",
      icon: "/images/parent/contol-panel-icons/progress-center.png",
      bgColor: "radial-gradient(circle at 15% 50%, #E0FF98, #A9DC35)",
    },
  ];
  // favorite date for control panel item
  // {
  //   id: "favorite",
  //   title: "Subject Favorite",
  //   titleColor: "#951B12",
  //   icon: "/images/parent/contol-panel-icons/favorite.png",
  //   bgColor: "radial-gradient(circle at 15% 50%, #FFB0B1, #FF4E51)",
  // },

  return (
    <>
      {currentPage ? (
        <ControlPanelPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          title={pageTitle}
          bgColor={pageTitleColor}
          titleColor={pageBgColor}
        />
      ) : (
        <div className="fixed inset-0 z-50">
          {/* Full screen background with linear gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #3E86B8, white)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/parent/sky.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Safe area content */}
          <SafeArea>
            <div className="relative w-full h-full flex flex-col">
              {/* Back button */}
              <div className="flex items-center mt-0 mb-10">
                <button
                  onClick={onClose}
                  className="clickable extra-sm:w-8 extra-sm:h-8 md:w-12 md:h-12 mr-4 transition-transform hover:scale-110"
                >
                  <ControlPanelIcon className="fill-[#005694]" />
                </button>
                <div className="text-center mb-8">
                  <h2 className="extra-sm:text-2xl md:text-4xl font-bold text-[#005694] drop-shadow-lg mt-8">
                    Parent Control Panel
                  </h2>
                </div>
              </div>

              {/* Control Panel Cards */}
              <div className="flex-1 overflow-y-auto px-4 scrollbar-custom">
                <div className="max-w-md mx-auto pb-8">
                  {controlPanelItems.map((item) => (
                    <ControlPanelCard
                      key={item.id}
                      icon={item.icon}
                      title={item.title}
                      titleColor={item.titleColor}
                      bgColor={item.bgColor}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setPageTitle(item.title);
                        setPageTitleColor(item.titleColor);
                        setPageBgColor(item.bgColor);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SafeArea>
        </div>
      )}
    </>
  );
}
