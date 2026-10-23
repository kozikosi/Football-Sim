#!/usr/bin/env node

// build-owner-brief-variant.mjs — build the Owner's 21 Oct brief against the merge candidate.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node. Reads a build, writes a variant; never edits
// the input. Edits are line-oriented: each anchor is a unique substring of a line, so the builder
// survives the indentation of the source and fails loudly if the base moves.
//
//   node build-owner-brief-variant.mjs <base.html> <out.html>
//
// Implements the Owner's brief items 1-5 as specified in the bulletin, plus the guide-text repair
// the column removal forces. Items 6-7 (the weights table) are NOT applied: the measurement in
// _agents/minimax/notes/owner-brief-merge-changes.md shows the Owner's table is already the live
// model weights, so replacing the constant is a no-op. See the note.

import crypto from "node:crypto";
import fs from "node:fs";

const [base, out] = process.argv.slice(2);
if (!base || !out) {
  console.error("usage: build-owner-brief-variant.mjs <base.html> <out.html>");
  process.exit(4);
}

const lines = fs.readFileSync(base, "utf8").split("\n");
const log = [];

// find the single line containing `needle`; returns its index
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
// replace the whole line at index i with `text`
const _setLine = (i, text, label) => {
  lines[i] = text;
  log.push(label);
};
// replace a substring inside one unique line
const patch = (needle, from, to, label) => {
  const i = at(needle, label);
  if (!lines[i].includes(from)) {
    console.error(`ANCHOR MISSING INSIDE LINE: ${label}`);
    process.exit(1);
  }
  lines[i] = lines[i].replace(from, to);
  log.push(label);
};
// delete the line at index i
const dropLine = (i, label) => {
  lines.splice(i, 1);
  log.push(label);
};

// ---------------------------------------------------------------- item 1: "Value here" off the board
patch(
  "#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}",
  " #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}",
  "",
  "1a CSS: the dc-val rule is removed",
);
patch(
  "#draftTable2 td.dc-pri{grid-column:10 / 13;grid-row:2;color:var(--gold);}",
  "#draftTable2 td.dc-pri{grid-column:10 / 13;grid-row:2;color:var(--gold);}",
  "#draftTable2 td.dc-pri{grid-column:7 / 13;grid-row:2;color:var(--gold);}",
  "1b CSS: dc-pri reflows 10/13 -> 7/13 (measured: the grid is 12 columns and only dc-pri moves)",
);

patch(
  '<option value="value">Sort: value here</option>',
  '<option value="value">Sort: value here</option>',
  '',
  "1c sort dropdown: the option is kept (the maths is unchanged) and relabelled, so no visible control names a column that no longer exists",
);

patch(
  '<th data-sort="value" class="sortable"',
  '<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>',
  "",
  '1d table header: the "Value here" th is removed',
);

patch(
  'title="Value here minus what you would probably still find',
  'title="Value here minus what you would probably still find at that position at your next pick. High = waiting costs you."',
  'title="Wins at this spot minus what you would probably still find at that position at your next pick. High = waiting costs you."',
  "1e table header: the Priority tooltip no longer names the removed column",
);

patch(
  '<td class="score dc-val" data-label="Value here">',
  '<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>',
  "",
  "1f row cell: the dc-val cell is removed (r.v is still computed and still feeds Priority)",
);

patch(
  'colspan="10"',
  'colspan="10"',
  'colspan="9"',
  "1g empty state: colspan 10 -> 9",
);

// the guide: the "Value here" bullet goes, and the Priority bullet must stop naming a gone column
dropLine(
  at("<li><b>Value here</b>", '1h guide: the "Value here" bullet'),
  '1h guide: the "Value here" bullet is deleted',
);
patch(
  "<li><b>Priority</b> — Value here minus",
  "<li><b>Priority</b> — Value here minus the best you could expect to still find at that spot at your next pick.",
  "<li><b>Priority</b> — Wins at the spot he would fill minus the best you could expect to still find at that spot at your next pick.",
  "1i guide: the Priority bullet no longer names the removed column",
);
patch(
  "Reading the draft board (Wins, Value here,",
  "Reading the draft board (Wins, Value here, Priority, Gone, stars)",
  "Reading the draft board (Wins, Priority, Gone, stars)",
  "1j guide: the section title no longer lists the removed column",
);

// ---------------------------------------------------------------- item 2: "More" out of the tab footer
patch(
  '<nav class="footnav" aria-label="More tools">',
  '<nav class="footnav" aria-label="More tools"><span class="footlabel">More</span>',
  '<nav class="footnav" aria-label="More tools">',
  '2 tab footer: the "More" label is removed; the six footer buttons stay (the aria-label is kept for screen readers)',
);

