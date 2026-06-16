#!/bin/bash
# ═══════════════════════════════════════
# DriftLoom — Setup & Build Script
# Run: chmod +x setup.sh && ./setup.sh
# ═══════════════════════════════════════

echo "🌙 DriftLoom Setup"
echo "═══════════════════"

# Step 1: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Step 2: Install EAS CLI
echo ""
echo "🔧 Installing EAS CLI..."
npm install -g eas-cli

# Step 3: Install additional Expo packages
echo ""
echo "📱 Installing Expo packages..."
npx expo install expo-dev-client
npx expo install expo-build-properties
npx expo install expo-font
npx expo install expo-haptics
npx expo install expo-linear-gradient
npx expo install expo-local-authentication
npx expo install expo-speech
npx expo install expo-status-bar
npx expo install react-native-svg
npx expo install react-native-safe-area-context
npx expo install react-native-screens
npx expo install @react-native-async-storage/async-storage
npx expo install @react-navigation/native
npx expo install @react-navigation/bottom-tabs

# Step 4: Install RevenueCat
echo ""
echo "💰 Installing RevenueCat..."
npm install react-native-purchases

echo ""
echo "═══════════════════════════════════════"
echo "✅ Setup complete!"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Login to EAS:"
echo "   eas login"
echo ""
echo "2. Initialize your project:"
echo "   eas init"
echo "   (This gives you a project ID — paste it in app.json)"
echo ""
echo "3. Build for development (test on your phone):"
echo "   eas build --profile development --platform ios"
echo ""
echo "4. After build completes, install on your phone and run:"
echo "   npx expo start --dev-client"
echo ""
echo "5. When ready for App Store:"
echo "   eas build --platform ios"
echo "   eas submit --platform ios"
echo ""
echo "🌙 Happy dreaming!"
