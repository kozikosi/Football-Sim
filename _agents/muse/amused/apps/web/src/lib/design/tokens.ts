// Design tokens for amused — lifted from Z.ai's w52 rose-gold system
// (Football-Sim-Z-post-blue-w52.html, <style id="zpbtheme">), rebuilt as data.
// Framework-free: both the SvelteKit app and the React proof-of-portability consume these.
// applyTheme() sets them as CSS custom properties on :root; components reference
// var(--text), var(--accent), etc. and never hard-code palette values.

export type ThemeName = 'light' | 'dark';
export type ThemeTokens = Record<string, string>;

export const light: ThemeTokens = {
  '--bg': '#fcf7f1',
  '--panel': '#ffffff',
  '--panel2': '#f7ebe0',
  '--text': '#53382b',
  '--sub': '#9c6a5e',
  '--border': '#eeddcb',
  '--accent': '#c9a24b',
  '--accent2': '#cf8a60',
  '--good': '#4c9a67',
  '--bad': '#c25b4e',
  '--rose': '#c97a8e',
  '--rosehair': '#dcc0cb',
  '--gold2': '#e6c67d',
  '--gold3': '#9a6b1f',
  '--goldm': '#ad7f2e',
  '--ongold': '#3a2a14',
  '--glow': 'rgba(201,162,75,.32)',
  '--glowA': 'rgba(238,196,168,.34)',
  '--glowB': 'rgba(219,183,116,.20)',
  '--glass': 'rgba(255,255,255,.58)',
  '--glassbd': 'rgba(178,124,96,.16)',
  '--fieldbg': 'rgba(255,255,255,.5)',
  '--shadow': '0 10px 34px rgba(163,113,84,.10)',
  '--g1': '#9a6b1f', '--g2': '#e6c67d', '--g3': '#eed9a3',
  '--g4': '#d9a45b', '--g5': '#c9a24b', '--g6': '#f3dfae',
  '--b1': '#b98a3a', '--b2': '#e9c987', '--b3': '#fff3d6',
  '--b4': '#e2b96a', '--b5': '#c9a24b', '--b6': '#e9c987',
  '--o1': '#fff8ea', '--o2': '#f0cf92', '--o3': '#cf9752', '--o4': '#a8701a',
  '--dr1': '#cf9752', '--dr2': '#f8e7c0',
  '--tBS': 'rgba(190,140,60,.38)', '--tBS2': 'rgba(190,140,60,.5)', '--tBSb': 'rgba(168,124,30,.38)',
  '--tOG': 'rgba(214,164,96,.5)', '--tOGh': 'rgba(214,164,96,.68)',
  '--selfg': '#a05a70',
  '--selwash1': 'rgba(201,122,142,.14)', '--selwash2': 'rgba(201,162,75,.12)',
  '--selglow': 'rgba(201,122,142,.38)',
};

export const dark: ThemeTokens = {
  '--bg': '#181114',
  '--panel': '#221920',
  '--panel2': '#2c2127',
  '--text': '#f5e9dd',
  '--sub': '#c8a48f',
  '--border': '#3a2c31',
  '--accent': '#d9b36a',
  '--accent2': '#e09a6f',
  '--good': '#72c18e',
  '--bad': '#e08573',
  '--rose': '#dfa6b4',
  '--rosehair': '#4a353c',
  '--gold2': '#e8c87e',
  '--gold3': '#8a5f18',
  '--goldm': '#c39a4a',
  '--ongold': '#2c1e0c',
  '--glow': 'rgba(217,179,106,.30)',
  '--glowA': 'rgba(217,179,106,.10)',
  '--glowB': 'rgba(224,154,111,.08)',
  '--glass': 'rgba(38,28,33,.55)',
  '--glassbd': 'rgba(233,196,160,.12)',
  '--fieldbg': 'rgba(255,255,255,.05)',
  '--shadow': '0 10px 34px rgba(0,0,0,.38)',
  '--g1': '#8a5f18', '--g2': '#e8c87e', '--g3': '#f4e3b0',
  '--g4': '#d9a45b', '--g5': '#d9b36a', '--g6': '#f3dfae',
  '--b1': '#8a5f18', '--b2': '#e8c87e', '--b3': '#fff3d6',
  '--b4': '#dda869', '--b5': '#d9b36a', '--b6': '#e8c87e',
  '--o1': '#fff8ea', '--o2': '#f0cf92', '--o3': '#d9a45b', '--o4': '#8a5f18',
  '--dr1': '#d9a45b', '--dr2': '#f8e7c0',
  '--tBS': 'rgba(217,179,106,.32)', '--tBS2': 'rgba(217,179,106,.48)', '--tBSb': 'rgba(233,196,160,.3)',
  '--tOG': 'rgba(217,179,106,.45)', '--tOGh': 'rgba(217,179,106,.62)',
  '--selfg': '#dfa6b4',
  '--selwash1': 'rgba(223,166,180,.12)', '--selwash2': 'rgba(217,179,106,.10)',
  '--selglow': 'rgba(223,166,180,.30)',
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
