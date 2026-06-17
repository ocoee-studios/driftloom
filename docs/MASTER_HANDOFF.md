# Driftloom Master Handoff for ChatGPT and Claude Code

Last updated: June 17, 2026  
Owner / publisher: Ocoee Studios  
App name: Driftloom  
Domain direction: driftloom.net  
Current app type: Expo React Native prototype  
Current live preview: `http://localhost:8082/`

## Executive Summary

Driftloom is a private dream, idea, and symbol journal. It combines dream capture, lucid dreaming practice, sleep/lunar cycles, recurring symbol insight, and creative pattern recognition.

The app is being built by merging the richer AuraLunis dream app into the Driftloom brand. The final product should keep Driftloom's name, logo, Ocoee Studios publisher identity, icy blue/navy/silver visual language, and privacy-first positioning while incorporating the fuller AuraLunis feature depth.

Driftloom should feel like a premium thinking space for dreams, symbols, memory, and creative sparks. It should not feel like a generic notes app, a horoscope app, or a thin dream diary.

## Product Vision

One-line vision:

Driftloom helps people capture dreams and ideas, notice recurring patterns, and turn the material of their inner life into creative direction.

Core product promise:

Capture the fragments. Find the pattern. Turn inner drift into direction.

Emotional target:

- Calm
- Intelligent
- Luminous
- Private
- Premium but warm
- Creative but grounded
- Dream-aware without being only mystical
- Built around ideas, symbols, memory, sleep, and self-reflection

## Company / Publisher

Company name: Ocoee Studios

Use Ocoee Studios for:

- App Store publisher identity
- Legal docs
- Privacy policy
- Terms of use
- Support language
- In-app footer/about copy

Current in-app wording:

`Dream Journal by Ocoee Studios`

## Brand Identity

Approved logo direction:

- Metallic/glacial letter D
- Human face silhouette inside the D
- Branching tree/neural growth from the head
- Electric blue and silver highlights
- Deep navy background
- Communicates consciousness, ideas, memory, dream logic, and creative growth

Important logo rule:

The logo is too detailed and beautiful to hide inside a generic square or tiny header mark. Use it as a hero/signature asset with strong contrast and breathing room. Do not put visible square boxes around logo versions except for the actual app icon.

Current logo assets in project:

- `assets/driftloom-icon.png`
- `assets/driftloom-wordmark.png`
- `assets/driftloom-mark-transparent.png`
- `assets/driftloom-mark-cutout.png`

## Brand Colors

Primary logo palette:

- Deep Black: `#02040A`
- Midnight Navy: `#07111F`
- Deep Ocean: `#0E2B5C`
- Glacier Blue: `#4FCBFF`
- Metallic Silver: `#C7D0DB`
- Icy White: `#EAF6FF`
- Icy Mist: `#DFF6FF`

Design direction:

- Prefer icy blue/light backgrounds where the logo needs visibility.
- Use dark navy text for readability.
- Avoid teal/light-blue text for important labels, titles, and controls.
- Glacier blue is an accent, not the main readable text color.
- Use liquid glass panels carefully: translucent, bordered, readable.
- Avoid purple-heavy AuraLunis styling unless deliberately adapted into Driftloom colors.

## Current Technical Project

Project folder:

`/Users/jamiebradshaw/Documents/Codex/2026-06-07/i-want-to-design-a-app/outputs/driftloom-react-native`

Main live app file:

`src/DreamApp.tsx`

Entry point:

`App.tsx`

Current stack:

- Expo `~51.0.0`
- React `18.2.0`
- React Native `0.74.5`
- React Native Web `~0.19.10`
- AsyncStorage `1.23.1`
- TypeScript `~5.3.3`

Scripts:

```bash
npm run web -- --port 8082 --localhost
npm run typecheck
```

Current preview:

`http://localhost:8082/`

## Important Files

Live Driftloom files:

- `App.tsx` exports the live app from `src/DreamApp.tsx`
- `src/DreamApp.tsx` contains the current live UI, state, styles, and tab rendering
- `src/driftloom.ts` contains older idea-incubation logic
- `src/purchases.ts` contains native subscription/paywall placeholders
- `src/theme/brand.ts` contains brand colors and copy
- `src/nativeShims.ts` contains shims for platform-safe behavior
- `app.json` contains Expo app metadata
- `tsconfig.json` excludes `merged-source` from compilation
- `README.md` explains the merged project
- `DRIFTLOOM_MASTER_HANDOFF.md` is the earlier product handoff
- `AURALUNIS_MERGE_MANIFEST.md` explains the merge history

Preserved AuraLunis source:

- `merged-source/auralunis-main`

That folder includes:

