/* pack-hash-cite.mjs — the pack53 loader hash, ALWAYS with its invocation (M1/M2 discipline).
 * The engine's pack53 hash is configuration-dependent: the file as baked, with the product-world
 * overrides (clock=dt_pf, trans=computed), and with only the clock override — three invocations,
 * three hashes. A bare hash claim without the invocation beside it is UNKNOWN.
 * Run: node --experimental-strip-types scripts/pack-hash-cite.mjs [data/packs/nfl-pools-fit2023-2025.json]
 */
import fs from 'node:fs';
import { makePack, packHash } from '../src/engine/core/pack.ts';
import { loadPools } from '../src/engine/sports/nfl/sim/pools.ts';
import { fileURLToPath } from 'node:url';

const file = process.argv[2] ?? 'data/packs/nfl-pools-fit2023-2025.json';
const bodyOf = () => JSON.parse(fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'));

// invocation 1: the file as baked (the raw load the carried suite's pools-game path performs)
{
  const body = bodyOf();
  console.log(`invocation 1 (as baked; loadPools(makePack(JSON.parse(${file})))):`);
  console.log('   ' + packHash(body));
  loadPools(makePack(body));   // the load must succeed for the citation to mean anything
}
// invocation 2: the product-world overrides — clock=dt_pf, trans=computed
{
  const body = bodyOf();
  body.rules.values['clock'] = 'dt_pf';
  body.rules.values['trans'] = 'computed';
  console.log('invocation 2 (product world: rules.values clock=dt_pf, trans=computed):');
  console.log('   ' + packHash(body));
  loadPools(makePack(body));
}
// invocation 3: only the clock override
{
  const body = bodyOf();
  body.rules.values['clock'] = 'dt_pf';
  console.log('invocation 3 (only the clock override: rules.values clock=dt_pf):');
  console.log('   ' + packHash(body));
  loadPools(makePack(body));
}
