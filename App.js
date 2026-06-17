import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import LoomScreen from './src/screens/LoomScreen';
import DreamsScreen from './src/screens/DreamsScreen';
import VaultScreen from './src/screens/VaultScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LockScreen from './src/components/LockScreen';
import PaywallModal from './src/components/PaywallModal';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  const { colors, appLocked, lockEnabled, showPaywall } = useApp();

  if (appLocked && lockEnabled) return <LockScreen />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(2,4,10,0.95)',
              borderTopWidth: 1,
              borderTopColor: 'rgba(79,203,255,0.08)',
              height: 80,
              paddingBottom: 20,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#4FCBFF',
            tabBarInactiveTintColor: '#5A6A7A',
            tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
            tabBarIcon: ({ color }) => {
              const icons = { Today: '◉', Capture: '◎', Loom: '◈', Dreams: '☽', Vault: '◇', Settings: '⚙' };
              return <Text style={{ fontSize: 18, color }}>{icons[route.name]}</Text>;
            },
          })}
        >
          <Tab.Screen name="Today" component={HomeScreen} />
          <Tab.Screen name="Capture" component={CaptureScreen} />
          <Tab.Screen name="Loom" component={LoomScreen} />
          <Tab.Screen name="Dreams" component={DreamsScreen} />
          <Tab.Screen name="Vault" component={VaultScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      {showPaywall && <PaywallModal />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </SafeAreaProvider>
  );
}
