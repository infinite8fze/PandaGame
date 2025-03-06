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

- Kitchen: Table, stove, and refrigerator props
- Playroom: Gaming chair, ball, and minigames
- Bathroom: Bath, toilet, and carpet
- Bedroom: Bed, wardrobe, light, and carpet
- School: Table, pencil, calculator, and educational games
- Parent's Room: Control panel and customization options

### 6. Minigame System

- Multiple educational games
- Modal game selection interface
- Fullscreen game frame

### 7. Parent Control Panel

- Personalized Dialogue Settings
- Learning Level Settings
- Access Restrictions
- Notifications & Alerts
- Progress Center
- Customization Options

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
│   ├── parent/
│   │   ├── pages/
│   │   │   ├── AccessRestrictionsPage.tsx
│   │   │   ├── LearningLevelSettingsPage.tsx
│   │   │   ├── NotificationsAlertsPage.tsx
│   │   │   ├── PersonalizedDialoguePage.tsx
│   │   │   └── ProgressCenterPage.tsx
│   │   ├── ControlPanelCard.tsx
│   │   └── ParentControlPanel.tsx
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
│   ├── MPLUSRounded1c-Black.ttf
│   ├── MPLUSRounded1c-Bold.ttf
│   ├── MPLUSRounded1c-ExtraBold.ttf
│   ├── MPLUSRounded1c-Light.ttf
│   ├── MPLUSRounded1c-Medium.ttf
│   ├── MPLUSRounded1c-Regular.ttf
│   └── MPLUSRounded1c-Thin.ttf
├── images/
│   ├── rooms/
│   │   ├── bathroom/
│   │   │   ├── bath.png
│   │   │   ├── carpet.png
│   │   │   ├── extra.png
│   │   │   ├── floor.png
│   │   │   ├── toilet.png
│   │   │   └── wall.png
│   │   ├── bedroom/
│   │   │   ├── bed.png
│   │   │   ├── carpet.png
│   │   │   ├── extra.png
│   │   │   ├── floor.png
│   │   │   ├── light.png
│   │   │   ├── wall.png
│   │   │   └── wardrobe.png
│   │   ├── gameroom/
│   │   │   ├── ball.png
│   │   │   ├── balloon-1.png
│   │   │   ├── balloon-2.png
│   │   │   ├── carpet.png
│   │   │   ├── extra.png
│   │   │   ├── floor.png
│   │   │   └── wall.png
│   │   ├── kitchen/
│   │   │   ├── extra.png
│   │   │   ├── floor.png
│   │   │   ├── refrigerator.png
│   │   │   ├── stove.png
│   │   │   ├── table.png
│   │   │   └── wall.png
│   │   └── school/
│   │       ├── calc.png
│   │       ├── extra.png
│   │       ├── floor.png
│   │       ├── pencil.png
│   │       ├── table.png
│   │       └── wall.png
│   ├── parent/
│   │   ├── contol-panel-icons/
│   │   │   ├── access.png
│   │   │   ├── dialog.png
│   │   │   ├── favorite.png
│   │   │   ├── learning.png
│   │   │   ├── notification.png
│   │   │   └── progress-center.png
│   │   └── sky.jpg
│   ├── slider/
│   │   ├── 1.png
│   │   ├── 2.png
│   │   ├── 3.png
│   │   ├── 4.png
│   │   ├── 5.png
│   │   └── 6.png
│   ├── mini-game/
│   │   ├── Color.png
│   │   ├── Fast.png
│   │   ├── Jigsaw.png
│   │   ├── Match-three.jpg
│   │   ├── Word-game.png
│   │   └── Writing.png
│   └── [various UI assets].png
└── svg/
    ├── bathroom.svg
    ├── bedroom.svg
    ├── calender.svg
    ├── checked.svg
    ├── control-panel-back.svg
    ├── gameroom.svg
    ├── King.svg
    ├── kitchen.svg
    ├── parent.svg
    ├── remove.svg
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
     - Parent Control Panel
       - Control Panel Pages
       - Settings Components

## Z-Index Layering

1. Floor (z-index: 1)
2. Wall (z-index: 2)
3. Carpet (z-index: 3)
4. Room Objects (z-index: 4)
5. Character (z-index: 10)
6. UI elements (z-index: 20+)
7. Modals (z-index: 50)

## Room-Specific Features

- **Bathroom**: Bath, toilet, carpet, themed background
- **Bedroom**: Bed, wardrobe, light, carpet, themed background
- **Kitchen**: Table, stove, refrigerator, themed background
- **School**: Table, pencil, calculator, themed background, educational games
- **Playroom**: Gaming chair, ball, balloons, minigames, carpet, themed background
- **Parent Room**: Control panel, customization options, professor character

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
