const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ARTIFACT_PATH = '/Users/kosi/Desktop/Football Sim/NFL Draft Simulator merged.html';
const ARTIFACT_URL = 'file://' + ARTIFACT_PATH.replace(/ /g, '%20');
const EXPECTED_SHA256 = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';

const SCREENSHOT_DIR = '/Users/kosi/Desktop/Football Sim/test-results/e2e-' + Date.now();
const TRACE_DIR = SCREENSHOT_DIR + '/trace';
const responsiveClauses = [];
const PRIMARY_ACTIONS = {
  'initial-load': '#startDraftBtn',
  'live-draft': '#simToEndBtn',
  'draft-results': '#resultsSeasonBtn',
  'preseason': '#startSeasonBtn',
  'preseason-setup': '#beginSeasonBtn',
  'season-started': '#simSeasonBtn',
  'week-1': '#simSeasonBtn',
  'regular-season-review': '#simPlayoffsBtn',
  'playoffs-champion': '#sim100Btn',
  '100-season-report': '#back100Btn',
  'after-report-back': '#sim100Btn',
  'final': '#sim100Btn'
};

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
fs.mkdirSync(TRACE_DIR, { recursive: true });

function calculateSHA256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function getViewportChecks(page, checkpoint, primarySelector) {
  return page.evaluate((primarySelector) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const pageOverflowPx = Math.max(0, Math.max(docWidth, bodyWidth) - vw);

    const selectorFor = (el) => {
      if (!el || el.nodeType !== 1) return null;
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      if (el.classList && el.classList.length) s += '.' + [...el.classList].join('.');
      return s;
    };
    const isVisible = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const bounds = (el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const fullyInside = (el) => {
      const r = el.getBoundingClientRect();
      return r.left >= -1 && r.right <= vw + 1 && r.top >= -1 && r.bottom <= vh + 1;
    };
    const centerUncovered = (el) => {
      const r = el.getBoundingClientRect();
      const x = Math.min(vw - 1, Math.max(0, r.left + r.width / 2));
      const y = Math.min(vh - 1, Math.max(0, r.top + r.height / 2));
      const hit = document.elementFromPoint(x, y);
      return !!hit && (hit === el || el.contains(hit) || hit.contains(el));
    };
    const pick = (selectors) => {
      for (const sel of selectors) {
        for (const el of document.querySelectorAll(sel)) {
          if (isVisible(el)) return el;
        }
      }
      return null;
    };
    const describe = (el) => el ? {
      selector: selectorFor(el),
      text: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      bounds: bounds(el),
      fullyInside: fullyInside(el),
      centerUncovered: centerUncovered(el),
      visible: isVisible(el)
    } : null;

    const headingEl = pick(['h1', 'h2', 'h3']);
    // A visible phase heading or the Season results sub-tab is the in-viewport
    // navigation/phase indicator. The footer nav is deliberately not used: it
    // sits thousands of pixels below the fold at 390px.
    const navEl = pick(['#resultsSeasonBtn', '.tabs', '#seasonPhase', '.phase', 'h2', 'h3', 'nav']);
    const primaryActionEl = pick([
      ...(primarySelector ? [primarySelector] : []),
      '#startDraftBtn', '#simToEndBtn', '#startSeasonBtn', '#beginSeasonBtn',
      '#simSeasonBtn', '#simPlayoffsBtn', '#sim100Btn', '#back100Btn',
      '#resultsSeasonBtn', '#backToSeasonBtn', 'button', '[role="button"]'
    ]);
    const heading = describe(headingEl);
    const nav = describe(navEl);
    const primaryAction = describe(primaryActionEl);

    // Check that wide tables live in a horizontal scroller that actually moves.
    const tableFailures = [];
    let tableScrollerCount = 0;
    for (const table of [...document.querySelectorAll('table')].filter(isVisible)) {
      const r = table.getBoundingClientRect();
      if (table.scrollWidth <= vw + 1 && r.width <= vw + 1) continue;
      let parent = table.parentElement;
      let scroller = null;
      while (parent && parent !== document.body) {
        const cs = getComputedStyle(parent);
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') { scroller = parent; break; }
        parent = parent.parentElement;
      }
      const label = selectorFor(table);
      if (!scroller) {
        tableFailures.push(`${label}: wide table has no horizontal scroll container`);
        continue;
      }
      tableScrollerCount++;
      const before = scroller.scrollLeft;
      const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      if (max <= 0) {
        tableFailures.push(`${selectorFor(scroller)}: table container is not horizontally scrollable`);
        continue;
      }
      scroller.scrollLeft = Math.min(8, max);
      const after = scroller.scrollLeft;
      scroller.scrollLeft = before;
      if (after === before) tableFailures.push(`${selectorFor(scroller)}: scrollLeft did not move`);
    }

    const overflowElements = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 1) {
        let parent = el.parentElement;
        let scroller = null;
        while (parent && parent !== document.body) {
          const cs = getComputedStyle(parent);
          if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') { scroller = selectorFor(parent); break; }
          parent = parent.parentElement;
        }
        overflowElements.push({
          selector: selectorFor(el),
          bounds: bounds(el),
          nearestScrollContainer: scroller,
          intentional: !!scroller
        });
      }
    }

    // Horizontal clipping of interactive controls is a failure; vertical
    // below-the-fold placement is normal page scrolling and is not counted.
    const interactiveFailures = [];
    for (const el of [...document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="tab"]')].filter(isVisible)) {
      const r = el.getBoundingClientRect();
      const horizontalOffscreen = r.right > vw + 1 || r.left < -1;
      const centerX = Math.min(vw - 1, Math.max(0, r.left + r.width / 2));
      const centerY = Math.min(vh - 1, Math.max(0, r.top + r.height / 2));
      const centerInViewport = r.left + r.width / 2 >= 0 && r.left + r.width / 2 <= vw &&
                               r.top + r.height / 2 >= 0 && r.top + r.height / 2 <= vh;
      const hit = centerInViewport ? document.elementFromPoint(centerX, centerY) : null;
      const covered = !!(hit && !(hit === el || el.contains(hit) || hit.contains(el)));
      if (!horizontalOffscreen && !covered) continue;
      let parent = el.parentElement;
      let inScroller = false;
      while (parent && parent !== document.body) {
        const cs = getComputedStyle(parent);
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') { inScroller = true; break; }
        parent = parent.parentElement;
      }
      if (!horizontalOffscreen && !inScroller) {
        interactiveFailures.push({ selector: selectorFor(el), text: (el.innerText || el.value || '').slice(0, 60), bounds: bounds(el), reason: 'covered' });
      }
      if (horizontalOffscreen && !inScroller) {
        interactiveFailures.push({ selector: selectorFor(el), text: (el.innerText || el.value || '').slice(0, 60), bounds: bounds(el), reason: 'horizontal-offscreen' });
      }
    }

    const clauses = {
      heading,
      nav,
      primaryAction,
      tableScrollerCount,
      tableFailures,
      interactiveFailures,
      pass: !!(heading && heading.fullyInside && heading.centerUncovered &&
               nav && nav.fullyInside && nav.centerUncovered &&
               primaryAction && primaryAction.fullyInside && primaryAction.centerUncovered &&
               tableFailures.length === 0 && interactiveFailures.length === 0)
    };

    return {
      documentScrollWidth: docWidth,
      bodyScrollWidth: bodyWidth,
      pageOverflowPx,
      overflowElements,
      clauses
    };
  }, primarySelector);
}

