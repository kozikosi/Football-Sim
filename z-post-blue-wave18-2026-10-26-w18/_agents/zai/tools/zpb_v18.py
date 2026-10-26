#!/usr/bin/env python3
"""Z-post-blue WAVE 18 build module — Owner round 12 (26 Oct).

Owner's words are law verbatim. Engine math does NOT move one byte this wave.
  W18-1  Team Comparison (footer): top panel removed; the two dropdowns take the place of
         the team names in the Starter-by-Starter panel header; the "83 vs 79" score numbers
         wear each team's own color (theme-aware); every panel thin (520px cap) even at a
         max desktop window; the effective-ratings note removed from the FOOTER comparison
         only (the in-season comparison keeps it).
  W18-2  Unit Comparison rows reordered: OFFENSE, QB, RBs, TEs, OL, Run Game, Pass Game,
         Pass Defense, Run Defense, Defensive Line, Linebackers, Secondary, Defense.
  W18-3  Field map: CBs out wider, CB3 -> NICKEL, DIME on its own deep station; offense WRs
         on the line of scrimmage (2 right, 1 left) with the CBs mirrored opposite; and ALL
         flexes ride at their stations as the same gold->wine chips (hover = sentence form).
  W18-4  Guide text pass: "Who decides?" one sentence per line + "play your own way";
         Stars bullet, "They can also flex a player.", "(5 minus the backs and tight ends)"
         removed; duplicated "Auto, philosophy and custom plans" white-text version removed;
         COACHING PHILOSOPHY (uppercase, no period) + side-by-side AUTO / CUSTOM panels;
         "baked into every projection" removed, home-field line moved into THE MATH.
  W18-5  New Guide panel between COACHING and THE MATH: DEFENSE: 4-3, 3-4, NICKEL, DIME —
         dot-diagram front cards (gold dots = corners, dashed dot = dime) + R+/P+ leans.
  W18-6  Glossary opens with every starting spot in depth chart order, one line each.
  W18-7  Draft board: "change" link gone (the proposed fill position is the control); player
         list stretches to the bottom of the panel (equal to the depth chart panel); ALL/NONE
         smaller + quiet + left-aligned; "Your Roster" fades in and out above the panel;
         Pick order / Depth chart toggle restyled as the 4-3/3-4 segmented pill, toggles on
         opposite sides of the header; Dime confirmed in the depth-chart view.
  W18-8  Round-12 micro-directive: "Lower points allowed is better..." paragraph removed;
         every remaining "third corner(backs)" now reads "an extra defensive back".
"""

import sys, hashlib

SRC = '/home/z/my-project/build_w17.html'
OUT = '/home/z/my-project/build_w18.html'
SRC_MD5 = 'ddb9af524604d136e95d2f97eab6421e'          # wave 17

html = open(SRC, encoding='utf-8').read()
fails = []

got = hashlib.md5(html.encode()).hexdigest()
if got != SRC_MD5:
    fails.append(f'source md5 {got} != wave-17 pin {SRC_MD5}')

def rep(label, old, new, cnt=1):
    global html
    n = html.count(old)
    if n != cnt:
        fails.append(f'{label}: found {n}x, expected {cnt}')
        return
    html = html.replace(old, new)

def span_replace(label, start_anchor, end_anchor, new):
    """Replace [start_anchor .. end_anchor) keeping end. Both anchors unique."""
    global html
    i = html.find(start_anchor)
    if i < 0 or html.find(start_anchor, i + 1) >= 0:
        fails.append(f'{label}: start anchor not unique'); return
    j = html.find(end_anchor, i + len(start_anchor))
    if j < 0 or html.find(end_anchor, j + 1) >= 0:
        fails.append(f'{label}: end anchor not unique after start'); return
    html = html[:i] + new + html[j:]

# ============ W18-A · CSS block ============

