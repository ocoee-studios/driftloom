import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { DREAM_DICT, DICT_CATEGORIES } from '../constants/data';

const FEATURED = { term: 'Water', icon: '🌊', meaning: 'Emotions, intuition, the unconscious mind, cleansing, flow.' };

export default function DictionaryScreen() {
  const { dreams, colors } = useApp();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [expanded, setExpanded] = useState(null);

  // Count symbol frequency from dreams
  const symbolFreq = {};
  dreams.forEach(d => {
    if (d.tags) d.tags.split(',').forEach(t => { const s = t.trim().toLowerCase(); if (s) symbolFreq[s] = (symbolFreq[s] || 0) + 1; });
  });
  const recentSymbols = Object.entries(symbolFreq).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const symbolIcons = { ocean: '🌊', doorway: '🚪', tree: '🌲', flight: '🕊', water: '💧', moon: '🌙', fire: '🔥', snake: '🐍', key: '🗝', flying: '🕊', house: '🏠', star: '⭐', forest: '🌲', bird: '🐦', cat: '🐱', butterfly: '🦋', rain: '🌧' };

  const filtered = DREAM_DICT.filter(d => {
    if (cat !== 'all' && d.cat !== cat) return false;
    if (search && !d.term.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const cats = [{ id: 'all', label: 'All' }, ...DICT_CATEGORIES.filter(c => c.id !== 'all')];

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Dictionary</Text>

        {/* Search */}
        <View style={s.searchBox}>
          <Text style={{ color: '#35516F' }}>🔍</Text>
          <TextInput style={s.searchInput} placeholder="Search symbols..." placeholderTextColor="#35516F"
            value={search} onChangeText={t => { setSearch(t); setExpanded(null); }} />
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {cats.map(c => (
              <TouchableOpacity key={c.id} onPress={() => { setCat(c.id); setExpanded(null); }}
                style={[s.catPill, cat === c.id && s.catPillActive]}>
                <Text style={[s.catText, cat === c.id && s.catTextActive]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Featured Symbol */}
        {!search && cat === 'all' && (
          <View style={s.featuredCard}>
            <View style={{ flex: 1 }}>
              <Text style={s.featuredLabel}>Featured Symbol</Text>
              <Text style={s.featuredName}>{FEATURED.term}</Text>
              <Text style={s.featuredMeaning}>{FEATURED.meaning}</Text>
              <TouchableOpacity style={s.viewBtn}>
                <Text style={s.viewBtnText}>View Symbol</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 50 }}>{FEATURED.icon}</Text>
          </View>
        )}

        {/* Recent Symbols from user's dreams */}
        {!search && recentSymbols.length > 0 && (
          <>
            <Text style={s.sectionLabel}>Recent Symbols</Text>
            {recentSymbols.map(([sym, count], i) => (
              <View key={i} style={s.symbolRow}>
                <View style={s.symbolIcon}>
                  <Text style={{ fontSize: 18 }}>{symbolIcons[sym] || '✦'}</Text>
                </View>
                <Text style={s.symbolName}>{sym.charAt(0).toUpperCase() + sym.slice(1)}</Text>
                <Text style={s.symbolCount}>Seen {count} times</Text>
              </View>
            ))}
          </>
        )}

        {/* Full Dictionary */}
        {(search || cat !== 'all') && (
          <>
            <Text style={s.sectionLabel}>{filtered.length} entries</Text>
            {filtered.map(d => (
              <TouchableOpacity key={d.term} onPress={() => setExpanded(expanded === d.term ? null : d.term)}
                style={s.dictRow}>
                <View style={s.symbolIcon}><Text style={{ fontSize: 18 }}>{d.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.symbolName}>{d.term}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#4FCBFF', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {DICT_CATEGORIES.find(c => c.id === d.cat)?.label || d.cat}
                  </Text>
                </View>
                <Text style={{ color: '#35516F', transform: [{ rotate: expanded === d.term ? '180deg' : '0deg' }] }}>▼</Text>
                {expanded === d.term && (
                  <View style={s.expandedContent}>
                    <Text style={{ fontSize: 14, color: '#C7D0DB', lineHeight: 22 }}>{d.meaning}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </>
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
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 15, color: '#EAF6FF' },
  catPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99, borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)', backgroundColor: 'rgba(14, 43, 92, 0.25)' },
  catPillActive: { borderColor: '#4FCBFF', backgroundColor: 'rgba(79, 203, 255, 0.15)', borderWidth: 1.5 },
  catText: { fontSize: 13, fontWeight: '700', color: '#5A6A7A' },
  catTextActive: { color: '#4FCBFF' },
  featuredCard: { backgroundColor: 'rgba(14, 43, 92, 0.4)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.15)', borderRadius: 20, padding: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  featuredLabel: { fontSize: 12, color: '#5A6A7A', fontWeight: '600' },
  featuredName: { fontSize: 22, fontWeight: '800', color: '#EAF6FF', marginTop: 4 },
  featuredMeaning: { fontSize: 13, color: '#8EAAC5', marginTop: 4, lineHeight: 20 },
  viewBtn: { backgroundColor: '#4FCBFF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start', marginTop: 10 },
  viewBtnText: { fontSize: 13, fontWeight: '700', color: '#02040A' },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#8EAAC5', marginBottom: 12, marginTop: 4 },
  symbolRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(79, 203, 255, 0.06)' },
  symbolIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(79, 203, 255, 0.08)', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  symbolName: { fontSize: 15, fontWeight: '600', color: '#EAF6FF', flex: 1 },
  symbolCount: { fontSize: 13, color: '#5A6A7A' },
  dictRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(79, 203, 255, 0.06)', flexWrap: 'wrap' },
  expandedContent: { width: '100%', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(79, 203, 255, 0.08)' },
});
