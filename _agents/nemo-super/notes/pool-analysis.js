const fs = require("node:fs");
const content = fs.readFileSync(
  "/Users/kosi/Desktop/Football Sim/NFL Draft Simulator merged.html",
  "utf8",
);

// Count PLAYERS records
const playersMatch = content.match(
  /const PLAYERS = \[(.*?)\];\nconst TEAM_DATA/,
);
const playersStr = playersMatch[1];
const playerPattern = /\["([^"]+)","([A-Z]{2,4})","([^"]+)",(\d+)/g;
const players = [];
let m;
while ((m = playerPattern.exec(playersStr)) !== null) {
  players.push({ name: m[1], pos: m[2], team: m[3], ovr: parseInt(m[4], 10) });
}
console.log(`Total PLAYERS records: ${players.length}`);

// Count by position
var byPos = {};
for (var i = 0; i < players.length; i++) {
  byPos[players[i].pos] = (byPos[players[i].pos] || 0) + 1;
}
console.log("\nPlayers by position:");
var posList = [];
for (var p in byPos) posList.push({ pos: p, count: byPos[p] });
posList.sort((a, b) => b.count - a.count);
for (var i = 0; i < posList.length; i++) {
  console.log(`  ${posList[i].pos}: ${posList[i].count}`);
}

// Count teams
var teams = new Set();
for (var i = 0; i < players.length; i++) teams.add(players[i].team);
console.log(`\nTotal teams in PLAYERS data: ${teams.size}`);

// ROSTER_SLOTS
const rosterMatch = content.match(/const ROSTER_SLOTS = \[([^\]]*)\]/);
var slots = rosterMatch[1].split(",").map((s) => s.replace(/['"]/g, "").trim());
console.log(`\nROSTER_SLOTS count: ${slots.length}`);
console.log(`Slots: ${slots.join(", ")}`);

// Count starters per position
var slotPosCount = {};
for (var i = 0; i < slots.length; i++) {
  slotPosCount[slots[i]] = (slotPosCount[slots[i]] || 0) + 1;
}
console.log("\nStarters per slot type:");
for (var s in slotPosCount) console.log(`  ${s}: ${slotPosCount[s]} per team`);

// Map roster slots to player positions
var slotToPlayerPos = {
  QB: "QB",
  RB1: "HB",
  RB2: "HB",
  WR1: "WR",
  WR2: "WR",
  WR3: "WR",
  TE1: "TE",
  TE2: "TE",
  OT1: "LT",
  OT2: "RT",
  OG1: "LG",
  OG2: "RG",
  C: "C",
  DE1: "LEDG",
  DE2: "REDG",
  DT1: "DT",
  DT2: "DT",
  MIKE: "MIKE",
  WILL: "WILL",
  SAM: "SAM",
  CB1: "CB",
  CB2: "CB",
  CB3: "CB",
  SS: "SS",
  FS: "FS",
  K: "K",
};

console.log("\n=== MINIMUM POOL NEEDED (32 teams x slots per position) ===");
var totalNeeded = 0;
var results = [];
for (var s in slotPosCount) {
  var perTeam = slotPosCount[s];
  var playerPos = slotToPlayerPos[s];
  var needed = perTeam * 32;
  var available = byPos[playerPos] || 0;
  var surplus = available - needed;
  totalNeeded += needed;
  results.push({
    slot: s,
    playerPos: playerPos,
    perTeam: perTeam,
    needed: needed,
    available: available,
    surplus: surplus,
  });
}
results.sort((a, b) => b.needed - b.available - (a.needed - a.available));
for (var i = 0; i < results.length; i++) {
  var r = results[i];
  var sign = r.surplus >= 0 ? "+" : "";
  console.log(
    r.slot +
      " -> " +
      r.playerPos +
      ": need " +
      r.needed +
      " (" +
      r.perTeam +
      "x32), have " +
      r.available +
      ", " +
      sign +
      r.surplus,
  );
}
console.log(`\nTotal starters drafted: ${totalNeeded}`);
console.log(`Total players in pool: ${players.length}`);
console.log(`Surplus players (total): ${players.length - totalNeeded}`);

console.log("\n--- POSITIONS WHERE POOL < NEEDED (SCARCE/BIND) ---");
var anyShort = false;
for (var i = 0; i < results.length; i++) {
  var r = results[i];
  if (r.available < r.needed) {
    console.log(
      r.slot +
        " -> " +
        r.playerPos +
        ": need " +
        r.needed +
        ", have " +
        r.available +
        ", SHORT by " +
        (r.needed - r.available),
    );
    anyShort = true;
  }
}
if (!anyShort) console.log("All positions have enough players.");

console.log("\n--- POSITIONS WITH SURPLUS ---");
var anySurplus = false;
for (var i = results.length - 1; i >= 0; i--) {
  var r = results[i];
  if (r.surplus > 0) {
    console.log(
      r.slot +
        " -> " +
        r.playerPos +
        ": need " +
        r.needed +
        ", have " +
        r.available +
        ", SURPLUS " +
        r.surplus,
    );
    anySurplus = true;
  }
}
if (!anySurplus) console.log("No positions have surplus.");

// Check TEAM_DATA for C and K (not in PLAYERS pool)
const tdMatch = content.match(/const TEAM_DATA = (\{[\\s\\S]*?});/);
if (tdMatch) {
  var tdStr = tdMatch[1];
  var cMatches = tdStr.match(/"C":\{[^}]*"name":"([^"]+)"/g);
  var kMatches = tdStr.match(/"K":\{[^}]*"name":"([^"]+)"/g);
  console.log("\n--- TEAM_DATA pre-assigned slots (not in PLAYERS pool) ---");
  console.log(
    `C (center) players in TEAM_DATA: ${cMatches ? cMatches.length : 0}`,
  );
  console.log(
    `K (kicker) players in TEAM_DATA: ${kMatches ? kMatches.length : 0}`,
  );
}
