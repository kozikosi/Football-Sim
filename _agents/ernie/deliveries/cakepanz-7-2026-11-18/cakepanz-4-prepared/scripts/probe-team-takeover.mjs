/* probe-team-takeover.mjs — Part A (cakepanz-6) receipts: the takeover is VISIBLE, in the real UI.
   For each mode (light/dark) x viewport (1180/390): BEFORE (no team) vs AFTER (Ravens — the
   near-black primary; 49ers — the bright primary) screenshots of Team Select and the Draft Board,
   plus computed-style receipts read off real elements: the wordmark ink (--gold2), the nav-button
   border (--gold3), and a probe element that resolves --panel2/--hairline/--zcream through the
   live cascade. Output: shots/takeover/*.png + takeover-receipt.json. Exit 1 = any law red. */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }

const ROOT = process.cwd();
const PORT = process.env.CP_PORT || 4181;
const OUT = path.join(ROOT, 'shots', 'takeover');
fs.mkdirSync(OUT, { recursive: true });

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const receipt = { shots: [], laws: [] };

const styles = (page) => page.evaluate(() => {
  const cs = (sel, prop) => { const el = document.querySelector(sel); return el ? getComputedStyle(el)[prop] : null; };
  const root = getComputedStyle(document.documentElement);
  // the probe element resolves the raw tokens through the REAL cascade (the [data-zpbteam] blocks)
  const d = document.createElement('div');
  d.id = 'cp-takeover-probe';
  d.style.cssText = 'position:absolute;visibility:hidden;background:var(--panel2);border-top:2px solid var(--hairline);color:var(--zcream)';
  document.body.appendChild(d);
  const pc = getComputedStyle(d);
  // a second probe reads --gold2 directly: since D-4 the wordmark's ink rides the gradient
  // (background-clip:text), so the brand element's computed `color` is transparent by design
  const g = document.createElement('div');
  g.id = 'cp-takeover-gold2';
  g.style.cssText = 'position:absolute;visibility:hidden;color:var(--gold2)';
  document.body.appendChild(g);
  const brand = document.querySelector('.cp-brand');
  const out = {
    zpbteam: document.documentElement.getAttribute('data-zpbteam'),
    gold2: getComputedStyle(g).color,
    brandGradient: brand ? getComputedStyle(brand).backgroundImage : null,
    navborder: cs('.cp-navbtn', 'borderTopColor'),
    panel2: pc.backgroundColor,
    hairline: pc.borderTopColor,
    zcream: pc.color,
    bodyBg: cs('body', 'backgroundColor'),
    bodyInk: cs('body', 'color'),
    inlineT1L: root.getPropertyValue('--zpb-t1L').trim(),
    inlineT1D: root.getPropertyValue('--zpb-t1D').trim(),
  };
  d.remove(); g.remove();
  return out;
});

