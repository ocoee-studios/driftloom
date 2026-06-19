import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import LoomScreen from './src/screens/LoomScreen';
import VaultScreen from './src/screens/VaultScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LockScreen from './src/components/LockScreen';
import PaywallModal from './src/components/PaywallModal';
import { initPurchases, checkAccess } from './src/services/purchases';

// Tabs map 1:1 to the modular screens. Screen labels double as the navigate() keys
// so screen code like navigation.navigate('Capture') / 'Vault' resolves correctly.
const TABS = [
  { key: 'Today', icon: '☾', Screen: HomeScreen },
  { key: 'Capture', icon: '✎', Screen: CaptureScreen },
  { key: 'Loom', icon: '✦', Screen: LoomScreen },
  { key: 'Vault', icon: '◈', Screen: VaultScreen },
  { key: 'Settings', icon: '⚙', Screen: SettingsScreen },
];

function Shell() {
  const { appLocked, lockEnabled, showPaywall, colors, setPurchased } = useApp();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState('Today');

  // Wire RevenueCat once on launch, then reflect the real entitlement.
  useEffect(() => {
    let alive = true;
    (async () => {
      await initPurchases();
      const ok = await checkAccess();
      if (alive && ok) setPurchased(true);
    })();
    return () => { alive = false; };
  }, []);

  // Lightweight navigation shim consumed by screens via navigation.navigate(key).
  const navigation = { navigate: (key) => setActive(key) };

  if (appLocked && lockEnabled) return <LockScreen />;

  const ActiveScreen = TABS.find((t) => t.key === active)?.Screen || HomeScreen;
  const bg = colors?.bg || '#02040A';
  const accent = colors?.accent || '#4FCBFF';

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <ActiveScreen navigation={navigation} />
      </View>
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8), backgroundColor: bg }]}>
        {TABS.map((t) => {
          const on = active === t.key;
          return (
            <TouchableOpacity key={t.key} style={styles.tab} onPress={() => setActive(t.key)} activeOpacity={0.8}>
              <Text style={[styles.tabIcon, { color: on ? accent : '#5A6A7A' }]}>{t.icon}</Text>
              <Text style={[styles.tabLabel, { color: on ? accent : '#5A6A7A' }]}>{t.key}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {showPaywall && <PaywallModal />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Shell />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(79,203,255,0.12)',
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 20, marginBottom: 2 },
  tabLabel: { fontSize: 10, fontWeight: '600' },
});
