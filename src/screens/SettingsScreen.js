import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Share, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { THEMES, INK_COLORS, JOURNAL_FONTS, JOURNAL_BGS } from '../constants/themes';
import { LEGAL_URLS } from '../constants/data';
import * as Linking from 'expo-linking';

export default function SettingsScreen() {
  const { colors, theme, setTheme, inkColor, setInkColor, journalFont, setJournalFont, journalBg, setJournalBg,
    lockEnabled, setLockEnabled, passcode, setPasscode, useBiometric, setUseBiometric,
    purchased, setPurchased, trialStart, setTrialStart, setShowPaywall,
    dreams, clearStorage } = useApp();
  const [settingPasscode, setSettingPasscode] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');

  const exportDreams = async () => {
    const text = dreams.map(d => `${d.date} — ${d.title}\nMood: ${d.mood} | Vivid: ${d.vivid}%\n${d.notes}\n---`).join('\n\n');
    try { await Share.share({ message: text, title: 'My Dream Journal' }); } catch {}
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Settings</Text>

        {/* Theme */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>THEME</Text>
          <View style={s.themeRow}>
            {THEMES.map((t, i) => (
              <TouchableOpacity key={i} onPress={() => setTheme(i)}
                style={[s.themeCard, {
                  backgroundColor: t.colors.bg,
                  borderColor: theme === i ? t.colors.lav : t.colors.line,
                  borderWidth: theme === i ? 2 : 1,
                }]}>
                <Text style={{ fontSize: 18 }}>{['🌙', '🌑', '🌸'][i]}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: t.colors.navy }}>{t.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Ink Colors */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>JOURNAL INK COLOR</Text>
          <View style={s.colorGrid}>
            {INK_COLORS.map(c => (
              <TouchableOpacity key={c.color} onPress={() => setInkColor(c.color)} style={s.colorWrap}>
                <View style={[s.colorSwatch, {
                  backgroundColor: c.color,
                  borderColor: inkColor === c.color ? colors.lav : colors.line,
                  borderWidth: inkColor === c.color ? 3 : 2,
                }]} />
                <Text style={{ fontSize: 11, color: colors.muted, textAlign: 'center' }}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[s.preview, { borderColor: colors.line }]}>
            <Text style={{ fontSize: 14, fontStyle: 'italic', color: inkColor }}>I was floating through soft lavender clouds...</Text>
          </View>
        </GlassCard>

        {/* Journal Font */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>JOURNAL FONT</Text>
          <View style={s.fontGrid}>
            {JOURNAL_FONTS.map(f => (
              <TouchableOpacity key={f.name} onPress={() => setJournalFont(f.value)}
                style={[s.fontCard, {
                  borderColor: journalFont === f.value ? colors.lav : colors.line,
                  borderWidth: journalFont === f.value ? 2 : 1,
                  backgroundColor: journalFont === f.value ? 'rgba(79,203,255,0.1)' : colors.glass2,
                }]}>
                <Text style={{ fontSize: 18, color: colors.navy }}>{f.preview}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.muted }}>{f.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Journal Background */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>JOURNAL BACKGROUND</Text>
          <View style={s.colorGrid}>
            {JOURNAL_BGS.map(bg => (
              <TouchableOpacity key={bg.name} onPress={() => setJournalBg(bg.color)} style={s.colorWrap}>
                <View style={[s.colorSwatch, {
                  backgroundColor: bg.color === 'transparent' ? '#fff' : bg.color,
                  borderColor: journalBg === bg.color ? colors.lav : colors.line,
                  borderWidth: journalBg === bg.color ? 3 : bg.color === 'transparent' ? 2 : 2,
                  borderStyle: bg.color === 'transparent' ? 'dashed' : 'solid',
                }]} />
                <Text style={{ fontSize: 11, color: colors.muted }}>{bg.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[s.preview, {
            borderColor: colors.line,
            backgroundColor: journalBg === 'transparent' ? colors.glass2 : journalBg,
          }]}>
            <Text style={{ fontSize: 14, fontStyle: 'italic', color: journalBg === '#07111F' ? '#EAF6FF' : inkColor }}>
              Preview with your selected colors and font...
            </Text>
          </View>
        </GlassCard>

        {/* Security */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>SECURITY</Text>
          <View style={s.settingRow}>
            <Text style={{ fontSize: 15, color: colors.navy }}>🔒 App Lock</Text>
            <TouchableOpacity onPress={() => {
              if (lockEnabled) { setLockEnabled(false); setPasscode(''); }
              else { setSettingPasscode(true); setNewPasscode(''); }
            }} style={[s.toggle, lockEnabled && s.toggleOn]}>
              <View style={[s.toggleDot, lockEnabled && s.toggleDotOn]} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
            {lockEnabled ? 'Your journal is protected.' : 'Enable to require a passcode.'}
          </Text>

          {settingPasscode && !lockEnabled && (
            <View style={s.passcodeSetup}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: colors.navy, marginBottom: 10 }}>Create a 4-digit passcode</Text>
              <View style={s.dotRow}>
                {[0, 1, 2, 3].map(i => (
                  <View key={i} style={[s.dot, newPasscode.length > i && { backgroundColor: colors.lav, borderColor: colors.lav }]} />
                ))}
              </View>
              <View style={s.miniKeypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((k, i) => (
                  k === '' ? <View key={i} style={s.miniKeyEmpty} /> :
                  <TouchableOpacity key={i} style={[s.miniKey, { borderColor: colors.line }]} onPress={() => {
                    if (k === '⌫') setNewPasscode(p => p.slice(0, -1));
                    else {
                      const next = newPasscode + k;
                      setNewPasscode(next);
                      if (next.length === 4) { setPasscode(next); setLockEnabled(true); setSettingPasscode(false); setNewPasscode(''); }
                    }
                  }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.navy }}>{k}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {lockEnabled && (
            <>
              <View style={[s.settingRow, { marginTop: 12 }]}>
                <Text style={{ fontSize: 15, color: colors.navy }}>😊 Face ID / Touch ID</Text>
                <TouchableOpacity onPress={() => setUseBiometric(!useBiometric)}
                  style={[s.toggle, useBiometric && s.toggleOn]}>
                  <View style={[s.toggleDot, useBiometric && s.toggleDotOn]} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
                {useBiometric ? 'Unlock with your face or fingerprint.' : 'Passcode only.'}
              </Text>
              <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.line }]}
                onPress={() => { setSettingPasscode(true); setNewPasscode(''); setLockEnabled(false); setPasscode(''); }}>
                <Text style={{ fontSize: 13, color: colors.navy }}>Change passcode</Text>
              </TouchableOpacity>
            </>
          )}
        </GlassCard>

        {/* Export */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>DATA</Text>
          <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.line }]} onPress={exportDreams}>
            <Text style={{ fontSize: 14, color: colors.navy }}>📤 Export Dream Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.line, marginTop: 8 }]}
            onPress={() => Alert.alert('Reset?', 'Delete all dreams and data?', [
              { text: 'Cancel' },
              { text: 'Reset', style: 'destructive', onPress: clearStorage },
            ])}>
            <Text style={{ fontSize: 14, color: '#ff6b6b' }}>🗑 Reset Dream Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.line, marginTop: 8 }]}
            onPress={() => { setPurchased(false); setTrialStart(null); }}>
            <Text style={{ fontSize: 14, color: '#ff6b6b' }}>Reset Purchase & Trial (testing)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.line, marginTop: 8 }]}
            onPress={() => setShowPaywall(true)}>
            <Text style={{ fontSize: 14, color: colors.lav }}>Preview Paywall (testing)</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* App Info */}
        <GlassCard>
          <View style={s.appInfo}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>🌙</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.navy }}>DriftLoom</Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>V4.0 · Ocoee Studios</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>Your dreams, decoded.</Text>
          </View>
          <View style={s.legalLinks}>
            <TouchableOpacity onPress={() => Linking.openURL(LEGAL_URLS.terms)}>
              <Text style={[s.link, { color: colors.lav }]}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(LEGAL_URLS.privacy)}>
              <Text style={[s.link, { color: colors.lav }]}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  themeRow: { flexDirection: 'row', gap: 8 },
  themeCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 16 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 12 },
  colorWrap: { alignItems: 'center', width: '14%' },
  colorSwatch: { width: 32, height: 32, borderRadius: 16, marginBottom: 4 },
  preview: { padding: 14, borderRadius: 14, borderWidth: 1, marginTop: 4 },
  fontGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  fontCard: { width: '31%', alignItems: 'center', padding: 10, borderRadius: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggle: { width: 50, height: 30, borderRadius: 15, backgroundColor: '#ccc', justifyContent: 'center', padding: 2 },
  toggleOn: { backgroundColor: '#4FCBFF' },
  toggleDot: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'white' },
  toggleDotOn: { alignSelf: 'flex-end' },
  passcodeSetup: { alignItems: 'center', marginTop: 14 },
  dotRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(79,203,255,0.3)' },
  miniKeypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 180 },
  miniKey: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center', margin: 4 },
  miniKeyEmpty: { width: 48, height: 48, margin: 4 },
  secondaryBtn: { padding: 12, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  appInfo: { alignItems: 'center', paddingVertical: 12 },
  legalLinks: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 12 },
  link: { fontSize: 13, textDecorationLine: 'underline' },
});