rep('W18-A1 v18 CSS block',
"""/* ============ end v15 ============ */
</style>""",
"""/* ============ end v15 ============ */
/* ============ v18: Owner round 12 ============ */
/* Team Comparison: thin panels, dropdowns as the team names, team-colored score */
#homeCmpResult{max-width:520px;margin:0 auto;}
.zpb-cmpnum{color:var(--pkc,var(--tA2,var(--accent)));}
:root:not([data-theme="light"]) .zpb-cmpnum{color:var(--pkcd,var(--tA2,var(--accent)));}
:root[data-theme="dark"] .zpb-cmpnum{color:var(--pkcd,var(--tA2,var(--accent)));}
#homeCmpResult .zpb-cmpside select{font-weight:700;max-width:170px;}
/* Draft board: the player list reaches the bottom of the panel (equal to the depth chart panel) */
.draft-columns>.panel{display:flex;flex-direction:column;}
#draftTableWrap{flex:1 1 0;max-height:none;}
#draftRosterList{flex:1 1 auto;}
/* ALL / NONE: smaller, quiet like the buttons beside them, text to the left */
.zpb-allnone .chip{font-size:.62rem !important;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;}
.zpb-allnone .chip span{text-align:left !important;}
/* "Your Roster" fades in and out above the depth chart panel */
@keyframes zpbFadeIO{0%,100%{opacity:.38;}50%{opacity:1;}}
.zpb-rosterfade{animation:zpbFadeIO 4.4s ease-in-out infinite;}
@media (prefers-reduced-motion:reduce){.zpb-rosterfade{animation:none;}}
.zpb-rosterhead{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;}
.draft-columns{grid-template-columns:1fr 340px;}
/* Pick order / Depth chart toggle — the same segmented look as the 4-3 / 3-4 toggle */
.zpb-viewtoggle{display:inline-flex;border:1px solid var(--rosehair,var(--border));border-radius:999px;overflow:hidden;vertical-align:middle;}
.zpb-viewtoggle button{border:none;background:transparent;color:var(--sub);font-weight:700;font-size:0.68rem;padding:6px 11px;cursor:pointer;letter-spacing:.08em;font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;}
.zpb-viewtoggle button.zpb-view-on{background:var(--selwash2);color:var(--tA2,var(--gold3));}
/* the proposed fill position is itself the control (no "change" link) */
a.zpb-fillab{font:inherit;color:inherit;border-bottom:1px dashed var(--rosehair,var(--border));text-decoration:none;cursor:pointer;}
a.zpb-fillab:hover{color:var(--tA2,var(--accent));border-bottom-color:var(--tA2,var(--accent));}
/* Guide: DEFENSE panel — the four packages drawn as fronts */
.zpb-defgrid{display:flex;flex-wrap:wrap;gap:10px;max-width:940px;margin:0 auto;justify-content:center;}
.zpb-defcard{flex:1 1 210px;min-width:0;max-width:100%;background:var(--panel2);border:1px solid var(--border);border-radius:12px;padding:10px 12px;text-align:center;}
.zpb-defcard h5{margin:0 0 8px;font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:.92rem;color:var(--tA2,var(--gold3));letter-spacing:.08em;}
.zpb-defdots{display:flex;align-items:center;justify-content:center;gap:5px;margin:5px 0;}
.zpb-defdots .zpb-deflab{width:26px;text-align:right;font-size:.56rem;font-weight:800;letter-spacing:.12em;color:var(--sub);}
.zpb-defdots i{width:13px;height:13px;border-radius:50%;background:var(--rose,var(--accent2));border:1px solid var(--rosehair,var(--border));}
.zpb-defdots i.zpb-dcb{background:var(--gold2,var(--accent));border-color:var(--gold3,var(--border));}
.zpb-defdots i.zpb-dim{background:transparent;border-style:dashed;}
.zpb-defcard p{margin:7px 0 0;font-size:.74rem;line-height:1.5;color:var(--sub);}
.zpb-defstr{margin-top:7px;display:flex;gap:6px;justify-content:center;}
/* Field map: flex chips ride under each row in the same chip language; wide rows spread to the sidelines */
.zpb-fm{max-width:560px;}
.zpb-fm-row.zpb-fm-wide{justify-content:space-between;padding:0 4px;}
.zpb-fm-row.zpb-fm-line{gap:4px;}
.zpb-fm-rowflex{display:flex;flex-wrap:wrap;gap:3px 10px;justify-content:center;margin:2px 0 9px;}
.zpb-fm-grp{display:inline-flex;align-items:flex-start;gap:3px;max-width:100%;}
.zpb-fm-grp>b{font-size:.56rem;font-weight:800;letter-spacing:.08em;color:var(--sub);margin-top:4px;min-width:30px;text-align:right;}
.zpb-fm-rowflex .zpb-ftchip{font-size:.54rem;padding:1px 6px;max-width:150px;white-space:normal;line-height:1.25;text-align:left;}
.zpb-fm-rowflex i.zpb-ft-free{background:var(--gold2,var(--accent));color:var(--ongold,var(--text));border:1px solid var(--gold3,var(--border));}
.zpb-fm-rowflex i.zpb-ft-2{background:color-mix(in srgb,var(--gold2,var(--accent)) 72%,var(--rose,var(--accent2)) 28%);color:var(--ongold,var(--text));border:1px solid color-mix(in srgb,var(--gold3,var(--border)) 55%,var(--rose,var(--accent2)) 45%);}
.zpb-fm-rowflex i.zpb-ft-4{background:color-mix(in srgb,var(--gold2,var(--accent)) 38%,var(--rose,var(--accent2)) 62%);color:var(--ongold,var(--text));border:1px solid var(--rosehair,var(--border));}
.zpb-fm-rowflex i.zpb-ft-6{background:var(--rose,var(--accent2));color:var(--ongold,var(--text));border:1px solid var(--rosehair,var(--border));}
@media (max-width:640px){.zpb-fm-rowflex{display:none;}}
@media (max-width:430px){.zpb-fm-line i{min-width:28px;padding:0 2px;font-size:.58rem;}}
/* AUTO / CUSTOM choice panels, side by side */
.zpb-autocust{display:grid;grid-template-columns:1fr 1fr;gap:0 18px;align-items:stretch;}
@media (max-width:640px){.zpb-autocust{grid-template-columns:1fr;}}
/* ============ end v18 ============ */
</style>""")

# ============ W18-B · Team Comparison (footer) ============

rep('W18-B1 static selects move into a hidden holder',
""" <div class="view" id="viewCompare">
  <div class="panel" style="margin-bottom:14px;">
   <div class="filters">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);align-items:center;">
     <select id="homeCmpA" aria-label="Team A"></select>
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);align-items:center;">
     <select id="homeCmpB" aria-label="Team B"></select>
    </label>
   </div>
  </div>
  <div id="homeCmpResult"></div>
 </div>""",
""" <div class="view" id="viewCompare">
  <div id="zpbCmpSelHold" style="display:none;">
   <select id="homeCmpA" aria-label="Team A"></select>
   <select id="homeCmpB" aria-label="Team B"></select>
  </div>
  <div id="homeCmpResult"></div>
 </div>""")

