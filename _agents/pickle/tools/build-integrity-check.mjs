#!/usr/bin/env node
/**
 * build-integrity-check.mjs — every named build is checked against the sha256 its
 * own documents pin. Answers Claude's ask: "a build-integrity check that every named
 * build matches its pinned sha256."
 *
 * What it does:
 *   1. Parses pins out of STATUS.md and AGENTS.md (the two documents that pin builds).
 *   2. Hashes each named build actually on disk.
 *   3. Classifies every pin:
 *        OK          — document pin === file on disk
 *        STALE       — pin is well-formed but no file on disk has that hash
 *        MISMATCH    — the file named by the pin exists, but its hash differs
 *        MISSING     — the file named by the pin is not on disk
 *        NO-PIN      — a named build exists on disk that no document pins
 *        EXPECTED-ABSENT — a build the documents say does not exist yet, and does not
 *   4. Exits 1 if any STALE / MISMATCH / MISSING / NO-PIN is found.
 *
 * Usage: node _agents/pickle/tools/build-integrity-check.mjs [--root <dir>] [--json]
 * Read-only. Writes nothing. No product file is touched.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const rootArg = args.includes("--root")
  ? args[args.indexOf("--root") + 1]
  : join(HERE, "..", "..", "..");
const ROOT = rootArg;
const asJson = args.includes("--json");

const sha256 = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");
const sizeOf = (path) => readFileSync(path).length;

/** A pin is {doc, file, hash(40/64 hex), size|null, rawLine}. */
const pins = [];
const problems = [];

const addPin = (doc, file, hash, size, rawLine) =>
  pins.push({
    doc,
    file: file.replace(/[`*]/g, "").trim(),
    hash: hash.toLowerCase(),
    size,
    rawLine,
  });

// ---- STATUS.md: "**Name**: `file.html` = `hash` (123,456 bytes)" -----------------
const statusPath = join(ROOT, "STATUS.md");
if (existsSync(statusPath)) {
  readFileSync(statusPath, "utf8")
    .split("\n")
    .forEach((line, i) => {
      // only consider full 64-hex pins (truncated "abcdef12…" pins cannot be verified)
      const m = line.match(
        /`([^`]+\.html)`\s*=\s*`([0-9a-fA-F]{64})`(?:\s*\(([\d,]+)\s*bytes?\))?/,
      );
      if (m)
        addPin(
          "STATUS.md",
          m[1],
          m[2],
          m[3] ? Number(m[3].replace(/,/g, "")) : null,
          i + 1,
        );
      else if (/`[^`]+\.html`\s*=\s*`[0-9a-fA-F]{8,63}…?`/.test(line)) {
        problems.push({
          doc: "STATUS.md",
          line: i + 1,
          verdict: "UNVERIFIABLE-PIN",
          detail:
            "pin is truncated; a short hash can never be checked against a file",
          text: line.trim().slice(0, 160),
        });
      }
    });
}

// ---- AGENTS.md build-truth table: | `file.html` | `hash` | 123,456 B | ... ------
const agentsPath = join(ROOT, "AGENTS.md");
if (existsSync(agentsPath)) {
  readFileSync(agentsPath, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (!line.trim().startsWith("|")) return;
      const m = line.match(
        /\|\s*`([^`]+\.html)`\s*\|\s*`([0-9a-fA-F]{64})`\s*\|\s*([\d,]+)\s*B/,
      );
      if (m)
        addPin("AGENTS.md", m[1], m[2], Number(m[3].replace(/,/g, "")), i + 1);
    });
}

// ---- named builds on disk (root only; scratch copies are not "named builds") ----
const ROOT_BUILDS = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith(".html"))
  .map((d) => d.name);

// builds the documents declare not-yet-built
const EXPECTED_ABSENT = ["Football-Sim-V22.html"];

const disk = new Map(); // name -> {hash, size}
for (const name of ROOT_BUILDS) {
  const p = join(ROOT, name);
  disk.set(name, { hash: sha256(p), size: sizeOf(p) });
}

// ---- resolve every pin -----------------------------------------------------------
const results = [];
for (const pin of pins) {
  const hit = disk.get(pin.file);
  let verdict, detail;
  if (hit) {
    if (hit.hash === pin.hash) {
      verdict = "OK";
      detail = `file hash matches the ${pin.doc} pin`;
      const sizeOk = pin.size == null || pin.size === hit.size;
      if (!sizeOk) {
        verdict = "MISMATCH";
        detail = `hash matches but size differs: document says ${pin.size} B, file is ${hit.size} B`;
      }
    } else {
      verdict = "MISMATCH";
      detail = `document pins ${pin.hash.slice(0, 12)}… / ${pin.size ?? "?"} B; disk has ${hit.hash.slice(0, 12)}… / ${hit.size} B`;
    }
  } else {
    // is the pinned hash present under a different name anywhere at root?
    const alt = [...disk.entries()].find(([, v]) => v.hash === pin.hash);
    if (alt) {
      verdict = "MISSING";
      detail = `no file named "${pin.file}"; that hash exists as "${alt[0]}"`;
    } else {
      verdict = "STALE";
      detail = `no file named "${pin.file}" and no root build has hash ${pin.hash.slice(0, 12)}…`;
    }
  }
  results.push({ ...pin, verdict, detail });
}

// ---- named builds that nothing pins ---------------------------------------------
for (const [name, v] of disk) {
  if (EXPECTED_ABSENT.includes(name)) continue;
  const pinned = results.some((r) => r.file === name && r.verdict === "OK");
  if (!pinned) {
    results.push({
      doc: "-",
      file: name,
      hash: v.hash,
      size: v.size,
      verdict: "NO-PIN",
      detail: "named build on disk with no document pin (or its pin is broken)",
    });
  }
}

// ---- expected-absent ------------------------------------------------------------
for (const name of EXPECTED_ABSENT) {
  results.push({
    doc: "documents",
    file: name,
    hash: null,
    size: null,
    verdict: "EXPECTED-ABSENT",
    detail: disk.has(name)
      ? "documents say it does not exist yet, but it is on disk"
      : "not built yet — correct",
  });
  if (disk.has(name))
    results[results.length - 1].verdict = "UNEXPECTED-PRESENT";
}

const BAD = new Set([
  "STALE",
  "MISMATCH",
  "MISSING",
  "NO-PIN",
  "UNVERIFIABLE-PIN",
  "UNEXPECTED-PRESENT",
]);
const failing = results.filter((r) => BAD.has(r.verdict)).length;

if (asJson) {
  console.log(
    JSON.stringify(
      { root: ROOT, pins: pins.length, results, failing },
      null,
      2,
    ),
  );
} else {
  console.log(`build-integrity-check · root: ${ROOT}`);
  console.log(
    `pins parsed: ${pins.length} · named builds on disk: ${disk.size} · failing: ${failing}\n`,
  );
  const order = [
    "MISMATCH",
    "STALE",
    "MISSING",
    "UNVERIFIABLE-PIN",
    "NO-PIN",
    "UNEXPECTED-PRESENT",
    "OK",
    "EXPECTED-ABSENT",
  ];
  results
    .slice()
    .sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict))
    .forEach((r) => {
      const where =
        r.doc === "-" || !r.rawLine ? r.doc : `${r.doc}:${r.rawLine}`;
      console.log(`${r.verdict.padEnd(18)} ${r.file}`);
      console.log(`${" ".repeat(19)}${where} — ${r.detail}`);
    });
  console.log(
    `\n${failing === 0 ? "PASS" : "FAIL"} — ${failing} of ${results.length} checks failed`,
  );
}

process.exit(failing === 0 ? 0 : 1);
