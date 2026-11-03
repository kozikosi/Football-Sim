#!/usr/bin/env python3
# zpb_w63b.py — the wave-63 stage-2 generator: the Owner's UI round, merged onto the Muse round.
# Baseline: the stage-1 w63 bytes (the Muse QA five, md5 6f44de21…). Every anchor asserted.
# Items: A1 team tooltip · A2 position tooltip · B2 bar own line · B3 replay expands ·
#        B4 results/playoffs CTA laws · B5 badge floors · B6 awards stack · B7 COTY name/YOU ·
#        B8 leaders as cards · B10 again-q ink · C1 2pt x / y · C2 CAR + YPR ·
#        D1 ladder initials guard + lineup dropdown fitting · E1 faster beats ·
#        F1 roster tab wears the pick-grade cards · G1 four escalating round backgrounds
import hashlib, sys

SRC = '/home/z/my-project/work/w63/stage1-w63.html'
OUT = '/home/z/my-project/work/w63/Football-Sim-Z-post-blue-w63.html'
S1_MD5 = '6f44de211d111af555a1ae6658b8836d'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'baseline: {SRC} · md5 {md5} · {len(src.encode())} bytes')
if md5 != S1_MD5:
    sys.exit(f'ABORT: stage-1 md5 {md5} != {S1_MD5}')

fails = []
def rep(old, new, tag, want=1):
    global src
    n = src.count(old)
    if n != want:
        fails.append(f'{tag}: anchor count {n} (want {want})')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}' + (' ×%d' % want if want != 1 else ''))

# ---------- A2 · the drafting hover says POSITION ----------
rep('title="Wins added per season by upgrading this spot from a 70 to a 90"',
    'title="Wins added per season by upgrading this position from a 70 to a 90"', 'A2 tooltip 1')
rep('title="Extra wins per season if this spot goes from a 70 to a 90"',
    'title="Extra wins per season if this position goes from a 70 to a 90"', 'A2 tooltip 2')
rep('the extra wins per season from upgrading that spot from a 70 to a 90',
    'the extra wins per season from upgrading that position from a 70 to a 90', 'A2 tooltip 3')

# ---------- C1 · 2-Pt conversions read x / y ----------
rep("const twoPt = me.tpa ? me.tpm + ' of ' + me.tpa : '\u00b7';",
    "const twoPt = me.tpa ? me.tpm + ' / ' + me.tpa : '\u00b7'; // w63 (Owner): x / y — the word OF retires",
    'C1 two-point x / y')

# ---------- C2 · carries read CAR · YPR joins the stats ----------
rep("out.push(chip(fmtN(s.car||0), 'C'), chip(fmtN(s.rushYds||0), 'RUSHY'), chip(s.rushTD||0, 'TD')); // w28 (Owner): carries read C",
    "out.push(chip(fmtN(s.car||0), 'CAR'), chip(fmtN(s.rushYds||0), 'RUSHY'), chip(s.rushTD||0, 'TD')); // w63 (Owner): carries read CAR",
    'C2 CAR label')
rep("if(s.tgt) out.push(chip(Math.round(s.rec/s.tgt*100) + '%', 'CATCH')); // w38 (R22, Owner)",
    "if(s.tgt) out.push(chip(Math.round(s.rec/s.tgt*100) + '%', 'CATCH')); // w38 (R22, Owner)\n  if(s.rec && s.recYds) out.push(chip((s.recYds/Math.max(1,s.rec)).toFixed(1), 'YPR')); // w63 (Owner): YPR — yards per reception",
    'C2 YPR on WR/TE')
rep("if(s.car) out.push(chip((s.rushYds/Math.max(1,s.car)).toFixed(1), 'YPC')); // w38 (R22, Owner)",
    "if(s.car) out.push(chip((s.rushYds/Math.max(1,s.car)).toFixed(1), 'YPC')); // w38 (R22, Owner)\n  if(s.rec && s.recYds) out.push(chip((s.recYds/Math.max(1,s.rec)).toFixed(1), 'YPR')); // w63 (Owner): YPR",
    'C2 YPR on RB')
rep("+ schip('1,520', 'RECY', 'Receiving yards.')",
    "+ schip('1,520', 'RECY', 'Receiving yards.') + schip('12.4', 'YPR', 'Yards per reception \u00b7 receiving yards divided by catches.')",
    'C2 YPR in the guide')

