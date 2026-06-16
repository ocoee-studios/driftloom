# Driftloom — Apple App Store Submission Checklist

## 1. StoreKit / In-App Purchases ✅

### Done in code
- [x] Restore purchases button (paywall + Settings)
- [x] Auto-renewal terms displayed before purchase buttons
- [x] Prices pulled from StoreKit via RevenueCat (not hardcoded)
- [x] Terms of Use link on paywall and Settings footer
- [x] Privacy Policy link on paywall and Settings footer
- [x] Manage Subscription opens Apple account settings
- [x] EULA includes Apple third-party beneficiary clause
- [x] No external payment links
- [x] Free tier clearly described with visible limits

### Setup needed
- [ ] App Store Connect: subscription group "Driftloom Plus"
- [ ] Product: `driftloom_plus_monthly` ($3.99/mo)
- [ ] Product: `driftloom_plus_yearly` ($29.99/yr)
- [ ] Product: `driftloom_founder_lifetime` ($39.99 non-consumable)
- [ ] Subscription localizations (name + description per product)
- [ ] RevenueCat: project, `pro` entitlement, default offering, API key
- [ ] Test all 3 sandbox purchases before submitting

## 2. Permissions (Guideline 5.1.1) ✅

### Done in app.json
- [x] `NSMicrophoneUsageDescription` — "Driftloom uses the microphone to capture voice memo fragments."
- [x] `NSCameraUsageDescription` — "Driftloom uses the camera to capture visual fragments and screenshots."
- [x] `NSPhotoLibraryUsageDescription` — "Driftloom accesses your photo library to attach images to fragments."

### Rule: Every permission string must explain WHY the app needs it, not just what it accesses. Generic strings like "We need camera access" get rejected.

## 3. Encryption (ITAR) ✅

### Done in app.json
- [x] `ITSAppUsesNonExemptEncryption: false`
- Driftloom does not use custom encryption. Standard HTTPS (if ever used) is exempt.

## 4. Privacy (Guideline 5.1) ✅

### App Store Privacy Labels
Select **"Data Not Collected"** in App Store Connect.

Driftloom currently:
- Stores all data locally on device
- Has no analytics SDKs
- Has no ad networks
- Has no server-side data collection
- Does not track users

### Legal docs (in /legal/)
- [x] privacy-policy.md
- [x] terms-of-use.md
- [ ] Host both at URLs and enter in App Store Connect metadata

## 5. Design (Guideline 4.0) ✅

### Done
- [x] Dark mode native (not just a dark background — uses system status bar)
- [x] SafeAreaView for notch/dynamic island
- [x] No placeholder text or "lorem ipsum" in the UI
- [x] All screens have real content and empty states
- [x] Tab bar follows iOS conventions
- [x] Consistent visual language across all tabs
- [x] VoiceOver accessibility labels on key interactions

### Verify before submission
- [ ] Test on iPhone SE (small screen) — make sure nothing clips
- [ ] Test on iPhone 15 Pro Max (large screen) — make sure nothing floats
- [ ] Test with Dynamic Type set to largest — text should not overlap
- [ ] Test with VoiceOver on — all tabs navigable, buttons labeled
- [ ] No truncated text on any screen

## 6. Performance (Guideline 2.1) ✅

### Done
- [x] App works fully offline
- [x] AsyncStorage persistence (no data loss on relaunch)
- [x] No network dependency for core features
- [x] No crashes on empty state (0 fragments, 0 projects)
- [x] Loading state while data hydrates

### Verify
- [ ] Cold start time under 3 seconds
- [ ] No crashes during 30-minute review session
- [ ] Memory usage stays reasonable (check Xcode Instruments)
- [ ] No console errors or warnings in release build

## 7. Metadata (Guideline 2.3)

### Screenshots needed
- [ ] 6.7" (iPhone 15 Pro Max) — minimum 3, recommended 6-10
- [ ] 6.5" (iPhone 14 Plus) — required
- [ ] 5.5" (iPhone 8 Plus) — required for older device support

### Screenshot content (must match actual app)
1. Home tab with streak and insights
2. Capture tab with type selection
3. Loom tab with fragments and patterns
4. Synthesis/incubator card
5. Projects tab with pinned project
6. Vault tab with favorites

### App Store text
- [ ] App name: Driftloom
- [ ] Subtitle: Turn creative drift into direction
- [ ] Category: Productivity
- [ ] Keywords: idea capture, note taking, creative tool, thought organizer, project planner, pattern finder, brainstorm, fragment capture
- [ ] Description (see README.md draft)
- [ ] Promotional text (can change without review)
- [ ] What's New text for v1.2
- [ ] Support URL: ocoeestudios.com/driftloom/support
- [ ] Marketing URL: ocoeestudios.com/driftloom

## 8. Build & Submit

### Steps
1. `npm install`
2. `npx expo prebuild --platform ios`
3. `eas build --platform ios --profile production`
4. `eas submit --platform ios --profile production`
5. Or: open in Xcode → Product → Archive → Distribute

### Before submitting
- [ ] Increment version and buildNumber in app.json
- [ ] RevenueCat API key is real (not placeholder)
- [ ] Legal URLs are live and accessible
- [ ] All screenshots are from the actual production build
- [ ] Test sandbox purchases on a real device
- [ ] Review notes: explain the demo mode if reviewer can't purchase

### App Review notes (paste in App Store Connect)
```
Subscription testing:
- Use sandbox account to test purchases
- Free tier limits: 50 fragments, 3 projects
- Paywall appears when limits are reached or via Settings > Upgrade to Plus
- Restore purchases button is on the paywall screen and in Settings

Login:
- No login required. All data is stored locally on device.
```

## Common Rejection Reasons

| # | Reason | Status |
|---|--------|--------|
| 1 | Missing restore button | ✅ On paywall + Settings |
| 2 | Hardcoded prices | ✅ From RevenueCat |
| 3 | Missing subscription terms | ✅ Before purchase button |
| 4 | No Terms/Privacy links | ✅ Paywall + Settings |
| 5 | Broken purchases in review | Test sandbox first |
| 6 | Missing permission strings | ✅ All 3 declared with reasons |
| 7 | Encryption not declared | ✅ ITSAppUsesNonExemptEncryption: false |
| 8 | Privacy label wrong | ✅ "Data Not Collected" is accurate |
| 9 | Placeholder content | ✅ All real content |
| 10 | Crashes on empty state | ✅ Empty states handled |
| 11 | No accessibility | ✅ VoiceOver labels added |
| 12 | iPad broken | ✅ supportsTablet: false (iPhone only) |
| 13 | Screenshots don't match | Take from production build |
| 14 | Missing subscription management | ✅ Links to Apple Settings |

© 2026 Ocoee Studios
