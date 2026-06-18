// RevenueCat stub — replace with real implementation for production builds
// react-native-purchases requires a native (EAS) build, not Expo Go

export async function initPurchases() {
  console.log('RevenueCat: stub mode (Expo Go)');
}

export async function checkAccess() {
  return false;
}

export async function getOfferings() {
  return null;
}

export async function purchasePackage(pkg) {
  return false;
}

export async function restorePurchases() {
  return false;
}
