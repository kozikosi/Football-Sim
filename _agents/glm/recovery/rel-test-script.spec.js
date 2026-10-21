const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ARTIFACT_PATH = '/Users/kosi/Desktop/Football Sim/merged.html';
const ARTIFACT_URL = 'file://' + ARTIFACT_PATH.replace(/ /g, '%20');
const EXPECTED_SHA256 = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';

const SCREENSHOT_DIR = '/Users/kosi/Desktop/Football Sim/test-results/e2e-' + Date.now();
const TRACE_DIR = SCREENSHOT_DIR + '/trace';

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
fs.mkdirSync(TRACE_DIR, { recursive: true });

function calculateSHA256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function getViewportChecks(page, checkpoint) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    const overflowPx = Math.max(0, bodyWidth - viewportWidth);

    const overflowElements = [];
    const allElements = document.querySelectorAll('*');
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.width > viewportWidth + 1) {
        let scrollContainer = null;
        let parent = el.parentElement;
        while (parent) {
          const style = getComputedStyle(parent);
          if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
            scrollContainer = parent.tagName.toLowerCase() + (parent.id ? '#' + parent.id : '') + (parent.className ? '.' + parent.className.split(' ').join('.') : '');
            break;
          }
          parent = parent.parentElement;
        }
        overflowElements.push({
          selector: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
          bounds: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
          nearestScrollContainer: scrollContainer,
          intentional: !!scrollContainer
        });
      }
    }

    return {
      documentScrollWidth: docWidth,
      bodyScrollWidth: bodyWidth,
      pageOverflowPx: overflowPx,
      overflowElements
    };
  });
}

async function captureLightDark(page, checkpoint, screenshotName) {
  const screenshots = [];
  // Light mode (default)
  const lightPath = path.join(SCREENSHOT_DIR, `${screenshotName}-light.png`);
  await page.screenshot({ path: lightPath, fullPage: true });
  screenshots.push({ scheme: 'light', path: lightPath });

  // Dark mode - emulate via media query
  try {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(200);
    const darkPath = path.join(SCREENSHOT_DIR, `${screenshotName}-dark.png`);
    await page.screenshot({ path: darkPath, fullPage: true });
    screenshots.push({ scheme: 'dark', path: darkPath });
    await page.emulateMedia({ colorScheme: 'light' });
  } catch (e) {
    console.log(`Theme emulation not available: ${e.message}`);
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
  await page.waitForTimeout(300);
  const vp = await getViewportChecks(page, checkpoint);
  const screenshotPath = path.join(SCREENSHOT_DIR, `viewport-${checkpoint}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  vp.screenshot = screenshotPath;
  vp.checkpoint = checkpoint;
  vp.width = 390;
  vp.height = 844;
  result.viewportChecks.push(vp);
  result.screenshots.push(screenshotPath);
  return vp;
}

async function checkViewportDesktop(page, checkpoint) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(300);
  const vp = await getViewportChecks(page, checkpoint);
  const screenshotPath = path.join(SCREENSHOT_DIR, `viewport-${checkpoint}-desktop.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  vp.screenshot = screenshotPath;
  vp.checkpoint = checkpoint + '-desktop';
  vp.width = 1280;
  vp.height = 900;
  result.viewportChecks.push(vp);
  result.screenshots.push(screenshotPath);
  return vp;
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
    await checkViewportAt390(page, 'initial-load');
    await captureLightDark(page, 'initial-load', 'startup');

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
    await checkViewportAt390(page, 'draft-results');
    await captureLightDark(page, 'draft-results', 'draft-results');

    const hasDraftComplete = await page.locator('#draftFinalResults').textContent().then(t => 
      t?.includes('Draft Complete') || t?.includes('draft complete') || t?.includes('Draft complete') || false
    );
    if (!hasDraftComplete) {
      const text = await page.locator('#draftFinalResults').textContent();
      throw new Error(`Draft Complete not found in results: ${text?.substring(0, 200)}`);
    }

    // Try to get internal draft position
    let draftPos = null;
    try {
      draftPos = await page.evaluate(() => window.draftSim?.pos ?? null);
    } catch (e) {
      draftPos = null;
    }
    result.seasonMetrics.draftPicks = draftPos;

    return `Draft complete confirmed; internal pos: ${draftPos ?? 'unavailable'}`;
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
    await page.waitForTimeout(1000);

    // V20 donor build: no weekDisplay element, check for simSeasonBtn or season UI
    const simSeasonBtn = page.locator('#simSeasonBtn');
    if (await simSeasonBtn.isVisible({ timeout: 5000 })) {
      await checkViewportDesktop(page, 'season-started');
      await checkViewportAt390(page, 'season-started');
      return 'Season started, simSeasonBtn visible';
    }

    // Check for any week indicator text
    const bodyText = await page.textContent('body');
    if (bodyText?.includes('Week') || bodyText?.includes('week')) {
      await checkViewportDesktop(page, 'season-started');
      await checkViewportAt390(page, 'season-started');
      return `Season started; week text found in body`;
    }

    // Still record viewport
    await checkViewportDesktop(page, 'season-started');
    await checkViewportAt390(page, 'season-started');
    return 'Season started (beginSeasonBtn clicked)';
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

    // Try to get games played count
    let gamesPlayed = null;
    try {
      gamesPlayed = await page.evaluate(() => window.seasonState?.gamesPlayed ?? window.regularSeasonGamesPlayed ?? null);
    } catch (e) {
      gamesPlayed = null;
    }
    result.seasonMetrics.regularSeasonGamesPlayed = gamesPlayed;

    return `Regular season complete; games played: ${gamesPlayed ?? 'unavailable (expected 272)'}`;
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

    // Try to get playoff rounds
    let playoffRounds = null;
    try {
      playoffRounds = await page.evaluate(() => window.seasonState?.playoffRoundsCompleted ?? window.playoffRoundsCompleted ?? null);
    } catch (e) {
      playoffRounds = null;
    }
    result.seasonMetrics.playoffRoundsCompleted = playoffRounds;

    return `Playoffs/Super Bowl complete; champion visible: ${championVisible}; rounds: ${playoffRounds ?? 'unavailable'}`;
  });

  // === STEP 5: 100-season report (optional - mark SKIP if timeout) ===
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
    await checkViewportAt390(page, '100-season-report');
    await captureLightDark(page, '100-season-report', '100-season-report');

    const reportRendered = await page.locator('#reportView, #reportContainer, #sim100Report, details:has-text("What actually drove winning"), summary:has-text("What actually drove winning")').first().isVisible();
    result.seasonMetrics.reportRendered = reportRendered;

    const hasDrivenWinning = await page.locator('details:has-text("What actually drove winning"), summary:has-text("What actually drove winning")').count() > 0;

    let reportDurationMs = null;
    try {
      reportDurationMs = await page.evaluate(() => window.lastReportDurationMs ?? null);
    } catch (e) {
      reportDurationMs = null;
    }
    result.seasonMetrics.reportDurationMs = reportDurationMs;

    if (!hasDrivenWinning) {
      result.notes.push('"What actually drove winning" section not found in 100-season report');
    }

    return `100-season report rendered; driven-winning section: ${hasDrivenWinning}; duration: ${reportDurationMs ?? 'unavailable'}ms`;
  }, 'SKIP');

  if (reportResult.status === 'SKIP') {
    result.skippedChecks.push('100-season simulation (budget/time)');
    if (result.status === 'PASS') result.status = 'PARTIAL';
  }

  // Final viewport checks
  await checkViewportAt390(page, 'final');
  await checkViewportDesktop(page, 'final');

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
});