- Original `App.js`
- Huge original `src/AuraLunis-V4.0.jsx`
- Original screens
- Original components
- Original context/hooks/services
- Original data/theme constants
- App Store docs
- ASO docs
- RevenueCat setup docs
- Privacy/terms docs
- Original AuraLunis assets

Important: `merged-source` is reference/archive material and is intentionally excluded from TypeScript compilation. Do not import directly from it into the live app without adapting names, styles, and code to Driftloom.

## Current Live Tabs

The live app currently has seven tabs:

1. Home
2. Journal
3. Insights
4. Cycles
5. Lucid
6. Dictionary
7. Settings

All live tabs are rendered inside `src/DreamApp.tsx`.

Important render locations:

- `renderHome()` around `src/DreamApp.tsx`
- `renderJournal()`
- `renderInsights()`
- `renderCycles()`
- `renderLucid()`
- `renderDictionary()`
- `renderSettings()`

## Live Home Features

Home currently includes:

- Large Driftloom logo hero
- Dream count
- Day streak
- Recall percentage
- Dream intelligence card
- Dream score
- Tonight mission
- Dream fact
- Symbol of the day
- Dream wisdom quote
- Daily check-in
- Sleep/stress/energy quick metrics
- Current moon/lunar phase
- Dream weather / recall forecast
- Sleep sound palette
- Cloud rooms / mood spaces
- Morning catch prompt
- Top mood and symbol
- Private affirmation
- Recall ritual
- Recent dream stream

AuraLunis features already incorporated here:

- Daily check-in
- Feeling picker
- Symbol of the day
- Dream fact
- Dream weather
- Sleep sounds
- Cloud rooms
- Affirmations
- Dream wisdom quote

## Live Journal Features

Journal is the core screen. It currently supports:

- Title
- Dream notes
- Dream completeness meter
- Mood
- Wake feeling
- Vividness
- Sleep quality
- Lucid toggle
- Dream category
- Dream genre
- Tags/symbols
- Dream duration
- Weather
- Sounds
- Location
- Texture
- Lighting
- Character names
- Reality breaks / impossible things
- Dream dialogue
- Superpower
- Movement
- Sensation
- Dream mission
- Pre-sleep thought
- Deja vu
- Dream ending
- Save dream
- Edit dream
- Local persistence with AsyncStorage

Needed improvements:

- Split into Quick Capture and Deep Journal modes
- Add collapsible sections
- Add clearer save confirmation
- Add voice/photo attachment later
- Add richer dream role, time flow, gravity, scent, scene transition, wake trigger, clearest moment, and dream tech fields from AuraLunis

## Live Insights Features

Insights currently includes:

- Average recall
- Sleep score
- Lucid count
- Pattern detector
- Analysis lenses
- Dream DNA card
- Top category
- Top genre
- Common setting
- Common sound
- Mood map
- Recurring symbols
- Privacy-first insights note

Future upgrades:

- Timeline graph
- Weekly/monthly trends
- Recurring symbol evolution
- Creative seeds from dreams
- Opt-in AI interpretation
- Exportable insight summaries

## Live Cycles Features

Cycles currently includes:

- Current moon phase
- Lunar phase guide
- Sleep rhythm timeline
- Sleep stage cards
- Smart wake guide
- Cycle stats
- Average sleep
- Average recall

AuraLunis source has additional cycle ideas preserved:

- Cycle rings
- Sleep tonight grade based on check-in
- More visual sleep architecture
- Did-you-know sleep facts

Future upgrades:

- Bedtime/wake time calculator
- REM window estimator
- Smart wake calculator
- Sleep consistency tracking
- Apple Health integration later

## Live Lucid Features

Lucid was recently expanded and now includes:

- Reality practice hero
- Lucid progress stats
- What lucid dreaming is
- Lucid dreaming statistics
- Detailed reality checks:
  - Look at your hands
  - Read text twice
  - Finger through palm
  - Check the time
- Daily lucid training routine:
  - Morning recall
  - Midday check
  - Evening review
  - Sleep intention
- Lucid techniques:
  - Reality Testing
  - MILD
  - WBTB
  - WILD
  - SSILD
- How to stay lucid:
  - Touch the scene
  - Slow your excitement
  - Name the dream
  - Ask one question
- Training stages:
  - Dream recall
  - Dream signs
  - First lucid moment
  - Stabilization
- Benefits
- Awareness-first safety guidance

Important product rule:

Lucid dreaming should be practical and safe. Teach awareness before control. Avoid promising guaranteed control, supernatural claims, or sleep disruption as a primary goal.

## Live Dictionary Features

Dictionary currently includes:

- Search
- Categories:
  - All
  - Symbols
  - Animals
  - Elements
  - Places
  - Actions
  - Types
- Expandable symbol cards
- Symbol wisdom note
- Dream Q&A
- Trusted source/resource list

Future upgrades:

