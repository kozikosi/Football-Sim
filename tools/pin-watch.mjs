#!/usr/bin/env node
// tools/pin-watch.mjs — council tool (P-355): does this tree carry the engine pin it claims?
//
// Design (Ernie's F-5, 2026-11-16 round):
//   1. COUNT first — the engine snapshot's file list in the tree vs the named commit (colors/src).
//   2. SPOT-HASH second — content hash of EVERY engine file the two share (superset of F-5's
//      three-file spot check; the files are small, the full set is cheap, and a partial check
//      is how a one-file drift slips through).
//   3. The manifest (CHECKSUMS/MANIFEST/README pin string) is REPORTED, never relied on alone —
//      the manifest is the thing that goes stale.
//
// The tree under test is normally a `git archive` extract with NO repo state of its own; the pin
// side reads the object store of the repository invoked from. If there is no repo (or the pin does
// not resolve in it), the tool exits 1 naming the missing anchor. It never prints a green it did
// not measure.
//
// Exit codes (precedence: 1 > 3 > 2 > 4):
//   0  count + content hash agree with --pin (pin-line notes may still print; see --strict)
//   1  precondition failure — the file or anchor it needs is missing (named)
//   3  content mismatch — a shared file differs (files named); wins over a count mismatch
//   2  count mismatch only — the file SET differs (missing/extra named), shared files clean
//   4  --strict only: a pin-like token in the tree's docs resolves to a different commit
//
// Amended 2026-11-18 (peer receipt: Pickle `inbox/20261118-0006-pickle-P-189-pin-watch-drift-gate.md`):
// the pre-fix tool exited at the count check and never hashed the shared set — the deployed
// gh-pages tree (57 files vs 4ca9a071's 52, five extras) reported "count MISMATCH" and NEVER
// named the six drifted shared files. Count is now a report; the hash check always runs; exit 3
// wins over exit 2.
//
// Usage:
//   node tools/pin-watch.mjs <tree-dir> --pin <commit-ish> [--pin-prefix colors/src]
//         [--engine-subdir src/engine] [--flex-json tools/mathlab/flex.json]
//         [--pin-flex tools/mathlab/flex.json] [--strict] [--full]
//   node tools/pin-watch.mjs --self-test --pin <commit-ish>   (the falsifier; needs repo object store)

import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import {
  existsSync, readdirSync, readFileSync, statSync,
  mkdtempSync, mkdirSync, rmSync, cpSync, writeFileSync,
} from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { argv, exit, stdout, stderr } from 'node:process';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const die1 = (msg) => { stderr.write(`pin-watch: FAIL (precondition): ${msg}\n`); return 1; };
const note = (msg) => stdout.write(`pin-watch: ${msg}\n`);

function walk(dir, base) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === 'dist') continue;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p, base));
    else if (ent.isFile()) out.push(relative(base, p).split(sep).join('/'));
  }
  return out;
}

