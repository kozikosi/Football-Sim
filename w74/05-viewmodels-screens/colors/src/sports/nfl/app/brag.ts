// Brag shareables (w74 item 5d, Z.ai DRAFT — N2). Static, self-contained shareable images/summaries from a save
// envelope. NO replay URLs and NO seed-of-the-world leak: Kosi does not want replay URLs (standing ruling), so a
// brag is a PICTURE + TEXT of what happened, never a pointer to reproduce it (the seed card / seed-share items
// are the deliberate-sharing half; the brag is the poster half).
//
// Pure string builders: no DOM, no canvas, no fonts to load (SVG uses system fonts), so a service worker can
// pre-render none of it and the screen can generate it on click into a Blob the user downloads/copies.
import type { SeasonEnvelope, WeekEnvelope, AnyEnvelope } from './saves.ts';
import { hash53 } from '../../../core/hash.ts';

export interface BragVM {
  kind: 'champion' | 'super-bowl-loss' | 'playoffs' | 'season';
  headline: string;        // "SUPER BOWL CHAMPIONS"
  team: string;
  record: string;
  lines: string[];         // 2–4 short brag lines
  digest: string;          // the save's own hash: "save 3f91…c2" — proof this card came from that save
  svg: string;             // a 1080x1350 shareable poster as an SVG string
}

const outcomeKind = (o: string): BragVM['kind'] =>
  o === 'champion' ? 'champion' : o === 'super-bowl-loss' ? 'super-bowl-loss' : o === 'missed-playoffs' ? 'season' : 'playoffs';

const HEADLINES: Record<BragVM['kind'], string> = {
  champion: 'SUPER BOWL CHAMPIONS',
  'super-bowl-loss': 'NFC/AFC CHAMPIONS',      // lost the SB: conference champion
  playoffs: 'PLAYOFFS',
  season: 'SEASON COMPLETE',
};

export function bragFromSeason(env: SeasonEnvelope): BragVM {
  const p = env.payload;
  const kind = outcomeKind(p.userOutcome);
  const w = p.table.find((r) => r.team === p.userTeam);
  const record = w ? `${w.w}-${w.l}${w.t ? `-${w.t}` : ''}` : '—';
  const lines = [
    kind === 'champion' ? `${p.userTeam} win Super Bowl ${p.year}.` : kind === 'super-bowl-loss' ? `${p.userTeam} fall in Super Bowl ${p.year}.` : `${p.userTeam}, ${p.year}.`,
    `Record ${record}.`,
    p.run > 0 ? `Run-it-back #${p.run + 1}.` : 'First run.',
  ];
  return {
    kind, headline: HEADLINES[kind], team: p.userTeam, record, lines,
    digest: 'save ' + String(hash53(JSON.stringify(p))).slice(0, 4) + '…' + String(hash53(JSON.stringify(p))).slice(-2),
    svg: poster(HEADLINES[kind], p.userTeam, record, lines),
  };
}

// A week-save brag: "you are 7-2 and lead the division" — the mid-season poster.
export function bragFromWeek(env: WeekEnvelope): BragVM {
  const p = env.payload;
  const mine = p.scores.filter((g) => !g.round && (g.home === p.userTeam || g.away === p.userTeam));
  const w = mine.filter((g) => (g.home === p.userTeam ? g.hs > g.as : g.as > g.hs)).length;
  const l = mine.length - w;
  const lines = [`${p.userTeam}, ${p.year}: ${w}-${l} through week ${p.nextWeek - 1}.`, `Run-it-back #${p.run + 1}.`, 'The rest of the season is still to play.'];
  const kind: BragVM['kind'] = w > l ? 'playoffs' : 'season';
  return {
    kind, headline: HEADLINES[kind], team: p.userTeam, record: `${w}-${l}`, lines,
    digest: 'save ' + String(hash53(JSON.stringify(p))).slice(0, 4) + '…' + String(hash53(JSON.stringify(p))).slice(-2),
    svg: poster(HEADLINES[kind], p.userTeam, `${w}-${l}`, lines),
  };
}

export function bragFromAny(env: AnyEnvelope): BragVM | null {
  return env.kind === 'season' ? bragFromSeason(env) : env.kind === 'week' ? bragFromWeek(env) : null;   // a draft has nothing to brag about yet
}

function poster(headline: string, team: string, record: string, lines: string[]): string {
  const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const body = lines.map((l, i) => `<text x="60" y="${760 + i * 70}" font-size="44" fill="#f2f2f2">${esc(l)}</text>`).join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="#101820"/>
  <text x="60" y="220" font-size="72" font-weight="700" fill="#FFB612" font-family="system-ui, sans-serif">${esc(headline)}</text>
  <text x="60" y="560" font-size="96" font-weight="800" fill="#ffffff" font-family="system-ui, sans-serif">${esc(team)}</text>
  <text x="60" y="660" font-size="64" fill="#BFC0BF" font-family="system-ui, sans-serif">${esc(record)}</text>
  ${body}
  <text x="60" y="1280" font-size="30" fill="#66707a" font-family="system-ui, sans-serif">${esc('Colors — a football drafting game')}</text>
</svg>`;
}