# ---------- D1 · the ladder never shows a lone initial ----------
rep("  return { text: (ini || ln) + p.rest, mode: 'one' };",
    "  if(ini && ini.length < 2) ini = ln; // w63 (Owner): never a lone initial — both initials, or the last name\n  return { text: (ini || ln) + p.rest, mode: 'one' };",
    'D1 initials guard')

# ---------- B4 · the results screens: CONTINUE takes the line, the titles retire ----------
rep("""html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
    <h3 style="margin:0;">Week ${week} Results</h3>
    <div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="resetbtn" id="nextWeekBtn" style="width:auto;margin:0;padding:10px 24px;">${last?'Continue to Regular Season Review':`Continue to Week ${week+1}`}</button>${last?'':'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>'}</div></div></div>`;""",
    """html += `<div class="panel" style="margin-bottom:14px;"><button class="resetbtn" id="nextWeekBtn" style="width:100%;margin:0;padding:12px 24px;">${last?'Continue to Regular Season Review':`Continue to Week ${week+1}`}</button></div>`; // w63 (Owner): the results title retires — CONTINUE takes the whole line; SIM SEASON moves up to the tab row and down to the footer""",
    'B4 regular results panel')

rep("""html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
    <h3 style="margin:0;">${ROUND_LABELS[rk]} Results</h3>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl' && !myLost?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''}</div></div></div>`;""",
    """html += `<div class="panel" style="margin-bottom:14px;"><button class="resetbtn" id="nextRoundBtn" style="width:100%;margin:0;padding:12px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl' && !myLost?'<div style="margin-top:8px;text-align:right;"><button class="tabbtn" id="simRestBtn">Sim Playoffs</button></div>':''}</div>`; // w63 (Owner): the round-results titles retire — CONTINUE takes the line, the sim door rides the tab row and the footer""",
    'B4 playoff results panel')

rep("""id="resultsCompareBtn">TEAM COMPARISON</button>
  </div>""",
    """id="resultsCompareBtn">TEAM COMPARISON</button>${seasonState&&seasonState.phase!=='playoffs'?'<button class="tabbtn" id="simSeasonBtn" style="width:auto;">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn" id="simPlayoffsBtnTop" style="width:auto;">SIM PLAYOFFS</button>':''}
  </div>""",
    'B4 SIM rides the tab row')

rep("""function seasonOptionsHTML(){
 return `<div class="zpb-seasonopts"><button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK <span class="zpb-again-dot">·</span> <span class="zpb-rosterline">SAME ROSTER</span></button><button class="tabbtn" id="newDraftFromSeasonBtn" style="width:auto;">NEW DRAFT</button></div>`;
}""",
    """function seasonOptionsHTML(){ // w63 (Owner): CONTINUE and SIM close the page at the bottom too — the labels are filled at wire time from the real buttons
 const S = seasonState;
 const cta = (S && S.phase==='regular') ? '<button class="resetbtn" id="nextWeekBtnFoot" style="width:auto;margin:0;"></button>'
          : (S && S.phase==='playoffs') ? '<button class="resetbtn" id="nextRoundBtnFoot" style="width:auto;margin:0;"></button>' : '';
 const sim = (S && S.phase==='regular') ? '<button class="tabbtn" id="simSeasonBtnFoot" style="width:auto;">SIM SEASON</button>'
          : (S && S.phase==='playoffs') ? '<button class="tabbtn" id="simPlayoffsBtnFoot" style="width:auto;">SIM THE PLAYOFFS</button>' : '';
 return `<div class="zpb-seasonopts">${cta}${sim}<button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK <span class="zpb-again-dot">·</span> <span class="zpb-rosterline">SAME ROSTER</span></button><button class="tabbtn" id="newDraftFromSeasonBtn" style="width:auto;">NEW DRAFT</button></div>`;
}""",
    'B4 the season footer carries the CTAs')

