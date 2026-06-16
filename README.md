# 🌙 DriftLoom — Dream Journal AI

> The AI-powered dream journal that decodes your subconscious.

## Tech Stack
- **React Native** (Expo)
- **Navigation**: @react-navigation/bottom-tabs (7 tabs)
- **Storage**: @react-native-async-storage/async-storage
- **Auth**: expo-local-authentication (Face ID / Touch ID)
- **AI**: Anthropic Claude API

## Quick Start
```bash
npm install
npx expo start
```

## Project Structure
```
App.js                          # Navigation + providers
src/
  context/AppContext.js          # All shared state
  screens/
    HomeScreen.js               # Dream score, check-in, cloud rooms, sounds
    JournalScreen.js            # Dream form, moods, AI reading
    InsightsScreen.js            # Analytics, patterns, zodiac, moon
    CyclesScreen.js              # Sleep stages, science
    LucidScreen.js               # Lucid techniques, reality checks
    DictionaryScreen.js          # 36 symbols with meanings
    SettingsScreen.js            # Themes, colors, security
  components/
    GlassCard.js                 # Reusable glass card
    LockScreen.js                # Passcode + Face ID
    PaywallModal.js              # 3-tier pricing
  hooks/
    useStorage.js                # AsyncStorage wrapper
    useMoonPhase.js              # Moon phase calculator
  constants/
    data.js                      # Dictionary, moods, symbols, etc.
    themes.js                    # 3 themes, ink colors, fonts
```

## Features (100+)
- 7 tabs, 36 dictionary entries, 18 moods
- AI dream interpretation + pattern analysis
- Face ID / Touch ID app lock
- 3 themes (Celestial, Midnight, Rose)
- 12 ink colors, 6 fonts, 5 backgrounds
- Moon phase tracking with dream guidance
- Cloud Rooms ambient spaces
- Sleep Sounds (8 categories)
- Dream Constellation, Achievements, DNA
- $4.99/mo, $29.99/yr, $49.99 lifetime
- Apple-compliant paywall with 7-day trial

## Ocoee Studios
Version 4.0 · 2026
