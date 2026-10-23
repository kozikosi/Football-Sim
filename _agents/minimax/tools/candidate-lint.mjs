#!/usr/bin/env node

// MiniMax — candidate linter for the v20 + donor merge (20 Oct 2026).
//
// Read-only. No dependencies, no npm install. Plain Node (>= 22).
//
//   node _agents/minimax/tools/candidate-lint.mjs <candidate.html> [--v20 <file>] [--donor <file>]
//   node _agents/minimax/tools/candidate-lint.mjs --selftest
//
// Exit codes (tests/CONTRACT.md v2 league): 0 = no FAIL, 1 = at least one FAIL, 4 = usage error.
//
// What it checks, and why each check exists:
//   1. Protected math (8 functions) + protected constants (6 + MC/PLAN_K) — the gate spec is
//      Pickle's _agents/pickle/specs/math-baseline.json; the pins here are copied from it and
//      re-derived by this tool with the stated rule, so a mismatch means the merge moved a
//      protected symbol. CPU pick is donor-only (94b878605b73); v20's 3dc9d12f500a is rejected.
//   2. The 17 differing functions — measured with DS's _agents/ds/tools/funcdiff-full.js --hashes;
//      the pins below are that tool's output. 14 donor / 1 v20 (renderDraftBoard2) /
//      setActiveTab + renderSeasonTab + renderSeasonTabInner may be donor, v20 or synthesized.
//   3. Season-path cross-check (MiniMax M-53) — if the candidate's renderSeasonTabInner is the
//      donor's Season-entry line, the donor's Season markup must exist in the candidate, and every
//      view/tab id referenced by setActiveTab must exist as an id in the candidate markup.
//      A donor setActiveTab on v20 markup throws a TypeError at "Start Season" (unguarded view
//      loop at donor:777 vs the guarded tab loop at donor:778).
//   4. Text-level debt that the donor already fixed or that the council ruled on:
//      rWeights (crash), color-scheme, msChecked (mobile memo), single wrapper, the setActiveTab
//      tail line (donor's tail flips the default tab), "sudden death", "went the distance".
//
// Extraction rules (a pin without its rule is not a pin):
//   R1 function body — split the FIRST <script> block on '\n'; a body runs from its column-0
//      'function NAME(' line through the LAST line whose trim()==='}' before the NEXT column-0
//      'function' line; join with '\n'; sha256 WITHOUT a trailing newline; first 12 hex.
//      (DS funcdiff-full.js; Pickle math-baseline.json _extraction_rule.)
//   R2 constant — sha256 of its FIRST declaration line ('^const NAME'), trailing newline stripped,
//      whitespace NOT normalised; first 12 hex.
//   R3 known artefact — checkRewards over-reads the adjacent column-0 #glue IIFE under R1; it is
//      excluded from the pin set and from the 17-count (Pickle M-50 addendum).
//
// Expected verdicts: v20 -> FAILs (rWeights, msChecked, color-scheme, wrapper, cpuPick reject,
//      donor-group functions); donor -> one FAIL by design (its tail line is the Season-first
//      setActiveTab('viewSeason',...)); the merged candidate -> zero FAILs.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) {
    const k = argv[i].slice(2);
    flags[k] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
  } else positional.push(argv[i]);
}
const selftest = !!flags.selftest;
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..", "..");
const V20 = flags.v20 || path.join(root, "NFL Draft Simulator v20 Claude.html");
const DONOR = flags.donor || path.join(root, "NFL Draft Simulator.html");

