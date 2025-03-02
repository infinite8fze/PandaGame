import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Scene } from './components/Scene';
import { SubscriptionPage } from './components/subscription/SubscriptionPage';
import { LoadingPage } from './components/LoadingPage';
import { SplashPage } from './components/SplashPage';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useAudio } from './hooks/useAudio';
import { RoomButton } from './components/RoomButton';
import { LevelButton } from './components/LevelButton';
import { CurrencyDisplay } from './components/CurrencyDisplay';
import { ParentControlPanel } from './components/parent/ParentControlPanel';

const rooms = [
  { id: 'gameroom', name: 'Playroom' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'bathroom', name: 'Bathroom' },
  { id: 'school', name: 'School' },
  { id: 'bedroom', name: 'Bedroom' },
];

function GameRoom() {
  const [currentRoom, setCurrentRoom] = useState('gameroom');
  const { isRecording, isLoading, isSpeaking, startRecording, stopRecording, lastMessage, isSupported } = useAudio(currentRoom);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coins, setCoins] = useState(150);
  const [showControlPanel, setShowControlPanel] = useState(false);

  const handleMicMouseDown = () => {
    startRecording();
  };

  const handleMicMouseUp = () => {
    stopRecording();
  };

  const handleLevelClick = () => {
    setCurrentLevel(prev => (prev % 10) + 1);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Scene with background and character */}
      <div className="absolute inset-0">
        <Scene isTalking={isRecording} isSpeaking={isSpeaking} currentRoom={currentRoom} />
      </div>

      {/* Interactive UI elements in 9:16 safe area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative h-full"
          style={{
            aspectRatio: '9/16',
            maxHeight: '100%',
            maxWidth: 'calc(100vh * 9/16)'
          }}
        >
          {/* Currency Display - Only show when not in parent room */}
          {currentRoom !== 'parent' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <CurrencyDisplay amount={coins} />
            </div>
          )}

          {/* Parent Room Button - Only show when not in parent room */}
          {currentRoom !== 'parent' && (
            <button
              onClick={() => setCurrentRoom('parent')}
              className="absolute top-4 right-4 z-20 w-28 h-28 transition-transform hover:scale-110"
            >
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/parent-frame.png)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/svg/parent.svg" 
                  alt="Parent Room"
                  className="w-12 h-12"
                />
              </div>
            </button>
          )}

          {/* Back to Game Room Button - Only show in parent room */}
          {currentRoom === 'parent' && (
            <button
              onClick={() => setCurrentRoom('gameroom')}
              className="absolute top-4 left-4 z-20 w-16 h-16 transition-transform hover:scale-110"
            >
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/home.png)' }}
              />
            </button>
          )}

          {/* Parent Room Specific Buttons */}
          {currentRoom === 'parent' && (
            <>
              {/* Customization Button */}
              <button
                onClick={() => setShowControlPanel(true)}
                className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-24 transition-transform hover:scale-105"
              >
                <div 
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/Customization.png)' }}
                />
                <span className="relative z-10 text-[#4C3BAC] text-2xl font-bold">
                  Customization
                </span>
              </button>

              {/* Progress Center Button */}
              <button
                className="absolute top-40 left-1/2 -translate-x-1/2 w-64 h-24 transition-transform hover:scale-105"
              >
                <div 
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/Progress-Center.png)' }}
                />
                <span className="relative z-10 text-[#9E009E] text-2xl font-bold">
                  Progress Center
                </span>
              </button>
            </>
          )}

          {/* Level Button - Now shown in all rooms except parent room */}
          {currentRoom !== 'parent' && (
            <div className="absolute top-4 left-4 z-20">
              <LevelButton level={currentLevel} onClick={handleLevelClick} />
            </div>
          )}

          {/* Microphone Button */}
          <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onMouseDown={handleMicMouseDown}
              onMouseUp={handleMicMouseUp}
              onMouseLeave={handleMicMouseUp}
              onTouchStart={handleMicMouseDown}
              onTouchEnd={handleMicMouseUp}
              className={`w-24 h-24 relative flex items-center justify-center transition-transform ${
                !isSupported ? 'opacity-50 cursor-not-allowed' : isRecording ? 'scale-110' : 'hover:scale-105'
              }`}
              title={isSupported ? 'Press and hold to record' : 'Speech recognition not supported'}
              disabled={!isSupported}
            >
              {/* Mic Frame Background - Different for parent room */}
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: currentRoom === 'parent' 
                    ? 'url(/images/parent-mic-frame.png)' 
                    : 'url(/images/mic-frame.png)' 
                }}
              />
              
              {/* Icon */}
              <div className="relative z-10">
                {isLoading ? (
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                ) : isRecording ? (
                  <Mic className="w-8 h-8 text-red-500" />
                ) : (
                  <MicOff className="w-8 h-8 text-gray-800" />
                )}
              </div>
            </button>
          </div>

          {/* Free Trial Button - Only in parent room */}
          {currentRoom === 'parent' && (
            <button
              className="absolute bottom-5 left-1/2 -translate-x-1/2 w-64 h-32 transition-transform hover:scale-105"
            >
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/Free-trial.png)' }}
              />
              <span className="relative z-10 text-[#1B1B1B] text-2xl font-bold">
                Free Trial
              </span>
            </button>
          )}

          {/* Room Selection - Only show when not in parent room */}
          {currentRoom !== 'parent' && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
              {rooms.map((room) => (
                <RoomButton
                  key={room.id}
                  id={room.id}
                  isActive={currentRoom === room.id}
                  onClick={() => setCurrentRoom(room.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Parent Control Panel */}
      {showControlPanel && (
        <ParentControlPanel onClose={() => setShowControlPanel(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/splash" element={<SplashPage />} />
      <Route path="/game" element={<GameRoom />} />
      <Route path="/subscribe" element={<SubscriptionPage />} />
    </Routes>
  );
}

export default App;