async function captureLightDark(page, checkpoint, screenshotName) {
  const screenshots = [];
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  // Explicit light scheme first; the app declares `color-scheme: light dark`,
  // so relying on the host default would mislabel the screenshot.
  try {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(200);
    const lightPath = path.join(SCREENSHOT_DIR, `${screenshotName}-light.png`);
    await page.screenshot({ path: lightPath, fullPage: true });
    screenshots.push({ scheme: 'light', path: lightPath });
    result.screenshots.push(lightPath);
  } catch (e) {
    result.notes.push(`Light scheme capture unavailable at ${checkpoint}: ${e.message}`);
  }

  try {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(200);
    const darkPath = path.join(SCREENSHOT_DIR, `${screenshotName}-dark.png`);
    await page.screenshot({ path: darkPath, fullPage: true });
    screenshots.push({ scheme: 'dark', path: darkPath });
    result.screenshots.push(darkPath);
    await page.emulateMedia({ colorScheme: null });
  } catch (e) {
    result.notes.push(`Dark scheme capture unavailable at ${checkpoint}: ${e.message}`);
  }

  return screenshots;
}

const result = {
  schemaVersion: 1,
  suite: 'OPENCHAMBER-E2E-NFL-1',
  runAtUtc: new Date().toISOString(),
  status: 'RUNNING',
  runner: {
    name: 'Playwright',
    version: '1.64.1',
    browser: 'chromium',
    browserVersion: ''
  },
  gitRef: 'merge/v20-donor',
  gitCommit: '',
  artifactPath: ARTIFACT_PATH,
  artifactSha256: '',
  steps: [],
  consoleErrors: [],
  pageErrors: [],
  viewportChecks: [],
  screenshots: [],
  trace: null,
  skippedChecks: [],
  notes: [],
  seasonMetrics: {}
};

