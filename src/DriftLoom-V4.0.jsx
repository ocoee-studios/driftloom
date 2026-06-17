import { useState, useEffect, useRef } from "react";

const APP_ICON = "data:image/png;base64,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";
const APP_LOGO = "data:image/jpeg;base64,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";

const SCREENS = ["home","journal","insights","cycles","lucid","dictionary","settings"];
const NAV = [
  { id:"home", icon:"☽", label:"Home" },
  { id:"journal", icon:"✎", label:"Journal" },
  { id:"insights", icon:"✦", label:"Insights" },
  { id:"cycles", icon:"◑", label:"Cycles" },
  { id:"lucid", icon:"◌", label:"Lucid" },
  { id:"dictionary", icon:"❋", label:"Dict." },
  { id:"settings", icon:"⚙", label:"Settings" },
];
const TITLES = { home:"Dream Journal", journal:"New Dream", insights:"Dream Insights", cycles:"Dream Cycles", lucid:"Lucid Dreaming", dictionary:"Dream Dictionary", settings:"Settings" };

// LEGAL URLS — swap: ocoeestudios.com | GitHub Pages | Netlify (active)
const TERMS_URL = "https://driftloom.netlify.app/terms.html";
const PRIVACY_URL = "https://driftloom.netlify.app/privacy.html";
const MANAGE_SUB_URL = "https://apps.apple.com/account/subscriptions";
const MOODS = [
  "Calm","Happy","Anxious","Peaceful","Mysterious","Vivid",
  "Nostalgic","Dreamy","Surreal","Powerful","Lost","Free",
  "Magical","Warm","Intense","Romantic","Hopeful","Enchanted",
];
const THEMES = { dream:"Dream Cloud", midnight:"Midnight Navy", lavender:"Lavender Glow" };

const DICT_CATEGORIES = [
  {id:"all",label:"All",icon:"✦"},
  {id:"symbols",label:"Symbols",icon:"🔮"},
  {id:"animals",label:"Animals",icon:"🦋"},
  {id:"elements",label:"Elements",icon:"🌊"},
  {id:"places",label:"Places",icon:"🏛"},
  {id:"actions",label:"Actions",icon:"🕊"},
  {id:"types",label:"Dream Types",icon:"💫"},
];

const DREAM_DICT = [
  {term:"Moon",icon:"🌙",cat:"symbols",meaning:"Intuition and emotional cycles. You dream of the moon at turning points in your emotional life."},
  {term:"Stars",icon:"⭐",cat:"symbols",meaning:"Hope and guidance. You dream of stars when seeking direction."},
  {term:"Key",icon:"🗝",cat:"symbols",meaning:"Access to hidden knowledge. You dream of keys when a new opportunity is ready to open."},
  {term:"Mirror",icon:"🪞",cat:"symbols",meaning:"Self-awareness and truth. Your subconscious wants you to look inward."},
  {term:"Clock",icon:"🕰",cat:"symbols",meaning:"Time pressure. You dream of clocks when time feels like it's running out."},
  {term:"Door",icon:"🚪",cat:"symbols",meaning:"New opportunities. Open door = ready for change. Locked door = something blocking your path."},
  {term:"Feather",icon:"🪶",cat:"symbols",meaning:"Freedom and spiritual messages. You dream of feathers when you need to release something heavy."},
  {term:"Crown",icon:"👑",cat:"symbols",meaning:"Authority and self-worth. You dream of crowns when stepping into your power."},
  {term:"Bird",icon:"🐦",cat:"animals",meaning:"Freedom and perspective. You dream of birds when rising above a situation."},
  {term:"Snake",icon:"🐍",cat:"animals",meaning:"Transformation and hidden fears. You dream of snakes during major personal change."},
  {term:"Cat",icon:"🐱",cat:"animals",meaning:"Independence and mystery. Trust your instincts more."},
  {term:"Wolf",icon:"🐺",cat:"animals",meaning:"Loyalty and instinct. You dream of wolves when you need to trust your gut."},
  {term:"Butterfly",icon:"🦋",cat:"animals",meaning:"Transformation and rebirth. You dream of butterflies when becoming a new version of yourself."},
  {term:"Fish",icon:"🐟",cat:"animals",meaning:"The unconscious mind. Insights are just below your awareness."},
  {term:"Horse",icon:"🐴",cat:"animals",meaning:"Power and drive. Energy is building toward a goal."},
  {term:"Water",icon:"💧",cat:"elements",meaning:"Your emotional state. Calm = peace. Turbulent = upheaval."},
  {term:"Fire",icon:"🔥",cat:"elements",meaning:"Passion and transformation. Strong emotions are burning through you."},
  {term:"Earth",icon:"🌍",cat:"elements",meaning:"Stability and grounding. Practical matters need attention."},
  {term:"Wind",icon:"🌬",cat:"elements",meaning:"Change and invisible forces. Something beyond your control is shifting."},
  {term:"Rain",icon:"🌧",cat:"elements",meaning:"Emotional release and renewal. Your psyche is washing clean."},
  {term:"House",icon:"🏠",cat:"places",meaning:"Your self and psyche. Different rooms are different aspects of you."},
  {term:"Forest",icon:"🌲",cat:"places",meaning:"Forests symbolize the unknown, the unconscious, and personal growth. You dream of forests when you're navigating uncertainty or exploring unfamiliar parts of yourself."},
  {term:"Ocean",icon:"🌊",cat:"places",meaning:"The vast unconscious mind. You dream of oceans when deep emotions are stirring."},
  {term:"Bridge",icon:"🌉",cat:"places",meaning:"Bridges symbolize transitions and connections between two states of being. You dream of bridges when you're moving from one phase of life to another."},
  {term:"Mountain",icon:"⛰",cat:"places",meaning:"Mountains represent challenges, ambition, and spiritual ascent. You dream of mountains when you're facing an obstacle or striving toward a significant goal."},
  {term:"Flying",icon:"🕊",cat:"actions",meaning:"Freedom and limitless potential. You dream of flying when rising above daily limitations."},
  {term:"Falling",icon:"⬇️",cat:"actions",meaning:"Loss of control or letting go. You dream of falling when afraid of failing."},
  {term:"Running",icon:"🏃",cat:"actions",meaning:"Avoidance or pursuit. You dream of running when escaping something or chasing a goal."},
  {term:"Swimming",icon:"🏊",cat:"actions",meaning:"Swimming represents navigating emotions and going with the flow. You dream of swimming when you're processing feelings or adapting to emotional situations."},
  {term:"Singing",icon:"🎵",cat:"actions",meaning:"Singing symbolizes self-expression, joy, and emotional release. You dream of singing when you need to express something you've been holding inside."},
  {term:"Lucid Dream",icon:"💎",cat:"types",meaning:"In a lucid dream, you know you're dreaming. This happens when your self-awareness breaks through into sleep. It means your conscious and unconscious minds are connecting."},
  {term:"Recurring Dream",icon:"🔄",cat:"types",meaning:"Your subconscious repeating an unresolved message. They stop when you address the issue."},
  {term:"Nightmare",icon:"🌑",cat:"types",meaning:"Your brain processing fear and anxiety. They serve a protective purpose."},
  {term:"Prophetic Dream",icon:"🔮",cat:"types",meaning:"Prophetic dreams feel like they predict the future. They often reflect your subconscious pattern recognition — your sleeping mind notices things your waking mind misses."},
  {term:"Healing Dream",icon:"💚",cat:"types",meaning:"Healing dreams bring comfort, resolution, or messages from loved ones. They occur when your psyche is working to repair emotional wounds and restore inner balance."},
  {term:"False Awakening",icon:"👁",cat:"types",meaning:"A false awakening is when you dream of waking up but you're still asleep. It's often a gateway to lucid dreaming."},
];

const themeVars = {
  dream: {
    "--bg1":"#f8f5ff","--bg2":"#eef3ff","--bg3":"#fff8fd",
    "--navy":"#0a1845","--deep":"#1a2a6c","--glass":"rgba(255,255,255,0.58)",
    "--glass2":"rgba(255,255,255,0.38)","--line":"rgba(255,255,255,0.72)",
    "--text":"#1a2350","--muted":"#7a84a8","--card-shadow":"rgba(60,65,130,0.12)",
    "--lav":"#4FCBFF","--blue":"#6cb9ff","--gold":"#d4a44c","--ice":"#e4f0ff",
    "--nav-bg":"rgba(2,4,10,0.85)","--nav-active":"rgba(255,255,255,0.92)",
    "--input-bg":"rgba(255,255,255,0.68)","--star-opacity":"0.45",
  },
  midnight: {
    "--bg1":"#06091e","--bg2":"#0d1340","--bg3":"#050713",
    "--navy":"#e8e4ff","--deep":"#c4cbff","--glass":"rgba(18,26,72,0.62)",
    "--glass2":"rgba(18,26,72,0.42)","--line":"rgba(255,255,255,0.12)",
    "--text":"#e8e4ff","--muted":"#8b95c8","--card-shadow":"rgba(0,0,0,0.3)",
    "--lav":"#a07cf0","--blue":"#5a9de6","--gold":"#d4a44c","--ice":"#1a2460",
    "--nav-bg":"rgba(12,18,52,0.82)","--nav-active":"rgba(30,40,90,0.9)",
    "--input-bg":"rgba(255,255,255,0.08)","--star-opacity":"0.7",
  },
  lavender: {
    "--bg1":"#faf5ff","--bg2":"#f0e8ff","--bg3":"#fff8ff",
    "--navy":"#3d266c","--deep":"#5a3d9e","--glass":"rgba(255,248,255,0.65)",
    "--glass2":"rgba(255,248,255,0.42)","--line":"rgba(200,170,255,0.3)",
    "--text":"#3d266c","--muted":"#9484b8","--card-shadow":"rgba(100,60,180,0.1)",
    "--lav":"#c49dff","--blue":"#a8c8ff","--gold":"#d4a44c","--ice":"#efe4ff",
    "--nav-bg":"rgba(255,248,255,0.78)","--nav-active":"rgba(255,255,255,0.92)",
    "--input-bg":"rgba(255,255,255,0.72)","--star-opacity":"0.35",
  },
};

function Stars({ theme }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = c.offsetWidth, h = c.height = c.offsetHeight;
    const stars = Array.from({length: 60}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*1.6+0.3, speed: Math.random()*0.15+0.03,
      pulse: Math.random()*Math.PI*2, pulseSpeed: Math.random()*0.02+0.005,
      gold: Math.random() > 0.75,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      stars.forEach(s => {
        s.y -= s.speed; s.pulse += s.pulseSpeed;
        if (s.y < -4) { s.y = h+4; s.x = Math.random()*w; }
        const a = 0.4 + Math.sin(s.pulse)*0.35;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle = s.gold ? `rgba(212,164,76,${a})` : `rgba(255,255,255,${a*0.9})`;
        ctx.fill();
        if (s.r > 1.2) {
          ctx.beginPath(); ctx.arc(s.x,s.y,s.r*3,0,Math.PI*2);
          ctx.fillStyle = s.gold ? `rgba(212,164,76,${a*0.08})` : `rgba(180,200,255,${a*0.06})`;
          ctx.fill();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [theme]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,opacity: theme === "midnight" ? 0.7 : 0.45}} />;
}

function GlassCard({ children, style, className="" }) {
  return (
    <div className={`glass-card ${className}`} style={style}>
      {children}
    </div>
  );
}

function MoodChart({ dreams = [] }) {
  const recent = dreams.slice(0, 7).reverse();
  const moodScores = {
    "Great":95,"Ecstatic":95,"Euphoric":92,"Blissful":90,"Elated":90,"Joyful":88,
    "Happy":85,"Inspired":85,"Radiant":85,"Energized":82,"Motivated":82,"Thrilled":82,
    "Calm":75,"Peaceful":75,"Serene":75,"Grateful":75,"Romantic":72,"Loved":72,
    "Good":70,"Playful":70,"Curious":68,"Amused":68,"Dreamy":68,"Gentle":65,
    "Reflective":60,"Pensive":60,"Wistful":58,"Nostalgic":55,"Mysterious":55,
    "Okay":50,"Quiet":48,"Grounded":48,"Soft":45,"Tender":45,
    "Anxious":35,"Restless":35,"Uneasy":35,"Nervous":32,"Confused":30,
    "Sad":25,"Melancholy":25,"Lonely":25,"Low":22,"Gloomy":20,"Somber":20,
    "Dark":15,"Fearful":15,"Haunted":12,"Hollow":10,
  };
  const data = recent.length > 0
    ? recent.map(d => moodScores[d.mood] || d.vivid || 50)
    : [42,66,55,82,70,90,76];
  const labels = recent.length > 0
    ? recent.map(d => d.date ? d.date.split(" ").pop() : "—")
    : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const moods = recent.length > 0
    ? recent.map(d => d.mood || "—")
    : [];
  const maxBars = 7;
  const display = data.length >= maxBars ? data.slice(-maxBars) : data;
  const displayLabels = labels.length >= maxBars ? labels.slice(-maxBars) : labels;
  const displayMoods = moods.length >= maxBars ? moods.slice(-maxBars) : moods;
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:8,height:140,padding:"12px 4px 0"}}>
      {display.map((v,i) => (
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          {displayMoods[i] && <div style={{fontSize:13,fontWeight:700,color:"var(--deep)",textAlign:"center",lineHeight:1.1,maxWidth:42,overflow:"hidden"}}>{displayMoods[i]}</div>}
          <div style={{
            width:"100%",height:`${v}%`,borderRadius:12,minHeight:4,
            background:`linear-gradient(180deg, var(--gold), var(--lav) 60%, var(--blue))`,
            boxShadow:"0 4px 14px rgba(100,120,220,0.15)",
            transition:"height 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            transitionDelay:`${i*0.06}s`,
          }} />
          <span style={{fontSize:13,fontWeight:700,color:"var(--muted)",letterSpacing:"0.02em"}}>{displayLabels[i]}</span>
        </div>
      ))}
      {display.length === 0 && <div style={{flex:1,textAlign:"center",color:"var(--muted)",fontSize:13,padding:20}}>Log dreams to see your mood pattern</div>}
    </div>
  );
}

