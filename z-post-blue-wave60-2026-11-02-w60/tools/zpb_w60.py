#!/usr/bin/env python3
# zpb_w60.py — the Owner's round-60 on the w59 line: the fluid unit table, the name ladder,
# the pregame face-off rows, the playoffs buttons, the season footer pair, the advance rail.
# Asserted exact replacements only; re-runs clean from the pristine w59 baseline every iteration.
# Baseline: gh-pages w59 (md5 889e531b9418fa7a2604d3e8ab4d23b4 — verified before this build).
import hashlib, sys, os

PKG = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(PKG, 'base', 'Football-Sim-Z-post-blue-w59.html')
OUT  = os.path.join(PKG, '..', '..', 'Football-Sim-Z-post-blue-w60.html')

html = open(BASE, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())
assert hashlib.md5(html.encode()).hexdigest() == '889e531b9418fa7a2604d3e8ab4d23b4', 'baseline md5 mismatch'

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}'); sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

# ============ R1 · THE UNIT COMPARISON IS FLUID (Owner item 1) ============
# Carried entirely by the w60 CSS payload (it lands AFTER the w59 rules, so display:table +
# table-layout:fixed + the 25/50/25 columns win the cascade at every width — including inside
# the generic ≤760 table{display:block} law, which has lower specificity and sits earlier).

# ============ R2 · THE ELLIPSIS PAINTS COME OFF THE NAME CARRIERS (Owner items 2/2a) ============
rep('.zpb-dz-row .zpb-dz-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.zpb-dz-row .zpb-dz-name{font-weight:600;min-width:0;}', 1, 'R2a dz-name')
rep('.zst-opp{font-size:.7rem;font-weight:700;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.zst-opp{font-size:.7rem;font-weight:700;max-width:100%;min-width:0;}', 1, 'R2b zst-opp')
rep('.zpb-whyname{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.zpb-whyname{min-width:0;}', 1, 'R2c whyname')
rep('.zpb-tree .bracket-game .zpb-trow2 em{font-style:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.zpb-tree .bracket-game .zpb-trow2 em{font-style:normal;min-width:0;}', 1, 'R2d bracket em')
rep('#draftTable2 td.dc-fills .zpb-fillab{display:inline-block;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:bottom;}',
    '#draftTable2 td.dc-fills .zpb-fillab{display:inline-block;max-width:100%;vertical-align:bottom;}', 1, 'R2e fillab')
rep('.zpb-pickbtn .zpb-pickname{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.zpb-pickbtn .zpb-pickname{min-width:0;}', 1, 'R2f pickname')
rep('.zpb-pickrow b{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.zpb-pickrow b{font-weight:600;min-width:0;}', 1, 'R2g pickrow b')
rep('.zpb-gplayer{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;vertical-align:bottom;}',
    '.zpb-gplayer{vertical-align:bottom;}', 1, 'R2h gplayer')
rep('#draftTable2 td{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#draftTable2 td{white-space:nowrap;}', 1, 'R2i draft tds')
rep('#draftCards .prow .narr{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#draftCards .prow .narr{display:block;white-space:normal;}', 1, 'R2j cards narr')
rep('.zpb-pvfrow .zpb-pcard-hd b{font-size:.76rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;}',
    '.zpb-pvfrow .zpb-pcard-hd b{font-size:.76rem;min-width:0;}', 1, 'R2k pvcard hd')
