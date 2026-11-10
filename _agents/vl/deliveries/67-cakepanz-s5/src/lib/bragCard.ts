// Slice 5 — the brag card + seed card PAINTER: plain JSON (the shareVM shapes) -> a static PNG.
// The canvas re-derives its layout from the SAME view-model the DOM card renders — one data source,
// two surfaces, nothing drawn that the engine did not say. Static by construction: the PNG carries the
// result and the proof inside its bytes (no link back into the app, nothing fetched, nothing remote).
// Presentation only: the inks are the snapshot's own TEAM_COLORS (via ink.ts), resolved for canvas —
// the DOM's color-mix() form is mixed here with the same formula (hex ratio blend), no engine edits.
import type { BragVM, SeedVM, BragFact } from './shareVM.ts';

const BG = '#181114', GLASSBD = '#3a2c31', GOLD = '#d9a94c', GOLDL = '#e8c87e';
const TEXT = '#f5e9dd', SUB = '#c8a48f', GLASS = 'rgba(245, 233, 221, 0.04)';
const W = 1200, H = 675;

/** '#aabbcc' -> itself; 'color-mix(in srgb, #x 55%, #y)' -> the same blend the DOM renders. */
function resolveColor(c: string): string {
  if (!c.startsWith('color-mix')) return c;
  const m = c.match(/color-mix\(in srgb,\s*(#[0-9a-fA-F]+)\s+([\d.]+)%,\s*(#[0-9a-fA-F]+)\)/);
  if (!m) return TEXT;
  const p = Number(m[2]) / 100;
  const a = m[1], b = m[3];
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const out = [0, 1, 2].map((i) => Math.round(ch(a, i) * p + ch(b, i) * (1 - p)));
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('');
}

const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = 'ui-monospace, Menlo, Consolas, monospace';

function frame(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = GLASSBD; ctx.lineWidth = 1; ctx.strokeRect(16.5, 16.5, W - 33, H - 33);
  ctx.fillStyle = GOLD; ctx.fillRect(W / 2 - 60, 42, 120, 3);   // the gold rule
}

function tracked(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, ls: number): void {
  // centered letter-spaced text (per-char draw; deterministic, no ctx.letterSpacing dependency)
  const widths = [...text].map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + ls * Math.max(0, text.length - 1);
  let cur = x - total / 2;
  [...text].forEach((ch, i) => { ctx.fillText(ch, cur, y); cur += widths[i] + ls; });
  return void widths;
}

function chip(ctx: CanvasRenderingContext2D, f: BragFact, x: number, y: number): number {
  const lt = `${f.label} `;
  const lw = ctx.measureText(lt.toUpperCase()).width;
  ctx.font = `800 19px ${SERIF}`;
  const vw = ctx.measureText(f.value).width;
  const w = lw + vw + 30, h = 40;
  ctx.fillStyle = GLASS; ctx.strokeStyle = GLASSBD; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(x, y - h + 8, w, h, 10); ctx.fill(); ctx.stroke();
  ctx.textAlign = 'left';
  ctx.fillStyle = SUB; ctx.font = `800 13px ${SERIF}`; ctx.fillText(lt.toUpperCase(), x + 15, y);
  ctx.fillStyle = TEXT; ctx.font = `800 19px ${SERIF}`; ctx.fillText(f.value, x + 15 + lw, y);
  return w;
}

function proofBlock(ctx: CanvasRenderingContext2D, proof: BragFact[], y0: number): void {
  ctx.font = `15px ${MONO}`;
  const lines = proof.map((f) => ({ f, text: `${f.label}: ${f.value}` }));
  const widest = Math.max(...lines.map((l) => ctx.measureText(l.text).width));
  let y = y0;
  for (const l of lines) {
    const x = W / 2 - widest / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = SUB; ctx.fillText(l.f.label + ':', x, y);
    const lw = ctx.measureText(l.f.label + ': ').width;
    ctx.fillStyle = TEXT; ctx.fillText(l.f.value, x + lw, y);
    y += 28;
  }
}

export function drawBrag(ctx: CanvasRenderingContext2D, vm: BragVM): void {
  frame(ctx);
  ctx.textBaseline = 'alphabetic';
  // eyebrow
  ctx.fillStyle = SUB; ctx.font = `800 19px ${SERIF}`; ctx.textAlign = 'left';
  tracked(ctx, vm.eyebrow, W / 2, 92, 5);
  // headline — the user's segment in the team ink, the opponent's in its own (game kind)
  const segs = vm.headline.split(' · ');
  const meInk = resolveColor(vm.teamInk.pale);
  const yHead = 208;
  ctx.font = `800 78px ${SERIF}`;
  if (segs.length === 2) {
    const oppInk = resolveColor(vm.headlineInks.opp || TEXT);
    const w1 = ctx.measureText(segs[0]).width, w2 = ctx.measureText(segs[1]).width;
    const wd = ctx.measureText(' · ').width;
    let x = W / 2 - (w1 + wd + w2) / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = meInk; ctx.fillText(segs[0], x, yHead);
    ctx.fillStyle = SUB; ctx.fillText(' · ', x + w1, yHead);
    ctx.fillStyle = oppInk; ctx.fillText(segs[1], x + w1 + wd, yHead);
  } else {
    ctx.textAlign = 'center'; ctx.fillStyle = meInk; ctx.fillText(vm.headline, W / 2, yHead);
  }
  // outcome
  ctx.fillStyle = GOLDL; ctx.font = `800 25px ${SERIF}`; ctx.textAlign = 'left';
  tracked(ctx, vm.outcome, W / 2, 262, 3);
  // facts chips, centered as a group
  ctx.font = `800 19px ${SERIF}`;
  const widths = vm.facts.map((f) => {
    ctx.font = `800 13px ${SERIF}`;
    const lw = ctx.measureText(f.label.toUpperCase() + ' ').width;
    ctx.font = `800 19px ${SERIF}`;
    return lw + ctx.measureText(f.value).width + 30;
  });
  const totalW = widths.reduce((a, b) => a + b, 0) + 12 * (widths.length - 1);
  let x = W / 2 - totalW / 2;
  vm.facts.forEach((f, i) => { x += chip(ctx, f, x, 356) + 12; return void widths[i]; });
  // proof
  proofBlock(ctx, vm.proof, 462);
  // foot
  ctx.fillStyle = SUB; ctx.font = `italic 16px ${SERIF}`; ctx.textAlign = 'center';
  ctx.fillText(vm.foot, W / 2, 640);
}

export function drawSeed(ctx: CanvasRenderingContext2D, seed: SeedVM): void {
  frame(ctx);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = SUB; ctx.font = `800 19px ${SERIF}`; ctx.textAlign = 'left';
  tracked(ctx, '76 PANCAKES · THE SEED CARD', W / 2, 92, 5);
  ctx.fillStyle = TEXT; ctx.font = `800 27px ${SERIF}`; ctx.textAlign = 'center';
  ctx.fillText(seed.title, W / 2, 138);
  // the seed, big — the artifact's number
  ctx.fillStyle = SUB; ctx.font = `800 17px ${SERIF}`;
  tracked(ctx, seed.seedLabel.toUpperCase(), W / 2, 208, 4);
  ctx.fillStyle = GOLD; ctx.font = `900 104px ${SERIF}`; ctx.textAlign = 'center';
  ctx.fillText(seed.seedValue, W / 2, 306);
  // what the engine derives from it
  ctx.fillStyle = SUB; ctx.font = `800 14px ${SERIF}`;
  tracked(ctx, seed.derivedLabel.toUpperCase(), W / 2, 348, 3);
  ctx.fillStyle = TEXT; ctx.font = `17px ${SERIF}`; ctx.textAlign = 'center';
  ctx.fillText(seed.derivedValue, W / 2, 376);
  // the replay recipe
  ctx.textAlign = 'left'; ctx.font = `17px ${SERIF}`;
  let y = 428;
  for (const s of seed.steps) {
    ctx.fillStyle = GOLDL; ctx.fillText('—', W / 2 - 330, y);
    ctx.fillStyle = TEXT; ctx.fillText(s, W / 2 - 306, y);
    y += 30;
  }
  // provenance
  ctx.font = `15px ${MONO}`;
  let py = y + 18;
  for (const f of seed.provenance) {
    ctx.textAlign = 'left';
    ctx.fillStyle = SUB; ctx.fillText(f.label + ':', W / 2 - 330, py);
    ctx.fillStyle = TEXT; ctx.fillText(f.value, W / 2 - 330 + ctx.measureText(f.label + ': ').width, py);
    py += 24;
  }
  ctx.fillStyle = SUB; ctx.font = `italic 16px ${SERIF}`; ctx.textAlign = 'center';
  ctx.fillText(seed.foot, W / 2, 640);
}

function toPng(draw: (ctx: CanvasRenderingContext2D) => void): Promise<Blob> {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx) return Promise.reject(new Error('the canvas is unavailable'));
  draw(ctx);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('the canvas refused the PNG'))), 'image/png'));
}

export const bragPng = (vm: BragVM): Promise<Blob> => toPng((ctx) => drawBrag(ctx, vm));
export const seedPng = (seed: SeedVM): Promise<Blob> => toPng((ctx) => drawSeed(ctx, seed));
