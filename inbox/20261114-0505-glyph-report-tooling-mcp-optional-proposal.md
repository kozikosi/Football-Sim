SPEAKER: glyph | ROLE: seat (proposal) | TASK: report-tooling.mjs MCP-config optionality fix proposal (public scaffolds) | DATE: 2026-11-14T05:05Z
FOR: Owner / authorized maintainer (public repos `kozikosi/football-sim-vue`, `kozikosi/football-sim-svelte`)

# Proposal: make `scripts/report-tooling.mjs` clean on fresh clones when MCP config files are absent

**Status:** PROPOSAL (no public-repo writes by glyph). Triple-confirmed failure (Beam/Ernie/glyph).

## Problem (VERIFIED)
- Fresh public clones: Vue `6b4de5c734898d85f00c779de4f078532e5dadf9`, Svelte `86ba63255b34ef87db2cf9cae954511d5631064f` (`/tmp/kilo-glyph-fw-20261114-0421`).
- Both ship identical `scripts/report-tooling.mjs` (86 lines). It unconditionally reads `.mcp.json` and `.kilocode/mcp.json`:
  - `readJson()` (lines 6-8): `fs.readFileSync(path.join(root, file), 'utf8')`
  - `const primary = readJson('.mcp.json'); const secondary = readJson('.kilocode/mcp.json');` (lines 48-49)
- Both files are gitignored and absent in fresh clones. Result: script exits 1 with `ENOENT` after printing installed package versions; `npm run smoke` (`node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts`) never reaches Playwright.

## Before (receipts, VERIFIED)
Vue: `node scripts/report-tooling.mjs` exit **1**
```
=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
vue: 3.5.45
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1
Error: ENOENT: no such file or directory, open '.../vue/.mcp.json'
    at readJson (scripts/report-tooling.mjs:7:24)
    at scripts/report-tooling.mjs:48:17
```
Svelte: same failure (`.../svelte/.mcp.json`), exit **1**. `npm run smoke` exit **1** at same point in both.

## Proposed change (minimal, behavior-preserving when configs present)
- Add `tryReadJson(file)` returning missing/unreadable state instead of throwing when absent.
- If either MCP config missing/unreadable: emit WARNs to stderr, print parity/pinned sections as `SKIPPED`/unavailable, `process.exit(0)` (clean receipt). Do not fail fresh clones for absent gitignored local configs.
- If both present/readable: preserve existing parity comparison, pinned-server listing, and **exit 1 on mismatch**.

## Exact diff (old -> new)

**Replace:**
```js
function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}
```
**With:**
```js
function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function tryReadJson(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return { ok: false, missing: true, path: p };
  try {
    return { ok: true, value: JSON.parse(fs.readFileSync(p, 'utf8')) };
  } catch (e) {
    return { ok: false, missing: false, path: p, error: e };
  }
}
```

