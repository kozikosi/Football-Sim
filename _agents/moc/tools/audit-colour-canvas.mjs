#!/usr/bin/env node
// MOC — 22 Oct: re-run the colour-canvas audit (M-20261022-i) against any build.
//
//   node _agents/moc/tools/audit-colour-canvas.mjs <build.html>
//
// Measures the SAME things the first audit measured, so two builds can be
// compared without re-reading the note: for each of the canvas's mechanisms,
// is the CSS rule present, and does anything outside the style block call it?
// A mechanism with a rule and no caller paints nothing; a caller with no rule
// paints nothing either. "Live" means both.
//
// Read-only: opens the build, writes nothing.

import fs from "node:fs";

const p = process.argv[2];
if (!p) {
  console.error("usage: node _agents/moc/tools/audit-colour-canvas.mjs <build.html>");
  process.exit(2);
}
const src = fs.readFileSync(p, "utf8");

// ---- split CSS from everything else -------------------------------------
const styleBlocks = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);
const css = styleBlocks.join("\n");
const rest = src.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

const countIn = (hay, needle) => hay.split(needle).length - 1;
const ruleFor = (selector) => {
  // the selector's rule body, first match, tolerant of whitespace
  const re = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{([^}]*)\\}", "i");
  const m = css.match(re);
  return m ? m[1].trim() : null;
};

// ---- the mechanisms, as the first audit defined them ---------------------
const mech = [];

// S1 — "drafting as" frame
{
  const rule = ruleFor(".draftingas");
  const calls = countIn(rest, 'class="draftingas"') + countIn(rest, "class='draftingas'") + countIn(rest, "draftingas");
  // the frame existing is not the same as the frame being team-coloured: a rule
  // painted with a fixed rgba() serves the surface with no colour at all
  const teamColoured = rule ? /--team1|--t1/.test(rule) : false;
  mech.push({ id: "S1", name: "the drafting-as frame", sel: ".draftingas", hasRule: teamColoured, calls, rule: rule && (teamColoured ? "team colour" : "FIXED colour, no team token") });
}

// S2 — the 32-team map
{
  // the map can be written two ways: 32 CSS rules, or one JS emitter that returns
  // `--t1:…;--t2:…;--t3:…` for an inline style. Both serve the surface; a rule
  // count alone would miss candidate C entirely.
  const rules = (css.match(/\[data-team/g) || []).length;
  const inlineEmitter = /--t1:/.test(rest);
  const uses = (rest.match(/data-team=/g) || []).length;
  mech.push({ id: "S2", name: "the 32-team map", sel: "team tokens", hasRule: rules > 0 || inlineEmitter, calls: uses, rules, rule: rules + " CSS rules, inline emitter: " + inlineEmitter });
}

// S3 — position cards
{
  const rule = ruleFor(".pcard");
  const vars = rule ? (rule.match(/var\(--team1\)/g) || []).length : 0;
  const calls = countIn(rest, 'class="pcard"') + countIn(rest, "pcard");
  mech.push({ id: "S3", name: "the position cards", sel: ".pcard", hasRule: !!rule && vars > 0, calls, rule });
}

// S5/S10/S16 — teamTag()
{
  const def = (rest.match(/function\s+teamTag\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/) || [null])[0];
  const calls = countIn(rest, "teamTag(") - (def ? 1 : 0);
  mech.push({ id: "S5/S10/S16", name: "the team names", sel: "teamTag()", hasRule: !!def, calls, rule: def ? "defined" : null, def });
}

// S6/S7/S9/S12 — the opponent panel
{
  const rule = ruleFor(".opp-panel");
  const calls = countIn(rest, "opp-panel");
  mech.push({ id: "S6/S7/S9/S12", name: "the unit lines / scoreboard / standings", sel: ".opp-panel", hasRule: !!rule, calls, rule });
}

// S7/S8/S14 — the stars
{
  const rule = ruleFor(".gamestar");
  const calls = countIn(rest, "gamestar");
  mech.push({ id: "S7/S8/S14", name: "the stars / game ball / awards", sel: ".gamestar", hasRule: !!rule, calls, rule });
}

// S11 — the vs card
{
  const rule = ruleFor(".vscard");
  const calls = countIn(rest, "vscard");
  mech.push({ id: "S11", name: "the vs card", sel: ".vscard", hasRule: !!rule, calls, rule });
}

// S4/S20 — your roster / season card
{
  const rule = ruleFor(".teamframe");
  const calls = countIn(rest, "teamframe");
  mech.push({ id: "S4/S20", name: "your roster / season card", sel: ".teamframe", hasRule: !!rule, calls, rule });
}

// ---- the .ub marker (the house convention the canvas never listed) -------
const ubRule = ruleFor(".ub");
const ubUsesAccent = ubRule ? /var\(--accent\)/.test(ubRule) : false;
const ubUsesTeam1 = ubRule ? /var\(--team1\)|var\(--t1/.test(ubRule) : false;

// ---- report --------------------------------------------------------------
console.log("build      ", p);
console.log("bytes      ", fs.statSync(p).size);
console.log("style blocks", styleBlocks.length, "| css chars", css.length);
console.log("");
console.log("mechanism        surfaces        rule?  callers  live?");
let liveSurfaces = 0;
const SURFACES = { S1: 1, S2: 1, S3: 1, "S5/S10/S16": 3, "S6/S7/S9/S12": 4, "S7/S8/S14": 3, S11: 1, "S4/S20": 2 };
for (const m of mech) {
  const live = m.hasRule && m.calls > 0;
  const surfaces = SURFACES[m.id] || 1;
  if (live) liveSurfaces += surfaces;
  console.log(
    `${m.id.padEnd(14)} ${m.sel.padEnd(15)} ${(m.hasRule ? "yes" : "NO").padEnd(6)} ${String(m.calls).padEnd(8)} ${live ? "LIVE" : "not live"}`
  );
}
console.log("");
console.log("surfaces live:", liveSurfaces, "of 20");
console.log("");
console.log(".ub rule   ", ubRule === null ? "NO RULE" : ubRule);
console.log("  uses var(--accent):", ubUsesAccent, "| uses the team token:", ubUsesTeam1);
console.log("");
const tt = mech.find((m) => m.id === "S5/S10/S16").def;
if (tt) {
  console.log("teamTag() body:");
  console.log(tt.split("\n").map((l) => "  " + l).join("\n"));
} else {
  console.log("teamTag(): NOT DEFINED");
}