rep("""function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');""",
    """function wireSeasonOptions(container){
 try{ // w63 (Owner): the bottom CTAs act through the real buttons — one wiring, every surface
  const nb = document.getElementById('nextWeekBtn'), nr = document.getElementById('nextRoundBtn');
  const fb = document.getElementById('nextWeekBtnFoot'), fr = document.getElementById('nextRoundBtnFoot');
  if(fb && nb){ fb.textContent = nb.textContent; fb.addEventListener('click', function(){ nb.click(); }); } else if(fb){ fb.style.display = 'none'; }
  if(fr && nr){ fr.textContent = nr.textContent; fr.addEventListener('click', function(){ nr.click(); }); } else if(fr){ fr.style.display = 'none'; }
  const sTop = document.getElementById('simPlayoffsBtnTop'), pb = document.getElementById('simRestBtn');
  const sFoot = document.getElementById('simSeasonBtnFoot'), pFoot = document.getElementById('simPlayoffsBtnFoot');
  if(sFoot){ const s = document.getElementById('simSeasonBtn'); if(s) sFoot.addEventListener('click', function(){ s.click(); }); else sFoot.style.display = 'none'; }
  if(pb){ if(pFoot) pFoot.addEventListener('click', function(){ pb.click(); }); if(sTop) sTop.addEventListener('click', function(){ pb.click(); }); }
  else { if(pFoot) pFoot.style.display = 'none'; if(sTop) sTop.style.display = 'none'; }
 }catch(e){}
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');""",
    'B4 the footer CTAs wired')

# ---------- B6 · the awards stack: title, then name, then badges ----------
rep(".zpb-awcard{display:flex;align-items:center;gap:12px;padding:10px 14px;}",
    ".zpb-awcard{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:10px 14px;} /* w63 (Owner): the award stacks — title, name, badges; the title column retires */",
    'B6 awcard stacks')
rep(".zpb-awcard .zpb-awt{font-size:.6rem;font-weight:800;letter-spacing:.14em;color:var(--sub);width:170px;flex:none;text-transform:uppercase;}",
    ".zpb-awcard .zpb-awt{font-size:.6rem;font-weight:800;letter-spacing:.14em;color:var(--sub);width:auto;text-transform:uppercase;}",
    'B6 the title column retires')

# ---------- B7 · the story honor cards read YOU ----------
rep("else if(!a.c && a.team===user) honors.push({t:a.title, n:(a.coach?a.coach+' \\u00b7 ':'')+a.team, sub:a.why});",
    "else if(!a.c && a.team===user) honors.push({t:a.title, n:(a.coach?'YOU':a.team), sub:a.why}); // w63 (Owner): the user's own COTY reads YOU",
    'B7 story honors YOU (review)')
rep("else if(!a.c && a.team===user) honorCards.push({t:a.title, n:(a.coach?a.coach+' · ':'')+a.team, sub:a.why, gold:true});",
    "else if(!a.c && a.team===user) honorCards.push({t:a.title, n:(a.coach?'YOU':a.team), sub:a.why, gold:true}); // w63 (Owner): the user's own COTY reads YOU",
    'B7 story honors YOU (story panel)')

# ---------- B8 · the league leaders wear cards on the phone ----------
rep("""const body = b.rows.map((r,i)=>`<tr class="${r.team===user?'user-row':''}"><td class="narr">${i+1}</td><td>${r.name} <span class="narr">${nick(r.team)}</span></td><td class="score" style="font-weight:700;">${r._rating!=null?Math.round(r._rating):'\\u00b7'}</td>${b.cols.map(c=>`<td class="score">${c[1](r)}</td>`).join('')}</tr>`).join('');""",
    """const body = b.rows.map((r,i)=>`<tr class="${r.team===user?'user-row':''}"><td class="narr zpb-ldr-rk">${i+1}</td><td class="zpb-ldr-name">${r.name} <span class="narr">${nick(r.team)}</span></td><td class="score zpb-ldr-rtg" data-label="RTG" style="font-weight:700;">${r._rating!=null?Math.round(r._rating):'\\u00b7'}</td>${b.cols.map(c=>`<td class="score zpb-ldr-st" data-label="${c[0]}">${c[1](r)}</td>`).join('')}</tr>`).join(''); // w63 (Owner): the leaders wear the player-card format on the phone""",
    'B8 leaders card hooks')

# ---------- E1 · the badge fades speed up (≥0.5s) ----------
rep("animation:zpbsbeat .7s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}",
    "animation:zpbsbeat .55s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*0.5s);}", 'E1 story badge beats', want=1)
rep("animation:zpbsbeat .8s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}",
    "animation:zpbsbeat .6s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*0.5s);}", 'E1 story card beats', want=2)
