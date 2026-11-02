#!/usr/bin/env python3
# zpb_w56.py — the Owner's round-56. Asserted exact replacements only; re-runs clean from the pristine w55 baseline.
# Baseline: my w55 bytes (md5 49161f118e587701f1d639346e22d4d2).
import hashlib, sys

SRC = '/home/z/my-project/w56/builds/Football-Sim-Z-post-blue-w56.html'
BASE = '/home/z/my-project/w56/base/Football-Sim-Z-post-blue-w55.html'
import shutil
shutil.copyfile(BASE, SRC)
html = open(SRC, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())
assert hashlib.md5(html.encode()).hexdigest() == '49161f118e587701f1d639346e22d4d2', 'baseline md5 mismatch'

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}'); sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

# ---------- R1 · the empty DIME row loses its pre-selection bracket (the wash rides the player, like every sibling) ----------
old = r""" const zst = (typeof zpbNeutralUserRowVars==='function') ? zpbNeutralUserRowVars() : ''; // w50 (Owner): the DIME row wears the SAME row tokens as every sibling — the vivid user wash that read as a detached row retires
 const cls = d ? (d[3]>=90?'zpb-shm':(d[3]>=85?'zpb-vib':'')) : ''; // w27: the Dime follows the tier law like every other row"""
new = r""" const zst = d ? ((typeof zpbNeutralUserRowVars==='function') ? zpbNeutralUserRowVars() : '') : ''; // w50 (Owner): the DIME row wears the SAME row tokens as every sibling · w56 (Owner): and ONLY when a dime player exists — before a dime is selected the row is clean like every empty slot, no bracket
 const cls = d ? (d[3]>=90?'zpb-shm':(d[3]>=85?'zpb-vib':'')) : ''; // w27: the Dime follows the tier law like every other row"""
rep(old, new, 1, 'R1 dime pre-selection bracket')

# ---------- R2 · the review's 20-0 stage compresses (the draft review instance only — the home hero keeps its full stage) ----------
old = """ if(!seasonState){
  container.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">SEASON</button>"""
new = """ if(!seasonState){
  container.innerHTML = `<div class="zpb-stageintro zpb-stageintro-slim"> <!-- w56 (Owner): the review's 20-0 stage compresses and leads the page — the home hero keeps its full 42vh stage -->
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">SEASON</button>"""
rep(old, new, 1, 'R2 review stageintro slim')

# ---------- R3 · the ranks panel moves up right under it ----------
old = "   const w = document.createElement('div'); w.style.marginTop = '18px';"
new = "   const w = document.createElement('div'); w.style.marginTop = '8px'; // w56 (Owner): HOW YOUR DRAFT RANKS moves up — right under the compressed 20-0 stage"
rep(old, new, 1, 'R3 ranks panel moves up')

# ---------- R4 · the bracket's round classes (inert on desktop; they drive the phone funnel) ----------
old = """  col('AFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','AFC'), 'zpb-tree-afc')
  + col('AFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','AFC'), 'zpb-tree-afc')
  + col('AFC · '+ROUND_LABELS.champ, pair(cm,'champ','AFC'), 'zpb-tree-afc')
  + col(ROUND_LABELS.superbowl, (sb||[]).map((g,i)=>({g, rk:'superbowl', i})), 'zpb-tree-sb')
  + col('NFC · '+ROUND_LABELS.champ, pair(cm,'champ','NFC'), 'zpb-tree-nfc')
  + col('NFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','NFC'), 'zpb-tree-nfc')
  + col('NFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','NFC'), 'zpb-tree-nfc');"""