rep('#playerTable.mstack td.zpb-pb-name{grid-area:name;font-size:.92rem;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#playerTable.mstack td.zpb-pb-name{grid-area:name;font-size:.92rem;min-width:0;}', 1, 'R2l pb-name')
rep('#playerTable.mstack td.zpb-pb-team{grid-area:team;font-size:.68rem;color:var(--tn,var(--text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#playerTable.mstack td.zpb-pb-team{grid-area:team;font-size:.68rem;color:var(--tn,var(--text));min-width:0;}', 1, 'R2m pb-team')
rep('.zpb-pg-slot{font-size:.56rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ongold,var(--text));background:var(--gold2,var(--accent));border:1px solid var(--gold3,var(--border));border-radius:999px;padding:1px 8px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.zpb-pg-slot{font-size:.56rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ongold,var(--text));background:var(--gold2,var(--accent));border:1px solid var(--gold3,var(--border));border-radius:999px;padding:1px 8px;max-width:100%;}', 1, 'R2n pg-slot')
rep('.zpb-selbtn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;}',
    '.zpb-selbtn span{max-width:200px;white-space:normal;}', 1, 'R2o selbtn span')

# ============ R3 · WORDS NEVER SPLIT (Owner items 2a/2b) — anywhere/break-word → normal ============
rep('.zpb-lu-cell{font-size:.8rem;min-width:0;padding:4px 6px;border-radius:9px;overflow-wrap:anywhere;}',
    '.zpb-lu-cell{font-size:.8rem;min-width:0;padding:4px 6px;border-radius:9px;overflow-wrap:normal;}', 1, 'R3a lu-cell base')
rep('#draftTable2 td.dc-name{grid-column:1 / 9;grid-row:1;font-weight:800;font-size:0.92rem;align-self:center;overflow-wrap:anywhere;}',
    '#draftTable2 td.dc-name{grid-column:1 / 9;grid-row:1;font-weight:800;font-size:0.92rem;align-self:center;overflow-wrap:normal;}', 2, 'R3b dc-name x2')
rep('.zpb-gname{font-size:0.8rem;overflow-wrap:anywhere;}',
    '.zpb-gname{font-size:0.8rem;overflow-wrap:normal;}', 1, 'R3c gname base')
rep('.zpb-awname{font-size:1.02rem;overflow-wrap:anywhere;}',
    '.zpb-awname{font-size:1.02rem;overflow-wrap:normal;}', 1, 'R3d awname')
rep('.zpb-awpanel i.narr{font-style:normal;font-size:.66rem;overflow-wrap:anywhere;}',
    '.zpb-awpanel i.narr{font-style:normal;font-size:.66rem;overflow-wrap:break-word;} /* w60: the award lines carry names — words split only as the last resort, never by the layout */',
    1, 'R3d2 awpanel lines')
rep('#viewGroups td.narr{white-space:normal;overflow-wrap:anywhere;}',
    '#viewGroups td.narr{white-space:normal;overflow-wrap:break-word;} /* w60: the ranking cards flow PLAYER NAMES — whole words only */',
    1, 'R3d3 posrank name lists')
rep('.zpb-pg-name{font-size:.82rem;font-weight:700;line-height:1.15;overflow-wrap:anywhere;padding-right:44px;margin-top:2px;}',
    '.zpb-pg-name{font-size:.82rem;font-weight:700;line-height:1.15;overflow-wrap:normal;padding-right:44px;margin-top:2px;}', 1, 'R3e pg-name')
rep('.zpb-gname{overflow-wrap:break-word;} /* w57 (Owner): the global name class */',
    '.zpb-gname{overflow-wrap:normal;} /* w57 (Owner): the global name class — w60: the engine guarantees fit, words stay whole */', 1, 'R3f gname w57 pass')
rep('.zpb-lu-cell{overflow-wrap:break-word;} /* w57 (Owner): the lineup cells */',
    '.zpb-lu-cell{overflow-wrap:normal;} /* w57 (Owner): the lineup cells — w60: the engine guarantees fit, words stay whole */', 1, 'R3g lu-cell w57 pass')

