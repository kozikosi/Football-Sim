#!/usr/bin/env python3
"""w68 chain step 1 — the WAVE/CLAIMS header (w67 -> w68), Owner item 2A (the season-badge
rail reads the dash/dot law: records and game scores keep dashes, the W-L splits join them,
the blanket digit-dash-digit convert retires) and Owner item 3 (the season-awards summary
paragraph retires whole). Asserts every anchor; re-runs clean from the pristine w67 baseline."""
import hashlib

SRC = '/home/z/my-project/work/w68/baseline-w67.html'
DST = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
BASE_MD5 = 'ecf2b295b97739b88e7f60068b588b84'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == BASE_MD5, 'baseline md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the WAVE/CLAIMS header (the w66/w67 convention, binding) ----
i = src.index('<!DOCTYPE html>')
hdr = src[:i]
assert hdr.startswith('<!--\nWAVE: w67\nCLAIMS:'), 'unexpected w67 header head'
assert hdr.rstrip().endswith('-->'), 'unexpected w67 header tail'
HEADER = '''<!--
WAVE: w68
CLAIMS:
- Owner UI 1: the key players read FULL NAMES at full window size - the name ladder's
  avail() now measures the carrier's true available line (parent width minus siblings minus
  gaps; the old self-measure let a once-shortened name shrink its own box and lock), and at
  window >= 1025px the ladder never drops below the full name (full vertical is the floor;
  last names/initials stay for narrow windows <= 1024px). Battery: the CL lock reproduced
  before and healed after; full names asserted at 1025/1280/1440; the narrow law intact.
- Owner UI 2: THE DASH/DOT LAW - W-L-T records and single-game scores read DASHES
  ("10-6-1", "31-17", "tied 14-10"), any other data keeps the middle dot. The w50 blanket
  digit-dash-digit convert retires from the season-in-badges rail (it ate the shared digit:
  10-6-1 became 10-6-1's broken cousin 10+dot+6-1); the W-L split badges (ONE SCORE,
  VS DIVISION, AT HOME, ON THE ROAD, VS PLAYOFF TEAMS) join the dash law; the replay
  story's game scores (the tie, the half, the third quarter, the OT line, the fourth-quarter
  run, every final), the season-in-words scores, the schedule tiles, the h2h/preview story,
  the playoff retrospectives and the Super Bowl/replay/round-card score separators all read
  dashes. Projections, ratings and ranges keep the dot (flagged in the ledger).
- Owner UI 3: the season-awards summary paragraph retires whole - the "TEAM · N First-Team
  All-Pro · ..." counts sentence and its indented honor lines (the Owner's example carried
  "Pittsburgh Steelers coaching staff · Coach of the Year") leave REGULAR-SEASON AWARDS &
  HONORS; the award cards, the statistical champions and the All-Pro/Pro Bowl tables stay.
- Owner UI 4: the user's award winners GLOW - every award card, All-Pro/Pro Bowl chip and
  All-Playoff chip whose winner is the user's wears the golden border AND the outer glow
  (both), the chip names take the shimmer for any award (not just First-Team), and the
  season-in-badges honor cards gain the glow. The gold is the zpb-sb-gold celebration metal.
- Owner UI 5: the run-ends screen retires - EVERY sim-playoffs path (the review door, the
  mid-playoffs SIM REST door, the shared end-screen decider) lands on the Super Bowl page
  (SUPER BOWL - FINAL, the score, the crests, the champion, the MVP); zpbPlayoffElimCine
  and its .zpb-pofin face leave the file (the N5 comparison CSS in that style block stays).
- Owner UI 6: the sim-playoffs run cine requires a CONTINUE per round - the 3400ms
  auto-advance retires; every round card carries the gold Continue pill; the last card's
  Continue flows into the Super Bowl page (mount first, fade second - the w57 storm law).
- Owner UI 7: the user-wins-the-Super-Bowl page - when the champion is the user's team the
  SB page's Continue mounts zpbSuperBowlVictoryCine (before the SB overlay fades - opaque
  from the first painted frame): charcoal-gold stage, twin god-ray wheels, team-gold
  confetti, rising embers, a breathing glow, the crest through three burst rings, the huge
  shimmering wordmark, the dash-law score, the MVP line, the gold Continue - all on the
  Owner's 0.6s reveal cadence; its Continue plays the standing SUPER BOWL CHAMPIONS reward.
Batteries: w68_owner (this round, live), w68_names (the ladder), w68_text (dash/dot),
w68_playoffs (continue gate + SB page + victory page), w68_awards (gold + removal);
the standing suites re-pointed at w68. Baseline md5 ecf2b295b97739b88e7f60068b588b84.
-->
'''
src = HEADER + src[i:]

