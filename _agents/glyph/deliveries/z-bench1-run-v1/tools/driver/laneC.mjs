// Lane C — the tooling shootout, per arm: dev-server cold/warm start, production build (published script),
// type-checker on the clean tree, then 8 seeded bugs in a scratch copy scored "caught?" + verbatim diagnostics.
// Everything runs AFTER the Tier-2 timing window (CPU contention policy, DESIGN-LOG §CPU-hygiene).
// Usage: node tools/driver/laneC.mjs <outDir>
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const OUT = process.argv[2] ?? '../../receipts';
const ARMS = [
  { name: 'vue', dir: '../../arms/arm-vue-pub', port: 5199, checkCmd: ['npx', 'vue-tsc', '-b'], buildCmd: ['npm', 'run', 'build'], compExt: '.vue' },
  { name: 'svelte', dir: '../../arms/arm-svelte-pub', port: 5200, checkCmd: ['npm', 'run', 'check'], buildCmd: ['npm', 'run', 'build'], compExt: '.svelte' },
];
const run = (cmd, opts = {}) => new Promise((resolve) => {
  const t0 = process.hrtime.bigint();
  const child = spawn(cmd[0], cmd.slice(1), { cwd: opts.cwd, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = '';
  child.stdout.on('data', (d) => (out += d));
  child.stderr.on('data', (d) => (err += d));
  const timer = setTimeout(() => { child.kill('SIGKILL'); }, opts.timeoutMs ?? 240000);
  child.on('exit', (code) => { clearTimeout(timer); resolve({ code, ms: +(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(0), out, err }); });
});
const freePort = async (port) => {
  try { const o = execSync(`ss -tlnp | grep :${port} | grep -oP 'pid=\\K[0-9]+' | sort -u`).toString().trim().split('\n'); for (const p of o) if (p) process.kill(+p); } catch {}
  await new Promise((r) => setTimeout(r, 300));
};

async function devStart(arm, tag) {
  await freePort(arm.port);
  const t0 = process.hrtime.bigint();
  const child = spawn('npx', ['vite', '--port', String(arm.port), '--strictPort'], { cwd: path.resolve(import.meta.dirname, arm.dir), stdio: 'ignore' });
  const started = Date.now();
  let okMs = null;
  while (Date.now() - started < 60000) {
    try { const r = await fetch(`http://localhost:${arm.port}/`); if (r.ok) { okMs = +(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(0); break; } } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  child.kill('SIGKILL');
  await freePort(arm.port);
  return { tag, first200Ms: okMs };
}

// Seeded bugs: equivalent difficulty per framework, each with the framework file it is planted in.
// Every bug is applied ONLY to a scratch copy (arms stay byte-clean). VERIFIED = tool caught it.
const BUGS = {
  vue: [
    { id: 'B1-wrong-import-name', patch: (s) => s.replace("import { store, selectBoard, selectRoster } from './shared/boot'", "import { store, selectBoardz, selectRoster } from './shared/boot'") },
    { id: 'B2-misspelled-field', patch: (s) => s.replace('selectBoard(state.value, { sort: sort.value, limit: 60 })', 'selectBoard(state.value, { sort: sort.value, limitt: 60 })') },
    { id: 'B3-undefined-in-template', patch: (s) => s.replace('{{ r.slotLabel }}', '{{ r.slotLable }}') },
    { id: 'B4-wrong-type-arg', patch: (s) => s.replace("store.dispatch({ type: 'PICK', playerId: selected.value.id, slot: selected.value.slotId })", "store.dispatch({ type: 'PICK', playerId: 42, slot: selected.value.slotId })") },
    { id: 'B5-null-without-guard', patch: (s) => s.replace('const selected = computed<BoardRowVM | null>(() => rows.value.find((x) => x.id === selectedId.value) ?? null)', 'const selected = computed<BoardRowVM | null>(() => rows.value.find((x) => x.id === selectedId.value))') },
    { id: 'B6-unterminated-template', patch: (s) => s.replace('</template>', '<template>') },
    { id: 'B7-bad-v-model', patch: (s) => s.replace('v-model="filter"', 'v-model="filtre"') },
    { id: 'B8-wrong-handler-sig', patch: (s) => s.replace('function setSort(s: BoardSort): void { sort.value = s; }', 'function setSort(s: string): void { sort.value = s; }') },
  ],
  svelte: [
    { id: 'B1-wrong-import-name', patch: (s) => s.replace("import { store, selectBoard, selectRoster } from './shared/boot'", "import { store, selectBoardz, selectRoster } from './shared/boot'") },
    { id: 'B2-misspelled-field', patch: (s) => s.replace('selectBoard(state, { sort, limit: 60 })', 'selectBoard(state, { sort, limitt: 60 })') },
    { id: 'B3-undefined-in-template', patch: (s) => s.replace('{r.slotLabel}', '{r.slotLable}') },
    { id: 'B4-wrong-type-arg', patch: (s) => s.replace("store.dispatch({ type: 'PICK', playerId: selected.id, slot: selected.slotId })", "store.dispatch({ type: 'PICK', playerId: 42, slot: selected.slotId })") },
    { id: 'B5-null-without-guard', patch: (s) => s.replace('let selected = $derived<BoardRowVM | null>(rows.find((x) => x.id === selectedId) ?? null)', 'let selected = $derived<BoardRowVM | null>(rows.find((x) => x.id === selectedId))') },
    { id: 'B6-unterminated-template', patch: (s) => s.replace('</div>\n<table', '<div>\n<table') },
    { id: 'B7-bad-bind', patch: (s) => s.replace('bind:value={filter}', 'bind:value={filtre}') },
    { id: 'B8-wrong-handler-sig', patch: (s) => s.replace('function setSort(s: BoardSort): void { sort = s; }', 'function setSort(s: string): void { sort = s; }') },
  ],
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const results = { startedAt: new Date().toISOString(), arms: {}, env: { node: process.version, cpu: os.cpus()[0]?.model, cores: os.cpus().length } };
  for (const arm of ARMS) {
    const dir = path.resolve(import.meta.dirname, arm.dir);
    const r = { name: arm.name };
    r.devCold = await devStart(arm, 'cold1');
    r.devWarm = [await devStart(arm, 'warm1'), await devStart(arm, 'warm2')];
    // published build script (vue: vue-tsc -b && vite build; svelte: vite build) + separate checker
    r.build = await run(arm.buildCmd, { cwd: dir, timeoutMs: 300000 });
    r.distBytes = distBytes(path.join(dir, 'dist'));
    r.check = await run(arm.checkCmd, { cwd: dir, timeoutMs: 300000 });
    // seeded bugs in a scratch copy
    const scratch = path.resolve(import.meta.dirname, `../../arms/scratch-${arm.name}`);
    fs.rmSync(scratch, { recursive: true, force: true });
    execSync(`cp -r ${dir} ${scratch}`, { cwd: import.meta.dirname });
    fs.rmSync(path.join(scratch, 'node_modules'), { recursive: true, force: true });
    fs.rmSync(path.join(scratch, 'dist'), { recursive: true, force: true });
    fs.symlinkSync(path.join(dir, 'node_modules'), path.join(scratch, 'node_modules'), 'dir');  // reuse the arm's node_modules (npx must not reach the network)
    const compFile = path.join(scratch, 'src/bench', arm.name === 'vue' ? 'Board.vue' : 'Board.svelte');
    r.bugs = [];
    for (const bug of BUGS[arm.name]) {
      const orig = fs.readFileSync(compFile, 'utf8');
      const patched = bug.patch(orig);
      if (patched === orig) { r.bugs.push({ id: bug.id, applied: false }); continue; }
      fs.writeFileSync(compFile, patched);
      const res = await run(arm.checkCmd, { cwd: scratch, timeoutMs: 300000 });
      const text = (res.out + '\n' + res.err);
      r.bugs.push({ id: bug.id, applied: true, toolExit: res.code, caught: res.code !== 0, firstErrorLine: text.split('\n').filter((l) => l.trim()).slice(0, 6).join(' | ').slice(0, 500) });
      fs.writeFileSync(compFile, orig); // restore for the next bug
    }
    results.arms[arm.name] = r;
    results.finishedAt = new Date().toISOString();
    fs.writeFileSync(path.join(OUT, 'laneC-partial.json'), JSON.stringify(results, null, 2));
  }
  fs.writeFileSync(path.join(OUT, 'laneC.json'), JSON.stringify(results, null, 2));
  const log = [];
  for (const [name, r] of Object.entries(results.arms)) {
    log.push(`${name}: devCold=${r.devCold.first200Ms}ms devWarm=${r.devWarm.map((w) => w.first200Ms).join('/')}ms build=${r.build.code}/${r.build.ms}ms dist=${r.distBytes?.total}B/${r.distBytes?.files}f check=${r.check.code}/${r.check.ms}ms`);
    for (const b of r.bugs) log.push(`  ${b.id}: applied=${b.applied} caught=${b.caught} exit=${b.toolExit}`);
  }
  fs.writeFileSync(path.join(OUT, 'laneC.log'), log.join('\n') + '\n');
  console.log(log.join('\n'));
  process.exit(0);
}

function distBytes(distDir) {
  if (!fs.existsSync(distDir)) return { total: 0, files: 0 };
  let total = 0, files = 0;
  const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else { files++; total += fs.statSync(p).size; } } };
  walk(distDir);
  return { total, files };
}

main().catch((e) => { console.error('LANEC FATAL', e); process.exit(1); });
