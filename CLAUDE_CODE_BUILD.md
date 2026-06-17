# DriftLoom — Claude Code Build Prompt

## What this is
A complete React Native / Expo app combining dream journaling + creative idea capture. 
The codebase is on GitHub at `ocoee-studios/driftloom`. Clone it and make it run.

## Step 1 — Clone and install

```bash
git clone https://github.com/ocoee-studios/driftloom.git
cd driftloom
npm install
```

## Step 2 — Install all required dependencies

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context \
  react-native-svg @react-native-async-storage/async-storage \
  expo-local-authentication expo-haptics expo-constants \
  react-native-gesture-handler react-native-reanimated
```

## Step 3 — Verify the project structure

The app should have this structure:
```
App.js                          ← Entry: 6-tab navigation
app.json                        ← Expo config
package.json                    ← Dependencies
src/
  screens/
    HomeScreen.js               ← Hero logo, stats, spark, moon, fragments
    JournalScreen.js            ← Quick Capture (title, notes, mood, lucid, symbols)
    InsightsScreen.js           ← Dream DNA, stats, symbols, emotional trend
    CyclesScreen.js             ← Moon phase, sleep outlook, stages, smart wake
    LucidScreen.js              ← XP progress, reality checks, MILD/WBTB/WILD/SSILD
    DictionaryScreen.js         ← Search, categories, featured symbol, recent
    SettingsScreen.js           ← Profile, privacy, subscription, legal
    CaptureScreen.js            ← 6 fragment types + dream journal entry
    LoomScreen.js               ← Signal detection, AI mentors, zodiac, moon journey
    VaultScreen.js              ← Search + filter all fragments + dreams
    DreamsScreen.js             ← Sub-tabs: overview, sleep, lucid, dictionary
  components/
    GlassCard.js                ← Reusable glass card component
    LockScreen.js               ← Face ID / passcode lock
    PaywallModal.js             ← 3-tier paywall ($3.99/mo, $29.99/yr, $39.99 lifetime)
  context/
    AppContext.js               ← All state: dreams, fragments, checks, settings, theme
  constants/
    data.js                     ← 15 data arrays (moods, zodiac, moon, dict, stages, etc.)
    themes.js                   ← 3 themes + 12 ink colors + 6 fonts
  theme/
    brand.ts                    ← DriftLoom color tokens
  hooks/
    useMoonPhase.js             ← Moon phase calculation
    useStorage.js               ← AsyncStorage persistence
  services/
    purchases.js                ← RevenueCat stub
assets/
  brand/
    driftloom-logo.png          ← 1024x1024 D icon
    driftloom-logo-transparent.png
    driftloom-logo-full.png
    colors.json                 ← Brand palette
  icon.png                      ← App Store icon
  splash.png                    ← Launch screen
```

## Step 4 — Fix any import issues

The 6-tab navigation in App.js uses these screens:
```javascript
import HomeScreen from './src/screens/HomeScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import LoomScreen from './src/screens/LoomScreen';
import DreamsScreen from './src/screens/DreamsScreen';
import VaultScreen from './src/screens/VaultScreen';
import SettingsScreen from './src/screens/SettingsScreen';
```

Tab names: Today, Capture, Loom, Dreams, Vault, Settings
Icons: ◉, ◎, ◈, ☽, ◇, ⚙

If any screen has missing imports or undefined variables, fix them by:
1. Checking what the screen imports from `../constants/data`
2. Verifying those exports exist in `src/constants/data.js`
3. Checking what the screen uses from `useApp()` context
4. Verifying AppContext provides those values

## Step 5 — Verify AppContext provides everything screens need

Screens use these from `useApp()`:
```
dreams, setDreams           — Array of dream entries
fragments, setFragments     — Array of captured fragments
dream, setDream             — Current draft dream being edited
saveDream                   — Function to save current dream
checks, setChecks           — Reality check booleans [false,false,false,false]
colors                      — Current theme colors object
moonPhase                   — { name, illumination, cycle }
checkin                     — Daily check-in data
hasAccess                   — Boolean: user has premium
showPaywall, setShowPaywall — Paywall visibility
lockEnabled, setLockEnabled — App lock toggle
biometricEnabled, setBiometricEnabled — Face ID toggle
theme, setTheme             — Current theme name
inkColor, setInkColor       — Journal ink color
journalFont, setJournalFont — Journal font
aiResult, setAiResult       — AI analysis result text
aiLoading, setAiLoading     — AI loading state
editingIdx                  — Index of dream being edited (-1 = new)
appLocked                   — Whether app is currently locked
```

## Step 6 — Brand colors (use everywhere)

```javascript
const driftloomColors = {
  deepBlack: "#02040A",      // Main background
  midnightNavy: "#07111F",   // Card backgrounds
  deepOcean: "#0E2B5C",      // Accent backgrounds
  glacierBlue: "#4FCBFF",    // Primary action color
  metallicSilver: "#C7D0DB", // Secondary text
  icyWhite: "#EAF6FF",       // Primary text
};
```

Glass card style:
```javascript
{
  backgroundColor: 'rgba(14, 43, 92, 0.35)',
  borderWidth: 1,
  borderColor: 'rgba(79, 203, 255, 0.12)',
  borderRadius: 18,
  padding: 18,
}
```

## Step 7 — Run it

```bash
npx expo start
```

Scan QR with Expo Go on your phone. All 6 tabs should work.

## Step 8 — Known issues to fix

1. **HomeScreen logo path**: Uses `require('../../assets/brand/driftloom-logo.png')` — verify this file exists after clone
2. **SettingsScreen logo path**: Same as above
3. **react-native-svg**: Used in DreamsScreen for Dream Score circle — install if missing
4. **GlassCard component**: May need a `dark` prop that renders a gradient background
5. **Navigation**: If tabs don't render, check that `@react-navigation/bottom-tabs` is installed

## Step 9 — After it runs

- Test all 6 tabs
- Test saving a dream (Journal → Save Dream)
- Test capturing a fragment (Capture → Drop Fragment)
- Test the paywall (Settings → DriftLoom Plus)
- Test Face ID toggle (Settings → Passcode & Face ID)
- Verify the D logo appears on Home and Settings screens

## Bundle ID
`com.ocoeestudios.driftloom`

## Pricing
- Monthly: $3.99/mo
- Annual: $29.99/yr (7-day free trial)
- Lifetime: $39.99 (FOUNDER badge)
