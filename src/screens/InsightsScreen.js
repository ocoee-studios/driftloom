import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { ZODIAC, MOON_DATA, AFFIRMATIONS, DREAM_WISDOM } from '../constants/data';

export default function InsightsScreen() {
  const { dreams, colors, hasAccess, setShowPaywall, moonPhase } = useApp();
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [selectedMoon, setSelectedMoon] = useState(null);
  const day = new Date().getDay();
  const dayOfMonth = new Date().getDate();

  const total = dreams.length;
  const avgV = total ? Math.round(dreams.reduce((s, d) => s + (d.vivid || 50), 0) / total) : 0;
  const moodFreq = {};
  dreams.forEach(d => { if (d.mood) moodFreq[d.mood] = (moodFreq[d.mood] || 0) + 1; });
  const topMood = Object.entries(moodFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Dream Insights</Text>

        {/* AI Pattern Analysis */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>✨ AI PATTERN ANALYSIS</Text>
          <Text style={[s.body, { color: colors.muted }]}>
            {total === 0 ? 'Log your first dream to unlock AI analysis' : `${total} dreams ready for analysis`}
          </Text>
          <TouchableOpacity style={[s.aiBtn, { backgroundColor: colors.lav }]}
            onPress={() => hasAccess ? null : setShowPaywall(true)}>
            <Text style={s.aiBtnText}>{hasAccess ? '✨ Analyze My Dreams' : '🔒 Unlock AI Analysis'}</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Statistics */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>📊 DREAM STATISTICS</Text>
          <View style={s.statGrid}>
            {[{ l: 'Total', v: total, i: '📝' }, { l: 'Top Mood', v: topMood, i: '🌙' }, { l: 'Avg Vivid', v: avgV + '%', i: '💫' }].map((st, i) => (
              <View key={i} style={[s.statCard, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                <Text style={{ fontSize: 16 }}>{st.i}</Text>
                <Text style={[s.statVal, { color: colors.navy }]}>{st.v}</Text>
                <Text style={{ fontSize: 13, color: colors.muted }}>{st.l}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Mood Timeline */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>🌊 MOOD TIMELINE</Text>
          {total < 3 ? <Text style={{ color: colors.muted, textAlign: 'center' }}>Log 3+ dreams to see your timeline</Text> : (
            <View style={s.timelineRow}>
              {dreams.slice(0, 14).reverse().map((d, i) => {
                const mc = { Happy: '#4ecdc4', Calm: '#6a8cff', Peaceful: '#4FCBFF', Anxious: '#ff6b6b' };
                return <View key={i} style={{ flex: 1, height: (d.vivid || 50) * 0.6, borderRadius: 4, backgroundColor: mc[d.mood] || colors.lav, marginHorizontal: 1 }} />;
              })}
            </View>
          )}
        </GlassCard>

        {/* Pattern Detector */}
        <GlassCard dark>
          <Text style={[s.eyebrow, { color: 'rgba(79,203,255,0.5)' }]}>🔮 PATTERN DETECTOR</Text>
          {total < 3 ? <Text style={{ color: 'rgba(224,216,240,0.4)', textAlign: 'center' }}>Log 3+ dreams to unlock patterns</Text> : (
            <View>
              {[
                { icon: '🎭', t: 'Emotions', d: Object.entries(moodFreq).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([m, c]) => `${m} (${c}×)`).join(', ') || '—', c: '#4FCBFF' },
                { icon: '✨', t: 'Vividness', d: `${avgV}% — ${avgV > 70 ? 'Exceptionally vivid' : avgV > 50 ? 'Above average' : 'Room to grow'}`, c: '#4ecdc4' },
              ].map((p, i) => (
                <View key={i} style={[s.patternRow, { borderColor: 'rgba(255,255,255,0.06)' }]}>
                  <Text style={{ fontSize: 18 }}>{p.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: p.c }}>{p.t}</Text>
                    <Text style={{ fontSize: 13, color: 'rgba(224,216,240,0.5)' }}>{p.d}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </GlassCard>

        {/* Weekly Report */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>📅 THIS WEEK</Text>
          {(() => {
            const recent = dreams.filter(d => (Date.now() - new Date(d.date).getTime()) < 604800000);
            if (!recent.length) return <Text style={{ color: colors.muted, textAlign: 'center' }}>No dreams this week</Text>;
            return (
              <View style={s.statGrid}>
                {[{ l: 'Dreams', v: recent.length, i: '📝' }, { l: 'Vivid', v: Math.round(recent.reduce((s, d) => s + (d.vivid || 50), 0) / recent.length) + '%', i: '✨' }, { l: 'Mood', v: topMood, i: '🎭' }].map((st, i) => (
                  <View key={i} style={[s.statCard, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                    <Text style={{ fontSize: 16 }}>{st.i}</Text>
                    <Text style={[s.statVal, { color: colors.navy }]}>{st.v}</Text>
                    <Text style={{ fontSize: 13, color: colors.muted }}>{st.l}</Text>
                  </View>
                ))}
              </View>
            );
          })()}
        </GlassCard>

        {/* Dream DNA */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>🧬 YOUR DREAM DNA</Text>
          <Text style={{ fontSize: 14, color: colors.deep, textAlign: 'center', lineHeight: 22 }}>
            {total >= 3 ? `Based on ${total} dreams, your emotional signature is ${topMood.toLowerCase()}.` : 'Log 3+ dreams to reveal your Dream DNA.'}
          </Text>
        </GlassCard>

        {/* Affirmation */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>💜 DAILY AFFIRMATION</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', fontStyle: 'italic', color: colors.navy, textAlign: 'center', lineHeight: 30 }}>
            {AFFIRMATIONS[day]}
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 8 }}>New affirmation every day</Text>
        </GlassCard>

        {/* Emotional Landscape */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>🎭 EMOTIONAL LANDSCAPE</Text>
          {total < 2 ? <Text style={{ color: colors.muted, textAlign: 'center' }}>Log 2+ dreams to map emotions</Text> : (
            <View>
              {Object.entries(moodFreq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([mood, count], i) => {
                const max = Object.values(moodFreq).sort((a, b) => b - a)[0] || 1;
                const mc = { Happy: '#4ecdc4', Calm: '#6a8cff', Peaceful: '#4FCBFF', Anxious: '#ff6b6b', Mysterious: '#9b59b6' };
                return (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: colors.navy }}>{mood}</Text>
                      <Text style={{ fontSize: 13, color: colors.muted }}>{count}× · {Math.round(count / total * 100)}%</Text>
                    </View>
                    <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.line }}>
                      <View style={{ height: '100%', width: `${(count / max) * 100}%`, borderRadius: 4, backgroundColor: mc[mood] || colors.lav }} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </GlassCard>

        {/* Achievements */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>🏆 DREAM ACHIEVEMENTS</Text>
          <View style={s.achieveGrid}>
            {[
              { icon: '🌱', name: 'First Dream', req: 1 }, { icon: '🔥', name: '3-Day', req: 3 },
              { icon: '⚡', name: 'Vivid', req: 0, check: dreams.some(d => d.vivid >= 70) },
              { icon: '🌙', name: 'Moon Child', req: 5 }, { icon: '🦋', name: 'Finder', req: 10 },
              { icon: '👑', name: 'Master', req: 30 },
            ].map((a, i) => {
              const unlocked = a.check !== undefined ? a.check : total >= a.req;
              return (
                <View key={i} style={[s.achieveCard, {
                  backgroundColor: unlocked ? 'rgba(79,203,255,0.08)' : colors.glass2,
                  borderColor: unlocked ? 'rgba(79,203,255,0.2)' : colors.line,
                  opacity: unlocked ? 1 : 0.4
                }]}>
                  <Text style={{ fontSize: 24 }}>{a.icon}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: unlocked ? colors.lav : colors.muted, marginTop: 4 }}>{a.name}</Text>
                </View>
              );
            })}
          </View>
        </GlassCard>

        {/* Dream Wisdom */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>📖 DREAM WISDOM</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', fontStyle: 'italic', color: colors.navy, textAlign: 'center', lineHeight: 30 }}>
            "{DREAM_WISDOM[dayOfMonth % DREAM_WISDOM.length].quote}"
          </Text>
          <Text style={{ fontSize: 14, color: colors.lav, fontWeight: '700', textAlign: 'center', marginTop: 8 }}>
            — {DREAM_WISDOM[dayOfMonth % DREAM_WISDOM.length].author}
          </Text>
        </GlassCard>

        {/* Zodiac */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>♈ DREAM ZODIAC</Text>
          <View style={s.zodiacGrid}>
            {ZODIAC.map((z, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedZodiac(selectedZodiac === i ? null : i)}
                style={[s.zodiacCard, {
                  backgroundColor: selectedZodiac === i ? z.color + '15' : colors.glass2,
                  borderColor: selectedZodiac === i ? z.color : colors.line,
                }]}>
                <Text style={{ fontSize: 24 }}>{z.s}</Text>
                <Text style={{ fontSize: 10, fontWeight: '700', color: selectedZodiac === i ? z.color : colors.muted }}>{z.n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedZodiac !== null && (
            <View style={[s.zodiacDetail, { borderColor: ZODIAC[selectedZodiac].color + '33' }]}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{ZODIAC[selectedZodiac].s} {ZODIAC[selectedZodiac].n}</Text>
              <Text style={{ fontSize: 14, color: colors.deep, marginTop: 4 }}>{ZODIAC[selectedZodiac].trait}</Text>
            </View>
          )}
        </GlassCard>

        {/* Moon Journey */}
        <GlassCard>
          <Text style={[s.eyebrow, { color: colors.gold }]}>🌙 THE MOON'S JOURNEY</Text>
          <View style={s.moonGrid}>
            {MOON_DATA.map((m, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedMoon(selectedMoon === i ? null : i)}
                style={[s.moonCard, {
                  backgroundColor: selectedMoon === i ? 'rgba(79,203,255,0.12)' : colors.glass2,
                  borderColor: selectedMoon === i ? colors.lav : i === moonPhase.cycle ? colors.gold : colors.line,
                }]}>
                <Text style={{ fontSize: 24 }}>{['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'][i]}</Text>
                <Text style={{ fontSize: 9, fontWeight: '700', color: selectedMoon === i ? colors.lav : colors.muted, textAlign: 'center' }}>{m.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedMoon !== null && (
            <View style={[s.moonDetail, { borderColor: 'rgba(79,203,255,0.15)' }]}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{MOON_DATA[selectedMoon].name}</Text>
              <Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22, marginTop: 4 }}>{MOON_DATA[selectedMoon].desc}</Text>
              <Text style={{ fontSize: 13, color: colors.gold, fontStyle: 'italic', marginTop: 6 }}>💡 {MOON_DATA[selectedMoon].dream}</Text>
            </View>
          )}
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
  body: { fontSize: 14, textAlign: 'center', marginBottom: 12 },
  aiBtn: { padding: 14, borderRadius: 16, alignItems: 'center' },
  aiBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },
  statGrid: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 0.5 },
  statVal: { fontSize: 18, fontWeight: '700' },
  timelineRow: { flexDirection: 'row', height: 60, alignItems: 'flex-end' },
  patternRow: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 0.5, marginBottom: 8 },
  achieveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achieveCard: { width: '31%', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1 },
  zodiacGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  zodiacCard: { width: '23%', alignItems: 'center', padding: 8, borderRadius: 14, borderWidth: 0.5 },
  zodiacDetail: { marginTop: 10, padding: 12, borderRadius: 14, borderWidth: 1 },
  moonGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moonCard: { width: '23%', alignItems: 'center', padding: 10, borderRadius: 16, borderWidth: 0.5 },
  moonDetail: { marginTop: 10, padding: 14, borderRadius: 16, borderWidth: 0.5 },
});