- Port the full AuraLunis dictionary from `merged-source/auralunis-main/src/constants/data.js`
- Add personal symbol history
- Add "seen in my dreams" counts
- Add user-defined meanings
- Add culturally sensitive wording

## Live Settings Features

Settings currently includes:

- Driftloom/Ocoee Studios brand block
- Subscription plan language
- Native purchase direction
- Privacy nutrition label
- Data practices
- App Store readiness checklist
- Journal protection card
- Export dream journal
- Reset journal
- Terms and Privacy links
- Paywall preview

Important payment decision:

No Stripe. Use native App Store / Google Play in-app purchases later.

Suggested pricing direction:

- Free tier for basic journaling
- Premium monthly around `$4.99`
- Premium yearly around `$29.99-$39.99`
- 7-day free trial

## Preserved AuraLunis Features Not Fully Ported Yet

These exist in `merged-source/auralunis-main` and should be adapted carefully:

- React Navigation architecture
- AppContext architecture
- Separate screen files
- LockScreen component
- PaywallModal component
- RevenueCat setup/service docs
- Full Settings security controls
- Passcode setup
- Biometric language
- Full theme picker
- Ink colors
- Journal font selection
- Journal background selection
- Export/reset purchase testing controls
- Expanded dictionary
- More App Store/ASO docs
- Landing page docs
- Privacy and terms docs

Important: Port these into Driftloom identity. Do not reintroduce AuraLunis branding, purple-heavy theme, or generic dream-app styling.

## Current Storage / State

Live app uses AsyncStorage under:

`driftloom:dream-journal:v1`

Currently persisted:

- Dreams
- Lucid checks
- Daily check-in
- Check-in completed state

Production considerations:

- Add versioned migrations before changing stored dream shape too much.
- Add export/delete user data.
- Avoid sending dreams to servers without explicit opt-in.
- Future AI interpretation must be opt-in and clearly disclosed.

## Privacy Direction

Driftloom deals with deeply personal content. Build privacy-first.

Current product stance:

- Dreams stored locally in prototype
- No hidden AI calls in current build
- No ads
- No third-party tracking
- Native purchases later
- AI interpretation later only if opt-in

Before App Store launch:

- Final privacy policy
- Final terms
- Support email
- Data deletion/export flow
- Restore purchases
- Native IAP setup
- App Store privacy nutrition label
- Screenshots
- App Review notes

## Design Rules

Do:

- Keep the logo visible and respected
- Use the new dark premium mobile direction inspired by the supplied reference mockup
- Use deep navy/black app backgrounds with glowing blue liquid-glass cards
- Use white/icy text for main titles and muted blue-gray text for body copy
- Use liquid glass panels with clear borders
- Make each tab feel complete
- Make every control readable and tappable
- Keep screen density useful but not chaotic
- Use Driftloom brand language throughout

Do not:

- Use teal/light-blue text for important text
- Hide the logo in a square box
- Make the UI look like a generic template
- Revert to AuraLunis name or purple theme
- Use Stripe
- Add hidden AI calls
- Make lucid dreaming sound unsafe or guaranteed
- Overload Journal without progressive disclosure

## Latest Visual Direction

The app was recently shifted toward a dark premium iPhone-style interface based on the user's reference mockup.

Current visual direction:

- Deep navy/black shell
- Centered phone-width app layout on web
- White titles and readable blue-gray body copy
- Electric blue active states
- Dark liquid-glass cards with subtle cyan borders
- Bottom nav with blue active tab treatment
- Hero logo on a dark card without a visible square box
- Tighter, App Store screenshot-friendly screen density

The next visual pass should make individual screens match the mockup more closely:

- Home: premium dashboard with logo hero, stats, daily spark, moon, recent fragments
- Journal: split into Quick Capture and Deep Journal flows
- Deep Journal: accordion sections for Dream World, People & Events, Body & Experience, Reflection, Context
- Insights: Dream DNA card, at-a-glance stats, recurring symbols, trend chart
- Cycles: sleep outlook, moon phase, sleep window, smart wake window
- Lucid: progress card, today's practice, technique rows
- Dictionary: search, symbol categories, featured symbol, recent symbols
- Settings: privacy/security rows, subscription row, information rows

## Recommended Engineering Next Steps

1. Refactor `src/DreamApp.tsx` into modular files while preserving behavior.
2. Create `src/constants/dreamData.ts` for all constants.
3. Create `src/context/AppContext.tsx` for shared state.
4. Create `src/screens/*` files for each tab.
5. Create reusable components:
   - `GlassCard`
   - `SectionTitle`
   - `PrimaryButton`
   - `SecondaryButton`
   - `Chip`
   - `MiniInfoCard`
   - `DreamCard`
   - `PaywallModal`
   - `LockScreen`
