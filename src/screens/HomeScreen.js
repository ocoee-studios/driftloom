import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { FEELINGS, DAILY_SYMBOLS, DREAM_FACTS, CLOUD_ROOMS, SLEEP_SOUNDS } from '../constants/data';
import Svg, { Circle } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  const { dreams, moonPhase, colors, checkin, setCheckin, checkinDone, setCheckinDone,
    dailyMood, setDailyMood, hasAccess, setShowPaywall } = useApp();
  const [dreamSearch, setDreamSearch] = useState('');
  const [showCheckin, setShowCheckin] = useState(false);
  const day = new Date().getDay();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <Text style={[s.brand, { color: colors.lav }]}>DRIFTLOOM</Text>
          <Text style={[s.headerTitle, { color: colors.navy }]}>Dream Journal</Text>
        </View>

        {/* Hero */}
        <GlassCard>
          <Text style={[s.greeting, { color: colors.navy }]}>{greeting}, dreamer</Text>
          <Text style={[s.heroSub, { color: colors.muted }]}>
            {moonPhase.emoji} {moonPhase.name} · {dreams.length} dreams captured
          </Text>
          <View style={s.heroButtons}>
            <TouchableOpacity style={[s.heroBtn, { backgroundColor: colors.lav }]}
              onPress={() => navigation.navigate('Journal')}>
              <Text style={s.heroBtnText}>✍️ Write Dream</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.heroBtnSec, { borderColor: colors.line }]}
              onPress={() => navigation.navigate('Journal')}>
              <Text style={[s.heroBtnSecText, { color: colors.muted }]}>🎙 Record</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Dream Score */}
        <GlassCard dark>
          <View style={s.scoreRow}>
            <View style={s.scoreRing}>
              <Svg width={60} height={60} viewBox="0 0 60 60" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx={30} cy={30} r={25} fill="none" stroke="rgba(79,203,255,0.1)" strokeWidth={5} />
                <Circle cx={30} cy={30} r={25} fill="none" stroke="#4FCBFF" strokeWidth={5}
                  strokeLinecap="round" strokeDasharray={`${Math.round(dreams.length*5)} 157`} />
              </Svg>
              <Text style={s.scoreNum}>{Math.min(100, dreams.length * 7)}</Text>
            </View>
            <View>
              <Text style={s.scoreLabel}>Dream Score</Text>
              <Text style={s.scoreSub}>{dreams.length} dreams logged</Text>
            </View>
          </View>
        </GlassCard>

        {/* Symbol of Day + Dream Fact */}
        <GlassCard>
          <View style={s.symbolRow}>
            <View style={[s.symbolIcon, { backgroundColor: 'rgba(79,203,255,0.08)' }]}>
              <Text style={{ fontSize: 24 }}>{DAILY_SYMBOLS[day].icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.eyebrow, { color: colors.gold }]}>SYMBOL OF THE DAY</Text>
              <Text style={[s.symbolMsg, { color: colors.navy }]}>{DAILY_SYMBOLS[day].msg}</Text>
            </View>
          </View>
          <View style={[s.divider, { borderColor: colors.line }]} />
          <Text style={[s.eyebrow, { color: colors.gold }]}>💡 DREAM FACT</Text>
          <Text style={[s.factText, { color: colors.deep }]}>{DREAM_FACTS[day]}</Text>
        </GlassCard>

        {/* Moon Phase */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold, textAlign: 'center' }]}>🌙 MOON PHASE</Text>
          <Text style={[s.moonName, { color: colors.navy }]}>{moonPhase.emoji} {moonPhase.name}</Text>
        </GlassCard>

        {/* Daily Check-in */}
        <TouchableOpacity onPress={() => setShowCheckin(!showCheckin)}>
          <GlassCard>
            <View style={s.checkinHeader}>
              <Text style={[s.checkinTitle, { color: colors.navy }]}>🌤 Daily Check-in</Text>
              <Text style={{ color: colors.muted }}>{checkinDone ? '✓' : showCheckin ? '−' : '+'}</Text>
            </View>
            {showCheckin && (
              <View style={{ marginTop: 12 }}>
                <Text style={[s.formLabel, { color: colors.gold }]}>HOW ARE YOU FEELING?</Text>
                <View style={s.feelGrid}>
                  {FEELINGS.map(f => (
                    <TouchableOpacity key={f.label} onPress={() => setCheckin({ ...checkin, feeling: f.label })}
                      style={[s.feelCard, {
                        backgroundColor: checkin.feeling === f.label ? 'rgba(79,203,255,0.12)' : colors.glass2,
                        borderColor: checkin.feeling === f.label ? colors.lav : colors.line,
                        borderWidth: checkin.feeling === f.label ? 1.5 : 0.5,
                      }]}>
                      <Text style={{ fontSize: 20 }}>{f.emoji}</Text>
                      <Text style={[s.feelLabel, { color: checkin.feeling === f.label ? colors.lav : colors.muted }]}>{f.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.lav }]}
                  onPress={() => { setCheckinDone(true); setShowCheckin(false); }}>
                  <Text style={s.saveBtnText}>Save Check-in</Text>
                </TouchableOpacity>
              </View>
            )}
          </GlassCard>
        </TouchableOpacity>

        {/* Sleep Sounds */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold, textAlign: 'center', marginBottom: 10 }]}>🎵 SLEEP SOUNDS</Text>
          <View style={s.soundGrid}>
            {SLEEP_SOUNDS.map((snd, i) => (
              <View key={i} style={[s.soundCard, { backgroundColor: snd.color + '10', borderColor: snd.color + '22' }]}>
                <Text style={{ fontSize: 22 }}>{snd.icon}</Text>
                <Text style={[s.soundName, { color: snd.color }]}>{snd.name}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Cloud Rooms */}
        <GlassCard dark>
          <Text style={[s.eyebrow, { color: 'rgba(224,216,240,0.4)', textAlign: 'center', marginBottom: 10 }]}>☁️ CLOUD ROOM</Text>
          <Text style={[s.cloudTitle, { color: '#EAF6FF' }]}>Step into your mood</Text>
          <View style={s.cloudGrid}>
            {CLOUD_ROOMS.map((room, i) => (
              <TouchableOpacity key={i} style={[s.cloudCard, { backgroundColor: room.color + '10', borderColor: room.color + '22' }]}>
                <Text style={{ fontSize: 22 }}>{room.icon}</Text>
                <Text style={[s.cloudName, { color: room.color }]}>{room.name}</Text>
                <Text style={s.cloudDesc}>{room.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Morning Glow */}
        {hour < 12 && (
          <GlassCard>
            <Text style={[s.eyebrow, { color: colors.gold, textAlign: 'center' }]}>🌅 MORNING GLOW</Text>
            <Text style={[s.morningTitle, { color: colors.navy }]}>Good morning, dreamer</Text>
            <Text style={[s.morningBody, { color: colors.deep }]}>
              {dreams.length > 0 ? `Your last dream was "${dreams[0]?.title || 'a dream'}" — what did your sleeping mind create?` : 'A new day, a new dream waiting to be remembered.'}
            </Text>
          </GlassCard>
        )}

        {/* Dream Weather */}
        <GlassCard>
          <View style={s.weatherHeader}>
            <Text style={[s.eyebrow, { color: colors.gold }]}>🌤 DREAM WEATHER</Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>{new Date().toLocaleDateString(undefined, { weekday: 'long' })}</Text>
          </View>
          <Text style={[s.weatherBody, { color: colors.deep }]}>
            {["Sunday dreams are reflective — processing the week.","Monday dreams carry weekend energy. Good for vivid imagery.","Tuesday is peak creativity night. Set a bold intention.","Midweek dreams process stress and decisions.","Thursday dreams preview the weekend ahead.","Friday dreams are the most vivid of the week.","Saturday: no alarms, longer REM. Your best recall day."][day]}
          </Text>
        </GlassCard>

        {/* Search */}
        <View style={[s.searchWrap, { borderColor: colors.line, backgroundColor: colors.glass }]}>
          <Text style={{ marginRight: 8 }}>🔍</Text>
          <TextInput style={[s.searchInput, { color: colors.navy }]} placeholder="Search your dreams..." placeholderTextColor={colors.muted}
            value={dreamSearch} onChangeText={setDreamSearch} />
        </View>

        {/* Dream Entries */}
        <View style={s.dreamHeader}>
          <Text style={[s.dreamTitle, { color: colors.navy }]}>Your Dreams</Text>
          <Text style={{ fontSize: 13, color: colors.muted }}>{dreams.length} entries</Text>
        </View>
        {dreams.filter(d => {
          if (!dreamSearch) return true;
          const q = dreamSearch.toLowerCase();
          return (d.title||'').toLowerCase().includes(q) || (d.notes||'').toLowerCase().includes(q);
        }).map((d, i) => (
          <TouchableOpacity key={i} onPress={() => { navigation.navigate('Journal'); }}
            style={[s.dreamCard, { backgroundColor: colors.glass, borderColor: colors.line }]}>
            <View style={s.dreamCardHeader}>
              <Text style={[s.dreamCardTitle, { color: colors.navy }]}>{d.title || 'Untitled Dream'}</Text>
              <Text style={{ fontSize: 13, color: colors.muted }}>{d.date || ''}</Text>
            </View>
            <Text style={[s.dreamCardPreview, { color: colors.deep }]} numberOfLines={2}>{d.notes || ''}</Text>
            <View style={s.dreamCardMeta}>
              <View style={[s.dreamCardPill, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                <Text style={{ fontSize: 13, color: colors.deep }}>🌙 {d.mood || '—'}</Text>
              </View>
              <Text style={{ fontSize: 13, color: colors.muted }}>✨ {d.vivid || 50}%</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  header: { marginBottom: 16 },
  brand: { fontSize: 11, fontWeight: '800', letterSpacing: 3, textTransform: 'uppercase' },
  headerTitle: { fontSize: 28, fontWeight: '700' },
  greeting: { fontSize: 26, fontWeight: '700', marginBottom: 4 },
  heroSub: { fontSize: 14, marginBottom: 16 },
  heroButtons: { flexDirection: 'row', gap: 10 },
  heroBtn: { flex: 1, padding: 14, borderRadius: 14, alignItems: 'center' },
  heroBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },
  heroBtnSec: { flex: 1, padding: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1 },
  heroBtnSecText: { fontWeight: '700', fontSize: 15 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  scoreRing: { width: 60, height: 60, position: 'relative' },
  scoreNum: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, textAlign: 'center', textAlignVertical: 'center', fontSize: 20, fontWeight: '700', color: '#EAF6FF', lineHeight: 60 },
  scoreLabel: { fontSize: 13, fontWeight: '800', color: 'rgba(79,203,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' },
  scoreSub: { fontSize: 13, color: 'rgba(224,216,240,0.4)' },
  symbolRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  symbolIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  symbolMsg: { fontSize: 14, fontWeight: '700' },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  factText: { fontSize: 14, lineHeight: 22 },
  divider: { borderBottomWidth: 1, marginVertical: 10 },
  moonName: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  checkinHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkinTitle: { fontSize: 16, fontWeight: '700' },
  formLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  feelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  feelCard: { width: '30%', alignItems: 'center', padding: 12, borderRadius: 14 },
  feelLabel: { fontSize: 12, fontWeight: '700', marginTop: 4 },
  saveBtn: { padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 16 },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },
  soundGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  soundCard: { width: '23%', alignItems: 'center', padding: 10, borderRadius: 14, borderWidth: 0.5 },
  soundName: { fontSize: 13, fontWeight: '700', marginTop: 3 },
  cloudTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  cloudGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cloudCard: { width: '31%', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 0.5 },
  cloudName: { fontSize: 13, fontWeight: '700', marginTop: 3 },
  cloudDesc: { fontSize: 13, color: 'rgba(224,216,240,0.3)' },
  morningTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 10 },
  morningBody: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  weatherHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  weatherBody: { fontSize: 14, lineHeight: 22 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14 },
  dreamHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dreamTitle: { fontSize: 16, fontWeight: '700' },
  dreamCard: { padding: 14, borderRadius: 18, borderWidth: 0.5, marginBottom: 10 },
  dreamCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  dreamCardTitle: { fontSize: 16, fontWeight: '700', flex: 1 },
  dreamCardPreview: { fontSize: 13, lineHeight: 20, marginBottom: 8 },
  dreamCardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dreamCardPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, borderWidth: 0.5 },
});
