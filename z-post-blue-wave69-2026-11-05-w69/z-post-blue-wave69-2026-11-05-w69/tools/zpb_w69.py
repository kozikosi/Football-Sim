#!/usr/bin/env python3
"""w69 chain step 1 — the WAVE header, the preseason dropdown alignment (UI 4),
and the w69 style plant (UI 1 the 20-0 pill ink + UI 5 the pick-list family CSS).
Baseline: the shipped w68 bytes (md5 22bc00ab8cc244da7ba8030a5a67c8da)."""
import hashlib, re, sys

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
BASE_MD5 = '22bc00ab8cc244da7ba8030a5a67c8da'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == BASE_MD5, 'baseline md5 drifted'
src = raw.decode('utf-8')
n_styles0 = src.count('<style')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---------- 1 · the WAVE/CLAIMS header ----------
start = src.index('WAVE: w68')
end = src.index('-->', start)
header = src[start:end]
assert 'CLAIMS:' in header and 'w68_owner' in header, 'unexpected header block'
new_header = """WAVE: w69
CLAIMS:
- Owner UI 1: the 20-0 on the final TRY AGAIN pill reads on the button - the gold-on-gold
  retires. Inside a .zpb-ctabig (a team-gradient pill) the shine sweeps the ON-GOLD ink
  family (var(--tOn), the pack's readable-on-gradient coffee, through one lightened step of
  itself), never the gold ramp the button itself is painted with; the sweep keeps the
  fxshine cadence, and the no-clip fallback reads solid var(--tOn). The page-level shines
  (the cyg lines, the rest box) are untouched.
- Owner UI 2: the WHERE YOUR PLAYERS LINE UP? map's ink is solved against the EFFECTIVE
  paint - the bubble tint at its real alpha (18% offense / 16% defense) over the glass panel
  over the page, light and dark, per team. The old solve read the SOLID swatch, so dark mode
  chose dark-brown ink for a dark surface (his Browns report). The offense tint now follows
  the takeover's --g2 (the color the bubble actually carries) instead of the fixed gold.
  Battery: all 32 teams x both modes clear 4.5:1 on the computed surface.
- Owner UI 3: the player cards' names ride the TIER LAW on the review page - 90+ shimmers,
  85+ bold, the rest the team's neutral 0.50 ink. The award/stat-champion winner cards
  (regular + playoff) now tier the name from the winner's own OVR; the AP1-gold name
  overlay retires from the CARDS (an 88-OVR AP1 reads bold, a 95-OVR non-AP1 shimmers; the
  w68 golden border + glow stay on the card; the All-Pro/Pro-Bowl/All-Playoff CHIPS keep
  their own laws; the coach's YOU keeps the w66 shimmer). Flagged in the ledger for the
  Owner to overrule.
- Owner UI 4: the preseason page's section 2/3 dropdowns (#scriptOff / #scriptDef /
  #aggrSel - the "Auto (recommended)" and "Balanced" boxes) gain the house left padding
  (12px, the draftSetup chrome) - the bare base select rule painted the first letter into
  the rounded corner (padding-left was 0). Every other select keeps its own padding.
- Owner UI 5: the dropdown player names wear the house language - the lineup editor's pick
  lists (every slot, the Dime, the KR row) now read Cinzel in the team's 0.50 ink (txM
  light / txMd dark), the tier law rides the rows (90+ shimmer / 85+ bold from the player's
  own OVR), and the rows gain the praised hover (the team wash + the 3px glide). Every
  dropdown menu inventoried and probed: the compare family (already the house family), the
  fills dropdown (w66 law), the draftSetup bubbles (w67 law), the board/browser filters and
  the preseason trio (label dropdowns - chrome + padding, this wave).
- Owner UI 6: the award lines carry the CREST, not the written team name - the All-Playoff
  Team chips, the Coach of the Year line, and the playoff round cards' score lines read the
  team logo; the crests go BEFORE the name (his lean) and around the score (the SB-page
  law), with the written name only as the no-crest fallback. The SB-MVP line's score
  separator joins the dash law (a single-game score reads the dash). Batteries: w69_owner
  (this round, live), w69_dropdowns (every menu), w69_map (32 teams x 2 modes); the
  standing suites re-pointed at w69. Baseline md5 22bc00ab8cc244da7ba8030a5a67c8da.
"""
src = src[:start] + new_header + src[end:]
print('  ok wave header -> w69')

