import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

let LocalAuthentication;
try { LocalAuthentication = require('expo-local-authentication'); } catch(e) {}

export default function LockScreen() {
  const { setAppLocked, passcode, useBiometric, colors } = useApp();
  const [input, setInput] = useState('');

  const tryBiometric = async () => {
    if (!LocalAuthentication) { Alert.alert('Biometrics not available in this build'); return; }
    try {
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Unlock DriftLoom' });
      if (result.success) setAppLocked(false);
    } catch { Alert.alert('Authentication failed'); }
  };

  const handleDigit = (d) => {
    const next = input + d;
    setInput(next);
    if (next.length === 4) {
      if (next === (passcode || '1234')) setAppLocked(false);
      else { Alert.alert('Wrong passcode'); setInput(''); }
    }
  };

  return (
    <View style={[s.container, { backgroundColor: '#02040A' }]}>  
      <Text style={s.title}>🔒 DriftLoom</Text>
      <Text style={s.sub}>Enter passcode</Text>
      <View style={s.dots}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.dot, i < input.length && s.dotFilled]} />
        ))}
      </View>
      <View style={s.keypad}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
          <TouchableOpacity key={i} style={s.key}
            onPress={() => k === '⌫' ? setInput(input.slice(0, -1)) : k !== '' && handleDigit(String(k))}>
            <Text style={s.keyText}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {useBiometric && (
        <TouchableOpacity style={s.bioBtn} onPress={tryBiometric}>
          <Text style={s.bioText}>Use Face ID</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#EAF6FF', marginBottom: 8 },
  sub: { fontSize: 14, color: '#5A6A7A', marginBottom: 30 },
  dots: { flexDirection: 'row', gap: 16, marginBottom: 40 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#4FCBFF' },
  dotFilled: { backgroundColor: '#4FCBFF' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: 240, justifyContent: 'center' },
  key: { width: 70, height: 70, alignItems: 'center', justifyContent: 'center', margin: 4 },
  keyText: { fontSize: 28, fontWeight: '600', color: '#EAF6FF' },
  bioBtn: { marginTop: 24, padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: '#4FCBFF' },
  bioText: { fontSize: 15, fontWeight: '700', color: '#4FCBFF' },
});
