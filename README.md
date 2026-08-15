# BlinkMoney Missions

A React Native + Expo mobile experience that gamifies financial habits through money missions, progress tracking, streaks, Growth Points, and rewards.

## 🚀 Live Prototype

### Android APK

[Install / View the Android Build](https://expo.dev/accounts/poojaadas369/projects/BlinkMoneyMissions/builds/f4cbc575-cbae-43f5-b5b5-c97ddf2b3290)

## ✨ Features

- Money missions with different goals and durations
- Daily mission completion and progress tracking
- Persistent mission progress
- Streak tracking
- Growth Points and Rewards
- Progress synchronization across Home, Missions, and Rewards
- Mission completion state
- Achievement sharing
- Referral sharing
- WhatsApp support from Help
- Smooth mission progress animation
- Animated Growth Points counter
- Loading and error states
- Responsive mobile UI
- Persistent data using AsyncStorage

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage
- React Native Reanimated
- Expo EAS Build
- React Native Share API

## 📱 Main Screens

### Home

Provides an overview of active missions, overall progress, Growth Points, and financial habit tracking.

### Missions

Displays available money missions and their current progress.

### Mission Details

Allows users to complete daily mission actions and view:

- Mission progress
- Saved amount
- Streak
- Growth Points
- Mission completion status
- Achievement sharing

### Rewards

Displays earned Growth Points and provides the referral/share flow.

## 🎯 Product Thinking

I chose wealth gamification because saving and investing are long-term behaviors where users can lose motivation without visible progress or short-term rewards.

The experience turns financial actions into small missions with visible progress, streaks, and Growth Points, making consistency more tangible and rewarding.

## 🎨 UI & Interactions

The interface follows BlinkMoney's visual language with a dark UI, green accents, rounded cards, and clear visual hierarchy.

Micro-interactions include:

- Animated mission progress
- Animated Growth Points counter
- Mission completion state
- Interactive sharing actions
- Persistent bottom navigation
- Scroll-safe layouts

## 💾 Data Persistence

Mission progress and Growth Points are persisted locally using AsyncStorage so that progress remains available after the application is reopened.

## 🧪 Edge Cases

The project handles the following scenarios:

- Mission progress reaching the maximum number of days
- Progress persistence after app reload
- Progress synchronization across Home, Missions, and Rewards
- Invalid mission IDs
- Loading mission progress
- Share action failures
- Reopening completed missions
- Bottom navigation while scrolling

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DasPooja/BlinkMoneyMissions.git
cd BlinkMoneyMissions
```

### 2. Install dependencies
```bash
npm install
```
### 3. Start the Expo development server

```bash
npx expo start
```

Scan the QR code using Expo Go or run the project on an available Android/iOS simulator.

## 🧪 Validation

TypeScript validation:

```bash
npx tsc --noEmit
```

Expo project health check:

```bash
npx expo-doctor
```
The final project was validated successfully with TypeScript and Expo Doctor.

## 📦 Android Build

The Android preview build was created using Expo EAS:

```bash
npx eas-cli@latest build --platform android --profile preview
```

## 📂 Project Structure

```text
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── missions.tsx
│   └── rewards.tsx
├── mission/
│   └── [id].tsx
├── _layout.tsx
└── modal.tsx

components/
├── ui/
├── AppHeader.tsx
├── MissionCard.tsx
├── haptic-tab.tsx
├── themed-text.tsx
└── themed-view.tsx

assets/
constants/
hooks/
utils/
```

## 👩‍💻 Author

**Pooja Das**

Frontend Developer | React.js | React Native