rep('W18-B2 renderHomeComparison rebuilt (top panel gone, dropdowns as team names, team-colored score, note off)',
""" document.getElementById('homeCmpResult').innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside">${a} <span class="zpb-cmpsub">(#${rankOf(a)})</span></span>
    <span class="zpb-cmpscore"><span style="color:var(--tA2,var(--accent));">${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span style="color:var(--tA2,var(--accent));">${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside">${b} <span class="zpb-cmpsub">(#${rankOf(b)})</span></span>
   </div>
  </div>
  <div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Starter-by-Starter</h4>${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b)}</div>
  <div class="panel"><h4 style="margin-top:0;">Unit Comparison</h4>${units.html}</div>`;
}""",
""" const pkA = (typeof zpbPackFor==='function') ? zpbPackFor(a) : null, pkB = (typeof zpbPackFor==='function') ? zpbPackFor(b) : null;
 document.getElementById('homeCmpResult').innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside" id="zpbCmpSlotA"></span>
    <span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.accL};--pkcd:${pkA.accD}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.accL};--pkcd:${pkB.accD}"`:''}>${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside" id="zpbCmpSlotB"></span>
   </div>
   <h4 style="margin:12px 0 4px;text-align:center;">Starter-by-Starter</h4>
   ${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b, false)}
  </div>
  <div class="panel"><h4 style="margin-top:0;">Unit Comparison</h4>${units.html}</div>`;
 const zpbHold = document.getElementById('zpbCmpSelHold');
 if(zpbHold){ zpbHold.appendChild(selA); zpbHold.appendChild(selB); }
 const zpbSlotA = document.getElementById('zpbCmpSlotA'); if(zpbSlotA) zpbSlotA.appendChild(selA);
 const zpbSlotB = document.getElementById('zpbCmpSlotB'); if(zpbSlotB) zpbSlotB.appendChild(selB);
}""")

rep('W18-B3 renderLineupTableHTML gains showNote',
'function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight){',
'function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight, showNote){')

rep('W18-B3b the RUNTIME reassignment also gains showNote (it overwrites the declaration)',
'renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight){',
'renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight, showNote){')

rep('W18-B4 footer note gated off (season keeps it)',
'return `<div class="zpb-lu">${rows}</div><p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;\n}\nfunction countLineupEdges(slotmapA, slotmapB){',
'return `<div class="zpb-lu">${rows}</div>${showNote===false?\'\':\'<p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>\'}`;\n}\nfunction countLineupEdges(slotmapA, slotmapB){')

rep('W18-B4b runtime renderer note gate (the copy that actually serves the pages)',
'return `<div class="zpb-lu">${rows}</div><p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;\n};',
'return `<div class="zpb-lu">${rows}</div>${showNote===false?\'\':\'<p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>\'}`;\n};')

rep('W18-B5 unit comparison menu — Owner order',
"const DETAIL_KEYS = ['QB','RB','WR','TE','OL','RUN','PASS','OFFENSE','DL','SEC','PRIMCOV','RUND','PASSD','DEFENSE'];",
"const DETAIL_KEYS = ['OFFENSE','QB','RB','TE','OL','RUN','PASS','PASSD','RUND','DL','LB','SEC','DEFENSE'];")

# ============ W18-C · Guide text pass ============

rep('W18-C1 who decides — one sentence per line + play your own way',
"""  + zpbSw('Who decides? You do.', 'The math suggests the arrangement that wins the most games. Accept it, change any spot yourself, or deliberately play less efficiently. The computer teams always use the math\\u2019s best arrangement.')""",
"""  + zpbSw('Who decides? You do.', 'The math suggests the arrangement that wins the most games.<br>Accept it, change any spot yourself, or play your own way.<br>The computer teams always use the math\\u2019s best arrangement.')""")

rep('W18-C2 coach guide — home-field line leaves, philosophy retitled, AUTO/CUSTOM side by side',
""" h += '<p class="narr" style="margin:8px 0 0;">Home field is worth +1.7 points a game in the model. It is baked into every projection — one reason home teams win slightly more often.</p>'
   + zpbPkgVizHTML()
   + '<div class="zpb-swgroup">'
   + zpbSw('Coaching philosophy.', 'Your default style, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout it, and the recaps point out when you stray from it.')
   + '</div>';""",
""" h += zpbPkgVizHTML()
   + '<div class="zpb-swgroup">'
   + zpbSw('COACHING PHILOSOPHY', 'Your default style, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout it, and the recaps point out when you stray from it.')
   + '</div>'
   + '<div class="zpb-swgroup zpb-autocust">'
   + zpbSw('AUTO', 'The math predicts the best personnel.')
   + zpbSw('CUSTOM', 'You choose how you want to play.')
   + '</div>';""")

rep('W18-C3 the duplicated white-text version removed completely',
""" const coach = `<p style="margin:4px 0;"><b>Personnel codes.</b></p>${persTableHTML()}
  <h5 class="narr" style="margin:14px 0 6px;">Auto, philosophy and custom plans</h5>
  <ul class="gl"><li><b>Coaching philosophy</b> — your default style on offense and defense, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout your philosophy, and the recaps point out when you stray from it.</li>
  <li><b>Auto (recommended)</b> — each week the model picks the best plan from both rosters. It never reacts to a plan it cannot see, and it opens up the offense late when trailing.</li>
  <li><b>Custom</b> — you lock in your own personnel, strategy and defense every week.</li></ul>`;""",
""" const coach = `<p style="margin:4px 0;"><b>Personnel codes.</b></p>${persTableHTML()}`;""")