rep(".zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*1s);}",
    ".zpb-dfc2{opacity:0;animation:zpbCardIn .4s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.35s);} /* w63 (Owner): the depth chart fades at least half a second faster */",
    'E1 depth chart beats')

# ---------- F1 · the roster tab wears the pick-grade cards ----------
rep("""  <div class="panel" style="margin-bottom:14px;">
   <h3 style="margin-top:0;">Overall Grade <span style="color:var(--accent);">${letterGrade(overallPct)}</span></h3>
   <table><thead><tr><th>Slot</th><th>Player</th><th>Effective OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table>
  </div>
  ${seasonOptionsHTML()}""",
    """  ${pickGradePanelHTML()}${'' /* w63 (Owner): the Overall Grade table retires — the draft-pick grade cards take its place */}
  ${seasonOptionsHTML()}""",
    'F1 the roster tab wears the pick cards')

# ---------- G1 · the round class on the game cine (both builders) ----------
rep("""  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';""",
    """  const ov = document.createElement('div'); var _zrd = 'regular'; try{ if(g.roundLabel){ _zrd = /Super Bowl/i.test(g.roundLabel) ? 'superbowl' : /Conference/i.test(g.roundLabel) ? 'champ' : /Divisional/i.test(g.roundLabel) ? 'divisional' : 'wildcard'; } }catch(e){} ov.className = 'zpb-replay-ov zpb-rd-' + _zrd; // w63 (Owner): each round plays under its own sky""",
    'G1 the replay carries the round class', want=2)

