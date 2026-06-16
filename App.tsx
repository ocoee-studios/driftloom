import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";
import { Audio } from "expo-av";
import {
  buildBuildModePlan, buildBuildPlanExport, buildFragmentExport,
  buildFutureCards, buildLoomPlan, buildMentorNote, buildMomentum,
  buildProjectBrief, buildQuests, buildRemixPrompt, buildTimeCapsule, buildWhyText,
  computeInsights, computeStreak, extractTags, filterIdeas, getPatterns,
  getDailySpark, getFavorites, getRevisitDue, searchIdeas, sortIdeas,
  Idea, IdeaType, MentorMode, Mood, OutputMode, Pattern, Project, Quest,
  SortMode, FilterType, FilterMood,
  pickConcept, starterIdeas,
} from "./src/driftloom";
import { driftloomColors, driftloomTypeColors } from "./src/theme";
import { usePremium } from "./src/purchases";

const driftloomWordmark = require("./assets/driftloom-wordmark.png");
const STORAGE_KEY = "driftloom:v3";
const ideaTypes: IdeaType[] = ["thought", "dream", "image", "voice", "link", "location"];
const moods: Mood[] = ["strange", "soft", "bold", "useful"];
const modes: OutputMode[] = ["app", "story", "brand"];
const mentorModes: MentorMode[] = ["designer", "writer", "founder", "filmmaker", "gameMaker"];
const sortModes: SortMode[] = ["recent", "type", "mood", "favorites"];

