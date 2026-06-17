# DriftLoom — React Native Conversion Guide for Claude Code

## What Is This?

DriftLoom is a 309KB React web app (single JSX file) dream journal with 100+ features across 7 tabs. This guide tells Claude Code exactly how to convert it to a native iOS/Android app using Expo + React Native.

## Step 1: Set Up the Project

Open your terminal and run:

```bash
# Install Claude Code if you haven't
npm install -g @anthropic-ai/claude-code

# Create the Expo project
npx create-expo-app DriftLoom --template blank
cd DriftLoom

# Install dependencies
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install expo-speech expo-haptics expo-local-authentication
npx expo install react-native-reanimated react-native-gesture-handler
```

## Step 2: Give Claude Code the Source File

Copy `driftloom-polished.jsx` into your project folder, then run:

```bash
claude
```

## Step 3: Paste This Prompt Into Claude Code

```
I have a React web app called DriftLoom (driftloom-polished.jsx, ~310KB single file). 
It's a dream journal with 7 tabs: Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings.

Please convert it to React Native with Expo. Here's the architecture I want:

PROJECT STRUCTURE:
src/
  screens/
    HomeScreen.js          — Dream whisper, greeting, health score, symbol, fact,
                             countdown, spark, oracle, moon phase, watch tracker,
                             sleep conditions, check-in, stats, tarot, AI bedtime,
                             streak rewards, search, dream entries
    JournalScreen.js       — Completeness ring, prompts, title (AI generate),
                             notes (voice), mood, vividness, symbols, 
                             5 collapsible groups (39+ fields), save, share,
                             AI interpreter, delete
    InsightsScreen.js      — 6-mode AI analysis, statistics, pattern detector,
                             zodiac (12 signs grid), mood chart
    CyclesScreen.js        — Phase rings, timeline, wake calculator, sleep architecture,
                             power naps, caffeine half-life, circadian, sleep debt,
                             sleep by age, optimal bedroom, REM rebound, chronotype,
                             alcohol/blue light, memory, natural aids, exercise
    LucidScreen.js         — Reality check toggle, morning ritual, MILD/WILD/WBTB,
                             science, breathing
    DictionaryScreen.js    — 36 entries, 7 categories, search, expandable cards, Q&A
    SettingsScreen.js      — 3 themes, 12 ink colors, 6 fonts, backgrounds,
                             lock/passcode, export, reminders, FAQ, app info
  components/
    GlassCard.js           — Frosted glass card component
    PillScroll.js          — Wrapped pill selector (like symbols grid)
    MoonPhase.js           — Julian Date calculator + moon orb visual
    DreamTarot.js          — 3-card spread with flip animation
    DreamOracle.js         — Crystal ball with fade answers
    SleepConditions.js     — 12-field sleep log
    CompletionRing.js      — Circular progress indicator
    DreamIntelligence.js   — 10 data-driven insights
  hooks/
    useStorage.js          — AsyncStorage wrapper (replaces window.storage)
    useTheme.js            — Theme provider (3 themes)
    useMoonPhase.js        — Moon calculator hook
  constants/
    themes.js              — Theme color variables
    symbols.js             — 270 dream symbols
    dictionary.js          — 36 dream dictionary entries
    moods.js               — Mood list + feelings
  navigation/
    AppNavigator.js        — Bottom tab navigator (7 tabs)

KEY CONVERSIONS:
- window.storage → AsyncStorage
- onClick → onPress
- <div> → <View>, <span>/<p> → <Text>
- CSS-in-JS → StyleSheet.create()
- <input> → <TextInput>
- <textarea> → <TextInput multiline>
- <button> → <TouchableOpacity> or <Pressable>
- CSS gradients → expo-linear-gradient
- CSS animations → react-native-reanimated
- overflow:auto → <ScrollView> or <FlatList>
- fetch to Anthropic API → same (works in RN)
- SpeechRecognition → expo-speech or react-native-voice
- confirm() → Alert.alert()
- Blob/download → expo-file-system + expo-sharing
- Lock screen → expo-local-authentication (Face ID/Touch ID)
- Passcode → custom PIN input screen

DESIGN TOKENS (from the web app):
--bg1: #f8f4ff (light lavender background)
--navy: #EAF6FF (primary text)
--lav: #4FCBFF (accent purple) 
--gold: #d4a44c (secondary accent)
--deep: #4a4a6a (body text)
--muted: #9a9ab0 (caption text)
--line: rgba(79,203,255,0.12) (borders)
--glass: rgba(255,255,255,0.72) (card background)
Fonts: Cormorant Garamond (serif), Nunito (sans)

PERSISTENCE (15 variables saved/loaded):
dreams, dailyMood, dailyRecall, dailySymbol, lucidDone, checks,
checkin, checkinDone, inkColor, journalFont, journalBg,
lockEnabled, passcode, trialStart, purchased

Start by reading driftloom-polished.jsx, then create the project 
structure and convert each screen one at a time. Begin with:
1. Navigation setup
2. Theme provider  
3. Storage hook
4. HomeScreen (it has the most features)
5. Then each remaining screen

Make sure ALL 100+ features are preserved. Don't skip any.
```