# ---------- the payloads ----------
CSS = '''<style id="zpb-w63b-css">
/* ============ Z-POST-BLUE W63B · THE OWNER'S UI ROUND ============ */
/* A1 (Owner): the team tooltip — Cinzel Decorative, the team's 0.50 ink, its own color framing. */
.zpb-tt{position:fixed;z-index:80;pointer-events:none;opacity:0;transform:translateY(4px);
 transition:opacity .18s ease,transform .18s ease;
 font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:900;letter-spacing:.12em;text-indent:.12em;font-size:0.78rem;
 padding:8px 14px;border-radius:999px;color:var(--nm,var(--tTA,var(--accent)));
 background:color-mix(in srgb,var(--panel) 92%,transparent);backdrop-filter:blur(8px);
 border:1px solid color-mix(in srgb,var(--nm,var(--tTA,var(--accent))) 55%,transparent);
 box-shadow:0 10px 30px rgba(0,0,0,.35);white-space:nowrap;}
.zpb-tt.zpb-tt-on{opacity:1;transform:none;}
:root[data-theme="dark"] .zpb-tt{color:var(--nmd,var(--tTAd,var(--accent)));}
:root[data-theme="dark"] .zpb-tt{border-color:color-mix(in srgb,var(--nmd,var(--tTAd,var(--accent))) 55%,transparent);}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-tt{color:var(--nmd,var(--tTAd,var(--accent)));border-color:color-mix(in srgb,var(--nmd,var(--tTAd,var(--accent))) 55%,transparent);}
}
@media (hover: none){ .zpb-tt{display:none;} }
@media (prefers-reduced-motion: reduce){ .zpb-tt{transition:none;} }
/* B2 (Owner): the matchup bar takes its own line on a phone — it never covers the team name. */
@media (max-width:560px){
 .zpb-mcell{flex-wrap:wrap;}
 .zpb-mcell .zpb-mbar{flex:1 1 100%;order:9;margin-top:4px;}
}
/* B3 (Owner): the during-the-game panel stands tall from the pregame on — the log scrolls inside. */
.zpb-replay{min-height:min(72vh,600px);z-index:1;}
.zpb-rep-log{flex:1 1 auto;min-height:0;}
@media (max-width:480px){
 .zpb-rep-hd{padding:10px 10px;}
 .zpb-rep-team b{font-size:.74rem;}
 .zpb-rep-sc{font-size:1.2rem;}
}
/* B5 (Owner): the badge cards wrap tighter on a phone — the panel never pans. */
@media (max-width:560px){
 .zpb-sbadge{min-width:96px;flex:1 0 86px;padding:7px 8px;}
 .zpb-story-zone{gap:6px;}
}
/* B8 (Owner): the league leaders wear the player-card format on the phone. */
@media (max-width:760px){
 #ldrRtg .draft-columns{grid-template-columns:1fr !important;}
 #ldrRtg .divtable{background:none;border:none;padding:0;box-shadow:none;}
 #ldrRtg .divtable h5{text-align:center;letter-spacing:.2em;}
 #ldrRtg table,#ldrRtg tbody,#ldrRtg tr,#ldrRtg td{display:block;background:none;border:none;}
 #ldrRtg thead{display:none;}
 #ldrRtg tbody{display:flex;flex-direction:column;gap:8px;}
 #ldrRtg tr{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;padding:10px 12px;border:1px solid var(--border);border-radius:14px;background:var(--panel2);}
 #ldrRtg tr.user-row{border-color:color-mix(in srgb,var(--accent) 55%,transparent);}
 #ldrRtg td{border:none;padding:0;}
 #ldrRtg .zpb-ldr-rk{font-weight:800;color:var(--sub);min-width:20px;}
 #ldrRtg .zpb-ldr-name{flex:1 1 auto;min-width:0;font-weight:700;}
 #ldrRtg .zpb-ldr-rtg{font-family:'Cinzel Decorative',serif;font-weight:900;}
 #ldrRtg .zpb-ldr-st{display:inline-flex !important;margin-top:4px;padding:3px 10px;border:1px solid var(--border);border-radius:999px;font-size:.72rem;font-weight:700;font-variant-numeric:tabular-nums;}
 #ldrRtg .zpb-ldr-st::before{content:attr(data-label) "  ";color:var(--sub);font-weight:800;letter-spacing:.08em;}
}
/* B10 (Owner): the try-again question reads the page ink in every theme — Miami dark included. */
.zpb-again-box .zpb-again-q,.zpb-again-box .zpb-again-q b{color:var(--text);}
/* G1 (Owner): four skies for four rounds — the drama and the gold rise toward the Super Bowl. */
.zpb-replay-ov{isolation:isolate;}
.zpb-replay-ov::before,.zpb-replay-ov::after{content:"";position:absolute;inset:-25%;z-index:0;pointer-events:none;opacity:0;transition:opacity 1.4s ease;}
.zpb-replay-ov.zpb-rd-regular::before{opacity:1;
 background:radial-gradient(58% 46% at 28% 22%,color-mix(in srgb,var(--accent) 13%,transparent),transparent 70%),
            radial-gradient(52% 42% at 74% 78%,color-mix(in srgb,var(--accent) 9%,transparent),transparent 70%);
 animation:zpbRdDrift 16s ease-in-out infinite alternate;}
@keyframes zpbRdDrift{from{transform:translate3d(-2%,-1%,0) scale(1)}to{transform:translate3d(2%,2%,0) scale(1.07)}}
.zpb-replay-ov.zpb-rd-wildcard::before,.zpb-replay-ov.zpb-rd-divisional::before{opacity:1;
 background:conic-gradient(from 0deg at 30% 30%,transparent 0deg,color-mix(in srgb,var(--accent) 15%,transparent) 90deg,transparent 210deg),
            conic-gradient(from 180deg at 72% 68%,transparent 0deg,color-mix(in srgb,var(--gold2,#c9a24b) 12%,transparent) 110deg,transparent 230deg);
 animation:zpbRdSpin 30s linear infinite;}
@keyframes zpbRdSpin{to{transform:rotate(360deg)}}
.zpb-replay-ov.zpb-rd-champ::before{opacity:1;
 background:conic-gradient(from 90deg at 50% 42%,transparent 0deg,color-mix(in srgb,var(--gold2,#c9a24b) 17%,transparent) 70deg,transparent 160deg),
            conic-gradient(from 270deg at 50% 58%,transparent 0deg,color-mix(in srgb,var(--accent) 13%,transparent) 80deg,transparent 180deg),
            radial-gradient(70% 55% at 50% 50%,color-mix(in srgb,var(--gold2,#c9a24b) 10%,transparent),transparent 75%);
 animation:zpbRdSpin 22s linear infinite,zpbRdBreathe 5.5s ease-in-out infinite alternate;}
@keyframes zpbRdBreathe{from{filter:brightness(.92)}to{filter:brightness(1.12)}}
.zpb-replay-ov.zpb-rd-superbowl::before{opacity:1;
 background:conic-gradient(from 0deg at 50% 50%,transparent 0deg,color-mix(in srgb,var(--gold2,#c9a24b) 15%,transparent) 55deg,transparent 130deg,color-mix(in srgb,var(--accent) 10%,transparent) 190deg,transparent 260deg),
            radial-gradient(60% 48% at 50% 50%,color-mix(in srgb,var(--gold2,#c9a24b) 16%,transparent),transparent 72%);
 animation:zpbRdSpin 17s linear infinite,zpbRdBreathe 3.8s ease-in-out infinite alternate;}
.zpb-replay-ov.zpb-rd-superbowl::after{opacity:.9;
 background:repeating-conic-gradient(from 0deg at 50% 50%,transparent 0deg 6deg,color-mix(in srgb,var(--gold2,#c9a24b) 6%,transparent) 6deg 7.5deg);
 animation:zpbRdSpin 52s linear infinite reverse;}
@media (prefers-reduced-motion: reduce){
 .zpb-replay-ov::before,.zpb-replay-ov::after{animation:none !important;}
}
</style>
'''

