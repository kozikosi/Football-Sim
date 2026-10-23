#!/usr/bin/env node

// build-owner-brief3-variant.mjs — the Owner's third brief (21 Oct): the guide's flex table, the
// computer-picks sentence, the merged position-values section, and the glossary cross-references.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node. Reads a build, writes a variant; never edits
// the input. Line-oriented edits, every anchor asserted.
//
//   node build-owner-brief3-variant.mjs <base.html> <out.html>
//
// Base for the V22 candidate: the merge candidate with brief 1 and brief 2 already applied.
//
//   1  the flex table follows the draft board's order, quarterback first
//   2  "tackle" is never said on its own: always "offensive tackle"
//   3  the computer-picks sentence loses "(never below a 76 rating) at a spot it still needs"
//   4  "Position values" is folded into "Drafting: which positions matter" and renamed
//      "Drafting & Position Values"
//   5  the glossary gains the football terms the previews and recaps use, each cross-referenced

import crypto from "node:crypto";
import fs from "node:fs";

const [base, out] = process.argv.slice(2);
if (!base || !out) {
  console.error("usage: build-owner-brief3-variant.mjs <base.html> <out.html>");
  process.exit(4);
}

const lines = fs.readFileSync(base, "utf8").split("\n");
const log = [];
const at = (needle, label) => {
  const hits = lines
    .map((l, i) => (l.includes(needle) ? i : -1))
    .filter((i) => i >= 0);
  if (hits.length !== 1) {
    console.error(`ANCHOR ${hits.length ? "NOT UNIQUE" : "MISSING"}: ${label}`);
    process.exit(1);
  }
  return hits[0];
};
const patch = (needle, from, to, label) => {
  const i = at(needle, label);
  if (!lines[i].includes(from)) {
    console.error(`ANCHOR MISSING INSIDE LINE: ${label}`);
    process.exit(1);
  }
  lines[i] = lines[i].replace(from, to);
  log.push(label);
};

// ---------------------------------------------------------------- 1 · the flex table, in the board's order
{
  const startNeedle = "<tr><td>Tackle</td>";
  const start = at(startNeedle, "1a the flex table");
  let end = -1;
  for (let k = start; k < lines.length; k++) {
    if (lines[k].includes("<td>Quarterback</td>")) {
      end = k;
      break;
    }
  }
  if (end < 0) {
    console.error("ANCHOR MISSING: 1a (end of the flex table)");
    process.exit(1);
  }
  const rows = [
    '  <tr><td>Quarterback</td><td colspan="4">cannot play anywhere else</td></tr>',
    "  <tr><td>Running back</td><td></td><td></td><td></td><td>tight end</td></tr>",
    "  <tr><td>Wide receiver</td><td></td><td></td><td>tight end, safety, cornerback</td><td>running back</td></tr>",
    "  <tr><td>Tight end</td><td></td><td></td><td></td><td>linebacker, safety, running back</td></tr>",
    "  <tr><td>Offensive tackle</td><td>any other line spot (guard, center)</td><td></td><td>defensive tackle</td><td></td></tr>",
    "  <tr><td>Guard / center</td><td>guard ↔ center</td><td></td><td>offensive tackle, defensive tackle</td><td></td></tr>",
    "  <tr><td>Edge rusher</td><td></td><td>defensive tackle, WILL, SAM</td><td>MIKE</td><td>tight end, running back</td></tr>",
    "  <tr><td>Defensive tackle</td><td></td><td></td><td>edge, linebacker, guard, center</td><td>offensive tackle, running back</td></tr>",
    "  <tr><td>Linebacker</td><td>any linebacker spot</td><td></td><td>defensive tackle, safety, third corner</td><td>edge, tight end, running back</td></tr>",
    "  <tr><td>Cornerback</td><td>free safety</td><td>strong safety</td><td>linebacker, wide receiver</td><td>tight end, running back</td></tr>",
    "  <tr><td>Safety</td><td></td><td>other safety; strong safety to SAM</td><td>corner, linebacker, wide receiver</td><td>tight end, running back</td></tr>",
  ];
  lines.splice(start, end - start + 1, ...rows);
  log.push(
    "1a the flex table: quarterback first, then the board's order (running back, wide receiver, tight end, offensive tackle, guard/center, edge rusher, defensive tackle, linebacker, cornerback, safety)",
  );
}

