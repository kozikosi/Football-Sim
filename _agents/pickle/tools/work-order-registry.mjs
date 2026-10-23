#!/usr/bin/env node
/**
 * work-order-registry.mjs — one machine-readable registry built FROM V22-Suggestions.md.
 * Answers Claude's ask: "a single machine-readable task registry (currently the work order
 * and a markdown list)."
 *
 * It does not create a second list to keep in sync: it derives the registry from the work
 * order on every run, so the markdown stays the single source and the JSON is a projection.
 *
 * House form (AGENTS.md §5): WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK.
 * Per item the registry records which of those fields are present, so an item that cannot
 * fill the last two is reported, not silently accepted.
 *
 * v2 fix: v1 scanned only the P0..P2 bands and so missed the house-form items, which live in
 * the "nine workstreams" section above them. v2 splits on every "### " in the whole document
 * and records the enclosing "## " section, so the registry covers every item.
 *
 * Usage: node _agents/pickle/tools/work-order-registry.mjs [--file <path>] [--out <path>] [--json]
 * Read-only on the work order; writes only the JSON path you give it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const getArg = (flag, dflt) =>
  args.includes(flag) ? args[args.indexOf(flag) + 1] : dflt;

const ROOT = join(HERE, "..", "..", "..");
const FILE = getArg("--file", join(ROOT, "V22-Suggestions.md"));
const OUT = getArg("--out", join(HERE, "..", "notes", "registry.json"));
const asJson = args.includes("--json");

const PROTECTED = [
  "DEFAULT_WEIGHTS",
  "FLEX",
  "NATURAL_SLOT_MAP",
  "MC ",
  "PLAN_K",
  "RATING_SPECS",
];

const lines = readFileSync(FILE, "utf8").split("\n");

// --- track the enclosing "## " section -------------------------------------------
let section = "(top)";
const items = [];
let current = null;

const push = () => {
  if (!current) return;
  const body = current.body.join("\n");
  current.fields = {
    where: /\*\*WHERE\*\*/.test(body),
    what: /\*\*WHAT\*\*/.test(body),
    why: /\*\*WHY\*\*/.test(body),
    safeAlone: /\*\*SAFE ALONE\?\*\*/.test(body),
    howToCheck: /\*\*HOW TO CHECK\*\*/.test(body),
  };
  current.houseForm = Object.values(current.fields).every(Boolean);
  current.protectedConstants = [
    ...new Set(PROTECTED.filter((p) => body.includes(p)).map((p) => p.trim())),
  ];
  current.bodyChars = body.length;
  delete current.body;
  items.push(current);
  current = null;
};

lines.forEach((line, i) => {
  const h2 = line.match(/^## (.+)$/);
  if (h2) {
    push();
    section = h2[1].trim();
    return;
  }
  const h3 = line.match(/^### (.+)$/);
  if (h3) {
    push();
    const title = h3[1].trim().replace(/\*\*/g, "");
    const idm = title.match(/^(P\d+[-–]\d+[a-z]?)/i);
    current = {
      id: idm ? idm[1] : null,
      title,
      line: i + 1,
      section,
      body: [],
    };
    return;
  }
  if (current) current.body.push(line);
});
push();

// --- summary ---------------------------------------------------------------------
const withId = items.filter((i) => i.id);
const bySection = items.reduce((acc, it) => {
  acc[it.section] = (acc[it.section] || 0) + 1;
  return acc;
}, {});
const houseForm = withId.filter((i) => i.houseForm);
const missingHow = withId.filter((i) => !i.fields.howToCheck).map((i) => i.id);
const touchingProtected = withId
  .filter((i) => i.protectedConstants.length)
  .map((i) => ({ id: i.id, constants: i.protectedConstants }));

const registry = {
  generatedBy: "_agents/pickle/tools/work-order-registry.mjs",
  generatedFrom: FILE,
  note: "Re-run after any edit to the work order; the markdown is the source, this JSON is a projection.",
  totals: {
    headings: items.length,
    withId: withId.length,
    houseFormComplete: houseForm.length,
    bySection,
  },
  incomplete: { missingHowToCheck: missingHow },
  protectedTouching: touchingProtected,
  items,
};

writeFileSync(OUT, JSON.stringify(registry, null, 2));

if (asJson) {
  console.log(JSON.stringify(registry, null, 2));
} else {
  console.log(`work-order-registry · ${FILE}`);
  console.log(
    `headings: ${items.length} · with an id: ${withId.length} · complete house form: ${houseForm.length}`,
  );
  console.log(`sections:`);
  for (const [name, n] of Object.entries(bySection)) {
    console.log(`  ${String(n).padStart(3)}  ${name}`);
  }
  console.log(
    `\nids missing HOW TO CHECK (${missingHow.length}/${withId.length}): ${missingHow.join(", ") || "none"}`,
  );
  console.log(
    `touch a protected constant (${touchingProtected.length}): ${touchingProtected.map((t) => t.id).join(", ") || "none"}`,
  );
  console.log(`wrote ${OUT}`);
}
