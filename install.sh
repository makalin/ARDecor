#!/bin/bash

echo "🚀 Installing ARDecor - AR Interior Design App"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI is already installed"
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "To start the development server, run:"
echo "  npm start"
echo ""
echo "To run on your device:"
echo "  1. Install the Expo Go app on your mobile device"
echo "  2. Run 'npm start' in this directory"
echo "  3. Scan the QR code with your device"
echo ""
echo "For more information, see the README.md file."
echo ""
echo "Happy designing with ARDecor! 🏠✨" 