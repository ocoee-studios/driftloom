# DriftLoom Apple Submission Action Plan

## Current Status

Estimated completion: 85-90%

The app is close to launch. Remaining work is primarily App Store compliance, legal hosting, subscription setup, screenshots, and final testing.

---

## Required Before Apple Review

### 1. Privacy Policy

Host publicly.

Suggested URL:
- https://driftloom.app/privacy
- or GitHub Pages equivalent

Existing files:
- docs/privacy.html
- legal/privacy-policy.md

---

### 2. Terms of Use

Required because DriftLoom offers subscriptions.

Existing files:
- docs/terms.html
- legal/terms-of-use.md

Host publicly and update app links.

---

### 3. App Privacy (Nutrition Label)

Goal:

Data Not Collected

Maintain local-first storage whenever possible.

If cloud sync is added later, revisit nutrition label requirements.

---

### 4. Subscription Compliance

Verify:

- Restore Purchases button
- Terms of Use link
- Privacy Policy link
- Subscription disclosures
- Manage subscription information

---

### 5. Screenshots

Create screenshots featuring:

1. Today's Direction
2. Pattern DNA
3. Relationship Map
4. Future Self
5. Project DNA

Primary device:
- iPhone 15 Pro Max (6.9")

---

### 6. App Icon

Requirements:

- 1024x1024 PNG
- RGB
- No transparency

Verify final icon before upload.

---

### 7. App Store Listing

Name:
DriftLoom

Subtitle:
Turn creative drift into direction

Category:
Productivity

---

### 8. Age Rating

Target:
4+

---

### 9. Review Notes

DriftLoom is a private notes and reflection app that helps users organize ideas, projects, memories, and personal insights.

Features include:
- Pattern DNA
- Future Self
- Project DNA
- Relationship Map
- Face ID lock
- Local-first storage

---

### 10. RevenueCat

Create entitlement:
- pro

Products:
- driftloom_plus_monthly
- driftloom_plus_yearly
- driftloom_founder_lifetime

Insert production API key into src/purchases.ts.

---

### 11. Final Device Testing

Verify:

- Face ID
- Voice recording
- Camera capture
- Export
- Theme switching
- Restore purchases
- Monthly purchase
- Yearly purchase
- Lifetime purchase
- Empty states
- Delete all data
- iPhone SE layout
- iPhone 15 Pro Max layout

---

## Launch Priority

1. Host legal pages
2. Configure RevenueCat
3. Create App Store products
4. Generate screenshots
5. Run final testing
6. Submit to TestFlight
7. Submit for App Review

© Ocoee Studios