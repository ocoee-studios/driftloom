import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { SLEEP_STAGES, DREAM_DICT, DICT_CATEGORIES } from '../constants/data';
import Svg, { Circle } from 'react-native-svg';

export default function DreamsScreen() {
  const { dreams, colors, checks, setChecks, moonPhase, checkin } = useApp();
  const [section, setSection] = useState('overview');
  const [dictSearch, setDictSearch] = useState('');
  const [dictCat, setDictCat] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const total = dreams.length;

  const sections = [
    { id: 'overview', label: '🌙 Overview' },
    { id: 'cycles', label: '💤 Sleep' },
    { id: 'lucid', label: '◌ Lucid' },
    { id: 'dict', label: '❋ Dictionary' },
  ];

  const filteredDict = DREAM_DICT.filter(d => {
    if (dictCat !== 'all' && d.cat !== dictCat) return false;
    if (dictSearch && !d.term.toLowerCase().includes(dictSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Dreams</Text>

        {/* Section Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {sections.map(sec => (
              <TouchableOpacity key={sec.id} onPress={() => setSection(sec.id)}
                style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                  borderWidth: section === sec.id ? 1.5 : 1,
                  borderColor: section === sec.id ? '#4FCBFF' : colors.line,
                  backgroundColor: section === sec.id ? 'rgba(79,203,255,0.08)' : 'transparent' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: section === sec.id ? '#4FCBFF' : '#5A6A7A' }}>{sec.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Overview */}
        {section === 'overview' && (<>
          <GlassCard dark>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Svg width={60} height={60} viewBox="0 0 60 60" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx={30} cy={30} r={25} fill="none" stroke="rgba(79,203,255,0.1)" strokeWidth={5} />
                <Circle cx={30} cy={30} r={25} fill="none" stroke="#4FCBFF" strokeWidth={5}
                  strokeLinecap="round" strokeDasharray={`${Math.round(total*5)} 157`} />
              </Svg>
              <View>
                <Text style={{ fontSize: 10, fontWeight: '800', color: 'rgba(79,203,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>Dream Score</Text>
                <Text style={{ fontSize: 13, color: '#5A6A7A' }}>{total} dreams · {Math.min(100, total * 7)} pts</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard>
            <Text style={s.lg}>🏆 ACHIEVEMENTS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {[{i:'🌱',n:'First Dream',r:1},{i:'🔥',n:'3-Day Streak',r:3},{i:'⚡',n:'Vivid Dreamer',r:0,check:dreams.some(d=>d.vivid>=70)},{i:'🌙',n:'Moon Child',r:5},{i:'🦋',n:'Pattern Finder',r:10},{i:'👑',n:'Dream Master',r:30}].map((a,i) => {
                const unlocked = a.check !== undefined ? a.check : total >= a.r;
                return (
                  <View key={i} style={{ width: '31%', alignItems: 'center', padding: 12, borderRadius: 16,
                    backgroundColor: unlocked ? 'rgba(79,203,255,0.08)' : colors.glass2,
                    borderWidth: 0.5, borderColor: unlocked ? 'rgba(79,203,255,0.2)' : colors.line,
                    opacity: unlocked ? 1 : 0.4 }}>
                    <Text style={{ fontSize: 24 }}>{a.i}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: unlocked ? '#4FCBFF' : '#5A6A7A', marginTop: 4 }}>{a.n}</Text>
                  </View>
                );
              })}
            </View>
          </GlassCard>
        </>)}

        {/* Sleep Cycles */}
        {section === 'cycles' && (<>
          <GlassCard>
            <Text style={s.lg}>ARCHITECTURE OF SLEEP</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[{l:'Light',i:'🌊',c:'#4FCBFF'},{l:'Deep',i:'🌑',c:'#0E2B5C'},{l:'REM',i:'✨',c:'#4FCBFF'},{l:'Recall',i:'💫',c:'#d4a44c'}].map((r,i) => (
                <View key={i} style={{ flex: 1, alignItems: 'center', padding: 14, borderRadius: 18, backgroundColor: colors.glass2, borderWidth: 0.5, borderColor: colors.line }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: r.c, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                    <Text style={{ fontSize: 18 }}>{r.i}</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.navy }}>{r.l}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

          {SLEEP_STAGES.map((stage, i) => (
            <View key={i} style={{ backgroundColor: colors.glass, borderWidth: 0.5, borderColor: colors.line, borderRadius: 18, marginBottom: 12, overflow: 'hidden' }}>
              <View style={{ height: 3, backgroundColor: stage.color }} />
              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: stage.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{stage.icon}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: colors.navy }}>{stage.name}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: stage.color, textTransform: 'uppercase', letterSpacing: 1 }}>{stage.sub}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 13, color: '#C7D0DB', lineHeight: 20, marginBottom: 8 }}>{stage.body}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {stage.tags.map((t, j) => (
                    <View key={j} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: colors.glass2, borderWidth: 0.5, borderColor: colors.line }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#C7D0DB' }}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </>)}

        {/* Lucid */}
        {section === 'lucid' && (<>
          <GlassCard>
            <Text style={s.lg}>WHAT IS LUCID DREAMING?</Text>
            <Text style={{ fontSize: 14, color: '#C7D0DB', textAlign: 'center', lineHeight: 22, marginBottom: 14 }}>
              A lucid dream is when you realize you are dreaming while still inside the dream.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[{v:'55%',l:'have had one'},{v:'23%',l:'monthly'},{v:'11%',l:'weekly'}].map((s2,i) => (
                <View key={i} style={{ flex: 1, alignItems: 'center', padding: 10, borderRadius: 14, backgroundColor: colors.glass2, borderWidth: 0.5, borderColor: colors.line }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#4FCBFF' }}>{s2.v}</Text>
                  <Text style={{ fontSize: 12, color: '#5A6A7A' }}>{s2.l}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

          <GlassCard>
            <Text style={s.lg}>REALITY CHECKS</Text>
            {['Look at your hands','Read text twice','Push finger through palm','Check the time'].map((r,i) => (
              <TouchableOpacity key={i} onPress={() => { const n=[...checks];n[i]=!n[i];setChecks(n); }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: colors.line }}>
                <View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#4FCBFF',
                  alignItems: 'center', justifyContent: 'center', backgroundColor: checks[i] ? '#4FCBFF' : 'transparent' }}>
                  {checks[i] && <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>✓</Text>}
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy }}>{r}</Text>
              </TouchableOpacity>
            ))}
          </GlassCard>

          {[{n:'MILD',i:'🧠',f:'Mnemonic Induction',d:'As you fall asleep, repeat: "Next time I dream, I will realize I am dreaming."'},
            {n:'WILD',i:'👁',f:'Wake Initiated',d:'Stay conscious as your body falls asleep. Focus on hypnagogic imagery.'},
            {n:'WBTB',i:'⏰',f:'Wake Back To Bed',d:'Alarm at 5 hours. Stay awake 20 min. Sleep with lucid intent.'}].map((t,i) => (
            <GlassCard key={i}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#4FCBFF', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>{t.i}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: colors.navy }}>{t.n}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#4FCBFF', textTransform: 'uppercase', letterSpacing: 1 }}>{t.f}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#C7D0DB', lineHeight: 22 }}>{t.d}</Text>
            </GlassCard>
          ))}
        </>)}

        {/* Dictionary */}
        {section === 'dict' && (<>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 14,
            borderWidth: 1, borderColor: colors.line, backgroundColor: colors.glass, marginBottom: 12 }}>
            <Text>🔍</Text>
            <TextInput style={{ flex: 1, fontSize: 14, color: colors.navy }}
              placeholder="Search 36 symbols..." placeholderTextColor="#5A6A7A"
              value={dictSearch} onChangeText={t => { setDictSearch(t); setExpanded(null); }} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {DICT_CATEGORIES.map(c => (
                <TouchableOpacity key={c.id} onPress={() => { setDictCat(c.id); setExpanded(null); }}
                  style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99,
                    borderWidth: dictCat === c.id ? 1.5 : 1,
                    borderColor: dictCat === c.id ? '#4FCBFF' : colors.line }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: dictCat === c.id ? '#4FCBFF' : '#5A6A7A' }}>{c.icon} {c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text style={{ fontSize: 12, color: '#5A6A7A', marginBottom: 8 }}>{filteredDict.length} entries</Text>

          {filteredDict.map(d => (
            <TouchableOpacity key={d.term} onPress={() => setExpanded(expanded === d.term ? null : d.term)}
              style={{ padding: 14, borderRadius: 16, backgroundColor: colors.glass, borderWidth: 0.5, borderColor: colors.line, marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.glass2, borderWidth: 0.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>{d.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{d.term}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#4FCBFF', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {DICT_CATEGORIES.find(c => c.id === d.cat)?.label || d.cat}
                  </Text>
                </View>
                <Text style={{ color: '#5A6A7A', transform: [{ rotate: expanded === d.term ? '180deg' : '0deg' }] }}>▼</Text>
              </View>
              {expanded === d.term && (
                <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.line }}>
                  <Text style={{ fontSize: 14, color: '#C7D0DB', lineHeight: 22 }}>{d.meaning}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </>)}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  lg: { fontSize: 10, fontWeight: '700', color: '#d4a44c', letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 },
});
