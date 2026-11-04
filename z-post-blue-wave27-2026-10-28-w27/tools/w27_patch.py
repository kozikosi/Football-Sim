#!/usr/bin/env python3
# w27_patch.py — wave 27 build from w26. Anchored + asserted; aborts on any drift.
# Stage 1 edits recovered byte-exact from the verified stage-1 artifact; fixes folded in.
import sys, hashlib, json, os

SRC = '/home/z/my-project/download/Football-Sim-Z-post-blue-w26.html'
DST = '/home/z/my-project/build/Football-Sim-Z-post-blue-w27.html'
HERE = os.path.dirname(os.path.abspath(__file__))

s = open(SRC, encoding='utf-8').read()
orig_md5 = hashlib.md5(s.encode()).hexdigest()
assert orig_md5 == '5f947bccf2a9392a85fe01ef11164622', f'unexpected source md5 {orig_md5}'

edits = []
def rep(old, new, n=1, tag=''):
    global s
    c = s.count(old)
    if c != n:
        print(f'FAIL [{tag}] anchor count {c} != {n}: {old[:90]!r}')
        sys.exit(1)
    s = s.replace(old, new)
    edits.append(tag)

# ---- stage 1: recovered byte-exact edit set (19 replaces + 4 anchored inserts) ----
REC = json.load(open(os.path.join(HERE, 'w27_stage1_edits.json'), encoding='utf-8'))
for old, new in REC['pairs']:
    rep(old, new, 1, 'S1 pair')
rep("\nconst PLAYERS = [[\"Ja'Marr Chase\"",
    "\nwindow.ZPB_BLUE_LIFT = {\"Buffalo Bills\":1, \"Los Angeles Rams\":1}; // w27 (Owner): colors that are too dark\nconst PLAYERS = [[\"Ja'Marr Chase\"", 1, 'S1 6b lift-flag')
for prev, block in REC['inserts']:
    rep(prev, prev + '\n' + block, 1, 'S1 insert')
rep('return \'<div class="zpb-swgroup zpb-4words">\' + zpbSw(\'DRAFT\') + zpbSw(\'SEASON\') + zpbSw(\'PLAYOFFS\') + zpbSw(\'SUPER BOWL\') + \'</div>\'\n  + sec(\'DRAFTING: WHICH POSITIONS MATTER\', zpbDraftGuideHTML(), true)\n  + sec(\'DEFENSE: 4-3, 3-4, NICKEL, DIME\', zpbDefGuideHTML(), true) // w26 (Owner): up below the flex section\n  + sec(\'READING THE DRAFT BOARD (WINS, PRIORITY, GONE)\', zpbSwWrap(board), false)\n  \n  + sec(\'COACHING: PERSONNEL, STYLES AND GAME PLANS\', zpbCoachGuideHTML(coach), false)\n  + sec(\'THE MATH OF EVERY GAME-PLAN CHOICE\', planMathHTML(), false)\n  + sec(\'THE BADGES: READING EVERY BOX\', zpbBadgesGuideHTML(), true)\n  + sec(\'GLOSSARY\', zpbGlossHTML(), false);',
    'return \'<div class="zpb-swgroup zpb-4words">\' + zpbSw(\'DRAFT\') + zpbSw(\'SEASON\') + zpbSw(\'PLAYOFFS\') + zpbSw(\'SUPER BOWL\') + \'</div>\'\n  + sec(\'DRAFTING: WHICH POSITIONS MATTER\', zpbDraftGuideHTML(), true)\n  + sec(\'DEFENSE: 4-3, 3-4, NICKEL, DIME\', zpbDefGuideHTML(), true)\n  + sec(\'COACHING: PERSONNEL, STYLES AND GAME PLANS\', zpbCoachGuideHTML(coach), true) // w27 (Owner): up below Defense, open and visible at default\n  + sec(\'THE BADGES: READING EVERY BOX\', zpbBadgesGuideHTML(), true) // w27 (Owner): up below Coaching\n  + sec(\'READING THE DRAFT BOARD (WINS, PRIORITY, GONE)\', board, true) // w27 (Owner): open and visible, visualized like the other panels\n  + sec(\'THE MATH OF EVERY GAME-PLAN CHOICE\', planMathHTML(), false)\n  + sec(\'GLOSSARY\', zpbGlossHTML(), false);',
    1, 'S2 11a guide-order')
rep('const board = `<h5 class="narr" style="margin:6px 0;">Reading the draft board</h5>${boardMathHTML()}<p style="margin:8px 0 0;"><b>One Undo per draft.</b> The ↶ Undo button takes back your most recent pick — once per draft, and only while you are on the clock.</p>`;',
    'const board = `${boardMathHTML()}<p style="margin:8px 0 0;"><b>One Undo per draft.</b> The ↶ Undo button takes back your most recent pick — once per draft, and only while you are on the clock.</p>`; // w27: the heading lives on the panel itself now',
    1, 'S2 11b board-heading')
rep('  let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : \'\')}`;',
    '  let html = `<h4 style="margin-top:0;">Where they belong</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : \'\')}`; // w27 (Owner): the roster list above the cards is gone — the draft pick wears the field instead',
    1, 'S2 13a detail-map')
