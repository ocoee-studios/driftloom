import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { MOODS } from '../constants/data';

const MOODS_QUICK = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '😢', label: 'Sad' },
];

export default function JournalScreen({ navigation }) {
  const { dream, setDream, saveDream, hasAccess, setShowPaywall } = useApp();
  const [lucidOn, setLucidOn] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');

  const handleSave = () => {
    if (!dream.title && !dream.notes) {
      Alert.alert('Write something first', 'Add a title or describe your dream.');
      return;
    }
    saveDream();
    Alert.alert('Dream saved ✨', 'You can always edit and add more details later.');
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Quick Capture</Text>
          <Text style={s.headerSub}>Log your dream in seconds.</Text>
        </View>

        {/* Dream Title */}
        <Text style={s.fieldLabel}>Dream Title</Text>
        <TextInput style={s.input}
          placeholder="The floating city"
          placeholderTextColor="#35516F"
          value={dream.title}
          onChangeText={t => setDream({ ...dream, title: t })}
        />

        {/* Description */}
        <Text style={s.fieldLabel}>What do you remember?</Text>
        <View style={s.textareaWrap}>
          <TextInput style={s.textarea}
            placeholder="I was walking through a city in the clouds. Buildings were made of crystal. I felt curious and calm."
            placeholderTextColor="#35516F"
            multiline
            value={dream.notes}
            onChangeText={t => setDream({ ...dream, notes: t })}
          />
          <Text style={s.charCount}>{(dream.notes || '').length}/2000</Text>
        </View>

        {/* Mood When Woke */}
        <Text style={s.fieldLabel}>Mood When Woke</Text>
        <View style={s.moodRow}>
          {MOODS_QUICK.map(m => (
            <TouchableOpacity key={m.label}
              onPress={() => { setSelectedMood(m.label); setDream({ ...dream, mood: m.label }); }}
              style={[s.moodChip, selectedMood === m.label && s.moodChipActive]}>
              <Text style={{ fontSize: 22 }}>{m.emoji}</Text>
              <Text style={[s.moodLabel, selectedMood === m.label && s.moodLabelActive]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lucid Toggle */}
        <View style={s.toggleRow}>
          <Text style={s.toggleLabel}>Lucid? 💎</Text>
          <Switch
            value={lucidOn}
            onValueChange={v => { setLucidOn(v); setDream({ ...dream, lucid: v }); }}
            trackColor={{ false: '#1a2a4a', true: '#4FCBFF' }}
            thumbColor="#EAF6FF"
          />
        </View>

        {/* Symbols */}
        <Text style={s.fieldLabel}>Symbols (comma separated)</Text>
        <TextInput style={s.input}
          placeholder="Clouds, City, Crystal, Doorway"
          placeholderTextColor="#35516F"
          value={dream.tags}
          onChangeText={t => setDream({ ...dream, tags: t })}
        />

        {/* Deep Journal Link */}
        <TouchableOpacity style={s.deepLink}>
          <Text style={s.deepLinkText}>Deep Journal →</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
          <Text style={s.saveBtnText}>✓ Save Dream</Text>
        </TouchableOpacity>

        <Text style={s.saveNote}>You can always edit and add more details later.</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },

  header: { alignItems: 'center', marginBottom: 24 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#EAF6FF' },
  headerSub: { fontSize: 13, color: '#5A6A7A', marginTop: 4 },

  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#8EAAC5', marginBottom: 8, marginTop: 16 },

  input: {
    backgroundColor: 'rgba(14, 43, 92, 0.35)',
    borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 14, padding: 14, fontSize: 15, color: '#EAF6FF',
  },

  textareaWrap: {
    backgroundColor: 'rgba(14, 43, 92, 0.35)',
    borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 14, padding: 14,
  },
  textarea: { fontSize: 15, color: '#EAF6FF', minHeight: 120, textAlignVertical: 'top' },
  charCount: { fontSize: 12, color: '#35516F', textAlign: 'right', marginTop: 6 },

  moodRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  moodChip: {
    flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 14,
    backgroundColor: 'rgba(14, 43, 92, 0.25)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.08)',
  },
  moodChipActive: { backgroundColor: 'rgba(79, 203, 255, 0.15)', borderColor: '#4FCBFF', borderWidth: 1.5 },
  moodLabel: { fontSize: 10, fontWeight: '700', color: '#5A6A7A', marginTop: 4 },
  moodLabelActive: { color: '#4FCBFF' },

  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 4 },
  toggleLabel: { fontSize: 15, fontWeight: '600', color: '#EAF6FF' },

  deepLink: { alignItems: 'center', marginTop: 20 },
  deepLinkText: { fontSize: 15, fontWeight: '700', color: '#4FCBFF' },

  saveBtn: {
    backgroundColor: '#4FCBFF', borderRadius: 16, padding: 16,
    alignItems: 'center', marginTop: 20,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#02040A' },
  saveNote: { fontSize: 12, color: '#35516F', textAlign: 'center', marginTop: 10 },
});
