import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { ZODIAC, MOON_DATA, AFFIRMATIONS, DREAM_WISDOM } from '../constants/data';

export default function LoomScreen() {
  const { dreams, fragments, colors, hasAccess, setShowPaywall, moonPhase } = useApp();
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [selectedMoon, setSelectedMoon] = useState(null);
  const day = new Date().getDay();
  const total = dreams.length;
  const fragCount = (fragments || []).length;
  const moodFreq = {};
  dreams.forEach(d => { if (d.mood) moodFreq[d.mood] = (moodFreq[d.mood] || 0) + 1; });
  const topMood = Object.entries(moodFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const mentors = [
    { icon: '🧠', name: 'Founder', desc: 'Product & business lens' },
    { icon: '🎨', name: 'Designer', desc: 'Visual & UX patterns' },
    { icon: '✍️', name: 'Writer', desc: 'Narrative & meaning' },
    { icon: '🎬', name: 'Filmmaker', desc: 'Story & scenes' },
    { icon: '🎮', name: 'Game Dev', desc: 'Systems & mechanics' },
    { icon: '🔬', name: 'Researcher', desc: 'Data & discovery' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Loom</Text>

        {/* Signal Detection */}
        <View style={s.signal}>
          <View style={s.row}><Text style={s.lc}>🔗 SIGNAL FOUND</Text>
            <View style={s.badge}><Text style={s.badgeText}>New</Text></View></View>
          <Text style={[s.h2, { color: colors.navy }]}>
            {fragCount > 0 && total > 0 ? 'Ideas + dreams converging' : fragCount > 0 ? 'Pattern forming in fragments' : total > 0 ? 'Dream pattern detected' : 'Capture fragments to find signals'}
          </Text>
          <Text style={s.body}>
            {fragCount} fragments + {total} dreams in your loom. {fragCount + total >= 5 ? 'Connections are forming.' : 'Keep capturing to reveal patterns.'}
          </Text>
        </View>

        {/* AI Mentors */}
        <GlassCard>
          <Text style={s.lb}>AI MENTORS</Text>
          <View style={s.mentorGrid}>
            {mentors.map((m, i) => (
              <TouchableOpacity key={i} onPress={() => hasAccess ? null : setShowPaywall(true)}
                style={[s.mentorCard, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                <Text style={{ fontSize: 22 }}>{m.icon}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color: colors.navy, marginTop: 3 }}>{m.name}</Text>
                <Text style={{ fontSize: 9, color: '#5A6A7A' }}>{m.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.synthBtn} onPress={() => hasAccess ? null : setShowPaywall(true)}>
            <Text style={s.synthBtnText}>{hasAccess ? '🧠 Synthesize My Fragments' : '🔒 Unlock AI Synthesis'}</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Dream DNA */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>🧬 DREAM DNA</Text>
          <Text style={{ fontSize: 14, color: colors.deep, textAlign: 'center', lineHeight: 22 }}>
            {total >= 3 ? `Based on ${total} dreams, your emotional signature is ${topMood.toLowerCase()}.` : 'Log 3+ dreams to reveal your Dream DNA.'}
          </Text>
        </GlassCard>

        {/* Emotional Landscape */}
        {total >= 2 && (
          <GlassCard>
            <Text style={[s.lg, { textAlign: 'center' }]}>🎭 EMOTIONAL LANDSCAPE</Text>
            {Object.entries(moodFreq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([mood, count], i) => {
              const max = Object.values(moodFreq).sort((a, b) => b - a)[0] || 1;
              return (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={s.row}><Text style={{ fontSize: 14, fontWeight: '700', color: colors.navy }}>{mood}</Text>
                    <Text style={{ fontSize: 13, color: '#5A6A7A' }}>{count}× · {Math.round(count / total * 100)}%</Text></View>
                  <View style={s.bar}><View style={[s.barFill, { width: `${(count / max) * 100}%` }]} /></View>
                </View>
              );
            })}
          </GlassCard>
        )}

        {/* Subconscious Messages */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>💬 SUBCONSCIOUS MESSAGES</Text>
          {['Your mind keeps circling the same themes — pay attention.', 'Dreams and waking ideas are converging.', 'Patterns emerge from the noise. Keep capturing.', 'The signal is getting stronger.'].map((m, i) => (
            <View key={i} style={[s.msgRow, { borderBottomColor: i < 3 ? colors.line : 'transparent' }]}>
              <Text style={{ color: '#4FCBFF', fontSize: 12 }}>✦</Text>
              <Text style={{ fontSize: 12, color: '#C7D0DB', flex: 1 }}>{m}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Affirmation */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>💜 DAILY AFFIRMATION</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', fontStyle: 'italic', color: colors.navy, textAlign: 'center', lineHeight: 28 }}>{AFFIRMATIONS[day]}</Text>
        </GlassCard>

        {/* Zodiac */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>♈ DREAM ZODIAC</Text>
          <View style={s.zodiacGrid}>
            {ZODIAC.map((z, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedZodiac(selectedZodiac === i ? null : i)}
                style={[s.zodiacCard, { backgroundColor: selectedZodiac === i ? z.color + '15' : colors.glass2, borderColor: selectedZodiac === i ? z.color : colors.line }]}>
                <Text style={{ fontSize: 20 }}>{z.s}</Text>
                <Text style={{ fontSize: 9, fontWeight: '700', color: selectedZodiac === i ? z.color : '#5A6A7A' }}>{z.n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedZodiac !== null && (
            <View style={[s.detail, { borderColor: ZODIAC[selectedZodiac].color + '33' }]}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{ZODIAC[selectedZodiac].s} {ZODIAC[selectedZodiac].n}</Text>
              <Text style={{ fontSize: 14, color: '#C7D0DB', marginTop: 4 }}>{ZODIAC[selectedZodiac].trait}</Text>
            </View>
          )}
        </GlassCard>

        {/* Moon's Journey */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>🌙 THE MOON'S JOURNEY</Text>
          <View style={s.moonGrid}>
            {MOON_DATA.map((m, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedMoon(selectedMoon === i ? null : i)}
                style={[s.moonCard, { backgroundColor: selectedMoon === i ? 'rgba(79,203,255,0.12)' : colors.glass2, borderColor: selectedMoon === i ? '#4FCBFF' : i === moonPhase.cycle ? '#d4a44c' : colors.line }]}>
                <Text style={{ fontSize: 22 }}>{'🌑🌒🌓🌔🌕🌖🌗🌘'.split('')[i] || '🌙'}</Text>
                <Text style={{ fontSize: 8, fontWeight: '700', color: selectedMoon === i ? '#4FCBFF' : '#5A6A7A', textAlign: 'center' }}>{m.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedMoon !== null && (
            <View style={[s.detail, { borderColor: 'rgba(79,203,255,0.15)' }]}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{MOON_DATA[selectedMoon].name}</Text>
              <Text style={{ fontSize: 14, color: '#C7D0DB', lineHeight: 22, marginTop: 4 }}>{MOON_DATA[selectedMoon].desc}</Text>
              <Text style={{ fontSize: 13, color: '#d4a44c', fontStyle: 'italic', marginTop: 6 }}>💡 {MOON_DATA[selectedMoon].dream}</Text>
            </View>
          )}
        </GlassCard>

        {/* Dream Wisdom */}
        <GlassCard>
          <Text style={[s.lg, { textAlign: 'center' }]}>📖 DREAM WISDOM</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', fontStyle: 'italic', color: colors.navy, textAlign: 'center', lineHeight: 28 }}>
            "{DREAM_WISDOM[day % DREAM_WISDOM.length].quote}"
          </Text>
          <Text style={{ fontSize: 14, color: '#4FCBFF', fontWeight: '700', textAlign: 'center', marginTop: 8 }}>
            — {DREAM_WISDOM[day % DREAM_WISDOM.length].author}
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
  lb: { fontSize: 10, fontWeight: '700', color: '#5A6A7A', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  lc: { fontSize: 10, fontWeight: '700', color: '#4FCBFF', letterSpacing: 1.5, textTransform: 'uppercase' },
  lg: { fontSize: 10, fontWeight: '700', color: '#d4a44c', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  body: { fontSize: 13, color: '#C7D0DB', lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  signal: { padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(79,203,255,0.2)', backgroundColor: 'rgba(14,43,92,0.3)', marginBottom: 12 },
  badge: { backgroundColor: 'rgba(79,203,255,0.12)', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, borderWidth: 1, borderColor: 'rgba(79,203,255,0.2)' },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#4FCBFF' },
  mentorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  mentorCard: { width: '31%', alignItems: 'center', padding: 10, borderRadius: 14, borderWidth: 0.5 },
  synthBtn: { padding: 14, borderRadius: 14, backgroundColor: '#4FCBFF', alignItems: 'center', marginTop: 12 },
  synthBtnText: { color: '#02040A', fontWeight: '700', fontSize: 14 },
  msgRow: { flexDirection: 'row', gap: 8, paddingVertical: 8, borderBottomWidth: 1 },
  zodiacGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  zodiacCard: { width: '23%', alignItems: 'center', padding: 8, borderRadius: 14, borderWidth: 0.5 },
  moonGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moonCard: { width: '23%', alignItems: 'center', padding: 10, borderRadius: 16, borderWidth: 0.5 },
  detail: { marginTop: 10, padding: 14, borderRadius: 16, borderWidth: 0.5 },
  bar: { height: 6, borderRadius: 3, backgroundColor: 'rgba(79,203,255,0.1)', marginTop: 4 },
  barFill: { height: '100%', borderRadius: 3, backgroundColor: '#4FCBFF' },
});
