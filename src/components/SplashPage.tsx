import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useState, useEffect, useRef, TouchEvent } from "react";
import { SafeArea } from "./SafeArea";

const TOTAL_PAGES = 6;
const TRANSITION_DURATION = 500;

const slides = [
  {
    title: "Playroom",
    description:
      "The playroom boosts creativity and motor skills through play with the panda.",
    audioURL: "/audios/playroom.wav",
  },
  {
    title: "Kitchen",
    description: "In the kitchen, your child learns to care for others' needs",
    audioURL: "/audios/kitchen.wav",
  },
  {
    title: "Bedroom",
    description: "The bedroom teaches the importance of rest and relaxation.",
    audioURL: "/audios/bedroom.wav",
  },
  {
    title: "Study Room",
    description:
      "The study room helps your child develop language and cognitive skills.",
    audioURL: "/audios/school.wav",
  },
  {
    title: "Bathroom",
    description: "The bathroom teaches good hygiene habits.",
    audioURL: "/audios/bathroom.wav",
  },
  {
    title: "Parents' Room",
    description: "The parents' room allows you to customize game settings",
    audioURL: "/audios/parents.wav",
  },
];

export function SplashPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [presentationStarted, setPresentationStarted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLastSlide = currentPage === TOTAL_PAGES - 1;

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const playSlideAudio = async () => {
    if (!audioRef.current || !presentationStarted) return;

    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = slides[currentPage].audioURL;

      await new Promise((resolve, reject) => {
        if (!audioRef.current) return reject();

        const loadHandler = () => {
          resolve(true);
          if (audioRef.current) {
            audioRef.current.removeEventListener("canplaythrough", loadHandler);
          }
        };

        audioRef.current.addEventListener("canplaythrough", loadHandler, {
          once: true,
        });
        audioRef.current.onerror = reject;
      });

      await audioRef.current.play();

      audioRef.current.onended = () => {
        if (!isLastSlide) {
          handleNextSlide();
        }
        setIsTransitioning(false);
      };
    } catch (error) {
      console.warn("Audio playback failed:", error);
      setIsTransitioning(false);

      if (!isLastSlide) {
        setTimeout(handleNextSlide, 3000);
      }
    }
  };

  useEffect(() => {
    if (presentationStarted) {
      setIsTransitioning(true);
      playSlideAudio();
    }
  }, [currentPage, presentationStarted]);

  const handleNextSlide = () => {
    if (isTransitioning || isLastSlide) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    setIsTransitioning(true);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (isTransitioning || currentPage <= 0) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    setIsTransitioning(true);
    setCurrentPage((prev) => prev - 1);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const startPresentation = () => {
    setPresentationStarted(true);
    playSlideAudio();
  };

  return (
    <div className="relative h-screen w-full">
      {/* Full screen background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/splashBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Safe area for interactive elements */}
      <SafeArea>
        <div
          className="relative w-full h-full py-20"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider */}
          <div className="relative w-full h-[300px] overflow-hidden ">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={`/images/slider/${index + 1}.png`}
                    alt={`Slide ${index + 1}`}
                    className="w-auto h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-3 px-6 py-23 rounded-full justify-center mt-4">
            {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-[#fec726] scale-125"
                    : "bg-white/80"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="w-full max-w-2xl animate-fade-in text-left px-8 mt-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg leading-tight">
              {slides[currentPage].title}
            </h2>
            <p className="text-xl text-white text-shadow-lg">
              {slides[currentPage].description}
            </p>
          </div>

          {/* Buttons */}
          {!presentationStarted ? (
            <button
              onClick={() => navigate("/game")}
              className="clickable group bg-white/90 hover:bg-white text-blue-600 px-8 py-4 rounded-full 
                       shadow-lg transition-all duration-300 transform hover:scale-105
                       flex items-center gap-3 mx-auto mt-8"
            >
              <Play className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="text-xl font-semibold">Start Presentation</span>
            </button>
          ) : (
            isLastSlide && (
              <button
                onClick={() => navigate("/game")}
                className="group bg-white/90 hover:bg-white text-blue-600 px-8 py-4 rounded-full 
                       shadow-lg transition-all duration-300 transform hover:scale-105
                       flex items-center gap-3 mx-auto mt-8"
              >
                <Play className="w-6 h-6 transition-transform group-hover:scale-110" />
                <span className="text-xl font-semibold">Start Adventure</span>
              </button>
            )
          )}
        </div>
      </SafeArea>
    </div>
  );
}
