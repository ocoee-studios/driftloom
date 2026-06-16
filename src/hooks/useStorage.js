import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@driftloom_data';

export function useStorage() {
  const [data, setData] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
      setReady(true);
    } catch (e) {
      console.warn('Storage load error:', e);
      setReady(true);
    }
  };

  const save = async (newData) => {
    try {
      const merged = { ...data, ...newData };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setData(merged);
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  const clear = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setData(null);
    } catch (e) {
      console.warn('Storage clear error:', e);
    }
  };

  return { data, save, clear, ready };
}
