# DriftLoom — Apple App Privacy Nutrition Label

## How to fill this out in App Store Connect

When you submit DriftLoom, go to **App Store Connect → Your App → App Privacy**.
Apple will ask you a series of questions. Here are the exact answers for DriftLoom.

---

## Step 1: "Does your app collect data?"

**Answer: YES**

(Dream text is sent to the AI API for processing. Even though we don't store it, Apple considers this "collection.")

---

## Step 2: For each data type, select what applies

### ❌ Data NOT Collected (select NONE for these):
- Contact Info (name, email, phone, address)
- Health & Fitness
- Financial Info
- Location
- Sensitive Info
- Contacts
- Browsing History
- Search History
- Identifiers (user ID, device ID)
- Diagnostics (crash logs, performance data)
- Photos or Videos
- Audio Data

### ✅ Data Collected:

#### User Content
- **What data?** → "Other User Content" (dream journal text)
- **Is it linked to the user's identity?** → **NO**
  - We don't have user accounts, emails, or logins
  - No way to link dream text to a specific person
- **Is it used for tracking?** → **NO**
  - We don't share data with advertisers or data brokers
- **Purpose:** → Select **"App Functionality"**
  - Dream text is sent to AI API solely to provide dream interpretation
- **Is collection required?** → **NO** (AI features are optional)

#### Purchases
- **What data?** → "Purchase History"
- **Is it linked to the user's identity?** → **NO**
  - Purchases are handled by Apple, not by us
  - We only know if a purchase was made, not who made it
- **Is it used for tracking?** → **NO**
- **Purpose:** → Select **"App Functionality"**

#### Usage Data
- **What data?** → "Product Interaction"
- **Is it linked to the user's identity?** → **NO**
- **Is it used for tracking?** → **NO**
- **Purpose:** → Select **"App Functionality"**
  - We track which features are used locally to personalize the experience (e.g., dream count, streak)
  - This data never leaves the device

---

## Step 3: Summary — What users will see

```
┌─────────────────────────────────────────────┐
│            App Privacy                       │
│                                              │
│  Data Not Linked to You                      │
│  The following data may be collected but      │
│  is not linked to your identity:             │
│                                              │
│  📝 User Content                             │
│  🛒 Purchases                                │
│  📊 Usage Data                               │
│                                              │
│  Data Not Used to Track You                  │
│                                              │
│  Developer: Ocoee Studios                    │
│  Privacy Policy: ocoeestudios.com/privacy    │
└─────────────────────────────────────────────┘
```

This is one of the cleanest privacy labels possible — **no data linked to identity, no tracking.** Users will see this and trust the app immediately.

---

## Third-Party SDK Disclosures

When Apple asks about third-party SDKs, here's what to declare:

### Anthropic Claude API (AI features)
- **Data sent:** Dream journal text (user content)
- **Data stored by third party:** NO (Anthropic does not retain API inputs)
- **Used for tracking:** NO
- **Purpose:** App Functionality
- **Privacy manifests:** Include Anthropic in your SDK declarations

### RevenueCat (when added for IAP)
- **Data sent:** Purchase/subscription status
- **Data stored by third party:** YES (subscription state)
- **Linked to identity:** NO (RevenueCat uses anonymous app user IDs)
- **Used for tracking:** NO
- **Purpose:** App Functionality
- **Note:** RevenueCat provides their own privacy manifest — include it

### Apple StoreKit (built-in)
- Handled by Apple automatically — no additional disclosure needed

### Expo (build framework)
- Expo does not collect user data in production builds
- No disclosure needed for Expo itself

---

## Privacy Manifest File (required for iOS 17+)

Create `PrivacyInfo.xcprivacy` in your Xcode project:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyTrackingDomains</key>
  <array/>
  <key>NSPrivacyCollectedDataTypes</key>
  <array>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeOtherUserContent</string>
      <key>NSPrivacyCollectedDataTypeLinked</key>
      <false/>
      <key>NSPrivacyCollectedDataTypeTracking</key>
      <false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
  </array>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
</dict>
</plist>
```

---

## Checklist before submitting privacy label

- [ ] All data types identified above are declared in App Store Connect
- [ ] "Data Not Linked to You" is selected for all types
- [ ] "Data Not Used to Track You" is confirmed
- [ ] Privacy Policy URL is set: https://driftloom.netlify.app/privacy.html
- [ ] Privacy Choices URL (optional): same as privacy policy
- [ ] PrivacyInfo.xcprivacy file is included in the Xcode project
- [ ] Third-party SDK privacy manifests are included (RevenueCat, Anthropic)
- [ ] NSFaceIDUsageDescription is in Info.plist

---

## Why our label is so clean

Most apps collect 8-12 data types. DriftLoom collects 3, none linked to identity:

| What we DON'T collect | Why |
|---|---|
| Name, email, phone | No accounts needed |
| Location | Not relevant to dreams |
| Device ID | No analytics |
| Browsing history | Not a browser |
| Financial info | Apple handles payments |
| Health data | Not a medical app |
| Photos/videos | Text-only journal |

This is a **competitive advantage**. When users compare DriftLoom to other dream apps, our privacy label will be the cleanest. In a world where people are increasingly privacy-conscious, this matters.