new = """  col('AFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','AFC'), 'zpb-tree-afc zpb-trnd-wc') // w56: the per-round classes drive the phone's vertical funnel — inert on desktop
  + col('AFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','AFC'), 'zpb-tree-afc zpb-trnd-dv')
  + col('AFC · '+ROUND_LABELS.champ, pair(cm,'champ','AFC'), 'zpb-tree-afc zpb-trnd-cm')
  + col(ROUND_LABELS.superbowl, (sb||[]).map((g,i)=>({g, rk:'superbowl', i})), 'zpb-tree-sb zpb-trnd-sb')
  + col('NFC · '+ROUND_LABELS.champ, pair(cm,'champ','NFC'), 'zpb-tree-nfc zpb-trnd-cm')
  + col('NFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','NFC'), 'zpb-tree-nfc zpb-trnd-dv')
  + col('NFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','NFC'), 'zpb-tree-nfc zpb-trnd-wc');"""
rep(old, new, 1, 'R4 bracket round classes')

# ---------- R5 · the pick grades read as cards + badges (same data, the 6-column table retires) ----------
old = r"""function pickGradePanelHTML(){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.log) return '';
 const me = draftSim.rosters[draftSim.userIndex]; if(!me) return '';
 const realTeams = Object.keys(TEAM_DATA);
 const zstM = (typeof zpbRowVars==='function') ? zpbRowVars(me.teamName) : '';
 let slotRows = '';
 [].concat(...DEPTH_CHART_GROUPS.map(g=>g[2])).forEach(s=>{
  const def = GROUP_DEFS.find(g=>g.key===s);
  const p = me.slots[s];
  const e = normalizeSlotEntry(p);
  const rnd = me.pickRounds ? me.pickRounds[s] : null;
  if(!def) return;
  const myVal = e ? effOvr(p, s) : 70;
  const leagueVals = realTeams.map(t=>groupAvgForTeam(t,def).avg);
  const rank = Math.min(32, leagueVals.filter(v=>v>myVal).length + 1);
  const pct = ((32-rank)/31)*100;
  const grade = letterGrade(pct);
  const nmCell = (e && e.name) ? `<span class="${e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')}">${e.name}</span>` : '\u00b7';
  slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td><td>${nmCell}</td><td class="score">${e?e.ovr:'\u00b7'}</td><td class="narr">${rnd?('Round '+rnd):'\u00b7'}</td><td class="score">#${rank}/32</td><td class="score">${grade}</td></tr>`;
 });
 const overallPct = ((32-(function(){ const all=buildResultEntries().draftEntries.slice().sort((a,b)=>b.score-a.score); return 1+all.findIndex(e=>e.isUser); })())/31)*100;
 return `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">DRAFT PICK GRADES</summary>
  <p class="narr" style="margin:8px 0;">Overall grade ${letterGrade(Math.max(0,Math.min(100,overallPct)))} \u00b7 every starting spot, graded against all 32 real rosters.</p>
  <table><thead><tr><th>Slot</th><th>Player</th><th>OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table></details>`;
}"""
new = r"""function pickGradePanelHTML(){ // w56 (Owner): the grades read as CARDS + BADGES — one card per starting spot; the 6-column table retires (the exact same data: slot, name, OVR, round, rank, grade)
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.log) return '';
 const me = draftSim.rosters[draftSim.userIndex]; if(!me) return '';
 const realTeams = Object.keys(TEAM_DATA);
 const zstM = (typeof zpbRowVars==='function') ? zpbRowVars(me.teamName) : '';
 let cards = '';
 [].concat(...DEPTH_CHART_GROUPS.map(g=>g[2])).forEach(s=>{
  const def = GROUP_DEFS.find(g=>g.key===s);
  const p = me.slots[s];
  const e = normalizeSlotEntry(p);
  const rnd = me.pickRounds ? me.pickRounds[s] : null;
  if(!def) return;
  const myVal = e ? effOvr(p, s) : 70;
  const leagueVals = realTeams.map(t=>groupAvgForTeam(t,def).avg);
  const rank = Math.min(32, leagueVals.filter(v=>v>myVal).length + 1);
  const pct = ((32-rank)/31)*100;
  const grade = letterGrade(pct);
  const nm = (e && e.name) ? `<b class="zpb-pg-name ${e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')}">${e.name}</b>` : '<b class="zpb-pg-name">\u00b7</b>';
  cards += `<div class="zpb-pg-card" style="${zstM}"><span class="zpb-pg-slot">${LABELS[s]||s}</span><span class="zpb-pg-grade" title="League rank #${rank} of 32">${grade}</span>${nm}<span class="zpb-pg-badges"><i>${e?(e.ovr+' OVR'):'\u00b7'}</i><i>${rnd?('RD '+rnd):'\u00b7'}</i><i>#${rank}/32</i></span></div>`;
 });
 const overallPct = ((32-(function(){ const all=buildResultEntries().draftEntries.slice().sort((a,b)=>b.score-a.score); return 1+all.findIndex(e=>e.isUser); })())/31)*100;
 return `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">DRAFT PICK GRADES</summary>
  <p class="narr" style="margin:8px 0;">Overall grade ${letterGrade(Math.max(0,Math.min(100,overallPct)))} \u00b7 every starting spot, graded against all 32 real rosters.</p>
  <div class="zpb-pg-grid">${cards}</div></details>`;
}"""
rep(old, new, 1, 'R5 pick-grade cards')

