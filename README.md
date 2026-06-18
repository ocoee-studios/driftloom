# DriftLoom — Every Tab Working + AuraLunis Feature Complete

This build keeps the approved DriftLoom visual direction and restores the AuraLunis feature depth as working app UI.

## Working tabs
Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings.

## What works now
- Bottom tab navigation opens every tab.
- Home Daily Spark saves fragments.
- Daily Check-in choices update.
- Dream Fact and Affirmation cycle.
- Sleep Sound and Cloud Room choices cycle.
- Journal Quick Capture saves dreams.
- Deep Journal accordions open and save rich dream fields.
- Recent dream cards load into the Journal for editing.
- Insights update from saved dreams.
- Creative Seed buttons save fragments.
- Cycles includes moon, sleep stages, REM estimator, smart wake, and editable sleep/wake fields.
- Lucid reality checks toggle and persist.
- Lucid Log saves fragments.
- Dictionary search, categories, selected symbol cards, personal meanings, and seen-in-dreams work.
- Settings privacy toggles, theme/ink/font choices, paywall preview, restore/export/reset actions work.
- Data persists locally with AsyncStorage.

## Logo usage
- Home: hero/signature logo and wordmark.
- Settings: profile/about logo.
- Other tabs: no repeated logo; they use their own graphics.

## Visual style
Dark navy/black app, icy-blue glass cards, silver text, premium app mockup layout, DriftLoom logo, moon, water, lucid head, and Dream DNA graphic.

## Run
```bash
npm install
npx expo start
```

## Verified
This package was verified with:
```bash
npm install
npx expo export --platform web --output-dir dist2
```
Export completed successfully.