JS = '''<script id="zpb-w63b-js">
// ================= Z-POST-BLUE W63B · THE OWNER'S UI ROUND (payload) =================
// A1 (Owner): the team tooltip — logos and team cells speak, in the team's color and its 0.50 ink.
(function(){
 'use strict';
 if(window.matchMedia && window.matchMedia('(hover: none)').matches) return;
 var bub = null;
 function teamOf(t){
  var el = t.closest ? t.closest('[data-ztf]') : null;
  if(el && el.getAttribute('data-ztf')) return el.getAttribute('data-ztf');
  el = t.closest ? t.closest('img.zpb-logo') : null;
  if(el && el.getAttribute('title')) return el.getAttribute('title');
  el = t.closest ? t.closest('[title]') : null;
  if(el){ var tt = el.getAttribute('title'); if(tt && typeof TEAM_DATA === 'object' && TEAM_DATA[tt]) return tt; }
  return null;
 }
 function ensure(){
  if(!bub){ bub = document.createElement('div'); bub.className = 'zpb-tt'; bub.setAttribute('aria-hidden','true'); document.body.appendChild(bub); }
  return bub;
 }
 function show(team, x, y){
  try{
   var vars = (typeof zpbRowVars === 'function') ? (zpbRowVars(team) || '') : '';
   var b = ensure();
   b.setAttribute('style', vars);
   b.textContent = team;
   b.classList.add('zpb-tt-on');
   var r = b.getBoundingClientRect();
   var px = Math.max(8, Math.min(x + 14, window.innerWidth - r.width - 8));
   var py = y - r.height - 12; if(py < 8) py = y + 20;
   b.style.left = px + 'px'; b.style.top = py + 'px';
  }catch(e){}
 }
 function hide(){ if(bub) bub.classList.remove('zpb-tt-on'); }
 document.addEventListener('mouseover', function(e){ var team = teamOf(e.target); if(team) show(team, e.clientX, e.clientY); else hide(); }, true);
 window.addEventListener('scroll', hide, true);
 document.addEventListener('mousedown', hide, true);
})();
// D1 (Owner): the lineup dropdowns wear the ladder — full name if it fits, then the last name,
// then initials that are always both (or three), never a lone initial. The value never changes.
(function(){
 'use strict';
 var meas = null;
 function ensureMeas(){
  if(!meas){ meas = document.createElement('span'); meas.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0;'; document.body.appendChild(meas); }
  return meas;
 }
 function fitSelect(sel){
  if(!sel || !sel.options || !sel.options.length) return;
  var w = sel.clientWidth - 18; if(w < 40) return;
  var m = ensureMeas();
  m.style.font = getComputedStyle(sel).font;
  function fits(txt){ m.textContent = txt; return m.getBoundingClientRect().width <= w; }
  for(var i = 0; i < sel.options.length; i++){
   var o = sel.options[i];
   var full = o.getAttribute('data-nmfull');
   if(!full){ full = o.textContent; o.setAttribute('data-nmfull', full); }
   if(fits(full)){ if(o.textContent !== full) o.textContent = full; continue; }
   var toks = full.replace(/\\./g, ' ').trim().split(/\\s+/).filter(Boolean);
   var SUF = /^(jr|sr|ii|iii|iv|v)$/i;
   while(toks.length > 1 && SUF.test(toks[toks.length-1])) toks.pop();
   var ln = toks[toks.length-1] || full;
   var want;
   if(fits(ln)) want = ln;
   else{
    var ini = toks.map(function(t){ return t.charAt(0); }).join('').toUpperCase();
    if(ini.length < 2) ini = ln; // w63 (Owner): never a lone initial
    want = ini;
   }
   if(o.textContent !== want) o.textContent = want;
  }
 }
 function fitAll(root){
  try{ (root || document).querySelectorAll('select[data-lineup], .zpb-retrow select').forEach(fitSelect); }catch(e){}
 }
 var t0 = null;
 window.addEventListener('resize', function(){ if(t0) clearTimeout(t0); t0 = setTimeout(function(){ fitAll(document); }, 180); });
 try{
  var orig = window.wireLineupEditor;
  if(typeof orig === 'function' && !orig._zpbW63b){
   var g = function(){ var r = orig.apply(this, arguments); try{ fitAll(document); }catch(e){} return r; };
   g._zpbW63b = true; window.wireLineupEditor = g;
  }
 }catch(e){}
 if(document.readyState !== 'loading') fitAll(document); else document.addEventListener('DOMContentLoaded', function(){ fitAll(document); });
})();
</script>
'''

