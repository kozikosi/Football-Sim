SPEAKER: inkling | ROLE: council · proposal (NOT applied) | TASK: make both public repos' `scripts/report-tooling.mjs` survive fresh clones | DATE: 2026-11-14 | Audience: KG (Owner) + Architect

FOR: public repos `football-sim-vue` (`main` @ `6b4de5c`) and `football-sim-svelte` (`main` @ `86ba632`) — same file, byte-identical (`sha256 f071fe9bb0fc8e6eb06c89115de5ab76a3ca0e401c0207a0426932074187b442`)

# Proposal: let `report-tooling.mjs` skip the MCP section honestly when local files are absent

## The defect (verified, triple-sourced)

Both published scaffolds hard-read two **gitignored** local files at `scripts/report-tooling.mjs` (current line 47–48):

```js
const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');
```

From a fresh `git clone` those files do not exist (both repos deliberately untrack them), so the script dies with `ENOENT … open '<clone>/.mcp.json'`, **exit 1**, before printing anything useful. Beam reproduced it (inbox `…-0435-beam-report-tooling-correction.md`), Ernie reproduced it (inbox `…-0420`, `…-0425` §A6/§E4 — including the knock-on that `npm run smoke` chains it and **cannot pass on a fresh clone**), and INKLING read the hard-read lines directly in both trees this session (identical bytes). Anyone auditing the public repos hits this on step one.

## The proposal (exact change; the file is 86 lines, one want)

`readJson` stays strict. A wrapper `readJsonSafe` is added; the two hard reads become safe reads; absent files downgrade the MCP section to an honest SKIPPED, never a silent pass. Current and proposed ends:

```diff
 function readJson(file) {
    return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
 }
+
+function readJsonSafe(file) {
+  try {
+    return readJson(file);
+  } catch (err) {
+    if (err.code === 'ENOENT') {
+      console.warn(`Note: ${file} not found (local file, intentionally untracked); skipping MCP section.`);
+      return null;
+    }
+    throw err;
+  }
+}
```

```diff
-const primary = readJson('.mcp.json');
-const secondary = readJson('.kilocode/mcp.json');
-
-const primaryServers = primary.mcpServers || {};
-const secondaryServers = secondary.mcpServers || {};
+const primary = readJsonSafe('.mcp.json');
+const secondary = readJsonSafe('.kilocode/mcp.json');
+const mcpSectionAvailable = primary !== null && secondary !== null;
+
+const primaryServers = (primary && primary.mcpServers) || {};
+const secondaryServers = (secondary && secondary.mcpServers) || {};
```

```diff
-console.log('\n=== MCP CONFIGURATION PARITY ===');
-console.log('.mcp.json vs .kilocode/mcp.json:', match ? 'MATCH' : 'MISMATCH');
+if (mcpSectionAvailable) {
+  console.log('\n=== MCP CONFIGURATION PARITY ===');
+  console.log('.mcp.json vs .kilocode/mcp.json:', match ? 'MATCH' : 'MISMATCH');
+} else {
+  console.log('\n=== MCP CONFIGURATION PARITY ===');
+  console.log('SKIPPED: local .mcp.json/.kilocode/mcp.json absent (expected in a fresh clone). No parity claim made.');
+}
```

```diff
-console.log('\n=== PINNED MCP SERVERS ===');
+if (mcpSectionAvailable) {
+  console.log('\n=== PINNED MCP SERVERS ===');
```

```diff
-if (!match) {
-  console.error('\nERROR: MCP configurations differ.');
-  process.exitCode = 1;
-} else {
-  console.log('\nMCP configuration check: PASS');
-}
+}
+
+if (!mcpSectionAvailable) {
+  console.log('\nMCP configuration check: SKIPPED');
+} else if (!match) {
+  console.error('\nERROR: MCP configurations differ.');
+  process.exitCode = 1;
+} else {
+  console.log('\nMCP configuration check: PASS');
+}
```

`.gitignore` stays untouched; `.mcp.json` stays untracked by design.

## Before/after receipts (run 2026-11-14, THIS session, on a temp copy — nothing published)

Before (file copied byte-identically; no `.mcp.json` present):
```
$ node report-tooling.mjs ; exit=1
Error: ENOENT … open '…/<tmp>/.mcp.json'
```

After (same dir):
```
$ node report-tooling.mjs ; exit=0
=== TOOLING RECEIPT ===
Node: v26.13.0
Note: .mcp.json not found … skipping MCP section.
Note: .kilocode/mcp.json not found … skipping MCP section.
=== MCP CONFIGURATION PARITY ===
SKIPPED: … No parity claim made.
MCP configuration check: SKIPPED
```

After (working copy **with** the local files restored, both repos):
```
exit=0
=== MCP CONFIGURATION PARITY ===
.mcp.json vs .kilocode/mcp.json: MATCH
MCP configuration check: PASS
```

i.e. behaviour on a working copy is byte-compatible with today's behaviour; fresh clones get exit 0 and an honest SKIPPED, never a vacuous PASS and never a traceback. sha256 of the proposed file: `c11fc22f9a647769642286b56c6b7508175b0b00ea191a97843f00d276ab2390`.

## Decision for the Owner (nothing applied)

1. Accept as-is into both repos via whoever you authorize (Owner/Architect/relay; INKLING does not write the public repos).
2. Alternative documented posture: leave the script failing with a README/AGENTS.md note "requires local .mcp.json" — defensible, worse ergonomics.
3. Reject entirely (e.g., distrust of any drift surface) — nothing changes; fresh clones keep failing; the defect stands documented.

Labels: VERIFIED (before/after runs above; identical scripts) / REPORTED (Beam, Ernie receipts of the fresh-clone failure) / UNKNOWN (whether either repo's `main` may receive even a doc-only patch without Owner action — treated as no).

— inkling
