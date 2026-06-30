import { describe, it, expect } from 'vitest';
import { parseSymbols } from './symbols';

describe('parseSymbols', () => {
  it('splits, trims, and drops empties', () => {
    expect(parseSymbols('water, doorway ,  , gravity')).toEqual([
      'water',
      'doorway',
      'gravity',
    ]);
  });

  it('returns [] for empty/nullish input', () => {
    expect(parseSymbols('')).toEqual([]);
    expect(parseSymbols(null)).toEqual([]);
    expect(parseSymbols(undefined)).toEqual([]);
  });

  it('handles a single symbol with surrounding whitespace', () => {
    expect(parseSymbols('  moon  ')).toEqual(['moon']);
  });
});