function git(args, opts = {}) {
  return execFileSync('git', args, { maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'], ...opts });
}

function resolvePin(pin) {
  try {
    return git(['rev-parse', '--verify', `${pin}^{commit}`]).toString().trim();
  } catch {
    return null;
  }
}

function pinFiles(pin, pinPrefix) {
  try {
    const out = git(['ls-tree', '-r', '--name-only', pin, '--', pinPrefix]).toString();
    const prefix = pinPrefix.endsWith('/') ? pinPrefix.length : pinPrefix.length + 1;
    return out.split('\n').filter(Boolean).map((p) => p.slice(prefix));
  } catch {
    return null;
  }
}

const DOC_NAMES = ['README.md', 'SNAPSHOT.md', 'SHELL-STATUS.md', 'MANIFEST.txt',
                   'CHECKSUMS.txt', 'CHECKSUMS-slice1.txt', 'CHECKSUMS-slice2.txt',
                   'MERGE-README.md', 'VERIFY.txt', 'DELIVERY-DECISIONS.md'];
const HEX = /\b[0-9a-f]{7,40}\b/g;

function scanPinLines(treeDir) {
  const found = [];
  for (const name of DOC_NAMES) {
    const p = join(treeDir, name);
    if (!existsSync(p)) continue;
    const lines = readFileSync(p, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(HEX);
      if (!m) continue;
      for (const tok of m) {
        const sha = resolvePin(tok);
        if (sha) found.push({ file: name, line: i + 1, token: tok, sha });
      }
    }
  }
  return found;
}

function opt(args, name, dflt) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt;
}
const has = (args, name) => args.includes(`--${name}`);

async function check(args) {
  const treeDir = args[0] && !args[0].startsWith('--') ? resolve(args[0]) : null;
  const pin = opt(args, 'pin', null);
  const pinPrefix = opt(args, 'pin-prefix', 'colors/src');
  const engineSubdir = opt(args, 'engine-subdir', 'src/engine');
  const flexJson = opt(args, 'flex-json', 'tools/mathlab/flex.json');
  const pinFlex = opt(args, 'pin-flex', 'tools/mathlab/flex.json');
  const full = has(args, 'full');

  if (!treeDir) return die1('no <tree-dir> given. Usage: node tools/pin-watch.mjs <tree-dir> --pin <commit-ish>');
  if (!existsSync(treeDir) || !statSync(treeDir).isDirectory()) return die1(`tree-dir not found: ${treeDir}`);
  const engineDir = join(treeDir, engineSubdir);
  if (!existsSync(engineDir) || !statSync(engineDir).isDirectory()) return die1(`anchor not found: ${engineDir} (the tree's engine snapshot directory)`);
  if (!pin) return die1('no --pin given (the pin the tree claims to carry)');
  const pinSha = resolvePin(pin);
  if (!pinSha) return die1(`pin does not resolve in this repository: ${pin}`);
  note(`pin ${pin} -> ${pinSha}`);
  note(`tree ${treeDir}`);

  // ---- 1. COUNT ----------------------------------------------------------------
  const treeFiles = walk(engineDir, engineDir).sort();
  const pinList = pinFiles(pinSha, pinPrefix);
  if (pinList === null) return die1(`pin prefix not found at ${pinSha}: ${pinPrefix}`);
  const pinSet = new Set(pinList);
  const treeSet = new Set(treeFiles);
  const missing = [...pinSet].filter((f) => !treeSet.has(f)).sort();
  const extra = [...treeSet].filter((f) => !pinSet.has(f)).sort();
  note(`count: tree ${treeFiles.length} engine file(s) vs pin ${pinSet.size} -> ${missing.length === 0 && extra.length === 0 ? 'MATCH' : 'MISMATCH'}`);
  const countFailed = missing.length > 0 || extra.length > 0;
  if (countFailed) {
    for (const f of missing.slice(0, full ? 1e9 : 10)) stderr.write(`pin-watch: MISSING from tree (in pin): ${f}\n`);
    for (const f of extra.slice(0, full ? 1e9 : 10)) stderr.write(`pin-watch: EXTRA in tree (not in pin): ${f}\n`);
    stderr.write(`pin-watch: count ${missing.length} missing, ${extra.length} extra vs ${pinSha} (named; hash check follows — extras are not accepted as a mismatch of the shared set)\n`);
  }

  // ---- 2. HASH (always runs — a count mismatch never hides drift in the shared set) ----
  const mismatches = [];
  // hash only files present on BOTH sides; missing files were named by the count check
  const hashSet = treeFiles.filter((f) => pinSet.has(f));
  for (const rel of hashSet) {
    const treeBuf = readFileSync(join(engineDir, rel));
    let pinBuf;
    try {
      pinBuf = git(['show', `${pinSha}:${pinPrefix}/${rel}`]);
    } catch {
      mismatches.push(`${rel} (unreadable at pin — should have been caught by count)`);
      continue;
    }
    if (sha256(treeBuf) !== sha256(pinBuf)) mismatches.push(rel);
  }
  const treeFlex = join(treeDir, flexJson);
  if (existsSync(treeFlex)) {
    try {
      const pinFlexBuf = git(['show', `${pinSha}:${pinFlex}`]);
      if (sha256(readFileSync(treeFlex)) !== sha256(pinFlexBuf)) mismatches.push(`${flexJson} (flex table differs from pin)`);
    } catch {
      note(`note: ${pinFlex} not readable at ${pinSha} — flex check skipped (not a pass condition)`);
    }
  } else {
    note(`note: ${flexJson} not present in tree — flex check skipped (not a pass condition)`);
  }
  if (mismatches.length) {
    for (const f of mismatches.slice(0, full ? 1e9 : 10)) stderr.write(`pin-watch: CONTENT DIFFERS: ${f}\n`);
    stderr.write(`pin-watch: FAIL (content): ${mismatches.length} file(s) differ from ${pinSha}\n`);
    return 3;
  }
  note(`content: ${hashSet.length} shared engine file(s) + flex table byte-identical to ${pinSha}`);

  // ---- 3. PIN-LINE (reported, never alone; --strict makes it fatal) -----------
  const pins = scanPinLines(treeDir);
  let bad = 0;
  if (pins.length === 0) {
    note('pin-line: no pin-like tokens found in the tree docs (README/SNAPSHOT/CHECKSUMS/…) — nothing to cross-check');
  } else {
    for (const p of pins) {
      const okTok = p.sha === pinSha;
      if (!okTok) bad++;
      stdout.write(`pin-watch: pin-line ${okTok ? 'OK  ' : 'WARN'} ${p.file}:${p.line} names ${p.token} -> ${p.sha.slice(0, 12)}${okTok ? '' : ' (DIFFERS from --pin)'}\n`);
    }
  }
  const strictFail = bad > 0 && has(args, 'strict');
  if (strictFail) stderr.write(`pin-watch: FAIL (--strict): ${bad} doc line(s) name a different commit than --pin\n`);

  // ---- 4. MANIFEST (informational; never a pass condition) ---------------------
  note('manifest: CHECKSUMS/MANIFEST reported only — never used as a pass condition (the manifest is the thing that goes stale)');
  if (strictFail) return 4;
  if (countFailed) {
    note(`RESULT: tree carries ${pinSha} on the shared set, but the file SET differs (count) — exit 2`);
    return 2;
  }
  note(`RESULT: tree carries ${pinSha} (count + content verified)${bad ? ` — BUT ${bad} doc line(s) name a different pin (see WARN above)` : ''}`);
  return 0;
}

// ---- self-test: the falsifier ---------------------------------------------------
function selfTest(args) {
  const pin = opt(args, 'pin', null);
  if (!pin) return die1('--self-test needs --pin <commit-ish> (a pin in this repository to test against)');
  const pinSha = resolvePin(pin);
  if (!pinSha) return die1(`pin does not resolve in this repository: ${pin}`);
  const tmp = mkdtempSync(join(tmpdir(), 'pin-watch-selftest-'));
  let fails = 0;
  const expect = (label, got, want) => {
    const ok = got === want;
    stdout.write(`self-test ${ok ? 'ok  ' : 'FAIL'} ${label}: exit ${got} (wanted ${want})\n`);
    if (!ok) fails++;
  };
  const runTool = (a) => {
    try {
      execFileSync('node', [process.argv[1], ...a], { stdio: 'pipe' });
      return 0;
    } catch (e) {
      return typeof e?.status === 'number' ? e.status : 1;
    }
  };
  try {
    // fixture 1: clean extract of the pin's colors/src at the pin -> exit 0
    const clean = join(tmp, 'clean');
    mkdirSync(clean, { recursive: true });
    const tar = git(['archive', pinSha, 'colors/src'], { maxBuffer: 256 * 1024 * 1024 });
    execFileSync('tar', ['-x', '-C', clean], { input: tar });
    mkdirSync(join(clean, 'src'), { recursive: true });
    execFileSync('mv', [join(clean, 'colors', 'src'), join(clean, 'src', 'engine')]);
    rmSync(join(clean, 'colors'), { recursive: true, force: true });
    expect('clean tree at the pin passes', runTool([clean, '--pin', pinSha]), 0);
    // fixture 2: one engine file tampered -> exit 3
    const corrupt = join(tmp, 'corrupt');
    cpSync(clean, corrupt, { recursive: true });
    const victim = join(corrupt, 'src', 'engine', 'sports', 'nfl', 'engine', 'flex.ts');
    if (!existsSync(victim)) throw new Error(`fixture victim missing at pin: ${victim}`);
    writeFileSync(victim, readFileSync(victim) + '\n// tampered\n');
    expect('one tampered engine file is caught (exit 3)', runTool([corrupt, '--pin', pinSha]), 3);
    // fixture 2b: tampered shared file AND an extra file (the deployed-tree shape) -> exit 3, not 2
    const drift = join(tmp, 'drift');
    cpSync(corrupt, drift, { recursive: true });
    mkdirSync(join(drift, 'src', 'engine', 'core'), { recursive: true });
    writeFileSync(join(drift, 'src', 'engine', 'core', 'extra-unpinned.ts'), 'export const x = 1;\n');
    expect('extras do not mask drift (exit 3)', runTool([drift, '--pin', pinSha]), 3);
    // fixture 2c: extras only, shared set clean (a legitimate port-seam shape) -> exit 2
    const extrasOnly = join(tmp, 'extras-only');
    cpSync(clean, extrasOnly, { recursive: true });
    mkdirSync(join(extrasOnly, 'src', 'engine', 'core'), { recursive: true });
    writeFileSync(join(extrasOnly, 'src', 'engine', 'core', 'extra-unpinned.ts'), 'export const x = 1;\n');
    expect('extras alone are exit 2 (content clean)', runTool([extrasOnly, '--pin', pinSha]), 2);
    // fixture 3: an engine file deleted -> exit 2 (count) or 3
    const missingFx = join(tmp, 'missing');
    cpSync(clean, missingFx, { recursive: true });
    rmSync(join(missingFx, 'src', 'engine', 'sports', 'nfl', 'engine', 'flex.ts'));
    const rcMissing = runTool([missingFx, '--pin', pinSha]);
    expect('a deleted engine file is caught (exit 2)', rcMissing, 2);
    // fixture 4: tree-dir does not exist -> exit 1
    expect('missing tree-dir exits 1', runTool([join(tmp, 'nope'), '--pin', pinSha]), 1);
    // fixture 5: pin does not resolve -> exit 1
    expect('unresolvable pin exits 1', runTool([clean, '--pin', 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeef']), 1);
    // fixture 6: engine-subdir missing -> exit 1
    const noEngine = join(tmp, 'noengine');
    mkdirSync(noEngine, { recursive: true });
    expect('missing engine-subdir exits 1', runTool([noEngine, '--pin', pinSha]), 1);
  } catch (e) {
    stderr.write(`self-test ERROR: ${e?.message ?? e}\n`);
    return 1;
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  }
  stdout.write(fails === 0 ? 'self-test: ALL FIXTURES BEHAVE\n' : `self-test: ${fails} FIXTURE(S) MISBEHAVED\n`);
  return fails === 0 ? 0 : 1;
}

const args = argv.slice(2);
const code = args[0] === '--self-test' ? selfTest(args.slice(1)) : await check(args);
exit(code);
