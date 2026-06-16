# DriftLoom — RevenueCat Setup Guide

## Overview
RevenueCat handles all in-app purchases so you never touch Apple receipts, Google billing, or subscription logic. One SDK, both platforms, free up to $2,500/mo in revenue.

---

## Step 1: Create Accounts (15 min)

### Apple Developer Account
1. Go to https://developer.apple.com/account
2. Enroll ($99/year)
3. Wait for approval (usually same day)

### RevenueCat Account
1. Go to https://app.revenuecat.com/signup
2. Create account (free tier = $2,500/mo revenue)
3. Create a new Project called "DriftLoom"

---

## Step 2: App Store Connect — Create Products (20 min)

### In App Store Connect (https://appstoreconnect.apple.com):

1. **Apps** → **DriftLoom** → **Monetization** → **Subscriptions**
2. Create a **Subscription Group** called "DriftLoom Premium"
3. Add 2 subscriptions:

| Product ID | Reference Name | Duration | Price |
|---|---|---|---|
| `com.ocoeestudios.driftloom.monthly` | Monthly Premium | 1 Month | $4.99 |
| `com.ocoeestudios.driftloom.annual` | Annual Premium | 1 Year | $29.99 |

4. For the **Annual** plan:
   - Enable "Offer Free Trial" → 7 days
   - This is the trial users see in the paywall

5. Go to **Monetization** → **In-App Purchases**
6. Add a **Non-Consumable** purchase:

| Product ID | Reference Name | Price |
|---|---|---|
| `com.ocoeestudios.driftloom.lifetime` | Lifetime Premium | $49.99 |

7. For each product, add:
   - Display Name: "DriftLoom Premium"
   - Description: "Unlock AI dream analysis, bedtime stories, and all premium features"
   - Screenshot: (take one of the paywall screen)

---

## Step 3: RevenueCat Dashboard (15 min)

### Connect App Store:
1. In RevenueCat → **Project Settings** → **Apps** → **Add New App**
2. Select **App Store**
3. Enter your **App Store Connect Shared Secret**:
   - App Store Connect → DriftLoom → General → App Specific Shared Secret → Generate
4. Enter your **Bundle ID**: `com.ocoeestudios.driftloom`

### Create Products in RevenueCat:
1. Go to **Products** → **Add Product**
2. Add all 3 with App Store Product IDs:
   - `com.ocoeestudios.driftloom.monthly`
   - `com.ocoeestudios.driftloom.annual`
   - `com.ocoeestudios.driftloom.lifetime`

### Create Entitlement:
1. Go to **Entitlements** → **Add New**
2. Name: `premium`
3. Attach all 3 products to this entitlement

### Create Offering:
1. Go to **Offerings** → **Current** (default offering)
2. Add 3 packages:
   - **Monthly**: $monthly → `com.ocoeestudios.driftloom.monthly`
   - **Annual**: $annual → `com.ocoeestudios.driftloom.annual`
   - **Lifetime**: $lifetime → `com.ocoeestudios.driftloom.lifetime`

### Get Your API Key:
1. Go to **Project Settings** → **API Keys**
2. Copy the **Apple API Key** (starts with `appl_`)
3. Save it — you'll need this in the code

---

## Step 4: Install in DriftLoom (10 min)

```bash
cd driftloom
npx expo install react-native-purchases
npx expo install react-native-purchases-ui  # optional: pre-built paywall UI
```

Add to `app.json`:
```json
{
  "expo": {
    "plugins": [
      "expo-font",
      "expo-local-authentication",
      "react-native-purchases"
    ]
  }
}
```

---

## Step 5: Code Integration

### Create `src/services/purchases.js`:

```javascript
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

const API_KEY = Platform.select({
  ios: 'appl_YOUR_REVENUECAT_IOS_KEY',
  android: 'goog_YOUR_REVENUECAT_ANDROID_KEY',
});

export async function initPurchases() {
  if (!API_KEY) return;
  await Purchases.configure({ apiKey: API_KEY });
}

export async function checkAccess() {
  try {
    const info = await Purchases.getCustomerInfo();
    return info.entitlements.active['premium'] !== undefined;
  } catch {
    return false;
  }
}

export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch {
    return null;
  }
}

export async function purchasePackage(pkg) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo.entitlements.active['premium'] !== undefined;
  } catch (e) {
    if (!e.userCancelled) console.warn('Purchase error:', e);
    return false;
  }
}

export async function restorePurchases() {
  try {
    const info = await Purchases.restorePurchases();
    return info.entitlements.active['premium'] !== undefined;
  } catch {
    return false;
  }
}
```

