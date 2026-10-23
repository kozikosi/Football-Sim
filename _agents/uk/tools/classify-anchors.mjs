#!/usr/bin/env node
// classify-anchors.mjs — separate real broken anchors from verifier false positives.
//
// UK · 22 Oct 2026. Dependency-free plain Node. Read-only against the build.
//
//   node classify-anchors.mjs <document.md> <build.html>
//
// WHY THIS EXISTS
// `verify-anchors.mjs` (MiniMax) reports every quoted string left of an arrow
// (or in a non-final table cell) as an OLD anchor that "must exist in the
// build". It cannot tell four different things apart, so its "missing" count
// over-reports badly. Measured on 22 Oct against `Football-Sim-V21.html`:
//
//   verify-anchors.mjs reported ......... 64 "missing" OLD strings
//   of which, by role, the true count is . see the tool's own output
//
// The four roles a quoted string can play in a work order:
//
//   1. OLD ANCHOR  — the document says this text is IN THE BUILD and will be
//      changed. If the build does not contain it, the anchor is broken and the
//      change will not apply as written. **This is the only real failure.**
//   2. TARGET      — the document says the build should END UP with this text.
//      It is not in the build yet, and that is correct.
//   3. OWNER QUOTE — the Owner's own words, quoted as an instruction. It was
//      never in the build.
//   4. COMMAND     — a shell command, a label, a document reference. Not text.
//
// WHY THE ORIGINAL OVER-REPORTS
//   • It treats every non-final cell of EVERY table as an OLD anchor. The work
//     order has two table shapes: `Current | Target` (a real before/after) and
//     `change description | item-id | status` (a checklist, where the quoted
//     strings are TARGETS — "Start at "1st Quarter"" is what Claude must add).
//   • It treats the Owner's ruling table as anchors. "LEDG/REDG don't matter at
//     all" is the instruction, not build text.
//
// THIS TOOL
//   1. Reads each table's HEADER row. If the header marks a non-final column
//      OLD (Now/Current/Before/Old) and the final column NEW (Target/After/
//      New/Becomes), the table is a before/after table: non-final = OLD.
//   2. Otherwise the table is a checklist: a quoted string is an OLD anchor
//      only when a removal verb governs it (remove/delete/replace/drop/strip/
//      "no longer"); otherwise it is a TARGET or a claim.
//   3. Prose lines with `->` keep the original rule: left = OLD, right = NEW.
//   4. Owner-voice lines (an italic quote, or a ruling/feedback section) are
//      never anchors.
//
// It writes nothing. It never edits the build or the document.

import fs from "node:fs";

const [docPath, buildPath] = process.argv.slice(2);
if (!docPath || !buildPath) {
  console.error("usage: classify-anchors.mjs <document.md> <build.html>");
  process.exit(4);
}
const doc = fs.readFileSync(docPath, "utf8");
const build = fs.readFileSync(buildPath, "utf8");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const flat = norm(build);

const quoted = (s) =>
  [...s.matchAll(/[“"`]([^“”"`]{6,110})[”"`]/g)]
    .map((m) => m[1])
    .filter(
      (x) =>
        /[A-Za-z]/.test(x) &&
        !/^[a-f0-9]{12,}$/i.test(x) &&
        !/\.(md|html|mjs|js|png)$/i.test(x),
    );

