// tokens-w89.ts — the TS twin of tokens-w89.css (VARIANT L, live-w89): every hex here has a twin
// in the sheet; the arms' TS-side color math (contrast checks, canvas-free math) reads THESE.
// Two-mode exactly like the sheet: LIGHT = w89.html:13616/13621 + gold 491; DARK = 13624/13628 + gold 531.
export const VARIANT = 'live-w89 (Variant L) — the direction per the Owner beauty ruling' as const;
export const LIGHT = {
  bg: '#fdf2f6', panel: '#ffffff', panel2: '#f9e9f0',
  text: '#8e5566', sub: '#885261', rosehair: '#e6c3d2',
  zcream: '#53382b', gold2: '#e6c67d', goldm: '#ad7f2e', gold3: '#9a6b1f', onGold: '#3a2a14',
} as const;
export const DARK = {
  bg: '#1e1119', panel: '#291a24', panel2: '#35202d',
  text: '#8e5566',              // w89's dark block does NOT set --text (the plum ink carries in) — flagged, not fixed
  sub: '#c99cae', rosehair: '#4a3040',
  zcream: '#f2e7d5', gold2: '#e8c87e', goldm: '#c39a4a', gold3: '#8a5f18', onGold: '#2c1e0c',
} as const;
export const TEAM_FALLBACK: readonly [string, string, string] = ['#e6c67d', '#f2e7d5', '#c39a4a'];
