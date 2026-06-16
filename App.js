import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import CyclesScreen from './src/screens/CyclesScreen';
import LucidScreen from './src/screens/LucidScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LockScreen from './src/components/LockScreen';
import PaywallModal from './src/components/PaywallModal';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  const { colors, appLocked, lockEnabled, showPaywall } = useApp();

  if (appLocked && lockEnabled) return <LockScreen />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.navBg,
              borderTopWidth: 0.5,
              borderTopColor: 'rgba(79,203,255,0.08)',
              height: 80,
              paddingBottom: 20,
              paddingTop: 8,
            },
            tabBarActiveTintColor: colors.lav,
            tabBarInactiveTintColor: colors.muted,
            tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
            tabBarIcon: ({ color }) => {
              const icons = { Home:'☽', Journal:'✎', Insights:'✦', Cycles:'◑', Lucid:'◌', Dictionary:'❋', Settings:'⚙' };
              return <Text style={{ fontSize: 18, color }}>{icons[route.name]}</Text>;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Journal" component={JournalScreen} />
          <Tab.Screen name="Insights" component={InsightsScreen} />
          <Tab.Screen name="Cycles" component={CyclesScreen} />
          <Tab.Screen name="Lucid" component={LucidScreen} />
          <Tab.Screen name="Dictionary" component={DictionaryScreen} />
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
