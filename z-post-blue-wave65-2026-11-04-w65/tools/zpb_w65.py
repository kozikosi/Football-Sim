#!/usr/bin/env python3
# zpb_w65.py — the wave-65 generator (the Owner's UI round + Muse's w64 QA + the weight syncs).
# Baseline: the w64 bytes (md5 8b601f06…, gh-pages — the Owner's rename of the w63 build).
#   R1  (Owner)  the FLEX table syncs to KG's REV 4 — QB flexes ONLY to FS at -10 (P-232's named root cause)
#   R2  (Owner)  the draft's late auto-fill obeys the flex table (the flat -9 into any spot retires)
#   R3  (Owner)  the displayed weights wear Claude's de60e05 table (rankings buttons, the Guide viz + table, the MODEL preset)
#   R4  (Owner)  PLAN_K.defPredict 0.40 -> 0.15 (the architect's focus-dial fix)
#   R5  (Owner)  SIM GAME + SIM SEASON leave the Week panel, ride the header tab row at the small size
#   R6  (Owner)  the header SIM SEASON shows only while the regular season is live (never on the Super Bowl review)
#   R7  (Owner)  the Super Bowl page leads with its own centered glowing SEASON REVIEW panel (arrow retired)
#   R8  (Owner)  the roster-locked sentence retires; START PRESEASON → gains its bottom copy
#   R9  (Owner)  the Season stats panel leaves the Week 1 preview (it returns once a game has been played)
#   R10 (Owner)  the pager-hiding law lifts — the browser pager shows (Muse P0: see beyond 60 players)
#   R11 (Owner)  the draft board's first-letter bar retires in every theme
#   R12 (Owner)  the special-teams pane rows read like offense/defense — left-aligned, lines kept
#   R13 (Owner)  the depth chart fades at least half a second faster again (beat 0.12s)
#   R14 (Owner)  the player browser: ALL TEAMS in the team face + menu, ALL POSITIONS, SEARCH PLAYER NAME, no ellipses
#   R15 (Owner)  the season comparison tab rebuilds on the footer page's pattern (one header panel, pills, the score between)
#   R16 (Owner)  the footer comparison's X vs Y score takes its own line on narrow windows (both surfaces)
#   R17 (Owner)  the pregame cinematic's logos and key players move down, clear of the lines
#   R18 (Owner)  the homepage: the DRAFT button keeps its air both ways; the footer stops encroaching (the sticky law retires)
import hashlib, sys, os