async function recordStep(page, stepId, fn, statusIfError = 'FAIL') {
  const startedAt = new Date().toISOString();
  const startTime = Date.now();
  let status = 'PASS';
  let details = '';
  try {
    details = await fn(page);
  } catch (e) {
    status = statusIfError;
    details = e.message;
  }
  const durationMs = Date.now() - startTime;
  result.steps.push({ id: stepId, status, startedAtUtc: startedAt, durationMs, details });
  return { status, details };
}

async function checkViewportAt390(page, checkpoint) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const vp = await getViewportChecks(page, checkpoint, PRIMARY_ACTIONS[checkpoint] || null);
  const { clauses, ...record } = vp;
  const screenshotPath = path.join(SCREENSHOT_DIR, `viewport-${checkpoint}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  record.screenshot = screenshotPath;
  record.checkpoint = checkpoint;
  record.width = 390;
  record.height = 844;
  result.viewportChecks.push(record);
  result.screenshots.push(screenshotPath);
  result.notes.push(`390px ${checkpoint}: ${JSON.stringify(clauses)}`);
  responsiveClauses.push({ checkpoint, clauses });
  return record;
}

async function checkViewportDesktop(page, checkpoint) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const vp = await getViewportChecks(page, checkpoint, PRIMARY_ACTIONS[checkpoint] || null);
  const { clauses, ...record } = vp;
  const screenshotPath = path.join(SCREENSHOT_DIR, `viewport-${checkpoint}-desktop.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  record.screenshot = screenshotPath;
  record.checkpoint = checkpoint + '-desktop';
  record.width = 1280;
  record.height = 900;
  result.viewportChecks.push(record);
  result.screenshots.push(screenshotPath);
  return record;
}

async function writeResult() {
  const resultPath = path.join(SCREENSHOT_DIR, 'result.json');
  fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
  console.log(`Result written to ${resultPath}`);
}

test.describe.configure({ retries: 0, timeout: 1800000 });

