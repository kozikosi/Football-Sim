#!/usr/bin/env node
/* p333-keypairs.mjs — the fitted formula's price for the Owner-protected pairs (report input). */
import { readFileSync } from 'node:fs';
import { fieldSlots, WEIGHT, SLOT_IDS } from '../football-sim-vue/src/engine/sports/nfl/engine/slots.ts';
import { buildPool } from '../football-sim-vue/src/engine/sports/nfl/engine/players.ts';

const REPO = new URL('..', import.meta.url).pathname + 'football-sim-vue';
const POOL = buildPool(
  readFileSync(`${REPO}/src/data/madden27-ratings.csv`, 'utf8'),
  readFileSync(`${REPO}/src/data/free-agents-old-ratings.csv`, 'utf8'),
  readFileSync(`${REPO}/src/data/player-ids.csv`, 'utf8'),
);
const C = {};
for (const p of POOL) (C[p.role] ??= { s: [], t: [] });
for (const p of POOL) { C[p.role].s.push(p.spd); C[p.role].t.push(p.str); }
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const c = Object.fromEntries(Object.entries(C).map(([r, v]) => [r, { spd: mean(v.s), str: mean(v.t) }]));
const ROLED = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' };
const ro = (x) => ROLED[x] ?? x;
const LIVE = { QB: { FS: 12 }, RB: { FB: 0, WR: 12, TE: 6, SS: 12, FS: 12 }, FB: { RB: 2, TE: 6 }, WR: { RB: 6, TE: 6, CB: 6, FS: 6, SS: 6, NICKEL: 6, DIME: 6 }, TE: { FB: 0, WR: 12, RB: 6, C: 6, OG: 6, OT: 12, EDGE: 12, DT: 12, OLB: 6, ILB: 12, SS: 6, FS: 12, NICKEL: 6, DIME: 12 }, OT: { OG: 0, C: 2, DT: 6, EDGE: 6, FB: 0 }, OG: { OT: 2, C: 2, DT: 6, EDGE: 6, FB: 0 }, C: { OG: 6, OT: 12, DT: 12, FB: 0 }, DT: { EDGE: 6, C: 6, OG: 6, OT: 6, FB: 0 }, EDGE: { DT: 0, OLB: 0, ILB: 6, C: 6, OG: 6, OT: 6, SS: 12, RB: 6, FB: 0, TE: 6, NICKEL: 6 }, ILB: { ILB: 0, OLB: 0, EDGE: 12, FS: 12, SS: 2, FB: 0, TE: 6, NICKEL: 6, DIME: 12 }, OLB: { OLB: 0, ILB: 6, EDGE: 12, FS: 12, SS: 6, FB: 0, TE: 6, NICKEL: 6, DIME: 12 }, SS: { NICKEL: 0, DIME: 0, FS: 2, CB: 6, WR: 12, ILB: 6, OLB: 2, RB: 12, TE: 6 }, FS: { NICKEL: 0, DIME: 0, SS: 2, CB: 6, WR: 12, OLB: 6 }, CB: { FS: 0, NICKEL: 0, DIME: 0, SS: 0, WR: 6 }, K: { P: 2 }, P: { K: 2 }, LS: {} };
const PAIRS = Object.entries(LIVE).flatMap(([r, ds]) => Object.keys(ds).map((d) => [r, d]));
let DMAX = 0;
const raw = {};
for (const [r, d] of PAIRS) { raw[`${r}>${d}`] = Math.hypot(c[ro(r)].spd - c[ro(d)].spd, c[ro(r)].str - c[ro(d)].str); DMAX = Math.max(DMAX, raw[`${r}>${d}`]); }
const DW = {};
for (const s of SLOT_IDS) { const dest = fieldSlots('4-3').find((f) => f.slot === s).dest; DW[dest] = Math.max(DW[dest] ?? 0, WEIGHT[s]); }
const WMAX = Math.max(...Object.values(DW));
const A = 5.482587391368904, B = 12.457247723193557;
const price = (r, d) => A * (raw[`${r}>${d}`] / DMAX) + B * (DW[d] / WMAX);
for (const k of ['TE>DIME', 'ILB>DIME', 'OLB>DIME', 'TE>NICKEL', 'TE>FS', 'ILB>FS', 'OLB>FS', 'FB>TE', 'WR>CB', 'WR>DIME', 'WR>FS', 'WR>NICKEL', 'WR>SS', 'DT>ILB', 'DT>DIME', 'RB>TE', 'SS>OLB', 'OT>FB', 'DT>FB', 'QB>FS'])
  console.log(k.padEnd(10), 'live', String(LIVE[k.split('>')[0]]?.[k.split('>')[1]] ?? 'UNLISTED (emergency 8)').padStart(26), ' formula', price(k.split('>')[0], k.split('>')[1]).toFixed(2));
