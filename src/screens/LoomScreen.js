import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { AFFIRMATIONS } from '../constants/data';

// Creative lenses — Driftloom's core synthesis feature (UI shown as Coming Soon
// until the synthesis backend is wired). NOT a paywall/dead button.
const mentors = [
  { icon: '🧠', name: 'Founder', desc: 'Product & business lens' },
  { icon: '🎨', name: 'Designer', desc: 'Visual & UX patterns' },
  { icon: '✍️', name: 'Writer', desc: 'Narrative & meaning' },
  { icon: '🎬', name: 'Filmmaker', desc: 'Story & scenes' },
  { icon: '🎮', name: 'Game Dev', desc: 'Systems & mechanics' },
  { icon: '🔬', name: 'Researcher', desc: 'Data & discovery' },
];

export default function LoomScreen() {
  const { fragments, colors } = useApp();
  const day = new Date().getDay();
  const fragCount = (fragments || []).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Loom</Text>

        {/* Signal Detection */}
        <View style={s.signal}>
          <View style={s.row}>
            <Text style={s.lc}>🔗 SIGNAL FOUND</Text>
            <View style={s.badge}><Text style={s.badgeText}>New</Text></View>
          </View>
          <Text style={[s.h2, { color: colors.navy }]}>
            {fragCount > 0 ? 'Pattern forming in your fragments' : 'Capture fragments to find signals'}
          </Text>
          <Text style={s.body}>
            {fragCount} fragments in your loom. {fragCount >= 5 ? 'Connections are forming.' : 'Keep capturing to reveal patterns.'}
          </Text>
        </View>

        {/* Creative Mentors — Coming Soon (Driftloom's core synthesis) */}
        <GlassCard>
          <View style={s.cardHead}>
            <Text style={s.lb}>CREATIVE MENTORS</Text>
            <View style={s.soonBadge}><Text style={s.soonText}>COMING SOON</Text></View>
          </View>
          <Text style={[s.body, { marginBottom: 10 }]}>
            Pick a lens to synthesize your fragments into a concept with a clear first move.
          </Text>
          <View style={s.mentorGrid}>
            {mentors.map((m, i) => (
              <View key={i} style={[s.mentorCard, { backgroundColor: colors.glass2, borderColor: colors.line, opacity: 0.55 }]}>
                <Text style={{ fontSize: 22 }}>{m.icon}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color: colors.navy, marginTop: 3 }}>{m.name}</Text>
                <Text style={{ fontSize: 9, color: '#5A6A7A' }}>{m.desc}</Text>
              </View>
            ))}
          </View>
          <View style={[s.synthBtn, { backgroundColor: colors.glass2 }]}>
            <Text style={[s.synthBtnText, { color: '#5A6A7A' }]}>✨ Synthesis — coming soon</Text>
          </View>
        </GlassCard>

        {/* Daily Spark */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>💜 DAILY SPARK</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', fontStyle: 'italic', color: colors.navy, textAlign: 'center', lineHeight: 28 }}>
            {AFFIRMATIONS[day % AFFIRMATIONS.length]}
          </Text>
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  lb: { fontSize: 10, fontWeight: '700', color: '#5A6A7A', letterSpacing: 1.5, textTransform: 'uppercase' },
  lc: { fontSize: 10, fontWeight: '700', color: '#4FCBFF', letterSpacing: 1.5, textTransform: 'uppercase' },
  lg: { fontSize: 10, fontWeight: '700', color: '#d4a44c', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  body: { fontSize: 13, color: '#C7D0DB', lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  signal: { padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(79,203,255,0.2)', backgroundColor: 'rgba(14,43,92,0.3)', marginBottom: 12 },
  badge: { backgroundColor: 'rgba(79,203,255,0.12)', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, borderWidth: 1, borderColor: 'rgba(79,203,255,0.2)' },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#4FCBFF' },
  soonBadge: { backgroundColor: 'rgba(255,198,79,0.14)', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, borderWidth: 1, borderColor: 'rgba(255,198,79,0.3)' },
  soonText: { fontSize: 9, fontWeight: '800', color: '#FFC64F', letterSpacing: 1 },
  mentorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  mentorCard: { width: '31%', alignItems: 'center', padding: 10, borderRadius: 14, borderWidth: 0.5 },
  synthBtn: { padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 12 },
  synthBtnText: { fontWeight: '700', fontSize: 14 },
});
