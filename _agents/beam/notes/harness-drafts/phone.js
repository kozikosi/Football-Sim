// phone.js — static 390px overflow lint (S-401, Beam draft v2)
// Usage: node tests/phone.js [path/to/build.html]
// Exit codes (per tests/CONTRACT.md C4): 0 pass, 1 finding, 4 usage/parse.
// Static checks: fixed inline widths > 390px that are NOT media-query breakpoints.
// Note: body{overflow-x:hidden} masks clipping, so the real check must be
// element-level (see MiniMax's cdp-phone-check.mjs for the CDP version).

const fs = require("node:fs");
const path = require("node:path");

const file =
  process.argv[2] ||
  path.join(__dirname, "..", "NFL Draft Simulator v20 Claude.html");
if (!fs.existsSync(file)) {
  console.error("FAIL phone 4: missing input file");
  process.exit(4);
}

let html;
try {
  html = fs.readFileSync(file, "utf8");
} catch (_e) {
  console.error("FAIL phone 4: unparsable input");
  process.exit(4);
}

// Responsive breakpoints — these appear in @media rules, not as element widths.
const breakpoints = new Set([
  320, 360, 375, 390, 414, 480, 600, 760, 860, 900, 1024, 1200,
]);

// Fixed inline widths: width:NNNpx
const fixedWidths = [...html.matchAll(/width:\s*(\d+)px/g)].map((m) =>
  parseInt(m[1], 10),
);
const overWideWidths = [
  ...new Set(fixedWidths.filter((w) => w > 390 && !breakpoints.has(w))),
];

// Grid templates with columns > 390px (excluding breakpoints)
const gridTemplates = [
  ...html.matchAll(/grid-template-columns:\s*([^;"]+)/g),
].map((m) => m[1]);
const wideGrids = gridTemplates.filter((g) => {
  const px = [...g.matchAll(/(\d+)px/g)].map((m) => parseInt(m[1], 10));
  return px.some((w) => w > 390 && !breakpoints.has(w));
});

// Max-width constraints that are too small for 390px (min-width > 390)
const minWidths = [...html.matchAll(/min-width:\s*(\d+)px/g)].map((m) =>
  parseInt(m[1], 10),
);
const overMinWidths = [
  ...new Set(minWidths.filter((w) => w > 390 && !breakpoints.has(w))),
];

let findings = 0;
if (overWideWidths.length) {
  console.log(
    `FINDING: ${overWideWidths.length} distinct fixed inline width(s) > 390px (not breakpoints): ${overWideWidths.join(", ")}`,
  );
  findings++;
}
if (wideGrids.length) {
  console.log(
    `FINDING: ${wideGrids.length} grid-template with column > 390px (not breakpoints)`,
  );
  findings++;
}
if (overMinWidths.length) {
  console.log(
    `FINDING: ${overMinWidths.length} min-width > 390px (not breakpoints): ${overMinWidths.join(", ")}`,
  );
  findings++;
}

// Summary
console.log(
  `INFO: scanned ${fixedWidths.length} width declarations, ${gridTemplates.length} grid templates, ${minWidths.length} min-width declarations`,
);
console.log(`INFO: excluded ${breakpoints.size} known breakpoints`);

if (findings) {
  console.log("FAIL phone 1");
  process.exit(1);
}
console.log("PASS phone");
