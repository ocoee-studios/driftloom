import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { MOODS } from '../constants/data';

export default function CaptureScreen() {
  const { colors, dream, setDream, saveDream, editingIdx, hasAccess, setShowPaywall,
    fragments, setFragments, aiResult, setAiResult, aiLoading, setAiLoading } = useApp();
  const [mode, setMode] = useState('fragment');
  const [fragText, setFragText] = useState('');
  const [fragType, setFragType] = useState('text');
  const [fragTags, setFragTags] = useState('');
  const [mood, setMood] = useState('');

  const types = [
    { id: 'text', icon: '📝', label: 'Text', color: '#4FCBFF' },
    { id: 'dream', icon: '🌙', label: 'Dream', color: '#a55eea' },
    { id: 'voice', icon: '🎙', label: 'Voice', color: '#ff9f43' },
    { id: 'camera', icon: '📸', label: 'Camera', color: '#2ecc71' },
    { id: 'link', icon: '🔗', label: 'Link', color: '#45aaf2' },
    { id: 'spark', icon: '💡', label: 'Spark', color: '#ffd700' },
  ];
  const genres = [["🎬","Thriller"],["💕","Romance"],["🚀","Sci-Fi"],["🧙","Fantasy"],["😂","Comedy"],["👻","Horror"],["🔍","Mystery"],["⚔️","Adventure"],["🎭","Drama"],["🌀","Surreal"]];
  const tagSuggestions = ["app idea", "dream", "design", "ux", "writing", "music", "startup", "code"];

  const saveFragment = () => {
    if (!fragText.trim()) { Alert.alert('Write something first'); return; }
    const frag = {
      id: Date.now().toString(),
      type: fragType,
      text: fragText.trim(),
      tags: fragTags.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      starred: false,
    };
    setFragments([frag, ...(fragments || [])]);
    setFragText('');
    setFragTags('');
    Alert.alert('Fragment dropped! ↓');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Capture</Text>

        {/* Capture Type */}
        <GlassCard>
          <Text style={[s.label, { color: '#5A6A7A' }]}>CAPTURE TYPE</Text>
          <View style={s.typeGrid}>
            {types.map(t => (
              <TouchableOpacity key={t.id} onPress={() => { setFragType(t.id); if (t.id === 'dream') setMode('dream'); else setMode('fragment'); }}
                style={[s.typeCard, { backgroundColor: fragType === t.id ? t.color + '20' : 'transparent', borderColor: fragType === t.id ? t.color : colors.line, borderWidth: fragType === t.id ? 2 : 1 }]}>
                <Text style={{ fontSize: 22 }}>{t.icon}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color: fragType === t.id ? t.color : '#5A6A7A', marginTop: 4 }}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Fragment Mode */}
        {mode === 'fragment' && (<>
          <GlassCard>
            <Text style={[s.label, { color: '#5A6A7A' }]}>YOUR FRAGMENT</Text>
            <TextInput style={[s.textarea, { color: colors.navy, borderColor: colors.line }]}
              placeholder="Drop an idea, observation, question, half-thought..."
              placeholderTextColor="#5A6A7A" multiline value={fragText} onChangeText={setFragText} />
          </GlassCard>

          <GlassCard>
            <Text style={[s.label, { color: '#5A6A7A' }]}>TAGS</Text>
            <TextInput style={[s.input, { color: colors.navy, borderColor: colors.line }]}
              placeholder="app idea, design, ux..." placeholderTextColor="#5A6A7A"
              value={fragTags} onChangeText={setFragTags} />
            <View style={s.tagRow}>
              {tagSuggestions.map(tag => (
                <TouchableOpacity key={tag} onPress={() => setFragTags(prev => prev ? prev + ', ' + tag : tag)}
                  style={[s.tagPill, { borderColor: 'rgba(79,203,255,0.2)', backgroundColor: 'rgba(79,203,255,0.08)' }]}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#4FCBFF' }}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>

          <TouchableOpacity style={s.dropBtn} onPress={saveFragment}>
            <Text style={s.dropBtnText}>Drop Fragment ↓</Text>
          </TouchableOpacity>

          <GlassCard dark>
            <View style={{ alignItems: 'center', padding: 16 }}>
              <Text style={{ fontSize: 32 }}>🎙</Text>
              <Text style={[s.h3, { color: colors.navy, marginTop: 8 }]}>Quick Voice Capture</Text>
              <Text style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4 }}>Tap and hold to record</Text>
              <View style={s.recordBtn}>
                <Text style={{ fontSize: 20 }}>⏺</Text>
              </View>
            </View>
          </GlassCard>
        </>)}

        {/* Dream Mode */}
        {mode === 'dream' && (<>
          <GlassCard style={{ borderColor: 'rgba(165,94,234,0.15)' }}>
            <Text style={[s.label, { color: '#a55eea' }]}>🌙 DREAM JOURNAL ENTRY</Text>
            <TextInput style={[s.input, { color: colors.navy, borderColor: colors.line, marginBottom: 8 }]}
              placeholder="Dream title..." placeholderTextColor="#5A6A7A"
              value={dream.title} onChangeText={t => setDream({ ...dream, title: t })} />
            <TextInput style={[s.textarea, { color: colors.navy, borderColor: colors.line }]}
              placeholder="What happened in your dream?" placeholderTextColor="#5A6A7A"
              multiline value={dream.notes} onChangeText={t => setDream({ ...dream, notes: t })} />

            <Text style={[s.label, { color: '#a55eea', marginTop: 12 }]}>MOOD</Text>
            <View style={s.moodGrid}>
              {MOODS.map(m => (
                <TouchableOpacity key={m} onPress={() => setDream({ ...dream, mood: dream.mood === m ? '' : m })}
                  style={[s.moodCard, { backgroundColor: dream.mood === m ? 'rgba(79,203,255,0.12)' : 'transparent', borderColor: dream.mood === m ? '#4FCBFF' : colors.line, borderWidth: dream.mood === m ? 2 : 1 }]}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: dream.mood === m ? '#4FCBFF' : colors.navy }}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[s.label, { color: '#a55eea', marginTop: 12 }]}>DREAM GENRE</Text>
            <View style={s.genreGrid}>
              {genres.map(([icon, name]) => (
                <TouchableOpacity key={name} onPress={() => setDream({ ...dream, genre: dream.genre === name ? '' : name })}
                  style={[s.genreCard, { backgroundColor: dream.genre === name ? 'rgba(79,203,255,0.12)' : colors.glass2, borderColor: dream.genre === name ? '#4FCBFF' : colors.line }]}>
                  <Text style={{ fontSize: 16 }}>{icon}</Text>
                  <Text style={{ fontSize: 8, fontWeight: '700', color: dream.genre === name ? '#4FCBFF' : '#5A6A7A', marginTop: 2 }}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[s.label, { color: '#a55eea', marginTop: 12 }]}>SYMBOLS</Text>
            <TextInput style={[s.input, { color: colors.navy, borderColor: colors.line }]}
              placeholder="water, flying, forest..." placeholderTextColor="#5A6A7A"
              value={dream.tags} onChangeText={t => setDream({ ...dream, tags: t })} />

            <TouchableOpacity style={[s.dropBtn, { backgroundColor: '#a55eea', marginTop: 14 }]} onPress={saveDream}>
              <Text style={s.dropBtnText}>💾 Save Dream</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.aiBtn, { borderColor: '#a55eea' }]} onPress={() => hasAccess ? null : setShowPaywall(true)}>
              <Text style={{ fontWeight: '700', fontSize: 14, color: '#a55eea' }}>🔮 AI Dream Reading</Text>
            </TouchableOpacity>
          </GlassCard>
        </>)}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  h3: { fontSize: 15, fontWeight: '700' },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, backgroundColor: 'rgba(14,43,92,0.15)' },
  textarea: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, minHeight: 100, textAlignVertical: 'top', backgroundColor: 'rgba(14,43,92,0.15)' },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeCard: { width: '31%', alignItems: 'center', padding: 12, borderRadius: 14 },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  moodCard: { width: '31%', padding: 8, borderRadius: 10, alignItems: 'center' },
  genreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  genreCard: { width: '18%', alignItems: 'center', padding: 8, borderRadius: 12, borderWidth: 0.5 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tagPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, borderWidth: 1 },
  dropBtn: { padding: 16, borderRadius: 16, backgroundColor: '#4FCBFF', alignItems: 'center', marginBottom: 12 },
  dropBtnText: { color: '#02040A', fontWeight: '700', fontSize: 15 },
  aiBtn: { padding: 14, borderRadius: 16, borderWidth: 1.5, alignItems: 'center', marginBottom: 12 },
  recordBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(79,203,255,0.12)', borderWidth: 2, borderColor: '#4FCBFF', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
});
