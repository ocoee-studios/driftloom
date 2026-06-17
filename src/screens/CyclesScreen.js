import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function CyclesScreen() {
  const { moonPhase } = useApp();

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Cycles</Text>

        {/* Moon Phase */}
        <View style={s.card}>
          <View style={s.moonRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardLabel}>Moon Phase</Text>
              <Text style={s.moonName}>{moonPhase?.name || 'Waxing Gibbous'}</Text>
              <Text style={s.moonIllum}>Illumination: {moonPhase?.illumination || 72}%</Text>
            </View>
            <Text style={{ fontSize: 50 }}>🌔</Text>
          </View>
        </View>

        {/* Tonight's Sleep Outlook */}
        <View style={s.card}>
          <View style={s.moonRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardLabel}>Tonight's Sleep Outlook</Text>
              <Text style={s.outlookGrade}>Good</Text>
              <Text style={s.outlookSub}>Great conditions for deep rest and dream recall.</Text>
            </View>
            <Text style={{ fontSize: 36 }}>🌙</Text>
          </View>
        </View>

        {/* Sleep Window */}
        <View style={s.card}>
          <View style={s.moonRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardLabel}>Sleep Window</Text>
              <Text style={s.windowTime}>10:45 PM – 7:15 AM</Text>
              <Text style={s.windowSub}>Aim for 8h 30m</Text>
            </View>
            <Text style={{ fontSize: 32 }}>🛏</Text>
          </View>
        </View>

        {/* Sleep Stages */}
        <View style={s.card}>
          <Text style={s.cardLabel}>Sleep Stages <Text style={s.cardLabelLight}>(Typical)</Text></Text>
          <View style={s.stageBar}>
            <View style={[s.stageSeg, { flex: 1.75, backgroundColor: '#0E2B5C' }]} />
            <View style={[s.stageSeg, { flex: 2.1, backgroundColor: '#4FCBFF' }]} />
            <View style={[s.stageSeg, { flex: 4.3, backgroundColor: '#8EAAC5' }]} />
            <View style={[s.stageSeg, { flex: 0.33, backgroundColor: '#35516F' }]} />
          </View>
          <View style={s.stageLabels}>
            {[
              { color: '#0E2B5C', label: 'Deep', time: '1h 45m' },
              { color: '#4FCBFF', label: 'REM', time: '2h 10m' },
              { color: '#8EAAC5', label: 'Light', time: '4h 20m' },
              { color: '#35516F', label: 'Awake', time: '0h 20m' },
            ].map((st, i) => (
              <View key={i} style={s.stageLabelItem}>
                <View style={[s.stageDot, { backgroundColor: st.color }]} />
                <Text style={s.stageText}>{st.label}</Text>
                <Text style={s.stageTime}>{st.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Smart Wake */}
        <View style={s.card}>
          <View style={s.moonRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardLabel}>Smart Wake Window</Text>
              <Text style={s.windowTime}>6:45 AM – 7:15 AM</Text>
              <Text style={s.windowSub}>Wake in a light sleep phase.</Text>
            </View>
            <Text style={{ fontSize: 32 }}>⏰</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#02040A' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#EAF6FF', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: 'rgba(14, 43, 92, 0.35)', borderWidth: 1, borderColor: 'rgba(79, 203, 255, 0.12)',
    borderRadius: 18, padding: 18, marginBottom: 12,
  },
  cardLabel: { fontSize: 12, fontWeight: '600', color: '#5A6A7A', marginBottom: 4 },
  cardLabelLight: { fontWeight: '400' },
  moonRow: { flexDirection: 'row', alignItems: 'center' },
  moonName: { fontSize: 20, fontWeight: '800', color: '#EAF6FF' },
  moonIllum: { fontSize: 13, color: '#5A6A7A', marginTop: 2 },
  outlookGrade: { fontSize: 20, fontWeight: '800', color: '#EAF6FF' },
  outlookSub: { fontSize: 13, color: '#8EAAC5', marginTop: 2, lineHeight: 20 },
  windowTime: { fontSize: 22, fontWeight: '800', color: '#EAF6FF' },
  windowSub: { fontSize: 13, color: '#5A6A7A', marginTop: 2 },
  stageBar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 12, marginBottom: 14, gap: 2 },
  stageSeg: { borderRadius: 4 },
  stageLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  stageLabelItem: { alignItems: 'center' },
  stageDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 4 },
  stageText: { fontSize: 11, fontWeight: '600', color: '#8EAAC5' },
  stageTime: { fontSize: 12, fontWeight: '700', color: '#EAF6FF', marginTop: 2 },
});
