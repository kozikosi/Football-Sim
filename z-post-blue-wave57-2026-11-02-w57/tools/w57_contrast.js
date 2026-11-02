/* w57_contrast.js — the Owner's round-57 quality gate: a WCAG contrast audit over the REAL
 * rendered surfaces, every team (32) × both themes (light + dark).
 * Fixtures are the site's own markup (draft card row, season badges, unit report card, pick-grade
 * cards, honor cards, the anchor line, the Draft button) wearing the team's own row vars.
 * Animations are frozen at their end state; every text node's effective foreground is composited
 * over its true background chain (outermost → innermost) and scored: 4.5:1 body / 3.0:1 large. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const VW = parseInt(process.env.VW || '390', 10);

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: VW, height: VW <= 500 ? 844 : 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s !important;animation-duration:.001s !important;transition:none !important;}' });
  await page.waitForTimeout(350);

  const result = await page.evaluate((VW) => {
    // ---------- color math ----------
    const chan = v => Math.round(v * 255);
    function parseColor(str) {
      if (!str || str === 'transparent' || str === 'none') return [0, 0, 0, 0];
      str = str.trim();
      let m = str.match(/^rgba?\(([^)]+)\)$/);
      if (m) {
        const parts = m[1].split(/[\s,\/]+/).filter(Boolean);
        const nums = parts.map(parseFloat);
        let r, g, b, a = 1;
        if (parts.some(p => p.includes('%'))) {
          const pct = parts.filter(p => p.includes('%')).map(p => parseFloat(p));
          const rgbv = parts.filter(p => !p.includes('/')).map(p => parseFloat(p));
          r = rgbv[0] > 1 ? rgbv[0] : rgbv[0] * 255; g = rgbv[1] > 1 ? rgbv[1] : rgbv[1] * 255; b = rgbv[2] > 1 ? rgbv[2] : rgbv[2] * 255;
          if (pct.length === 4 || parts.length === 5) a = nums[3] > 1 ? nums[3] / 100 : nums[3];
        } else { r = nums[0]; g = nums[1]; b = nums[2]; if (nums.length > 3) a = nums[3]; }
        return [r, g, b, a];
      }
      m = str.match(/^color\(\s*srgb\s+([^)]+)\)$/);
      if (m) { const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat); return [chan(p[0]), chan(p[1]), chan(p[2]), p.length > 3 ? p[3] : 1]; }
      m = str.match(/^oklab\(([^)]+)\)$/);
      if (m) {
        const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
        const L = p[0], A = p[1], B = p[2], al = p.length > 3 ? p[3] : 1;
        const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
        const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
        const s_ = L - 0.0894841775 * A - 1.2914855480 * B;
        const lin = [l_ ** 3, m_ ** 3, s_ ** 3];
        const rr = 4.0767416621 * lin[0] - 3.3077115913 * lin[1] + 0.2309699292 * lin[2];
        const gg = -1.2684380046 * lin[0] + 2.6097574011 * lin[1] - 0.3413193965 * lin[2];
        const bb = -0.0041960863 * lin[0] - 0.7034186147 * lin[1] + 1.7076147010 * lin[2];
        const gam = v => { const c = Math.min(1, Math.max(0, v)); return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };
        return [chan(gam(rr)), chan(gam(gg)), chan(gam(bb)), al];
      }
      const named = { white: [255, 255, 255, 1], black: [0, 0, 0, 1] };
      return named[str.toLowerCase()] || null;
    }
    const lum = ([r, g, b]) => {
      const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); const hi = Math.max(l1, l2), lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); };
    const over = (fg, bg) => {
      const a = fg[3];
      return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), fg[3] + bg[3] * (1 - a)];
    };
    const hexStops = img => [...img.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|color\(\s*srgb[^)]*\)|oklab\([^)]*\)/g)].map(x => x[0]);
    function layerColor(cs, skipImage) {
      const base = parseColor(cs.backgroundColor) || [0, 0, 0, 0];
      const img = cs.backgroundImage;
      if (img && img !== 'none' && !skipImage) {
        const cols = hexStops(img).map(s => parseColor(s)).filter(Boolean).filter(c => c[3] > 0.015);
        if (cols.length) {
          // the spatial mean of the gradient (stops interpolate, never accumulate): at any x the
          // pixel shows an interpolated stop, so the honest layer is the mean stop, not the fold
          const mean = [0, 0, 0, 0];
          cols.forEach(c => { mean[0] += c[0]; mean[1] += c[1]; mean[2] += c[2]; mean[3] += c[3]; });
          const m = [mean[0] / cols.length, mean[1] / cols.length, mean[2] / cols.length, mean[3] / cols.length];
          return base[3] > 0 ? over(m, base) : m;
        }
      }
      return base;
    }
    function gradClipped(cs) {
      const fill = cs.getPropertyValue('-webkit-text-fill-color');
      const c = parseColor(cs.color) || [0, 0, 0, 1];
      const f = (fill && fill !== 'none') ? parseColor(fill) : c;
      return !!f && f[3] < 0.05;
    }
    function bgChain(el, host) {
      const layers = [];
      let node = el;
      const leafCs = getComputedStyle(el);
      const leafIsInk = gradClipped(leafCs);
      while (node && node.nodeType === 1 && layers.length < 12) {
        const isLeaf = node === el;
        layers.push(layerColor(getComputedStyle(node), isLeaf && leafIsInk));
        if (node === host) break;
        node = node.parentElement;
      }
      layers.reverse(); // outermost first
      let acc = [255, 255, 255, 1];
      layers.forEach(l => { acc = over(l, acc); });
      return acc;
    }
    function effFg(cs, bg) {
      let c = parseColor(cs.color) || [0, 0, 0, 1];
      const fill = cs.getPropertyValue('-webkit-text-fill-color');
      if (fill && fill !== 'currentColor') { const f = parseColor(fill); if (f && f[3] < 0.05) c = [0, 0, 0, 0]; }
      if (c[3] < 0.05) { // gradient-clipped text: the ink is the element's own gradient
        const cols = hexStops(cs.backgroundImage || '').map(s => parseColor(s)).filter(Boolean).filter(x => x[3] > 0.5);
        if (cols.length) { const mean = [0, 0, 0, 0]; cols.forEach(x => { mean[0] += x[0]; mean[1] += x[1]; mean[2] += x[2]; }); return [mean[0] / cols.length, mean[1] / cols.length, mean[2] / cols.length, 1]; }
        return [128, 128, 128, 1];
      }
      if (c[3] < 0.999) { const o = over(c, bg); return [o[0], o[1], o[2], 1]; }
      return [c[0], c[1], c[2], 1];
    }

    // ---------- the fixtures (the site's own markup) ----------
    const teams = (typeof ZPB_TEAM_COLORS !== 'undefined') ? Object.keys(ZPB_TEAM_COLORS) : Object.keys(TEAM_DATA || {});
    const host = document.createElement('div'); host.id = 'ct-host';
    host.style.cssText = 'position:fixed;left:-99999px;top:0;width:420px;background:var(--bg);padding:10px;';
    document.body.appendChild(host);
    const realT = document.getElementById('draftTable2');
    const realId = realT ? realT.id : null;
    if (realT) realT.id = 'draftTable2-real';

    function buildFixtures(team) {
      const rv = (typeof zpbRowVars === 'function') ? zpbRowVars(team) : '';
      const nv = (typeof zpbNeutralRowVars === 'function') ? zpbNeutralRowVars(team) : '';
      const av = (typeof zpbAnchorVars === 'function') ? zpbAnchorVars(team) : '';
      const crest = (typeof zpbTeamLogo === 'function') ? zpbTeamLogo(team) : '';
      return `
      <table id="draftTable2"><tbody>
        <tr class="zpb-trow" style="${nv}">
          <td class="dc-name"><b class="zpb-gname">Sample Name</b></td>
          <td data-label="Pos">QB</td>
          <td data-label="Team"><span class="zpb-teamcol">${crest}<span>${(TEAM_ABBR[team]||team).slice(0,3).toUpperCase()}</span></span></td>
          <td class="score dc-ovr" data-label="OVR"><span class="zpb-ovrstack">94</span></td>
          <td class="score dc-wins" data-label="Wins">2.1</td>
          <td class="score dc-pri" data-label="Priority">1.4</td>
          <td class="score dc-gone" data-label="Gone">12%</td>
          <td class="narr dc-fills" data-label="Fills"><a href="#" class="slotchg">WR1</a></td>
          <td class="dc-btn"><button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;">Draft</button></td>
        </tr>
      </tbody></table>
      <div class="zpb-trow" style="${rv};display:flex;justify-content:space-between;padding:8px;">
        <b class="zpb-gname">Vivid Row Name</b><span class="score">3.4</span><span class="narr">muted note</span>
      </div>
      <div style="background:var(--panel2);padding:10px;display:flex;flex-direction:column;gap:6px;">
        <span class="zpb-sbadge zpb-sb-hero" style="--beat:0"><b>10·7</b><i>RECORD</i></span>
        <span class="zpb-sbadge zpb-sb-good" style="--beat:0"><b>+42</b><i>PPG MARGIN</i></span>
        <span class="zpb-sbadge zpb-sb-bad" style="--beat:0"><b>3·5</b><i>LOSING STREAK</i></span>
        <span class="zpb-sbadge zpb-sb-gold" style="--beat:0"><b>#1</b><i>AFC SEED</i></span>
        <span class="zpb-sbadge" style="--beat:0"><b>28</b><i>WINS PREDICTED</i></span>
        <div class="zpb-scard zpb-shonor" style="${rv}--beat:0"><div class="zpb-scard-hd"><b class="zpb-gname zpb-shm">Star Player</b><span class="zpb-poschip">QB</span></div><div class="zpb-shonor-t">FIRST-TEAM ALL-PRO</div><div class="zpb-shonor-w">why line</div></div>
      </div>
      <div style="background:var(--panel2);padding:10px;">
        <div class="zpb-rc-title">UNIT REPORT CARD</div>
        <div class="zpb-rcgrid">
          <div class="zpb-met zpb-rcbadge zpb-sb-good" style="${rv}--beat:0;"><span class="zpb-rc-grade">A</span><span class="zpb-rc-body"><b>PASS RUSH</b><i>88 OVR · #4</i><em>41 sacks</em></span></div>
          <div class="zpb-met zpb-rcbadge zpb-sb-bad" style="${rv}--beat:0;"><span class="zpb-rc-grade">D</span><span class="zpb-rc-body"><b>SECONDARY</b><i>71 OVR · #29</i><em>220 pass yds allowed/gm</em></span></div>
        </div>
      </div>
      <div style="background:var(--panel2);padding:10px;">
        <div class="zpb-pg-grid">
          <div class="zpb-pg-card" style="${rv}"><span class="zpb-pg-slot">QB</span><span class="zpb-pg-grade" title="rank">A</span><b class="zpb-pg-name zpb-shm">Pick Player</b><span class="zpb-pg-badges"><i>94 OVR</i><i>RD 1</i><i>#3/32</i></span></div>
          <div class="zpb-pg-card" style="${rv}"><span class="zpb-pg-slot">K</span><span class="zpb-pg-grade">C</span><b class="zpb-pg-name">·</b><span class="zpb-pg-badges"><i>·</i><i>·</i><i>#20/32</i></span></div>
        </div>
      </div>
      <div class="panel zpb-anch" style="${av};padding:10px;">
        <div class="zpb-anch-k" style="font-size:.72rem;letter-spacing:.2em;font-weight:800;">THE ANCHOR</div>
        <b style="font-size:1rem;">Anchor Name</b>
        <span class="narr" style="display:block;">anchor muted line</span>
      </div>
      <p class="narr" style="background:var(--panel2);padding:6px;">narrative muted paragraph on the panel</p>`;
    }

    const out = { fails: [], warns: [], count: 0 };
    const thresholds = cs => {
      const px = parseFloat(cs.fontSize), w = parseInt(cs.fontWeight) || 400;
      const large = (px >= 24) || (w >= 700 && px >= 18.66);
      return large ? 3.0 : 4.5;
    };
    const themes = ['light', 'dark'];
    for (const team of teams) {
      for (const th of themes) {
        document.documentElement.setAttribute('data-theme', th);
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(team);
        host.innerHTML = buildFixtures(team);
        void host.offsetHeight;
        const leaves = [];
        host.querySelectorAll('*').forEach(el => {
          const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (own) leaves.push({ el, pseudo: null });
          const bcs = getComputedStyle(el, '::before');
          if (bcs.content && bcs.content !== 'none' && bcs.content !== 'normal' && bcs.display !== 'none') leaves.push({ el, pseudo: '::before' });
        });
        for (const { el, pseudo } of leaves) {
          const cs = pseudo ? getComputedStyle(el, pseudo) : getComputedStyle(el);
          const txt = (pseudo ? cs.content : el.textContent).replace(/["']/g, '').trim().slice(0, 26);
          if (!txt) continue;
          const bg = bgChain(el, host);
          const fg = effFg(cs, bg);
          const r = ratio(fg, bg);
          const need = thresholds(cs);
          out.count++;
          const rec = { team, theme: th, text: txt, r: Math.round(r * 100) / 100, need, cls: el.className && String(el.className).slice(0, 28) };
          if (r < need) (r < need - 0.5 ? out.fails : out.warns).push(rec);
        }
      }
    }
    if (realT && realId) realT.id = realId;
    host.remove();
    if (typeof zpbClearTeamTheme === 'function') zpbClearTeamTheme();
    document.documentElement.removeAttribute('data-theme');
    return { teamCount: teams.length, checked: out.count, failCount: out.fails.length, warnCount: out.warns.length, fails: out.fails, warns: out.warns };
  }, VW);

  console.log('=== viewport ' + VW + ' ===');
  console.log('teams:', result.teamCount, '· pairs measured:', result.checked);
  console.log('FAIL:', result.failCount, '· warn:', result.warnCount);
  const byKey = {};
  result.fails.forEach(f => { const k = f.theme + ' · [' + f.cls + '] ' + f.text; (byKey[k] = byKey[k] || []).push(f.team + ' (' + f.r + ')'); });
  Object.keys(byKey).sort().forEach(k => console.log('  FAIL', k, '→', byKey[k].length + ': ' + byKey[k].slice(0, 40).join(', ')));
  const byKeyW = {};
  result.warns.forEach(f => { const k = f.theme + ' · [' + f.cls + '] ' + f.text; (byKeyW[k] = byKeyW[k] || []).push(f.team + ' (' + f.r + ')'); });
  Object.keys(byKeyW).sort().forEach(k => console.log('  warn', k, '→', byKeyW[k].length + ': ' + byKeyW[k].slice(0, 10).join(', ')));
  const tally = {};
  result.fails.forEach(f => { tally[f.team] = (tally[f.team] || 0) + 1; });
  console.log('per-team FAIL tallies:', JSON.stringify(tally));
  console.log('pageerrors:', errs.length ? errs.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
