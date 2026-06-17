# DriftLoom — Pixel-Perfect Design Spec
## Reference: docs/DESIGN_MOCKUP.jpg

Match every screen in the mockup board exactly. This is the approved visual target.

---

## Global Design Rules

- **Background**: `#02040A` deep black everywhere
- **Glass cards**: `rgba(14, 43, 92, 0.35)` bg, `1px solid rgba(79, 203, 255, 0.12)` border, `borderRadius: 18`
- **Primary text**: `#EAF6FF` icy white
- **Secondary text**: `#8EAAC5` muted blue
- **Dim text**: `#5A6A7A`
- **Dark text**: `#35516F`
- **Action color**: `#4FCBFF` glacier blue
- **Font**: System font (SF Pro Display on iOS)
- **No shadows** on cards — only subtle border glow
- **Tab bar**: 7 tabs — Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings
- **Tab icons**: 🏠 ✎ ✦ ◑ ◌ ❋ ⚙ (or custom icons matching mockup)
- **Active tab**: `#4FCBFF`, inactive: `#35516F`

---

## Screen 1: HOME
**Subtitle**: "Your inner world, at a glance."

### Layout (top to bottom):
1. **Hero logo** — `assets/brand/driftloom-logo.png`, ~160px wide, centered, no box around it, breathing room
2. **"DRIFTLOOM"** — All caps, `fontSize: 22`, `letterSpacing: 8`, `fontWeight: 800`, centered
3. **Tagline** — "Capture the fragments.\nFind the pattern.\nTurn inner drift into direction." — `fontSize: 14`, `color: #8EAAC5`, centered, `lineHeight: 22`
4. **Greeting card** — Glass card: "Good morning, Jamie ✨" (`fontSize: 18, fontWeight: 700`), sub: "You're recalling 28% more dreams this week. Keep going." (`fontSize: 13, color: #8EAAC5`)
5. **Stats row** — 3 equal glass cards side by side:
   - "Dreams" / "128" (large bold)
   - "Day Streak" / "12 🔥"
   - "Recall" / "72%" / "📈"
6. **Daily Spark** — Glass card with: title "Daily Spark" (bold), body "What symbol or theme keeps returning in your dreams?", **+** button (circle, `rgba(79,203,255,0.12)` bg, cyan border, `+` icon)
7. **Current Moon** — Glass card: "Current Moon" label, "Waxing Gibbous" (bold), "Illumination: 72%", moon emoji/image on right
8. **Recent Fragments** — Section header with "See All" link, then list of fragment cards (icon + text + timestamp)

---

## Screen 2: JOURNAL — Quick Capture
**Subtitle**: "Capture fast. Go deeper later."

### Layout:
1. **Header** — "Quick Capture" centered, sub: "Log your dream in seconds."
2. **Dream Title** — Label + input field, placeholder: "The floating city"
3. **What do you remember?** — Label + large textarea, placeholder text, char counter "124/2000" bottom-right
4. **Mood When Woke** — Label + 5 emoji chips in a row: Happy 😊, Calm 😌, Anxious 😰, Confused 😕, Sad 😢. Selected state: cyan border + bg tint
5. **Lucid? 💎** — Toggle switch (cyan when on) aligned right
6. **Symbols** — Label "Symbols (comma separated)" + input, placeholder: "Clouds, City, Crystal, Doorway"
7. **Deep Journal →** — Centered cyan link text
8. **Save Dream** — Full-width cyan button with checkmark: "✓ Save Dream"
9. **Footer note** — "You can always edit and add more details later." dim text centered

---

## Screen 3: JOURNAL — Deep Journal (NEW SCREEN)
**Subtitle**: "Go deeper when you're ready."

### Layout:
1. **Header** — "Deep Journal" centered, sub: "Tell the full story."
2. **Dream Completeness** — Progress bar with percentage: "78%" — cyan fill bar
3. **Accordion sections** (each is a collapsible card with chevron ▼):
   - **Dream World** — "Location, weather, lighting, texture"
   - **People & Events** — "Characters, dialogue, mission"
   - **Body & Experience** — "Movement, sensations, powers"
   - **Reflection** — "Meaning, connections, notes"
   - **Context** — "Pre-sleep thoughts, déjà vu, etc."
4. **Two buttons** — "Save Draft" (outline) + "Save Dream" (filled cyan)

---

## Screen 4: INSIGHTS
**Subtitle**: "See the patterns you might miss."

### Layout:
1. **Header** — "Insights" centered, info icon (ⓘ) top-right
2. **Dream DNA** — Large glass card: "Dream DNA" title, "Your subconscious blueprint." sub, DNA helix visual (🧬 or actual graphic)
3. **At a Glance** — Label + 3 stat cards: Dreams 128, Avg. Vividness 7.4/10, Lucid Dreams 18%
4. **Top Recurring Symbols** — Label + "See All" link, list rows: icon + name + "X times" (Water 12, Doorway 9, Flight 7)
5. **Emotional Trend (14 Days)** — Line chart with dots, legend: Positive (cyan), Neutral (silver), Challenging (red)