## Step 4: Let Claude Code Work

Claude Code will:
1. Read your source file
2. Create the project structure
3. Convert each screen
4. Set up navigation
5. Wire up storage

It may take 15-30 minutes for the full conversion. Let it work through each file.

## Step 5: Test & Deploy

```bash
# Run on iOS simulator
npx expo start --ios

# Run on Android emulator  
npx expo start --android

# Build for App Store
eas build --platform ios

# Build for Play Store
eas build --platform android
```

## Tips for Claude Code

- If it gets confused, say: "Read the HomeScreen section of driftloom-polished.jsx (search for `screen === "home"`) and convert everything between that and `screen === "journal"`"
- For each tab, you can say: "Now convert the [tab name] tab. Find `screen === "[name]"` in the source file."
- If it misses features, say: "You missed the Dream Tarot section. Find `Dream Tarot` in the source and convert it."
- For the AI features, the API calls work the same in React Native — just `fetch()` to `api.anthropic.com`

## Feature Count to Verify

After conversion, verify these counts:
- Home: 29+ interactive elements
- Journal: 39+ dream data fields across 5 groups  
- Insights: 6 AI analysis modes + statistics + zodiac
- Cycles: 15+ sleep science sections
- Lucid: Reality checks + morning ritual + techniques
- Dictionary: 36 entries + 7 categories + 5 Q&A
- Settings: Themes, fonts, colors, export, reminders, FAQ

Total: 100+ features, 51 state variables, 87+ interactive handlers

## Paywall & Server Architecture

### Layer 1 — Client Gate (already built)
The app has a paywall modal with:
- 7-day free trial with countdown banner
- Pioneer Annual: $29.99/yr (save 70%)
- Monthly: $8.99/mo
- All AI features gated behind `hasAccess` check
- `trialStart` timestamp saved to storage

### Layer 2 — App Store Billing (React Native)
```bash
npx expo install expo-in-app-purchases
# or
npx expo install react-native-purchases  # RevenueCat (recommended)
```

RevenueCat setup:
```javascript
import Purchases from 'react-native-purchases';

// Initialize
Purchases.configure({ apiKey: 'YOUR_REVENUECAT_KEY' });

// Check subscription
const info = await Purchases.getCustomerInfo();
const isSubscribed = info.entitlements.active['premium']?.isActive;

// Purchase
const { customerInfo } = await Purchases.purchasePackage(annualPackage);
```

### Layer 3 — Secure AI Backend (Node.js)
Build a simple API server that validates receipts before forwarding to Claude:

```javascript
// server.js (deploy to Vercel, Railway, or Fly.io)
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/dream-ai', async (req, res) => {
  const { receipt, prompt, messages } = req.body;
  
  // Step 1: Validate receipt with Apple/Google
  const isValid = await validateReceipt(receipt);
  if (!isValid) return res.status(403).json({ error: 'Invalid subscription' });
  
  // Step 2: Rate limit (max 10 AI calls per day per user)
  const withinLimit = await checkRateLimit(req.userId);
  if (!withinLimit) return res.status(429).json({ error: 'Daily limit reached' });
  
  // Step 3: Forward to Claude API
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 400,
    messages: messages,
  });
  
  res.json(response);
});

async function validateReceipt(receipt) {
  // Apple: POST to https://buy.itunes.apple.com/verifyReceipt
  // Google: Use google-auth-library to verify with Play Developer API
  // RevenueCat: GET https://api.revenuecat.com/v1/subscribers/{user_id}
}
```