rep('W18-C4 Stars bullet removed',
"""  <li><b>Stars</b> (★★ / ★ / ☆) — your own thumb on the scale. A position marked ★★ counts 1.5× in Priority, ★ counts 1× and ☆ counts 0.5×. They only change the ranking, never the math.</li>
""", "")

rep('W18-C5 "They can also flex a player." removed',
' with a little personal taste for certain positions and some randomness. They can also flex a player.</p>',
' with a little personal taste for certain positions and some randomness.</p>')

rep('W18-C6 "(5 minus the backs and tight ends)" removed',
'so the wide receivers fill whatever is left of the 11 (5 minus the backs and tight ends).',
'so the wide receivers fill whatever is left of the 11.')

rep('W18-C7 home-field line moves into THE MATH (and the round-12 paragraph leaves)',
"""  <p class="narr">Lower points allowed is better. Base moves a linebacker onto the field for a third corner: stronger against the run (+0.8 run-defense rating points) and weaker in coverage (−0.8). A focus shifts another 2.0 / 1.5 rating points between run defense and coverage and moves the pass rush by 0.6, at a small predictability cost.</p>`;""",
"""  <p class="narr" style="margin:8px 0 0;">Home field is worth +1.7 points a game in the model.</p>`;""")

rep('W18-C8 nickel fits row — defensive back wording',
"'nickel|neutral':'The modern default: a third corner on the field.'",
"'nickel|neutral':'The modern default: an extra defensive back on the field.'")

rep('W18-C9 nickel package card — defensive back wording',
'Nickel takes a linebacker off and puts the third corner on.',
'Nickel takes a linebacker off and puts an extra defensive back on.')

rep('W18-C10 nickel defense desc — defensive back wording',
"'Five defensive backs: the third cornerback replaces a linebacker. Better in coverage, a little softer against the run. The modern default.'",
"'Five defensive backs: an extra defensive back replaces a linebacker. Better in coverage, a little softer against the run. The modern default.'")

rep('W18-C11 board Nickel/Dime tip — defensive back wording',
"ND:{n:'Nickel / Dime', tip:'Nickel: the third cornerback in five-defensive-back packages.",
"ND:{n:'Nickel / Dime', tip:'Nickel: the extra defensive back in five-defensive-back packages.")

rep('W18-C12 glossary Starter line — defensive back wording',
'<li><b>Starter / depth chart</b> — the 26 starting spots on this site (11 on offense, 11 on defense with a third cornerback, plus a kicker, a second back, a second tight end and a third linebacker). The depth chart lists who starts where.</li>',
'<li><b>Starter / depth chart</b> — the 26 starting spots on this site (11 on offense, 11 on defense with an extra defensive back, plus a kicker, a second back, a second tight end and a third linebacker). The depth chart lists who starts where.</li>')

rep('W18-C13 glossary Nickel line — defensive back wording',
'<li><b>Nickel</b> — a defense with five defensive backs instead of four; the third cornerback comes in for a linebacker.</li>',
'<li><b>Nickel</b> — a defense with five defensive backs instead of four; an extra defensive back comes in for a linebacker.</li>')

rep('W18-C14 glossary runtime replace retired (wording is baked above)',
""" h = h.replace('the 26 starting spots on this site', 'the 28 starting spots on this site');
 h = h.replace('a third cornerback', 'CB3 / ' + 'Nickel');""",
""" h = h.replace('the 26 starting spots on this site', 'the 28 starting spots on this site');""")

rep('W18-C15 glossary opens with every spot in depth chart order',
"""window.zpbGlossHTML = function(){
 let h = (typeof termsHTML==='function') ? termsHTML() : '';""",
"""// W18: the glossary opens with every starting spot, in depth chart order, one small line each.
window.zpbGlossPositionsHTML = function(){
 const TIPS = {QB:'Touches the ball on every offensive snap — throws it, hands it off, or runs it.',RB:'Carries the ball and catches short passes out of the backfield.',FB:'Leads the block for the runner and catches the occasional short pass.',WR:'Runs the routes and catches the ball downfield.',TE:'Blocks like a lineman and catches like a receiver.',OT:"Protects the quarterback's blind side and blocks the edge on runs.",OG:'Blocks the interior — pass protection first, run blocking a close second.',C:'Anchors the line, makes the protection calls, and snaps the ball.',DE:'Rushes the passer off the edge and sets the edge against the run.',DT:'Takes on blockers inside — stops runs first, pressures the quarterback second.',MIKE:'The middle linebacker — makes the calls, stops the run, covers the middle.',OLB:'The outside linebackers — chase runs, cover backs and tight ends, sometimes rush.',CB:'Covers receivers man-to-man on the outside.',SS:'The box safety — supports against the run and covers tight ends and backs.',FS:'The deep safety — reads the quarterback and takes away the deep pass.',K:'Kicks the field goals and extra points.',P:'Punts — and pins teams back with hidden yards.'};
 const FAM = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',FB:'FB',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'OLB',SAM:'OLB',CB1:'CB',CB2:'CB',CB3:'NK',FS:'FS',SS:'SS',K:'K',P:'P'};
 const FAMNAME = {QB:'Quarterback',RB:'Running Back',FB:'Fullback',WR:'Wide Receiver',TE:'Tight End',OT:'Offensive Tackle',OG:'Offensive Guard',C:'Center',DE:'Defensive Edge',DT:'Defensive Tackle',MIKE:'Middle Linebacker',OLB:'Outside Linebacker',CB:'Cornerback',SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter',NK:'Nickel Cornerback'};
 const NK = 'the extra defensive back in five-defensive-back packages.';
 const DM = 'plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.';
 const slots = (typeof ROSTER_SLOTS!=='undefined') ? ROSTER_SLOTS : [];
 let out = '<p class="narr" style="margin:4px 0;"><b>Every starting spot, in depth chart order:</b></p><ul class="gl">';
 slots.forEach(s=>{
  const f = FAM[s]; const lb = (typeof LABELS!=='undefined'&&LABELS[s])||s;
  if(s==='CB3'){ out += `<li><b>CB3 — Nickel Cornerback</b> — ${NK}</li><li><b>Dime</b> — ${DM}</li>`; return; }
  if(!f || !TIPS[f]) return;
  out += `<li><b>${lb} · ${FAMNAME[f]}</b> — ${TIPS[f]}</li>`;
 });
 out += '</ul>';
 return out;
};
window.zpbGlossHTML = function(){
 let h = ((typeof window.zpbGlossPositionsHTML==='function') ? window.zpbGlossPositionsHTML() : '') + ((typeof termsHTML==='function') ? termsHTML() : '');""")

