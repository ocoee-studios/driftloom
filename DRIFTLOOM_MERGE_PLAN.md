# DRIFTLOOM_MERGE_PLAN.md
## Goal: Expand App.js to match docs/DriftLoom-App.html exactly.
## Rules: No new features. No redesigns. No substitutions. Preserve approved mockup.

---

## Current State

| File | Lines | Sections | Rows | Role |
|---|---|---|---|---|
| `App.js` | 612 | 55 | 145 | React Native app (INCOMPLETE) |
| `docs/DriftLoom-App.html` | 749 | 76 | ~300 | Complete preview (SOURCE OF TRUTH) |
| `src/DriftLoom-V4.0.jsx` | 4,308 | — | 681 | AuraLunis content library |

**Gap: 42 sections missing from App.js. Target after merge: ~2000 lines.**

---

## Label Reconciliation

Some sections exist in both files but with different names. These need label alignment, not new content:

| App.js has | HTML has | Action |
|---|---|---|
| `Benefits` | `Benefits (6)` | Rename section title |
| `Common Experiences` | `Common Experiences (4)` | Rename section title |
| `Stages of Development` | `Stages of Development (6)` | Rename section title |
| `Today's Practice` | `Today's Practice` (escaped) | Already present — verify content matches |
| `Sleep Wind-Down` | `Sleep Wind-Down (8 steps)` | Rename section title |
| `Sleep Stages` | `The Architecture of Sleep` | Rename + expand content |
| `Smart Wake` | `Tonight's Sleep Outlook` | Rename + restructure |
| `Symbol Library` | `Expanded Symbol Library` | Rename + expand to 47 symbols |
| `Seen in My Dreams` | `Seen In My Dreams` | Case fix only |
| `Wake Feeling` | (in Journal fields) | Already present |
| `Journal Appearance` | `Theme` + `Ink Color` + `Journal Font` + `Background` | Split into 4 separate sections |
| `Privacy Nutrition` | `Privacy` | Rename |
| `Featured Symbol` | (inside Dictionary) | Already present |
| `My Meaning` | `Personal Symbol History` | Rename + expand |
| `Creative Seeds` | (inside Insights) | Already present |
| `DriftLoom Feature Checklist` | (inside Settings) | Already present |
| `App Store Readiness` | `Legal` + `Reset` | Split into separate sections |

**Effort: ~30 min — rename/restructure only, no new content needed.**

---

## Missing Sections — Detailed Merge Plan

### HOME TAB — 7 sections to add

#### 1. Dream Oracle
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Dream Oracle", "Tap the orb")
- **Destination**: `Home()` function in App.js, before Recent Fragments
- **Content**: Glowing orb (70px circle), "Tap the orb and ask your question", text input, "Ask the Oracle" button, 10 oracle response strings
- **Dependencies**: useState for oracle question + response
- **Effort**: Medium (new interactive component)

#### 2. Dream Weather — Tonight's Forecast
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Sunday dreams", "Monday dreams")
- **Destination**: `Home()` in App.js, after Daily Check-in
- **Content**: 7 Row components, one per day of week, with dream forecast text
- **Dependencies**: None (static content, use `new Date().getDay()` to highlight today)
- **Effort**: Small (7 static rows)

#### 3. Cloud Rooms
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Cloud Rooms", "Calm Mist", "Starlight")
- **Destination**: `Home()` in App.js, after Dream Weather
- **Content**: 6 mood space cards (Calm Mist, Starlight, Deep Ocean, Ember Glow, Moon Garden, Aurora) in 3x2 grid
- **Dependencies**: useState for selected room
- **Effort**: Small (6 static cards in grid)

#### 4. Breathing Exercise
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Breathe with the light")
- **Destination**: `Home()` in App.js, after Cloud Rooms
- **Content**: Circle visual, "Breathe with the light", 4-4-4-4 box breathing description, "Start Breathing" button
- **Dependencies**: Optional: animated breathing circle with setInterval
- **Effort**: Small (static card) or Medium (with animation)

