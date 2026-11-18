// port/shareable.ts — the shareables (slice 5, built for real): ONE self-contained HTML file per
// stage (draft brag / week brag / season brag / bracket brag / awards brag). Each card carries its
// provenance stamp (seed · gameSeed where a game is named · the engine stamp), inlines its styles,
// inlines NO external resources (no CDN, no network, no Google fonts) and opens from vanilla file://.
// The card is built as a string in plain TS (framework-free), so node can render and gate it too.
import { abbrOf } from './abbr.ts';
import { inkOf } from './ink.ts';

export type ShareStage = 'draft' | 'week' | 'season' | 'bracket' | 'awards';

export interface ShareCard {
  stage: ShareStage;
  title: string;            // 'DRAFT NIGHT' / 'WEEK 7 BRAG' / ...
  lines: string[];          // the plain informative brag lines (integers; no promises)
  stamp: string;            // the provenance stamp line
  teamName: string | null;  // the [data-zpbteam]-equivalent accent for the card
}

const CSS = `
  :root { color-scheme: light dark; }
  body { margin:0; padding:18px; background:#1e1119; color:#f2e7d5; font-family: Georgia, 'Times New Roman', serif; }
  .card { max-width:420px; margin:0 auto; border:1px solid #c39a4a; border-radius:14px; padding:22px;
          background:linear-gradient(160deg,#291a24,#1e1119); }
  .h { font-size:1.5rem; letter-spacing:.1em; color:#e8c87e; font-weight:800; margin:0 0 4px; }
  .t { font-size:.66rem; letter-spacing:.2em; color:#c99cae; margin:0 0 12px; }
  .l { font-size:.95rem; color:#f2e7d5; margin:6px 0; }
  .l b { color:#e8c87e; font-variant-numeric: tabular-nums; }
  .stamp { margin-top:14px; padding-top:10px; border-top:1px dashed #4a3040; font-size:.62rem;
           letter-spacing:.08em; color:#c99cae; }
  .ink { color:#e8c87e; }
  @media (max-width:390px){ body{padding:10px} .card{padding:16px} }
  @media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }
`;

function cardHTML(c: ShareCard, accent: string): string {
  const lines = c.lines
    .map((l) => `<p class="l">${l}</p>`)
    .join('\n      ');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>76 Pancakes · ${c.title}</title>
<style>
${CSS}
  .card { border-color: ${accent}; }
</style>
</head>
<body>
  <section class="card" aria-label="${c.title}">
    <h1 class="h">${c.title}</h1>
    <p class="t">${c.teamName ? c.teamName.toUpperCase() + ' · ' : ''}76 PANCAKES</p>
    ${lines}
    <p class="stamp">${c.stamp}</p>
  </section>
</body>
</html>
`;
}

const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function draftBrag(opts: { teamName: string; seed: number; picks: number; mine: number; bestPick: string; bestWins: string; engine: string }): ShareCard {
  return {
    stage: 'draft', title: 'DRAFT NIGHT', teamName: opts.teamName,
    lines: [
      `I drafted the <b>${esc(opts.teamName)}</b> from slot one of the board.`,
      `<b>${opts.picks}</b> picks in the league, <b>${opts.mine}</b> of them mine.`,
      `Best of my class: <span class="ink">${esc(opts.bestPick)}</span> at <b>${opts.bestWins}</b> wins.`,
    ],
    stamp: `seed ${opts.seed} · engine ${opts.engine} · played by the pinned engine`,
  };
}

export function weekBrag(opts: { teamName: string; week: number; label: string; home: string; away: string; hs: number; as: number; meHome: boolean; gs: number; engine: string }): ShareCard {
  const myScore = opts.meHome ? opts.hs : opts.as;
  const theirScore = opts.meHome ? opts.as : opts.hs;
  const won = myScore > theirScore;
  const oppName = opts.meHome ? opts.away : opts.home;
  return {
    stage: 'week', title: `WEEK ${opts.week} BRAG`, teamName: opts.teamName,
    lines: [
      `${won ? 'I beat' : myScore === theirScore ? 'I tied' : 'I fell to'} the <b>${esc(abbrOf(oppName))} ${esc(oppName)}</b> <b>${myScore}—${theirScore}</b> in ${esc(opts.label)}.`,
      won ? `The board says you called it: the run continues.` : `A stumble, not an ending — the season is long.`,
    ],
    stamp: `gameSeed ${opts.gs} · week ${opts.week} · ${opts.away} @ ${opts.home} · engine ${opts.engine} · played by the pinned engine`,
  };
}

export function seasonBrag(opts: { teamName: string; w: number; l: number; t: number; pf: number; champion: string; iChampion: boolean; engine: string }): ShareCard {
  return {
    stage: 'season', title: 'THE SEASON', teamName: opts.teamName,
    lines: [
      opts.iChampion
        ? `The <b>${esc(opts.teamName)}</b> are Super Bowl champions. <b>${opts.w}-${opts.l}${opts.t ? '-' + opts.t : ''}</b>, <b>${opts.pf}</b> points scored.`
        : `The <b>${opts.w}-${opts.l}${opts.t ? '-' + opts.t : ''}</b> season is in the book — <b>${opts.pf}</b> points scored.`,
      opts.champion && !opts.iChampion ? `The year belongs to the <b>${esc(opts.champion)}</b>.` : '',
    ].filter(Boolean),
    stamp: `engine ${opts.engine} · played by the pinned engine`,
  };
}

export function bracketBrag(opts: { teamName: string; madeIt: boolean; lastRound: string | null; champion: string; iChampion: boolean; engine: string }): ShareCard {
  return {
    stage: 'bracket', title: 'THE RUN', teamName: opts.teamName,
    lines: [
      opts.iChampion
        ? `Wild Card. Divisional. Conference. <b>Super Bowl champions.</b>`
        : opts.madeIt
          ? `The run ended in the <b>${esc(opts.lastRound ?? 'Wild Card')}</b>.`
          : `The playoffs went on without me this year.`,
      opts.champion ? `The bracket crowns the <b>${esc(opts.champion)}</b>.` : '',
    ].filter(Boolean),
    stamp: `engine ${opts.engine} · played by the pinned engine`,
  };
}

export function awardsBrag(opts: { teamName: string; mvp: string; mvpLine: string; engine: string }): ShareCard {
  return {
    stage: 'awards', title: 'THE AWARDS', teamName: opts.teamName,
    lines: [
      `The season's Most Valuable Player: <span class="ink">${esc(opts.mvp)}</span>.`,
      opts.mvpLine ? `<span class="cp-sub">${esc(opts.mvpLine)}</span>` : '',
    ].filter(Boolean),
    stamp: `engine ${opts.engine} · played by the pinned engine`,
  };
}

export function renderShare(c: ShareCard): string {
  const accent = c.teamName ? inkOf(c.teamName).ink : '#c39a4a';
  return cardHTML(c, accent);
}
// downloadShare moved to bindings/shareDownload.ts (the P-368 split): the DOM (Blob/anchor) is a
// browser binding, not port — the card builder here is pure TS and node-testable.
