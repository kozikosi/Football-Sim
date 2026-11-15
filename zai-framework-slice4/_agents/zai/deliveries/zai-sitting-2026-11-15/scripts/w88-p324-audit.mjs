// P-324 audit — the published w89 (live) must show the NEW P-321 Wins, not weights.
// Loads the w89 file from file://, reads the guide list + the position-rankings buttons,
// sweeps every displayed number against the muse NEW table and the w87 weight table.
import { chromium } from 'playwright';
import fs from 'node:fs';

const FILE = 'file:///home/z/my-project/work/w89.html';
const NEW_WINS = { QB: '2.5', DE1: '1.7', WR1: '1.6', DT1: '1.3', OT1: '1.2', WR2: '1.1', CB1: '1.1', OG1: '1.0', MIKE: '0.8', DE2: '0.8', DT2: '0.8', FS: '0.8', SS: '0.8', OT2: '0.8', CB2: '0.7', OG2: '0.6', TE1: '0.6', RB1: '0.6', WILL: '0.4', DL5: '0.4', C: '0.4', TE2: '0.3', NICKEL: '0.3', WR3: '0.2', DIME: '0.1', SAM: '0.1', K: '0.1', P: '0.1', WR4: '0.1', RB2: '0.1', TE3: '0.1', FB: '0.1' };
// w87 weight-table numbers as strings — none of these may appear as a displayed position value
const WEIGHTS = ['1000', '675', '630', '520', '495', '415', '395', '390', '310', '295', '260', '245', '155', '150', '145', '105', '95', '40', '25'];

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const errors = [], blocked = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.route(/^https?:\/\//i, (r) => { blocked.push(r.request().url()); r.abort(); });
await page.goto(FILE, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

// 1) what does the app expose?
const probe = await page.evaluate(() => {
  const w = window;
  return {
    hasLocalFn: typeof w.zpbSlotWinsLocal === 'function',
    table: w.ZPB_SLOTS_WINS ? JSON.parse(JSON.stringify(w.ZPB_SLOTS_WINS)) : null,
    uiOrder: w.ZPB_SLOT_UI_ORDER || null,
    weightsStillPresent: w.ZPB_SLOTS_W ? true : false,
  };
});
console.log('ZPB_SLOTS_WINS table present:', !!probe.table, '· zpbSlotWinsLocal callable:', probe.hasLocalFn, '· internal ZPB_SLOTS_W present (must be internal-only):', probe.weightsStillPresent);

// 2) full-document visible-text sweep for weight numbers displayed as values
const text = await page.evaluate(() => document.body.innerText);
const weightHits = [];
for (const n of WEIGHTS) {
  const re = new RegExp('(^|[^0-9.])' + n + '(?![0-9.])', 'g');
  const lines = text.split('\n').filter((l) => re.test(l));
  if (lines.length) weightHits.push({ weight: n, lines: lines.slice(0, 4) });
}
console.log('weight-number hits in visible text:', weightHits.length);
for (const h of weightHits) console.log('  ·', h.weight, '→', JSON.stringify(h.lines));

// 3) the wins numbers must be visible: open the GUIDE tab, then read the positions-matter section
const guideBtn = page.locator('button, a, [role="button"]', { hasText: /^GUIDE$/i }).first();
if (await guideBtn.count()) { await guideBtn.click(); await page.waitForTimeout(1200); }
const guideText = await page.evaluate(() => {
  const el = [...document.querySelectorAll('*')].find((e) => e.children.length === 0 && /WHICH POSITIONS MATTER/i.test(e.textContent || ''));
  return el ? (el.closest('div,section,article')?.innerText ?? '') : document.body.innerText;
});
let winsVisible = 0;
for (const [slot, v] of Object.entries(NEW_WINS)) {
  if (guideText.includes(v)) winsVisible++;
}
console.log('guide tab clicked:', await guideBtn.count().catch(() => 0) > 0, '· guide panel found:', guideText.length > 200, '· NEW-wins values visible in guide text:', winsVisible, '/ 32 distinct values');
const sample = guideText.split('\n').filter((l) => /\b(QB|DE1|WR1|DT1|OT1|WR2|CB1|SAM|RB2|FB)\b/.test(l)).slice(0, 14);
console.log('guide sample lines:'); for (const s of sample) console.log('   ', s.trim().slice(0, 100));
// the ranking buttons (the position-rankings page): titles + labels
const btns = await page.evaluate(() => [...document.querySelectorAll('[data-rslot], .zpb-srbtn')].map((b) => (b.getAttribute('title') || '') + ' :: ' + (b.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40)).slice(0, 34));
console.log('ranking buttons found:', btns.length); for (const b of btns.slice(0, 8)) console.log('   ', b);

// 4) wins-per-season label (the muse prompt's "make the meaning visible")
const meaning = /wins? per season|wins a slot|worth .* wins|wins\b/i.test(text) ? 'wins wording present in page text' : 'NO wins wording found';
console.log('meaning label:', meaning);
console.log('page errors:', errors.length, errors.slice(0, 3));
console.log('blocked (external) requests:', blocked.length, '— w89 fetches webfonts from googleapis (the shell\'s known behavior, recorded)');
await browser.close();
