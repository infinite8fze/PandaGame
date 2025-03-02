# Interactive Learning Environment Project Prompt

## Project Overview
An interactive learning environment for children featuring a 3D panda character and multiple themed rooms. The application uses React, Three.js, and TypeScript to create an engaging educational experience.

## Core Features

### 1. Room System
- Multiple themed rooms:
  - Playroom (gameroom)
  - Kitchen
  - Bathroom
  - School
  - Bedroom
  - Parent's Room

### 2. Character System
- 3D Panda character with animations:
  - Idle animation
  - Talking animation
  - Room transition animation
- Professor character in parent's room

### 3. Voice Interaction
- Speech recognition for user input
- Text-to-speech responses
- Context-aware responses based on current room

### 4. UI Elements
- Room navigation buttons
- Level indicator (1-10)
- Currency display
- Microphone button with visual feedback
- Parent room access button

### 5. Room-Specific Features
- Kitchen: Table prop
- Playroom: Gaming chair and minigames
- All rooms: Themed backgrounds with walls and floors
- Selected rooms (bathroom, bedroom, gameroom): Decorative carpets

### 6. Minigame System
- Multiple educational games
- Modal game selection interface
- Fullscreen game frame

## Technical Structure

### File Organization
```
src/
├── components/
│   ├── rooms/
│   │   ├── Bathroom.tsx
│   │   ├── Bedroom.tsx
│   │   ├── Kitchen.tsx
│   │   ├── ParentRoom.tsx
│   │   ├── Playroom.tsx
│   │   ├── School.tsx
│   │   └── RoomBackground.tsx
│   ├── minigames/
│   │   ├── GameFrame.tsx
│   │   ├── MinigameButton.tsx
│   │   └── MinigameModal.tsx
│   ├── Character.tsx
│   ├── CurrencyDisplay.tsx
│   ├── LevelButton.tsx
│   ├── LoadingPage.tsx
│   ├── Panda.tsx
│   ├── Professor.tsx
│   ├── RoomButton.tsx
│   ├── RoomIcon.tsx
│   ├── SafeArea.tsx
│   ├── Scene.tsx
│   └── SplashPage.tsx
├── hooks/
│   └── useAudio.ts
└── App.tsx
```

### Asset Structure
```
public/
├── 3D-assets/
│   ├── 72.glb
│   ├── Panda_0_ALBD-TRANS.jpg
│   ├── Panda_0_Normal.jpg
│   └── Panda_0_Emission.jpg
├── audios/
│   ├── bathroom.wav
│   ├── bedroom.wav
│   ├── kitchen.wav
│   ├── parents.wav
│   ├── playroom.wav
│   └── school.wav
├── font/
│   └── MPLUSRounded1c-Black.ttf
├── images/
│   ├── rooms/
│   │   ├── bathroom/
│   │   │   ├── carpet.png
│   │   │   ├── floor.png
│   │   │   └── wall.png
│   │   ├── bedroom/
│   │   │   ├── carpet.png
│   │   │   ├── floor.png
│   │   │   └── wall.png
│   │   ├── gameroom/
│   │   │   ├── carpet.png
│   │   │   ├── floor.png
│   │   │   └── wall.png
│   │   ├── kitchen/
│   │   │   ├── floor.png
│   │   │   └── wall.png
│   │   └── school/
│   │       ├── floor.png
│   │       └── wall.png
│   ├── slider/
│   │   ├── 1.png
│   │   ├── 2.png
│   │   ├── 3.png
│   │   ├── 4.png
│   │   ├── 5.png
│   │   └── 6.png
│   └── [various UI assets].png
└── svg/
    ├── bathroom.svg
    ├── bedroom.svg
    ├── gameroom.svg
    ├── kitchen.svg
    ├── parent.svg
    └── school.svg
```

## Key Dependencies
- React
- Three.js (@react-three/fiber, @react-three/drei)
- TypeScript
- Tailwind CSS
- Lucide React (for icons)

## Component Hierarchy
1. App (Root)
   - LoadingPage
   - SplashPage
   - GameRoom
     - Scene
       - Room Components
       - Panda/Professor
     - UI Components
       - RoomButtons
       - LevelButton
       - CurrencyDisplay
       - MinigameButton
       - MinigameModal
       - GameFrame

## Z-Index Layering
1. Floor (z-index: 1)
2. Wall (z-index: 2)
3. Carpet (z-index: 3)
4. Panda (z-index: 4)
5. UI elements (z-index: 20+)

## Room-Specific Features
- **Bathroom**: Carpet, themed background
- **Bedroom**: Carpet, themed background
- **Kitchen**: Table prop, themed background
- **School**: Themed background
- **Playroom**: Gaming chair, minigames, carpet, themed background
- **Parent Room**: Professor character, customization options

## Animation System
- Character animations using Three.js
- UI animations using Tailwind CSS
- Room transition effects
- Interactive elements with hover/click animations

## Audio System
- Speech recognition for user input
- Text-to-speech for character responses
- Room-specific audio responses
- Audio preloading system

## Asset Management
- Preloading system for all assets
- Progress tracking during loading
- Fallback handling for failed loads
- Optimized asset organization

## Responsive Design
- Safe area implementation for different aspect ratios
- Responsive UI scaling
- Mobile-friendly touch interactions
- Flexible layout system