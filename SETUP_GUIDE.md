# ARDecor - Complete Working Source Code Setup Guide

## 🎯 Overview

This is a complete, working source code for ARDecor - an Augmented Reality Interior Design App built with React Native and Expo. The app allows users to visualize furniture in their homes using AR technology.

## 📁 Project Structure

```
ARDecor/
├── src/
│   ├── components/
│   │   └── ARFurnitureRenderer.tsx    # 3D furniture rendering component
│   ├── screens/
│   │   ├── HomeScreen.tsx             # Main dashboard
│   │   ├── ARScreen.tsx               # AR camera and furniture placement
│   │   ├── CatalogScreen.tsx          # Furniture browsing
│   │   ├── SavedDesignsScreen.tsx     # Saved designs management
│   │   └── ProfileScreen.tsx          # User settings and profile
│   └── utils/
│       ├── ARUtils.ts                 # AR calculations and utilities
│       └── StorageUtils.ts            # Local data persistence
├── assets/                            # App icons and images
├── App.tsx                            # Main app component with navigation
├── package.json                       # Dependencies and scripts
├── app.json                          # Expo configuration
├── babel.config.js                   # Babel configuration
├── metro.config.js                   # Metro bundler configuration
├── tsconfig.json                     # TypeScript configuration
├── install.sh                        # Quick installation script
└── README.md                         # Detailed documentation
```

## 🚀 Quick Start

### Option 1: Automated Installation (Recommended)
```bash
# Clone the repository
git clone https://github.com/makalin/ARDecor.git
cd ARDecor

# Run the installation script
./install.sh
```

### Option 2: Manual Installation
```bash
# Clone the repository
git clone https://github.com/makalin/ARDecor.git
cd ARDecor

# Install dependencies
npm install

# Start the development server
npm start
```

## 📱 Running the App

1. **Install Expo Go** on your mobile device:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Scan the QR code** with your device's camera (iOS) or Expo Go app (Android)

4. **Grant permissions** when prompted (camera, location, etc.)

## 🎨 Features Implemented

### ✅ Core Features
- **Home Dashboard**: Quick actions, recent designs, statistics
- **AR Furniture Placement**: Camera-based AR with 3D furniture rendering
- **Furniture Catalog**: Browse, search, and filter furniture items
- **Saved Designs**: Save, edit, share, and delete AR designs
- **User Profile**: Settings, preferences, and account management

### ✅ Technical Features
- **3D Rendering**: Three.js integration for furniture visualization
- **Camera Integration**: Real-time camera feed with AR overlay
- **Local Storage**: AsyncStorage for design persistence
- **Navigation**: React Navigation with bottom tabs
- **Responsive UI**: Modern design with gradients and animations

### ✅ AR Capabilities
- Furniture placement in real-world space
- Position, rotation, and scale adjustments
- Room compatibility checking
- Spatial measurements and calculations

## 🛠️ Development Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Development Commands
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Build for production
expo build:ios
expo build:android

# Eject from Expo (if needed)
expo eject
```

## 📊 App Screens

### 1. Home Screen
- Welcome header with gradient background
- Quick action cards (AR Design, Catalog, Saved, Measure)
- Recent designs carousel
- User statistics

### 2. AR Screen
- Camera view with AR overlay
- Furniture selection interface
- AR controls (place, save, share)
- Real-time furniture rendering

### 3. Catalog Screen
- Furniture grid with search and filters
- Category-based browsing
- Detailed furniture information
- Add to AR design functionality

### 4. Saved Designs Screen
- Grid of saved AR designs
- Design metadata (date, furniture count, room type)
- Edit, share, and delete actions
- Empty state with call-to-action

### 5. Profile Screen
- User profile with avatar and stats
- Settings toggles (notifications, dark mode, location)
- Menu items (settings, privacy, help, about)
- Logout functionality

## 🔧 Configuration Files

### app.json
- App metadata and permissions
- iOS and Android specific settings
- Camera and location permissions
- Bundle identifiers

### package.json
- All necessary dependencies
- Development and build scripts
- Expo and React Native versions

### babel.config.js
- Babel configuration for React Native
- Module resolver for clean imports
- Reanimated plugin for animations

### metro.config.js
- Metro bundler configuration
- SVG support
- Asset handling

## 🎯 Key Components

### ARFurnitureRenderer
- Three.js integration for 3D rendering
- Furniture placement and manipulation
- Lighting and materials
- Real-time updates

### ARUtils
- Spatial calculations
- Room compatibility checking
- Furniture positioning logic
- Measurement utilities

### StorageUtils
- Local data persistence
- Design saving and loading
- User preferences management
- Data export/import

## 🚨 Troubleshooting

### Common Issues

**Camera permissions not working:**
```bash
# Check app.json permissions
# Ensure device settings allow camera access
```

**AR not working:**
- Verify device supports AR (ARKit/ARCore)
- Check lighting conditions
- Ensure stable surface detection

**Build errors:**
```bash
# Clear cache
expo r -c

# Reinstall dependencies
rm -rf node_modules && npm install

# Update Expo CLI
npm install -g @expo/cli@latest
```

**TypeScript errors:**
```bash
# Check tsconfig.json configuration
# Ensure all dependencies are installed
```

## 📈 Next Steps

### Potential Enhancements
1. **Backend Integration**: Firebase or custom API for cloud storage
2. **3D Model Loading**: Support for GLTF/USDZ model formats
3. **Advanced AR**: Plane detection, occlusion, physics
4. **Social Features**: Design sharing, community gallery
5. **E-commerce**: Direct furniture purchasing
6. **Analytics**: Usage tracking and insights

### Performance Optimizations
1. **3D Model Optimization**: LOD (Level of Detail) systems
2. **Memory Management**: Efficient texture and geometry handling
3. **Battery Optimization**: Reduced AR processing when not needed
4. **Offline Support**: Cached furniture models and designs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- **Email**: makalin@gmail.com
- **Issues**: GitHub Issues
- **Documentation**: README.md

---

**Happy AR Designing! 🏠✨** 