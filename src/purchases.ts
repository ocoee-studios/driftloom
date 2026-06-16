/**
 * Driftloom — RevenueCat Entitlement System
 * Ocoee Studios
 *
 * App Store Connect setup required:
 *   1. Create products in App Store Connect → In-App Purchases:
 *      - driftloom_plus_monthly    ($3.99/mo auto-renewable subscription)
 *      - driftloom_plus_yearly     ($29.99/yr auto-renewable subscription)
 *      - driftloom_founder_lifetime ($39.99 non-consumable)
 *
 *   2. Create subscription group "Driftloom Plus" with monthly + yearly
 *
 *   3. In RevenueCat dashboard (app.revenuecat.com):
 *      - Create project "Driftloom"
 *      - Add Apple App Store app with shared secret
 *      - Create entitlement: "pro"
 *      - Create offerings:
 *        - "default" offering with:
 *          - Package "monthly" → driftloom_plus_monthly
 *          - Package "annual"  → driftloom_plus_yearly
 *          - Package "lifetime" → driftloom_founder_lifetime
 *      - Attach all 3 products to the "pro" entitlement
 *
 *   4. Copy your RevenueCat API key below
 */

import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  type PurchasesOffering,
  type PurchasesPackage,
  LOG_LEVEL,
} from "react-native-purchases";

/* ─── Config ─── */
const RC_API_KEY_IOS = "appl_YOUR_REVENUECAT_API_KEY_HERE";
const RC_API_KEY_ANDROID = "goog_YOUR_REVENUECAT_API_KEY_HERE";
const ENTITLEMENT_ID = "pro";

export type DriftloomPlan = "free" | "plus" | "founder";
export type BillingPeriod = "monthly" | "yearly" | "lifetime";

export type PurchaseState = {
  plan: DriftloomPlan;
  isPro: boolean;
  isLoading: boolean;
  offering: PurchasesOffering | null;
  monthlyPackage: PurchasesPackage | null;
  yearlyPackage: PurchasesPackage | null;
  lifetimePackage: PurchasesPackage | null;
  monthlyPrice: string;
  yearlyPrice: string;
  lifetimePrice: string;
  purchase: (pkg: PurchasesPackage) => Promise<boolean>;
  restore: () => Promise<boolean>;
};

/* ─── Initialize RevenueCat ─── */
let initialized = false;

async function initPurchases() {
  if (initialized) return;
  try {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    const apiKey = Platform.OS === "ios" ? RC_API_KEY_IOS : RC_API_KEY_ANDROID;

    // Skip init if using placeholder key (demo mode)
    if (apiKey.includes("YOUR_REVENUECAT")) {
      console.log("[Driftloom] RevenueCat: using demo mode (no API key configured)");
      return;
    }

    await Purchases.configure({ apiKey });
    initialized = true;
    console.log("[Driftloom] RevenueCat initialized");
  } catch (e) {
    console.warn("[Driftloom] RevenueCat init failed:", e);
  }
}

/* ─── Determine plan from customer info ─── */
function planFromCustomerInfo(info: CustomerInfo): DriftloomPlan {
  const entitlement = info.entitlements.active[ENTITLEMENT_ID];
  if (!entitlement) return "free";

  // Check if it's the lifetime (non-consumable) product
  if (entitlement.productIdentifier === "driftloom_founder_lifetime") {
    return "founder";
  }
  return "plus";
}

/* ─── Hook ─── */
export function usePremium(): PurchaseState {
  const [plan, setPlan] = useState<DriftloomPlan>("free");
  const [isLoading, setIsLoading] = useState(true);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);

  // Initialize and load offerings
  useEffect(() => {
    (async () => {
      await initPurchases();

      if (!initialized) {
        // Demo mode — no API key
        setIsLoading(false);
        return;
      }

      try {
        // Check current entitlements
        const info = await Purchases.getCustomerInfo();
        setPlan(planFromCustomerInfo(info));

        // Load offerings
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setOffering(offerings.current);
        }
      } catch (e) {
        console.warn("[Driftloom] Failed to load purchases:", e);
      }

      setIsLoading(false);
    })();
  }, []);

  // Listen for purchase changes
  useEffect(() => {
    if (!initialized) return;

    const listener = Purchases.addCustomerInfoUpdateListener((info) => {
      setPlan(planFromCustomerInfo(info));
    });

    return () => {
      // Listener cleanup handled by SDK
    };
  }, []);

  // Purchase a package
  const purchase = useCallback(async (pkg: PurchasesPackage): Promise<boolean> => {
    if (!initialized) {
      // Demo mode — simulate success
      if (pkg.identifier === "$rc_lifetime" || pkg.product.identifier === "driftloom_founder_lifetime") {
        setPlan("founder");
      } else {
        setPlan("plus");
      }
      return true;
    }

    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      const newPlan = planFromCustomerInfo(customerInfo);
      setPlan(newPlan);
      return newPlan !== "free";
    } catch (e: any) {
      if (e.userCancelled) return false;
      console.warn("[Driftloom] Purchase failed:", e);
      return false;
    }
  }, []);

  // Restore purchases
  const restore = useCallback(async (): Promise<boolean> => {
    if (!initialized) {
      console.log("[Driftloom] Demo mode: restore simulated");
      return false;
    }

    try {
      const info = await Purchases.restorePurchases();
      const restored = planFromCustomerInfo(info);
      setPlan(restored);
      return restored !== "free";
    } catch (e) {
      console.warn("[Driftloom] Restore failed:", e);
      return false;
    }
  }, []);

  // Extract packages from offering
  const monthlyPackage = offering?.monthly ?? null;
  const yearlyPackage = offering?.annual ?? null;
  const lifetimePackage = offering?.lifetime ?? null;

  return {
    plan,
    isPro: plan !== "free",
    isLoading,
    offering,
    monthlyPackage,
    yearlyPackage,
    lifetimePackage,
    monthlyPrice: monthlyPackage?.product.priceString ?? "$3.99",
    yearlyPrice: yearlyPackage?.product.priceString ?? "$29.99",
    lifetimePrice: lifetimePackage?.product.priceString ?? "$39.99",
    purchase,
    restore,
  };
}
