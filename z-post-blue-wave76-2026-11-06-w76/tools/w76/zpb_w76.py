#!/usr/bin/env python3
# zpb_w76.py — wave 76 · build from the pristine w75 base (9f990ab74fb0acba9e55b82395e60647)
# Pattern law (START-OF-CHAT §5.2): asserted exact replacements + payloads + post-checks. Never hand-edit the product.
# U1-U6 = the Owner's DRAFT COMMAND CENTER edits · V-a = the slot-picker chip · V-c = keep the
# translation, drop the delta, the median of the normally-drafted pool produced once.
import hashlib, subprocess, os, re

BASE = '/home/z/my-project/work/w75.html'
OUT  = '/home/z/my-project/work/w76/Football-Sim-Z-post-blue-w76.html'

src = open(BASE, encoding='utf-8').read()
md5_base = hashlib.md5(src.encode()).hexdigest()
assert md5_base == '9f990ab74fb0acba9e55b82395e60647', 'baseline md5 drifted: ' + md5_base

def rep(old, new, n=1):
    global src
    c = src.count(old)
    assert c == n, 'anchor count %d (want %d) for: %s' % (c, n, old[:90])
    src = src.replace(old, new)

# ---------------- R1 · U1: the section-A header text is removed; the cards stay ----------------
rep("""   + (rooms.length ? '<div class="zpb-fx-sec">EVERY ROOM BELOW A B · BEST TO WORST</div><div class="zpb-fx-minis">'+roomCards+'</div>' : '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>')""",
    """   + (rooms.length ? '<div class="zpb-fx-minis">'+roomCards+'</div>' : '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>') // w76 (U1, Owner): the section header text is gone — the cards speak for themselves""")

# ---------------- R2 · U2+U3: the line text is removed; CUTDOWN DAY becomes a centered Cinzel Decorative subtitle ----------------
rep("""   + '<div class="zpb-fx-sec">CUTDOWN DAY · THE LINE IS THE AVERAGE SEASON ('+med+') · BELOW 80 OVR · KICKER OR HIGHER ON THE WIN MATH</div>'""",
    """   + '<div class="zpb-fx-cdtitle">Cutdown Day</div>' // w76 (U2+U3, Owner): the line text retires — the three rules still run in the cut math; the subtitle is centered Cinzel Decorative""")

# ---------------- R3 · U4: the footer asks for the 20-0, shimmering in the user's team color ----------------
rep("""   + '<div class="zpb-fx-foot">THE NEXT DRAFT IS WHERE YOU FIX THIS</div>'""",
    """   + '<div class="zpb-fx-foot">PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <span class="zpb-fx-goshine">20-0</span></div>' // w76 (U4, Owner): the 20-0 shimmers in the team color""")

# ---------------- R4 · U5+U6: the delta retires; the card shows the OVR badge and the Season Rating ----------------
rep("""   const star90 = shownOvr>=90, star85 = shownOvr>=85;
   const delta = x.perf - shownOvr;
   const groups = ROOM_GROUPS[r.group]||[];""",
    """   const star90 = shownOvr>=90, star85 = shownOvr>=85; // w76 (U5+V-c, Owner): the delta is retired from the visible cards
   const groups = ROOM_GROUPS[r.group]||[];""")

rep("""    + '<span class="zpb-fx-meta"><span class="zpb-fx-pos">'+(LABELS[r.slot]||r.group||'')+'</span></span></div>'
    + '<div class="zpb-fx-cutdown"><span class="zpb-fx-num">'+x.perf+'</span><i>PERFORMANCE</i>'
    + '<span class="zpb-fx-gapnum">'+(delta<0?'\\u2212':(delta>0?'+':'\\u00b1'))+Math.abs(delta)+' vs his '+shownOvr+' OVR</span>'
    + '<span class="zpb-fx-cut">CUT</span></div>'""",
    """    + '<span class="zpb-fx-meta"><span class="zpb-fx-pos">'+(LABELS[r.slot]||r.group||'')+'</span><span class="zpb-fx-pos">'+shownOvr+' OVR</span></span></div>' // w76 (U6, Owner): the OVR rides the position badge's own class — same size, structurally
    + '<div class="zpb-fx-cutdown"><span class="zpb-fx-num">'+x.perf+'</span><i>SEASON RATING</i>'
    + '<span class="zpb-fx-cut">CUT</span></div>'""")

# ---------------- R5 · V-a: the slot-picker chip reads just -x (the word FLEX retires here too) ----------------
rep("""return '<button type="button" class="zpb-slotopt" data-slotsel="'+s+'" style="'+ov+'"><span>'+(LABELS[s]||s)+'</span><i>'+(pen ? ('-'+pen+' FLEX') : (nat ? 'NATURAL' : ''))+'</i></button>';""",
    """return '<button type="button" class="zpb-slotopt" data-slotsel="'+s+'" style="'+ov+'"><span>'+(LABELS[s]||s)+'</span><i>'+(pen ? ('-'+pen) : (nat ? 'NATURAL' : ''))+'</i></button>'; // w76 (V-a, Owner): the chip reads just -x — the penalty speaks for itself""")

