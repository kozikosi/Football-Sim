// Dev page: one game on the real pools pack (data/packs/nfl-pools-fit2016-2022.json), shown as a box score. Framework-free on purpose: the framework verdict is the
// council's and the Owner's, and this page only has to prove the product BUILDS and that the engine runs in a browser, end to end (pack -> keyed draws -> event log -> fold -> view).
// Not the product UI. Plain DOM, textContent only (no HTML is ever built from data). The pack is a separate asset fetched at runtime, not inlined in the script.
import packUrl from '../../data/packs/nfl-pools-fit2016-2022.json?url';
import { makePack } from './core/pack.ts';
import type { PackBody } from './core/pack.ts';
import { gameKeyOf } from './core/keyedrng.ts';
import { loadPools } from './sports/nfl/sim/pools.ts';
import type { Pools } from './sports/nfl/sim/pools.ts';
import { runGame } from './sports/nfl/sim/game.ts';
import { gameView } from './sports/nfl/view/gameView.ts';
import type { GameView, TeamLine } from './sports/nfl/view/gameView.ts';

const css = `
body{font:15px/1.45 system-ui,sans-serif;margin:0;padding:16px;max-width:960px;margin-inline:auto;color:#1b1b1f;background:#fff}
@media (prefers-color-scheme:dark){body{color:#e8e8ec;background:#16161a}th{background:#24242b}td,th{border-color:#34343c}}
h1{font-size:20px;margin:0 0 4px}h2{font-size:16px;margin:20px 0 6px}.meta{color:#767680;font-size:13px}
form{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}input,button{font:inherit;padding:6px 10px}
table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}td,th{border:1px solid #d9d9df;padding:4px 8px;text-align:right}
th{background:#f1f1f5;font-weight:600}td:first-child,th:first-child{text-align:left}.wrap{overflow-x:auto}
.final{font-size:28px;font-weight:700;margin:8px 0}`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, text = '', cls = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag); if (text !== '') e.textContent = text; if (cls !== '') e.className = cls; return e;
}
function table(head: string[], rows: (string | number)[][]): HTMLElement {
  const wrap = el('div', '', 'wrap'), t = el('table'), h = el('tr');
  for (const c of head) h.append(el('th', c));
  t.append(h);
  for (const r of rows) { const tr = el('tr'); for (const c of r) tr.append(el('td', String(c))); t.append(tr); }
  wrap.append(t); return wrap;
}
const secs = (s: number): string => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function render(into: HTMLElement, v: GameView, pack: { id: string; hash: string }, seed: string): void {
  into.replaceChildren();
  const [a, b] = v.teams;
  if (a === undefined || b === undefined) throw new Error('no teams');
  into.append(el('div', `${a.team} ${v.final[a.team]}  -  ${b.team} ${v.final[b.team]}${v.overtime ? '  (OT)' : ''}`, 'final'));
  into.append(el('div', `seed "${seed}" · pack ${pack.id} ${pack.hash} · ${v.events} events · log ${v.logHash}`, 'meta'));
  into.append(el('h2', 'Team totals'));
  const lines: [string, (t: TeamLine) => string | number][] = [
    ['Points', (t) => t.points], ['Drives', (t) => t.drives], ['Plays', (t) => t.plays], ['Offensive plays', (t) => t.off_plays],
    ['Pass att / comp', (t) => `${t.pass_att} / ${t.completions}`], ['Rush att', (t) => t.rush_att], ['Net yards', (t) => t.yards],
    ['Pass yards', (t) => t.passYards], ['Rush yards', (t) => t.rushYards], ['Sacks taken', (t) => t.sacks], ['Giveaways', (t) => t.giveaways], ['Time of possession', (t) => secs(t.top_dt)],
  ];
  into.append(table(['', a.team, b.team], lines.map(([n, f]) => [n, f(a), f(b)])));
  into.append(el('h2', 'Scoring'));
  into.append(table(['When', 'Team', 'Play', 'Pts', `${a.team}`, `${b.team}`], v.scoring.map((s) => [s.when, s.team, s.tryText === '' ? s.kind : `${s.kind}, ${s.tryText}`, s.points, s.away, s.home])));
  into.append(el('h2', 'Drives'));
  into.append(table(['#', 'Team', 'Start', 'Plays', 'Yards', 'Time', 'Result'], v.drives.map((d) => [d.n, d.team, d.start, d.plays, d.yards, secs(d.secs), d.result])));
}

async function main(): Promise<void> {
  const style = el('style', css); document.head.append(style);
  document.title = '20-0 · engine dev page';
  const root = document.getElementById('app');
  if (root === null) throw new Error('no #app');
  root.append(el('h1', '20-0 · engine dev page'), el('div', 'One game on the real pools pack. Same seed, same game, on any machine. A dev page, not the product UI.', 'meta'));
  const out = el('div'); out.append(el('p', 'Loading the pack (4.6 MB, about 0.5 MB gzipped)...'));
  const form = el('form'), seedBox = el('input'), go = el('button', 'Play');
  seedBox.value = 'dev-1'; seedBox.setAttribute('aria-label', 'seed'); go.type = 'submit'; go.disabled = true;
  form.append(seedBox, go); root.append(form, out);
  let pools: Pools, pack: { id: string; hash: string };
  try {
    const res = await fetch(packUrl);
    if (!res.ok) throw new Error(`pack fetch failed: HTTP ${res.status}`);
    const made = makePack(JSON.parse(await res.text()) as PackBody);
    pools = loadPools(made); pack = { id: made.id, hash: made.hash };
  } catch (err) { out.replaceChildren(el('p', 'Could not load the pack: ' + (err instanceof Error ? err.message : String(err)))); return; }
  const play = (): void => { const seed = seedBox.value.trim() || 'dev-1'; render(out, gameView(runGame(pools, gameKeyOf(seed))), pack, seed); };
  form.addEventListener('submit', (e) => { e.preventDefault(); play(); });
  go.disabled = false; play();
}
void main();
