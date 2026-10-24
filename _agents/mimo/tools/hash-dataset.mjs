// Independent dataset-hash implementation (MiMo) — recipe-faithful, no reading of MOC's code.
// Extracts PLAYERS/TEAM_DATA by BRACKET MATCHING (string/escape aware), then JSON.parse.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const FILE = "_agents/pickle/builds/Football-Sim-PreColors.html";
const src = readFileSync(FILE, "utf8");

// --- bracket-matching extractor: find `name =` then the opening bracket, scan to its match ---
function extractBracket(name) {
  const decl = new RegExp("\\b" + name + "\\s*=\\s*([\\[{])");
  const m = decl.exec(src);
  if (!m) throw new Error("declaration not found: " + name);
  const open = m[1];
  const close = open === "[" ? "]" : "}";
  let i = m.index + m[0].length - 1; // position of opening bracket
  let depth = 0, inStr = false, esc = false;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === "\\") { esc = true; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  throw new Error("unbalanced: " + name);
}

const playersRaw = extractBracket("PLAYERS");
const teamRaw = extractBracket("TEAM_DATA");
const players = JSON.parse(playersRaw);      // real parse, not regex
const teams = JSON.parse(teamRaw);

// --- assertions ---
if (!Array.isArray(players)) throw new Error("PLAYERS not array");
if (players.length !== 1200) throw new Error("PLAYERS rows = " + players.length + " (expected 1200)");
for (let i = 0; i < players.length; i++) {
  if (!Array.isArray(players[i]) || players[i].length !== 11)
    throw new Error("row " + i + " fields = " + (players[i] || []).length + " (expected 11)");
}
if (Object.keys(teams).length !== 32) throw new Error("TEAM_DATA teams = " + Object.keys(teams).length);

// --- canonical row: JSON array, original field order, no whitespace, numbers w/o trailing .0,
//     strings JSON-escaped, true/false for xf (JSON.stringify satisfies all by construction) ---
const rowLine = (r) => JSON.stringify(r);

// --- canonical doc: one row/line, original order, \n separators, NO trailing newline ---
const doc = (lines) => lines.join("\n");
const sha = (s) => createHash("sha256").update(Buffer.from(s, "utf8")).digest("hex");

// 1. PLAYERS canonical (original order)
const playersLines = players.map(rowLine);
const playersDoc = doc(playersLines);
const playersHash = sha(playersDoc);

// 2. PLAYERS sorted by name then team (order-sensitivity control)
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const sorted = [...players].sort((a, b) => cmp(a[0], b[0]) !== 0 ? cmp(a[0], b[0]) : cmp(a[2], b[2]));
const sortedDoc = doc(sorted.map(rowLine));
const sortedHash = sha(sortedDoc);

// 3. xf == true count
const xfTrue = players.filter((r) => r[10] === true).length;

// 4. TEAM_DATA, team keys sorted (slot order preserved as in source)
const teamKeys = Object.keys(teams).sort(cmp);
const teamDoc = doc(teamKeys.map((k) => JSON.stringify([k, teams[k]])));
const teamHash = sha(teamDoc);

// --- failure probes: whitespace/format drift + order sensitivity ---
const driftHash = sha(playersLines.map((l) => " " + l).join("\n") + "\n"); // spaces + trailing \n
const orderSame = playersHash === sortedHash;

console.log(JSON.stringify({
  file: FILE,
  playersRows: players.length,
  playersFieldsOk: true,
  teamsCount: Object.keys(teams).length,
  playersHashOriginal: playersHash,
  playersHashSorted: sortedHash,
  orderSensitive: !orderSame,
  xfTrue,
  teamHashSortedKeys: teamHash,
  driftProbe_hash: driftHash,
  driftProbeDiffers: driftHash !== playersHash,
}, null, 2));