// ---------------------------------------------------------------- 2 · never say "tackle" on its own
patch(
  "a left tackle plays tackle",
  "a left tackle plays tackle",
  "a left offensive tackle plays offensive tackle",
  '2a the flex explanation says "a left offensive tackle plays offensive tackle"',
);
{
  // the sentence lived in the "Value here" bullet, which brief 1 already deleted
  const needle = "a guard slotted at tackle plays 4 points worse";
  const hit = lines.findIndex((l) => l.includes(needle));
  if (hit >= 0) {
    lines[hit] = lines[hit].replace(
      needle,
      "a guard slotted at offensive tackle plays 4 points worse",
    );
    log.push('2b the board explanation says "slotted at offensive tackle"');
  } else
    log.push(
      '2b (already gone with the "Value here" bullet) no bare "tackle" left in that sentence',
    );
}
patch(
  "the tackle makes up about a fifth",
  "the tackle makes up about a fifth",
  "the offensive tackle makes up about a fifth",
  '2c the position-values explanation says "the offensive tackle"',
);

// ---------------------------------------------------------------- 3 · the computer-picks sentence
patch(
  "How the computer teams pick.",
  "over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste",
  "over a replacement-level starter, with a little personal taste",
  '3 the guide no longer says "(never below a 76 rating) at a spot it still needs"',
);

// ---------------------------------------------------------------- 4 · one section: "Drafting & Position Values"
patch(
  "sec('Drafting: which positions matter', draft, true)",
  "sec('Drafting: which positions matter', draft, true)",
  "sec('Drafting & Position Values', draft + values, true)",
  "4a the position values are folded into the drafting section",
);
patch(
  "+ sec('Position values: all 26 starting spots', values, false)",
  "+ sec('Position values: all 26 starting spots', values, false)",
  "",
  '4b the separate "Position values" section is gone',
);

// ---------------------------------------------------------------- 5 · the glossary gains the preview and recap terms
patch(
  "<li><b>Replacement level</b>",
  "<li><b>Replacement level</b>",
  `  <li><b>Turnover</b> — a change of possession the team did not choose: a pass intercepted, a fumble lost, or a failed fourth down. <span class="narr">Recaps, box scores.</span></li>
  <li><b>Personnel (11 / 12 / 13 / 21 / 22)</b> — how many players of each group are on the field at once: 11 is the standard set, 12 adds a tight end, 13 a second tight end, 21 a second running back, 22 two tight ends and one receiver. <span class="narr">Game previews, Coaching section.</span></li>
  <li><b>Extra point / 2-Pt Conv</b> — after a touchdown you can kick the extra point for 1 point, or run one play for 2 (a 2-point conversion). <span class="narr">Recaps, Season Review.</span></li>
  <li><b>Safety (the position) / safety (the score)</b> — a safety is a defensive back; a safety score is a rare 2-point defensive touchdown. <span class="narr">Recaps.</span></li>
  <li><b>Field position</b> — where the offense starts each drive; a good return pushes the other team back. <span class="narr">Recaps, the returner note.</span></li>
  <li><b>Pancakes</b> — a block that knocks a defender to the ground; the offensive line's win column. <span class="narr">Box score.</span></li>
  <li><b>Yds behind</b> — yards the defense gave up before the runner crossed the line of scrimmage: how far up the defense let the run start. <span class="narr">Box score.</span></li>
  <li><b>Press. alwd</b> — pressures allowed: how often the quarterback was hurried or hit. <span class="narr">Box score.</span></li>
  <li><b>Hurry-up</b> — the offense snaps the ball fast, before the defense can get set. <span class="narr">Recaps.</span></li>
  <li><b>Shootout</b> — a high-scoring, close game. <span class="narr">Recaps.</span></li>
  <li><b>The edge</b> — a small advantage; "the ratings gave an edge of about three points" means the model thought the game was close. <span class="narr">Previews, recaps.</span></li>
  <li><b>Chip numbers</b> — on the draft board, how many starters you have already drafted at a position (0/2 means both are still open). <span class="narr">Draft board.</span></li>
  <li><b>Replacement level</b>`,
  "5 the glossary gains thirteen terms the previews, recaps and box scores use, each marked with where it appears",
);

const h = lines.join("\n");
fs.writeFileSync(out, h);
console.log("written:", out, Buffer.byteLength(h), "B");
console.log("sha256:", crypto.createHash("sha256").update(h).digest("hex"));
for (const l of log) console.log(`  ${l}`);

const s = h.slice(h.indexOf("<script>") + 8, h.lastIndexOf("</script>"));
fs.writeFileSync("/tmp/owner-brief3-variant-script.js", s);
console.log("script bytes:", s.length);
