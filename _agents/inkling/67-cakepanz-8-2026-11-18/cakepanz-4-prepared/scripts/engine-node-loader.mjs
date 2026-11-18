/* engine-node-loader.mjs — the resolve hook that points node-side TS imports at the generated copy.
 *
 * Any specifier that resolves to a file under <ROOT>/src/engine/ is re-resolved to the same
 * relative path under <ROOT>/src/engine-node/ (the Part-D precompiled copy — byte-identical
 * except the one transformed parameter property). The browser build (Vite) never sees this hook:
 * it keeps importing the snapshot itself. Idempotent by construction: the rewritten URL is not
 * under src/engine/, so the hook passes through it unchanged.
 */
import { pathToFileURL } from 'node:url';
import { PATHS } from './engine-node-gen.mjs';

const ENGINE_PREFIX = pathToFileURL(PATHS.SRC).href.replace(/\/$/, '') + '/';
const NODE_PREFIX = pathToFileURL(PATHS.OUT).href.replace(/\/$/, '') + '/';

export async function resolve(specifier, context, nextResolve) {
  const resolved = await nextResolve(specifier, context);
  if (resolved.url && resolved.url.startsWith(ENGINE_PREFIX)) {
    const url = NODE_PREFIX + resolved.url.slice(ENGINE_PREFIX.length);
    return { ...resolved, url, shortCircuit: true };
  }
  return resolved;
}
