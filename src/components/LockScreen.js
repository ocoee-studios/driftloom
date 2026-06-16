import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useApp } from '../context/AppContext';

export default function LockScreen() {
  const { passcode, setAppLocked, setLockEnabled, setPasscode, useBiometric } = useApp();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleKey = (k) => {
    if (k === '⌫') { setInput(p => p.slice(0,-1)); setError(false); return; }
    const next = input + k;
    setInput(next);
    if (next.length === 4) {
      if (next === passcode) { setAppLocked(false); setInput(''); }
      else { setError(true); setTimeout(() => { setInput(''); setError(false); }, 600); }
    }
  };

  const handleBiometric = async () => {
    const hasHW = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHW || !enrolled) return;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock your dream journal',
      fallbackLabel: 'Use Passcode',
    });
    if (result.success) setAppLocked(false);
  };

  const handleForgot = () => {
    Alert.alert('Reset Passcode', 'This will disable the lock screen. Set a new one in Settings.', [
      { text: 'Cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => {
        setPasscode(''); setLockEnabled(false); setAppLocked(false);
      }},
    ]);
  };

  return (
    <View style={s.container}>
      <Text style={s.icon}>🔒</Text>
      <Text style={s.title}>DriftLoom</Text>
      <Text style={s.sub}>Enter your passcode to unlock</Text>
      <View style={s.dots}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.dot, input.length > i && (error ? s.dotError : s.dotFilled)]} />
        ))}
      </View>
      <View style={s.keypad}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k,i) => (
          k === '' ? <View key={i} style={s.keyEmpty} /> :
          <TouchableOpacity key={i} style={s.key} onPress={() => handleKey(String(k))}>
            <Text style={s.keyText}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={s.errorText}>Incorrect passcode</Text>}
      {useBiometric && (
        <TouchableOpacity onPress={handleBiometric} style={s.bioBtn}>
          <Text style={s.bioIcon}>😊</Text>
          <Text style={s.bioLabel}>Face ID</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleForgot} style={s.forgot}>
        <Text style={s.forgotText}>Forgot Passcode?</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#02040A',alignItems:'center',justifyContent:'center',padding:24},
  icon:{fontSize:48,marginBottom:12},
  title:{fontFamily:'System',fontSize:28,fontWeight:'700',color:'#EAF6FF',marginBottom:4},
  sub:{fontSize:14,color:'rgba(224,216,240,0.4)',marginBottom:24},
  dots:{flexDirection:'row',gap:12,marginBottom:32},
  dot:{width:14,height:14,borderRadius:7,borderWidth:2,borderColor:'rgba(79,203,255,0.3)'},
  dotFilled:{backgroundColor:'#4FCBFF',borderColor:'#4FCBFF'},
  dotError:{backgroundColor:'#ff6b6b',borderColor:'#ff6b6b'},
  keypad:{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',width:240},
  key:{width:72,height:72,borderRadius:36,borderWidth:1,borderColor:'rgba(79,203,255,0.15)',
    alignItems:'center',justifyContent:'center',margin:4},
  keyEmpty:{width:72,height:72,margin:4},
  keyText:{fontSize:24,fontWeight:'600',color:'#EAF6FF'},
  errorText:{fontSize:14,color:'#ff6b6b',marginTop:12},
  bioBtn:{alignItems:'center',marginTop:20},
  bioIcon:{fontSize:32},
  bioLabel:{fontSize:13,color:'rgba(79,203,255,0.5)',marginTop:4},
  forgot:{marginTop:16,padding:10},
  forgotText:{fontSize:14,color:'rgba(79,203,255,0.5)'},
});