// ---- the manifest (single source of the oracle) ------------------------------------------------
const MANIFEST_PATH =
  flags.manifest ||
  path.join(root, "_agents", "minimax", "MERGE-MANIFEST.json");
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(`manifest not found: ${MANIFEST_PATH}`);
  process.exit(4);
}
const MANIFEST = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const MATH_PINS = Object.fromEntries(
  MANIFEST.protected.math_functions.map((e) => [e.name, e.hash]),
);
const CONST_PINS = Object.fromEntries(
  MANIFEST.protected.constants.map((e) => [e.name, e.hash]),
);
const ALSO_PROTECTED = MANIFEST.protected.also_protected_text_equal_to_v20;
const CPU_PICK = {
  keep: MANIFEST.decisions.cpuPick.keep,
  reject: MANIFEST.decisions.cpuPick.reject,
};
const RENDER_100 = {
  keep: MANIFEST.decisions.render100.keep,
  reject: MANIFEST.decisions.render100.reject,
};
// per-function decisions straight from the manifest
const _FN_DECISION = new Map(MANIFEST.functions.map((f) => [f.name, f]));

// ---- extraction ------------------------------------------------------------------------------
function scriptOf(file) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error(`no <script> block in ${file}`);
  return { html, script: m[1] };
}
function scanFunctions(file) {
  const { script } = scriptOf(file);
  const L = script.split("\n");
  const starts = [];
  for (let i = 0; i < L.length; i++) {
    const f = L[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (f) starts.push({ name: f[1], i });
  }
  const out = new Map();
  for (let k = 0; k < starts.length; k++) {
    const { name, i } = starts[k];
    const next = k + 1 < starts.length ? starts[k + 1].i : L.length;
    let end = i;
    for (let j = next - 1; j > i; j--) {
      if (L[j].trim() === "}") {
        end = j;
        break;
      }
    }
    const body = L.slice(i, end + 1).join("\n");
    out.set(name, {
      body,
      hash: crypto.createHash("sha256").update(body).digest("hex").slice(0, 12),
    });
  }
  return out;
}
function constLine(file, name) {
  const { script } = scriptOf(file);
  const line = script.split("\n").find((l) => l.startsWith(`const ${name}`));
  return line === undefined ? null : line.replace(/\r$/, "");
}
function constHash(file, name) {
  const line = constLine(file, name);
  return line === null
    ? null
    : crypto.createHash("sha256").update(line).digest("hex").slice(0, 12);
}

// Top-level declared names (column 0 only — inner block declarations are not global symbols).
function declaredNames(file) {
  const { script } = scriptOf(file);
  const names = new Set();
  for (const m of script.matchAll(
    /(?:^|\n)function\s+([A-Za-z_$][\w$]*)\s*\(/g,
  ))
    names.add(m[1]);
  for (const m of script.matchAll(
    /(?:^|\n)(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*[=;,]/g,
  ))
    names.add(m[1]);
  for (const m of script.matchAll(/(?:^|\n)class\s+([A-Za-z_$][\w$]*)/g))
    names.add(m[1]);
  return names;
}
// Parent-only symbols: declared in one build but not the other. A candidate that keeps a body
// calling one of these must also carry the helper — otherwise that path throws at runtime.
function parentOnlySymbols(v20File, donorFile) {
  const a = declaredNames(v20File),
    b = declaredNames(donorFile);
  return {
    v20only: [...a].filter((n) => !b.has(n)).sort(),
    donoronly: [...b].filter((n) => !a.has(n)).sort(),
  };
}
function usesSymbol(body, name) {
  return new RegExp(`(^|[^\\w$.])${name.replace(/\$/g, "\\$")}\\b`).test(body);
}

// ---- result collection ------------------------------------------------------------------------
const results = [];
function add(status, id, detail) {
  results.push({ status, id, detail });
}
const FAIL = "FAIL",
  WARN = "WARN",
  PASS = "PASS";

function lint(candidate) {
  const { html } = scriptOf(candidate);
  const fns = scanFunctions(candidate);
  const hash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(candidate))
    .digest("hex");
  const bytes = fs.statSync(candidate).size;

  // 1. protected math + constants
  for (const [name, pin] of Object.entries(MATH_PINS)) {
    const got = fns.get(name)?.hash;
    add(
      got === pin ? PASS : FAIL,
      `math:${name}`,
      got === pin ? pin : `got ${got ?? "missing"}, want ${pin}`,
    );
  }
  for (const [name, pin] of Object.entries(CONST_PINS)) {
    const got = constHash(candidate, name);
    add(
      got === pin ? PASS : FAIL,
      `const:${name}`,
      got === pin ? pin : `got ${got ?? "missing"}, want ${pin}`,
    );
  }
  for (const name of ALSO_PROTECTED) {
    const a = constLine(V20, name),
      b = constLine(candidate, name);
    add(
      a !== null && a === b ? PASS : FAIL,
      `const:${name}`,
      a === b ? "byte-identical to v20" : "DIFFERS from v20",
    );
  }
  // 2. the differing functions — the decision comes from the manifest
  for (const f of MANIFEST.functions) {
    const got = fns.get(f.name)?.hash;
    if (f.source === "donor") {
      const reject =
        f.name === "cpuPick"
          ? CPU_PICK.reject
          : f.name === "render100"
            ? RENDER_100.reject
            : null;
      add(
        got === f.donor ? PASS : FAIL,
        `fn:${f.name}`,
        got === f.donor
          ? `donor ${f.donor}`
          : `got ${got ?? "missing"}, want donor ${f.donor}${reject ? ` (v20 reject is ${reject})` : ""}`,
      );
    } else if (f.source === "v20") {
      add(
        got === f.v20 ? PASS : FAIL,
        `fn:${f.name}`,
        got === f.v20
          ? `v20 ${f.v20}`
          : `got ${got ?? "missing"}, want v20 ${f.v20}`,
      );
    } else if (f.source === "conditional") {
      // either parent's body is acceptable; the SURFACE check decides which one is coherent
      const ok = got === f.v20 || got === f.donor;
      add(
        ok ? PASS : FAIL,
        `fn:${f.name}`,
        ok
          ? `${got} (${got === f.donor ? "donor" : "v20"} variant)`
          : `got ${got ?? "missing"}, want v20 ${f.v20} or donor ${f.donor}`,
      );
    } else {
      // synthesize: v20, donor, or a third body
      if (!got) {
        add(FAIL, `fn:${f.name}`, "missing");
        continue;
      }
      if (got === f.v20 || got === f.donor)
        add(
          PASS,
          `fn:${f.name}`,
          `${got} (${got === f.donor ? "donor" : "v20"} body)`,
        );
      else
        add(
          WARN,
          `fn:${f.name}`,
          `${got} = synthesized body (not v20 ${f.v20} nor donor ${f.donor})`,
        );
    }
  }

  // 3. season-path cross-check (M-53)
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  const candNames = declaredNames(candidate);
  const seasonBody =
    (fns.get("renderSeasonTabInner")?.body || "") +
    "\n" +
    (fns.get("setActiveTab")?.body || "");
  const refs = new Set();
  for (const m of seasonBody.matchAll(/getElementById\(\s*'([^']+)'\s*\)/g))
    refs.add(m[1]);
  for (const m of seasonBody.matchAll(
    /setActiveTab\(\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/g,
  )) {
    refs.add(m[1]);
    refs.add(m[2]);
  }
  for (const m of seasonBody.matchAll(
    /\[\s*'((?:view|tab)[^']*(?:'[^']*')*)\s*\]/g,
  )) {
    for (const s of m[1].matchAll(/'([^']+)'/g)) refs.add(s[1]);
  }
  const missing = [...refs].filter((r) => !ids.has(r)).sort();
  const critical = missing.filter((r) => /^(view|tab|season)/.test(r));
  if (critical.length) {
    add(
      FAIL,
      "season:ids",
      `season path references ids absent from the markup: ${critical.join(", ")} — a donor setActiveTab on v20 markup throws a TypeError at "Start Season" (unguarded view loop)`,
    );
  } else if (missing.length) {
    add(
      WARN,
      "season:ids",
      `referenced ids not present as id="..." (may be created dynamically): ${missing.join(", ")}`,
    );
  } else {
    add(
      PASS,
      "season:ids",
      "every view/tab/season id referenced by the season path exists in the markup",
    );
  }
  const _rsi = fns.get("renderSeasonTabInner")?.hash;
  const hasDonorSeasonPath = (
    fns.get("renderSeasonTabInner")?.body || ""
  ).includes("seasonHost");
  if (hasDonorSeasonPath && !ids.has("seasonHost")) {
    add(
      FAIL,
      "season:host",
      "renderSeasonTabInner references #seasonHost but the markup has none",
    );
  } else {
    add(
      PASS,
      "season:host",
      hasDonorSeasonPath
        ? "#seasonHost present (donor Season surface adopted)"
        : "v20 season path (no #seasonHost needed)",
    );
  }

  // 3b. surface variants (from the manifest) — a surface's variant implies the DOM scaffolding
  // and the helper symbols it needs. This is the check that catches a HALF-TAKEN surface
  // statically: the donor's draft-results variant on v20 markup (M-59/M-60) fails here,
  // where a function-list-only oracle passes it.
  for (const surf of MANIFEST.surfaces) {
    for (const v of surf.variants) {
      const got = fns.get(v.anchor.function)?.hash;
      if (!got) {
        add(
          WARN,
          `surface:${surf.name}/${v.id}`,
          `anchor ${v.anchor.function} missing from the candidate`,
        );
        continue;
      }
      if (got !== v.anchor.hash) continue; // the candidate carries a different variant
      const needIds = (v.requires.markup_ids || []).filter((i) => !ids.has(i));
      const needSyms = (v.requires.symbols || []).filter(
        (s) => !candNames.has(s),
      );
      const missing = [
        ...needIds.map((i) => `id="${i}"`),
        ...needSyms.map((s) => `${s}()`),
      ];
      if (missing.length) {
        add(
          FAIL,
          `surface:${surf.name}/${v.id}`,
          `the candidate carries the "${v.id}" variant of the ${surf.name} surface but lacks ${missing.join(", ")} — the surface is half-taken`,
        );
      } else {
        add(
          PASS,
          `surface:${surf.name}/${v.id}`,
          `variant complete${v.season_entry ? ` — ${v.season_entry}` : ""}`,
        );
      }
    }
  }
  const rw = (html.match(/rWeights/g) || []).length;
  const rwDecl = /(^|\n)\s*(const|let|var|function)\s+rWeights\b/.test(html);
  add(
    rw === 0 ? PASS : rwDecl ? WARN : FAIL,
    "text:rWeights",
    rw === 0
      ? "absent"
      : `${rw} occurrence(s)${rwDecl ? " but declared" : " and NOT declared — ReferenceError"}`,
  );
  const cs = [...html.matchAll(/(?<!-)\bcolor-scheme\s*:\s*([^;}"']+)/g)].map(
    (m) => m[1].trim(),
  );
  const good = cs.length === 1 && /light\s+dark/.test(cs[0]);
  add(
    good ? PASS : FAIL,
    "text:color-scheme",
    good
      ? `1 declaration: ${cs[0]}`
      : `${cs.length} declaration(s): ${cs.join(" | ") || "none"} — want exactly one "light dark"`,
  );
  const ms = (html.match(/msChecked/g) || []).length;
  add(
    ms === 0 ? PASS : FAIL,
    "text:msChecked",
    ms === 0
      ? "absent (mobile stacking memo removed)"
      : `${ms} occurrence(s) — the mobile pass keeps a stale memo and skips re-stacking`,
  );
  const doct = (html.match(/<!DOCTYPE/gi) || []).length;
  const htmlClose = (html.match(/<\/html>/gi) || []).length;
  add(
    doct === 1 && htmlClose === 1 ? PASS : FAIL,
    "text:wrapper",
    doct === 1 && htmlClose === 1
      ? "single wrapper"
      : `<!DOCTYPE x${doct}, </html> x${htmlClose} — v20 is double-wrapped`,
  );
  const sd = (html.match(/sudden death/gi) || []).length;
  const wd = (html.match(/went the distance/gi) || []).length;
  add(
    sd === 0 && wd === 0 ? PASS : FAIL,
    "text:style-strings",
    `sudden death x${sd}, "went the distance" x${wd} — both removed in the donor`,
  );
  const tail =
    scriptOf(candidate)
      .script.split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .pop() || "";
  const tailSeason = /setActiveTab\('viewSeason'/.test(tail);
  add(
    !tailSeason ? PASS : FAIL,
    "text:tail",
    tailSeason
      ? `tail is the donor's Season-first line (${tail.slice(0, 60)}) — flips the merged default tab`
      : `tail: ${tail.slice(0, 60)}`,
  );
  const nostack = (html.match(/data-nostack/g) || []).length;
  const dt2 = html.includes('id="draftTable2"');
  add(
    nostack > 0 && dt2 ? PASS : WARN,
    "text:glue",
    nostack > 0 && dt2
      ? `#draftTable2 + data-nostack present (glue Variant A dependency satisfied)`
      : `data-nostack x${nostack}, #draftTable2 ${dt2 ? "present" : "ABSENT"} — the nostack guard depends on both`,
  );

  // 5. parent-only symbol dependencies — a donor body that calls a donor-only helper
  //    (seasonToast, goSeason, meetingInfo, meetingTagText) on a v20 base resolves to nothing
  //    and throws on that path; a v20 body that calls updateStepper needs updateStepper.
  const po = parentOnlySymbols(V20, DONOR);
  const tracked = MANIFEST.functions.map((f) => f.name);
  const missingSyms = [];
  for (const fname of tracked) {
    const body = fns.get(fname)?.body || "";
    for (const sym of [...po.donoronly, ...po.v20only]) {
      if (!usesSymbol(body, sym)) continue;
      if (!candNames.has(sym)) missingSyms.push(`${fname} → ${sym}`);
    }
  }
  add(
    missingSyms.length === 0 ? PASS : FAIL,
    "symbols:parent-only",
    missingSyms.length === 0
      ? `no parent-only symbol is called without being carried over (donor-only: ${po.donoronly.join(", ") || "none"}; v20-only: ${po.v20only.join(", ") || "none"})`
      : missingSyms.join("; ") +
          " — the candidate must carry the helper or that path throws",
  );

  return { hash, bytes };
}

function report(candidate, meta) {
  const fails = results.filter((r) => r.status === FAIL);
  const warns = results.filter((r) => r.status === WARN);
  console.log(`\nMiniMax candidate lint — ${candidate}`);
  console.log(`  sha256 ${meta.hash} · ${meta.bytes} bytes`);
  console.log(
    `  ${results.filter((r) => r.status === PASS).length} pass · ${warns.length} warn · ${fails.length} fail\n`,
  );
  for (const r of results) {
    if (r.status === PASS && !flags.verbose) continue;
    console.log(`  [${r.status}] ${r.id.padEnd(24)} ${r.detail}`);
  }
  console.log("");
  if (fails.length) {
    console.log("  FAILING CHECKS:");
    for (const r of fails) console.log(`   - ${r.id}: ${r.detail}`);
  }
  if (warns.length) {
    console.log("  WARNINGS:");
    for (const r of warns) console.log(`   - ${r.id}: ${r.detail}`);
  }
  console.log(
    `\n  exit ${fails.length ? 1 : 0} — ${fails.length ? "the candidate does not yet satisfy the merge oracle" : "candidate satisfies every static check"}`,
  );
  return fails.length ? 1 : 0;
}

if (selftest) {
  // The linter must reproduce every pin it carries, from the two parent builds, or it is void.
  let bad = 0;
  const v20Fns = scanFunctions(V20),
    donorFns = scanFunctions(DONOR);
  const check = (label, got, want) => {
    const ok = got === want;
    if (!ok) {
      bad++;
      console.log(`  MISMATCH ${label}: got ${got}, want ${want}`);
    } else console.log(`  ok ${label} = ${got}`);
  };
  console.log(
    "\nSelf-test — pins re-derived from the parent builds (rule R1/R2):",
  );
  for (const [n, p] of Object.entries(MATH_PINS))
    check(`v20 math:${n}`, v20Fns.get(n)?.hash, p);
  for (const [n, p] of Object.entries(MATH_PINS))
    check(`donor math:${n}`, donorFns.get(n)?.hash, p);
  for (const [n, p] of Object.entries(CONST_PINS))
    check(`v20 const:${n}`, constHash(V20, n), p);
  for (const [n, p] of Object.entries(CONST_PINS))
    check(`donor const:${n}`, constHash(DONOR, n), p);
  check("v20 cpuPick", v20Fns.get("cpuPick")?.hash, CPU_PICK.reject);
  check("donor cpuPick", donorFns.get("cpuPick")?.hash, CPU_PICK.keep);
  check("v20 render100", v20Fns.get("render100")?.hash, RENDER_100.reject);
  check("donor render100", donorFns.get("render100")?.hash, RENDER_100.keep);
  for (const f of MANIFEST.functions) {
    check(`v20 fn:${f.name}`, v20Fns.get(f.name)?.hash, f.v20);
    check(`donor fn:${f.name}`, donorFns.get(f.name)?.hash, f.donor);
  }
  // the manifest's surface anchors must resolve to the hashes they claim
  for (const surf of MANIFEST.surfaces) {
    for (const v of surf.variants) {
      const got =
        v20Fns.get(v.anchor.function)?.hash === v.anchor.hash
          ? v20Fns.get(v.anchor.function)?.hash
          : donorFns.get(v.anchor.function)?.hash === v.anchor.hash
            ? donorFns.get(v.anchor.function)?.hash
            : null;
      check(
        `anchor ${surf.name}/${v.id} (${v.anchor.function})`,
        got,
        v.anchor.hash,
      );
    }
  }
  // the manifest's set diffs must match the builds
  const v20Names = declaredNames(V20),
    donorNames = declaredNames(DONOR);
  for (const n of MANIFEST.set_diffs.donor_only_symbols) {
    const ok = donorNames.has(n) && !v20Names.has(n);
    if (!ok) bad++;
    console.log(
      `  ${ok ? "ok" : "MISMATCH"} donor-only symbol ${n} (donor=${donorNames.has(n)}, v20=${v20Names.has(n)})`,
    );
  }
  for (const n of MANIFEST.set_diffs.v20_only_symbols) {
    const ok = v20Names.has(n) && !donorNames.has(n);
    if (!ok) bad++;
    console.log(
      `  ${ok ? "ok" : "MISMATCH"} v20-only symbol ${n} (v20=${v20Names.has(n)}, donor=${donorNames.has(n)})`,
    );
  }
  console.log(
    bad
      ? `\n  SELF-TEST FAILED: ${bad} pin(s) did not reproduce`
      : "\n  SELF-TEST PASSED: every pin reproduces from the parent builds",
  );
  process.exit(bad ? 1 : 0);
}

const target = positional[0];
if (!target) {
  console.error(
    "usage: candidate-lint.mjs <candidate.html> [--v20 <f>] [--donor <f>] [--verbose]\n       candidate-lint.mjs --selftest",
  );
  process.exit(4);
}
if (!fs.existsSync(target)) {
  console.error(`no such file: ${target}`);
  process.exit(4);
}
const meta = lint(target);
process.exit(report(target, meta));
