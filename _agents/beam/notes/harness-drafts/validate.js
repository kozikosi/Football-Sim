// validate.js — 2025 wins validation (S-502, Beam draft)
// Usage: node tests/validate.js [path/to/build.html]
// Exit codes (per tests/CONTRACT.md C4): 0 pass, 1 finding, 2 data-integrity, 3 extraction, 4 usage.
// Compares sim-projected wins vs real 2025 NFL wins (r, rho, RMSE).
// Targets: r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6 (per tests/CONTRACT.md C8.2).
// Requires tests/2025_standings.js and DOM-free entry points.

const fs = require("node:fs");
const path = require("node:path");

const file =
  process.argv[2] ||
  path.join(__dirname, "..", "NFL Draft Simulator v20 Claude.html");
if (!fs.existsSync(file)) {
  console.error("FAIL validate 4: missing input file");
  process.exit(4);
}

// Check for standings data
const standingsPath = path.join(__dirname, "2025_standings.js");
if (!fs.existsSync(standingsPath)) {
  console.error(
    "FAIL validate 2: missing tests/2025_standings.js (data-integrity)",
  );
  process.exit(2);
}

// Check SIM-CORE markers
const html = fs.readFileSync(file, "utf8");
if (
  !html.includes("/*SIM-CORE-START*/") ||
  !html.includes("/*SIM-CORE-END*/")
) {
  console.error(
    "FAIL validate 3: SIM-CORE markers not found (extraction failure)",
  );
  process.exit(3);
}

// Placeholder: actual validation requires DOM-free entry points
console.log("INFO: SIM-CORE markers found");
console.log("INFO: DOM-free entry points not yet present");
console.log("FAIL validate 3: entry points missing (extraction failure)");
process.exit(3);
