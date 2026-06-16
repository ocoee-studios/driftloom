import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

// Replace with your RevenueCat API keys
const API_KEY = Platform.select({
  ios: 'appl_YOUR_REVENUECAT_IOS_KEY',
  android: 'goog_YOUR_REVENUECAT_ANDROID_KEY',
});

export async function initPurchases() {
  if (!API_KEY || API_KEY.includes('YOUR_')) {
    console.warn('RevenueCat: API key not configured');
    return;
  }
  try {
    await Purchases.configure({ apiKey: API_KEY });
    console.log('RevenueCat initialized');
  } catch (e) {
    console.warn('RevenueCat init error:', e);
  }
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