### Pricing Constants
```javascript
const PRICING = {
  MONTHLY: { id: 'monthly_899', price: 8.99 },
  ANNUAL: { id: 'annual_2999', price: 29.99, regularPrice: 49.99 },
  PIONEER: { id: 'pioneer_2999', price: 29.99, label: 'Save 70%' },
  AI_PACK: { id: 'ai_pack_10', price: 4.99, tokens: 10 },
};
```

### Security Checklist
- [ ] API key ONLY on server, never in client
- [ ] Receipt validation on every AI request
- [ ] Rate limiting (10 AI calls/day)
- [ ] Certificate pinning in React Native
- [ ] Jailbreak/root detection
- [ ] Code obfuscation (react-native-obfuscating-transformer)

## Push Notification System

### Setup
```bash
npx expo install expo-notifications expo-device
```

### Notification Schedule
```javascript
import * as Notifications from 'expo-notifications';

// Request permission on first launch
const { status } = await Notifications.requestPermissionsAsync();

// Schedule trial notifications when trial starts
const scheduleTrialNotifications = (trialStartDate) => {
  
  // Day 5 — Gentle nudge
  Notifications.scheduleNotificationAsync({
    content: {
      title: "🌙 Your dream portal closes in 2 days",
      body: "You've been exploring your subconscious. Keep your AI insights alive.",
      data: { screen: 'paywall' },
    },
    trigger: { seconds: 5 * 86400 }, // 5 days
  });

  // Day 7 — Trial ending
  Notifications.scheduleNotificationAsync({
    content: {
      title: "✨ Your free trial ends today",
      body: "Subscribe now to keep your AI dream analysis, bedtime stories, and insights.",
      data: { screen: 'paywall' },
    },
    trigger: { seconds: 7 * 86400 },
  });

  // Day 10 — Post-trial win-back
  Notifications.scheduleNotificationAsync({
    content: {
      title: "🔮 Your dreams are still being captured",
      body: "Reactivate Premium to unlock what they mean. Your patterns are waiting.",
      data: { screen: 'paywall' },
    },
    trigger: { seconds: 10 * 86400 },
  });

  // Day 30 — $0.99 promo win-back
  Notifications.scheduleNotificationAsync({
    content: {
      title: "🌙 We miss you, dreamer",
      body: "Come back for just $0.99/month — see what your dreams have been saying.",
      data: { screen: 'paywall', promo: 'winback_099' },
    },
    trigger: { seconds: 30 * 86400 },
  });
};
```

### Daily Dream Reminder
```javascript
// Schedule daily morning reminder at 7:30 AM
Notifications.scheduleNotificationAsync({
  content: {
    title: "🌅 Did you dream last night?",
    body: "Catch it before it fades. Tap to log your dream.",
    data: { screen: 'journal' },
  },
  trigger: {
    hour: 7, minute: 30,
    repeats: true,
  },
});

// Bedtime wind-down at 10 PM
Notifications.scheduleNotificationAsync({
  content: {
    title: "🌙 Your dream portal opens soon",
    body: "Time to wind down. Set your dream intention for tonight.",
    data: { screen: 'lucid' },
  },
  trigger: {
    hour: 22, minute: 0,
    repeats: true,
  },
});
```

### Handle notification taps (deep linking)
```javascript
Notifications.addNotificationResponseReceivedListener(response => {
  const { screen, promo } = response.notification.request.content.data;
  if (screen === 'paywall') navigation.navigate('Paywall', { promo });
  else if (screen === 'journal') navigation.navigate('Journal');
  else if (screen === 'lucid') navigation.navigate('Lucid');
});
```

## Seasonal Promo System

