import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function GlassCard({ children, style, dark }) {
  const { colors } = useApp();
  return (
    <View style={[
      styles.card,
      { backgroundColor: dark ? 'rgba(10,10,26,0.9)' : colors.glass, borderColor: colors.line },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 0.5,
    shadowColor: '#4FCBFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
});
