// seam-checker.mjs — DRAFT audit tool for the 67 Cakepanz merge-day gate (MUSE, council prompt v4 Part 2).
//
// WHAT IT DOES
//   Reads a handoff seam inventory (SEAM-INVENTORY.json) from an extracted Cakepanz delivery
//   tree and verifies, for every view model (VM) it names, that each named engine file exists
//   in the tree at exactly the sha256 the inventory claims — and, when a git repo holding the
//   engine pin is available, that the same bytes are the blob at the claimed pin commit.
//   It also checks COMPLETENESS: every engine file the shell code actually imports must be
//   named by at least one VM; an engine file the shell uses but no VM names is a FAIL.
//   It reports PASS/FAIL loudly, one line per VM plus a summary, and exits non-zero on ANY
//   mismatch, missing file, missing inventory, unnamed engine use, or pin disagreement.
//
// WHAT IT IS NOT
//   An audit, not an editor: it never writes into the tree (except --generate, which prints a
//   candidate inventory to STDOUT for a human to review and sign). It never edits the engine,
//   the shell, or any delivery. It is a DRAFT from the MUSE council seat (labeled draft answer
//   to council prompt v4 Part 2, NOT a formal council filing, NOT independent verification).
//
// THE INVENTORY FORMAT (SEAM-INVENTORY.json, placed at the delivery root by the handoff author)
//   {
//     "enginePin": "4ca9a071",                      // full or abbreviated commit sha; REQUIRED
//     "engineRoot": "src/engine",                  // path inside the tree; default "src/engine"
//     "shellRoot": "src",                          // shell code scanned for engine imports; default "src"
//     "vms": [
//       { "vm": "feedVM", "file": "src/lib/feedVM.ts",
//         "engine": [
//           { "file": "src/engine/sports/nfl/app/store.ts", "sha256": "<hex>" },
//           ... ] }
//     ]
//   }
//   "engine" entries are the ONLY engine files that VM may touch. A VM that names nothing
//   (empty "engine" array) FAILS. A sha256 that does not match the file on disk FAILS.
//   A pin that does not match the README/ENGINE_PIN claim, or a file whose bytes differ from
//   the same path at the pin commit in the repo, FAILS.
//
// HOW TO RUN
//   Generate a candidate inventory from a real tree (review it before signing!):
//     node seam-checker.mjs --generate --root /path/to/extracted-delivery
//   Verify a signed inventory against the tree:
//     node seam-checker.mjs --check --root /path/to/extracted-delivery
//   Also verify bytes against the pin commit in a git repo (needs the engine history):
//     node seam-checker.mjs --check --root /path/to/extracted-delivery --repo /path/to/repo
//   From a zip (extract to a temp dir first; the checker never reads zips itself):
//     mkdir /tmp/ck && unzip delivery.zip -d /tmp/ck && node seam-checker.mjs --check --root /tmp/ck
//   Exit code: 0 = PASS (every check green); 1 = FAIL (anything above failed); 2 = usage error.
//
// FALSIFICATION (prove it can fail — run this before trusting it on merge day):
//   cp -r /path/to/extracted-delivery /tmp/ck-mut
//   printf 'x' >> /tmp/ck-mut/src/engine/sports/nfl/engine/flex.ts   # one byte
//   node seam-checker.mjs --check --root /tmp/ck-mut                  # MUST exit 1
//   (MUSE ran exactly this against the s5 delivery on 2026-11-16: the mutated tree failed
//   on the flex.ts hash for every VM naming it, exit 1. See the Part 2 inbox filing.)
//
// LIMITS (honest ones)
//   - sha256 catches byte drift, not semantic drift: a re-pin that keeps file bytes but
//     changes which commit they came from is caught only via --repo (pin-blob check).
//   - The import scan is textual (grep for engine/ paths in .ts/.svelte under shellRoot,
//     excluding shellRoot/engine itself). Dynamic imports / string-built paths would escape it.
//   - It trusts the inventory's "vm"/"file" labels; it cannot tell whether a VM actually
//     USES a file it names (over-naming is allowed, under-naming fails).
//   - It does not run the battery or the build. It is one gate, not the cutover.

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const usage = () => {
  console.error('usage: node seam-checker.mjs --check|--generate --root <tree-dir> [--repo <git-repo>] [--inventory <path>]');
  process.exit(2);
};

const args = process.argv.slice(2);
const opt = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') opt.mode = 'check';
  else if (args[i] === '--generate') opt.mode = 'generate';
  else if (args[i] === '--root') opt.root = args[++i];
  else if (args[i] === '--repo') opt.repo = args[++i];
  else if (args[i] === '--inventory') opt.inventory = args[++i];
  else usage();
}
if (!opt.mode || !opt.root) usage();
const ROOT = path.resolve(opt.root);
const fail = [];
const pass = [];
const note = (ok, line) => (ok ? pass : fail).push(line);

