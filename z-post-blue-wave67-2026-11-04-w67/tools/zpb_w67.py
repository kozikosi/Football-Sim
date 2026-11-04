#!/usr/bin/env python3
"""w67 chain step 1 — the WAVE/CLAIMS header (w66 -> w67), the two homepage dropdown bubbles
(one fixed size, the measured fit law), the Series subtitle on two lines, and SIM PLAYOFFS
leaves the big-button law. Asserts every anchor; re-runs clean from the pristine w66 baseline."""
import hashlib

SRC = '/home/z/my-project/work/w67/baseline-w66.html'
DST = '/home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html'
BASE_MD5 = '41d2cb10ab3608fcc879816e61e20002'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == BASE_MD5, 'baseline md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the WAVE/CLAIMS header (Claude's convention, binding since w66) ----
i = src.index('<!DOCTYPE html>')
hdr = src[:i]
assert hdr.startswith('<!--\nWAVE: w66\nCLAIMS:'), 'unexpected w66 header head'
assert hdr.rstrip().endswith('-->'), 'unexpected w66 header tail'
HEADER = '''<!--
WAVE: w67
CLAIMS:
- Owner UI 1: the two homepage dropdown bubbles read as ONE size at rest and after every
  selection - #draftSetup .zpb-selbtn carries one fixed width (--zpbSelW 260px, bigger than
  either old default); the team face keeps the w27 fit law (full name -> abbreviation,
  MEASURED by the extended fitFace + .zpb-fit-t, never a clipped word); the <=1180px face
  swap retires (the fixed box decides, not the window) and the <=640px shrink cannot beat
  the id law. Battery: all 32 teams x 3 widths, widths equal and faces unclipped.
- Owner UI 2: the player browser stops flashing on small screens - #playerTable is
  data-nostack (the Owner prefers the smaller, narrower table at every width) and the
  phone-stacker counts columns colspan-aware (the P-174 sentinel row is colspan=6 but read
  as one cell, which flipped the fit verdict on every pass - the measure/toggle loop that
  flashed the panel between the stacked cards and the compact table is dead).
- Owner UI 3: the Series subtitle reads on TWO lines - "RANKING BY THE N MOST VALUABLE
  POSITIONS" over the slot list (QB + CB1 + ...), the "spots" wording retired, every N.
- Owner UI 4: the fills dropdown's ink follows the neutral dropdown family - dark mode
  swaps --tTxM (the light halfway ink, a dark navy on the dark panel for the Panthers)
  to --tTxd, the same family the popup options and the homepage picker already wear.
- Owner UI 5: ONE reveal clock at the season-in-badges pace - that rail paces 0.6s per
  beat (measured: delay = beat*0.6s - 0.25s head start), so the player cards, the
  field-map markers and the depth rows all ride 0.6s (the w66 0.3s card clock and the
  1s map fallback retire); entrance .55s, one card at a time, map and depth in step.
- Owner UI 6: the pregame star cards read the neutral halfway ink on their always-dark
  stage (the meta line rides --tnd; the 90+ shimmer sweeps tnd -> cream instead of the
  light-tuned --zrb accent), the Key Players titles and shimmer rows swap to the
  dark-tuned --zrbd in dark mode, and the matchup-math bars ride --zrbd in dark -
  measured for all 32 teams in both modes.
- Owner UI 7: the pregame stage ends at the footer - the intro's bottom inset is measured
  to the footer's height at mount (the w66 top clamp's mirror), so no star pair can cross
  the skip button or its hairline at any window size; swept at six sizes.
- Owner UI 8: the upper line is one left-aligned cluster - NEW DRAFT / 100 SEASONS /
  SIM GAME / SIM SEASON (/ SIM PLAYOFFS / BACK TO SEASON) shoulder to shoulder; the 20-0
  line keeps the far right; the 100-SEASONS wrapper stops inflating its own box.
- Owner UI 9: SIM PLAYOFFS leaves the w57 big-button law (the same retirement SIM SEASON
  made in w65) - the review page reads BEGIN PLAYOFFS as the big filled pill and SIM
  PLAYOFFS clearly smaller beside it. Measured before/after.
-->
<!DOCTYPE html>'''
src = HEADER + src[i + len('<!DOCTYPE html>'):]  # the w66 header is REPLACED, not prepended
print('  ok w67 header (the w66 claims retire into the wave package)')

