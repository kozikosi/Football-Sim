#!/usr/bin/env node
/* flip-bench-sealed.mjs — Rev 8 Part B4: the FLIP BENCH extended with the SEALED-RECIPE handicap.
 * The v1 harness measured the INSTRUMENTATION handicap (probe truth, fixture, tokens, battery).
 * This extension measures the API-KNOWLEDGE handicap: the second arm gets the first arm's learning
 * for free UNLESS the surface is sealed by a recipe both arms must author against, blind.
 * Run: node flip-bench-sealed.mjs <repoA> <repoB> --recipe <SEALED-RECIPE.md>
 * Exit 0 always (a status report, not a gate): it reports OPEN (no sealed receipts yet) or SEALED
 * (both arms carry receipts whose recipe_sha256 matches the recipe file). */
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const ri = args.indexOf('--recipe');
const recipePath = ri >= 0 ? args[ri + 1] : null;
const [a, b] = args.filter((x, i) => x !== '--recipe' && i !== ri && i !== ri + 1);
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

if (!a || !b || !recipePath || !existsSync(recipePath)) {
  console.error('usage: node flip-bench-sealed.mjs <repoA> <repoB> --recipe <SEALED-RECIPE.md>');
  process.exit(2);
}
const recipeSha = sha(recipePath);
const receiptOf = (repo) => {
  for (const p of [`${repo}/receipts/sealed-recipe-timing.txt`, `${repo}/../receipts/sealed-recipe-timing.txt`]) {
    if (existsSync(p)) {
      const first = readFileSync(p, 'utf8').split('\n').find((l) => l.startsWith('recipe_sha256='));
      return { path: p, recipeSha: first ? first.split('=')[1].trim() : null };
    }
  }
  return null;
};
const ra = receiptOf(a), rb = receiptOf(b);
const sealed = !!(ra && rb && ra.recipeSha === recipeSha && rb.recipeSha === recipeSha);
console.log(JSON.stringify({
  recipe: { path: recipePath, sha256: recipeSha },
  A: { repo: a, instrumentation: existsSync(`${a}/probes/truth.json`) && existsSync(`${a}/probes/probe-battery.mjs`), sealedReceipt: ra },
  B: { repo: b, instrumentation: existsSync(`${b}/probes/truth.json`) && existsSync(`${b}/probes/probe-battery.mjs`), sealedReceipt: rb },
  handicap: {
    instrumentation: 'PAID BEFORE BOTH ARMS (equal handicap of zero, Rev 6 finding)',
    apiKnowledge: sealed ? 'SEALED — both arms authored against this recipe; the second arm gets the recipe, not the first arm\'s learning' : 'OPEN — sealed recipe exists but no arm receipt carries its sha256 yet; the next sitting runs the bench before any cross-arm timing claim is decision-grade',
  },
  finding: 'Rev 6 verdict: ADOPT WITH CHANGES (add sealed-recipe per arm). This extension implements that change; until both arms\' receipts carry the recipe sha, the ~55% Svelte lean stays an OPINION with the recipe attached, not a measurement.',
}, null, 1));
