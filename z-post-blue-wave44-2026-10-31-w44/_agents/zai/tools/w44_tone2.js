#!/usr/bin/env node
/* w44_tone2.js — visual tone study in the player browser (the Owner's test bed).
   Strips: dark (the law), light @R=0.42/0.50/0.58 (candidate halfway), light crayola (w43). */
const { chromium } = require('/home/z/my-project/w41/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/boot/w44/Football-Sim-Z-post-blue-w44.html';
const OUT = '/home/z/my-project/boot/w44/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe });
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 860 } });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1800);
  await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
  await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
  await page.waitForTimeout(700);

  const variants = [
    ['dark',   null],
    ['r42',    0.42],
    ['r50',    0.50],
    ['r58',    0.58],
    ['crayola','cray'],
  ];
  for (const [name, R] of variants) {
    await page.evaluate(R => {
      try{
        delete window.__zpbOrigPack;
        if(R === null){ // the dark law — flip theme, restore packs
          if(window.__zpbOrigPack){ zpbPackFor = window.__zpbOrigPack; }
          document.documentElement.setAttribute('data-theme','dark');
          try{ document.getElementById('tabGroupsBtn').click(); document.getElementById('tabPlayersBtn').click(); }catch(e){}
          return 'dark';
        }
        document.documentElement.setAttribute('data-theme','light');
        if(R === 'cray'){ // the w43 crayola: l=.52 full sat
          if(!window.__zpbOrigPack) window.__zpbOrigPack = zpbPackFor;
          zpbPackFor = function(n){ const pk = window.__zpbOrigPack(n); if(!pk) return pk;
            const c = zpbHsl(pk.txL); const m = (c.l<0.52) ? zpbFromHsl(c.h,c.s,0.52) : pk.txL;
            return Object.assign({}, pk, { txM: m }); };
        } else {
          if(!window.__zpbOrigPack) window.__zpbOrigPack = zpbPackFor;
          zpbPackFor = function(n){ const pk = window.__zpbOrigPack(n); if(!pk) return pk;
            const txc = zpbHsl(pk.txL); const base = (txc.l<0.52) ? zpbFromHsl(txc.h,txc.s,0.52) : pk.txL;
            const m = zpbMix('#53382b', base, R); const c = zpbHsl(m);
            return Object.assign({}, pk, { txM: zpbFromHsl(c.h, Math.min(.85,Math.max(.22,c.s)), Math.min(.52,Math.max(.30,c.l))) }); };
        }
        try{ document.getElementById('tabGroupsBtn').click(); document.getElementById('tabPlayersBtn').click(); }catch(e){}
      }catch(e){ return String(e); }
    }, R);
    await page.waitForTimeout(650);
    await page.evaluate(() => { const t = document.getElementById('playerTable') || document.querySelector('#viewPlayers .panel'); if(t) t.scrollTop = 2600; const b = document.getElementById('playerTable'); if(b) b.scrollTop = 2600; });
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${OUT}/tone-${name}.png`, timeout: 12000 });
    console.log('shot', name);
  }
  await browser.close();
  console.log('tone strips done');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
