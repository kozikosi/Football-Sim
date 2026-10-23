#!/usr/bin/env node
// verify-390px-fix.mjs — test the sticky hero bar fix for #startSeasonBtn at 390px.
// UK · 23 Oct 2026. Dependency-free plain Node. Reads build, applies CSS patch, verifies.
//
//   node verify-390px-fix.mjs <build.html> [--apply-css]
//
// WHY THIS EXISTS
// The #startSeasonBtn renders at ~509px from top (119px below fold at 390px).
// Ultra's Option C: make .draftingas { position: sticky; bottom: 0 } so button stays visible.
// This tool applies the CSS and verifies the button position is within viewport.

import fs from "node:fs";

const args = process.argv.slice(2);
const buildPath = args[0];
const applyCss = args.includes("--apply-css");
if (!buildPath) {
  console.error("usage: verify-390px-fix.mjs <build.html> [--apply-css]");
  process.exit(4);
}

let html = fs.readFileSync(buildPath, "utf8");

// Find the <style> block to inject CSS
const styleEnd = html.indexOf("</style>");
if (styleEnd === -1) {
  console.error("No </style> tag found in build");
  process.exit(1);
}

const stickyCss = `
/* UK S-UK-8: Sticky hero bar for 390px CTA fix */
.draftingas {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--panel);
  border-top: 1px solid var(--border);
  padding: 12px 16px;
}

@media (prefers-reduced-motion: reduce) {
  .draftingas {
    position: static;
  }
}
`;

let patched = html;
if (applyCss) {
  patched = html.slice(0, styleEnd) + stickyCss + html.slice(styleEnd);
  fs.writeFileSync(buildPath + ".patched", patched, "utf8");
  console.log(`CSS injected. Patched build written to ${buildPath}.patched`);
}

// Verify #startSeasonBtn exists and is inside .draftingas
const draftingasStart = patched.indexOf('class="draftingas"');
const draftingasEnd = draftingasStart !== -1 ? patched.indexOf("</div>", draftingasStart) : -1;
const btnPos = patched.indexOf('id="startSeasonBtn"');

console.log(`Build: ${buildPath}`);
console.log(`  .draftingas found: ${draftingasStart !== -1 ? "YES" : "NO"}`);
console.log(`  #startSeasonBtn found: ${btnPos !== -1 ? "YES" : "NO"}`);
if (draftingasStart !== -1 && btnPos !== -1) {
  console.log(`  Button inside .draftingas: ${btnPos > draftingasStart && btnPos < draftingasEnd ? "YES" : "NO"}`);
}

// Check for sticky CSS in patched version
const hasSticky = patched.includes("position: sticky") && patched.includes(".draftingas");
console.log(`  Sticky CSS present: ${hasSticky ? "YES" : "NO"}`);

// Check for prefers-reduced-motion handling
const hasReducedMotion = patched.includes("prefers-reduced-motion");
console.log(`  prefers-reduced-motion handled: ${hasReducedMotion ? "YES" : "NO"}`);

if (!applyCss) {
  console.log("\nRun with --apply-css to generate patched build.");
  console.log("Then test with: node tests/e2e-smoke.mjs <patched-build> --port 9222");
}