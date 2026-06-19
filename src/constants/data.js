export const NAV = [
  { id:"home", icon:"☽", label:"Home" },
  { id:"journal", icon:"✎", label:"Journal" },
  { id:"insights", icon:"✦", label:"Insights" },
  { id:"cycles", icon:"◑", label:"Cycles" },
  { id:"lucid", icon:"◌", label:"Lucid" },
  { id:"dictionary", icon:"❋", label:"Dict." },
  { id:"settings", icon:"⚙", label:"Settings" },
];

export const MOODS = [
  "Calm","Happy","Anxious","Peaceful","Mysterious","Vivid",
  "Nostalgic","Dreamy","Surreal","Powerful","Lost","Free",
  "Magical","Warm","Intense","Romantic","Hopeful","Enchanted",
];

export const FEELINGS = [
  {emoji:"😊",label:"Great"},{emoji:"🙂",label:"Good"},{emoji:"😐",label:"Okay"},
  {emoji:"😔",label:"Low"},{emoji:"😴",label:"Tired"},{emoji:"😰",label:"Anxious"},
  {emoji:"🥰",label:"Loved"},{emoji:"✨",label:"Inspired"},{emoji:"🌧",label:"Sad"},
  {emoji:"🔥",label:"Motivated"},{emoji:"🤔",label:"Reflective"},{emoji:"😌",label:"Peaceful"},
];

export const DICT_CATEGORIES = [
  {id:"all",label:"All",icon:"✦"},
  {id:"symbols",label:"Symbols",icon:"🔮"},
  {id:"animals",label:"Animals",icon:"🦋"},
  {id:"elements",label:"Elements",icon:"🌊"},
  {id:"places",label:"Places",icon:"🏛"},
  {id:"actions",label:"Actions",icon:"🕊"},
  {id:"types",label:"Dream Types",icon:"💫"},
];

export const DREAM_DICT = [
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
  {term:"Forest",icon:"🌲",cat:"places",meaning:"The unknown and personal growth. You're navigating uncertainty."},
  {term:"Ocean",icon:"🌊",cat:"places",meaning:"The vast unconscious mind. You dream of oceans when deep emotions are stirring."},
  {term:"Bridge",icon:"🌉",cat:"places",meaning:"Transitions between two states of being. Moving from one life phase to another."},
  {term:"Mountain",icon:"⛰",cat:"places",meaning:"Challenges and ambition. You're striving toward a significant goal."},
  {term:"Flying",icon:"🕊",cat:"actions",meaning:"Freedom and limitless potential. You dream of flying when rising above daily limitations."},
  {term:"Falling",icon:"⬇️",cat:"actions",meaning:"Loss of control or letting go. You dream of falling when afraid of failing."},
  {term:"Running",icon:"🏃",cat:"actions",meaning:"Avoidance or pursuit. You dream of running when escaping something or chasing a goal."},
  {term:"Swimming",icon:"🏊",cat:"actions",meaning:"Navigating emotions. You're processing feelings or adapting to situations."},
  {term:"Singing",icon:"🎵",cat:"actions",meaning:"Self-expression and joy. You need to express something you've been holding inside."},
  {term:"Lucid Dream",icon:"💎",cat:"types",meaning:"Self-awareness breaking into sleep. Your conscious and unconscious minds are connecting."},
  {term:"Recurring Dream",icon:"🔄",cat:"types",meaning:"Your subconscious repeating an unresolved message. They stop when you address the issue."},
  {term:"Nightmare",icon:"🌑",cat:"types",meaning:"Your brain processing fear and anxiety. They serve a protective purpose."},
  {term:"Prophetic Dream",icon:"🔮",cat:"types",meaning:"Your subconscious pattern recognition noticing things your waking mind misses."},
  {term:"Healing Dream",icon:"💚",cat:"types",meaning:"Your psyche working to repair emotional wounds and restore inner balance."},
  {term:"False Awakening",icon:"👁",cat:"types",meaning:"Your mind caught between states. It's often a gateway to lucid dreaming."},
];

export const SLEEP_STAGES = [
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
    tags:["10 – 60 min","Beta-like activity","~25% of sleep"]},
];

export const ZODIAC = [
  {n:"Aries",s:"♈",color:"#ff6b6b",trait:"Bold, vivid action dreams"},
  {n:"Taurus",s:"♉",color:"#4ecdc4",trait:"Sensory, nature-rich dreams"},
  {n:"Gemini",s:"♊",color:"#ffd700",trait:"Dialogue-heavy, shifting scenes"},
  {n:"Cancer",s:"♋",color:"#6a8cff",trait:"Emotional, family-centered dreams"},
  {n:"Leo",s:"♌",color:"#ff9f43",trait:"Dramatic, spotlight dreams"},
  {n:"Virgo",s:"♍",color:"#a8e6cf",trait:"Detail-rich, problem-solving"},
  {n:"Libra",s:"♎",color:"#4FCBFF",trait:"Harmonious, relationship dreams"},
  {n:"Scorpio",s:"♏",color:"#c44569",trait:"Intense, transformative dreams"},
  {n:"Sagittarius",s:"♐",color:"#f8b739",trait:"Adventure, travel dreams"},
  {n:"Capricorn",s:"♑",color:"#778ca3",trait:"Achievement, structure dreams"},
  {n:"Aquarius",s:"♒",color:"#45aaf2",trait:"Futuristic, unusual dreams"},
  {n:"Pisces",s:"♓",color:"#a55eea",trait:"Mystical, oceanic dreams"},
];

