#!/usr/bin/env python3
"""w66 chain step 1 — the P-claims header, the draft-board mid-window law, the pregame
clearance law, the field-map team colors, and WEAKEST. Asserts every anchor; re-runs
clean from the pristine w65 baseline."""
import hashlib, io, sys

SRC = '/home/z/my-project/work/baseline-w65.html'
DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
BASE_MD5 = '948f789da6d3ccf064104212ec748f3a'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == BASE_MD5, 'baseline md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:80]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the P-claims header (the cross-track convention, Claude-approved, required w66+) ----
HEADER = '''<!--
WAVE: w66
CLAIMS:
- P-232: the AUTO lineup is natural-first — stage one assigns every player to a slot his
  real NFL position plays (Hungarian over natural slots only); stage two fills a slot that
  would otherwise sit empty with the best IN-UNIT flex only (ZPB_AUTO_UNITS: OL->OL,
  HB/FB, WR-only, TE-only, DL internal, LB->LB, secondary internal, K->K(+P for the fill),
  P->P; no OT->RB1, no P->K, no LB->DE, no DE->LB, no WR->TE, no RB->WR). The FLEX table
  itself is UNTOUCHED (REV 4 stands for the user's manual flexing). The DRAFT brain obeys
  the same law: cpuPick values in-unit placements only, the user's auto-picks land
  natural-first (zpbAutoFindSlot), nobody drafts a second specialist or a third TE early,
  an unfilled real slot pays a growing premium (rounds 15+), the last resort accepts only
  near-free (<=2) conversions and never into the skill/specialist slots
  (TE/WR/FB/K/P — and the audit caught the LAST path twice: cpuPick's anyone-anywhere
  escape put a DT at TE2/TE3 on the user's own board, whose lineup is never re-optimized;
  the escape is retired entirely — a pick with no legal landing passes and the slot sits
  honestly empty), and zpbFillAllLineups fills in-unit (the flat -9 anyone-anywhere
  emergency is retired). MEASURED POOL FACT the claims rest on: the
  embedded 1,188-player pool carries only 53 tight ends for 96 TE slots — the model leaves
  the surplus TE slots honestly EMPTY (70-OVR default in the math) instead of flexing wide
  receivers into them, which is the exact absurdity class P-232 flags.
- P-174: the Player Browser is an infinite scroll — renderPlayers shows the first 60 and an
  IntersectionObserver sentinel (#pbSentinel, rootMargin 160px) appends the next 60 while
  scrolling; no PREV/NEXT buttons, no "PAGE X OF Y", the #playerPager div is gone, and the
  false "carries the Owner's page law" comment is replaced with the truth. Madden Rankings
  has no pager and is untouched.
- P-175 (partial): the draft board obeys the mid-window law — .draft-columns keeps its
  340px rail only above 861px (the unconditional override retires; 761-860 stacks the rail
  below the board like <=760 already does) and 761-1120px reads the w57 two-line card
  (line one: name · OVR · Draft; line two: pos · team · ovr · wins · pri · gone · fills),
  so the Draft button can never clip behind the panel's right edge.
- P-124 (partial): the Season Review page's "Try again to go 20-0?" leaves the top bar and
  rides its own centered panel at the bottom, filled + shimmering (zpb-ctabig family, the
  zpb-shine 20-0 kept); the strengths/weaknesses graphics themselves are unchanged.
No P-item (Owner UI round): every Draft button pulses (zpbBtnPulse); the top-3 priority
Draft buttons upgrade to the filled team-gradient sheen (zpb-ctabig, the Play-the-X
treatment) · the field map ("where each position lines up") and the guide's flex-cost
chips wear the team theme with 0.5-strength team ink (--accent2), never the fixed
yellow/black · the pregame marquee clears the replay header line at every size
(.zpb-rep-intro top:67px; the <=600px paddings rebalanced) · "RETURN TO MODEL LINEUP" is
renamed RETURN TO AUTO LINEUP and hidden until the user has actually touched the lineup
(roster._zpbTouched) · "Shakiest" reads "WEAKEST" in WHY THIS STYLE · a team that misses
the playoffs gets the standalone centered SEASON REVIEW panel on the regular-season review
page (phase regularReview), opening the same shared review page — no playoff sim required.
-->
<!DOCTYPE html>'''
rep('<!DOCTYPE html>', HEADER, 'p-claims header', 1)

# ---- 2 · the draft board's mid-window law (the unconditional override retires) ----
rep('.draft-columns{grid-template-columns:1fr 340px;}',
    '/* W66 (Owner): the 340px rail is a WIDE-window luxury — below 861px the base law stacks it\n'
    '   under the board again (the unconditional override squeezed the board panel to ~375px\n'
    '   at 761-860px and pushed every Draft button behind the panel\'s right edge). */\n'
    '@media (min-width:861px){.draft-columns{grid-template-columns:1fr 340px;}}',
    'draft-columns law', 1)