# ---------------- R6 · the w75 CSS block: the number steps down to about the badge size; the dead delta rule retires ----------------
rep(""".zpb-fx-num{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:900;font-size:1.18rem;color:var(--zrd,var(--bad,var(--accent2)));}
.zpb-fx-cutdown i{font-style:normal;font-size:.5rem;font-weight:800;letter-spacing:.1em;color:var(--sub);}
.zpb-fx-gapnum{font-size:.64rem;font-weight:800;color:var(--bad,var(--accent2));}""",
    """.zpb-fx-num{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:900;font-size:.72rem;color:var(--zrd,var(--bad,var(--accent2)));} /* w76 (U6, Owner): the season rating reads about the badge size */
.zpb-fx-cutdown i{font-style:normal;font-size:.5rem;font-weight:800;letter-spacing:.1em;color:var(--sub);}""")

# ---------------- R7 · V-c: the median is the normally-drafted pool's, produced once ----------------
rep("""// P12 · the rating scale — the display translation. The backend _rating math is untouched;
// the displayed number = the database's median OVR + (the raw rating - the season's raw mean).
// An average season reads the median-OVR line; a worse one reads X points below his OVR.
window.zpbMedianOvr = function(){
 if(window.__zpbMedOvr!=null) return window.__zpbMedOvr;
 try{
  const a = (typeof PLAYERS!=='undefined' ? PLAYERS : []).map(p=>p[3]).slice().sort((x,y)=>x-y);
  const m = a.length>>1;
  window.__zpbMedOvr = a.length ? (a.length%2 ? a[m] : Math.round((a[m-1]+a[m])/2)) : 76;
 }catch(err){ window.__zpbMedOvr = 76; }
 return window.__zpbMedOvr;
};""",
"""// P12 · the rating scale — the display translation. The backend _rating math is untouched;
// the displayed number = the drafted pool's median OVR + (the raw rating - the season's raw mean).
// w76 (V-c, Owner): the median is the NORMALLY-DRAFTED pool's — the picks the draft actually makes
// (TOTAL_ROUNDS x 32 off the POS_SLOT_MAP-filtered board), so the 50s that never come off the
// board are out — produced ONCE as a stored derived value, never recalculated per draft.
window.zpbMedianOvr = function(){
 if(window.__zpbMedOvr!=null) return window.__zpbMedOvr; // produced once — the stored derived value
 try{
  const take = ((typeof TOTAL_ROUNDS!=='undefined') ? TOTAL_ROUNDS : 32) * 32; // the picks the draft actually makes
  const pool = (typeof PLAYERS!=='undefined' && typeof POS_SLOT_MAP!=='undefined') ? PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).map(p=>p[3]).sort((x,y)=>y-x) : [];
  const drafted = pool.slice(0, take); // the normally-drafted pool
  const a = (drafted.length >= take ? drafted : pool).slice().sort((x,y)=>x-y);
  const m = a.length>>1;
  window.__zpbMedOvr = a.length ? (a.length%2 ? a[m] : Math.round((a[m-1]+a[m])/2)) : 76;
 }catch(err){ window.__zpbMedOvr = 76; }
 return window.__zpbMedOvr;
};""")

# ---------------- R8 · V-c+U5: the Guide's explainer line stays truthful ----------------
rep("""THE PERFORMANCE SCALE · an average season reads ${window.zpbMedianOvr?window.zpbMedianOvr():76} — the database’s median OVR — and a rating under his OVR counts the points he fell short.</p>""",
    """THE PERFORMANCE SCALE · an average season reads ${window.zpbMedianOvr?window.zpbMedianOvr():76} — the drafted pool’s median OVR — and every season is measured against that line.</p>""")

# ---------------- R8b · the explainer rides the LIVE why-box (w75's copy sat in the shadowed original and never rendered) ----------------
rep(""" return '<div class="zpb-whygrid">' + parts.map(tile).join('') + '</div>';
};""",
    """ return '<div class="zpb-whygrid"><p class="detail-item zpb-whyscale">THE PERFORMANCE SCALE · an average season reads ' + (window.zpbMedianOvr ? window.zpbMedianOvr() : 76) + ' — the drafted pool’s median OVR — and every season is measured against that line.</p>' + parts.map(tile).join('') + '</div>'; // w76 (V-c+U5, Owner): the scale line moves into the live tiles box — the shadowed original never rendered it
};""")