test('OpenChamber E2E Suite - Full Flow (V20 donor build)', async ({ page, browser }) => {
  const browserVersion = await browser.version();
  result.runner.browserVersion = browserVersion;

  // Get git commit
  const { execSync } = require('child_process');
  try {
    result.gitCommit = execSync('git rev-parse HEAD', { cwd: '/Users/kosi/Desktop/Football Sim', encoding: 'utf8' }).trim();
  } catch (e) {
    result.gitCommit = 'unknown';
  }

  // Verify artifact hash
  const actualSha256 = calculateSHA256(ARTIFACT_PATH);
  result.artifactSha256 = actualSha256;
  if (actualSha256 !== EXPECTED_SHA256) {
    result.status = 'BLOCKED';
    result.notes.push(`Artifact hash mismatch: expected ${EXPECTED_SHA256}, got ${actualSha256}`);
    await writeResult();
    throw new Error(`Artifact hash mismatch: expected ${EXPECTED_SHA256}, got ${actualSha256}`);
  }
  result.notes.push(`Artifact hash verified: ${actualSha256}`);

  // Setup error collection
  page.on('console', msg => {
    if (msg.type() === 'error') {
      result.consoleErrors.push({ message: msg.text(), stepId: result.steps.length ? result.steps[result.steps.length - 1].id : 'init', location: msg.location()?.url });
    }
  });
  page.on('pageerror', error => {
    result.pageErrors.push({ message: error.message, stepId: result.steps.length ? result.steps[result.steps.length - 1].id : 'init', stack: error.stack });
  });

  // Start tracing
  await page.context().tracing.start({ screenshots: true, snapshots: true, sources: true });

  // === STEP 1: Initial Load ===
  await recordStep(page, 'initial-load', async (page) => {
    await page.goto(ARTIFACT_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const title = await page.title();
    if (!title.includes('NFL Draft Simulator')) {
      throw new Error(`Title mismatch: ${title}`);
    }

    const heading = await page.locator('h1').first().textContent();
    if (!heading?.includes('NFL Draft Simulator')) {
      throw new Error(`Heading mismatch: ${heading}`);
    }

    await expect(page.locator('#startDraftBtn')).toBeVisible();
    await expect(page.locator('#startDraftBtn')).toBeEnabled();

    await checkViewportDesktop(page, 'initial-load');
    await captureLightDark(page, 'initial-load', 'startup');
    await checkViewportAt390(page, 'initial-load');

    return `Title: ${title}; Heading: ${heading}`;
  });

  // === STEP 2: Draft ===
  await recordStep(page, 'start-draft', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.click('#startDraftBtn');
    await expect(page.locator('#draftLive')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    await checkViewportDesktop(page, 'live-draft');
    await checkViewportAt390(page, 'live-draft');

    return 'Draft started, live view visible';
  });

  await recordStep(page, 'select-instant-speed', async (page) => {
    const instantBtn = page.locator('#speedInstantBtn');
    if (await instantBtn.isVisible({ timeout: 2000 })) {
      await instantBtn.click();
      return 'Instant speed selected';
    }
    return 'Instant speed button not found (may already be selected)';
  });

  await recordStep(page, 'sim-to-end', async (page) => {
    await page.click('#simToEndBtn');
    await expect(page.locator('#draftFinalResults')).toBeVisible({ timeout: 60000 });
    await page.waitForTimeout(1000);

    await checkViewportDesktop(page, 'draft-results');
    await captureLightDark(page, 'draft-results', 'draft-results');
    await checkViewportAt390(page, 'draft-results');

    const hasDraftComplete = await page.locator('#draftFinalResults').textContent().then(t => 
      t?.includes('Draft Complete') || t?.includes('draft complete') || t?.includes('Draft complete') || false
    );
    if (!hasDraftComplete) {
      const text = await page.locator('#draftFinalResults').textContent();
      throw new Error(`Draft Complete not found in results: ${text?.substring(0, 200)}`);
    }

    // The app's state is a top-level lexical binding, not window.draftSim.
    let draftPos = null;
    try {
      draftPos = await page.evaluate(() => {
        try {
          return (typeof draftSim === 'object' && draftSim) ? draftSim.pos : null;
        } catch (e) {
          return null;
        }
      });
    } catch (e) {
      draftPos = null;
    }
    result.seasonMetrics.draftPicks = draftPos;
    if (draftPos !== 832) {
      result.notes.push(`Draft pick count: expected 832, got ${draftPos ?? 'unavailable'}`);
      throw new Error(`Draft pick count: expected 832, got ${draftPos ?? 'unavailable'}`);
    }

    return `Draft complete confirmed; draftSim.pos=${draftPos}`;
  });

  // === STEP 3: Season ===
  await recordStep(page, 'click-results-season', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.click('#resultsSeasonBtn');
    await expect(page.locator('#startSeasonBtn')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    await checkViewportDesktop(page, 'preseason');
    await checkViewportAt390(page, 'preseason');

    return 'Season landing visible, startSeasonBtn present';
  });

  await recordStep(page, 'start-season', async (page) => {
    await page.click('#startSeasonBtn');
    await expect(page.locator('#beginSeasonBtn')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    await checkViewportDesktop(page, 'preseason-setup');
    await checkViewportAt390(page, 'preseason-setup');

    return 'Preseason setup visible, beginSeasonBtn present';
  });

  await recordStep(page, 'begin-season', async (page) => {
    await page.click('#beginSeasonBtn');
    await expect(page.locator('#simSeasonBtn')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    await checkViewportDesktop(page, 'season-started');
    await checkViewportAt390(page, 'season-started');
    return 'Season started, simSeasonBtn visible';
  });

  await recordStep(page, 'week-1-display', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(300);
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!/\bWeek\s+1\s+of\s+17\b/i.test(bodyText)) {
      throw new Error('Week 1 of 17 not found after Begin Season');
    }

    await checkViewportDesktop(page, 'week-1');
    await checkViewportAt390(page, 'week-1');
    return 'Week 1 of 17 visible';
  });

  await recordStep(page, 'sim-season', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.click('#simSeasonBtn');
    // Wait for regular season review - V20 donor has "Continue to Regular Season Review" button
    // or simPlayoffsBtn becoming visible
    await expect(page.locator('#simPlayoffsBtn, button:has-text("Regular Season Review")')).toBeVisible({ timeout: 240000 });
    await page.waitForTimeout(2000);

    await checkViewportDesktop(page, 'regular-season-review');
    await checkViewportAt390(page, 'regular-season-review');

    // Read the top-level lexical seasonState, not window.seasonState.
    let gamesPlayed = null;
    let seasonPhase = null;
    try {
      const seasonProbe = await page.evaluate(() => {
        try {
          if (typeof seasonState !== 'object' || !seasonState) return null;
          return {
            phase: seasonState.phase ?? null,
            week: seasonState.week ?? null,
            scheduleLength: Array.isArray(seasonState.schedule) ? seasonState.schedule.length : null
          };
        } catch (e) {
          return null;
        }
      });
      gamesPlayed = seasonProbe?.scheduleLength ?? null;
      seasonPhase = seasonProbe?.phase ?? null;
    } catch (e) {
      gamesPlayed = null;
    }
    result.seasonMetrics.regularSeasonGamesPlayed = gamesPlayed;
    result.notes.push(`regular-season schedule length: ${gamesPlayed ?? 'unavailable'} (method: seasonState.schedule.length); phase: ${seasonPhase ?? 'unavailable'}`);
    if (gamesPlayed !== 272) {
      throw new Error(`Expected 272 regular-season games in seasonState.schedule, got ${gamesPlayed ?? 'unavailable'}`);
    }

    return `Regular season complete; games: ${gamesPlayed}; phase: ${seasonPhase ?? 'unavailable'}`;
  });

  // === STEP 4: Playoffs and Super Bowl ===
  await recordStep(page, 'sim-playoffs', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.click('#simPlayoffsBtn');
    await page.waitForTimeout(2000);

    // Wait for final season view / champion - V20 donor has .champion-banner
    await expect(page.locator('.champion-banner.fxwon, .champion-banner, #finalSeason, #championDisplay, #superBowlResult').first()).toBeVisible({ timeout: 180000 });
    await page.waitForTimeout(1000);

    await checkViewportDesktop(page, 'playoffs-champion');
    await checkViewportAt390(page, 'playoffs-champion');

    const championVisible = await page.locator('.champion-banner.fxwon, .champion-banner, #finalSeason, #championDisplay, #superBowlResult').first().isVisible();
    result.seasonMetrics.championVisible = championVisible;

    // Try to get playoff rounds from the lexical season state.
    let playoffRounds = null;
    try {
      playoffRounds = await page.evaluate(() => {
        try {
          if (typeof seasonState !== 'object' || !seasonState) return null;
          return seasonState.playoffRoundsCompleted ?? seasonState.playoffRound ?? null;
        } catch (e) {
          return null;
        }
      });
    } catch (e) {
      playoffRounds = null;
    }
    result.seasonMetrics.playoffRoundsCompleted = playoffRounds;
    if (!championVisible) throw new Error('Champion/Super Bowl result not visible');
    result.notes.push(`playoff rounds: ${playoffRounds ?? 'unavailable'} (method: seasonState.playoffRoundsCompleted/playoffRound)`);

    return `Playoffs/Super Bowl complete; champion visible: ${championVisible}; rounds: ${playoffRounds ?? 'unavailable'}`;
  });

  // === STEP 5: 100-season report (included in this run) ===
  const reportResult = await recordStep(page, 'sim-100-seasons', async (page) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const btn100 = page.locator('#sim100Btn');
    if (!(await btn100.isVisible({ timeout: 5000 }))) {
      throw new Error('sim100Btn not visible');
    }
    await btn100.click();

    // Wait up to 180 seconds for report
    await expect(page.locator('#reportView, #reportContainer, #sim100Report, details:has-text("What actually drove winning"), summary:has-text("What actually drove winning")').first()).toBeVisible({ timeout: 180000 });
    await page.waitForTimeout(2000);

    await checkViewportDesktop(page, '100-season-report');
    await captureLightDark(page, '100-season-report', '100-season-report');
    await checkViewportAt390(page, '100-season-report');

    const reportRendered = await page.locator('#reportView, #reportContainer, #sim100Report, details:has-text("What actually drove winning"), summary:has-text("What actually drove winning")').first().isVisible();
    result.seasonMetrics.reportRendered = reportRendered;

    const hasDrivenWinning = await page.locator('details:has-text("What actually drove winning"), summary:has-text("What actually drove winning")').count() > 0;
    if (!reportRendered || !hasDrivenWinning) {
      throw new Error(`100-season report incomplete; rendered=${reportRendered}; driven-winning=${hasDrivenWinning}`);
    }

    return `100-season report rendered; driven-winning section: ${hasDrivenWinning}; duration measured by step`;
  });

  // Fill measured step duration only after recordStep has finished.
  const reportStep = result.steps.find(s => s.id === 'sim-100-seasons');
  result.seasonMetrics.reportDurationMs = reportStep?.durationMs ?? null;

  if (reportResult.status === 'SKIP') {
    result.skippedChecks.push('100-season simulation (budget/time)');
    result.status = 'PARTIAL';
  }

  // Return from the report through its visible back control.
  if (reportResult.status === 'PASS') {
    await recordStep(page, 'report-back', async (page) => {
      const back = page.locator('#back100Btn');
      if (!(await back.isVisible({ timeout: 5000 }))) {
        throw new Error('#back100Btn not visible');
      }
      await back.click();
      await expect(page.locator('#sim100Btn')).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(500);

      await checkViewportDesktop(page, 'after-report-back');
      await checkViewportAt390(page, 'after-report-back');
      return 'Returned to season view via #back100Btn';
    });
  }

  // Final viewport checks
  await checkViewportAt390(page, 'final');
  await checkViewportDesktop(page, 'final');

  // The protocol requires every 390x844 checkpoint to have a visible heading,
  // navigation/phase indicator, and primary action, plus usable table scrollers.
  await recordStep(page, 'responsive-390-audit', async () => {
    const failed = responsiveClauses.filter(x => !x.clauses.pass);
    if (failed.length) {
      const detail = failed.map(x => {
        const c = x.clauses;
        return `${x.checkpoint}: heading=${!!(c.heading && c.heading.fullyInside)} nav=${!!(c.nav && c.nav.fullyInside)} action=${!!(c.primaryAction && c.primaryAction.fullyInside)} tableFailures=${c.tableFailures.length} interactiveFailures=${c.interactiveFailures.length}`;
      }).join('; ');
      throw new Error(`390x844 checkpoints not fully usable: ${detail}`);
    }
    return `${responsiveClauses.length} 390x844 checkpoints passed visibility/clipping/scroller audit`;
  });

  // Stop tracing
  const tracePath = path.join(TRACE_DIR, `trace-${Date.now()}.zip`);
  await page.context().tracing.stop({ path: tracePath });
  result.trace = tracePath;

  // Overall status determination
  const hasFail = result.steps.some(s => s.status === 'FAIL');
  const hasBlocked = result.steps.some(s => s.status === 'BLOCKED');
  if (hasBlocked) result.status = 'BLOCKED';
  else if (hasFail) result.status = 'FAIL';
  else if (result.status !== 'PARTIAL') result.status = 'PASS';

  // Check for page/console errors
  if (result.consoleErrors.length > 0 || result.pageErrors.length > 0) {
    if (result.status === 'PASS') result.status = 'FAIL';
    result.notes.push(`${result.consoleErrors.length} console errors, ${result.pageErrors.length} page errors recorded`);
  }

  await writeResult();
  console.log(`Status: ${result.status}`);
  console.log(`Trace: ${tracePath}`);
  if (result.status !== 'PASS') {
    throw new Error(`OpenChamber E2E result is ${result.status}; see ${path.join(SCREENSHOT_DIR, 'result.json')}`);
  }
});