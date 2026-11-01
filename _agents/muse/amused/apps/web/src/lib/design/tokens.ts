// Design tokens for amused — lifted from Z.ai's w52 rose-gold system
// (Football-Sim-Z-post-blue-w52.html, md5 40613b81de26b5ed9c67bdcc0637ac6f),
// rebuilt as data. Cascade-resolved: later wave payloads override earlier ones,
// so these are the SHIPPED values (incl. the w50 halfway-ink law: light --text
// is the halfway rose #8e5566; --zcream survives as a token but nothing may use it).
// Framework-free: both the SvelteKit app and the React proof-of-portability consume these.
// Lifted with Z.ai's blessing (2026-11-01, COPY-PASTE-KIT-w52.md REV 1);
// credit in CHANGELOG. Style-guide laws adopted as advice: integers only,
// no white text, halfway-rose light ink, prefers-color-scheme default, dot law.

export type ThemeName = 'light' | 'dark';
export type ThemeTokens = Record<string, string>;

export const light: ThemeTokens = {
  '--accent': '#c9a24b',
  '--accent2': '#cf8a60',
  '--b1': '#b98a3a',
  '--b2': '#e9c987',
  '--b3': '#fff3d6',
  '--b4': '#e2b96a',
  '--b5': '#c9a24b',
  '--b6': '#e9c987',
  '--bad': '#c25b4e',
  '--bg': '#fdf2f6',
  '--border': '#eeddcb',
  '--dr1': '#cf9752',
  '--dr2': '#f8e7c0',
  '--fieldbg': 'rgba(255,255,255,.5)',
  '--g1': '#9a6b1f',
  '--g2': '#e6c67d',
  '--g3': '#eed9a3',
  '--g4': '#d9a45b',
  '--g5': '#c9a24b',
  '--g6': '#f3dfae',
  '--glass': 'rgba(255,255,255,.58)',
  '--glassbd': 'rgba(178,124,96,.16)',
  '--glow': 'rgba(201,162,75,.32)',
  '--glowA': 'rgba(238,196,168,.34)',
  '--glowB': 'rgba(219,183,116,.20)',
  '--gold': '#ffc43c',
  '--gold2': '#e6c67d',
  '--gold3': '#9a6b1f',
  '--goldm': '#ad7f2e',
  '--good': '#4c9a67',
  '--o1': '#fff8ea',
  '--o2': '#f0cf92',
  '--o3': '#cf9752',
  '--o4': '#a8701a',
  '--ongold': '#3a2a14',
  '--panel': '#ffffff',
  '--panel2': '#f9e9f0',
  '--rose': '#c97a8e',
  '--rosehair': '#e6c3d2',
  '--selfg': '#a05a70',
  '--selglow': 'rgba(201,122,142,.38)',
  '--selwash1': 'rgba(201,122,142,.14)',
  '--selwash2': 'rgba(201,162,75,.12)',
  '--shadow': '0 10px 34px rgba(163,113,84,.10)',
  '--sub': '#a2687d',
  '--tBS': 'rgba(190,140,60,.38)',
  '--tBS2': 'rgba(190,140,60,.5)',
  '--tBSb': 'rgba(168,124,30,.38)',
  '--tOG': 'rgba(214,164,96,.5)',
  '--tOGh': 'rgba(214,164,96,.68)',
  '--text': '#8e5566',
  '--zcream': '#53382b',
  '--zshim': 'var(--goldm,#ad7f2e)',
};

export const dark: ThemeTokens = {
  '--accent': '#d9b36a',
  '--accent2': '#e09a6f',
  '--b1': '#8a5f18',
  '--b2': '#e8c87e',
  '--b3': '#fff3d6',
  '--b4': '#dda869',
  '--b5': '#d9b36a',
  '--b6': '#e8c87e',
  '--bad': '#e08573',
  '--bg': '#1e1119',
  '--border': '#3a2c31',
  '--dr1': '#d9a45b',
  '--dr2': '#f8e7c0',
  '--fieldbg': 'rgba(255,255,255,.05)',
  '--g1': '#8a5f18',
  '--g2': '#e8c87e',
  '--g3': '#f4e3b0',
  '--g4': '#d9a45b',
  '--g5': '#d9b36a',
  '--g6': '#f3dfae',
  '--glass': 'rgba(38,28,33,.55)',
  '--glassbd': 'rgba(233,196,160,.12)',
  '--glow': 'rgba(217,179,106,.30)',
  '--glowA': 'rgba(217,179,106,.10)',
  '--glowB': 'rgba(224,154,111,.08)',
  '--gold2': '#e8c87e',
  '--gold3': '#8a5f18',
  '--goldm': '#c39a4a',
  '--good': '#72c18e',
  '--o1': '#fff8ea',
  '--o2': '#f0cf92',
  '--o3': '#d9a45b',
  '--o4': '#8a5f18',
  '--ongold': '#2c1e0c',
  '--panel': '#291a24',
  '--panel2': '#35202d',
  '--rose': '#dfa6b4',
  '--rosehair': '#4a3040',
  '--selfg': '#dfa6b4',
  '--selglow': 'rgba(223,166,180,.30)',
  '--selwash1': 'rgba(223,166,180,.12)',
  '--selwash2': 'rgba(217,179,106,.10)',
  '--shadow': '0 10px 34px rgba(0,0,0,.38)',
  '--sub': '#c99cae',
  '--tBS': 'rgba(217,179,106,.32)',
  '--tBS2': 'rgba(217,179,106,.48)',
  '--tBSb': 'rgba(233,196,160,.3)',
  '--tOG': 'rgba(217,179,106,.45)',
  '--tOGh': 'rgba(217,179,106,.62)',
  '--text': '#f5e9dd',
  '--zcream': '#f2e7d5',
  '--zshim': 'var(--gold3,#8a5f18)',
};

export const themes: Record<ThemeName, ThemeTokens> = { light, dark };

// The wordmark gradient (the "20-0" shimmer): gold sweep over the brand ink.
export const wordmarkGradient = (t: ThemeTokens) =>
  `linear-gradient(100deg, ${t['--gold3']} 20%, ${t['--g2']} 40%, ${t['--gold3']} 60%)`;

// Apply a theme: set every token as a CSS var on documentElement.
// Team takeover (later) overrides --accent/--good/--bad per franchise on top of this.
export function applyTheme(name: ThemeName): void {
  const root = document.documentElement;
  const tokens = themes[name];
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
  root.dataset.theme = name;
}
