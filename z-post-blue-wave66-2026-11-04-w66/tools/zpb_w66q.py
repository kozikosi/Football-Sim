#!/usr/bin/env python3
"""w66 chain step 17 — the CLAIMS header gains the second Owner round: the fills dropdown,
the roster badges, the card/map clock, the comparison dropdowns, the upper-line doors, the
one SIM PLAYOFFS door with its two end screens, the COTY shimmer, the profile-name feature
and the RUN IT BACK caution."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP16_MD5 = 'c79bcd5abd3a3141e05b20310ebbab60'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP16_MD5, 'step-16 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("""page (phase regularReview), opening the same shared review page — no playoff sim required.
-->""",
    """page (phase regularReview), opening the same shared review page — no playoff sim required.
No P-item (Owner UI round 2): the draft board's fills cell reads ONE label ("FS (-10 FLEX)")
inside a custom dropdown (zpb-slotdd/zpb-slotpop — Cinzel, the homepage team-picker's
principles, the user team's 0.5 ink) listing every open spot with honest flex costs; the
raw <select class="slotsel"> is retired · the roster summary sentence ("2 of 32 starters ·
+5 wins above a replacement-level lineup") renders as two team-tinted Cinzel badges
(zpb-rbadge) · the draft-review card cascade obeys one clock: .3s per beat with ZERO gap
(card N+1 starts exactly when card N finishes), the field map and the depth zones keyed to
the CARDS' clock (the cards are the master; the map follows), on mobile and desktop alike ·
the "(change who plays where at any time)" aside is removed at its single source · the
season-tab Team Comparison dropdowns join the homepage custom family (zpbEnhanceCmpSel —
optgroup headers, per-team 0.5 inks, Cinzel; the raw OS menu and its purple wash are gone) ·
SIM GAME / SIM SEASON / BACK TO SEASON live on the top panel's upper line next to 100
SEASONS (#zpbSimTabsHost + #zpbBtsHost); BACK TO SEASON is never its own panel, wears the
SIM SEASON tab's classes, and the standalone .zpb-bts-top panels and the bottom
zpbBackSeasonBar retire · in the playoffs the second SIM PLAYOFFS button next to "Play the
X" is gone; the ONE top-panel door runs zpbSimRestOfPlayoffs — the whole rest of the
bracket with __zpbQuietSim (the during-the-game cinematic panel can never fire from it),
then mounts the Super Bowl screen if the user's team made it, or the solemn zpbPlayoffElimCine
(the round lost, the opponent, the score, the Super Bowl final + champion + MVP — no
confetti, no celebration) if it didn't · the user's COTY "YOU" shimmers like the other
honors-earned winners (gold:true on the Super Bowl story honors; the awards table's YOU
rides zpb-shm) · the player-profile name feature: zpbProfStore (localStorage
zpbPlayerProfiles), a profile-name editor on every Player Browser name cell, the saved name
riding the player's name as a 0.5-ink suffix (the first slab of the profiles track) ·
RUN IT BACK drops "SAME ROSTER" from the button; its caution panel states the mechanism
("You will begin the season again at the preseason with the same roster you have right now.
The current season's results, stats and awards are erased.") — zpbCaution gained an opts
parameter; the other callers keep the default copy.
-->""",
    'claims header round 2', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 17 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