#### 5. Morning Card
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Morning Card", "Good morning, dreamer")
- **Destination**: `Home()` in App.js, after Breathing
- **Content**: Sun icon, "Good morning, dreamer", "What will you dream tonight?"
- **Dependencies**: None
- **Effort**: Tiny (1 static card)

#### 6. Moon Score
- **Source**: `DriftLoom-App.html` → `home()` function
- **Also in**: `V4.0.jsx` (search "Moon Score")
- **Destination**: `Home()` in App.js, after Morning Card
- **Content**: Score number (82), moon emoji, progress bar, "High vividness night" text
- **Dependencies**: useMoonPhase hook for dynamic score
- **Effort**: Small (1 card with bar)

#### 7. DriftLoom Quick Fields (in Journal section of Home)
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Destination**: `Journal()` in App.js — verify exists, may need pill content update
- **Content**: 8 pills (Vividness 8/10, Sleep Quality Good, Wake Feeling Calm, etc.)
- **Dependencies**: None
- **Effort**: Tiny (already partially exists — verify pills match)

---

### JOURNAL TAB — 5 sections to add

#### 8. Dream Genre
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Also in**: `V4.0.jsx` (search "Dream genre", "Thriller", "Romance")
- **Destination**: `Journal()` in App.js, after Mood section
- **Content**: 10 genre pills (Thriller, Romance, Sci-Fi, Fantasy, Comedy, Horror, Mystery, Adventure, Drama, Surreal)
- **Dependencies**: Add `genre` field to dream state object
- **Effort**: Small (pill row + state)

#### 9. Emotional Intensity
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Also in**: `V4.0.jsx` (search "Emotional intensity")
- **Destination**: `Journal()` in App.js, after Dream Genre
- **Content**: Labels (Low/Medium/High/Extreme), progress bar at 65%
- **Dependencies**: Add `intensity` field to dream state, or use slider
- **Effort**: Small (labels + bar)

#### 10. Dream Toggles
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Also in**: `V4.0.jsx` (search "Dream within a dream", "dreamed this before")
- **Destination**: `Journal()` in App.js, after Emotional Intensity
- **Content**: 2 Toggle rows — "Dream within a dream?" and "Have you dreamed this before?"
- **Dependencies**: Add boolean fields to dream state
- **Effort**: Tiny (2 rows with Toggle component)

#### 11. Voice Capture
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Also in**: `V4.0.jsx` (search "Speak your dream aloud", "Voice Capture")
- **Destination**: `Journal()` in App.js, after Dream Toggles
- **Content**: Mic icon, "Speak your dream aloud", record button circle (56px)
- **Dependencies**: None for UI stub; real audio needs expo-av
- **Effort**: Small (UI only) or Large (with actual recording)

#### 12. Capture Attachments
- **Source**: `DriftLoom-App.html` → `journal()` function
- **Also in**: `V4.0.jsx` (search "Capture Attachments", "Voice Note", "Image")
- **Destination**: `Journal()` in App.js, before Deep Journal link
- **Content**: 3 Row components (Voice Note, Image/Sketch, Home Screen Widget)
- **Dependencies**: None (placeholder rows)
- **Effort**: Tiny (3 static rows)

---

### INSIGHTS TAB — 8 sections to add

#### 13. 36 Moods
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "Ecstatic", "Euphoric", "Blissful")
- **Destination**: `Insights()` in App.js, after Creative Seeds
- **Content**: 36 mood pills in flex-wrap grid (Ecstatic through Hollow)
- **Dependencies**: None (display only)
- **Effort**: Small (1 card with 36 pills)

#### 14. Dream Achievements
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "First Dream", "3-Day Streak", "Dream Master")
- **Destination**: `Insights()` in App.js, after 36 Moods
- **Content**: 6 achievement cards in 3x2 grid (icon + name + requirement)
- **Dependencies**: Dream count for unlock logic
- **Effort**: Small (6 static cards, optional unlock logic)