# ============ R4 · THE PLAYOFFS BUTTONS (Owner item 4) ============
rep('#startSeasonBtn,#beginSeasonBtn,#beginSeasonBtn2,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn, /* w51 (Owner): SIM SEASON gives its color away — it stays in its spot, quiet again · w57 (Owner): BEGIN PLAYOFFS wears the same gold pill */',
    '#startSeasonBtn,#beginSeasonBtn,#beginSeasonBtn2,#seasonReviewBtn,#beginPlayoffsBtn, /* w51 (Owner): SIM SEASON gives its color away — it stays in its spot, quiet again · w57 (Owner): BEGIN PLAYOFFS wears the same gold pill · w60 (Owner): SIM PLAYOFFS leaves the pill — it is not colored in at all */',
    1, 'R4a SIM PLAYOFFS leaves the gold list')

# ============ R5 · THE DURING-THE-GAME PANEL'S ONLY EXITS ARE SKIP → CONTINUE (Owner item 5) ============
rep("""  const esc = e=>{ if(e.key==='Escape') close(); };
  document.addEventListener('keydown', esc);
  ov.addEventListener('click', e=>{ if(e.target===ov) close(); });
""",
    "  /* w60 (Owner): the dim and Escape are NOT exits — a stray click outside the during-the-game\n"
    "     panel must never end the cinematic. Skip and Continue are the only doors. */\n",
    1, 'R5a the backdrop/Escape exits die')
rep("document.removeEventListener('keydown', esc); try{ if(typeof zpbFxDrain==='function') zpbFxDrain(false); }catch(err){}",
    "try{ if(typeof zpbFxDrain==='function') zpbFxDrain(false); }catch(err){}", 1, 'R5b close() drops the esc unhook')

# ============ R6 · THE SEASON FOOTER PAIR (Owner items 6/7) ============
rep('return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;"><button class="tabbtn" id="restartSeasonBtn">Start a new season (same roster)…</button><button class="tabbtn" id="newDraftFromSeasonBtn">Start a new draft…</button></div>`;',
    'return `<div class="zpb-seasonopts"><button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK <span class="zpb-again-dot">·</span> <span class="zpb-rosterline">SAME ROSTER</span></button><button class="tabbtn" id="newDraftFromSeasonBtn" style="width:auto;">NEW DRAFT</button></div>`;',
    1, 'R6a RUN IT BACK · SAME ROSTER / NEW DRAFT')
rep('Running 100 seasons…</h3>', 'Running 100 seasons</h3>', 1, 'R6b no ellipsis on the loading title')
rep('if(txt) txt.textContent = `Season ${done} of ${N}…`;',
    'if(txt) txt.textContent = `Season ${done} of ${N}`;', 1, 'R6c no ellipsis on the loading count')

# ============ R7 · THE PREGAME KEY PLAYERS ARE FACE-OFF ROWS (Owner item 3) ============
rep('   const starHTML = slots.map((s,i)=>{',
    '   const starCards = slots.map((s,i)=>{', 1, 'R7a starHTML -> starCards')
rep("   }).join('');\n   const stageDeco = roundLabel ? (()=>{",
    "   });\n"
    "   const starHTML = starCards.reduce(function(acc,card,i){ /* w60 (Owner): the pairs are face-off rows in flow — the static pregame screen is never covered */\n"
    "    if(i%2===0){ acc.push('<div class=\"zpb-intro-brow\">'+card); } else { acc[acc.length-1] += card + '</div>'; }\n"
    "    return acc;\n"
    "   }, []).join('');\n"
    "   const stageDeco = roundLabel ? (()=>{",
    1, 'R7b the beat rows wrap the pairs')
rep('   const fitF = s=>{ if(!s) return 15.4; const laneMax = narrow ? Math.min(160, Math.round((window.innerWidth||1280) * 0.36)) : 340;',
    '   const fitF = s=>{ if(!s) return 15.4; const laneMax = narrow ? Math.min(180, Math.round((window.innerWidth||1280) * 0.44)) : 340; /* w60: the budget is the face-off row\'s half-width */',
    1, 'R7c the fit budget reads the row half-width')

