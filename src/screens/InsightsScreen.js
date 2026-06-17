import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { ZODIAC, MOON_DATA, AFFIRMATIONS, DREAM_WISDOM } from '../constants/data';

export default function InsightsScreen() {
  const { dreams, colors, hasAccess, setShowPaywall, moonPhase } = useApp();
  const total = dreams.length;
  const moodFreq = {};
  const symbolFreq = {};
  dreams.forEach(d => {
    if (d.mood) moodFreq[d.mood] = (moodFreq[d.mood] || 0) + 1;
    if (d.tags) d.tags.split(',').forEach(t => { const s = t.trim(); if (s) symbolFreq[s] = (symbolFreq[s] || 0) + 1; });
  });
  const topSymbols = Object.entries(symbolFreq).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const avgVivid = total > 0 ? (dreams.reduce((s, d) => s + (d.vivid || 5), 0) / total).toFixed(1) : 0;
  const lucidPct = total > 0 ? Math.round((dreams.filter(d => d.lucid).length / total) * 100) : 0;

  const symbolIcons = { water: '🌊', flight: '🕊', flying: '🕊', doorway: '🚪', moon: '🌙', snake: '🐍', fire: '🔥', forest: '🌲', house: '🏠', star: '⭐', key: '🗝', cat: '🐱', ocean: '🌊' };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        <Text style={s.title}>Insights</Text>

        {/* Dream DNA Card */}
        <View style={s.dnaCard}>
          <Text style={s.dnaTitle}>Dream DNA</Text>
          <Text style={s.dnaSub}>Your subconscious blueprint.</Text>
          <View style={s.dnaVisual}>
            <Text style={{ fontSize: 50 }}>🧬</Text>
          </View>
        </View>

        {/* At a Glance */}
        <Text style={s.sectionLabel}>At a Glance</Text>
        <View style={s.statsRow}>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Dreams</Text>
            <Text style={s.statNum}>{total}</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Avg. Vividness</Text>
            <Text style={s.statNum}>{avgVivid}<Text style={s.statUnit}>/10</Text></Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Lucid Dreams</Text>
            <Text style={s.statNum}>{lucidPct}%</Text>
          </View>
        </View>

        {/* Top Recurring Symbols */}
        <View style={s.sectionRow}>
          <Text style={s.sectionLabel}>Top Recurring Symbols</Text>
          <TouchableOpacity><Text style={s.seeAll}>See All</Text></TouchableOpacity>
        </View>

        {topSymbols.length > 0 ? topSymbols.map(([sym, count], i) => (
          <View key={i} style={s.symbolRow}>
            <View style={s.symbolIcon}>
              <Text style={{ fontSize: 18 }}>{symbolIcons[sym.toLowerCase()] || '✦'}</Text>
            </View>
            <Text style={s.symbolName}>{sym.charAt(0).toUpperCase() + sym.slice(1)}</Text>
            <Text style={s.symbolCount}>{count} times</Text>
          </View>
        )) : (
          <View style={s.emptySymbols}>
            <Text style={{ color: '#35516F', fontSize: 13 }}>Log dreams with symbols to see patterns here</Text>
          </View>
        )}

        {/* Emotional Trend */}
        <Text style={[s.sectionLabel, { marginTop: 20 }]}>Emotional Trend (14 Days)</Text>
        <View style={s.trendCard}>
          {/* Simplified chart representation */}
          <View style={s.trendChart}>
            {[40, 65, 50, 75, 60, 45, 70, 55, 80, 60, 45, 65, 70, 55].map((v, i) => (
              <View key={i} style={[s.trendDot, { bottom: v }]}>
                <View style={[s.dotInner, { backgroundColor: v > 60 ? '#4FCBFF' : v > 40 ? '#8EAAC5' : '#ff6b6b' }]} />
              </View>
            ))}
            <View style={s.trendLine} />
          </View>
          <View style={s.legendRow}>
            <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#4FCBFF' }]} /><Text style={s.legendText}>Positive</Text></View>
            <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#8EAAC5' }]} /><Text style={s.legendText}>Neutral</Text></View>
            <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#ff6b6b' }]} /><Text style={s.legendText}>Challenging</Text></View>
          </View>
        </View>

        {/* AI Analysis Lock */}
        {!hasAccess && (
          <TouchableOpacity style={s.lockCard} onPress={() => setShowPaywall(true)}>
            <Text style={{ fontSize: 20 }}>🔒</Text>
            <Text style={s.lockTitle}>Unlock AI Pattern Analysis</Text>
            <Text style={s.lockSub}>Get personalized dream insights with DriftLoom Plus</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#EAF6FF', textAlign: 'center', marginBottom: 20 },

  // DNA
  dnaCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.4)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.15)',
    borderRadius: 20, padding: 20, marginBottom: 20,
  },
  dnaTitle: { fontSize: 18, fontWeight: '700', color: '#EAF6FF' },
  dnaSub: { fontSize: 13, color: '#8EAAC5', marginTop: 2 },
  dnaVisual: { alignItems: 'center', paddingVertical: 20 },

  // Stats
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#8EAAC5', marginBottom: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#4FCBFF' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 16, padding: 14, alignItems: 'center',
  },
  statLabel: { fontSize: 11, color: '#5A6A7A', fontWeight: '600' },
  statNum: { fontSize: 24, fontWeight: '800', color: '#EAF6FF', marginTop: 4 },
  statUnit: { fontSize: 14, fontWeight: '600', color: '#5A6A7A' },

  // Symbols
  symbolRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(79, 203, 255, 0.06)',
  },
  symbolIcon: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(79, 203, 255, 0.08)',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  symbolName: { fontSize: 15, fontWeight: '600', color: '#EAF6FF', flex: 1 },
  symbolCount: { fontSize: 13, color: '#5A6A7A' },
  emptySymbols: { padding: 20, alignItems: 'center' },

  // Trend
  trendCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.25)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)',
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  trendChart: { height: 100, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 4 },
  trendDot: { position: 'absolute' },
  dotInner: { width: 8, height: 8, borderRadius: 4 },
  trendLine: { position: 'absolute', left: 0, right: 0, bottom: 50, height: 1, backgroundColor: 'rgba(79, 203, 255, 0.08)' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#5A6A7A' },

  // Lock
  lockCard: {
    backgroundColor: 'rgba(79, 203, 255, 0.06)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.15)',
    borderRadius: 18, padding: 20, alignItems: 'center', marginTop: 8,
  },
  lockTitle: { fontSize: 15, fontWeight: '700', color: '#EAF6FF', marginTop: 8 },
  lockSub: { fontSize: 12, color: '#5A6A7A', marginTop: 4, textAlign: 'center' },
});