export const MOON_DATA = [
  {name:"New Moon",shadow:"linear-gradient(135deg,rgba(10,10,26,0.95),rgba(10,10,26,0.9))",
    desc:"The sky is dark. A blank slate for setting dream intentions.",
    dream:"Set a dream intention tonight"},
  {name:"Waxing Crescent",shadow:"linear-gradient(135deg,transparent 30%,rgba(10,10,26,0.9) 35%)",
    desc:"Dream recall begins to sharpen. Capture every fragment.",
    dream:"Record every detail"},
  {name:"First Quarter",shadow:"linear-gradient(90deg,transparent 48%,rgba(10,10,26,0.9) 52%)",
    desc:"Dreams carry choices and crossroads. Problem-solving peaks.",
    dream:"Notice decisions in dreams"},
  {name:"Waxing Gibbous",shadow:"linear-gradient(135deg,transparent 65%,rgba(10,10,26,0.85) 70%)",
    desc:"Dreams grow vivid and emotionally rich. Peak vividness approaches.",
    dream:"Vividness building"},
  {name:"Full Moon",shadow:"transparent",
    desc:"Maximum illumination. The most vivid dreams of the entire cycle.",
    dream:"Peak dream night"},
  {name:"Waning Gibbous",shadow:"linear-gradient(-135deg,transparent 65%,rgba(10,10,26,0.85) 70%)",
    desc:"Integration phase. Review and journal what your dreams revealed.",
    dream:"Review and integrate"},
  {name:"Last Quarter",shadow:"linear-gradient(-90deg,transparent 48%,rgba(10,10,26,0.9) 52%)",
    desc:"Release and forgiveness. Old patterns surface to dissolve.",
    dream:"Let go of old patterns"},
  {name:"Waning Crescent",shadow:"linear-gradient(-135deg,transparent 30%,rgba(10,10,26,0.9) 35%)",
    desc:"Deep rest and quiet dreaming. Surrender to sleep.",
    dream:"Rest and surrender"},
];

export const CLOUD_ROOMS = [
  {name:"Calm Mist",icon:"🌫",color:"#6a8cff",desc:"Soft fog, silence"},
  {name:"Starlight",icon:"✨",color:"#ffd700",desc:"Twinkling, free"},
  {name:"Deep Ocean",icon:"🌊",color:"#4ecdc4",desc:"Waves, peace"},
  {name:"Ember Glow",icon:"🔥",color:"#ff6b6b",desc:"Warm, safe"},
  {name:"Moon Garden",icon:"🌙",color:"#4FCBFF",desc:"Silver, dreamy"},
  {name:"Aurora",icon:"🌌",color:"#9b59b6",desc:"Colors dancing"},
];

export const SLEEP_SOUNDS = [
  {icon:"🌧",name:"Rain",color:"#6a8cff"},
  {icon:"🌊",name:"Ocean",color:"#4ecdc4"},
  {icon:"🔥",name:"Fire",color:"#ff6b6b"},
  {icon:"🌲",name:"Forest",color:"#2ecc71"},
  {icon:"🌬",name:"Wind",color:"#9b59b6"},
  {icon:"🦗",name:"Night",color:"#7f8c8d"},
  {icon:"🎹",name:"Piano",color:"#4FCBFF"},
  {icon:"🕊",name:"Silence",color:"#d4a44c"},
];

export const DAILY_SYMBOLS = [
  {icon:"🌙",msg:"Moon — Trust your intuition"},
  {icon:"⭐",msg:"Stars — Seek direction"},
  {icon:"🗝",msg:"Key — Unlock new doors"},
  {icon:"🪶",msg:"Feather — Let go"},
  {icon:"🦋",msg:"Butterfly — Embrace change"},
  {icon:"🔥",msg:"Fire — Follow passion"},
  {icon:"🌊",msg:"Ocean — Dive deep"},
];

export const DREAM_FACTS = [
  "90% of dreams fade within 10 minutes.",
  "Blind people dream with sounds and touch.",
  "You only dream faces you've seen before.",
  "Dogs twitch during REM — they dream too.",
  "You have 4-6 dreams every single night.",
  "12% of people dream in black and white.",
  "Toddlers don't appear in their own dreams until age 3.",
];

export const AFFIRMATIONS = [
  "Your dreams are letters from your deeper self.",
  "Every dream you remember makes the next one clearer.",
  "Your subconscious is wiser than you know.",
  "Tonight's dreams are already forming.",
  "The patterns reveal who you're becoming.",
  "You are the author of your dream world.",
  "Each dream is a gift — unwrap it with curiosity.",
];

export const DREAM_WISDOM = [
  {quote:"Dreams are the royal road to the unconscious.",author:"Freud"},
  {quote:"Who looks outside dreams. Who looks inside awakes.",author:"Jung"},
  {quote:"All we see or seem is but a dream within a dream.",author:"Poe"},
];

export const LEGAL_URLS = {
  terms: "https://ocoeestudios.com/terms",
  privacy: "https://ocoeestudios.com/privacy",
  manageSub: "https://apps.apple.com/account/subscriptions",
};
