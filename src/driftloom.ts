/* ═══════════════════════════════════════════════
   Driftloom — Idea-to-project incubation engine
   Ocoee Studios · v1.1
   ═══════════════════════════════════════════════ */

export type IdeaType = "thought" | "dream" | "image" | "voice" | "link" | "location";
export type Mood = "strange" | "soft" | "bold" | "useful";
export type OutputMode = "app" | "story" | "brand";
export type MentorMode = "designer" | "writer" | "founder" | "filmmaker" | "gameMaker";

export type Idea = {
  id: string;
  text: string;
  type: IdeaType;
  mood: Mood;
  selected: boolean;
  favorite?: boolean;
  archived?: boolean;
  note?: string;
  revisitAt?: number; // timestamp
  createdAt?: number;
  attachment?: { type: "image" | "voice" | "link"; uri: string; label: string };
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  nextMove: string;
  mode: OutputMode;
  count: number;
};

export type Pattern = { tag: string; count: number };

export type Concept = {
  title: string;
  summary: string;
  pull: string;
  move: string;
};

export type LoomPlan = {
  angle: string;
  nextSteps: string[];
  question: string;
};

export type Momentum = {
  level: number;
  progress: number;
  title: string;
  message: string;
};

export type Quest = {
  id: string;
  label: string;
  detail: string;
  complete: boolean;
};

export type IdeaDNA = {
  role: string;
  signal: string;
  energy: number;
  future: string;
};

export type FutureCard = {
  id: string;
  shape: string;
  title: string;
  promise: string;
  firstArtifact: string;
};

export type TimeCapsule = {
  title: string;
  fragment: string;
  connection: string;
  prompt: string;
};

export type BuildModePlan = {
  firstScreen: string;
  userPromise: string;
  steps: string[];
  guardrail: string;
};

export type StreakData = {
  current: number;
  longest: number;
  lastCaptureDate: string;
  todayCount: number;
};

export type InsightData = {
  totalFragments: number;
  totalFavorites: number;
  weeklyCount: number;
  topType: string;
  topMood: string;
  typeBreakdown: Record<string, number>;
  streakEmoji: string;
};

export type SortMode = "recent" | "type" | "mood" | "favorites";
export type FilterType = "all" | IdeaType;
export type FilterMood = "all" | Mood;

/* ─── Starter ideas ─── */

export const starterIdeas: Idea[] = [
  {
    id: "starter-1",
    text: "A notes app that notices when three random thoughts are secretly the same project.",
    type: "thought",
    mood: "useful",
    selected: true,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "starter-2",
    text: "Dream: walking through a quiet city where every window was a different unfinished idea.",
    type: "dream",
    mood: "strange",
    selected: true,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "starter-3",
    text: "Screenshot note: green neon sign reflected in rain, like a title screen for a memory.",
    type: "image",
    mood: "soft",
    selected: false,
    createdAt: Date.now() - 43200000,
  },
  {
    id: "starter-4",
    text: "Voice memo: stop organizing ideas by folders. Organize them by what they are trying to become.",
    type: "voice",
    mood: "bold",
    selected: true,
    createdAt: Date.now(),
  },
];

/* ─── Tag extraction ─── */

const TAG_WORDS: Record<string, string[]> = {
  system: ["app", "notes", "organize", "tool", "system", "capture", "sort", "cluster", "workspace", "interface", "dashboard"],
  memory: ["memory", "remember", "past", "earlier", "old", "voice memo", "folder", "journal", "diary", "history"],
  city: ["city", "window", "neon", "sign", "street", "building", "reflected", "rain", "urban", "architecture"],
  making: ["build", "create", "prototype", "make", "design", "become", "project", "version", "launch", "ship"],
  story: ["dream", "scene", "character", "world", "title", "screen", "walking", "narrative", "film", "episode"],
  spark: ["idea", "thought", "random", "stray", "half-formed", "fragment", "notion", "hunch", "insight"],
  visual: ["photo", "screenshot", "image", "picture", "color", "aesthetic", "logo", "icon", "illustration"],
  sound: ["voice", "audio", "music", "podcast", "record", "listen", "sound", "melody", "rhythm"],
  product: ["feature", "user", "customer", "market", "pricing", "subscription", "monetize", "revenue", "growth"],
};

