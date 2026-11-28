/* node-port-register.mjs — the node-side TS entry hook (Part D route 2).
 *
 * Usage (replaces --experimental-transform-types, which Node 26 removed):
 *   node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs
 *   node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
 *   node --import ./scripts/node-port-register.mjs scripts/probe-*.mjs
 *
 * What it does, in order:
 *  1. FRESHNESS GATE (fail loud, never serve a stale engine copy): the generated snapshot copy
 *     src/engine-node/ must exist and match the CURRENT src/engine/ tree hash. If it is missing
 *     or stale (e.g. after a re-pin), it is regenerated ONCE here — a pretest hook by another
 *     name; a mismatch after that is a hard error.
 *  2. Registers the resolve hook that redirects every src/engine/ import to src/engine-node/.
 *     The browser build never runs this file — Vite keeps importing the snapshot itself.
 *
 * The snapshot under src/engine/ is never edited by any of this (diff -rq against the pin = 0).
 */
import { register } from 'node:module';
import fs from 'node:fs';
import { generate, isFresh, PATHS } from './engine-node-gen.mjs';
import { fileURLToPath } from 'node:url';

if (!isFresh()) {
  const reason = fs.existsSync(PATHS.OUT)
    ? 'stale (the src/engine/ tree changed since the last generate — e.g. a re-pin)'
    : 'missing (never generated)';
  console.log(`node-port: src/engine-node ${reason} — regenerating (npm run precompile does the same step explicitly)`);
  generate({ log: (m) => console.log('node-port:', m) });
  if (!isFresh()) throw new Error('node-port: the regenerated copy still does not match the snapshot — refusing to run against an unverified engine copy');
}

register(new URL('./engine-node-loader.mjs', import.meta.url));