#### 15. Dream Wisdom
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "Sigmund Freud", "Carl Jung", "Edgar Allan Poe")
- **Destination**: `Insights()` in App.js, after Achievements
- **Content**: 3 quote cards with attribution (Freud, Jung, Poe)
- **Dependencies**: None (can use `day % 3` to cycle)
- **Effort**: Tiny (3 styled text cards)

#### 16. Affirmations
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "You are the author", "Affirmations")
- **Destination**: `Insights()` in App.js, after Wisdom
- **Content**: Single affirmation card + "New affirmation every day"
- **Dependencies**: Array of affirmations, use day index
- **Effort**: Tiny (1 card)

#### 17. Dream Zodiac
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "Aries", "Taurus", "dream zodiac")
- **Destination**: `Insights()` in App.js, after Affirmations
- **Content**: 12 zodiac cards (icon + sign + dream type) in 2-column grid
- **Dependencies**: zodiac data array (already in `data.js` as ZODIAC)
- **Effort**: Small (12 cards, data exists)

#### 18. Opt-in AI Reflection
- **Source**: `DriftLoom-App.html` → `insights()` function
- **Also in**: `V4.0.jsx` (search "AI interpretation is off", "consent")
- **Destination**: `Insights()` in App.js, at end
- **Content**: 1 Row — "AI interpretation is off" + privacy note
- **Dependencies**: None
- **Effort**: Tiny (1 row)

#### 19. Personal Symbol History (rename from "My Meaning")
- **Source**: `DriftLoom-App.html` → `dictionary()` function
- **Destination**: Already partially exists as "My Meaning" — expand content
- **Content**: Top symbols with "Most common with calm + curiosity" descriptions + user meaning
- **Dependencies**: Already in App.js — expand descriptions
- **Effort**: Tiny (rename + add descriptions)

#### 20. Expanded Symbol Library (expand from 14 → 47)
- **Source**: `DriftLoom-App.html` → `dictionary()` function (47 symbols with interpretations)
- **Also in**: `V4.0.jsx` (all dream dictionary entries)
- **Destination**: Initial symbol data array in App.js (currently 14 entries)
- **Content**: Add 33 new symbol objects with term, icon, cat, meaning, seen, personal PLUS full dream interpretation paragraph for each
- **Dependencies**: Expand `initialSymbols` array
- **Effort**: Large (33 entries × 5 fields + interpretation paragraph each)

---

### CYCLES TAB — 7 sections to add

#### 21. Tonight's Sleep Outlook (restructure from "Smart Wake")
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Destination**: `Cycles()` in App.js — rename/restructure existing content
- **Content**: "Good" rating + description + percentage
- **Dependencies**: None
- **Effort**: Tiny (rename + restructure)

#### 22. The Architecture of Sleep (expand from "Sleep Stages")
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Also in**: `V4.0.jsx` (search "Architecture of Sleep", "N1", "N2", "N3", "REM")
- **Destination**: `Cycles()` in App.js — replace simple bar with full 6-stage cards
- **Content**: 6 stage cards, each with: color-coded left border, icon, name, subtitle, description paragraph, brain wave tags, duration pills
- **Dependencies**: SLEEP_STAGES data (already in `data.js`)
- **Effort**: Medium (6 detailed cards with styling)

#### 23. Sleep Science
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Also in**: `V4.0.jsx` (search "brain uses MORE energy", "ideal bedtime")
- **Destination**: `Cycles()` in App.js, after Architecture
- **Content**: 8 fact rows (REM energy, bedtime rhythm, room temp, blue light, 90-min cycles, skill rehearsal, glymphatic, REM growth)
- **Dependencies**: None (static rows)
- **Effort**: Small (8 static rows)

#### 24. Chronotype Quiz
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Destination**: `Cycles()` in App.js, after Sleep Science
- **Content**: 4 chronotype cards (Lion/Bear/Wolf/Dolphin) with emoji, name, percentage, description
- **Dependencies**: Optional useState for selected type
- **Effort**: Small (4 cards)

