import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const C = {
  black:'#02040A', navy:'#07111F', ocean:'#0E2B5C', blue:'#4FCBFF', silver:'#C7D0DB', white:'#EAF6FF', mist:'#DFF6FF', muted:'#89A8C2',
  green:'#28D99B', red:'#FF5757', gold:'#FFC64F', purple:'#8D65FF', card:'rgba(14,43,92,.44)', cardDark:'rgba(7,17,31,.92)'
};

const logo = require('./assets/brand/driftloom-logo-transparent.png');
const moon = require('./assets/brand/moon-premium.png');
const head = require('./assets/brand/lucid-head-premium.png');
const water = require('./assets/brand/water-premium.png');

const sampleDreams = [
  { title:'The floating city', sub:'Clouds, crystal towers, doorway', mood:'Calm', score:78, type:'Dream', when:'Today' },
  { title:'Doorway in the rain', sub:'Ocean, hallway, silver key', mood:'Curious', score:69, type:'Dream', when:'2d' },
  { title:'Tree of light', sub:'Branches, blue sparks, voice', mood:'Inspired', score:83, type:'Idea', when:'4d' },
];
const symbolData = [
  ['Water','Emotions, intuition, cleansing, flow','12 times','🌊','Nature'],
  ['Doorway','Thresholds, choices, transitions','9 times','🚪','Places'],
  ['Flight','Freedom, perspective, confidence','7 times','🪶','Actions'],
  ['Tree','Growth, memory, branching ideas','4 times','🌳','Nature'],
  ['Moon','Cycles, intuition, timing, reflection','6 times','☽','Nature'],
  ['Key','Access, hidden knowledge, permission','5 times','🗝️','Objects'],
  ['Ocean','Depth, emotion, creative unknown','5 times','🌊','Nature'],
  ['House','Identity, memory, inner rooms','3 times','🏠','Places'],
  ['Mirror','Self-awareness, reflection, truth','3 times','🪞','Objects'],
  ['Bridge','Connection, transition, integration','2 times','🌉','Places'],
];
const techniques = [
  ['Reality Testing','Look at hands, read text twice, check time'],
  ['MILD','Mnemonic Induction of Lucid Dreams'],
  ['WBTB','Wake Back To Bed, used gently'],
  ['WILD','Wake Initiated Lucid Dream'],
  ['SSILD','Senses Initiated Lucid Dream'],
  ['Dream Signs','Notice repeated symbols that hint you are dreaming'],
];
const auralunisFeatures = [
  'Daily Check-in','Feeling Picker','Symbol of the Day','Dream Fact','Dream Weather','Sleep Sounds','Cloud Rooms','Affirmations','Dream Wisdom Quote','Morning Catch Prompt','Top Mood','Top Symbol','Dream Score','Completeness Meter','Dream Genre','Dream World Fields','Characters & Events','Body & Powers','Context Fields','Dream Mission','Reality Breaks','Dialogue','Déjà Vu','Dream Ending','Pattern Detector','Analysis Lenses','Dream DNA','Mood Map','Recurring Symbol Evolution','Creative Seeds','Opt-in AI Reflection','Moon Guide','Sleep Stages','REM Estimator','Smart Wake','Reality Checks','Lucid Techniques','Training Stages','Personal Symbol History','User Meanings','Security Controls','Passcode Lock','Biometric Language','Theme Picker','Ink Colors','Journal Fonts','Journal Backgrounds','Export Journal','Reset Journal','Paywall Modal','Native IAP Copy','Privacy Nutrition Label'
];

