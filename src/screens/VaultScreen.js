import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function VaultScreen() {
  const { dreams, fragments, colors } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const allItems = [
    ...(fragments || []).map(f => ({ ...f, kind: 'fragment', icon: { text: '📝', voice: '🎙', camera: '📸', link: '🔗', spark: '💡' }[f.type] || '📝', color: '#4FCBFF' })),
    ...(dreams || []).map(d => ({ id: d.date + d.title, type: 'dream', text: d.title + ' — ' + (d.notes || '').slice(0, 80), tags: (d.tags || '').split(',').map(t => t.trim()).filter(Boolean), date: d.date || '', starred: false, kind: 'dream', icon: '🌙', color: '#a55eea' })),
  ];

  const filtered = allItems.filter(item => {
    if (filter === 'starred' && !item.starred) return false;
    if (filter === 'dreams' && item.kind !== 'dream') return false;
    if (filter === 'fragments' && item.kind !== 'fragment') return false;
    if (filter === 'text' && item.type !== 'text') return false;
    if (filter === 'voice' && item.type !== 'voice') return false;
    if (search) {
      const q = search.toLowerCase();
      return (item.text || '').toLowerCase().includes(q) || (item.tags || []).some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'starred', label: '⭐ Starred' },
    { id: 'fragments', label: '📝 Fragments' },
    { id: 'dreams', label: '🌙 Dreams' },
    { id: 'voice', label: '🎙 Voice' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: colors.navy }]}>Vault</Text>

        <View style={[s.searchBox, { borderColor: colors.line, backgroundColor: colors.glass }]}>
          <Text style={{ marginRight: 8 }}>🔍</Text>
          <TextInput style={[s.searchInput, { color: colors.navy }]}
            placeholder="Search fragments, dreams, tags..."
            placeholderTextColor="#5A6A7A"
            value={search} onChangeText={setSearch} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
          <View style={s.filterRow}>
            {filters.map(f => (
              <TouchableOpacity key={f.id} onPress={() => setFilter(f.id)}
                style={[s.filterPill, { borderColor: filter === f.id ? '#4FCBFF' : colors.line, borderWidth: filter === f.id ? 1.5 : 1 }]}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: filter === f.id ? '#4FCBFF' : '#5A6A7A' }}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={{ fontSize: 12, color: '#5A6A7A', marginBottom: 10 }}>
          {filtered.length} items ({(fragments || []).length} fragments + {dreams.length} dreams)
        </Text>

        {filtered.map((item, i) => (
          <View key={item.id || i} style={[s.itemCard, { borderColor: colors.line }]}>
            <View style={s.itemHeader}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: item.color, textTransform: 'uppercase', letterSpacing: 1 }}>
                {item.icon} {item.kind === 'dream' ? 'Dream' : item.type}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 14, cursor: 'pointer' }}>{item.starred ? '⭐' : '☆'}</Text>
                <Text style={{ fontSize: 12, color: '#5A6A7A' }}>{item.date || item.time || ''}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 13, color: colors.navy, marginTop: 4, lineHeight: 20 }} numberOfLines={3}>{item.text}</Text>
            {item.tags && item.tags.length > 0 && (
              <View style={s.tagRow}>
                {item.tags.map((tag, j) => (
                  <View key={j} style={[s.tag, { borderColor: 'rgba(79,203,255,0.2)', backgroundColor: 'rgba(79,203,255,0.08)' }]}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#4FCBFF' }}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ fontSize: 32 }}>🔍</Text>
            <Text style={{ fontSize: 14, color: '#5A6A7A', marginTop: 8, textAlign: 'center' }}>
              {search ? 'No results found' : 'Your vault is empty. Start capturing fragments and dreams!'}
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14 },
  filterRow: { flexDirection: 'row', gap: 6 },
  filterPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99 },
  itemCard: { padding: 14, borderRadius: 14, backgroundColor: 'rgba(14,43,92,0.25)', borderWidth: 1, marginBottom: 8 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99, borderWidth: 1 },
});