k0 = s.find('function boardMathHTML(){')
k1 = s.find('function termsHTML(){', k0)
assert k0 > 0 and k1 > k0, 'boardMathHTML bounds'
BM = 'function boardMathHTML(){\n // w27 (Owner): the Wins / Priority / Gone explanation, visualized like the other panels — words kept, boxes added\n const col = (word, tone, body)=>\'<div class="zpb-bmcol">\'\n  + \'<span class="zrl-badge \'+(tone||\'\')+\'">\'+word+\'</span>\'\n  + \'<div class="narr">\'+body+\'</div></div>\';\n return \'<div class="zpb-bmgrid">\'\n  + col(\'WINS\', \'zpb-shm\', \'<b>How good is he.</b> How many more games per season a player adds than a 70-rated player at his position, according to the same matchup math that plays the games. It is <i>static</i>: the same number for everyone with that position and rating, on every team and at every point in the draft. If a position has several starting spots (two tackles, three receivers), Wins averages across them. Running back 2, tight end 2 and the strongside linebacker are depth roles and are left out. (Guards and centers are valued the same, which is why a 76 center and a 76 guard have identical Wins.)\')\n  + col(\'PRIORITY\', \'\', \'<b>Do I need to take him now.</b> What picking him now adds over the best you could expect to still find at that spot at your next pick. To estimate it, the site replays the computer teams\\u2019 picks twelve times between now and your next turn and averages what is left. A big priority means waiting costs you; a priority near zero or negative means someone about as good will probably still be there. Priority changes as your roster fills and as the board thins.\')\n  + col(\'GONE\', \'\', \'<b>Is he about to leave.</b> The chance that a player of this type (same position group and same value) has been picked before your next turn, across those twelve replays.\')\n  + \'</div>\'\n  + \'<div class="zpb-bmcall"><b>Why can a linebacker show high priority?</b> Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\\u2019s priority can be higher even though his Wins number is smaller. The Wins column is the clean \\u201chow good is he\\u201d number; Priority is the \\u201cdo I need to take him now\\u201d number.</div>\'\n  + \'<p style="margin:8px 0 0;"><b>How the computer teams pick.</b> Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness.</p>\';\n}'
s = s[:k0] + BM + '\n' + s[k1:]
edits.append('S2 12a board-visualized')
rep("  const isPick = sel.id==='draftPickNumberSelect';\n  const abbrOf = n=>{",
    "  const isPick = sel.id==='draftPickNumberSelect';\n  const cityOf = n=>{ const w = (n||'').split(' '); return w.length>1 ? w.slice(0,-1).join(' ') : ''; }; // w27 (Owner): 'Kansas City' when the full name will not fit\n  const fitFace = b=>{ const f = b && b.querySelector ? b.querySelector('.zpb-face') : null; if(!f || !f.querySelector('.zpb-fl')) return;\n   f.classList.remove('zpb-fit-c','zpb-fit-a');\n   if(f.scrollWidth > f.clientWidth + 1){ f.classList.add('zpb-fit-c');\n    if(f.scrollWidth > f.clientWidth + 1) f.classList.add('zpb-fit-a'); } }; // w27: full -> city -> abbreviation, measured, never a clipped word\n  const abbrOf = n=>{",
    1, 'S3 14a sel-helpers')
rep('   else btn.innerHTML = logo(v) + \'<span class="zpb-face" style="\' + vars + \'">\' + face + \'</span>\';\n  };',
    '   else if(/ /.test(v || \'\') && v !== \'__random\'){\n    btn.innerHTML = logo(v) + \'<span class="zpb-face" style="\' + vars + \'"><span class="zpb-fl">\' + face + \'</span><span class="zpb-fc">\' + (cityOf(v) || abbrOf(v)) + \'</span><span class="zpb-fa">\' + abbrOf(v) + \'</span></span>\';\n    fitFace(btn); // w27 (Owner): the static box shows complete words only\n   }\n   else btn.innerHTML = logo(v) + \'<span class="zpb-face" style="\' + vars + \'">\' + face + \'</span>\';\n  };\n  if(\'ResizeObserver\' in window){ try{ new ResizeObserver(()=>fitFace(btn)).observe(btn); }catch(e){} }\n  window.addEventListener(\'resize\', ()=>fitFace(btn));',
    1, 'S3 14b sel-face')
rep("  sel.addEventListener('change', label);\n  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });\n  setTimeout(label, 0); // w19: first paint waits a tick so team abbreviations exist",
    "  sel.addEventListener('change', label);\n  sel.addEventListener('zpbrelabel', label); // w27 (Owner): a value set by code repaints the face too\n  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });\n  setTimeout(label, 0); // w19: first paint waits a tick so team abbreviations exist\n  setTimeout(label, 350); // w27: second pass once every option and value has settled",
    1, 'S4 4A relabel-event')
