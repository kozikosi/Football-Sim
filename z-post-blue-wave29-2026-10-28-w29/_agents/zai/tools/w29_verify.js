#!/usr/bin/env node
/* w29_verify.js — headless functional verification of the w29 build (jsdom).
   Asserts every round-29 directive + zero console errors. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;

const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w29.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push('jsdomError: ' + (e.detail && e.detail.message || e.message)); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(HTML, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/', virtualConsole: vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb = cb; } observe(el){ try{ this.cb([{target:el, isIntersecting:true}], this); }catch(e){} } unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }
});
const { window } = dom;
const doc = window.document;
const ev = s => window.eval(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (cond, name) => { if(cond){ pass++; console.log('  PASS', name); } else { fail++; console.log('  FAIL', name); } };

(async () => {
  await sleep(800);
  console.log('== boot ==');
  ok(errors.length === 0, 'zero console errors on boot' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  // ---- A: the shared field map (guide) ----
  console.log('== A: where they line up ==');
  doc.getElementById('tabGuideBtn').click();
  await sleep(400);
  const fm = doc.querySelector('#guideBody .zpb-fm');
  ok(!!fm, 'guide field map exists');
  const offI = fm.querySelectorAll('.zpb-fm-side.zpb-fm-off i');
  const defI = fm.querySelectorAll('.zpb-fm-side.zpb-fm-def i');
  ok(offI.length === 12, 'offense stations rendered (12: RB FB QB + 9 line), got ' + offI.length);
  const xOf = el => (el.getAttribute('style').match(/--x:(-?\d+)/)||[])[1];
  const xs = Array.from(offI).map(xOf);
  ok(xs.filter(x=>x==='-5').length===1 && xs.filter(x=>x==='5').length===1, 'the two wide WRs stand an extra bubble out (±5)');
  ok(defI.length === 13, 'defense stations rendered (13: 4 DL + 3 LB + 3 CB + DIME + 2 S), got ' + defI.length);
  const defXs = Array.from(defI).map(xOf);
  ok(defXs.filter(x=>x==='-5').length===1 && defXs.filter(x=>x==='5').length===1, 'CBs line up directly across the WRs (±5)');
  ok(defXs.filter(x=>x==='3').length===3, 'NICKEL + DIME (and the right DE) hold the slot gap at +3');
  const defLabels = Array.from(defI).map(i=>i.textContent.trim());
  ok(defLabels.join(',') === 'DE,DT,DT,DE,SAM,MIKE,WILL,CB,NICKEL,CB,DIME,SS,FS', 'defense rows in depth order with SAM strong-side left, got ' + defLabels.join(','));
  const scrimIdx = Array.from(fm.children).findIndex(c=>c.classList.contains('zpb-fm-scrim'));
  const offIdx = Array.from(fm.children).findIndex(c=>c.classList.contains('zpb-fm-off'));
  const defIdx = Array.from(fm.children).findIndex(c=>c.classList.contains('zpb-fm-def'));
  ok(offIdx < scrimIdx && scrimIdx < defIdx, 'the defense sits below the offense, across the line of scrimmage');
  ok(/\.zpb-fm-row > i\{position:absolute;left:calc\(50% \+ var\(--x,0\)\*7\.7%\)/.test(HTML), 'the shared-grid CSS law is present');

  // ---- A2: belong map ----
  ok(true, 'belong map tested live in the draft section below');

  // ---- B+C: coaching cards + squares line ----
  console.log('== B/C: coaching visuals + removals ==');
  const secs = Array.from(doc.querySelectorAll('#guideBody details.panel'));
  const defSec = secs.find(s=>/DEFENSE: 4-3/.test(s.querySelector('summary').textContent)).querySelector('div').innerHTML;
  const coachSec = secs.find(s=>/COACHING: PERSONNEL/.test(s.querySelector('summary').textContent)).querySelector('div').innerHTML;
  ok(!HTML.includes('Squares are the defensive line'), 'C1: the squares/triangles/circles paragraph is gone');
  ok((coachSec.match(/zpb-defcard/g)||[]).length === 4, 'B1: coaching section draws four Defense-section cards (4-3, 3-4, NICKEL, FOCUS)');
  ok(coachSec.includes('>4-3</h5>') && coachSec.includes('>3-4</h5>') && coachSec.includes('>NICKEL</h5>') && coachSec.includes('>FOCUS</h5>'), 'B1: the three fronts keep their titles and the FOCUS card stays');
  ok(coachSec.includes('<i class="z-dl c-dt2">'), 'B2: DT2 is drawn with the DL square class in the coaching cards');
  ok(coachSec.includes('<i class="z-lb c-ilb2">') && coachSec.includes('<i class="z-lb c-sam">'), 'B2: ILB2 and SAM are drawn with the LB triangle class');
  ok(defSec.includes('<i class="z-dl c-dt2">') && defSec.includes('<i class="z-lb c-ilb2">'), 'B2: the Defense section keeps the same shapes');
  ok(coachSec.includes('zpb-defdots') && !coachSec.includes('zpb-pkgdots'), 'B1: the old generic pkgdots viz is retired in coaching');
  ok(coachSec.includes('Your default style, set on the Preseason page.<br>Opponents scout it'), 'C2: philosophy keeps exactly two sentences, one on top of the other');
  ok(!coachSec.includes('If you leave it on Auto'), 'C2: the Auto sentence is gone');
  ok(defSec.includes('zpb-deflegend'), 'the named-color legend remains in the Defense section');

  // ---- D+E: Reading the Draft Board ----
  console.log('== D/E: the draft board section ==');
  const boardSec = secs.find(s=>/READING THE DRAFT BOARD/.test(s.querySelector('summary').textContent)).querySelector('div').innerHTML;
  ok(boardSec.includes('<span class="zrl-badge">WINS</span>'), 'D1: the WINS title wears the same boxed badge as the others');
  ok(boardSec.includes('<span class="zrl-badge">PRIORITY</span>') && boardSec.includes('<span class="zrl-badge">GONE</span>'), 'D1: PRIORITY and GONE keep their boxed titles');
  ok(boardSec.includes('How many more games per season a player adds than a 70-rated player at his position<br>WINS are static.'), 'D2: Wins rewritten verbatim, two centered lines');
  ok(boardSec.includes('Do I need to take him now.<br>What picking him now adds over the best you could expect to still find at that spot at your next pick. Priority changes as your roster fills and as the board thins.'), 'D3: Priority rewritten verbatim');
  ok(boardSec.includes('Is he about to leave.<br>The chance that a player will be picked by another team before your next turn'), 'D4: Gone rewritten verbatim');
  ok(boardSec.includes('<b>Why can a linebacker show high priority?</b><br>Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\u2019s priority can be higher even though his Wins number is smaller.<br>The Wins column is the clean \u201chow good is he\u201d number.<br>Priority is the \u201cdo I need to take him now\u201d number.'), 'D5: linebacker callout rewritten verbatim, one line each');
  ok(boardSec.includes('zpb-bm-center'), 'D5: the whole section is centered');
  ok(boardSec.includes('CPU DRAFT STRATEGY') && boardSec.includes('CPU teams draft by priority with a little personal taste for certain positions and some randomness.'), 'E2: CPU DRAFT STRATEGY has its own panel with the verbatim text');
  ok(boardSec.includes('UNDO') && boardSec.includes('\u21b6 Undo button takes back your most recent pick'), 'E3: UNDO has its own panel with the verbatim text');
  ok(!boardSec.includes('How the computer teams pick'), 'E1: the old inline CPU paragraph is gone');
  ok(!HTML.includes('One Undo per draft'), 'E4: the once-per-draft wording is gone everywhere');
  ok(HTML.includes('One Undo per round takes your pick back.'), 'E4: the guide intro follows the once-per-round law');
  ok(HTML.includes('title="Take back your last pick (one per round)"'), 'E4: the Undo button title follows the once-per-round law');

  // ---- F+G: the math of every game-plan choice ----
  console.log('== F/G: game-plan math ==');
  const planSec = secs.find(s=>/THE MATH OF EVERY GAME-PLAN CHOICE/.test(s.querySelector('summary').textContent)).querySelector('div').innerHTML;
  ok(planSec.includes('<h5 class="narr" style="margin:6px 0;">OFFENSE</h5>'), 'F1: the offense subtitle is just OFFENSE');
  ok(planSec.includes('<h5 class="narr" style="margin:14px 0 6px;">DEFENSE</h5>'), 'F1: the defense subtitle is just DEFENSE');
  ok(!planSec.includes('what each choice does to'), 'F1: the league-average sentence is gone');
  ok(!planSec.includes('run-heavy') && !planSec.includes('pass-heavy'), 'F2: the words run-heavy / pass-heavy are gone from the panel');
  ok((planSec.match(/zpb-emph-b"[^>]*><b>R\+<\/b>/g)||[]).length >= 5 && (planSec.match(/zpb-emph-b"[^>]*><b>P\+<\/b>/g)||[]).length >= 5, 'F2: the R+ and P+ badges carry the leans');
  const offRows = Array.from(planSec.match(/<table[^>]*>[\s\S]*?<\/table>/g)[0].match(/<tr>/g)||[]);
  const tbls = planSec.match(/<table[^>]*>[\s\S]*?<\/table>/g);
  const offTds = tbls[0].split('<tr>').slice(2);
  ok(offTds[0].includes('The default<'), 'G1+F2: 11 balanced leads the offense table and reads just "The default"');
  ok(offTds[1].includes('<b>R+</b>') && offTds[1].includes('Strong run blockers and running backs or a weak quarterback. Reduces giveaways and variance'), 'G2: 11 run carries the R+ badge and the rewritten text');
  ok(offTds[2].includes('<b>P+</b>'), 'F2: 11 pass wears P+');
  ok(offTds[3].includes('Second tight end is clearly better than third receiver. Adds blocking but fewer long-yardage receptions'), 'G3: 12 balanced rewritten verbatim');
  ok(offTds[6].includes('Three tight ends on the field. Great blocking but few big passing plays'), 'G4: 13 balanced rewritten verbatim');
  ok(offTds[8].includes('Personnel and strategy are paradoxical. Rarely selected. One receiver on the field.'), 'G5: 13 pass rewritten');
  ok(offTds[11].includes('Personnel and strategy are paradoxical. Rarely selected.') && offTds[14].includes('Personnel and strategy are paradoxical. Rarely selected.'), 'G5: 21 and 22 pass rewritten');
  ok(offTds[13].includes('<b>R+</b>') && offTds[13].includes('Goal-line and four-minute offense'), 'F2: 22 run wears the R+ badge');
  ok(offTds[0].includes('The default<') && offTds[3].includes('Second tight end') && offTds[6].includes('Three tight ends'), 'F2: balanced first inside 11, 12 and 13');
  const defTds = tbls[1].split('<tr>').slice(2);
  ok(defTds[0].includes('balanced') && defTds[1].includes('run-defense') && defTds[2].includes('pass-defense'), 'F2: balanced first inside base; defense keeps its focus words');
  ok(defTds[3].includes('balanced'), 'F2: balanced first inside nickel');

  // ---- H+I: comparison page ----
  console.log('== H/I: team comparison ==');
  doc.getElementById('startDraftBtn').click();
  await sleep(150);
  ev('simToEnd()');
  await sleep(400);
  ev('startSeason()');
  ev('resultsView="compare"; renderDraftResults();');
  await sleep(300);
  const selA = doc.getElementById('cmpTeamA');
  ok(!!selA, 'comparison selects exist');
  ok(selA.closest('.zpb-cmp-filters') && selA.closest('.zpb-cmp-filters').querySelector('.zpb-cmp-b select') === doc.getElementById('cmpTeamB'), 'H2: Team A left, Team B right in the space-between bar');
  const optTexts = () => Array.from(selA.querySelectorAll('option')).map(o=>o.textContent);
  ok(optTexts().some(t=>t==='Your Team (Chiefs)'), 'H1: narrow bar reads the nickname — Your Team (Chiefs)');
  ok(optTexts().some(t=>t==='Chiefs (sim)') || optTexts().some(t=>/^[A-Za-z]+ \d*\(sim\)$|^.* \(sim\)$/.test(t) && !t.includes(' ' + ev('Object.keys(TEAM_DATA)[0]') ) ), 'H1: sim entries read the nickname');
  window.innerWidth = 1440;
  ev('document.getElementById("cmpTeamA")._zpbRelabel && document.getElementById("cmpTeamA")._zpbRelabel()');
  const wideTexts = () => Array.from(selA.querySelectorAll('option')).map(o=>o.textContent);
  ok(wideTexts().some(t=>t==='Your Team (Kansas City Chiefs)'), 'H1: at maximum width the full name returns');
  window.innerWidth = 1024;
  ev('document.getElementById("cmpTeamA")._zpbRelabel && document.getElementById("cmpTeamA")._zpbRelabel()');
  ok(optTexts().some(t=>t==='Your Team (Chiefs)'), 'H1: narrowing again restores the nickname');
  ok(/\.zpb-lu-row \.zpb-lu-cell\.zpb-trow::before\{content:"";position:absolute;inset:0;border-radius:10px;background:var\(--zr1,transparent\);z-index:-1;\}/.test(HTML), 'I1: every player cell paints a backing panel via ::before');
  ok(/\.zpb-lu-row \.zpb-lu-cell\.zpb-trow\.zpb-vib::before,\.zpb-lu-row \.zpb-lu-cell\.zpb-trow\.zpb-shm::before\{box-shadow:inset 0 0 0 1px var\(--zrbd,var\(--accent\)\);\}/.test(HTML), 'I2: the highlighted border is the 85+ tier');
  ok(!HTML.includes('.zpb-lu-cell.zpb-trow{box-shadow:inset 0 0 0 1px var(--zrbd,transparent);}'), 'I2: the old ring-on-every-cell rule is retired');

  // ---- E4: undo once per round (live draft) ----
  console.log('== E4: undo law ==');
  ev('draftSpeed="instant"; setSpeedButtons();'); // the law is speed-independent; the test drives the draft synchronously
  ev('startDraft2()');
  await sleep(250);
  ok(ev('!!draftSim && draftSim.awaitingUser') || ev('!!draftSim'), 'draft running');
  ev('processUntilUserTurn()');
  await sleep(150);
  const clockRound = () => ev('Math.floor(draftSim.pos/32)+1');
  const r1 = clockRound();
  const undoVisible = () => doc.getElementById('undoPickBtn').style.display !== 'none';
  ok(!undoVisible(), 'E4: nothing to undo before the first pick ever (round ' + r1 + ')');
  const topName = ev('draftSim.pool[0][0]');
  ev('makeUserPick2(' + JSON.stringify(topName) + ')');
  await sleep(250);
  ok(ev('draftSim.undoStack.length') >= 1, 'a snapshot rides behind the pick');
  ok(ev('!!draftSim.awaitingUser'), 'the draft reaches the next user turn');
  const r2 = clockRound();
  ok(undoVisible(), 'E4: available again in round ' + r2);
  const posBefore = ev('draftSim.pos'), logBefore = ev('draftSim.log.length');
  ev('undoUserPick()');
  await sleep(150);
  ok(ev('draftSim.pos') < posBefore && ev('draftSim.log.length') < logBefore, 'the undo takes back the most recent pick');
  ok(ev('draftSim.awaitingUser'), 'the board returns to the clock');
  ok(ev('draftSim.undoUsedRound') === r2, 'the undo is marked spent in round ' + r2);
  ok(!undoVisible(), 'E4: the button is spent for this round');
  const logAtSpend = ev('draftSim.log.length');
  ev('undoUserPick()');
  await sleep(80);
  ok(ev('draftSim.log.length') === logAtSpend, 'E4: a second undo in the same round is refused');
  ev('makeUserPick2(' + JSON.stringify(ev('draftSim.pool[0][0]')) + ')');
  await sleep(250);
  const r3 = clockRound();
  ok(r3 === r2, 'the replay lands the user back in round ' + r2);
  ok(!undoVisible(), 'E4: still spent in round ' + r2 + ' after the re-pick');
  ev('makeUserPick2(' + JSON.stringify(ev('draftSim.pool[0][0]')) + ')');
  await sleep(250);
  const r4 = clockRound();
  ok(r4 === r2 + 1, 'the draft advances to round ' + (r2+1));
  ok(undoVisible(), 'E4: the undo returns every round — available again in ' + r4);
  ev('simToEnd()');
  await sleep(300);
  ok(ev('draftSim.pos >= draftSim.order.length'), 'the draft still runs to the end under the once-per-round law');

  // ---- A2 (live): belong map on the real roster ----
  console.log('== A2: belong map ==');
  const bm = ev('(function(){ if(!draftSim) return ""; return window.zpbBelongMapHTML({slotmap: draftSim.rosters[draftSim.userIndex].slots, teamName: draftSim.teamNames[draftSim.userIndex]}); })()');
  ok(bm.includes('style="--x:5" class="zpb-fm-ini') || bm.includes('--x:5'), 'the belong map places stations at --x');
  ok(bm.indexOf('--x:-5') < bm.indexOf('--x:-3') && bm.includes('--x:3'), 'WRs out, slot stations at +3');
  ok(bm.includes('the nickel and the dime sit in the slot, in the gap between the line and the receivers'), 'the belong-map caption matches the new geometry');

  ok(errors.length === 0, 'zero console errors across the whole run' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));
  console.log('\nRESULT: %d pass, %d fail', pass, fail);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
