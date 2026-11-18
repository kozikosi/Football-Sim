// tools/bucket-bar-falsifier.mjs — falsifies tools/bucket-bar.ts itself.
// Ernie's rule: a tools proposal must have a falsifier that can FAIL on the tool
// itself — exit 1 naming the file and the check, never green on a broken tool.
// Checks bucket-bar: (1) exits 0 on a clean extract; (2) reproduces the 120k paired
// drives signature (pools ~11.0x, GLM ~10.9x, negative diff); (3) pack args actually
// matter (2016-2022 packs give different drives than 2023-2025).
// Usage: node tools/bucket-bar-falsifier.mjs   (extracts engine pin 65673a00 to a temp dir)
// Exit 0 = bucket-bar trustworthy; exit 1 = bucket-bar broken (names bucket-bar.ts + check).
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmdirSync, unlinkSync, cpSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO = process.cwd();
const COMMIT = '65673a00';
let failures = 0;
function check(label, cond, extra) {
  console.log((cond ? 'PASS' : 'FAIL') + ' ' + label + (extra ? ' — ' + extra : ''));
  if (!cond) failures += 1;
}
function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 24, ...opts });
  return { code: r.status == null ? 1 : r.status, out: String(r.stdout == null ? '' : r.stdout) + String(r.stderr == null ? '' : r.stderr) };
}

const TMP = mkdtempSync(path.join(os.tmpdir(), 'bucket-bar-falsify-'));
// Clean archive extract (archive-extract shape: zero repo state beyond committed packs).
run('sh', ['-c', `git -C ${REPO} archive ${COMMIT} colors data | tar -x -C ${TMP}`], { maxBuffer: 1 << 28 });
const COLORS = TMP + '/colors';
check('extract has colors/tools', existsSync(COLORS + '/tools'), COLORS);
const BB = path.resolve('tools/bucket-bar.ts');
check('bucket-bar.ts exists in repo', existsSync(BB), BB);

// Copy bucket-bar into the extract (tool travels with the extract per Ernie's rule).
cpSync(BB, COLORS + '/tools/bucket-bar.ts');

function bbRun(pools, pc) {
  return run('node', ['--experimental-strip-types', 'tools/bucket-bar.ts', '120000', pools, pc], {
    cwd: COLORS, maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'pipe'],
  });
}
function drivesOf(out) {
  const m = out.match(/drives\s+([\d.]+)\s+([\d.]+)\s+([-\d.]+)/);
  return m ? { pools: +m[1], glm: +m[2], diff: +m[3] } : null;
}

// 1. Clean extract: bucket-bar exits 0.
const clean = bbRun('nfl-pools-fit2023-2025', 'nfl-passclass-fit2023-2025');
check('bucket-bar exits 0 on clean extract', clean.code === 0, clean.out.slice(0, 160));
const dClean = drivesOf(clean.out);
check('drives row present (2023-2025)', dClean != null, dClean ? `${dClean.pools}/${dClean.glm}` : '(missing)');
// 2. Reproduction signature: pools ~11.0x, GLM ~10.9x, negative diff.
if (dClean) {
  const sigOK = dClean.pools > 10.5 && dClean.pools < 12.0 && dClean.glm > 10.4 && dClean.glm < 11.2 && dClean.diff < 0;
  check('drives signature reproduced (pools~11.0, GLM~10.9, diff<0)', sigOK, `${dClean.pools}/${dClean.glm}/${dClean.diff}`);
}
// 3. Pack args matter: 2016-2022 packs give different drives.
const old = bbRun('nfl-pools-fit2016-2022', 'nfl-passclass-fit2016-2022');
check('bucket-bar exits 0 with 2016-2022 packs', old.code === 0, old.out.slice(0, 160));
const dOld = drivesOf(old.out);
if (dClean && dOld) {
  const packsMatter = Math.abs(dClean.pools - dOld.pools) > 0.001 || Math.abs(dClean.glm - dOld.glm) > 0.001;
  check('pack args change the drives output (tool reads packs)', packsMatter, `${dClean.pools}->${dOld.pools} / ${dClean.glm}->${dOld.glm}`);
}

// Cleanup.
try { readdirSync(TMP).forEach((f) => { try { unlinkSync(TMP + '/' + f); } catch {} }); rmdirSync(TMP); } catch (e) {}

if (failures > 0) {
  console.error('FALSIFIER FAILED (' + failures + '): bucket-bar is not trustworthy');
  process.exit(1);
}
console.log('FALSIFIER OK: bucket-bar exits 0, reproduces the 120k drives signature, and reads pack args');
process.exit(0);