# ---------- R6 · the w56 CSS (appended after the w55 block, it wins the cascade) ----------
old = """ .zpb-strip-pct{font-size:.9rem;}
}
</style>"""
new = """ .zpb-strip-pct{font-size:.9rem;}
}
</style>
<style id="zpb-w56-css">
/* ================= Z-POST-BLUE W56 (the Owner's round-56) =================
   The draft card's labels return and OVR never stacks the Priority; the review's 20-0 stage
   compresses; the SB panel's top name centers; the bracket reads as a vertical funnel on the
   phone; the pick grades become cards + badges. Desktop untouched except the pick grades. */

/* 1 · THE REVIEW'S 20-0 STAGE COMPRESSES — the draft review instance only (zpb-stageintro-slim);
   the home hero keeps its cinematic 42vh stage. The ranks panel follows right under. */
.zpb-stageintro-slim{min-height:0;padding:16px 4px 6px;}
.zpb-stageintro-slim .zpb-cygline{margin-top:6px;}

/* 2 · THE PICK GRADES ARE CARDS + BADGES — one card per starting spot: the slot chip, the letter
   grade as the big badge, the name leading, and the OVR / round / rank badges under it. */
.zpb-pg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;}
.zpb-pg-card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:9px 10px;min-width:0;}
.zpb-pg-slot{font-size:.56rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ongold,var(--text));background:var(--gold2,var(--accent));border:1px solid var(--gold3,var(--border));border-radius:999px;padding:1px 8px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.zpb-pg-grade{position:absolute;top:7px;right:9px;font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.02rem;line-height:1;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent);border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:9px;padding:6px 7px;}
.zpb-pg-name{font-size:.82rem;font-weight:700;line-height:1.15;overflow-wrap:anywhere;padding-right:44px;margin-top:2px;}
.zpb-pg-badges{display:flex;gap:4px;flex-wrap:wrap;}
.zpb-pg-badges i{font-style:normal;font-size:.6rem;font-weight:700;letter-spacing:.03em;color:var(--sub);background:color-mix(in srgb,var(--accent) 7%,transparent);border:1px solid var(--border);border-radius:999px;padding:2px 7px;white-space:nowrap;}

/* 3 · THE PHONE DRAFT CARD — the labels return (POS · TEAM · WINS · GONE · PRIORITY · FILLS) and
   the card reads in three lines: name · OVR · Draft / pos · team · wins · gone / priority · fills.
   The OVR chip and the Priority value share no column and no row. */
@media (max-width:760px){
 #draftTable2 td[data-label]::before{display:block;line-height:1.05;}
 #draftTable2 td.dc-ovr::before{display:inline;margin-right:4px;}
 #draftTable2 tr{row-gap:1px;padding:4px 8px;}
 #draftTable2 td.dc-name{grid-column:1/8;grid-row:1;}
 #draftTable2 td.dc-ovr{grid-column:8/10;grid-row:1;padding:2px 0 !important;}
 #draftTable2 td.dc-btn{grid-column:10/13;grid-row:1;}
 #draftTable2 td:nth-child(2),#draftTable2 td:nth-child(3),#draftTable2 td.dc-wins,#draftTable2 td.dc-pri,#draftTable2 td.dc-gone,#draftTable2 td.dc-fills{font-size:.68rem;}
 #draftTable2 td:nth-child(2){grid-column:1/3;grid-row:2;}
 #draftTable2 td:nth-child(3){grid-column:3/6;grid-row:2;}
 #draftTable2 td.dc-wins{grid-column:6/9;grid-row:2;}
 #draftTable2 td.dc-gone{grid-column:9/12;grid-row:2;text-align:left !important;}
 #draftTable2 td.dc-pri{grid-column:1/4;grid-row:3;}
 #draftTable2 td.dc-fills{grid-column:4/13;grid-row:3;text-align:left !important;}
}

/* 4 · THE SUPER BOWL PANEL'S TOP NAME CENTERS — the w47 desktop sides law
   (.score-line .sl-team:first-child{text-align:right !important}) out-specifies the generic
   phone centering, so the away name hung right on the stacked layout. Matching specificity,
   later in the cascade: both team rows center on the phone, the name box wraps gracefully. */
@media (max-width:760px){
 .score-line .sl-team:first-child,.score-line .sl-team:last-child{text-align:center !important;}
 .score-line .sl-team .zpb-sl2name{justify-content:center !important;flex-wrap:wrap;}
}

/* 5 · THE BRACKET IS A VERTICAL FUNNEL on the phone — the same seven panels and the same text,
   rearranged to read top-down: Wild Card (AFC, then NFC) → Divisional → Championships → Super Bowl.
   display:contents lifts the cards into one grid; order arranges the rounds; paired rounds sit
   two cards side by side, single-card rounds center. Desktop keeps its mirrored tree untouched. */
@media (max-width:560px){
 .zpb-tree{display:grid;grid-template-columns:1fr 1fr;gap:10px 8px;}
 .zpb-tree-col{display:contents;}
 .zpb-tree-col h6{grid-column:1/-1;margin:8px 0 0;font-size:.6rem;}
 .zpb-tree-afc.zpb-trnd-wc h6{order:0;}
 .zpb-tree-afc.zpb-trnd-wc .bracket-game:nth-of-type(1){order:1;}
 .zpb-tree-afc.zpb-trnd-wc .bracket-game:nth-of-type(2){order:2;}
 .zpb-tree-afc.zpb-trnd-wc .bracket-game:nth-of-type(3){order:3;grid-column:1/-1;}
 .zpb-tree-nfc.zpb-trnd-wc h6{order:10;}
 .zpb-tree-nfc.zpb-trnd-wc .bracket-game:nth-of-type(1){order:11;}
 .zpb-tree-nfc.zpb-trnd-wc .bracket-game:nth-of-type(2){order:12;}
 .zpb-tree-nfc.zpb-trnd-wc .bracket-game:nth-of-type(3){order:13;grid-column:1/-1;}
 .zpb-tree-afc.zpb-trnd-dv h6{order:20;}
 .zpb-tree-afc.zpb-trnd-dv .bracket-game:nth-of-type(1){order:21;}
 .zpb-tree-afc.zpb-trnd-dv .bracket-game:nth-of-type(2){order:22;}
 .zpb-tree-nfc.zpb-trnd-dv h6{order:30;}
 .zpb-tree-nfc.zpb-trnd-dv .bracket-game:nth-of-type(1){order:31;}
 .zpb-tree-nfc.zpb-trnd-dv .bracket-game:nth-of-type(2){order:32;}
 .zpb-tree-afc.zpb-trnd-cm h6{order:40;}
 .zpb-tree-afc.zpb-trnd-cm .bracket-game{order:41;grid-column:1/-1;justify-self:center;width:min(100%,250px);}
 .zpb-tree-nfc.zpb-trnd-cm h6{order:50;}
 .zpb-tree-nfc.zpb-trnd-cm .bracket-game{order:51;grid-column:1/-1;justify-self:center;width:min(100%,250px);}
 .zpb-trnd-sb h6{order:60;}
 .zpb-trnd-sb .bracket-game{order:61;grid-column:1/-1;justify-self:center;width:min(100%,270px);}
}

/* 6 · THE CARD'S VALUE INK — the OVR number and the plain stat values inherited the board
   wrapper's ink, and on silver-ink teams (Raiders silver, Jets white) the number vanished
   into its own chip on the light board. They wear the row's one-ink law instead — the same
   ink the player's name carries (txM light / txd dark), the dc-name pattern verbatim. */
#draftTable2 td.dc-ovr,#draftTable2 td[data-label="Pos"],#draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
:root[data-theme="dark"] #draftTable2 td.dc-ovr,:root:not([data-theme="light"]) #draftTable2 td.dc-ovr,
:root[data-theme="dark"] #draftTable2 td[data-label="Pos"],:root:not([data-theme="light"]) #draftTable2 td[data-label="Pos"],
:root[data-theme="dark"] #draftTable2 td[data-label="Team"],:root:not([data-theme="light"]) #draftTable2 td[data-label="Team"]{color:var(--nmd,var(--tnd,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) #draftTable2 td.dc-ovr,:root:not([data-theme="light"]) #draftTable2 td[data-label="Pos"],
 :root:not([data-theme="light"]) #draftTable2 td[data-label="Team"]{color:var(--nmd,var(--tnd,var(--text)));}
}
:root[data-theme="light"] #draftTable2 td.dc-ovr,:root[data-theme="light"] #draftTable2 td[data-label="Pos"],
:root[data-theme="light"] #draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) #draftTable2 td.dc-ovr,:root:not([data-theme="dark"]) #draftTable2 td[data-label="Pos"],
 :root:not([data-theme="dark"]) #draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
}
</style>"""
rep(old, new, 1, 'R6 w56 CSS block')