6. Port AuraLunis Settings security features.
7. Port the full dictionary data.
8. Add collapsible Journal sections.
9. Add storage migration logic.
10. Add tests or smoke checks for saving/editing dreams and opening every tab.

## Recommended UX Next Steps

1. Make Journal less overwhelming with Quick Capture vs Deep Journal.
2. Add a clear onboarding flow:
   - Welcome to Driftloom
   - Privacy promise
   - Capture your first dream
   - Choose reminder preference
   - Optional lucid practice intro
3. Improve empty states.
4. Add "Daily Spark" or "Dream Seed" that users can type into and save.
5. Make feature cards either clickable or visually non-clickable.
6. Add App Store screenshot-ready states.
7. Review all text contrast on mobile.
8. Make Settings feel production-ready.

## Claude Code Instructions

Use this when handing to Claude Code:

```text
You are working on Driftloom, an Expo React Native TypeScript app by Ocoee Studios.

Project path:
/Users/jamiebradshaw/Documents/Codex/2026-06-07/i-want-to-design-a-app/outputs/driftloom-react-native

Run checks:
npm run typecheck
npm run web -- --port 8082 --localhost

Live app file:
src/DreamApp.tsx

Important: The app has merged AuraLunis source preserved in merged-source/auralunis-main, but that folder is archive/reference material and excluded from TypeScript compilation. Do not import from it directly. Port/adapt useful ideas into Driftloom files.

Keep:
- App name: Driftloom
- Publisher: Ocoee Studios
- Brand: icy blue, navy, silver, liquid glass
- Logo assets in assets/
- Native app-store payments direction
- Privacy-first local storage behavior

Do not:
- Reintroduce AuraLunis branding
- Use Stripe
- Make teal/light-blue text the main readable text
- Put the detailed logo in visible square boxes
- Add hidden AI calls

Current live tabs:
Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings.

Goal:
Continue merging AuraLunis depth into Driftloom while keeping the current app stable. Prefer small, typechecked changes. Run npm run typecheck after edits.
```

## ChatGPT Design/Product Prompt

Use this when asking ChatGPT for UX, branding, onboarding, or product help:

```text
We are designing Driftloom by Ocoee Studios, an Expo React Native mobile app that combines a dream journal, idea journal, symbol dictionary, lucid dreaming practice, sleep/lunar cycles, and private pattern insights.

Driftloom is being built by merging a richer AuraLunis dream app into the Driftloom brand. Keep the Driftloom name, Ocoee Studios publisher identity, approved Driftloom logo, and icy blue/navy/silver palette. Do not make it look like a generic notes app or a mystical-only dream app.

The approved logo is a metallic/glacial letter D with a face silhouette and branching tree/neural idea growth inside it. The logo is beautiful and detailed, so the UI must give it enough contrast and breathing room. Avoid boxing it in. Avoid teal/light-blue text for important labels if readability suffers.

Current tabs:
Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings.

Live features already include:
Daily check-in, dream score, symbol of the day, dream weather, sleep sound palette, cloud rooms, rich dream journaling, dream insights, lunar/sleep cycles, expanded lucid dreaming practice, dictionary, privacy nutrition label, and native-payment paywall language.

Please propose polished mobile UX improvements for Driftloom: onboarding, screen-by-screen hierarchy, Journal quick/deep capture flow, premium/paywall strategy using native in-app purchases, privacy-first App Store positioning, and ways to make the app feel uniquely Driftloom rather than generic.
```

## Best Next Prompt for Claude Code

```text
Please refactor Driftloom from the current single-file src/DreamApp.tsx into a modular React Native structure while preserving all current behavior and visual design.

Use merged-source/auralunis-main only as reference. Do not import it directly.

Target structure:
- src/context/AppContext.tsx
- src/constants/dreamData.ts
- src/components/GlassCard.tsx
- src/components/buttons.tsx
- src/components/DreamCard.tsx
- src/screens/HomeScreen.tsx
- src/screens/JournalScreen.tsx
- src/screens/InsightsScreen.tsx
- src/screens/CyclesScreen.tsx
- src/screens/LucidScreen.tsx
- src/screens/DictionaryScreen.tsx
- src/screens/SettingsScreen.tsx

Keep Driftloom branding, Ocoee Studios, current logo assets, native-payment direction, local AsyncStorage behavior, and all live tab content. Run npm run typecheck after the refactor.
```

## Current Verification Status

Latest known verification:

```bash
npm run typecheck
```

Result: passed after expanding the Lucid tab.

Browser preview:

`http://localhost:8082/`

Lucid tab was verified to show:

- Wake up inside the dream
- Lucid training routine
- How to stay lucid
- MILD
- WBTB
- Reality check details

No browser console errors were observed during the last preview check.