### Campaign Architecture
```javascript
const PROMOS = {
  halloween_spooky: {
    id: 'halloween_2026',
    title: '🎃 Spooky Dreams',
    subtitle: 'Explore your darkest dreams for just $0.99',
    price: 0.99,
    duration: '1 month',
    startDate: '2026-10-25',
    endDate: '2026-11-01',
    eligible: (user) => !user.isSubscribed && user.trialExpired,
    storeProductId: 'promo_halloween_099',
  },
  equinox_autumn: {
    id: 'equinox_2026',
    title: '🍂 Autumn Equinox',
    subtitle: 'Track your winter dream patterns',
    price: 0.99,
    duration: '1 month',
    startDate: '2026-09-20',
    endDate: '2026-09-27',
    eligible: (user) => !user.isSubscribed,
    storeProductId: 'promo_equinox_099',
  },
  feature_drop: {
    id: 'watch_launch',
    title: '⌚ Watch Companion is here',
    subtitle: 'Try the new Dream Catch from your wrist',
    price: 0.99,
    duration: '1 month',
    trigger: 'on_feature_launch',
    eligible: (user) => !user.isSubscribed,
    storeProductId: 'promo_feature_099',
  },
  winback_30day: {
    id: 'winback_30',
    title: '🌙 We miss you, dreamer',
    subtitle: 'Your dreams are still being captured',
    price: 0.99,
    duration: '1 month',
    trigger: 'days_since_trial_end >= 30',
    eligible: (user) => !user.isSubscribed && user.daysSinceTrialEnd >= 30,
    storeProductId: 'promo_winback_099',
  },
};

// Check active promos on app open
const getActivePromo = (user) => {
  const now = new Date();
  return Object.values(PROMOS).find(p => {
    if (!p.eligible(user)) return false;
    if (p.startDate && (now < new Date(p.startDate) || now > new Date(p.endDate))) return false;
    if (p.trigger === 'on_feature_launch' && !user.hasSeenFeatureDrop) return true;
    if (p.trigger?.includes('days_since_trial_end') && p.eligible(user)) return true;
    if (p.startDate) return true;
    return false;
  });
};
```

### StoreKit Introductory Offer Setup
In App Store Connect:
1. Go to your subscription group
2. Add introductory offer: Free Trial, 7 days
3. Add promotional offer: $0.99, 1 month (for campaigns)
4. Each user gets ONE intro offer per subscription group
5. Promotional offers can be given multiple times with server-signed keys

### Revenue Projections
```
Assumptions:
- 10,000 downloads/month
- 40% start free trial (4,000)
- 15% convert after trial (600 subscribers)
- 70% choose annual ($29.99), 30% monthly ($3.99)

Monthly revenue:
- Annual: 420 × $29.99 / 12 = $1,049/mo
- Monthly: 180 × $3.99 = $898/mo
- Total: ~$1,950/mo before Apple's cut
- After 15% cut: ~$1,657/mo

API costs (600 active users × ~$0.60/mo): ~$360/mo
Net margin: ~$1,297/mo = ~$15,564/year
```

## ⚠️ CRITICAL: Apple App Store Compliance

### Hardcoded Prices = REJECTION
Apple REJECTS apps that display hardcoded prices like `$3.99` or `$29.99`. 
Prices MUST be fetched from StoreKit at runtime because:
- Prices vary by country/region (€4.99, £3.99, ¥600, etc.)
- Apple can change pricing tiers
- Currency formatting must be locale-correct

### StoreKit 2 Implementation (Swift)
```swift
import StoreKit

class SubscriptionManager: ObservableObject {
    @Published var products: [Product] = []
    @Published var purchasedSubscriptions: [Product] = []
    
    let productIds = [
        "com.oceestudios.driftloom.monthly",
        "com.oceestudios.driftloom.annual"
    ]
    
    // Fetch prices from App Store at runtime
    func loadProducts() async {
        do {
            products = try await Product.products(for: productIds)
        } catch {
            print("Failed to load products: \(error)")
        }
    }
    
    // Purchase
    func purchase(_ product: Product) async throws -> Transaction? {
        let result = try await product.purchase()
        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)
            await transaction.finish()
            return transaction
        case .userCancelled, .pending:
            return nil
        @unknown default:
            return nil
        }
    }
    
    // Verify transaction
    func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified: throw StoreError.failedVerification
        case .verified(let safe): return safe
        }
    }
    
    // Listen for transaction updates
    func listenForTransactions() -> Task<Void, Error> {
        return Task.detached {
            for await result in Transaction.updates {
                let transaction = try self.checkVerified(result)
                await transaction.finish()
                await self.updateSubscriptionStatus()
            }
        }
    }
    
    // Check current subscription status
    func updateSubscriptionStatus() async {
        var purchased: [Product] = []
        for await result in Transaction.currentEntitlements {
            if let transaction = try? checkVerified(result),
               transaction.revocationDate == nil {
                if let product = products.first(where: { $0.id == transaction.productID }) {
                    purchased.append(product)
                }
            }
        }
        self.purchasedSubscriptions = purchased
    }
}
```