type Tab = "home" | "capture" | "loom" | "projects" | "vault" | "settings";
const C = driftloomColors;
const typeColor = driftloomTypeColors as Record<IdeaType, string>;
const mentorLabels: Record<MentorMode, string> = { designer: "Designer", writer: "Writer", founder: "Founder", filmmaker: "Filmmaker", gameMaker: "Game maker" };
const captureTypeEmoji: Record<IdeaType, string> = { thought: "💭", dream: "🌙", image: "🖼", voice: "🎙", link: "🔗", location: "📍" };
const capturePlaceholders: Record<IdeaType, string> = {
  thought: "What's drifting through your mind?", dream: "Describe a dream or stray image...",
  image: "Describe a screenshot or visual clue...", voice: "Describe the spoken thought...",
  link: "Paste a link that caught your attention...", location: "Where did the idea spark?",
};

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [ideas, setIdeas] = useState<Idea[]>(starterIdeas);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [capture, setCapture] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [type, setType] = useState<IdeaType>("thought");
  const [mood, setMood] = useState<Mood>("strange");
  const [mode, setMode] = useState<OutputMode>("app");
  const [mentor, setMentor] = useState<MentorMode>("designer");
  const [nonce, setNonce] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [attachment, setAttachment] = useState<{ type: "image" | "voice" | "link"; uri: string; label: string } | null>(null);
  // New feature state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterMood, setFilterMood] = useState<FilterMood>("all");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [plan, setPlan] = useState<"free" | "plus" | "founder">("free");
  const [showPaywall, setShowPaywall] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const premium = usePremium();

  const didHydrate = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Derived */
  const selectedIdeas = useMemo(() => { const s = ideas.filter((i) => i.selected && !i.archived); return s.length ? s : ideas.filter((i) => !i.archived).slice(0, 3); }, [ideas]);
  const activeIdeas = useMemo(() => ideas.filter((i) => !i.archived), [ideas]);
  const patterns = useMemo(() => getPatterns(ideas), [ideas]);
  const concept = useMemo(() => pickConcept(selectedIdeas, mode, nonce), [selectedIdeas, mode, nonce]);
  const loomPlan = useMemo(() => buildLoomPlan(selectedIdeas, concept, mode), [concept, mode, selectedIdeas]);
  const timeCapsule = useMemo(() => buildTimeCapsule(ideas, selectedIdeas, nonce), [ideas, nonce, selectedIdeas]);
  const mentorNote = useMemo(() => buildMentorNote(selectedIdeas, concept, mentor), [concept, mentor, selectedIdeas]);
  const buildPlan = useMemo(() => buildBuildModePlan(selectedIdeas, concept, mode, mentor), [concept, mentor, mode, selectedIdeas]);
  const why = useMemo(() => buildWhyText(selectedIdeas), [selectedIdeas]);
  const futureCards = useMemo(() => buildFutureCards(selectedIdeas, concept, nonce), [selectedIdeas, concept, nonce]);
  const remixPrompt = useMemo(() => buildRemixPrompt(selectedIdeas, mode, nonce), [selectedIdeas, mode, nonce]);
  const dailySpark = useMemo(() => getDailySpark(promptIndex), [promptIndex]);
  const momentum = useMemo(() => buildMomentum(ideas, projects), [ideas, projects]);
  const quests = useMemo(() => buildQuests(ideas, projects), [ideas, projects]);
  const streak = useMemo(() => computeStreak(ideas), [ideas]);
  const insights = useMemo(() => computeInsights(ideas, projects), [ideas, projects]);
  const revisitDue = useMemo(() => getRevisitDue(ideas), [ideas]);
  const favorites = useMemo(() => getFavorites(ideas), [ideas]);
  const isPro = premium.isPro || plan !== "free";
  const FREE_FRAGMENT_LIMIT = 50;
  const FREE_PROJECT_LIMIT = 3;
  const atFragmentLimit = !isPro && activeIdeas.length >= FREE_FRAGMENT_LIMIT;
  const atProjectLimit = !isPro && projects.length >= FREE_PROJECT_LIMIT;

  // Filtered/sorted ideas for the Loom tab
  const displayIdeas = useMemo(() => {
    let result = filterIdeas(ideas, filterType, filterMood, false);
    result = searchIdeas(result, searchQuery);
    return sortIdeas(result, sortMode);
  }, [ideas, filterType, filterMood, searchQuery, sortMode]);

  /* Persistence */
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const d = JSON.parse(raw);
          if (Array.isArray(d.ideas) && d.ideas.length) setIdeas(d.ideas);
          if (Array.isArray(d.projects)) setProjects(d.projects);
          if (typeof d.showOnboarding === "boolean") setShowOnboarding(d.showOnboarding);
          if (typeof d.promptIndex === "number") setPromptIndex(d.promptIndex);
          if (mentorModes.includes(d.mentor)) setMentor(d.mentor);
          if (d.plan === "plus" || d.plan === "founder") setPlan(d.plan);
        }
      } catch {}
      didHydrate.current = true;
      setIsHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!didHydrate.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ideas, projects, showOnboarding, promptIndex, mentor, plan })).catch(() => {});
  }, [ideas, projects, showOnboarding, promptIndex, mentor, plan]);

  /* Actions */
  function addIdeaWithAttachment() {
    const text = capture.trim();
    if (!text && !attachment) return;
    if (atFragmentLimit) { setShowPaywall(true); return; }
    const fullText = attachment ? `${text || attachment.label}\n[${attachment.type}: ${attachment.uri}]` : text;
    setIdeas((prev) => [{ id: `idea-${Date.now()}`, text: fullText, type, mood, selected: true, createdAt: Date.now(), attachment: attachment || undefined }, ...prev]);
    setCapture(""); setAttachment(null); setNonce((n) => n + 1);
  }

  function toggleIdea(id: string) { setIdeas((p) => p.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))); }
  function toggleFavorite(id: string) { setIdeas((p) => p.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i))); }
  function archiveIdea(id: string) { setIdeas((p) => p.map((i) => (i.id === id ? { ...i, archived: true } : i))); }
  function unarchiveIdea(id: string) { setIdeas((p) => p.map((i) => (i.id === id ? { ...i, archived: false } : i))); }

  function setRevisit(id: string, days: number) {
    setIdeas((p) => p.map((i) => (i.id === id ? { ...i, revisitAt: Date.now() + days * 86400000 } : i)));
  }

  function saveNote(id: string) {
    setIdeas((p) => p.map((i) => (i.id === id ? { ...i, note: noteText || undefined } : i)));
    setEditingNote(null); setNoteText("");
  }

  function pinProject() {
    if (atProjectLimit) { setShowPaywall(true); return; }
    setProjects((prev) => [{ id: `project-${Date.now()}`, title: concept.title, summary: concept.summary, nextMove: concept.move, mode, count: selectedIdeas.length }, ...prev]);
  }

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert("Permission needed", "Microphone access required."); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(rec); setIsRecording(true); setRecordingDuration(0);
      recordingTimer.current = setInterval(() => setRecordingDuration((d) => d + 1), 1000);
    } catch { Alert.alert("Error", "Could not start recording."); }
  }

  async function stopRecording() {
    if (!recording) return;
    if (recordingTimer.current) clearInterval(recordingTimer.current);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    if (uri) { setAttachment({ type: "voice", uri, label: `Voice memo · ${recordingDuration}s` }); if (!capture.trim()) setCapture(`Voice memo captured (${recordingDuration}s)`); }
  }

  async function pickImage(useCamera: boolean) {
    try {
      const method = useCamera ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;
      const result = await method({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
      if (!result.canceled && result.assets[0]) {
        setAttachment({ type: "image", uri: result.assets[0].uri, label: useCamera ? "Camera capture" : "Photo library" });
        setType("image"); if (!capture.trim()) setCapture("Screenshot or image captured — describe what you see...");
      }
    } catch { Alert.alert("Error", "Could not access photos."); }
  }

  async function shareFragment(idea: Idea) {
    try { await Share.share({ message: buildFragmentExport(idea) }); } catch {}
  }
  async function shareProjectBrief(project: Project) {
    try { await Share.share({ message: buildProjectBrief(project, ideas), title: project.title }); } catch {}
  }
  async function shareBuildPlan(project: Project) {
    const plan = buildBuildModePlan(selectedIdeas, pickConcept(selectedIdeas, project.mode, 0), project.mode, mentor);
    try { await Share.share({ message: buildBuildPlanExport(project, plan), title: `Build Plan: ${project.title}` }); } catch {}
  }

  /* ─── Email to self ─── */
  async function emailFragment(idea: Idea) {
    const available = await MailComposer.isAvailableAsync();
    if (!available) { Alert.alert("No mail", "Set up a mail account on this device first."); return; }
    await MailComposer.composeAsync({
      subject: `Driftloom fragment: ${idea.type} / ${idea.mood}`,
      body: buildFragmentExport(idea),
      isHtml: false,
    });
  }

  async function emailProjectBrief(project: Project) {
    const available = await MailComposer.isAvailableAsync();
    if (!available) { Alert.alert("No mail", "Set up a mail account on this device first."); return; }
    await MailComposer.composeAsync({
      subject: `Driftloom: ${project.title}`,
      body: buildProjectBrief(project, ideas),
      isHtml: false,
    });
  }

  async function emailDigest() {
    const available = await MailComposer.isAvailableAsync();
    if (!available) { Alert.alert("No mail", "Set up a mail account on this device first."); return; }
    const favs = ideas.filter((i) => i.favorite && !i.archived);
    const sel = ideas.filter((i) => i.selected && !i.archived);
    const items = favs.length > 0 ? favs : sel;
    const lines = [
      "# Driftloom Digest\n",
      `${items.length} fragments · ${patterns.length} patterns · ${projects.length} projects\n`,
      "## Fragments\n",
      ...items.map((i, idx) => `${idx + 1}. [${i.type}/${i.mood}] ${i.text}${i.note ? `\n   Note: ${i.note}` : ""}`),
      "",
      "## Signals",
      patterns.slice(0, 5).map((p) => `- ${p.tag} ×${p.count}`).join("\n"),
      "",
      projects.length > 0 ? `## Projects\n${projects.map((p) => `- ${p.title}: ${p.summary}`).join("\n")}` : "",
      "\n---\nExported from Driftloom · Ocoee Studios",
    ].filter(Boolean).join("\n");
    await MailComposer.composeAsync({
      subject: `Driftloom Digest · ${new Date().toLocaleDateString()}`,
      body: lines,
      isHtml: false,
    });
  }

  function go(t: Tab) { setTab(t); scrollRef.current?.scrollTo({ y: 0, animated: false }); }

  /* ═══ RENDER ═══ */
  return (
    <SafeAreaView style={st.root}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView ref={scrollRef} contentContainerStyle={st.scroll} keyboardShouldPersistTaps="handled">

          {/* ═══ HOME ═══ */}
          {tab === "home" && (
            <View>
              <View style={st.homeHeader}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Image source={driftloomWordmark} style={{ width: 32, height: 32 }} resizeMode="contain" />
                  <Text style={{ color: C.star, fontSize: 20, fontWeight: "700" }}>Driftloom</Text>
                </View>
                <View style={st.avatar}><Text style={{ color: C.star, fontSize: 13, fontWeight: "700" }}>D</Text></View>
              </View>

              {showOnboarding && (
                <Glass style={{ borderColor: C.glowBlue, marginBottom: 16 }}>
                  <Label>Start here</Label>
                  <Text style={st.cardTitle}>Your rough ideas have somewhere to go.</Text>
                  <Text style={st.body}>Drop in project sparks, visuals, voice memos, and half-built thoughts. Tap the ones that feel alive, then ask Driftloom to turn them into a next move.</Text>
                  <Pressable onPress={() => setShowOnboarding(false)} style={st.btnPrimary}><Text style={st.btnPrimaryText}>I am ready to loom</Text></Pressable>
                </Glass>
              )}

              {/* Streak + Level */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={[st.streakCard, { flex: 1 }]}>
                  <Text style={{ fontSize: 28 }}>{insights.streakEmoji}</Text>
                  <Text style={{ color: C.star, fontSize: 24, fontWeight: "700" }}>{streak.current}</Text>
                  <Text style={{ color: C.silver, fontSize: 11, marginTop: 2 }}>day streak</Text>
                  {streak.todayCount > 0 && <Text style={{ color: C.cyan, fontSize: 11, fontWeight: "600", marginTop: 4 }}>{streak.todayCount} today</Text>}
                </View>
                <View style={[st.loomLevel, { flex: 2 }]}>
                  <Text style={{ fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", color: C.silver, marginBottom: 4 }}>Loom Level</Text>
                  <Text style={{ fontSize: 22, fontWeight: "700", color: C.cyan }}>{momentum.title}</Text>
                  <Text style={{ fontSize: 12, color: C.textTertiary, marginBottom: 10, marginTop: 2 }}>Lv {momentum.level} · {momentum.progress}%</Text>
                  <View style={st.barBg}><View style={[st.barFill, { width: `${momentum.progress}%`, backgroundColor: C.blue }]} /></View>
                </View>
              </View>

              {/* Insights strip */}
              <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                <View style={st.insightChip}><Text style={st.insightValue}>{insights.totalFragments}</Text><Text style={st.insightLabel}>fragments</Text></View>
                <View style={st.insightChip}><Text style={st.insightValue}>{insights.totalFavorites}</Text><Text style={st.insightLabel}>favorites</Text></View>
                <View style={st.insightChip}><Text style={st.insightValue}>{insights.weeklyCount}</Text><Text style={st.insightLabel}>this week</Text></View>
                <View style={st.insightChip}><Text style={st.insightValue}>{captureTypeEmoji[insights.topType as IdeaType] || "💭"}</Text><Text style={st.insightLabel}>top type</Text></View>
              </View>

              {/* Signals */}
              <Label style={{ marginTop: 20, paddingHorizontal: 0 }}>Dominant signals</Label>
              {patterns.slice(0, 2).map((p, i) => (
                <View key={p.tag} style={st.signalCard}>
                  <View style={[st.signalIcon, { backgroundColor: i === 0 ? C.cyanBg : C.blueBg }]}>
                    <Text style={{ fontSize: 20 }}>{i === 0 ? "🧩" : "💡"}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.star, fontSize: 15, fontWeight: "600" }}>{p.tag}</Text>
                    <Text style={{ color: C.textTertiary, fontSize: 12 }}>Across {p.count} captures</Text>
                  </View>
                  <Text style={{ color: C.cyan, fontSize: 22, fontWeight: "700" }}>{p.count}</Text>
                </View>
              ))}

              {/* Revisit due */}
              {revisitDue.length > 0 && (
                <>
                  <Label style={{ marginTop: 20, paddingHorizontal: 0 }}>⏰ Due for revisit</Label>
                  {revisitDue.slice(0, 3).map((idea) => (
                    <Glass key={idea.id} style={{ marginTop: 8, borderColor: C.glowCyan }}>
                      <Text style={st.body} numberOfLines={2}>{idea.text}</Text>
                      <Pressable onPress={() => { setCapture(idea.text); go("capture"); }} style={[st.btnOutline, { marginTop: 8 }]}>
                        <Text style={st.btnOutlineText}>Revisit now</Text>
                      </Pressable>
                    </Glass>
                  ))}
                </>
              )}

              {/* Daily spark */}
              <Glass style={{ marginTop: 16 }}>
                <Label>Daily spark</Label>
                <Text style={{ color: C.star, fontWeight: "700", fontSize: 17, lineHeight: 24 }}>{dailySpark}</Text>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  <Pressable onPress={() => { setCapture(dailySpark); go("capture"); }} style={st.btnPrimary}><Text style={st.btnPrimaryText}>Use prompt</Text></Pressable>
                  <Pressable onPress={() => setPromptIndex((n) => n + 1)} style={st.btnOutline}><Text style={st.btnOutlineText}>New spark</Text></Pressable>
                </View>
              </Glass>

              {/* Quests */}
              <Glass style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Label>Tiny quests</Label>
                  <Pill color={C.blue}>{quests.filter((q) => q.complete).length}/{quests.length}</Pill>
                </View>
                {quests.map((q) => (
                  <View key={q.id} style={[st.questRow, q.complete && { borderWidth: 0.5, borderColor: C.glowCyan }]}>
                    <View style={[st.questCheck, q.complete && { backgroundColor: C.blue, borderColor: C.blue }]}>
                      {q.complete && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "900" }}>✓</Text>}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: C.star, fontSize: 14, fontWeight: "600" }}>{q.label}</Text>
                      <Text style={{ color: C.textTertiary, fontSize: 12 }}>{q.detail}</Text>
                    </View>
                  </View>
                ))}
              </Glass>

              {/* Quick capture */}
              <Label style={{ marginTop: 20, paddingHorizontal: 0 }}>Quick capture</Label>
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {(["thought", "image", "voice", "link"] as IdeaType[]).map((t) => (
                  <Pressable key={t} onPress={() => { setType(t); go("capture"); }}><Pill color={C.cyan}>{captureTypeEmoji[t]} {cap(t)}</Pill></Pressable>
                ))}
              </View>

              {/* Email digest */}
              <Pressable onPress={emailDigest} style={[st.emailBtn, { marginTop: 16 }]}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>✉️</Text>
                <Text style={st.emailBtnText}>Email digest to myself</Text>
              </Pressable>
            </View>
          )}

          {/* ═══ CAPTURE ═══ */}
          {tab === "capture" && (
            <View>
              <Text style={st.screenTitle}>Capture</Text>
              <Text style={st.screenSub}>Drop whatever's drifting through</Text>
              <View style={st.typeGrid}>
                {ideaTypes.map((t) => (
                  <Pressable key={t} onPress={() => { setType(t); setAttachment(null); }} style={[st.typeBtn, type === t && st.typeBtnActive]}>
                    <Text style={{ fontSize: 26 }}>{captureTypeEmoji[t]}</Text>
                    <Text style={{ fontSize: 11, fontWeight: "600", color: type === t ? C.cyan : C.textTertiary }}>{cap(t)}</Text>
                  </Pressable>
                ))}
              </View>

              {type === "voice" && (
                <Glass style={{ marginTop: 12, alignItems: "center", paddingVertical: 20 }}>
                  <Text style={{ color: C.star, fontSize: 15, fontWeight: "600", marginBottom: 12 }}>{isRecording ? `Recording · ${recordingDuration}s` : "Tap to record a voice fragment"}</Text>
                  {isRecording && <View style={st.recordingDot} />}
                  <Pressable onPress={isRecording ? stopRecording : startRecording} style={[st.recordBtn, isRecording && st.recordBtnActive]}>
                    <Text style={st.recordBtnText}>{isRecording ? "⏹ Stop" : "🎙 Record"}</Text>
                  </Pressable>
                </Glass>
              )}
              {type === "image" && (
                <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  <Pressable onPress={() => pickImage(true)} style={[st.richBtn, { flex: 1 }]}><Text style={{ fontSize: 20, marginBottom: 4 }}>📷</Text><Text style={st.richBtnText}>Camera</Text></Pressable>
                  <Pressable onPress={() => pickImage(false)} style={[st.richBtn, { flex: 1 }]}><Text style={{ fontSize: 20, marginBottom: 4 }}>🖼</Text><Text style={st.richBtnText}>Library</Text></Pressable>
                </View>
              )}
              {type === "link" && (
                <View style={{ marginTop: 12 }}>
                  <TextInput placeholder="https://" placeholderTextColor={C.textTertiary} style={st.linkInput} onSubmitEditing={(e) => { const u = e.nativeEvent.text.trim(); if (u) setAttachment({ type: "link", uri: u, label: u.slice(0, 40) }); }} returnKeyType="done" autoCapitalize="none" keyboardType="url" />
                </View>
              )}

              {attachment && (
                <View style={st.attachmentCard}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>{attachment.type === "voice" ? "🎙" : attachment.type === "image" ? "🖼" : "🔗"}</Text>
                    <Text style={{ color: C.star, fontSize: 13, fontWeight: "600", flex: 1 }} numberOfLines={1}>{attachment.label}</Text>
                  </View>
                  <Pressable onPress={() => setAttachment(null)}><Text style={{ color: C.textTertiary, fontSize: 18 }}>✕</Text></Pressable>
                </View>
              )}

              <TextInput multiline value={capture} onChangeText={setCapture} placeholder={capturePlaceholders[type]} placeholderTextColor={C.textTertiary} style={st.textInput} textAlignVertical="top" />

              <Label style={{ marginTop: 16 }}>Mood</Label>
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {moods.map((m) => (<Pressable key={m} onPress={() => setMood(m)}><Pill color={mood === m ? C.cyan : C.oceanBg} border={mood === m}>{cap(m)}</Pill></Pressable>))}
              </View>

              <Pressable onPress={() => setCapture(remixPrompt)} style={[st.btnOutline, { marginTop: 12 }]}>
                <Text style={st.btnOutlineText}>🔄 Remix selected into a starter thought</Text>
              </Pressable>

              <Pressable onPress={addIdeaWithAttachment} style={st.weaveBtn}>
                <Text style={st.weaveBtnText}>{attachment ? "Weave with attachment" : "Weave it in"}</Text>
              </Pressable>
            </View>
          )}

          {/* ═══ LOOM ═══ */}
          {tab === "loom" && (
            <View>
              <Text style={st.screenTitle}>Loom</Text>
              <Text style={st.screenSub}>Fragments start connecting here.</Text>

              {/* Search */}
              <View style={st.searchRow}>
                <Text style={{ fontSize: 16 }}>🔍</Text>
                <TextInput placeholder="Search fragments..." placeholderTextColor={C.textTertiary} value={searchQuery} onChangeText={setSearchQuery} style={st.searchInput} />
                {searchQuery.length > 0 && <Pressable onPress={() => setSearchQuery("")}><Text style={{ color: C.textTertiary, fontSize: 16 }}>✕</Text></Pressable>}
              </View>

              {/* Sort & filter */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  {sortModes.map((s) => (<Pressable key={s} onPress={() => setSortMode(s)}><Pill color={sortMode === s ? C.cyan : C.oceanBg} border={sortMode === s}>{cap(s)}</Pill></Pressable>))}
                  <View style={{ width: 1, backgroundColor: C.line, marginHorizontal: 4 }} />
                  <Pressable onPress={() => setFilterType(filterType === "all" ? "thought" : "all")}><Pill color={filterType !== "all" ? C.blue : C.oceanBg} border={filterType !== "all"}>Type: {filterType}</Pill></Pressable>
                  <Pressable onPress={() => setFilterMood(filterMood === "all" ? "bold" : "all")}><Pill color={filterMood !== "all" ? C.blue : C.oceanBg} border={filterMood !== "all"}>Mood: {filterMood}</Pill></Pressable>
                </View>
              </ScrollView>

              {/* Patterns */}
              <Label style={{ marginTop: 20 }}>Patterns</Label>
              <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
                {patterns.slice(0, 5).map((p) => (<Pill key={p.tag} color={C.cyanBg}>{p.tag} ×{p.count}</Pill>))}
              </View>

              {/* Fragment list */}
              <Label style={{ marginTop: 16 }}>{`Fragments · ${displayIdeas.length}`}</Label>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 10 }}>
                <Pressable onPress={() => setIdeas((p) => p.map((i) => ({ ...i, selected: true })))} style={st.btnOutline}><Text style={st.btnOutlineText}>Select all</Text></Pressable>
                <Pressable onPress={() => setIdeas((p) => p.map((i) => ({ ...i, selected: false })))} style={st.btnOutline}><Text style={st.btnOutlineText}>Clear</Text></Pressable>
              </View>

              {displayIdeas.map((idea) => (
                <View key={idea.id} style={[st.ideaCard, { borderLeftColor: typeColor[idea.type] }, idea.selected && { borderColor: C.cyan }]}>
                  <Pressable onPress={() => toggleIdea(idea.id)}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={st.ideaMeta}>{idea.type} / {idea.mood}</Text>
                      <Text style={st.ideaMeta}>{idea.selected ? "selected" : "tap"}</Text>
                    </View>
                    <Text style={{ color: C.star, fontSize: 14, lineHeight: 21 }}>{idea.text}</Text>
                  </Pressable>

                  {/* Note */}
                  {idea.note && editingNote !== idea.id && (
                    <View style={{ backgroundColor: C.oceanBg, borderRadius: 10, padding: 10, marginTop: 8 }}>
                      <Text style={{ color: C.silver, fontSize: 12, fontWeight: "600" }}>📝 Note</Text>
                      <Text style={{ color: C.star, fontSize: 13, marginTop: 2 }}>{idea.note}</Text>
                    </View>
                  )}

                  {/* Note editor */}
                  {editingNote === idea.id && (
                    <View style={{ marginTop: 8 }}>
                      <TextInput multiline value={noteText} onChangeText={setNoteText} placeholder="Add a follow-up note..." placeholderTextColor={C.textTertiary} style={[st.linkInput, { minHeight: 60 }]} />
                      <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                        <Pressable onPress={() => saveNote(idea.id)} style={[st.btnPrimary, { flex: 1, paddingVertical: 10 }]}><Text style={st.btnPrimaryText}>Save</Text></Pressable>
                        <Pressable onPress={() => setEditingNote(null)} style={[st.btnOutline, { flex: 1, paddingVertical: 10 }]}><Text style={st.btnOutlineText}>Cancel</Text></Pressable>
                      </View>
                    </View>
                  )}

                  {/* Action row */}
                  <View style={{ flexDirection: "row", gap: 6, marginTop: 10 }}>
                    <Pressable onPress={() => toggleFavorite(idea.id)} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>{idea.favorite ? "⭐" : "☆"}</Text>
                    </Pressable>
                    <Pressable onPress={() => { setEditingNote(idea.id); setNoteText(idea.note || ""); }} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>📝</Text>
                    </Pressable>
                    <Pressable onPress={() => shareFragment(idea)} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>📤</Text>
                    </Pressable>
                    <Pressable onPress={() => emailFragment(idea)} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>✉️</Text>
                    </Pressable>
                    <Pressable onPress={() => Alert.alert("Revisit", "Remind you about this fragment?", [
                      { text: "1 day", onPress: () => setRevisit(idea.id, 1) },
                      { text: "3 days", onPress: () => setRevisit(idea.id, 3) },
                      { text: "7 days", onPress: () => setRevisit(idea.id, 7) },
                      { text: "Cancel", style: "cancel" },
                    ])} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>⏰</Text>
                    </Pressable>
                    <Pressable onPress={() => archiveIdea(idea.id)} style={st.miniBtn}>
                      <Text style={{ fontSize: 14 }}>🗑</Text>
                    </Pressable>
                  </View>
                </View>
              ))}

              {/* Incubator */}
              <Label style={{ marginTop: 24 }}>Incubator</Label>
              <Text style={st.secLabel}>Creative mentor</Text>
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {mentorModes.map((m) => (<Pressable key={m} onPress={() => setMentor(m)}><Pill color={mentor === m ? C.cyan : C.oceanBg} border={mentor === m}>{mentorLabels[m]}</Pill></Pressable>))}
              </View>
              <Glass style={{ marginTop: 12 }}><Label>{`${mentorLabels[mentor]} mode`}</Label><Text style={{ color: C.star, fontWeight: "700", fontSize: 15, lineHeight: 22 }}>{mentorNote}</Text></Glass>
              <Text style={st.secLabel}>Direction</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {modes.map((m) => (<Pressable key={m} onPress={() => setMode(m)}><Pill color={mode === m ? C.blue : C.oceanBg} border={mode === m}>{cap(m)}</Pill></Pressable>))}
              </View>
              <Glass style={{ marginTop: 14, borderColor: C.glowCyan }}>
                <Label>Current synthesis</Label>
                <Text style={{ color: C.star, fontSize: 22, fontWeight: "700", marginBottom: 6 }}>{concept.title}</Text>
                <Text style={st.body}>{concept.summary}</Text>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  <Meta label="Core pull" value={concept.pull} />
                  <Meta label="First move" value={concept.move} />
                </View>
              </Glass>
              <Glass style={{ marginTop: 10 }}><Label>Why this connects</Label><Text style={st.body}>{why}</Text></Glass>

              {/* Future cards */}
              <Label style={{ marginTop: 16 }}>What could this become?</Label>
              {futureCards.map((f) => (
                <Glass key={f.id} style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <Pill color={C.cyan}>{f.shape}</Pill>
                    <Text style={{ color: C.textTertiary, fontSize: 12, flex: 1, textAlign: "right", marginLeft: 8 }}>{f.firstArtifact}</Text>
                  </View>
                  <Text style={{ color: C.star, fontSize: 16, fontWeight: "700" }}>{f.title}</Text>
                  <Text style={[st.body, { marginTop: 4 }]}>{f.promise}</Text>
                </Glass>
              ))}

              {/* Loom plan */}
              <Glass style={{ marginTop: 12, borderColor: C.glowBlue }}>
                <Label>Loom plan</Label>
                <Text style={st.body}>{loomPlan.angle}</Text>
                {loomPlan.nextSteps.map((step: string, i: number) => (
                  <View key={i} style={{ flexDirection: "row", gap: 10, alignItems: "flex-start", marginTop: 8 }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: C.ocean, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>{i + 1}</Text>
                    </View>
                    <Text style={[st.body, { flex: 1 }]}>{step}</Text>
                  </View>
                ))}
                <Text style={{ color: C.blue, fontWeight: "700", fontSize: 14, marginTop: 10 }}>{loomPlan.question}</Text>
              </Glass>

              {/* Build mode */}
              <Glass style={{ marginTop: 12, borderColor: C.glowCyan }}>
                <Label>Build mode</Label>
                <Text style={{ color: C.star, fontSize: 18, fontWeight: "700", marginBottom: 6 }}>First version</Text>
                <Text style={st.body}>{buildPlan.firstScreen}</Text>
                <Meta label="Promise" value={buildPlan.userPromise} style={{ marginTop: 10 }} />
                {buildPlan.steps.map((step: string, i: number) => (
                  <View key={i} style={{ flexDirection: "row", gap: 10, alignItems: "flex-start", marginTop: 8 }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: C.ocean, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>{i + 1}</Text>
                    </View>
                    <Text style={[st.body, { flex: 1 }]}>{step}</Text>
                  </View>
                ))}
                <Text style={{ color: C.cyan, fontWeight: "700", fontSize: 14, marginTop: 10 }}>{buildPlan.guardrail}</Text>
              </Glass>

              <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
                <Pressable onPress={() => setNonce((n) => n + 1)} style={[st.btnPrimary, { flex: 1 }]}><Text style={st.btnPrimaryText}>Deep incubate</Text></Pressable>
                <Pressable onPress={pinProject} style={[st.btnOutline, { flex: 1 }]}><Text style={st.btnOutlineText}>Pin as project</Text></Pressable>
              </View>
            </View>
          )}

          {/* ═══ PROJECTS ═══ */}
          {tab === "projects" && (
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={st.screenTitle}>Projects</Text>
                <Pressable onPress={() => go("loom")} style={st.addBtn}><Text style={{ color: C.cyan, fontSize: 18 }}>+</Text></Pressable>
              </View>
              {projects.length === 0 ? (
                <Glass style={{ marginTop: 16, alignItems: "center", paddingVertical: 40 }}>
                  <Text style={{ fontSize: 40, marginBottom: 12 }}>📁</Text>
                  <Text style={[st.body, { textAlign: "center" }]}>No projects yet. Use the Loom to synthesize fragments, then pin them here.</Text>
                  <Pressable onPress={() => go("loom")} style={[st.btnPrimary, { marginTop: 16 }]}><Text style={st.btnPrimaryText}>Go to Loom</Text></Pressable>
                </Glass>
              ) : (
                <>
                  <Label style={{ marginTop: 16 }}>Active</Label>
                  {projects.map((p) => (
                    <Glass key={p.id} style={{ marginTop: 10 }}>
                      <Text style={{ color: C.star, fontSize: 17, fontWeight: "700", marginBottom: 4 }}>{p.title}</Text>
                      <Text style={st.body}>{p.summary}</Text>
                      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}><Pill color={C.cyan}>{p.mode}</Pill><Pill color={C.oceanBg}>{p.count} fragments</Pill></View>
                      <Text style={{ color: C.textTertiary, fontSize: 13, marginTop: 8 }}>Next: {p.nextMove}</Text>
                      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                        <Pressable onPress={() => shareProjectBrief(p)} style={[st.shareBtn, { flex: 1 }]}><Text style={st.shareBtnText}>📄 Share brief</Text></Pressable>
                        <Pressable onPress={() => shareBuildPlan(p)} style={[st.shareBtn, { flex: 1 }]}><Text style={st.shareBtnText}>🔧 Build plan</Text></Pressable>
                      </View>
                      <Pressable onPress={() => emailProjectBrief(p)} style={[st.emailBtn, { marginTop: 8 }]}>
                        <Text style={{ fontSize: 14, marginRight: 6 }}>✉️</Text>
                        <Text style={st.emailBtnText}>Email brief to myself</Text>
                      </Pressable>
                    </Glass>
                  ))}
                </>
              )}
            </View>
          )}

          {/* ═══ VAULT ═══ */}
          {tab === "vault" && (
            <View>
              <Text style={st.screenTitle}>Vault</Text>
              <Text style={st.screenSub}>Your favorites, revisits, and time capsules</Text>

              {/* Favorites */}
              {favorites.length > 0 && (
                <>
                  <Label>{`⭐ Favorites · ${favorites.length}`}</Label>
                  {favorites.map((idea) => (
                    <Glass key={idea.id} style={{ marginTop: 8 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Text style={[st.body, { flex: 1, color: C.star }]} numberOfLines={2}>{idea.text}</Text>
                        <Pressable onPress={() => shareFragment(idea)}><Text style={{ fontSize: 16, marginLeft: 8 }}>📤</Text></Pressable>
                      </View>
                      <View style={{ flexDirection: "row", gap: 6, marginTop: 8 }}>
                        <Pill color={C.cyanBg}>{idea.type}</Pill>
                        <Pill color={C.oceanBg}>{idea.mood}</Pill>
                        {idea.note && <Pill color={C.oceanBg}>📝 has note</Pill>}
                      </View>
                    </Glass>
                  ))}
                </>
              )}

              {/* Revisit due */}
              {revisitDue.length > 0 && (
                <>
                  <Label style={{ marginTop: favorites.length > 0 ? 20 : 0 }}>⏰ Due for revisit</Label>
                  {revisitDue.map((idea) => (
                    <Glass key={idea.id} style={{ marginTop: 8, borderColor: C.glowCyan }}>
                      <Text style={[st.body, { color: C.star }]} numberOfLines={2}>{idea.text}</Text>
                      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
                        <Pressable onPress={() => { setCapture(idea.text); go("capture"); }} style={[st.btnPrimary, { flex: 1, paddingVertical: 10 }]}><Text style={st.btnPrimaryText}>Revisit</Text></Pressable>
                        <Pressable onPress={() => setRevisit(idea.id, 7)} style={[st.btnOutline, { flex: 1, paddingVertical: 10 }]}><Text style={st.btnOutlineText}>Snooze 7d</Text></Pressable>
                      </View>
                    </Glass>
                  ))}
                </>
              )}

              {/* Time capsule */}
              <Label style={{ marginTop: 20 }}>Time capsule</Label>
              <Glass style={{ marginTop: 8, borderColor: C.glowCyan }}>
                <Text style={{ color: C.star, fontSize: 17, fontWeight: "700", marginBottom: 6 }}>{timeCapsule.title}</Text>
                <Text style={[st.body, { fontStyle: "italic" }]}>"{timeCapsule.fragment}"</Text>
                <Text style={[st.body, { marginTop: 8 }]}>{timeCapsule.connection}</Text>
                <Text style={{ color: C.cyan, fontWeight: "700", fontSize: 14, marginTop: 10 }}>{timeCapsule.prompt}</Text>
              </Glass>

              {favorites.length === 0 && revisitDue.length === 0 && (
                <Glass style={{ marginTop: 16, alignItems: "center", paddingVertical: 30 }}>
                  <Text style={{ fontSize: 32, marginBottom: 8 }}>⭐</Text>
                  <Text style={[st.body, { textAlign: "center" }]}>Star your favorite fragments and set revisit reminders to fill your Vault.</Text>
                </Glass>
              )}
            </View>
          )}

          {/* ═══ SETTINGS ═══ */}
          {tab === "settings" && (
            <View>
              <Text style={st.screenTitle}>Settings</Text>

              {/* Current plan card */}
              <Glass style={{ borderColor: isPro ? C.glowCyan : C.glowBlue, marginTop: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={st.avatar}><Text style={{ color: C.star, fontSize: 22, fontWeight: "800" }}>D</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.star, fontSize: 19, fontWeight: "700" }}>Driftloom User</Text>
                    <Text style={st.body}>{isPro ? `${cap(plan)} Plan` : "Free Plan"}</Text>
                  </View>
                  {isPro && <Pill color={C.cyan}>Pro</Pill>}
                </View>
                {!isPro && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={[st.body, { marginBottom: 10 }]}>
                      {activeIdeas.length} / {FREE_FRAGMENT_LIMIT} fragments · {projects.length} / {FREE_PROJECT_LIMIT} projects
                    </Text>
                    <View style={st.barBg}>
                      <View style={[st.barFill, { width: `${Math.min(100, (activeIdeas.length / FREE_FRAGMENT_LIMIT) * 100)}%`, backgroundColor: activeIdeas.length > 40 ? "#FF5050" : C.cyan }]} />
                    </View>
                    <Pressable onPress={() => setShowPaywall(true)} style={[st.btnPrimary, { marginTop: 12 }]}>
                      <Text style={st.btnPrimaryText}>Upgrade to Plus</Text>
                    </Pressable>
                  </View>
                )}
                {isPro && (
                  <Text style={[st.body, { marginTop: 10 }]}>Unlimited fragments, projects, mentors, exports, and voice capture.</Text>
                )}
              </Glass>

              {/* Paywall */}
              {showPaywall && (
                <View style={{ marginTop: 16 }}>
                  <Glass style={{ borderColor: C.glowCyan }}>
                    <Text style={{ color: C.star, fontSize: 20, fontWeight: "700", marginBottom: 4 }}>Unlock the full loom</Text>
                    <Text style={st.body}>Driftloom works best when you capture freely. Plus removes all limits.</Text>

                    {/* Billing toggle */}
                    <View style={{ flexDirection: "row", backgroundColor: C.oceanBg, borderRadius: 12, padding: 4, marginTop: 16, gap: 4 }}>
                      <Pressable onPress={() => setBillingCycle("yearly")} style={{ flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: billingCycle === "yearly" ? C.ocean : "transparent" }}>
                        <Text style={{ color: C.star, fontSize: 14, fontWeight: "600" }}>Yearly</Text>
                        <Text style={{ color: billingCycle === "yearly" ? C.cyan : C.textTertiary, fontSize: 11, fontWeight: "600", marginTop: 2 }}>Save 37%</Text>
                      </Pressable>
                      <Pressable onPress={() => setBillingCycle("monthly")} style={{ flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: billingCycle === "monthly" ? C.ocean : "transparent" }}>
                        <Text style={{ color: C.star, fontSize: 14, fontWeight: "600" }}>Monthly</Text>
                        <Text style={{ color: C.textTertiary, fontSize: 11, fontWeight: "600", marginTop: 2 }}>$3.99/mo</Text>
                      </Pressable>
                    </View>

                    {/* Plus card */}
                    <View style={{ marginTop: 16, backgroundColor: C.oceanBg, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.lineHover }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: C.star, fontSize: 18, fontWeight: "700" }}>Plus</Text>
                        <Pill color={C.cyan}>Best value</Pill>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: 8 }}>
                        <Text style={{ color: C.star, fontSize: 32, fontWeight: "700" }}>{billingCycle === "yearly" ? premium.yearlyPrice : premium.monthlyPrice}</Text>
                        <Text style={{ color: C.textTertiary, fontSize: 14, paddingBottom: 4 }}>{billingCycle === "yearly" ? "per year" : "per month"}</Text>
                      </View>
                      {billingCycle === "yearly" && <Text style={{ color: C.cyan, fontSize: 13, fontWeight: "600", marginTop: 4 }}>That's $2.50/month — saves 37% vs monthly</Text>}
                      <View style={{ marginTop: 14, gap: 8 }}>
                        {["Unlimited fragments", "Unlimited projects", "Voice, camera, and link capture", "Mentor modes and build plans", "Export, share, and email to self", "Vault, favorites, and revisit reminders"].map((f) => (
                          <View key={f} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={{ color: C.cyan, fontSize: 14 }}>✓</Text>
                            <Text style={{ color: C.star, fontSize: 14 }}>{f}</Text>
                          </View>
                        ))}
                      </View>
                      <Pressable onPress={() => { if (premium.monthlyPackage && billingCycle === "monthly") { premium.purchase(premium.monthlyPackage).then(ok => { if(ok) { setPlan("plus"); setShowPaywall(false); } }); } else if (premium.yearlyPackage && billingCycle === "yearly") { premium.purchase(premium.yearlyPackage).then(ok => { if(ok) { setPlan("plus"); setShowPaywall(false); } }); } else { setPlan("plus"); setShowPaywall(false); Alert.alert("Plus activated", "Demo mode — real payments connect through RevenueCat at launch."); } }} style={[st.btnPrimary, { marginTop: 16 }]}>
                        <Text style={st.btnPrimaryText}>Start Plus · {billingCycle === "yearly" ? `${premium.yearlyPrice}/year` : `${premium.monthlyPrice}/month`}</Text>
                      </Pressable>
                    </View>

                    {/* Founder card */}
                    <View style={{ marginTop: 12, backgroundColor: C.surface, borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: C.line }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: C.star, fontSize: 18, fontWeight: "700" }}>Founder Lifetime</Text>
                        <Pill color={C.blue}>Limited</Pill>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: 8 }}>
                        <Text style={{ color: C.star, fontSize: 32, fontWeight: "700" }}>{premium.lifetimePrice}</Text>
                        <Text style={{ color: C.textTertiary, fontSize: 14, paddingBottom: 4 }}>one time</Text>
                      </View>
                      <Text style={st.body}>Everything in Plus, forever. For early believers who help shape Driftloom.</Text>
                      <View style={{ marginTop: 10, gap: 6 }}>
                        {["Lifetime Plus access", "Founder badge", "Early feature votes"].map((f) => (
                          <View key={f} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={{ color: C.blue, fontSize: 14 }}>✓</Text>
                            <Text style={{ color: C.star, fontSize: 14 }}>{f}</Text>
                          </View>
                        ))}
                      </View>
                      <Pressable onPress={() => { if (premium.lifetimePackage) { premium.purchase(premium.lifetimePackage).then(ok => { if(ok) { setPlan("founder"); setShowPaywall(false); } }); } else { setPlan("founder"); setShowPaywall(false); Alert.alert("Founder access claimed", "Demo mode — real payments connect through RevenueCat at launch."); } }} style={[st.btnOutline, { marginTop: 14 }]}>
                        <Text style={st.btnOutlineText}>{`Claim founder access · ${premium.lifetimePrice}`}</Text>
                      </Pressable>
                    </View>

                    {/* Free comparison */}
                    <View style={{ marginTop: 16, gap: 10 }}>
                      <Text style={{ color: C.silver, fontSize: 13, fontWeight: "600" }}>Free includes:</Text>
                      {["50 fragments", "3 pinned projects", "Daily spark prompts", "Basic pattern detection"].map((f) => (
                        <View key={f} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                          <Text style={{ color: C.textTertiary, fontSize: 13 }}>·</Text>
                          <Text style={{ color: C.textTertiary, fontSize: 13 }}>{f}</Text>
                        </View>
                      ))}
                    </View>

                    <Pressable onPress={() => setShowPaywall(false)} style={[st.btnOutline, { marginTop: 16 }]}>
                      <Text style={st.btnOutlineText}>Maybe later</Text>
                    </Pressable>

                    <Pressable onPress={async () => { const ok = await premium.restore(); if (ok) { setShowPaywall(false); Alert.alert("Restored", "Your purchase has been restored."); } else { Alert.alert("Nothing found", "No previous purchases found for this account."); } }} style={[st.btnOutline, { marginTop: 8 }]}>
                      <Text style={st.btnOutlineText}>Restore purchases</Text>
                    </Pressable>

                    <Text style={{ color: C.textTertiary, fontSize: 11, textAlign: "center", marginTop: 12, lineHeight: 16 }}>
                      Payment through App Store at launch. Cancel anytime. Demo activates features locally for testing.
                    </Text>
                  </Glass>
                </View>
              )}

              <Label style={{ marginTop: 20 }}>Loom</Label>
              <View style={st.settingsGroup}>
                <SettingsRow icon="🧩" title="Signal sensitivity" value="High" />
                <SettingsRow icon="✦" title="Spark prompts" toggle on />
                <SettingsRow icon="🎯" title="Weekly loom review" toggle on />
              </View>
              <Label style={{ marginTop: 16 }}>Privacy</Label>
              <View style={st.settingsGroup}>
                <SettingsRow icon="🔒" title="On-device processing" toggle on />
                <SettingsRow icon="☁️" title="Cloud backup" toggle />
              </View>
              <Label style={{ marginTop: 16 }}>Account</Label>
              <View style={st.settingsGroup}>
                <SettingsRow icon="💎" title="Manage subscription" value={isPro ? cap(plan) : "Free"} />
                <SettingsRow icon="🆘" title="Help & feedback" value="›" />
              </View>
              <View style={{ alignItems: "center", marginTop: 24, opacity: 0.3 }}>
                <Image source={driftloomWordmark} style={{ width: 48, height: 48, marginBottom: 8 }} resizeMode="contain" />
                <Text style={{ color: C.star, fontSize: 12 }}>Driftloom v1.1.0</Text>
                <Text style={{ color: C.star, fontSize: 12 }}>Ocoee Studios</Text>
                <Text style={{ color: C.star, fontSize: 12, marginTop: 2 }}>{isHydrated ? "Saved privately on this device" : "Loading..."}</Text>
              </View>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
      <View style={st.tabBar}>
        {([
          { id: "home", icon: "🏠", label: "Home" },
          { id: "capture", icon: "✦", label: "Capture" },
          { id: "loom", icon: "🌀", label: "Loom" },
          { id: "projects", icon: "📁", label: "Projects" },
          { id: "vault", icon: "🧠", label: "Vault" },
          { id: "settings", icon: "⚙️", label: "Settings" },
        ] as { id: Tab; icon: string; label: string }[]).map((t) => (
          <Pressable key={t.id} onPress={() => go(t.id)} style={st.tabBtn}>
            <Text style={[st.tabIcon, tab === t.id && st.tabIconActive]}>{t.icon}</Text>
            <Text style={[st.tabLabel, tab === t.id && st.tabLabelActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

/* ═══ Components ═══ */

function Glass({ children, style }: { children: ReactNode; style?: any }) { return <View style={[st.glass, style]}>{children}</View>; }
function Label({ children, style }: { children: string; style?: any }) { return <Text style={[st.label, style]}>{children}</Text>; }
function Pill({ children, color, border }: { children: ReactNode; color: string; border?: boolean }) {
  const isBrand = color === C.cyan || color === C.blue;
  return (<View style={[st.pill, { backgroundColor: isBrand ? `${color}20` : color }, border && { borderColor: `${color}40`, borderWidth: 0.5 }]}><Text style={[st.pillText, { color: isBrand ? color : C.silver }]}>{children}</Text></View>);
}
function Meta({ label, value, style }: { label: string; value: string; style?: any }) {
  return (<View style={[st.meta, style]}><Text style={st.metaLabel}>{label}</Text><Text style={{ color: C.star, fontSize: 14, fontWeight: "700", marginTop: 4 }}>{value}</Text></View>);
}
function SettingsRow({ icon, title, value, toggle, on }: { icon: string; title: string; value?: string; toggle?: boolean; on?: boolean }) {
  const [enabled, setEnabled] = useState(on || false);
  return (
    <View style={st.settingsRow}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}><View style={st.settingsIcon}><Text style={{ fontSize: 15 }}>{icon}</Text></View><Text style={{ color: C.star, fontSize: 15, fontWeight: "500" }}>{title}</Text></View>
      {toggle ? (<Pressable onPress={() => setEnabled(!enabled)} style={[st.toggle, enabled && st.toggleOn]}><View style={[st.toggleDot, enabled && { alignSelf: "flex-end" as const }]} /></Pressable>) : (<Text style={{ color: C.textTertiary, fontSize: 13 }}>{value}</Text>)}
    </View>
  );
}
function cap(v: string) { return v.charAt(0).toUpperCase() + v.slice(1); }

/* ═══ Styles ═══ */
const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.midnight },
  scroll: { padding: 20, paddingBottom: 100 },
  screenTitle: { color: C.star, fontSize: 28, fontWeight: "700", letterSpacing: -0.5 },
  screenSub: { color: C.textTertiary, fontSize: 14, marginTop: 2, marginBottom: 16 },
  homeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.ocean, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.glowCyan },
  streakCard: { backgroundColor: C.card, borderRadius: 18, padding: 16, alignItems: "center", borderWidth: 0.5, borderColor: C.line },
  loomLevel: { padding: 16, borderRadius: 18, backgroundColor: C.oceanBg, borderWidth: 0.5, borderColor: C.glowOcean },
  insightChip: { flex: 1, backgroundColor: C.surface, borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 0.5, borderColor: C.line },
  insightValue: { color: C.star, fontSize: 18, fontWeight: "700" },
  insightLabel: { color: C.textTertiary, fontSize: 10, marginTop: 2 },
  signalCard: { flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 18, backgroundColor: C.surface, borderWidth: 0.5, borderColor: C.line, marginTop: 10 },
  signalIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  glass: { backgroundColor: C.card, borderWidth: 0.5, borderColor: C.line, borderRadius: 18, padding: 16 },
  label: { color: C.silver, fontSize: 11, fontWeight: "600", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pillText: { fontSize: 11, fontWeight: "600", letterSpacing: 0.3 },
  cardTitle: { color: C.star, fontSize: 22, fontWeight: "700", letterSpacing: -0.3 },
  body: { color: C.silver, fontSize: 14, lineHeight: 21 },
  btnPrimary: { backgroundColor: C.cyan, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20, alignItems: "center" },
  btnPrimaryText: { color: C.black, fontSize: 15, fontWeight: "700" },
  btnOutline: { borderWidth: 0.5, borderColor: C.line, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, alignItems: "center" },
  btnOutlineText: { color: C.star, fontSize: 14, fontWeight: "600" },
  questRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, backgroundColor: C.surface, marginTop: 8 },
  questCheck: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: C.glowOcean, alignItems: "center", justifyContent: "center" },
  typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeBtn: { width: "31%" as any, paddingVertical: 14, borderRadius: 16, backgroundColor: C.card, borderWidth: 0.5, borderColor: "transparent", alignItems: "center", gap: 6 },
  typeBtnActive: { borderColor: C.cyan, backgroundColor: C.cyanBg },
  textInput: { backgroundColor: C.surface, borderWidth: 0.5, borderColor: C.line, borderRadius: 16, padding: 14, color: C.star, fontSize: 15, lineHeight: 22, minHeight: 120, marginTop: 12 },
  weaveBtn: { backgroundColor: C.cyan, borderRadius: 16, paddingVertical: 16, alignItems: "center", marginTop: 16 },
  weaveBtnText: { color: C.black, fontSize: 16, fontWeight: "700" },
  barBg: { flex: 1, height: 4, backgroundColor: C.glowOcean, borderRadius: 10, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 10 },
  secLabel: { color: C.silver, fontSize: 12, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginTop: 16, marginBottom: 6 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: C.surface, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 0.5, borderColor: C.line },
  searchInput: { flex: 1, color: C.star, fontSize: 15 },
  ideaCard: { backgroundColor: C.surface, borderWidth: 0.5, borderColor: C.line, borderLeftWidth: 4, borderRadius: 14, padding: 12, marginTop: 8 },
  ideaMeta: { color: C.textTertiary, fontSize: 10, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" },
  miniBtn: { backgroundColor: C.oceanBg, borderRadius: 10, width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  meta: { flex: 1, backgroundColor: C.surface, borderRadius: 12, padding: 12 },
  metaLabel: { color: C.textTertiary, fontSize: 10, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" },
  addBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: C.cyanBg, borderWidth: 0.5, borderColor: C.lineHover, alignItems: "center", justifyContent: "center" },
  shareBtn: { backgroundColor: C.oceanBg, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, alignItems: "center", borderWidth: 0.5, borderColor: C.line },
  shareBtnText: { color: C.star, fontSize: 13, fontWeight: "600" },
  emailBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: C.surface, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 0.5, borderColor: C.lineHover },
  emailBtnText: { color: C.cyan, fontSize: 14, fontWeight: "600" },
  recordBtn: { backgroundColor: C.cyanBg, borderRadius: 28, paddingVertical: 14, paddingHorizontal: 28, borderWidth: 0.5, borderColor: C.lineHover },
  recordBtnActive: { backgroundColor: "rgba(255,80,80,0.15)", borderColor: "rgba(255,80,80,0.3)" },
  recordBtnText: { color: C.star, fontSize: 15, fontWeight: "700" },
  recordingDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FF5050", marginBottom: 10 },
  richBtn: { backgroundColor: C.card, borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 0.5, borderColor: C.line },
  richBtnText: { color: C.silver, fontSize: 12, fontWeight: "600" },
  linkInput: { backgroundColor: C.surface, borderWidth: 0.5, borderColor: C.line, borderRadius: 12, padding: 12, color: C.star, fontSize: 15 },
  attachmentCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: C.cyanBg, borderRadius: 12, padding: 12, marginTop: 12, borderWidth: 0.5, borderColor: C.lineHover },
  statsRow: { flexDirection: "row", gap: 8, marginTop: 16 },
  capsule: { borderRadius: 20, borderWidth: 0.5, padding: 20, marginTop: 14 },
  settingsGroup: { borderRadius: 14, overflow: "hidden", backgroundColor: C.surface },
  settingsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: C.line },
  settingsIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: C.oceanBg, alignItems: "center", justifyContent: "center" },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: C.glowOcean, justifyContent: "center", paddingHorizontal: 3 },
  toggleOn: { backgroundColor: C.cyan },
  toggleDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: C.star },
  tabBar: { flexDirection: "row", backgroundColor: "rgba(2,4,10,0.95)", borderTopWidth: 0.5, borderTopColor: C.line, paddingTop: 8, paddingBottom: Platform.OS === "ios" ? 20 : 10 },
  tabBtn: { flex: 1, alignItems: "center", gap: 3 },
  tabIcon: { fontSize: 20, opacity: 0.4 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 10, fontWeight: "500", color: C.textTertiary, opacity: 0.5 },
  tabLabelActive: { color: C.cyan, opacity: 1 },
});
