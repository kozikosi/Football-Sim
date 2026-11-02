#!/usr/bin/env python3
# zpb_w57.py — the Owner's round-57 + the storage directive. Asserted exact replacements only;
# re-runs clean from the pristine w56 baseline every iteration.
# Baseline: my w56 bytes (md5 42af55f794180910f1f9086fe0c68a3d).
import hashlib, sys, os, shutil

BASE = os.path.join(os.path.dirname(__file__), 'base', 'Football-Sim-Z-post-blue-w56.html')
OUT  = os.path.join(os.path.dirname(__file__), '..', '..', 'Football-Sim-Z-post-blue-w57.html')
PAYLOADS = os.path.join(os.path.dirname(__file__))

html = open(BASE, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())
assert hashlib.md5(html.encode()).hexdigest() == '42af55f794180910f1f9086fe0c68a3d', 'baseline md5 mismatch'

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}'); sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

def payload(name):
    return open(os.path.join(PAYLOADS, name), encoding='utf-8').read()

# ---------- R1 · the player cards lose the vertical line (Owner: "just remove this vertical line") ----------
# 1a · the phone card's accent border (the v8 compact board)
old = """ #draftTable2 tr{display:grid;grid-template-columns:repeat(12,1fr);gap:2px 4px;align-items:end;border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:10px;margin:5px 0;padding:6px 8px;background:var(--panel2);}"""
new = """ #draftTable2 tr{display:grid;grid-template-columns:repeat(12,1fr);gap:2px 4px;align-items:end;border:1px solid var(--border);border-radius:10px;margin:5px 0;padding:6px 8px;background:var(--panel2);} /* w57 (Owner): the 4px accent bar at the card's left edge retires — the line obscured the first letter of the names; the card keeps its wash and its 1px frame */"""
rep(old, new, 2, 'R1a phone card border-left (the v8 block ships twice in the base CSS)')

# 1b · the board's name-cell inset bar (the one that sat ON the first letter)
old = """tr.zpb-trow td:first-child{box-shadow:inset 3px 0 0 var(--zrb);}"""
new = """tr.zpb-trow td:first-child{box-shadow:none;} /* w57 (Owner): the 3px inset bar rode ON the first letter of every name cell (the phone name cell carries no padding) — the line retires, the wash stays */"""
rep(old, new, 1, 'R1b name-cell inset bar')

# 1c · the cards-view row's left bar
old = """.prow.zpb-trow{background:linear-gradient(90deg,var(--zr1),var(--zr2) 46%,var(--zr3));
 border-left:3px solid var(--zrb);border-radius:10px;padding-left:8px;}"""
new = """.prow.zpb-trow{background:linear-gradient(90deg,var(--zr1),var(--zr2) 46%,var(--zr3));
 border-radius:10px;padding-left:8px;} /* w57 (Owner): the cards-view row loses its 3px left bar — the player card reads clean to its edge */"""
rep(old, new, 1, 'R1c cards-view row bar')

# ---------- R2 · the game plan cards lose the "+0.2 pts vs. auto" line ----------
old = """   <div class="zpb-plan-row"><span class="narr">Defense</span><b>${defPlanText(p.def)}</b></div>
   <div class="zpb-plan-fx">${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} pts vs. auto</div>
  </div>`;"""
new = """   <div class="zpb-plan-row"><span class="narr">Defense</span><b>${defPlanText(p.def)}</b></div>
  </div>`; // w57 (Owner): the per-card "+X.X pts vs. auto" line retires — the plan story keeps the cumulative line where his w33 law put it"""
rep(old, new, 1, 'R2 plan-fx line removed')

# ---------- R3 · the box score: the OT cell was rendered twice and the final pushed off the table ----------
old = """ const row = (name, q, tot)=>{ const q4 = (q[3]||0); const cells = q.slice(0, r.ot?5:4).map(x=>`<td class="score">${x||0}</td>`).join('');"""
new = """ const row = (name, q, tot)=>{ const q4 = (q[3]||0); const cells = q.slice(0, 4).map(x=>`<td class="score">${x||0}</td>`).join(''); /* w57 (Owner): the OT score used to ride in the sliced cells AND in the otOf cell — the OT number repeated and the final fell off the header row; four quarter cells always, the OT column belongs to otOf alone */"""
rep(old, new, 1, 'R3 linescore OT double-cell')

# ---------- R4 · Begin Playoffs wears the Sim Playoffs color and size ----------
old = """#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn{font-size:1rem !important;padding:13px 30px !important;}"""
new = """#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem !important;padding:13px 30px !important;} /* w57 (Owner): BEGIN PLAYOFFS wears the SIM PLAYOFFS size */"""
rep(old, new, 1, 'R4a begin-playoffs size')