const sha256File = (p) => createHash('sha256').update(fs.readFileSync(p)).digest('hex');

// --- scan the shell for the engine files it really imports (textual, .ts/.svelte, not src/engine itself)
function shellEngineImports(shellRoot, engineRoot) {
  const used = new Map(); // normalized engine path -> Set of importing shell files
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (p !== path.resolve(ROOT, engineRoot)) walk(p); continue; }
      if (!/\.(ts|svelte)$/.test(e.name)) continue;
      const text = fs.readFileSync(p, 'utf8');
      for (const m of text.matchAll(/engine\/[A-Za-z0-9/_-]+\.ts/g)) {
        const rel = m[0]; // already relative to src/, e.g. engine/sports/nfl/engine/flex.ts
        const full = path.join(ROOT, 'src', rel);
        if (!fs.existsSync(full)) continue; // a mention in a comment, not an import of a real file
        if (!used.has(rel)) used.set(rel, new Set());
        used.get(rel).add(path.relative(ROOT, p));
      }
    }
  };
  walk(path.resolve(ROOT, shellRoot));
  return used;
}

// --- pin blob check: bytes at <pin>:colors/<engine path> in the repo (engine lives at colors/src)
function pinBlobHash(repo, pin, engineRelPath) {
  // engineRelPath like engine/sports/nfl/engine/flex.ts -> colors/src/sports/nfl/engine/flex.ts
  const repoPath = 'colors/src/' + engineRelPath.replace(/^engine\//, '');
  try {
    const out = execFileSync('git', ['-C', repo, 'cat-file', '-p', `${pin}:${repoPath}`], { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
    return createHash('sha256').update(out).digest('hex');
  } catch {
    return null; // path does not exist at that pin
  }
}

function readInventory(root, explicit) {
  const p = explicit ? path.resolve(explicit) : path.join(root, 'SEAM-INVENTORY.json');
  if (!fs.existsSync(p)) return { missing: p };
  return { data: JSON.parse(fs.readFileSync(p, 'utf8')), path: p };
}

// --- --generate: build a candidate inventory from the real import graph, grouped by importing shell file
if (opt.mode === 'generate') {
  const used = shellEngineImports('src', 'src/engine');
  // Group engine files by the shell VM/module that imports them. A .svelte screen is its own
  // group; App.svelte is the composition root and is grouped as "App".
  const groups = new Map(); // group name -> { file, engine: Map<rel, sha256> }
  const groupOf = (shellRel) => {
    const base = path.basename(shellRel, path.extname(shellRel));
    return base === 'App' ? 'App' : base;
  };
  for (const [engRel, importers] of used) {
    for (const imp of importers) {
      const g = groupOf(imp);
      if (!groups.has(g)) groups.set(g, { vm: g, file: imp, engine: new Map() });
      groups.get(g).engine.set(engRel, sha256File(path.join(ROOT, 'src', engRel)));
    }
  }
  const vms = [...groups.values()].sort((a, b) => a.vm.localeCompare(b.vm)).map((g) => ({
    vm: g.vm,
    file: g.file,
    engine: [...g.engine.entries()].sort().map(([file, sha256]) => ({ file: 'src/' + file, sha256 })),
  }));
  // The pin is NOT guessed: the generator reads it from the tree's own claims and reports disagreement.
  const claims = {};
  const readme = path.join(ROOT, 'README.md');
  if (fs.existsSync(readme)) {
    const m = fs.readFileSync(readme, 'utf8').match(/Pinned engine commit:\W*`?([0-9a-f]{7,40})`?/i);
    if (m) claims.readme = m[1];
  }
  const app = path.join(ROOT, 'src', 'App.svelte');
  if (fs.existsSync(app)) {
    const m = fs.readFileSync(app, 'utf8').match(/ENGINE_PIN\s*=\s*'[^']*@([0-9a-f]{7,40})'/);
    if (m) claims.appSvelte = m[1];
  }
  console.log(JSON.stringify({
    enginePin: claims.readme ?? claims.appSvelte ?? 'FILL-IN-THE-PIN-SHA',
    pinClaims: claims,
    note: 'CANDIDATE inventory generated from the actual import graph — a human must review, fill/confirm enginePin, and sign it before --check means anything.',
    engineRoot: 'src/engine',
    shellRoot: 'src',
    vms,
  }, null, 2));
  process.exit(0);
}

// --- --check
const inv = readInventory(ROOT, opt.inventory);
if (inv.missing) {
  console.log(`FAIL  no handoff seam inventory: ${inv.missing} does not exist — the delivery names no seam at all`);
  console.log('FAIL  seam inventory audit: 0 VMs checked, 0 engine files verified');
  process.exit(1);
}
const data = inv.data;
const engineRoot = data.engineRoot ?? 'src/engine';
const shellRoot = data.shellRoot ?? 'src';
console.log(`seam inventory: ${inv.path}`);
console.log(`claimed engine pin: ${data.enginePin ?? '(none — FAIL)'}`);

if (!data.enginePin || !/^[0-9a-f]{7,40}$/.test(String(data.enginePin))) {
  fail.push('inventory names no usable enginePin');
}
if (!Array.isArray(data.vms) || data.vms.length === 0) {
  fail.push('inventory names no VMs (empty "vms")');
}

// Pin claims inside the tree must agree with the inventory pin.
const readme = path.join(ROOT, 'README.md');
if (fs.existsSync(readme)) {
  const m = fs.readFileSync(readme, 'utf8').match(/Pinned engine commit:\W*`?([0-9a-f]{7,40})`?/i);
  if (m) note(m[1].startsWith(String(data.enginePin).slice(0, 7)) || String(data.enginePin).startsWith(m[1]), `README pin ${m[1]} vs inventory pin ${data.enginePin}`);
  else note(false, 'README names no pinned engine commit');
}
const app = path.join(ROOT, 'src', 'App.svelte');
if (fs.existsSync(app)) {
  const m = fs.readFileSync(app, 'utf8').match(/ENGINE_PIN\s*=\s*'[^']*@([0-9a-f]{7,40})'/);
  if (m) note(m[1].startsWith(String(data.enginePin).slice(0, 7)) || String(data.enginePin).startsWith(m[1]), `App.svelte ENGINE_PIN ${m[1]} vs inventory pin ${data.enginePin}`);
}

const named = new Map(); // engine rel (src/...) -> Set of VM names
for (const vm of data.vms ?? []) {
  const label = `VM ${vm.vm ?? '(unnamed)'} (${vm.file ?? 'no file'})`;
  if (!Array.isArray(vm.engine) || vm.engine.length === 0) {
    fail.push(`${label} names NO engine files — a VM that names nothing fails`);
    continue;
  }
  let vmOk = true;
  for (const entry of vm.engine) {
    const rel = entry.file; // e.g. src/engine/sports/nfl/engine/flex.ts
    const disk = path.join(ROOT, rel);
    if (!fs.existsSync(disk)) { fail.push(`${label}: ${rel} does not exist in the tree`); vmOk = false; continue; }
    const actual = sha256File(disk);
    if (actual !== entry.sha256) { fail.push(`${label}: ${rel} sha256 mismatch — inventory ${String(entry.sha256).slice(0, 12)}… vs disk ${actual.slice(0, 12)}…`); vmOk = false; }
    if (!named.has(rel)) named.set(rel, new Set());
    named.get(rel).add(vm.vm);
    if (opt.repo) {
      const engRel = rel.replace(/^src\//, ''); // engine/... for the repo mapping
      const pinHash = pinBlobHash(opt.repo, data.enginePin, engRel);
      if (pinHash === null) { fail.push(`${label}: ${rel} does not exist at pin ${data.enginePin} in the repo`); vmOk = false; }
      else if (pinHash !== actual) { fail.push(`${label}: ${rel} differs from pin ${data.enginePin} (disk ${actual.slice(0, 12)}… vs pin ${pinHash.slice(0, 12)}…)`); vmOk = false; }
    }
  }
  if (vmOk) pass.push(`${label}: ${vm.engine.length} engine file(s), hashes match`);
}

// Completeness: every engine file the shell really imports must be named by >= 1 VM.
const used = shellEngineImports(shellRoot, engineRoot);
for (const [engRel, importers] of [...used.entries()].sort()) {
  const srcRel = 'src/' + engRel;
  if (!named.has(srcRel)) {
    fail.push(`UNNAMED ENGINE USE: ${srcRel} is imported by ${[...importers].join(', ')} but no VM names it`);
  }
}
const unused = [...named.keys()].filter((r) => !used.has(r.replace(/^src\//, '')));
for (const r of unused.sort()) note(true, `inventory names ${r} (no shell import found — over-naming, allowed, noted)`);

for (const p of pass) console.log('PASS  ' + p);
for (const f of fail) console.log('FAIL  ' + f);
console.log(`\n== SEAM CHECK · ${pass.length} pass · ${fail.length} fail · ${used.size} engine files imported by the shell · ${named.size} named by the inventory ==`);
process.exit(fail.length ? 1 : 0);
