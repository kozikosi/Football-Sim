// Cost per save write/read: JSON stringify+parse of the three real payloads (proxy for the synchronous
// localStorage.setItem cost, which is stringify + native string write). Plus base64+gzip overhead check.
import fs from 'node:fs';
import { gzipSync, gunzipSync } from 'node:zlib';
import { buildPool } from '../../../colors/src/sports/nfl/engine/players.ts';
import { makeRng } from '../../../colors/src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, cpuChoose, applyPick } from '../../../colors/src/sports/nfl/engine/draft.ts';
import type { SlotId } from '../../../colors/src/sports/nfl/engine/slots.ts';

const D = new URL('../../../data/nfl/', import.meta.url).pathname;
const pool = buildPool(fs.readFileSync(`${D}/madden27-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/free-agents-old-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/player-ids.csv`, 'utf8'));
const rng = makeRng(2026);
const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
while (st.pos < st.order.length) { const t = st.order[st.pos]; const c = cpuChoose(st, t, rng.fork('p' + st.pos)); applyPick(st, t, c.player, c.slot as SlotId); }
const draftPayload = { seed: 2026, userTeam: 7, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })), pool: pool.filter((p) => p.role !== 'LS').map((p) => [p.id, p.name, p.pos, p.team, p.ovr, p.spd, p.str, p.freeAgent ? 1 : 0]) };
const s = JSON.stringify(draftPayload);

const time = (f: () => void, n = 200) => { const t0 = process.hrtime.bigint(); for (let i = 0; i < n; i++) f(); return Number(process.hrtime.bigint() - t0) / 1e6 / n; };
const strMs = time(() => JSON.stringify(draftPayload));
const parMs = time(() => JSON.parse(s));
const gzMs = time(() => gzipSync(Buffer.from(s)));
const ungzMs = time(() => gunzipSync(gzipSync(Buffer.from(s))));
const b64 = Buffer.from(gzipSync(Buffer.from(s))).toString('base64');
console.log(`draft payload ${s.length} bytes:`);
console.log(`  JSON.stringify : ${strMs.toFixed(2)} ms`);
console.log(`  JSON.parse     : ${parMs.toFixed(2)} ms`);
console.log(`  gzipSync       : ${gzMs.toFixed(2)} ms | gunzip: ${ungzMs.toFixed(2)} ms | base64 inflates to ${b64.length} bytes (${((b64.length / s.length - 1) * 100).toFixed(0)}% over raw)`);
console.log(`  worst-case sync write (stringify+native setItem ~1-2 ms) ≈ ${(strMs + 1.5).toFixed(1)} ms on the main thread`);