old = """#startSeasonBtn,#beginSeasonBtn,#beginSeasonBtn2,#simPlayoffsBtn,#seasonReviewBtn, /* w51 (Owner): SIM SEASON gives its color away — it stays in its spot, quiet again */"""
new = """#startSeasonBtn,#beginSeasonBtn,#beginSeasonBtn2,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn, /* w51 (Owner): SIM SEASON gives its color away — it stays in its spot, quiet again · w57 (Owner): BEGIN PLAYOFFS wears the same gold pill */"""
rep(old, new, 1, 'R4b begin-playoffs color')

old = """${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;padding:10px 24px;">Begin Playoffs</button>':''}"""
new = """${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>':''} <!-- w57 (Owner): the inline padding retires — the standing law sizes this button -->"""
rep(old, new, 1, 'R4c begin-playoffs inline padding')

# ---------- R5 · the badges in review + unit report pace faster (x0.6 per beat) ----------
# (the rules ride in the w57 CSS block — see payload; nothing to replace here)

# ---------- R6 · the sim-playoffs run cine flows straight into the Super Bowl storm ----------
old = """   if(i >= story.length){
    window.__zpbPoRunHold = false;
    ov.style.opacity = '0';
    setTimeout(()=>{
     try{ ov.remove(); }catch(err){}
     window.__zpbSBFinPending = false;
     try{ if(seasonState && seasonState.champion) zpbPostSuperBowlCine(); }catch(err){}
    }, 560);
    return;
   }"""
new = """   if(i >= story.length){
    window.__zpbPoRunHold = false;
    // w57 (Owner): the run cine FLOWS into the champion storm — the storm mounts while the run
    // overlay is still on screen (the storm is opaque from its first frame and sits one layer
    // beneath), then the run overlay fades to reveal the storm, never the page underneath.
    if(window.__zpbSBFinPending && seasonState && seasonState.champion){
     window.__zpbSBFinPending = false;
     try{ zpbPostSuperBowlCine(); }catch(err){}
    }
    ov.style.opacity = '0';
    setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 560);
    return;
   }"""
rep(old, new, 1, 'R6 run-cine into SB storm')

# ---------- R7 · insert the w57 CSS block (compressed cinematics pack + preview pairs + name-break laws + badge pace) ----------
anchor = """@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) #draftTable2 td.dc-ovr,:root:not([data-theme="dark"]) #draftTable2 td[data-label="Pos"],
 :root:not([data-theme="dark"]) #draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
}
</style>"""
new = anchor + '\n' + payload('payload_w57_css.txt')
rep(anchor, new, 1, 'R7 w57 css block')

# ---------- R8 · insert the storage blocks (own payload block, the w51-js pattern) ----------
anchor2 = """<script id="zpb-w51-js">"""
new2 = payload('payload_storage_css.txt') + '\n' + payload('payload_storage_js.txt') + '\n' + anchor2
rep(anchor2, new2, 1, 'R8 storage css+js blocks')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, len(html), 'bytes', 'md5:', hashlib.md5(html.encode()).hexdigest())
print('delta bytes:', len(html) - n0)

# ---------- post-checks ----------
checks = [
 ('vertical line gone (phone card)', 'border-left:4px solid var(--accent);border-radius:10px' not in html),
 ('vertical line gone (name cell)', 'tr.zpb-trow td:first-child{box-shadow:inset' not in html),
 ('vertical line gone (cards row)', '.prow.zpb-trow{background:linear-gradient(90deg,var(--zr1),var(--zr2) 46%,var(--zr3));\n border-radius:10px' in html),
 ('plan-fx line gone', 'pts vs. auto</div>' not in html),
 ('plan-fx div gone', '<div class="zpb-plan-fx">' not in html),
 ('linescore four cells', 'q.slice(0, 4).map' in html),
 ('begin playoffs sized', '#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem' in html),
 ('begin playoffs gold', '#seasonReviewBtn,#beginPlayoffsBtn, /* w51' in html),
 ('run cine mounts storm first', 'the run cine FLOWS into the champion storm' in html),
 ('w57 css block present', '<style id="zpb-w57-css">' in html),
 ('storage css block present', '<style id="zpb-storage-css">' in html),
 ('storage js block present', '<script id="zpb-storage-js">' in html),
 ('depth-row bar kept (w56 D1 law)', 'border-left:3px solid var(--zrb);border-radius:8px;padding-left:7px;' in html),
 ('draft buttons shape kept', 'dc-btn button{padding:4px 9px;font-size:.72rem;' in html),
 ('preview pairs law present', '.zpb-pvfrow{grid-template-columns:repeat(2,minmax(0,1fr)) !important' in html),
 ('name-break law present', '.zpb-gname{overflow-wrap:break-word' in html),
 ('badge pace law present', '.zpb-rcbadge{animation-delay:calc(var(--beat,0)*.6s)' in html),
 ('cinematics pack present', '.zpb-replay{max-height:min(96svh,860px)' in html),
]
bad = 0
for label, cond in checks:
    print(('PASS  ' if cond else 'FAIL  ') + label)
    if not cond: bad += 1
if bad: sys.exit(1)
print('ALL POST-CHECKS GREEN')
