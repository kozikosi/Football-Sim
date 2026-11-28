/* engine-node-gen.mjs — the Part-D precompile generator (shared by the CLI and the register hook).
 *
 * WHY: the engine snapshot carries ONE TypeScript parameter property
 *   src/engine/platform/localstorage.ts:31  constructor(private readonly ls: Storage | null, ...)
 * Strip-only mode (Node 22.6+/23+/24/26 default) cannot parse it — ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX —
 * and --experimental-transform-types existed only in Node 22.7–24 (removed in Node 26). The node-side
 * suites import the port (seam.ts) which reaches that file, so they were Node-24-only.
 *
 * ROUTE 2 (per SNAPSHOT.md): emit a GENERATED copy of the snapshot into src/engine-node/ with that one
 * parameter property replaced by explicit fields (a no-behaviour-change edit), and point the node-side
 * imports at the copy via the loader hook (scripts/engine-node-loader.mjs). The snapshot itself is
 * NEVER edited — diff -rq against the pin must stay 0 — and the generated directory is a build
 * artifact (excluded from CHECKSUMS/MANIFEST, never committed).
 *
 * GUARD: exactly ONE parameter property is expected in the whole snapshot. If the count is not 1,
 * or the anchor line does not match byte-for-byte, the generator FAILS LOUDLY — that is a §5 to the
 * Architect (the parameter property has spread), not something to work around.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src', 'engine');
const OUT = path.join(ROOT, 'src', 'engine-node');
const TARGET = path.join('platform', 'localstorage.ts');

const ANCHOR = 'constructor(private readonly ls: Storage | null, private readonly o: LocalStorageOptions = {}) {}';
const REPLACEMENT = [
  '  // PRECOMPILED (Part D route 2): the parameter property became explicit fields so strip-only',
  '  // Node (22.6+/23+/24/26) can parse this module. The snapshot file is untouched; this generated',
  '  // copy is produced by scripts/precompile-engine.mjs and must differ from the pin ONLY here.',
  '  private readonly ls: Storage | null;',
  '  private readonly o: LocalStorageOptions;',
  '  constructor(ls: Storage | null, o: LocalStorageOptions = {}) {',
  '    this.ls = ls;',
  '    this.o = o;',
  '  }',
].join('\n');

// \b(private|public|protected)\b inside a constructor arglist — the parameter-property signature
const PARAM_PROP = /\b(private|public|protected)\s+(?:readonly\s+)?[A-Za-z_$][\w$]*\s*:/;

function scanParameterProperties(text) {
  let count = 0;
  const re = /constructor\s*\(([^)]*)\)/gs;
  let m;
  while ((m = re.exec(text)) !== null) if (PARAM_PROP.test(m[1])) count += 1;
  return count;
}

export function generate({ log = () => {} } = {}) {
  if (!fs.existsSync(SRC)) throw new Error(`engine-node-gen: ${SRC} missing — the snapshot is not in this tree`);
  // 1. the guard: the snapshot must carry EXACTLY one parameter property, at the known anchor
  const files = [];
  const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else files.push(p); } };
  walk(SRC);
  const rels = files.map((p) => path.relative(SRC, p).split(path.sep).join('/')).sort();
  const found = [];
  for (const rel of rels) {
    const text = fs.readFileSync(path.join(SRC, rel), 'utf8');
    const n = scanParameterProperties(text);
    if (n > 0) found.push(`${rel} ×${n}`);
  }
  if (found.length !== 1 || !found[0].startsWith(TARGET + ' ×1')) {
    throw new Error(`engine-node-gen: expected exactly ONE parameter property at ${TARGET}, found: ${found.join('; ') || 'none'} — the parameter property has spread: file a §5 to the Architect, do NOT extend this transform`);
  }
  const source = fs.readFileSync(path.join(SRC, TARGET), 'utf8');
  if (!source.includes(ANCHOR)) {
    throw new Error(`engine-node-gen: the anchor line moved in ${TARGET} — update ANCHOR/REPLACEMENT from the pin's bytes (one constructor), do not guess`);
  }
  // 2. emit: every file byte-verbatim EXCEPT the one target
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  let transformed = 0;
  for (const rel of rels) {
    const dst = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    if (rel === TARGET) {
      const out = source.replace(ANCHOR, REPLACEMENT);
      if (out === source) throw new Error('engine-node-gen: the transform did not apply');
      if (scanParameterProperties(out) !== 0) throw new Error('engine-node-gen: the generated copy still carries a parameter property');
      fs.writeFileSync(dst, out);
      transformed += 1;
    } else {
      fs.copyFileSync(path.join(SRC, rel), dst);
    }
  }
  // 3. the proof of minimalism: the generated tree differs from the snapshot in EXACTLY one file
  const diffs = rels.filter((rel) => !fs.readFileSync(path.join(SRC, rel)).equals(fs.readFileSync(path.join(OUT, rel))));
  if (diffs.length !== 1 || diffs[0] !== TARGET) {
    throw new Error(`engine-node-gen: generated copy differs from the snapshot in ${diffs.length} file(s) (${diffs.join(', ')}) — must be exactly ${TARGET}`);
  }
  // 4. the stamp: the register hook refuses to serve a stale generated copy (any snapshot byte
  //    change — e.g. a re-pin — invalidates it)
  const sourceSha = crypto.createHash('sha256').update(source).digest('hex');
  const treeSha = crypto.createHash('sha256').update(
    rels.map((rel) => `${rel}  ${crypto.createHash('sha256').update(fs.readFileSync(path.join(SRC, rel))).digest('hex')}`).join('\n'),
  ).digest('hex');
  const stamp = {
    generatedAt: new Date().toISOString(),
    sourceSha256: sourceSha,
    snapshotTreeSha256: treeSha,
    snapshotFiles: rels.length,
    transformed: [TARGET],
  };
  fs.writeFileSync(path.join(OUT, '.stamp.json'), JSON.stringify(stamp, null, 2) + '\n');
  log(`engine-node: generated ${rels.length} files (1 transformed: ${TARGET}) — snapshot untouched`);
  return stamp;
}

export function treeSha() {
  const files = [];
  const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else files.push(p); } };
  walk(SRC);
  return crypto.createHash('sha256').update(
    files.map((p) => path.relative(SRC, p).split(path.sep).join('/')).sort()
      .map((rel) => `${rel}  ${crypto.createHash('sha256').update(fs.readFileSync(path.join(SRC, rel))).digest('hex')}`).join('\n'),
  ).digest('hex');
}

export function isFresh() {
  try {
    const stamp = JSON.parse(fs.readFileSync(path.join(OUT, '.stamp.json'), 'utf8'));
    return stamp.snapshotTreeSha256 === treeSha();
  } catch {
    return false;
  }
}

export const PATHS = { ROOT, SRC, OUT, TARGET };