### Update `App.js` — Initialize on startup:

```javascript
import { initPurchases } from './src/services/purchases';

useEffect(() => {
  initPurchases();
}, []);
```

### Update `PaywallModal.js` — Use real purchases:

```javascript
import { getOfferings, purchasePackage, restorePurchases } from '../services/purchases';

// In component:
const [offerings, setOfferings] = useState(null);

useEffect(() => {
  getOfferings().then(setOfferings);
}, []);

// Replace hardcoded prices with dynamic:
const monthly = offerings?.availablePackages.find(p => p.packageType === 'MONTHLY');
const annual = offerings?.availablePackages.find(p => p.packageType === 'ANNUAL');
const lifetime = offerings?.availablePackages.find(p => p.packageType === 'LIFETIME');

// Display price from store (handles currency/locale):
// monthly.product.priceString → "$4.99"
// annual.product.priceString → "$29.99"

// Buy:
const handleBuy = async (pkg) => {
  const success = await purchasePackage(pkg);
  if (success) { setPurchased(true); setShowPaywall(false); }
};

// Restore:
const handleRestore = async () => {
  const success = await restorePurchases();
  if (success) { setPurchased(true); setShowPaywall(false); }
  else Alert.alert('No purchases found');
};
```

### Update `AppContext.js` — Check access on startup:

```javascript
import { checkAccess } from '../services/purchases';

// In the load effect:
useEffect(() => {
  checkAccess().then(has => { if (has) setPurchased(true); });
}, []);
```

---

## Step 6: Add Restore Purchases Button (Required by Apple!)

Apple **requires** a "Restore Purchases" button. Add to PaywallModal and Settings:

```javascript
<TouchableOpacity onPress={handleRestore}>
  <Text>Restore Purchases</Text>
</TouchableOpacity>
```

---

## Step 7: Testing

### Sandbox Testing (free, no real charges):
1. App Store Connect → **Users & Access** → **Sandbox Testers**
2. Create a test account (use a fake email)
3. On your test device: Settings → App Store → sign in with sandbox account
4. All purchases will be free in sandbox mode
5. Subscriptions renew every few minutes (not monthly)

### RevenueCat Dashboard:
- See real-time purchase events
- Monitor trial conversions
- Track MRR (monthly recurring revenue)
- View subscriber lifecycle

---

## Step 8: Before Submission Checklist

- [ ] All 3 products created in App Store Connect
- [ ] Products synced in RevenueCat dashboard
- [ ] `premium` entitlement created and linked
- [ ] API key added to code
- [ ] Paywall shows real prices from store
- [ ] "Restore Purchases" button works
- [ ] Sandbox testing passed (buy, restore, cancel)
- [ ] Free trial starts and expires correctly
- [ ] Lifetime purchase grants permanent access
- [ ] Apple payment terms text on paywall
- [ ] Terms of Use and Privacy Policy links work
- [ ] Remove "Reset Purchase" testing button
- [ ] Remove "Preview Paywall" testing button

---

## Revenue Projections

| Metric | Conservative | Moderate | Optimistic |
|---|---|---|---|
| Monthly downloads | 5,000 | 10,000 | 25,000 |
| Trial starts (40%) | 2,000 | 4,000 | 10,000 |
| Conversions (15%) | 300 | 600 | 1,500 |
| Monthly revenue | ~$830 | ~$1,660 | ~$4,150 |
| Annual revenue | ~$10K | ~$20K | ~$50K |
| RevenueCat fee | Free | Free | Free (<$2.5K/mo) |

*After Apple's 15% small business rate (first $1M/year)*

---

## Why RevenueCat?

| Feature | DIY StoreKit | RevenueCat |
|---|---|---|
| Receipt validation | You build server | Automatic |
| Cross-platform | Separate code | One SDK |
| Analytics | Build yourself | Built-in dashboard |
| Subscription status | Complex logic | One API call |
| Grace periods | Manual | Automatic |
| Price testing | Not possible | A/B testing built-in |
| Cost | Free + server costs | Free up to $2,500/mo |
