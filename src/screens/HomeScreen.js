import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const APP_LOGO = require('../../assets/brand/driftloom-logo.png');

export default function HomeScreen({ navigation }) {
  const { fragments } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const fragCount = (fragments || []).length;
  const signals = fragCount >= 5 ? Math.floor(fragCount / 5) : 0;
  const iconFor = { text: '📝', link: '🔗', spark: '💡' };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={s.heroWrap}>
          <Image source={APP_LOGO} style={s.heroLogo} resizeMode="contain" />
          <Text style={s.heroTitle}>DRIFTLOOM</Text>
          <Text style={s.heroTagline}>Capture the fragments.{'\n'}Find the pattern.{'\n'}Turn creative drift into direction.</Text>
        </View>

        {/* Greeting */}
        <View style={s.card}>
          <Text style={s.greetText}>{greeting} ✨</Text>
          <Text style={s.greetSub}>
            {fragCount > 0
              ? `${fragCount} fragments in your loom. Keep capturing to reveal patterns.`
              : 'Capture your stray ideas to start finding patterns.'}
          </Text>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statBubble}><Text style={s.statLabel}>Fragments</Text><Text style={s.statNum}>{fragCount}</Text></View>
          <View style={s.statBubble}><Text style={s.statLabel}>Day Streak</Text><Text style={s.statNum}>0 🔥</Text></View>
          <View style={s.statBubble}><Text style={s.statLabel}>Signals</Text><Text style={s.statNum}>{signals}</Text></View>
        </View>

        {/* Daily Spark */}
        <View style={s.card}>
          <View style={s.sparkRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.sparkTitle}>Daily Spark</Text>
              <Text style={s.sparkBody}>What idea or problem keeps returning for you?</Text>
            </View>
            <TouchableOpacity style={s.sparkBtn} onPress={() => navigation?.navigate?.('Capture')}>
              <Text style={s.sparkBtnIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Fragments */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Fragments</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Vault')}>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {(fragments || []).slice(0, 4).map((item, i) => (
          <View key={item.id || i} style={s.fragmentCard}>
            <View style={s.fragRow}>
              <View style={s.fragIcon}><Text style={{ fontSize: 16 }}>{iconFor[item.type] || '💡'}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.fragText} numberOfLines={2}>{item.title || item.text || 'Fragment'}</Text>
                <Text style={s.fragMeta}>{item.date || 'Just now'}</Text>
              </View>
            </View>
          </View>
        ))}

        {(fragments || []).length === 0 && (
          <View style={s.emptyCard}>
            <Text style={{ fontSize: 28 }}>💡</Text>
            <Text style={s.emptyText}>Your loom is empty</Text>
            <Text style={s.emptySub}>Drop a fragment — a note, link, or stray idea — to begin</Text>
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
  heroWrap: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  heroLogo: { width: 160, height: 160, borderRadius: 24 },
  heroTitle: { fontSize: 22, fontWeight: '800', letterSpacing: 8, color: '#EAF6FF', marginTop: 16 },
  heroTagline: { fontSize: 14, color: '#8EAAC5', textAlign: 'center', lineHeight: 22, marginTop: 8 },
  card: { backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)', borderRadius: 18, padding: 18, marginBottom: 12 },
  greetText: { fontSize: 18, fontWeight: '700', color: '#EAF6FF' },
  greetSub: { fontSize: 13, color: '#8EAAC5', marginTop: 4, lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statBubble: { flex: 1, backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)', borderRadius: 16, padding: 14, alignItems: 'center' },
  statLabel: { fontSize: 11, color: '#8EAAC5', fontWeight: '600' },
  statNum: { fontSize: 22, fontWeight: '800', color: '#EAF6FF', marginTop: 4 },
  sparkRow: { flexDirection: 'row', alignItems: 'center' },
  sparkTitle: { fontSize: 15, fontWeight: '700', color: '#EAF6FF' },
  sparkBody: { fontSize: 13, color: '#8EAAC5', marginTop: 4, lineHeight: 20 },
  sparkBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(79, 203, 255, 0.15)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.3)', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  sparkBtnIcon: { fontSize: 22, color: '#4FCBFF', fontWeight: '300' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#EAF6FF' },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#4FCBFF' },
  fragmentCard: { backgroundColor: 'rgba(14, 43, 92, 0.25)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)', borderRadius: 14, padding: 14, marginBottom: 8 },
  fragRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fragIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(79, 203, 255, 0.1)', alignItems: 'center', justifyContent: 'center' },
  fragText: { fontSize: 14, color: '#EAF6FF', lineHeight: 20 },
  fragMeta: { fontSize: 12, color: '#5A6A7A', marginTop: 2 },
  emptyCard: { backgroundColor: 'rgba(14, 43, 92, 0.2)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)', borderRadius: 18, padding: 30, alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#EAF6FF', marginTop: 10 },
  emptySub: { fontSize: 13, color: '#5A6A7A', marginTop: 4, textAlign: 'center' },
  emptyBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14, backgroundColor: '#4FCBFF' },
  emptyBtnText: { fontSize: 14, fontWeight: '700', color: '#02040A' },
});