# ---- 3 · the mid-band two-line card (761-1120) — the w57 phone law, one band up ----
CLOSE = '.zpb-rep-intro{padding-top:56px;}\n}\n</style>\n</body>\n</html>'
MIDBAND = '''.zpb-rep-intro{padding-top:0;}\n}
/* W66 (Owner): the mid window reads the same TWO-LINE draft card the phone reads — the old
   761-1120 card folded the info onto three lines (five when the panel was squeezed) and let
   the Draft button ride past the panel's right edge. Line one: name · OVR · Draft; line two:
   pos · team · ovr · wins · pri · gone · fills. */
@media (min-width:761px) and (max-width:1120px){
 #draftTable2 tr{row-gap:2px;padding:4px 8px;}
 #draftTable2 td.dc-name{grid-column:1/9;grid-row:1;}
 #draftTable2 td.dc-btn{grid-column:9/13;grid-row:1;}
 #draftTable2 td[data-label="Pos"]{grid-column:1/2;grid-row:2;}
 #draftTable2 td[data-label="Team"]{grid-column:2/4;grid-row:2;}
 #draftTable2 td.dc-ovr{grid-column:4/5;grid-row:2;font-size:.68rem;padding:0 !important;background:none !important;border-radius:0;}
 #draftTable2 td.dc-wins{grid-column:5/6;grid-row:2;}
 #draftTable2 td.dc-pri{grid-column:6/8;grid-row:2;}
 #draftTable2 td.dc-gone{grid-column:8/10;grid-row:2;text-align:left !important;}
 #draftTable2 td.dc-fills{grid-column:10/13;grid-row:2;text-align:right !important;}
 #draftTable2 td:nth-child(2),#draftTable2 td:nth-child(3),#draftTable2 td.dc-wins,#draftTable2 td.dc-pri,#draftTable2 td.dc-gone,#draftTable2 td.dc-fills{font-size:.68rem;}
 #draftTable2 td .zpb-ovrchips{display:none;}
 #draftTable2 td.dc-btn button{white-space:nowrap;max-width:100%;}
}
</style>
</body>
</html>'''
rep(CLOSE, MIDBAND, 'mid-band two-line card', 1)

# ---- 4 · the pregame marquee clears the replay header line at EVERY size ----
rep('.zpb-rep-intro{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;z-index:5;',
    '.zpb-rep-intro{position:absolute;inset:67px 0 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;z-index:5; /* W66 (Owner): the column starts UNDER the 67px header — the title and the logos can never ride over the line again, at any width or height */',
    'intro top inset', 1)
rep('.zpb-rep-intro{justify-content:flex-start;padding-top:64px;gap:9px;} /* w65 (Owner): the logos and the key players sit lower — the header line shows clean above them */',
    '.zpb-rep-intro{justify-content:flex-start;padding-top:10px;gap:9px;} /* w66 (Owner): the 67px top inset now does the clearance work — the phone keeps its approved resting place with a 10px floor */',
    'phone intro floor', 1)

# ---- 5 · the field map wears the team theme (0.5 team ink, never the fixed yellow/black) ----
rep('.zpb-fm-off i{background:var(--gold2,var(--accent));color:var(--ongold,var(--text));border:1px solid var(--gold3,var(--border));}',
    '.zpb-fm-off i{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--g2,#e6c67d) 42%,transparent);} /* W66 (Owner): the offense follows the team theme — --g2 swaps to the team\'s primary ramp in both modes; the label ink is the 0.5-strength team tone, never black */',
    'fm-off team colors', 1)
rep('.zpb-fm-def i{background:var(--rose,var(--accent2));color:var(--ongold,var(--text));border:1px solid var(--rosehair,var(--border));}',
    '.zpb-fm-def i{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--rose,#c97a8e) 40%,transparent);} /* W66 (Owner): the defense follows the team theme too (--rose rides the team\'s third accent) — same 0.5-strength ink, no black anywhere */',
    'fm-def team colors', 1)
rep('.zpb-fm-rowflex i.zpb-ft-free{background:var(--gold2,var(--accent));color:var(--ongold,var(--text));border:1px solid var(--gold3,var(--border));}',
    '.zpb-fm-rowflex i.zpb-ft-free{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--g2,#e6c67d) 42%,transparent);}',
    'ft-free team colors', 1)
rep('.zpb-fm-rowflex i.zpb-ft-2{background:color-mix(in srgb,var(--gold2,var(--accent)) 72%,var(--rose,var(--accent2)) 28%);color:var(--ongold,var(--text));border:1px solid color-mix(in srgb,var(--gold3,var(--border)) 55%,var(--rose,var(--accent2)) 45%);}',
    '.zpb-fm-rowflex i.zpb-ft-2{background:color-mix(in srgb,var(--g2,#e6c67d) 72%,var(--rose,#c97a8e) 28%);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--g4,#d9a45b) 55%,var(--rose,#c97a8e) 45%);}',
    'ft-2 team colors', 1)
rep('.zpb-fm-rowflex i.zpb-ft-4{background:color-mix(in srgb,var(--gold2,var(--accent)) 38%,var(--rose,var(--accent2)) 62%);color:var(--ongold,var(--text));border:1px solid var(--rosehair,var(--border));}',
    '.zpb-fm-rowflex i.zpb-ft-4{background:color-mix(in srgb,var(--g2,#e6c67d) 38%,var(--rose,#c97a8e) 62%);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--rose,#c97a8e) 40%,transparent);}',
    'ft-4 team colors', 1)
rep('.zpb-fm-rowflex i.zpb-ft-6{background:var(--rose,var(--accent2));color:var(--ongold,var(--text));border:1px solid var(--rosehair,var(--border));}',
    '.zpb-fm-rowflex i.zpb-ft-6{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--accent2,var(--text));border:1px solid color-mix(in srgb,var(--rose,#c97a8e) 40%,transparent);}',
    'ft-6 team colors', 1)

# ---- 6 · WEAKEST (the Owner's word) ----
rep('<b>Shakiest</b>', '<b>WEAKEST</b>', 'weakest', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 1 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