export default function DriftLoom() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState(null);
  const [theme, setTheme] = useState("dream");
  const emptyDream = {title:"", notes:"", mood:"Calm", vivid:50, tags:"", category:"", genre:"", wakeFeel:"", dreamDuration:"minutes", intensity:50, dreamSounds:[], realityBreaks:"", characterNames:"", dreamWeather:"", preSleepThought:""};
  const [dream, setDream] = useState({...emptyDream});
  const [journalSections, setJournalSections] = useState({mood:true,world:false,chars:false,context:false});
  const sampleDreams = [
    {title:"Moonlit Pages", notes:"I was floating through soft lavender clouds while pages turned into stars. A gold sparkle kept guiding me back to a glowing crescent moon.", mood:"Calm", vivid:82, tags:"clouds, moon, journal, glitter", date:"May 12"},
    {title:"The Glass Staircase", notes:"I climbed a translucent staircase that spiraled upward through a cathedral of light. Each step chimed a different note. At the top, a door made of water.", mood:"Curious", vivid:74, tags:"stairs, glass, music, water", date:"May 11"},
    {title:"Garden of Whispers", notes:"Flowers were speaking in a language I almost understood. The petals were made of silk and when I touched them, memories played like tiny films.", mood:"Peaceful", vivid:68, tags:"garden, flowers, memories, silk", date:"May 10"},
  ];
  const [dreams, setDreams] = useState(sampleDreams);
  const [storageReady, setStorageReady] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showSaveAnim, setShowSaveAnim] = useState(false);
  const [lucidDone, setLucidDone] = useState(false);
  const [checks, setChecks] = useState([true,false,true,false]);
  const [toggles, setToggles] = useState({privacy:true, recall:true, backup:false});
  const [animKey, setAnimKey] = useState(0);
  const [dictSearch, setDictSearch] = useState("");
  const [dictCat, setDictCat] = useState("all");
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [dailyMood, setDailyMood] = useState("Calm");
  const [dailyRecall, setDailyRecall] = useState(82);
  const [dailySymbol, setDailySymbol] = useState("clouds");

  useEffect(() => {
    const loadData = async () => {
      if (!window.storage) { setStorageReady(true); return; }
      try {
        const result = await window.storage.get("driftloom-data");
        if (result && result.value) {
          const data = JSON.parse(result.value);
          if (data.dreams && data.dreams.length > 0) setDreams(data.dreams);
          if (data.dailyMood) setDailyMood(data.dailyMood);
          if (data.dailyRecall !== undefined) setDailyRecall(data.dailyRecall);
          if (data.dailySymbol) setDailySymbol(data.dailySymbol);
          if (data.lucidDone) setLucidDone(data.lucidDone);
          if (data.checks) setChecks(data.checks);
          if (data.checkin) setCheckin(data.checkin);
          if (data.checkinDone) setCheckinDone(data.checkinDone);
          if (data.inkColor) setInkColor(data.inkColor);
          if (data.journalFont) setJournalFont(data.journalFont);
          if (data.journalBg) setJournalBg(data.journalBg);
          // ⚠️ TODO BEFORE APP STORE SUBMISSION: Re-enable lock screen by uncommenting setAppLocked(true) below
          if (data.lockEnabled) { setLockEnabled(true); /* setAppLocked(true); */ }
          if (data.passcode) setPasscode(data.passcode);
          if (data.useBiometric !== undefined) setUseBiometric(data.useBiometric);
          if (data.trialStart) setTrialStart(data.trialStart);
          if (data.purchased) setPurchased(data.purchased);
        }
      } catch (e) {}
      setStorageReady(true);
    };
    loadData();
  }, []);

  const [editingStat, setEditingStat] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [selectedMoon, setSelectedMoon] = useState(null);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [dreamSearch, setDreamSearch] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [wakeTime, setWakeTime] = useState(null);
  const [dictAdded, setDictAdded] = useState(null);
  const [shareMsg, setShareMsg] = useState(null);

  const shareDream = async (d, e) => {
    if (e) e.stopPropagation();
    const tags = d.tags.split(",").map(t=>t.trim()).filter(Boolean);
    const text = [
      "✨ " + (d.title || "My Dream"),
      d.date ? "📅 " + d.date : "",
      "",
      d.notes || "",
      "",
      "🌙 Mood: " + (d.mood || "—"),
      "💫 Vividness: " + (d.vivid || 0) + "%",
      tags.length ? "🏷 " + tags.join(", ") : "",
      "",
      "— Shared from DriftLoom Dream Journal ☽",
    ].filter(Boolean).join("\n");

    if (navigator.share) {
      try {
        await navigator.share({title: d.title || "My Dream", text});
        return;
      } catch(err) {}
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareMsg("Copied to clipboard ✨");
    } catch(err) {
      setShareMsg("Couldn't share — try again");
    }
    setTimeout(() => setShareMsg(null), 2000);
  };
  const [checkin, setCheckin] = useState({feeling:"",sleep:0,energy:0,note:""});
  const [checkinDone, setCheckinDone] = useState(false);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [inkColor, setInkColor] = useState("#EAF6FF");
  const [journalFont, setJournalFont] = useState("'Nunito',sans-serif");
  const [journalBg, setJournalBg] = useState("transparent");
  const [appLocked, setAppLocked] = useState(false);
  const [lockEnabled, setLockEnabled] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [trialStart, setTrialStart] = useState(null);
  const [purchased, setPurchased] = useState(false);

  // Trial logic
  const TRIAL_DAYS = 7;
  const trialActive = trialStart && ((Date.now() - new Date(trialStart).getTime()) / 86400000) < TRIAL_DAYS;
  const trialDaysLeft = trialStart ? Math.max(0, Math.ceil(TRIAL_DAYS - (Date.now() - new Date(trialStart).getTime()) / 86400000)) : TRIAL_DAYS;
  const hasAccess = purchased || trialActive;
  const startTrial = () => { if (!trialStart) setTrialStart(new Date().toISOString()); };

  // AI gate - wraps AI calls to check access
  const gatedAI = async (callback) => {
    if (!hasAccess) { setShowPaywall(true); return; }
    await callback();
  };
  const [showPaywall, setShowPaywall] = useState(false);
  const [tarotFlipped, setTarotFlipped] = useState(0);
  const [tarotDraw, setTarotDraw] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncData, setSyncData] = useState(null);
  const [lockInput, setLockInput] = useState("");
  const [lockError, setLockError] = useState(false);
  const [useBiometric, setUseBiometric] = useState(true);
  const [settingPasscode, setSettingPasscode] = useState(false);
  const [newPasscode, setNewPasscode] = useState("");
  const INK_COLORS = [
    {color:"#EAF6FF",name:"Midnight"},
    {color:"#0E2B5C",name:"Lavender"},
    {color:"#8b5e83",name:"Plum"},
    {color:"#2e86ab",name:"Ocean"},
    {color:"#1a936f",name:"Emerald"},
    {color:"#c44536",name:"Ember"},
    {color:"#d4a44c",name:"Gold"},
    {color:"#e8815c",name:"Sunset"},
    {color:"#7b68ee",name:"Iris"},
    {color:"#db7093",name:"Glacier"},
    {color:"#4a6670",name:"Storm"},
    {color:"#8b4513",name:"Sepia"},
  ];
  const JOURNAL_FONTS = [
    {value:"'Nunito',sans-serif",name:"Nunito",preview:"Aa"},
    {value:"'Cormorant Garamond',serif",name:"Garamond",preview:"Aa"},
    {value:"'Georgia',serif",name:"Georgia",preview:"Aa"},
    {value:"'Courier New',monospace",name:"Typewriter",preview:"Aa"},
    {value:"cursive",name:"Cursive",preview:"Aa"},
    {value:"'Times New Roman',serif",name:"Times",preview:"Aa"},
  ];
  const JOURNAL_BGS = [
    {color:"transparent",name:"None"},
    {color:"#fdf8ef",name:"Parchment"},
    {color:"#f0eaff",name:"Lilac"},
    {color:"#eaf4f8",name:"Sky"},
    {color:"#f0f8ea",name:"Sage"},
    {color:"#fef0f0",name:"Blush"},
    {color:"#f5f0e0",name:"Cream"},
    {color:"#e8e0f0",name:"Violet"},
    {color:"#07111F",name:"Dark"},
  ];
  const FEELINGS = [
    {emoji:"😊",label:"Great"},{emoji:"🙂",label:"Good"},{emoji:"😐",label:"Okay"},
    {emoji:"😔",label:"Low"},{emoji:"😴",label:"Tired"},{emoji:"😰",label:"Anxious"},
    {emoji:"🥰",label:"Loved"},{emoji:"✨",label:"Inspired"},{emoji:"🌧",label:"Sad"},
    {emoji:"🔥",label:"Motivated"},{emoji:"🤔",label:"Reflective"},{emoji:"😌",label:"Peaceful"},
  ];
  const [recording, setRecording] = useState(false);
  const [recDots, setRecDots] = useState(0);
  const [pendingRecord, setPendingRecord] = useState(false);
  const speechRef = useRef(null);
  const notesRef = useRef("");

  const checkinStr = JSON.stringify(checkin);
  useEffect(() => {
    if (!storageReady || !window.storage) return;
    const saveData = async () => {
      try {
        await window.storage.set("driftloom-data", JSON.stringify({
          dreams, dailyMood, dailyRecall, dailySymbol, lucidDone, checks, checkin, checkinDone, inkColor, journalFont, journalBg, lockEnabled, passcode, trialStart, purchased, useBiometric,
        }));
      } catch (e) {}
    };
    saveData();
  }, [dreams, dailyMood, dailyRecall, dailySymbol, lucidDone, checks, checkinStr, checkinDone, inkColor, journalFont, journalBg, lockEnabled, passcode, trialStart, purchased, useBiometric, storageReady]);

  const SYMBOLS = [
    {name:"clouds",e:"☁️"},{name:"moon",e:"🌙"},{name:"water",e:"💧"},{name:"stars",e:"⭐"},
    {name:"door",e:"🚪"},{name:"flying",e:"🕊"},{name:"forest",e:"🌲"},{name:"fire",e:"🔥"},
    {name:"mirror",e:"🪞"},{name:"snake",e:"🐍"},{name:"bird",e:"🐦"},{name:"garden",e:"🌸"},
    {name:"key",e:"🗝"},{name:"ocean",e:"🌊"},{name:"light",e:"✨"},{name:"sun",e:"☀️"},
    {name:"rainbow",e:"🌈"},{name:"river",e:"🏞"},{name:"island",e:"🏝"},{name:"tree",e:"🌳"},
    {name:"flower",e:"🌺"},{name:"volcano",e:"🌋"},{name:"fog",e:"🌫"},{name:"ice",e:"🧊"},
    {name:"storm",e:"⛈"},{name:"rain",e:"🌧"},{name:"snow",e:"❄️"},{name:"lightning",e:"⚡"},
    {name:"wind",e:"🌬"},{name:"house",e:"🏠"},{name:"bridge",e:"🌉"},{name:"mountain",e:"⛰"},
    {name:"cave",e:"🕳"},{name:"desert",e:"🏜"},{name:"castle",e:"🏰"},{name:"tower",e:"🗼"},
    {name:"tunnel",e:"🚇"},{name:"temple",e:"🛕"},{name:"ruins",e:"🏚"},{name:"school",e:"🏫"},
    {name:"clock",e:"🕰"},{name:"ring",e:"💍"},{name:"sword",e:"⚔️"},{name:"book",e:"📖"},
    {name:"candle",e:"🕯"},{name:"crystal",e:"💎"},{name:"crown",e:"👑"},{name:"mask",e:"🎭"},
    {name:"chain",e:"⛓"},{name:"ship",e:"🚢"},{name:"egg",e:"🥚"},{name:"ladder",e:"🪜"},
    {name:"bell",e:"🔔"},{name:"compass",e:"🧭"},{name:"lantern",e:"🏮"},{name:"coin",e:"🪙"},
    {name:"pearl",e:"🫧"},{name:"thread",e:"🧵"},{name:"map",e:"🗺"},{name:"feather",e:"🪶"},
    {name:"cat",e:"🐱"},{name:"wolf",e:"🐺"},{name:"horse",e:"🐴"},{name:"owl",e:"🦉"},
    {name:"deer",e:"🦌"},{name:"spider",e:"🕷"},{name:"bear",e:"🐻"},{name:"dolphin",e:"🐬"},
    {name:"rabbit",e:"🐇"},{name:"dragon",e:"🐉"},{name:"butterfly",e:"🦋"},{name:"fish",e:"🐟"},
    {name:"eagle",e:"🦅"},{name:"fox",e:"🦊"},{name:"whale",e:"🐋"},
    {name:"vine",e:"🌿"},{name:"seed",e:"🌱"},{name:"mushroom",e:"🍄"},{name:"coral",e:"🪸"},
    {name:"shell",e:"🐚"},{name:"pebble",e:"🪨"},{name:"waterfall",e:"💦"},{name:"shore",e:"🏖"},
    {name:"cliff",e:"🏔"},{name:"aurora",e:"🌌"},{name:"comet",e:"☄️"},{name:"planet",e:"🪐"},
    {name:"sunset",e:"🌅"},{name:"dawn",e:"🌄"},{name:"rose",e:"🌹"},{name:"lion",e:"🦁"},
    {name:"turtle",e:"🐢"},{name:"crow",e:"🐦‍⬛"},{name:"bee",e:"🐝"},{name:"ant",e:"🐜"},
    {name:"swan",e:"🦢"},{name:"peacock",e:"🦚"},{name:"octopus",e:"🐙"},{name:"bat",e:"🦇"},
    {name:"piano",e:"🎹"},{name:"hourglass",e:"⏳"},{name:"telescope",e:"🔭"},{name:"painting",e:"🎨"},
    {name:"potion",e:"🧪"},{name:"shield",e:"🛡"},{name:"bow",e:"🏹"},{name:"scroll",e:"📜"},
    {name:"ink",e:"🖋"},{name:"locket",e:"📿"},{name:"amulet",e:"🧿"},{name:"torch",e:"🔦"},
    {name:"drum",e:"🥁"},{name:"harp",e:"🎵"},{name:"well",e:"🪣"},{name:"cage",e:"🪤"},
    {name:"balloon",e:"🎈"},{name:"kite",e:"🪁"},{name:"umbrella",e:"☂️"},{name:"nest",e:"🪺"},
    {name:"web",e:"🕸"},{name:"anchor",e:"⚓"},{name:"train",e:"🚂"},{name:"wheel",e:"🎡"},
    {name:"prism",e:"🔺"},{name:"eye",e:"👁"},{name:"hand",e:"✋"},{name:"heart",e:"❤️"},
    {name:"teeth",e:"🦷"},{name:"bones",e:"🦴"},{name:"shadow",e:"👤"},{name:"angel",e:"👼"},
    {name:"ghost",e:"👻"},{name:"baby",e:"👶"},{name:"skull",e:"💀"},
    {name:"window",e:"🪟"},{name:"gate",e:"⛩"},{name:"mist",e:"🌁"},{name:"meadow",e:"🌾"},
    {name:"jungle",e:"🌴"},{name:"thorn",e:"🌵"},{name:"petal",e:"🌷"},{name:"acorn",e:"🌰"},
    {name:"moss",e:"🍀"},{name:"dusk",e:"🌆"},{name:"pond",e:"🐸"},{name:"oasis",e:"🏝"},
    {name:"grove",e:"🌳"},{name:"marsh",e:"🐊"},{name:"hedge",e:"🌿"},{name:"ember",e:"🪨"},
    {name:"frost",e:"🥶"},{name:"tide",e:"🌊"},{name:"breeze",e:"🍃"},{name:"wall",e:"🧱"},
    {name:"rope",e:"🪢"},{name:"path",e:"🛤"},{name:"flute",e:"🪈"},{name:"violin",e:"🎻"},
    {name:"guitar",e:"🎸"},{name:"camera",e:"📷"},{name:"letter",e:"💌"},{name:"knife",e:"🔪"},
    {name:"cup",e:"🍵"},{name:"bottle",e:"🍶"},{name:"jar",e:"🫙"},{name:"basket",e:"🧺"},
    {name:"broom",e:"🧹"},{name:"wand",e:"🪄"},{name:"jewel",e:"💠"},{name:"ribbon",e:"🎀"},
    {name:"trophy",e:"🏆"},{name:"dice",e:"🎲"},{name:"chess",e:"♟"},{name:"puzzle",e:"🧩"},
    {name:"lock",e:"🔒"},{name:"flag",e:"🚩"},{name:"medal",e:"🏅"},{name:"cradle",e:"🍼"},
    {name:"lizard",e:"🦎"},{name:"jellyfish",e:"🪼"},{name:"parrot",e:"🦜"},{name:"penguin",e:"🐧"},
    {name:"monkey",e:"🐒"},{name:"elephant",e:"🐘"},{name:"tiger",e:"🐅"},{name:"panther",e:"🐆"},
    {name:"goat",e:"🐐"},{name:"hedgehog",e:"🦔"},{name:"squirrel",e:"🐿"},{name:"worm",e:"🪱"},
    {name:"crab",e:"🦀"},{name:"frog",e:"🐸"},{name:"moth",e:"🪰"},{name:"dove",e:"🕊"},
    {name:"hawk",e:"🦅"},{name:"ram",e:"🐏"},{name:"pig",e:"🐷"},{name:"library",e:"📚"},
    {name:"church",e:"⛪"},{name:"palace",e:"🏛"},{name:"market",e:"🏪"},{name:"cemetery",e:"🪦"},
    {name:"fountain",e:"⛲"},{name:"cabin",e:"🛖"},{name:"tent",e:"⛺"},{name:"boat",e:"🚣"},
    {name:"arena",e:"🏟"},{name:"whisper",e:"🤫"},{name:"scream",e:"😱"},{name:"kiss",e:"💋"},
    {name:"prayer",e:"🙏"},{name:"search",e:"🔍"},{name:"weave",e:"🧶"},{name:"write",e:"✍️"},
    {name:"spin",e:"🌀"},{name:"shatter",e:"💥"},{name:"echo",e:"🔊"},{name:"embrace",e:"🤗"},
    {name:"leap",e:"🦘"},{name:"crawl",e:"🐛"},{name:"gaze",e:"👀"},{name:"reach",e:"🫴"},
    {name:"wish",e:"🌠"},{name:"memory",e:"🧠"},{name:"voice",e:"🗣"},{name:"breath",e:"💨"},
    {name:"portal",e:"🌀"},{name:"labyrinth",e:"🔄"},{name:"infinity",e:"♾️"},{name:"fate",e:"🎲"},
    {name:"dream",e:"💭"},{name:"eclipse",e:"🌑"},
    {name:"throne",e:"🪑"},{name:"cloak",e:"🧥"},{name:"wings",e:"🪽"},{name:"canoe",e:"🛶"},
    {name:"goblet",e:"🍷"},{name:"tapestry",e:"🖼"},{name:"rune",e:"🔣"},{name:"quilt",e:"🛏"},
    {name:"lamp",e:"💡"},{name:"sphinx",e:"🗿"},{name:"phoenix",e:"🐦‍🔥"},{name:"unicorn",e:"🦄"},
    {name:"mermaid",e:"🧜"},{name:"fairy",e:"🧚"},{name:"witch",e:"🧙"},{name:"knight",e:"🤺"},
    {name:"queen",e:"👸"},{name:"stranger",e:"🧑"},{name:"child",e:"🧒"},{name:"elder",e:"🧓"},
    {name:"twin",e:"👯"},{name:"gargoyle",e:"👹"},{name:"dancer",e:"💃"},{name:"singer",e:"🎤"},
    {name:"archer",e:"🎯"},{name:"apple",e:"🍎"},{name:"honey",e:"🍯"},{name:"bread",e:"🍞"},
    {name:"milk",e:"🥛"},{name:"charm",e:"🪬"},{name:"halo",e:"😇"},{name:"horn",e:"📯"},
    {name:"lens",e:"🔎"},{name:"wreath",e:"💐"},{name:"whirlpool",e:"🫧"},{name:"thunder",e:"🌩"},
    {name:"warmth",e:"🫠"},{name:"silence",e:"🔇"},
  ];

  const navigate = (id) => {
    if (id === screen) return;
    setPrevScreen(screen);
    setScreen(id);
    setAnimKey(k => k+1);
    if (id !== "home") setEditingStat(null);
  };

  const startNewDream = () => {
    setDream({
      ...emptyDream,
      mood: dailyMood,
      vivid: dailyRecall,
      tags: dailySymbol,
    });
    setEditIdx(null);
    navigate("journal");
  };

  const editDream = (idx) => {
    setDream({...dreams[idx]});
    setEditIdx(idx);
    navigate("journal");
  };

  const saveDream = () => {
    if (!dream.title.trim() && !dream.notes.trim()) return;
    const entry = {
      ...dream,
      title: dream.title.trim() || "Untitled Dream",
      date: new Date().toLocaleDateString(undefined, {month:"short", day:"numeric"}),
    };
    if (editIdx !== null) {
      setDreams(prev => prev.map((d,i) => i === editIdx ? entry : d));
    } else {
      setDreams(prev => [entry, ...prev]);
    }
    setDailyMood(dream.mood);
    setDailyRecall(dream.vivid);
    const savedTags = dream.tags.split(",").map(t=>t.trim()).filter(Boolean);
    if (savedTags.length > 0) setDailySymbol(savedTags[0]);
    setShowSaveAnim(true);
    setSaved(true);
    setTimeout(() => {
      setShowSaveAnim(false);
      setSaved(false);
      navigate("home");
    }, 1600);
  };

  const deleteDream = (idx) => {
    setDreams(prev => prev.filter((_,i) => i !== idx));
    if (screen === "journal") navigate("home");
  };

  const startRecording = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setDream(d => ({...d, notes: d.notes + (d.notes ? "\n" : "") + "[Voice recording not supported in this browser. Try Chrome or Safari.]"}));
      return;
    }
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    notesRef.current = dream.notes || "";
    recognition.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          notesRef.current = notesRef.current + (notesRef.current ? " " : "") + t;
        } else {
          interim = t;
        }
      }
      const combined = notesRef.current + (interim ? " " + interim : "");
      setDream(d => ({...d, notes: combined}));
    };
    recognition.onerror = (ev) => {
      setRecording(false);
      setPendingRecord(false);
      const msgs = {
        "not-allowed": "Microphone blocked. Allow mic access in browser settings.",
        "service-not-allowed": "Mic needs HTTPS. Upload to drop.netlify.com for full mic support.",
        "network": "Speech recognition needs internet connection.",
        "no-speech": "No speech detected. Try again and speak clearly.",
      };
      setDream(d => ({...d, notes: d.notes + (d.notes ? "\n" : "") + "[" + (msgs[ev.error] || "Recording error: " + ev.error) + "]"}));
    };
    recognition.onend = () => {
      setRecording(false);
    };
    try {
      recognition.start();
      speechRef.current = recognition;
      setRecording(true);
      setPendingRecord(false);
    } catch(err) {
      setRecording(false);
      setDream(d => ({...d, notes: d.notes + (d.notes ? "\n" : "") + "[Couldn't start recording. Try Chrome or Safari on HTTPS.]"}));
    }
  };

  const stopRecording = () => {
    if (speechRef.current) {
      try { speechRef.current.stop(); } catch(e) {}
      speechRef.current = null;
    }
    setRecording(false);
  };

  const recordDream = () => {
    setDream({
      ...emptyDream,
      mood: dailyMood,
      vivid: dailyRecall,
      tags: dailySymbol,
    });
    setEditIdx(null);
    setPendingRecord(true);
    navigate("journal");
  };

  useEffect(() => {
    if (!recording) return;
    const iv = setInterval(() => setRecDots(d => (d + 1) % 4), 500);
    return () => clearInterval(iv);
  }, [recording]);

  useEffect(() => {
    return () => { if (speechRef.current) { try { speechRef.current.stop(); } catch(e) {} } };
  }, []);

  const latestDream = dreams[0] || null;
  const latestTags = latestDream ? latestDream.tags.split(",").map(t=>t.trim()).filter(Boolean) : [];

  const getMoonPhase = () => {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    const day = now.getDate();
    let c = 0, e = 0, jd = 0, b = 0;
    if (month < 3) { year--; month += 12; }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    const age = Math.round(jd * 29.5305882);
    const phases = [
      {name:"New Moon",emoji:"🌑",shadow:"radial-gradient(circle, rgba(15,15,30,0.92) 0%, rgba(15,15,30,0.88) 100%)",desc:"A blank slate. The dreaming mind re...",tip:"Set a clear intention before sleep ..."},
      {name:"Waxing Crescent",emoji:"🌒",shadow:"linear-gradient(to right, rgba(15,15,30,0.9) 0%, rgba(15,15,30,0.85) 60%, transparent 82%)",desc:"First light returns. Dream recall b...",tip:"Your recall is growing — capture ev..."},
      {name:"First Quarter",emoji:"🌓",shadow:"linear-gradient(to right, rgba(15,15,30,0.88) 0%, rgba(15,15,30,0.8) 42%, transparent 58%)",desc:"Half illuminated. Dreams may carry ...",tip:"Pay attention to decisions in your ..."},
      {name:"Waxing Gibbous",emoji:"🌔",shadow:"linear-gradient(to right, rgba(15,15,30,0.85) 0%, rgba(15,15,30,0.4) 18%, transparent 32%)",desc:"Nearly full. Dreams grow vivid and ...",tip:"Tonight's dreams may be especially ..."},
      {name:"Full Moon",emoji:"🌕",shadow:"transparent",desc:"Maximum illumination. The most vivi...",tip:"Perfect night for lucid dreaming pr..."},
      {name:"Waning Gibbous",emoji:"🌖",shadow:"linear-gradient(to left, rgba(15,15,30,0.85) 0%, rgba(15,15,30,0.4) 18%, transparent 32%)",desc:"Integration phase. Review what your...",tip:"Journal about patterns you've notic..."},
      {name:"Last Quarter",emoji:"🌗",shadow:"linear-gradient(to left, rgba(15,15,30,0.88) 0%, rgba(15,15,30,0.8) 42%, transparent 58%)",desc:"Release and forgiveness. Old patter...",tip:"Let go of what no longer serves you..."},
      {name:"Waning Crescent",emoji:"🌘",shadow:"linear-gradient(to left, rgba(15,15,30,0.9) 0%, rgba(15,15,30,0.85) 60%, transparent 82%)",desc:"The balsamic moon. Deep rest and qu...",tip:"Surrender to sleep — let dreams com..."},
    ];
    let idx = 0;
    if (age <= 1) idx = 0;
    else if (age <= 6) idx = 1;
    else if (age <= 9) idx = 2;
    else if (age <= 13) idx = 3;
    else if (age <= 16) idx = 4;
    else if (age <= 20) idx = 5;
    else if (age <= 24) idx = 6;
    else if (age <= 28) idx = 7;
    else idx = 0;
    return {...phases[idx], age, cycle: Math.round((age/29.53)*100)};
  };
  const moonPhase = getMoonPhase();
  const tv = themeVars[theme];
  const today = new Date().toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

        .al-root {
          --bg1:${tv["--bg1"]};--bg2:${tv["--bg2"]};--bg3:${tv["--bg3"]};
          --navy:${tv["--navy"]};--deep:${tv["--deep"]};--glass:${tv["--glass"]};
          --glass2:${tv["--glass2"]};--line:${tv["--line"]};--text:${tv["--text"]};
          --muted:${tv["--muted"]};--card-shadow:${tv["--card-shadow"]};--lav:${tv["--lav"]};
          --blue:${tv["--blue"]};--gold:${tv["--gold"]};--ice:${tv["--ice"]};
          --nav-bg:${tv["--nav-bg"]};--nav-active:${tv["--nav-active"]};
          --input-bg:${tv["--input-bg"]};
           color:var(--text);
          width:100%; min-height:100vh; display:grid; place-items:center;
          background: radial-gradient(ellipse at 20% 0%, rgba(79,203,255,0.22), transparent 50%),
                      radial-gradient(ellipse at 80% 100%, rgba(108,185,255,0.18), transparent 50%),
                      linear-gradient(155deg, var(--bg1), var(--bg2) 50%, var(--bg3));
          padding: 16px 8px;
        }
        .al-root * { box-sizing:border-box; margin:0; font-family:-apple-system,BlinkMacSystemFont,"Nunito","Segoe UI",sans-serif; }

        .phone {
          width: min(420px, 100%); height: min(880px, calc(100vh - 32px)); min-height: 720px;
          border-radius: 40px; position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--glass), var(--glass2));
          box-shadow: 0 24px 80px var(--card-shadow), 0 1px 0 inset var(--line);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
        }

        .al-header {
          height:88px; padding:20px 20px 8px; display:flex; align-items:center;
          justify-content:space-between; position:relative; z-index:3;
        }
        .brand-row { display:flex; align-items:center; gap:10px; }
        .brand-img {
          width:42px; height:42px; border-radius:14px;
          object-fit:cover;
          box-shadow: 0 8px 20px rgba(120,100,220,0.2);
        }
        .brand-name {
          font-family:'Cormorant Garamond',serif; font-size:13px; font-weight:700;
          text-transform:uppercase; letter-spacing:0.18em; color:var(--muted);
        }
        .brand-title {
          font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700;
          color:var(--navy); line-height:1.1;
        }
        .date-chip {
          font-size:13px; font-weight:800; padding:8px 14px; border-radius:99px;
          background:var(--glass); border:0.5px solid rgba(79,203,255,0.1);
          color:var(--muted); letter-spacing:0.02em;
        }

        .screen-area {
          position:absolute; inset:88px 0 82px; overflow-y:auto; overflow-x:hidden;
          padding:0 16px 20px; z-index:1; scrollbar-width:none;
        }
        .screen-area::-webkit-scrollbar { display:none; }

        @keyframes screenIn {
          from { opacity:0; transform:translateY(14px); }
          to { opacity:1; transform:none; }
        }
        .screen-enter { animation: screenIn 0.38s cubic-bezier(0.22,1,0.36,1) both; }

                .glass-card:hover { transform:translateY(-1px); box-shadow: 0 16px 48px var(--card-shadow); }

        .eyebrow {
          font-size:13px; font-weight:800; text-transform:uppercase;
          letter-spacing:0.18em; color:var(--muted); margin-bottom:4px;
        }
        .eyebrow.gold { color:var(--gold); }

        h2.section-title {
          font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700;
          color:var(--navy); line-height:1.12; margin-bottom:8px;
         text-shadow: 0 2px 8px rgba(44,44,84,0.08);}
        h3        p.body { position:relative;  font-size:14px; line-height:1.52; color:var(--muted); }

        .hero-card {
          display:grid; grid-template-columns:1fr 100px; align-items:center; gap:8px;
          min-height:220px; overflow:hidden;
        }
        .hero-orb { animation: glow 4s ease-in-out infinite;
          width:100px; height:100px; border-radius:50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), var(--lav) 50%, var(--blue));
          box-shadow: 0 0 40px rgba(79,203,255,0.3), 0 0 80px rgba(108,185,255,0.15);
          animation: orbFloat 6s ease-in-out infinite;
        }
        @keyframes orbFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-8px) scale(1.04); }
        }

        .btn-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
        .btn-primary {
          border:0; border-radius:99px; padding:12px 20px;
           font-size:14px; font-weight:800;
          background: linear-gradient(135deg, var(--deep), #4466ee, var(--lav));
          color:white; cursor:pointer;
          box-shadow: 0 8px 24px rgba(68,102,238,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform:translateY(-1px); box-shadow:0 12px 28px rgba(68,102,238,0.32); }
        .btn-secondary {
          border:0.5px solid rgba(79,203,255,0.1); border-radius:99px; padding:12px 20px;
           font-size:14px; font-weight:800;
          background:var(--glass); color:var(--deep); cursor:pointer;
          transition: transform 0.2s;
        }
        .btn-secondary:hover { transform:translateY(-1px); }
        .btn-text {
          border:0; background:none; 
          font-size:13px; font-weight:800; color:var(--lav); cursor:pointer;
          padding:4px 0;
        }

        .stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:14px 0; }
                .stat-card:hover { transform:translateY(-2px); }
        .stat-card        .stat-edit-panel {
          margin-top:12px; animation: fadeUp 0.3s ease both;
        }
        .stat-edit-label {
          font-size:13px; font-weight:800; text-transform:uppercase;
          letter-spacing:0.14em; color:var(--gold); margin-bottom:10px;
        }
                                        .stat-recall-wrap {
          display:flex; align-items:center; gap:10px;
        }
        .stat-recall-num {
          font-family:'Cormorant Garamond',serif; font-size:32px;
          font-weight:700; color:var(--navy); min-width:56px;
        }
        .stat-recall-bar { flex:1; }
        .stat-recall-hint {
          font-size:13px; color:var(--muted); margin-top:6px; text-align:center;
        }
        .stat-symbol-grid {
          display:grid; grid-template-columns:repeat(5,1fr); gap:6px;
        }
                .stat-symbol-btn:hover { transform:translateY(-1px); }
        .stat-symbol-btn        .stat-tap-hint {
          position:absolute; bottom:4px; left:0; right:0;
          font-size:13px; color:var(--muted); opacity:0.6;
          letter-spacing:0.06em;
        }

        .journal-tags-current {
          display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; min-height:28px;
        }
        .journal-tag-chip {
          display:flex; align-items:center; gap:4px;
          font-size:13px; font-weight:700; padding:5px 10px; border-radius:99px;
          background:linear-gradient(135deg, var(--glass), var(--glass2));
          border:1px solid var(--lav); color:var(--deep);
          animation: fadeUp 0.2s ease both;
        }
        .journal-tag-chip .jtc-x {
          font-size:13px; cursor:pointer; opacity:0.5; margin-left:2px;
          transition:opacity 0.15s;
        }
        .journal-tag-chip .jtc-x:hover { opacity:1; }
        .journal-symbol-scroll {
          max-height:180px; overflow-y:auto; overflow-x:hidden;
          border-radius:16px; padding:2px;
          scrollbar-width:thin;
        }
        .journal-symbol-grid {
          display:grid; grid-template-columns:repeat(5,1fr); gap:5px;
        }
                .journal-sym-btn:hover { transform:translateY(-1px); }
        .journal-sym-btn .jsb-emoji { display:block; font-size:18px; margin-bottom:2px; }
        .journal-sym-btn .jsb-name { display:block; font-size:13px; font-weight:700; opacity:0.7; }
        .journal-sym-btn        .journal-sym-btn.jsb-active .jsb-name { opacity:1; }

        .home-moon {
          display:flex; align-items:center; gap:16px;
          background:var(--glass); border:0.5px solid rgba(79,203,255,0.1);
          border-radius:22px; padding:16px 18px;
          box-shadow: 0 8px 28px var(--card-shadow);
          margin:12px 0;
          animation: fadeUp 0.5s 0.15s ease both;
        }
        .home-moon-orb {
          width:56px; height:56px; border-radius:50%; flex-shrink:0;
          position:relative; overflow:hidden;
          box-shadow: 0 0 18px rgba(212,200,160,0.25), 0 0 40px rgba(212,200,160,0.08);
        }
        .home-moon-orb         .home-moon-orb         .home-moon-info { flex:1; min-width:0; }
        .home-moon-phase {
          font-family:'Cormorant Garamond',serif; font-size:17px;
          font-weight:700; color:var(--navy); line-height:1.2;
        }
        .home-moon-desc {
          font-size:11.5px; color:var(--muted); line-height:1.5; margin-top:3px;
        }
        .home-moon-tip {
          font-size:13px; font-style:italic; color:var(--gold);
          margin-top:5px; line-height:1.3;
        }
        .home-moon-cycle {
          margin-top:8px; display:flex; align-items:center; gap:8px;
        }
        .home-moon-track {
          flex:1; height:3px; border-radius:3px;
          background:var(--line); overflow:hidden;
        }
        .home-moon-fill {
          height:100%; border-radius:3px;
          background:linear-gradient(90deg, var(--gold), var(--lav));
          transition:width 0.5s ease;
        }
        .home-moon-pct {
          font-size:13px; font-weight:800; color:var(--muted);
          min-width:28px; text-align:right;
        }

        .checkin-card {
          background:var(--glass); border:0.5px solid rgba(79,203,255,0.1);
          border-radius:22px; padding:18px;
          backdrop-filter:blur(30px); -webkit-backdrop-filter:blur(30px);
          margin:12px 0; animation: fadeUp 0.5s 0.2s ease both;
        }
        .checkin-header {
          display:flex; align-items:center; justify-content:space-between;
          cursor:pointer;
        }
        .checkin-title {
          font-family:'Cormorant Garamond',serif; font-size:17px;
          font-weight:700; color:var(--navy);
        }
                .checkin-status        .checkin-status        .checkin-body { position:relative;  margin-top:14px; animation: fadeUp 0.3s ease both; }
        .checkin-section { margin-bottom:14px; }
        .checkin-label {
          font-size:13px; font-weight:800; text-transform:uppercase;
          letter-spacing:0.14em; color:var(--gold); margin-bottom:8px;
        }
                                                                .checkin-slider-row {
          display:flex; align-items:center; gap:10px;
        }
        .checkin-slider-icon { font-size:18px; flex-shrink:0; }
        .checkin-slider-bar { flex:1; }
        .checkin-slider-val {
          font-family:'Cormorant Garamond',serif; font-size:20px;
          font-weight:700; color:var(--navy); min-width:32px; text-align:center;
        }
        .checkin-slider-hint {
          font-size:13px; color:var(--muted); text-align:center; margin-top:4px;
        }
        .checkin-done-banner {
          text-align:center; padding:6px 0;
        }
        .checkin-done-emoji { font-size:32px; display:block; margin-bottom:4px; }
        .checkin-done-text {
          font-family:'Cormorant Garamond',serif; font-size:15px;
          font-weight:700; color:var(--navy);
        }
        .checkin-done-detail {
          font-size:13px; color:var(--muted); margin-top:4px;
        }
        .ink-grid {
          display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin-top:8px;
        }
                .ink-swatch:hover { transform:scale(1.15); }
        .ink-swatch        .ink-name {
          font-size:13px; font-weight:700; text-align:center;
          color:var(--muted); margin-top:4px;
        }
        .ink-preview {
          margin-top:12px; padding:12px 16px;
          border-radius:14px; border:0.5px solid rgba(79,203,255,0.1);
          background:var(--glass2); font-style:italic;
          font-size:13px; line-height:1.6;
        }
                        .share-toast {
          position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
          background:var(--deep); color:white; padding:10px 20px;
          border-radius:99px; font-size:13px; font-weight:700;
           z-index:100;
          box-shadow:0 8px 24px rgba(0,0,0,0.2);
          animation: fadeUp 0.3s ease both;
        }
        .lock-screen {
          position:absolute; inset:0; z-index:50;
          background:linear-gradient(135deg, #07111F, #2d2b55, #07111F);
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; border-radius:40px;
        }
        .lock-icon { font-size:48px; margin-bottom:16px; }
        .lock-title {
          font-family:'Cormorant Garamond',serif; font-size:24px;
          font-weight:700; color:#EAF6FF; margin-bottom:6px;
        }
        .lock-sub {
          font-size:13px; color:rgba(224,216,240,0.5); margin-bottom:28px;
        }
                        .lock-dot        .lock-dot        @keyframes lockShake {
          0%,100% { transform:translateX(0); }
          25% { transform:translateX(-6px); }
          75% { transform:translateX(6px); }
        }
        .lock-keypad {
          display:grid; grid-template-columns:repeat(3,1fr); gap:12px;
          width:220px;
        }
        .lock-key {
          width:64px; height:64px; border-radius:50%;
          border:1px solid rgba(224,216,240,0.15);
          background:rgba(224,216,240,0.06);
          color:#EAF6FF; font-size:24px; font-weight:700;
          font-family:'Cormorant Garamond',serif;
          display:grid; place-items:center; cursor:pointer;
          transition:all 0.15s ease; margin:0 auto;
        }
        .lock-key:hover { background:rgba(224,216,240,0.12); }
        .lock-key:active { transform:scale(0.92); background:rgba(79,203,255,0.2); }
                .lock-error-text {
          font-size:13px; color:#e87070; margin-top:14px; font-weight:700;
        }
        .stat-icon { font-size:22px; margin-bottom:6px; }
        .stat-label { font-size:13px; font-weight:800; color:var(--deep); margin-bottom:2px; }
        .stat-value { font-size:13px; color:var(--muted); font-weight:600; }

        .form-label {
          display:block; font-size:13px; font-weight:800; color:var(--deep);
          margin-bottom:14px; letter-spacing:0.02em;
        }
        .form-input, .form-textarea, .form-select {
          width:100%; margin-top:6px; border:0.5px solid rgba(79,203,255,0.1);
          border-radius:16px; background:var(--input-bg); padding:12px 14px;
          color:var(--text);  font-size:14px;
          outline:none; transition:border-color 0.2s, box-shadow 0.2s;
          cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='28'><text y='20' font-size='20'>🪶</text></svg>") 4 24, text;
        }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color:var(--lav); box-shadow:0 0 0 3px rgba(79,203,255,0.15);
          cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='28'><text y='20' font-size='20'>🪶</text></svg>") 4 24, text;
        }
        .form-textarea { resize:vertical; min-height:120px; }
                input[type="range"] {
          width:100%; margin-top:10px; accent-color:var(--lav);
        }
                .save-toast
                .insight-item:hover { transform:translateX(3px); }

                                                .timeline-item::before {
          content:''; position:absolute; left:-27px; top:4px;
          width:12px; height:12px; border-radius:50%;
          background:var(--gold); box-shadow:0 0 0 5px rgba(212,164,76,0.15);
        }

        .check-list { display:grid; gap:8px; }
        .check-item {
          display:flex; align-items:center; gap:12px;
          background:var(--glass); border:0.5px solid rgba(79,203,255,0.1); border-radius:18px;
          padding:14px 16px; cursor:pointer; transition:transform 0.15s;
        }
        .check-item:hover { transform:translateX(2px); }
                .check-box        .check-text { font-size:14px; font-weight:600; color:var(--deep); }

        .setting-row {
          display:flex; align-items:center; justify-content:space-between;
          background:var(--glass2); border:0.5px solid rgba(79,203,255,0.1); border-radius:18px;
          padding:14px 16px; margin-bottom:8px;
        }
        .setting-label { font-size:14px; font-weight:700; color:var(--deep); }
                .toggle        .toggle::after {
          content:''; position:absolute; top:3px; left:3px;
          width:20px; height:20px; border-radius:50%; background:white;
          box-shadow:0 2px 6px rgba(0,0,0,0.15);
          transition:transform 0.25s;
        }
        .toggle.on::after { transform:translateX(20px); }

        .bottom-nav {
          display:flex; justify-content:space-around; align-items:center;
          position:fixed; bottom:0; left:0; right:0; height:70px;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(50px) saturate(200%);
          -webkit-backdrop-filter: blur(50px) saturate(200%);
          border-top: 0.5px solid rgba(79,203,255,0.08);
          box-shadow: 0 -4px 30px rgba(120,100,220,0.06);
          z-index:100; padding-bottom:8px;
        }
                .nav-btn span { font-size:16px; transition:transform 0.2s; }
        .nav-btn .nav-label { font-size:13px; font-weight:700; color:var(--muted); }
        .nav-btn        .nav-btn.active span { transform:scale(1.15); }
        .nav-btn.active .nav-label { color:var(--lav); }

        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes glow { 0%,100%{box-shadow:0 0 12px rgba(79,203,255,0.15)} 50%{box-shadow:0 0 24px rgba(79,203,255,0.3)} }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        .stagger-1 { animation: fadeUp 0.4s 0.05s both ease; }
        .stagger-2 { animation: fadeUp 0.4s 0.12s both ease; }
        .stagger-3 { animation: fadeUp 0.4s 0.19s both ease; }
        .stagger-4 { animation: fadeUp 0.4s 0.26s both ease; }

        .intention-text {
          font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600;
          font-style:italic; color:var(--navy); line-height:1.35;
        }

                .divider-line {
          height:1px; border:none;
          background:linear-gradient(90deg, transparent, var(--line), transparent);
          margin:18px 0 16px;
        }
        .section-label {
          font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:700;
          color:var(--navy); margin-bottom:12px; display:flex; align-items:center; gap:8px;
        }
        .section-label::before {
          content:''; width:16px; height:1px; background:var(--gold);
        }

                                                                                                .moon-orb-light {
          position:absolute; inset:0; border-radius:50%;
          background:radial-gradient(circle at 35% 30%, #fff8e8, #e8dcc0, #d4c8a4);
        }
        .moon-orb-shadow {
          position:absolute; inset:0; border-radius:50%;
          transition: all 0.3s ease;
        }
                                .moon-detail-card:hover { transform:translateY(-1px); }
                .moon-detail-icon .moon-orb-light {
          position:absolute; inset:0; border-radius:50%;
          background:radial-gradient(circle at 35% 30%, #fff8e8, #e8dcc0, #d4c8a4);
        }
        .moon-detail-icon .moon-orb-shadow {
          position:absolute; inset:0; border-radius:50%;
        }

        .journal-header-art {
          text-align:center; padding:8px 0 16px; position:relative;
        }
        .journal-quill {
          font-size:48px; display:block; margin:0 auto 8px;
          filter:drop-shadow(0 4px 12px rgba(79,203,255,0.3));
          animation: quillFloat 4s ease-in-out infinite;
        }
        @keyframes quillFloat {
          0%,100% { transform:translateY(0) rotate(-5deg); }
          50% { transform:translateY(-6px) rotate(5deg); }
        }
        .journal-prompt {
          font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:600;
          font-style:italic; color:var(--navy); line-height:1.3;
        }
        .journal-sub {
          font-size:13px; color:var(--muted); margin-top:4px;
        }

        .form-section {
          margin-bottom:20px;
        }
        .form-section-label {
          font-size:13px; font-weight:800; text-transform:uppercase;
          letter-spacing:0.16em; color:var(--gold); margin-bottom:12px; margin-top:4px;
        }
        .journal-group { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-radius:18px; border:0.5px solid rgba(79,203,255,0.1);
          background:var(--glass2); margin:14px 0; overflow:hidden;
        }
        .journal-group-head {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 18px; cursor:pointer;
        }
        .journal-group-title {
           font-size:15px;
          font-weight:700; color:var(--navy); display:flex; align-items:center; gap:8px;
        }
        .journal-group-badge {
          font-size:13px; padding:2px 8px; border-radius:99px;
          background:rgba(79,203,255,0.1); color:var(--lav);
          font-weight:700;
        }
        .journal-group-body { position:relative; padding:8px 18px 18px; }
        .ai-result {
          margin-top:10px; padding:14px; border-radius:14px;
          background:linear-gradient(135deg,rgba(79,203,255,0.06),rgba(106,92,205,0.03));
          border:0.5px solid rgba(79,203,255,0.1); font-size:13px; color:var(--deep);
          line-height:1.7; 
          white-space:pre-wrap;
        }
        .pill-scroll {
          display:flex; flex-wrap:wrap; gap:8px; padding:6px 0;
        }
                .cat-pill:active { transform:scale(0.95); }
        .cat-pill {
          padding:8px 14px; border-radius:99px; font-size:13px; font-weight:700;
          border:1px solid var(--line); background:var(--glass);
          color:var(--muted); cursor:pointer;
        }
        .cat-pill.cat-active {
          background:rgba(79,203,255,0.12); border-color:var(--lav); color:var(--lav);
        }
        .vivid-display {
          display:flex; align-items:center; gap:12px;
        }
        .vivid-value {
          font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700;
          color:var(--navy); min-width:52px; text-align:center;
        }
        .vivid-label {
          font-size:13px; color:var(--muted); font-weight:700;
          text-transform:uppercase; letter-spacing:0.1em;
        }

        .save-overlay {
          position:absolute; inset:0; z-index:10;
          background:radial-gradient(circle at 50% 40%, rgba(79,203,255,0.15), var(--glass) 70%);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation: saveAppear 0.4s ease both;
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
          border-radius:26px;
        }
        @keyframes saveAppear {
          from { opacity:0; transform:scale(0.95); }
          to { opacity:1; transform:scale(1); }
        }
        .save-sparkle {
          font-size:52px; margin-bottom:12px;
          animation: sparkleUp 0.6s ease both;
        }
        @keyframes sparkleUp {
          from { opacity:0; transform:translateY(16px) scale(0.6); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        .save-text {
          font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700;
          color:var(--navy); animation: fadeUp 0.5s 0.2s ease both;
        }
        .save-sub-text {
          font-size:13px; color:var(--muted); margin-top:4px;
          animation: fadeUp 0.5s 0.4s ease both;
        }

        .delete-btn {
          border:0; background:none; font-size:13px; font-weight:700;
          color:var(--muted); cursor:pointer; padding:8px 0; margin-top:8px;
          opacity:0.6; transition:opacity 0.2s;
          
        }
        .delete-btn:hover { opacity:1; }

        .rec-bar {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; border-radius:16px; margin-bottom:14px;
          background:linear-gradient(135deg, rgba(220,60,60,0.08), rgba(220,60,60,0.04));
          border:1px solid rgba(220,60,60,0.2);
          animation: recPulse 2s ease-in-out infinite;
        }
        @keyframes recPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(220,60,60,0.1); }
          50% { box-shadow:0 0 0 8px rgba(220,60,60,0.05); }
        }
        .rec-dot {
          width:12px; height:12px; border-radius:50%;
          background:#dc3c3c; flex-shrink:0;
          animation: recBlink 1s ease-in-out infinite;
        }
        @keyframes recBlink {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.8); }
        }
        .rec-text {
          font-size:13px; font-weight:700; color:#dc3c3c; flex:1;
        }
        .rec-stop-btn {
          border:1px solid rgba(220,60,60,0.3); border-radius:99px;
          background:rgba(220,60,60,0.08); color:#dc3c3c;
           font-size:13px; font-weight:800;
          padding:6px 14px; cursor:pointer;
          transition:all 0.2s ease;
        }
        .rec-stop-btn:hover { background:rgba(220,60,60,0.15); }
        .rec-btn-journal {
          border:0.5px solid rgba(79,203,255,0.1); border-radius:14px;
          background:var(--glass2); color:var(--deep);
           font-size:13px; font-weight:700;
          padding:10px 16px; cursor:pointer; width:100%;
          transition:all 0.2s ease; margin-bottom:6px;
          display:flex; align-items:center; justify-content:center; gap:6px;
        }
        .rec-btn-journal:hover { transform:translateY(-1px); }
        .rec-btn-journal
                                                                        .dict-cat-btn
                                                                                        @keyframes dictExpand {
          from { opacity:0; max-height:0; padding-bottom:0; }
          to { opacity:1; max-height:300px; padding-bottom:16px; }
        }
        button, input, textarea, select { font-family:inherit; }
                                                .dict-add-btn                              `}</style>

      <div className="al-root">
        <div className="phone">
          {appLocked && lockEnabled && (
            <div className="lock-screen">
              <div className="lock-icon">🔒</div>
              <div className="lock-title">DriftLoom</div>
              <div className="lock-sub">Enter your passcode to unlock</div>
              <div className="lock-dots">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`lock-dot ${lockInput.length > i ? (lockError ? "error" : "filled") : ""}`} />
                ))}
              </div>
              <div className="lock-keypad">
                {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i) => (
                  k === "" ? <div key={i} /> :
                  <button key={i} className="lock-key" onClick={() => {
                    if (k === "⌫") {
                      setLockInput(p => p.slice(0,-1));
                      setLockError(false);
                    } else {
                      const next = lockInput + k;
                      setLockInput(next);
                      if (next.length === 4) {
                        if (next === passcode) {
                          setAppLocked(false);
                          setLockInput("");
                          setLockError(false);
                        } else {
                          setLockError(true);
                          setTimeout(() => { setLockInput(""); setLockError(false); }, 600);
                        }
                      }
                    }
                  }}>
                    {k === "⌫" ? <span style={{fontSize:18}}>⌫</span> :
                      <div><div>{k}</div></div>
                    }
                  </button>
                ))}
              </div>
              {lockError && <div className="lock-error-text">Incorrect passcode</div>}
              {useBiometric && (
                <div onClick={() => {
                  /* NATIVE: use expo-local-authentication here */
                  // Prototype: simulate biometric scan
                  setLockInput("••••");
                  setTimeout(() => { setAppLocked(false); setLockInput(""); setLockError(false); }, 800);
                }} style={{marginTop:16,textAlign:"center",cursor:"pointer"}}>
                  <div style={{width:48,height:48,margin:"0 auto",borderRadius:12,border:"2px solid rgba(79,203,255,0.3)",display:"grid",placeItems:"center"}}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M4 8V5a1 1 0 011-1h3M20 4h3a1 1 0 011 1v3M24 20v3a1 1 0 01-1 1h-3M8 24H5a1 1 0 01-1-1v-3" stroke="rgba(79,203,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="10" cy="12" r="1.5" fill="rgba(79,203,255,0.5)"/>
                      <circle cx="18" cy="12" r="1.5" fill="rgba(79,203,255,0.5)"/>
                      <path d="M10 18c1.5 2 6.5 2 8 0" stroke="rgba(79,203,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{fontSize:13,color:"rgba(79,203,255,0.5)",marginTop:6}}>Face ID</div>
                </div>
              )}
              <div style={{marginTop:20,textAlign:"center"}}>
                <div onClick={() => {
                  if (window.confirm("Reset your passcode? This will disable the lock screen. You can set a new one in Settings.")) {
                    setPasscode("");
                    setLockEnabled(false);
                    setAppLocked(false);
                    setLockInput("");
                    setLockError(false);
                  }
                }} style={{fontSize:14,color:"rgba(79,203,255,0.6)",cursor:"pointer",padding:10}}>
                  Forgot Passcode?
                </div>
              </div>
            </div>
          )}

          <Stars theme={theme} />

          {/* Header */}
          <header className="al-header">
            <div className="brand-row">
              <img src={APP_ICON} alt="DriftLoom" className="brand-img" />
              <div>
                <div className="brand-name">DriftLoom</div>
                <div className="brand-title">{TITLES[screen]}</div>
              </div>
            </div>
            <div className="date-chip">{today}</div>
          </header>

          {/* Screen content */}
          <div className="screen-area" key={animKey}>
            <div className="screen-enter">

              {/* ─── HOME ─── */}
              {screen === "home" && <>

                {/* 🎯 Tonight's Mission */}
                <div style={{padding:14,borderRadius:16,background:"linear-gradient(135deg,rgba(255,179,71,0.08),rgba(79,203,255,0.05))",border:"1px solid var(--line)",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--navy)"}}>🎯 Tonight's Mission</div>
                    <div style={{fontSize:13,padding:"2px 8px",borderRadius:99,background:"linear-gradient(135deg,#ffb347,#ff6b6b)",color:"white",fontWeight:700}}>+{[15,20,25,10,30,15,20][new Date().getDay()]} XP</div>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"var(--deep)",lineHeight:1.5}}>
                    {["Before sleep, whisper your dream intention 3 times","Place your journal under your pillow tonight","Drink a glass of water and say 'I will remember'","Visualize a door — decide what's behind it before sleep","Set an alarm 30 min before usual wake time for dream recall","Draw a symbol on your hand — look for it in your dream","Tell someone about yesterday's dream before bed"][new Date().getDay()]}
                  </div>
                </div>

                <div className="home-moon stagger-1">
                  <div className="home-moon-orb">
                    <div className="moon-orb-light" />
                    <div className="moon-orb-shadow" style={{background:moonPhase.shadow}} />
                  </div>
                  <div className="home-moon-info">
                    <div className="home-moon-phase">{moonPhase.emoji} {moonPhase.name}</div>
                    <div className="home-moon-desc">{moonPhase.desc}</div>
                    <div className="home-moon-tip">💡 {moonPhase.tip}</div>
                    <div className="home-moon-cycle">
                      <div className="home-moon-track">
                        <div className="home-moon-fill" style={{width:`${moonPhase.cycle}%`}} />
                      </div>
                      <div className="home-moon-pct">{moonPhase.cycle}%</div>
                    </div>
                  </div>
                </div>

                {/* 🌟 Dream Score */}
                <div style={{padding:14,borderRadius:18,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.12)",marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
                  <div style={{position:"relative",width:60,height:60,flexShrink:0}}>
                    <svg viewBox="0 0 60 60" style={{transform:"rotate(-90deg)"}}>
                      <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(79,203,255,0.1)" strokeWidth="5"/>
                      <circle cx="30" cy="30" r="25" fill="none" stroke="#4FCBFF" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${Math.round(dreams.length*5)} 157`}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"#EAF6FF"}}>{Math.min(100,dreams.length*7)}</div>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.4)",letterSpacing:1,textTransform:"uppercase"}}>Dream Score</div>
                    <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>{dreams.length} dreams logged</div>
                  </div>
                </div>

                {/* ✨ Symbol & Fact */}
                <div style={{padding:14,borderRadius:18,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{fontSize:24}}>{["🌙","⭐","🗝","🪶","🦋","🔥","🌊"][new Date().getDay()]}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1,textTransform:"uppercase"}}>Symbol of the Day</div>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--navy)"}}>{["Moon — Trust intuition","Stars — Seek direction","Key — Unlock new doors","Feather — Let go","Butterfly — Embrace change","Fire — Follow passion","Ocean — Dive deep"][new Date().getDay()]}</div>
                    </div>
                  </div>
                  <div style={{borderTop:"1px solid var(--line)",paddingTop:10}}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>💡 Dream Fact</div>
                    <div style={{fontSize:14,color:"var(--deep)"}}>{["90% of dreams fade within 10 minutes.","Blind people dream with sounds and touch.","You only dream faces you've seen before.","Dogs twitch during REM — they dream too.","You have 4-6 dreams every single night.","12% of people dream in black and white.","Toddlers don't appear in their own dreams until age 3."][new Date().getDay()]}</div>
                  </div>
                </div>

                <div className="checkin-card">
                  <div className="checkin-header" onClick={() => setCheckinOpen(!checkinOpen)}>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.14em",color:"var(--gold)",marginBottom:2}}>Daily check-in</div>
                      <div className="checkin-title">How are you feeling today? ✨</div>
                    </div>
                    <div className={`checkin-status ${checkinDone ? "done" : "pending"}`}>
                      {checkinDone ? "✓ Done" : "Tap to start"}
                    </div>
                  </div>

                  {checkinDone && !checkinOpen && (
                    <div className="checkin-done-banner" style={{marginTop:10}}>
                      <span className="checkin-done-emoji">{(FEELINGS.find(f => f.label === checkin.feeling) || {}).emoji || "✨"}</span>
                      <div className="checkin-done-text">Feeling {checkin.feeling || "checked in"}</div>
                      <div className="checkin-done-detail">
                        Sleep: {checkin.sleep}/10 · Energy: {checkin.energy}/10
                        {checkin.note ? (" · " + checkin.note) : ""}
                      </div>
                      <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>tap to update</div>
                    </div>
                  )}

                  {checkinOpen && (
                    <div className="checkin-body">
                      <div className="checkin-section">
                        <div className="checkin-label">How are you feeling?</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                          {FEELINGS.map(f => (
                            <div key={f.label}
                              onClick={(e) => { e.stopPropagation(); setCheckin(c => ({...c, feeling:f.label})); }}
                              style={{
                                display:"flex",alignItems:"center",gap:10,
                                padding:12,borderRadius:12,cursor:"pointer",
                                background:checkin.feeling===f.label?"rgba(79,203,255,0.1)":"transparent",
                                border:checkin.feeling===f.label?"2px solid var(--lav)":"1px solid var(--line)",
                              }}>
                              <span style={{fontSize:20}}>{f.emoji}</span>
                              <span style={{fontSize:13,fontWeight:600,color:checkin.feeling===f.label?"var(--lav)":"var(--navy)"}}>{f.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="checkin-section">
                        <div className="checkin-label">How did you sleep?</div>
                        <div className="checkin-slider-row">
                          <span className="checkin-slider-icon">😴</span>
                          <input type="range" className="checkin-slider-bar" min="0" max="10"
                            value={checkin.sleep}
                            onClick={e => e.stopPropagation()}
                            onChange={e => setCheckin(c => ({...c, sleep:+e.target.value}))} />
                          <span className="checkin-slider-val">{checkin.sleep}</span>
                        </div>
                        <div className="checkin-slider-hint">
                          {checkin.sleep <= 2 ? "Rough night" : checkin.sleep <= 4 ? "Restless" : checkin.sleep <= 6 ? "Decent rest" : checkin.sleep <= 8 ? "Slept well" : "Deeply rested ✨"}
                        </div>
                      </div>

                      <div className="checkin-section">
                        <div className="checkin-label">Energy level</div>
                        <div className="checkin-slider-row">
                          <span className="checkin-slider-icon">⚡</span>
                          <input type="range" className="checkin-slider-bar" min="0" max="10"
                            value={checkin.energy}
                            onClick={e => e.stopPropagation()}
                            onChange={e => setCheckin(c => ({...c, energy:+e.target.value}))} />
                          <span className="checkin-slider-val">{checkin.energy}</span>
                        </div>
                        <div className="checkin-slider-hint">
                          {checkin.energy <= 2 ? "Running on empty" : checkin.energy <= 4 ? "Low battery" : checkin.energy <= 6 ? "Steady" : checkin.energy <= 8 ? "Energized" : "On fire 🔥"}
                        </div>
                      </div>

                      <div className="checkin-section" style={{marginBottom:8}}>
                        <div className="checkin-label">Morning thought (optional)</div>
                        <input className="form-input" value={checkin.note}
                          placeholder="One word or sentence about today..."
                          style={{fontSize:13}}
                          onClick={e => e.stopPropagation()}
                          onChange={e => setCheckin(c => ({...c, note:e.target.value}))} />
                      </div>

                      <button className="btn-primary" style={{width:"100%",padding:"12px 16px"}}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCheckinDone(true);
                          setCheckinOpen(false);
                        }}>
                        {checkinDone ? "Update check-in ✓" : "Save check-in ✨"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Watch Sleep Tracker */}
                {(() => {
                  const d = new Date();
                  const seed = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
                  const s = (n) => ((seed * (n+1) * 9301 + 49297) % 233280) / 233280;
                  const hrs = 6 + Math.round(s(1)*20)/10;
                  const mins = Math.round(s(2)*59);
                  const score = Math.round(70 + s(3)*25);
                  const hr = Math.round(52 + s(4)*14);
                  const deep = Math.round(15+s(5)*15);
                  const rem = Math.round(18+s(6)*12);
                  const light = Math.round(35+s(7)*15);
                  const awake = Math.max(0, 100-deep-rem-light);
                  const bpm = hr;
                  const o2 = Math.round(95+s(19)*4);
                  const steps = Math.round(4200+s(21)*8800);
                  const cals = Math.round(1400+s(23)*900);
                  const restHr = Math.round(56+s(22)*16);
                  const moodZone = bpm<=55?"Deep Rest":bpm<=62?"Serene":bpm<=68?"Peaceful":bpm<=75?"Content":"Alert";
                  const moodColor = bpm<=55?"#6a8cff":bpm<=62?"#4FCBFF":bpm<=68?"#4ecdc4":bpm<=75?"#a8e6cf":"#ffb347";
                  const expanded = editingStat;
                  const toggle = (id) => setEditingStat(editingStat === id ? null : id);
                  const Detail = ({title,children}) => (
                    <div style={{marginTop:8,padding:10,borderRadius:12,background:"var(--glass2)",border:"1px solid var(--line)",animation:"fadeUp 0.3s ease"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:6}}>{title}</div>
                      {children}
                    </div>
                  );
                  const Bar = ({label,val,max,color}) => (
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <div style={{width:50,fontSize:13,fontWeight:700,color:"var(--muted)"}}>{label}</div>
                      <div style={{flex:1,height:6,borderRadius:3,background:"var(--line)",overflow:"hidden"}}><div style={{height:"100%",width:`${(val/max)*100}%`,borderRadius:3,background:color}} /></div>
                      <div style={{width:30,fontSize:13,fontWeight:700,color:"var(--deep)",textAlign:"right"}}>{val}</div>
                    </div>
                  );
                  return (
                    <GlassCard className="stagger-2">
                      <p className="eyebrow gold" style={{textAlign:"center"}}>⌚ Sleep Tracker</p>
                      <div style={{textAlign:"center",marginBottom:12}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:700,color:"var(--navy)"}}>{Math.floor(hrs)}h {mins}m</div>
                        <div style={{fontSize:13,color:"var(--muted)"}}>Total Sleep · Score: <span style={{color:score>=85?"#4ecdc4":score>=70?"var(--gold)":"#ff6b6b",fontWeight:700}}>{score}%</span></div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,marginBottom:8}}>
                        {[{l:"Deep",v:deep+"%",c:"#0E2B5C"},{l:"REM",v:rem+"%",c:"#4FCBFF"},{l:"Light",v:light+"%",c:"#6a8cff"},{l:"Awake",v:awake+"%",c:"#ffb347"}].map((st,i) => (
                          <div key={i} style={{textAlign:"center",padding:6,borderRadius:10,background:`${st.c}10`,border:`1px solid ${st.c}33`}}>
                            <div style={{fontSize:13,fontWeight:700,color:st.c}}>{st.v||"—"}</div>
                            <div style={{fontSize:13,fontWeight:700,color:"var(--muted)"}}>{st.l||""}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                        {[{icon:"💓",val:bpm,label:"BPM"},{icon:"🫁",val:o2+"%",label:"O₂"},{icon:"👟",val:steps.toLocaleString(),label:"Steps"}].map((m,i) => (
                          <div key={i} style={{textAlign:"center",padding:6,borderRadius:10,background:"var(--glass2)",border:"1px solid var(--line)"}}>
                            <div style={{fontSize:13}}>{m.icon}</div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"var(--navy)"}}>{m.val}</div>
                            <div style={{fontSize:13,color:"var(--muted)"}}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>

                  );
                })()}

                {/* 🛏 Sleep Conditions Log */}
                <GlassCard className="stagger-2" style={{padding:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={() => setJournalSections(s => ({...s, sleepLog:!s.sleepLog}))}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--navy)"}}>🛏 Sleep Conditions</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {checkin.stress && <span className="journal-group-badge">logged</span>}
                      <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.sleepLog ? "−" : "+"}</span>
                    </div>
                  </div>
                  {journalSections.sleepLog && <div style={{marginTop:10}}>
                    <div className="form-section-label">😴 Sleep position</div>
                    <div className="pill-scroll">
                      {["🔙 Back","⬅️ Left","➡️ Right","⬇️ Stomach","🔄 Shifted"].map(sp => {
                        const name = sp.split(" ").slice(1).join(" ");
                        return <div key={sp} className={`cat-pill ${checkin.sleepPos===name?"cat-active":""}`} onClick={() => setCheckin({...checkin, sleepPos:checkin.sleepPos===name?"":name})}>{sp}</div>;
                      })}
                    </div>
                    <div className="form-section-label">😰 Day stress (1-10)</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:13,color:"var(--muted)"}}>😌</span>
                      <input type="range" min="1" max="10" value={checkin.stress||5} style={{flex:1}}
                        onChange={e => setCheckin({...checkin, stress:parseInt(e.target.value)})} />
                      <span style={{fontSize:13,color:"var(--muted)"}}>😰</span>
                      <span style={{fontSize:14,fontWeight:800,color:checkin.stress>7?"#ff6b6b":checkin.stress>4?"var(--gold)":"#4ecdc4",fontFamily:"'Cormorant Garamond',serif"}}>{checkin.stress||5}</span>
                    </div>
                    <div className="form-section-label">🌡 Room conditions</div>
                    <div className="pill-scroll">
                      {["❄️ Cold","👌 Just right","🔥 Too warm","🌑 Dark","💡 Some light","🤫 Silent","🔊 Noisy"].map(rc => {
                        const name = rc.split(" ").slice(1).join(" ");
                        return <div key={rc} className={`cat-pill ${checkin.roomCond===name?"cat-active":""}`} onClick={() => setCheckin({...checkin, roomCond:checkin.roomCond===name?"":name})}>{rc}</div>;
                      })}
                    </div>
                    <div className="form-section-label">🛏 Bed comfort (1-5)</div>
                    <div style={{display:"flex",gap:4}}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} style={{fontSize:22,cursor:"pointer",opacity:(checkin.bedComfort||0)>=n?1:0.25}}
                          onClick={() => setCheckin({...checkin, bedComfort:checkin.bedComfort===n?0:n})}>⭐</span>
                      ))}
                    </div>
                    <div className="form-section-label">🔊 Noise environment</div>
                    <div className="pill-scroll">
                      {["🤫 Silent","🌊 White noise","🌀 Fan","🎵 Music","👥 Partner","🚗 Traffic"].map(ne => {
                        const name = ne.split(" ").slice(1).join(" ");
                        return <div key={ne} className={`cat-pill ${checkin.noiseLvl===name?"cat-active":""}`} onClick={() => setCheckin({...checkin, noiseLvl:checkin.noiseLvl===name?"":name})}>{ne}</div>;
                      })}
                    </div>
                    <div className="form-section-label">🧘 Pre-bed activity</div>
                    <div className="pill-scroll">
                      {["📖 Read","🧘 Meditated","📱 Phone","📺 TV","🏃 Exercise","🛁 Bath","💬 Talked"].map(pb => {
                        const name = pb.split(" ").slice(1).join(" ");
                        return <div key={pb} className={`cat-pill ${checkin.preBed===name?"cat-active":""}`} onClick={() => setCheckin({...checkin, preBed:checkin.preBed===name?"":name})}>{pb}</div>;
                      })}
                    </div>
                    <div className="form-section-label">⏱ Dream recall speed</div>
                    <div className="pill-scroll">
                      {["⚡ Instant","🕐 ~1 min","🕑 ~5 min","🕒 10+ min","🚫 No recall"].map(rs => {
                        const name = rs.split(" ").slice(1).join(" ");
                        return <div key={rs} className={`cat-pill ${checkin.recallSpeed===name?"cat-active":""}`} onClick={() => setCheckin({...checkin, recallSpeed:checkin.recallSpeed===name?"":name})}>{rs}</div>;
                      })}
                    </div>

                    {/* Save + Status */}
                    {(() => {
                      const filled = [checkin.brainWave,checkin.sleepPos,checkin.stress>1,checkin.caffeine,checkin.screenTime,checkin.lastMeal,checkin.sleepAid,checkin.roomCond,checkin.bedComfort,checkin.noiseLvl,checkin.preBed,checkin.recallSpeed].filter(Boolean).length;
                      return <>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:12}}>
                          <button className="btn-primary" style={{flex:1,padding:"10px 16px",fontSize:13}}
                            onClick={() => { setCheckinDone(true); setJournalSections(s=>({...s,sleepLog:false})); }}>
                            ✓ Save Sleep Log ({filled}/12)
                          </button>
                        </div>
                        <div style={{textAlign:"center",marginTop:6,fontSize:13,color:checkinDone?"#4ecdc4":"var(--muted)"}}>
                          {checkinDone ? "✅ Sleep log saved! Data persists across sessions." : "Auto-saves as you go · tap to confirm"}
                        </div>
                      </>;
                    })()}
                  </div>}
                </GlassCard>

                {/* 🔮 Dream Oracle */}
                <GlassCard className="stagger-2" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">🔮 Dream Oracle</p>
                  <p className="body" style={{fontSize:13,marginBottom:8}}>Ask a question about your dream life. Tap the orb.</p>
                  <div style={{
                    width:70,height:70,borderRadius:"50%",margin:"0 auto 10px",cursor:"pointer",
                    background:"radial-gradient(circle, rgba(79,203,255,0.3), rgba(106,92,205,0.1), transparent)",
                    boxShadow:"0 0 30px rgba(79,203,255,0.15)",
                    display:"grid",placeItems:"center",fontSize:32,
                    animation:"pulse 3s ease-in-out infinite",
                  }} onClick={() => {
                    const answers = ["Yes — your dreams are showing you the way.","Not yet — the answer is forming in your sleep.","Look deeper — the symbol you keep ignoring holds the key.",
                      "Tonight's dream will bring clarity.","The answer lives in a dream you've already had.","Yes — trust what you felt in your last dream.",
                      "Let go of the question. The dream will come.","A recurring symbol is trying to tell you something.",
                      "Write your dream down first, then ask again.","Your subconscious already knows. Sleep on it."];
                    const el = document.getElementById("oracle-answer");
                    if (el) { el.style.opacity="0"; setTimeout(() => { el.textContent=answers[Math.floor(Math.random()*answers.length)]; el.style.opacity="1"; },300); }
                  }}>🔮</div>
                  <div id="oracle-answer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"var(--deep)",fontStyle:"italic",lineHeight:1.6,minHeight:40,transition:"opacity 0.5s ease"}}>Tap the orb and ask your question...</div>
                </GlassCard>

                {/* ⌚ DriftLoom Watch Companion */}
                <GlassCard className="stagger-2" style={{overflow:"hidden",position:"relative"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#02040A,#07111F)",borderRadius:20,zIndex:0}} />
                  <div style={{position:"relative",zIndex:1}}>
                    <p style={{fontSize:13,fontWeight:800,color:"rgba(224,216,240,0.4)",letterSpacing:1,textTransform:"uppercase",textAlign:"center",marginBottom:4}}>⌚ DriftLoom Watch</p>
                    <p style={{fontSize:13,fontWeight:700,color:"#EAF6FF",textAlign:"center",fontFamily:"'Cormorant Garamond',serif",marginBottom:10}}>Your Night's Emotional Rhythm</p>

                    {/* Tonight's Rhythm */}
                    <div style={{padding:10,borderRadius:14,background:"rgba(79,203,255,0.08)",border:"1px solid rgba(79,203,255,0.15)",marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:13,fontWeight:700,color:"#4FCBFF"}}>🌙 Tonight's Rhythm</span>
                        <span style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>{moonPhase.emoji} {moonPhase.name}</span>
                      </div>
                      <div style={{display:"flex",gap:2,height:20,alignItems:"flex-end"}}>
                        {[20,35,60,80,95,75,50,30,45,65,85,70,40,25].map((v,i) => (
                          <div key={i} style={{flex:1,height:`${v}%`,borderRadius:2,background:`rgba(79,203,255,${0.3+v/200})`}} />
                        ))}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"rgba(224,216,240,0.3)",marginTop:2}}>
                        <span>10 PM</span><span>2 AM</span><span>6 AM</span>
                      </div>
                    </div>

                    {/* Watch Buttons */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:8}}>
                      <div style={{padding:8,borderRadius:14,background:"rgba(255,179,71,0.1)",border:"1px solid rgba(255,179,71,0.2)",textAlign:"center",cursor:"pointer"}}
                        onClick={() => { setDream({...dream, notes:(dream.notes?dream.notes+"\n":"")+"[Quick dream logged at "+new Date().toLocaleTimeString()+"]"}); startNewDream(); }}>
                        <div style={{fontSize:18}}>💫</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#ffb347"}}>I Had a Dream</div>
                      </div>
                      <div style={{padding:8,borderRadius:14,background:"rgba(78,205,196,0.1)",border:"1px solid rgba(78,205,196,0.2)",textAlign:"center",cursor:"pointer"}}
                        onClick={recordDream}>
                        <div style={{fontSize:18}}>🎙</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#4ecdc4"}}>Voice Capture</div>
                      </div>
                      <div style={{padding:8,borderRadius:14,background:"rgba(106,138,255,0.1)",border:"1px solid rgba(106,138,255,0.2)",textAlign:"center",cursor:"pointer"}}
                        onClick={() => { const el=document.getElementById("breathGuide"); if(el)el.style.display=el.style.display==="none"?"block":"none"; }}>
                        <div style={{fontSize:18}}>🫁</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#6a8cff"}}>Breathe</div>
                      </div>
                    </div>

                    <div id="breathGuide" style={{display:"none",padding:12,borderRadius:14,background:"rgba(106,138,255,0.08)",border:"1px solid rgba(106,138,255,0.15)",textAlign:"center",marginBottom:8}}>
                      <div style={{width:45,height:45,borderRadius:"50%",background:"radial-gradient(circle,rgba(106,138,255,0.3),transparent)",margin:"0 auto 6px",animation:"pulse 4s ease-in-out infinite",display:"grid",placeItems:"center",fontSize:20}}>🌬</div>
                      <div style={{fontSize:13,color:"#6a8cff",fontWeight:700}}>Breathe with the light</div>
                      <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}></div>
                    </div>

                    {/* Mood Weather */}
                    {(() => {
                      const hr = new Date().getHours(); const stress = checkin.stress||5; const sleep = checkin.sleep||5; const energy = checkin.energy||5;
                      let auto = stress>=8?"Stormy":stress>=6&&sleep<=4?"Cloudy":energy<=3?"Low Battery":hr>=22||hr<=4?"Moon Mode":energy>=7?"Sparkly":sleep<=5?"Foggy":"Clear";
                      const current = checkin.moodWeather || auto;
                      const icons = {Clear:"☀️",Cloudy:"☁️",Foggy:"🌫",Stormy:"⛈",Sparkly:"✨","Low Battery":"🪫","Moon Mode":"🌙"};
                      const colors = {Clear:"#ffb347",Cloudy:"#9a9ab0",Foggy:"#c8c8d8",Stormy:"#0E2B5C",Sparkly:"#ffd700","Low Battery":"#7f8c8d","Moon Mode":"#4FCBFF"};
                      return (
                        <div style={{padding:8,borderRadius:14,background:`${colors[current]}15`,border:`1px solid ${colors[current]}33`,textAlign:"center",marginBottom:8}}>
                          <div style={{fontSize:16}}>{icons[current]||"☀️"}</div>
                          <div style={{fontSize:13,fontWeight:700,color:colors[current]}}>{current||"Clear"}</div>
                          <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>{!checkin.moodWeather?"Auto-detected":"Your inner sky"}</div>
                        </div>
                      );
                    })()}

                    {/* DreamTags */}
                    <div style={{marginBottom:8}}>
                      <div style={{fontSize:13,fontWeight:700,color:"rgba(224,216,240,0.4)",marginBottom:4}}>⚡ DreamTags</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {["✨ Vivid","😱 Scary","🦅 Flying","💕 Love","🏃 Chase","🌊 Water","🔮 Lucid","❓ Weird"].map(tag => {
                          const name = tag.split(" ")[1];
                          const active = dream.tags?.includes(name);
                          return <div key={tag||""} style={{padding:"3px 8px",borderRadius:20,fontSize:13,fontWeight:700,cursor:"pointer",
                            background:active?"rgba(79,203,255,0.2)":"rgba(255,255,255,0.05)",
                            border:active?"1px solid rgba(79,203,255,0.4)":"1px solid rgba(255,255,255,0.08)",
                            color:active?"#4FCBFF":"rgba(224,216,240,0.5)",
                          }} onClick={() => {
                            const tags = (dream.tags||"").split(",").map(t=>t.trim()).filter(Boolean);
                            if (tags.includes(name)) setDream({...dream,tags:tags.filter(t=>t!==name).join(", ")});
                            else setDream({...dream,tags:[...tags,name].join(", ")});
                          }}>{tag||""}</div>;
                        })}
                      </div>
                    </div>

                    {/* Wake-Up Dream Catch */}
                    <div style={{padding:10,borderRadius:14,background:"rgba(255,179,71,0.06)",border:"1px solid rgba(255,179,71,0.12)",marginBottom:8}}>
                      <div style={{textAlign:"center",marginBottom:6}}>
                        <div style={{fontSize:13,fontWeight:800,color:"rgba(255,179,71,0.6)",letterSpacing:1}}>🌅 DREAM CATCH</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#EAF6FF",fontFamily:"'Cormorant Garamond',serif"}}>Did you dream?</div>
                        <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>Catch it before it fades</div>
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center"}}>
                        {[{tag:"soft",icon:"☁️"},{tag:"strange",icon:"🌀"},{tag:"scary",icon:"😱"},{tag:"vivid",icon:"✨"},{tag:"romantic",icon:"💕"},{tag:"flying",icon:"🦅"},{tag:"water",icon:"🌊"},{tag:"lost",icon:"🧭"},{tag:"people",icon:"👥"},{tag:"message",icon:"💬"},{tag:"symbol",icon:"🔮"},{tag:"chase",icon:"🏃"}].map(d => {
                          const caught = (checkin.dreamCatch||[]).includes(d.tag);
                          return <div key={d.tag||""} style={{padding:"6px 10px",borderRadius:12,cursor:"pointer",textAlign:"center",
                            background:caught?"rgba(79,203,255,0.2)":"rgba(255,255,255,0.04)",
                            border:caught?"1.5px solid rgba(79,203,255,0.5)":"1px solid rgba(255,255,255,0.08)",
                          }} onClick={() => {
                            const arr = checkin.dreamCatch||[];
                            setCheckin({...checkin, dreamCatch: caught ? arr.filter(t=>t!==d.tag) : [...arr, d.tag]});
                          }}>
                            <div style={{fontSize:14}}>{d.icon}</div>
                            <div style={{fontSize:13,fontWeight:700,color:caught?"#4FCBFF":"rgba(224,216,240,0.4)"}}>{d.tag||""}</div>
                          </div>;
                        })}
                      </div>
                      {(checkin.dreamCatch||[]).length > 0 && (
                        <div style={{marginTop:8,textAlign:"center"}}>
                          <div style={{fontSize:13,color:"#4ecdc4",fontWeight:700}}>✅ Caught {(checkin.dreamCatch||[]).length} fragments</div>
                          <button className="btn-text" style={{fontSize:13,color:"#ffb347",marginTop:2}}
                            onClick={() => { setDream(d=>({...d,tags:d.tags?(d.tags+", "+(checkin.dreamCatch||[]).join(", ")):(checkin.dreamCatch||[]).join(", ")})); startNewDream(); }}>
                            📝 Expand into dream entry →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Moon Score + Morning Card */}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                      <div style={{padding:8,borderRadius:14,background:"rgba(79,203,255,0.08)",border:"1px solid rgba(79,203,255,0.12)",textAlign:"center"}}>
                        <div style={{fontSize:16}}>{moonPhase.emoji}</div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"#EAF6FF"}}>{moonPhase.cycle}%</div>
                        <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>Moon Score</div>
                      </div>
                      <div style={{padding:8,borderRadius:14,background:"rgba(255,179,71,0.08)",border:"1px solid rgba(255,179,71,0.12)",textAlign:"center"}}>
                        <div style={{fontSize:16}}>🌅</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#ffb347"}}>Morning Card</div>
                        <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>
                          {new Date().getHours()<12?"How did you sleep?":"What will you dream?"}
                        </div>
                      </div>
                    </div>

                    <div style={{textAlign:"center",marginTop:8,fontSize:13,color:"rgba(224,216,240,0.2)",fontStyle:"italic"}}>
                      Most sleep apps track your body. DriftLoom tracks your night's emotional rhythm.
                    </div>
                  </div>
                </GlassCard>

                <div className="stat-grid stagger-2">
                  <div className={`stat-card ${editingStat === "mood" ? "stat-editing" : ""}`}
                    onClick={() => setEditingStat(editingStat === "mood" ? null : "mood")}>
                    <div className="stat-icon">🌙</div>
                    <div className="stat-label">Mood</div>
                    <div className="stat-value">{dailyMood}</div>
                    {editingStat !== "mood" && <div className="stat-tap-hint">tap to change</div>}
                    {editingStat === "mood" && (
                      <div className="stat-edit-panel" onClick={e => e.stopPropagation()}>
                        <div className="stat-edit-label">How are you feeling?</div>
                        <div className="stat-mood-grid">
                          {MOODS.map(m => (
                            <button key={m}
                              className={`stat-mood-btn ${dailyMood === m ? "sm-active" : ""}`}
                              onClick={() => { setDailyMood(m); setEditingStat(null); }}>
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`stat-card ${editingStat === "recall" ? "stat-editing" : ""}`}
                    onClick={() => setEditingStat(editingStat === "recall" ? null : "recall")}>
                    <div className="stat-icon">✨</div>
                    <div className="stat-label">Recall</div>
                    <div className="stat-value">{dailyRecall}%</div>
                    {editingStat !== "recall" && <div className="stat-tap-hint">tap to change</div>}
                    {editingStat === "recall" && (
                      <div className="stat-edit-panel" onClick={e => e.stopPropagation()}>
                        <div className="stat-edit-label">How vivid was your recall?</div>
                        <div className="stat-recall-wrap">
                          <div className="stat-recall-num">{dailyRecall}%</div>
                          <div className="stat-recall-bar">
                            <input type="range" min="0" max="100" value={dailyRecall}
                              onChange={e => setDailyRecall(+e.target.value)} />
                          </div>
                        </div>
                        <div className="stat-recall-hint">
                          {dailyRecall < 25 ? "Faint whispers..." : dailyRecall < 50 ? "Hazy fragments" : dailyRecall < 75 ? "Clear scenes" : "Crystal vivid ✨"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`stat-card ${editingStat === "symbol" ? "stat-editing" : ""}`}
                    onClick={() => setEditingStat(editingStat === "symbol" ? null : "symbol")}>
                    <div className="stat-icon">{(SYMBOLS.find(s => s.name === dailySymbol) || {}).e || "☁️"}</div>
                    <div className="stat-label">Symbol</div>
                    <div className="stat-value">{dailySymbol}</div>
                    {editingStat !== "symbol" && <div className="stat-tap-hint">tap to change</div>}
                    {editingStat === "symbol" && (
                      <div className="stat-edit-panel" onClick={e => e.stopPropagation()}>
                        <div className="stat-edit-label">Top symbol tonight</div>
                        <div className="stat-symbol-grid">
                          {SYMBOLS.map(s => (
                            <button key={s.name}
                              className={`stat-symbol-btn ${dailySymbol === s.name ? "ss-active" : ""}`}
                              onClick={() => { setDailySymbol(s.name); setEditingStat(null); }}>
                              <span style={{display:"block",fontSize:18,marginBottom:2}}>{s.e}</span>
                              <span style={{fontSize:13}}>{s.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 🃏 Dream Tarot */}
                <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">🃏 Dream Tarot</p>
                  {(() => {
                    const cards = [
                      {name:"The Moon",symbol:"🌙",msg:"Trust your intuition tonight. Hidden truths surface in dreams.",color:"#4FCBFF"},
                      {name:"The Star",symbol:"⭐",msg:"Hope and healing flow through tonight's dreams.",color:"#6a8cff"},
                      {name:"The Tower",symbol:"🗼",msg:"A dream may shake old beliefs. Let what crumbles reveal what's solid.",color:"#ff6b6b"},
                      {name:"The Hermit",symbol:"🏔",msg:"Solitude in dreams brings clarity. Look inward for answers.",color:"#4ecdc4"},
                      {name:"The Lovers",symbol:"💕",msg:"Connection and choice appear tonight. What does your heart want?",color:"#ff69b4"},
                      {name:"The Fool",symbol:"🌀",msg:"A new journey begins in your dream world. Leap without fear.",color:"#ffb347"},
                      {name:"The Magician",symbol:"✨",msg:"You have the power to shape tonight's dreams. Set a bold intention.",color:"#ffd700"},
                      {name:"The High Priestess",symbol:"🔮",msg:"Mystery deepens. Pay attention to what's hidden between dream scenes.",color:"#9b59b6"},
                      {name:"Wheel of Fortune",symbol:"🎡",msg:"Change is spinning through your dreams. Embrace the new cycle.",color:"#2ecc71"},
                      {name:"The World",symbol:"🌍",msg:"Completion and wholeness. Tonight's dream may bring peace.",color:"#1abc9c"},
                    ];
                    const seed = new Date().getDate() + tarotDraw * 37;
                    const spread = [cards[seed%10], cards[(seed*3+7)%10], cards[(seed*7+3)%10]];
                    const labels = ["Past","Present","Future"];
                    return <>
                      <p className="body" style={{fontSize:13,marginBottom:10}}>Tap each card to reveal your dream reading.</p>
                      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                        {spread.map((card, i) => {
                          const flipped = (tarotFlipped||0) > i;
                          return (
                            <div key={i} style={{perspective:600,width:90}} onClick={() => setTarotFlipped(Math.max(tarotFlipped||0, i+1))}>
                              <div style={{
                                width:90,height:130,borderRadius:14,position:"relative",
                                transition:"transform 0.6s ease",
                                transformStyle:"preserve-3d",
                                transform:flipped?"rotateY(180deg)":"rotateY(0)",
                                cursor:"pointer",
                              }}>
                                {/* Back of card */}
                                <div style={{
                                  position:"absolute",inset:0,borderRadius:14,backfaceVisibility:"hidden",
                                  background:"linear-gradient(135deg,#2d2b55,#07111F)",
                                  border:"2px solid #3d3b75",display:"grid",placeItems:"center",
                                }}>
                                  <div>
                                    <div style={{fontSize:28}}>🃏</div>
                                    <div style={{fontSize:13,color:"rgba(224,216,240,0.4)",fontWeight:700,marginTop:4}}>{labels[i]||""}</div>
                                  </div>
                                </div>
                                {/* Front of card */}
                                <div style={{
                                  position:"absolute",inset:0,borderRadius:14,backfaceVisibility:"hidden",
                                  transform:"rotateY(180deg)",
                                  background:`linear-gradient(135deg, ${card.color}22, ${card.color}08)`,
                                  border:`2px solid ${card.color}55`,display:"grid",placeItems:"center",
                                }}>
                                  <div>
                                    <div style={{fontSize:26}}>{card.symbol||""}</div>
                                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700,color:"var(--navy)",marginTop:4}}>{card.name||""}</div>
                                    <div style={{fontSize:13,color:"var(--gold)",fontWeight:700,marginTop:2}}>{labels[i]||""}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {(tarotFlipped||0) > 0 && (
                        <div style={{marginTop:12,textAlign:"left"}}>
                          {spread.slice(0, tarotFlipped||0).map((card, i) => (
                            <div key={i} style={{padding:8,borderRadius:12,background:`${card.color}08`,border:`1px solid ${card.color}22`,marginBottom:6}}>
                              <div style={{fontSize:13,fontWeight:700,color:card.color}}>{labels[i]||""}: {card.name||""} {card.symbol||""}</div>
                              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.5}}>{card.msg||""}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {(tarotFlipped||0) >= 3 && (
                        <button className="btn-text" style={{marginTop:8,fontSize:13,color:"var(--lav)"}}
                          onClick={() => { setTarotFlipped(0); setTarotDraw(d => d + 1); }}>🔄 Shuffle & Draw Again</button>
                      )}
                    </>;
                  })()}
                </GlassCard>

                {/* 🛌 Bedtime Story + 🧘 Affirmation */}
                
                  ) : null;
                })()}

                {/* Search + Dream Entries */}
                <input className="form-input" placeholder="🔍 Search your dreams..."
                  value={dreamSearch||""} onChange={e => setDreamSearch(e.target.value)}
                  style={{marginBottom:10,fontSize:13}} />

                {dreams.length > 0 && <>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--navy)"}}>Your Dreams</div>
                    <div style={{fontSize:13,color:"var(--muted)",fontWeight:700}}>{dreams.length} entries</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {dreams.filter(d => {
                      if (!dreamSearch) return true;
                      const q = (dreamSearch||"").toLowerCase();
                      return (d.title||"").toLowerCase().includes(q) || (d.notes||"").toLowerCase().includes(q) || (d.mood||"").toLowerCase().includes(q) || (d.tags||"").toLowerCase().includes(q);
                    }).map((d, i) => {
                      const dTags = (d.tags||"").split(",").map(t=>t.trim()).filter(Boolean);
                      return (
                        <div key={i} onClick={() => editDream(i)} style={{
                          background:"var(--glass)",padding:"14px 16px",borderRadius:18,cursor:"pointer",
                          border:"0.5px solid rgba(79,203,255,0.1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
                        }}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--navy)",lineHeight:1.3}}>{d.title || "Untitled Dream"}</div>
                            <div style={{fontSize:13,color:"var(--muted)",whiteSpace:"nowrap",paddingTop:2}}>{d.date||""}</div>
                          </div>
                          <div style={{fontSize:13,color:"var(--deep)",lineHeight:1.6,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{d.notes||""}</div>
                          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                            <span style={{fontSize:13,fontWeight:700,padding:"3px 10px",borderRadius:99,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",color:"var(--deep)"}}>🌙 {d.mood}</span>
                            <span style={{fontSize:13,fontWeight:700,color:"var(--muted)"}}>✨ {d.vivid}%</span>
                            {dTags.slice(0,2).map((t,j) => <span key={j} style={{fontSize:13,padding:"2px 8px",borderRadius:99,background:"rgba(79,203,255,0.06)",color:"var(--lav)",fontWeight:700}}>{t}</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>}

                {dreams.length === 0 && (
                  <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                    <div style={{fontSize:36,marginBottom:8}}>🌙</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"var(--navy)",marginBottom:4}}>Your dream journal awaits ✨</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>Every great journey begins with a single dream</div>
                  </GlassCard>
                )}

              </>}

              {/* ─── JOURNAL ─── */}
              {screen === "journal" && <>
                {/* Back button */}
                <button className="btn-text" style={{marginBottom:8,fontSize:13,color:"var(--muted)"}}
                  onClick={() => { if (recording) stopRecording(); navigate("home"); }}>
                  ← Back
                </button>

                {/* 📊 Dream Completeness */}
                {(() => {
                  const fields = [dream.title,dream.notes,dream.mood,dream.tags,dream.genre,dream.wakeFeel,dream.dreamWeather,(dream.dreamSounds||[]).length>0?"y":"",dream.characterNames,dream.realityBreaks,dream.preSleepThought,dream.category].filter(Boolean).length;
                  const pct = Math.round((fields/12)*100);
                  const color = pct>=90?"#4ecdc4":pct>=60?"#4FCBFF":pct>=30?"#ffb347":"var(--line)";
                  const badge = pct>=90?"🏆 Dream Master":pct>=70?"⭐ Detailed Dream":pct>=40?"📝 Dreamer":pct>0?"🌱 Beginning":"";
                  return (
                    <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:16,background:"var(--glass2)",border:"1px solid var(--line)",marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:`conic-gradient(${color} 0deg, ${color} ${pct*3.6}deg, var(--line) ${pct*3.6}deg 360deg)`,display:"grid",placeItems:"center",flexShrink:0}}>
                        <div style={{width:34,height:34,borderRadius:"50%",background:"var(--bg1)",display:"grid",placeItems:"center",fontSize:13,fontWeight:800,color}}>{pct}%</div>
                      </div>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>{badge || "Start writing your dream"}</div>
                        <div style={{fontSize:13,color:"var(--muted)"}}>{fields}/12 fields filled · {12-fields>0?`${12-fields} more for a richer entry`:"Complete! ✨"}</div>
                      </div>
                    </div>
                  );
                })()}

                <GlassCard className="stagger-1" style={{position:"relative"}}>
                  {showSaveAnim && (
                    <div className="save-overlay">
                      <div className="save-sparkle">✨</div>
                      <div className="save-text">Dream Captured ✨</div>
                      <div className="save-sub-text">saved to your journal</div>
                    </div>
                  )}

                  <div className="journal-header-art">
                    <span className="journal-quill">{recording ? "🎙" : pendingRecord ? "🎙" : "🪶"}</span>
                    <div className="journal-prompt">
                      {recording ? "Listening..." : pendingRecord ? "Ready to listen..." : editIdx !== null ? "Revisit this dream..." : "Close your eyes and remember..."}
                    </div>
                    <div className="journal-sub">
                      {recording ? "Speak your dream aloud — it will appear below" : pendingRecord ? "Tap the button below to start recording" : editIdx !== null ? "Edit the details below" : "Write it down or record your voice"}
                    </div>
                  </div>

                  {recording && (
                    <div className="rec-bar">
                      <div className="rec-dot" />
                      <div className="rec-text">🔴 Recording{".".repeat(recDots)}</div>
                      <button className="rec-stop-btn" onClick={stopRecording}>Stop</button>
                    </div>
                  )}

                  {pendingRecord && !recording && (
                    <div style={{textAlign:"center", padding:"12px 0 6px"}}>
                      <button
                        className="rec-btn-journal"
                        style={{
                          padding:"18px 20px", fontSize:15,
                          background:"linear-gradient(135deg, rgba(220,60,60,0.06), rgba(220,60,60,0.02))",
                          borderColor:"rgba(220,60,60,0.25)", color:"#c44",
                          animation:"recPulse 2s ease-in-out infinite",
                        }}
                        onClick={() => { setPendingRecord(false); startRecording(); }}>
                        🎙 Tap here to begin recording
                      </button>
                      <div style={{fontSize:13, color:"var(--muted)", marginTop:6}}>
                        Your browser will ask for microphone permission
                      </div>
                    </div>
                  )}

                  <div className="form-section">
                    <div className="form-section-label">Dream title</div>
                    <input className="form-input" value={dream.title}
                      placeholder="Give your dream a name..."
                      style={{color:inkColor, fontFamily:journalFont, background: journalBg === "transparent" ? undefined : journalBg}}
                      onChange={e => setDream({...dream, title:e.target.value})} />
                    {dream.notes && dream.notes.length > 20 && !dream.title && (
                      <button className="btn-text" style={{marginTop:4,fontSize:13,color:"var(--lav)"}}
                        onClick={async () => {
                          if (!hasAccess) { setShowPaywall(true); return; }
                          try {
                            const res = await fetch("https://api.anthropic.com/v1/messages", {
                              method:"POST",headers:{"Content-Type":"application/json"},
                              body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:30,
                                messages:[{role:"user",content:`Create ONE short poetic dream title (3-5 words, no quotes) for: "${dream.notes.slice(0,200)}"`}]})
                            });
                            const data = await res.json();
                            const title = (data.content?.[0]?.text||"").replace(/"/g,"").trim();
                            if (title) setDream(d=>({...d, title}));
                          } catch(e) {}
                        }}>📝 Auto-generate title</button>
                    )}
                  </div>

                  <div className="form-section">
                    <div className="form-section-label">What happened?</div>
                    {!dream.notes && !recording && (
                      <div style={{padding:10,borderRadius:12,background:"linear-gradient(135deg,rgba(79,203,255,0.05),rgba(255,179,71,0.03))",border:"1px solid var(--line)",marginBottom:8}}>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--gold)",marginBottom:4}}>💡 Need a prompt? Try starting with:</div>
                        <div style={{fontSize:13,color:"var(--deep)",fontStyle:"italic",lineHeight:1.5}}>
                          {["\"I was standing in a place that felt like... and then...\"","\"The strangest part was when... I felt...\"","\"There was someone there who... and the atmosphere was...\"","\"I remember a color/sound/feeling that stood out...\"","\"It started with... and then suddenly...\"","\"The dream shifted and I found myself...\"","\"I kept trying to... but couldn't because...\""][new Date().getMinutes() % 7]}
                        </div>
                      </div>
                    )}
                    <button
                      className={`rec-btn-journal ${recording ? "rec-active" : ""}`}
                      onClick={recording ? stopRecording : startRecording}>
                      {recording ? <>⏹ Stop Recording</> : <>🎙 Tap to Record Voice</>}
                    </button>
                    <textarea className="form-textarea" value={dream.notes}
                      placeholder={recording ? "Speak now — your words will appear here..." : "I was floating through... there was a door... I felt..."}
                      style={{minHeight:140, color: journalBg === "#07111F" ? "#EAF6FF" : inkColor, fontFamily:journalFont, background: journalBg === "transparent" ? undefined : journalBg, transition:"border-color 0.3s", borderColor: recording ? "rgba(220,60,60,0.3)" : undefined}}
                      onChange={e => { setDream({...dream, notes:e.target.value}); notesRef.current = e.target.value; }} />
                  </div>

                  <div className="form-section">
                    <div className="form-section-label">How did it feel?</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {MOODS.map(m => (
                        <div key={m}
                          onClick={() => setDream({...dream, mood:m})}
                          style={{
                            padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
                            fontSize:13,fontWeight:700,
                            background:dream.mood===m?"rgba(79,203,255,0.12)":"transparent",
                            border:dream.mood===m?"2px solid var(--lav)":"1px solid var(--line)",
                            color:dream.mood===m?"var(--lav)":"var(--navy)",
                          }}>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-label">How vivid was it?</div>
                    <div className="vivid-display">
                      <div>
                        <div className="vivid-value">{dream.vivid}%</div>
                        <div className="vivid-label">vivid</div>
                      </div>
                      <div style={{flex:1}}>
                        <input type="range" min="0" max="100" value={dream.vivid}
                          onChange={e => setDream({...dream, vivid:+e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-label">Symbols & tags</div>

                    {(() => {
                      const currentTags = dream.tags.split(",").map(t=>t.trim()).filter(Boolean);
                      const toggleSymbol = (name) => {
                        if (currentTags.includes(name)) {
                          setDream({...dream, tags: currentTags.filter(t => t !== name).join(", ")});
                        } else {
                          setDream({...dream, tags: [...currentTags, name].join(", ")});
                        }
                      };
                      const removeTag = (name) => {
                        setDream({...dream, tags: currentTags.filter(t => t !== name).join(", ")});
                      };
                      return <>
                        {currentTags.length > 0 && (
                          <div className="journal-tags-current">
                            {currentTags.map((t,i) => {
                              const sym = SYMBOLS.find(s => s.name === t);
                              return (
                                <span key={i} className="journal-tag-chip">
                                  {sym && <span>{sym.e}</span>}
                                  {t}
                                  <span className="jtc-x" onClick={(e) => { e.stopPropagation(); removeTag(t); }}>×</span>
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <input className="form-input" value={dream.tags}
                          placeholder="Type custom tags or tap symbols below..."
                          style={{marginBottom:10, fontSize:13}}
                          onChange={e => setDream({...dream, tags:e.target.value})} />

                        <div className="journal-symbol-scroll">
                          <div className="journal-symbol-grid">
                            {SYMBOLS.map(s => (
                              <button key={s.name}
                                className={`journal-sym-btn ${currentTags.includes(s.name) ? "jsb-active" : ""}`}
                                onClick={() => toggleSymbol(s.name)}>
                                <span className="jsb-emoji">{s.e}</span>
                                <span className="jsb-name">{s.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>;
                    })()}
                  </div>

                    {/* 🎭 MOOD & FEELING GROUP */}
                    <div className="journal-group">
                      <div className="journal-group-head" onClick={() => setJournalSections(s => ({...s, mood:!s.mood}))}>
                        <div className="journal-group-title">🎭 Mood & Feeling {dream.genre || dream.wakeFeel ? <span className="journal-group-badge">{[dream.genre,dream.wakeFeel].filter(Boolean).length} set</span> : null}</div>
                        <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.mood ? "−" : "+"}</span>
                      </div>
                      {journalSections.mood && <div className="journal-group-body">
                        <div className="form-section-label">Dream genre</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,padding:"4px 0"}}>
                          {[["🎬","Thriller"],["💕","Romance"],["🚀","Sci-Fi"],["🧙","Fantasy"],["😂","Comedy"],["👻","Horror"],["🔍","Mystery"],["⚔️","Adventure"],["🎭","Drama"],["🌀","Surreal"]].map(([icon,name]) => (
                            <div key={name} style={{
                              textAlign:"center",padding:"10px 4px",borderRadius:14,cursor:"pointer",
                              background:dream.genre===name?"linear-gradient(135deg,rgba(79,203,255,0.15),rgba(79,203,255,0.05))":"var(--glass2)",
                              border:dream.genre===name?"1.5px solid var(--lav)":"0.5px solid rgba(79,203,255,0.1)",
                              backdropFilter:"blur(10px)",
                            }} onClick={() => setDream({...dream, genre:dream.genre===name?"":name})}>
                              <div style={{fontSize:18}}>{icon}</div>
                              <div style={{fontSize:13,fontWeight:700,color:dream.genre===name?"var(--lav)":"var(--muted)",marginTop:2}}>{name}</div>
                            </div>
                          ))}
                        </div>
                        <div className="form-section-label">How did you feel waking up?</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,padding:"4px 0"}}>
                          {[["😊","Refreshed"],["😌","Peaceful"],["🤔","Confused"],["😰","Unsettled"],["😢","Emotional"],["⚡","Energized"],["😴","Groggy"],["🤩","Inspired"]].map(([icon,name]) => (
                            <div key={name} style={{
                              textAlign:"center",padding:"10px 4px",borderRadius:14,cursor:"pointer",
                              background:dream.wakeFeel===name?"linear-gradient(135deg,rgba(79,203,255,0.15),rgba(79,203,255,0.05))":"var(--glass2)",
                              border:dream.wakeFeel===name?"1.5px solid var(--lav)":"0.5px solid rgba(79,203,255,0.1)",
                              backdropFilter:"blur(10px)",
                            }} onClick={() => setDream({...dream, wakeFeel:dream.wakeFeel===name?"":name})}>
                              <div style={{fontSize:18}}>{icon}</div>
                              <div style={{fontSize:13,fontWeight:700,color:dream.wakeFeel===name?"var(--lav)":"var(--muted)",marginTop:2}}>{name}</div>
                            </div>
                          ))}
                        </div>
                        <div className="form-section-label">Emotional intensity</div>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{fontSize:13,color:"var(--muted)"}}>Mild</span>
                          <input type="range" min="0" max="100" value={dream.intensity||50}
                            style={{flex:1}} onChange={e => setDream({...dream, intensity:parseInt(e.target.value)})} />
                          <span style={{fontSize:13,color:"var(--muted)"}}>Extreme</span>
                          <span style={{fontSize:14,fontWeight:800,color:dream.intensity>75?"#ff6b6b":dream.intensity>40?"var(--gold)":"var(--muted)",fontFamily:"'Cormorant Garamond',serif"}}>{dream.intensity||50}%</span>
                        </div>
                        <div className="form-section-label">Your role in the dream</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,padding:"4px 0"}}>
                          {[["🧑","Myself"],["🎭","Someone else"],["👁","Observer"],["🌀","Shifting"],["👻","Invisible"]].map(([icon,name]) => (
                            <div key={name} style={{
                              textAlign:"center",padding:"10px 4px",borderRadius:14,cursor:"pointer",
                              background:dream.dreamRole===name?"linear-gradient(135deg,rgba(79,203,255,0.15),rgba(79,203,255,0.05))":"var(--glass2)",
                              border:dream.dreamRole===name?"1.5px solid var(--lav)":"0.5px solid rgba(79,203,255,0.1)",
                              backdropFilter:"blur(10px)",
                            }} onClick={() => setDream({...dream, dreamRole:dream.dreamRole===name?"":name})}>
                              <div style={{fontSize:18}}>{icon}</div>
                              <div style={{fontSize:13,fontWeight:700,color:dream.dreamRole===name?"var(--lav)":"var(--muted)",marginTop:2}}>{name}</div>
                            </div>
                          ))}
                        </div>
                      </div>}
                    </div>

                    {/* 🌍 DREAM WORLD GROUP */}
                    <div className="journal-group">
                      <div className="journal-group-head" onClick={() => setJournalSections(s => ({...s, world:!s.world}))}>
                        <div className="journal-group-title">🌍 Dream World {dream.dreamWeather || (dream.dreamSounds||[]).length ? <span className="journal-group-badge">{[dream.dreamWeather,...(dream.dreamSounds||[])].filter(Boolean).length} set</span> : null}</div>
                        <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.world ? "−" : "+"}</span>
                      </div>
                      {journalSections.world && <div className="journal-group-body">
                        <div className="form-section-label">How long did it feel?</div>
                        <div className="pill-scroll">
                          {[{v:"seconds",l:"⚡ Seconds"},{v:"minutes",l:"⏱ Minutes"},{v:"hours",l:"🕐 Hours"},{v:"days",l:"📅 Days"},{v:"timeless",l:"♾ Timeless"}].map(t => (
                            <div key={t.v} className={`cat-pill ${dream.dreamDuration===t.v?"cat-active":""}`} onClick={() => setDream({...dream, dreamDuration:t.v})}>{t.l}</div>
                          ))}
                        </div>
                        <div className="form-section-label">Weather in dream</div>
                        <div className="pill-scroll">
                          {["☀️ Sunny","🌧 Rainy","⛈ Stormy","🌫 Foggy","❄️ Snowy","🌙 Night","🌅 Golden","🌑 Dark"].map(w => {
                            const name = w.split(" ").slice(1).join(" ");
                            return <div key={w} className={`cat-pill ${dream.dreamWeather===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamWeather:dream.dreamWeather===name?"":name})}>{w}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Sounds you heard</div>
                        <div className="pill-scroll">
                          {["🎵 Music","🗣 Voices","🤫 Silence","💧 Water","🌬 Wind","⛈ Thunder","🐾 Animals","🔔 Bells"].map(snd => {
                            const name = snd.split(" ").slice(1).join(" ");
                            const active = (dream.dreamSounds||[]).includes(name);
                            return <div key={snd} className={`cat-pill ${active?"cat-active":""}`} onClick={() => {
                              const sounds = dream.dreamSounds||[];
                              setDream({...dream, dreamSounds: active ? sounds.filter(s=>s!==name) : [...sounds, name]});
                            }}>{snd}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream texture / visual quality</div>
                        <div className="pill-scroll">
                          {["📺 HD Sharp","🌊 Blurry","🎨 Watercolor","✏️ Sketchy","📷 Cinematic","🌀 Distorted","✨ Glowing"].map(t => {
                            const name = t.split(" ").slice(1).join(" ");
                            return <div key={t} className={`cat-pill ${dream.dreamTexture===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamTexture:dream.dreamTexture===name?"":name})}>{t}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream gravity</div>
                        <div className="pill-scroll">
                          {["⬇️ Normal","🪶 Floaty","🏋️ Heavy","🚀 Zero-G","🌀 Shifting"].map(g => {
                            const name = g.split(" ").slice(1).join(" ");
                            return <div key={g} className={`cat-pill ${dream.dreamGravity===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamGravity:dream.dreamGravity===name?"":name})}>{g}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream temperature</div>
                        <div className="pill-scroll">
                          {["🔥 Hot","☀️ Warm","😐 Neutral","❄️ Cold","🥶 Freezing","🌡 Shifting"].map(t => {
                            const name = t.split(" ").slice(1).join(" ");
                            return <div key={t} className={`cat-pill ${dream.dreamTemp===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamTemp:dream.dreamTemp===name?"":name})}>{t}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream location</div>
                        <div className="pill-scroll">
                          {["🏠 Indoor","🌳 Outdoor","🕳 Underground","🌊 Underwater","🚀 Space","🏙 City","🌾 Nature","🏰 Fantastical"].map(l => {
                            const name = l.split(" ").slice(1).join(" ");
                            return <div key={l} className={`cat-pill ${dream.dreamLocation===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamLocation:dream.dreamLocation===name?"":name})}>{l}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream scent</div>
                        <div className="pill-scroll">
                          {["🌸 Flowers","🔥 Smoke","🌊 Ocean","🍳 Food","🌲 Forest","🧪 Chemical","👃 None"].map(sc => {
                            const name = sc.split(" ").slice(1).join(" ");
                            return <div key={sc} className={`cat-pill ${dream.dreamScent===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamScent:dream.dreamScent===name?"":name})}>{sc}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Lighting</div>
                        <div className="pill-scroll">
                          {["☀️ Bright","🕯 Dim","💜 Neon","⬛ Pitch black","🌊 Underwater","✨ Shifting","🌅 Golden"].map(lt => {
                            const name = lt.split(" ").slice(1).join(" ");
                            return <div key={lt} className={`cat-pill ${dream.dreamLighting===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamLighting:dream.dreamLighting===name?"":name})}>{lt}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Scene transitions</div>
                        <div className="pill-scroll">
                          {["✂️ Hard cut","🌫 Dissolve","🌀 Morphed","🚪 Door","⚡ Teleport","😴 Woke in dream"].map(st => {
                            const name = st.split(" ").slice(1).join(" ");
                            return <div key={st} className={`cat-pill ${dream.sceneTransition===name?"cat-active":""}`} onClick={() => setDream({...dream, sceneTransition:dream.sceneTransition===name?"":name})}>{st}</div>;
                          })}
                        </div>
                      </div>}
                    </div>

                    {/* 👥 CHARACTERS & EVENTS GROUP */}
                    <div className="journal-group">
                      <div className="journal-group-head" onClick={() => setJournalSections(s => ({...s, chars:!s.chars}))}>
                        <div className="journal-group-title">👥 Characters & Events {dream.characterNames || dream.realityBreaks ? <span className="journal-group-badge">filled</span> : null}</div>
                        <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.chars ? "−" : "+"}</span>
                      </div>
                      {journalSections.chars && <div className="journal-group-body">
                        <div className="form-section-label">Characters in dream</div>
                        <input className="form-input" value={dream.characterNames||""} placeholder="Mom, a stranger in red, my dog..."
                          style={{fontSize:13}} onChange={e => setDream({...dream, characterNames:e.target.value})} />
                        <div className="form-section-label">Impossible things that happened</div>
                        <input className="form-input" value={dream.realityBreaks||""} placeholder="I could fly, walls were melting..."
                          style={{fontSize:13}} onChange={e => setDream({...dream, realityBreaks:e.target.value})} />
                        <div className="form-section-label">Dream dialogue — something said</div>
                        <input className="form-input" value={dream.dreamDialogue||""} placeholder="Someone said: 'You need to find the key...'"
                          style={{fontSize:13,fontStyle:"italic"}} onChange={e => setDream({...dream, dreamDialogue:e.target.value})} />
                        <div className="form-section-label">Characters' mood toward you</div>
                        <div className="pill-scroll">
                          {["💕 Loving","🤝 Helpful","😐 Indifferent","🔮 Mysterious","😠 Hostile","👻 Threatening","🙈 Ignoring"].map(cm => {
                            const name = cm.split(" ").slice(1).join(" ");
                            return <div key={cm} className={`cat-pill ${dream.charMood===name?"cat-active":""}`} onClick={() => setDream({...dream, charMood:dream.charMood===name?"":name})}>{cm}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Eye contact moment?</div>
                        <div className="pill-scroll">
                          {["👁 Yes — powerful","👀 Yes — unsettling","🫣 Avoided","🚫 None","✨ Transformative"].map(ec => {
                            const name = ec.split(" ").slice(1).join(" ");
                            return <div key={ec} className={`cat-pill ${dream.eyeContact===name?"cat-active":""}`} onClick={() => setDream({...dream, eyeContact:dream.eyeContact===name?"":name})}>{ec}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Numbers or text seen?</div>
                        <input className="form-input" value={dream.dreamText||""} placeholder="e.g. saw the number 7, a sign that said EXIT..."
                          style={{fontSize:13}} onChange={e => setDream({...dream, dreamText:e.target.value})} />
                        <div className="form-section-label">What woke you up?</div>
                        <div className="pill-scroll">
                          {["⏰ Alarm","🔊 Noise","😱 Shock","💡 Naturally","🫁 Jolt","❓ Unknown"].map(w => {
                            const name = w.split(" ").slice(1).join(" ");
                            return <div key={w} className={`cat-pill ${dream.wakeTrigger===name?"cat-active":""}`} onClick={() => setDream({...dream, wakeTrigger:dream.wakeTrigger===name?"":name})}>{w}</div>;
                          })}
                        </div>
                        <div className="form-section-label">How did time flow?</div>
                        <div className="pill-scroll">
                          {["➡️ Forward","⬅️ Backward","⏩ Fast","🐌 Slow","🔀 Jumping","⏸ Frozen"].map(tf => {
                            const name = tf.split(" ").slice(1).join(" ");
                            return <div key={tf} className={`cat-pill ${dream.timeFlow===name?"cat-active":""}`} onClick={() => setDream({...dream, timeFlow:dream.timeFlow===name?"":name})}>{tf}</div>;
                          })}
                        </div>
                        <div className="form-section-label">How did the dream end?</div>
                        <div className="pill-scroll">
                          {["🌫 Faded out","⚡ Sudden cut","✅ Resolved","📺 Cliffhanger","🔄 Looped","🌅 Woke gently"].map(e => {
                            const name = e.split(" ").slice(1).join(" ");
                            return <div key={e} className={`cat-pill ${dream.dreamEnding===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamEnding:dream.dreamEnding===name?"":name})}>{e}</div>;
                          })}
                        </div>
                      </div>}
                    </div>

                    {/* 🪄 POWERS & BODY GROUP */}
                    <div className="journal-group">
                      <div className="journal-group-head" onClick={() => setJournalSections(s => ({...s, powers:!s.powers}))}>
                        <div className="journal-group-title">🪄 Powers & Body {dream.superpower || dream.movement ? <span className="journal-group-badge">filled</span> : null}</div>
                        <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.powers ? "−" : "+"}</span>
                      </div>
                      {journalSections.powers && <div className="journal-group-body">
                        <div className="form-section-label">Superpowers you had</div>
                        <div className="pill-scroll">
                          {["🦅 Flying","🧲 Telekinesis","🧠 Telepathy","👻 Invisibility","⏰ Time control","💪 Super strength","🌊 Water breathing","🔥 Fire control","🌀 Portal creation","🚫 None"].map(sp => {
                            const name = sp.split(" ").slice(1).join(" ");
                            return <div key={sp} className={`cat-pill ${dream.superpower===name?"cat-active":""}`} onClick={() => setDream({...dream, superpower:dream.superpower===name?"":name})}>{sp}</div>;
                          })}
                        </div>
                        <div className="form-section-label">How you moved</div>
                        <div className="pill-scroll">
                          {["🚶 Walking","🏃 Running","🦅 Flying","🏊 Swimming","🚗 Driving","🫧 Floating","⚡ Teleporting","🧊 Paralyzed"].map(mv => {
                            const name = mv.split(" ").slice(1).join(" ");
                            return <div key={mv} className={`cat-pill ${dream.movement===name?"cat-active":""}`} onClick={() => setDream({...dream, movement:dream.movement===name?"":name})}>{mv}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Physical sensations</div>
                        <div className="pill-scroll">
                          {["🎢 Falling","✨ Tingling","😣 Pain","☀️ Warmth","🧊 Paralysis","🪶 Weightless","📳 Vibrating","🚫 None"].map(ps => {
                            const name = ps.split(" ").slice(1).join(" ");
                            return <div key={ps} className={`cat-pill ${dream.sensation===name?"cat-active":""}`} onClick={() => setDream({...dream, sensation:dream.sensation===name?"":name})}>{ps}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Dream mission — what were you trying to do?</div>
                        <div className="pill-scroll">
                          {["🏃 Escape","🔍 Find","🛡 Protect","🧭 Explore","🧩 Solve","🎨 Create","🙈 Hide","🚫 None"].map(dm => {
                            const name = dm.split(" ").slice(1).join(" ");
                            return <div key={dm} className={`cat-pill ${dream.dreamMission===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamMission:dream.dreamMission===name?"":name})}>{dm}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Background soundtrack</div>
                        <div className="pill-scroll">
                          {["🎻 Epic","👻 Eerie","🌿 Peaceful","🎸 Pop/Rock","🎹 Classical","🤫 Silence","🔊 Abstract"].map(bs => {
                            const name = bs.split(" ").slice(1).join(" ");
                            return <div key={bs} className={`cat-pill ${dream.dreamSoundtrack===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamSoundtrack:dream.dreamSoundtrack===name?"":name})}>{bs}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Technology present?</div>
                        <div className="pill-scroll">
                          {["📱 Phones","💻 Screens","🚗 Vehicles","🤖 AI/Robots","🚫 Tech-free","⚙️ Futuristic"].map(tc => {
                            const name = tc.split(" ").slice(1).join(" ");
                            return <div key={tc} className={`cat-pill ${dream.dreamTech===name?"cat-active":""}`} onClick={() => setDream({...dream, dreamTech:dream.dreamTech===name?"":name})}>{tc}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Clearest moment</div>
                        <div className="pill-scroll">
                          {["🌅 Beginning","🎯 Middle","🌙 End","✨ Throughout","🌫 None clear"].map(cl => {
                            const name = cl.split(" ").slice(1).join(" ");
                            return <div key={cl} className={`cat-pill ${dream.clearestMoment===name?"cat-active":""}`} onClick={() => setDream({...dream, clearestMoment:dream.clearestMoment===name?"":name})}>{cl}</div>;
                          })}
                        </div>
                      </div>}
                    </div>

                    {/* 💭 CONTEXT GROUP */}
                    <div className="journal-group">
                      <div className="journal-group-head" onClick={() => setJournalSections(s => ({...s, context:!s.context}))}>
                        <div className="journal-group-title">💭 Context {dream.preSleepThought || dream.category ? <span className="journal-group-badge">filled</span> : null}</div>
                        <span style={{fontSize:13,color:"var(--muted)"}}>{journalSections.context ? "−" : "+"}</span>
                      </div>
                      {journalSections.context && <div className="journal-group-body">
                        <div className="form-section-label">What were you thinking about before bed?</div>
                        <input className="form-input" value={dream.preSleepThought||""} placeholder="Work stress, a conversation, a movie..."
                          style={{fontSize:13}} onChange={e => setDream({...dream, preSleepThought:e.target.value})} />
                        <div className="form-section-label">Dream category</div>
                        <div className="pill-scroll">
                          {["Vivid","Lucid","Nightmare","Recurring","Flying","Falling","Prophetic","Peaceful","Adventure","Surreal"].map(cat => (
                            <div key={cat} className={`cat-pill ${dream.category===cat?"cat-active":""}`} onClick={() => setDream({...dream, category:dream.category===cat?"":cat})}>{cat}</div>
                          ))}
                        </div>
                        <div className="form-section-label">Dream within a dream?</div>
                        <div className="pill-scroll">
                          {["🚫 No","🌀 Yes — one layer","🌀🌀 Two layers","🌀🌀🌀 Inception"].map(l => {
                            const name = l.split(" ").slice(1).join(" ");
                            return <div key={l} className={`cat-pill ${dream.inception===name?"cat-active":""}`} onClick={() => setDream({...dream, inception:dream.inception===name?"":name})}>{l}</div>;
                          })}
                        </div>
                        <div className="form-section-label">Have you dreamed this before?</div>
                        <div className="pill-scroll">
                          {["🆕 First time","🔮 Déjà vu","🔁 Recurring","🔀 Similar theme"].map(dv => {
                            const name = dv.split(" ").slice(1).join(" ");
                            return <div key={dv} className={`cat-pill ${dream.dejaVu===name?"cat-active":""}`} onClick={() => setDream({...dream, dejaVu:dream.dejaVu===name?"":name})}>{dv}</div>;
                          })}
                        </div>
                      </div>}
                    </div>

                  <button className="btn-primary" style={{width:"100%",marginTop:12,padding:"14px 20px"}} onClick={saveDream}>
                    {editIdx !== null ? "Update Dream" : "Save Dream ✨"}
                  </button>

                  {/* Detail encouragement */}
                  {(() => {
                    const filled = [dream.title,dream.notes,dream.mood,dream.tags,dream.genre,dream.wakeFeel,dream.dreamWeather,(dream.dreamSounds||[]).length>0?"y":"",dream.characterNames,dream.realityBreaks,dream.preSleepThought,dream.category].filter(Boolean).length;
                    const missing = [];
                    if (!dream.genre) missing.push("🎬 genre");
                    if (!dream.wakeFeel) missing.push("💡 wake feeling");
                    if (!dream.dreamWeather) missing.push("🌦 weather");
                    if (!(dream.dreamSounds||[]).length) missing.push("🔊 sounds");
                    if (!dream.characterNames) missing.push("🎭 characters");
                    if (!dream.preSleepThought) missing.push("💭 pre-sleep thought");
                    return filled >= 3 && missing.length > 0 ? (
                      <div style={{marginTop:8,padding:8,borderRadius:12,background:"rgba(79,203,255,0.04)",border:"1px solid var(--line)",fontSize:13,color:"var(--muted)",textAlign:"center"}}>
                        ✨ Add {missing.slice(0,3).join(", ")} for a richer dream entry
                      </div>
                    ) : null;
                  })()}

                  <button className="btn-secondary" style={{width:"100%",marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
                    onClick={() => shareDream(dream)}>
                    ↗ Share this dream
                  </button>

                  {/* AI Dream Interpreter */}
                  <button className="btn-secondary" style={{width:"100%",marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
                    onClick={async () => {
                      if (!hasAccess) { setShowPaywall(true); return; }
                      if (!dream.notes || dream.notes.length < 10) { setAiResult("Write your dream first to get an interpretation."); return; }
                      setAiLoading(true); setAiResult("");
                      try {
                        const res = await fetch("https://api.anthropic.com/v1/messages", {
                          method:"POST",headers:{"Content-Type":"application/json"},
                          body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
                            messages:[{role:"user",content:`You are a gentle dream reader for DriftLoom. Give a personal, intimate reading of THIS specific dream. What is the dreamer's subconscious saying right now? Focus on one key symbol and the emotional core. Speak in second person. 2 short poetic paragraphs.\n\nDream: "${dream.notes}"\nMood: ${dream.mood}\nSymbols: ${dream.tags}\nGenre: ${dream.genre||"unset"}\nIntensity: ${dream.intensity||50}%`}]
                          })
                        });
                        const data = await res.json();
                        setAiResult(data.content?.[0]?.text || "Couldn't interpret — try again.");
                      } catch(e) { setAiResult("Connection error — make sure you're online."); }
                      setAiLoading(false);
                    }}>
                    {aiLoading ? "🔮 Reading your dream..." : "🔮 Read This Dream"}
                  </button>
                  {aiResult && <div className="ai-result">{aiResult}</div>}

                  {/* ✨ Share as Dream Card */}
                  <div style={{marginTop:12,padding:14,borderRadius:16,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.1)",textAlign:"center"}}>
                    <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.4)",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>✨ Dream Card</div>
                    <div style={{padding:16,borderRadius:14,background:"rgba(79,203,255,0.06)",border:"0.5px solid rgba(79,203,255,0.1)"}}>
                      <div style={{fontSize:16}}>{moonPhase.emoji}</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#EAF6FF",marginTop:4}}>{dream.title||"Untitled Dream"}</div>
                      <div style={{fontSize:13,color:"rgba(224,216,240,0.5)",marginTop:4,fontStyle:"italic"}}>"{(dream.notes||"").slice(0,80)}{dream.notes?.length>80?"...":""}"</div>
                      <div style={{fontSize:13,color:"rgba(79,203,255,0.5)",marginTop:6}}>🌙 {dream.mood} · ✨ {dream.vivid}% vivid</div>
                      <div style={{fontSize:13,color:"rgba(224,216,240,0.2)",marginTop:8}}>dreamed with DriftLoom</div>
                    </div>
                  </div>

                  {editIdx !== null && (
                    <div style={{textAlign:"center"}}>
                      <button className="delete-btn" onClick={() => deleteDream(editIdx)}>
                        Remove this dream
                      </button>
                    </div>
                  )}
                </GlassCard>

              </>}

              {/* ─── INSIGHTS ─── */}
              {screen === "insights" && <>
                {/* AI Dream Reflection */}
                <GlassCard className="stagger-1">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>✨ AI Pattern Analysis</p>
                  {dreams.length === 0 ? (
                    <p className="body" style={{fontSize:13,textAlign:"center"}}>Log some dreams to unlock AI-powered analysis.</p>
                  ) : (<>
                    <p className="body" style={{fontSize:13,textAlign:"center",marginBottom:10}}>Tap a lens to analyze your dreams — AI reads your recent dreams and generates insights.</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:10}}>
                      {[
                        {id:"reflect",icon:"✨",label:"Overview",prompt:"Write a 2-3 paragraph warm reflection about dream patterns, what the subconscious is exploring, and one gentle suggestion."},
                        {id:"symbols",icon:"🔮",label:"Symbol Map",prompt:"Analyze the recurring symbols and what each one means psychologically. Be specific about each symbol's significance."},
                        {id:"emotion",icon:"💜",label:"Emotions",prompt:"Map the emotional landscape across these dreams. What emotions dominate? What's the emotional arc? What is the dreamer processing?"},
                        {id:"story",icon:"📖",label:"Narrative Arc",prompt:"Describe how these dreams tell a story together. What narrative is unfolding across the dream sequence? Where might it go next?"},
                        {id:"message",icon:"🧠",label:"Message",prompt:"What is the subconscious trying to tell this dreamer? Be direct and insightful. What one thing should they pay attention to?"},
                        {id:"predict",icon:"🌙",label:"Prediction",prompt:"Based on the patterns in these dreams, predict what the dreamer might dream about tonight. Be creative and specific."},
                      ].map(mode => (
                        <div key={mode.id} style={{
                          padding:10,borderRadius:14,textAlign:"center",cursor:"pointer",
                          background:aiLoading?"var(--glass2)":"linear-gradient(135deg,rgba(79,203,255,0.06),rgba(79,203,255,0.02))",
                          border:"1px solid var(--line)",transition:"all 0.2s",
                        }} onClick={async () => {
                          if (aiLoading) return;
                          if (!hasAccess) { setShowPaywall(true); return; }
                          setAiLoading(true); setAiResult("");
                          try {
                            const recent = dreams.slice(0,5).map(d => `"${d.title}" — mood: ${d.mood}, symbols: ${d.tags}, vivid: ${d.vivid}%, genre: ${d.genre||"?"}, wake: ${d.wakeFeel||"?"}`).join("\n");
                            const res = await fetch("https://api.anthropic.com/v1/messages", {
                              method:"POST",headers:{"Content-Type":"application/json"},
                              body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
                                messages:[{role:"user",content:`You are a poetic, insightful dream analyst for DriftLoom dream journal app. ${mode.prompt}\n\nRecent dreams:\n${recent}`}]})
                            });
                            const data = await res.json();
                            setAiResult(data.content?.[0]?.text || "Couldn't generate — try again.");
                          } catch(e) { setAiResult("Connection error — try again."); }
                          setAiLoading(false);
                        }}>
                          <div style={{fontSize:20}}>{mode.icon}</div>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginTop:3}}>{mode.label}</div>
                        </div>
                      ))}
                    </div>
                    {aiLoading && <div style={{textAlign:"center",padding:12,fontSize:13,color:"var(--lav)"}}>✨ Reading your dream patterns...</div>}
                    {aiResult && <div className="ai-result">{aiResult}</div>}
                  </>)}
                </GlassCard>

                {/* Dream Statistics */}
                <GlassCard className="stagger-1">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>📊 Dream Statistics</p>
                  {(() => {
                    const total = dreams.length;
                    if (total === 0) return <p className="body" style={{fontSize:13,textAlign:"center"}}>Log dreams to see your stats.</p>;
                    const moods = dreams.map(d=>d.mood).filter(Boolean);
                    const moodF = {}; moods.forEach(m=>{moodF[m]=(moodF[m]||0)+1});
                    const topMood = Object.entries(moodF).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";
                    const avgV = Math.round(dreams.reduce((s,d)=>s+(d.vivid||0),0)/total);
                    const allTags = dreams.flatMap(d=>(d.tags||"").split(",").map(t=>t.trim()).filter(Boolean));
                    const tagF = {}; allTags.forEach(t=>{tagF[t]=(tagF[t]||0)+1});
                    const topTag = Object.entries(tagF).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";
                    const catF = {}; dreams.forEach(d=>{if(d.category)catF[d.category]=(catF[d.category]||0)+1});
                    const topCat = Object.entries(catF).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";
                    const weeks = Math.max(1,Math.ceil((Date.now()-new Date(dreams[dreams.length-1]?.date||new Date()).getTime())/604800000));
                    return (
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                        {[{l:"Total",v:total,i:"📝"},{l:"Top Mood",v:topMood,i:"🌙"},{l:"Avg Vivid",v:avgV+"%",i:"💫"},{l:"Top Symbol",v:topTag,i:"🏷"},{l:"Top Category",v:topCat,i:"📂"},{l:"Per Week",v:Math.round(total/weeks),i:"📅"}].map((s,i) => (
                          <div key={i} style={{textAlign:"center",padding:10,borderRadius:16,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",backdropFilter:"blur(10px)"}}>
                            <div style={{fontSize:16}}>{s.i}</div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--navy)"}}>{s.v}</div>
                            <div style={{fontSize:13,fontWeight:700,color:"var(--muted)"}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </GlassCard>

                {/* 🌊 Mood Timeline */}
                <div style={{padding:18,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>🌊 Mood Timeline</div>
                  {dreams.length < 3 ? (
                    <div style={{fontSize:14,color:"var(--muted)",textAlign:"center",padding:16}}>Log 3+ dreams to see your emotional rhythm</div>
                  ) : (
                    <div>
                      <div style={{display:"flex",gap:2,height:60,alignItems:"flex-end",marginBottom:6}}>
                        {dreams.slice(0,14).reverse().map((d,i) => {
                          const s = d.vivid || 50;
                          const mc = {Happy:"#4ecdc4",Calm:"#6a8cff",Peaceful:"#4FCBFF",Anxious:"#ff6b6b"};
                          return (<div key={i} style={{flex:1,height:`${s}%`,borderRadius:4,background:mc[d.mood]||"var(--lav)"}} />);
                        })}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"var(--muted)"}}>
                        <span>Oldest</span><span>Recent →</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 🔮 Pattern Detector */}
                <div style={{padding:18,borderRadius:20,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.15)",marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.5)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>🔮 Pattern Detector</div>
                  {dreams.length < 3 ? (
                    <div style={{fontSize:14,color:"rgba(224,216,240,0.4)",textAlign:"center",padding:16}}>Log 3+ dreams to unlock patterns</div>
                  ) : (() => {
                    const mF = {}, tF = {};
                    dreams.forEach(d => {
                      if (d.mood) mF[d.mood] = (mF[d.mood]||0) + 1;
                      (d.tags||"").split(",").map(t=>t.trim()).filter(Boolean).forEach(t => tF[t]=(tF[t]||0)+1);
                    });
                    const avgV = Math.round(dreams.reduce((s,d) => s+(d.vivid||50), 0) / dreams.length);
                    const patterns = [
                      {icon:"🎭",title:"Emotions",detail:Object.entries(mF).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([m,c])=>`${m} (${c}×)`).join(", ")||"—",color:"#4FCBFF"},
                      {icon:"🏷",title:"Symbols",detail:Object.entries(tF).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([t,c])=>`${t} (${c}×)`).join(", ")||"—",color:"#ffb347"},
                      {icon:"✨",title:"Vividness",detail:`${avgV}% — ${avgV>70?"Exceptionally vivid":avgV>50?"Above average":"Room to grow"}`,color:"#4ecdc4"},
                    ];
                    return (
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {patterns.map((p,i) => (
                          <div key={i} style={{display:"flex",gap:12,padding:12,borderRadius:14,background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.06)"}}>
                            <div style={{fontSize:18}}>{p.icon}</div>
                            <div>
                              <div style={{fontSize:14,fontWeight:700,color:p.color}}>{p.title}</div>
                              <div style={{fontSize:13,color:"rgba(224,216,240,0.5)",lineHeight:1.5}}>{p.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* 📅 Weekly Report */}
                <div style={{padding:18,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>📅 This Week</div>
                  {(() => {
                    const recent = dreams.filter(d => (Date.now() - new Date(d.date).getTime()) < 604800000);
                    if (!recent.length) return (<div style={{fontSize:14,color:"var(--muted)",textAlign:"center"}}>No dreams this week</div>);
                    const avgV = Math.round(recent.reduce((s,d) => s+(d.vivid||50), 0) / recent.length);
                    const topMood = (() => { const f={}; recent.forEach(d=>{if(d.mood)f[d.mood]=(f[d.mood]||0)+1}); return Object.entries(f).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—"; })();
                    return (
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                        {[{l:"Dreams",v:recent.length,i:"📝"},{l:"Vivid",v:avgV+"%",i:"✨"},{l:"Mood",v:topMood,i:"🎭"}].map((s,i) => (
                          <div key={i} style={{textAlign:"center",padding:12,borderRadius:14,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)"}}>
                            <div style={{fontSize:16}}>{s.i}</div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"var(--navy)"}}>{s.v}</div>
                            <div style={{fontSize:13,color:"var(--muted)"}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* 🧬 Dream DNA */}
                <div style={{padding:18,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:10}}>🧬 Your Dream DNA</div>
                  <div style={{fontSize:14,color:"var(--deep)",textAlign:"center",lineHeight:1.7}}>
                    {dreams.length >= 3
                      ? "The patterns above reveal your dreaming mind's language."
                      : "Log 3+ dreams to reveal your Dream DNA."}
                  </div>
                </div>

                                {/* 💜 Daily Affirmation */}
                <div style={{padding:18,borderRadius:20,background:"linear-gradient(135deg,rgba(79,203,255,0.06),rgba(106,92,205,0.03))",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>💜 Daily Affirmation</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"var(--navy)",lineHeight:1.5,fontStyle:"italic"}}>
                    {["Your dreams are letters from your deeper self.","Every dream you remember makes the next one clearer.","Your subconscious is wiser than you know.","Tonight's dreams are already forming.","The patterns reveal who you're becoming.","You are the author of your dream world.","Each dream is a gift — unwrap it with curiosity."][new Date().getDay()]}
                  </div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>New affirmation every day</div>
                </div>

                {/* 🎭 Emotional Landscape */}
                <div style={{padding:18,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>🎭 Emotional Landscape</div>
                  {dreams.length < 2 ? (
                    <div style={{fontSize:14,color:"var(--muted)",textAlign:"center"}}>Log 2+ dreams to map your emotions</div>
                  ) : (() => {
                    const mF = {};
                    dreams.forEach(d => { if (d.mood) mF[d.mood]=(mF[d.mood]||0)+1; });
                    const sorted = Object.entries(mF).sort((a,b)=>b[1]-a[1]).slice(0,5);
                    const max = sorted[0]?.[1]||1;
                    const mc = {Happy:"#4ecdc4",Calm:"#6a8cff",Peaceful:"#4FCBFF",Anxious:"#ff6b6b",Mysterious:"#9b59b6",Vivid:"#ffd700",Dreamy:"#4FCBFF"};
                    return (
                      <div>
                        {sorted.map(([mood,count],i) => (
                          <div key={i} style={{marginBottom:10}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                              <span style={{fontSize:14,fontWeight:700,color:"var(--navy)"}}>{mood}</span>
                              <span style={{fontSize:13,color:"var(--muted)"}}>{count}× · {Math.round(count/dreams.length*100)}%</span>
                            </div>
                            <div style={{height:8,borderRadius:4,background:"var(--line)",overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${(count/max)*100}%`,borderRadius:4,background:mc[mood]||"var(--lav)"}} />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                                {/* ☁️ Subconscious Messages */}
                <div style={{padding:20,borderRadius:22,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.12)",marginBottom:14,overflow:"hidden",position:"relative"}}>
                  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 30%,rgba(79,203,255,0.06),transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(106,138,255,0.04),transparent 40%)"}} />
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.4)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>☁️ Subconscious Messages</div>
                    {dreams.length < 2 ? (
                      <div style={{fontSize:14,color:"rgba(224,216,240,0.4)",textAlign:"center",padding:16}}>Your subconscious is waiting to speak. Log your first dreams.</div>
                    ) : (() => {
                      const allTags = dreams.flatMap(d=>(d.tags||"").split(",").map(t=>t.trim())).filter(Boolean);
                      const topMood = (()=>{const f={};dreams.forEach(d=>{if(d.mood)f[d.mood]=(f[d.mood]||0)+1});return Object.entries(f).sort((a,b)=>b[1]-a[1])[0]?.[0]||"calm"})();
                      const avgV = Math.round(dreams.reduce((s,d)=>s+(d.vivid||50),0)/dreams.length);
                      const messages = [
                        {icon:"🌊",msg:`Your dreams carry a ${topMood.toLowerCase()} undercurrent. This emotion is processing something important in your waking life.`},
                        {icon:"🔮",msg:`${allTags[0]||"Symbols"} keeps appearing — your subconscious is drawing your attention to something you haven't fully acknowledged.`},
                        {icon:"🌙",msg:`At ${avgV}% average vividness, your dream recall is ${avgV>65?"exceptional":"growing"}. ${avgV>65?"Your inner world is vivid and rich.":"Keep journaling — clarity builds with consistency."}`},
                        {icon:"✨",msg:`With ${dreams.length} dreams logged, you're building a map of your inner world. Every entry makes the next insight deeper.`},
                      ];
                      return (
                        <div style={{display:"flex",flexDirection:"column",gap:10}}>
                          {messages.map((m,i) => (
                            <div key={i} style={{display:"flex",gap:12,padding:12,borderRadius:16,background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.05)"}}>
                              <div style={{fontSize:20,flexShrink:0}}>{m.icon}</div>
                              <div style={{fontSize:14,color:"rgba(224,216,240,0.55)",lineHeight:1.6}}>{m.msg}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 🏆 Dream Achievements */}
                <div style={{padding:18,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:12}}>🏆 Dream Achievements</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {[
                      {icon:"🌱",name:"First Dream",req:1,desc:"Logged your first dream"},
                      {icon:"🔥",name:"3-Day Streak",req:3,desc:"Dreamed 3 days in a row"},
                      {icon:"⚡",name:"Vivid Dreamer",req:0,desc:"70%+ vividness",check:dreams.some(d=>d.vivid>=70)},
                      {icon:"🌙",name:"Moon Child",req:5,desc:"5 dreams logged"},
                      {icon:"🦋",name:"Pattern Finder",req:10,desc:"10 dreams logged"},
                      {icon:"👑",name:"Dream Master",req:30,desc:"30 dreams logged"},
                    ].map((a,i) => {
                      const unlocked = a.check !== undefined ? a.check : dreams.length >= a.req;
                      return (
                        <div key={i} style={{textAlign:"center",padding:12,borderRadius:16,
                          background:unlocked?"rgba(79,203,255,0.08)":"var(--glass2)",
                          border:unlocked?"1px solid rgba(79,203,255,0.2)":"0.5px solid rgba(79,203,255,0.05)",
                          opacity:unlocked?1:0.4}}>
                          <div style={{fontSize:24}}>{a.icon}</div>
                          <div style={{fontSize:13,fontWeight:700,color:unlocked?"var(--lav)":"var(--muted)",marginTop:4}}>{a.name}</div>
                          <div style={{fontSize:13,color:"var(--muted)"}}>{a.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 📖 Dream Wisdom */}
                <div style={{padding:20,borderRadius:22,background:"linear-gradient(180deg,rgba(79,203,255,0.04),transparent)",border:"0.5px solid rgba(79,203,255,0.08)",marginBottom:14,textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>📖 Dream Wisdom</div>
                  {[
                    {quote:"Dreams are the royal road to the unconscious.",author:"Sigmund Freud"},
                    {quote:"Who looks outside, dreams. Who looks inside, awakes.",author:"Carl Jung"},
                    {quote:"All that we see or seem is but a dream within a dream.",author:"Edgar Allan Poe"},
                    {quote:"Dreams are illustrations from the book your soul is writing about you.",author:"Marsha Norman"},
                    {quote:"In dreams, we enter a world that is entirely our own.",author:"Albus Dumbledore"},
                    {quote:"The dream is the small hidden door in the deepest and most intimate sanctum of the soul.",author:"Carl Jung"},
                    {quote:"Dreams are today's answers to tomorrow's questions.",author:"Edgar Cayce"},
                  ].map((q,i) => i === new Date().getDate() % 7 ? (
                    <div key={i}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"var(--navy)",lineHeight:1.5,fontStyle:"italic",marginBottom:8}}>"{q.quote}"</div>
                      <div style={{fontSize:14,color:"var(--lav)",fontWeight:700}}>— {q.author}</div>
                    </div>
                  ) : null)}
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>New wisdom every day</div>
                </div>

                                                {/* ♈ Dream Zodiac */}
                <GlassCard className="stagger-2">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>♈ Dream Zodiac</p>
                  <p className="body" style={{fontSize:13,textAlign:"center",marginBottom:10}}>Tap any sign to explore.</p>
                  {(() => {
                    const signs = [
                      {s:"♈",n:"Aries",e:"Mar 21–Apr 19",trait:"Action dreams — chasing, competing, lead...",color:"#ff6b6b"},
                      {s:"♉",n:"Taurus",e:"Apr 20–May 20",trait:"Sensory dreams — gardens, food, textures...",color:"#6bcb77"},
                      {s:"♊",n:"Gemini",e:"May 21–Jun 20",trait:"Communication dreams — conversations, bo...",color:"#ffb347"},
                      {s:"♋",n:"Cancer",e:"Jun 21–Jul 22",trait:"Home dreams — houses, family, water. You...",color:"#6a8cff"},
                      {s:"♌",n:"Leo",e:"Jul 23–Aug 22",trait:"Performance dreams — stages, spotlights,...",color:"#ffd700"},
                      {s:"♍",n:"Virgo",e:"Aug 23–Sep 22",trait:"Detail dreams — organizing, puzzles, hea...",color:"#4ecdc4"},
                      {s:"♎",n:"Libra",e:"Sep 23–Oct 22",trait:"Balance dreams — scales, mirrors, partne...",color:"#ff69b4"},
                      {s:"♏",n:"Scorpio",e:"Oct 23–Nov 21",trait:"Transformation dreams — death, rebirth, ...",color:"#9b59b6"},
                      {s:"♐",n:"Sagittarius",e:"Nov 22–Dec 21",trait:"Journey dreams — travel, flying, expansi...",color:"#e67e22"},
                      {s:"♑",n:"Capricorn",e:"Dec 22–Jan 19",trait:"Achievement dreams — climbing, building,...",color:"#7f8c8d"},
                      {s:"♒",n:"Aquarius",e:"Jan 20–Feb 18",trait:"Visionary dreams — space, technology, gr...",color:"#3498db"},
                      {s:"♓",n:"Pisces",e:"Feb 19–Mar 20",trait:"Oceanic dreams — water, merging, spiritu...",color:"#4FCBFF"},
                    ];
                    const month = new Date().getMonth() + 1;
                    const day = new Date().getDate();
                    let myIdx = 0;
                    if ((month===3&&day>=21)||(month===4&&day<=19)) myIdx=0;
                    else if ((month===4&&day>=20)||(month===5&&day<=20)) myIdx=1;
                    else if ((month===5&&day>=21)||(month===6&&day<=20)) myIdx=2;
                    else if ((month===6&&day>=21)||(month===7&&day<=22)) myIdx=3;
                    else if ((month===7&&day>=23)||(month===8&&day<=22)) myIdx=4;
                    else if ((month===8&&day>=23)||(month===9&&day<=22)) myIdx=5;
                    else if ((month===9&&day>=23)||(month===10&&day<=22)) myIdx=6;
                    else if ((month===10&&day>=23)||(month===11&&day<=21)) myIdx=7;
                    else if ((month===11&&day>=22)||(month===12&&day<=21)) myIdx=8;
                    else if ((month===12&&day>=22)||(month===1&&day<=19)) myIdx=9;
                    else if ((month===1&&day>=20)||(month===2&&day<=18)) myIdx=10;
                    else myIdx=11;
                    return <>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
                        {signs.map((z,i) => (
                          <div key={i} onClick={() => setSelectedZodiac(selectedZodiac===i?null:i)} style={{
                            textAlign:"center",padding:10,borderRadius:16,cursor:"pointer",
                            background:i===myIdx?`linear-gradient(135deg,${z.color}15,${z.color}05)`:selectedZodiac===i?`${z.color}08`:"var(--glass2)",
                            border:i===myIdx?`1.5px solid ${z.color}`:selectedZodiac===i?`1px solid ${z.color}44`:"0.5px solid rgba(79,203,255,0.1)",
                            backdropFilter:"blur(10px)",
                          }}>
                            <div style={{fontSize:24}}>{z.s}</div>
                            <div style={{fontSize:13,fontWeight:700,color:i===myIdx?z.color:"var(--muted)",marginTop:2}}>{z.n}</div>
                            {i===myIdx && <div style={{fontSize:13,color:"var(--gold)",fontWeight:800,marginTop:1}}>YOU</div>}
                          </div>
                        ))}
                      </div>
                                          </>;
                  })()}
                </GlassCard>

                <GlassCard className="stagger-3" style={{padding:16}}>
                  <p className="eyebrow gold" style={{textAlign:"center"}}>The Moon's journey</p>
                  <p className="cycle-intro" style={{margin:"6px 0 14px",padding:0}}>
                    Tap a phase.
                  </p>

                  {(() => {
                    const moonData = [
                      {name:"New Moon", shortName:"New\nMoon", shadow:"radial-gradient(circle at 50% 50%, rgba(15,15,30,0.92) 0%, rgba(15,15,30,0.88) 100%)", desc:"The sky is dark. A blank slate for setting dream intentions.", dream:"Best for: setting dream intentions, planting seeds"},
                      {name:"Waxing Crescent", shortName:"Waxing\nCrescent", shadow:"linear-gradient(to right, rgba(15,15,30,0.9) 0%, rgba(15,15,30,0.85) 60%, rgba(15,15,30,0.15) 78%, transparent 82%)", desc:"Dream recall begins to sharpen. Capture every fragment.", dream:"Best for: building recall, noticing first symbols"},
                      {name:"First Quarter", shortName:"First\nQuarter", shadow:"linear-gradient(to right, rgba(15,15,30,0.88) 0%, rgba(15,15,30,0.8) 42%, rgba(15,15,30,0.1) 54%, transparent 58%)", desc:"Dreams carry choices and crossroads. Problem-solving peaks.", dream:"Best for: problem-solving dreams, facing inner conflicts"},
                      {name:"Waxing Gibbous", shortName:"Waxing\nGibbous", shadow:"linear-gradient(to right, rgba(15,15,30,0.85) 0%, rgba(15,15,30,0.4) 18%, transparent 32%)", desc:"Dreams grow vivid and emotionally rich. Peak vividness approaches.", dream:"Best for: vivid dreaming, emotional processing"},
                      {name:"Full Moon", shortName:"Full\nMoon", shadow:"transparent", desc:"Maximum illumination. The most vivid dreams of the entire cycle.", dream:"Best for: lucid dreaming, peak recall, powerful imagery"},
                      {name:"Waning Gibbous", shortName:"Waning\nGibbous", shadow:"linear-gradient(to left, rgba(15,15,30,0.85) 0%, rgba(15,15,30,0.4) 18%, transparent 32%)", desc:"Integration phase. Review and journal what your dreams revealed.", dream:"Best for: dream journaling, integration, gratitude"},
                      {name:"Last Quarter", shortName:"Last\nQuarter", shadow:"linear-gradient(to left, rgba(15,15,30,0.88) 0%, rgba(15,15,30,0.8) 42%, rgba(15,15,30,0.1) 54%, transparent 58%)", desc:"Release and forgiveness. Old patterns surface to dissolve.", dream:"Best for: release dreams, forgiveness, closure"},
                      {name:"Waning Crescent", shortName:"Waning\nCrescent", shadow:"linear-gradient(to left, rgba(15,15,30,0.9) 0%, rgba(15,15,30,0.85) 60%, rgba(15,15,30,0.15) 78%, transparent 82%)", desc:"Deep rest and quiet dreaming. Surrender to sleep.", dream:"Best for: rest, surrender, subconscious healing"},
                    ];
                    return <>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
                        {moonData.map((moon, i) => (
                          <div key={i}
                            onClick={() => setSelectedMoon(selectedMoon === i ? null : i)}
                            style={{
                              display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                              padding:"12px 4px 10px",borderRadius:16,cursor:"pointer",
                              background:selectedMoon===i?"linear-gradient(135deg,rgba(79,203,255,0.12),rgba(79,203,255,0.04))":i===4?"linear-gradient(135deg,rgba(212,164,76,0.1),rgba(212,164,76,0.03))":"var(--glass2)",
                              border:selectedMoon===i?"1.5px solid var(--lav)":i===4?"1px solid rgba(212,164,76,0.3)":"0.5px solid rgba(79,203,255,0.1)",
                              backdropFilter:"blur(15px)",WebkitBackdropFilter:"blur(15px)",
                              transform:selectedMoon===i?"scale(1.03)":"scale(1)",
                            }}>
                            <div style={{width:36,height:36,borderRadius:"50%",position:"relative",overflow:"hidden",boxShadow:"0 0 10px rgba(212,200,160,0.2)"}}>
                              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle at 35% 30%, #fff8e8, #e8dcc0, #d4c8a4)"}} />
                              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:moon.shadow}} />
                            </div>
                            <div style={{fontSize:13,fontWeight:700,color:selectedMoon===i?"var(--lav)":i===4?"var(--gold)":"var(--muted)",textAlign:"center",lineHeight:1.2}}>{moon.name}</div>
                          </div>
                        ))}
                      </div>

                      {selectedMoon !== null && (
                        <div style={{padding:14,borderRadius:16,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.15)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",animation:"fadeUp 0.3s ease both"}}>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:28,height:28,borderRadius:"50%",position:"relative",overflow:"hidden",boxShadow:"0 0 8px rgba(212,200,160,0.2)",flexShrink:0}}>
                              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle at 35% 30%, #fff8e8, #e8dcc0, #d4c8a4)"}} />
                              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:moonData[selectedMoon].shadow}} />
                            </div>
                            {moonData[selectedMoon].name}
                          </div>
                          <div style={{fontSize:13,color:"var(--deep)",lineHeight:1.6,marginBottom:6}}>{moonData[selectedMoon].desc}</div>
                          <div style={{fontSize:13,fontStyle:"italic",color:"var(--gold)"}}>💡 {moonData[selectedMoon].dream}</div>
                        </div>
                      )}
                    </>;
                  })()}
                </GlassCard>

              </>}

              {/* ─── CYCLES ─── */}
              {screen === "cycles" && <>
                <GlassCard className="stagger-1">
                  <p className="eyebrow gold">Your nightly journey</p>
                  <h2 className="section-title">The Architecture of Sleep</h2>
                  <p className="body">Each night, your mind moves through a graceful rhythm of stages. Tap each one to explore.</p>

                  {(() => {
                    const cycleData = [
                      {label:"Light",icon:"🌊",title:"N1 — Light Drift",sub:"Stage one · NREM",
                        desc:"The gentlest descent into sleep. Brief flashes of faces and landscapes.",
                        tags:["1 – 7 min","Theta waves","~5% of sleep"],
                        color:"#6a8cff"},
                      {label:"Deep",icon:"🌑",title:"N3 — Deep Restoration",sub:"Stage three · Slow-wave",
                        desc:"Your body repairs, strengthens immunity, and consolidates memories.",
                        tags:["20 – 40 min","Delta waves","~25% of sleep"],
                        color:"#0E2B5C"},
                      {label:"REM",icon:"✨",title:"REM — The Dream Theatre",sub:"Rapid eye movement",
                        desc:"Your most vivid dreams unfold here. Your brain lights up like when awake.",
                        tags:["10 – 60 min","Beta-like activity","~25% of sleep"],
                        color:"#4FCBFF"},
                      {label:"Recall",icon:"💫",title:"Morning Recall Window",sub:"The golden moment",
                        desc:"Stay still, replay the dream, then write immediately.",
                        tags:["First 5 min","Stay still","Write immediately"],
                        color:"#d4a44c"},
                    ];
                    return <>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:12}}>
                        {cycleData.map((item, i) => (
                          <div key={item.label}
                            onClick={() => setSelectedCycle(selectedCycle === i ? null : i)}
                            style={{
                              display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                              padding:"14px 6px",borderRadius:18,cursor:"pointer",
                              background:selectedCycle===i?`${item.color}15`:"var(--glass2)",
                              border:selectedCycle===i?`2px solid ${item.color}`:"0.5px solid rgba(79,203,255,0.1)",
                            }}>
                            <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${item.color},${item.color}88)`,display:"grid",placeItems:"center",fontSize:20,boxShadow:`0 4px 12px ${item.color}33`}}>
                              {item.icon}
                            </div>
                            <div style={{fontSize:13,fontWeight:700,color:selectedCycle===i?item.color:"var(--navy)"}}>{item.label}</div>
                          </div>
                        ))}
                      </div>
                      {selectedCycle !== null && (
                        <div style={{marginTop:12,padding:16,borderRadius:18,background:"var(--glass2)",border:`1px solid ${cycleData[selectedCycle].color}33`,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                            <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${cycleData[selectedCycle].color},${cycleData[selectedCycle].color}88)`,display:"grid",placeItems:"center",fontSize:18,color:"white",flexShrink:0}}>
                              {cycleData[selectedCycle].icon}
                            </div>
                            <div>
                              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"var(--navy)"}}>{cycleData[selectedCycle].title}</div>
                              <div style={{fontSize:13,fontWeight:700,color:cycleData[selectedCycle].color,textTransform:"uppercase",letterSpacing:"0.1em"}}>{cycleData[selectedCycle].sub}</div>
                            </div>
                          </div>
                          <div style={{fontSize:14,color:"var(--deep)",lineHeight:1.7,marginBottom:10}}>{cycleData[selectedCycle].desc}</div>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            {cycleData[selectedCycle].tags.map((t,j) => (
                              <span key={j} style={{fontSize:13,fontWeight:700,padding:"4px 12px",borderRadius:99,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",color:"var(--deep)"}}>{t}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>;
                  })()}
                </GlassCard>

                <p className="cycle-intro stagger-2">
                  Each 90-minute cycle brings more REM. Dream-rich periods grow longer toward morning.
                </p>

                <div className="section-label stagger-2">The Stages</div>

                {[
                  {icon:"🌅",name:"Awake & Winding Down",sub:"The threshold",color:"#d4a44c",
                    body:"The threshold between waking and sleeping. Melatonin rises, thoughts loosen. Set a dream intention here.",
                    tags:["5 – 20 min","Alpha → Theta"]},
                  {icon:"🌊",name:"N1 — Light Drift",sub:"Stage one · NREM",color:"#6a8cff",
                    body:"You hover between awareness and sleep. Muscles relax, heartbeat slows. Brief surreal flashes — your first dream fragments.",
                    tags:["1 – 7 min","Theta waves","~5% of sleep"]},
                  {icon:"💫",name:"N2 — The Weaving",sub:"Stage two · NREM",color:"#3a8cdd",
                    body:"Sleep spindles sort memories and lock in learning. Temperature drops, the outside world fades.",
                    tags:["10 – 25 min","Sleep spindles","~45% of sleep"]},
                  {icon:"🌑",name:"N3 — Deep Restoration",sub:"Stage three · Slow-wave",color:"#0E2B5C",
                    body:"Slow delta waves roll through your brain. Your body repairs tissue, strengthens immunity. Profound healing happens here.",
                    tags:["20 – 40 min","Delta waves","~25% of sleep"]},
                  {icon:"✨",name:"REM — The Dream Theatre",sub:"Rapid eye movement",color:"#4FCBFF",
                    body:"Your most vivid dreams unfold here. Eyes dance, brain lights up like when awake. By morning, REM stretches past 45 minutes.",
                    tags:["10 – 60 min","Beta-like activity","~25% of sleep","Best for recall"]},
                ].map((stage, i) => (
                  <div key={i} style={{
                    background:"var(--glass)",padding:20,borderRadius:20,marginBottom:14,
                    border:"0.5px solid rgba(79,203,255,0.1)",position:"relative",overflow:"hidden",
                    backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
                  }}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg, ${stage.color}, ${stage.color}66)`}} />
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg, ${stage.color}, ${stage.color}88)`,display:"grid",placeItems:"center",fontSize:20,flexShrink:0}}>
                        {stage.icon}
                      </div>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:800,color:"var(--navy)",lineHeight:1.15}}>{stage.name}</div>
                        <div style={{fontSize:13,fontWeight:800,color:stage.color,textTransform:"uppercase",letterSpacing:"0.12em",marginTop:2}}>{stage.sub}</div>
                      </div>
                    </div>
                    <div style={{fontSize:13,lineHeight:1.7,color:"var(--deep)",marginBottom:12}}>{stage.body}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {stage.tags.map((t,j) => (
                        <span key={j} style={{fontSize:13,fontWeight:700,padding:"4px 10px",borderRadius:99,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",color:"var(--deep)"}}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="section-label stagger-2">Sleep Science</div>

                {/* 🌙 Your Sleep Tonight — personalized prediction */}
                <div style={{padding:18,borderRadius:20,marginBottom:14,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.15)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,right:0,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,203,255,0.08),transparent)",transform:"translate(30%,-30%)"}} />
                  <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.5)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:6}}>🌙 Your Sleep Tonight</div>
                  <div style={{textAlign:"center",marginBottom:10}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:700,color:"#EAF6FF"}}>{checkin.sleep>=7?"Excellent":checkin.sleep>=5?"Good":checkin.sleep>=3?"Fair":"Needs Care"}</div>
                    <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>Based on your check-in data</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {[
                      {label:"Sleep",val:`${checkin.sleep||5}/10`,icon:"😴",color:checkin.sleep>=7?"#4ecdc4":"#ffb347"},
                      {label:"Stress",val:`${checkin.stress||5}/10`,icon:"😰",color:checkin.stress<=3?"#4ecdc4":"#ff6b6b"},
                      {label:"Energy",val:`${checkin.energy||5}/10`,icon:"⚡",color:checkin.energy>=7?"#4ecdc4":"#ffb347"},
                    ].map((s,i) => (
                      <div key={i} style={{textAlign:"center",padding:8,borderRadius:14,background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.06)"}}>
                        <div style={{fontSize:14}}>{s.icon}</div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
                        <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:10,padding:10,borderRadius:12,background:"rgba(79,203,255,0.06)",border:"0.5px solid rgba(79,203,255,0.1)"}}>
                    <div style={{fontSize:13,color:"rgba(224,216,240,0.5)",lineHeight:1.6,textAlign:"center"}}>
                      {checkin.stress>=7 ? "💡 High stress detected. Try the 4-7-8 breathing technique before bed tonight." 
                       : checkin.sleep<=4 ? "💡 Sleep deficit building. Aim for an extra 30 minutes tonight."
                       : checkin.energy>=8 ? "💡 Great energy! Tonight is perfect for lucid dreaming practice."
                       : "💡 Balanced evening ahead. Set a dream intention and let your mind wander."}
                    </div>
                  </div>
                </div>

                {/* 💤 Did You Know? — rotating sleep facts */}
                <div style={{padding:16,borderRadius:18,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:8}}>💤 Did You Know?</div>
                  {[
                    {icon:"🧠",fact:"Your brain uses MORE energy during REM sleep than when you're awake."},
                    {icon:"⏰",fact:"The ideal bedtime is the same time every night — even weekends. Your brain craves rhythm."},
                    {icon:"🌡",fact:"Dropping your room temperature to 65°F (18°C) increases deep sleep by up to 25%."},
                    {icon:"📱",fact:"Blue light from screens suppresses melatonin for up to 90 minutes after exposure."},
                    
                  ].map((f,i) => (
                    <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<5?"1px solid var(--line)":"none"}}>
                      <span style={{fontSize:16,flexShrink:0}}>{f.icon}</span>
                      <span style={{fontSize:13,color:"var(--deep)",lineHeight:1.6}}>{f.fact}</span>
                    </div>
                  ))}
                </div>

                {/* ⏰ Smart Wake Calculator */}
                <GlassCard className="stagger-3">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>⏰ Smart Wake Calculator</p>
                  <p className="body" style={{fontSize:13,textAlign:"center",marginBottom:8}}>Sleep cycles are ~90 min. Waking between cycles feels best. Tap your wake time:</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
                    {["5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30"].map(wake => (
                      <div key={wake} className={`cat-pill ${wakeTime===wake?"cat-active":""}`}
                        onClick={() => setWakeTime(wakeTime===wake?null:wake)}>{wake} AM</div>
                    ))}
                  </div>
                  {wakeTime && (() => {
                    const [h,m] = wakeTime.split(":").map(Number);
                    const bedtimes = [4,5,6].map(cycles => {
                      const mins = h*60+m - cycles*90 - 15;
                      const bh = Math.floor(((mins%1440)+1440)%1440/60);
                      const bm = ((mins%1440)+1440)%1440%60;
                      return {cycles,time:`${bh>12?bh-12:bh||12}:${String(bm).padStart(2,"0")} PM`,hrs:(cycles*90+15)/60};
                    });
                    return (
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",textAlign:"center",marginBottom:8}}>To wake at {wakeTime} AM, fall asleep by:</div>
                        {bedtimes.map((bt,i) => (
                          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",borderRadius:12,background:i===1?"linear-gradient(135deg,rgba(79,203,255,0.1),rgba(79,203,255,0.04))":"var(--glass2)",border:i===1?"1.5px solid var(--lav)":"1px solid var(--line)",marginBottom:4}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:i===1?"var(--lav)":"var(--navy)"}}>{bt.time}</div>
                            <div style={{fontSize:13,color:"var(--muted)",alignSelf:"center"}}>{bt.cycles} cycles · {bt.hrs.toFixed(1)}hrs {i===1?"⭐ ideal":""}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </GlassCard>

                <GlassCard className="stagger-4">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>📊 Sleep Architecture</p>
                  <p className="body" style={{fontSize:13,textAlign:"center",marginBottom:8}}>How a perfect night breaks down.</p>
                  {[{stage:"Deep Sleep",pct:25,color:"#0E2B5C",role:"Physical repair, growth hormone"},
                    {stage:"REM Sleep",pct:25,color:"#4FCBFF",role:"Dreaming, memory, emotions"},
                    {stage:"Light Sleep",pct:45,color:"#6a8cff",role:"Transition, brain maintenance"},
                    {stage:"Awake",pct:5,color:"#ffb347",role:"Brief arousals (normal)"},
                  ].map((s,i) => (
                    <div key={i} style={{marginBottom:6}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                        <span style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>{s.stage}</span>
                        <span style={{fontSize:13,fontWeight:800,color:s.color}}>{s.pct}%</span>
                      </div>
                      <div style={{height:6,borderRadius:3,background:"var(--line)",overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${s.pct}%`,borderRadius:3,background:s.color}} />
                      </div>
                      <div style={{fontSize:13,color:"var(--muted)"}}>{s.role}</div>
                    </div>
                  ))}
                </GlassCard>

                <GlassCard className="stagger-4">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>⚡ Power Nap Guide</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                    {[{mins:"20",name:"Power",desc:"Alertness boost.",color:"#4ecdc4"},
                      {mins:"26",name:"NASA",desc:"34% performance boost.",color:"#6a8cff"},
                      {mins:"90",name:"Full Cycle",desc:"Complete with REM.",color:"#4FCBFF"}
                    ].map((n,i) => (
                      <div key={i} style={{padding:8,borderRadius:14,background:`${n.color}10`,border:`1px solid ${n.color}33`,textAlign:"center"}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:n.color}}>{n.mins}</div>
                        <div style={{fontSize:13,fontWeight:700,color:n.color}}>{n.name}</div>
                        <div style={{fontSize:13,color:"var(--muted)"}}>{n.desc}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="stagger-4">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>🦁 Sleep Chronotype</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
                    {[{a:"🦁",n:"Lion",t:"Early riser, 15%"},{a:"🐻",n:"Bear",t:"Solar cycle, 55%"},{a:"🐺",n:"Wolf",t:"Night owl, 15%"},{a:"🐬",n:"Dolphin",t:"Light sleeper, 10%"}].map((c,i) => (
                      <div key={i} style={{padding:8,borderRadius:14,background:"var(--glass2)",border:"1px solid var(--line)",textAlign:"center"}}>
                        <div style={{fontSize:20}}>{c.a}</div>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>{c.n}</div>
                        <div style={{fontSize:13,color:"var(--muted)"}}>{c.t}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="stagger-4">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>💤 Sleep Stage Secrets</p>
                  {[{icon:"💡",f:"Your brain rehearses skills during light sleep."},{icon:"🧹",f:"Deep sleep washes toxins via the glymphatic system."},{icon:"🎬",f:"5-7 REM dreams per night, ~2 hours total."},{icon:"⏰",f:"First REM: 10 min. Last REM: 60+ min."},{icon:"🧠",f:"REM uses MORE energy than waking."}].map((f,i) => (
                    <div key={i} style={{display:"flex",gap:8,padding:"4px 0",borderBottom:i<4?"1px solid var(--line)":"none"}}>
                      <span style={{fontSize:13}}>{f.icon}</span>
                      <span style={{fontSize:13,color:"var(--deep)",lineHeight:1.5}}>{f.f}</span>
                    </div>
                  ))}
                </GlassCard>
              </>}

              {/* ─── LUCID ─── */}
              {screen === "lucid" && <>
                <GlassCard className="stagger-1">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>💭 What is Lucid Dreaming?</p>
                  <h2 className="section-title" style={{fontSize:20,textAlign:"center"}}>Becoming Conscious Inside Your Dreams</h2>
                  <p className="body" style={{lineHeight:1.7,fontSize:13}}>
                    A lucid dream is when you <b>realize you're dreaming while the dream is still happening</b>. In that moment of awareness, the dream world becomes your playground — you can explore, create, fly, face fears, or simply observe the incredible creativity of your sleeping mind.
                  </p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>
                    {[{icon:"🧠",stat:"55%",label:"of people have had one"},{icon:"⏰",stat:"~20 min",label:"avg lucid dream length"},{icon:"📈",stat:"2-4 weeks",label:"to learn with practice"}].map((s,i) => (
                      <div key={i} style={{textAlign:"center",padding:8,borderRadius:12,background:"var(--glass2)",border:"1px solid var(--line)"}}>
                        <div style={{fontSize:14}}>{s.icon}</div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"var(--navy)"}}>{s.stat}</div>
                        <div style={{fontSize:13,color:"var(--muted)"}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="stagger-1">
                  <p className="eyebrow gold">Tonight's practice</p>
                  <h2 className="section-title">Reality check reminder</h2>
                  <p className="body">Pause, look at your hands, read one line twice, and ask: "Am I dreaming?"</p>
                  <button className={lucidDone ? "btn-primary" : "btn-secondary"}
                    style={{width:"100%",marginTop:12,transition:"all 0.3s ease"}}
                    onClick={() => setLucidDone(!lucidDone)}>
                    {lucidDone ? "✓ Practice done — tap to reset" : "Mark practice done"}
                  </button>
                  {lucidDone && (
                    <p className="body" style={{textAlign:"center",marginTop:8,fontSize:13,color:"var(--gold)",fontStyle:"italic"}}>
                      Great work! Consistency is the key to lucid dreaming. Your progress is saved.
                    </p>
                  )}
                </GlassCard>

                <div className="check-list stagger-2">
                  {["Set intention before sleep","Place journal by bed","Choose dream sign: moon","Morning recall note"].map((text,i) => (
                    <div key={i} className="check-item" onClick={() => {
                      const c = [...checks]; c[i] = !c[i]; setChecks(c);
                    }}>
                      <div className={`check-box ${checks[i] ? "on" : ""}`}>
                        {checks[i] ? "✓" : ""}
                      </div>
                      <span className="check-text">{text}</span>
                    </div>
                  ))}
                </div>

                <hr className="divider-line" />
                <div className="section-label stagger-2">Sleep Wind-Down</div>

                <GlassCard className="stagger-2">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>Prepare your mind for dreaming</p>
                  <p className="body" style={{lineHeight:1.7,textAlign:"center",marginBottom:14}}>
                    The hour before sleep shapes the quality of your dreams. Follow this gentle wind-down ritual to quiet your mind and invite vivid, meaningful dreams.
                  </p>

                  {[
                    {time:"60 min before",icon:"📵",title:"Screens off",desc:"Blue light suppresses melatonin and..."},
                    {time:"45 min before",icon:"🍵",title:"Warm drink",desc:"Chamomile tea, warm milk, or golden..."},
                    {time:"30 min before",icon:"🧘",title:"Gentle stretch or breathe",desc:"5–10 minutes of slow stretching or ..."},
                    {time:"20 min before",icon:"📖",title:"Read or reflect",desc:"Gentle reading (not news or thrille..."},
                    {time:"10 min before",icon:"🌙",title:"Set your dream intention",desc:"Close your eyes and say quietly: 'T..."},
                    {time:"5 min before",icon:"🛏",title:"Body scan",desc:"Lying in bed, slowly relax each par..."},
                    {time:"Lights out",icon:"🌑",title:"Surrender",desc:"Release the day. Release the need t..."},
                  ].map((step, i) => (
                    <div key={i} style={{
                      display:"flex", gap:12, marginBottom: i < 6 ? 14 : 0,
                      paddingBottom: i < 6 ? 14 : 0,
                      borderBottom: i < 6 ? "1px solid var(--line)" : "none",
                    }}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:42}}>
                        <div style={{fontSize:22}}>{step.icon}</div>
                        <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"center",lineHeight:1.1}}>{step.time}</div>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:3}}>{step.title}</div>
                        <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </GlassCard>

                <GlassCard className="stagger-3" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">Quick wind-down tips</p>
                  {[
                    "Keep your bedroom cool (65–68°F / 18–20°C) — cooler temps boost REM sleep",
                    "Use lavender or cedarwood essential oil on your pillow",
                    "Wear an eye mask — total darkness deepens sleep cycles",
                    "Write tomorrow's to-do list before bed to release mental loops",
                    "Avoid eating heavy meals within 2 hours of sleep",
                    "If your mind races, name 5 things you can see, 4 you can touch, 3 you can hear",
                  ].map((tip, i) => (
                    <div key={i} style={{
                      fontSize:13, color:"var(--text)", lineHeight:1.55, textAlign:"left",
                      padding:"8px 0", borderBottom: i < 5 ? "1px solid var(--line)" : "none",
                      display:"flex", gap:8, alignItems:"flex-start",
                    }}>
                      <span style={{color:"var(--gold)",flexShrink:0,marginTop:1}}>✦</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </GlassCard>

                <hr className="divider-line" />
                <div className="section-label stagger-2">What is Lucid Dreaming?</div>

                <GlassCard className="stagger-2">
                  <p className="eyebrow gold">The art of waking within</p>
                  <h2 className="section-title" style={{fontSize:22}}>Becoming Conscious Inside Your Dreams</h2>
                  <p className="body" style={{lineHeight:1.7}}>
                    A lucid dream is any dream in which you become aware that you are dreaming — while the dream is still happening. In that moment of recognition, something extraordinary occurs: the dreaming mind and the waking mind overlap, and you find yourself conscious inside a world entirely created by your own imagination.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    Unlike ordinary dreams where you're swept along by the narrative, lucid dreaming gives you a degree of awareness — and sometimes control — over the dream environment, your actions, and even the laws of physics within the dream. You can choose to fly, explore impossible landscapes, talk to dream characters, practice skills, face fears, or simply observe the breathtaking creativity of your sleeping mind.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    The experience ranges from a faint flicker of awareness ("Wait… this might be a dream") to full, vivid consciousness indistinguishable from waking life — except that the world around you is made entirely of thought.
                  </p>
                </GlassCard>

                <div className="section-label stagger-2">The Science</div>

                <GlassCard className="stagger-3">
                  <p className="eyebrow gold">What happens in the brain</p>
                  <p className="body" style={{lineHeight:1.7}}>
                    Lucid dreaming was scientifically verified in 1975 by researcher Keith Hearne, and later by Stephen LaBerge at Stanford University, using pre-arranged eye movement signals from within REM sleep. This proved that conscious awareness was possible during dreaming.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    During a lucid dream, brain imaging studies reveal increased activity in the prefrontal cortex — the region responsible for self-awareness, critical thinking, and decision-making. In ordinary dreams, this area is largely dormant, which is why we rarely question bizarre dream events. When it reactivates during sleep, lucidity emerges.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    The brain enters a hybrid state: it maintains the vivid sensory hallucinations of REM sleep while simultaneously engaging the reflective, metacognitive functions of wakefulness. Gamma wave activity (around 40 Hz) increases significantly — a brainwave pattern associated with heightened consciousness and insight.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    Research estimates that about 55% of people experience at least one lucid dream in their lifetime, and roughly 23% have them regularly (once a month or more). With practice, almost anyone can learn to lucid dream.
                  </p>
                </GlassCard>

                <div className="section-label stagger-2">Techniques</div>

                {[
                  {
                    icon:"🔍", name:"Reality Testing (RT)", difficulty:"Beginner",
                    desc:"The foundation of lucid dreaming. T...",
                    tip:"Do at least 10 reality checks per day. The key is genuine questioning, not mechanical habit."
                  },
                  {
                    icon:"🌙", name:"MILD — Mnemonic Induction", difficulty:"Beginner",
                    desc:"Developed by Stephen LaBerge, MILD ...",
                    tip:"Practice MILD after waking from a dream in the middle of the night — your recall is fresh and you'll re-enter REM quickly."
                  },
                  {
                    icon:"⏰", name:"WBTB — Wake Back to Bed", difficulty:"Intermediate",
                    desc:"Set an alarm for 5–6 hours after fa...",
                    tip:"Use your awake period to read your dream journal or visualize becoming lucid. Avoid screens — they suppress melatonin."
                  },
                  {
                    icon:"🌊", name:"WILD — Wake Initiated Lucid Dream", difficulty:"Advanced",
                    desc:"The most direct but challenging tec...",
                    tip:"WILD works best during WBTB windows. Focus on your breath and observe imagery without engaging it. Let the dream come to you."
                  },
                  {
                    icon:"😴", name:"SSILD — Senses Initiated", difficulty:"Intermediate",
                    desc:"Cycle your attention through your s...",
                    tip:"Keep each sensory focus to about 5 seconds. The magic happens not during the cycles, but in the sleep that follows."
                  },
                ].map((tech, i) => (
                  <GlassCard key={i} className={`stagger-${Math.min(i+2,4)}`}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <div style={{
                        width:40, height:40, borderRadius:"50%", display:"grid", placeItems:"center",
                        fontSize:20, background:"var(--glass2)", border:"1px solid var(--line)",
                        boxShadow:"0 4px 12px var(--card-shadow)", flexShrink:0
                      }}>{tech.icon}</div>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:"var(--navy)"}}>{tech.name}</div>
                        <div style={{fontSize:13, fontWeight:800, color: tech.difficulty === "Beginner" ? "#5a9e6a" : tech.difficulty === "Intermediate" ? "#c49a2e" : "#c44a4a", textTransform:"uppercase", letterSpacing:"0.1em"}}>{tech.difficulty}</div>
                      </div>
                    </div>
                    <p className="body" style={{lineHeight:1.65}}>{tech.desc}</p>
                    <div style={{
                      fontSize:13, fontStyle:"italic", lineHeight:1.5, color:"var(--gold)",
                      padding:"10px 14px", marginTop:10, background:"var(--glass2)",
                      borderRadius:14, border:"1px solid var(--line)"
                    }}>💡 {tech.tip}</div>
                  </GlassCard>
                ))}

                <div className="section-label stagger-2">Stages of Development</div>

                <GlassCard className="stagger-3">
                  <p className="eyebrow gold">Your lucid dreaming journey</p>
                  {[
                    {stage:"1", title:"Dream Recall", desc:"Before you can become lucid, you ne...", weeks:"Weeks 1–3"},
                    {stage:"2", title:"Dream Signs", desc:"Review your journal for recurring t...", weeks:"Weeks 2–4"},
                    {stage:"3", title:"First Lucid Moment", desc:"Your first lucid dream may last onl...", weeks:"Weeks 3–8"},
                    {stage:"4", title:"Stabilization", desc:"Learn to stay in the dream once you...", weeks:"Weeks 6–12"},
                    {stage:"5", title:"Dream Control", desc:"Begin experimenting — fly, walk thr...", weeks:"Months 2–4"},
                    {stage:"6", title:"Deep Practice", desc:"Advanced lucid dreamers use dreams ...", weeks:"Months 4+"},
                  ].map((s, i) => (
                    <div key={i} style={{
                      display:"flex", gap:12, marginBottom: i < 5 ? 16 : 0,
                      paddingBottom: i < 5 ? 16 : 0,
                      borderBottom: i < 5 ? "1px solid var(--line)" : "none"
                    }}>
                      <div style={{
                        width:32, height:32, borderRadius:"50%", flexShrink:0,
                        background:"linear-gradient(135deg, var(--deep), var(--lav))",
                        color:"white", display:"grid", placeItems:"center",
                        fontSize:14, fontWeight:900, fontFamily:"'Cormorant Garamond',serif"
                      }}>{s.stage}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:"var(--navy)"}}>{s.title}</div>
                        <div style={{fontSize:13, fontWeight:800, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4}}>{s.weeks}</div>
                        <div style={{fontSize:13.5, color:"var(--muted)", lineHeight:1.6}}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </GlassCard>

                <div className="section-label stagger-2">Benefits</div>

                <GlassCard className="stagger-3">
                  <p className="eyebrow gold">Why practice lucid dreaming</p>
                  {[
                    {icon:"🧠",title:"Self-awareness",desc:"Lucid dreaming strengthens metacogn..."},
                    {icon:"🎨",title:"Creative inspiration",desc:"Artists, musicians, writers, and sc..."},
                    {icon:"💚",title:"Nightmare resolution",desc:"Lucid dreaming is clinically used t..."},
                    {icon:"🏋️",title:"Skill rehearsal",desc:"Studies show that practicing physic..."},
                    {icon:"🌟",title:"Emotional healing",desc:"Lucid dreams provide a safe space t..."},
                    {icon:"🔮",title:"Exploring consciousness",desc:"At its deepest, lucid dreaming is a..."},
                  ].map((b, i) => (
                    <div key={i} style={{
                      display:"flex", gap:12, marginBottom: i < 5 ? 14 : 0,
                      paddingBottom: i < 5 ? 14 : 0,
                      borderBottom: i < 5 ? "1px solid var(--line)" : "none"
                    }}>
                      <div style={{fontSize:22, flexShrink:0, marginTop:2}}>{b.icon}</div>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:"var(--navy)", marginBottom:3}}>{b.title}</div>
                        <div style={{fontSize:13.5, color:"var(--muted)", lineHeight:1.6}}>{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </GlassCard>

                <div className="section-label stagger-2">Common Experiences</div>

                <GlassCard className="stagger-4">
                  <p className="eyebrow gold">What to expect</p>
                  <p className="body" style={{lineHeight:1.7}}>
                    <strong>The "aha!" moment</strong> — The instant you realize you're dreaming is often accompanied by a rush of excitement, a sharpening of the senses, and a feeling of profound wonder. Colors may become more vivid, sounds clearer, and the dream more stable.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    <strong>False awakenings</strong> — You "wake up" but you're still dreaming. These are extremely common for lucid dreamers and can loop multiple times. Always do a reality check when you wake up.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    <strong>Sleep paralysis</strong> — If using WILD techniques, you may experience a brief period where your body is asleep but your mind is awake. This can feel strange but is completely safe — it's actually the gateway to entering a dream consciously.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    <strong>Dream collapse</strong> — Especially early on, lucid dreams may fade quickly. Getting too excited, trying to control too much, or focusing too hard can destabilize the dream. The key is relaxed awareness — engaged but not grasping.
                  </p>
                  <p className="body" style={{lineHeight:1.7, marginTop:10}}>
                    <strong>Dream characters</strong> — The people you meet in lucid dreams can be fascinating. Some respond to your awareness with surprise; others seem to have their own agenda. Many lucid dreamers find that asking dream characters questions ("What do you represent?" or "What should I know?") produces surprisingly profound answers.
                  </p>
                </GlassCard>

                <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">Remember</p>
                  <p className="intention-text">Lucid dreaming is not about controlling your dreams — it's about waking up inside them. The real magic isn't what you do in the dream. It's that you're there at all, conscious in a world made entirely of mind.</p>
                </GlassCard>

                <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">The dreamer's paradox</p>
                  <p className="intention-text">In a lucid dream, you discover something remarkable: the dreamer and the dream are the same thing. You are both the canvas and the painter, the ocean and the wave.</p>
                </GlassCard>

                <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                  <p className="eyebrow gold">Ancient truth</p>
                  <p className="intention-text">For thousands of years, mystics and monks have known what science now confirms — that consciousness does not require the waking world. You can be fully alive, fully aware, in a world made entirely of light and thought.</p>
                </GlassCard>
              </>}

              {/* ─── DICTIONARY ─── */}
              {screen === "dictionary" && (() => {
                const filtered = DREAM_DICT.filter(d => {
                  const matchCat = dictCat === "all" || d.cat === dictCat;
                  const matchSearch = !dictSearch.trim() ||
                    d.term.toLowerCase().includes(dictSearch.toLowerCase()) ||
                    d.meaning.toLowerCase().includes(dictSearch.toLowerCase());
                  return matchCat && matchSearch;
                });
                return <>
                                                  {/* 🎵 Sleep Sounds — from DriftLoom */}
                <div style={{padding:16,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:10}}>🎵 Sleep Sounds</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                    {[
                      {icon:"🌧",name:"Rain",color:"#6a8cff"},
                      {icon:"🌊",name:"Ocean",color:"#4ecdc4"},
                      {icon:"🔥",name:"Fire",color:"#ff6b6b"},
                      {icon:"🌲",name:"Forest",color:"#2ecc71"},
                      {icon:"🌬",name:"Wind",color:"#9b59b6"},
                      {icon:"🦗",name:"Night",color:"#7f8c8d"},
                      {icon:"🎹",name:"Piano",color:"#4FCBFF"},
                      {icon:"🕊",name:"Silence",color:"#d4a44c"},
                    ].map((s,i) => (
                      <div key={i} style={{textAlign:"center",padding:10,borderRadius:14,cursor:"pointer",background:s.color+"08",border:"0.5px solid "+s.color+"22"}}>
                        <div style={{fontSize:22}}>{s.icon}</div>
                        <div style={{fontSize:13,fontWeight:700,color:s.color,marginTop:3}}>{s.name}</div>
                      </div>
                    ))}
                  </div>
                  
                </div>

                {/* ☁️ Cloud Rooms — from DriftLoom */}
                <div style={{padding:18,borderRadius:20,background:"linear-gradient(135deg,#02040A,#12122a)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,overflow:"hidden",position:"relative"}}>
                  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 20%,rgba(106,138,255,0.06),transparent 60%)"}} />
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"rgba(224,216,240,0.4)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:10}}>☁️ Cloud Room</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#EAF6FF",textAlign:"center",marginBottom:12}}>Step into your mood</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {[
                        {name:"Calm Mist",icon:"🌫",color:"#6a8cff",desc:"Soft fog, silence"},
                        {name:"Starlight",icon:"✨",color:"#ffd700",desc:"Twinkling, free"},
                        {name:"Deep Ocean",icon:"🌊",color:"#4ecdc4",desc:"Waves, peace"},
                        {name:"Ember Glow",icon:"🔥",color:"#ff6b6b",desc:"Warm, safe"},
                        {name:"Moon Garden",icon:"🌙",color:"#4FCBFF",desc:"Silver, dreamy"},
                        {name:"Aurora",icon:"🌌",color:"#9b59b6",desc:"Colors dancing"},
                      ].map((room,i) => (
                        <div key={i} onClick={() => setAiResult("☁️ "+room.name+"\n\n"+room.desc+"\n\nClose your eyes. Breathe. This is your space.")}
                          style={{textAlign:"center",padding:12,borderRadius:16,cursor:"pointer",
                            background:room.color+"10",border:"0.5px solid "+room.color+"22"}}>
                          <div style={{fontSize:22}}>{room.icon}</div>
                          <div style={{fontSize:13,fontWeight:700,color:room.color,marginTop:3}}>{room.name}</div>
                          <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>{room.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 🌅 Morning Glow — from DriftLoom */}
                {new Date().getHours() < 12 && (
                  <div style={{padding:16,borderRadius:20,background:"linear-gradient(135deg,rgba(255,179,71,0.08),rgba(255,220,150,0.04))",border:"0.5px solid rgba(255,179,71,0.12)",marginBottom:14}}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:8}}>🌅 Morning Glow</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"var(--navy)",textAlign:"center",marginBottom:10}}>Good morning, dreamer</div>
                    <div style={{fontSize:14,color:"var(--deep)",textAlign:"center",lineHeight:1.7,marginBottom:12}}>
                      {dreams.length > 0
                        ? "Your last dream was \"" + (dreams[0]?.title||"a dream") + "\" — what did your sleeping mind create last night?"
                        : "A new day, a new dream waiting to be remembered."}
                    </div>
                    <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                      <div onClick={() => navigate("journal")} style={{padding:"8px 16px",borderRadius:99,background:"rgba(255,179,71,0.12)",border:"1px solid rgba(255,179,71,0.2)",cursor:"pointer",fontSize:13,fontWeight:700,color:"var(--gold)"}}>✍️ Write a dream</div>
                      <div onClick={recordDream} style={{padding:"8px 16px",borderRadius:99,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",cursor:"pointer",fontSize:13,fontWeight:700,color:"var(--muted)"}}>🎙 Voice capture</div>
                    </div>
                  </div>
                )}

                {/* 🔍 Dream Déjà Vu — auto-connects similar dreams */}
                {dreams.length >= 2 && dreams[0].tags && (
                  <div style={{padding:16,borderRadius:20,background:"linear-gradient(135deg,rgba(106,92,205,0.06),rgba(79,203,255,0.03))",border:"0.5px solid rgba(106,92,205,0.12)",marginBottom:14}}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:8}}>🔍 Dream Déjà Vu</div>
                    {(() => {
                      const latest = dreams[0];
                      const latestTags = (latest.tags||"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);
                      const connections = dreams.slice(1).map((d,i) => {
                        const tags = (d.tags||"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);
                        const shared = latestTags.filter(t => tags.includes(t));
                        const sameMood = d.mood === latest.mood;
                        const score = shared.length * 2 + (sameMood ? 1 : 0);
                        return { dream: d, shared, sameMood, score, idx: i+1 };
                      }).filter(c => c.score >= 2).sort((a,b) => b.score - a.score).slice(0,2);
                      
                      if (!connections.length) return (
                        <div style={{fontSize:14,color:"var(--muted)",textAlign:"center"}}>Your latest dream is unique — no matching patterns yet</div>
                      );
                      return (
                        <div>
                          <div style={{fontSize:13,color:"var(--deep)",textAlign:"center",marginBottom:10}}>
                            Your latest dream shares patterns with {connections.length} past dream{connections.length>1?"s":""}:
                          </div>
                          {connections.map((c,i) => (
                            <div key={i} style={{display:"flex",gap:12,padding:10,borderRadius:14,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:6}}>
                              <div style={{fontSize:22}}>🔗</div>
                              <div>
                                <div style={{fontSize:14,fontWeight:700,color:"var(--navy)"}}>{c.dream.title||"Untitled"}</div>
                                <div style={{fontSize:13,color:"var(--muted)"}}>{c.dream.date}</div>
                                <div style={{fontSize:13,color:"var(--lav)",marginTop:2}}>
                                  {c.shared.length > 0 && `Shared: ${c.shared.join(", ")}`}
                                  {c.sameMood && ` · Same mood: ${c.dream.mood}`}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div style={{fontSize:13,color:"var(--gold)",textAlign:"center",fontStyle:"italic",marginTop:6}}>
                            ✨ Your subconscious is revisiting these themes for a reason
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 🌙 Tonight's Dream Forecast */}
                <div style={{padding:18,borderRadius:20,background:"linear-gradient(135deg,#02040A,#07111F)",border:"0.5px solid rgba(79,203,255,0.15)",marginBottom:14,overflow:"hidden",position:"relative"}}>
                  <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,200,160,0.08),transparent)"}} />
                  <div style={{fontSize:13,fontWeight:800,color:"rgba(79,203,255,0.5)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:8}}>🌙 Tonight's Dream Forecast</div>
                  {(() => {
                    const h = new Date().getHours();
                    const stress = checkin.stress || 5;
                    const sleep = checkin.sleep || 5;
                    const avgV = dreams.length ? Math.round(dreams.slice(0,5).reduce((s,d)=>s+(d.vivid||50),0)/Math.min(5,dreams.length)) : 50;
                    const vividChance = Math.min(95, Math.max(20, avgV + (h>=22?10:0) + (stress>=7?-15:5) + (sleep>=7?10:-5)));
                    const lucidChance = Math.min(40, Math.max(5, (avgV>70?15:5) + (h>=22?5:0) + (dreams.length>10?10:0)));
                    const nightmareRisk = Math.min(60, Math.max(5, (stress>=8?25:5) + (sleep<=3?15:0) + (checkin.energy<=3?10:0)));
                    
                    return (
                      <div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                          <div style={{textAlign:"center",padding:10,borderRadius:14,background:"rgba(78,205,196,0.08)",border:"0.5px solid rgba(78,205,196,0.15)"}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#4ecdc4"}}>{vividChance}%</div>
                            <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>Vivid</div>
                          </div>
                          <div style={{textAlign:"center",padding:10,borderRadius:14,background:"rgba(79,203,255,0.08)",border:"0.5px solid rgba(79,203,255,0.15)"}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#4FCBFF"}}>{lucidChance}%</div>
                            <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>Lucid</div>
                          </div>
                          <div style={{textAlign:"center",padding:10,borderRadius:14,background:`rgba(${nightmareRisk>30?"255,107,107":"176,141,248"},0.08)`,border:`0.5px solid rgba(${nightmareRisk>30?"255,107,107":"176,141,248"},0.15)`}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:nightmareRisk>30?"#ff6b6b":"#4FCBFF"}}>{nightmareRisk}%</div>
                            <div style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>Nightmare</div>
                          </div>
                        </div>
                        <div style={{fontSize:13,color:"rgba(224,216,240,0.5)",textAlign:"center",lineHeight:1.6}}>
                          {moonPhase.emoji} {moonPhase.name} · {vividChance>70?"High vividness night — set a bold intention":vividChance>50?"Moderate dream activity expected":"Gentle dreaming ahead — focus on recall"}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 📅 Dream Streak Calendar */}
                <div style={{padding:16,borderRadius:20,background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",marginBottom:14,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",marginBottom:10}}>📅 Dream Calendar</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
                    {["S","M","T","W","T","F","S"].map((d,i) => (
                      <div key={i} style={{textAlign:"center",fontSize:13,fontWeight:700,color:"var(--muted)",padding:4}}>{d}</div>
                    ))}
                    {Array.from({length:35}, (_, i) => {
                      const d = new Date(); d.setDate(d.getDate() - 34 + i);
                      const ds = d.toLocaleDateString(undefined,{month:"short",day:"numeric"});
                      const hasDream = dreams.some(dr => dr.date === ds);
                      const isToday = i === 34;
                      return (
                        <div key={i} style={{
                          textAlign:"center",padding:6,borderRadius:8,fontSize:13,
                          background:hasDream?"rgba(79,203,255,0.15)":isToday?"rgba(212,164,76,0.1)":"transparent",
                          border:isToday?"1px solid var(--gold)":hasDream?"1px solid rgba(79,203,255,0.2)":"1px solid transparent",
                          color:hasDream?"var(--lav)":isToday?"var(--gold)":"var(--muted)",
                          fontWeight:hasDream?700:400,
                        }}>
                          {d.getDate()}
                        </div>
                      );
                    })}
                  </div>
                  {(() => {
                    let streak = 0;
                    const now = new Date();
                    for (let i=0; i<30; i++) {
                      const d = new Date(now); d.setDate(d.getDate()-i);
                      const ds = d.toLocaleDateString(undefined,{month:"short",day:"numeric"});
                      if (dreams.some(dr=>dr.date===ds)) streak++;
                      else if (i>0) break;
                    }
                    return (
                      <div style={{textAlign:"center",marginTop:10}}>
                        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"var(--lav)"}}>{streak}</span>
                        <span style={{fontSize:14,color:"var(--muted)",marginLeft:6}}>day streak 🔥</span>
                      </div>
                    );
                  })()}
                </div>

                                {/* 🌤 Dream Weather Report */}
                <div style={{padding:16,borderRadius:20,background:"linear-gradient(135deg,rgba(79,203,255,0.04),rgba(106,138,255,0.02))",border:"0.5px solid rgba(79,203,255,0.08)",marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:13,fontWeight:800,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase"}}>🌤 Dream Weather</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>{new Date().toLocaleDateString(undefined,{weekday:"long"})}</div>
                  </div>
                  <div style={{fontSize:14,color:"var(--deep)",lineHeight:1.7}}>
                    {(() => {
                      const day = new Date().getDay();
                      const reports = [
                        "Sunday dreams tend to be reflective — your mind processes the week. Expect emotional clarity.",
                        "Monday dreams often carry residual weekend energy. Good night for vivid imagery.",
                        "Tuesday is a peak creativity night. Set a bold dream intention.",
                        "Midweek dreams process stress and decisions. You may dream about work or challenges.",
                        "Thursday dreams often preview the weekend. Your subconscious is already planning ahead.",
                        "Friday night dreams are the most vivid of the week. Your relaxed mind generates rich stories.",
                        "Saturday dreams are free — no alarms, longer REM cycles. Your best recall day.",
                      ];
                      return reports[day];
                    })()}
                  </div>
                </div>

                {/* Search */}
                  <div style={{position:"relative",marginBottom:12}}>
                    <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
                    <input value={dictSearch}
                      placeholder="Search dreams, symbols, meanings..."
                      onChange={e => { setDictSearch(e.target.value); setExpandedTerm(null); }}
                      style={{width:"100%",padding:"12px 12px 12px 40px",borderRadius:16,border:"1px solid var(--line)",background:"var(--glass)",fontSize:13,color:"var(--navy)",outline:"none",boxSizing:"border-box"}} />
                  </div>

                  {/* Categories */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                    {DICT_CATEGORIES.map(c => (
                      <div key={c.id}
                        onClick={() => { setDictCat(c.id); setExpandedTerm(null); }}
                        style={{
                          padding:"6px 12px",borderRadius:99,cursor:"pointer",fontSize:13,fontWeight:700,
                          background:dictCat===c.id?"rgba(79,203,255,0.12)":"transparent",
                          border:dictCat===c.id?"1.5px solid var(--lav)":"1px solid var(--line)",
                          color:dictCat===c.id?"var(--lav)":"var(--muted)",
                        }}>
                        {c.icon} {c.label}
                      </div>
                    ))}
                  </div>

                  <div style={{fontSize:13,color:"var(--muted)",marginBottom:10}}>{filtered.length} {filtered.length===1?"entry":"entries"} found</div>

                  {/* Dictionary Cards */}
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {filtered.map((d, i) => (
                      <div key={d.term}
                        onClick={() => setExpandedTerm(expandedTerm === d.term ? null : d.term)}
                        style={{
                          padding:14,borderRadius:18,cursor:"pointer",
                          background:"var(--glass)",border:"0.5px solid rgba(79,203,255,0.1)",
                          backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
                        }}>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <div style={{width:40,height:40,borderRadius:12,background:"var(--glass2)",border:"0.5px solid rgba(79,203,255,0.1)",display:"grid",placeItems:"center",fontSize:20,flexShrink:0}}>{d.icon}</div>
                          <div style={{flex:1}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--navy)"}}>{d.term}</div>
                            <div style={{fontSize:13,fontWeight:700,color:"var(--lav)",textTransform:"uppercase",letterSpacing:"0.1em"}}>{DICT_CATEGORIES.find(c=>c.id===d.cat)?.label||d.cat}</div>
                          </div>
                          <div style={{fontSize:13,color:"var(--muted)",transform:expandedTerm===d.term?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</div>
                        </div>
                        {expandedTerm === d.term && (
                          <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid var(--line)"}}>
                            <div style={{fontSize:13,color:"var(--deep)",lineHeight:1.7,marginBottom:8}}>{d.meaning}</div>
                            <div style={{
                              padding:"8px 12px",borderRadius:12,cursor:"pointer",textAlign:"center",
                              background:"rgba(79,203,255,0.08)",border:"1px solid rgba(79,203,255,0.15)",
                              fontSize:13,fontWeight:700,color:"var(--lav)",
                            }} onClick={(e) => {
                              e.stopPropagation();
                              const tag = d.term.toLowerCase();
                              const currentTags = (dream.tags||"").split(",").map(t=>t.trim()).filter(Boolean);
                              if (!currentTags.includes(tag)) setDream(prev=>({...prev,tags:[...currentTags,tag].join(", ")}));
                              setDictAdded(d.term); setTimeout(()=>setDictAdded(null),2000);
                            }}>
                              {dictAdded===d.term ? "✓ Added to your dream" : `+ Add "${d.term.toLowerCase()}" to dream`}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <GlassCard className="stagger-4" style={{textAlign:"center",marginTop:14}}>
                    <p className="eyebrow gold">Symbol wisdom</p>
                    <p className="intention-text">Dreams speak in the oldest language there is — the...</p>
                  </GlassCard>

                  <GlassCard className="stagger-4">
                    <p className="eyebrow gold" style={{textAlign:"center"}}>Resources & further reading</p>
                    <p className="body" style={{textAlign:"center",fontSize:13,marginBottom:14}}>
                      Explore these trusted sources to deepen your understanding of dreams, sleep science, and lucid dreaming.
                    </p>
                    {[
                      {title:"International Association for the Study of Dreams",url:"https://www.asdreams.org"},
                      {title:"Stanford Sleep & Dreams",url:"https://sleep.stanford.edu"},
                      {title:"The Sleep Foundation — Dream Science",url:"https://www.sleepfoundation.org/dreams"},
                      {title:"Matthew Walker's Sleep Diplomacy",url:"https://www.sleepdiplomat.com"},
                      {title:"World of Lucid Dreaming",url:"https://www.world-of-lucid-dreaming.com"},
                      {title:"Dream Studies Portal",url:"https://dreamstudies.org"},
                      {title:"Carl Jung — Man and His Symbols",url:"https://www.jungiananalysts.org"},
                      {title:"DreamsCloud Dream Dictionary",url:"https://www.dreamscloud.com"},
                      {title:"Huberman Lab — Sleep & Dreaming",url:"https://www.hubermanlab.com"},
                      {title:"The Lucidity Institute",url:"https://www.lucidity.com"},
                    ].map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          display:"block", textDecoration:"none", marginBottom: i < 9 ? 10 : 0,
                          paddingBottom: i < 9 ? 10 : 0,
                          borderBottom: i < 9 ? "1px solid var(--line)" : "none",
                        }}
                        onClick={e => e.stopPropagation()}>
                        <div style={{
                          fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:700,
                          color:"var(--deep)", marginBottom:2, display:"flex", alignItems:"center", gap:6,
                        }}>
                          <span style={{fontSize:13,opacity:0.5}}>{i+1}.</span>
                          {link.title}
                          <span style={{fontSize:13,opacity:0.4,marginLeft:"auto"}}>↗</span>
                        </div>
                        <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.5}}>{link.desc}</div>
                        <div style={{fontSize:13,color:"var(--lav)",fontWeight:700,marginTop:2}}>{link.url.replace("https://","")}</div>
                      </a>
                    ))}
                  </GlassCard>

                  {/* Q&A */}
                  <GlassCard className="stagger-4">
                    <p className="eyebrow gold" style={{textAlign:"center"}}>❓ Dream Q&A</p>
                    <p className="body" style={{fontSize:13,textAlign:"center",marginBottom:12}}>
                      Common questions every dreamer asks — tap to reveal answers.
                    </p>
                    {[
                      {q:"Why can't I remember my dreams?",a:"Most people forget 90% of dreams within 10 minutes of waking. The key is to stay still when you first wake up — movement triggers a brain-state shift that erases dream memory. Keep a journal by your bed and write keywords immediately, even single words. Over 2-3 weeks, your recall will dramatically improve."},
                      {q:"Do dreams actually mean anything?",a:"Yes — but not in a fortune-cookie way. Dreams are your brain processing emotions, memories, and unresolved conflicts. Symbols are personal: water might mean freedom to one person and fear to another. The best interpreter of your dreams is you — look for patterns over time, not single-dream meanings."},
                      {q:"What causes nightmares?",a:"Nightmares are often triggered by stress, anxiety, trauma, medications, or eating late. They serve a purpose — your brain is rehearsing threat responses to keep you safe. Recurring nightmares often stop when you consciously confront what they represent. Lucid dreaming techniques can help you transform nightmares from within."},
                      {q:"Can I control my dreams?",a:"Yes — this is called lucid dreaming. About 55% of people have had at least one lucid dream. With techniques like MILD, WILD, and WBTB, you can train yourself to become aware inside dreams and even control them. Start with reality checks during the day — the habit carries into your dreams."},
                      {q:"Why do I dream about people I haven't seen in years?",a:"Your dreaming brain pulls from your entire life's memory bank. People from your past represent qualities or emotions you associate with them, not the actual person. Dreaming about an old friend might mean you miss a quality they represent — adventure, safety, or a simpler time in your life."},
                      {q:"Can blind people dream?",a:"Yes. People blind from birth dream with sound, touch, smell and emotion — just no visuals. People who lost sight later in life still see images in dreams, sometimes for decades after losing vision."},
                      {q:"Why do I have the same dream over and over?",a:"Recurring dreams are your subconscious flagging an unresolved issue. They repeat until you consciously process the underlying emotion. Try journaling the dream and asking: what is this dream trying to tell me?"},
                      {q:"Can you die in a dream?",a:"Yes, and it's not dangerous. Dying in a dream often symbolizes transformation — the end of one phase and the beginning of another. Many people report waking up just before death, but some experience it fully and describe it as peaceful."},
                      {q:"Why do dreams feel so real?",a:"During REM, your prefrontal cortex (logic center) is mostly offline while your amygdala (emotion center) is hyperactive. This means you FEEL everything intensely but can't question whether it's real. Your brain literally can't tell the difference."},
                      {q:"Do animals dream?",a:"Yes! Dogs, cats, rats, and even octopuses show REM sleep and dream-like behavior. Dogs often twitch their paws as if running. Studies show rats replay maze routes in their sleep, suggesting they dream about their day."},
                      {q:"Why do I dream in black and white sometimes?",a:"About 12% of people dream entirely in grayscale. This may be influenced by exposure to black-and-white media. People who grew up with color TV are more likely to dream in color. The brain uses whatever visual palette feels 'normal.'"},
                      {q:"Can two people share the same dream?",a:"There are documented cases of 'mutual dreaming' where two people report strikingly similar dreams on the same night. Science hasn't confirmed shared dreaming, but many cultures and dream researchers take it seriously."},
                      {q:"What does flying in a dream mean?",a:"Flying dreams are among the most common and exhilarating. They often represent freedom, transcendence, or rising above a problem. The WAY you fly matters: soaring confidently = empowerment, struggling to stay up = feeling unsupported."},
                      {q:"Why do I forget dreams immediately?",a:"The neurotransmitter norepinephrine (needed for memory encoding) is at its lowest during REM sleep. This is why dreams evaporate so fast. The key: don't move when you wake up. Movement triggers a brain-state shift that erases dream memory."},
                      {q:"Can dreams predict the future?",a:"While there's no scientific proof of precognitive dreams, many famous discoveries were dream-inspired: the periodic table, insulin, Google's algorithm. Your dreaming brain is exceptionally good at pattern recognition and may 'predict' by connecting dots your waking mind misses."},
                      ].map((item, i) => (
                      <details key={i} style={{marginBottom:8,borderBottom:i<14?"1px solid var(--line)":"none",paddingBottom:8}}>
                        <summary style={{cursor:"pointer",fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"var(--navy)",lineHeight:1.4,listStyle:"none",display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:13,color:"var(--lav)",flexShrink:0}}>▸</span>
                          {item.q}
                        </summary>
                        <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6,marginTop:8,paddingLeft:16}}>
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </GlassCard>

                  <GlassCard className="stagger-4" style={{textAlign:"center"}}>
                    <p className="eyebrow gold">The dreamer's dictionary</p>
                    <p className="intention-text">No book can tell you what your dreams mean — only ...</p>
                  </GlassCard>
                </>;
              })()}

              {/* ─── SETTINGS ─── */}
              {screen === "settings" && <>
                <GlassCard className="stagger-1">
                  <p className="eyebrow gold">Personalization</p>
                  <label className="form-label">Theme
                    <select className="form-select" value={theme}
                      onChange={e => setTheme(e.target.value)}>
                      {Object.entries(THEMES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </label>
                  <label className="form-label">Reminder time
                    <input type="time" className="form-input" defaultValue="07:00" />
                  </label>

                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:6}}>Journal ink color</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
                      {INK_COLORS.map(c => (
                        <div key={c.color} style={{textAlign:"center",cursor:"pointer"}} onClick={() => setInkColor(c.color)}>
                          <div style={{width:32,height:32,borderRadius:"50%",margin:"0 auto 4px",background:c.color,border:inkColor===c.color?"3px solid var(--lav)":"2px solid var(--line)",boxShadow:inkColor===c.color?"0 0 8px rgba(79,203,255,0.3)":"none"}} />
                          <div style={{fontSize:13,color:"var(--muted)"}}>{c.name}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:10,padding:14,borderRadius:14,background:"var(--glass2)",border:"1px solid var(--line)",fontSize:14,fontStyle:"italic",color:inkColor}}>
                      I was floating through soft lavender clouds...
                    </div>
                  </div>

                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:6}}>Journal font</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                      {JOURNAL_FONTS.map(f => (
                        <div key={f.name}
                          style={{
                            padding:"10px 6px", borderRadius:14, textAlign:"center", cursor:"pointer",
                            border: journalFont === f.value ? "2px solid var(--lav)" : "1px solid var(--line)",
                            background: journalFont === f.value ? "linear-gradient(135deg, rgba(79,203,255,0.1), rgba(79,203,255,0.04))" : "var(--glass2)",
                            boxShadow: journalFont === f.value ? "0 4px 12px rgba(79,203,255,0.15)" : "none",
                            transition:"all 0.2s ease",
                          }}
                          onClick={() => setJournalFont(f.value)}>
                          <div style={{fontFamily:f.value, fontSize:18, color:"var(--navy)", marginBottom:2}}>{f.preview}</div>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--muted)"}}>{f.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:6}}>Journal background</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
                      {JOURNAL_BGS.map(bg => (
                        <div key={bg.name} style={{textAlign:"center",cursor:"pointer"}} onClick={() => setJournalBg(bg.color)}>
                          <div style={{width:32,height:32,borderRadius:"50%",margin:"0 auto 4px",
                            background:bg.color==="transparent"?"linear-gradient(135deg,#fff,#eee)":bg.color,
                            border:journalBg===bg.color?"3px solid var(--lav)":bg.color==="transparent"?"2px dashed var(--line)":"2px solid var(--line)",
                            boxShadow:journalBg===bg.color?"0 0 8px rgba(79,203,255,0.3)":"none"}} />
                          <div style={{fontSize:13,color:"var(--muted)"}}>{bg.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{marginTop:10,padding:14,borderRadius:14,fontSize:14,fontStyle:"italic",
                    color:journalBg==="#07111F"?"#EAF6FF":inkColor,
                    fontFamily:journalFont,
                    background:journalBg==="transparent"?"var(--glass2)":journalBg,
                    border:"1px solid var(--line)",
                  }}>
                    I was floating through soft lavender clouds while pages turned into stars...
                  </div>

                  {[
                    {label:"Dream recall reminders",key:"recall"},
                    {label:"Cloud backup",key:"backup"},
                  ].map((item,i) => (
                    <div key={i} className="setting-row">
                      <span className="setting-label">{item.label}</span>
                      <button className={`toggle ${toggles[item.key] ? "on" : ""}`}
                        onClick={() => setToggles(t => ({...t, [item.key]:!t[item.key]}))} />
                    </div>
                  ))}
                </GlassCard>

                <GlassCard className="stagger-2">
                  <p className="eyebrow gold">Security</p>
                  <div className="setting-row">
                    <span className="setting-label">🔒 App lock</span>
                    <button className={`toggle ${lockEnabled ? "on" : ""}`}
                      onClick={() => {
                        if (lockEnabled) {
                          setLockEnabled(false);
                          setPasscode("");
                          setSettingPasscode(false);
                        } else {
                          setSettingPasscode(true);
                          setNewPasscode("");
                        }
                      }} />
                  </div>
                  <p className="body" style={{fontSize:13,marginTop:4}}>
                    {lockEnabled ? "Your journal is protected. A passcode is required to open DriftLoom." : "Enable to require a passcode when opening the app."}
                  </p>

                  {settingPasscode && !lockEnabled && (
                    <div style={{marginTop:14,textAlign:"center",animation:"fadeUp 0.3s ease both"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:10}}>Create a 4-digit passcode</div>
                      <div className="lock-dots" style={{justifyContent:"center",marginBottom:14}}>
                        {[0,1,2,3].map(i => (
                          <div key={i} className={`lock-dot ${newPasscode.length > i ? "filled" : ""}`} />
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,maxWidth:180,margin:"0 auto"}}>
                        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i) => (
                          k === "" ? <div key={i} /> :
                          <button key={i} style={{
                            width:48,height:48,borderRadius:"50%",border:"1px solid var(--line)",
                            background:"var(--glass2)",color:"var(--navy)",fontSize:18,fontWeight:700,
                            cursor:"pointer",fontFamily:"'Cormorant Garamond',serif",
                            display:"grid",placeItems:"center",margin:"0 auto",
                          }} onClick={() => {
                            if (k === "⌫") { setNewPasscode(p => p.slice(0,-1)); }
                            else {
                              const next = newPasscode + k;
                              setNewPasscode(next);
                              if (next.length === 4) {
                                setPasscode(next);
                                setLockEnabled(true);
                                setSettingPasscode(false);
                                setNewPasscode("");
                              }
                            }
                          }}>
                            {k === "⌫" ? "⌫" : k}
                          </button>
                        ))}
                      </div>
                      <button className="btn-text" style={{marginTop:10,fontSize:13}}
                        onClick={() => setSettingPasscode(false)}>Cancel</button>
                    </div>
                  )}

                  {lockEnabled && (
                    <button className="btn-secondary" style={{width:"100%",marginTop:10,fontSize:13}}
                      onClick={() => { setSettingPasscode(true); setNewPasscode(""); setLockEnabled(false); setPasscode(""); }}>
                      Change passcode
                    </button>
                  )}

                  {lockEnabled && (
                    <div style={{marginTop:12}}>
                      <div className="setting-row">
                        <span className="setting-label">😊 Face ID / Touch ID</span>
                        <button className={`toggle ${useBiometric ? "on" : ""}`}
                          onClick={() => setUseBiometric(!useBiometric)} />
                      </div>
                      <p className="body" style={{fontSize:13,marginTop:4}}>
                        {useBiometric ? "Unlock DriftLoom with your face or fingerprint." : "Use passcode only."}
                      </p>
                    </div>
                  )}
                </GlassCard>

                <GlassCard className="stagger-2">
                  <p className="eyebrow gold">Dream data</p>
                  <div className="setting-row">
                    <span className="setting-label">Dreams saved</span>
                    <span style={{fontSize:14,fontWeight:800,color:"var(--deep)"}}>{dreams.length}</span>
                  </div>
                  <p className="body" style={{fontSize:13,marginTop:6}}>
                    Your dreams are stored locally and persist between sessions. There is no limit — log as many as you'd like.
                  </p>
                  <button className="btn-secondary" style={{width:"100%",marginTop:12,fontSize:13,
                      color: confirmReset ? "#c44" : undefined,
                      borderColor: confirmReset ? "rgba(220,60,60,0.3)" : undefined}}
                    onClick={() => {
                      if (confirmReset) {
                        setDreams(sampleDreams);
                        setDailyMood("Calm");
                        setDailyRecall(82);
                        setDailySymbol("clouds");
                        setConfirmReset(false);
                      } else {
                        setConfirmReset(true);
                        setTimeout(() => setConfirmReset(false), 4000);
                      }
                    }}>
                    {confirmReset ? "Tap again to confirm reset" : "Reset dream journal"}
                  </button>
                  <button className="btn-secondary" style={{width:"100%",marginTop:8,fontSize:13,color:"#ff6b6b"}}
                    onClick={() => { setPurchased(false); setTrialStart(null); }}>
                    Reset Purchase & Trial (testing only)
                  </button>
                  <button className="btn-secondary" style={{width:"100%",marginTop:8,fontSize:13,color:"var(--lav)"}}
                    onClick={() => setShowPaywall(true)}>
                    Preview Paywall (testing only)
                  </button>
                </GlassCard>

                {/* ⌚ Watch Sync */}
                <GlassCard className="stagger-3">
                  <p className="eyebrow gold" style={{textAlign:"center"}}>⌚ Watch Sync</p>
                  {(() => {
                    const doSync = () => {
                      setSyncing(true); setSyncData(null);
                      setTimeout(() => {
                        const data = {
                          dreams: dreams.length,
                          mood: checkin.moodWeather || "Clear",
                          sleep: checkin.sleep || 5,
                          stress: checkin.stress || 5,
                          streak: (() => { let s=0; const now=new Date(); const sorted=[...dreams].sort((a,b)=>new Date(b.date)-new Date(a.date)); for(let i=0;i<30;i++){const d=new Date(now);d.setDate(d.getDate()-i);const ds=d.toLocaleDateString(undefined,{month:"short",day:"numeric"});if(sorted.some(dr=>dr.date===ds))s++;else if(i>0)break;} return s; })(),
                          moonPhase: moonPhase.name,
                        };
                        setSyncData(data);
                        setLastSync(new Date().toLocaleTimeString());
                        setSyncing(false);
                      }, 2200);
                    };
                    return <>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                        <div style={{width:50,height:50,borderRadius:"50%",overflow:"hidden",boxShadow:"0 4px 16px rgba(120,100,220,0.25)",flexShrink:0,animation:syncing?"pulse 1.5s ease-in-out infinite":"none"}}>
                          <img src={APP_LOGO} alt="DriftLoom" style={{width:50,height:50,borderRadius:"50%"}} />
                        </div>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>Apple Watch / WearOS</div>
                          <div style={{fontSize:13,color:lastSync?"#4ecdc4":"var(--muted)"}}>{lastSync ? `Last synced: ${lastSync}` : "Not synced yet"}</div>
                        </div>
                      </div>
                      <button className={syncing?"btn-secondary":"btn-primary"} style={{width:"100%",fontSize:13,padding:"12px 16px"}} onClick={doSync} disabled={syncing}>
                        {syncing ? "🔄 Syncing..." : lastSync ? "🔄 Sync Again" : "⌚ Sync to Watch"}
                      </button>
                      {syncData && (
                        <div style={{marginTop:10,padding:10,borderRadius:12,background:"rgba(78,205,196,0.06)",border:"1px solid rgba(78,205,196,0.2)"}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#4ecdc4",marginBottom:6}}>✅ Synced to watch:</div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                            {[
                              {l:"Dreams",v:syncData.dreams},{l:"Mood",v:syncData.mood},
                              {l:"Sleep",v:syncData.sleep+"/10"},{l:"Stress",v:syncData.stress+"/10"},
                              {l:"Streak",v:syncData.streak+"d"},{l:"Moon",v:syncData.moonPhase},
                            ].map((s,i) => (
                              <div key={i} style={{fontSize:13,color:"var(--deep)"}}>
                                <span style={{fontWeight:700}}>{s.l}:</span> {s.v}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div style={{fontSize:13,color:"var(--muted)",marginTop:6,textAlign:"center"}}>Syncs mood weather, sleep data, dreams & moon phase to your watch face</div>
                    </>;
                  })()}
                </GlassCard>

                {/* 📤 Export Dreams */}
                <GlassCard className="stagger-4">
                  <p className="eyebrow gold">📤 Export Your Dreams</p>
                  <p className="body" style={{fontSize:13,marginBottom:8}}>Download all your dream data as a text file.</p>
                  <button className="btn-secondary" style={{width:"100%",fontSize:13}} onClick={() => {
                    const text = dreams.map(d =>
                      `═══ ${d.title||"Untitled"} ═══\nDate: ${d.date||""}\nMood: ${d.mood} · Vivid: ${d.vivid}%\nTags: ${d.tags||"none"}\n\n${d.notes||""}\n`
                    ).join("\n");
                    const blob = new Blob(["DriftLoom Dream Export\n"+new Date().toLocaleDateString()+"\n"+dreams.length+" dreams\n\n"+text], {type:"text/plain"});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a"); a.href=url; a.download="driftloom-dreams.txt"; a.click();
                    URL.revokeObjectURL(url);
                  }}>
                    📄 Export ({dreams.length} dreams)
                  </button>
                </GlassCard>

                {/* 🔔 Notifications */}

                <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0 8px",opacity:0.85}}>
                  <img src={APP_LOGO} alt="DriftLoom Dream Journal" style={{
                    width:140, height:140, borderRadius:"50%",
                    boxShadow:"0 12px 40px rgba(120,100,220,0.18)",
                    marginBottom:12,
                  }} />
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:700,
                    color:"var(--muted)", letterSpacing:"0.12em", textTransform:"uppercase",
                  }}>DriftLoom</div>
                  <div style={{
                    fontSize:13, color:"var(--muted)", marginTop:2, fontWeight:600, opacity:0.7,
                  }}>Dream Journal · v3.0</div>
                </div>
              </>}

            </div>
          </div>

          {/* Bottom nav */}
          {/* 🔒 PAYWALL MODAL */}
          {showPaywall && (
            <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(10,10,26,0.95)",display:"grid",placeItems:"center",padding:20,overflow:"auto"}}>
              <div style={{maxWidth:340,width:"100%",textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>🌙</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#EAF6FF",marginBottom:4}}>Unlock the Portal</div>
                <div style={{fontSize:13,color:"rgba(224,216,240,0.5)",marginBottom:20}}>AI dream analysis, bedtime stories, and all premium features</div>

                {/* Annual — Best Value */}
                <div style={{padding:14,borderRadius:18,background:"rgba(255,179,71,0.06)",border:"1.5px solid rgba(255,179,71,0.2)",marginBottom:10,cursor:"pointer",position:"relative"}}
                  onClick={() => { setPurchased(true); setShowPaywall(false); }}>
                  <div style={{position:"absolute",top:-8,right:12,fontSize:13,fontWeight:800,color:"white",background:"linear-gradient(135deg,#4ecdc4,#2ecc71)",padding:"2px 10px",borderRadius:99}}>BEST VALUE</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#ffb347"}}>🌙 Annual — Save 50%</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"#EAF6FF"}}>$29.99<span style={{fontSize:13,color:"rgba(224,216,240,0.4)"}}>/year</span></div>
                  <div style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>7-day free trial, then $29.99/year. Auto-renews yearly.</div>
                </div>

                {/* Monthly */}
                <div style={{padding:12,borderRadius:18,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",marginBottom:10,cursor:"pointer"}}
                  onClick={() => { setPurchased(true); setShowPaywall(false); }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:13,color:"rgba(224,216,240,0.5)"}}>Monthly</span>
                    <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#EAF6FF"}}>$3.99<span style={{fontSize:13,color:"rgba(224,216,240,0.3)"}}>/mo</span></span>
                  </div>
                  <div style={{fontSize:13,color:"rgba(224,216,240,0.3)",marginTop:4}}>7-day free trial, then $3.99/month. Auto-renews monthly.</div>
                </div>

                {/* Lifetime */}
                <div style={{padding:12,borderRadius:18,background:"rgba(79,203,255,0.04)",border:"1px solid rgba(79,203,255,0.15)",marginBottom:14,cursor:"pointer",position:"relative"}}
                  onClick={() => { setPurchased(true); setShowPaywall(false); }}>
                  <div style={{position:"absolute",top:-8,left:12,fontSize:13,fontWeight:800,color:"white",background:"linear-gradient(135deg,#4FCBFF,#1a6cd4)",padding:"2px 10px",borderRadius:99}}>FOREVER</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:13,color:"rgba(224,216,240,0.5)"}}>Lifetime — Pay once</span>
                    <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#EAF6FF"}}>$39.99</span>
                  </div>
                  <div style={{fontSize:13,color:"rgba(224,216,240,0.3)",marginTop:4}}>One-time purchase. All features, forever. No subscription.</div>
                </div>

                {/* Trial CTA with Apple-required disclosure */}
                {!trialStart && (
                  <div style={{marginBottom:14}}>
                    <button style={{width:"100%",padding:16,borderRadius:18,background:"linear-gradient(135deg,#4FCBFF,#1a6cd4)",color:"white",fontWeight:700,fontSize:15,border:"none",cursor:"pointer",boxShadow:"0 8px 24px rgba(79,203,255,0.3)"}}
                      onClick={() => { startTrial(); setShowPaywall(false); }}>
                      Start Your 7-Day Free Trial
                    </button>
                    <div style={{fontSize:13,color:"rgba(224,216,240,0.4)",marginTop:8,lineHeight:1.6}}>
                      After your 7-day free trial, your selected plan auto-renews at the price shown above. Cancel anytime before the trial ends and you won't be charged.
                    </div>
                  </div>
                )}

                {trialStart && !trialActive && (
                  <div style={{fontSize:13,color:"#ff6b6b",marginBottom:10}}>Your free trial has ended. Choose a plan to keep your AI features.</div>
                )}

                {/* Apple-required payment terms */}
                <div style={{fontSize:13,color:"rgba(224,216,240,0.25)",lineHeight:1.6,marginBottom:10}}>
                  Payment is charged to your Apple ID account at confirmation of purchase. Subscriptions auto-renew unless turned off at least 24 hours before the end of the current period. Lifetime purchase is a one-time, non-recurring charge. You can manage and turn off auto-renewal in your Account Settings after purchase.
                </div>

                {/* Free features note */}
                <div style={{fontSize:13,color:"rgba(224,216,240,0.2)",marginBottom:10}}>
                  Free to download forever · Journaling, moon phases, tarot, and dictionary always free
                </div>

                {/* Terms, Privacy, Manage — Apple required */}
                <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:6,flexWrap:"wrap"}}>
                  <a href={TERMS_URL} target="_blank" rel="noopener" style={{fontSize:13,color:"rgba(79,203,255,0.5)",textDecoration:"underline"}}>Terms of Use (EULA)</a>
                  <a href={PRIVACY_URL} target="_blank" rel="noopener" style={{fontSize:13,color:"rgba(79,203,255,0.5)",textDecoration:"underline"}}>Privacy Policy</a>
                </div>
                <div style={{textAlign:"center",marginBottom:10}}>
                  <a href={MANAGE_SUB_URL} target="_blank" rel="noopener" style={{fontSize:13,color:"rgba(79,203,255,0.4)",textDecoration:"underline"}}>Manage Subscription</a>
                </div>

                <button style={{background:"none",border:"none",color:"rgba(224,216,240,0.3)",fontSize:13,cursor:"pointer",padding:8}}
                  onClick={() => setShowPaywall(false)}>
                  Continue with free features
                </button>
              </div>
            </div>
          )}

          {/* Trial banner */}
          {trialActive && !purchased && (
            <div style={{position:"fixed",top:0,left:0,right:0,zIndex:999,padding:"4px 12px",background:"linear-gradient(90deg,#4FCBFF,#1a6cd4)",textAlign:"center",fontSize:13,color:"white",fontWeight:700}}>
              ✨ Free trial: {trialDaysLeft} day{trialDaysLeft!==1?"s":""} remaining · <span style={{textDecoration:"underline",cursor:"pointer"}} onClick={() => setShowPaywall(true)}>Subscribe now</span>
            </div>
          )}

          {/* Day 5 gentle reminder (2 days left) */}
          {trialActive && !purchased && trialDaysLeft <= 2 && trialDaysLeft > 0 && screen === "home" && (
            <div style={{margin:"8px 0",padding:14,borderRadius:18,background:"linear-gradient(135deg,rgba(79,203,255,0.1),rgba(255,179,71,0.06))",border:"1.5px solid rgba(79,203,255,0.2)",position:"relative"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{fontSize:28}}>🌙</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>Your portal closes in {trialDaysLeft} day{trialDaysLeft!==1?"s":""}</div>
                  <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.5,marginTop:2}}>
                    {dreams.length >= 3
                      ? `You've captured ${dreams.length} dreams and unlocked ${dreams.length >= 5 ? "deep" : "emerging"} patterns. Don't lose your AI dream insights.`
                      : "Your dream journey is just beginning. Keep your AI insights unlocked."}
                  </div>
                  <button style={{marginTop:6,padding:"6px 16px",borderRadius:12,background:"linear-gradient(135deg,#4FCBFF,#1a6cd4)",color:"white",fontWeight:700,fontSize:13,border:"none",cursor:"pointer"}}
                    onClick={() => setShowPaywall(true)}>
                    Keep Premium — $3.99/mo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post-trial expired nudge (shows once on home after trial ends) */}
          {trialStart && !trialActive && !purchased && screen === "home" && (
            <div style={{margin:"8px 0",padding:14,borderRadius:18,background:"linear-gradient(135deg,rgba(255,107,107,0.06),rgba(79,203,255,0.04))",border:"1px solid rgba(255,107,107,0.15)"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{fontSize:28}}>🔮</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--navy)"}}>Your AI insights are paused</div>
                  <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.5,marginTop:2}}>
                    Your {dreams.length} dream{dreams.length!==1?"s":""} and patterns are still saved. Reactivate anytime.
                  </div>
                  <button style={{marginTop:6,padding:"6px 16px",borderRadius:12,background:"linear-gradient(135deg,#4FCBFF,#1a6cd4)",color:"white",fontWeight:700,fontSize:13,border:"none",cursor:"pointer"}}
                    onClick={() => setShowPaywall(true)}>
                    Reactivate Premium
                  </button>
                </div>
              </div>
            </div>
          )}

          <nav className="bottom-nav">
            {NAV.map(n => (
              <button key={n.id}
                className={`nav-btn ${screen === n.id ? "active" : ""}`}
                onClick={() => navigate(n.id)}>
                <span>{n.icon}</span>
                <span className="nav-label">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {shareMsg && <div className="share-toast">{shareMsg}</div>}
    </>
  );
}
