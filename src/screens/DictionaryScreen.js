import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { DREAM_DICT, DICT_CATEGORIES } from '../constants/data';

export default function DictionaryScreen() {
  const { colors, dream, setDream } = useApp();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [added, setAdded] = useState(null);

  const filtered = DREAM_DICT.filter(d => {
    if (cat !== 'all' && d.cat !== cat) return false;
    if (search && !d.term.toLowerCase().includes(search.toLowerCase()) && !d.meaning.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToDream = (term) => {
    const tags = (dream.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    if (!tags.includes(term.toLowerCase())) {
      setDream({ ...dream, tags: [...tags, term.toLowerCase()].join(', ') });
    }
    setAdded(term);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Dream Dictionary</Text>

        {/* Search */}
        <View style={[s.searchWrap, { borderColor: colors.line, backgroundColor: colors.glass }]}>
          <Text style={{ marginRight: 8 }}>🔍</Text>
          <TextInput style={[s.searchInput, { color: colors.navy }]}
            placeholder="Search dreams, symbols, meanings..."
            placeholderTextColor={colors.muted}
            value={search} onChangeText={t => { setSearch(t); setExpanded(null); }} />
        </View>

        {/* Categories */}
        <View style={s.catRow}>
          {DICT_CATEGORIES.map(c => (
            <TouchableOpacity key={c.id} onPress={() => { setCat(c.id); setExpanded(null); }}
              style={[s.catPill, {
                backgroundColor: cat === c.id ? 'rgba(79,203,255,0.12)' : 'transparent',
                borderColor: cat === c.id ? colors.lav : colors.line,
                borderWidth: cat === c.id ? 1.5 : 1,
              }]}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: cat === c.id ? colors.lav : colors.muted }}>
                {c.icon} {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 10 }}>{filtered.length} entries found</Text>

        {/* Dictionary Cards */}
        {filtered.map((d) => (
          <TouchableOpacity key={d.term} onPress={() => setExpanded(expanded === d.term ? null : d.term)}
            style={[s.card, { backgroundColor: colors.glass, borderColor: colors.line }]}>
            <View style={s.cardTop}>
              <View style={[s.cardIcon, { backgroundColor: colors.glass2, borderColor: colors.line }]}>
                <Text style={{ fontSize: 20 }}>{d.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>{d.term}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color: colors.lav, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {DICT_CATEGORIES.find(c => c.id === d.cat)?.label || d.cat}
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: colors.muted, transform: [{ rotate: expanded === d.term ? '180deg' : '0deg' }] }}>▼</Text>
            </View>
            {expanded === d.term && (
              <View style={[s.cardBody, { borderTopColor: colors.line }]}>
                <Text style={{ fontSize: 14, color: colors.deep, lineHeight: 22, marginBottom: 10 }}>{d.meaning}</Text>
                <TouchableOpacity onPress={() => addToDream(d.term)}
                  style={[s.addBtn, { borderColor: 'rgba(79,203,255,0.15)' }]}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: colors.lav }}>
                    {added === d.term ? '✓ Added to your dream' : `+ Add "${d.term.toLowerCase()}" to dream`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  catPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99 },
  card: { padding: 14, borderRadius: 18, borderWidth: 0.5, marginBottom: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5 },
  cardBody: { marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
  addBtn: { padding: 10, borderRadius: 12, alignItems: 'center', backgroundColor: 'rgba(79,203,255,0.08)', borderWidth: 1 },
});
