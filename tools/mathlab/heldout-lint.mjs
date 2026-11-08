// mathlab/heldout-lint.mjs — Circularity guard for held-out fit scripts.
//
// Enforces that fit scripts do NOT read the salary table (OR's salary-based
// DEFAULT_WEIGHTS source). This guards the circularity identified in D-007 /
// D-011: a fit script must measure against an independent anchor, not read the
// salary table and then claim the salary table independently validates it.
//
// Usage:
//   node heldout-lint.mjs [--fit-dir <dir>] [--salary-table <file>] [--strict]
//
//   --fit-dir        Directory to scan for fit scripts (default: .)
//   --salary-table   Path to the salary table file to treat as off-limits
//                    (default: auto-detect any *salary* file under fit-dir)
//   --strict         Also fail if any script references DEFAULT_WEIGHTS directly
//                    (the protected constant, which may embed salary values)
//
// Read-only on the product. Exits 0 if clean, 1 if a fit script reads the
// salary table, 2 on usage error.
//
// Evidence label: INFERRED (rule is a design proposal; enforced by this tool).

import fs from 'fs';
import path from 'path';

const FIT_EXTENSIONS = ['.mjs', '.js'];

// A script is a "fit script" if its name or content suggests fitting.
function isFitScript(filePath, content) {
  const name = path.basename(filePath).toLowerCase();
  const fitName = /fit|lm|calibrat|regress|optimize|tune/.test(name);
  const fitContent = /fitlm|Levenberg|Marquardt|minimize|objective|residual|\.fit\(/.test(content);
  return fitName || fitContent;
}

function readText(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return null; }
}

function autoDetectSalaryTable(fitDir) {
  try {
    return fs.readdirSync(fitDir)
      .filter(f => /salary/i.test(f) && FIT_EXTENSIONS.includes(path.extname(f)))
      .map(f => path.join(fitDir, f))[0] || null;
  } catch { return null; }
}

function main() {
  const args = process.argv.slice(2);
  let fitDir = '.';
  let salaryTable = null;
  let strict = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fit-dir') fitDir = args[++i];
    else if (args[i] === '--salary-table') salaryTable = args[++i];
    else if (args[i] === '--strict') strict = true;
  }

  const fitDirAbs = path.resolve(fitDir);
  if (!fs.existsSync(fitDirAbs)) {
    console.error(`heldout-lint: fit-dir not found: ${fitDirAbs}`);
    process.exit(2);
  }

  // Resolve the salary table: explicit path, else auto-detect, else none.
  if (salaryTable) {
    if (!fs.existsSync(path.resolve(fitDirAbs, salaryTable)) && !fs.existsSync(salaryTable)) {
      console.error(`heldout-lint: salary-table not found: ${salaryTable}`);
      process.exit(2);
    }
    salaryTable = path.resolve(salaryTable);
  } else {
    salaryTable = autoDetectSalaryTable(fitDirAbs);
  }

  const salaryBasename = salaryTable ? path.basename(salaryTable) : null;

  // Collect JS/mjs files under fitDir (non-recursive; mathlab is flat).
  const files = fs.readdirSync(fitDirAbs)
    .filter(f => FIT_EXTENSIONS.includes(path.extname(f)))
    .map(f => path.join(fitDirAbs, f));

  let failures = 0;
  let scanned = 0;

  for (const file of files) {
    const content = readText(file);
    if (content === null) continue;
    if (!isFitScript(file, content)) continue;
    scanned++;

    let hit = null;
    if (salaryBasename) {
      // A script reads the salary table if it references the salary file by
      // path or basename, or reads a variable clearly named for salary.
      const patterns = [
        salaryBasename,
        path.relative(fitDirAbs, salaryTable),
        /salaryTable/i,
        /readSalary/i,
        /loadSalary/i,
        /salaryWeights/i,
      ];
      for (const p of patterns) {
        if (typeof p === 'string' ? content.includes(p) : p.test(content)) {
          hit = p;
          break;
        }
      }
    }
    if (!hit && strict && /DEFAULT_WEIGHTS/.test(content)) {
      hit = 'DEFAULT_WEIGHTS (strict)';
    }

    if (hit) {
      console.log(`FAIL  ${path.relative(fitDirAbs, file)}  reads salary table: ${hit}`);
      failures++;
    }
  }

  console.log(`\nheldout-lint: scanned ${scanned} fit script(s), ${failures} failure(s).`);
  if (failures > 0) {
    console.log('RESULT: FAIL — a fit script reads the salary table (circularity risk, D-007/D-011).');
    process.exit(1);
  }
  console.log('RESULT: OK — no fit script reads the salary table.');
  process.exit(0);
}

main();
