#!/usr/bin/env node
// MOC — 22 Oct — dataset hash: one value that proves the player rows were not touched.
//
//   node _agents/moc/tools/dataset-hash.mjs "_agents/pickle/builds/Football-Sim-PreColors.html"
//
// Parses the build's own literals (never greps them) and prints a canonical
// sha256 per dataset. The canonicalisation is written out below so an
// independent implementation can reproduce it bit-for-bit.
//
// CANONICAL FORM — every choice is deliberate:
//   · PLAYERS rows keep their source order. Row order is data (the array is
//     ordered by OVR); sorting would make the hash blind to a reordering.
//   · each row is serialised as a compact JSON array with NO spaces:
//     strings via JSON escaping, numbers via ECMAScript Number::toString
//     (so 1 and 1.0 both serialise as "1" — one value, one spelling),
//     booleans as true/false, null as null.
//   · rows are joined with "\n" (U+000A), UTF-8 encoded, and there is
//     NO trailing newline: the object hashed is the joined rows, nothing else.
//   · TEAM_DATA is an object, so its order is not data: teams sort by name
//     (code-unit order) and slots sort by slot name, then each team is one
//     line of [team, [[slot, ovr, name], …]].
//   · the colour table, if absent, is reported absent — never hashed as "".
//
// Read-only: opens the build, writes nothing.

import fs from "node:fs";
import crypto from "node:crypto";

const buildPath = process.argv[2] || "_agents/pickle/builds/Football-Sim-PreColors.html";
const src = fs.readFileSync(buildPath, "utf8");
const sha = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");

// ---- extract a JS literal by bracket matching (quote-aware) --------------
function literal(name) {
  const at = src.indexOf(`const ${name} = `);
  if (at < 0) throw new Error(`${name} not found`);
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
    else if (c === close && --depth === 0) return src.slice(i, j + 1);
  }
  throw new Error(`unterminated ${name}`);
}

const parse = (t) => JSON.parse(t.replace(/\bundefined\b/g, "null"));

// ---- the canonical serialiser, stated explicitly ------------------------
function ser(v) {
  if (v === null) return "null";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") {
    if (!Number.isFinite(v)) throw new Error("non-finite number in data");
    return String(v);           // ECMAScript Number::toString — one spelling per value
  }
  if (Array.isArray(v)) return "[" + v.map(ser).join(",") + "]";
  throw new Error("unexpected value type: " + typeof v);
}

// ---- PLAYERS ------------------------------------------------------------
const players = parse(literal("PLAYERS"));
const badRows = players.map((r, i) => (Array.isArray(r) && r.length === 11 ? null : i)).filter((i) => i !== null);
const playersBody = players.map(ser).join("\n");

// ---- TEAM_DATA ----------------------------------------------------------
const teamData = parse(literal("TEAM_DATA"));
const teamLines = Object.keys(teamData).sort().map((team) => {
  const slots = Object.keys(teamData[team]).sort()
    .map((slot) => {
      const v = teamData[team][slot] || {};
      return `[${JSON.stringify(slot)},${ser(v.ovr ?? null)},${ser(v.name ?? null)}]`;
    });
  return `[${JSON.stringify(team)},[${slots.join(",")}]]`;
});
const teamBody = teamLines.join("\n");

// ---- the colour table: report absence honestly --------------------------
const colourTokens = ["TEAM_COLORS", "TEAM_COLOURS", "teamColors", "teamColor"];
const colourHits = Object.fromEntries(colourTokens.map((t) => [t, (src.match(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length]));

const out = {
  tool: "_agents/moc/tools/dataset-hash.mjs",
  build: buildPath,
  build_sha256: sha(fs.readFileSync(buildPath)),
  build_bytes: fs.statSync(buildPath).size,
  canonical: {
    players: "rows in source order; each row compact JSON array, no spaces; rows joined by U+000A; UTF-8; no trailing newline",
    numbers: "ECMAScript Number::toString (1 and 1.0 -> \"1\")",
    team_data: "teams sorted by name, slots sorted by name; one line per team: [team,[[slot,ovr,name],…]]; U+000A joined; no trailing newline",
  },
  players: {
    rows: players.length,
    rows_with_11_fields: players.length - badRows.length,
    rows_violating: badRows.slice(0, 10),
    canonical_bytes: Buffer.byteLength(playersBody, "utf8"),
    sha256: sha(playersBody),
    first_row: { sha256: sha(ser(players[0])), value: ser(players[0]).slice(0, 120) },
    last_row: { sha256: sha(ser(players[players.length - 1])), value: ser(players[players.length - 1]).slice(0, 120) },
  },
  team_data: {
    teams: Object.keys(teamData).length,
    slots: Object.values(teamData).reduce((n, t) => n + Object.keys(t).length, 0),
    canonical_bytes: Buffer.byteLength(teamBody, "utf8"),
    sha256: sha(teamBody),
  },
  colour_table: {
    state: colourHits.TEAM_COLORS > 0 ? "present" : "ABSENT from this build",
    occurrences: colourHits,
    note: colourHits.TEAM_COLORS === 0
      ? "no team-colour table exists in the anchor build, so there is nothing to hash; recording the absence rather than hashing an empty string"
      : null,
    sha256: colourHits.TEAM_COLORS > 0 ? sha(literal("TEAM_COLORS")) : null,
  },
};

console.log(JSON.stringify(out, null, 2));