**Replace (MCP parity/report tail):**
```js
const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');

const primaryServers = primary.mcpServers || {};
const secondaryServers = secondary.mcpServers || {};

const match =
  JSON.stringify(stable(primaryServers)) ===
  JSON.stringify(stable(secondaryServers));

console.log('\n=== MCP CONFIGURATION PARITY ===');
console.log('.mcp.json vs .kilocode/mcp.json:', match ? 'MATCH' : 'MISMATCH');

console.log('\n=== PINNED MCP SERVERS ===');

for (const [name, server] of Object.entries(primaryServers)) {
  const packageSpec = (server.args || []).find(
    arg => typeof arg === 'string' &&
      arg.startsWith('@') &&
      arg.lastIndexOf('@') > 0
  );

  console.log(name + ': ' + (
    packageSpec ||
    server.url ||
    'configured; version not declared'
  ));
}

if (!match) {
  console.error('\nERROR: MCP configurations differ.');
  process.exitCode = 1;
} else {
  console.log('\nMCP configuration check: PASS');
}

console.log('\nNote: Playwright MCP has its own bundled browser runtime.');
console.log('Its version is independent of the locally installed Playwright Test runtime.');
console.log('================================\n');
```
**With:**
```js
const primaryRes = tryReadJson('.mcp.json');
const secondaryRes = tryReadJson('.kilocode/mcp.json');

console.log('\n=== MCP CONFIGURATION PARITY ===');
if (!primaryRes.ok || !secondaryRes.ok) {
  for (const [label, res] of [['.mcp.json', primaryRes], ['.kilocode/mcp.json', secondaryRes]]) {
    if (res.missing) {
      console.warn('WARN: ' + label + ' not found (optional in fresh/public clones); skipping parity read for this file.');
    } else if (!res.ok) {
      console.warn('WARN: failed to read ' + label + ': ' + (res.error ? res.error.message : 'unknown error'));
    }
  }
  if (primaryRes.missing && secondaryRes.missing) {
    console.log('.mcp.json vs .kilocode/mcp.json: SKIPPED (both missing)');
  } else if (primaryRes.missing || secondaryRes.missing) {
    console.log('.mcp.json vs .kilocode/mcp.json: SKIPPED (one or both missing)');
  } else {
    console.log('.mcp.json vs .kilocode/mcp.json: SKIPPED (unreadable)');
  }
  console.log('\n=== PINNED MCP SERVERS ===');
  console.log('(unavailable: MCP config files missing or unreadable)');
  console.log('\nMCP configuration check: SKIPPED');
  console.log('\nNote: Playwright MCP has its own bundled browser runtime.');
  console.log('Its version is independent of the locally installed Playwright Test runtime.');
  console.log('================================\n');
  process.exit(0);
}

const primary = primaryRes.value;
const secondary = secondaryRes.value;
const primaryServers = primary.mcpServers || {};
const secondaryServers = secondary.mcpServers || {};

const match =
  JSON.stringify(stable(primaryServers)) ===
  JSON.stringify(stable(secondaryServers));

console.log('.mcp.json vs .kilocode/mcp.json:', match ? 'MATCH' : 'MISMATCH');

console.log('\n=== PINNED MCP SERVERS ===');

for (const [name, server] of Object.entries(primaryServers)) {
  const packageSpec = (server.args || []).find(
    arg => typeof arg === 'string' &&
      arg.startsWith('@') &&
      arg.lastIndexOf('@') > 0
  );

  console.log(name + ': ' + (
    packageSpec ||
    server.url ||
    'configured; version not declared'
  ));
}

if (!match) {
  console.error('\nERROR: MCP configurations differ.');
  process.exitCode = 1;
} else {
  console.log('\nMCP configuration check: PASS');
}

console.log('\nNote: Playwright MCP has its own bundled browser runtime.');
console.log('Its version is independent of the locally installed Playwright Test runtime.');
console.log('================================\n');
```

## After (receipts, VERIFIED in glyph scratch test)
Patched script run as `node /tmp/report-tooling.fixed.mjs` in fresh clones (no repo files modified):

**Vue** exit **0**
```
=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
vue: 3.5.45
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1

=== MCP CONFIGURATION PARITY ===
.mcp.json vs .kilocode/mcp.json: SKIPPED (both missing)

=== PINNED MCP SERVERS ===
(unavailable: MCP config files missing or unreadable)

MCP configuration check: SKIPPED

Note: Playwright MCP has its own bundled browser runtime.
Its version is independent of the locally installed Playwright Test runtime.
================================
```
stderr: WARN for missing `.mcp.json` and `.kilocode/mcp.json`.

**Svelte** exit **0**, same structure (`svelte: 5.57.3`).

## Expected effect
- Fresh-clone `node scripts/report-tooling.mjs` exits 0 with explicit SKIPPED/WARN.
- `npm run smoke` can proceed to Playwright smoke step in fresh clones (subject to normal Playwright/server readiness).
- No MCP config files committed; parity still enforced when both exist.

## Applicability / limits
- Same patch applies to both repos (scripts identical). Apply only by Owner/authorized maintainer to public scaffold repos.
- **NOT APPLIED** to any public repo by glyph. No `.env`/secrets involved.
- Policy choice: if one config exists and other missing, this proposal SKIPs parity with WARN (explicit) rather than failing; adjust if stricter behavior desired.

Label: PROPOSAL / VERIFIED receipts.
