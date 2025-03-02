import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { SafeArea } from './SafeArea';

// List of all assets to preload
const assetsToLoad = [
  // Font
  '/font/MPLUSRounded1c-Black.ttf',
  
  // Room backgrounds
  '/images/rooms/bathroom/floor.png',
  '/images/rooms/bathroom/wall.png',
  '/images/rooms/bathroom/carpet.png',
  '/images/rooms/bathroom/extra.png',
  '/images/rooms/bedroom/floor.png',
  '/images/rooms/bedroom/wall.png',
  '/images/rooms/bedroom/carpet.png',
  '/images/rooms/gameroom/floor.png',
  '/images/rooms/gameroom/wall.png',
  '/images/rooms/gameroom/carpet.png',
  '/images/rooms/gameroom/extra.png',
  '/images/rooms/kitchen/floor.png',
  '/images/rooms/kitchen/wall.png',
  '/images/rooms/kitchen/table.png',
  '/images/rooms/kitchen/extra.png',
  '/images/rooms/school/floor.png',
  '/images/rooms/school/wall.png',
  '/images/rooms/school/table.png',
  '/images/rooms/school/extra.png',
  '/images/rooms/school/pencil.png',
  '/images/rooms/school/calc.png',
  '/images/loadingBG.png',
  '/images/splashBG.png',
  '/images/parentBG.png',
  '/images/professor.png',
  
  // UI Frames and Buttons
  '/images/button-frame.png',
  '/images/mic-frame.png',
  '/images/parent-mic-frame.png',
  '/images/parent-frame.png',
  '/images/level-frame.png',
  '/images/minigame-icon.png',
  '/images/Close.png',
  '/images/Customization.png',
  '/images/Progress-Center.png',
  '/images/Free-trial.png',
  '/images/home.png',
  '/images/coin-frame.png',
  '/images/coin.png',
  '/images/game-chair.png',
  
  // SVG Icons
  '/svg/kitchen.svg',
  '/svg/gameroom.svg',
  '/svg/bathroom.svg',
  '/svg/school.svg',
  '/svg/bedroom.svg',
  '/svg/parent.svg',
  
  // Mini-game thumbnails
  '/images/mini-game/Color.png',
  '/images/mini-game/Fast.png',
  '/images/mini-game/Jigsaw.png',
  '/images/mini-game/Match-three.jpg',
  '/images/mini-game/Word-game.png',
  '/images/mini-game/Writing.png',
  
  // 3D assets
  '/3D-assets/72.glb',
  '/3D-assets/Panda_0_ALBD-TRANS.jpg',
  '/3D-assets/Panda_0_Normal.jpg',
  '/3D-assets/Panda_0_Emission.jpg',
  
  // Slider images
  '/images/slider/1.png',
  '/images/slider/2.png',
  '/images/slider/3.png',
  '/images/slider/4.png',
  '/images/slider/5.png',
  '/images/slider/6.png',
  
  // Audio files
  '/audios/bathroom.wav',
  '/audios/bedroom.wav',
  '/audios/kitchen.wav',
  '/audios/parents.wav',
  '/audios/playroom.wav',
  '/audios/school.wav'
];

export function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<{ name: string; type: string }>({ name: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // First, load the background image
    const bgImage = new Image();
    bgImage.src = '/images/loadingBG.png';
    bgImage.onload = () => {
      setBgLoaded(true);
      setTimeout(() => setShowContent(true), 100); // Slight delay for smooth transition
    };
    bgImage.onerror = (error) => {
      console.error('Failed to load background image:', error);
      setBgLoaded(true); // Still show content even if bg fails
      setShowContent(true);
    };
  }, []);

  useEffect(() => {
    if (!bgLoaded) return;

    let loadedCount = 0;

    const getAssetInfo = (url: string) => {
      const parts = url.split('/');
      const filename = parts[parts.length - 1];
      const extension = filename.split('.').pop()?.toLowerCase() || '';
      
      let type = 'Asset';
      if (extension === 'ttf') type = 'Font';
      else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) type = 'Image';
      else if (['wav', 'mp3', 'ogg'].includes(extension)) type = 'Audio';
      else if (extension === 'svg') type = 'Icon';
      else if (extension === 'glb') type = '3D Model';

      return {
        name: filename.split('.')[0],
        type
      };
    };

    const preloadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    const preloadAudio = (url: string) => {
      return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.src = url;
      });
    };

    const preloadFont = (url: string) => {
      return new FontFace('MPLUSRounded1c', `url(${url})`).load();
    };

    const preloadGLTF = (url: string) => {
      return fetch(url).then(response => response.blob());
    };

    const preloadAsset = async (url: string) => {
      try {
        const assetInfo = getAssetInfo(url);
        setCurrentAsset(assetInfo);
        
        if (url.endsWith('.ttf')) {
          await preloadFont(url);
        } else if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          await preloadImage(url);
        } else if (url.match(/\.(wav|mp3|ogg|m4a)$/i)) {
          await preloadAudio(url);
        } else if (url.match(/\.(glb)$/i)) {
          await preloadGLTF(url);
        }
        loadedCount++;
        setProgress((loadedCount / assetsToLoad.length) * 100);
      } catch (error) {
        console.error(`Failed to load asset: ${url}`, error);
        loadedCount++;
        setProgress((loadedCount / assetsToLoad.length) * 100);
      }
    };

    Promise.all(assetsToLoad.map(preloadAsset))
      .then(() => {
        setTimeout(() => {
          navigate('/splash');
        }, 500);
      })
      .catch(error => {
        console.error('Failed to load all assets:', error);
        setTimeout(() => {
          navigate('/splash');
        }, 500);
      });
  }, [navigate, bgLoaded]);

  return (
    <div className="relative h-screen w-full">
      {/* Full screen background */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: bgLoaded ? 'url(/images/loadingBG.png)' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: showContent ? 1 : 0
        }}
      />

      {/* Safe area for interactive elements */}
      <SafeArea>
        {showContent && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center w-full max-w-2xl px-4">
            {/* Current Asset Info */}
            <div className="w-full text-center mb-4">
              <span className="text-lg font-medium text-white">
                Loading {currentAsset.type}: {currentAsset.name}
              </span>
            </div>
            
            <div className="w-full flex items-center gap-4">
              {/* Progress bar */}
              <div className="flex-1 h-8 bg-green-500/20 backdrop-blur-sm rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300 ease-out flex items-center justify-center"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(to right, #92004a, #f7dc2d)`
                  }}
                >
                  <span style={{ color: '#001623' }} className="text-sm font-medium px-2">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              
              {/* Loading text */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Loader2 className="w-8 h-8" style={{ color: '#001623' }} />
                <span style={{ color: '#001623' }} className="font-bold text-2xl">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        )}
      </SafeArea>
    </div>
  );
}