export function extractTags(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [tag, words] of Object.entries(TAG_WORDS)) {
    if (words.some((w) => lower.includes(w))) found.push(tag);
  }
  return found.length ? found : ["spark"];
}

/* ─── Patterns ─── */

export function getPatterns(ideas: Idea[]): Pattern[] {
  const counts: Record<string, number> = {};
  for (const idea of ideas.filter((i) => !i.archived)) {
    for (const tag of extractTags(idea.text)) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/* ─── Utilities ─── */

export function countBy<T>(items: T[], fn: (item: T) => string): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of items) {
    const key = fn(item);
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

export function topKey(record: Record<string, number>, fallback: string): string {
  let best = fallback;
  let max = 0;
  for (const [key, count] of Object.entries(record)) {
    if (count > max) { max = count; best = key; }
  }
  return best;
}

/* ─── Search & filter ─── */

export function searchIdeas(ideas: Idea[], query: string): Idea[] {
  if (!query.trim()) return ideas;
  const q = query.toLowerCase();
  return ideas.filter((i) =>
    i.text.toLowerCase().includes(q) ||
    i.type.includes(q) ||
    i.mood.includes(q) ||
    (i.note && i.note.toLowerCase().includes(q)) ||
    extractTags(i.text).some((t) => t.includes(q))
  );
}

export function sortIdeas(ideas: Idea[], mode: SortMode): Idea[] {
  const sorted = [...ideas];
  switch (mode) {
    case "recent": return sorted.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    case "type": return sorted.sort((a, b) => a.type.localeCompare(b.type));
    case "mood": return sorted.sort((a, b) => a.mood.localeCompare(b.mood));
    case "favorites": return sorted.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
    default: return sorted;
  }
}

export function filterIdeas(ideas: Idea[], typeFilter: FilterType, moodFilter: FilterMood, showArchived: boolean): Idea[] {
  return ideas.filter((i) => {
    if (!showArchived && i.archived) return false;
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (moodFilter !== "all" && i.mood !== moodFilter) return false;
    return true;
  });
}

/* ─── Streak ─── */

export function computeStreak(ideas: Idea[]): StreakData {
  const today = new Date().toDateString();
  const dates = ideas
    .filter((i) => i.createdAt && !i.archived)
    .map((i) => new Date(i.createdAt!).toDateString());
  const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const todayCount = dates.filter((d) => d === today).length;
  let current = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const check = new Date(now);
    check.setDate(check.getDate() - i);
    if (uniqueDates.includes(check.toDateString())) {
      current++;
    } else if (i > 0) {
      break;
    }
  }

  return {
    current,
    longest: Math.max(current, uniqueDates.length),
    lastCaptureDate: uniqueDates[0] || "",
    todayCount,
  };
}

/* ─── Insights ─── */

export function computeInsights(ideas: Idea[], projects: Project[]): InsightData {
  const active = ideas.filter((i) => !i.archived);
  const weekAgo = Date.now() - 7 * 86400000;
  const weeklyIdeas = active.filter((i) => (i.createdAt || 0) > weekAgo);
  const streak = computeStreak(ideas);
  const flames = streak.current >= 7 ? "🔥🔥🔥" : streak.current >= 3 ? "🔥🔥" : streak.current >= 1 ? "🔥" : "💤";

  return {
    totalFragments: active.length,
    totalFavorites: active.filter((i) => i.favorite).length,
    weeklyCount: weeklyIdeas.length,
    topType: topKey(countBy(active, (i) => i.type), "thought"),
    topMood: topKey(countBy(active, (i) => i.mood), "useful"),
    typeBreakdown: countBy(active, (i) => i.type),
    streakEmoji: flames,
  };
}

/* ─── Revisit / reminders ─── */

export function getRevisitDue(ideas: Idea[]): Idea[] {
  const now = Date.now();
  return ideas.filter((i) => i.revisitAt && i.revisitAt <= now && !i.archived);
}

export function getFavorites(ideas: Idea[]): Idea[] {
  return ideas.filter((i) => i.favorite && !i.archived);
}

/* ─── Concept synthesis ─── */

const CONCEPT_POOL: Concept[] = [
  {
    title: "Becoming Board",
    summary: "A workspace where ideas are sorted by what they could become: app, story, brand, scene, song, or experiment.",
    pull: "Future shape",
    move: "Choose one cluster",
  },
  {
    title: "Signal Finder",
    summary: "A private tool that watches your raw captures and surfaces the pattern you keep circling but haven't named yet.",
    pull: "Hidden pattern",
    move: "Name the strongest signal",
  },
  {
    title: "Fragment Engine",
    summary: "An incubator that takes rough, unfinished pieces and proposes what they could build together.",
    pull: "Creative momentum",
    move: "Pick the first fragment",
  },
  {
    title: "Drift Map",
    summary: "A visual canvas where scattered ideas form constellations, revealing which ones belong to the same unbuilt project.",
    pull: "Spatial clarity",
    move: "Map three fragments",
  },
  {
    title: "Build Seed",
    summary: "A launcher that turns a single strong fragment into a first-version spec with one screen, one promise, and three steps.",
    pull: "Actionable start",
    move: "Pick the boldest fragment",
  },
  {
    title: "Pattern Pulse",
    summary: "A daily ritual tool that surfaces one pattern from your captures and asks you to strengthen or release it.",
    pull: "Recurring signal",
    move: "Name the loudest pattern",
  },
  {
    title: "Creative Compass",
    summary: "A direction-finder that takes your scattered fragments and points toward the project they secretly want to become.",
    pull: "Hidden direction",
    move: "Choose which way to lean",
  },
  {
    title: "Spark Archive",
    summary: "A living library of your best fragments, organized not by date but by the energy they carry and the futures they suggest.",
    pull: "Creative legacy",
    move: "Sort by energy, not time",
  },
  {
    title: "Voice Thread",
    summary: "A tool that turns spoken thoughts into visual threads, connecting the ideas you say out loud to the ones you type in silence.",
    pull: "Spoken connection",
    move: "Record one voice fragment",
  },
  {
    title: "First Draft Engine",
    summary: "An opinionated launcher that takes your strongest signal and generates the first version you can build this weekend.",
    pull: "Immediate action",
    move: "Pick the signal that won\'t wait",
  },
  {
    title: "Memory Loom",
    summary: "A time-traveling tool that weaves old captures with new ones to reveal patterns you couldn\'t see when you were inside them.",
    pull: "Temporal pattern",
    move: "Revisit your oldest fragment",
  },
  {
    title: "Concept Garden",
    summary: "A space where half-formed ideas grow into full concepts through daily attention, not forced organization.",
    pull: "Organic growth",
    move: "Water your most fragile idea",
  },
];

export function pickConcept(ideas: Idea[], mode: OutputMode, nonce: number): Concept {
  const idx = (ideas.length + nonce) % CONCEPT_POOL.length;
  return CONCEPT_POOL[idx];
}

/* ─── Loom plan ─── */

export function buildLoomPlan(ideas: Idea[], concept: Concept, mode: OutputMode): LoomPlan {
  const patterns = getPatterns(ideas);
  const top = patterns[0]?.tag || "spark";
  const second = patterns[1]?.tag || "memory";
  return {
    angle: `Lead with ${top}, then use ${second} to make ${concept.title} feel specific instead of generic.`,
    nextSteps: [
      `Name the smallest version of ${concept.title} someone could use today.`,
      `Pick one ${ideas[0]?.mood || "useful"} fragment and turn it into the first screen or opening scene.`,
      `Design the capture moment before adding any complex features.`,
    ],
    question: `What would make this feel unmistakably like Driftloom, not just another ${mode}?`,
  };
}

/* ─── Future cards ─── */

export function buildFutureCards(ideas: Idea[], concept: Concept, nonce: number): FutureCard[] {
  return [
    {
      id: "future-app",
      shape: "App",
      title: `${concept.title} Companion`,
      promise: `Turns ${getPatterns(ideas)[0]?.tag || "idea"} fragments into one useful next move.`,
      firstArtifact: "A capture screen that answers back with a direction.",
    },
    {
      id: "future-story",
      shape: "Story",
      title: `The ${capitalize(getPatterns(ideas)[0]?.tag || "Signal")} Thread`,
      promise: `Uses the ${ideas[0]?.mood || "useful"} feeling as the emotional rule of the world.`,
      firstArtifact: "A first scene where the pattern shows up as a sign.",
    },
    {
      id: "future-brand",
      shape: "Brand",
      title: `${capitalize(getPatterns(ideas)[1]?.tag || "Memory")} Method`,
      promise: "Makes unfinished ideas feel valuable before they are polished.",
      firstArtifact: "A one-sentence promise and three brand behaviors.",
    },
  ];
}

/* ─── Time capsule ─── */

export function buildTimeCapsule(allIdeas: Idea[], selected: Idea[], nonce: number): TimeCapsule {
  const oldest = allIdeas[allIdeas.length - 1] || selected[0];
  const top = getPatterns(allIdeas)[0]?.tag || "signal";
  return {
    title: "Memory from earlier",
    fragment: oldest?.text || "No fragments yet.",
    connection: `This older ${top} signal could add contrast to the current ${top === "system" ? "system" : "creative"} direction.`,
    prompt: "Re-open this in 7 days and ask: did it become clearer, louder, or irrelevant?",
  };
}

/* ─── Mentor notes ─── */

export function buildMentorNote(ideas: Idea[], concept: Concept, mentor: MentorMode): string {
  const angles: Record<MentorMode, string> = {
    designer: `Design this around the moment a user sees their pattern for the first time.`,
    writer: `Start with the sentence that made you save ${concept.title}. That's your opening line.`,
    founder: `Before building ${concept.title}, write the one-line pitch that makes someone say "I need that."`,
    filmmaker: `If ${concept.title} were a scene, what's the first image? Start there.`,
    gameMaker: `What's the core loop? Capture, discover, build. Make each step feel rewarding on its own.`,
  };
  return angles[mentor];
}

/* ─── Build mode ─── */

export function buildBuildModePlan(ideas: Idea[], concept: Concept, mode: OutputMode, mentor: MentorMode): BuildModePlan {
  const top = getPatterns(ideas)[0]?.tag || "system";
  return {
    firstScreen: `A private capture screen where ${top} fragments start clustering automatically.`,
    userPromise: `In under 60 seconds, ${concept.title} should turn loose drift into a visible next move.`,
    steps: [
      `Prototype only the ${top} capture moment.`,
      "Sketch the first tap, the feedback moment, and the return ritual.",
      "Test it with 5 messy fragments before adding more structure.",
    ],
    guardrail: "Do not make the user organize first. Let the loom find shape after they capture.",
  };
}

/* ─── Idea DNA ─── */

const ROLES = ["System seed", "Atmosphere seed", "Visual seed", "Truth seed", "Pattern seed", "Raw seed"];
const FUTURES = ["product", "world", "story", "experiment", "tool", "brand"];

export function buildIdeaDNA(idea: Idea, allIdeas: Idea[]): IdeaDNA {
  const tags = extractTags(idea.text);
  const idx = allIdeas.indexOf(idea);
  const roleIdx = Math.abs(idx) % ROLES.length;
  const futureIdx = Math.abs(idea.text.length) % FUTURES.length;
  const shared = allIdeas.filter((other) =>
    other.id !== idea.id && extractTags(other.text).some((t) => tags.includes(t))
  ).length;
  const energy = Math.min(100, 60 + shared * 12 + tags.length * 4);
  return { role: ROLES[roleIdx], signal: tags[0] || "spark", energy, future: FUTURES[futureIdx] };
}

/* ─── Daily sparks ─── */

const SPARKS = [
  "Pick a mood, then capture something that proves it.",
  "What app would you build if you only had one screen?",
  "Describe something you saw today that felt like an interface.",
  "What\'s the one thing your notes app doesn\'t understand about you?",
  "Name a product that frustrated you this week. What\'s the fix?",
  "Record a voice note about the last idea you almost forgot.",
  "If your best idea had a title, what would it be?",
  "Capture one thing that felt unfinished today.",
  "What would a tool built for exactly your brain look like?",
  "Describe a problem that three of your ideas secretly share.",
  "What pattern keeps showing up in your captures?",
  "Screenshot something on your phone that could be a project.",
  "What if your last three ideas were features of the same app?",
  "Name the feeling you get when a good idea drifts away. Now capture it.",
  "What\'s a tiny tool you wish existed right now?",
  "Describe the first screen of your dream app in one sentence.",
  "What did you notice today that nobody else seemed to see?",
  "Voice memo: explain your best idea to a stranger in 30 seconds.",
  "What\'s the overlap between your two most different fragments?",
  "If you could only build one more thing, what would it be?",
  "What\'s a creative project you keep postponing? Capture the first step.",
  "Describe a moment this week that felt like the start of something.",
  "What would you name a brand built around your strongest pattern?",
  "Capture the question you keep asking yourself but never answer.",
];

export function getDailySpark(index: number): string {
  return SPARKS[index % SPARKS.length];
}

/* ─── Capture shortcuts ─── */

export function buildCaptureShortcut(kind: IdeaType, ideas: Idea[], nonce: number): string {
  const starters: Record<string, string[]> = {
    voice: ["Voice memo: I keep thinking about...", "Spoken thought: the real problem is...", "Voice note: what if there was a tool that..."],
    image: ["Screenshot: an interface that caught my eye because...", "Visual note: I saw something that reminded me of...", "Image capture: this design works because..."],
    link: ["Reference: found an article about...", "Link save: this connects to my idea about...", "Research thread: bookmarking this because..."],
    location: ["Place note: I had this idea while...", "Location capture: something about this spot made me think...", "Spatial note: the environment here reminds me of..."],
  };
  const pool = starters[kind] || starters.voice;
  return pool[(nonce + ideas.length) % pool.length];
}

/* ─── Remix prompt ─── */

export function buildRemixPrompt(ideas: Idea[], mode: OutputMode, nonce: number): string {
  const words = ideas.slice(0, 3).map((i) => extractTags(i.text)[0] || "idea");
  return `What if ${words.join(", ")} were actually the same ${mode}?`;
}

/* ─── Momentum ─── */

const LEVELS = [
  { title: "First spark", message: "Drop in your first fragment to start the loom." },
  { title: "Gathering", message: "Keep capturing. The loom needs raw material." },
  { title: "Pattern stage", message: "Your loom is finding shape. Select the strongest sparks and incubate them." },
  { title: "Weaving", message: "Patterns are connecting. Time to synthesize a direction." },
  { title: "Building", message: "You have projects forming. Pick one and push it forward." },
  { title: "Drift architect", message: "Your creative system is working. Keep feeding it." },
];

export function buildMomentum(ideas: Idea[], projects: Project[]): Momentum {
  const active = ideas.filter((i) => !i.archived);
  const score = active.length * 2 + projects.length * 10;
  const level = Math.min(LEVELS.length - 1, Math.floor(score / 15));
  const nextThreshold = (level + 1) * 15;
  const progress = Math.min(100, Math.round((score / nextThreshold) * 100));
  return { level: level + 1, progress, ...LEVELS[level] };
}

/* ─── Quests ─── */

export function buildQuests(ideas: Idea[], projects: Project[]): Quest[] {
  const active = ideas.filter((i) => !i.archived);
  const selected = active.filter((i) => i.selected);
  const hasVisual = active.some((i) => i.type === "image");
  const hasVoice = active.some((i) => i.type === "voice");
  const hasFavorite = active.some((i) => i.favorite);
  const hasNote = active.some((i) => i.note);
  const hasLink = active.some((i) => i.type === "link");
  return [
    { id: "q-gather", label: "Gather 5 fragments", detail: `${Math.min(active.length, 5)} / 5 captured`, complete: active.length >= 5 },
    { id: "q-select", label: "Select 3 live sparks", detail: `${Math.min(selected.length, 3)} / 3 selected`, complete: selected.length >= 3 },
    { id: "q-mix", label: "Mix visual and voice", detail: hasVisual && hasVoice ? "active" : "add an image and a voice capture", complete: hasVisual && hasVoice },
    { id: "q-fav", label: "Star a favorite", detail: hasFavorite ? `${active.filter((i) => i.favorite).length} favorited` : "star your strongest fragment", complete: hasFavorite },
    { id: "q-pin", label: "Pin one direction", detail: projects.length > 0 ? `${projects.length} pinned` : "incubate, then pin", complete: projects.length > 0 },
    { id: "q-note", label: "Add a follow-up note", detail: hasNote ? "notes added" : "tap 📝 on any fragment", complete: hasNote },
    { id: "q-link", label: "Save a link", detail: hasLink ? "link captured" : "bookmark a reference", complete: hasLink },
    { id: "q-ten", label: "Reach 10 fragments", detail: `${Math.min(active.length, 10)} / 10`, complete: active.length >= 10 },
  ];
}

/* ─── Why text ─── */

export function buildWhyText(ideas: Idea[]): string {
  const patterns = getPatterns(ideas);
  const tags = patterns.map((p) => p.tag).join(", ");
  const mood = topKey(countBy(ideas, (i) => i.mood), "useful");
  const format = topKey(countBy(ideas, (i) => i.type), "thought");
  return `This synthesis comes from ${ideas.length} selected fragments. The strongest signals are ${tags || "emerging"}, with a ${mood} mood and ${format} as the dominant capture style.`;
}

/* ─── Export / Share ─── */

export function buildProjectBrief(project: Project, ideas: Idea[]): string {
  const linked = ideas.filter((i) => i.selected && !i.archived).slice(0, project.count);
  const tags = getPatterns(linked).map((p) => p.tag).join(", ");
  return [
    `# ${project.title}`, "", project.summary, "",
    `**Direction:** ${project.mode}`,
    `**Fragments:** ${project.count}`,
    `**Signals:** ${tags || "emerging"}`,
    `**Next move:** ${project.nextMove}`, "",
    `## Source fragments`,
    ...linked.map((i, idx) => `${idx + 1}. [${i.type}/${i.mood}] ${i.text}`),
    "", "---", "Exported from Driftloom · Ocoee Studios",
  ].join("\n");
}

export function buildBuildPlanExport(project: Project, plan: BuildModePlan): string {
  return [
    `# Build Plan: ${project.title}`, "",
    `## First version`, plan.firstScreen, "",
    `## Promise`, plan.userPromise, "",
    `## Steps`, ...plan.steps.map((s, i) => `${i + 1}. ${s}`), "",
    `## Guardrail`, plan.guardrail, "",
    "---", "Exported from Driftloom · Ocoee Studios",
  ].join("\n");
}

export function buildFragmentExport(idea: Idea): string {
  const tags = extractTags(idea.text).join(", ");
  return [
    `# Fragment: ${idea.type} / ${idea.mood}`, "",
    idea.text, "",
    idea.note ? `**Note:** ${idea.note}\n` : "",
    `**Signals:** ${tags}`,
    idea.favorite ? "⭐ Favorited" : "",
    "", "---", "Exported from Driftloom · Ocoee Studios",
  ].filter(Boolean).join("\n");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