# ============ W18-D · DEFENSE panel (4-3 / 3-4 / NICKEL / DIME) ============

rep('W18-D1 the defense front cards',
"""let _guideHtml = null;""",
"""// W18: DEFENSE panel — the four packages drawn as fronts (Owner: creative viz, like the line-of-scrimmage map).
window.zpbDefGuideHTML = function(){
 const dots = (lab, n, extra)=> '<div class="zpb-defdots"><span class="zpb-deflab">'+lab+'</span>' + Array.from({length:n},(_,i)=>'<i'+((extra&&extra[i])?' class="'+extra[i]+'"':'')+'></i>').join('') + '</div>';
 const str = (run, pass)=> '<div class="zpb-defstr"><span class="zpb-emph zpb-emph-b" title="Leans against the run"><b>'+(run?'R+':'\\u00b7')+'</b></span><span class="zpb-emph zpb-emph-b" title="Leans against the pass"><b>'+(pass?'P+':'\\u00b7')+'</b></span></div>';
 const card = (t, body, p, run, pass, tip)=>'<div class="zpb-defcard" title="'+tip.replace(/"/g,'&quot;')+'"><h5>'+t+'</h5>'+body+'<p>'+p+'</p>'+str(run,pass)+'</div>';
 const c43 = dots('DL',4)+dots('LB',3)+dots('DB',4,['zpb-dcb','zpb-dcb','','']);
 const c34 = dots('DL',3)+dots('LB',4)+dots('DB',4,['zpb-dcb','zpb-dcb','','']);
 const cNK = dots('DL',4)+dots('LB',2)+dots('DB',5,['zpb-dcb','zpb-dcb','zpb-dcb','','']);
 const cDM = dots('DL',4)+dots('LB',1)+dots('DB',6,['zpb-dcb','zpb-dcb','zpb-dcb','zpb-dim','','']);
 return '<div class="zpb-defgrid">'
  + card('4-3', c43, 'Four down linemen and three linebackers — the classic front. The SAM walks out over the tight end and the front four does the rushing.', 1, 0, '4-3 front: four defensive linemen, three linebackers, four defensive backs. Stronger against the run; a little thinner in coverage.')
  + card('3-4', c34, 'Three down linemen and four linebackers. The nose tackle holds the middle while two outside linebackers stand up — they rush on one call and drop on the next.', 1, 1, '3-4 front: an end slides out to linebacker, so the two outside linebackers become the pass rush. The same personnel, a different shape.')
  + card('NICKEL', cNK, 'A linebacker comes off and an extra defensive back — the nickel — comes in: five defensive backs. The modern default when the offense throws.', 0, 1, 'Nickel: the extra defensive back replaces a linebacker. Better in coverage, a little softer against the run.')
  + card('DIME', cDM, 'A sixth defensive back comes in — built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 0, 1, 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.')
  + '</div>'
  + '<p class="narr" style="margin:10px 0 0;text-align:center;">4-3 and 3-4 shape the front seven; Nickel and Dime swap linebackers for defensive backs. The dots are the players — gold dots are cornerbacks, the dashed dot is the dime.</p>';
};
let _guideHtml = null;""")

rep('W18-D2 panel slotted between COACHING and THE MATH',
"""  + sec('COACHING: PERSONNEL, STYLES AND GAME PLANS', zpbCoachGuideHTML(coach), false)
  + sec('THE MATH OF EVERY GAME-PLAN CHOICE', planMathHTML(), false)""",
"""  + sec('COACHING: PERSONNEL, STYLES AND GAME PLANS', zpbCoachGuideHTML(coach), false)
  + sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true)
  + sec('THE MATH OF EVERY GAME-PLAN CHOICE', planMathHTML(), false)""")

# ============ W18-E · field map: WRs on the line, CBs wide, NICKEL, DIME, flex chips ============

