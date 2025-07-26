# ARDecor

ARDecor is an Augmented Reality (AR) Interior Design App that lets users visualize furniture in their homes before making a purchase. By leveraging AR technology, ARDecor reduces the risk of buying furniture that doesn't fit or match your space, offering a seamless and interactive way to design your home.

## Features
- **AR Visualization**: Place 3D furniture models in your real-world environment using your device's camera.
- **Real-Time Customization**: Adjust furniture colors, sizes, and styles to match your preferences.
- **Room Compatibility Check**: Measure and verify if furniture fits your space with AR-based spatial analysis.
- **Save & Share**: Capture your AR designs, save them, and share with friends or family for feedback.
- **Furniture Catalog**: Browse a wide range of furniture from partnered retailers.

## Tech Stack
- **Frontend**: React Native with Expo
- **AR Framework**: Expo GL + Three.js for 3D rendering
- **Navigation**: React Navigation v6
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: Custom components with React Native Linear Gradient
- **Icons**: Expo Vector Icons (Ionicons)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- A smartphone or tablet with AR support (iOS: ARKit, Android: ARCore)
- Minimum OS: iOS 13.0 or Android 8.0
- Internet connection for accessing the furniture catalog

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/makalin/ARDecor.git
   cd ARDecor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device:**
   - Install the Expo Go app on your mobile device
   - Scan the QR code displayed in the terminal or browser
   - The app will load on your device

### Building for Production

#### iOS
```bash
expo build:ios
```

#### Android
```bash
expo build:android
```

## Project Structure

```
ARDecor/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ARFurnitureRenderer.tsx
│   ├── screens/            # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── ARScreen.tsx
│   │   ├── CatalogScreen.tsx
│   │   ├── SavedDesignsScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── utils/              # Utility functions
│       ├── ARUtils.ts
│       └── StorageUtils.ts
├── assets/                 # Images, icons, and static assets
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler configuration
└── tsconfig.json          # TypeScript configuration
```

## Usage

### Home Screen
- View quick actions for starting AR design, browsing catalog, and viewing saved designs
- See recent designs and statistics
- Access different app sections through the bottom navigation

### AR Screen
1. Select furniture from the catalog
2. Point your camera at a flat surface
3. Tap to place furniture in AR
4. Adjust position, rotation, and scale
5. Save or share your design

### Catalog Screen
- Browse furniture by category
- Search for specific items
- View detailed information including dimensions and pricing
- Add items to your AR design

### Saved Designs Screen
- View all your saved AR designs
- Edit, share, or delete designs
- Organize designs by room type

### Profile Screen
- Manage user preferences
- Toggle notifications, dark mode, and location services
- Access app settings and support

## Key Features Implementation

### AR Functionality
- Uses Expo GL and Three.js for 3D rendering
- Camera integration for real-world overlay
- Gesture recognition for furniture manipulation
- Spatial tracking for accurate placement

### Data Management
- Local storage using AsyncStorage
- Design persistence and retrieval
- User preferences management
- Furniture catalog management

### UI/UX
- Modern, intuitive interface
- Smooth animations and transitions
- Responsive design for different screen sizes
- Accessibility features

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new screens in `src/screens/`
3. Update navigation in `App.tsx`
4. Add utility functions in `src/utils/`

### Styling
- Uses StyleSheet for component styling
- Consistent color scheme and typography
- Responsive design patterns

### Testing
```bash
# Run tests (when implemented)
npm test
```

## Contributing
We welcome contributions to ARDecor! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and ensure your changes align with the project's goals.

## Troubleshooting

### Common Issues

**Camera permissions not working:**
- Ensure camera permissions are granted in device settings
- Check that the app has proper permissions in `app.json`

**AR not working on device:**
- Verify device supports AR (ARKit for iOS, ARCore for Android)
- Check device OS version requirements
- Ensure good lighting conditions

**App crashes on startup:**
- Clear Expo cache: `expo r -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Build errors:**
- Update Expo CLI: `npm install -g @expo/cli@latest`
- Check for dependency conflicts
- Verify TypeScript configuration

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out via:
- **Email**: makalin@gmail.com
- **Issues**: Create a GitHub issue in this repository

## Acknowledgments
- Expo team for the excellent development platform
- Three.js community for 3D graphics library
- React Navigation for routing solution
- All contributors and supporters

Happy designing with ARDecor!
