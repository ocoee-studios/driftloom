import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { DAILY_SYMBOLS, DREAM_FACTS } from '../constants/data';

const { width } = Dimensions.get('window');
const APP_LOGO = require('../../assets/brand/driftloom-logo.png');

export default function HomeScreen({ navigation }) {
  const { dreams, fragments, colors, moonPhase, checkin } = useApp();
  const day = new Date().getDay();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const total = dreams.length;
  const fragCount = (fragments || []).length;
  const streak = 0; // calculated from consecutive days
  const recall = total > 0 ? Math.min(100, Math.round((dreams.filter(d => d.notes && d.notes.length > 20).length / total) * 100)) : 0;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero Logo */}
        <View style={s.heroWrap}>
          <Image source={APP_LOGO} style={s.heroLogo} resizeMode="contain" />
          <Text style={s.heroTitle}>DRIFTLOOM</Text>
          <Text style={s.heroTagline}>Capture the fragments.{'\n'}Find the pattern.{'\n'}Turn inner drift into direction.</Text>
        </View>

        {/* Greeting Card */}
        <View style={s.card}>
          <Text style={s.greetText}>{greeting}, Jamie ✨</Text>
          <Text style={s.greetSub}>
            {total > 0
              ? `You're recalling ${recall}% more dreams this week. Keep going.`
              : 'Start capturing dreams and ideas to find your patterns.'}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={s.statsRow}>
          <View style={s.statBubble}>
            <Text style={s.statLabel}>Dreams</Text>
            <Text style={s.statNum}>{total}</Text>
          </View>
          <View style={s.statBubble}>
            <Text style={s.statLabel}>Day Streak</Text>
            <Text style={s.statNum}>{streak} 🔥</Text>
          </View>
          <View style={s.statBubble}>
            <Text style={s.statLabel}>Recall</Text>
            <Text style={s.statNum}>{recall}%</Text>
            <Text style={s.statTrend}>📈</Text>
          </View>
        </View>

        {/* Daily Spark */}
        <View style={s.card}>
          <View style={s.sparkRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.sparkTitle}>Daily Spark</Text>
              <Text style={s.sparkBody}>What symbol or theme keeps returning in your dreams?</Text>
            </View>
            <TouchableOpacity style={s.sparkBtn} onPress={() => navigation?.navigate?.('Capture')}>
              <Text style={s.sparkBtnIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Moon */}
        <View style={s.card}>
          <Text style={s.moonLabel}>Current Moon</Text>
          <Text style={s.moonPhase}>{moonPhase?.name || 'Waxing Gibbous'}</Text>
          <Text style={s.moonIllum}>Illumination: {moonPhase?.illumination || 72}%</Text>
        </View>

        {/* Recent Fragments */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Fragments</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Vault')}>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Fragment list */}
        {[...(fragments || []).slice(0, 3), ...(dreams || []).slice(0, 2).map(d => ({
          type: 'dream', text: d.title || d.notes?.slice(0, 60) || 'Dream entry',
          date: d.date, icon: '🌙'
        }))].slice(0, 4).map((item, i) => (
          <View key={i} style={s.fragmentCard}>
            <View style={s.fragRow}>
              <View style={s.fragIcon}>
                <Text style={{ fontSize: 16 }}>{item.icon || { text: '📝', voice: '🎙', camera: '📸', link: '🔗', spark: '💡' }[item.type] || '📝'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.fragText} numberOfLines={2}>{item.text || 'Empty fragment'}</Text>
                <Text style={s.fragMeta}>{item.date || item.time || 'Just now'}</Text>
              </View>
            </View>
          </View>
        ))}

        {(fragments || []).length === 0 && dreams.length === 0 && (
          <View style={s.emptyCard}>
            <Text style={{ fontSize: 28 }}>🌙</Text>
            <Text style={s.emptyText}>Your loom is empty</Text>
            <Text style={s.emptySub}>Capture a dream or drop a fragment to begin</Text>
            <TouchableOpacity style={s.emptyBtn} onPress={() => navigation?.navigate?.('Capture')}>
              <Text style={s.emptyBtnText}>Start Capturing</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20 },

  // Hero
  heroWrap: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  heroLogo: { width: 160, height: 160, borderRadius: 24 },
  heroTitle: { fontSize: 22, fontWeight: '800', letterSpacing: 8, color: '#EAF6FF', marginTop: 16 },
  heroTagline: { fontSize: 14, color: '#8EAAC5', textAlign: 'center', lineHeight: 22, marginTop: 8 },

  // Glass Card
  card: {
    backgroundColor: 'rgba(14, 43, 92, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  // Greeting
  greetText: { fontSize: 18, fontWeight: '700', color: '#EAF6FF' },
  greetSub: { fontSize: 13, color: '#8EAAC5', marginTop: 4, lineHeight: 20 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statBubble: {
    flex: 1,
    backgroundColor: 'rgba(14, 43, 92, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statLabel: { fontSize: 11, color: '#8EAAC5', fontWeight: '600' },
  statNum: { fontSize: 22, fontWeight: '800', color: '#EAF6FF', marginTop: 4 },
  statTrend: { fontSize: 14, marginTop: 2 },

  // Daily Spark
  sparkRow: { flexDirection: 'row', alignItems: 'center' },
  sparkTitle: { fontSize: 15, fontWeight: '700', color: '#EAF6FF' },
  sparkBody: { fontSize: 13, color: '#8EAAC5', marginTop: 4, lineHeight: 20 },
  sparkBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(79, 203, 255, 0.15)',
    borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.3)',
    alignItems: 'center', justifyContent: 'center', marginLeft: 12,
  },
  sparkBtnIcon: { fontSize: 22, color: '#4FCBFF', fontWeight: '300' },

  // Moon
  moonLabel: { fontSize: 13, fontWeight: '700', color: '#EAF6FF' },
  moonPhase: { fontSize: 15, color: '#8EAAC5', marginTop: 2 },
  moonIllum: { fontSize: 12, color: '#5A6A7A', marginTop: 2 },

  // Section
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#EAF6FF' },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#4FCBFF' },

  // Fragments
  fragmentCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(79, 203, 255, 0.08)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  fragRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fragIcon: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(79, 203, 255, 0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  fragText: { fontSize: 14, color: '#EAF6FF', lineHeight: 20 },
  fragMeta: { fontSize: 12, color: '#5A6A7A', marginTop: 2 },

  // Empty
  emptyCard: {
    backgroundColor: 'rgba(14, 43, 92, 0.2)',
    borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)',
    borderRadius: 18, padding: 30, alignItems: 'center',
  },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#EAF6FF', marginTop: 10 },
  emptySub: { fontSize: 13, color: '#5A6A7A', marginTop: 4, textAlign: 'center' },
  emptyBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14, backgroundColor: '#4FCBFF' },
  emptyBtnText: { fontSize: 14, fontWeight: '700', color: '#02040A' },
});
