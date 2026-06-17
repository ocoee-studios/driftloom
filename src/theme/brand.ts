export const driftloomColors = {
  deepBlack: "#02040A",
  midnightNavy: "#07111F",
  deepOcean: "#0E2B5C",
  glacierBlue: "#4FCBFF",
  metallicSilver: "#C7D0DB",
  icyWhite: "#EAF6FF",
  icyMist: "#DFF6FF",
  glassWhite: "rgba(255, 255, 255, 0.68)",
  glassBright: "rgba(234, 246, 255, 0.78)",
  black: "#02040A",
  midnight: "#DFF6FF",
  navy: "#07111F",
  card: "rgba(234, 246, 255, 0.9)",
  cardSoft: "rgba(255, 255, 255, 0.78)",
  surface: "rgba(255, 255, 255, 0.82)",
  ocean: "#0E2B5C",
  oceanBg: "rgba(234, 246, 255, 0.82)",
  blueBg: "rgba(79, 203, 255, 0.22)",
  cyan: "#4FCBFF",
  cyanBg: "rgba(79, 203, 255, 0.2)",
  blue: "#0E2B5C",
  violet: "#C7D0DB",
  magenta: "#4FCBFF",
  star: "#07111F",
  silver: "#0E2B5C",
  muted: "#35516F",
  textTertiary: "rgba(7, 17, 31, 0.74)",
  line: "rgba(79, 203, 255, 0.28)",
  lineHover: "rgba(14, 43, 92, 0.22)",
  glowCyan: "rgba(79, 203, 255, 0.42)",
  glowBlue: "rgba(14, 43, 92, 0.2)",
  glowOcean: "rgba(79, 203, 255, 0.24)",
  glowViolet: "rgba(199, 208, 219, 0.34)",
  glowMagenta: "rgba(79, 203, 255, 0.24)"
} as const;

export const driftloomGradients = {
  logo: [
    driftloomColors.cyan,
    driftloomColors.blue,
    driftloomColors.violet,
    driftloomColors.magenta
  ],
  primary: [driftloomColors.cyan, driftloomColors.blue],
  loom: [driftloomColors.violet, driftloomColors.magenta],
  progress: [driftloomColors.cyan, driftloomColors.violet, driftloomColors.magenta]
} as const;

export const driftloomTypeColors = {
  thought: driftloomColors.cyan,
  dream: driftloomColors.metallicSilver,
  image: driftloomColors.violet,
  voice: driftloomColors.magenta,
  link: driftloomColors.icyWhite,
  location: driftloomColors.glacierBlue
} as const;

export const driftloomCopy = {
  appName: "Driftloom",
  tagline: "Turn creative drift into direction.",
  promise: "Capture anything. We'll find the patterns.",
  signalFound: "Your ideas are connected. You just didn't see it yet."
} as const;