FIELDMAP = """// W15-2: WHERE THEY LINE UP — plain field map + what the abbreviations mean (Owner: no duty sentences).
// W18: WRs line out ON the line (2 right, 1 left), CBs mirrored opposite and wider; CB3 is NICKEL;
// DIME sits on its own deep station; every station carries its flex chips (gold FREE -> wine -6).
window.zpbFieldMapHTML = function(){
 const FM_FLEX = {
  QB:[[6,'WR, S']], RB:[[2,'FB'],[4,'WR'],[6,'TE']],
  WR:[[4,'RB, TE, S, Nickel, Dime'],[6,'CB']], TE:[[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime']],
  OT:[[0,'OG, C'],[4,'DT, FB']], OG:[[0,'C'],[4,'OT, DT, FB']], C:[[0,'OG'],[4,'OT, DT, FB']],
  DT:[[4,'OG, C, DE, FB'],[6,'OT']], DE:[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB, FB'],[6,'TE, RB, Nickel']],
  MIKE:[[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S, Nickel, Dime']],
  OLB:[[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE, Nickel'],[6,'DT, TE, S, FB, Dime']],
  SS:[[0,'Nickel, Dime'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']],
  FS:[[0,'Nickel, Dime'],[2,'SS'],[4,'CB, WR']], CB:[[0,'FS, Nickel, Dime'],[2,'SS'],[4,'WR']],
  NICKEL:[[0,'CB, SS, FS']], DIME:[[0,'CB, SS, FS']], FB:[[4,'RB, TE']], K:[[0,'P']], P:[[2,'K']]
 };
 const cls = c => c===0 ? 'zpb-ft-free' : c===2 ? 'zpb-ft-2' : c===4 ? 'zpb-ft-4' : 'zpb-ft-6';
 const tag = c => c===0 ? 'FREE' : (c===2 ? '\\u22122' : c===4 ? '\\u22124' : '\\u22126');
 const chipOf = (fam, r) => '<i class="zpb-ftchip '+cls(r[0])+'" title="'+fam+' plays '+r[1]+' at '+tag(r[0])+'">'+tag(r[0])+' '+r[1]+'</i>';
 const strip = fams => { const groups = fams.filter(f=>FM_FLEX[f]).map(f=>'<span class="zpb-fm-grp"><b>'+f+'</b>'+FM_FLEX[f].map(r=>chipOf(f,r)).join('')+'</span>');
  return groups.length ? '<div class="zpb-fm-rowflex">'+groups.join('')+'</div>' : ''; };
 const row = (a, cls) => '<div class="zpb-fm-row'+(cls?' '+cls:'')+'">' + a.map(x=>'<i>'+x+'</i>').join('') + '</div>';
 return '<div class="zpb-fm" role="img" aria-label="Field map: where each position lines up">'
  + '<div class="zpb-fm-side zpb-fm-off">'
  + row(['RB']) + strip(['RB'])
  + row(['QB']) + strip(['QB'])
  + row(['WR','OT','OG','C','OG','OT','TE','WR','WR'], ' zpb-fm-line') + strip(['WR','OT','OG','C','TE'])
  + '</div>'
  + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
  + '<div class="zpb-fm-side zpb-fm-def">'
  + row(['DE','DT','DT','DE']) + strip(['DE','DT'])
  + row(['CB','NICKEL','CB'], ' zpb-fm-wide') + strip(['CB','NICKEL'])
  + row(['WILL','MIKE','SAM']) + strip(['OLB','MIKE'])
  + row(['DIME']) + strip(['DIME'])
  + row(['FS','SS']) + strip(['FS','SS'])
  + '</div>'
  + strip(['FB','K','P'])
  + '</div>'
  + '<div class="zpb-fm-legend">'
  + '<div class="zpb-fm-lh">OFFENSE</div>'
  + '<span><b>QB</b> Quarterback</span>'
  + '<span><b>RB</b> Running Back</span>'
  + '<span><b>WR</b> Wide Receiver</span>'
  + '<span><b>TE</b> Tight End</span>'
  + '<span><b>OT</b> Offensive Tackle</span>'
  + '<span><b>OG</b> Offensive Guard</span>'
  + '<span><b>C</b> Center</span>'
  + '<div class="zpb-fm-lh">DEFENSE</div>'
  + '<span><b>DE</b> Defensive Edge</span>'
  + '<span><b>DT</b> Defensive Tackle (NT in a 3-4)</span>'
  + '<span><b>MIKE</b> Middle Linebacker (ILB in a 3-4)</span>'
  + '<span><b>WILL / SAM</b> Outside Linebackers (OLB in a 3-4)</span>'
  + '<span><b>NICKEL</b> Nickel Cornerback (CB3)</span>'
  + '<span><b>DIME</b> Dime Cornerback (CB4)</span>'
  + '<span><b>FS</b> Free Safety</span>'
  + '<span><b>SS</b> Strong Safety</span>'
  + '<div class="zpb-fm-lh">FLEX</div>'
  + '<span><b>FREE</b> plays there free</span>'
  + '<span><b>\\u22122 / \\u22124 / \\u22126</b> rating points lost playing elsewhere</span>'
  + '</div>';
};
"""
span_replace('W18-E1 field map rebuilt', "window.zpbFieldMapHTML = function(){", "// W17: the Owner's position board", FIELDMAP)

# ============ W18-F · draft board ============

rep('W18-F0 ALL/NONE — smaller, quiet, left-aligned (inline so nothing out-ranks it)',
""" ch += `<span class="zpb-allnone"><span class="chip" data-all="1"><span>ALL</span></span><span class="chip" data-none="1"><span>NONE</span></span></span></div>""",
""" ch += `<span class="zpb-allnone"><span class="chip" data-all="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">ALL</span></span><span class="chip" data-none="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">NONE</span></span></span></div>""")