async function shot(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: false });
  receipt.shots.push([name, crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')]);
}

async function pickTeam(page, name) {
  await page.locator('.cp-ts-team', { hasText: name }).click(); await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
}

const byMode = {};
for (const mode of ['light', 'dark']) {
  byMode[mode] = {};
  for (const [vp, w, h] of [['1180', 1180, 900], ['390', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.emulateMedia({ colorScheme: mode });
    await page.goto(`http://localhost:${PORT}/?dev=1`);
    await page.waitForTimeout(1600);
    // BEFORE: no team picked — the default golds (Team Select, takeover dormant)
    const before = await styles(page);
    await shot(page, `${mode}-${vp}-before-team`);
    // RAVENS: the near-black primary (the sentinel the three-block structure exists for)
    await pickTeam(page, 'Baltimore Ravens');
    const ravensBoard = await styles(page);
    await shot(page, `${mode}-${vp}-ravens-board`);
    await page.evaluate(() => { location.hash = '#/team'; }); await page.waitForTimeout(400);
    const ravens = await styles(page);
    await shot(page, `${mode}-${vp}-ravens-team`);
    // 49ERS: the bright primary — a fresh boot so the transition is honest
    await page.evaluate(() => localStorage.clear());
    await page.goto(`http://localhost:${PORT}/?dev=1`);
    await page.waitForTimeout(1200);
    await pickTeam(page, 'San Francisco 49ers');
    const niners = await styles(page);
    await page.evaluate(() => { location.hash = '#/team'; }); await page.waitForTimeout(400);
    await shot(page, `${mode}-${vp}-niners-team`);
    // the laws, measured in the real browser:
    const law = (name, ok, detail) => receipt.laws.push({ mode, vp, name, ok, detail });
    law('zcream-never-recolored', before.zcream === ravens.zcream && before.zcream === niners.zcream,
      `before=${before.zcream} ravens=${ravens.zcream} niners=${niners.zcream}`);
    law('body-base-untinted', before.bodyBg === ravens.bodyBg && before.bodyBg === niners.bodyBg && before.bodyInk === ravens.bodyInk,
      `bg ${before.bodyBg} stays; ink ${before.bodyInk} stays`);
    law('brand-ink-changed-per-team', ravens.gold2 !== before.gold2 && niners.gold2 !== before.gold2 && ravens.gold2 !== niners.gold2,
      `before=${before.gold2} ravens=${ravens.gold2} niners=${niners.gold2}`);
    law('nav-border-changed-per-team', ravens.navborder !== before.navborder && niners.navborder !== before.navborder && niners.navborder !== ravens.navborder,
      `before=${before.navborder} ravens=${ravens.navborder} niners=${niners.navborder}`);
    law('panel2-whisper-changed', ravens.panel2 !== before.panel2 && niners.panel2 !== before.panel2,
      `before=${before.panel2} ravens=${ravens.panel2} niners=${niners.panel2}`);
    law('hairline-changed', ravens.hairline !== before.hairline,
      `before=${before.hairline} ravens=${ravens.hairline}`);
    law('brand-gradient-carries-team', ravens.brandGradient !== before.brandGradient && ravens.brandGradient.includes(ravens.gold2),
      `the resolved ramp holds the team accent (${ravens.brandGradient.slice(0, 72)}…)`);
    law('attribute-carries-team', ravens.zpbteam === 'Baltimore Ravens' && niners.zpbteam === 'San Francisco 49ers',
      `ravens=${ravens.zpbteam} niners=${niners.zpbteam}`);
    if (mode === 'dark') {
      law('near-black-primary-lifts-in-dark', ravens.inlineT1D !== '' && ravens.inlineT1L !== '' && ravens.inlineT1D.toLowerCase() !== ravens.inlineT1L.toLowerCase(),
        `t1L=${ravens.inlineT1L} t1D=${ravens.inlineT1D} (both ride inline; the dark block picks t1D)`);
    }
    byMode[mode][vp] = { ravens: ravens.gold2, niners: niners.gold2 };
    await page.close();
  }
}
await browser.close();
// the three-block structure earns its keep in PIXELS: the same team paints a different wordmark
// ink in light vs dark (a near-black primary must NOT carry one accent into both modes)
for (const team of ['ravens', 'niners']) {
  for (const vp of ['1180', '390']) {
    const ok = byMode.light[vp][team] !== byMode.dark[vp][team];
    receipt.laws.push({ mode: 'cross', vp, name: `${team}-accent-differs-by-mode`, ok,
      detail: `light=${byMode.light[vp][team]} dark=${byMode.dark[vp][team]} (the --gold2 token)` });
  }
}
let bad = 0;
for (const l of receipt.laws) { if (!l.ok) bad++; console.log(`${l.ok ? 'PASS' : 'FAIL'} ${l.mode}/${l.vp} ${l.name} — ${l.detail}`); }
fs.writeFileSync(path.join(OUT, 'takeover-receipt.json'), JSON.stringify(receipt, null, 2));
console.log(receipt.shots.map(([n, h]) => `${n} ${h.slice(0, 12)}`).join('\n'));
if (bad) { console.log(`${bad} LAWS RED`); process.exit(1); }
console.log('TEAM-TAKEOVER PROBE: all laws green');
