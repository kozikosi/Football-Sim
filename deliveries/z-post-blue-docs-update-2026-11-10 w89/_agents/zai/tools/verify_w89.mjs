// w89 headless verification (Node): the w89 asks, asserted on the patched product.
// Pattern: verify_w88.mjs — absorb-proxied DOM, run the big app script + the w89 block, check laws.
import fs from 'node:fs';

const file = process.argv[2] || 'w89.html';
const html = fs.readFileSync(file, 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const body = scripts.reduce((a, b) => (b.length > a.length ? b : a), '');
const w89 = scripts.find((s) => s.includes('Z-POST-BLUE W89 \u00b7 THE PRESEASON CINEMATIC'));
const r2 = scripts.find((s) => s.includes('W89R2 \u00b7 THE TOP DOORS'));

const ABS = `globalThis.__absorb = new Proxy(function(){}, { get:(t,p)=> (p===Symbol.toPrimitive? ()=>'' : globalThis.__absorb), set:()=>true, apply:()=>globalThis.__absorb, construct:()=>globalThis.__absorb });
const document = new Proxy(function(){}, { get:(t,p)=> (p===Symbol.toPrimitive)? ()=>'' : globalThis.__absorb, set:()=>true, apply:()=>globalThis.__absorb, construct:()=>globalThis.__absorb });
const window = new Proxy(globalThis, { get:(t,p)=> (p==='setTimeout'||p==='setInterval') ? ()=>0 : (p==='clearTimeout'||p==='clearInterval') ? ()=>{} : (p in t) ? t[p] : (p==='addEventListener'||p==='removeEventListener'||p==='matchMedia' ? ()=>({matches:false,addEventListener:()=>{}}) : undefined), set:(t,p,v)=>{ t[p]=v; return true; } }); const localStorage = { getItem:()=>null, setItem:()=>{}, removeItem:()=>{} };
const matchMedia = ()=>({ matches:false, addEventListener:()=>{}, addListener:()=>{} });
const requestAnimationFrame = ()=>0;
class IntersectionObserver { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } }
class MutationObserver { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } }
class ResizeObserver { constructor(){} observe(){} unobserve(){} disconnect(){} }
customElements = { define:()=>{}, get:()=>undefined, upgrade:()=>{} };
const setTimeout = ()=>0; const setInterval = ()=>0; const clearTimeout = ()=>{}; const clearInterval = ()=>{};`;

let fails = 0;
const check = (name, cond, detail = '') => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${detail ? '  · ' + detail : ''}`); if (!cond) fails++; };

// ---------- §A · structural string laws (grep the file) ----------
// (A1/A2 · the dock is created at runtime as the review panel's sibling — sticky needs an
//  overflow-visible chain; the host ids stay unique. Assert the runtime builder, not a static div.)
const dockIdx = html.indexOf("_dock.id = 'zpbSeasonDock'"), bodyIdx = html.indexOf('<div id="draftResultsBody"></div>');
check('A1 dock builder after the review body', dockIdx > bodyIdx && dockIdx > 0, `builder@${dockIdx} body@${bodyIdx}`);
check('A2 dock: RUN IT BACK sits inside zpbDraftOps between NEW DRAFT and 100 SEASONS',
  /id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn"[^>]*>NEW DRAFT<\/button>\$\{seasonState\?'<button class="tabbtn" id="dockRunItBackBtn"[^>]*>RUN IT BACK<\/button>':''\}<\/span>/.test(html) &&
  html.includes("panel.insertAdjacentElement('afterend', _dock)"));
check('A3 no top cluster left', !html.includes('ONE left-aligned cluster - the sim doors sit right next to 100 SEASONS'));
check('A4 stage banner retired', /function zpbUpdateStageBanner\(\)\{\n  return;/.test(html));
check('A5 rail carries try-again', html.includes("'beginSeasonBtn2','zpbTryAgainBtn']"));
check('A6 season options keep only CONTINUE', !html.includes('id="restartSeasonBtn"') && !html.includes('id="newDraftFromSeasonBtn"') && /return cta \? `<div class="zpb-seasonopts">\$\{cta\}<\/div>` : ''/.test(html));
check('A7 SIM GAME guard at complete', html.includes("if(S.phase==='complete'){ var _sgc = document.getElementById('simGameBtn'); if(_sgc) _sgc.remove(); }"));
check('A8 draft board badges retired', !html.includes('of ${ROSTER_SLOTS.length} starters') && !html.includes('wins above a replacement-level lineup</i>'));
check('A9 depth chart wins column retired', !html.includes('class="narr dwar"') && !html.includes('<span class="narr dwar">') && html.includes('grid-template-columns:3.4em minmax(0,1fr) 2.6em'));
check('A10 all-on/all-off subtitles retired (draft board)',
  !/data-all="1"[^>]*><b>ALL<\/b><i>all on<\/i>/.test(html) && !/data-none="1"[^>]*><b>CLEAR<\/b><i>all off<\/i>/.test(html));
check('A11 the weights panel ALL keeps its subtitle (not named)',
  /data-wall="1"[^>]*><b>ALL<\/b><i>all on<\/i>/.test(html));
check('A12 search splash element + logic', html.includes('id="playerSearchSplash"') && html.includes("const _idle = !playerFilters.search && playerFilters.pos.size===0 && !playerFilters.team;"));
check('A13 preseason: panel gone, cinematic in, page opens on 1. LINEUP',
  !html.includes('Set up the ${user} before Week 1') && html.includes('zpbPreseasonCine(user)') && html.includes('<h3 style="margin-top:0;">1. LINEUP</h3>'));
check('A14 NEW TO LINEUP?', html.includes('>NEW TO LINEUP?</summary>') && !html.includes('NEW TO FLEXING'));
check('A15 philosophy paragraph retired', !html.includes('is how your team likes to play by default. Opponents scout it.'));
check('A16 AUTO statics', html.includes('>AUTO</option>${offOpts}</select></label>') && html.includes('>AUTO</option>${defOpts}</select></label>') && !html.includes('Auto (recommended):'));
check('A17 one WHY THIS STYLE? dropdown (combined)',
  html.includes('<summary style="cursor:pointer;">WHY THIS STYLE?</summary>') &&
  html.includes('${scriptWhyHTML(user, true)}${zpbAutoWhyHTML(isAuto)}<div style="margin-top:10px;">${tabs.off}</div><div style="margin-top:10px;">${tabs.def}</div>') &&
  !html.includes('OFFENSE: EVERY STYLE WITH YOUR ROSTER') && !html.includes('DEFENSE: EVERY STYLE WITH YOUR ROSTER'));
check('A18 terms dropdown above + exact title',
  html.indexOf('>WHAT DO THESE TERMS MEAN?</summary>') > -1 && html.indexOf('>WHAT DO THESE TERMS MEAN?</summary>') < html.indexOf('>WHY THIS STYLE?</summary>') &&
  !html.includes('WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)'));
check('A19 aggrSel rides a div (the second-dropdown glitch), the Style word retired (w89r2)',
  /<div class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0\.72rem;max-width:300px;margin:8px 0;"><select id="aggrSel"/.test(html) &&
  !html.includes('>Style<select id="aggrSel"') && !/id="aggrSel"[^]*<\/select><\/label>/.test(html.replace(/[\s\S]*?id="aggrSel"/, '')));
check('A20 2pt: new title + badges + own-line sentences',
  html.includes('>WHAT IS A 2 POINT CONVERSION</summary>') && !html.includes('HOW A 2 POINT CONVERSION WORKS') &&
  html.includes('<span class="zpb-tpbadge"><b>1 PT</b><i>· 94%</i></span>') && html.includes('<span class="zpb-tpbadge"><b>2 PT</b><i>· 48%</i></span>') &&
  !html.includes('makes it about 94% of the time') && !html.includes('makes it about 48% of the time') &&
  html.includes('so the call is about the game situation.<br>One rule above all:') && html.includes('leaves a field goal to tie.<br>Every other team has its own style too'));
check('A21 box score vertical lines + dark name-bar scoped out',
  html.includes('table.linescore th:not(:first-child){border-left:1px solid var(--rosehair,var(--border));}') &&
  html.includes('table.linescore tbody td:not(:first-child){border-left:1px solid color-mix(in srgb,var(--zrb,var(--border)) 55%,transparent);}') &&
  html.includes('.linescore tr.zpb-trow td:first-child{box-shadow:none;}'));
check('A22 seed #1 shimmer', html.includes('if(seed===1) return `<span class="zpb-seedlbl zpb-shm zpb-conf1">'));
check('A23 bye panel shows the matchup', html.includes('the most likely opponent waiting in the ${NEXT_ROUND_LABEL[rk]}</p>') && /if\(_lo\) html \+= matchupCardHTML\(_lo\.g, \(g,k\)=>seedLabel\(g,k\)\);/.test(html));
check('A24 round skies wear the team ink', !html.includes('color-mix(in srgb,var(--accent) 15%,transparent) 90deg') && html.includes('color-mix(in srgb,var(--tA,var(--accent)) 15%,transparent) 90deg') && html.includes('color-mix(in srgb,var(--tA,var(--accent)) 13%,transparent),transparent 70%)'));
check('A25 during-game dynamics mounted', html.includes("'<div class=\"zpb-rep-tide\"><i id=\"zrepTide\"></i><span id=\"zrepCmd\"></span></div>'") && html.includes("ov.classList.add('zpb-bigplay')") && html.includes("_cm.textContent = _lead>0 ? (abbr(g[ev.side])+' BY '+_lead) : 'TIED';"));
check('A26 fade cards keep full names', html.includes(".zpb-gname:not(.zpb-dbk *)"));
check('A27 bye banner two lines, no dot', html.includes("_fx('medium', 'NO. 1 SEED<br>FIRST-ROUND BYE!')") && !html.includes('NO. 1 SEED \\u00b7') && !html.includes('NO. 1 SEED ·'));
check('A28 sb win skips the conventional page', html.includes('winning the Super Bowl skips the conventional SB page'));
check('A29 victory page: sub + dyn + second cadence',
  html.includes("'<div class=\"zpb-victory-sub\">THE FINAL WHISTLE</div>'") && html.includes("_dyn.map((t,i)=>'<span style=\"animation-delay:'+(6.2+i*3).toFixed(1)+'s;\">'+t+'</span>')") &&
  html.includes('animation-delay:7.4s;}') && !html.includes('animation-delay:3.25s;}'));
{ const _ct = html.slice(html.indexOf('<div class="zpb-champtop">'), html.indexOf('<div class="champion-banner'));
  check('A30 champions top bar: try-again full-width, SEASON REVIEW below, no RUN IT BACK in the top',
    _ct.includes('id="zpbTryAgainBtn"') && _ct.includes('id="seasonReviewBtn"') && !_ct.includes('RUN IT BACK')); }
check('A31 review row: RUN IT BACK gone from BEGIN PLAYOFFS row', !html.includes('<button class="tabbtn" id="zpbRunItBackTop" style="width:auto;">RUN IT BACK</button>${made?'));
check('A32 preview strip stacks ≤640', html.includes('.zpb-strip-bar{order:3;grid-column:1/-1;justify-self:center;width:100%;max-width:210px;height:12px;}'));
check('A33 the w88 laws untouched: wins table + order still present', html.includes('window.ZPB_SLOTS_WINS = {QB:2.4706') && html.includes("window.ZPB_SLOT_UI_ORDER = ['QB','DE1','WR1','DT1','OT1','WR2','CB1','OG1'"));
// ---------- §A-R2 · the Owner's second w89 round (the top doors, the quiet bubble) ----------
check('A34 guide caption retired, the board caption and the table survive',
  !html.includes('extra wins per season, 20-OVR upgrade at the local rate') &&
  html.includes('The Wins value of every starting spot  ·  QB anchored at 1000') &&
  html.includes("h += '</div>'; // w89r2 (Owner): the caption leaves the guide"));
check('A35 autosave bubble: words gone, Not now gone, the one quiet door back stays',
  !html.includes('A saved season is waiting') && !html.includes('>Not now</button>') && !html.includes("data-zbud=\"no\"") &&
  html.includes('Return to your season</button>') && html.includes("b.id='zpb-savebud'") &&
  html.includes('window.zpbRestoreSeason') && /data-zbud="go"[^>]*>Return to your season<\/button><\/div><\/div>'/.test(html));
check('A36 the top doors: strip builder + all three Head ids + the preseason guard',
  html.includes("strip.id = 'zpbTopSimStrip'") && html.includes('id="simGameBtnHead"') && html.includes('id="simSeasonBtnHead"') && html.includes('id="simPlayoffsBtnHead"') &&
  html.includes('container.insertBefore(strip, container.firstChild)') &&
  html.includes("if(!S || S.preseason || (S.phase!=='regular' && S.phase!=='playoffs')") && html.includes('renderSeasonTabInner = g'));
check('A37 the capture handlers adopt the Head doors (A9 + W65-D warnings)',
  html.includes("closest('#simSeasonBtn,#simSeasonBtnHead')") && html.includes("closest('#simRestBtn,#simPlayoffsBtnTop,#simPlayoffsBtnFoot,#simPlayoffsBtnHead')"));
check('A38 one wiring on the dock SIM GAME door (the guard)',
  html.includes('if(simGame && !simGame._zpbW65){ simGame._zpbW65 = true; simGame.addEventListener') && html.includes("rv.scrollIntoView({block:'start', behavior:'smooth'});\n }); }"));
check('A39 the top-strip CSS rides the dock door sizes (phone shrink included)',
  html.includes('.zpb-topstrip{display:flex;justify-content:flex-end') && html.includes('.zpb-topstrip .tabbtn{width:auto;margin:0;font-size:0.78rem;padding:5px 10px;}') && html.includes('.zpb-topstrip .zpb-ctasmall{font-size:.66rem !important;padding:5px 9px !important;}'));
check('A40 the dock doors unchanged (bottom copies stay)',
  /id="zpbSimTabsHost">\$\{seasonState&&seasonState.phase==='regular'\?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">/.test(html) && html.includes("b2.id = 'simPlayoffsBtnTop'"));

// ---------- §B · the functional harness ----------
try {
  const run = new Function(ABS + '\n' + body + '\n' + w89 + '\nreturn { scriptWhyHTML: (typeof scriptWhyHTML==="function")?scriptWhyHTML:null, seedLabel: (typeof seedLabel==="function")?seedLabel:null, lineupEditorHTML: (typeof lineupEditorHTML==="function")?lineupEditorHTML:null, zpbPreseasonCine: window.zpbPreseasonCine, seasonState: null };')();
  check('B1 harness ran', true);
  check('B2 zpbPreseasonCine defined', typeof run.zpbPreseasonCine === 'function');
  check('B3 scriptWhyHTML bare mode wired', body.includes('if(bare) return _inner;') && html.includes('${scriptWhyHTML(user, true)}'));
  try { new Function(ABS + '\n' + body + '\n' + w89 + '\n' + r2 + '\nreturn { wrapped: typeof renderSeasonTabInner==="function" && !!renderSeasonTabInner._zpbR2 };')(); check('B4 w89r2 block ran clean, renderSeasonTabInner carries the top-doors wrap', true); }
  catch (e) { check('B4 w89r2 block ran clean, renderSeasonTabInner carries the top-doors wrap', false, e.message); }
} catch (e) {
  check('B1 harness ran', false, e.message);
}

console.log(fails ? `\n${fails} FAILURES` : '\nALL w89 CHECKS PASSED');
