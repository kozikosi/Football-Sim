#!/usr/bin/env node
// MOC — 22 Oct: build a queryable SQLite database from the NFL Draft Simulator build.
//
//   node _agents/moc/tools/build-sim-db.mjs "<build.html>" "<out.db>"
//
// Reads the build's own PLAYERS array and TEAM_DATA object (the single source of
// truth for the pool and the depth charts) and writes them as tables, so the
// sqlite MCP server can answer questions the council currently greps for.
//
// Tables
//   players(name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf)   — the pool
//   team_slots(team, slot, name, ovr)                                   — 32 depth charts
//   meta(key, value)                                                    — build hash, counts, date
// Read-only against the build; writes only the .db file.

import fs from "node:fs";
import crypto from "node:crypto";
import { DatabaseSync } from "node:sqlite";

const buildPath = process.argv[2] || "NFL Draft Simulator merged.html";
const outPath = process.argv[3] || "/Users/kosi/football-sim.db";

const html = fs.readFileSync(buildPath, "utf8");

// pull a JS literal out of the script by matching brackets, so strings with
// brackets inside them do not break the scan
function literal(src, name) {
  const at = src.indexOf(`const ${name} = `);
  if (at < 0) throw new Error(`${name} not found in ${buildPath}`);
  // the opening character is the first non-space after "= ", not the first "[" —
  // an object literal has no "[" of its own and the first one inside it is data
  let i = at + `const ${name} = `.length;
  while (i < src.length && /\s/.test(src[i])) i++;
  const open = src[i];
  const close = open === "[" ? "]" : "}";
  let depth = 0, inStr = false, quote = "";
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (c === "\\") { j++; continue; }
      if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; quote = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return src.slice(i, j + 1); }
  }
  throw new Error(`unterminated ${name}`);
}
const parse = (t) => JSON.parse(t.replace(/\btrue\b/g, "true").replace(/\bundefined\b/g, "null"));

const players = parse(literal(html, "PLAYERS"));
const teamData = parse(literal(html, "TEAM_DATA"));

if (fs.existsSync(outPath)) fs.rmSync(outPath);
const db = new DatabaseSync(outPath);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE players (
    name TEXT, pos TEXT, team TEXT, ovr INTEGER,
    spd INTEGER, str INTEGER, agi INTEGER, cod INTEGER, inj INTEGER, awr INTEGER, xf INTEGER
  );
  CREATE TABLE team_slots (team TEXT, slot TEXT, name TEXT, ovr INTEGER);
  CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT);
  CREATE INDEX idx_players_team ON players(team);
  CREATE INDEX idx_players_pos  ON players(pos);
  CREATE INDEX idx_players_ovr  ON players(ovr);
  CREATE INDEX idx_slots_team   ON team_slots(team);
`);

const insP = db.prepare("INSERT INTO players VALUES (?,?,?,?,?,?,?,?,?,?,?)");
db.exec("BEGIN");
for (const p of players) {
  const [name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf] = p;
  insP.run(name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf === true ? 1 : 0);
}
db.exec("COMMIT");

const insS = db.prepare("INSERT INTO team_slots VALUES (?,?,?,?)");
db.exec("BEGIN");
let slots = 0;
for (const [team, chart] of Object.entries(teamData)) {
  for (const [slot, v] of Object.entries(chart)) {
    insS.run(team, slot, v && v.name ? v.name : null, v && v.ovr != null ? v.ovr : null);
    slots++;
  }
}
db.exec("COMMIT");

const meta = {
  build_file: buildPath,
  build_sha256: crypto.createHash("sha256").update(fs.readFileSync(buildPath)).digest("hex"),
  build_bytes: fs.statSync(buildPath).size,
  players: String(players.length),
  teams: String(Object.keys(teamData).length),
  team_slots: String(slots),
  built_at: new Date().toISOString(),
  built_by: "MOC _agents/moc/tools/build-sim-db.mjs",
  columns_players: "name,pos,team,ovr,spd,str,agi,cod,inj,awr,xf",
  note: "PLAYERS columns follow the build's array order: [name,pos,team,ovr,spd,str,agi,cod,inj,awr,xf]",
};
const insM = db.prepare("INSERT OR REPLACE INTO meta VALUES (?,?)");
for (const [k, v] of Object.entries(meta)) insM.run(k, v);
db.close();

const check = new DatabaseSync(outPath);
console.log("wrote", outPath);
console.log("  players:", check.prepare("select count(*) c from players").get().c);
console.log("  team_slots:", check.prepare("select count(*) c from team_slots").get().c);
console.log("  teams:", check.prepare("select count(distinct team) c from team_slots").get().c);
console.log("  build:", meta.build_sha256.slice(0, 16), meta.build_bytes + " B");
console.log("  sample:", JSON.stringify(check.prepare("select name,pos,team,ovr from players order by ovr desc limit 3").all()));
check.close();
