# DriftLoom — Claude Code Conversion Prompt

## COPY & PASTE THIS INTO CLAUDE CODE:

```
I need you to convert DriftLoom from a React web prototype to a React Native (Expo) app.

## Source files:
- `src/DriftLoom-V4.0.jsx` — the complete prototype with 100+ features across 7 tabs
- `native/` — scaffold with App.js, hooks, constants, and screen shells
- `docs/CLAUDE_CODE_GUIDE.md` — detailed conversion guide

## What to do:

### 1. Read the source files first
Read DriftLoom-V4.0.jsx completely. It has 7 tabs: Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings. Each tab has 10-30 inline-styled components.

### 2. Convert HTML → React Native primitives
- `<div>` → `<View>`
- `<span>`, `<p>`, text content → `<Text>`
- `<button>` → `<TouchableOpacity>` wrapping `<Text>`
- `<input>` → `<TextInput>`
- `<textarea>` → `<TextInput multiline>`
- `<img>` → `<Image>`
- `<svg>` → `react-native-svg` (`<Svg>`, `<Circle>`, `<Path>`)
- `<a href>` → `<TouchableOpacity onPress={() => Linking.openURL(url)}>`
- `onClick` → `onPress`
- `className` → remove entirely (all styles are already inline)
- CSS `backdrop-filter` → remove (not supported in RN, use opacity/blur alternatives)

### 3. Convert inline styles
All styles are already inline objects — just fix web-only properties:
- `borderRadius: 99` → works as-is in RN
- `fontFamily` → load fonts with expo-font: 'CormorantGaramond-Bold', 'DMSans-Regular'
- `cursor: "pointer"` → remove
- `backdropFilter` → remove
- `WebkitBackdropFilter` → remove  
- `textTransform: "uppercase"` → works in RN
- `boxShadow` → convert to `shadowColor/shadowOffset/shadowOpacity/shadowRadius` + `elevation`
- `background: "linear-gradient(...)"` → use `expo-linear-gradient` `<LinearGradient>`
- `overflow: "hidden"` → works as-is
- `position: "absolute/relative"` → works as-is
- `display: "grid"` → convert to `<View style={{flexDirection:'row', flexWrap:'wrap'}}>` with calculated widths
- `display: "flex"` → default in RN, just use flexDirection
- `gap` → not supported in older RN; use `marginRight`/`marginBottom` on children
- `placeItems: "center"` → `justifyContent: 'center', alignItems: 'center'`

### 4. Navigation
Use `@react-navigation/bottom-tabs` with 7 tabs matching NAV array. The scaffold in `native/App.js` has this started.

### 5. Storage  
Replace `window.storage` calls with AsyncStorage from `@react-native-async-storage/async-storage`. The hook is in `native/hooks/useStorage.js`.

### 6. Key packages to install:
```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install expo-font expo-linear-gradient expo-local-authentication
npx expo install react-native-svg react-native-reanimated
npx expo install expo-haptics expo-speech
npm install react-native-purchases  # RevenueCat
```

### 7. Face ID / Touch ID
The prototype has a comment `/* NATIVE: use expo-local-authentication here */`. Replace the simulation code with:
```javascript
import * as LocalAuthentication from 'expo-local-authentication';
const authenticate = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!hasHardware || !isEnrolled) return;
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock your dream journal',
    fallbackLabel: 'Use Passcode',
  });
  if (result.success) setAppLocked(false);
};
```

### 8. RevenueCat for IAP
Replace hardcoded prices with RevenueCat:
```javascript
import Purchases from 'react-native-purchases';
Purchases.configure({ apiKey: 'YOUR_REVENUECAT_KEY' });
// Offerings: monthly ($4.99), annual ($29.99), lifetime ($49.99)
```

### 9. AI Backend
The prototype calls the Anthropic API directly. In production, route through your own server:
```javascript
const response = await fetch('https://your-server.com/api/dream-interpret', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ dream: dreamText }),
});
```

### 10. Convert screen by screen in this order:
1. HomeScreen (largest, most complex)
2. JournalScreen (forms, inputs, save logic)
3. InsightsScreen (data visualization, charts)
4. CyclesScreen (sleep stages, calculator)
5. LucidScreen (checklists, techniques)
6. DictionaryScreen (search, filter, expand/collapse)
7. SettingsScreen (themes, colors, toggles, lock)

### 11. Before finishing:
- Remove "Reset Purchase & Trial (testing only)" button
- Remove "Preview Paywall (testing only)" button  
- Uncomment `setAppLocked(true)` in the storage load effect
- Test all 7 tabs render without errors
- Test paywall flow: free → trial → expired → purchase
- Test lock screen: set passcode → lock → unlock → Face ID → forgot
```

## ALTERNATIVE — SCREEN-BY-SCREEN PROMPTS:

If the full conversion is too large for one prompt, use these individually:

### Prompt 1 — Setup:
```
Set up the Expo project for DriftLoom. Install all dependencies listed in the conversion guide. Set up navigation with 7 bottom tabs. Load Cormorant Garamond and DM Sans fonts. Create the theme system with 3 themes from native/constants/themes.js.
```

### Prompt 2 — Home Screen:
```
Convert the Home tab from DriftLoom-V4.0.jsx to React Native. It includes: greeting, hero card, Dream Score ring (SVG), Symbol of Day, Dream Fact, Watch companion, Sleep Tracker, Daily Check-in, Dream Tarot, Cloud Rooms, Sleep Sounds, Morning Glow, Dream Déjà Vu, Tonight's Forecast, Dream Calendar, Dream Weather, search, and dream entries list.
```

### Prompt 3 — Journal Screen:
```
Convert the Journal tab. It includes: completeness ring, writing prompts, title input + AI generate, notes textarea + voice recording, mood grid (18 moods in 3-col), vividness slider, symbols input, 4 collapsible groups (Mood & Feeling, Dream World, Characters, Powers/Context), save button, AI "Read This Dream", Dream Card sharing, share/delete.
```

### Prompt 4 — Insights Screen:
```
Convert the Insights tab. It includes: AI Pattern Analysis (6 modes, gated), Dream Statistics (3x2 grid), Mood Timeline (bar chart), Pattern Detector (dark card), Weekly Report, Dream DNA, Daily Affirmation, Emotional Landscape (progress bars), Subconscious Messages, Dream Achievements (3x2 badges), Dream Wisdom (quotes), Dream Zodiac (4x3 grid), Moon's Journey (4x2 grid with expand).
```

### Prompt 5 — Cycles + Lucid:
```
Convert Cycles and Lucid tabs. Cycles: intro card, 4 cycle rings, 5 sleep stage cards (inline styled with gradient bars), Sleep Tonight prediction, Did You Know facts, Smart Wake Calculator, Sleep Architecture, Power Nap Guide, Chronotype, Sleep Stage Secrets. Lucid: intro, reality checks with toggles, morning ritual, wind-down, MILD/WILD/WBTB techniques, benefits cards.
```

### Prompt 6 — Dictionary + Settings + Paywall:
```
Convert Dictionary, Settings, and Paywall. Dictionary: search input, 7 category pills, 36 entries as expandable cards, "Add to dream" button. Settings: 3 themes, 12 ink colors (inline circles), 6 fonts, 5 backgrounds, security (lock + Face ID), watch sync, export, reset buttons. Paywall: modal with 3 tiers ($4.99/mo, $29.99/yr, $49.99 lifetime), trial CTA, Apple-compliant terms.
```