# ---- 2 · Owner UI 2A — the season-in-badges rail reads the dash/dot law ----
rep("""  close.length>=3 ? badge('ONE SCORE', cw+'·'+(close.length-cw)) : null,
  dv.length ? badge('VS DIVISION', dw+'·'+(dv.length-dw)) : null,
  badge('AT HOME', hw+'·'+(home.length-hw)),
  badge('ON THE ROAD', rw+'·'+(road.length-rw)),
  vs.length>=3 ? badge('VS PLAYOFF TEAMS', vw+'·'+(vs.length-vw)) : null,""",
    """  close.length>=3 ? badge('ONE SCORE', cw+'-'+(close.length-cw)) : null, // W68 (Owner): wins-losses splits read DASHES — the W-L record law
  dv.length ? badge('VS DIVISION', dw+'-'+(dv.length-dw)) : null, // W68 (Owner)
  badge('AT HOME', hw+'-'+(home.length-hw)), // W68 (Owner)
  badge('ON THE ROAD', rw+'-'+(road.length-rw)), // W68 (Owner)
  vs.length>=3 ? badge('VS PLAYOFF TEAMS', vw+'-'+(vs.length-vw)) : null, // W68 (Owner)""",
    'badge W-L splits to dashes')

rep(""" const badgeHTML = (b, i)=>`<span class="zpb-sbadge ${b.cls}" style="--beat:${i}" data-beat="${i}"><b>${String(b.v).replace(/(\\d)\\s*-\\s*(\\d)/g,'$1\\u00b7$2')}</b><i>${b.k}</i></span>`; // w50 (Owner): every dash on the season-review badges becomes a middle dot — RECORD 10·7, the scores 31·17, the pain record — all of them""",
    """ const badgeHTML = (b, i)=>`<span class="zpb-sbadge ${b.cls}" style="--beat:${i}" data-beat="${i}"><b>${b.v}</b><i>${b.k}</i></span>`; // W68 (Owner): the dash/dot law — records and game scores carry their DASHES, other data keeps the middle dot at source; the w50 blanket convert retires (it ate the shared digit: 10-6-1 printed 10·6-1)""",
    'badge blanket convert retires')

# the w50 CSS header comment records the amendment (the comment is the law's ledger)
rep("""   7 · THE BADGES CARRY DOTS. Every digit-dash-digit on a season-review badge renders as a
       middle dot: RECORD 10·7, the scores 31·17, the pain record — all of them. */""",
    """   7 · THE BADGES CARRY DOTS. Every digit-dash-digit on a season-review badge renders as a
       middle dot: RECORD 10·7, the scores 31·17, the pain record — all of them.
       W68 (Owner): AMENDED — W-L-T records and single-game scores read DASHES now
       ("10-6-1", "31-17"); the blanket convert retired (it ate the shared digit and
       printed 10·6-1); any other data keeps the middle dot. */""",
    'w50 comment amended')

# ---- 3 · Owner UI 3 — the season-awards summary paragraph retires whole ----
rep("""  const us = A.userSummary;
  const usTxt = (us.mine.length||us.ap1||us.ap2||us.pb)
   ? (user+'  ·  '+us.ap1+' First-Team All-Pro  ·  '+us.ap2+' Second-Team All-Pro  ·  '+us.pb+' Pro Bowl selection'+(us.pb===1?'':'s')+'.'
      +(us.mine.length? '<span class="zpb-uslines">'+us.mine.map(m=>'<span class="zpb-usline">'+m+'</span>').join('')+'</span>' : '')) // w47 (Owner): each honor on its own indented line
   : ('No '+user+' players earned league-wide honors this year.');
  const posRows""",
    """  const posRows""",
    'awards summary text retires')

rep("""  return '<details class="panel" style="margin-bottom:14px;" '+(open?'open':'')+'><summary style="cursor:pointer;font-weight:700;">REGULAR-SEASON AWARDS &amp; HONORS</summary>'
   + '<p class="narr" style="margin:8px 0;">'+usTxt+'</p>'
   + '<div class="zpb-awrows">'+ind+'</div>' // w37 (R9, Owner): the w19 horizontal row format restored — one award per line""",
    """  return '<details class="panel" style="margin-bottom:14px;" '+(open?'open':'')+'><summary style="cursor:pointer;font-weight:700;">REGULAR-SEASON AWARDS &amp; HONORS</summary>'
   + '<div class="zpb-awrows">'+ind+'</div>' // W68 (Owner): the summary paragraph (the counts sentence + its honor lines) retires — the award cards speak // w37 (R9, Owner): the w19 horizontal row format restored — one award per line""",
    'awards summary <p> removed')

# the shadowed (dead) first definition carries the same text — the law lands on both copies
rep(""" const us = A.userSummary, usTxt = us.mine.length||us.ap1||us.ap2||us.pb ? `${user}: ${us.ap1} First-Team All-Pro, ${us.ap2} Second-Team All-Pro, ${us.pb} Pro Bowl selection${us.pb===1?'':'s'}${us.mine.length?`  ·  ${us.mine.join('; ')}`:''}.` : `No ${user} players earned league-wide honors this year.`;
 return `<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">REGULAR-SEASON AWARDS &amp; HONORS</summary>
  <p class="narr" style="margin:8px 0;">${usTxt}</p>""",
    """ return `<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">REGULAR-SEASON AWARDS &amp; HONORS</summary>""",
    'awards summary removed in the shadowed copy')

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step1 done -> {DST} md5 {h} bytes {len(src.encode("utf-8"))}')