function Screen({ children }) { return <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>{children}<View style={{height:94}} /></ScrollView>; }
function Header({ title, sub }) { return <View style={styles.header}><Text style={styles.title}>{title}</Text>{sub ? <Text style={styles.sub}>{sub}</Text> : null}</View>; }
function GlassCard({ children, style }) { return <View style={[styles.card, style]}>{children}</View>; }
function Section({ title, right }) { return <View style={styles.section}><Text style={styles.h3}>{title}</Text>{right ? <Text style={styles.link}>{right}</Text> : null}</View>; }
function Row({ icon, title, sub, right, onPress }) { return <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.row}><Text style={styles.rowIcon}>{icon}</Text><View style={{flex:1}}><Text style={styles.rowTitle}>{title}</Text>{sub ? <Text style={styles.rowSub}>{sub}</Text> : null}</View>{typeof right === 'object' ? right : <Text style={styles.rowRight}>{right || '›'}</Text>}</TouchableOpacity>; }
function Stat({ label, value, icon }) { return <GlassCard style={styles.stat}><Text style={styles.small}>{label}</Text><Text style={styles.statValue}>{value}{icon ? ` ${icon}` : ''}</Text></GlassCard>; }
function Pill({ text, active, onPress }) { return <TouchableOpacity onPress={onPress} style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{text}</Text></TouchableOpacity>; }
function Progress({ pct, color=C.blue }) { return <View style={styles.progress}><View style={[styles.progressFill,{width:`${pct}%`, backgroundColor:color}]} /></View>; }
function Primary({ children, onPress, compact }) { return <TouchableOpacity onPress={onPress} style={[styles.primary, compact && {paddingVertical:10}]}><Text style={styles.primaryText}>{children}</Text></TouchableOpacity>; }
function Secondary({ children, onPress }) { return <TouchableOpacity onPress={onPress} style={styles.secondary}><Text style={styles.secondaryText}>{children}</Text></TouchableOpacity>; }
function Toggle({ on }) { return <View style={[styles.toggle, !on && {backgroundColor:'rgba(199,208,219,.2)', alignItems:'flex-start'}]}><View style={styles.toggleDot}/></View>; }
function GraphicCard({ image, title, sub, children, imageStyle }) { return <GlassCard style={{padding:0, overflow:'hidden'}}><View style={styles.graphicTop}><Image source={image} style={[styles.graphicImage, imageStyle]} resizeMode="contain" /></View><View style={styles.graphicBody}><Text style={styles.h2}>{title}</Text>{sub ? <Text style={styles.body}>{sub}</Text> : null}{children}</View></GlassCard>; }
function MiniGraph() { return <View style={styles.chart}>{[28,45,70,82,58,36,48,42,55,76,48,67,39,72].map((h,i)=><View key={i} style={[styles.bar,{height:h, backgroundColor:i%5===0?C.green:i%4===0?C.red:C.blue}]} />)}</View>; }
function DnaGraphic(){ return <View style={styles.dnaBox}><View style={styles.dnaGlow}/>{[0,1,2,3,4,5,6,7].map(i=><View key={i} style={[styles.dnaRung,{top:18+i*13, transform:[{rotate: i%2?'18deg':'-18deg'}]}]}><View style={styles.dnaDot}/><View style={styles.dnaLine}/><View style={styles.dnaDot}/></View>)}<Text style={styles.dnaText}>Dream DNA</Text><Text style={styles.dnaSub}>Your subconscious blueprint</Text></View>; }
function FeatureGrid(){ return <View style={styles.grid2}>{auralunisFeatures.map((f,i)=><Pill key={f} text={f} active={i%7===0}/>)}</View>; }

function Home({ setTab }) {
  const [feeling,setFeeling]=useState('Calm');
  const [seed,setSeed]=useState('');
  return <Screen>
    <Header title="Home" sub="Your inner world, at a glance." />
    <View style={styles.hero}><Image source={logo} style={styles.heroLogo} resizeMode="contain" /><Text style={styles.wordmark}>DRIFTLOOM</Text><Text style={styles.tag}>Capture the fragments. Find the pattern. Turn inner drift into direction.</Text></View>
    <GlassCard><Text style={styles.h2}>Good morning, Jamie ✨</Text><Text style={styles.body}>You're recalling 28% more dreams this week. Keep going.</Text></GlassCard>
    <View style={styles.stats}><Stat label="Dreams" value="128"/><Stat label="Day Streak" value="12" icon="🔥"/><Stat label="Recall" value="72%" icon="⌁"/></View>
    <GlassCard><View style={styles.between}><View style={{flex:1}}><Text style={styles.h3}>Dream Intelligence</Text><Text style={styles.body}>Tonight's mission: notice doorways, water, and sudden changes in gravity.</Text></View><Text style={styles.scoreBig}>78</Text></View><Progress pct={78}/></GlassCard>
    <Section title="Daily Spark" />
    <GlassCard><Text style={styles.body}>What symbol or theme keeps returning in your dreams?</Text><TextInput value={seed} onChangeText={setSeed} placeholder="Write your answer..." placeholderTextColor={C.muted} style={styles.input}/><Primary compact onPress={()=>setTab('Journal')}>Save as Fragment</Primary></GlassCard>
    <Section title="Daily Check-in" />
    <GlassCard><Text style={styles.body}>How did you wake up today?</Text><View style={styles.chips}>{['Bright','Calm','Foggy','Heavy','Inspired'].map(x=><Pill key={x} text={x} active={feeling===x} onPress={()=>setFeeling(x)} />)}</View><View style={styles.stats}><Stat label="Sleep" value="7.4h"/><Stat label="Stress" value="Low"/><Stat label="Energy" value="Med"/></View></GlassCard>
    <GlassCard><View style={styles.between}><View><Text style={styles.small}>Current Moon</Text><Text style={styles.h2}>Waxing Gibbous</Text><Text style={styles.body}>Illumination: 72% · Dream recall may feel vivid tonight.</Text></View><Image source={moon} style={styles.moonIcon} resizeMode="contain" /></View></GlassCard>
    <Section title="Symbol of the Day" right="Water" />
    <GraphicCard image={water} title="Water" sub="Emotion, intuition, cleansing, flow. Track how this symbol changes for you over time." imageStyle={{height:116}}><Primary compact onPress={()=>setTab('Dictionary')}>Open Dictionary</Primary></GraphicCard>
    <Section title="AuraLunis Home Features" />
    <GlassCard><Row icon="☁️" title="Dream Weather" sub="Clear conditions for deep rest and recall" right="Good"/><Row icon="🎧" title="Sleep Sound Palette" sub="Rain glass · Deep ocean · Midnight forest"/><Row icon="🏔️" title="Cloud Rooms" sub="Choose a calm mood space before sleep"/><Row icon="✦" title="Private Affirmation" sub="Your dreams are signals, not instructions."/><Row icon="💡" title="Dream Fact" sub="Most vivid dreams happen during REM-rich morning sleep."/><Row icon="❝" title="Dream Wisdom" sub="The fragment matters because it returned."/></GlassCard>
    <Section title="Recent Fragments" right="See All" />
    <GlassCard>{sampleDreams.map((d,i)=><Row key={d.title} icon={i===0?'🌆':i===1?'🚪':'🌳'} title={d.title} sub={`${d.type} · ${d.sub}`} right={d.when} />)}</GlassCard>
  </Screen>;
}