open(SRC, 'w', encoding='utf-8').write(html)
print('written:', len(html), 'bytes (delta %+d)' % (len(html)-n0))

# ---------- post-checks ----------
checks = [
 ('w56 css present', 'zpb-w56-css' in html),
 ('dime guard (d ? zpbNeutralUserRowVars)', "zst = d ? ((typeof zpbNeutralUserRowVars==='function')" in html),
 ('stageintro slim class', 'zpb-stageintro zpb-stageintro-slim' in html),
 ('ranks margin 8px', "w.style.marginTop = '8px'" in html),
 ('bround wc class', 'zpb-tree-afc zpb-trnd-wc' in html),
 ('bround sb class', 'zpb-tree-sb zpb-trnd-sb' in html),
 ('pick grades grid', '<div class="zpb-pg-grid">${cards}</div>' in html),
 ('pick grade badge row', 'zpb-pg-badges' in html),
 ('old pick grade table gone', '<th>Slot</th><th>Player</th><th>OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th>' not in html),
 ('labels return rule', '#draftTable2 td[data-label]::before{display:block;line-height:1.05;}' in html),
 ('ovr caption rule', '#draftTable2 td.dc-ovr::before{display:inline;margin-right:4px;}' in html),
 ('sl-team center rule', '.score-line .sl-team:first-child,.score-line .sl-team:last-child{text-align:center !important;}' in html),
 ('funnel grid rule', '.zpb-tree-col{display:contents;}' in html),
 ('funnel sb order', '.zpb-trnd-sb .bracket-game{order:61;grid-column:1/-1;justify-self:center;width:min(100%,270px);}' in html),
 ('w55 block intact', 'zpb-w55-css' in html),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks: print(('ok   ' if okc else 'FAIL ') + n)
if bad: sys.exit(1)
print('zpb_w56: all replacements + post-checks passed')
