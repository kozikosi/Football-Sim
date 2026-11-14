// PHASE C — offline, for real: file:// + every non-file request blocked + zero console errors,
// pick works, save persists across a reload, and the FIRST-LOAD-NO-NETWORK-EVER case.
// Also: the w89 PRODUCT page under the same offline conditions (the known Google-fonts risk, Ernie §6).
// Usage: node scripts/phase-c.mjs
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { chromium } from 'playwright';

const userPicks = JSON.parse(fs.readFileSync('/home/z/my-project/scratch/wave/userPicks.json', 'utf8')).slice(0, 3);
const out = { arms: {}, w89: {} };

async function offlineContext(label) {
  const profile = path.join(os.tmpdir(), `bench2-c-${label}-${Date.now()}`);
  const ctx = await chromium.launchPersistentContext(profile, { headless: true });
  const blocked = [];
  await ctx.route('**/*', (route) => {
    const u = route.request().url();
    if (u.startsWith('file://')) return route.continue();
    blocked.push(u.slice(0, 120));
    return route.abort();
  });
  return { ctx, blocked, profile };
}

async function runArm(label, dist) {
  const fileUrl = 'file://' + path.resolve(dist, 'index.html');
  const { ctx, blocked, profile } = await offlineContext(label);
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const consoleMsgs = [];
  page.on('console', (m) => consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 220)}`));
  page.on('pageerror', (e) => consoleMsgs.push('pageerror: ' + String(e).slice(0, 220)));
  await page.goto(fileUrl);
  let booted = true;
  try { await page.waitForFunction('window.__bench && window.__bench.pickById', null, { timeout: 15000 }); } catch { booted = false; }
  let picks = 0, save = null, reloaded = null, loadAfter = null, onClock = null;
  if (booted) {
    onClock = await page.evaluate(() => document.querySelector('[data-testid="on-clock"]')?.textContent ?? '');
    for (const p of userPicks) { const st = await page.evaluate((x) => window.__bench.pickById(x.playerId, x.slot), p); if (st) picks++; }
    save = await page.evaluate(() => window.__bench.save());
    await page.reload();
    await page.waitForFunction('window.__bench && window.__bench.pickById', null, { timeout: 15000 }).catch(() => {});
    loadAfter = await page.evaluate(() => window.__bench.load());
  }
  await ctx.close();
  fs.rmSync(profile, { recursive: true, force: true });
  out.arms[label] = { fileUrl, booted, onClock, picksMade: picks, save, reloadLoad: loadAfter, blockedRequests: blocked, consoleMsgs, consoleErrorCount: consoleMsgs.filter((m) => m.startsWith('error') || m.startsWith('pageerror')).length };
}

async function runW89() {
  const fileUrl = 'file:///home/z/my-project/scratch/wave/Football-Sim-Z-post-blue-w89.html';
  const { ctx, blocked, profile } = await offlineContext('w89');
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const consoleMsgs = [];
  page.on('console', (m) => consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 220)}`));
  page.on('pageerror', (e) => consoleMsgs.push('pageerror: ' + String(e).slice(0, 220)));
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(2500);
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200)).catch(() => '');
  const fontCount = await page.evaluate(() => document.fonts ? document.fonts.size : -1).catch(() => -1);
  await ctx.close();
  fs.rmSync(profile, { recursive: true, force: true });
  out.w89 = { fileUrl, bodyTextStart: bodyText, fontsLoaded: fontCount, blockedRequests: blocked, consoleMsgs: consoleMsgs.slice(0, 20), consoleMsgCount: consoleMsgs.length };
}

await runArm('vue', '/home/z/my-project/scratch/arm-vue/dist-file');
await runArm('svelte', '/home/z/my-project/scratch/arm-svelte/dist-file');
await runW89();
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync('/home/z/my-project/scratch/wave/phaseC.json', JSON.stringify(out, null, 2));
for (const [k, v] of Object.entries(out.arms)) console.log(k, JSON.stringify({ booted: v.booted, picks: v.picksMade, save: v.save?.ok, reload: v.reloadLoad, consoleErrors: v.consoleErrorCount, blocked: v.blockedRequests.length, msgs: v.consoleMsgs.slice(0, 3) }));
console.log('w89:', JSON.stringify({ fonts: out.w89.fontsLoaded, blocked: out.w89.blockedRequests?.length, msgCount: out.w89.consoleMsgCount, msgs: (out.w89.consoleMsgs || []).slice(0, 5) }));
