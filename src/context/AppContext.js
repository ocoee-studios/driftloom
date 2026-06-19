import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import { useMoonPhase } from '../hooks/useMoonPhase';
import { THEMES } from '../constants/themes';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const { data, save, clear, ready } = useStorage();
  const moonPhase = useMoonPhase();
  
  // Core state
  const [dreams, setDreams] = useState([]);
  const [fragments, setFragments] = useState([]);
  const [theme, setTheme] = useState(0);
  const [inkColor, setInkColor] = useState("#EAF6FF");
  const [journalFont, setJournalFont] = useState("System");
  const [journalBg, setJournalBg] = useState("transparent");
  
  // Dream form
  const [dream, setDream] = useState({
    title:"",notes:"",mood:"",vivid:50,tags:"",category:"",
    genre:"",wakeFeel:"",dreamRole:"",
    dreamLocation:"",dreamWeather:"",dreamLighting:"",
    dreamTemp:"",dreamTexture:"",dreamSoundtrack:"",
    charMood:"",eyeContact:"",movement:"",sensation:"",
    superpower:"",timeFlow:"",dreamGravity:"",dreamScent:"",
    sceneTransition:"",inception:"",dreamMission:"",dreamEnding:"",
    dreamTech:"",clearestMoment:"",dreamDuration:"",
    wakeTime:"",wakeTrigger:"",dejaVu:"",
  });
  const [editingIdx, setEditingIdx] = useState(null);
  
  // Check-in
  const [checkin, setCheckin] = useState({feeling:"",sleep:5,stress:5,energy:5});
  const [checkinDone, setCheckinDone] = useState(false);
  
  // Daily stats
  const [dailyMood, setDailyMood] = useState("Calm");
  const [dailyRecall, setDailyRecall] = useState(82);
  const [dailySymbol, setDailySymbol] = useState("clouds");
  
  // Lucid
  const [checks, setChecks] = useState([false,false,false,false]);
  const [lucidDone, setLucidDone] = useState(0);
  
  // Security
  const [lockEnabled, setLockEnabled] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [appLocked, setAppLocked] = useState(false);
  const [useBiometric, setUseBiometric] = useState(true);
  
  // Paywall
  const [purchased, setPurchased] = useState(false);
  const [trialStart, setTrialStart] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  
  // AI
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  
  // Derived
  const TRIAL_DAYS = 7;
  const trialActive = trialStart && (Date.now() - new Date(trialStart).getTime()) < TRIAL_DAYS * 86400000;
  const trialDaysLeft = trialStart ? Math.max(0, TRIAL_DAYS - Math.floor((Date.now() - new Date(trialStart).getTime()) / 86400000)) : TRIAL_DAYS;
  // Access is the real RevenueCat entitlement only (synced via purchases.checkAccess
  // on launch + set true after a successful purchase/restore). No local trial bypass —
  // the 7-day trial runs through the StoreKit intro offer on the annual subscription.
  const hasAccess = purchased;
  const colors = THEMES[theme].colors;
  
  // Load from storage
  useEffect(() => {
    if (!ready || !data) return;
    if (data.dreams) setDreams(data.dreams);
    if (data.theme !== undefined) setTheme(data.theme);
    if (data.inkColor) setInkColor(data.inkColor);
    if (data.journalFont) setJournalFont(data.journalFont);
    if (data.journalBg) setJournalBg(data.journalBg);
    if (data.checkin) setCheckin(data.checkin);
    if (data.checkinDone) setCheckinDone(data.checkinDone);
    if (data.dailyMood) setDailyMood(data.dailyMood);
    if (data.dailyRecall) setDailyRecall(data.dailyRecall);
    if (data.dailySymbol) setDailySymbol(data.dailySymbol);
    if (data.checks) setChecks(data.checks);
    if (data.lucidDone) setLucidDone(data.lucidDone);
    if (data.lockEnabled) setLockEnabled(data.lockEnabled);
    if (data.passcode) setPasscode(data.passcode);
    if (data.useBiometric !== undefined) setUseBiometric(data.useBiometric);
    if (data.purchased) setPurchased(data.purchased);
    if (data.trialStart) setTrialStart(data.trialStart);
  }, [ready]);
  
  // Save to storage
  useEffect(() => {
    if (!ready) return;
    save({
      dreams, theme, inkColor, journalFont, journalBg,
      checkin, checkinDone, dailyMood, dailyRecall, dailySymbol,
      checks, lucidDone, lockEnabled, passcode, useBiometric,
      purchased, trialStart,
    });
  }, [dreams, theme, inkColor, journalFont, journalBg, checkin, checkinDone,
      dailyMood, dailyRecall, dailySymbol, checks, lucidDone,
      lockEnabled, passcode, useBiometric, purchased, trialStart]);
  
  // Actions
  const saveDream = () => {
    const entry = {
      ...dream,
      title: dream.title.trim() || "Untitled Dream",
      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    };
    if (editingIdx !== null) {
      const updated = [...dreams];
      updated[editingIdx] = entry;
      setDreams(updated);
    } else {
      setDreams([entry, ...dreams]);
    }
    setDream({title:"",notes:"",mood:"",vivid:50,tags:"",category:"",genre:"",wakeFeel:"",dreamRole:"",
      dreamLocation:"",dreamWeather:"",dreamLighting:"",dreamTemp:"",dreamTexture:"",dreamSoundtrack:"",
      charMood:"",eyeContact:"",movement:"",sensation:"",superpower:"",timeFlow:"",dreamGravity:"",
      dreamScent:"",sceneTransition:"",inception:"",dreamMission:"",dreamEnding:"",dreamTech:"",
      clearestMoment:"",dreamDuration:"",wakeTime:"",wakeTrigger:"",dejaVu:""});
    setEditingIdx(null);
  };
  
  const editDream = (idx) => {
    setDream(dreams[idx]);
    setEditingIdx(idx);
  };
  
  const deleteDream = () => {
    if (editingIdx !== null) {
      setDreams(dreams.filter((_, i) => i !== editingIdx));
      setEditingIdx(null);
      setDream({title:"",notes:"",mood:"",vivid:50,tags:"",category:"",genre:"",wakeFeel:"",dreamRole:""});
    }
  };
  
  const startTrial = () => setTrialStart(new Date().toISOString());
  
  const value = {
    // State
    dreams, setDreams, fragments, setFragments, dream, setDream, editingIdx, setEditingIdx,
    checkin, setCheckin, checkinDone, setCheckinDone,
    dailyMood, setDailyMood, dailyRecall, setDailyRecall, dailySymbol, setDailySymbol,
    checks, setChecks, lucidDone, setLucidDone,
    theme, setTheme, inkColor, setInkColor, journalFont, setJournalFont, journalBg, setJournalBg,
    lockEnabled, setLockEnabled, passcode, setPasscode, appLocked, setAppLocked, useBiometric, setUseBiometric,
    purchased, setPurchased, trialStart, setTrialStart, showPaywall, setShowPaywall,
    aiResult, setAiResult, aiLoading, setAiLoading,
    // Derived
    trialActive, trialDaysLeft, hasAccess, colors, moonPhase,
    // Actions
    saveDream, editDream, deleteDream, startTrial, clearStorage: clear,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
