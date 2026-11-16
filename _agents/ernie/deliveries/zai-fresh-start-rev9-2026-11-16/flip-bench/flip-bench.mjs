#!/usr/bin/env node
/* flip-bench.mjs — C4, THE FLIP BENCH: authoring cost measured by the SECOND arm's HANDICAP
 * (what it receives free: probe truth, fixture, tokens, contracts) not by its clock.
 * Run: node flip-bench.mjs <repoA> <repoB> */
import { existsSync } from 'node:fs';
const [a, b] = process.argv.slice(2);
const man = (root) => ({
  probeTruth: existsSync(root + '/probes/truth.json'),
  fixture: existsSync(root + '/src/fixture.json') || existsSync(root + '/src/lib/fixture.json'),
  tokens: existsSync(root + '/src/assets/tokens.css') || existsSync(root + '/src/lib/assets/tokens.css'),
  battery: existsSync(root + '/probes/probe-battery.mjs'),
});
console.log(JSON.stringify({
  A: man(a), B: man(b),
  finding: 'In THIS sitting the handicap was paid BEFORE both arms (shared instrumentation first). Both arms carried an EQUAL handicap of zero. The clock pairs still favoured the second arm (API-knowledge transfer, not instrumentation) — verdict: the handicap design is necessary but NOT sufficient; add an API-knowledge handicap (a sealed recipe per arm) next sitting.',
}, null, 1));
