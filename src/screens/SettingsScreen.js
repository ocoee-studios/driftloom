import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Switch, Linking, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { LEGAL_URLS } from '../constants/data';
import { restorePurchases } from '../services/purchases';

const APP_LOGO = require('../../assets/brand/driftloom-logo.png');
const SUPPORT_URL = 'https://ocoeestudios.com/support';

export default function SettingsScreen() {
  const { colors, lockEnabled, setLockEnabled, hasAccess, setShowPaywall,
    setPurchased, clearStorage, dreams } = useApp();

  const exportJournal = async () => {
    try {
      await Share.share({ message: JSON.stringify({ exportedAt: new Date().toISOString(), dreams }, null, 2) });
    } catch {}
  };

  const deleteAll = () => {
    Alert.alert(
      'Delete All Data',
      'This permanently erases every dream and resets the app. This cannot be undone.',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => clearStorage?.() }]
    );
  };

  const restore = async () => {
    const ok = await restorePurchases();
    if (ok) { setPurchased(true); Alert.alert('Restored', 'Your purchase has been restored.'); }
    else Alert.alert('Nothing to Restore', 'No active purchase was found for this Apple ID.');
  };

  const privacyItems = [
    { icon: '🔒', label: 'Passcode & Face ID', toggle: true, state: lockEnabled, setState: setLockEnabled },
    { icon: '📤', label: 'Export Journal', arrow: true, onPress: exportJournal },
    { icon: '🗑', label: 'Delete All Data', arrow: true, danger: true, onPress: deleteAll },
  ];

  const infoItems = [
    { icon: '📄', label: 'Privacy Policy', arrow: true, onPress: () => Linking.openURL(LEGAL_URLS.privacy) },
    { icon: '📋', label: 'Terms of Use', arrow: true, onPress: () => Linking.openURL(LEGAL_URLS.terms) },
    { icon: '💬', label: 'Support', arrow: true, onPress: () => Linking.openURL(SUPPORT_URL) },
    { icon: '🌀', label: 'About Driftloom', value: 'v1.0.0' },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Settings</Text>

        <View style={s.profileCard}>
          <Image source={APP_LOGO} style={s.profileAvatar} />
          <View>
            <Text style={s.profileName}>Dreamer</Text>
            <Text style={s.profileSub}>{hasAccess ? 'Driftloom Plus' : 'Free plan'}</Text>
          </View>
        </View>

        <Text style={s.sectionLabel}>Privacy & Security</Text>
        <View style={s.groupCard}>
          {privacyItems.map((item, i) => {
            const border = i < privacyItems.length - 1 && s.rowBorder;
            if (item.toggle) {
              return (
                <View key={i} style={[s.settingsRow, border]}>
                  <Text style={s.rowIcon}>{item.icon}</Text>
                  <Text style={s.rowLabel}>{item.label}</Text>
                  <Switch value={item.state} onValueChange={item.setState}
                    trackColor={{ false: '#1a2a4a', true: '#4FCBFF' }} thumbColor="#EAF6FF" />
                </View>
              );
            }
            return (
              <TouchableOpacity key={i} style={[s.settingsRow, border]} onPress={item.onPress} activeOpacity={0.7}>
                <Text style={s.rowIcon}>{item.icon}</Text>
                <Text style={[s.rowLabel, item.danger && { color: '#ff6b6b' }]}>{item.label}</Text>
                <Text style={{ color: '#35516F' }}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={s.sectionLabel}>Subscription</Text>
        <TouchableOpacity style={s.subCard} onPress={() => hasAccess ? Linking.openURL(LEGAL_URLS.manageSub) : setShowPaywall(true)} activeOpacity={0.8}>
          <Text style={{ fontSize: 18 }}>👑</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.subTitle}>Driftloom Plus</Text>
            <Text style={s.subAction}>{hasAccess ? 'Manage Subscription' : 'Unlock premium'}</Text>
          </View>
          <Text style={{ color: '#35516F' }}>›</Text>
        </TouchableOpacity>
        <View style={s.groupCard}>
          <TouchableOpacity style={s.settingsRow} onPress={restore} activeOpacity={0.7}>
            <Text style={s.rowIcon}>↻</Text>
            <Text style={s.rowLabel}>Restore Purchases</Text>
            <Text style={{ color: '#35516F' }}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.sectionLabel}>Information</Text>
        <View style={s.groupCard}>
          {infoItems.map((item, i) => (
            <TouchableOpacity key={i} style={[s.settingsRow, i < infoItems.length - 1 && s.rowBorder]}
              onPress={item.onPress} disabled={!item.onPress} activeOpacity={0.7}>
              <Text style={s.rowIcon}>{item.icon}</Text>
              <Text style={s.rowLabel}>{item.label}</Text>
              <View style={s.rowRight}>
                {item.value && <Text style={s.rowValue}>{item.value}</Text>}
                {item.arrow && <Text style={{ color: '#35516F' }}>›</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#EAF6FF', textAlign: 'center', marginBottom: 20 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 18, padding: 18, marginBottom: 20,
  },
  profileAvatar: { width: 48, height: 48, borderRadius: 24 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#EAF6FF' },
  profileSub: { fontSize: 13, color: '#5A6A7A', marginTop: 2 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 8 },
  groupCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.25)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)',
    borderRadius: 16, marginBottom: 16, overflow: 'hidden',
  },
  settingsRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(79, 203, 255, 0.06)' },
  rowIcon: { fontSize: 16, marginRight: 14 },
  rowLabel: { fontSize: 15, color: '#EAF6FF', flex: 1 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowValue: { fontSize: 13, color: '#5A6A7A' },
  subCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(79, 203, 255, 0.06)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.15)',
    borderRadius: 16, padding: 16, marginBottom: 12,
  },
  subTitle: { fontSize: 16, fontWeight: '700', color: '#EAF6FF' },
  subAction: { fontSize: 13, fontWeight: '600', color: '#4FCBFF', marginTop: 2 },
});
