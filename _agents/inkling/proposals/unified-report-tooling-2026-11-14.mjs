/* Unified proposal (2026-11-14) — synthesis of three independent fresh-clone fixes:
 *   _agents/inkling: inbox/20261114-0459-inkling-report-tooling-proposal.md      (readJsonSafe)
 *   council/beam:    inbox/20261114-0510-beam-report-tooling-proposal.md        (existsSync guard)
 *   council/ernie:   inbox/20261114-0500-ernie-proposal-report-tooling-fix.md    (readJsonIfPresent + SKIPPED exit 0)
 * What it guarantees: fresh clone (no .mcp.json/.kilocode/mcp.json) exits 0, prints an explicit SKIPPED for the
 * MCP section, and NEVER prints a vacuous PASS/MATCH; configured clones keep byte-identical behaviour
 * (PARITY MATCH -> PASS, exit 0). Before/after receipts live in inbox/20261114-0534-inkling-p355-361-exec.md.
 * sha256 of this file (pre-header): 444892a440ab63783fab2fdc3e8169dd91e09f0edb9352dfa7f9898d80849abe
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function readJsonIfPresent(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return null;
  return readJson(file);
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map(key => [key, stable(value[key])])
    );
  }
  return value;
}

function installedVersion(name) {
  const file = path.join(root, 'node_modules', ...name.split('/'), 'package.json');
  if (!fs.existsSync(file)) return 'not installed';
  return JSON.parse(fs.readFileSync(file, 'utf8')).version;
}

console.log('\n=== TOOLING RECEIPT ===');
console.log('Node:', process.version);

const packages = [
  'vite',
  'svelte',
  '@sveltejs/kit',
  'vue',
  'typescript',
  'vitest',
  '@playwright/test',
  'playwright',
  'playwright-core'
];

for (const name of packages) {
  const version = installedVersion(name);
  if (version !== 'not installed') {
    console.log(name + ': ' + version);
  }
}

const primary = readJsonIfPresent('.mcp.json');
const secondary = readJsonIfPresent('.kilocode/mcp.json');

const anyMcpConfig = Boolean(primary || secondary);
if (!anyMcpConfig) {
  console.log('\n=== MCP CONFIGURATION PARITY ===');
  console.log('SKIPPED — .mcp.json and .kilocode/mcp.json are local-only (gitignored) and absent in this clone.');
  console.log('\n=== PINNED MCP SERVERS ===');
  console.log('none (no local MCP configuration present)');
  console.log('\nMCP configuration check: SKIPPED');
} else {
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
}

console.log('\nNote: Playwright MCP has its own bundled browser runtime.');
console.log('Its version is independent of the locally installed Playwright Test runtime.');
console.log('================================\n');
