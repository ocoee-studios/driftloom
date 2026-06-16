import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';

export default function LucidScreen() {
  const { colors, checks, setChecks, lucidDone, setLucidDone } = useApp();

  const realityChecks = [
    { name: 'Look at your hands', desc: 'Do they look normal? Count your fingers.' },
    { name: 'Read text twice', desc: 'Text changes in dreams when you look away and back.' },
    { name: 'Push finger through palm', desc: 'In a dream, your finger may pass through.' },
    { name: 'Check the time', desc: 'Clocks behave strangely in dreams.' },
  ];

  const techniques = [
    { name: 'MILD', icon: '🧠', full: 'Mnemonic Induction', desc: 'As you fall asleep, repeat: "Next time I dream, I will realize I\'m dreaming." Visualize yourself becoming lucid in a recent dream.' },
    { name: 'WILD', icon: '👁', full: 'Wake Initiated', desc: 'Stay conscious as your body falls asleep. Lie still, focus on hypnagogic imagery forming behind your eyelids.' },
    { name: 'WBTB', icon: '⏰', full: 'Wake Back To Bed', desc: 'Alarm at 5 hours. Stay awake 20 min. Sleep with lucid intent. This targets the longest REM period of the night.' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Lucid Dreaming</Text>

        {/* Intro */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>WHAT IS LUCID DREAMING?</Text>
          <Text style={[s.body, { color: colors.deep }]}>
            A lucid dream is when you realize you're dreaming — while still inside the dream. With practice, you can take control of the narrative, fly, explore, and use your dreams as a creative playground.
          </Text>
          <View style={s.statRow}>
            {[{ v: '55%', l: 'have had one' }, { v: '23%', l: 'monthly' }, { v: '11%', l: 'weekly' }].map((st, i) => (
              <View key={i} style={[s.statCard, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                <Text style={[s.statVal, { color: colors.lav }]}>{st.v}</Text>
                <Text style={{ fontSize: 13, color: colors.muted }}>{st.l}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Reality Checks */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>✋ REALITY CHECKS</Text>
          <Text style={{ fontSize: 14, color: colors.muted, textAlign: 'center', marginBottom: 12 }}>Practice these during the day. The habit carries into dreams.</Text>
          {realityChecks.map((rc, i) => (
            <TouchableOpacity key={i} onPress={() => { const n = [...checks]; n[i] = !n[i]; setChecks(n); }}
              style={[s.checkRow, { borderColor: colors.line }]}>
              <View style={[s.checkBox, { borderColor: colors.lav, backgroundColor: checks[i] ? colors.lav : 'transparent' }]}>
                {checks[i] && <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.navy }}>{rc.name}</Text>
                <Text style={{ fontSize: 13, color: colors.muted }}>{rc.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </GlassCard>

        {/* Techniques */}
        <Text style={[s.sectionLabel, { color: colors.navy }]}>Techniques</Text>
        {techniques.map((t, i) => (
          <GlassCard key={i}>
            <View style={s.techHeader}>
              <View style={[s.techIcon, { backgroundColor: colors.lav }]}>
                <Text style={{ fontSize: 20 }}>{t.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.navy }}>{t.name}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.lav, textTransform: 'uppercase', letterSpacing: 1 }}>{t.full}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22 }}>{t.desc}</Text>
          </GlassCard>
        ))}

        {/* Benefits */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>✨ BENEFITS</Text>
          {['Overcome nightmares by taking control', 'Boost creativity and problem-solving', 'Practice real-world skills in your sleep', 'Deepen self-awareness and emotional insight'].map((b, i) => (
            <View key={i} style={s.benefitRow}>
              <Text style={{ color: colors.lav }}>✦</Text>
              <Text style={{ fontSize: 14, color: colors.deep, flex: 1 }}>{b}</Text>
            </View>
          ))}
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 },
  body: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  statRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 14, borderWidth: 0.5 },
  statVal: { fontSize: 20, fontWeight: '700' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderBottomWidth: 1 },
  checkBox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  techHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  techIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  benefitRow: { flexDirection: 'row', gap: 8, paddingVertical: 6 },
});