#### 25. Sleep Cycle Calculator
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Also in**: `V4.0.jsx` (search "Sleep cycles are ~90 min", "To wake at")
- **Destination**: `Cycles()` in App.js, after Chronotype
- **Content**: Wake time display, "Fall asleep by" calculation, 4 option pills (9:30 PM/6 cycles, 11:00 PM/5 cycles, etc.)
- **Dependencies**: Optional: time picker input
- **Effort**: Small (1 card with pills)

#### 26. Sleep Score
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Destination**: `Cycles()` in App.js, after Calculator
- **Content**: 3 stats (Overall: Excellent, Stress: Low, Energy: High) + "Based on check-in data"
- **Dependencies**: Check-in data from AppContext
- **Effort**: Tiny (1 stat card)

#### 27. The Moon's Journey (expand from "Lunar Phase Guide")
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Also in**: `V4.0.jsx` (all 8 moon phases with descriptions)
- **Destination**: `Cycles()` in App.js — replace simple 4-row guide with full 8-phase cards
- **Content**: 8 phase cards, each with: moon emoji, name, description, "BEST FOR:" tag with recommendation
- **Dependencies**: MOON_DATA (already in `data.js`)
- **Effort**: Medium (8 detailed cards)

#### 28. Cycle Rings
- **Source**: `DriftLoom-App.html` → `cycles()` function
- **Destination**: `Cycles()` in App.js, after Moon's Journey
- **Content**: 3 rows (Sleep Consistency 82%, Recall Rhythm 72%, Lucid Readiness 64%)
- **Dependencies**: None (static or computed from dream data)
- **Effort**: Tiny (3 rows)

---

### LUCID TAB — 4 sections need content expansion

Note: Lucid was already expanded in this session. Verify these match HTML exactly:

#### 29. Today's Practice — verify 4 interactive checks match
- **Source**: `DriftLoom-App.html` → `lucid()` function
- **Destination**: Already in App.js — verify tap-to-toggle works
- **Effort**: Tiny (verify only)

#### 30. Benefits (6) — verify 6 benefit rows match
- **Source**: `DriftLoom-App.html`
- **Destination**: Already in App.js — verify label says "Benefits (6)"
- **Effort**: Tiny (rename only)

#### 31. Common Experiences (4) — verify 4 expandable sections
- **Source**: `DriftLoom-App.html`
- **Destination**: Already in App.js — verify expandable
- **Effort**: Tiny (verify only)

#### 32. Stages of Development (6) — verify 6 stages with timelines
- **Source**: `DriftLoom-App.html`
- **Destination**: Already in App.js — verify label + content
- **Effort**: Tiny (verify only)

---

### SETTINGS TAB — 6 sections to add/restructure

#### 33. Theme (split from "Journal Appearance")
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Destination**: `Settings()` in App.js — add 3 theme cards (Glacier/Midnight/Aurora)
- **Content**: 3 tappable cards with icon, name, description, active border
- **Dependencies**: theme state + applyTheme() function + CSS variable system
- **Effort**: Large (theme switching requires color system throughout app)

#### 34. Ink Color
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Also in**: `V4.0.jsx` (12 ink colors in themes.js)
- **Destination**: `Settings()` in App.js — add 12 color circles
- **Content**: 12 tappable color circles, selected shows dark border
- **Dependencies**: inkColor state
- **Effort**: Small (12 circles + state)

#### 35. Journal Font
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Also in**: `V4.0.jsx` (6 fonts in themes.js)
- **Destination**: `Settings()` in App.js — add 6 font pills
- **Content**: System, Nunito, Garamond, Georgia, Courier New, Times New Roman
- **Dependencies**: font state
- **Effort**: Tiny (6 pills + state)

#### 36. Background
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Destination**: `Settings()` in App.js — add 5 background pills
- **Content**: Glass, Paper, Stars, Mist, Ocean
- **Dependencies**: bg state
- **Effort**: Tiny (5 pills + state)

#### 37. Legal (restructure from "App Store Readiness")
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Destination**: `Settings()` in App.js — split into Legal section
- **Content**: Privacy Policy, Terms of Use, Support (with email), About v1.0.0
- **Dependencies**: Linking for URLs
- **Effort**: Tiny (4 rows)