---

## Screen 5: CYCLES
**Subtitle**: "Align with your natural rhythms."

### Layout:
1. **Moon Phase** — Glass card: label, "Waxing Gibbous" bold, "Illumination: 72%", moon image right
2. **Tonight's Sleep Outlook** — Glass card: "Good" bold, description, cloud/moon icon
3. **Sleep Window** — Glass card: "10:45 PM – 7:15 AM" large bold, "Aim for 8h 30m", bed icon
4. **Sleep Stages (Typical)** — Glass card: colored bar (Deep navy, REM cyan, Light silver, Awake dark), dot legend below with times: 1h 45m, 2h 10m, 4h 20m, 0h 20m
5. **Smart Wake Window** — Glass card: "6:45 AM – 7:15 AM" large bold, "Wake in a light sleep phase.", alarm icon

---

## Screen 6: LUCID
**Subtitle**: "Train your awareness. Explore your potential."

### Layout:
1. **Your Progress** — Large glass card: "Explorer" (`fontSize: 24, fontWeight: 800`), "Level 2", XP progress bar "420 / 1,000 XP", brain visual right, chevron "›"
2. **Today's Practice** — Glass card: eye icon, "Reality Check" bold, "Perform 3 reality checks throughout the day.", "0 / 3"
3. **Techniques** — Section label, list rows with icons + titles + subs + chevrons:
   - 🧠 MILD — Mnemonic Induction of Lucid Dreams ›
   - ⏰ WBTB — Wake Back To Bed ›
   - 👁 WILD — Wake Initiated Lucid Dream ›
   - 🎯 SSILD — Senses Initiated Lucid Dream ›

---

## Screen 7: DICTIONARY
**Subtitle**: "Explore symbols. Discover personal meaning."

### Layout:
1. **Search** — "Search symbols..." with 🔍 icon
2. **Category pills** — All, Nature, People, Places, Objects (scrollable)
3. **Featured Symbol** — Large glass card: "Featured Symbol" label, "Water" bold, meaning text, "View Symbol" cyan button, water visual right
4. **Recent Symbols** — List rows: icon + name + "Seen X times" (Ocean 5, Doorway 9, Tree 4, Flight 7)

---

## Screen 8: SETTINGS
**Subtitle**: "Your privacy. Your choice."

### Layout:
1. **Profile card** — Glass card: D logo avatar (48px round), "Jamie", "Dreamer since Jun 2024"
2. **Privacy & Security** — Section label, grouped card with rows:
   - 🔒 Passcode & Face ID — On (toggle or value)
   - ⏰ Auto-Lock — After 5 minutes ›
   - 📤 Export Journal ›
   - 🗑 Delete All Data ›
3. **Subscription** — Accent card: 👑 "Driftloom Plus", "Manage Subscription" cyan link ›
4. **Information** — Grouped card:
   - 📄 Privacy Policy ›
   - 📋 Terms of Use ›
   - 💬 Support ›
   - 🌀 About Driftloom — v1.0.0 ›

---

## Bottom Feature Cards (marketing)

### Quick Capture Widget
"Capture anytime from your home screen." — Shows widget mockup with D logo, "What did you dream?", Voice/Photo/Notes/Text buttons

### Dream Seed (Daily Spark)
"A daily prompt to spark reflection and insight." — "Today's Seed" card, "What place in your dream felt like home?", "Write Your Answer" button

### Premium Experience
"Unlock deeper insights, patterns, and tools." — DriftLoom Plus with feature list:
- Advanced Pattern Insights
- Symbol Evolution
- Timeline & Calendar
- Creative Seeds
- Custom Themes
- Security Lock
- Export & Backup
- Future AI Reflections
- "Try 7 Days Free" button

### Built for Privacy
"Your thoughts stay yours." — Shield icon, bullet points:
- Stored locally on your device
- No ads. No tracking.
- You're in control.
- Export or delete anytime.

---

## NEW: Deep Journal Screen Needed

Create `src/screens/DeepJournalScreen.js` with:
- Dream Completeness progress bar
- 5 collapsible accordion sections
- Save Draft + Save Dream buttons
- Wire from Journal screen "Deep Journal →" link

## Claude Code Prompt

Open Claude Code in the driftloom folder and paste:

> Read docs/DESIGN_SPEC.md and docs/DESIGN_MOCKUP.jpg. Rebuild every screen in src/screens/ to match the mockup board pixel-for-pixel. Create the missing DeepJournalScreen.js. Use the exact glass card style, colors, typography, and layout from the spec. Make sure all 7 tabs work and the app starts with `npx expo start --web`.
