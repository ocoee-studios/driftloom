import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function LucidScreen() {
  const { checks, setChecks, dreams } = useApp();
  const lucidCount = dreams.filter(d => d.lucid).length;
  const xp = Math.min(1000, lucidCount * 70 + (checks.filter(Boolean).length * 30));
  const level = xp < 200 ? 1 : xp < 500 ? 2 : xp < 800 ? 3 : 4;
  const rank = ['Beginner', 'Explorer', 'Navigator', 'Architect'][level - 1];
  const checksCompleted = checks.filter(Boolean).length;

  const techniques = [
    { id: 'MILD', full: 'Mnemonic Induction of Lucid Dreams', icon: '🧠' },
    { id: 'WBTB', full: 'Wake Back To Bed', icon: '⏰' },
    { id: 'WILD', full: 'Wake Initiated Lucid Dream', icon: '👁' },
    { id: 'SSILD', full: 'Senses Initiated Lucid Dream', icon: '🎯' },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Lucid Practice</Text>

        {/* Progress Card */}
        <View style={s.progressCard}>
          <View style={{ flex: 1 }}>
            <Text style={s.progressLabel}>Your Progress</Text>
            <Text style={s.progressRank}>{rank}</Text>
            <Text style={s.progressLevel}>Level {level}</Text>
            <View style={s.xpBar}><View style={[s.xpFill, { width: `${(xp / 1000) * 100}%` }]} /></View>
            <Text style={s.xpText}>{xp} / 1,000 XP</Text>
          </View>
          <Text style={{ fontSize: 50 }}>🧠</Text>
        </View>

        {/* Today's Practice */}
        <View style={s.card}>
          <Text style={s.cardLabel}>Today's Practice</Text>
          <View style={s.practiceRow}>
            <View style={s.practiceIcon}><Text style={{ fontSize: 18 }}>👁</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.practiceTitle}>Reality Check</Text>
              <Text style={s.practiceSub}>Perform 3 reality checks throughout the day.</Text>
              <Text style={s.practiceCount}>{checksCompleted} / 3</Text>
            </View>
          </View>
          <View style={s.checkRow}>
            {[0, 1, 2].map(i => (
              <TouchableOpacity key={i} onPress={() => { const n = [...checks]; n[i] = !n[i]; setChecks(n); }}
                style={[s.checkBox, checks[i] && s.checkBoxOn]}>
                {checks[i] && <Text style={{ color: 'white', fontWeight: '700' }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Techniques */}
        <Text style={s.sectionLabel}>Techniques</Text>
        {techniques.map((t, i) => (
          <TouchableOpacity key={i} style={s.techRow}>
            <View style={s.techIcon}><Text style={{ fontSize: 18 }}>{t.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.techName}>{t.id}</Text>
              <Text style={s.techFull}>{t.full}</Text>
            </View>
            <Text style={{ color: '#35516F', fontSize: 16 }}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#EAF6FF', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 18, padding: 18, marginBottom: 12,
  },
  progressCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.4)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.15)',
    borderRadius: 20, padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center',
  },
  progressLabel: { fontSize: 12, color: '#5A6A7A', fontWeight: '600' },
  progressRank: { fontSize: 24, fontWeight: '800', color: '#EAF6FF', marginTop: 4 },
  progressLevel: { fontSize: 14, color: '#8EAAC5', marginTop: 2 },
  xpBar: { height: 6, borderRadius: 3, backgroundColor: 'rgba(79, 203, 255, 0.15)', marginTop: 10, width: '80%' },
  xpFill: { height: '100%', borderRadius: 3, backgroundColor: '#4FCBFF' },
  xpText: { fontSize: 11, color: '#5A6A7A', marginTop: 6 },
  cardLabel: { fontSize: 12, fontWeight: '600', color: '#5A6A7A', marginBottom: 12 },
  practiceRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  practiceIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(79, 203, 255, 0.1)', alignItems: 'center', justifyContent: 'center' },
  practiceTitle: { fontSize: 16, fontWeight: '700', color: '#EAF6FF' },
  practiceSub: { fontSize: 12, color: '#8EAAC5', marginTop: 2, lineHeight: 18 },
  practiceCount: { fontSize: 13, fontWeight: '700', color: '#4FCBFF', marginTop: 6 },
  checkRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  checkBox: { width: 32, height: 32, borderRadius: 8, borderWidth: 2, borderColor: '#4FCBFF', alignItems: 'center', justifyContent: 'center' },
  checkBoxOn: { backgroundColor: '#4FCBFF' },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#8EAAC5', marginBottom: 12, marginTop: 8 },
  techRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: 'rgba(79, 203, 255, 0.06)',
  },
  techIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(79, 203, 255, 0.1)', alignItems: 'center', justifyContent: 'center' },
  techName: { fontSize: 16, fontWeight: '700', color: '#EAF6FF' },
  techFull: { fontSize: 12, color: '#5A6A7A', marginTop: 2 },
});