#### 38. Purchase (restructure from "Purchase Testing Controls")
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Destination**: `Settings()` in App.js — rename section
- **Content**: Restore Purchases (with loading state)
- **Dependencies**: restorePurchases function
- **Effort**: Tiny (rename + add loading state)

#### 39. Reset
- **Source**: `DriftLoom-App.html` → `settings()` function
- **Destination**: `Settings()` in App.js — add at bottom
- **Content**: "Reset Demo Data" row with confirm dialog
- **Dependencies**: resetData function (already exists in App.js)
- **Effort**: Tiny (1 row + confirm)

---

### DICTIONARY TAB — 2 sections to expand

#### 40. Expanded Symbol Library (14 → 47 symbols)
- **Source**: `DriftLoom-App.html` → `dictionary()` function (47 entries with paragraphs)
- **Also in**: `V4.0.jsx` (full dictionary entries)
- **Destination**: Initial symbol data in App.js
- **Content**: Add 33 new entries. Each needs: term, icon, cat, meaning (short), seen count, personal note, PLUS full dream interpretation paragraph (3-5 sentences)
- **Dependencies**: Expand categories array to include 'Types'
- **Effort**: LARGE (33 entries with full paragraphs — biggest single task)

#### 41. Seen In My Dreams
- **Source**: `DriftLoom-App.html` → `dictionary()` function
- **Destination**: Already partially exists — verify it filters dreams by selected symbol
- **Effort**: Tiny (verify existing implementation)

#### 42. Personal Symbol History
- **Source**: `DriftLoom-App.html` → `dictionary()` function
- **Destination**: Already exists as "My Meaning" — rename + add frequency descriptions
- **Effort**: Small (rename + expand descriptions)

---

## Effort Summary

| Effort | Count | Items |
|---|---|---|
| **Tiny** | 16 | Label renames, verify-only, single rows, static cards |
| **Small** | 14 | Multi-row sections, pill grids, simple interactive |
| **Medium** | 4 | Architecture of Sleep, Moon's Journey, Breathing animation, Dream Oracle |
| **Large** | 2 | 47 symbols with interpretations, Theme system |

**Total estimated expansion: App.js from 612 → ~2000 lines**

---

## Execution Order (recommended)

### Phase 1 — Labels & Renames (30 min)
Rename 17 section titles to match HTML. No content changes.

### Phase 2 — Tiny additions (1 hour)
Items 5, 10, 12, 16, 18, 26, 28, 37, 38, 39 + all verify-only items.

### Phase 3 — Small additions (2 hours)
Items 2, 3, 6, 7, 8, 9, 11, 13, 14, 17, 23, 24, 25, 34, 35, 36, 42.

### Phase 4 — Medium additions (2 hours)
Items 1 (Oracle), 4 (Breathing), 22 (Architecture), 27 (Moon's Journey).

### Phase 5 — Large additions (3 hours)
Item 33 (Theme system), Item 40 (47 symbols with interpretations).

### Phase 6 — Stardust & Polish (1 hour)
Animated star background, theme-aware star colors, final visual QA.

**Total estimated: ~9 hours of Claude Code work**

---

## Claude Code Prompt

```
Read DRIFTLOOM_MERGE_PLAN.md. Execute all 6 phases in order.
For each item, copy content from docs/DriftLoom-App.html 
(the source of truth). Cross-reference src/DriftLoom-V4.0.jsx 
for any content not in the HTML. Do NOT create new features.
Do NOT redesign. Match the HTML preview exactly.
After each phase, run `npx expo start --web` to verify.
```

---

## Files to Reference

| File | Use for |
|---|---|
| `docs/DriftLoom-App.html` | SOURCE OF TRUTH — copy all content from here |
| `src/DriftLoom-V4.0.jsx` | Content library — use for anything not in HTML |
| `docs/DESIGN_SPEC.md` | Visual specs (colors, spacing, typography) |
| `docs/DESIGN_MOCKUP.jpg` | Approved mockup — do not deviate |
| `App.js` | TARGET — expand this file |
