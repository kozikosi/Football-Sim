import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSlots } from '../../../src/engine/sports/nfl/engine/slots.ts';
import type { FieldSlot } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { fit } from '../../../src/engine/sports/nfl/engine/flex.ts';
import { optimalLineup, priorities } from '../../../src/engine/sports/nfl/engine/lineup.ts';
import { DEFAULT_VALUES } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import type { ValueProvider } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import type { Player, Role } from '../../../src/engine/sports/nfl/engine/players.ts';
import { makeRng } from '../../../src/engine/core/rng.ts';

// The solver's priorities (QB never forced, every player plays, fewest emergency fills, then value) hold for ANY value scale. They used to be literals that assumed
// QB about 1000; with every spot value 200x larger the solver took 3 emergency fills where 0 were needed (15 Nov 2026). The reference here is exact and independent
// of the solver: the fewest emergency fills any assignment can have is spots minus a maximum bipartite matching over the legal, non-emergency pairs.
const ROLES: Role[] = ['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'CB', 'SS', 'FS', 'K', 'P'];
let uid = 0;
const mk = (role: Role, ovr: number): Player => ({ id: `q${uid++}`, name: 'x', pos: role, role, team: 'T', ovr, spd: 70, str: 70, freeAgent: false });
const scaled = (k: number): ValueProvider => ({ name: 'x' + k, winsPerOvr: (row, base) => DEFAULT_VALUES.winsPerOvr(row, base) * k });

function minEmergency(ps: Player[], spots: readonly FieldSlot[]): number {
  const adj = spots.map((s) => ps.flatMap((p, i) => (fit(p.role, s.dest).legal && !fit(p.role, s.dest).emergency ? [i] : [])));
  const owner = new Array<number>(ps.length).fill(-1);
  const augment = (j: number, seen: boolean[]): boolean => {
    for (const i of adj[j]!) { if (seen[i]) continue; seen[i] = true; if (owner[i]! < 0 || augment(owner[i]!, seen)) { owner[i] = j; return true; } }
    return false;
  };
  let m = 0;
  for (let j = 0; j < spots.length; j++) if (augment(j, new Array<boolean>(ps.length).fill(false))) m++;
  return spots.length - m;
}

function roster(r: ReturnType<typeof makeRng>, spots: number): Player[] {
  const size = r.int(34, 53), skew = r.int(0, 3), roles = ROLES.filter((x) => x !== 'QB' || skew > 0), ps: Player[] = [];
  for (let i = 0; i < size; i++) {
    const role = skew === 0 ? r.pick(ROLES) : r.pick(roles.slice(0, 4 + r.int(0, roles.length - 4)));
    ps.push(mk(role, role === 'QB' && skew === 3 ? r.int(88, 99) : r.int(50, 99)));      // holes in some groups, stars at QB in some rosters
  }
  return ps.filter((p) => p.role !== 'QB').length >= spots ? ps : roster(r, spots);
}

test('the emergency-fill count equals the exact minimum on 240 skewed rosters, at spot-value scales 1, 200 and 0.001 (and the placements do not change with scale)', () => {
  const r = makeRng(2026);
  for (const base of ['4-3', '3-4'] as const) {
    const spots = fieldSlots(base);
    for (let t = 0; t < 120; t++) {
      const ps = roster(r, spots.length), want = minEmergency(ps, spots);
      const at1 = optimalLineup(ps, spots, { base, values: scaled(1) });
      assert.equal(at1.emergencyFills, want, `${base} roster ${t}: emergency fills`);
      for (const k of [200, 0.001]) {
        const l = optimalLineup(ps, spots, { base, values: scaled(k) });
        assert.equal(l.emergencyFills, want, `${base} roster ${t} at x${k}: emergency fills`);
        assert.deepEqual(l.placements.map((p) => p.player?.id), at1.placements.map((p) => p.player?.id), `${base} roster ${t} at x${k}: same lineup`);
      }
    }
  }
});

test('priorities(): each weight outweighs everything below it, and the order scales with the values', () => {
  const v = [1000, 300, 150, 50];
  const p = priorities(v, 53, 32);
  const total = 120 * v.reduce((a, b) => a + b, 0);                         // the largest possible gap between two whole assignments in value
  assert.ok(p.emergency > total, 'one emergency fill outweighs any value difference');
  assert.ok(p.plays > 33 * p.emergency + total, 'one more player on the field outweighs every emergency fill and any value difference');
  assert.ok(p.illegal > (53 + 32) * p.plays, 'an illegal pairing outweighs any whole legal assignment');
  const q = priorities(v.map((x) => x * 1000), 53, 32);
  assert.ok(Math.abs(q.emergency / p.emergency / 1000 - 1) < 1e-4 && Math.abs(q.plays / p.plays / 1000 - 1) < 1e-4, 'the weights scale with the values (to within the +1 margin)');
});