rep("  selA.value = 'Kansas City Chiefs'; selB.value = 'Las Vegas Raiders';\n  selA.addEventListener('change', renderHomeComparison);\n  selB.addEventListener('change', renderHomeComparison);\n  homeCmpInit = true;",
    "  selA.value = 'Kansas City Chiefs'; selB.value = 'Las Vegas Raiders';\n  selA.dispatchEvent(new Event('zpbrelabel')); selB.dispatchEvent(new Event('zpbrelabel')); // w27 (Owner): the closed boxes paint complete words from the first frame\n  selA.addEventListener('change', renderHomeComparison);\n  selB.addEventListener('change', renderHomeComparison);\n  homeCmpInit = true;",
    1, 'S4 4B cmp-relabel')
rep(" const og = document.createElement('optgroup');\n og.label = 'The Series';\n let acc = [];\n order.forEach((s,i)=>{",
    " const og = document.createElement('optgroup');\n og.label = 'The Series';\n let acc = [];\n order.slice(0, 26).forEach((s,i)=>{ // w27 (Owner): THE SERIES runs 1-26",
    1, 'S4 4C series-26')
rep('.zpb-lu-win{font-weight:800;box-shadow:inset 0 0 0 1px var(--zrb,var(--accent)),0 0 12px var(--zr1,transparent);}',
    '.zpb-lu-win{box-shadow:inset 0 0 0 1px var(--zrb,var(--accent)),0 0 12px var(--zr1,transparent);} /* w27 (Owner): the win edge is color, never bold */',
    1, 'S4 4D1 lu-win-1')
rep('.zpb-lu-win{color:var(--zrb,var(--accent)) !important;font-weight:800;box-shadow:none !important;}',
    '.zpb-lu-win{color:var(--zrb,var(--accent)) !important;box-shadow:none !important;} /* w27 (Owner): the win edge is color, never bold */',
    1, 'S4 4D2 lu-win-2')
# (4E dime-dot folded into the payload CSS itself)
rep('window.zpbDimeDrafRow = function(roster){\n const d = window.zpbDimeOf ? window.zpbDimeOf(roster.slots) : null;\n return `<div class="depth-row dgrid zpb-dimerow"><span class="slotname">Dime</span><span class="${d?\'playername\':\'empty\'}">${d?d[0]:\'\'}</span><span class="dovr">${d?d[3]:\'\'}</span><span class="narr dwar"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip\n};',
    'window.zpbDimeDrafRow = function(roster){\n const d = window.zpbDimeOf ? window.zpbDimeOf(roster.slots) : null;\n const zst = (typeof zpbUserRowVars===\'function\') ? zpbUserRowVars() : \'\';\n const cls = d ? (d[3]>=90?\'zpb-shm\':(d[3]>=85?\'zpb-vib\':\'\')) : \'\'; // w27: the Dime follows the tier law like every other row\n return `<div class="depth-row dgrid zpb-dimerow"${zst?` style="${zst}"`:\'\'}><span class="slotname">Dime</span><span class="${d?\'playername\':\'empty\'} ${cls}">${d?d[0]:\'\'}</span><span class="dovr">${d?d[3]:\'\'}</span><span class="narr dwar"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip\n};',
    1, 'S3 15a dime-row')
rep('h += `<tr class="zpb-trow" style="${typeof zpbRowVars===\'function\'?zpbRowVars(r.p[2]):\'\'}"><td class="dc-name">${topTag(r)}${r.p[0]}</td>',
    'h += `<tr class="zpb-trow${top3.has(r.p[0])?\' zpb-top3\':\'\'}" style="${typeof zpbRowVars===\'function\'?zpbRowVars(r.p[2]):\'\'}"><td class="dc-name">${topTag(r)}${r.p[0]}</td>',
    1, 'S3 16a top3-class')

rep(".zpb-defdots i.c-nk{background:#e8c46a !important;border-color:#b3913f !important;}",
    ".zpb-defdots i.c-nk{background:#4f86e0 !important;border-color:#3a63ad !important;} /* w27 (Owner): Nickel's own color */",
    1, 'F1 nickel-dot')
rep(".zpb-defdots i.c-dm{background:transparent !important;border:1px dashed #c96a7e !important;}",
    ".zpb-defdots i.c-dm{background:#7fd67f !important;border:1px solid #58b658 !important;box-shadow:0 0 8px rgba(127,214,127,.5);} /* w27 (Owner): filled in when he is in the lineup */",
    1, 'F1 dime-dot')

# ---- payloads ----
W27_CSS = open(os.path.join(HERE, 'payloads', 'w27.css'), encoding='utf-8').read()
W27_JS = open(os.path.join(HERE, 'payloads', 'w27.js'), encoding='utf-8').read()
anchor = '<script id="zpb-w26-js">'
rep(anchor, '<style id="zpb-w27-css">' + W27_CSS + '\n</style>\n' + anchor, 1, '17a css-payload')
rep('</body>\n</html>', W27_JS + '\n</body>\n</html>', 1, '17b js-payload')

open(DST, 'w', encoding='utf-8').write(s)
print('W27 WRITTEN — total edits:', len(edits))
print('md5:', hashlib.md5(s.encode()).hexdigest(), 'bytes:', len(s.encode()))