function Journal() {
  const [deep,setDeep] = useState(false); const [saved,setSaved] = useState(false); const [mood,setMood]=useState('Calm');
  if (deep) return <DeepJournal onBack={()=>setDeep(false)} onSave={()=>setSaved(true)} />;
  return <Screen>
    <Header title="Journal" sub="Quick Capture" />
    {saved ? <GlassCard style={styles.success}><Text style={styles.h2}>Fragment Captured ✓</Text><Text style={styles.body}>Added to your private inner archive.</Text></GlassCard> : null}
    <GlassCard><Text style={styles.label}>Dream Title</Text><TextInput defaultValue="The floating city" style={styles.input}/><Text style={styles.label}>What do you remember?</Text><TextInput multiline defaultValue={'I was walking through a city in the clouds. Buildings were made of crystal. I felt curious and calm.'} style={[styles.input,styles.textarea]}/><Text style={styles.count}>124/2000</Text></GlassCard>
    <Text style={styles.label}>Mood When Woke</Text><View style={styles.chips}>{['Happy','Calm','Anxious','Confused','Sad'].map(x=><Pill key={x} text={x} active={mood===x} onPress={()=>setMood(x)} />)}</View>
    <GlassCard><Row icon="◉" title="Lucid?" sub="Were you aware it was a dream?" right={<Toggle on/>}/><Text style={styles.label}>Symbols</Text><TextInput defaultValue="Clouds, City, Crystal, Doorway" style={styles.input}/></GlassCard>
    <Section title="AuraLunis Quick Fields" />
    <GlassCard><View style={styles.grid2}>{['Vividness 8/10','Sleep Quality Good','Wake Feeling Calm','Category Flying','Genre Adventure','Dream Duration 20m','Weather Mist','Sound Wind'].map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Capture Attachments" />
    <GlassCard><Row icon="🎙️" title="Voice Note" sub="Placeholder for later audio capture"/><Row icon="🖼️" title="Image / Sketch" sub="Placeholder for future photo or drawing attachment"/><Row icon="⌂" title="Home Screen Widget" sub="Fast dream drop from outside the app"/></GlassCard>
    <TouchableOpacity onPress={()=>setDeep(true)}><Text style={styles.deepLink}>Open Deep Journal  ›</Text></TouchableOpacity>
    <Primary onPress={()=>setSaved(true)}>◎ Save Dream</Primary>
    <Text style={styles.footerNote}>Capture fast. Go deeper later.</Text>
  </Screen>;
}
function DeepJournal({ onBack, onSave }) {
  const [open,setOpen]=useState('Dream World');
  const sections = [
    ['Dream World','Location, weather, sounds, texture, lighting','Location, dream weather, dream sounds, texture, lighting, scene transition, gravity, scent'],
    ['People & Events','Characters, dialogue, mission, impossible things','Characters, role, names, dialogue, dream mission, reality breaks, conflicts, companions'],
    ['Body & Experience','Movement, sensations, powers, gravity, scent','Movement, sensations, superpower, body feeling, fear/ease, control level'],
    ['Lucid Details','Reality checks, dream control, stabilization','Reality checks, trigger, stabilization action, lucidity duration, technique used'],
    ['Creative Meaning','Story seeds, art prompt, idea incubation','Creative seed, visual motif, product/story/art idea, waking insight'],
    ['Context','Pre-sleep thoughts, déjà vu, wake trigger, ending','Pre-sleep thought, déjà vu, wake trigger, clearest moment, dream ending'],
  ];
  return <Screen>
    <TouchableOpacity onPress={onBack}><Text style={styles.back}>‹ Quick Capture</Text></TouchableOpacity>
    <Header title="Journal" sub="Deep Journal" />
    <GlassCard><Text style={styles.small}>Dream Completeness</Text><View style={styles.between}><Progress pct={78}/><Text style={styles.score}>78%</Text></View></GlassCard>
    {sections.map(s=><GlassCard key={s[0]}><TouchableOpacity onPress={()=>setOpen(open===s[0]?'':s[0])} style={styles.between}><View><Text style={styles.h2}>{s[0]}</Text><Text style={styles.body}>{s[1]}</Text></View><Text style={styles.chev}>{open===s[0]?'⌃':'⌄'}</Text></TouchableOpacity>{open===s[0] ? <View style={styles.deepArea}><Text style={styles.body}>{s[2]}</Text><TextInput multiline placeholder="Add details..." placeholderTextColor={C.muted} style={[styles.input,styles.textareaSmall]}/></View> : null}</GlassCard>)}
    <GlassCard><Text style={styles.h2}>Completion Suggestions</Text><Text style={styles.body}>Add one symbol, one feeling, one place, and one impossible thing to improve future pattern insights.</Text></GlassCard>
    <View style={styles.actionRow}><Secondary onPress={onBack}>Save Draft</Secondary><Primary onPress={onSave}>Save Dream</Primary></View>
  </Screen>;
}

function Insights() {
  const [lens,setLens]=useState('Patterns');
  return <Screen>
    <Header title="Insights" sub="See the patterns you might miss." />
    <GlassCard style={{padding:0, overflow:'hidden'}}><DnaGraphic/></GlassCard>
    <View style={styles.stats}><Stat label="Dreams" value="128"/><Stat label="Avg. Vividness" value="7.4"/><Stat label="Lucid" value="18%"/></View>
    <Section title="Analysis Lenses" />
    <View style={styles.chips}>{['Patterns','Emotion','Symbols','Creative','Sleep'].map(x=><Pill key={x} text={x} active={lens===x} onPress={()=>setLens(x)}/>)}</View>
    <Section title="Pattern Detector" />
    <GlassCard><Row icon="🌊" title="Water + Doorways" sub="Appears most when your waking notes mention transition." right="High"/><Row icon="🏙️" title="Floating Places" sub="Linked to creative breakthroughs and curiosity." right="Med"/><Row icon="☽" title="Moon Timing" sub="Your vividness rises around waxing phases." right="72%"/></GlassCard>
    <Section title="Top Recurring Symbols" right="See All" />
    <GlassCard>{symbolData.slice(0,5).map(s=><Row key={s[0]} icon={s[3]} title={s[0]} sub={s[1]} right={s[2]} />)}</GlassCard>
    <Section title="Emotional Trend" />
    <GlassCard><MiniGraph/><View style={styles.legend}><Text style={styles.body}>● Positive</Text><Text style={styles.body}>● Neutral</Text><Text style={styles.body}>● Challenging</Text></View></GlassCard>
    <Section title="Dream DNA Details" />
    <GlassCard><Row icon="🧬" title="Core Pattern" sub="Exploration through thresholds"/><Row icon="🎭" title="Top Mood" sub="Curiosity with calm undertone"/><Row icon="🏔️" title="Common Setting" sub="Elevated cities, water edges, bright rooms"/><Row icon="🔊" title="Common Sound" sub="Wind, rain, distant voice"/></GlassCard>
    <Section title="Creative Seeds" />
    <GlassCard><Text style={styles.h2}>Dream-to-Idea Converter</Text><Text style={styles.body}>Water + doorway + floating city could become: a story scene, album cover, product concept, meditation prompt, or painting brief.</Text><View style={styles.grid2}>{['Story Idea','Art Prompt','Song Seed','Product Idea','Journal Prompt','Meditation'].map(x=><Pill key={x} text={x}/>)}</View></GlassCard>
    <Section title="Opt-in AI Reflection" />
    <GlassCard><Row icon="✦" title="AI interpretation is off" sub="No hidden AI calls. Reflection later only with clear consent." right="Private"/></GlassCard>
  </Screen>;
}
function Cycles() {
  return <Screen>
    <Header title="Cycles" sub="Align with your natural rhythms." />
    <GlassCard><View style={styles.between}><View><Text style={styles.small}>Moon Phase</Text><Text style={styles.h2}>Waxing Gibbous</Text><Text style={styles.body}>Illumination: 72% · Cycle day 10</Text></View><Image source={moon} style={styles.moonIconBig} resizeMode="contain" /></View></GlassCard>
    <Section title="Tonight's Sleep Outlook" />
    <GlassCard><Row icon="☁️" title="Good" sub="Great conditions for deep rest and dream recall." right="72%"/><Row icon="🌙" title="Sleep Window" sub="10:45 PM – 7:15 AM"/><Row icon="⏰" title="Smart Wake Window" sub="6:45 AM – 7:15 AM. Wake in a light sleep phase."/></GlassCard>
    <Section title="REM Estimator" />
    <GlassCard><Text style={styles.body}>Likely REM-rich windows based on an 8h 30m sleep target:</Text><Row icon="1" title="Early REM" sub="12:10 AM – 12:30 AM"/><Row icon="2" title="Middle REM" sub="2:05 AM – 2:40 AM"/><Row icon="3" title="Morning REM" sub="5:30 AM – 7:00 AM"/></GlassCard>
    <Section title="Sleep Stages" />
    <GlassCard><View style={styles.sleepBar}><View style={{flex:2,backgroundColor:'#415DFF'}}/><View style={{flex:3,backgroundColor:'#138CFF'}}/><View style={{flex:5,backgroundColor:'#9BC7FF'}}/><View style={{flex:1,backgroundColor:C.gold}}/></View><View style={styles.legend}><Text style={styles.body}>Deep 1h45m</Text><Text style={styles.body}>REM 2h10m</Text><Text style={styles.body}>Light 4h20m</Text><Text style={styles.body}>Awake 20m</Text></View></GlassCard>
    <Section title="Lunar Phase Guide" />
    <GlassCard><Row icon="○" title="New Moon" sub="Set an intention. Simple recall focus."/><Row icon="◐" title="Waxing" sub="Build practice. Track repeating symbols."/><Row icon="●" title="Full Moon" sub="Notice vividness without forcing meaning."/><Row icon="◑" title="Waning" sub="Reflect, archive, integrate."/></GlassCard>
    <Section title="Cycle Rings" />
    <GlassCard><Row icon="◎" title="Sleep Consistency" sub="5 nights aligned" right="82%"/><Row icon="◎" title="Recall Rhythm" sub="Best on weekdays after gentle wind-down" right="72%"/><Row icon="◎" title="Lucid Readiness" sub="Reality checks complete 3/4 days" right="64%"/></GlassCard>
    <GlassCard><Text style={styles.h2}>Did You Know?</Text><Text style={styles.body}>Dream recall often improves when users write even one sentence within the first few minutes after waking.</Text></GlassCard>
  </Screen>;
}
function Lucid() {
  const [checks,setChecks]=useState([true,false,false,false]);
  return <Screen>
    <Header title="Lucid" sub="Train your awareness. Explore your potential." />
    <GlassCard><View style={styles.between}><View style={{flex:1}}><Text style={styles.small}>Your Progress</Text><Text style={styles.h2}>Explorer</Text><Text style={styles.body}>Level 2 · 420 / 1000 XP</Text><Progress pct={42}/></View><Image source={head} style={styles.head} resizeMode="contain" /></View></GlassCard>
    <Section title="What Lucid Dreaming Is" />
    <GlassCard><Text style={styles.body}>Lucid dreaming means noticing that you are dreaming while the dream is happening. DriftLoom teaches awareness before control and avoids unsafe promises.</Text></GlassCard>
    <Section title="Today's Practice" />
    <GlassCard>{['Look at your hands','Read text twice','Finger through palm','Check the time'].map((x,i)=><Row key={x} icon={checks[i]?'✓':'◯'} title={x} sub="Reality check" right={checks[i]?'Done':'Tap'} onPress={()=>setChecks(checks.map((v,idx)=>idx===i?!v:v))}/>)}</GlassCard>
    <Section title="Daily Lucid Training Routine" />
    <GlassCard><Row icon="☀️" title="Morning Recall" sub="Write any fragment immediately."/><Row icon="◉" title="Midday Check" sub="Ask: how did I get here?"/><Row icon="🌙" title="Evening Review" sub="Read your dream signs."/><Row icon="✦" title="Sleep Intention" sub="Tonight, I notice when I am dreaming."/></GlassCard>
    <Section title="Techniques" />
    <GlassCard>{techniques.map(t=><Row key={t[0]} icon="☄️" title={t[0]} sub={t[1]} />)}</GlassCard>
    <Section title="Training Stages" />
    <GlassCard><Row icon="1" title="Dream Recall" sub="Remember more fragments."/><Row icon="2" title="Dream Signs" sub="Recognize repeated patterns."/><Row icon="3" title="First Lucid Moment" sub="Notice the dream gently."/><Row icon="4" title="Stabilization" sub="Stay calm and anchor the scene."/></GlassCard>
    <Section title="How to Stay Lucid" />
    <GlassCard><Row icon="✋" title="Touch the scene" sub="Feel walls, ground, water, or your hands."/><Row icon="🫧" title="Slow excitement" sub="Take one breath and name what you see."/><Row icon="🗣️" title="Name the dream" sub="Say: this is a dream."/><Row icon="?" title="Ask one question" sub="Keep it simple and safe."/></GlassCard>
    <Section title="Benefits & Safety" />
    <GlassCard><Text style={styles.body}>Benefits can include stronger dream recall, creativity, and confidence. DriftLoom does not promise guaranteed control. Avoid sleep disruption as a primary goal.</Text></GlassCard>
  </Screen>;
}
function Dictionary() {
  const [query,setQuery]=useState(''); const [cat,setCat]=useState('All'); const list=symbolData.filter(s=>(cat==='All'||s[4]===cat)&&s[0].toLowerCase().includes(query.toLowerCase()));
  return <Screen>
    <Header title="Dictionary" sub="Explore symbols. Discover personal meaning." />
    <TextInput value={query} onChangeText={setQuery} placeholder="⌕ Search symbols..." placeholderTextColor={C.muted} style={styles.input}/>
    <View style={styles.chips}>{['All','Nature','People','Places','Objects','Actions'].map(x=><Pill key={x} text={x} active={cat===x} onPress={()=>setCat(x)}/>)}</View>
    <GraphicCard image={water} title="Water" sub="Emotions, intuition, the unconscious mind, cleansing, flow. Symbols are prompts, not fixed diagnoses." imageStyle={{height:126}}><View style={{width:128}}><Primary compact>View Symbol</Primary></View></GraphicCard>
    <Section title="Personal Symbol History" />
    <GlassCard><Row icon="🌊" title="Water" sub="Most common with calm + curiosity. Last seen 3 nights ago." right="12"/><Row icon="🚪" title="Doorway" sub="Often appears before a decision or new idea." right="9"/><Row icon="✍️" title="My Meaning" sub="User-defined personal associations are saved here." right="Edit"/></GlassCard>
    <Section title="Expanded Symbol Library" />
    <GlassCard>{list.map(s=><Row key={s[0]} icon={s[3]} title={s[0]} sub={s[1]} right={s[2]} />)}</GlassCard>
    <Section title="Seen In My Dreams" />
    <GlassCard><Row icon="🌊" title="The floating city" sub="Clouds, water, crystal, doorway" right="Today"/><Row icon="🚪" title="Doorway in the rain" sub="Rain, hallway, key, ocean" right="2d"/></GlassCard>
    <Section title="Dream Q&A" />
    <GlassCard><Row icon="?" title="What does this symbol mean?" sub="Start with your personal association, then compare gentle archetypal prompts."/><Row icon="◎" title="Can symbols change meaning?" sub="Yes. DriftLoom tracks your personal history over time."/><Row icon="⚖" title="Culturally sensitive wording" sub="No symbol has one absolute meaning for every person."/></GlassCard>
    <Section title="Resources" />
    <GlassCard><Row icon="□" title="Dream recall basics"/><Row icon="□" title="Lucid dreaming safety"/><Row icon="□" title="Creative journaling prompts"/></GlassCard>
  </Screen>;
}
function Settings() {
  const [lock,setLock]=useState(true); const [bio,setBio]=useState(true); const [paywall,setPaywall]=useState(false);
  return <Screen>
    <Header title="Settings" sub="Your privacy. Your choice." />
    <GlassCard><View style={styles.profile}><Image source={logo} style={styles.avatar} resizeMode="contain" /><View><Text style={styles.h2}>Jamie</Text><Text style={styles.body}>Dreamer since Jun 2024 · Ocoee Studios</Text></View></View></GlassCard>
    <Section title="Privacy & Security" />
    <GlassCard><Row icon="♙" title="Passcode Lock" sub="Protect your private journal" right={<Toggle on={lock}/>} onPress={()=>setLock(!lock)}/><Row icon="◉" title="Face ID / Biometric Language" sub="Uses local device authentication later" right={<Toggle on={bio}/>} onPress={()=>setBio(!bio)}/><Row icon="▣" title="Auto-Lock" right="After 5 minutes"/><Row icon="👁️" title="Hide Previews" sub="Keep dream snippets hidden from app switcher"/><Row icon="⇩" title="Export Journal"/><Row icon="⌫" title="Delete All Data"/></GlassCard>
    <Section title="Journal Appearance" />
    <GlassCard><Row icon="🎨" title="Theme Picker" sub="Midnight, Glacier, Dawn"/><Row icon="✒️" title="Ink Colors" sub="12 journal ink colors"/><Row icon="Aa" title="Journal Fonts" sub="6 writing styles"/><Row icon="▧" title="Journal Backgrounds" sub="Paper, glass, stars, mist"/></GlassCard>
    <Section title="Subscription" />
    <GlassCard><Row icon="👑" title="DriftLoom Plus" sub="Advanced insights, symbol evolution, themes, export" right="Manage" onPress={()=>setPaywall(!paywall)}/>{paywall ? <View style={styles.paywall}><Text style={styles.h2}>Premium Experience</Text><Text style={styles.body}>Monthly $3.99 · Annual $29.99 with 7-day trial · Lifetime Founder $39.99</Text><View style={styles.grid2}>{['Advanced Pattern Insights','Symbol Evolution','Timeline & Calendar','Creative Seeds','Custom Themes','Security Lock','Export & Backup','Future AI Reflection'].map(x=><Pill key={x} text={x}/>)}</View><Primary compact>Try 7 Days Free</Primary></View> : <Primary compact onPress={()=>setPaywall(true)}>Try 7 Days Free</Primary>}</GlassCard>
    <Section title="Purchase Testing Controls" />
    <GlassCard><Row icon="↻" title="Restore Purchases"/><Row icon="🧪" title="RevenueCat Stub" sub="Native IAP direction. No Stripe."/><Row icon="🏷️" title="Founder Badge" sub="Lifetime plan display"/></GlassCard>
    <Section title="Privacy Nutrition" />
    <GlassCard><Row icon="✓" title="Stored locally first" sub="No hidden AI calls in prototype."/><Row icon="×" title="No ads. No third-party tracking."/><Row icon="⇩" title="Export or delete anytime."/><Row icon="⊕" title="Optional account later" sub="Not required for prototype."/></GlassCard>
    <Section title="App Store Readiness" />
    <GlassCard><Row icon="□" title="Privacy Policy"/><Row icon="□" title="Terms of Use"/><Row icon="⊕" title="Support Email"/><Row icon="☑" title="Screenshots" sub="Use approved mockup style"/><Row icon="ⓘ" title="About DriftLoom" right="v1.0.0"/></GlassCard>
    <Section title="AuraLunis Feature Checklist" />
    <GlassCard><FeatureGrid/></GlassCard>
  </Screen>;
}

const tabs = { Home, Journal, Insights, Cycles, Lucid, Dictionary, Settings };
const icons = { Home:'⌂', Journal:'▧', Insights:'◌', Cycles:'◔', Lucid:'✦', Dictionary:'▱', Settings:'⚙' };
function TabBar({ tab, setTab }) { return <View style={styles.tabbar}>{Object.keys(tabs).map(t=><TouchableOpacity key={t} onPress={()=>setTab(t)} style={styles.tab}><Text style={[styles.tabIcon, tab===t && styles.tabActive]}>{icons[t]}</Text><Text style={[styles.tabText, tab===t && styles.tabActive]}>{t}</Text></TouchableOpacity>)}</View>; }
export default function App() { const [tab,setTab]=useState('Home'); const Current=useMemo(()=>tabs[tab],[tab]); return <SafeAreaView style={styles.app}><StatusBar barStyle="light-content"/><View style={styles.phone}><Current setTab={setTab}/><TabBar tab={tab} setTab={setTab}/></View></SafeAreaView>; }

const styles = StyleSheet.create({
  app:{flex:1,backgroundColor:C.black,alignItems:'center'}, phone:{width:'100%',maxWidth:430,flex:1,backgroundColor:C.black}, screen:{padding:18,paddingTop:12},
  header:{alignItems:'center',marginBottom:16,paddingTop:6}, title:{fontSize:23,color:C.white,fontWeight:'700'}, sub:{color:C.white,fontSize:15,textAlign:'center',lineHeight:21,marginTop:4},
  hero:{alignItems:'center',marginBottom:16}, heroLogo:{width:210,height:150}, wordmark:{color:C.white,fontSize:34,letterSpacing:9,marginTop:-16}, tag:{color:C.white,textAlign:'center',lineHeight:19,marginTop:8,maxWidth:280},
  card:{backgroundColor:C.card,borderColor:'rgba(79,203,255,.28)',borderWidth:1,borderRadius:16,padding:14,marginBottom:12,shadowColor:C.blue,shadowOpacity:.12,shadowRadius:16}, success:{borderColor:C.green,backgroundColor:'rgba(40,217,155,.14)'},
  h2:{fontSize:17,color:C.white,fontWeight:'700'}, h3:{fontSize:15,color:C.white,fontWeight:'700'}, body:{color:C.silver,fontSize:12.5,lineHeight:18}, label:{color:C.silver,fontSize:12,marginBottom:8}, small:{color:C.silver,fontSize:11}, link:{color:C.blue,fontSize:12},
  stats:{flexDirection:'row',gap:8,marginBottom:12}, stat:{flex:1,marginBottom:0}, statValue:{color:C.white,fontSize:20,marginTop:8}, between:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12}, scoreBig:{color:C.white,fontSize:32,fontWeight:'800'}, plus:{color:C.blue,fontSize:28,borderWidth:1,borderColor:'rgba(79,203,255,.35)',width:38,height:38,borderRadius:19,textAlign:'center',lineHeight:34},
  moonIcon:{width:72,height:72}, moonIconBig:{width:96,height:96}, section:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8,marginTop:4},
  row:{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'rgba(199,208,219,.12)',paddingVertical:10,gap:10}, rowIcon:{fontSize:20,width:28}, rowTitle:{color:C.white,fontSize:15,fontWeight:'600'}, rowSub:{color:C.silver,fontSize:11,marginTop:2}, rowRight:{color:C.silver,fontSize:12,textAlign:'right',maxWidth:140}, score:{color:C.white}, chev:{color:C.white,fontSize:22},
  input:{backgroundColor:'rgba(2,4,10,.38)',borderWidth:1,borderColor:'rgba(199,208,219,.35)',borderRadius:10,color:C.white,padding:12,marginBottom:12}, textarea:{height:116,textAlignVertical:'top'}, textareaSmall:{height:84,textAlignVertical:'top'}, count:{alignSelf:'flex-end',color:C.silver,fontSize:10,marginTop:-24,marginBottom:8},
  chips:{flexDirection:'row',gap:8,marginBottom:12,flexWrap:'wrap'}, pill:{paddingVertical:9,paddingHorizontal:11,borderRadius:12,borderWidth:1,borderColor:'rgba(79,203,255,.25)',backgroundColor:'rgba(14,43,92,.35)'}, pillActive:{backgroundColor:'#006EEA',borderColor:C.blue}, pillText:{color:C.silver,fontSize:11,textAlign:'center'}, pillTextActive:{color:C.white}, grid2:{flexDirection:'row',flexWrap:'wrap',gap:8},
  toggle:{width:50,height:28,backgroundColor:'#0B7CFF',borderRadius:16,alignItems:'flex-end',justifyContent:'center',padding:3}, toggleDot:{width:22,height:22,borderRadius:11,backgroundColor:C.white}, deepLink:{color:C.blue,textAlign:'center',fontSize:16,marginVertical:14},
  primary:{backgroundColor:'#008CFF',borderRadius:14,padding:14,alignItems:'center',marginVertical:4,flex:1}, primaryText:{color:C.white,fontWeight:'700',textAlign:'center'}, secondary:{borderWidth:1,borderColor:'rgba(199,208,219,.45)',borderRadius:14,padding:14,alignItems:'center',marginVertical:4,flex:1}, secondaryText:{color:C.white,fontWeight:'700'}, footerNote:{color:C.muted,textAlign:'center',fontSize:11,marginTop:8}, back:{color:C.blue,marginBottom:14}, deepArea:{marginTop:12}, actionRow:{flexDirection:'row',gap:12,marginTop:8}, paywall:{marginTop:10,paddingTop:12,borderTopWidth:1,borderTopColor:'rgba(199,208,219,.15)'},
  progress:{height:9,backgroundColor:'rgba(79,203,255,.15)',borderRadius:8,overflow:'hidden',flex:1,marginVertical:8}, progressFill:{height:'100%',borderRadius:8}, graphicTop:{height:132,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(2,4,10,.25)'}, graphicImage:{width:'100%',height:132}, graphicBody:{padding:14}, chart:{height:116,flexDirection:'row',alignItems:'flex-end',gap:6,paddingTop:12}, bar:{flex:1,borderRadius:6}, legend:{flexDirection:'row',justifyContent:'space-around',gap:8,marginTop:10,flexWrap:'wrap'}, sleepBar:{height:12,flexDirection:'row',borderRadius:6,overflow:'hidden',marginVertical:12}, head:{width:118,height:100}, profile:{flexDirection:'row',alignItems:'center',gap:14}, avatar:{width:58,height:58,borderRadius:29},
  dnaBox:{height:158,backgroundColor:'rgba(2,14,34,.92)',padding:18,overflow:'hidden'}, dnaGlow:{position:'absolute',right:-30,top:-20,width:170,height:170,borderRadius:85,backgroundColor:'rgba(79,203,255,.10)'}, dnaRung:{position:'absolute',right:26,width:145,flexDirection:'row',alignItems:'center'}, dnaDot:{width:12,height:12,borderRadius:6,backgroundColor:C.blue,shadowColor:C.blue,shadowOpacity:.8,shadowRadius:10}, dnaLine:{height:2,flex:1,backgroundColor:'rgba(199,208,219,.55)',marginHorizontal:5}, dnaText:{color:C.white,fontSize:21,fontWeight:'800',marginTop:18}, dnaSub:{color:C.silver,fontSize:12,marginTop:6},
  tabbar:{position:'absolute',left:0,right:0,bottom:0,height:76,backgroundColor:'rgba(2,4,10,.97)',borderTopWidth:1,borderTopColor:'rgba(79,203,255,.24)',flexDirection:'row',paddingTop:8}, tab:{flex:1,alignItems:'center'}, tabIcon:{color:C.muted,fontSize:19}, tabText:{color:C.muted,fontSize:9,marginTop:3}, tabActive:{color:C.blue}
});
