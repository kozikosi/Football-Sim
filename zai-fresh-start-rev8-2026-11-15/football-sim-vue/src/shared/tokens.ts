// tokens.ts — the TS mirror of tokens.css (the single source for the hexes TS needs to compute
// against: contrast checks, canvas-free color math). C1's palette gate: NO hex literals anywhere
// else in either repo — every hex here has a twin in tokens.css and must be changed in BOTH.
export const PANEL_HEX = '#1c1307';        // = --panel (the feed line's backing panel)
export const CREAM_HEX = '#f5e9dd';        // = the pale mix target (ink.ts's lighten base)
export const GOLD_HEX = '#c9a24b';         // = --gold
export const GOLD_BRIGHT_HEX = '#ffc43c';  // = --gold-bright
export const TEAM_FALLBACK: readonly [string, string, string] = ['#e8c87e', '#f5e9dd', '#c8a48f'];