# ============ R8 · THE W60 BLOCKS (CSS + JS) ============
CSS = open(os.path.join(PKG, 'payload_w60_css.txt'), encoding='utf-8').read()
JS  = open(os.path.join(PKG, 'payload_w60_js.txt'), encoding='utf-8').read()
block = '<style id="zpb-w60-css">\n' + CSS + '\n</style>\n\n\n<script id="zpb-w60-js">\n' + JS + '\n</script>\n\n\n'
rep('<style id="zpb-storage-css">', block + '<style id="zpb-storage-css">', 1, 'R8 the w60 blocks insert before the storage block')

# ============ post-checks ============
checks = [
    ('unit table fixed law (payload only)', html.count('table.zpb-unitcmp{display:table;width:100%;table-layout:fixed;border-collapse:collapse;}') == 1),
    ('no ellipsis on the name carriers', all(html.count(s) == 0 for s in [
        '.zpb-dz-name{font-weight:600;white-space:nowrap', '.zst-opp{font-size:.7rem;font-weight:700;max-width:100%;overflow',
        '.zpb-whyname{white-space:nowrap', '.zpb-trow2 em{font-style:normal;overflow', 'max-width:90px;overflow:hidden',
        '.zpb-pickname{white-space:nowrap', '.zpb-pickrow b{font-weight:600;white-space:nowrap',
        '#draftTable2 td{white-space:nowrap;overflow', '.prow .narr{display:block;white-space:nowrap',
        'td.zpb-pb-name{grid-area:name;font-size:.92rem;min-width:0;white-space:nowrap',
        'text-overflow:ellipsis;white-space:nowrap;}\n.zpb-pg-name' ])),
    ('anywhere remaining = narrative + mstack + the w57 comment', html.count('overflow-wrap:anywhere') == 5),
    ('break-word = play text + the two name-list laws', html.count('overflow-wrap:break-word') == 3),
    ('w60 css block present', '<style id="zpb-w60-css">' in html),
    ('w60 js block present', '<script id="zpb-w60-js">' in html),
    ('engine exposed', html.count('window.zpbNameFit') == 1),
    ('rail exposed', html.count('window.zpbAdvRail') == 1),
    ('face-off rows law', html.count('zpb-intro-brow') >= 3 and html.count('zpbStarInOutFlow') >= 2),
    ('begin playoffs shimmer', html.count('#beginPlayoffsBtn{background-size:220% 100% !important;animation:zpbbtnshine 3.4s linear infinite;}') == 1),
    ('sim playoffs ghost', html.count('#simPlayoffsBtn{background:transparent;color:var(--gold3);border:1px solid var(--tBSb);box-shadow:none;animation:none;background-size:100% 100%;}') == 1),
    ('sim playoffs off the gold list', html.count('#beginSeasonBtn2,#simPlayoffsBtn,#seasonReviewBtn') == 0),
    ('backdrop exits dead', html.count("ov.addEventListener('click', e=>{ if(e.target===ov) close(); })") == 0),
    ('run it back button', html.count('RUN IT BACK <span class="zpb-again-dot">·</span> <span class="zpb-rosterline">SAME ROSTER</span>') == 1),
    ('new draft button', html.count('id="newDraftFromSeasonBtn" style="width:auto;">NEW DRAFT</button>') == 1),
    ('no rendered ellipsis strings', html.count('seasons…') == 0 and html.count('of ${N}…') == 0 and html.count('new draft…') == 0),
    ('star rows builder', html.count('starCards.reduce') == 1 and html.count("const starHTML = slots.map") == 0),
]
bad = [name for name, okFlag in checks if not okFlag]
for name, okFlag in checks:
    print(('ok   [post] ' if okFlag else 'FAIL [post] ') + name)
if bad:
    sys.exit(1)

out = html
open(OUT, 'w', encoding='utf-8').write(out)
print('w60 bytes:', len(out), '(delta %+.0f)' % (len(out) - n0))
print('w60 md5:', hashlib.md5(out.encode()).hexdigest())