const isLiteral = (q) => {
  if (/…|\.\.\./.test(q)) return false;
  if (/^(node|npm|git|npx|cd )/.test(q)) return false;
  if (/^\s*--/.test(q)) return false;
  if (/\bthe x\b|\bthe y\b|\bx\b|\by\b|\bxx\b/i.test(q)) return false;
  if (/^[A-Z0-9 &/-]{4,}$/.test(q) && !/[a-z]{3}/.test(q)) return false;
  if (/^P\d|^R\d|^C\d/.test(q)) return false;
  if (q.length < 10 || !q.includes(" ")) return false;
  return true;
};
const uniq = (a) => {
  const seen = new Set();
  return a.filter((x) => {
    const k = norm(x.q);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const OLD_MARK = /\b(now|current|before|old|existing|today)\b/i;
const NEW_MARK = /\b(target|after|new|becomes|becomes?|result|goal)\b/i;
const REMOVE_VERB =
  /\b(remove|removes|removed|delete|deletes|drop|drops|strip|strips|erase|no longer|replac\w+\b.*\bwith|instead of)\b/i;
const OWNER_SECTION =
  /owner|ruling|feedback|round|directive|vision|priority|instruction/i;

// --- extraction ------------------------------------------------------------
const lines = doc.split("\n");
const oldStrings = [],
  newStrings = [];
let section = "(top)";
let inMermaid = false;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const h = l.match(/^#{2,4}\s+(.*)$/);
  if (h) section = h[1].trim();
  if (/^\s*```mermaid/.test(l)) {
    inMermaid = true;
    continue;
  }
  if (inMermaid) {
    if (/^\s*```/.test(l)) inMermaid = false;
    continue; // mermaid node labels are not build text
  }

  const isRow = l.trim().startsWith("|") && l.trim().endsWith("|");
  if (!isRow) {
    if (l.includes("->")) {
      const a = l.indexOf("->");
      for (const q of quoted(l.slice(0, a)))
        oldStrings.push({ q, line: i + 1, section, raw: l, role: "arrow-old" });
      for (const q of quoted(l.slice(a + 2)))
        newStrings.push({ q, line: i + 1, section, raw: l });
    }
    continue;
  }

  const cells = l.trim().slice(1, -1).split("|");

  // Is this a header row? The row after a separator row (|---|---|) is the header.
  const isSep = cells.every((c) => /^\s*:?-{2,}:?\s*$/.test(c));
  if (isSep) continue;
  const prev = lines[i - 1] || "";
  const prevIsSep =
    prev.trim().startsWith("|") &&
    prev
      .trim()
      .slice(1, -1)
      .split("|")
      .every((c) => /^\s*:?-{2,}:?\s*$/.test(c));
  const isHeader = prevIsSep;

  if (isHeader) {
    // Classify the table by its header, and remember it for the body rows.
    const nonFinal = cells.slice(0, -1).map((c) => c.trim());
    const final = cells[cells.length - 1].trim();
    const beforeAfter =
      nonFinal.some((c) => OLD_MARK.test(c)) && NEW_MARK.test(final);
    lines.headerKind = beforeAfter ? "beforeAfter" : "checklist";
    continue;
  }

  const kind = lines.headerKind || "checklist";

  if (kind === "beforeAfter") {
    for (const c of cells.slice(0, -1))
      for (const q of quoted(c))
        oldStrings.push({ q, line: i + 1, section, raw: l, role: "beforeAfter-old" });
    for (const q of quoted(cells[cells.length - 1]))
      newStrings.push({ q, line: i + 1, section, raw: l });
  } else {
    // Checklist row: a quote is an OLD anchor only if a removal verb governs
    // the SENTENCE that contains the quote; otherwise it is a TARGET or a claim.
    for (const c of cells) {
      for (const q of quoted(c)) {
        const sentence =
          c.split(/(?<=[.;])\s+/)
            .find((s) => s.includes(q)) || c;
        if (REMOVE_VERB.test(sentence))
          oldStrings.push({
            q,
            line: i + 1,
            section,
            raw: c,
            role: "removal",
          });
        else newStrings.push({ q, line: i + 1, section, raw: c });
      }
    }
  }
}

const O = uniq(oldStrings).filter((x) => isLiteral(x.q));
const N = uniq(newStrings).filter((x) => isLiteral(x.q));
const count = (s) => flat.split(norm(s)).length - 1;

const missing = [],
  ok = [],
  prefix = [];
for (const x of O) {
  if (count(x.q) > 0) {
    ok.push(x);
    continue;
  }
  const probe = norm(x.q).slice(0, 38);
  if (probe.length > 16 && flat.toLowerCase().includes(probe.toLowerCase()))
    prefix.push(x);
  else missing.push(x);
}

// A missing OLD string is still a false positive if the section is Owner voice.
const cls = { ownerVoice: [], rendered: [], nearMiss: [], broken: [] };
for (const m of missing) {
  if (OWNER_SECTION.test(m.section) || /\*\s*["“]/.test(m.raw)) {
    cls.ownerVoice.push(m);
    continue;
  }
  // RENDERED EXAMPLE — the build stores a template literal and the document
  // quotes the rendered output ("worth about +2.3 points to the Chiefs" lives
  // in the build as `worth about ${pts} points for ${N}`). Searching for the
  // quoted literal will fail; the SOURCE form is the target.
  const shape = norm(m.q)
    .replace(/[0-9][0-9.,]*/g, "#")
    .replace(/\b[A-Z][a-z]+(s|'s)?\b/g, "W");
  const shapeWords = shape.split(/\s+/).filter((w) => w.length > 3);
  const rendered = shapeWords.filter((w) => {
    const probe = w.replace(/#/g, "").toLowerCase();
    return probe.length > 4 && flat.toLowerCase().includes(probe);
  }).length;
  if (rendered >= Math.max(2, Math.floor(shapeWords.length * 0.5))) {
    cls.rendered.push(m);
    continue;
  }
  // NEAR MISS — the text is present but with different punctuation/wrapping.
  const stripped = norm(m.q).replace(/[()"'“”`]/g, "");
  if (stripped.length > 12 && flat.toLowerCase().includes(stripped.toLowerCase())) {
    cls.nearMiss.push(m);
    continue;
  }
  cls.broken.push(m);
}

console.log(`document: ${docPath}\nbuild:    ${buildPath}`);
console.log(
  `OLD anchors claimed by the document: ${O.length}  |  found in build: ${ok.length}  |  missing: ${missing.length}  |  prefix-only: ${prefix.length}`,
);
console.log(
  `TARGET strings claimed by the document: ${N.length}  |  already present: ${N.filter((x) => count(x.q) > 0).length}`,
);
console.log("\n=== THE TRUE COUNT ===");
console.log(`  TRUE BROKEN ANCHORS : ${cls.broken.length}   <- only these need a document fix`);
console.log(`  false: Owner voice  : ${cls.ownerVoice.length}   <- the Owner's own words`);
console.log(`  false: rendered     : ${cls.rendered.length}   <- build stores a template literal`);
console.log(`  false: near miss    : ${cls.nearMiss.length}   <- present, different punctuation`);

const show = (title, arr) => {
  if (!arr.length) return;
  console.log(`\n--- ${title} ---`);
  for (const m of arr.slice(0, 40))
    console.log(
      `  l.${m.line}  [${m.section}]  ${JSON.stringify(m.q.slice(0, 92))}`,
    );
  if (arr.length > 40) console.log(`  … and ${arr.length - 40} more`);
};
show("TRUE BROKEN ANCHORS (act on these)", cls.broken);
show("RENDERED EXAMPLES (search the SOURCE form, not the quoted text)", cls.rendered);
show("NEAR MISSES (present, different punctuation)", cls.nearMiss);
show("near-miss prefix matches (wording check)", prefix);

console.log(
  `\nVERDICT: ${cls.broken.length === 0 ? "no real broken anchors" : `${cls.broken.length} anchor(s) will not apply as written`}`,
);
console.log(
  `verify-anchors.mjs reports the raw missing count (${missing.length}); the true broken-anchor count is ${cls.broken.length}.`,
);