rep('W18-F1 the fill position itself is the control (change link gone)',
"""   const fills = r.slot ? `${LABELS[r.slot]||r.slot}${flexTxt(r)}${opts.length>1?` <a href="#" class="slotchg" data-chg="${r.p[0].replace(/"/g,'&quot;')}" title="Choose which open spot he fills">change</a>`:''}` : 'Full';""",
"""   const fills = r.slot ? (opts.length>1 ? `<a href="#" class="slotchg zpb-fillab" data-chg="${r.p[0].replace(/"/g,'&quot;')}" title="Choose which open spot he fills — click to change it">${LABELS[r.slot]||r.slot}</a>${flexTxt(r)}` : `${LABELS[r.slot]||r.slot}${flexTxt(r)}`) : 'Full';""")

rep('W18-F2 roster header — fading title, base toggle left, view toggle right (segmented pill)',
"""    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><h3 style="margin:0;">Your Roster</h3>
     <span class="zpb-rheadbtns"><span id="zpbBaseToggleHost"></span><button class="tabbtn" id="rosterPickBtn" style="padding:4px 9px;font-size:0.74rem;">Pick order</button><button class="tabbtn active" id="rosterDepthBtn" style="padding:4px 9px;font-size:0.74rem;">Depth chart</button></span></div>""",
"""    <h3 class="zpb-rosterfade" style="margin:0 0 8px;text-align:center;">Your Roster</h3>
    <div class="zpb-rosterhead"><span id="zpbBaseToggleHost"></span><span class="zpb-rheadbtns" style="margin-left:auto;"><span class="zpb-viewtoggle" role="group" aria-label="Roster view"><button type="button" class="zpb-viewbtn" id="rosterPickBtn">Pick order</button><button type="button" class="zpb-viewbtn zpb-view-on" id="rosterDepthBtn">Depth chart</button></span></span></div>""")

rep('W18-F3 view toggle state uses the segmented class',
""" document.getElementById('rosterPickBtn').classList.toggle('active', draftUI.rosterView==='pick');
 document.getElementById('rosterDepthBtn').classList.toggle('active', draftUI.rosterView==='depth');""",
""" document.getElementById('rosterPickBtn').classList.toggle('zpb-view-on', draftUI.rosterView==='pick');
 document.getElementById('rosterDepthBtn').classList.toggle('zpb-view-on', draftUI.rosterView==='depth');""")

# ============ engine byte-pins (the sim math must NOT move this wave) ============

ENGINE_PINS = [
 ('ROSTER_SLOTS 28',  "const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];"),
 ('DEPTH_CHART_GROUPS unchanged', "['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','CB3','FS','SS']]"),
 ('FLEX literal head',        "const FLEX = {\n LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},"),
 ('FLEX literal tail',        " HB:{TE:6}, FB:{}, QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}  // QB/OL -> RB -6, QB -> WR -6, K<->P free (Owner)\n};"),
 ('LB_FLEX',                  "const LB_FLEX = {DE:6, DT:4, CB3:4, SS:2, FS:4, TE:6, RB:6}; // MIKE: DT -4, SS -2 (Owner)"),
 ('OLB_FLEX',                 "const OLB_FLEX = {DE:2, DT:4, CB3:2, SS:4, FS:6, TE:6, RB:6}; // Owner: OLB/WILL/SAM -> edge -2, DT/SS -4, FS -6, Nickel -2"),
 ('EMERGENCY_PENALTY',        "const EMERGENCY_PENALTY = 8;"),
 ('flexPenaltyFor body',      "function flexPenaltyFor(pos, slot){\n const p = flexRule(pos, slot);\n return p==null ? EMERGENCY_PENALTY : p;\n}"),
 ('effOvr body',              "function effOvr(player, slot){\n if(!player) return 70;\n return player[3] - flexPenaltyFor(player[1], slot);\n}"),
 ('board intact (17 families)', "ND:{n:'Nickel / Dime', tip:'Nickel: the extra defensive back in five-defensive-back packages."),
]
for label, pin in ENGINE_PINS:
    if html.count(pin) != 1:
        fails.append(f'engine pin {label}: {html.count(pin)}x, expected 1')

# ============ postchecks ============

