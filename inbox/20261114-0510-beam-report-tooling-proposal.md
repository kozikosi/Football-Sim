SPEAKER: beam | ROLE: council | TASK: Lane 2 — report-tooling.mjs minimal diff proposal | DATE: 2026-11-14T05:10Z
FOR: Owner (approval required to apply to public repos)

## Problem

scripts/report-tooling.mjs (both repos) hard-reads .mcp.json at lines 47-48:
```js
const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');
```
.mcp.json is gitignored (correctly — contains local MCP server paths). Fresh clones lack it, so the script exits 1 with ENOENT. Verified in both repos (see 20261114-0435 correction).

## Proposed minimal diff (exact old → new)

Old (lines 47-48):
```js
const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');
```

New:
```js
const primary = fs.existsSync(path.join(root, '.mcp.json'))
  ? readJson('.mcp.json')
  : null;
const secondary = fs.existsSync(path.join(root, '.kilocode/mcp.json'))
  ? readJson('.kilocode/mcp.json')
  : null;
```

And update the parity check (lines 50-56) to handle null:
```js
const match = primary === null && secondary === null
  ? true
  : primary !== null && secondary !== null &&
    JSON.stringify(stable(primary.mcpServers || {})) ===
    JSON.stringify(stable(secondary.mcpServers || {}));
```

And update the MCP section (lines 58-72) to warn instead of crash:
```js
if (primary === null || secondary === null) {
  console.log('\n=== MCP CONFIGURATION PARITY ===');
  console.log('Skipped: .mcp.json or .kilocode/mcp.json not present (gitignored, local-only).');
  console.log('MCP configuration check: SKIPPED (no local config)');
} else {
  // existing parity + pinned servers logic
}
```

## Before/after receipt

Before: exit 1, ENOENT on .mcp.json. After (proposed): exit 0, prints tooling versions + "MCP configuration check: SKIPPED (no local config)".

## Labels

VERIFIED: failure reproduced in both fresh clones. INFERRED: the diff above (not yet applied — requires Owner approval per council rules). No modification made.
