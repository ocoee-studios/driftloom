import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { MOODS } from '../constants/data';

export default function JournalScreen() {
  const { dream, setDream, saveDream, deleteDream, editingIdx, colors, hasAccess, setShowPaywall,
    aiResult, setAiResult, aiLoading, setAiLoading, moonPhase } = useApp();
  const [sections, setSections] = useState({ mood: false, world: false, chars: false, powers: false });

  const genres = [["🎬","Thriller"],["💕","Romance"],["🚀","Sci-Fi"],["🧙","Fantasy"],["😂","Comedy"],["👻","Horror"],["🔍","Mystery"],["⚔️","Adventure"],["🎭","Drama"],["🌀","Surreal"]];
  const wakeFeelings = [["😊","Refreshed"],["😌","Peaceful"],["🤔","Confused"],["😰","Unsettled"],["😢","Emotional"],["⚡","Energized"],["😴","Groggy"],["🤩","Inspired"]];
  const roles = [["🧑","Myself"],["🎭","Other"],["👁","Observer"],["🌀","Shifting"],["👻","Invisible"]];

  const toggleSection = (key) => setSections(s => ({ ...s, [key]: !s[key] }));

  const handleAI = async () => {
    if (!hasAccess) { setShowPaywall(true); return; }
    if (!dream.notes) { Alert.alert('Write your dream first'); return; }
    setAiLoading(true);
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 600,
          messages: [{ role: 'user', content: `You are a gentle dream reader. Give a personal reading of this dream. Focus on one key symbol and the emotional core. 2 short paragraphs.\n\nDream: ${dream.notes}\nMood: ${dream.mood}\nVividness: ${dream.vivid}%` }],
        }),
      });
      const data = await r.json();
      setAiResult(data.content?.[0]?.text || 'Could not interpret.');
    } catch { setAiResult('Connection error.'); }
    setAiLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>
          {editingIdx !== null ? 'Edit Dream' : 'New Dream'}
        </Text>

        {/* Title */}
        <GlassCard>
          <Text style={[s.label, { color: colors.gold }]}>DREAM TITLE</Text>
          <TextInput style={[s.input, { color: colors.navy, borderColor: colors.line }]}
            placeholder="Name your dream..." placeholderTextColor={colors.muted}
            value={dream.title} onChangeText={t => setDream({ ...dream, title: t })} />
        </GlassCard>

        {/* Notes */}
        <GlassCard>
          <Text style={[s.label, { color: colors.gold }]}>WHAT HAPPENED?</Text>
          <TextInput style={[s.textarea, { color: colors.navy, borderColor: colors.line }]}
            placeholder="Describe your dream..." placeholderTextColor={colors.muted} multiline
            value={dream.notes} onChangeText={t => setDream({ ...dream, notes: t })} />
        </GlassCard>

        {/* Mood */}
        <GlassCard>
          <Text style={[s.label, { color: colors.gold }]}>HOW DID IT FEEL?</Text>
          <View style={s.moodGrid}>
            {MOODS.map(m => (
              <TouchableOpacity key={m} onPress={() => setDream({ ...dream, mood: dream.mood === m ? '' : m })}
                style={[s.moodCard, {
                  backgroundColor: dream.mood === m ? 'rgba(79,203,255,0.12)' : 'transparent',
                  borderColor: dream.mood === m ? colors.lav : colors.line,
                  borderWidth: dream.mood === m ? 2 : 1,
                }]}>
                <Text style={[s.moodText, { color: dream.mood === m ? colors.lav : colors.navy }]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Vividness */}
        <GlassCard>
          <Text style={[s.label, { color: colors.gold }]}>VIVIDNESS: {dream.vivid}%</Text>
          <View style={s.vividBar}>
            <View style={[s.vividFill, { width: `${dream.vivid}%`, backgroundColor: colors.lav }]} />
          </View>
          <View style={s.vividRow}>
            {[20,40,60,80,100].map(v => (
              <TouchableOpacity key={v} onPress={() => setDream({ ...dream, vivid: v })}>
                <Text style={{ fontSize: 13, color: dream.vivid === v ? colors.lav : colors.muted }}>{v}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Symbols */}
        <GlassCard>
          <Text style={[s.label, { color: colors.gold }]}>SYMBOLS & TAGS</Text>
          <TextInput style={[s.input, { color: colors.navy, borderColor: colors.line }]}
            placeholder="water, flying, forest..." placeholderTextColor={colors.muted}
            value={dream.tags} onChangeText={t => setDream({ ...dream, tags: t })} />
        </GlassCard>

        {/* Mood & Feeling Group */}
        <TouchableOpacity onPress={() => toggleSection('mood')}
          style={[s.group, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
          <View style={s.groupHead}>
            <Text style={[s.groupTitle, { color: colors.navy }]}>🎭 Mood & Feeling</Text>
            <Text style={{ color: colors.muted }}>{sections.mood ? '−' : '+'}</Text>
          </View>
        </TouchableOpacity>
        {sections.mood && (
          <GlassCard>
            <Text style={[s.label, { color: colors.gold }]}>DREAM GENRE</Text>
            <View style={s.iconGrid5}>
              {genres.map(([icon, name]) => (
                <TouchableOpacity key={name} onPress={() => setDream({ ...dream, genre: dream.genre === name ? '' : name })}
                  style={[s.iconCard, {
                    backgroundColor: dream.genre === name ? 'rgba(79,203,255,0.12)' : colors.glass2,
                    borderColor: dream.genre === name ? colors.lav : colors.line,
                  }]}>
                  <Text style={{ fontSize: 18 }}>{icon}</Text>
                  <Text style={[s.iconLabel, { color: dream.genre === name ? colors.lav : colors.muted }]}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[s.label, { color: colors.gold, marginTop: 16 }]}>WAKE FEELING</Text>
            <View style={s.iconGrid4}>
              {wakeFeelings.map(([icon, name]) => (
                <TouchableOpacity key={name} onPress={() => setDream({ ...dream, wakeFeel: dream.wakeFeel === name ? '' : name })}
                  style={[s.iconCard, {
                    backgroundColor: dream.wakeFeel === name ? 'rgba(79,203,255,0.12)' : colors.glass2,
                    borderColor: dream.wakeFeel === name ? colors.lav : colors.line,
                  }]}>
                  <Text style={{ fontSize: 18 }}>{icon}</Text>
                  <Text style={[s.iconLabel, { color: dream.wakeFeel === name ? colors.lav : colors.muted }]}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[s.label, { color: colors.gold, marginTop: 16 }]}>YOUR ROLE</Text>
            <View style={s.iconGrid5}>
              {roles.map(([icon, name]) => (
                <TouchableOpacity key={name} onPress={() => setDream({ ...dream, dreamRole: dream.dreamRole === name ? '' : name })}
                  style={[s.iconCard, {
                    backgroundColor: dream.dreamRole === name ? 'rgba(79,203,255,0.12)' : colors.glass2,
                    borderColor: dream.dreamRole === name ? colors.lav : colors.line,
                  }]}>
                  <Text style={{ fontSize: 18 }}>{icon}</Text>
                  <Text style={[s.iconLabel, { color: dream.dreamRole === name ? colors.lav : colors.muted }]}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>
        )}

        {/* Save */}
        <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.lav }]} onPress={saveDream}>
          <Text style={s.saveBtnText}>💾 Save Dream</Text>
        </TouchableOpacity>

        {/* AI Interpret */}
        <TouchableOpacity style={[s.aiBtn, { borderColor: colors.lav }]} onPress={handleAI}>
          <Text style={[s.aiBtnText, { color: colors.lav }]}>
            {aiLoading ? '🔮 Reading...' : '🔮 Read This Dream'}
          </Text>
        </TouchableOpacity>
        {aiResult ? <GlassCard><Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22 }}>{aiResult}</Text></GlassCard> : null}

        {/* Dream Card */}
        <GlassCard dark>
          <Text style={s.cardLabel}>✨ Dream Card</Text>
          <View style={s.dreamCardPreview}>
            <Text style={{ fontSize: 16 }}>{moonPhase.emoji}</Text>
            <Text style={s.cardTitle}>{dream.title || 'Untitled Dream'}</Text>
            <Text style={s.cardExcerpt}>"{(dream.notes || '').slice(0, 80)}{dream.notes?.length > 80 ? '...' : ''}"</Text>
            <Text style={s.cardMeta}>🌙 {dream.mood || '—'} · ✨ {dream.vivid}% vivid</Text>
            <Text style={s.cardBrand}>dreamed with DriftLoom</Text>
          </View>
        </GlassCard>

        {/* Delete */}
        {editingIdx !== null && (
          <TouchableOpacity onPress={() => Alert.alert('Delete?', 'This cannot be undone.', [
            { text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: deleteDream }
          ])}>
            <Text style={s.deleteText}>🗑 Delete this dream</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 14, padding: 12, fontSize: 15 },
  textarea: { borderWidth: 1, borderRadius: 14, padding: 12, fontSize: 15, minHeight: 120, textAlignVertical: 'top' },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodCard: { width: '31%', padding: 10, borderRadius: 12, alignItems: 'center' },
  moodText: { fontSize: 13, fontWeight: '700' },
  vividBar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(79,203,255,0.1)', marginBottom: 8 },
  vividFill: { height: '100%', borderRadius: 4 },
  vividRow: { flexDirection: 'row', justifyContent: 'space-between' },
  group: { borderRadius: 18, borderWidth: 0.5, marginBottom: 8, overflow: 'hidden' },
  groupHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  groupTitle: { fontSize: 15, fontWeight: '700' },
  iconGrid5: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  iconGrid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  iconCard: { width: '18%', alignItems: 'center', padding: 10, borderRadius: 14, borderWidth: 0.5 },
  iconLabel: { fontSize: 9, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  saveBtn: { padding: 16, borderRadius: 18, alignItems: 'center', marginBottom: 10 },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  aiBtn: { padding: 14, borderRadius: 18, alignItems: 'center', borderWidth: 1.5, marginBottom: 14 },
  aiBtnText: { fontWeight: '700', fontSize: 15 },
  cardLabel: { fontSize: 13, fontWeight: '800', color: 'rgba(79,203,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 },
  dreamCardPreview: { padding: 16, borderRadius: 14, backgroundColor: 'rgba(79,203,255,0.06)', borderWidth: 0.5, borderColor: 'rgba(79,203,255,0.1)', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#EAF6FF', marginTop: 4 },
  cardExcerpt: { fontSize: 13, color: 'rgba(224,216,240,0.5)', fontStyle: 'italic', marginTop: 4, textAlign: 'center' },
  cardMeta: { fontSize: 13, color: 'rgba(79,203,255,0.5)', marginTop: 6 },
  cardBrand: { fontSize: 13, color: 'rgba(224,216,240,0.2)', marginTop: 8 },
  deleteText: { fontSize: 14, color: '#ff6b6b', textAlign: 'center', padding: 12 },
});