### React Native with RevenueCat (Recommended)
RevenueCat handles StoreKit/Google Play and gives you runtime prices:

```javascript
import Purchases from 'react-native-purchases';

// Initialize (in App.js)
Purchases.configure({ apiKey: 'YOUR_REVENUECAT_API_KEY' });

// Fetch products with REAL prices from the store
const fetchPricing = async () => {
  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  
  if (current) {
    const monthly = current.monthly;    // Package object
    const annual = current.annual;      // Package object
    
    // These are the REAL localized prices
    return {
      monthly: {
        price: monthly.product.priceString,      // "$3.99" or "€4.99" etc
        priceNum: monthly.product.price,          // 4.99
        currency: monthly.product.currencyCode,   // "USD"
        introPrice: monthly.product.introPrice?.priceString, // "Free" for trial
        introDuration: monthly.product.introPrice?.periodNumberOfUnits, // 7
      },
      annual: {
        price: annual.product.priceString,
        priceNum: annual.product.price,
        currency: annual.product.currencyCode,
        savings: Math.round((1 - annual.product.price / (monthly.product.price * 12)) * 100),
      }
    };
  }
};

// Display in paywall — NEVER hardcode prices
const PaywallScreen = () => {
  const [pricing, setPricing] = useState(null);
  
  useEffect(() => {
    fetchPricing().then(setPricing);
  }, []);
  
  if (!pricing) return <LoadingSpinner />;
  
  return (
    <View>
      <Text>Start Your 7-Day Free Trial</Text>
      <Text>Then {pricing.monthly.price}/month. Cancel anytime.</Text>
      
      <PurchaseButton 
        label={`Annual — Save ${pricing.annual.savings}%`}
        price={pricing.annual.price + "/year"}
      />
      
      <PurchaseButton 
        label="Monthly"
        price={pricing.monthly.price + "/mo"}
      />
    </View>
  );
};

// Purchase flow
const handlePurchase = async (packageToPurchase) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    if (customerInfo.entitlements.active['premium']) {
      // Unlock premium features
      setPurchased(true);
    }
  } catch (e) {
    if (!e.userCancelled) console.error('Purchase error:', e);
  }
};
```

### App Store Connect Setup
1. **Create Subscription Group**: "DriftLoom Premium"
2. **Add Products**:
   - `com.oceestudios.driftloom.monthly` — Auto-Renewable, $3.99/mo
   - `com.oceestudios.driftloom.annual` — Auto-Renewable, $29.99/yr
3. **Add Introductory Offer**:
   - Type: Free Trial
   - Duration: 7 days
   - Eligibility: New subscribers only
4. **Add Promotional Offer** (for $0.99 campaigns):
   - Type: Pay as you go
   - Duration: 1 month
   - Price: $0.99
   - Requires server-signed key for validation

### Google Play Console Setup
1. **Create Subscription**: "driftloom_premium"
2. **Add Base Plans**:
   - Monthly: $3.99/mo with 7-day free trial
   - Annual: $29.99/yr with 7-day free trial
3. **Add Offers**:
   - Free trial: 7 days, auto-converts to base plan
   - Win-back: $0.99 for 1 month (developer-triggered)

### What to Change in the Web App for Native
In the current web prototype, prices are hardcoded for demo purposes.
When converting to React Native, Claude Code should:

1. Replace ALL hardcoded price strings with `pricing.monthly.price` / `pricing.annual.price`
2. Replace "Save 50%" with `pricing.annual.savings + "%"`  
3. Replace "7-Day Free Trial" with the intro offer from StoreKit
4. Remove `setPurchased(true)` on button click → replace with `handlePurchase()`
5. Add `Purchases.getCustomerInfo()` check on app launch
6. Add `Purchases.addCustomerInfoUpdateListener()` for real-time status

### Prompt for Claude Code
```
Read the paywall in driftloom-polished.jsx (search for "Unlock the Portal").
Replace all hardcoded prices with RevenueCat dynamic pricing.
Use Purchases.getOfferings() to fetch real prices.
Display pricing.monthly.price and pricing.annual.price instead of "$3.99" and "$29.99".
Calculate savings dynamically. Handle loading state while prices fetch.
```