rep('@media (prefers-reduced-motion: reduce){ .zpb-autosave{transition:none;} }\n</style>\n</body>\n</html>',
    '.zpb-autosave{transition:none;}\n}\n</style>\n' + CSS + '</body>\n</html>',
    'W63B CSS payload')

rep('<script id="zpb-w55-restore">',
    JS + '<script id="zpb-w55-restore">',
    'W63B JS payload')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

# ---------- post-checks ----------
checks = [
 ('A2 all three read position', src.count('position from a 70 to a 90') == 2 and src.count('position goes from a 70 to a 90') == 1 and src.count('spot from a 70 to a 90') == 0),
 ('C1 x / y', "me.tpm + ' / ' + me.tpa" in src),
 ('C2 CAR', "'CAR'), chip(fmtN(s.rushYds||0)" in src),
 ('C2 YPR chips', src.count("'YPR'") == 3),
 ('D1 guard', 'never a lone initial — both initials, or the last name' in src),
 ('B4 no Week results title', src.count('Week ${week} Results') == 0),
 ('B4 no Round results title', src.count('{ROUND_LABELS[rk]} Results') == 0),
 ('B4 continue full width', src.count("id=\"nextWeekBtn\" style=\"width:100%;margin:0;padding:12px 24px;\"") == 1),
 ('B4 tab-row sim', 'simPlayoffsBtnTop' in src and src.count('id="simSeasonBtn" style="width:auto;">SIM SEASON') == 1),
 ('B4 footer CTAs', 'nextWeekBtnFoot' in src and 'simPlayoffsBtnFoot' in src),
 ('B6 stacked', 'flex-direction:column;align-items:flex-start;gap:6px;padding:10px 14px;' in src),
 ('B7 YOU', src.count("(a.coach?'YOU':a.team)") == 2),
 ('B8 leaders hooks', src.count('zpb-ldr-st') == 3 and 'zpb-ldr-rk' in src and 'zpb-ldr-rtg' in src),
 ('E1 halved beats', src.count('var(--beat,0)*0.5s') == 3 and 'var(--beat,0)*0.35s' in src),
 ('F1 pick cards on the roster tab', '${pickGradePanelHTML()}${' in src),
 ('G1 round class ×2', src.count("zpb-rd-' + _zrd") == 2),
 ('G1 four skies', src.count('zpb-rd-superbowl') >= 2),
 ('A1 tooltip payload', 'zpb-tt-on' in src and 'img.zpb-logo' in src),
 ('D1 select fitter', 'select[data-lineup], .zpb-retrow select' in src),
 ('B10 ink law', '.zpb-again-box .zpb-again-q,.zpb-again-box .zpb-again-q b{color:var(--text);}' in src),
 ('w55 restore still the last script', src.rfind('<script') < src.rfind("localStorage.getItem('zpb:tab')")),
 ('no white text introduced', '#fff' not in CSS.replace('#ffffff','')),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes')
print('GENERATOR GREEN — the Owner UI round merged')