for label, pin, *cnt in [
  # comparison page
  ('holder div', '<div id="zpbCmpSelHold" style="display:none;">'),
  ('holder rescue', "zpbHold.appendChild(selA); zpbHold.appendChild(selB);"),
  ('slot A span', '<span class="zpb-cmpside" id="zpbCmpSlotA"></span>'),
  ('slot B span', '<span class="zpb-cmpside" id="zpbCmpSlotB"></span>'),
  ('slot A move', "getElementById('zpbCmpSlotA')"),
  ('slot B move', "getElementById('zpbCmpSlotB')"),
  ('score pkc A', 'style="--pkc:${pkA.accL};--pkcd:${pkA.accD}"'),
  ('score pkc B', 'style="--pkc:${pkB.accL};--pkcd:${pkB.accD}"'),
  ('home call note off', 'renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b, false)'),
  ('showNote param', 'ownerRight, showNote){', 2),
  ('showNote gate', "showNote===false?'':", 2),
  ('thin result column', '#homeCmpResult{max-width:520px'),
  ('detail keys order', "const DETAIL_KEYS = ['OFFENSE','QB','RB','TE','OL','RUN','PASS','PASSD','RUND','DL','LB','SEC','DEFENSE'];"),
  # guide text pass
  ('who decides lines', 'wins the most games.<br>Accept it, change any spot yourself, or play your own way.<br>'),
  ('COACHING PHILOSOPHY', "zpbSw('COACHING PHILOSOPHY'"),
  ('AUTO panel', "zpbSw('AUTO', 'The math predicts the best personnel.')"),
  ('CUSTOM panel', "zpbSw('CUSTOM', 'You choose how you want to play.')"),
  ('autocust group', "zpb-swgroup zpb-autocust"),
  ('home field in math', 'Home field is worth +1.7 points a game in the model.'),
  ('gloss positions fn', 'window.zpbGlossPositionsHTML = function()'),
  ('gloss positions wired', "((typeof window.zpbGlossPositionsHTML==='function') ? window.zpbGlossPositionsHTML() : '')"),
  ('gloss intro line', 'Every starting spot, in depth chart order:'),
  ('defense panel sec', "sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true)"),
  ('defguide def', 'window.zpbDefGuideHTML = function()'),
  ('defcard template', 'class="zpb-defcard"'),
  ('dime dotted', "dots('DB',6,['zpb-dcb','zpb-dcb','zpb-dcb','zpb-dim','',''])"),
  # field map
  ('wr on the line', "row(['WR','OT','OG','C','OG','OT','TE','WR','WR'], ' zpb-fm-line') + strip(['WR','OT','OG','C','TE'])"),
  ('nickel station', "row(['CB','NICKEL','CB'], ' zpb-fm-wide') + strip(['CB','NICKEL'])"),
  ('dime station', "row(['DIME']) + strip(['DIME'])"),
  ('offfield strip', "strip(['FB','K','P'])"),
  ('legend nickel', '<b>NICKEL</b> Nickel Cornerback (CB3)</span>'),
  ('legend flex note', 'rating points lost playing elsewhere'),
  ('fm rowflex', 'zpb-fm-rowflex', 8),
  ('fm grp', 'zpb-fm-grp', 3),
  # draft board
  ('fill label control', 'class="slotchg zpb-fillab"'),
  ('viewtoggle css', '.zpb-viewtoggle button.zpb-view-on'),
  ('viewtoggle markup', '<span class="zpb-viewtoggle" role="group" aria-label="Roster view">'),
  ('viewbtn pick', '<button type="button" class="zpb-viewbtn" id="rosterPickBtn">Pick order</button>'),
  ('view state pick', "classList.toggle('zpb-view-on', draftUI.rosterView==='pick')"),
  ('view state depth', "classList.toggle('zpb-view-on', draftUI.rosterView==='depth')"),
  ('roster head css', '.zpb-rosterhead{display:flex'),
  ('roster fade markup', '<h3 class="zpb-rosterfade" style="margin:0 0 8px;text-align:center;">Your Roster</h3>'),
  ('fm fbkp chips', "FB:[[4,'RB, TE']], K:[[0,'P']], P:[[2,'K']]"),
  ('fade keyframes', '@keyframes zpbFadeIO'),
  ('allnone css', '.zpb-allnone .chip{font-size:.62rem', 1),
  ('board fill height', '#draftTableWrap{flex:1 1 0;max-height:none;}'),
  ('columns flex', '.draft-columns>.panel{display:flex;flex-direction:column;}'),
  # terminology
  ('extra db count', 'extra defensive back', 9),
  ('hail mary count', 'preventing Hail Marys', 4),
]:
    want = cnt[0] if cnt else 1
    if html.count(pin) != want:
        fails.append(f'postcheck {label}: {html.count(pin)}x, expected {want}')

# stale text that must be gone
for label, stale in [
  ('round-12 paragraph', 'Lower points allowed is better'),
  ('third corner (any case)', 'third corner'),
  ('third cornerback', 'third cornerback'),
  ('old top panel names', '<span class="zpb-cmpside">${a} <span class="zpb-cmpsub">(#${rankOf(a)})</span></span>'),
  ('old select labels', '<label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);align-items:center;">'),
  ('old score color', '<span style="color:var(--tA2,var(--accent));">${Math.round(scoreA)}</span>'),
  ('duplicate philosophy h5', 'Auto, philosophy and custom plans'),
  ('deliberately play less efficiently', 'deliberately play less efficiently'),
  ('baked into every projection', 'baked into every projection'),
  ('stars bullet', 'your own thumb on the scale'),
  ('also flex a player', 'They can also flex a player.'),
  ('5 minus the backs', '(5 minus the backs and tight ends)'),
  ('old change link', '>change</a>'),
  ('old roster pick btn', '<button class="tabbtn" id="rosterPickBtn"'),
  ('old field map row', "row(['CB','CB3','DIME','CB'])"),
  ('old view state', "classList.toggle('active', draftUI.rosterView==='pick')"),
  ('old detail keys', "['QB','RB','WR','TE','OL','RUN','PASS','OFFENSE','DL','SEC','PRIMCOV','RUND','PASSD','DEFENSE']"),
  ('glossary runtime cb replace', "h.replace('a third cornerback', 'CB3 / '"),
]:
    if stale in html:
        fails.append(f'stale {label} still present')

# one field map, one defguide, one glosspositions
for fn in ['window.zpbFieldMapHTML = function(){', 'window.zpbDefGuideHTML = function(){', 'window.zpbGlossPositionsHTML = function(){']:
    if html.count(fn) != 1:
        fails.append(f'def count {fn}: {html.count(fn)}')

if fails:
    print('BUILD FAILED:'); [print(' -', f) for f in fails]; sys.exit(1)

open(OUT, 'w', encoding='utf-8').write(html)
data = open(OUT, 'rb').read()
src_len = len(open(SRC, 'rb').read())
print(f'OK  build_w18.html  md5 {hashlib.md5(data).hexdigest()}  {len(data):,} B  (src {src_len:,} B, delta {len(data)-src_len:+,} B)')
