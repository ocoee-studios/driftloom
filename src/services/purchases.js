import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

const ENTITLEMENT = 'premium';

// RevenueCat public SDK key — injected via EAS secret / env, NEVER hardcoded.
// Fails closed: if the key is absent (e.g. Expo Go or unconfigured build),
// configure() is skipped and every access/purchase/restore returns false.
const API_KEY = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
});

let configured = false;

export async function initPurchases() {
  if (!API_KEY) {
    console.warn('RevenueCat: API key not configured (set EXPO_PUBLIC_REVENUECAT_IOS_KEY)');
    return;
  }
  try {
    Purchases.configure({ apiKey: API_KEY });
    configured = true;
  } catch (e) {
    console.warn('RevenueCat init error:', e);
  }
}

export async function checkAccess() {
  if (!configured) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return info.entitlements.active[ENTITLEMENT] !== undefined;
  } catch {
    return false;
  }
}

export async function getOfferings() {
  if (!configured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch {
    return null;
  }
}

export async function purchasePackage(pkg) {
  if (!configured || !pkg) return false;
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo.entitlements.active[ENTITLEMENT] !== undefined;
  } catch (e) {
    if (!e.userCancelled) console.warn('Purchase error:', e);
    return false;
  }
}

export async function restorePurchases() {
  if (!configured) return false;
  try {
    const info = await Purchases.restorePurchases();
    return info.entitlements.active[ENTITLEMENT] !== undefined;
  } catch {
    return false;
  }
}
