import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { SLEEP_STAGES } from '../constants/data';
import { LinearGradient } from 'expo-linear-gradient';

export default function CyclesScreen() {
  const { colors, checkin } = useApp();
  const [selectedCycle, setSelectedCycle] = useState(null);

  const cycleRings = [
    { label: 'Light', icon: '🌊', color: '#6a8cff' },
    { label: 'Deep', icon: '🌑', color: '#0E2B5C' },
    { label: 'REM', icon: '✨', color: '#4FCBFF' },
    { label: 'Recall', icon: '💫', color: '#d4a44c' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Dream Cycles</Text>

        {/* Intro */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>YOUR NIGHTLY JOURNEY</Text>
          <Text style={[s.heading, { color: colors.navy }]}>The Architecture of Sleep</Text>
          <Text style={[s.body, { color: colors.deep }]}>
            Each 90-minute cycle brings more REM. Dream-rich periods grow longer toward morning.
          </Text>

          {/* Cycle Rings */}
          <View style={s.ringGrid}>
            {cycleRings.map((item, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedCycle(selectedCycle === i ? null : i)}
                style={[s.ringCard, {
                  backgroundColor: selectedCycle === i ? item.color + '15' : colors.glass2,
                  borderColor: selectedCycle === i ? item.color : colors.line,
                  borderWidth: selectedCycle === i ? 2 : 0.5,
                }]}>
                <View style={[s.ringOrb, { backgroundColor: item.color }]}>
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                </View>
                <Text style={[s.ringLabel, { color: selectedCycle === i ? item.color : colors.navy }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Sleep Tonight */}
        <GlassCard dark>
          <Text style={[s.eyebrow, { color: 'rgba(79,203,255,0.5)' }]}>🌙 YOUR SLEEP TONIGHT</Text>
          <Text style={s.tonightGrade}>
            {checkin.sleep >= 7 ? 'Excellent' : checkin.sleep >= 5 ? 'Good' : checkin.sleep >= 3 ? 'Fair' : 'Needs Care'}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(224,216,240,0.4)', textAlign: 'center' }}>Based on your check-in data</Text>
          <View style={[s.statGrid, { marginTop: 10 }]}>
            {[
              { label: 'Sleep', val: `${checkin.sleep || 5}/10`, icon: '😴', color: checkin.sleep >= 7 ? '#4ecdc4' : '#ffb347' },
              { label: 'Stress', val: `${checkin.stress || 5}/10`, icon: '😰', color: checkin.stress <= 3 ? '#4ecdc4' : '#ff6b6b' },
              { label: 'Energy', val: `${checkin.energy || 5}/10`, icon: '⚡', color: checkin.energy >= 7 ? '#4ecdc4' : '#ffb347' },
            ].map((s2, i) => (
              <View key={i} style={s.tonightStat}>
                <Text style={{ fontSize: 14 }}>{s2.icon}</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', color: s2.color }}>{s2.val}</Text>
                <Text style={{ fontSize: 10, color: 'rgba(224,216,240,0.3)' }}>{s2.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Sleep Stages */}
        <Text style={[s.sectionLabel, { color: colors.navy }]}>The Stages</Text>
        {SLEEP_STAGES.map((stage, i) => (
          <View key={i} style={[s.stageCard, { backgroundColor: colors.glass, borderColor: colors.line }]}>
            <View style={{ height: 3, backgroundColor: stage.color, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
            <View style={s.stageContent}>
              <View style={s.stageHeader}>
                <View style={[s.stageOrb, { backgroundColor: stage.color }]}>
                  <Text style={{ fontSize: 20 }}>{stage.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.stageName, { color: colors.navy }]}>{stage.name}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: stage.color, textTransform: 'uppercase', letterSpacing: 1 }}>{stage.sub}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22, marginBottom: 12 }}>{stage.body}</Text>
              <View style={s.tagRow}>
                {stage.tags.map((t, j) => (
                  <View key={j} style={[s.tag, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: colors.deep }}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Did You Know */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>💤 DID YOU KNOW?</Text>
          {[
            { icon: '🧠', fact: 'Your brain uses MORE energy during REM than when awake.' },
            { icon: '🌡', fact: '65°F room temp increases deep sleep by 25%.' },
            { icon: '📱', fact: 'Blue light suppresses melatonin for 90 minutes.' },
            { icon: '⏰', fact: 'Same bedtime every night, even weekends, improves sleep quality.' },
          ].map((f, i) => (
            <View key={i} style={[s.factRow, { borderBottomColor: i < 3 ? colors.line : 'transparent' }]}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>{f.icon}</Text>
              <Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22, flex: 1 }}>{f.fact}</Text>
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
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 },
  heading: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  body: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  ringGrid: { flexDirection: 'row', gap: 8, marginTop: 12 },
  ringCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 18 },
  ringOrb: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  ringLabel: { fontSize: 13, fontWeight: '700' },
  sectionLabel: { fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  stageCard: { borderRadius: 20, marginBottom: 14, borderWidth: 0.5, overflow: 'hidden' },
  stageContent: { padding: 20 },
  stageHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  stageOrb: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  stageName: { fontSize: 20, fontWeight: '800' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99, borderWidth: 0.5 },
  tonightGrade: { fontSize: 36, fontWeight: '700', color: '#EAF6FF', textAlign: 'center' },
  statGrid: { flexDirection: 'row', gap: 8 },
  tonightStat: { flex: 1, alignItems: 'center', padding: 8, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.06)' },
  factRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1 },
});