# ---------------- R9 · the w76 CSS block: the Cutdown Day subtitle + the team-color 20-0 shimmer ----------------
W76_CSS = """<style id="zpb-w76-css">
/* ============ Z-POST-BLUE W76 (the Owner's round) ============ */
/* 1) CUTDOWN DAY — a centered Cinzel Decorative subtitle, larger than the retired section line (Owner U3) */
.zpb-fx-cdtitle{text-align:center;font-family:'Cinzel Decorative',serif;font-weight:800;letter-spacing:.2em;font-size:.8rem;margin:16px 0 8px;color:var(--tA2,var(--gold3));}
:root[data-theme="dark"] .zpb-fx-cdtitle{color:var(--gold2,#e8c87e);}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-fx-cdtitle{color:var(--gold2,#e8c87e);} }
/* 2) the 20-0 shimmer — the fxshine sweep riding the user's pack ink (Owner U4) */
.zpb-fx-goshine{color:var(--zrb,var(--accent));}
:root[data-theme="dark"] .zpb-fx-goshine{color:var(--zrd,var(--accent2));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-fx-goshine{color:var(--zrd,var(--accent2));} }
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.zpb-fx-goshine{background-image:linear-gradient(100deg,var(--zrb,var(--accent)),color-mix(in srgb,var(--zrb,var(--accent)) 82%,#fffaf2) 50%,var(--zrb,var(--accent))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;font-weight:800;}
:root[data-theme="dark"] .zpb-fx-goshine{background-image:linear-gradient(100deg,var(--zrd,var(--accent2)),color-mix(in srgb,var(--zrd,var(--accent2)) 82%,#3a2a12) 50%,var(--zrd,var(--accent2))) !important;}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-fx-goshine{background-image:linear-gradient(100deg,var(--zrd,var(--accent2)),color-mix(in srgb,var(--zrd,var(--accent2)) 82%,#3a2a12) 50%,var(--zrd,var(--accent2))) !important;} }
}
@media (prefers-reduced-motion: reduce){ .zpb-fx-goshine{animation:none !important;} }
/* 3) the scale line leads the why-box tiles (V-c: the drafted pool's median, no shortfall wording) */
.zpb-whyscale{grid-column:1/-1;margin:0 0 2px;}
</style>
"""

assert '</body>' in src and src.rstrip().endswith('</html>')
idx = src.rindex('</style>')
tail = src[idx+len('</style>'):].strip()
assert tail.startswith('<script id="zpb-w75-js">') and tail.endswith('</html>'), 'unexpected tail after the last style block: %r' % tail[:60]
src = src[:idx+len('</style>')] + '\n' + W76_CSS + src[idx+len('</style>'):]

open(OUT, 'w', encoding='utf-8').write(src)
md5 = hashlib.md5(src.encode()).hexdigest()
print('w76 written ·', len(src.encode()), 'bytes · md5', md5)

# ---------------- post-checks ----------------
assert 'EVERY ROOM BELOW A B' not in src, 'U1 the section-A header must be gone'
assert 'THE LINE IS THE AVERAGE SEASON' not in src, 'U2 the line text must be gone'
assert 'THE NEXT DRAFT IS WHERE YOU FIX THIS' not in src, 'U4 the old footer must be gone'
assert 'PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <span class="zpb-fx-goshine">20-0</span>' in src
assert '>Cutdown Day</div>' in src and src.count('zpb-fx-cdtitle') >= 2
assert 'zpb-fx-gapnum' not in src, 'U5 the delta span and its CSS must be gone'
assert 'vs his ' not in src, 'U5 the delta wording must be gone'
assert '<i>SEASON RATING</i>' in src and '<i>PERFORMANCE</i>' not in src
assert "'-'+pen+' FLEX'" not in src, 'V-a the slot-picker FLEX word must be gone'
assert "(pen ? ('-'+pen) : (nat ? 'NATURAL' : ''))" in src
assert 'const delta = x.perf - shownOvr;' not in src
assert 'normally-drafted pool' in src and 'window.__zpbMedOvr' in src
assert 'PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).map(p=>p[3])' in src
assert 'the drafted pool’s median OVR' in src and 'counts the points he fell short' not in src
assert src.count('THE PERFORMANCE SCALE') == 2, 'R8/R8b the scale line lives in the original AND the live override'
assert 'zpb-whyscale' in src
assert src.count("zpb-fx-pos\">'+shownOvr+' OVR") == 1, 'U6 the OVR badge rides the position badge class'
assert src.count('EVERY ROOM AT A B OR BETTER') == 1, 'U1 the twin no-rooms header was not in scope — it stays'
# the old surface is gone everywhere: no FLEX chip anywhere in a picker or fill
assert src.count('FLEX') >= 1  # the feature's own name (YOU CAN FLEX, FLEX[tag]) stays — only the chips changed
# quote sanity per style block
for i, s in enumerate(re.findall(r'<style[^>]*>(.*?)</style>', src, re.S)):
    q = s.count('"') - s.count('\\"')
    assert q % 2 == 0, 'style block %d has an odd number of double quotes (%d)' % (i, q)

blocks = re.findall(r'<script>(.*?)</script>', src, re.S) + re.findall(r'<script id="[^"]+">(.*?)</script>', src, re.S)
os.makedirs('/tmp/w76check', exist_ok=True)
fails = 0
seen = set()
for i, b in enumerate(blocks):
    if b in seen: continue
    seen.add(b)
    p = '/tmp/w76check/b%d.js' % i
    open(p, 'w', encoding='utf-8').write(b)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    if r.returncode != 0:
        fails += 1
        print('BLOCK', i, 'FAILS:', r.stderr[:400])
assert fails == 0, '%d script blocks fail syntax' % fails
print('ALL SCRIPT BLOCKS PARSE OK (%d unique)' % len(seen))
print('POST-CHECKS PASSED')
