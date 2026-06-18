import React, { useEffect, useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'driftloom:everytab-working:v1';

const C = {
  black: '#02040A',
  navy: '#07111F',
  ocean: '#0E2B5C',
  blue: '#4FCBFF',
  silver: '#C7D0DB',
  white: '#EAF6FF',
  mist: '#DFF6FF',
  muted: '#89A8C2',
  green: '#28D99B',
  red: '#FF5757',
  gold: '#FFC64F',
  purple: '#8D65FF',
  card: 'rgba(14,43,92,.44)',
  cardDark: 'rgba(7,17,31,.92)',
};

const logo = require('./assets/brand/driftloom-logo-transparent.png');
const moon = require('./assets/brand/moon-premium.png');
const head = require('./assets/brand/lucid-head-premium.png');
const water = require('./assets/brand/water-premium.png');

const defaultDreams = [
  { id: 'd1', title: 'The floating city', notes: 'I was walking through a city in the clouds. Buildings were made of crystal. I felt curious and calm.', mood: 'Calm', symbols: 'Clouds, City, Crystal, Doorway', lucid: true, vividness: 78, sleep: 74, category: 'Adventure', genre: 'Surreal', date: 'Today', type: 'Dream' },
  { id: 'd2', title: 'Doorway in the rain', notes: 'A silver key opened a hallway filled with ocean air. Rain kept falling indoors.', mood: 'Curious', symbols: 'Doorway, Rain, Key, Ocean', lucid: false, vividness: 69, sleep: 70, category: 'Memory', genre: 'Mystery', date: '2d', type: 'Dream' },
  { id: 'd3', title: 'Tree of light', notes: 'Blue branches grew from a glowing tree. It felt like an idea becoming visible.', mood: 'Inspired', symbols: 'Tree, Light, Branches, Voice', lucid: false, vividness: 83, sleep: 80, category: 'Creative', genre: 'Vision', date: '4d', type: 'Idea' },
];

const defaultFragments = [
  { id: 'f1', type: 'Dream Seed', title: 'What place in your dream felt like home?', date: 'Today' },
  { id: 'f2', type: 'Creative Seed', title: 'A city that remembers every visitor by moonlight.', date: 'Yesterday' },
  { id: 'f3', type: 'Symbol', title: 'Water returned with calm instead of fear.', date: '3d' },
];

const symbolLibrary = [
  { term: 'Water', icon: '🌊', cat: 'Elements', meaning: 'Emotions, intuition, cleansing, and flow. In DriftLoom, symbols are prompts, not fixed diagnoses.', seen: 12, personal: 'Usually appears when emotions are settling.' },
  { term: 'Doorway', icon: '🚪', cat: 'Places', meaning: 'Thresholds, choices, transitions, and the moment before change.', seen: 9, personal: 'Often appears before a big decision.' },
  { term: 'Flight', icon: '🪶', cat: 'Actions', meaning: 'Freedom, perspective, release, and confidence.', seen: 7, personal: 'Shows up when I need distance from a problem.' },
  { term: 'Tree', icon: '🌳', cat: 'Nature', meaning: 'Growth, memory, roots, branching ideas, and creative lineage.', seen: 4, personal: 'Feels connected to ideas and family memory.' },
  { term: 'Moon', icon: '☽', cat: 'Nature', meaning: 'Cycles, intuition, timing, reflection, and the rhythm of inner attention.', seen: 6, personal: 'Appears during emotional reset periods.' },
  { term: 'Key', icon: '🗝️', cat: 'Objects', meaning: 'Access, hidden knowledge, permission, or readiness to open something.', seen: 5, personal: 'A sign that an answer is close.' },
  { term: 'Ocean', icon: '🌊', cat: 'Nature', meaning: 'Depth, the emotional unknown, creative mystery, and the unconscious.', seen: 5, personal: 'Usually calm, not threatening.' },
  { term: 'House', icon: '🏠', cat: 'Places', meaning: 'Identity, memory, inner rooms, and different parts of the self.', seen: 3, personal: 'Old rooms show up when memories are sorting.' },
  { term: 'Mirror', icon: '🪞', cat: 'Objects', meaning: 'Self-awareness, truth, image, and the gap between inner and outer identity.', seen: 3, personal: 'Means I need to be honest with myself.' },
  { term: 'Bridge', icon: '🌉', cat: 'Places', meaning: 'Connection, transition, integration, and crossing into a new stage.', seen: 2, personal: 'A soft transition symbol.' },
  { term: 'Wolf', icon: '🐺', cat: 'Animals', meaning: 'Instinct, protection, loyalty, wildness, and group memory.', seen: 2, personal: 'Protective energy.' },
  { term: 'Fire', icon: '🔥', cat: 'Elements', meaning: 'Passion, transformation, danger, inspiration, and energetic release.', seen: 3, personal: 'Creative pressure.' },
  { term: 'Clock', icon: '🕰️', cat: 'Objects', meaning: 'Timing, pressure, mortality, patience, and the feeling of being late or early.', seen: 2, personal: 'Usually anxiety about deadlines.' },
  { term: 'Forest', icon: '🌲', cat: 'Places', meaning: 'Unknown paths, growth, hidden life, and the edge of clarity.', seen: 4, personal: 'A place for quiet searching.' },
  { term: 'Snake', icon: '🐍', cat: 'Animals', meaning: 'Transformation, healing, hidden fears, and rebirth.', seen: 4, personal: '' },
  { term: 'Butterfly', icon: '🦋', cat: 'Animals', meaning: 'Transformation, rebirth, becoming a new version of yourself.', seen: 2, personal: '' },
  { term: 'Cat', icon: '🐱', cat: 'Animals', meaning: 'Independence, mystery, intuition. Trust your instincts.', seen: 2, personal: '' },
  { term: 'Bird', icon: '🐦', cat: 'Animals', meaning: 'Freedom, perspective, rising above. Messages from the unconscious.', seen: 3, personal: '' },
  { term: 'Fish', icon: '🐟', cat: 'Animals', meaning: 'Unconscious thoughts, abundance, going with the flow.', seen: 1, personal: '' },
  { term: 'Stars', icon: '⭐', cat: 'Nature', meaning: 'Hope, guidance, seeking direction, destiny.', seen: 2, personal: '' },
  { term: 'Rain', icon: '🌧️', cat: 'Elements', meaning: 'Emotional release, renewal, cleansing, letting go.', seen: 2, personal: '' },
  { term: 'Wind', icon: '💨', cat: 'Elements', meaning: 'Change, invisible forces beyond your control.', seen: 1, personal: '' },
  { term: 'Earth', icon: '🌍', cat: 'Elements', meaning: 'Stability, grounding, practical matters need attention.', seen: 2, personal: '' },
  { term: 'Mountain', icon: '⛰️', cat: 'Places', meaning: 'Challenges, ambition, spiritual ascent, achievement.', seen: 1, personal: '' },
  { term: 'Crown', icon: '👑', cat: 'Objects', meaning: 'Authority, self-worth, stepping into your power.', seen: 1, personal: '' },
  { term: 'Feather', icon: '🪶', cat: 'Objects', meaning: 'Freedom, spiritual messages, releasing something heavy.', seen: 2, personal: '' },
  { term: 'Falling', icon: '⬇️', cat: 'Actions', meaning: 'Loss of control, letting go, fear of failing.', seen: 3, personal: '' },
  { term: 'Running', icon: '🏃', cat: 'Actions', meaning: 'Avoidance or pursuit. Escaping or chasing a goal.', seen: 2, personal: '' },
  { term: 'Swimming', icon: '🏊', cat: 'Actions', meaning: 'Navigating emotions, going with the flow.', seen: 1, personal: '' },
  { term: 'Flying', icon: '🕊️', cat: 'Actions', meaning: 'Freedom and limitless potential. Rising above limitations.', seen: 7, personal: '' },
  { term: 'Lucid Dream', icon: '💎', cat: 'Types', meaning: 'Self-awareness in sleep. Conscious meets unconscious.', seen: 2, personal: '' },
  { term: 'Recurring', icon: '🔄', cat: 'Types', meaning: 'Unresolved message repeating until addressed.', seen: 3, personal: '' },
  { term: 'Nightmare', icon: '🌑', cat: 'Types', meaning: 'Processing fear and anxiety. Protective purpose.', seen: 2, personal: '' },
  { term: 'False Awakening', icon: '👁️', cat: 'Types', meaning: 'Dreaming of waking up while still asleep.', seen: 1, personal: '' },
  { term: 'Healing Dream', icon: '💚', cat: 'Types', meaning: 'Emotional or physical restoration during sleep.', seen: 1, personal: '' },
  { term: 'Prophetic', icon: '🔮', cat: 'Types', meaning: 'Dreams that seem to predict future events.', seen: 1, personal: '' },
];

const categories = ['All', 'Nature', 'People', 'Places', 'Objects', 'Actions', 'Animals', 'Elements', 'Types'];
const tarotCards = [['☽','The Moon','Trust your intuition tonight.'],['⭐','The Star','Hope and healing flow through dreams.'],['🗼','The Tower','Old beliefs may shake. Let what crumbles reveal truth.'],['🏔️','The Hermit','Solitude brings clarity. Look inward.'],['💕','The Lovers','Connection and choice appear. What does your heart want?'],['🃏','The Fool','A new journey begins. Leap without fear.'],['✨','The Magician','You have power to shape tonight.'],['🔮','The High Priestess','Mystery deepens. Pay attention to what is hidden.'],['🎡','Wheel of Fortune','Change spins through dreams. Embrace it.'],['🌍','The World','Completion. Tonight closes a chapter.']];
const morningRituals = [['🌙','Whisper your dream intention 3 times before sleep'],['📓','Place journal under your pillow'],['💧','Drink water and say: I will remember my dreams'],['🚪','Visualize a door — decide what is behind it'],['⏰','Set alarm 30 min early for recall window'],['✋','Draw a symbol on your hand — find it in your dream'],['💬','Tell someone about yesterday dream']];
const wakeFeelings = ['Refreshed','Unsettled','Peaceful','Emotional','Groggy','Energized','Confused','Inspired'];
const dreamRoles = ['Myself','Someone else','Observer','Shifting','Invisible'];
const dreamFields = ['How long did it feel?','Weather in dream','Sounds you heard','Dream texture','Dream gravity','Dream temperature','Dream location','Dream scent','Lighting','Scene transitions','Characters','Impossible things','Dream dialogue','Eye contact moment','Numbers or text','What woke you up?','How did time flow?','How did it end?','Superpowers','How you moved','Physical sensations','Dream mission','Background soundtrack','Technology present','Clearest moment'];
const streakChallenges = [
  { days: 7, icon: '🔥', title: '7-Day Dreamer', desc: 'Log a dream 7 days in a row', reward: '50 XP + badge' },
  { days: 14, icon: '⚡', title: 'Fortnight Flow', desc: 'Two straight weeks of dream recall', reward: '150 XP + badge' },
  { days: 30, icon: '🌙', title: 'Moon Cycle Master', desc: 'One full lunar cycle of dream logging', reward: '500 XP + theme unlock' },
  { days: 90, icon: '👑', title: 'Dream Architect', desc: 'Three months — you are a true dream practitioner', reward: '2000 XP + lifetime title' },
];
const creativeFormats = [
  { icon: '📖', title: 'Story Outline', desc: 'Convert dream into a 3-act narrative structure' },
  { icon: '🎨', title: 'Art Prompt', desc: 'Generate a visual art brief from dream imagery' },
  { icon: '🎵', title: 'Song Seed', desc: 'Extract mood, rhythm, and lyric fragments' },
  { icon: '🧘', title: 'Meditation Script', desc: 'Turn dream atmosphere into a guided meditation' },
  { icon: '📝', title: 'Journal Prompt', desc: 'Deep reflection questions based on dream themes' },
  { icon: '🎬', title: 'Scene Treatment', desc: 'Film/video scene description with mood and visuals' },
];
const weeklyReportData = {
  dreams: 5, topMood: 'Curious', topSymbol: 'Doorway', vividnessAvg: 7.2,
  vividnessTrend: 'up', lucidCount: 1, recallRate: 72,
  insight: 'Your dreams are showing a pattern of thresholds and transitions. Pay attention to doorway symbols this week.',
};

const moods = ['Happy', 'Calm', 'Anxious', 'Confused', 'Sad', 'Inspired', 'Peaceful', 'Mysterious'];
const genres = ['Surreal', 'Memory', 'Adventure', 'Nightmare', 'Healing', 'Lucid', 'Creative', 'Recurring'];
const cloudRooms = ['Calm Mist', 'Starlight', 'Deep Ocean', 'Moon Library', 'Forest Window', 'Crystal City'];
const sleepSounds = ['Rain glass', 'Deep ocean', 'Midnight forest', 'Soft thunder', 'White noise', 'Moon wind'];
const dreamFacts = [
  'Most vivid dreams often happen during longer REM periods near morning.',
  'Writing one fragment can unlock the rest of a dream later.',
  'Recurring symbols often change meaning as your life context changes.',
  'Gentle reality checks work better than forcing control.',
];
const affirmations = [
  'Your dreams are signals, not instructions.',
  'Capture the fragment before it fades.',
  'The pattern matters because it returned.',
  'You can notice without needing to explain everything.',
];
const stages = [
  { name: 'Awake', time: '0h 20m', pct: 8, color: C.gold, body: 'Wind down. Set one simple dream intention.' },
  { name: 'Light', time: '4h 20m', pct: 44, color: '#83A8FF', body: 'Memory sorting and early dream fragments.' },
  { name: 'Deep', time: '1h 45m', pct: 23, color: '#6677FF', body: 'Restoration and body repair.' },
  { name: 'REM', time: '2h 10m', pct: 25, color: C.blue, body: 'Vivid dreams, imagery, and emotional processing.' },
];
const lucidTechniques = [
  { name: 'Reality Testing', body: 'Look at your hands, read text twice, and check the time. Ask: am I dreaming?' },
  { name: 'MILD', body: 'Before sleep, repeat a gentle intention: I will notice when I am dreaming.' },
  { name: 'WBTB', body: 'Wake briefly after 4–6 hours, then return to sleep with a calm dream intention. Use gently.' },
  { name: 'WILD', body: 'Maintain awareness as the body falls asleep. Advanced and optional.' },
  { name: 'SSILD', body: 'Cycle through sight, sound, and body sensation before sleep.' },
  { name: 'Dream Signs', body: 'Track recurring symbols and impossible events that can cue lucidity.' },
];
const analysisLenses = ['Symbols', 'Mood', 'Places', 'Characters', 'Lucid', 'Creative', 'Sleep', 'Moon'];
const themes = ['Midnight', 'Glacier', 'Dawn'];
const inkColors = ['Icy Blue', 'Silver', 'White', 'Ocean', 'Gold', 'Violet', 'Green', 'Rose', 'Mist', 'Deep Navy', 'Moon', 'Cloud'];
const fonts = ['System', 'Serif', 'Mono', 'Rounded', 'Editorial', 'Notebook'];
const premiumFeatures = ['Advanced Pattern Insights', 'Symbol Evolution', 'Timeline & Calendar', 'Creative Seeds', 'Custom Themes', 'Security Lock', 'Export & Backup', 'Future AI Reflection'];
const auralunisFeatures = ['Daily Check-in','Feeling Picker','Symbol of the Day','Dream Fact','Dream Weather','Sleep Sounds','Cloud Rooms','Affirmations','Dream Wisdom Quote','Morning Catch Prompt','Top Mood','Top Symbol','Dream Score','Completeness Meter','Dream Genre','Dream World Fields','Characters & Events','Body & Powers','Context Fields','Dream Mission','Reality Breaks','Dialogue','Déjà Vu','Dream Ending','Pattern Detector','Analysis Lenses','Dream DNA','Mood Map','Recurring Symbol Evolution','Creative Seeds','Opt-in AI Reflection','Moon Guide','Sleep Stages','REM Estimator','Smart Wake','Reality Checks','Lucid Techniques','Training Stages','Personal Symbol History','User Meanings','Security Controls','Passcode Lock','Biometric Language','Theme Picker','Ink Colors','Journal Fonts','Journal Backgrounds','Export Journal','Reset Journal','Paywall Modal','Native IAP Copy','Privacy Nutrition Label'];

function nowId(prefix) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 999)}`; }
function parseSymbols(text) { return (text || '').split(',').map(s => s.trim()).filter(Boolean); }
function avg(list, key, fallback = 0) { if (!list.length) return fallback; return Math.round(list.reduce((sum, item) => sum + Number(item[key] || 0), 0) / list.length); }

function Screen({ children }) {
  return <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>{children}<View style={{ height: 94 }} /></ScrollView>;
}
function Header({ title, sub }) {
  return <View style={styles.header}><Text style={styles.title}>{title}</Text>{sub ? <Text style={styles.sub}>{sub}</Text> : null}</View>;
}
function GlassCard({ children, style, success }) {
  return <View style={[styles.card, success && styles.success, style]}>{children}</View>;
}
function Section({ title, right, onPress }) {
  return <View style={styles.section}><Text style={styles.h3}>{title}</Text>{right ? <TouchableOpacity onPress={onPress}><Text style={styles.link}>{right}</Text></TouchableOpacity> : null}</View>;
}
function Row({ icon, title, sub, right, onPress, last }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={[styles.row, last && { borderBottomWidth: 0 }]}><Text style={styles.rowIcon}>{icon}</Text><View style={{ flex: 1 }}><Text style={styles.rowTitle}>{title}</Text>{sub ? <Text style={styles.rowSub}>{sub}</Text> : null}</View>{typeof right === 'object' ? right : <Text style={styles.rowRight}>{right || '›'}</Text>}</TouchableOpacity>;
}
function Stat({ label, value, icon }) {
  return <GlassCard style={styles.stat}><Text style={styles.small}>{label}</Text><Text style={styles.statValue}>{value}{icon ? ` ${icon}` : ''}</Text></GlassCard>;
}
function Pill({ text, active, onPress }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{text}</Text></TouchableOpacity>;
}
function Progress({ pct, color = C.blue }) {
  return <View style={styles.progress}><View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: color }]} /></View>;
}
function Primary({ children, onPress, compact }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.86} style={[styles.primary, compact && { paddingVertical: 10 }]}><Text style={styles.primaryText}>{children}</Text></TouchableOpacity>;
}
function Secondary({ children, onPress }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.86} style={styles.secondary}><Text style={styles.secondaryText}>{children}</Text></TouchableOpacity>;
}
function Toggle({ on }) {
  return <View style={[styles.toggle, !on && { backgroundColor: 'rgba(199,208,219,.2)', alignItems: 'flex-start' }]}><View style={styles.toggleDot} /></View>;
}
function Input({ label, value, onChangeText, placeholder, multiline }) {
  return <><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={C.muted} multiline={multiline} style={[styles.input, multiline && styles.textarea]} /></>;
}
function MiniGraph() {
  return <View style={styles.chart}>{[28,45,70,82,58,36,48,42,55,76,48,67,39,72].map((h, i) => <View key={i} style={[styles.bar, { height: h, backgroundColor: i % 5 === 0 ? C.green : i % 4 === 0 ? C.red : C.blue }]} />)}</View>;
}
function SleepBar() {
  return <View style={styles.sleepBar}>{stages.map(s => <View key={s.name} style={{ flex: s.pct, backgroundColor: s.color }} />)}</View>;
}
function DnaGraphic() {
  return <View style={styles.dnaBox}><View style={styles.dnaGlow} />{[0,1,2,3,4,5,6,7].map(i => <View key={i} style={[styles.dnaRung, { top: 18 + i * 13, transform: [{ rotate: i % 2 ? '18deg' : '-18deg' }] }]}><View style={styles.dnaDot} /><View style={styles.dnaLine} /><View style={styles.dnaDot} /></View>)}<Text style={styles.dnaText}>Dream DNA</Text><Text style={styles.dnaSub}>Your subconscious blueprint</Text></View>;
}
function GraphicCard({ image, title, sub, children, imageStyle }) {
  return <GlassCard style={{ padding: 0, overflow: 'hidden' }}><View style={styles.graphicTop}><Image source={image} style={[styles.graphicImage, imageStyle]} resizeMode="contain" /></View><View style={styles.graphicBody}><Text style={styles.h2}>{title}</Text>{sub ? <Text style={styles.body}>{sub}</Text> : null}{children}</View></GlassCard>;
}
function Notice({ text }) { return text ? <GlassCard success><Text style={styles.h3}>✓ {text}</Text></GlassCard> : null; }
function FeatureGrid() { return <View style={styles.grid2}>{auralunisFeatures.map((f, i) => <Pill key={f} text={f} active={i % 8 === 0} />)}</View>; }

function Home({ app, setTab }) {
  const [seed, setSeed] = useState('');
  const [sound, setSound] = useState('Rain glass');
  const [room, setRoom] = useState('Calm Mist');
  const [notice, setNotice] = useState('');
  const stats = app.stats;
  function saveSeed() {
    const title = seed.trim() || 'What symbol or theme keeps returning?';
    app.addFragment({ type: 'Dream Seed', title });
    setSeed('');
    setNotice('Daily Spark saved to Vault.');
  }
  return <Screen>
    <Header title="Home" sub="Your inner world, at a glance." />
    <View style={styles.hero}><Image source={logo} style={styles.heroLogo} resizeMode="contain" /><Text style={styles.wordmark}>DRIFTLOOM</Text><Text style={styles.tag}>Capture the fragments. Find the pattern. Turn inner drift into direction.</Text></View>
    <Notice text={notice} />
    <GlassCard><Text style={styles.h2}>Good morning, Jamie ✨</Text><Text style={styles.body}>You're recalling 28% more dreams this week. Keep going.</Text></GlassCard>
    <View style={styles.stats}><Stat label="Dreams" value={stats.count} /><Stat label="Day Streak" value="12" icon="🔥" /><Stat label="Recall" value={`${stats.recall}%`} icon="⌁" /></View>
    <GlassCard><View style={styles.between}><View style={{ flex: 1 }}><Text style={styles.h3}>Dream Intelligence</Text><Text style={styles.body}>Tonight's mission: notice doorways, water, and sudden changes in gravity.</Text></View><Text style={styles.scoreBig}>{stats.score}</Text></View><Progress pct={stats.score} /></GlassCard>
    <View style={styles.actionRow}><Primary onPress={() => setTab('Journal')}>New Dream</Primary><Secondary onPress={() => setTab('Journal')}>Capture Idea</Secondary></View>
    <Section title="Daily Spark" />
    <GlassCard><Text style={styles.body}>What symbol or theme keeps returning in your dreams?</Text><TextInput value={seed} onChangeText={setSeed} placeholder="Write your answer..." placeholderTextColor={C.muted} style={styles.input} /><Primary compact onPress={saveSeed}>Save as Fragment</Primary></GlassCard>
    <Section title="Daily Check-in" />
    <GlassCard><Text style={styles.body}>How did you wake up today?</Text><View style={styles.chips}>{['Bright','Calm','Foggy','Heavy','Inspired'].map(x => <Pill key={x} text={x} active={app.checkin.feeling === x} onPress={() => app.setCheckin({ ...app.checkin, feeling: x })} />)}</View><View style={styles.stats}><Stat label="Sleep" value={`${app.checkin.sleep}h`} /><Stat label="Stress" value={app.checkin.stress} /><Stat label="Energy" value={app.checkin.energy} /></View><Primary compact onPress={() => app.addFragment({ type: 'Check-in', title: `Woke up ${app.checkin.feeling}` })}>Save Check-in</Primary></GlassCard>
    <GlassCard><View style={styles.between}><View style={{ flex: 1 }}><Text style={styles.small}>Current Moon</Text><Text style={styles.h2}>Waxing Gibbous</Text><Text style={styles.body}>Illumination: 72% · Dream recall may feel vivid tonight.</Text></View><Image source={moon} style={styles.moonIcon} resizeMode="contain" /></View></GlassCard>
    <Section title="Symbol of the Day" right="Open Dictionary" onPress={() => setTab('Dictionary')} />
    <GraphicCard image={water} title="Water" sub="Emotion, intuition, cleansing, flow. Track how this symbol changes for you over time." imageStyle={{ height: 116 }}><Primary compact onPress={() => setTab('Dictionary')}>Open Symbol History</Primary></GraphicCard>
    <Section title="AuraLunis Home Features" />
    <GlassCard><Row icon="☁️" title="Dream Weather" sub="Clear conditions for deep rest and recall" right="Good" /><Row icon="🎧" title="Sleep Sound Palette" sub={sound} right="Change" onPress={() => setSound(sleepSounds[(sleepSounds.indexOf(sound) + 1) % sleepSounds.length])} /><Row icon="🏔️" title="Cloud Rooms" sub={room} right="Change" onPress={() => setRoom(cloudRooms[(cloudRooms.indexOf(room) + 1) % cloudRooms.length])} /><Row icon="✦" title="Private Affirmation" sub={affirmations[app.affirmationIndex]} right="Next" onPress={app.nextAffirmation} /><Row icon="💡" title="Dream Fact" sub={dreamFacts[app.factIndex]} right="Next" onPress={app.nextFact} last /></GlassCard>
    <Section title="Dream Challenges" right="PLUS" />
    <GlassCard>{streakChallenges.map((c,i)=><Row key={c.title} icon={c.icon} title={c.title} sub={c.desc} right={c.reward} last={i===streakChallenges.length-1} />)}</GlassCard>
    <Section title="Dream Tarot" right="Draw" />
    <GlassCard>{tarotCards.slice(0,3).map(t=><Row key={t[1]} icon={t[0]} title={t[1]} sub={t[2]} />)}</GlassCard>
    <Section title="Morning Rituals" />
    <GlassCard>{morningRituals.map((r,i)=><Row key={r[1]} icon={r[0]} title={r[1]} last={i===morningRituals.length-1} />)}</GlassCard>
    <Section title="Recent Fragments" right="See All" onPress={() => setTab('Settings')} />
    <GlassCard>{[...app.fragments, ...app.dreams].slice(0, 5).map((d, i) => <Row key={d.id || d.title + i} icon={d.type === 'Idea' ? '💡' : d.type === 'Dream Seed' ? '✦' : '🌙'} title={d.title} sub={`${d.type || 'Dream'} · ${d.symbols || d.notes || 'Private entry'}`} right={d.date} last={i === Math.min(4, app.fragments.length + app.dreams.length - 1)} />)}</GlassCard>
  </Screen>;
}

function Journal({ app, setTab }) {
  const [mode, setMode] = useState('quick');
  const [notice, setNotice] = useState('');
  const [open, setOpen] = useState({ world: true, people: false, body: false, reflection: false, context: false, lucid: false });
  const d = app.draft;
  const set = (patch) => app.setDraft({ ...d, ...patch });
  const completeness = app.completeness;
  function save() {
    app.saveDream();
    setNotice('Fragment Captured. Added to your inner archive.');
  }
  const Accordion = ({ id, title, sub, children }) => <GlassCard><TouchableOpacity onPress={() => setOpen({ ...open, [id]: !open[id] })} style={styles.between}><View><Text style={styles.h3}>{title}</Text><Text style={styles.body}>{sub}</Text></View><Text style={styles.chev}>{open[id] ? '⌄' : '›'}</Text></TouchableOpacity>{open[id] ? <View style={styles.deepArea}>{children}</View> : null}</GlassCard>;
  return <Screen>
    <Header title={mode === 'quick' ? 'Journal' : 'Deep Journal'} sub={mode === 'quick' ? 'Quick Capture. Capture fast. Go deeper later.' : "Go deeper when you're ready."} />
    <Notice text={notice} />
    <View style={styles.chips}><Pill text="Quick Capture" active={mode === 'quick'} onPress={() => setMode('quick')} /><Pill text="Deep Journal" active={mode === 'deep'} onPress={() => setMode('deep')} /></View>
    <GlassCard><View style={styles.between}><Text style={styles.h3}>Dream Completeness</Text><Text style={styles.body}>{completeness}%</Text></View><Progress pct={completeness} /></GlassCard>
    {mode === 'quick' ? <>
      <GlassCard>
        <Input label="Dream Title" value={d.title} onChangeText={title => set({ title })} placeholder="The floating city" />
        <Input label="What do you remember?" value={d.notes} onChangeText={notes => set({ notes })} placeholder="Capture the fragment before it fades..." multiline />
        <Text style={styles.count}>{d.notes.length}/2000</Text>
        <Text style={styles.label}>Mood When Woke</Text><View style={styles.chips}>{moods.slice(0, 6).map(m => <Pill key={m} text={m} active={d.mood === m} onPress={() => set({ mood: m })} />)}</View>
        <Row icon="◉" title="Lucid?" sub="Were you aware you were dreaming?" right={<Toggle on={d.lucid} />} onPress={() => set({ lucid: !d.lucid })} />
        <Input label="Symbols (comma separated)" value={d.symbols} onChangeText={symbols => set({ symbols })} placeholder="Clouds, City, Crystal, Doorway" />
    <Section title="Wake Feeling" />
    <GlassCard><View style={styles.chips}>{wakeFeelings.map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Dream Role" />
    <GlassCard><View style={styles.chips}>{dreamRoles.map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Expanded Dream Fields" />
    <GlassCard><View style={styles.grid2}>{dreamFields.map(f=><Pill key={f} text={f}/>)}</View></GlassCard>
    <Section title="Wake Feeling" />
    <GlassCard><View style={styles.chips}>{wakeFeelings.map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Dream Role" />
    <GlassCard><View style={styles.chips}>{dreamRoles.map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Expanded Dream Fields" />
    <GlassCard><View style={styles.grid2}>{dreamFields.map(f=><Pill key={f} text={f}/>)}</View></GlassCard>
        <TouchableOpacity onPress={() => setMode('deep')}><Text style={styles.deepLink}>Deep Journal 〉</Text></TouchableOpacity>
        <Primary onPress={save}>✓ Save Dream</Primary>
    <Section title="AI Dream Reading" right="PLUS" />
    <GlassCard><Text style={styles.h3}>🔮 AI Dream Interpretation</Text><Text style={styles.body}>{`\nSave a dream, then tap for AI analysis. Reads your symbols, emotional patterns, and connections to past dreams.\n\nPowered by Anthropic Claude — private, no data stored.`}</Text><Primary compact onPress={()=>{}}>Analyze This Dream</Primary></GlassCard>
    <Section title="Audio Capture" right="PLUS" />
    <GlassCard><View style={styles.between}><View style={{flex:1}}><Text style={styles.h3}>🎙 Voice Dream Capture</Text><Text style={styles.body}>Record a voice memo the moment you wake — auto-transcribed into your journal.</Text></View><View style={{width:56,height:56,borderRadius:28,backgroundColor:'rgba(79,203,255,0.15)',borderWidth:2,borderColor:C.blue,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:24}}>⏺</Text></View></View></GlassCard>
    <Section title="Dream Card" right="PLUS" />
    <GlassCard><Text style={styles.h3}>✦ Export as Beautiful Card</Text><Text style={styles.body}>Turn this dream into a gorgeous branded card for Instagram, Pinterest, or your journal. DriftLoom aesthetic with mood, symbols, and key imagery.</Text><View style={styles.chips}>{['Instagram Story','Square Post','Pinterest Pin','Print Card'].map(x=><Pill key={x} text={x}/>)}</View><Primary compact onPress={()=>{}}>Create Dream Card</Primary></GlassCard>
        <Text style={styles.footerNote}>You can always edit and add more details later.</Text>
      </GlassCard>
      <Section title="Recent Dreams" />
      <GlassCard>{app.dreams.slice(0, 4).map((dream, i) => <Row key={dream.id} icon="🌙" title={dream.title} sub={dream.symbols || dream.notes} right={dream.date} onPress={() => app.editDream(dream)} last={i === Math.min(3, app.dreams.length - 1)} />)}</GlassCard>
    </> : <>
      <Accordion id="world" title="Dream World" sub="Location, weather, lighting, texture">
        <Input label="Location" value={d.location} onChangeText={location => set({ location })} placeholder="Crystal city, ocean hallway, childhood house" />
        <Input label="Weather" value={d.weather} onChangeText={weather => set({ weather })} placeholder="Rain, mist, moonlight" />
        <Input label="Lighting" value={d.lighting} onChangeText={lighting => set({ lighting })} placeholder="Blue glow, silver dawn" />
        <Input label="Texture" value={d.texture} onChangeText={texture => set({ texture })} placeholder="Glass, velvet, water, smoke" />
      </Accordion>
      <Accordion id="people" title="People & Events" sub="Characters, dialogue, mission">
        <Input label="Characters" value={d.characters} onChangeText={characters => set({ characters })} placeholder="Who appeared?" />
        <Input label="Dialogue" value={d.dialogue} onChangeText={dialogue => set({ dialogue })} placeholder="What was said?" multiline />
        <Input label="Dream Mission" value={d.mission} onChangeText={mission => set({ mission })} placeholder="What were you trying to do?" />
        <Input label="Reality Breaks" value={d.breaks} onChangeText={breaks => set({ breaks })} placeholder="Impossible things, scene jumps, loops" />
      </Accordion>
      <Accordion id="body" title="Body & Experience" sub="Movement, sensations, powers">
        <Input label="Movement" value={d.movement} onChangeText={movement => set({ movement })} placeholder="Flying, floating, running, stuck" />
        <Input label="Sensation" value={d.sensation} onChangeText={sensation => set({ sensation })} placeholder="Temperature, weight, sound, touch" />
        <Input label="Superpower" value={d.power} onChangeText={power => set({ power })} placeholder="Flight, invisibility, time shift" />
        <Input label="Gravity / Time Flow" value={d.gravity} onChangeText={gravity => set({ gravity })} placeholder="Heavy, light, slow, looping" />
      </Accordion>
      <Accordion id="reflection" title="Reflection" sub="Meaning, connections, notes">
        <Input label="Clearest Moment" value={d.clearest} onChangeText={clearest => set({ clearest })} placeholder="The image you still remember" />
        <Input label="Creative Seed" value={d.creative} onChangeText={creative => set({ creative })} placeholder="Could this become a story, art, product, song?" multiline />
        <Input label="Personal Meaning" value={d.meaning} onChangeText={meaning => set({ meaning })} placeholder="What might this be circling?" multiline />
      </Accordion>
      <Accordion id="context" title="Context" sub="Pre-sleep thought, déjà vu, ending">
        <Input label="Pre-sleep Thought" value={d.presleep} onChangeText={presleep => set({ presleep })} placeholder="What was on your mind before sleep?" />
        <Input label="Déjà Vu" value={d.dejavu} onChangeText={dejavu => set({ dejavu })} placeholder="Did this feel familiar?" />
        <Input label="Dream Ending" value={d.ending} onChangeText={ending => set({ ending })} placeholder="How did it end?" />
        <Input label="Wake Trigger" value={d.wakeTrigger} onChangeText={wakeTrigger => set({ wakeTrigger })} placeholder="Alarm, noise, emotion, sudden image" />
      </Accordion>
      <Accordion id="lucid" title="Lucid Details" sub="Awareness, stability, control, safety">
        <Text style={styles.body}>Teach awareness before control. DriftLoom avoids promising guaranteed dream control.</Text>
        <View style={styles.chips}>{['Aware','Stable','Spun out','Asked question','Touched scene'].map(x => <Pill key={x} text={x} active={(d.lucidNotes || '').includes(x)} onPress={() => set({ lucidNotes: `${d.lucidNotes || ''} ${x}`.trim() })} />)}</View>
      </Accordion>
      <View style={styles.actionRow}><Secondary onPress={() => setMode('quick')}>Back</Secondary><Primary onPress={save}>Save Dream</Primary></View>
    </>}
  </Screen>;
}

function Insights({ app, setTab }) {
  const [lens, setLens] = useState('Symbols');
  const symbols = app.symbolCounts.slice(0, 5);
  return <Screen>
    <Header title="Insights" sub="See the patterns you might miss." />
    <GlassCard style={{ padding: 0, overflow: 'hidden' }}><DnaGraphic /></GlassCard>
    <Section title="At a Glance" />
    <View style={styles.stats}><Stat label="Dreams" value={app.stats.count} /><Stat label="Avg. Vividness" value={`${app.stats.vivid}/100`} /><Stat label="Lucid Dreams" value={`${app.stats.lucid}%`} /></View>
    <Section title="Analysis Lenses" />
    <GlassCard><View style={styles.chips}>{analysisLenses.map(x => <Pill key={x} text={x} active={lens === x} onPress={() => setLens(x)} />)}</View><Text style={styles.body}>Current lens: {lens}. DriftLoom compares recurring symbols, moods, dream places, sleep quality, lunar timing, and creative seeds.</Text></GlassCard>
    <Section title="Pattern Detector" />
    <GlassCard><Row icon="🌊" title="Water + Doorways" sub="These often appear together when the dream points toward a transition." right="High" /><Row icon="☁️" title="Cloud Cities" sub="A recurring creative place. Save as a worldbuilding seed." right="3x" /><Row icon="🔥" title="Calm after stress" sub="You often record calmer dreams after high-energy days." right="Trend" last /></GlassCard>
    <Section title="Top Recurring Symbols" right="Dictionary" onPress={() => setTab('Dictionary')} />
    <GlassCard>{symbols.map((s, i) => <Row key={s.term} icon={s.icon} title={s.term} sub={s.meaning} right={`${s.seen} times`} last={i === symbols.length - 1} />)}</GlassCard>
    <Section title="Emotional Trend (14 Days)" />
    <GlassCard><MiniGraph /><View style={styles.legend}><Pill text="Positive" active /><Pill text="Neutral" /><Pill text="Challenging" /></View></GlassCard>
    <Section title="Creative Seeds" />
    <GlassCard><Row icon="💡" title="Story concept" sub="A floating city that stores memories in glass towers." right="Save" onPress={() => app.addFragment({ type: 'Creative Seed', title: 'Floating city that stores memories in glass towers' })} /><Row icon="🎨" title="Art prompt" sub="A silver doorway opening into ocean rain." right="Save" onPress={() => app.addFragment({ type: 'Creative Seed', title: 'Silver doorway opening into ocean rain' })} /><Row icon="🎵" title="Song seed" sub="Blue branches, soft thunder, and a voice in the trees." right="Save" onPress={() => app.addFragment({ type: 'Creative Seed', title: 'Blue branches and a voice in the trees' })} last /></GlassCard>
    <Section title="Private Insight Note" />
    <GlassCard><Text style={styles.body}>No hidden AI calls. Future AI reflection should be opt-in and clearly disclosed. Your journal stays private by design.</Text></GlassCard>
    <Section title="Dream Calendar" right="PLUS" />
    <GlassCard><Text style={styles.h3}>📅 Dream Timeline</Text><Text style={styles.body}>Visual month grid — each day color-coded by mood. Tap any day to see that night's dream. Track streaks and patterns at a glance.</Text><View style={styles.grid2}>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><Text key={d} style={[styles.small,{flex:1,textAlign:'center'}]}>{d}</Text>)}</View><View style={styles.grid2}>{Array.from({length:28}).map((_,i)=><View key={i} style={{width:36,height:36,borderRadius:8,backgroundColor:i%3===0?'rgba(79,203,255,0.3)':i%5===0?'rgba(40,217,155,0.3)':i%7===0?'rgba(255,87,87,0.2)':'rgba(14,43,92,0.3)',margin:2,alignItems:'center',justifyContent:'center'}}><Text style={styles.small}>{i+1}</Text></View>)}</View></GlassCard>
    <Section title="Symbol Evolution" right="PLUS" />
    <GlassCard><Text style={styles.h3}>📈 Symbol Tracking Over Time</Text><Text style={styles.body}>See how your symbols change in frequency and context across weeks and months.</Text><Row icon="🌊" title="Water" sub="Jan: 3x (calm) → Mar: 8x (turbulent) → Jun: 5x (flowing)" right="↗" /><Row icon="🚪" title="Doorway" sub="Appeared 2x before career change, 4x during transition" right="→" /><Row icon="🌙" title="Moon" sub="Peaks around full moon phases. Correlates with vividness." right="↗" last /></GlassCard>
    <Section title="Dream-to-Creative" right="PLUS" />
    <GlassCard><Text style={styles.h3}>✨ Dream → Creative Pipeline</Text><Text style={styles.body}>Convert any dream into creative output. AI-powered transformation of your dream material.</Text>{creativeFormats.map((f,i)=><Row key={f.title} icon={f.icon} title={f.title} sub={f.desc} right="→" last={i===creativeFormats.length-1} />)}</GlassCard>
    <Section title="Weekly Report" right="PLUS" />
    <GlassCard><Text style={styles.h3}>📊 Weekly Dream Report</Text><View style={styles.stats}><Stat label="Dreams" value={weeklyReportData.dreams} /><Stat label="Vividness" value={weeklyReportData.vividnessAvg} /><Stat label="Recall" value={`${weeklyReportData.recallRate}%`} /></View><Row icon="🎭" title={`Top Mood: ${weeklyReportData.topMood}`} sub="Most frequent emotional state this week" /><Row icon="🔑" title={`Top Symbol: ${weeklyReportData.topSymbol}`} sub="Recurring across 3 of 5 dreams" /><Row icon="💡" title="Weekly Insight" sub={weeklyReportData.insight} last /><Text style={[styles.body,{marginTop:8,fontStyle:'italic'}]}>Your vividness is trending {weeklyReportData.vividnessTrend}. {weeklyReportData.lucidCount} lucid dream this week.</Text></GlassCard>
  </Screen>;
}

function Cycles({ app }) {
  const [bed, setBed] = useState('10:45 PM');
  const [wake, setWake] = useState('7:15 AM');
  const [selectedStage, setSelectedStage] = useState('REM');
  const stage = stages.find(s => s.name === selectedStage) || stages[3];
  return <Screen>
    <Header title="Cycles" sub="Align with your natural rhythms." />
    <GlassCard><View style={styles.between}><View style={{ flex: 1 }}><Text style={styles.small}>Moon Phase</Text><Text style={styles.h2}>Waxing Gibbous</Text><Text style={styles.body}>Illumination: 72% · Integration, vividness, and recall are building.</Text></View><Image source={moon} style={styles.moonIconBig} resizeMode="contain" /></View></GlassCard>
    <GlassCard><Row icon="☁️" title="Tonight's Sleep Outlook" sub="Great conditions for deep rest and dream recall." right="Good" last /></GlassCard>
    <GlassCard><Input label="Sleep Window" value={bed} onChangeText={setBed} placeholder="10:45 PM" /><Input label="Wake Time" value={wake} onChangeText={setWake} placeholder="7:15 AM" /><Text style={styles.h2}>{bed} – {wake}</Text><Text style={styles.body}>Aim for 8h 30m. Best recall window: 6:45 AM – 7:15 AM.</Text></GlassCard>
    <Section title="Sleep Stages" />
    <GlassCard><SleepBar /><View style={styles.legend}>{stages.map(s => <Pill key={s.name} text={`${s.name} ${s.time}`} active={selectedStage === s.name} onPress={() => setSelectedStage(s.name)} />)}</View><Text style={[styles.h3, { marginTop: 12 }]}>{stage.name}</Text><Text style={styles.body}>{stage.body}</Text></GlassCard>
    <Section title="REM Estimator" />
    <GlassCard><Row icon="1" title="First REM" sub="Around 12:15 AM" right="short" /><Row icon="2" title="Middle REM" sub="Around 3:20 AM" right="building" /><Row icon="3" title="Morning REM" sub="Around 6:40 AM" right="long" last /></GlassCard>
    <Section title="Lunar Phase Guide" />
    <GlassCard><Row icon="○" title="New Moon" sub="Set dream intention" /><Row icon="◐" title="First Quarter" sub="Notice choices and crossroads" /><Row icon="●" title="Full Moon" sub="Peak vividness and emotional brightness" /><Row icon="◑" title="Last Quarter" sub="Review, release, integrate" last /></GlassCard>
    <Section title="Smart Wake" />
    <GlassCard><Row icon="⏰" title="Smart Wake Window" sub="6:45 AM – 7:15 AM. Wake during lighter sleep for better recall." right="On" /><Row icon="📊" title="Sleep Consistency" sub="Keep bedtime within 45 minutes for stronger recall." right="82%" last /></GlassCard>
  </Screen>;
}

function Lucid({ app }) {
  const [checks,setChecks]=useState([true,false,false,false]);
  const [windDown,setWindDown]=useState(false);
  const [stageOpen,setStageOpen]=useState('');
  const [techOpen,setTechOpen]=useState('');
  const [expOpen,setExpOpen]=useState('');
  const toggle=i=>{const n=[...checks];n[i]=!n[i];setChecks(n);};
  return <Screen>
    <Header title="Lucid Practice" sub="Train your awareness. Explore your potential." />
    <GlassCard><View style={styles.between}><View style={{flex:1}}><Text style={styles.small}>Your Progress</Text><Text style={styles.h2}>Explorer</Text><Text style={styles.body}>Level 2 · 420 / 1000 XP</Text><Progress pct={42}/></View><Image source={head} style={styles.head} resizeMode="contain" /></View></GlassCard>
    <Section title="What is Lucid Dreaming?" />
    <GlassCard><Text style={styles.h3}>The art of waking within</Text><Text style={styles.body}>{`\nLucid dreaming means becoming aware you are dreaming while the dream is still happening. The experience ranges from a brief flash of awareness to sustained, vivid dream control.\n\nThe prefrontal cortex — normally quiet in sleep — reactivates. Brain scans show a hybrid state: REM sleep plus frontal lobe awareness. Gamma wave bursts (30-40 Hz) often precede the moment of lucidity.\n\nResearch by Stephen LaBerge at Stanford confirmed lucid dreaming through pre-arranged eye movement signals from sleeping subjects.\n\nDriftLoom teaches awareness before control and avoids unsafe promises.`}</Text></GlassCard>
    <Section title="Today's Practice" />
    <GlassCard>{['Look at your hands — do they look normal?','Read text twice — it changes in dreams','Push finger through palm — it may pass through','Check a clock — time behaves strangely'].map((x,i)=><Row key={x} icon={checks[i]?'✓':'◯'} title={x} sub="Reality check" right={checks[i]?'Done':'Tap'} onPress={()=>toggle(i)}/>)}<Text style={[styles.body,{marginTop:8}]}>Do at least 10 reality checks per day. The key is genuine questioning, not mechanical habit.</Text></GlassCard>
    <Section title="Techniques (tap to expand)" />
    {[['Reality Testing (RT)','Beginner','The foundation. Throughout your day, pause and genuinely question whether you are dreaming. Look at your hands, read text, check clocks, try pushing your finger through your palm. The habit carries into dreams. When something is wrong — text shifts, extra fingers — you realize you are dreaming.'],['MILD — Mnemonic Induction','Intermediate','Developed by Stephen LaBerge. As you fall asleep, repeat: "Next time I dream, I will realize I am dreaming." Visualize a recent dream, recognizing a dream sign and becoming lucid. Best practiced after waking from a dream mid-night — your recall is fresh.'],['WBTB — Wake Back to Bed','Intermediate','Set an alarm for 5-6 hours after falling asleep. Stay alert 20-30 minutes (read your dream journal, visualize becoming lucid), then go back to sleep. This targets the longest REM period. Combined with MILD, WBTB has the highest success rate in studies. Avoid screens during the awake period.'],['WILD — Wake Initiated','Advanced','The most direct but challenging technique. Stay conscious as your body falls asleep. Focus on hypnagogic imagery — colors, shapes, scenes behind your eyelids. You may experience brief sleep paralysis — normal and harmless. Let the dream form around you.'],['SSILD — Senses Initiated','Intermediate','Cycle attention through your senses: sight (colors behind eyelids), hearing (sounds), touch (body sensations). Do 4-6 cycles of ~5 seconds each. The magic happens not during cycles, but in the sleep that follows. Best combined with WBTB.'],['Dream Signs','Beginner','Review your journal for recurring themes, characters, locations, or impossible events. Common: flying, back in school, teeth falling out, being chased, impossible architecture. Once you know your dream signs, reality check every time you encounter one.']].map(t=><GlassCard key={t[0]}><TouchableOpacity onPress={()=>setTechOpen(techOpen===t[0]?'':t[0])} style={styles.between}><View style={{flex:1}}><Text style={styles.h3}>{t[0]}</Text><Text style={styles.body}>{t[1]}</Text></View><Text style={styles.chev}>{techOpen===t[0]?'⌃':'⌄'}</Text></TouchableOpacity>{techOpen===t[0]?<View style={styles.deepArea}><Text style={styles.body}>{t[2]}</Text></View>:null}</GlassCard>)}
    <Section title="Stages of Development" />
    {[['1. Dream Recall','Weeks 1–3','Before you can become lucid, you need to remember your dreams. Keep a journal by your bed. Write anything — even fragments.'],['2. Dream Signs','Weeks 2–4','Review your journal for recurring themes. These become your personal triggers for lucidity.'],['3. First Lucid Moment','Weeks 3–8','Your first lucid dream may last only seconds. You might realize and immediately wake from excitement. Normal.'],['4. Stabilization','Weeks 6–12','Stay in the dream once lucid. Rub your hands, touch the ground, spin slowly, or say "clarity now."'],['5. Dream Control','Months 2–4','Begin experimenting — fly, walk through walls, change scenes. Start small. Control improves with practice.'],['6. Deep Practice','Months 4+','Advanced dreamers use lucid dreams for creative problem-solving, emotional healing, skill rehearsal, and exploring consciousness.']].map(s=><GlassCard key={s[0]}><TouchableOpacity onPress={()=>setStageOpen(stageOpen===s[0]?'':s[0])} style={styles.between}><View style={{flex:1}}><Text style={styles.h3}>{s[0]}</Text><Text style={styles.body}>{s[1]}</Text></View><Text style={styles.chev}>{stageOpen===s[0]?'⌃':'⌄'}</Text></TouchableOpacity>{stageOpen===s[0]?<View style={styles.deepArea}><Text style={styles.body}>{s[2]}</Text></View>:null}</GlassCard>)}
    <Section title="Daily Training Routine" />
    <GlassCard><Row icon="☀️" title="Morning Recall" sub="Write any fragment immediately upon waking."/><Row icon="◉" title="Midday Reality Check" sub="Pause and ask: How did I get here? Am I dreaming?"/><Row icon="🌙" title="Evening Review" sub="Read your dream journal. Look for patterns and dream signs."/><Row icon="✦" title="Sleep Intention" sub="Tonight, I will notice when I am dreaming."/><Row icon="📝" title="Dream Sign Check" sub="Did you encounter any dream signs today?" last/></GlassCard>
    <Section title="Benefits" />
    <GlassCard><Row icon="🧠" title="Self-awareness" sub="Strengthens metacognition — thinking about your own thinking."/><Row icon="🎨" title="Creative inspiration" sub="Artists, musicians, writers, and scientists use lucid dreams for breakthroughs."/><Row icon="😴" title="Nightmare resolution" sub="Clinically used to treat recurring nightmares. Awareness lets you rewrite the script."/><Row icon="🏋️" title="Skill rehearsal" sub="Studies show practicing skills in lucid dreams improves real-world performance."/><Row icon="💚" title="Emotional healing" sub="A safe space to process grief, anxiety, trauma, and difficult emotions."/><Row icon="✨" title="Exploring consciousness" sub="At its deepest, lucid dreaming explores what it means to be aware." last/></GlassCard>
    <Section title="Common Experiences" />
    {[['False Awakenings','You dream of waking up, but you are still dreaming. Do a reality check every time you "wake up" — especially if anything feels slightly off.'],['Sleep Paralysis','Brief inability to move when falling asleep or waking. Normal and harmless. Your body naturally paralyzes during REM. Stay calm and it passes in seconds.'],['Dream Collapse','The dream starts to fade or dissolve. Stabilize by rubbing hands, touching ground, spinning slowly, or focusing on a detail.'],['Dream Characters','Dream characters may behave independently. Ask them: "What do you represent?" or "What should I know?" Their answers often reveal subconscious insights.']].map(e=><GlassCard key={e[0]}><TouchableOpacity onPress={()=>setExpOpen(expOpen===e[0]?'':e[0])} style={styles.between}><View style={{flex:1}}><Text style={styles.h3}>{e[0]}</Text></View><Text style={styles.chev}>{expOpen===e[0]?'⌃':'⌄'}</Text></TouchableOpacity>{expOpen===e[0]?<View style={styles.deepArea}><Text style={styles.body}>{e[1]}</Text></View>:null}</GlassCard>)}
    <Section title="How to Stay Lucid" />
    <GlassCard><Row icon="✋" title="Touch the scene" sub="Feel walls, ground, water. Sensory input anchors you."/><Row icon="🫧" title="Slow excitement" sub="Take one slow breath. Name what you see. Excitement causes waking."/><Row icon="🗣️" title="Name the dream" sub='Say: "This is a dream. I am dreaming." Verbal affirmation strengthens lucidity.'/><Row icon="🌀" title="Spin slowly" sub="If fading, spin your dream body. This often resets the scene."/><Row icon="👐" title="Rub your hands" sub="Classic LaBerge technique. Friction generates dream-sensory feedback."/><Row icon="?" title="Ask one question" sub="Keep it simple. 'What should I explore?' works better than forcing control." last/></GlassCard>
    <TouchableOpacity onPress={()=>setWindDown(!windDown)}><Text style={styles.deepLink}>{windDown?'Hide':'Show'} Sleep Wind-Down Routine</Text></TouchableOpacity>
    {windDown?<><Section title="Sleep Wind-Down" /><GlassCard><Row icon="📵" title="Screens off" sub="Blue light suppresses melatonin for up to 90 minutes."/><Row icon="☕" title="Warm drink" sub="Chamomile tea, warm milk, or golden latte. No caffeine after 2 PM."/><Row icon="🧘" title="Gentle stretch" sub="5 minutes of gentle yoga or box breathing (4-4-4-4)."/><Row icon="📖" title="Read or reflect" sub="Gentle reading (not news). Or journal about your day."/><Row icon="🌙" title="Dream intention" sub='Close your eyes and say: "Tonight, I will remember my dreams."'/><Row icon="🫂" title="Body scan" sub="Relax each body part from toes to head."/><Row icon="💡" title="Lights out" sub="Total darkness signals melatonin release. Use an eye mask."/><Row icon="🕊️" title="Surrender" sub="Release the day. Let sleep arrive naturally." last/></GlassCard><Section title="Wind-Down Tips" /><GlassCard><Row icon="🌡️" title="Cool bedroom (65–68°F)" sub="Cooler temps boost REM sleep significantly."/><Row icon="🌿" title="Aromatherapy" sub="Lavender or cedarwood on your pillow."/><Row icon="😎" title="Eye mask" sub="Total darkness deepens sleep cycles."/><Row icon="📝" title="Brain dump" sub="Write tomorrow's tasks to clear your mind."/><Row icon="🍽️" title="No heavy meals 2h before" sub="Digestion competes with dream states."/><Row icon="5️⃣" title="5-4-3-2-1 grounding" sub="5 see, 4 touch, 3 hear, 2 smell, 1 taste." last/></GlassCard></>:null}
    <Section title="Safety Guidance" />
    <GlassCard><Text style={styles.body}>Lucid dreaming is safe for most people. DriftLoom does not promise guaranteed control. Avoid sleep disruption as a primary goal. If you experience persistent sleep issues, consult a professional.{`\n\n`}Remember: lucid dreaming is not about controlling your dreams — it is about becoming aware within them. The dreamer who observes gently learns more than the one who forces the scene.</Text></GlassCard>
  </Screen>;
}

function Dictionary({ app }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState('Water');
  const [meaning, setMeaning] = useState('');
  const list = app.symbolCounts.filter(s => (cat === 'All' || s.cat === cat || (cat === 'Elements' && s.cat === 'Nature')) && (!search || s.term.toLowerCase().includes(search.toLowerCase()) || s.meaning.toLowerCase().includes(search.toLowerCase())));
  const symbol = app.symbolCounts.find(s => s.term === selected) || app.symbolCounts[0];
  function saveMeaning() { if (meaning.trim()) { app.setPersonalMeanings({ ...app.personalMeanings, [symbol.term]: meaning.trim() }); app.addFragment({ type: 'Symbol Meaning', title: `${symbol.term}: ${meaning.trim()}` }); setMeaning(''); } }
  return <Screen>
    <Header title="Dictionary" sub="Explore symbols. Discover personal meaning." />
    <TextInput value={search} onChangeText={setSearch} placeholder="Search symbols..." placeholderTextColor={C.muted} style={styles.input} />
    <View style={styles.chips}>{categories.map(c => <Pill key={c} text={c} active={cat === c} onPress={() => setCat(c)} />)}</View>
    <Section title="Featured Symbol" />
    <GraphicCard image={water} title={symbol.term} sub={symbol.meaning} imageStyle={{ height: 118 }}><View style={styles.stats}><Stat label="Seen" value={symbol.seen} /><Stat label="Category" value={symbol.cat} /><Stat label="Mood" value="Calm" /></View><Text style={styles.body}>Personal meaning: {app.personalMeanings[symbol.term] || symbol.personal}</Text></GraphicCard>
    <Section title="Symbol Library" right={`${list.length} shown`} />
    <GlassCard>{list.map((s, i) => <Row key={s.term} icon={s.icon} title={s.term} sub={s.meaning} right={`${s.seen} times`} onPress={() => setSelected(s.term)} last={i === list.length - 1} />)}</GlassCard>
    <Section title="My Meaning" />
    <GlassCard><Text style={styles.body}>Add your own meaning for {symbol.term}. This keeps DriftLoom personal instead of generic.</Text><TextInput value={meaning} onChangeText={setMeaning} placeholder="For me, this symbol means..." placeholderTextColor={C.muted} style={styles.input} /><Primary compact onPress={saveMeaning}>Save Personal Meaning</Primary></GlassCard>
    <Section title="Seen in My Dreams" />
    <GlassCard>{app.dreams.filter(d => (d.symbols || '').toLowerCase().includes(symbol.term.toLowerCase())).slice(0, 4).map((d, i) => <Row key={d.id} icon="🌙" title={d.title} sub={d.symbols} right={d.date} last={i === 3} />)}{!app.dreams.some(d => (d.symbols || '').toLowerCase().includes(symbol.term.toLowerCase())) ? <Text style={styles.body}>No saved dreams with this symbol yet.</Text> : null}</GlassCard>
    <Section title="Dream Q&A" />
    <GlassCard><Row icon="?" title="What does this symbol mean?" sub="Start with your personal association, then compare gentle archetypal prompts." /><Row icon="◎" title="Can symbols change meaning?" sub="Yes. DriftLoom tracks your personal history over time." /><Row icon="⚖" title="Culturally sensitive wording" sub="No symbol has one absolute meaning for every person." last /></GlassCard>
  </Screen>;
}

function Settings({ app }) {
  const [notice, setNotice] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);
  function exportJournal() { setNotice(`Export ready: ${app.dreams.length} dreams and ${app.fragments.length} fragments.`); }
  function reset() { app.resetData(); setNotice('Demo data restored.'); }
  return <Screen>
    <Header title="Settings" sub="Your privacy. Your choice." />
    <Notice text={notice} />
    <GlassCard><View style={styles.profile}><Image source={logo} style={styles.avatar} resizeMode="contain" /><View style={{ flex: 1 }}><Text style={styles.h2}>Jamie</Text><Text style={styles.body}>Dreamer since Jun 2024 · Ocoee Studios</Text></View></View></GlassCard>
    <Section title="Privacy & Security" />
    <GlassCard><Row icon="♙" title="Passcode Lock" sub="Protect your private journal" right={<Toggle on={app.settings.lock} />} onPress={() => app.updateSettings({ lock: !app.settings.lock })} /><Row icon="◉" title="Face ID / Biometric Language" sub="Uses local device authentication later" right={<Toggle on={app.settings.bio} />} onPress={() => app.updateSettings({ bio: !app.settings.bio })} /><Row icon="▣" title="Auto-Lock" right={app.settings.autoLock} onPress={() => app.updateSettings({ autoLock: app.settings.autoLock === 'After 5 minutes' ? 'After 1 minute' : 'After 5 minutes' })} /><Row icon="👁️" title="Hide Previews" sub="Keep dream snippets hidden from app switcher" right={<Toggle on={app.settings.hidePreviews} />} onPress={() => app.updateSettings({ hidePreviews: !app.settings.hidePreviews })} /><Row icon="⇩" title="Export Journal" onPress={exportJournal} /><Row icon="⌫" title="Reset Demo Data" onPress={reset} last /></GlassCard>
    <Section title="Journal Appearance" />
    <GlassCard><Text style={styles.label}>Theme Picker</Text><View style={styles.chips}>{themes.map(t => <Pill key={t} text={t} active={app.settings.theme === t} onPress={() => app.updateSettings({ theme: t })} />)}</View><Text style={styles.label}>Ink Colors</Text><View style={styles.chips}>{inkColors.map(t => <Pill key={t} text={t} active={app.settings.ink === t} onPress={() => app.updateSettings({ ink: t })} />)}</View><Text style={styles.label}>Journal Fonts</Text><View style={styles.chips}>{fonts.map(t => <Pill key={t} text={t} active={app.settings.font === t} onPress={() => app.updateSettings({ font: t })} />)}</View><Row icon="▧" title="Journal Backgrounds" sub="Paper, glass, stars, mist" right={app.settings.background} onPress={() => app.updateSettings({ background: app.settings.background === 'Glass' ? 'Stars' : 'Glass' })} last /></GlassCard>
    <Section title="Subscription" />
    <GlassCard><Row icon="👑" title="DriftLoom Plus" sub="Advanced insights, symbol evolution, themes, export" right="Manage" onPress={() => setShowPaywall(!showPaywall)} />{showPaywall ? <View style={styles.paywall}><Text style={styles.h2}>Premium Experience</Text><Text style={styles.body}>Monthly $3.99 · Annual $29.99 with 7-day trial · Lifetime Founder $39.99</Text><View style={styles.grid2}>{premiumFeatures.map(x => <Pill key={x} text={x} />)}</View><View style={styles.actionRow}><Primary compact onPress={() => { app.updateSettings({ hasAccess: true }); setNotice('Trial started.'); }}>Try 7 Days Free</Primary><Secondary onPress={() => setNotice('Restore purchase checked.')}>Restore</Secondary></View></View> : <Primary compact onPress={() => setShowPaywall(true)}>Try 7 Days Free</Primary>}</GlassCard>
    <Section title="Privacy Nutrition" />
    <GlassCard><Row icon="✓" title="Stored locally first" sub="No hidden AI calls in prototype." /><Row icon="×" title="No ads. No third-party tracking." /><Row icon="⇩" title="Export or delete anytime." /><Row icon="⊕" title="Optional account later" sub="Not required for prototype." last /></GlassCard>
    <Section title="App Store Readiness" />
    <GlassCard><Row icon="□" title="Privacy Policy" /><Row icon="□" title="Terms of Use" /><Row icon="⊕" title="Support Email" /><Row icon="☑" title="Screenshots" sub="Use approved mockup style" /><Row icon="ⓘ" title="About DriftLoom" right="v1.0.0" last /></GlassCard>
    <Section title="AuraLunis Feature Checklist" />
    <GlassCard><FeatureGrid /></GlassCard>
  </Screen>;
}

const emptyDraft = { title: '', notes: '', mood: 'Calm', symbols: '', lucid: false, vividness: 72, sleep: 74, category: '', genre: '', location: '', weather: '', lighting: '', texture: '', characters: '', dialogue: '', mission: '', breaks: '', movement: '', sensation: '', power: '', gravity: '', clearest: '', creative: '', meaning: '', presleep: '', dejavu: '', ending: '', wakeTrigger: '', lucidNotes: '' };
const defaultSettings = { lock: true, bio: true, autoLock: 'After 5 minutes', hidePreviews: true, theme: 'Midnight', ink: 'Icy Blue', font: 'System', background: 'Glass', hasAccess: false };

const tabComponents = { Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings };
const icons = { Home: '⌂', Journal: '▧', Insights: '◌', Cycles: '◔', Lucid: '✦', Dictionary: '▱', Settings: '⚙' };
function TabBar({ tab, setTab }) {
  return <View style={styles.tabbar}>{Object.keys(tabComponents).map(t => <TouchableOpacity key={t} onPress={() => setTab(t)} style={styles.tab}><Text style={[styles.tabIcon, tab === t && styles.tabActive]}>{icons[t]}</Text><Text style={[styles.tabText, tab === t && styles.tabActive]}>{t}</Text></TouchableOpacity>)}</View>;
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const [dreams, setDreams] = useState(defaultDreams);
  const [fragments, setFragments] = useState(defaultFragments);
  const [draft, setDraft] = useState(emptyDraft);
  const [checkin, setCheckin] = useState({ feeling: 'Calm', sleep: '7.4', stress: 'Low', energy: 'Med' });
  const [checks, setChecks] = useState([false, false, false, false]);
  const [settings, setSettings] = useState(defaultSettings);
  const [personalMeanings, setPersonalMeanings] = useState({});
  const [factIndex, setFactIndex] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.dreams) setDreams(data.dreams);
      if (data.fragments) setFragments(data.fragments);
      if (data.checkin) setCheckin(data.checkin);
      if (data.checks) setChecks(data.checks);
      if (data.settings) setSettings({ ...defaultSettings, ...data.settings });
      if (data.personalMeanings) setPersonalMeanings(data.personalMeanings);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ dreams, fragments, checkin, checks, settings, personalMeanings })).catch(() => {});
  }, [dreams, fragments, checkin, checks, settings, personalMeanings]);

  const symbolCounts = useMemo(() => {
    const counts = {};
    dreams.forEach(d => parseSymbols(d.symbols).forEach(s => { counts[s.toLowerCase()] = (counts[s.toLowerCase()] || 0) + 1; }));
    return symbolLibrary.map(s => ({ ...s, seen: Math.max(s.seen, counts[s.term.toLowerCase()] || 0), personal: personalMeanings[s.term] || s.personal })).sort((a, b) => b.seen - a.seen);
  }, [dreams, personalMeanings]);

  const stats = useMemo(() => {
    const count = dreams.length;
    const vivid = avg(dreams, 'vividness', 72);
    const lucid = Math.round((dreams.filter(d => d.lucid).length / Math.max(1, count)) * 100);
    const score = Math.round((vivid + lucid + 70) / 3);
    return { count, vivid, lucid, score, recall: Math.max(72, vivid - 3) };
  }, [dreams]);

  const completeness = useMemo(() => {
    const fields = ['title','notes','mood','symbols','location','characters','clearest','meaning'];
    return Math.round(fields.filter(f => String(draft[f] || '').trim()).length / fields.length * 100);
  }, [draft]);

  function saveDream() {
    const title = draft.title.trim() || 'Untitled Dream';
    const entry = { ...draft, id: nowId('dream'), title, type: draft.category === 'Creative' ? 'Idea' : 'Dream', date: 'Today', vividness: Number(draft.vividness || 72), sleep: Number(draft.sleep || 74) };
    setDreams([entry, ...dreams]);
    setDraft(emptyDraft);
  }
  function editDream(dream) { setDraft({ ...emptyDraft, ...dream }); setTab('Journal'); }
  function addFragment(fragment) { setFragments([{ id: nowId('frag'), date: 'Today', ...fragment }, ...fragments]); }
  function updateSettings(patch) { setSettings({ ...settings, ...patch }); }
  function resetData() { setDreams(defaultDreams); setFragments(defaultFragments); setDraft(emptyDraft); setChecks([false,false,false,false]); setSettings(defaultSettings); setPersonalMeanings({}); }
  function nextFact() { setFactIndex((factIndex + 1) % dreamFacts.length); }
  function nextAffirmation() { setAffirmationIndex((affirmationIndex + 1) % affirmations.length); }

  const app = { dreams, setDreams, fragments, setFragments, draft, setDraft, saveDream, editDream, addFragment, checkin, setCheckin, checks, setChecks, settings, updateSettings, personalMeanings, setPersonalMeanings, symbolCounts, stats, completeness, factIndex, nextFact, affirmationIndex, nextAffirmation, resetData };
  const Current = tabComponents[tab];
  return <SafeAreaView style={styles.app}><StatusBar barStyle="light-content" /><View style={styles.phone}><Current app={app} setTab={setTab} /><TabBar tab={tab} setTab={setTab} /></View></SafeAreaView>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.black, alignItems: 'center' },
  phone: { width: '100%', maxWidth: 430, flex: 1, backgroundColor: C.black },
  screen: { padding: 18, paddingTop: 12 },
  header: { alignItems: 'center', marginBottom: 16, paddingTop: 6 },
  title: { fontSize: 23, color: C.white, fontWeight: '700' },
  sub: { color: C.white, fontSize: 15, textAlign: 'center', lineHeight: 21, marginTop: 4 },
  hero: { alignItems: 'center', marginBottom: 16 },
  heroLogo: { width: 210, height: 150 },
  wordmark: { color: C.white, fontSize: 34, letterSpacing: 9, marginTop: -16 },
  tag: { color: C.white, textAlign: 'center', lineHeight: 19, marginTop: 8, maxWidth: 280 },
  card: { backgroundColor: C.card, borderColor: 'rgba(79,203,255,.28)', borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 12, shadowColor: C.blue, shadowOpacity: .12, shadowRadius: 16 },
  success: { borderColor: C.green, backgroundColor: 'rgba(40,217,155,.14)' },
  h2: { fontSize: 17, color: C.white, fontWeight: '700' },
  h3: { fontSize: 15, color: C.white, fontWeight: '700' },
  body: { color: C.silver, fontSize: 12.5, lineHeight: 18 },
  label: { color: C.silver, fontSize: 12, marginBottom: 8, marginTop: 4 },
  small: { color: C.silver, fontSize: 11 },
  link: { color: C.blue, fontSize: 12 },
  stats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  stat: { flex: 1, marginBottom: 0 },
  statValue: { color: C.white, fontSize: 20, marginTop: 8 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  scoreBig: { color: C.white, fontSize: 32, fontWeight: '800' },
  moonIcon: { width: 72, height: 72 },
  moonIconBig: { width: 96, height: 96 },
  section: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(199,208,219,.12)', paddingVertical: 10, gap: 10 },
  rowIcon: { fontSize: 20, width: 28 },
  rowTitle: { color: C.white, fontSize: 15, fontWeight: '600' },
  rowSub: { color: C.silver, fontSize: 11, marginTop: 2 },
  rowRight: { color: C.silver, fontSize: 12, textAlign: 'right', maxWidth: 140 },
  chev: { color: C.white, fontSize: 22 },
  input: { backgroundColor: 'rgba(2,4,10,.38)', borderWidth: 1, borderColor: 'rgba(199,208,219,.35)', borderRadius: 10, color: C.white, padding: 12, marginBottom: 12 },
  textarea: { minHeight: 112, textAlignVertical: 'top' },
  count: { alignSelf: 'flex-end', color: C.silver, fontSize: 10, marginTop: -24, marginBottom: 8 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  pill: { paddingVertical: 9, paddingHorizontal: 11, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(79,203,255,.25)', backgroundColor: 'rgba(14,43,92,.35)' },
  pillActive: { backgroundColor: '#006EEA', borderColor: C.blue },
  pillText: { color: C.silver, fontSize: 11, textAlign: 'center' },
  pillTextActive: { color: C.white },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toggle: { width: 50, height: 28, backgroundColor: '#0B7CFF', borderRadius: 16, alignItems: 'flex-end', justifyContent: 'center', padding: 3 },
  toggleDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: C.white },
  deepLink: { color: C.blue, textAlign: 'center', fontSize: 16, marginVertical: 14 },
  primary: { backgroundColor: '#008CFF', borderRadius: 14, padding: 14, alignItems: 'center', marginVertical: 4, flex: 1 },
  primaryText: { color: C.white, fontWeight: '700', textAlign: 'center' },
  secondary: { borderWidth: 1, borderColor: 'rgba(199,208,219,.45)', borderRadius: 14, padding: 14, alignItems: 'center', marginVertical: 4, flex: 1 },
  secondaryText: { color: C.white, fontWeight: '700' },
  footerNote: { color: C.muted, textAlign: 'center', fontSize: 11, marginTop: 8 },
  deepArea: { marginTop: 12 },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  paywall: { marginTop: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(199,208,219,.15)' },
  progress: { height: 9, backgroundColor: 'rgba(79,203,255,.15)', borderRadius: 8, overflow: 'hidden', flex: 1, marginVertical: 8 },
  progressFill: { height: '100%', borderRadius: 8 },
  graphicTop: { height: 132, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(2,4,10,.25)' },
  graphicImage: { width: '100%', height: 132 },
  graphicBody: { padding: 14 },
  chart: { height: 116, flexDirection: 'row', alignItems: 'flex-end', gap: 6, paddingTop: 12 },
  bar: { flex: 1, borderRadius: 6 },
  legend: { flexDirection: 'row', justifyContent: 'space-around', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  sleepBar: { height: 12, flexDirection: 'row', borderRadius: 6, overflow: 'hidden', marginVertical: 12 },
  head: { width: 118, height: 100 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  dnaBox: { height: 158, backgroundColor: 'rgba(2,14,34,.92)', padding: 18, overflow: 'hidden' },
  dnaGlow: { position: 'absolute', right: -30, top: -20, width: 170, height: 170, borderRadius: 85, backgroundColor: 'rgba(79,203,255,.10)' },
  dnaRung: { position: 'absolute', right: 26, width: 145, flexDirection: 'row', alignItems: 'center' },
  dnaDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: C.blue, shadowColor: C.blue, shadowOpacity: .8, shadowRadius: 10 },
  dnaLine: { height: 2, flex: 1, backgroundColor: 'rgba(199,208,219,.55)', marginHorizontal: 5 },
  dnaText: { color: C.white, fontSize: 21, fontWeight: '800', marginTop: 18 },
  dnaSub: { color: C.silver, fontSize: 12, marginTop: 6 },
  tabbar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 76, backgroundColor: 'rgba(2,4,10,.97)', borderTopWidth: 1, borderTopColor: 'rgba(79,203,255,.24)', flexDirection: 'row', paddingTop: 8 },
  tab: { flex: 1, alignItems: 'center' },
  tabIcon: { color: C.muted, fontSize: 19 },
  tabText: { color: C.muted, fontSize: 9, marginTop: 3 },
  tabActive: { color: C.blue },
});