# ---- 2 · Owner UI 1 — the two homepage dropdown bubbles, one fixed size ----
rep('''.zpb-selwrap.zpb-teamwrap .zpb-selbtn{min-width:150px;max-width:none;}
.zpb-selwrap.zpb-teamwrap .zpb-selbtn span{max-width:none;}
.zpb-selwrap.zpb-teamwrap .zpb-face-abbr{display:none;}
@media (max-width:1180px){
 .zpb-selwrap.zpb-teamwrap .zpb-face-full{display:none;}
 .zpb-selwrap.zpb-teamwrap .zpb-face-abbr{display:inline;}
 .zpb-selwrap.zpb-teamwrap .zpb-selbtn{min-width:0;max-width:150px;}
 .zpb-selwrap.zpb-teamwrap .zpb-selbtn span{max-width:150px;}
}''',
    '''/* W67 (Owner): the two homepage dropdown bubbles read as ONE size at rest and after every
   selection - one fixed width for both (the #draftSetup law below wins over every media),
   and the team face keeps the w27 fit law by MEASUREMENT (full name -> city -> abbreviation,
   never a clipped word, never a second line); the <=1180px swap retires - the fixed box
   decides, not the window. */
.zpb-selwrap.zpb-teamwrap .zpb-selbtn span{max-width:none;}
.zpb-selwrap.zpb-teamwrap .zpb-face-full,.zpb-selwrap.zpb-teamwrap .zpb-face-city,.zpb-selwrap.zpb-teamwrap .zpb-face-abbr{white-space:nowrap;}
.zpb-selwrap.zpb-teamwrap .zpb-face-city,.zpb-selwrap.zpb-teamwrap .zpb-face-abbr{display:none;}
.zpb-face.zpb-fit-t .zpb-face-full{display:none;}
.zpb-face.zpb-fit-t .zpb-face-city{display:inline;}
.zpb-face.zpb-fit-t2 .zpb-face-city{display:none;}
.zpb-face.zpb-fit-t2 .zpb-face-abbr{display:inline;}
#draftSetup{--zpbSelW:260px;} /* W67 (Owner): both bubbles bigger than either old default, and always equal */
#draftSetup .zpb-selbtn{min-width:var(--zpbSelW);max-width:var(--zpbSelW);width:var(--zpbSelW);height:46px;} /* W67 (Owner): one height too - the logo used to inflate the team bubble 4px past the pick bubble at the tap-floor widths */''',
    'dropdown bubbles css')

rep('''  const fitFace = b=>{ const f = b && b.querySelector ? b.querySelector('.zpb-face') : null; if(!f || !f.querySelector('.zpb-fl')) return;
   f.classList.remove('zpb-fit-c','zpb-fit-a');''',
    '''  const fitFace = b=>{ const f = b && b.querySelector ? b.querySelector('.zpb-face') : null; if(!f) return;
   if(f.querySelector('.zpb-face-full')){ // W67 (Owner): the team bubble's measured fit - the full name while it fits, then the city, then the abbreviation (the w27 law, measured, never a clipped word, never a second line)
    f.classList.remove('zpb-fit-t','zpb-fit-t2');
    if(f.scrollWidth > f.clientWidth + 1){ f.classList.add('zpb-fit-t');
     if(f.scrollWidth > f.clientWidth + 1) f.classList.add('zpb-fit-t2'); }
    return; }
   if(!f.querySelector('.zpb-fl')) return;
   f.classList.remove('zpb-fit-c','zpb-fit-a');''',
    'fitFace teamwrap branch')

rep('''   else btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
  };''',
    '''   else btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
   fitFace(btn); // W67 (Owner): every repaint re-measures - the fixed box never clips a word
  };''',
    'label repaints fit')

rep('''   else if(sel.id==='draftSlotSelect') btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '"><span class="zpb-face-full">' + face + '</span><span class="zpb-face-abbr">' + (v==='__random' ? 'RND' : abbrOf(v)) + '</span></span>';''',
    '''   else if(sel.id==='draftSlotSelect') btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '"><span class="zpb-face-full">' + face + '</span><span class="zpb-face-city">' + (v==='__random' ? 'RND' : (cityOf(v) || abbrOf(v))) + '</span><span class="zpb-face-abbr">' + (v==='__random' ? 'RND' : abbrOf(v)) + '</span></span>'; // W67 (Owner): the middle station of the measured fit - the city when the full name cannot sit on the one line''',
    'team face gains the city station')

# ---- 3 · Owner UI 3 — the Series subtitle on two lines ----
rep(""" document.getElementById('groupCount').textContent = 'Ranking by the ' + slots.length + ' most valuable spots \\u00b7 ' + slots.join(' + '); // w51 (Owner): the dot law — the colon retires at source too""",
    """ document.getElementById('groupCount').innerHTML = '<span class="zpb-gcl">RANKING BY THE ' + slots.length + ' MOST VALUABLE POSITIONS</span><span class="zpb-gcl zpb-gcl2">' + slots.join(' + ') + '</span>'; // W67 (Owner): the Owner's two lines - the headline over the slot list; the one-line "spots" face retires""",
    'series subtitle two lines')

# ---- 4 · Owner UI 9 — SIM PLAYOFFS leaves the big-button law ----
rep('#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem !important;padding:13px 30px !important;} /* w57 (Owner): BEGIN PLAYOFFS wears the SIM PLAYOFFS size · w65 (Owner): SIM SEASON leaves the big law — it rides the tab row at the SIM GAME size */',
    '#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem !important;padding:13px 30px !important;} /* w57 (Owner): BEGIN PLAYOFFS wears the SIM PLAYOFFS size · w65 (Owner): SIM SEASON leaves the big law — it rides the tab row at the SIM GAME size · W67 (Owner): SIM PLAYOFFS leaves the big law too — the review page reads BEGIN PLAYOFFS as the big pill and SIM PLAYOFFS clearly smaller beside it */',
    'sim playoffs leaves the big law')

# ---- 5 · Owner UI 9b — the review row centers its buttons (each keeps its natural size) ----
rep('<div style="display:flex;gap:8px;flex-wrap:wrap;">${made?\'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>\':\'\'} <!-- w57 (Owner): the inline padding retires — the standing law sizes this button --><button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button></div>',
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${made?\'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>\':\'\'} <!-- w57 (Owner): the inline padding retires — the standing law sizes this button · W67 (Owner): the row centers its children — BEGIN PLAYOFFS keeps its big pill, SIM PLAYOFFS keeps its smaller box, neither stretches to match the other --><button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button></div>',
    'review row centers buttons')

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step1 done -> {DST} md5 {h} bytes {len(src.encode("utf-8"))}')
