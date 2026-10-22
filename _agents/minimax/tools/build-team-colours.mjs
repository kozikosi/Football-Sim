#!/usr/bin/env node

// build-team-colours.mjs — give the draft the colours of the team you are drafting for.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node. Reads a build, writes a variant; never edits
// the input. This is the "beauty" item Kosi asked for: the draft header, the board's rows and the
// position cards take the colours of the user's own team.
//
//   node build-team-colours.mjs <base.html> <out.html>
//
// The palette is three colours per team: primary, secondary, accent (the accent is used for the
// special-teams rows and the ring on the header badge). A team's colours are public knowledge —
// nothing here is invented, and every row is checkable against the team's own identity.

import crypto from "node:crypto";
import fs from "node:fs";

const [base, out] = process.argv.slice(2);
if (!base || !out) {
  console.error("usage: build-team-colours.mjs <base.html> <out.html>");
  process.exit(4);
}

let h = fs.readFileSync(base, "utf8");
const log = [];
const must = (from, to, label) => {
  const n = h.split(from).length - 1;
  if (n !== 1) {
    console.error(`ANCHOR ${n ? "NOT UNIQUE" : "MISSING"}: ${label}`);
    process.exit(1);
  }
  h = h.replace(from, to);
  log.push(label);
};

// ---------------------------------------------------------------- the palette
const palette = {
  "Arizona Cardinals": ["#97233F", "#FFFFFF", "#000000"],
  "Atlanta Falcons": ["#A71930", "#FFFFFF", "#000000"],
  "Baltimore Ravens": ["#241773", "#FFFFFF", "#000000"],
  "Buffalo Bills": ["#00338D", "#C60C30", "#FFFFFF"],
  "Carolina Panthers": ["#0085CA", "#BFC0BF", "#101820"],
  "Chicago Bears": ["#0B162A", "#FBC026", "#FFFFFF"],
  "Cincinnati Bengals": ["#FB4F14", "#000000", "#FFFFFF"],
  "Cleveland Browns": ["#311D00", "#FF3C00", "#FFFFFF"],
  "Dallas Cowboys": ["#003594", "#869397", "#FFFFFF"],
  "Denver Broncos": ["#FB4F14", "#002244", "#FFFFFF"],
  "Detroit Lions": ["#0076B6", "#B0B7BC", "#FFFFFF"],
  "Green Bay Packers": ["#203731", "#FFB612", "#FFFFFF"],
  "Houston Texans": ["#03202F", "#A71930", "#FFFFFF"],
  "Indianapolis Colts": ["#002C5F", "#FFFFFF", "#A2AAAD"],
  "Jacksonville Jaguars": ["#006778", "#D7A22A", "#000000"],
  "Kansas City Chiefs": ["#E31837", "#FFFFFF", "#FFB81C"],
  "Las Vegas Raiders": ["#101820", "#A5ACAF", "#FFFFFF"],
  "Los Angeles Chargers": ["#0080C6", "#0A2494", "#FFC72C"],
  "Los Angeles Rams": ["#003594", "#FFB612", "#FFFFFF"],
  "Miami Dolphins": ["#008E97", "#FC4C02", "#FFFFFF"],
  "Minnesota Vikings": ["#4F2683", "#FFC62F", "#FFFFFF"],
  "New England Patriots": ["#002244", "#C60C30", "#BFC0BF"],
  "New Orleans Saints": ["#101820", "#D3BC8D", "#FFFFFF"],
  "New York Giants": ["#0B2265", "#A71930", "#FFFFFF"],
  "New York Jets": ["#125740", "#FFFFFF", "#000000"],
  "Philadelphia Eagles": ["#004C54", "#A5ACAF", "#FFFFFF"],
  "Pittsburgh Steelers": ["#FFB612", "#101820", "#FFFFFF"],
  "San Francisco 49ers": ["#AA0000", "#B3995D", "#FFFFFF"],
  "Seattle Seahawks": ["#002244", "#69BE28", "#FFFFFF"],
  "Tampa Bay Buccaneers": ["#D50A0A", "#D7D7D8", "#000000"],
  "Tennessee Titans": ["#0C2340", "#4B92DB", "#E2363F"],
  "Washington Commanders": ["#5A1414", "#FFB81C", "#FFFFFF"],
};

// ---------------------------------------------------------------- the colour variables and the rules that use them
must(
  ":root{color-scheme:light dark;",
  ":root{--team1:#4F8DFF;--team2:#FFFFFF;--team3:#FFC24B;color-scheme:light dark;",
  "the three team colour variables are declared on :root, with the current blue as the default",
);

must(
  ".draftingas{display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:12px;background:linear-gradient(90deg, rgba(79,140,255,0.15), rgba(255,107,74,0.08));border:1px solid var(--accent);",
  ".draftingas{display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:12px;background:linear-gradient(90deg, color-mix(in srgb, var(--team1) 15%, transparent), color-mix(in srgb, var(--team3) 9%, transparent));border:1px solid var(--team1);",
  "the drafting-as frame takes the team colours: a wash of the primary, a border in the primary, the accent in the second stop",
);

