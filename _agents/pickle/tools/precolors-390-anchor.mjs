#!/usr/bin/env node
/**
 * precolors-390-anchor.mjs — the ONE anchor re-check asked for in Claude's step 3(a).
 *
 * Build: Pre-Colors, sha256 40233d6b…, 657,486 B (verified before the run).
 *
 * Question 1: at 390x844, does #startSeasonBtn still sit below the 844px fold
 *             (previously measured top 963, bottom 1007)?
 * Question 2: does tests/e2e-smoke.mjs's `inVp` still pass despite that — i.e. is it a
 *             horizontal-only predicate?
 *
 * The path is the harness's own path, not an invented one:
 *   openchamber-e2e-v2.spec.js STEP 3 — complete the draft (#simToEndBtn), click
 *   #resultsSeasonBtn, then #startSeasonBtn is visible; resize to 390x844, scroll to
 *   (0,0), measure. Same as checkViewportAt390(page, "preseason").
 *
 * `inVp` as written (tests/e2e-smoke.mjs:141):
 *   const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0) : false;
 * It never compares against viewport height, so a button below the fold passes.
 *
 * Usage: node _agents/pickle/tools/precolors-390-anchor.mjs [path-to-build]
 * Read-only: opens the file in headless Chromium, reads rects, exits.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const BUILD = resolve(
  process.argv[2] || "_agents/pickle/builds/Football-Sim-PreColors.html",
);
const W = 390;
const H = 844;
const DRAFT_TIMEOUT = 120000;

// the exact predicate from tests/e2e-smoke.mjs:141
const inVp = (r, vw) =>
  r ? r.left >= -1 && r.right <= vw + 1 && r.width > 0 : false;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));

const t0 = Date.now();
await page.goto(pathToFileURL(BUILD).href, { waitUntil: "load" });

// STEP 1 — start and complete the draft, exactly as the harness does.
await page.waitForSelector("#startDraftBtn", { timeout: 15000 });
await page.click("#startDraftBtn");
await page.waitForSelector("#simToEndBtn", { timeout: 15000 });
await page.click("#simToEndBtn");
await page.waitForFunction(
  () => typeof draftSim !== "undefined" && draftSim && draftSim.pos >= 32 * 26,
  null,
  { timeout: DRAFT_TIMEOUT },
);
const draftPos = await page.evaluate(() => draftSim.pos);

// STEP 2 — the season landing.
await page.waitForSelector("#resultsSeasonBtn", { timeout: 15000 });
await page.click("#resultsSeasonBtn");
await page.waitForSelector("#startSeasonBtn", {
  state: "attached",
  timeout: 15000,
});
const draftSeconds = ((Date.now() - t0) / 1000).toFixed(1);

// STEP 3 — the 390px measurement, at scroll (0,0), as checkViewportAt390 does.
await page.setViewportSize({ width: W, height: H });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

const m = await page.evaluate((vw) => {
  const btn = document.getElementById("startSeasonBtn");
  const r = btn.getBoundingClientRect();
  const cs = getComputedStyle(btn);
  return {
    rect: {
      top: r.top,
      bottom: r.bottom,
      left: r.left,
      right: r.right,
      width: r.width,
      height: r.height,
    },
    visibility: {
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
    },
    docScrollWidth: document.documentElement.scrollWidth,
    docClientWidth: document.documentElement.clientWidth,
    bodyScrollHeight: document.body.scrollHeight,
    scrollY: window.scrollY,
    vw,
  };
}, W);

const r = m.rect;
const belowFold = r.top > H;
const passesInVp = inVp(r, W);

console.log(`build: ${BUILD}`);
console.log(
  `draftSim.pos after sim-to-end: ${draftPos} (expected 832), ${draftSeconds}s`,
);
console.log(`viewport: ${W}x${H}, scrollY=${m.scrollY}`);
console.log(
  `#startSeasonBtn bounds: left ${r.left.toFixed(0)}, right ${r.right.toFixed(0)}, top ${r.top.toFixed(0)}, bottom ${r.bottom.toFixed(0)} (w ${r.width.toFixed(0)}, h ${r.height.toFixed(0)})`,
);
console.log(
  `visible: display=${m.visibility.display} visibility=${m.visibility.visibility} opacity=${m.visibility.opacity}`,
);
console.log(
  `horizontal overflow: ${m.docScrollWidth - m.docClientWidth}px (scrollWidth ${m.docScrollWidth}, clientWidth ${m.docClientWidth}); page height ${m.bodyScrollHeight}px`,
);
console.log("");
console.log(
  `Q1 below the ${H}px fold: ${belowFold ? `YES — top ${r.top.toFixed(0)} > ${H} (${(r.top - H).toFixed(0)}px below)` : `NO — top ${r.top.toFixed(0)} <= ${H}`}`,
);
console.log(
  `Q2 inVp passes despite it: ${passesInVp ? "YES — it is horizontal-only" : "NO"} (left>=-1 && right<=vw+1 && width>0; no vertical term)`,
);
console.log(`page errors: ${errors.length ? errors.join(" | ") : "none"}`);

await browser.close();