SRC = '/home/z/my-project/work/w65/baseline-w64.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
W64_MD5 = '8b601f06ad2938960a636f53e709148d'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'baseline: {SRC} · md5 {md5} · {len(src.encode())} bytes')
if md5 != W64_MD5:
    sys.exit(f'ABORT: baseline md5 {md5} != {W64_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---------- R1 · the FLEX table syncs to REV 4 ----------
rep(
"""const LB_FLEX = {DE:6, DT:4, CB3:4, SS:2, FS:4, TE:6, RB:6}; // MIKE: DT -4, SS -2 (Owner)
const OLB_FLEX = {DE:2, DT:4, CB3:2, SS:4, FS:6, TE:6, RB:6}; // Owner: OLB/WILL/SAM -> edge -2, DT/SS -4, FS -6, Nickel -2
const FLEX = {
 LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},   // a tackle plays any line spot free; OL->RB -6 (Owner)
 LG:{C:0, OT:4, DT:4, RB:6}, RG:{C:0, OT:4, DT:4, RB:6}, C:{OG:0, OT:4, DT:4, RB:6},
 DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
 REDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, // edges play OLB free (Owner)
 MIKE:LB_FLEX, WILL:OLB_FLEX, SAM:OLB_FLEX,
 CB:{SS:2, FS:0, MIKE:6, WILL:4, SAM:4, WR:4, TE:6, RB:6},  // CB->MIKE -6 (Owner)
 SS:{FS:2, CB:4, CB3:0, MIKE:4, WILL:2, SAM:2, WR:4, TE:6, RB:6}, // SS -> Nickel free (Owner)
 FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
 TE:{WR:2, RB:4, MIKE:6, WILL:6, SAM:6, SS:6, FS:6}, // TE -> WR -2, RB -4 (Owner)
 HB:{TE:6}, FB:{}, QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}  // QB/OL -> RB -6, QB -> WR -6, K<->P free (Owner)
};""",
"""// w65 (P-232, the Owner's 29 Oct word via KG): the whole table is KG's REV 4 (tools/mathlab/flex.json on
// architect/engine-and-seats), translated to the site's tags: OT->LT/RT, OG->LG/RG, EDGE->REDG/LEDG,
// ILB->MIKE, OLB->WILL/SAM, RB->HB, NICKEL->CB3, DIME->CB4. A QB flexes ONLY to FS, at -10 (the old
// QB->RB/WR entries are gone — they were the model-lineup absurdities Muse measured). P->K now costs 4.
const LB_FLEX = {WILL:0, SAM:0, DT:4, FB:4, DE:6, TE:6, SS:6, FS:6, CB3:6, CB4:6}; // ILB (the MIKE row)
const OLB_FLEX = {MIKE:2, DE:4, CB3:4, DT:6, TE:6, SS:6, FS:6, FB:6, CB4:6}; // OLB (WILL and SAM share the row)
const FLEX = {
 LT:{OG:0, C:0, DT:4, FB:4, RB:6}, RT:{OG:0, C:0, DT:4, FB:4, RB:6},
 LG:{C:0, OT:4, DT:4, FB:4, RB:6}, RG:{C:0, OT:4, DT:4, FB:4, RB:6}, C:{OG:0, OT:4, DT:4, FB:4, RB:6},
 DT:{OG:4, C:4, DE:4, FB:4, OT:6, MIKE:4, WILL:4, SAM:4, RB:6},
 REDG:{DT:2, WILL:0, SAM:0, MIKE:4, FB:4, TE:6, RB:6, CB3:6}, LEDG:{DT:2, WILL:0, SAM:0, MIKE:4, FB:4, TE:6, RB:6, CB3:6},
 MIKE:LB_FLEX, WILL:OLB_FLEX, SAM:OLB_FLEX,
 CB:{FS:0, CB3:0, CB4:0, SS:2, WR:4, MIKE:6, WILL:4, SAM:4, TE:6, RB:6},
 SS:{CB3:0, CB4:0, FS:2, WILL:4, SAM:4, CB:6, MIKE:6, WR:6, TE:6, RB:6, FB:6},
 FS:{CB3:0, CB4:0, SS:2, CB:4, WR:4, MIKE:4, WILL:4, SAM:4, TE:6, RB:6},
 WR:{RB:4, TE:4, SS:4, FS:4, CB3:4, CB4:4, CB:6},
 TE:{WR:2, FB:2, RB:4, C:6, OG:6, OT:6, DE:6, DT:6, MIKE:6, WILL:6, SAM:6, SS:6, FS:6, CB3:6, CB4:6},
 HB:{FB:2, WR:4, TE:6}, FB:{RB:4, TE:4}, QB:{FS:10}, K:{P:0}, P:{K:4}
};""",
 'R1 the FLEX table = REV 4 (QB only to FS -10)')

# ---------- R2 · the auto-fill obeys the flex table ----------
rep(
"""   const g = WV_SLOT_GROUP[s];
   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    const fit = (WV_TAG_GROUP[p[1]]===g) ? p[3] : p[3]-9;
    if(fit > bestO){ bestO = fit; best = p; }
   });
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }""",
"""   const g = WV_SLOT_GROUP[s];
   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    if(flexRule(p[1], s) == null) return; // w65 (P-232): the auto-fill obeys the flex table — no flat -9 into any spot
    const fit = p[3] - flexPenaltyFor(p[1], s);
    if(fit > bestO){ bestO = fit; best = p; }
   });
   if(!best){ // the w38 last-spot emergency: nobody legal remains, so anyone may take it, honestly penalized
    (draftSim.pool||[]).forEach(p=>{
     if(used.has(p[0])) return;
     const fit = p[3] - 9;
     if(fit > bestO){ bestO = fit; best = p; }
    });
   }
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }""",
 'R2 the auto-fill respects the flex table (emergency kept)')

# ---------- R3 · the displayed weights wear Claude's de60e05 table ----------
rep(
"""const LABELS = { // w34: the label law — NICKEL / DIME, always caps, everywhere""",
"""// w65 (Owner): the DISPLAYED weight scale is Claude's re-measured table (architect/engine-and-seats
// de60e05, Owner-approved 3 Nov): wins-value per OVR point, QB anchored at 1000, 1 unit = 0.00254 wins
// over a 70 -> 90 upgrade. The engine keeps its own math; every EXPLICITLY LABELED weight on the site
// (the Position Rankings buttons, the Guide's tier viz and slot table, the MODEL preset) reads this.
const ZPB_SLOTS_W = {"QB": 1000, "WR1": 525, "DE1": 520, "OT1": 430, "CB1": 430, "DE2": 405, "OT2": 400, "DT1": 410, "CB2": 340, "C": 320, "WR2": 295, "TE1": 295, "OG1": 290, "OG2": 290, "RB1": 235, "DT2": 305, "WR3": 180, "MIKE": 265, "FS": 265, "SS": 265, "WILL": 245, "CB3": 280, "CB4": 40, "DL5": 145, "K": 200, "P": 100, "RB2": 80, "TE2": 60, "TE3": 10, "WR4": 10, "FB": 30, "SAM": 35, "SS2": 10, "FS2": 10, "LB4": 10};
function zpbSlotWins70to90(s){ return ZPB_SLOTS_W[s] != null ? ZPB_SLOTS_W[s]*0.00254 : (typeof slotWins==='function' ? slotWins(s,90)-slotWins(s,70) : 0); }
const LABELS = { // w34: the label law — NICKEL / DIME, always caps, everywhere""",
 'R3a the de60e05 table embeds (ZPB_SLOTS_W)')

rep(
"""function modelWeights(){
 const w = slotWinsPerOvr(), mx = Math.max(...Object.values(w)), out = {...DEFAULT_WEIGHTS};
 Object.keys(out).forEach(k=>{ out[k] = w[k]!=null ? Math.max(5, Math.round(w[k]/mx*700/5)*5) : Math.min(out[k],5); });
 return out;
}""",
"""function modelWeights(){
 // w65 (Owner): the MODEL preset now reads Claude's re-measured table (QB = 700 scale), not the old derivation.
 const mx = 1000, out = {...DEFAULT_WEIGHTS};
 Object.keys(out).forEach(k=>{ out[k] = ZPB_SLOTS_W[k]!=null ? Math.max(5, Math.round(ZPB_SLOTS_W[k]/mx*700/5)*5) : Math.min(out[k],5); });
 return out;
}""",
 'R3b the MODEL preset reads the new table')

rep(
"""  try{ if(typeof slotWins === 'function') wv = (slotWins(s,90)-slotWins(s,70)).toFixed(1); }catch(e){}""",
"""  try{ wv = zpbSlotWins70to90(s).toFixed(1); }catch(e){} // w65 (Owner): the button values wear Claude's re-measured weights""",
 'R3c the Position Rankings buttons read the new table')

rep(
"""function valueTiersHTML(){
 const rows = ROSTER_SLOTS.map(s=>({s, w:slotWins(s,90)-slotWins(s,70)})).sort((a,b)=>b.w-a.w);""",
"""function valueTiersHTML(){
 const rows = ROSTER_SLOTS.map(s=>({s, w:zpbSlotWins70to90(s)})).sort((a,b)=>b.w-a.w); // w65 (Owner): the Guide's tier viz wears the new weights""",
 'R3d the Guide tier viz reads the new table')

rep(
"""function slotRoleRows(){
 const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; });
 const lg = teamRatings(base), b0 = matchupModel(lg, lg, lg).structPts, STEP = 4, wpo = slotWinsPerOvr(), rows = [];""",
"""function slotRoleRows(){
 const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; });
 const lg = teamRatings(base), b0 = matchupModel(lg, lg, lg).structPts, STEP = 4, wpo = slotWinsPerOvr(), rows = [];
 const wpoLab = s=> ZPB_SLOTS_W[s]!=null ? ZPB_SLOTS_W[s]*0.00254/20 : wpo[s]; // w65 (Owner): the labeled wins-per-+1 rides the new table""",
 'R3e the slot table reads the new weights (per +1)')

rep(
"""  rows.push({slot:s, wpo:wpo[s], runShare:Math.abs(runPts)/tot, passShare:Math.abs(passPts)/tot, kick:Math.abs(kick)/tot, roles});""",
"""  rows.push({slot:s, wpo:wpoLab(s), runShare:Math.abs(runPts)/tot, passShare:Math.abs(passPts)/tot, kick:Math.abs(kick)/tot, roles}); // w65 (Owner)""",
 'R3f the slot table rows carry the new per-+1 value')

rep(
"""function slotRoleTableHTML(){
 const rows = slotRoleRows().map(r=>Object.assign({up:slotWins(r.slot,90)-slotWins(r.slot,70)}, r)).sort((a,b)=>b.up-a.up);""",
"""function slotRoleTableHTML(){
 const rows = slotRoleRows().map(r=>Object.assign({up:zpbSlotWins70to90(r.slot)}, r)).sort((a,b)=>b.up-a.up); // w65 (Owner): the 70->90 column wears the new weights""",
 'R3g the Guide 70-to-90 column reads the new table')

# ---------- R4 · the focus dial pays when it matches the offence ----------
rep(
"predict:0.38, defPredict:0.40, baseRunPct:0.39,",
"predict:0.38, defPredict:0.15, baseRunPct:0.39, // w65: the architect's de60e05 focus-dial fix — defense pays for the focus only where it bites",
 'R4 PLAN_K.defPredict 0.40 -> 0.15')

# ---------- R5 · SIM GAME + SIM SEASON ride the header tab row ----------
rep(
"""  html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h3 style="margin:0;">Week ${week} of 17</h3><div style="display:flex;gap:10px;flex-wrap:wrap;">${myGame?'':'<button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Simulate Week '+week+'</button>'}${myGame?'<button class="tabbtn zpb-ctasmall zpb-simgame" id="simGameBtn">SIM GAME</button>':''}<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button></div></div>`;""",
"""  html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h3 style="margin:0;">Week ${week} of 17</h3><div style="display:flex;gap:10px;flex-wrap:wrap;">${myGame?'':'<button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Simulate Week '+week+'</button>'}</div></div>`; // w65 (Owner): SIM GAME and SIM SEASON moved up to the header tab row — one small size, a separate panel above Play the X""",
 'R5a the Week panel keeps only its title and the big CTA')

rep(
"""   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>${seasonState&&seasonState.phase!=='playoffs'?'<button class="tabbtn" id="simSeasonBtn" style="width:auto;">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn" id="simPlayoffsBtnTop" style="width:auto;">SIM PLAYOFFS</button>':''}""",
"""   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button><span id="zpbSimTabsHost" class="zpb-simtabs"></span>${seasonState&&seasonState.phase==='regular'?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''} // w65 (Owner): SIM GAME joins the tab row (the host fills at render time) and SIM SEASON shows only while the regular season is live — never on the Super Bowl review page""",
 'R5b the header tab row carries the sim doors at the small size')

# ---------- R7 · the Super Bowl page leads with its own centered SEASON REVIEW panel ----------
rep(
""" let html = `<div class="zpb-sr-topbar"><button class="resetbtn" id="seasonReviewBtn" style="width:auto;margin:0;padding:12px 28px;">Season Review →</button></div>` + `<div class="champion-banner""",
""" let html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>` + `<div class="champion-banner""",
 'R7a SEASON REVIEW: no arrow, centered, glowing, its own panel')

# ---------- R8 · the roster-locked sentence retires; the bottom START PRESEASON copy ----------
rep(
"""   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">START PRESEASON →</button>
   <p class="narr" style="margin:2px 0 0;">Roster locked — preseason setup is the next step.</p>
   <p class="zpb-cygline">""",
"""   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">START PRESEASON →</button>
   <p class="zpb-cygline">""",
 'R8a the roster-locked sentence retires')

rep(
"""   body.appendChild(w); const _wfd = wireRowClicks(w, rk);
   { const _mi = rk.findIndex(e=>e.isUser); // w26 (Owner): your breakdown drops down by itself
     if(_mi>=0){ try{ _wfd(_mi); }catch(e){} const _dr = document.getElementById('detailrow-'+_mi); if(_dr) _dr.style.display = 'table-row'; } }
  }
 }""",
"""   body.appendChild(w); const _wfd = wireRowClicks(w, rk);
   { const _mi = rk.findIndex(e=>e.isUser); // w26 (Owner): your breakdown drops down by itself
     if(_mi>=0){ try{ _wfd(_mi); }catch(e){} const _dr = document.getElementById('detailrow-'+_mi); if(_dr) _dr.style.display = 'table-row'; } }
   { const _fs = document.createElement('div'); _fs.style.marginTop = '14px'; // w65 (Owner): START PRESEASON rides the bottom of the page too — the linear-progress law
     _fs.innerHTML = '<div class="panel" style="text-align:center;padding:16px 12px;"><button class="resetbtn zpb-startbtn" id="startSeasonBtnFoot" style="width:auto;margin:0;padding:12px 30px;">START PRESEASON →</button></div>';
     body.appendChild(_fs);
     const _fb = document.getElementById('startSeasonBtnFoot');
     if(_fb) _fb.addEventListener('click', ()=>{ startSeason(); renderSeasonTab(document.getElementById('draftResultsBody') || body); window.scrollTo(0,0); });
   }
  }
 }""",
 'R8b the bottom START PRESEASON copy on the post-draft page')

# ---------- R9 · the Season stats panel leaves the Week 1 preview ----------
rep(
""" html += lineupPanelHTML() + renderUserScheduleHTML() + renderStandingsHTML() + renderStatsTabsHTML() + seasonOptionsHTML(); // w19 (Owner): Your Team's Identity repeated the math — gone
 container.innerHTML = html;
 wireScheduleClicks(container); wireStatsTabs(); wireGamePlanPanel(container); wireSeasonOptions(container); wireLineupPanel(container);""",
""" const _anyPlayed = seasonState.schedule.some(g=>g.played); // w65 (Owner): the empty Season stats panel retires from the Week 1 preview — it returns once a game has been played
 html += lineupPanelHTML() + renderUserScheduleHTML() + renderStandingsHTML() + (_anyPlayed ? renderStatsTabsHTML() : '') + seasonOptionsHTML(); // w19 (Owner): Your Team's Identity repeated the math — gone
 container.innerHTML = html;
 wireScheduleClicks(container); wireStatsTabs(); wireGamePlanPanel(container); wireSeasonOptions(container); wireLineupPanel(container);""",
 'R9 no Season stats panel before kickoff')

# ---------- R10 · the pager shows again ----------
rep(
"""/* removals safety: no stray pager */
.pagbtn,.paginfo{display:none !important;}""",
"""/* w65 (Muse P0, measured): the old "no stray pager" law hid the browser's real pager too —
   the w63 pager (PREV · PAGE X OF 20 · NEXT) now shows and carries the Owner's page law. */""",
 'R10 the pager-hiding law lifts (the browser pager shows)')

# ---------- R12 · the special-teams pane reads like the other two ----------
rep(
"""/* A17 (Owner): the depth chart — offense and defense centered side by side, special teams a horizontal pane beneath */
.zpb-dz{grid-template-columns:1fr 1fr;max-width:980px;margin:0 auto;}
.zpb-dz-zone.zpb-dz-st{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:14px;align-items:baseline;justify-content:center;}
.zpb-dz-zone.zpb-dz-st h4{flex-basis:100%;}
.zpb-dz-zone.zpb-dz-st .zpb-dz-row{display:inline-flex;gap:10px;border-top:none;}
@media (max-width:900px){ .zpb-dz{grid-template-columns:1fr;} .zpb-dz-zone.zpb-dz-st{flex-direction:column;align-items:stretch;} }""",
"""/* A17 (Owner), w65 amendment: the special-teams pane keeps its full-width row beneath the two
   zones, but its rows read exactly like the offense and the defense — left-aligned on the same
   grid, with the horizontal lines. The centered inline-flex pane was crossing its right border. */
.zpb-dz{grid-template-columns:1fr 1fr;max-width:980px;margin:0 auto;}
.zpb-dz-zone.zpb-dz-st{grid-column:1 / -1;}
@media (max-width:900px){ .zpb-dz{grid-template-columns:1fr;} }""",
 'R12 the ST pane left-aligns with its horizontal lines')

# ---------- R13 · the depth chart fades at least half a second faster again ----------
rep(
""".zpb-dfc2{opacity:0;animation:zpbCardIn .4s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.35s);} /* w63 (Owner): the depth chart fades at least half a second faster */ /* w37 (R2, Owner): the base holds the cards until the opening cinematic fades out */""",
""".zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.12s);} /* w65 (Owner): at least half a second faster again — the beat is 0.12s, so row N lands 0.23·N + 0.1s sooner than w64 */ /* w37 (R2, Owner): the base holds the cards until the opening cinematic fades out */""",
 'R13 the depth-chart beat drops to 0.12s')

# ---------- R14 · the player browser: ALL TEAMS / ALL POSITIONS / SEARCH PLAYER NAME ----------
rep(
"""    <input id="playerSearch" placeholder="Search player name...">
    <div class="posdrop">
     <button class="posbtn" id="posBtn">All Positions</button>""",
"""    <input id="playerSearch" placeholder="SEARCH PLAYER NAME">
    <div class="posdrop">
     <button class="posbtn" id="posBtn">ALL POSITIONS</button>""",
 'R14a the browser labels read ALL-caps, no ellipses')

rep(
""" if(playerFilters.pos.size === 0) btn.textContent = 'All Positions';""",
""" if(playerFilters.pos.size === 0) btn.textContent = 'ALL POSITIONS'; // w65 (Owner)""",
 'R14b the position face stays ALL POSITIONS')

rep(
"""   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (v || '\\u00b7'));""",
"""   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (sel.id==='teamFilter' && !v) ? 'ALL TEAMS' : (v || '\\u00b7')); // w65 (Owner): the lone-dot face retires — the team filter reads ALL TEAMS""",
 'R14c the weird dot becomes ALL TEAMS')

rep(
"""   const items = isPick
    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))
    : [...TEAMS].sort((a,b)=>a.localeCompare(b)); // w26 (Owner): alphabetical everywhere the homepage dropdown is used
   pop.innerHTML = items.map(t=>{
    const st = isPick ? tst : pack(t);
    const txt = isPick ? (t==='random' ? 'Random' : 'Pick ' + t) : t;""",
"""   const items = isPick
    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))
    : (sel.id==='teamFilter' ? [''].concat([...TEAMS].sort((a,b)=>a.localeCompare(b))) : [...TEAMS].sort((a,b)=>a.localeCompare(b))); // w26 (Owner): alphabetical everywhere the homepage dropdown is used · w65: ALL TEAMS leads the team filter's menu
   pop.innerHTML = items.map(t=>{
    const st = isPick ? tst : pack(t);
    const txt = isPick ? (t==='random' ? 'Random' : 'Pick ' + t) : (sel.id==='teamFilter' && t==='') ? 'ALL TEAMS' : t;""",
 'R14d the opened menu offers ALL TEAMS again')

# ---------- R15/R16 · the comparison tab rebuilds on the footer page's pattern ----------
rep(
"""function renderComparisonTab(container, draftEntries, realEntries){
 container.innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <div class="filters zpb-cmp-filters">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);" aria-label="Team A">
     <select id="cmpTeamA"></select>
    </label>
    <label class="zpb-cmp-b" style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);" aria-label="Team B">
     <select id="cmpTeamB"></select>
    </label>
   </div>
  </div>
  <div id="cmpResult"></div>
 `;""",
"""function renderComparisonTab(container, draftEntries, realEntries){
 container.insertAdjacentHTML('afterbegin', '<div class="panel zpb-bts-top" style="margin-bottom:14px;text-align:center;"><button class="resetbtn zpb-bts" data-bts="1" style="width:auto;margin:0;padding:10px 26px;">BACK TO SEASON</button></div>'); // w65 (Owner): the glowing door back, at the top of the tab
 container.insertAdjacentHTML('beforeend', `
  <div class="panel zpb-cmp-own" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside zpb-cmpside-a" id="zpbTabSlotA"></span>
    <span class="zpb-cmpscore" id="zpbTabScore"><span class="zpb-cmpsub">pick two teams</span></span>
    <span class="zpb-cmpside zpb-cmpside-b" id="zpbTabSlotB"></span>
   </div>
  </div>`);
 container.insertAdjacentHTML('beforeend', '<div id="cmpResult"></div>'); // w65 (Owner): the tab copies the footer page — the two pill dropdowns and the X vs Y score share one header panel""",
 'R15a the tab header: one panel, the footer pattern')

# the footer page's head gets the same grid classes so the narrow law is shared
rep(
"""   <div class="zpb-cmphead">
    <span class="zpb-cmpside" id="zpbCmpSlotA"></span>
    <span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.txM||pkA.accL};--pkcd:${pkA.txd}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.txM||pkB.accL};--pkcd:${pkB.txd}"`:''}>${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside" id="zpbCmpSlotB"></span>
   </div>""",
"""   <div class="zpb-cmphead">
    <span class="zpb-cmpside zpb-cmpside-a" id="zpbCmpSlotA"></span>
    <span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.txM||pkA.accL};--pkcd:${pkA.txd}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.txM||pkB.accL};--pkcd:${pkB.txd}"`:''}>${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside zpb-cmpside-b" id="zpbCmpSlotB"></span>
   </div>""",
 'R16a the footer head joins the shared narrow law')

# the tab's renderCompare paints the score into the shared header and drops its old two panels
rep(
""" function renderCompare(){
  const a = resolve(selA.value), b = resolve(selB.value);
  const resultDiv = document.getElementById('cmpResult');
  if(!a || !b){ resultDiv.innerHTML=''; return; }
  const units = unitComparisonHTML(a.pool, b.pool, a.teamName, b.teamName); // w28 (Owner): the grades/edges verdict sentence is gone · w46 (O7): the rows wear the teams' halfway ink
  resultDiv.innerHTML = `
   <div class="panel" style="margin-bottom:14px;">
    <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;font-size:1.1rem;font-weight:700;gap:10px;">
     <span>${a.label}</span><span class="zpb-cmpscore" style="color:var(--accent);text-align:center;">${Math.round(a.score)} vs ${Math.round(b.score)}</span><span style="text-align:right;">${b.label}</span>
    </div>
   </div>
   <div class="panel" style="margin-bottom:14px;">
    <h4 style="margin-top:0;">Starter-by-Starter</h4>""",
""" function renderCompare(){
  const a = resolve(selA.value), b = resolve(selB.value);
  const resultDiv = document.getElementById('cmpResult');
  if(!a || !b){ resultDiv.innerHTML=''; return; }
  const units = unitComparisonHTML(a.pool, b.pool, a.teamName, b.teamName); // w28 (Owner): the grades/edges verdict sentence is gone · w46 (O7): the rows wear the teams' halfway ink
  { const sc = document.getElementById('zpbTabScore'); // w65 (Owner): the X vs Y score lives in the header panel, exactly like the footer page
   if(sc){ const pkA2 = (typeof zpbPackFor==='function') ? zpbPackFor(a.teamName) : null, pkB2 = (typeof zpbPackFor==='function') ? zpbPackFor(b.teamName) : null;
    sc.innerHTML = '<span class="zpb-cmpnum"'+(pkA2?` style="--pkc:${pkA2.txM||pkA2.accL};--pkcd:${pkA2.txd}"`:'')+'>'+Math.round(a.score)+'</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"'+(pkB2?` style="--pkc:${pkB2.txM||pkB2.accL};--pkcd:${pkB2.txd}"`:'')+'>'+Math.round(b.score)+'</span>'; } }
  resultDiv.innerHTML = `
   <div class="panel" style="margin-bottom:14px;">
    <h4 style="margin-top:0;">Starter-by-Starter</h4>""",
 'R15b the score paints in the shared header; the two broken panels retire')

# the tab's selects move into the header slots (the footer page's move, w26)
rep(
""" const selA = document.getElementById('cmpTeamA');
 const selB = document.getElementById('cmpTeamB');
 buildOptions(selA, 'YOU');""",
""" const selA = document.getElementById('cmpTeamA');
 const selB = document.getElementById('cmpTeamB');
 { const _sa = document.getElementById('zpbTabSlotA'), _sb = document.getElementById('zpbTabSlotB'); // w65 (Owner): the dropdowns sit in the header row, the footer page's composition
   if(_sa) _sa.appendChild(selA); if(_sb) _sb.appendChild(selB); }
 buildOptions(selA, 'YOU');""",
 'R15c the dropdowns move into the header slots')

# ---------- R17 · the pregame logos and key players move down ----------
rep(
"""@media (max-width:600px){
 .zpb-rep-intro{justify-content:flex-start;padding-top:22px;gap:9px;}
 .zpb-intro-logos{gap:12px;}""",
"""@media (max-width:600px){
 .zpb-rep-intro{justify-content:flex-start;padding-top:64px;gap:9px;} /* w65 (Owner): the logos and the key players sit lower — the header line shows clean above them */
 .zpb-intro-logos{gap:12px;}""",
 'R17a the pregame marquee moves down')

print('--- part 1 anchors applied ---')
if fails:
    print('ANCHOR FAILURES so far:'); [print('  ' + f) for f in fails]
    sys.exit(1)

# ================================ PART 2 payloads appended by zpb_w65b.py ================================
MARKER = '#@@W65_PART2@@'
if MARKER not in src:
    pass  # part 2 runs as a separate generator over this output
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\npart 1 written: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('PART 1 GREEN')