must(
  "background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;",
  "background:var(--team1);color:var(--team2);box-shadow:0 0 0 3px var(--team3);display:flex;align-items:center;justify-content:center;",
  "the header badge takes the team colours: the fill is the primary, the letters the secondary, the ring the accent",
);

must(
  ".draftingas .das-text b{color:var(--accent);font-size:1.05rem;}",
  ".draftingas .das-text b{color:var(--team1);font-size:1.05rem;}",
  "the team name in the header takes the team colour",
);

// the board: a colour edge on every row, a soft tint on hover, and the accent on the priority bars
must(
  "#draftTable2 td.dc-pri{grid-column:7 / 13;grid-row:2;color:var(--gold);}",
  " #draftTable2 td.dc-pri{grid-column:7 / 13;grid-row:2;color:var(--gold);}\n" +
    " #draftTable2 tbody tr td.dc-name{box-shadow:inset 3px 0 0 var(--team1);padding-left:8px;}\n" +
    " #draftTable2 tbody tr:hover{background:color-mix(in srgb, var(--team1) 9%, transparent);}\n" +
    " #draftTable2 tbody tr:hover td.dc-name{box-shadow:inset 3px 0 0 var(--team3);}",
  "the board rows get a team-coloured edge and a team-tinted hover",
);

// the position cards, the chips and the priority bars
must(
  ".pcard{border:1px solid var(--border);border-radius:10px;background:var(--panel2);padding:8px 10px;}",
  ".pcard{border:1px solid var(--border);border-left:4px solid var(--team1);border-radius:10px;background:var(--panel2);padding:8px 10px;}",
  "the position cards get a team-coloured edge",
);

fs.writeFileSync(out, h);
console.log("written:", out, Buffer.byteLength(h), "B");

for (const l of log) console.log(`  ${l}`);


// the drafting-as frame wears the team: a tri-colour stripe on top, the primary on the border
must('.draftingas .das-text b{color:var(--team1);font-size:1.05rem;}',
  '.draftingas .das-text b{color:var(--team1);font-size:1.05rem;}\n' +
  ' .draftingas{position:relative;overflow:hidden;}\n' +
  ' .draftingas::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,var(--team1) 0%,var(--team2) 48%,var(--team3) 100%);}\n' +
  ' .teamtag{color:var(--t1);background:color-mix(in srgb, var(--t1) 12%, transparent);border:1px solid color-mix(in srgb, var(--t1) 35%, transparent);border-radius:5px;padding:0 5px;}\n' +
  ' .opp-panel{border-left:3px solid var(--t1);background:color-mix(in srgb, var(--t1) 7%, transparent);}\n' +
  ' .gamestar{color:var(--t1);text-shadow:0 0 8px color-mix(in srgb, var(--t1) 60%, transparent);}',
  'the drafting-as frame takes a tri-colour stripe and the team border, and the team-tag, opponent-panel and game-star hooks are defined');

// ---------------------------------------------------------------- the script side: the map and the setter
const mapLiteral = JSON.stringify(palette, null, 0);
const addition = `
// ---- the team's colours, everywhere the team appears (added by the council, 22 Oct) ----
// A team tag that carries the team's palette, e.g. "(Vikings)" in purple.
function teamTag(name, label){
  const c = TEAM_COLORS[name] || ['#4F8DFF','#FFFFFF','#FFC24B'];
  return '<span class="teamtag" style="--t1:'+c[0]+';--t2:'+c[1]+';--t3:'+c[2]+'">'+(label||('('+name+')'))+'</span>';
}

const TEAM_COLORS = ${mapLiteral};
function applyTeamColors(teamName){
 const c = TEAM_COLORS[teamName] || ['#4F8DFF','#FFFFFF','#FFC24B'];
 const r = document.documentElement.style;
 r.setProperty('--team1', c[0]); r.setProperty('--team2', c[1]); r.setProperty('--team3', c[2]);
}`;
let s2 = h;
const anchor = "function normalizeSlotEntry(raw){";
if (!s2.includes(anchor)) {
  console.error("ANCHOR MISSING: the colour setter");
  process.exit(1);
}
s2 = s2.replace(anchor, `${addition}\n${anchor}`);
// call it when the draft starts, next to the drafting-as banner
const banner = "document.getElementById('draftingAsBanner').innerHTML =";
if (!s2.includes(banner)) {
  console.error("ANCHOR MISSING: the drafting-as banner");
  process.exit(1);
}
s2 = s2.replace(banner, `applyTeamColors(userTeamName);\n  ${banner}`);
fs.writeFileSync(out, s2);
console.log(
  "  the colour map and applyTeamColors() are added, and called when the draft starts",
);
console.log(
  "sha256:",
  crypto.createHash("sha256").update(s2).digest("hex"),
  "bytes",
  Buffer.byteLength(s2),
);

const script = s2.slice(
  s2.indexOf("<script>") + 8,
  s2.lastIndexOf("</script>"),
);
fs.writeFileSync("/tmp/teamcolours-script.js", script);
console.log("script bytes:", script.length);
