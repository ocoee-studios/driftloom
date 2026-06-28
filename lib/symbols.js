// Pure dream-symbol helpers — extracted so they're unit-testable without the
// React Native runtime (the rn-qa-template `test` gate runs these under vitest).

// parseSymbols splits a comma-separated symbol string into a clean, trimmed,
// non-empty list. Tolerant of null/undefined input.
export function parseSymbols(text) {
  return (text || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
