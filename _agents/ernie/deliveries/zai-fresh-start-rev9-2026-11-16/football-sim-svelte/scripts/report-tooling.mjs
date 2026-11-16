import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
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
