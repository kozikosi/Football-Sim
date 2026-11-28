#!/usr/bin/env node
/* close-out-chain.mjs — item 3 (close-out chain order — DS N2/N3 / Pickle D2 / HY4 D2).
 *
 * Regenerates the derived surfaces in DEPENDENCY ORDER and files the output at each step, then
 * loops until the chain reaches its fixed point: the seal count stable twice AND seam-card.json's
 * sealCount equal to the live CHECKSUMS.txt lines AND gate-manifest PASS. The chain:
 *
 *   node scripts/gen-seam-card.mjs          (the provenance card — runs through the port door)
 *   node scripts/gen-contract-golden.mjs    (the seam shape golden — port door)
 *   node scripts/gen-freshness.mjs          (the input-hash map)
 *   node tools/shell-status.mjs             (SHELL-STATUS.md is MEASURED — writes dist-manifest.json too)
 *   node scripts/gen-state-block.mjs        (README/ZAI/hand-over state blocks from the live claims)
 *   node scripts/gen-claims-index.mjs       (the Verifier's one page)
 *   node scripts/gen-cutover-proof.mjs      (the one-page cutover proof)
 *   node scripts/regen-manifest.mjs         (THE RESEAL — CHECKSUMS.txt + MANIFEST.txt + manifest-facts.json)
 *   node scripts/gate-manifest.mjs          (PASS or the chain dies)
 *   node scripts/gate-numerals.mjs          (CLEAN, run twice — ×2 is the law)
 *
 * All generators are DETERMINISTIC at fixed bytes (content stamps, no wall clock), so the loop
 * converges: regen-manifest writes manifest-facts.json after CHECKSUMS.txt, pass 2 lists it (the
 * seal grows by one line), pass 3 stabilises — the loop exits only when a pass changes nothing and
 * a repeat pass changes nothing again.
 *
 * Run: node scripts/close-out-chain.mjs   (exit 0 = converged + gates green; exit 1 = named)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);
const run = (name, cmd, args) => {
  console.log(`\n== chain step: ${name}`);
  const o = execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 420000, maxBuffer: 1024 * 1024 * 32, env: { ...process.env, CP_PIN: '408410477' } });
  process.stdout.write(o);
  return o;
};
const sealLines = () => fs.readFileSync(P('CHECKSUMS.txt'), 'utf8').split('\n').filter((l) => l.trim()).length;
const cardSeal = () => JSON.parse(fs.readFileSync(P('seam-card.json'), 'utf8')).sealCount;

const CHAIN = [
  ['gen-seam-card.mjs (port door)', 'node', ['--import', './scripts/node-port-register.mjs', 'scripts/gen-seam-card.mjs']],
  ['gen-contract-golden.mjs (port door)', 'node', ['--import', './scripts/node-port-register.mjs', 'scripts/gen-contract-golden.mjs']],
  ['gen-freshness.mjs', 'node', ['scripts/gen-freshness.mjs']],
  ['tools/shell-status.mjs', 'node', ['--import', './scripts/node-port-register.mjs', 'tools/shell-status.mjs']],
  ['gen-state-block.mjs', 'node', ['scripts/gen-state-block.mjs']],
  ['gen-claims-index.mjs', 'node', ['scripts/gen-claims-index.mjs']],
  ['gen-cutover-proof.mjs', 'node', ['scripts/gen-cutover-proof.mjs']],
  ['regen-manifest.mjs (the reseal)', 'node', ['scripts/regen-manifest.mjs']],
  ['gate-manifest.mjs', 'node', ['scripts/gate-manifest.mjs']],
  ['gate-numerals.mjs (×2 pass 1)', 'node', ['scripts/gate-numerals.mjs']],
  ['gate-numerals.mjs (×2 pass 2)', 'node', ['scripts/gate-numerals.mjs']],
];

let stableTwice = 0, lastSeal = -1, pass = 0;
for (pass = 1; pass <= 6; pass++) {
  console.log(`\n########## close-out chain pass ${pass} ##########`);
  for (const [name, cmd, args] of CHAIN) run(name, cmd, args);
  const seal = sealLines(), card = cardSeal();
  const agrees = seal === card;
  console.log(`\nchain pass ${pass}: seal lines ${seal}, seam-card sealCount ${card}, agreement ${agrees ? 'YES' : 'NO'}`);
  if (seal === lastSeal && agrees) stableTwice++; else stableTwice = 0;
  lastSeal = seal;
  if (stableTwice >= 2) { console.log(`\nCLOSE-OUT CHAIN CONVERGED: the seal count was stable and card-agreed across passes ${pass - 1} and ${pass}`); process.exit(0); }
}
console.error('close-out chain: NO CONVERGENCE after 6 passes — the seal kept changing; investigate before resealing');
process.exit(1);
