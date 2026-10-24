#!/usr/bin/env node
// verify-390px-fix.mjs — test the sticky hero bar fix for #startSeasonBtn at 390px.
// UK · 23 Oct 2026. Dependency-free plain Node. Reads build, applies CSS patch, verifies.
//
//   node verify-390px-fix.mjs <build.html> [--apply-css]
//
// WHY THIS EXISTS
// The #startSeasonBtn renders at ~509px from top (119px below fold at 390px).
// There are TWO "Start Season" buttons:
//  1. Initial "Play a Season" screen (renderSeasonTabInner, !seasonState) — #startSeasonBtn in .panel
//  2. Preseason setup page (renderPreseasonView) — #beginSeasonBtn and #beginSeasonBtn2 in .panel
// Ultra's Option C targeted .draftingas but #startSeasonBtn is NOT inside it.
// This tool tests the correct fix: make the initial screen's .panel have a sticky footer.

import fs from "node:fs";

const args = process.argv.slice(2);
const buildPath = args[0];
const applyCss = args.includes("--apply-css");
if (!buildPath) {
  console.error("usage: verify-390px-fix.mjs <build.html> [--apply-css]");
  process.exit(4);
}

const html = fs.readFileSync(buildPath, "utf8");

// Find the <style> block to inject CSS
const styleEnd = html.indexOf("</style>");
if (styleEnd === -1) {
  console.error("No </style> tag found in build");
  process.exit(1);
}

// The initial "Play a Season" screen: container.innerHTML = `<div class="panel">...#startSeasonBtn...</div>`
// We need to target that specific panel. Add a class to it via CSS selector.
// The panel is the direct child of the container (main content area).
// Best approach: make the button itself sticky within its panel, or add a sticky footer wrapper.
// Simplest CSS-only fix: target the panel that contains #startSeasonBtn when it's the ONLY content.

const stickyCss = `
/* UK S-UK-8: Sticky CTA for 390px fix — initial Play a Season screen */
.panel:has(#startSeasonBtn) {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.panel:has(#startSeasonBtn) > *:last-child {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--panel);
  border-top: 1px solid var(--border);
  padding: 12px 16px;
  margin-top: auto;
}

/* Preseason setup page: Begin the season buttons */
.panel:has(#beginSeasonBtn),
.panel:has(#beginSeasonBtn2) {
  position: relative;
}
.panel:has(#beginSeasonBtn) > button,
.panel:has(#beginSeasonBtn2) > button {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--panel);
  border-top: 1px solid var(--border);
  padding: 12px 16px;
  margin-top: auto;
}

@media (prefers-reduced-motion: reduce) {
  .panel:has(#startSeasonBtn) > *:last-child,
  .panel:has(#beginSeasonBtn) > button,
  .panel:has(#beginSeasonBtn2) > button {
    position: static;
    margin-top: 0;
  }
}
`;

let patched = html;
if (applyCss) {
  patched = html.slice(0, styleEnd) + stickyCss + html.slice(styleEnd);
  fs.writeFileSync(`${buildPath}.patched`, patched, "utf8");
  console.log(`CSS injected. Patched build written to ${buildPath}.patched`);
}

// Verify buttons exist
const startBtn = patched.indexOf('id="startSeasonBtn"');
const beginBtn1 = patched.indexOf('id="beginSeasonBtn"');
const beginBtn2 = patched.indexOf('id="beginSeasonBtn2"');

console.log(`Build: ${buildPath}`);
console.log(`  #startSeasonBtn found: ${startBtn !== -1 ? "YES" : "NO"}`);
console.log(`  #beginSeasonBtn found: ${beginBtn1 !== -1 ? "YES" : "NO"}`);
console.log(`  #beginSeasonBtn2 found: ${beginBtn2 !== -1 ? "YES" : "NO"}`);

// Check for sticky CSS in patched version
const hasSticky =
  patched.includes("position: sticky") && patched.includes(":has(");
console.log(`  Sticky CSS present: ${hasSticky ? "YES" : "NO"}`);

// Check for prefers-reduced-motion handling
const hasReducedMotion = patched.includes("prefers-reduced-motion");
console.log(
  `  prefers-reduced-motion handled: ${hasReducedMotion ? "YES" : "NO"}`,
);

if (!applyCss) {
  console.log("\nRun with --apply-css to generate patched build.");
  console.log(
    "Then test with: node tests/e2e-smoke.mjs <patched-build> --port 9222",
  );
}