# ---------- 2 · UI 4 · the base select gains the house left padding ----------
rep(""" background-repeat:no-repeat,no-repeat;background-position:right 13px center,0 0;
 background-size:12px 8px,100% 100%;
 padding-right:32px;""",
    """ background-repeat:no-repeat,no-repeat;background-position:right 13px center,0 0;
 background-size:12px 8px,100% 100%;
 padding-left:12px;padding-right:32px; /* W69 (Owner, UI 4): the bare selects painted the first letter into the rounded corner - the house 12px chrome, the draftSetup pairing */""",
    'select left padding')

# ---------- 3 · the w69 style plant (UI 1 + UI 5 CSS) ----------
plant = """<style id="zpb-w69-css">
/* ============ Z-POST-BLUE W69 (the Owner's round-69) ============ */
/* UI 1 (Owner): the 20-0 on the TRY AGAIN pill reads on the button. The pill is the team
   gradient; the gold shimmer on it was gold on gold. Inside .zpb-ctabig the shine sweeps
   the ON-GOLD ink family (--tOn, the pack's readable-on-gradient coffee), never the golds. */
.zpb-ctabig .zpb-shine{color:var(--tOn,var(--ongold,#2c1e0c)) !important;-webkit-text-fill-color:var(--tOn,var(--ongold,#2c1e0c)) !important;background:none !important;animation:none;}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOn,var(--ongold,#2c1e0c)),color-mix(in srgb,var(--tOn,var(--ongold,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOn,var(--ongold,#2c1e0c))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}
:root[data-theme="dark"] .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;} }
/* UI 5 (Owner): the dropdown player names wear the house language - the lineup editor's
   pick lists read Cinzel in the team's 0.50 ink; the tier law rides the rows (the generic
   .zpb-shm/.zpb-vib machinery carries the 90+ sweep and the 85+ weight); the hover is the
   praised compare-family treatment (the team wash + the 3px glide). */
.zpb-pickbtn .zpb-pickname{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:600;letter-spacing:.02em;color:var(--tTxM,var(--text));}
.zpb-pickrow b{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:600;letter-spacing:.02em;color:var(--tTxM,var(--text));}
:root[data-theme="dark"] .zpb-pickbtn .zpb-pickname,:root[data-theme="dark"] .zpb-pickrow b{color:var(--tTxMd,var(--tTxM,var(--text)));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-pickbtn .zpb-pickname,:root:not([data-theme="light"]) .zpb-pickrow b{color:var(--tTxMd,var(--tTxM,var(--text)));} }
.zpb-pickrow{transition:transform .15s ease,background .15s ease;}
.zpb-pickrow:hover,.zpb-pickrow:focus-visible{background:var(--tTA,color-mix(in srgb,var(--tA,var(--accent)) 12%,transparent));transform:translateX(3px);}
.zpb-pickbtn:hover,.zpb-pickbtn:focus-visible{border-color:var(--tA,var(--accent));}
</style>
</body>"""
rep('</body>\n</html>', plant + '\n</html>', 'w69 style plant', count=1)

# ---------- post-checks ----------
n_open = src.count('<style'); n_close = src.count('</style>')
assert n_open == n_close, f'style balance broken: {n_open}/{n_close}'
assert 'zpb-w69-css' in src
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step1 done -> md5 {h} bytes {len(src.encode("utf-8"))} styles {n_open}/{n_close}')
