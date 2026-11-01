// Color math for the franchise takeover. Faithful port of Z.ai's w52
// (zpbHsl, zpbFromHsl, zpbMix, zpbReadable, zpbContrast, zpbShade, zpbTint,
// zpbRgba, zpbSoft, zpbRgb, zpbHex, zpbLum + zpbPackFor with its inner goldTone
// and the w44/w45/w47 halfway-ink laws). COPY-PASTE-KIT-w52.md #2.
// Lifted with Z.ai's blessing (2026-11-01); credit in CHANGELOG. Framework-free.

export interface Hsl { h: number; s: number; l: number }

export function rgb(hex: string): [number, number, number] {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}

export function hsl(hexStr: string): Hsl {
  const [r, g, b] = rgb(hexStr).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function fromHsl(H: number, S: number, L: number): string {
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const X = c * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - c / 2;
  let r: number, g: number, b: number;
  if (H < 60) { r = c; g = X; b = 0; }
  else if (H < 120) { r = X; g = c; b = 0; }
  else if (H < 180) { r = 0; g = c; b = X; }
  else if (H < 240) { r = 0; g = X; b = c; }
  else if (H < 300) { r = X; g = 0; b = c; }
  else { r = c; g = 0; b = X; }
  return hex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function lum(hexStr: string): number {
  return rgb(hexStr)
    .map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
    .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
}

export function contrast(a: string, b: string): number {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function mix(a: string, b: string, t: number): string {
  const A = rgb(a), B = rgb(b);
  return hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
}

// Nudge hex toward/away from bg until it hits the contrast target.
export function readable(hexStr: string, bg: string, darkMode: boolean, target: number): string {
  const c = hsl(hexStr);
  const s = Math.max(c.s, 0.42);
  let l = c.l;
  for (let i = 0; i < 90; i++) {
    const out = fromHsl(c.h, s, l);
    if (contrast(out, bg) >= target) break;
    if (!darkMode) { if (l <= 0.15) break; l -= 0.015; }
    else { if (l >= 0.9) break; l += 0.015; }
  }
  return fromHsl(c.h, s, l);
}

export function shade(hexStr: string, t: number): string {
  const c = hsl(hexStr);
  return fromHsl(c.h, Math.min(1, Math.max(c.s, 0.42)), Math.max(0.16, c.l - t));
}

export function tint(hexStr: string, t: number): string {
  const c = hsl(hexStr);
  return fromHsl(c.h, Math.min(1, Math.max(c.s, 0.3)), Math.min(0.88, c.l + t));
}

export function rgba(hexStr: string, a: number): string {
  const [r, g, b] = rgb(hexStr);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export function soft(hexStr: string, bg: string): string {
  const c = hsl(hexStr);
  let l = Math.max(c.l, 0.3);
  const s = Math.max(c.s, 0.4);
  let out = fromHsl(c.h, s, l);
  for (let i = 0; i < 60 && contrast(out, bg) > 4.9; i++) { l += 0.02; out = fromHsl(c.h, s, l); }
  return out;
}