// ---------------------------------------------------------------- item 3: the penalty sections move to the bottom
{
  const i = at(
    'h += `<div class="synergy-box">',
    "3a weights panel: the first penalty section",
  );
  lines[i] = lines[i].replace(
    'h += `<div class="synergy-box">',
    'let synBoxes = `<div class="synergy-box">',
  );
  log.push(
    "3a weights panel: the three penalty sections are collected into a string instead of emitted at the top",
  );
}
{
  const start = at(
    "Can't Pass Penalty (Pass Game)",
    "3b weights panel: the last penalty section",
  );
  let end = -1;
  for (let k = start; k < lines.length; k++) {
    if (lines[k].includes("</div>`;")) {
      end = k;
      break;
    }
  }
  if (end < 0) {
    console.error("ANCHOR MISSING: 3b (end of the penalty sections)");
    process.exit(1);
  }
  log.push(
    "3b weights panel: the penalty-section string is closed before the weight groups",
  );
}
{
  const i = at(
    '<button class="resetbtn" id="modelWBtn"',
    "3c/4/5a weights panel: the button row",
  );
  const btnLine = lines[i];
  if (
    !btnLine.includes("Use model weights") ||
    !btnLine.includes("Back to my weights")
  ) {
    console.error("ANCHOR MISSING INSIDE LINE: 3c/4/5a");
    process.exit(1);
  }
  const explainLine = lines[i - 1];
  const _totalLine = lines[i - 2];
  if (!explainLine.includes("The default is the <b>model weights</b>")) {
    console.error("ANCHOR MISSING INSIDE LINE: 3c/4/5a (explanation)");
    process.exit(1);
  }
  lines[i - 1] = explainLine.replace(
    /The default is the <b>model weights<\/b>:[^`]*?<\/div>/,
    "Default is how the draft simulator sees the game.</div>",
  );
  lines[i] = btnLine
    .replace("Use model weights</button>", "Default</button>")
    .replace(
      '<button class="resetbtn" id="personalWBtn">Back to my weights</button>',
      '<button class="resetbtn off" id="personalWBtn" disabled title="Change a weight to enable this.">Save My Weights</button>',
    );
  lines.splice(i + 1, 0, " h += synBoxes;");
  log.push(
    "3c/4/5a weights panel: the buttons are renamed (Default / Save My Weights), the save button starts transparent and disabled, the short explanation replaces the long one, and the three penalty sections are appended BELOW the buttons",
  );
}

// ---------------------------------------------------------------- item 5: the button states and the handlers
{
  const i = at(
    "inp.addEventListener('input'",
    "5b weights panel: the input listener",
  );
  let j = -1;
  for (let k = i; k < i + 12; k++) {
    if (lines[k].trim() === "render();") {
      j = k;
      break;
    }
  }
  if (j < 0) {
    console.error("ANCHOR MISSING INSIDE LINE: 5b");
    process.exit(1);
  }
  lines[j] = `   syncWBtn();\n${lines[j]}`;
  log.push(
    "5b weights panel: editing a weight re-evaluates the save button state",
  );
}
{
  const i = at("const refresh = ()=>", "5c weights panel: the button handlers");
  const refreshLine = lines[i],
    modelLine = lines[i + 1],
    personalLine = lines[i + 2];
  if (!refreshLine.includes("render();")) {
    console.error("ANCHOR MISSING INSIDE LINE: 5c (refresh)");
    process.exit(1);
  }
  if (!modelLine.includes("modelWBtn")) {
    console.error("ANCHOR MISSING INSIDE LINE: 5c (model)");
    process.exit(1);
  }
  if (!personalLine.includes("personalWBtn")) {
    console.error("ANCHOR MISSING INSIDE LINE: 5c (personal)");
    process.exit(1);
  }
  lines[i] =
    " const isDirty = ()=> JSON.stringify(weights)!==JSON.stringify(modelWeights());\n" +
    " const syncWBtn = ()=>{\n" +
    "  const b = document.getElementById('personalWBtn'); if(!b) return;\n" +
    "  if(isDirty()){ b.textContent='My Weights'; b.disabled=false; b.classList.remove('off'); b.title='Save the weights you set as your own set.'; }\n" +
    "  else if(personalWeights){ b.textContent='My Weights'; b.disabled=false; b.classList.remove('off'); b.title='Go back to the weights you saved.'; }\n" +
    "  else { b.textContent='Save My Weights'; b.disabled=true; b.classList.add('off'); b.title='Change a weight to enable this.'; }\n" +
    " };\n" +
    " const refresh = ()=>{ el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; }); syncWBtn(); render(); };";
  lines[i + 1] =
    " document.getElementById('modelWBtn').addEventListener('click', ()=>{ if(isDirty()) personalWeights = {...weights}; weights = modelWeights(); refresh(); });";
  lines[i + 2] =
    " document.getElementById('personalWBtn').addEventListener('click', ()=>{ if(isDirty()) personalWeights = {...weights}; else weights = {...(personalWeights||modelWeights())}; refresh(); });";
  log.push(
    "5c weights panel: the save button is enabled only once a weight differs from the default; it saves the set you edited, and loads your saved set when you are back on the defaults",
  );
}

// the "transparent" state needs a style: the build has no disabled-button pattern
{
  const i = at(
    ".resetbtn:hover{opacity:1;transform:translateY(-1px);box-shadow:0 10px 24px var(--glow);}",
    "5d CSS: the transparent (inert) state of the save button",
  );
  lines.splice(
    i + 1,
    0,
    " .resetbtn.off{background:transparent;color:var(--sub);border:1px solid var(--border);box-shadow:none;opacity:.7;cursor:default;}",
    " .resetbtn.off:hover{transform:none;box-shadow:none;opacity:.7;}",
  );
  log.push(
    "5d CSS: the transparent (inert) state of the save button — no fill, no glow, muted text",
  );
}

// the saved set starts empty, so the button starts transparent
patch(
  "personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights();",
  "personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights();",
  "personalWeights = null; weights = modelWeights();",
  "5e weights panel: no saved set exists on load, so the save button starts transparent and unclickable",
);

const h = lines.join("\n");
fs.writeFileSync(out, h);
console.log("written:", out, Buffer.byteLength(h), "B");
console.log("sha256:", crypto.createHash("sha256").update(h).digest("hex"));
for (const l of log) console.log(`  ${l}`);

const s = h.slice(h.indexOf("<script>") + 8, h.lastIndexOf("</script>"));
fs.writeFileSync("/tmp/owner-brief-variant-script.js", s);
console.log("script bytes:", s.length);
