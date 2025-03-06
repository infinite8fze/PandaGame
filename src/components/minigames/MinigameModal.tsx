import React from "react";
import { SafeArea } from "../SafeArea";

interface MinigameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (url: string) => void;
  currentRoom: string;
}

const miniGamesData: any = {
  gameroom: {
    bg: "linear-gradient(to top, #77BDFF, #915DD0)",
    title: "Play Game",
    games: [
      {
        id: "1",
        title: "Color Recognation",
        imageUrl: "/images/mini-game/Color.png",
        url: "https://previews.customer.envatousercontent.com/files/590179399/index.html",
      },
      {
        id: "3",
        title: "Jigsaw",
        imageUrl: "/images/mini-game/Jigsaw.png",
        url: "https://www.htmlgames.com/game/Find+the+Odd+One+Out",
      },
      {
        id: "4",
        title: "Match Three",
        imageUrl: "/images/mini-game/Match-three.jpg",
        url: "https://www.htmlgames.com/game/Slide+Wood",
      },
    ],
  },
  school: {
    bg: "linear-gradient(to top, #00DFE8, #008FB2)",
    title: "Play & Learn",
    games: [
      {
        id: "2",
        title: "Fast Counting",
        imageUrl: "/images/mini-game/Fast.png",
        url: "https://www.htmlgames.com/game/Cube+Block",
      },
      {
        id: "5",
        title: "Word Game",
        imageUrl: "/images/mini-game/Word-game.png",
        url: "https://www.htmlgames.com/game/Christmas+Match+3",
      },
      {
        id: "6",
        title: "Writing",
        imageUrl: "/images/mini-game/Writing.png",
        url: "https://www.htmlgames.com/game/Christmas+Match+3",
      },
    ],
  },
};
export function MinigameModal({
  isOpen,
  onClose,
  onSelectGame,
  currentRoom,
}: MinigameModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Full screen gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: miniGamesData[currentRoom].bg,
        }}
      />

      {/* Safe area content */}
      <SafeArea>
        <div className="relative w-full h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="clickable absolute top-4 right-4 w-8 h-8 transition-transform hover:scale-110"
          >
            <img
              src="/images/Close.png"
              alt="Close"
              className="w-full h-full object-contain"
            />
          </button>

          {/* Title */}
          <div className="text-center pt-8 pb-6">
            <h2 className="text-3xl font-bold text-white">
              {miniGamesData[currentRoom].title}
            </h2>
          </div>

          {/* Games Grid - Updated to three columns */}
          <div className="flex-1 overflow-y-auto px-4">
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-8 py-3">
              {miniGamesData[currentRoom].games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game.url)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 p-4"
                >
                  <div className="aspect-video w-full">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      width={266}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-2xl font-semibold text-[#0196B7] text-left">
                      {game.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
}
