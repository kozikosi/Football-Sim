#!/usr/bin/env node
/**
 * INKLING — macOS MCP probe for the Owner's machine.
 * One paste, Node builtins only besides: git, npx (downloads allowed to YOUR machine, by your choice).
 * Env switches:
 *   INKLE_SKIP_MCP_PROBE=1   skip all MCP spawn probes (offline-safe)
 *   INKLE_SKIP_NAV=1        skip the data-URL navigate
 *   FOOTBALL_VUE_DIR=…      override scaffold path (default ~/football-sim-vue)
 *   FOOTBALL_SVELTE_DIR=…   override (default ~/football-sim-svelte)
 * Exits 0 always; report = printed JSON-ish block for a seat to transcribe.
 */
import { spawnSync, spawn } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir, arch, release, platform } from 'node:os';
import path from 'node:path';

const HOME = homedir();
const out = [];
const line = (k, v) => out.push(`${k}: ${v}`);

const sh = (cmd, args, opts = {}) =>
  spawnSync(cmd, args, { encoding: 'utf8', timeout: 20000, ...opts });

line('platform', `${platform()} ${arch()} ${release()}`);
line('node', process.version);
line('npm', (sh('npm', ['--version']).stdout || '').trim());
line('git', (sh('git', ['--version']).stdout || '').trim());

// --- playwright browser cache (informational)
const cache = path.join(HOME, 'Library/Caches/ms-playwright');
try {
  const entries = readdirSync(cache).slice().sort();
  line('ms-playwright-entries', String(entries.length));
  line('ms-playwright-list', entries.join(','));
} catch {
  line('ms-playwright-cache', 'ABSENT');
}

// --- scaffold SHAs (read-only)
for (const [key, def] of [['vue', path.join(HOME, 'football-sim-vue')], ['svelte', path.join(HOME, 'football-sim-svelte')]]) {
  const dir = process.env[`FOOTBALL_${key.toUpperCase()}_DIR`] || def;
  if (!existsSync(dir)) { line(`scaffold-${key}`, `ABSENT at ${dir}`); continue; }
  const head = sh('git', ['-C', dir, 'rev-parse', 'HEAD']).stdout.trim();
  const count = sh('git', ['-C', dir, 'ls-tree', '-r', '--name-only', 'HEAD']).stdout.trim().split('\n').filter(Boolean).length;
  line(`scaffold-${key}`, `${dir} @ ${head} (${count} tracked files)`);
}

// --- run report-tooling.mjs in present scaffolds (read-only)
for (const [key, def] of [['vue', path.join(HOME, 'football-sim-vue')], ['svelte', path.join(HOME, 'football-sim-svelte')]]) {
  const dir = process.env[`FOOTBALL_${key.toUpperCase()}_DIR`] || def;
  const script = path.join(dir, 'scripts/report-tooling.mjs');
  if (!existsSync(script)) { line(`report-tooling-${key}`, 'script absent'); continue; }
  const r = sh('node', [script], { cwd: dir });
  if (r.error?.code === 'ETIMEDOUT') line(`report-tooling-${key}`, 'timeout');
  else line(`report-tooling-${key}`, `exit ${r.status}`);
}

// --- MCP stdio probes (newline-delimited JSON-RPC), hard-capped
const runMcp = (label, cmd, args, nav) => new Promise((resolve) => {
  const child = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });
  let buf = '';
  let done = false;
  const kill = () => { try { child.kill('SIGTERM'); } catch {} };
  const finish = (msg) => { if (done) return; done = true; kill(); resolve(line(label, msg)); };
  const timer = setTimeout(() => finish('TIMEOUT (no tools/list answer)'), 90000);
  const onLine = (l) => {
    try {
      const m = JSON.parse(l);
      if (m.id === 2 && m.result?.tools) {
        clearTimeout(timer);
        const names = m.result.tools.map(t => t.name);
        if (nav && !process.env.INKLE_SKIP_NAV) {
          const req = { jsonrpc: '2.0', id: 3, method: 'tools/call',
            params: { name: 'browser_navigate',
              arguments: { url: 'data:text/html,<h1>inkling-probe</h1>' } } };
          try { child.stdin.write(JSON.stringify(req) + '\n'); } catch {}
          setTimeout(() => finish(`tools ok (${names.length}): ${names.slice(0, 40).join(',')}; navigate attempted`), 15000);
        } else {
          finish(`tools ok (${names.length}): ${names.slice(0, 40).join(',')}`);
        }
      } else if (m.id === 3) {
        clearTimeout(timer);
        finish(`navigate verdict: ok (${m.result?.isError ? 'ERROR RESULT' : 'no error'})`);
      }
    } catch { /* not JSON */ }
  };
  child.stdout.on('data', d => {
    buf += d;
    let i;
    while ((i = buf.indexOf('\n')) >= 0) { const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1); if (l) onLine(l); }
  });
  child.stderr.on('data', d => process.stderr.write(`[${label}] ${d}`));
  child.on('error', e => finish(`spawn error: ${e.message}`));
  const init = { jsonrpc: '2.0', id: 1, method: 'initialize',
    params: { protocolVersion: '2025-06-18', capabilities: {},
      clientInfo: { name: 'inkling-probe', version: '1.0' } } };
  try { child.stdin.write(JSON.stringify(init) + '\n'); } catch (e) { return finish(`stdin error: ${e.message}`); }
  setTimeout(() => {
    try { child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n'); } catch {}
    try { child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n'); } catch {}
  }, 1500);
});

(async () => {
  if (process.env.INKLE_SKIP_MCP_PROBE) {
    line('mcp-probes', 'SKIPPED by INKLE_SKIP_MCP_PROBE=1');
  } else {
    await runMcp('mcp-svelte', 'npx', ['--yes', '@sveltejs/mcp@0.1.30'], false);
    await runMcp('mcp-playwright', 'npx', ['--yes', '@playwright/mcp@0.0.85', '--browser', 'chromium', '--headless'], true);
    await runMcp('mcp-context7', 'npx', ['--yes', '@upstash/context7-mcp@4.7.0'], false);
  }
  line('vue-remote-mcp', 'NOT PROBED (HTTP endpoint, not stdio; do not call blind)');
  console.log(out.join('\n'));
})();
