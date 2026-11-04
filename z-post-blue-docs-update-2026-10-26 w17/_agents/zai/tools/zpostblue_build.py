#!/usr/bin/env python3
"""Z-POST-BLUE build v2: my own architect version of PreColors.
Base: _agents/pickle/builds/Football-Sim-PreColors.html (sha256 40233d6b...)
Out:  Football-Sim-Z-post-blue.html at worktree root.

Design brief (Owner, 25 Oct, second wave on top of the first Z-post-blue pass):
  - Product identity "20-0" everywhere; files keep "Football Sim" names.
  - Dominant palette: very pale rose gold (near white), shimmering gold, white.
  - Black exists only as a dark-mode palette color, NEVER as text; neutrals = white.
  - No panels, no corner badge; shimmering, dripping rose gold; minimalism + dynamism.
  - TEAM-COLOR TAKEOVER: when the user picks a team and starts the draft, the whole
    project re-tints to that team's 3 brand hexes (tones may shift for accessibility).
  - Draft board: every player framed by his real NFL team's 3 hexes until the draft
    ends; after the draft your roster wears your colors and other franchises' players
    wear theirs.
  - Draft board says "Flex x (-y)" only; no "Fits as" anywhere.
  - Home page: VL-style moving "20-0" marquee in the header area; tagline, stepper,
    setup heading, motto and select labels removed; DRAFT button in a new display font
    with a shimmer; guide removed from the home view and fades in from the ether when
    the user scrolls toward the footer.
Fourth wave (Owner, 25 Oct):
  - The gold 20-0 moves INTO the bar where the pink 20-0s move: same size and font
    as the moving ones, living on the left side of the bar, and it is the control
    that returns the user to the homepage - which is the season view once a season
    has started (draft/season are phases on the one primary tab, so one target
    serves both). The bar is persistent on every page; the orb joins its right end.
  - DRAFT button gets a new font (Cinzel Decorative).
  - Dropdown menus go full rose-gold: deep-rose Cinzel type, rose wash, rose
    chevron, breathing rose-gold shimmer glow; option lists themed in both schemes.
Sixth wave (Owner, 25 Oct):
  - Fades slow down: everything breathes at 2s (was 1.2s) - the home page gets a
    couple of seconds to fade out, the draft page a couple of seconds to fade in.
  - Pick-priority bars (chart + board cards) wear the identity accent, never green.
  - Franchise LOGOS (sportsdataverse/ESPN set, embedded 96px data URIs; the Owner's
    all-logos-sdv.csv + nf-team-logos never reached this sandbox - the sdv set IS
    the espncdn set, so it is reproduced faithfully): they replace the team
    abbreviation under TEAM on the draft board (table + cards), sit in the
    drafting-as badge and the recent-picks feed.
  - The 'change' affordance follows the palette (deep rose / team accent), never
    default-browser blue.
  - Star system removed: chip stars, star tooltip, star explainer text, click
    handler; priority weighting pinned to the default (x1).
  - 'Search available players' shrinks to a quiet 150px and expands to 330px on click.
  - 'Value here' erased from the user's view: column header, cells, sort option,
    and the Priority tooltip reworded (the math stays in the background).
  - Draft page: the tagline and the Draft/Season/Playoffs/Champion stepper are gone
    (hero header removed entirely); 'you hold the #N overall pick (Round 1)' is gone,
    replaced by a live right-aligned '(round.pick)' next-pick indicator.
  - The moving 20-0s shimmer in rose gold: the wordmark's own gradient pulled 38%
    toward rose, same fxshine cadence as the gold control to their left.
  - 'see guide for details' - lowercase and a lot smaller.
Seventh wave (Owner, 25 Oct):
  - Claude handoff refreshed (REV 8) so every tool/section is copy-pasteable.
  - Green never shows once a franchise is picked: --good/--bad re-tint to the
    identity (fixes the pick-priority menu, standings W/L, lineup arrows, Colts
    players, done-bubbles in light mode).
  - CTA buttons shimmer with the franchise; Chiefs' secondary gold toned to the
    site's deep gold in light mode (no more "snot yellow").
  - Draft-complete line rewritten ("Play the season. Coach your team to the Super
    Bowl. Can you go 20-0?") and right-aligned; meta description updated.
  - "Play a Season" panels removed: a bare shimmering Start Season button in the
    DRAFT font/side; "Season options" heading + warning line removed; both
    destructive actions now open the Caution screen ("Your current season will be
    erased if you continue") with Return-to-season / confirm buttons.
  - Group labels lose their parentheses; group scores run Offense->Defense in the
    draft-board roster pattern (DETAIL_KEYS + GROUP_DEFS rebuilt at build time).
  - Draft recap narrative removed for every team (generateDraftRecap deleted).
  - Preseason: explainer paragraphs collapsed into simplified dropdowns ("Why this
    style?", "Why Auto?", style tables, "How a 2-Pt Conv works"); aggressiveness
    description matches the intro paragraph's size/font; "Current lineup:" line
    and "Three optional settings" line gone; "wins added" dropped from Group
    scores; player names show last name only when the window compresses.
  - Week view turned visual: logo matchup card (no panel), preview = model strip +
    aligned star faceoff with glowing stars, scouting/identity = rank bars,
    matchup math = side-by-side bars, schedule = crest week tiles, lineups =
    floaty rows, standings = your division first + compact others, review
    narrative collapsed, game review text panels removed.
  - GAME REPLAY: simulating a week (or a playoff round) plays a ~15-20s overlay
    that reveals the score by play and quarter with an ESPN-style scoring log.

Wave 8 (Owner, 25 Oct, eighth directive):
  - Home dropdowns shrink in place and stay side by side on narrow windows (never
    stack); real footer pinned to the bottom of the page, "see guide for details"
    directly above it.
  - Logos: whitespace fully subtracted (alpha-trimmed); the dark-mode ivory disc
    bubbles are gone (a whisper of drop-shadow instead). --logos-b builds the
    separate ONE-PAGE PROTOTYPE with logo package B (Wikipedia flat set).
  - Draft board: the OVR bubble no longer stretches on compact screens; the compact
    card layout takes over at 1120px so the Draft button (with name + pos) can never
    scroll out of reach; every number column header shows the active sort with an
    arrow; the three team-color bubbles sit UNDER the crest.
  - "No picks yet." and "needed" removed; "by your next pick" hides as the window
    compresses; every who-got-flexed mention removed (badges, priority suffix, the
    roster-building paragraph).
  - "math's pick" badge wears the selected team's palette (never permanently
    purple); confetti follows the identity palette; standing green re-audit.
UI/copy only - no protected math touched. Every replacement is exact-match and
asserted; the build aborts on any mismatch."""
import hashlib, sys, json, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from zpb_logos import ZPB_LOGOS

# --logos-b: build the SEPARATE one-page prototype with logo package B
LOGO_SET = "B" if "--logos-b" in sys.argv else "A"
if LOGO_SET == "B":
    from zpb_logos_b import ZPB_LOGOS as _ZPB_LOGOS_B
    ZPB_LOGOS = _ZPB_LOGOS_B

SRC = "/home/z/my-project/desktop/wt/zai/_agents/pickle/builds/Football-Sim-PreColors.html"
OUT = ("/home/z/my-project/download/Football-Sim-Z-post-blue-logosB.html" if LOGO_SET == "B"
       else "/home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html")
EXPECT_SHA = "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd"

html = open(SRC, encoding="utf-8").read()
sha = hashlib.sha256(html.encode("utf-8")).hexdigest()
if sha != EXPECT_SHA:
    sys.exit(f"ABORT: base file sha mismatch: {sha}")
print(f"[ok] base sha256 verified: {sha[:16]}... | logo set {LOGO_SET}")
if html.count("20-0") != 0:
    sys.exit("ABORT: base unexpectedly already contains '20-0'")

INVARIANTS = ["DEFAULT_WEIGHTS", "const FLEX = {", "NATURAL_SLOT_MAP", "PLAN_K", "RATING_SPECS",
              "slotWinsPerOvr", "optimalLineup", "effOvr", "MC2027", "function optimalLineup"]
inv_before = {k: html.count(k) for k in INVARIANTS}

# ------------------------------------------------- council 32-team brand table
# Source: figma/team-colours.json (GPT's NFL brand table supplied by the Owner,
# 22 Oct; jimniels/teamcolors + Pro Football Network references).
# Keyed by the sim's exact TEAM_DATA names ("NY Giants"/"NY Jets" renamed).
TEAM_COLORS = {
 "Arizona Cardinals":     ["#97233F", "#000000", "#FFB612"],
 "Atlanta Falcons":       ["#A71930", "#000000", "#A5ACAF"],
 "Baltimore Ravens":      ["#241773", "#000000", "#9E7C0C"],
 "Buffalo Bills":         ["#00338D", "#C60C30", "#FFFFFF"],
 "Carolina Panthers":     ["#0085CA", "#101820", "#BFC0BF"],
 "Chicago Bears":         ["#0B162A", "#000000", "#FFFFFF"],
 "Cincinnati Bengals":    ["#FB4F14", "#000000", "#FFFFFF"],
 "Cleveland Browns":      ["#311D00", "#FF3C00", "#FFFFFF"],
 "Dallas Cowboys":        ["#003594", "#869397", "#FFFFFF"],
 "Denver Broncos":        ["#FB4F14", "#002244", "#FFFFFF"],
 "Detroit Lions":         ["#0076B6", "#B0B7BC", "#000000"],
 "Green Bay Packers":     ["#203731", "#FFB612", "#FFFFFF"],
 "Houston Texans":        ["#03202F", "#A71930", "#FFFFFF"],
 "Indianapolis Colts":    ["#002C5F", "#FFFFFF", "#A2AAAD"],
 "Jacksonville Jaguars":  ["#101820", "#006778", "#D7A22A"],
 "Kansas City Chiefs":    ["#E31837", "#FFB81C", "#FFFFFF"],
 "Las Vegas Raiders":     ["#000000", "#A5ACAF", "#FFFFFF"],
 "Los Angeles Chargers":  ["#0080C6", "#FFC20E", "#FFFFFF"],
 "Los Angeles Rams":      ["#003594", "#FFD100", "#FFFFFF"],
 "Miami Dolphins":        ["#008E97", "#FC4C02", "#FFFFFF"],
 "Minnesota Vikings":     ["#4F2683", "#FFC62F", "#FFFFFF"],
 "New England Patriots":  ["#002244", "#C60C30", "#BFC0BF"],
 "New Orleans Saints":    ["#D3BC8D", "#101820", "#FFFFFF"],
 "NY Giants":             ["#0B2265", "#A71930", "#A5ACAF"],
 "NY Jets":               ["#125740", "#FFFFFF", "#000000"],
 "Philadelphia Eagles":   ["#004C54", "#A5ACAF", "#000000"],
 "Pittsburgh Steelers":   ["#FFB612", "#101820", "#FFFFFF"],
 "San Francisco 49ers":   ["#AA0000", "#B3995D", "#FFFFFF"],
 "Seattle Seahawks":      ["#002244", "#69BE28", "#A5ACAF"],
 "Tampa Bay Buccaneers":  ["#D50A0A", "#34302B", "#FF7900"],
 "Tennessee Titans":      ["#0C2340", "#4B92DB", "#C8102E"],
 "Washington Commanders": ["#5A1414", "#FFB612", "#FFFFFF"],
}

# verify every sim team name has a color entry (TEAM_DATA is a single JSON line)
_i = html.index("const TEAM_DATA = ") + len("const TEAM_DATA = ")
_j = html.index("\n", _i)
_blob = html[_i:_j].rstrip().rstrip(";")
_sim_teams = list(json.loads(_blob).keys())
_missing = [t for t in _sim_teams if t not in TEAM_COLORS]
if _missing:
    sys.exit(f"ABORT: sim teams without colors: {_missing}")
_extra = [t for t in TEAM_COLORS if t not in _sim_teams]
if _extra:
    sys.exit(f"ABORT: color entries not in sim: {_extra}")
print(f"[ok] team-color parity verified for {len(_sim_teams)} franchises")
_missing_logos = [t for t in _sim_teams if t not in ZPB_LOGOS]
if _missing_logos:
    sys.exit(f"ABORT: sim teams without an embedded logo: {_missing_logos}")
print(f"[ok] logo set verified for {len(_sim_teams)} franchises (sportsdataverse/ESPN embed)")

# ---------------------------------------------------------------- CSS layer
ZPB_CSS = r"""
/* ================= Z-POST-BLUE THEME v2 - 20-0 rose-gold identity =================
   Dominant: very pale rose gold (near white), shimmering gold, white.
   Dark mode keeps black in the palette but never in the text; neutrals are white.
   Team-color takeover: [data-zpbteam] remaps every accent token to the user's
   franchise (JS computes accessible tones). UI-only layer. */
/* ---- tokens: light (default, dominant) ---- */
:root{
 color-scheme:light;
 --bg:#fcf7f1; --panel:#ffffff; --panel2:#f7ebe0;
 --text:#53382b; --sub:#9c6a5e; --border:#eeddcb;
 --accent:#c9a24b; --accent2:#cf8a60; --good:#4c9a67; --bad:#c25b4e;
 --rose:#c97a8e; --rosehair:#dcc0cb; --gold2:#e6c67d; --gold3:#9a6b1f;
 --ongold:#3a2a14; --glow:rgba(201,162,75,.32);
 --glowA:rgba(238,196,168,.34); --glowB:rgba(219,183,116,.20);
 --glass:rgba(255,255,255,.58); --glassbd:rgba(178,124,96,.16);
 --fieldbg:rgba(255,255,255,.5);
 --shadow:0 10px 34px rgba(163,113,84,.10);
 --g1:#9a6b1f; --g2:#e6c67d; --g3:#eed9a3; --g4:#d9a45b; --g5:#c9a24b; --g6:#f3dfae;
 --b1:#b98a3a; --b2:#e9c987; --b3:#fff3d6; --b4:#e2b96a; --b5:#c9a24b; --b6:#e9c987;
 --o1:#fff8ea; --o2:#f0cf92; --o3:#cf9752; --o4:#a8701a;
 --dr1:#cf9752; --dr2:#f8e7c0;
 --tBS:rgba(190,140,60,.38); --tBS2:rgba(190,140,60,.5); --tBSb:rgba(168,124,30,.38);
 --tOG:rgba(214,164,96,.5); --tOGh:rgba(214,164,96,.68);
 --selfg:#a05a70; --selwash1:rgba(201,122,142,.14); --selwash2:rgba(201,162,75,.12); --selglow:rgba(201,122,142,.38);
}
:root:not([data-theme="dark"]){
 color-scheme:light;
 --bg:#fcf7f1; --panel:#ffffff; --panel2:#f7ebe0;
 --text:#53382b; --sub:#9c6a5e; --border:#eeddcb;
 --accent:#c9a24b; --accent2:#cf8a60; --good:#4c9a67; --bad:#c25b4e;
 --rose:#c97a8e; --rosehair:#dcc0cb; --gold2:#e6c67d; --gold3:#9a6b1f;
 --ongold:#3a2a14; --glow:rgba(201,162,75,.32);
 --glowA:rgba(238,196,168,.34); --glowB:rgba(219,183,116,.20);
 --glass:rgba(255,255,255,.58); --glassbd:rgba(178,124,96,.16);
 --fieldbg:rgba(255,255,255,.5);
 --shadow:0 10px 34px rgba(163,113,84,.10);
 --g1:#9a6b1f; --g2:#e6c67d; --g3:#eed9a3; --g4:#d9a45b; --g5:#c9a24b; --g6:#f3dfae;
 --b1:#b98a3a; --b2:#e9c987; --b3:#fff3d6; --b4:#e2b96a; --b5:#c9a24b; --b6:#e9c987;
 --o1:#fff8ea; --o2:#f0cf92; --o3:#cf9752; --o4:#a8701a;
 --dr1:#cf9752; --dr2:#f8e7c0;
 --tBS:rgba(190,140,60,.38); --tBS2:rgba(190,140,60,.5); --tBSb:rgba(168,124,30,.38);
 --tOG:rgba(214,164,96,.5); --tOGh:rgba(214,164,96,.68);
 --selfg:#a05a70; --selwash1:rgba(201,122,142,.14); --selwash2:rgba(201,162,75,.12); --selglow:rgba(201,122,142,.38);
}
/* ---- tokens: dark (black lives in the palette, never in the text) ---- */
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]){
  color-scheme:dark;
  --bg:#181114; --panel:#221920; --panel2:#2c2127;
  --text:#f5e9dd; --sub:#c8a48f; --border:#3a2c31;
  --accent:#d9b36a; --accent2:#e09a6f; --good:#72c18e; --bad:#e08573;
  --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18;
  --ongold:#2c1e0c; --glow:rgba(217,179,106,.30);
  --glowA:rgba(217,179,106,.10); --glowB:rgba(224,154,111,.08);
  --glass:rgba(38,28,33,.55); --glassbd:rgba(233,196,160,.12);
  --fieldbg:rgba(255,255,255,.05);
  --shadow:0 10px 34px rgba(0,0,0,.38);
  --g1:#8a5f18; --g2:#e8c87e; --g3:#f4e3b0; --g4:#d9a45b; --g5:#d9b36a; --g6:#f3dfae;
  --b1:#8a5f18; --b2:#e8c87e; --b3:#fff3d6; --b4:#dda869; --b5:#d9b36a; --b6:#e8c87e;
  --o1:#fff8ea; --o2:#f0cf92; --o3:#d9a45b; --o4:#8a5f18;
  --dr1:#d9a45b; --dr2:#f8e7c0;
  --tBS:rgba(217,179,106,.32); --tBS2:rgba(217,179,106,.48); --tBSb:rgba(233,196,160,.3);
  --tOG:rgba(217,179,106,.45); --tOGh:rgba(217,179,106,.62);
 --selfg:#dfa6b4; --selwash1:rgba(223,166,180,.12); --selwash2:rgba(217,179,106,.10); --selglow:rgba(223,166,180,.30);
 }
}
:root[data-theme="dark"]{
 color-scheme:dark;
 --bg:#181114; --panel:#221920; --panel2:#2c2127;
 --text:#f5e9dd; --sub:#c8a48f; --border:#3a2c31;
 --accent:#d9b36a; --accent2:#e09a6f; --good:#72c18e; --bad:#e08573;
 --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18;
 --ongold:#2c1e0c; --glow:rgba(217,179,106,.30);
 --glowA:rgba(217,179,106,.10); --glowB:rgba(224,154,111,.08);
 --glass:rgba(38,28,33,.55); --glassbd:rgba(233,196,160,.12);
 --fieldbg:rgba(255,255,255,.05);
 --shadow:0 10px 34px rgba(0,0,0,.38);
 --g1:#8a5f18; --g2:#e8c87e; --g3:#f4e3b0; --g4:#d9a45b; --g5:#d9b36a; --g6:#f3dfae;
 --b1:#8a5f18; --b2:#e8c87e; --b3:#fff3d6; --b4:#dda869; --b5:#d9b36a; --b6:#e8c87e;
 --o1:#fff8ea; --o2:#f0cf92; --o3:#d9a45b; --o4:#8a5f18;
 --dr1:#d9a45b; --dr2:#f8e7c0;
 --tBS:rgba(217,179,106,.32); --tBS2:rgba(217,179,106,.48); --tBSb:rgba(233,196,160,.3);
 --tOG:rgba(217,179,106,.45); --tOGh:rgba(217,179,106,.62);
 --selfg:#dfa6b4; --selwash1:rgba(223,166,180,.12); --selwash2:rgba(217,179,106,.10); --selglow:rgba(223,166,180,.30);
}
/* ---- team-color takeover: franchise tokens remap the whole identity ---- */
:root[data-zpbteam]{
 --accent:var(--tA); --accent2:var(--tA2); --rose:var(--tA3);
 --text:var(--tTx); --sub:var(--tSu); --border:var(--tHr); --rosehair:var(--tHr);
 --glassbd:var(--tGb); --glow:var(--tGl); --glowA:var(--tGa); --glowB:var(--tGw);
 --bg:var(--tBg); --ongold:var(--tOn);
 --g1:var(--tG1); --g2:var(--tG2); --g3:var(--tG3); --g4:var(--tG4); --g5:var(--tG5); --g6:var(--tG6);
 --b1:var(--tB1); --b2:var(--tB2); --b3:var(--tB3); --b4:var(--tB4); --b5:var(--tB5); --b6:var(--tB6);
 --o1:var(--tO1); --o2:var(--tO2); --o3:var(--tO3); --o4:var(--tO4);
 --dr1:var(--tD1); --dr2:var(--tD2);
 --tBS:var(--tBSs); --tBS2:var(--tBSs2); --tBSb:var(--tBSsb);
 --tOG:var(--tOGs); --tOGh:var(--tOGhs); --selfg:var(--accent);
}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"])[data-zpbteam]{
  --accent:var(--tAd); --accent2:var(--tA2d); --rose:var(--tA3d);
  --text:var(--tTxd); --sub:var(--tSud); --border:var(--tHrd); --rosehair:var(--tHrd);
  --glassbd:var(--tGbd); --glow:var(--tGld); --glowA:var(--tGad); --glowB:var(--tGwd);
  --bg:var(--tBgd); --ongold:var(--tOnd);
  --g1:var(--tG1d); --g2:var(--tG2d); --g3:var(--tG3d); --g4:var(--tG4d); --g5:var(--tG5d); --g6:var(--tG6d);
  --b1:var(--tB1d); --b2:var(--tB2d); --b3:var(--tB3d); --b4:var(--tB4d); --b5:var(--tB5d); --b6:var(--tB6d);
  --o1:var(--tO1d); --o2:var(--tO2d); --o3:var(--tO3d); --o4:var(--tO4d);
  --dr1:var(--tD1d); --dr2:var(--tD2d);
  --tBS:var(--tBSsd); --tBS2:var(--tBSs2d); --tBSb:var(--tBSsbd);
  --tOG:var(--tOGsd); --tOGh:var(--tOGhsd); --selfg:var(--accent);
 }
}
:root[data-theme="dark"][data-zpbteam]{
 --accent:var(--tAd); --accent2:var(--tA2d); --rose:var(--tA3d);
 --text:var(--tTxd); --sub:var(--tSud); --border:var(--tHrd); --rosehair:var(--tHrd);
 --glassbd:var(--tGbd); --glow:var(--tGld); --glowA:var(--tGad); --glowB:var(--tGwd);
 --bg:var(--tBgd); --ongold:var(--tOnd);
 --g1:var(--tG1d); --g2:var(--tG2d); --g3:var(--tG3d); --g4:var(--tG4d); --g5:var(--tG5d); --g6:var(--tG6d);
 --b1:var(--tB1d); --b2:var(--tB2d); --b3:var(--tB3d); --b4:var(--tB4d); --b5:var(--tB5d); --b6:var(--tB6d);
 --o1:var(--tO1d); --o2:var(--tO2d); --o3:var(--tO3d); --o4:var(--tO4d);
 --dr1:var(--tD1d); --dr2:var(--tD2d);
 --tBS:var(--tBSsd); --tBS2:var(--tBSs2d); --tBSb:var(--tBSsbd);
 --tOG:var(--tOGsd); --tOGh:var(--tOGhsd); --selfg:var(--accent);
}
/* ---- ambient canvas: luminous wash + two drifting franchise-tinted auras ---- */
html{background:var(--bg);background:linear-gradient(180deg,var(--bg),color-mix(in srgb,var(--bg) 84%,var(--accent) 16%) 140%);}
body{background:transparent;}
body::before,body::after{content:"";position:fixed;z-index:-1;pointer-events:none;border-radius:50%;}
body::before{top:-28vmax;left:-16vmax;width:72vmax;height:72vmax;
 background:radial-gradient(closest-side,var(--glowA),transparent 70%);
 animation:zpbdrift1 26s ease-in-out infinite alternate;}
body::after{bottom:-30vmax;right:-18vmax;width:78vmax;height:78vmax;
 background:radial-gradient(closest-side,var(--glowB),transparent 70%);
 animation:zpbdrift2 34s ease-in-out infinite alternate;}
@keyframes zpbdrift1{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(10vmax,8vmax,0) scale(1.14)}}
@keyframes zpbdrift2{from{transform:translate3d(0,0,0) scale(1.1)}to{transform:translate3d(-9vmax,-7vmax,0) scale(.96)}}
::selection{background:var(--tTD,rgba(201,122,142,.30));}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
::-webkit-scrollbar{width:10px;height:10px;}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:8px;}
::-webkit-scrollbar-thumb:hover{background:var(--accent);}
::-webkit-scrollbar-track{background:transparent;}
/* ---- no panels: the masthead is open air, boxes become glass hairlines ---- */
.hero{border:0;background:transparent;box-shadow:none;padding:26px 6px 18px;margin-bottom:8px;overflow:visible;}
.hero::after{display:none;}
.panel{background:var(--glass);border:1px solid var(--glassbd);border-radius:22px;box-shadow:var(--shadow);
 backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);}
.synergy-box{background:transparent;border-color:var(--glassbd);border-radius:16px;}
.poslist{background:var(--glass);border:1px solid var(--glassbd);border-radius:16px;
 backdrop-filter:blur(18px) saturate(1.25);-webkit-backdrop-filter:blur(18px) saturate(1.25);
 box-shadow:0 18px 44px rgba(120,80,60,.18);}
.footnav{background:var(--glass);border:1px solid var(--glassbd);box-shadow:var(--shadow);
 backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
.draftingas{background:linear-gradient(90deg,var(--tTA,rgba(201,162,75,.14)),var(--tTB,rgba(201,122,142,.10)));
 border:1px solid var(--glassbd);border-radius:14px;}
/* ---- site bar: gold 20-0 at left (Home; lands on the season once one runs),
        moving pink 20-0s beside it. Persistent. ---- */
body[data-home="1"] .hero .tagline{display:none;}
body[data-home="1"] .stepper{display:none;}
body[data-home="1"] .hero{display:none;}
.zpb-bar{display:flex;align-items:center;height:54px;margin:0 0 10px;position:relative;
 border-top:1px solid var(--rosehair);border-bottom:1px solid var(--rosehair);}
.zpb-home{position:relative;display:flex;align-items:center;height:100%;flex:0 0 auto;z-index:2;
 padding:0 18px 0 8px;text-decoration:none;}
.zpb-home h1{margin:0;position:relative;white-space:nowrap;
 font-family:'Bodoni Moda',Didot,"Bodoni MT","Playfair Display",Georgia,ui-serif,serif;font-weight:600;
 font-size:1.5rem;letter-spacing:.22em;
 background:linear-gradient(92deg,var(--g1),var(--g2) 24%,var(--g3) 42%,var(--g4) 58%,var(--g5) 72%,var(--g6) 88%,var(--g1));
 background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
 animation:fxshine 9s linear infinite;}
.zpb-home:hover h1{filter:brightness(1.1) drop-shadow(0 0 12px var(--glow));}
.zpb-home:focus-visible{outline:2px solid var(--accent);outline-offset:-3px;}
.tagline{font-size:.92rem;letter-spacing:.02em;}
.hero-text{border-radius:12px;}
.zpb-shine{background:linear-gradient(90deg,var(--g1),var(--g2) 30%,var(--g5) 50%,var(--g2) 70%,var(--g1));
 background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
 animation:fxshine 5.5s linear infinite;font-weight:800;}
/* ---- VL-style moving 20-0s: two overlapped tracks drifting in opposite directions.
        Owner: shimmering rose gold - the wordmark's own gradient pulled toward rose,
        same fxshine cadence as the gold control on the left of the bar. ---- */
.zpb-marquee{position:relative;overflow:hidden;height:54px;flex:1 1 auto;min-width:0;
 -webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 90%,transparent);
 mask-image:linear-gradient(90deg,transparent,#000 14%,#000 90%,transparent);}
.zpb-mq{position:absolute;top:0;left:0;display:flex;align-items:center;height:54px;width:max-content;
 white-space:nowrap;animation:zpbmqa 52s linear infinite;will-change:transform;}
.zpb-mqB{animation:zpbmqb 76s linear infinite;opacity:.42;}
.zpb-mq span{font-family:'Bodoni Moda',Didot,"Bodoni MT","Playfair Display",Georgia,serif;font-weight:600;
 font-size:1.5rem;letter-spacing:.22em;padding:0 .5em;
 background:linear-gradient(92deg,color-mix(in srgb,var(--g1) 62%,var(--rose) 38%),color-mix(in srgb,var(--g2) 62%,var(--rose) 38%) 24%,color-mix(in srgb,var(--g3) 62%,var(--rose) 38%) 42%,color-mix(in srgb,var(--g4) 62%,var(--rose) 38%) 58%,color-mix(in srgb,var(--g5) 62%,var(--rose) 38%) 72%,color-mix(in srgb,var(--g6) 62%,var(--rose) 38%) 88%,color-mix(in srgb,var(--g1) 62%,var(--rose) 38%));
 background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
 animation:fxshine 9s linear infinite;}
.zpb-mq i{font-style:normal;color:var(--accent);opacity:.55;font-size:1.05rem;}
/* the 20-0 dash (Owner: "just use the standard dash"): the hyphen character
   stays in the DOM (accessible name keeps "20-0") and is rendered in the same
   standard sans stack the site's sentences use, so the wordmark, the marquee
   and the body text all show the identical standard dash, scaled to size */
.zpb-home .zpb-hy,.zpb-mq .zpb-hy{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}
@keyframes zpbmqa{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes zpbmqb{from{transform:translateX(-50%)}to{transform:translateX(0)}}
/* ---- dripping rose gold: liquid drips fall from the 20-0 wordmark ---- */
.zpb-drips{position:absolute;left:50%;bottom:-.3em;transform:translateX(-50%);
 display:flex;gap:.4em;pointer-events:none;}
.zpb-drips i{width:2px;height:.42em;border-radius:0 0 2px 2px;position:relative;
 background:linear-gradient(180deg,var(--dr1),rgba(207,151,82,0));
 transform-origin:top center;transform:scaleY(0);opacity:0;
 animation:zpbdrip 4.8s ease-in infinite;}
.zpb-drips i:nth-child(2){height:.6em;animation-delay:1.7s;}
.zpb-drips i:nth-child(3){height:.3em;animation-delay:3.1s;}
.zpb-drips i::after{content:"";position:absolute;left:50%;top:100%;width:.09em;height:.12em;
 margin-left:-.045em;border-radius:50% 50% 60% 60%/40% 40% 65% 65%;
 background:radial-gradient(circle at 35% 30%,var(--dr2),var(--dr1) 75%);opacity:0;
 animation:zpbdrop 4.8s ease-in infinite;}
.zpb-drips i:nth-child(2)::after{animation-delay:1.7s;}
.zpb-drips i:nth-child(3)::after{animation-delay:3.1s;}
@keyframes zpbdrip{0%{transform:scaleY(0);opacity:0}10%{opacity:.9}42%{transform:scaleY(1);opacity:.9}
62%{transform:scaleY(1);opacity:0}100%{transform:scaleY(1);opacity:0}}
@keyframes zpbdrop{0%,40%{transform:translateY(0) scale(.5);opacity:0}48%{opacity:.95}
80%{transform:translateY(.5em) scale(1);opacity:0}100%{transform:translateY(.5em);opacity:0}}
/* ---- the DRAFT button: Cinzel Decorative capitals wrapped in liquid-metal shimmer ---- */
#startDraftBtn{display:inline-block;position:relative;overflow:hidden;
 font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Didot,Georgia,serif !important;font-weight:900;
 font-size:1.5rem !important;letter-spacing:.3em;text-indent:.3em;
 padding:20px 62px !important;margin-top:22px !important;
 border-radius:999px;border:1px solid var(--tBSb);color:var(--ongold);cursor:pointer;
 background:linear-gradient(100deg,var(--b1),var(--b2) 26%,var(--b3) 44%,var(--b4) 62%,var(--b5) 82%,var(--b6));
 background-size:240% 100%;animation:fxshine 6.5s linear infinite;
 box-shadow:0 14px 38px var(--tBS),inset 0 1px 0 rgba(255,255,255,.6);
 transition:transform .16s ease,box-shadow .16s ease;}
#startDraftBtn::after{content:"";position:absolute;top:-20%;bottom:-20%;left:-45%;width:38%;
 background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.8),rgba(255,255,255,0));
 transform:skewX(-18deg);animation:zpbsheen 3.4s ease-in-out infinite;pointer-events:none;}
@keyframes zpbsheen{0%,52%{left:-45%}88%,100%{left:135%}}
#startDraftBtn:hover{transform:translateY(-2px) scale(1.02);
 box-shadow:0 20px 48px var(--tBS2),inset 0 1px 0 rgba(255,255,255,.6);}
#startDraftBtn:active{transform:translateY(0) scale(.99);}
/* ---- homepage stage: open air, everything centered on the shimmering DRAFT moment ---- */
#draftSetup{position:relative;text-align:center;background:transparent;border:0;box-shadow:none;
 padding:30px 10px 6px;backdrop-filter:none;-webkit-backdrop-filter:none;}
#draftSetup::after{display:none;}
#draftSetup .filters{justify-content:center;}
#draftSetup .filters select{min-width:250px;font-size:.98rem;padding:11px 36px 11px 14px;text-align:left;}
/* ---- buttons: franchise primary pills, quiet ghost secondaries ---- */
.resetbtn{background:transparent;color:var(--gold3);border:1px solid var(--tBSb);
 border-radius:999px;font-weight:700;box-shadow:none;
 transition:transform .12s ease,box-shadow .12s ease,border-color .12s ease,background .12s ease;}
.resetbtn:hover{border-color:var(--accent);color:var(--ongold);
 background:linear-gradient(90deg,var(--tTA,rgba(230,198,125,.25)),var(--tTC,rgba(201,162,75,.18)));
 transform:translateY(-1px);box-shadow:0 8px 22px var(--glow);}
#startSeasonBtn,#beginSeasonBtn,#beginSeasonBtn2,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn{
 background:linear-gradient(100deg,var(--g5),var(--g2) 45%,var(--g4));color:var(--ongold);
 border:1px solid var(--tBSb);box-shadow:0 10px 26px var(--glow);}
.tabbtn{background:transparent;border:1px solid var(--glassbd);color:var(--sub);border-radius:999px;}
.tabbtn:hover{color:var(--text);border-color:var(--rosehair);}
.tabbtn.active{background:linear-gradient(100deg,var(--g5),var(--g2) 55%,var(--g4));color:var(--ongold);
 border-color:var(--tBSb);box-shadow:0 6px 18px var(--glow);}
.footlink{color:var(--sub);}
.footlink:hover{color:var(--text);background:var(--tTC,rgba(201,162,75,.10));}
.footlink.active{color:var(--ongold);background:linear-gradient(100deg,var(--g5),var(--g2));}
#themeToggleBtn{color:var(--rose);}
.stepper li{background:var(--glass);border:1px solid var(--glassbd);color:var(--sub);border-radius:999px;}
.stepper li.done{color:var(--good);border-color:rgba(76,154,103,.4);}
.stepper li.on{background:linear-gradient(100deg,var(--g5),var(--g2));color:var(--ongold);
 border-color:transparent;box-shadow:0 4px 16px var(--glow);}
/* ---- fields: transparent with franchise hairlines, focus ring ---- */
.filters input,.posbtn,.row input[type=number]{
 background:var(--fieldbg);border:1px solid var(--rosehair);color:var(--text);border-radius:12px;}
.filters input:focus,.posbtn:focus{
 border-color:var(--rose);box-shadow:0 0 0 3px var(--tTE,rgba(201,122,142,.16));outline:none;}
/* ---- dropdown menus: rosegold chrome, Cinzel type, breathing rose-gold shimmer ---- */
select,.filters select{-webkit-appearance:none;appearance:none;
 font-family:'Cinzel','Bodoni Moda',Didot,Georgia,serif;font-weight:700;letter-spacing:.05em;
 color:var(--selfg);border:1px solid var(--rosehair);border-radius:12px;
 background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23a05a70' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"),
  linear-gradient(100deg,var(--selwash1),var(--selwash2) 46%,var(--selwash1));
 background-repeat:no-repeat,no-repeat;background-position:right 13px center,0 0;
 background-size:12px 8px,100% 100%;
 padding-right:32px;
 animation:zpbselg 4.6s ease-in-out infinite;
 transition:border-color .12s ease;}
select option{background:var(--panel);color:var(--text);font-family:inherit;}
select:focus{border-color:var(--rose);outline:none;}
@keyframes zpbselg{0%,100%{box-shadow:0 0 0 0 rgba(201,122,142,0);}50%{box-shadow:0 0 16px 0 var(--selglow);}}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) select{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23dfa6b4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"),
   linear-gradient(100deg,var(--selwash1),var(--selwash2) 46%,var(--selwash1));}
}
:root[data-theme="dark"] select{
 background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23dfa6b4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"),
  linear-gradient(100deg,var(--selwash1),var(--selwash2) 46%,var(--selwash1));}
/* ---- tables & data ---- */
th{color:var(--sub);}
tr:hover{background:var(--tTC,rgba(201,162,75,.08));}
th.sortable:hover,#playerTable th:hover{color:var(--rose);}
#playerTable th.sorted{color:var(--rose);}
.divtable tr.user-row{background:var(--tTA,rgba(201,162,75,.13));}
table.kp tr.kp-mvp{background:var(--tTA,rgba(201,162,75,.12));}
.champion-banner{background:linear-gradient(135deg,var(--tTA,rgba(201,162,75,.22)),var(--tTB,rgba(201,122,142,.14)));}
.mtag-div{background:linear-gradient(90deg,var(--g1),var(--g5));color:#fff8ea;box-shadow:0 2px 10px var(--tBS);}
.draftingas .badge-mono{color:var(--ongold);}
.poslist .qgbtn:hover{color:var(--ongold);}
.viewhead h2{font-family:'Bodoni Moda',Didot,"Bodoni MT","Playfair Display",Georgia,ui-serif,serif;font-weight:500;}
/* ---- team frames: rows painted by each player's franchise (3 brand hexes) ---- */
.zpb-trow{--zr1:transparent;--zr2:transparent;--zr3:transparent;--zrb:transparent;
 --zr1d:transparent;--zr2d:transparent;--zr3d:transparent;--zrbd:transparent;}
.prow.zpb-trow{background:linear-gradient(90deg,var(--zr1),var(--zr2) 46%,var(--zr3));
 border-left:3px solid var(--zrb);border-radius:10px;padding-left:8px;}
tr.zpb-trow{background:linear-gradient(90deg,var(--zr1),var(--zr2) 46%,var(--zr3)) !important;}
tr.zpb-trow td:first-child{box-shadow:inset 3px 0 0 var(--zrb);}
.depth-row.zpb-trow{background:linear-gradient(90deg,var(--zr1),transparent 72%);
 border-left:3px solid var(--zrb);border-radius:8px;padding-left:7px;}
td.zpb-trow{background:linear-gradient(90deg,var(--zr1),transparent);box-shadow:inset 3px 0 0 var(--zrb);}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .prow.zpb-trow,
 :root:not([data-theme="light"]) tr.zpb-trow{background:linear-gradient(90deg,var(--zr1d),var(--zr2d) 46%,var(--zr3d)) !important;}
 :root:not([data-theme="light"]) .prow.zpb-trow{border-left-color:var(--zrbd);}
 :root:not([data-theme="light"]) tr.zpb-trow td:first-child,
 :root:not([data-theme="light"]) td.zpb-trow{box-shadow:inset 3px 0 0 var(--zrbd);}
 :root:not([data-theme="light"]) .depth-row.zpb-trow{background:linear-gradient(90deg,var(--zr1d),transparent 72%);border-left-color:var(--zrbd);}
}
:root[data-theme="dark"] .prow.zpb-trow,
:root[data-theme="dark"] tr.zpb-trow{background:linear-gradient(90deg,var(--zr1d),var(--zr2d) 46%,var(--zr3d)) !important;}
:root[data-theme="dark"] .prow.zpb-trow{border-left-color:var(--zrbd);}
:root[data-theme="dark"] tr.zpb-trow td:first-child,
:root[data-theme="dark"] td.zpb-trow{box-shadow:inset 3px 0 0 var(--zrbd);}
:root[data-theme="dark"] .depth-row.zpb-trow{background:linear-gradient(90deg,var(--zr1d),transparent 72%);border-left-color:var(--zrbd);}
.zpb-chip{display:inline-flex;gap:2px;align-items:center;margin-right:5px;vertical-align:-1px;}
.zpb-chip i{width:7px;height:7px;border-radius:50%;background:var(--c1);
 box-shadow:inset 0 0 0 1px rgba(127,127,127,.35);}
.zpb-chip i:nth-child(2){background:var(--c2);}
.zpb-chip i:nth-child(3){background:var(--c3);}
/* ---- guide: removed from the home stage, fades in from the ether on scroll ---- */
.zpb-guidefade{opacity:0;transform:translateY(26px);transition:opacity 2s ease,transform 2s ease;}
.zpb-guidefade.zpb-guide-in{opacity:1;transform:none;}
/* ---- the homepage fade, everywhere: text fades in scrolling down and back out
        scrolling up at the same speed (one transition serves both directions) ---- */
/* Owner: the home page gets a couple of seconds to fade out, the draft page a
   couple of seconds to fade in - one slower transition serves both directions */
.zpb-fade{opacity:0;transform:translateY(26px);transition:opacity 2s ease,transform 2s ease;}
.zpb-fade.zpb-fade-in{opacity:1;transform:none;}
/* ---- home hint: the only text left on the homepage besides the wordmark ---- */
.zpb-hint{margin:0;padding:30px 10px 8px;text-align:center;}
.zpb-hint a{font-size:.5rem;letter-spacing:.09em;color:var(--sub);text-decoration:none;
 border-bottom:1px solid var(--rosehair);padding-bottom:2px;
 transition:color .25s ease,border-color .25s ease;}
.zpb-hint a:hover{color:var(--accent);border-color:var(--accent);}
.zpb-hint a:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px;}
/* ---- franchise logos (sportsdataverse/ESPN set), embedded as data URIs.
        Dark mode gives dark-ink crests a pale ivory disc so nothing vanishes ---- */
.zpb-logo{width:23px;height:23px;object-fit:contain;vertical-align:middle;display:inline-block;}
td .zpb-logo,.zpb-trow .zpb-logo{margin-right:6px;}
.zpb-das-logo{width:38px;height:38px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;}
.zpb-das-logo .zpb-logo{width:36px;height:36px;margin:0;}
.zpb-nextpick{margin-left:auto;font-weight:700;color:var(--sub);letter-spacing:.05em;
 font-variant-numeric:tabular-nums;white-space:nowrap;}
:root[data-theme="dark"] .zpb-logo{background:radial-gradient(circle,#fdf6e8,#f3e3c6);border-radius:50%;}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-logo{background:radial-gradient(circle,#fdf6e8,#f3e3c6);border-radius:50%;}
}
/* ---- the change affordance follows the palette, never default-browser blue ---- */
a.slotchg{color:var(--selfg);text-decoration:none;border-bottom:1px solid var(--rosehair);
 transition:color .15s ease,border-color .15s ease;}
a.slotchg:hover{color:var(--accent);border-bottom-color:var(--accent);}
/* ---- search field: small and quiet until clicked ---- */
#draftSearch2{flex:0 1 auto;width:150px;min-width:0;
 transition:width .35s ease,border-color .15s ease,box-shadow .15s ease;}
#draftSearch2:focus{width:330px;}
@media (max-width:760px){#draftSearch2,#draftSearch2:focus{width:100%;flex:1 1 100%;}}
/* ---- the TOP pill wears the identity (never green); the value badge is gone ---- */
.toptag{background:var(--accent);color:var(--ongold);}
/* ---- pagination ---- */
.pager{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap;}
.pagbtn{background:transparent;border:1px solid var(--rosehair);color:var(--text);border-radius:999px;
 padding:7px 18px;font-size:.8rem;font-weight:700;cursor:pointer;
 transition:transform .12s ease,box-shadow .12s ease,border-color .12s ease;}
.pagbtn:hover:not(:disabled){border-color:var(--rose);color:var(--rose);transform:translateY(-1px);
 box-shadow:0 4px 12px var(--tTE,rgba(201,122,142,.25));}
.pagbtn:disabled{opacity:.4;cursor:default;}
.paginfo{color:var(--sub);font-size:.78rem;font-weight:700;letter-spacing:.05em;}
/* ---- reduced motion: everything freezes, nothing breaks ---- */
@media (prefers-reduced-motion: reduce){
 .zpb-home h1,.zpb-shine,#startDraftBtn,select{animation:none !important;}
 #startDraftBtn::after,.zpb-mq{animation:none !important;}
 .zpb-mqB{display:none;}
 .zpb-drips i,.zpb-drips i::after,body::before,body::after{animation:none !important;}
 .zpb-drips i,.zpb-drips i::after{opacity:0;}
 .hero-text,.pagbtn,.tabbtn,.resetbtn,#startDraftBtn{transition:none !important;}
 .zpb-guidefade,.zpb-fade{transform:none;transition:opacity .8s ease;}
}
/* ---- mobile ---- */
@media (max-width:760px){
 .zpb-home h1{font-size:1.1rem;}
 .zpb-bar{height:42px;}
 .zpb-home{padding:0 12px 0 4px;}
 #startDraftBtn{padding:16px 44px !important;letter-spacing:.26em;text-indent:.26em;font-size:1.2rem !important;}
 .zpb-marquee{height:42px;}
 .zpb-mq{height:42px;}
 .zpb-mq span{font-size:1.1rem;}
 #draftSetup .filters select{min-width:100%;}
 .zpb-hint a{font-size:.62rem;}
}
/* ================= end Z-POST-BLUE THEME ================= */
"""

# ---------------------------------------------------------------- JS core
ZPB_CORE_JS = r"""
// ---- Z-post-blue core: team-color takeover, draft-board franchise frames,
//      header marquee, guide fade-in. UI only - no sim math touched. ----
const ZPB_TEAM_COLORS = __TEAM_COLORS_JSON__;
const ZPB_LOGOS = __ZPB_LOGOS_JSON__;
let zpbState = {teamName:null, packs:{}};
// franchise crest (embedded data URI); falls back to '' when unknown
function zpbTeamLogo(name){ const u=ZPB_LOGOS[name]; if(!u) return '';
 return '<img class="zpb-logo" loading="lazy" src="'+u+'" alt="'+(TEAM_ABBR[name]||name)+'" title="'+name+'">'; }
// board TEAM cell: the crest instead of the abbreviation, abbr as the fallback
function zpbTeamCell(name){ const l=zpbTeamLogo(name); return l||TEAM_ABBR[name]||name; }
function zpbRgb(h){ h=String(h).replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join('');
 const n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
function zpbHex(r,g,b){ return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function zpbMix(a,b,t){ const A=zpbRgb(a),B=zpbRgb(b); return zpbHex(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); }
function zpbHsl(hex){ let [r,g,b]=zpbRgb(hex).map(v=>v/255);
 const mx=Math.max(r,g,b), mn=Math.min(r,g,b); let h=0,s=0; const l=(mx+mn)/2;
 if(mx!==mn){ const d=mx-mn; s = l>0.5 ? d/(2-mx-mn) : d/(mx+mn);
  h = mx===r ? (g-b)/d+(g<b?6:0) : mx===g ? (b-r)/d+2 : (r-g)/d+4; h/=6; }
 return {h:h*360, s, l}; }
function zpbFromHsl(H,S,L){ const c=(1-Math.abs(2*L-1))*S, X=c*(1-Math.abs((H/60)%2-1)), m=L-c/2;
 let r,g,b;
 if(H<60){r=c;g=X;b=0} else if(H<120){r=X;g=c;b=0} else if(H<180){r=0;g=c;b=X}
 else if(H<240){r=0;g=X;b=c} else if(H<300){r=X;g=0;b=c} else {r=c;g=0;b=X}
 return zpbHex((r+m)*255,(g+m)*255,(b+m)*255); }
function zpbLum(hex){ return zpbRgb(hex).map(v=>{ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); })
 .reduce((acc,v,i)=>acc+v*[0.2126,0.7152,0.0722][i],0); }
function zpbContrast(a,b){ const l1=zpbLum(a), l2=zpbLum(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); }
function zpbRgba(hex,a){ const [r,g,b]=zpbRgb(hex); return 'rgba('+r+','+g+','+b+','+a+')'; }
// tone a brand color until it reads on the given background (keeps hue+saturation: darker/paler, never grey)
function zpbReadable(hex,bg,darkMode,target){
 const c=zpbHsl(hex); const s=Math.max(c.s,0.42); let l=c.l;
 for(let i=0;i<90;i++){
  const out=zpbFromHsl(c.h,s,l);
  if(zpbContrast(out,bg)>=target) break;
  if(!darkMode){ if(l<=0.15) break; l-=0.015; } else { if(l>=0.9) break; l+=0.015; }
 }
 return zpbFromHsl(c.h,s,l); }
function zpbShade(hex,t){ const c=zpbHsl(hex); return zpbFromHsl(c.h, Math.min(1,Math.max(c.s,0.42)), Math.max(0.16, c.l-t)); }
function zpbTint(hex,t){ const c=zpbHsl(hex); return zpbFromHsl(c.h, Math.min(1,Math.max(c.s,0.3)), Math.min(0.88, c.l+t)); }
// one display pack per franchise: brand chips stay the true 3 hexes; UI tones shift for accessibility
function zpbPackFor(name){
 if(zpbState.packs[name]) return zpbState.packs[name];
 const raw=ZPB_TEAM_COLORS[name]; if(!raw) return null;
 const [P,Q,R]=raw;
 let eng = raw[0];                                   // brand primary leads the identity
 if(zpbHsl(eng).s < 0.15) eng = raw.slice().sort((a,b)=>zpbHsl(b).s - zpbHsl(a).s)[0];   // non-chromatic primary (e.g. LV): most chromatic brand color
 if(zpbHsl(eng).s < 0.15) eng = zpbMix(eng,'#c9a24b',0.45);   // still no chroma (LV): warm it, chips stay true
 const bgL='#fcf7f1', bgD='#181114';
 const accL=zpbReadable(eng,bgL,false,4.6), accD=zpbReadable(eng,bgD,true,4.6);
 const rest = raw.filter(h=>h!==eng);
 const flo = h=>{ const c=zpbHsl(h); return zpbFromHsl(c.h, Math.max(c.s,0.42), Math.min(Math.max(c.l,0.3),0.55)); };
 // v7: bright secondary yellows are toned to the site's deep shimmering gold in light mode (no 'snot yellow')
 const goldTone = h=>{ const c=zpbHsl(h); return (c.h>=30&&c.h<=70&&c.l>0.42) ? zpbMix(zpbFromHsl(c.h,Math.min(1,Math.max(c.s,0.55)),0.5),'#c9a24b',0.45) : h; };
 const q=goldTone(flo(rest[0]!==undefined?rest[0]:eng)), r=goldTone(flo(rest[1]!==undefined?rest[1]:eng));
 const acc2L=zpbReadable(q,bgL,false,4.2), acc3L=zpbReadable(r,bgL,false,4.2);
 const acc2D=zpbReadable(q,bgD,true,4.2),  acc3D=zpbReadable(r,bgD,true,4.2);
 const txL=zpbReadable(eng,bgL,false,7.0);
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);
 const hairL=zpbMix(accL,bgL,0.42), hairD=zpbMix(accD,bgD,0.4);
 const pk={ raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,
  txL, txd, sud, hairL, hairD,
  bgL:zpbMix(bgL,accL,0.045), bgD:zpbMix(bgD,accD,0.09),
  on:zpbContrast(zpbMix(acc2L,'#ffffff',0.35),'#ffffff')>2.6 ? zpbReadable(eng,zpbMix(acc2L,'#ffffff',0.35),false,4.4) : '#fffaf2',
  onD:zpbContrast(zpbMix(acc2D,'#ffffff',0.35),'#181114')>2.6 ? zpbReadable(eng,zpbMix(acc2D,'#ffffff',0.35),true,4.4) : '#fffaf2',
  g1:zpbShade(accL,0.12), g2:acc2L, g3:zpbTint(accL,0.34), g4:acc3L, g5:accL, g6:zpbTint(acc2L,0.3),
  g1d:accD, g2d:zpbTint(accD,0.22), g3d:zpbMix(accD,'#ffffff',0.68), g4d:acc2D, g5d:zpbTint(accD,0.1), g6d:zpbMix(acc2D,'#ffffff',0.5),
  b1:zpbShade(accL,0.1), b2:zpbMix(acc2L,'#ffffff',0.25), b3:zpbMix('#ffffff',acc2L,0.2), b4:acc3L, b5:accL, b6:zpbMix(acc2L,'#ffffff',0.3),
  b1d:zpbShade(accD,0.12), b2d:zpbTint(acc2D,0.15), b3d:zpbMix('#ffffff',acc2D,0.3), b4d:acc3D, b5d:accD, b6d:zpbTint(acc2D,0.3),
  o1:zpbMix('#ffffff',acc2L,0.55), o2:zpbTint(accL,0.28), o3:accL, o4:zpbShade(accL,0.2),
  o1d:zpbMix('#ffffff',acc2D,0.5), o2d:zpbTint(accD,0.25), o3d:accD, o4d:zpbShade(accD,0.2),
  d1:acc3L, d2:zpbTint(acc2L,0.35), d1d:acc3D, d2d:zpbTint(acc2D,0.3) };
 pk.vars = {
  '--tA':accL,'--tA2':acc2L,'--tA3':acc3L,'--tTx':txL,'--tSu':zpbSoft(eng,bgL),'--tHr':hairL,
  '--tGb':zpbRgba(accL,0.18),'--tGl':zpbRgba(accL,0.30),'--tGa':zpbRgba(accL,0.30),'--tGw':zpbRgba(acc2L,0.16),
  '--tBg':pk.bgL,'--tOn':pk.on,
  '--tBSs':zpbRgba(accL,0.38),'--tBSs2':zpbRgba(accL,0.5),'--tBSsb':zpbRgba(accL,0.42),
  '--tOGs':zpbRgba(acc2L,0.5),'--tOGhs':zpbRgba(acc2L,0.68),
  '--tTA':zpbRgba(accL,0.20),'--tTB':zpbRgba(acc3L,0.12),'--tTC':zpbRgba(accL,0.08),
  '--tTD':zpbRgba(acc3L,0.30),'--tTE':zpbRgba(acc3L,0.16),
  '--tG1':pk.g1,'--tG2':pk.g2,'--tG3':pk.g3,'--tG4':pk.g4,'--tG5':pk.g5,'--tG6':pk.g6,
  '--tB1':pk.b1,'--tB2':pk.b2,'--tB3':pk.b3,'--tB4':pk.b4,'--tB5':pk.b5,'--tB6':pk.b6,
  '--tO1':pk.o1,'--tO2':pk.o2,'--tO3':pk.o3,'--tO4':pk.o4,'--tD1':pk.d1,'--tD2':pk.d2,
  '--tAd':accD,'--tA2d':acc2D,'--tA3d':acc3D,'--tTxd':txd,'--tSud':sud,'--tHrd':hairD,
  '--tGbd':zpbRgba(accD,0.16),'--tGld':zpbRgba(accD,0.30),'--tGad':zpbRgba(accD,0.10),'--tGwd':zpbRgba(acc2D,0.08),
  '--tBgd':pk.bgD,'--tOnd':pk.onD,
  '--tBSsd':zpbRgba(accD,0.34),'--tBSs2d':zpbRgba(accD,0.5),'--tBSsbd':zpbRgba(accD,0.4),
  '--tOGsd':zpbRgba(acc2D,0.45),'--tOGhsd':zpbRgba(acc2D,0.62),
  '--tTAd':zpbRgba(accD,0.16),'--tTBd':zpbRgba(acc3D,0.10),'--tTCd':zpbRgba(accD,0.08),
  '--tTDd':zpbRgba(acc3D,0.30),'--tTEd':zpbRgba(acc3D,0.16),
  '--tG1d':pk.g1d,'--tG2d':pk.g2d,'--tG3d':pk.g3d,'--tG4d':pk.g4d,'--tG5d':pk.g5d,'--tG6d':pk.g6d,
  '--tB1d':pk.b1d,'--tB2d':pk.b2d,'--tB3d':pk.b3d,'--tB4d':pk.b4d,'--tB5d':pk.b5d,'--tB6d':pk.b6d,
  '--tO1d':pk.o1d,'--tO2d':pk.o2d,'--tO3d':pk.o3d,'--tO4d':pk.o4d,'--tD1d':pk.d1d,'--tD2d':pk.d2d };
 zpbState.packs[name]=pk; return pk;
}
function zpbSoft(hex,bg){
 const c=zpbHsl(hex); let l=Math.max(c.l,0.3); const s=Math.max(c.s,0.4);
 let out=zpbFromHsl(c.h,s,l);
 for(let i=0;i<60 && zpbContrast(out,bg)>4.9; i++){ l+=0.02; out=zpbFromHsl(c.h,s,l); }
 return out; }
const ZPB_TOKEN_KEYS = ['--tA','--tA2','--tA3','--tTx','--tSu','--tHr','--tGb','--tGl','--tGa','--tGw','--tBg','--tOn',
 '--tBSs','--tBSs2','--tBSsb','--tOGs','--tOGhs','--tTA','--tTB','--tTC','--tTD','--tTE',
 '--tG1','--tG2','--tG3','--tG4','--tG5','--tG6','--tB1','--tB2','--tB3','--tB4','--tB5','--tB6',
 '--tO1','--tO2','--tO3','--tO4','--tD1','--tD2',
 '--tAd','--tA2d','--tA3d','--tTxd','--tSud','--tHrd','--tGbd','--tGld','--tGad','--tGwd','--tBgd','--tOnd',
 '--tBSsd','--tBSs2d','--tBSsbd','--tOGsd','--tOGhsd','--tTAd','--tTBd','--tTCd','--tTDd','--tTEd',
 '--tG1d','--tG2d','--tG3d','--tG4d','--tG5d','--tG6d','--tB1d','--tB2d','--tB3d','--tB4d','--tB5d','--tB6d',
 '--tO1d','--tO2d','--tO3d','--tO4d','--tD1d','--tD2d'];
function zpbApplyTeamTheme(name){
 const root=document.documentElement, pk=zpbPackFor(name);
 if(!pk){ zpbClearTeamTheme(); return; }
 zpbState.teamName=name;
 for(const k in pk.vars) root.style.setProperty(k, pk.vars[k]);
 root.setAttribute('data-zpbteam','1');
}
function zpbClearTeamTheme(){
 const root=document.documentElement;
 ZPB_TOKEN_KEYS.forEach(k=>root.style.removeProperty(k));
 root.removeAttribute('data-zpbteam');
 zpbState.teamName=null;
}
// the true 3 brand hexes, always (chips/stripe identity)
function zpbTeamChips(name){
 const pk=zpbPackFor(name); if(!pk) return '';
 return '<span class="zpb-chip" aria-hidden="true" style="--c1:'+pk.raw[0]+';--c2:'+pk.raw[1]+';--c3:'+pk.raw[2]+'"><i></i><i></i><i></i></span>';
}
// inline custom props consumed by .zpb-trow (light + dark sets, swapped by CSS)
function zpbRowVars(name){
 const pk=zpbPackFor(name); if(!pk) return '';
 return '--zr1:'+zpbRgba(pk.accL,0.12)+';--zr2:'+zpbRgba(pk.accL,0.03)+';--zr3:'+zpbRgba(pk.raw[2],0.10)+';--zrb:'+pk.accL+
  ';--zr1d:'+zpbRgba(pk.accD,0.15)+';--zr2d:'+zpbRgba(pk.accD,0.04)+';--zr3d:'+zpbRgba(pk.raw[2],0.12)+';--zrbd:'+pk.accD+';';
}
function zpbUserRowVars(){ return zpbState.teamName ? zpbRowVars(zpbState.teamName) : ''; }
// VL-style marquee: both tracks carry duplicated content for a seamless -50% loop
function zpbBuildMarquee(){
 ['zpbMqA','zpbMqB'].forEach(id=>{
  const el=document.getElementById(id); if(!el) return;
  let u=''; for(let i=0;i<18;i++) u+='<span>20<span class="zpb-hy">-</span>0</span><i>\u00b7</i>';
  el.innerHTML = u+u;
 });
}
function zpbWireGuideFade(){
 const h=document.getElementById('draftGuideHost'); if(!h || h.dataset.fadeWired) return;
 h.dataset.fadeWired='1';
 // bidirectional: fades in scrolling down, fades out at the same speed scrolling back up
 if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ h.classList.toggle('zpb-guide-in', e.isIntersecting); }); },
   {rootMargin:'0px 0px -8% 0px', threshold:0.05});
  io.observe(h); h._zpbIO=io;
 } else {
  const tick=()=>{ const r=h.getBoundingClientRect(); h.classList.toggle('zpb-guide-in', r.top < window.innerHeight*0.94 && r.bottom > 0); };
  window.addEventListener('scroll',tick,{passive:true}); window.addEventListener('resize',tick);
 }
}
function zpbRewireGuide(){
 const h=document.getElementById('draftGuideHost'); if(!h) return;
 h.classList.remove('zpb-guide-in');
 if(h._zpbIO){ try{ h._zpbIO.observe(h); }catch(e){} }
}
// home = draft setup in view; drives tagline/stepper trim + marquee visibility
function zpbSyncHome(){
 const vd=document.getElementById('viewDraft'), ds=document.getElementById('draftSetup');
 const home = !!(vd && vd.classList.contains('active') && ds && ds.style.display!=='none');
 document.body.setAttribute('data-home', home?'1':'0');
}
// ---- the homepage fade, applied across the site's text pages: one observer
//      toggles the class both ways, so leaving the viewport fades out too.
//      Scope: static text surfaces (guide sections, page headers, stage intros)
//      — live-sim chrome is deliberately excluded so week-by-week re-renders
//      never flicker.
var zpbFadeIO = null;
function zpbFadeScan(){
 if(!('IntersectionObserver' in window)) return;
 if(!zpbFadeIO){
  zpbFadeIO = new IntersectionObserver(function(es){
   es.forEach(function(e){ e.target.classList.toggle('zpb-fade-in', e.isIntersecting); });
  },{rootMargin:'0px 0px -8% 0px', threshold:0.06});
 }
 document.querySelectorAll('#guideBody .panel, #suppHead h2, #suppHead p.narr, #homeCmpResult .panel, #seasonHost .hero-panel').forEach(function(el){
  if(el.dataset.zpbfade) return;
  el.dataset.zpbfade = '1';
  el.classList.add('zpb-fade');
  zpbFadeIO.observe(el);
 });
}
zpbBuildMarquee(); zpbWireGuideFade(); zpbSyncHome(); zpbFadeScan();
"""

# ---------------------------------------------------------------- v7 CSS layer
ZPB_CSS_V7 = r"""
/* ================= Z-POST-BLUE v7 (seventh wave) ================= */
/* green/red follow the identity once a franchise is picked (pick priority,
   standings W/L, lineup arrows, done-bubbles - never permanent green) */
:root[data-zpbteam]{ --good:var(--tA2); --bad:var(--tA3); }
:root[data-theme="dark"][data-zpbteam]{ --good:var(--tA2d); --bad:var(--tA3d); }
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"])[data-zpbteam]{ --good:var(--tA2d); --bad:var(--tA3d); }
}
/* stepper bubbles (if any) wear the identity, never permanent green */
.stepper li.done{color:var(--accent);border-color:var(--tBSs,rgba(201,162,75,.38));}
.stepper li.done{border-color:var(--tBSs,var(--glow));}
/* CTAs shimmer with the franchise gradient */
[data-zpbteam] .resetbtn{background-size:220% 100%;animation:zpbbtnshine 3.4s linear infinite;}
@keyframes zpbbtnshine{0%{background-position:0% 50%;}100%{background-position:-220% 50%;}}
@media (prefers-reduced-motion: reduce){[data-zpbteam] .resetbtn{animation:none;background-size:100% 100%;}}
/* rivalry/division tags wear the identity too */
[data-zpbteam] .mtag-div{background:linear-gradient(90deg,var(--tG5,var(--g5)),var(--tG2,var(--g2)));color:var(--tOn,var(--ongold));box-shadow:0 2px 12px var(--tGl,var(--glow));}
[data-zpbteam] .mtag-riv{background:linear-gradient(90deg,var(--tA3),var(--tA));color:#fffaf2;box-shadow:0 2px 12px var(--tGl,var(--glow));}
/* soft glow on the visual panels */
.zpb-glowpanel{box-shadow:var(--shadow),0 0 26px var(--tGw,rgba(201,162,75,.12)) inset;}
/* ---- Start Season: same font and side as the home DRAFT control, team shimmer ---- */
.zpb-stageintro{padding:30px 4px 8px;margin:0 0 8px;}
.zpb-startbtn{font-family:'Cinzel Decorative',serif;font-weight:900;letter-spacing:.26em;text-indent:.26em;
 font-size:1.2rem !important;padding:16px 44px !important;border-radius:999px;width:auto;
 border:1px solid var(--tBSs,var(--tBSb));color:var(--tOn,var(--ongold));
 background:linear-gradient(100deg,var(--tG5,var(--g5)),var(--tG2,var(--g2)) 45%,var(--tG4,var(--g4)));
 box-shadow:0 10px 30px var(--tGl,var(--glow));transition:transform .15s ease,box-shadow .15s ease;}
.zpb-startbtn:hover{transform:translateY(-2px);box-shadow:0 14px 36px var(--tGl,var(--glow));}
/* ---- logo matchup card (no panel box) ---- */
.zpb-mu{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;margin:12px 0 14px;padding:20px 16px;
 border-radius:18px;position:relative;overflow:hidden;border:1px solid var(--rosehair);
 background:linear-gradient(120deg,rgba(201,162,75,.10),var(--panel2) 45%,rgba(201,122,142,.10));box-shadow:var(--shadow);}
.zpb-mu::after{content:'';position:absolute;top:-40%;left:-70%;width:45%;height:180%;transform:rotate(18deg);
 background:linear-gradient(90deg,transparent,rgba(255,255,255,.34),transparent);animation:zpbmusheen 5.6s ease-in-out infinite;}
@keyframes zpbmusheen{0%,55%{left:-70%;}100%{left:130%;}}
@media (prefers-reduced-motion: reduce){.zpb-mu::after{animation:none;display:none;}}
.zpb-mu-team{text-align:center;padding:12px 8px;border-radius:14px;transition:transform .35s ease;position:relative;z-index:1;
 background:linear-gradient(165deg,var(--zr1,transparent),transparent 72%);border-left:3px solid var(--zrb,var(--accent));}
.zpb-mu-team:hover{transform:translateY(-3px) scale(1.02);}
.zpb-mu-logo img{width:86px;height:86px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.16));transition:transform .35s ease;}
.zpb-mu-team:hover .zpb-mu-logo img{transform:scale(1.07);}
.zpb-mu-name{font-weight:800;font-size:1.05rem;margin-top:6px;}
.zpb-mu-rec{color:var(--sub);font-size:.78rem;margin-top:1px;}
.zpb-mu-at{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.6rem;position:relative;z-index:1;
 background:linear-gradient(100deg,var(--g5),var(--g2),var(--rose));-webkit-background-clip:text;background-clip:text;color:transparent;}
/* ---- stars faceoff: players across from each other, glowing stars ---- */
.zpb-stars{margin:2px 0 12px;border:1px solid var(--rosehair);border-radius:14px;overflow:hidden;}
.zpb-stars-hd{display:grid;grid-template-columns:1fr 1fr;background:var(--panel2);border-bottom:1px solid var(--border);}
.zpb-stars-hd>div{display:flex;align-items:center;gap:8px;padding:8px 12px;font-weight:800;font-size:.88rem;}
.zpb-stars-hd>div+div{border-left:1px solid var(--border);justify-content:flex-end;}
.zpb-stars-hd img{width:22px;height:22px;}
.zpb-star-row{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);}
.zpb-star-row:first-child{border-top:none;}
.zpb-star-cell{display:flex;align-items:center;gap:7px;padding:7px 12px;font-size:.86rem;min-height:36px;}
.zpb-star-cell+.zpb-star-cell{border-left:1px solid var(--border);}
.zpb-star-cell .narr{opacity:.72;font-size:.72rem;}
.zpb-star-cell b{margin-left:auto;font-weight:800;font-variant-numeric:tabular-nums;}
.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite;}
@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}
@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}
/* ---- schedule: crest week tiles ---- */
.zst-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;margin:10px 0 4px;}
.zst-tile{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 6px 8px;border-radius:12px;
 border:1px solid var(--border);background:var(--glass);text-align:center;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;}
.zst-played{cursor:pointer;}
.zst-played:hover{transform:translateY(-2px);border-color:var(--rosehair);box-shadow:0 8px 18px var(--tGw,rgba(201,162,75,.14));}
.zst-wk{position:absolute;top:4px;left:7px;font-size:.6rem;color:var(--sub);font-weight:700;}
.zst-at{font-size:.62rem;letter-spacing:.08em;color:var(--sub);text-transform:uppercase;}
.zst-logo img{width:34px;height:34px;}
.zst-opp{font-size:.7rem;font-weight:700;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.zst-res{font-weight:900;font-size:.95rem;line-height:1;}
.zst-w{color:var(--good);} .zst-l{color:var(--bad);} .zst-t{color:var(--sub);}
.zst-score{font-size:.66rem;color:var(--sub);font-variant-numeric:tabular-nums;}
.zst-detail{margin-top:6px;}
/* ---- identity / scouting: rank bars ---- */
.zpb-rkgrid{display:flex;flex-direction:column;gap:2px;}
.zpb-rkrow{display:grid;grid-template-columns:118px 1fr 40px 44px;gap:8px;align-items:center;padding:4px 8px;border-radius:9px;font-size:.8rem;}
.zpb-rkrow:nth-child(odd){background:var(--zr2,var(--panel2));}
.zpb-rkname{color:var(--text);}
.zpb-rkbar{height:8px;border-radius:4px;background:var(--border);overflow:hidden;}
.zpb-rkbar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--zrb,var(--accent)),var(--zr1,var(--accent)));box-shadow:0 0 8px var(--zr1,transparent);}
.zpb-rkval{font-variant-numeric:tabular-nums;text-align:right;}
.zpb-rkgrade{color:var(--sub);text-align:right;font-variant-numeric:tabular-nums;}
/* ---- matchup math: side-by-side bars ---- */
.zpb-mhead{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-weight:800;margin:2px 0 8px;}
.zpb-mgrid{display:flex;flex-direction:column;gap:3px;}
.zpb-mrow{display:grid;grid-template-columns:1fr 128px 1fr;gap:8px;align-items:center;padding:3px 6px;border-radius:9px;}
.zpb-mrow:nth-child(odd){background:var(--panel2);}
.zpb-mcell{display:flex;align-items:center;gap:6px;min-width:0;}
.zpb-mc-h{flex-direction:row-reverse;text-align:right;}
.zpb-mcell b{font-variant-numeric:tabular-nums;}
.zpb-mlab{text-align:center;font-size:.72rem;color:var(--sub);letter-spacing:.02em;}
.zpb-mbar{flex:1;height:7px;border-radius:4px;background:var(--border);overflow:hidden;min-width:30px;}
.zpb-mbar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--zrb,var(--accent)),var(--zr1,var(--accent)));}
.zpb-mc-h .zpb-mbar i{background:linear-gradient(90deg,var(--zr1,var(--accent)),var(--zrb,var(--accent)));}
.zpb-mwin{color:var(--good);}
/* ---- lineups: floaty rows instead of the boxy table ---- */
.zpb-lu{display:flex;flex-direction:column;}
.zpb-lu-grp{margin:12px 0 4px;text-transform:uppercase;letter-spacing:.06em;font-size:.68rem;color:var(--sub);font-weight:700;}
.zpb-lu-row{display:grid;grid-template-columns:1fr 76px 1fr;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;transition:background .2s ease,transform .2s ease;}
.zpb-lu-row:hover{background:var(--selwash1,var(--panel2));transform:translateX(2px);}
.zpb-lu-cell{font-size:.86rem;min-width:0;padding:4px 8px;border-radius:9px;}
.zpb-lu-l{text-align:right;} .zpb-lu-r{text-align:left;}
.zpb-lu-win{font-weight:800;box-shadow:inset 0 0 0 1px var(--zrb,var(--accent)),0 0 12px var(--zr1,transparent);}
.zpb-lu-c{text-align:center;font-size:.64rem;color:var(--sub);letter-spacing:.08em;text-transform:uppercase;}
/* ---- game plan cards ---- */
.zpb-plans{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media (max-width:700px){.zpb-plans{grid-template-columns:1fr;}}
.zpb-plan{border:1px solid var(--rosehair);border-radius:14px;padding:10px 12px;background:linear-gradient(160deg,var(--zr1,transparent),transparent 70%);}
.zpb-plan-hd{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.zpb-plan-hd img{width:26px;height:26px;}
.zpb-plan-hd b{display:block;font-size:.9rem;}
.zpb-plan-hd .narr{display:block;font-size:.68rem;}
.zpb-plan-row{display:flex;justify-content:space-between;gap:8px;font-size:.8rem;padding:2px 0;}
.zpb-plan-fx{margin-top:6px;font-size:.72rem;color:var(--sub);}
/* ---- simplified dropdown explainers ---- */
details.zpb-dd{border:1px solid var(--rosehair);border-radius:12px;padding:9px 12px;margin:8px 0;background:var(--glass);}
details.zpb-dd>summary{cursor:pointer;font-weight:700;font-size:.88rem;color:var(--text);list-style:none;}
details.zpb-dd>summary::-webkit-details-marker{display:none;}
details.zpb-dd>summary::before{content:'\25B8\00A0';color:var(--rose);}
details.zpb-dd[open]>summary::before{content:'\25BE\00A0';}
.zpb-whyrow{display:grid;grid-template-columns:150px 1fr 42px;gap:8px;align-items:center;margin:5px 0;font-size:.8rem;}
.zpb-whyname{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zpb-whybar{height:9px;border-radius:5px;background:var(--border);overflow:hidden;}
.zpb-whybar i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--g5),var(--g2));}
.zpb-modes{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px;}
.zpb-modes>div{border:1px solid var(--rosehair);border-radius:12px;padding:8px 6px;text-align:center;background:var(--glass);}
.zpb-modes b{display:block;font-size:.8rem;}
.zpb-modes span{font-size:.68rem;color:var(--sub);}
.zpb-twop{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:4px 0 2px;}
.zpb-twop>div{border:1px solid var(--rosehair);border-radius:12px;padding:8px;text-align:center;background:var(--glass);}
.zpb-twop b{display:block;}
.zpb-twop span{font-size:.7rem;color:var(--sub);}
/* ---- preview model strip ---- */
.zpb-strip{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;margin:8px 0 4px;}
.zpb-strip-team{display:flex;align-items:center;gap:8px;font-size:.86rem;}
.zpb-strip-team img{width:30px;height:30px;}
.zpb-strip-team .narr{display:block;font-size:.66rem;}
.zpb-strip-h{justify-self:end;}
.zpb-strip-bar{position:relative;width:170px;height:10px;border-radius:6px;background:var(--zr1,rgba(201,122,142,.25));overflow:hidden;border:1px solid var(--rosehair);}
.zpb-strip-bar i{position:absolute;top:0;right:0;bottom:0;border-radius:6px 0 0 6px;background:linear-gradient(90deg,var(--zrb,var(--accent)),var(--zr1,var(--accent)));}
.zpb-strip-bar span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4);font-variant-numeric:tabular-nums;}
.zpb-strip-edges{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 8px;}
.zpb-edge{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--rosehair);border-radius:999px;padding:2px 9px 2px 4px;font-size:.72rem;font-weight:700;background:var(--glass);}
.zpb-edge img{width:16px;height:16px;}
/* ---- standings: your division first, others compact ---- */
.zpb-stand-minor{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:8px;margin-top:12px;}
.zpb-smdiv{border:1px solid var(--border);border-radius:10px;padding:7px 10px;background:var(--glass);font-size:.72rem;}
.zpb-smdiv h6{margin:0 0 4px;font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;color:var(--sub);}
.zpb-smrow{display:flex;justify-content:space-between;gap:6px;padding:1px 0;}
.zpb-smrow img{width:13px;height:13px;vertical-align:-2px;margin-right:4px;}
.zpb-smrow-me{font-weight:800;color:var(--accent);}
.divtable.zpb-divmain{border:1px solid var(--rosehair);border-radius:12px;padding:8px 10px;background:var(--glass);}
.zpb-divmain img{width:16px;height:16px;vertical-align:-3px;margin-right:5px;}
/* ---- caution overlay ---- */
.zpb-caution-ov{position:fixed;inset:0;background:rgba(24,17,20,.62);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:80;padding:16px;}
.zpb-caution{background:var(--panel);border:1px solid var(--rosehair);border-radius:18px;max-width:460px;width:100%;padding:26px 24px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.45);}
.zpb-caution .zpb-warn{width:54px;height:54px;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
 font-weight:900;font-size:1.5rem;color:var(--ongold);background:linear-gradient(140deg,var(--g2),var(--g5));box-shadow:0 8px 24px var(--glow);}
.zpb-caution h3{font-size:1.08rem;line-height:1.4;}
/* ---- game replay overlay (ESPN-style scoring log) ---- */
.zpb-replay-ov{position:fixed;inset:0;background:rgba(24,17,20,.80);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:90;padding:14px;}
.zpb-replay{width:min(560px,96vw);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;
 background:linear-gradient(160deg,var(--panel),var(--panel2));border:1px solid var(--rosehair);box-shadow:0 30px 90px rgba(0,0,0,.5);}
.zpb-rep-hd{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid var(--border);}
.zpb-rep-team{display:flex;align-items:center;gap:7px;}
.zpb-rep-team:last-child{justify-content:flex-end;}
.zpb-rep-team img{width:26px;height:26px;}
.zpb-rep-team b{font-size:.82rem;letter-spacing:.04em;}
.zpb-rep-sc{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.5rem;font-variant-numeric:tabular-nums;}
.zpb-rep-qchip{font-size:.64rem;letter-spacing:.22em;color:var(--sub);font-weight:800;}
.zpb-rep-log{overflow-y:auto;padding:10px 14px;min-height:230px;max-height:48vh;}
.zpb-rep-q{margin:10px 0 4px;font-size:.62rem;letter-spacing:.24em;color:var(--sub);text-transform:uppercase;text-align:center;}
.zpb-rep-line{display:flex;align-items:center;gap:7px;padding:5px 9px;border-radius:10px;font-size:.82rem;margin:3px 0;
 opacity:0;transform:translateY(7px);transition:opacity .45s ease,transform .45s ease;background:var(--glass);border:1px solid var(--glassbd);}
.zpb-rep-line.in{opacity:1;transform:none;}
.zpb-rep-line.zrl-me{border-color:var(--tBSs,var(--glow));box-shadow:0 0 12px var(--tGw,transparent);}
.zpb-rep-line img{width:19px;height:19px;}
.zrl-t{color:var(--sub);font-variant-numeric:tabular-nums;font-size:.7rem;min-width:46px;}
.zrl-team{font-weight:800;font-size:.72rem;}
.zrl-play{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.zrl-pts{font-weight:800;color:var(--accent);}
.zrl-sc{font-variant-numeric:tabular-nums;font-weight:700;color:var(--sub);}
.zpb-rep-final{text-align:center;padding:14px 6px 8px;font-size:.95rem;}
.zpb-rep-final b{display:block;font-family:'Cinzel Decorative',serif;font-size:1.3rem;}
.zpb-rep-final span{color:var(--sub);font-size:.8rem;}
.zpb-rep-ft{padding:12px 16px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;}
.zpb-rep-prog{flex:1;height:5px;border-radius:3px;background:var(--border);overflow:hidden;}
.zpb-rep-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--tG5,var(--g5)),var(--tG2,var(--g2)));transition:width .4s linear;}
@media (max-width:640px){
 .zpb-mu-logo img{width:64px;height:64px;}
 .zpb-mu-name{font-size:.9rem;}
 .zpb-star-cell .narr{display:none;}
 .zpb-lu-row{grid-template-columns:1fr 54px 1fr;}
 .zpb-whyrow{grid-template-columns:110px 1fr 40px;}
}
/* ================= end v7 ================= */
"""

# ---------------------------------------------------------------- v8 CSS layer
ZPB_CSS_V8 = r"""
/* ================= Z-POST-BLUE v8 (eighth wave) ================= */
/* a real footer: pinned to the bottom of the page, hint sits right above it.
   NOTE: the base never explicitly closes .wrap (the parser nests everything
   inside it), so the pinning happens inside .wrap: it becomes a flex column,
   the footer is ordered last and pushed down with margin-top:auto. */
body{min-height:100vh;min-height:100svh;display:flex;flex-direction:column;}
.wrap{flex:1 0 auto;display:flex;flex-direction:column;}
.wrap > .view{width:100%;}
nav.footnav{order:8;width:100%;}
.zpb-foot{order:9;flex:0 0 auto;margin-top:auto;padding:0 10px 10px;}
.zpb-footline{border-top:1px solid var(--border);margin:0 6px;padding:7px 0 0;text-align:center;}
.zpb-fmark{font-size:.55rem;font-weight:800;letter-spacing:.34em;text-indent:.34em;
 color:var(--accent);opacity:.85;}
/* dropdowns shrink in place, side by side - never stack */
#draftSetup .filters{flex-wrap:nowrap;gap:10px;}
#draftSetup .filters select{min-width:0;width:auto;flex:1 1 0;max-width:300px;
 font-size:.98rem;padding:11px 30px 11px 12px;text-align:left;
 white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
@media (max-width:760px){
 #draftSetup .filters{flex-wrap:nowrap;gap:7px;}
 #draftSetup .filters select{width:auto !important;flex:1 1 0;max-width:100%;
  font-size:.8rem;padding:9px 24px 9px 10px;}
}
@media (max-width:430px){
 #draftSetup .filters select{font-size:.72rem;padding:8px 20px 8px 8px;}
}
/* the three team-color bubbles live UNDER the crest */
.zpb-teamcol{display:inline-flex;flex-direction:column;align-items:center;gap:2px;vertical-align:middle;}
.zpb-teamcol .zpb-logo{margin-right:0;}
/* "math's pick" (+ every passfail badge) wears the selected team's palette */
[data-zpbteam] .badge-passfail{background:color-mix(in srgb,var(--tA2) 20%,transparent);color:var(--tA2);}
:root[data-theme="dark"][data-zpbteam] .badge-passfail{background:color-mix(in srgb,var(--tA2d) 22%,transparent);color:var(--tA2d);}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"])[data-zpbteam] .badge-passfail{background:color-mix(in srgb,var(--tA2d) 22%,transparent);color:var(--tA2d);}
}
/* "by your next pick" is the first casualty of a narrow window */
@media (max-width:900px){.zpb-nxpick{display:none;}}
/* sortable board headers show the active sort with an arrow */
#draftTable2 th.sortable{cursor:pointer;user-select:none;}
#draftTable2 th.sortable:hover{color:var(--accent);}
#draftTable2 th.sort-sel{color:var(--accent);}
#draftTable2 th.sort-sel[data-dir="asc"]::after{content:" \25B2";font-size:.62em;}
#draftTable2 th.sort-sel[data-dir="desc"]::after{content:" \25BC";font-size:.62em;}
/* the compact board takes over BEFORE the table could ever need a sideways
   scroll - the Draft button (with name + pos) can never leave the screen */
@media (max-width:1120px){
 #draftTable2,#draftTable2 tbody{display:block;overflow:visible !important;width:100%;}
 #draftTable2 thead{display:none;}
 #draftTable2 tr{display:grid;grid-template-columns:repeat(12,1fr);gap:2px 4px;align-items:end;border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:10px;margin:5px 0;padding:6px 8px;background:var(--panel2);}
 #draftTable2 td{display:block;border:0 !important;padding:0 !important;text-align:left !important;min-width:0;font-size:0.8rem;}
 #draftTable2 td[data-label]::before{content:attr(data-label);display:block;font-size:0.56rem;text-transform:uppercase;letter-spacing:.06em;color:var(--sub);font-weight:700;line-height:1.1;}
 #draftTable2 td.dc-name{grid-column:1 / 9;grid-row:1;font-weight:800;font-size:0.92rem;align-self:center;overflow-wrap:anywhere;}
 #draftTable2 td.dc-ovr{grid-column:9 / 11;grid-row:1;text-align:center !important;font-size:1.1rem;font-weight:900;background:color-mix(in srgb,var(--tA,var(--accent)) 15%,transparent);border-radius:8px;padding:2px 9px !important;justify-self:start;}
 #draftTable2 td.dc-btn{grid-column:11 / 13;grid-row:1;text-align:right !important;align-self:center;}
 #draftTable2 td:nth-child(2){grid-column:1 / 3;grid-row:2;} #draftTable2 td:nth-child(3){grid-column:3 / 5;grid-row:2;}
 #draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);} #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}
 #draftTable2 td.dc-pri{grid-column:10 / 13;grid-row:2;color:var(--gold);}
 #draftTable2 td.dc-gone{grid-column:1 / 3;grid-row:3;color:var(--accent2);} #draftTable2 td.dc-fills{grid-column:3 / 13;grid-row:3;font-size:0.72rem;}
 #draftTable2 td.dc-fills .narr{display:inline;margin:0 0 0 4px;}
 #draftTable2 td.dc-btn button{padding:5px 10px;font-size:0.75rem;white-space:nowrap;}
}
/* ================= end v8 ================= */
"""

# ---------------------------------------------------------------- v7 JS layer
ZPB_V7_JS = r"""
// ---- Z-post-blue v7: caution dialog, lineup name compression, preview strip,
//      the ESPN-style game replay. UI only - no sim math touched. ----
function zpbCaution(yesLabel, onYes){
 const ov = document.createElement('div'); ov.className = 'zpb-caution-ov';
 ov.innerHTML = '<div class="zpb-caution"><div class="zpb-warn">!</div>'
  + '<h3 style="margin:0 0 6px;">Caution: Your current season will be erased if you continue</h3>'
  + '<p class="narr" style="margin:0 0 16px;">Results, stats and awards in progress are thrown away.</p>'
  + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
  + '<button class="tabbtn" data-zc="no">Return to the season</button>'
  + '<button class="resetbtn" data-zc="yes" style="width:auto;margin:0;padding:9px 18px;background:var(--bad);color:#fff;">' + yesLabel + '</button>'
  + '</div></div>';
 document.body.appendChild(ov);
 ov.addEventListener('click', e=>{ const t = e.target.closest('[data-zc]'); if(!t && e.target!==ov) return; ov.remove(); if(t && t.dataset.zc==='yes') onYes(); });
}
// preseason: show the last name only when the window compresses
function zpbFitLineupNames(){
 const narrow = window.innerWidth < 700;
 document.querySelectorAll('select[data-lineup]').forEach(sel=>{
  Array.prototype.forEach.call(sel.options, o=>{
   if(!o.dataset.full) o.dataset.full = o.textContent;
   if(narrow){
    const nm = o.dataset.full.split(' \u2014 ')[0].trim().split(' ');
    o.textContent = nm[nm.length-1];
   } else {
    o.textContent = o.dataset.full;
   }
  });
 });
}
window.addEventListener('resize', function(){ clearTimeout(window.__zpbFitT); window.__zpbFitT = setTimeout(zpbFitLineupNames, 160); });
function zpbAutoWhyHTML(isAuto){ return ''; }
function zpbPreviewStripHTML(g){
 try{
  const S = seasonState; if(!S || typeof topMatchupSwings!=='function') return '';
  const sw = topMatchupSwings(g.home, g.away, 2, g);
  const hp = sw.projHome, ap = sw.projAway, tot = Math.max(hp+ap, 0.1);
  const pw = Math.min(0.86, Math.max(0.14, hp/tot));
  const stH = (typeof zpbRowVars==='function') ? zpbRowVars(g.home) : '';
  const stA = (typeof zpbRowVars==='function') ? zpbRowVars(g.away) : '';
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const chips = ((sw.list||[]).slice(0,2)).map(e=>{
   const owner = e.ownerSide==='home' ? g.home : g.away;
   const st2 = (typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';
   const su = (typeof shortUnit==='function') ? shortUnit(e.unit) : e.unit;
   return '<span class="zpb-edge" style="'+st2+'">'+lg(owner)+su+' <b>+'+(e.pts>=0?'+':'\u2212')+Math.abs(e.pts).toFixed(1)+'</b></span>';
  }).join('');
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><b>'+g.away+'</b><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'
   + '<div class="zpb-strip-bar"><i style="width:'+(pw*100).toFixed(1)+'%;"></i><span>'+Math.round((1-pw)*100)+'% \u2013 '+Math.round(pw*100)+'%</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><b>'+g.home+'</b><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'
   + '</div>'
   + (chips ? '<div class="zpb-strip-edges">'+chips+'</div>' : '');
 }catch(err){ return ''; }
}
// the game replay: score appears by play and quarter, ESPN-style scoring log
function zpbGameReplay(g, focusTeam){
 try{
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.querySelector('.zpb-replay-ov')) return;
  const r = g.result; if(!r || !r.homeEvents) return;
  const evs = r.homeEvents.map(e=>Object.assign({}, e, {side:'home'}))
   .concat(r.awayEvents.map(e=>Object.assign({}, e, {side:'away'})))
   .sort((a,b)=> a.q-b.q || a.t-b.t);
  if(!evs.length) return;
  const info = {};
  ['home','away'].forEach(sd=>{
   const det = (g.detail && g.detail[sd]) || {};
   const ps = det.players || [];
   let qbName = '', kicker = '';
   const recs = [], rush = [];
   ps.forEach(p=>{
    const st = p.st || {};
    if(p.slot==='K') kicker = p.name;
    if(p.slot==='QB' && !qbName) qbName = p.name;
    const rt = st.rushTD || 0; for(let i=0;i<rt;i++) rush.push(p.name);
    const ct = st.recTD || 0; for(let i=0;i<ct;i++) recs.push(p.name);
   });
   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush};
  });
  const describe = e=>{
   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:''};
   if(e.type==='FG') return (inf.kicker || 'Kicker') + ' field goal';
   if(e.type==='SAF') return 'Safety';
   if(e.type==='TD'){
    const total = inf.recs.length + inf.rush.length;
    const isPass = total ? Math.random() < (inf.recs.length/total) : false;
    if(isPass && inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    if(inf.rush.length) return inf.rush.shift() + ' run';
    if(inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    return 'Touchdown';
   }
   return 'Score';
  };
  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  const crest = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  ov.innerHTML = '<div class="zpb-replay">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b>' + (TEAM_ABBR[g.away]||g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b>' + (TEAM_ABBR[g.home]||g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div></div>'
   + '</div>';
  document.body.appendChild(ov);
  const log = ov.querySelector('#zrepLog'), qchip = ov.querySelector('#zrepQ'),
        sa = ov.querySelector('#zrepSa'), sh = ov.querySelector('#zrepSh'), prog = ov.querySelector('#zrepProg');
  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  let hs = 0, as = 0, timers = [];
  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); };
  ov.addEventListener('click', e=>{ if(e.target===ov || e.target.closest('#zrepSkip')) close(); });
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown', esc); } });
  const total = evs.length;
  const step = Math.min(2400, Math.max(1150, 13500/total));
  let t = 700;
  timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
  let lastQ = 0;
  evs.forEach((e, i)=>{
   if(e.q !== lastQ){
    lastQ = e.q; const qq = e.q;
    timers.push(setTimeout(()=>{
     qchip.textContent = (QN[qq]||('Q'+qq)).split(' ')[0];
     const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);
     log.appendChild(d);
    }, t));
    t += 520;
   }
   const ev = e;
   timers.push(setTimeout(()=>{
    if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
    sa.textContent = as; sh.textContent = hs;
    const line = document.createElement('div');
    line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
    const ab = TEAM_ABBR[g[ev.side]] || g[ev.side];
    line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
     + '<span class="zrl-team">' + ab + '</span><span class="zrl-play">' + describe(ev)
     + '</span><span class="zrl-pts">+' + (ev.pts||0) + '</span><span class="zrl-sc">' + as + '\u2013' + hs + '</span>';
    log.appendChild(line);
    requestAnimationFrame(()=>{ line.classList.add('in'); });
    log.scrollTop = log.scrollHeight;
    prog.style.width = (8 + 88*((i+1)/total)).toFixed(1) + '%';
   }, t));
   t += step;
  });
  timers.push(setTimeout(()=>{
   qchip.textContent = 'FINAL';
   const fin = document.createElement('div'); fin.className = 'zpb-rep-final';
   const winTxt = focusTeam ? ((g.home===focusTeam ? hs>as : as>hs) ? 'You win' : (hs===as ? 'Tie' : 'You lose')) : (hs>as ? g.home+' win' : g.away+' win');
   fin.innerHTML = '<b>FINAL \u00b7 ' + as + '\u2013' + hs + '</b><span>' + winTxt + '</span>';
   log.appendChild(fin);
   const btn = document.createElement('button'); btn.className = 'resetbtn';
   btn.style.width = 'auto'; btn.style.margin = '0'; btn.style.padding = '8px 22px'; btn.textContent = 'Continue';
   btn.addEventListener('click', close);
   ov.querySelector('.zpb-rep-ft').appendChild(btn);
   log.scrollTop = log.scrollHeight;
   prog.style.width = '100%';
   timers.push(setTimeout(close, 6000));
  }, t + 900));
 }catch(err){}
}
"""

# ---------------------------------------------------------------- v8 JS layer
ZPB_V8_JS = r"""
// ---- Z-post-blue v8: the active sort shows on the board headers (arrow +
//      accent), so every number column visibly sorts when clicked ----
(function(){
 const sync = ()=>{
  const sel = document.getElementById('draftSort2'); if(!sel) return;
  document.querySelectorAll('#viewDraft th.sortable').forEach(th=>{
   const on = th.dataset.sort===sel.value;
   th.classList.toggle('sort-sel', on);
   if(on) th.dataset.dir = (typeof draftUI!=='undefined' && draftUI.sortAsc) ? 'asc' : 'desc';
   else th.removeAttribute('data-dir');
  });
 };
 if(typeof renderDraftBoard2==='function'){
  const _rdb2 = renderDraftBoard2;
  renderDraftBoard2 = function(){ const r = _rdb2.apply(this, arguments); try{ sync(); }catch(e){} return r; };
 }
})();
// ---- end v8 ----"""

# ---------------------------------------------------------------- ninth wave payloads
V9_DIR = os.path.dirname(os.path.abspath(__file__))
ZPB_CSS_V9 = open(os.path.join(V9_DIR, "zpb_css_v9.css"), encoding="utf-8").read()
ZPB_V9_JS = (open(os.path.join(V9_DIR, "zpb_js_v9.js"), encoding="utf-8").read()
           + "\n" + open(os.path.join(V9_DIR, "zpb_js_v9b.js"), encoding="utf-8").read())
for _js_gate, _nm in ((ZPB_V9_JS, "ZPB_V9_JS"),):
    if _js_gate.count("{") != _js_gate.count("}"):
        sys.exit(f"ABORT: unbalanced braces in {_nm}: {_js_gate.count('{')} vs {_js_gate.count('}')}")
print(f"[ok] v9 payloads loaded (css {len(ZPB_CSS_V9)} B, js {len(ZPB_V9_JS)} B)")

# ---------------------------------------------------------------- tenth wave payloads
ZPB_CSS_V10 = open(os.path.join(V9_DIR, "zpb_css_v10.css"), encoding="utf-8").read()
ZPB_V10_JS = open(os.path.join(V9_DIR, "zpb_js_v10.js"), encoding="utf-8").read()
if ZPB_V10_JS.count("{") != ZPB_V10_JS.count("}"):
    sys.exit(f"ABORT: unbalanced braces in ZPB_V10_JS: {ZPB_V10_JS.count('{')} vs {ZPB_V10_JS.count('}')}")
print(f"[ok] v10 payloads loaded (css {len(ZPB_CSS_V10)} B, js {len(ZPB_V10_JS)} B)")

# ---------------------------------------------------------------- eleventh wave payloads
ZPB_CSS_V11 = open(os.path.join(V9_DIR, "zpb_css_v11.css"), encoding="utf-8").read()
ZPB_V11_JS = open(os.path.join(V9_DIR, "zpb_js_v11.js"), encoding="utf-8").read()
if ZPB_V11_JS.count("{") != ZPB_V11_JS.count("}"):
    sys.exit(f"ABORT: unbalanced braces in ZPB_V11_JS: {ZPB_V11_JS.count('{')} vs {ZPB_V11_JS.count('}')}")
print(f"[ok] v11 payloads loaded (css {len(ZPB_CSS_V11)} B, js {len(ZPB_V11_JS)} B)")

NEW_WIRING = ("""initPlayerBrowser();
// ---- Z-post-blue: the bar's gold 20-0 is Home (click / Enter / Space) + light-dark theme toggle ----
(function(){
 const hb = document.querySelector('.zpb-home');
 if(hb){
  // one primary tab: viewDraft is home before a season, and the season once it has started
  const goHome = ()=> setActiveTab('viewDraft','tabDraftBtn');
  hb.addEventListener('click', e=>{ e.preventDefault(); goHome(); });
  hb.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goHome(); } });
 }
 const tbtn = document.getElementById('themeToggleBtn');
 if(tbtn){
  const root = document.documentElement;
  const apply = t=>{ if(t){ root.setAttribute('data-theme', t); } else { root.removeAttribute('data-theme'); } tbtn.textContent = (t==='dark') ? '\\u2600 Light' : '\\u263E Dark'; };
  let saved = null; try{ saved = localStorage.getItem('zpb:theme'); }catch(err){}
  apply(saved);
  tbtn.addEventListener('click', ()=>{
   const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
   const isDark = root.getAttribute('data-theme') ? root.getAttribute('data-theme')==='dark' : sysDark;
   const next = isDark ? 'light' : 'dark';
   apply(next);
   try{ localStorage.setItem('zpb:theme', next); }catch(err){}
  });
 }
})();
""" + (ZPB_CORE_JS + ZPB_V7_JS + ZPB_V8_JS + ZPB_V9_JS + ZPB_V10_JS + ZPB_V11_JS).replace('__TEAM_COLORS_JSON__', json.dumps(TEAM_COLORS)).replace('__ZPB_LOGOS_JSON__', json.dumps(ZPB_LOGOS)))

# ------------------------------------------------- renderPlayers (15-row pager)
OLD_RENDER = """function renderPlayers(){
 let rows = PLAYERS.filter(p=>{
  if(playerFilters.pos.size > 0 && !playerFilters.pos.has(p[1])) return false;
  if(playerFilters.team && p[2] !== playerFilters.team) return false;
  if(playerFilters.search && !p[0].toLowerCase().includes(playerFilters.search)) return false;
  return true;
 });
 const ci = PCOLS.indexOf(playerSort.col);
 rows = rows.slice().sort((a,b)=>{
  const av=a[ci], bv=b[ci];
  if(typeof av === 'string') return av.localeCompare(bv) * playerSort.dir;
  return (av-bv) * playerSort.dir;
 });
 document.querySelectorAll('#playerTable th').forEach(th=>{
  th.classList.toggle('sorted', th.dataset.col === playerSort.col);
 });
 document.getElementById('playerCount').textContent = `${rows.length} player${rows.length===1?'':'s'}`;
 const body = document.getElementById('playerBody');
 let h = '';
 rows.forEach(p=>{
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
  h += `<tr><td>${name}${xf?'<span class="xf">XF</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
 });
 body.innerHTML = h;
}"""

NEW_RENDER = """function renderPlayers(){
 let rows = PLAYERS.filter(p=>{
  if(playerFilters.pos.size > 0 && !playerFilters.pos.has(p[1])) return false;
  if(playerFilters.team && p[2] !== playerFilters.team) return false;
  if(playerFilters.search && !p[0].toLowerCase().includes(playerFilters.search)) return false;
  return true;
 });
 const ci = PCOLS.indexOf(playerSort.col);
 rows = rows.slice().sort((a,b)=>{
  const av=a[ci], bv=b[ci];
  if(typeof av === 'string') return av.localeCompare(bv) * playerSort.dir;
  return (av-bv) * playerSort.dir;
 });
 document.querySelectorAll('#playerTable th').forEach(th=>{
  th.classList.toggle('sorted', th.dataset.col === playerSort.col);
 });
 // Z-post-blue pagination: 15 rows per page (UI only; filter/sort data unchanged)
 const sig = JSON.stringify([ [...playerFilters.pos].sort().join('|'), playerFilters.team, playerFilters.search, playerSort.col, playerSort.dir ]);
 if(sig !== renderPlayers._sig){ renderPlayers._sig = sig; playerPage = 1; }
 const total = Math.max(1, Math.ceil(rows.length / PLAYER_PAGE_SIZE));
 if(playerPage > total) playerPage = total;
 if(playerPage < 1) playerPage = 1;
 const start = (playerPage - 1) * PLAYER_PAGE_SIZE;
 const pageRows = rows.slice(start, start + PLAYER_PAGE_SIZE);
 document.getElementById('playerCount').textContent = `${rows.length} player${rows.length===1?'':'s'} · Page ${playerPage} of ${total}`;
 const body = document.getElementById('playerBody');
 let h = '';
 pageRows.forEach(p=>{
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
  h += `<tr><td>${name}${xf?'<span class="xf">XF</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
 });
 if(!pageRows.length) h = `<tr><td colspan="10" style="text-align:center;color:var(--sub);padding:18px 0;">No players match your filters.</td></tr>`;
 body.innerHTML = h;
 const pager = document.getElementById('playerPager');
 if(pager){
  pager.innerHTML = `<button class="pagbtn" id="pgPrev" ${playerPage<=1?'disabled':''}>&#8249; Prev</button><span class="paginfo">Page ${playerPage} of ${total}</span><button class="pagbtn" id="pgNext" ${playerPage>=total?'disabled':''}>Next &#8250;</button>`;
  const prev = document.getElementById('pgPrev'), next = document.getElementById('pgNext');
  if(prev) prev.addEventListener('click', ()=>{ playerPage--; renderPlayers(); const t=document.getElementById('playerTable'); if(t) t.scrollIntoView({block:'start'}); });
  if(next) next.addEventListener('click', ()=>{ playerPage++; renderPlayers(); const t=document.getElementById('playerTable'); if(t) t.scrollIntoView({block:'start'}); });
 }
}"""

OLD_HEAD_CLOSE = "</style>\n</head>"
NEW_HEAD_CLOSE = ("</style>\n"
 "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n"
 "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n"
 "<link href=\"https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=Cinzel:wght@700;900&family=Cinzel+Decorative:wght@700;900&display=swap\" rel=\"stylesheet\">\n"
 "<style id=\"zpbtheme\">" + ZPB_CSS + ZPB_CSS_V7 + ZPB_CSS_V8 + ZPB_CSS_V9 + ZPB_CSS_V10 + ZPB_CSS_V11 + "</style>\n"
 "<meta name=\"theme-color\" content=\"#fcf7f1\">\n"
 "<meta name=\"description\" content=\"Draft, Season, Playoffs, Super Bowl. Can you go 20-0?\">\n"
 "<script>try{var t=localStorage.getItem('zpb:theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>\n"
 "</head>")

OLD_DRAFT_LIVE_SYNC = """ document.getElementById('draftLive').style.display='block';
 processUntilUserTurn();"""

REPLACEMENTS = [
 ("title tag", "<title>NFL Draft Simulator</title>", "<title>20-0</title>", 1),
 ("og:title", '<meta property="og:title" content="NFL Draft Simulator">', '<meta property="og:title" content="20-0">', 1),
 ("hero ball removed (orb lives in the site bar)", '<div class="hero-ball">\U0001F3C8</div>', '', 1),
 ("hero tagline (wordmark moved to the site bar)",
  '<div class="hero-text"><h1>NFL Draft Simulator</h1><div class="tagline">Draft your team. Play the season. Win the Super Bowl.</div></div>',
  '<div class="hero-text"><div class="tagline">Draft, Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>?</div></div>', 1),
 ("homepage paragraph removed (Owner: strip the home page)",
  "<p>32 real NFL franchises are shuffled into a random snake draft order. Every player at every starter position is available from Round 1 \u2014 draft for value and need. CPU GMs draft by the same math the season uses: each takes the player who adds the most wins at a spot it still needs (with a little personal taste and randomness) and can flex players. Read the guide below the setup before you start.</p>",
  '', 1),
 ("setup h2 removed (Owner: strip the home page)",
  '<h2 style="margin-top:0;">Set Up Your Draft</h2>', '', 1),
 ("'Draft as' label -> aria-labeled select",
  '<label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Draft as\n    <select id="draftSlotSelect"></select>\n   </label>',
  '<select id="draftSlotSelect" aria-label="Draft as team" title="Draft as team"></select>', 1),
 ("'Draft pick #' label -> aria-labeled select",
  '<label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Draft pick #\n    <select id="draftPickNumberSelect"><option value="random">Random</option></select>\n   </label>',
  '<select id="draftPickNumberSelect" aria-label="Draft pick number" title="Draft pick number"><option value="random">Random</option></select>', 1),
 ("site bar: gold 20-0 home + moving 20-0s (all pages)",
  "<body>\n<div class=\"wrap\">",
  "<body>\n<div class=\"wrap\">\n"
  ' <div class="zpb-bar">'
  '<a class="zpb-home" href="#" aria-label="20-0 \u2014 home">'
  '<h1>20<span class="zpb-hy">-</span>0<span class="zpb-drips" aria-hidden="true"><i></i><i></i><i></i></span></h1></a>'
  '<div class="zpb-marquee" aria-hidden="true"><div class="zpb-mq" id="zpbMqA"></div><div class="zpb-mq zpb-mqB" id="zpbMqB"></div></div>'
  '</div>', 1),
 ("guide host fade class", '<div id="draftGuideHost"></div>', '<div id="draftGuideHost" class="zpb-guidefade"></div>', 1),
 ("Sim Guide heading (Owner rename)",
  "sec('How the site works', how, true)", "sec('Sim Guide', how, true)", 1),
 ("home hint replaces the guide block (guide text lives on the Guide page only)",
  "function fillDraftGuide(){ const h = document.getElementById('draftGuideHost'); if(h && !h.dataset.ready){ h.dataset.ready = '1'; h.innerHTML = guideHTMLCached(); } }",
  "function fillDraftGuide(){ const h = document.getElementById('draftGuideHost'); if(h && !h.dataset.ready){ h.dataset.ready = '1'; h.innerHTML = '<p class=\"zpb-hint\"><a href=\"#\" id=\"zpbHintGuide\">see guide for details</a></p>'; const a = document.getElementById('zpbHintGuide'); if(a) a.addEventListener('click', e=>{ e.preventDefault(); setActiveTab('viewGuide','tabGuideBtn'); }); } }", 1),
 ("base hero-ball rules orphaned by the orb removal",
  ".hero-ball{font-size:2.6rem;filter:drop-shadow(0 6px 12px rgba(0,0,0,.4));animation:heroBounce 3.4s ease-in-out infinite;}\n@keyframes heroBounce{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-6px) rotate(8deg)}}\n", "", 1),
 ("base hero-ball mobile rule orphaned by the orb removal",
  " .hero h1{font-size:1.5rem;} .hero-ball{font-size:1.9rem;} .tagline{font-size:0.8rem;}",
  " .hero h1{font-size:1.5rem;} .tagline{font-size:0.8rem;}", 1),
 ("fade scan after the season stage intro panels render",
  " const rs = document.getElementById('goDraftResumeBtn'); if(rs) rs.addEventListener('click', ()=>{ setActiveTab('viewDraft','tabDraftBtn'); const d=document.getElementById('draftLive'); if(d && d.style.display!=='none') d.scrollIntoView(); });\n}",
  " const rs = document.getElementById('goDraftResumeBtn'); if(rs) rs.addEventListener('click', ()=>{ setActiveTab('viewDraft','tabDraftBtn'); const d=document.getElementById('draftLive'); if(d && d.style.display!=='none') d.scrollIntoView(); });\n if(typeof zpbFadeScan==='function') zpbFadeScan();\n}", 1),
 ("guide season bullet",
  "<li><b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>",
  '<li><b>Play the season.</b> Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>? Seventeen games, a 14-team playoff \u2014 leave your game plan on Auto or set it yourself each week.</li>', 1),
 ("DRAFT button", '>Start Draft</button>', '>DRAFT</button>', 1),
 ("season line",
  '<p class="dsub">Your draft is in the books. Play the season below, or look over how the roster stacks up.</p>',
  '<p class="dsub">Your draft is in the books. Play the season. Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>?</p>', 1),
 ("footer brand", '<span class="footlabel">More</span>', '', 1),
 # ---- third wave: way less text on every page (UI prose only, no game narration) ----
 ("less-text: priority meter stands alone (explainer cut, VL-v8 principle)",
  '<div class="narr" style="margin-bottom:8px;">For each position you still need, the best option by <b>priority</b>. The whole bar is the wins that player adds <i>at that spot on your roster</i> (flex penalty included); the <b style="color:var(--good);">green</b> part is what you would lose by waiting until your next pick, ${sim.gap} picks from now; the <span style="color:var(--sub);">grey</span> part is what you would probably still find then anyway.</div>',
  '', 1),
 ("less-text: priority row trimmed",
  '${r.p[0]} (${r.p[3]} OVR) · ${fmtWar(r.v)} wins here · priority ${fmtWar(r.pri)} · ${pctTxt(r.gone)} chance he is gone by your next pick',
  '${r.p[0]} (${r.p[3]}) · ${fmtWar(r.v)} wins · ${pctTxt(r.gone)} gone by your next pick', 1),
 ("less-text: clock line trimmed",
  "You're on the clock — Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} (overall ${draftSim.pos+1} of ${draftSim.order.length})",
  "On the clock — Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} (overall ${draftSim.pos+1} of ${draftSim.order.length})", 1),
 ("less-text: preseason paragraph condensed",
  '<p class="narr" style="margin:8px 0 0;">Three decisions, all optional: <b>who plays where</b> (including any flexes, and who returns kicks and punts), <b>your coaching philosophy</b> and <b>your game-day aggressiveness</b> on 2-Pt Convs and 4th downs. The recommended settings are already selected; changing nothing is a perfectly good choice. Your coaching philosophy and aggressiveness are locked in once you simulate Week 1; the lineup and returner stay editable all season.</p>',
  '<p class="narr" style="margin:8px 0 0;">Three optional settings, preselected with recommended values. Philosophy and aggressiveness lock at Week 1; lineup and returner stay editable.</p>', 1),
 ("less-text: group-scores parenthetical condensed",
  '<b>Group scores</b> (each spot weighted by what it is worth in wins; flex penalties included; arrows show the change from your last edit)',
  '<b>Group scores</b> (wins added · flex penalties included)', 1),
 ("less-text: lineup note trimmed",
  'wins vs. a lineup of 70s', 'wins vs. a 70s lineup', 1),
 ("less-text: optimal-arrangement note condensed",
  'The math sees no better arrangement of these players: this lineup is within ${Math.max(0,adv.gain).toFixed(2)} wins of the best possible one.</p>',
  'No better arrangement exists — within ${Math.max(0,adv.gain).toFixed(2)} wins of optimal.</p>', 1),
 ("theme toggle button",
  '<button class="footlink" id="tabGuideBtn">Guide</button>\n </nav>',
  '<button class="footlink" id="tabGuideBtn">Guide</button>\n  <button class="footlink" id="themeToggleBtn" title="Switch light / dark">\u263E Dark</button>\n </nav>', 1),
 ("pager div",
  '    <tbody id="playerBody"></tbody>\n   </table>',
  '    <tbody id="playerBody"></tbody>\n   </table>\n   <div class="pager" id="playerPager" aria-label="Player browser pages"></div>', 1),
 ("pagination state",
  "let playerSort = {col:'ovr', dir:-1};\nlet playerFilters = {search:'', pos: new Set(), team:''};",
  "let playerSort = {col:'ovr', dir:-1};\nlet playerFilters = {search:'', pos: new Set(), team:''};\nlet playerPage = 1; const PLAYER_PAGE_SIZE = 15; // Z-post-blue player-browser pagination (UI only)", 1),
 ("renderPlayers pagination", OLD_RENDER, NEW_RENDER, 1),
 ("hero home + theme wiring + zpb core", "initPlayerBrowser();\n", NEW_WIRING, 1),
 ("zpb theme style block + fonts", OLD_HEAD_CLOSE, NEW_HEAD_CLOSE, 1),
 # ---- team-color takeover hook: draft start applies the franchise identity ----
 ("startDraft2 theme apply",
  " const abbr = TEAM_ABBR[userTeamName] || userTeamName.slice(0,3).toUpperCase();",
  " const abbr = TEAM_ABBR[userTeamName] || userTeamName.slice(0,3).toUpperCase();\n if(typeof zpbApplyTeamTheme==='function') zpbApplyTeamTheme(userTeamName);", 1),
 ("startDraft2 home sync", OLD_DRAFT_LIVE_SYNC,
  " document.getElementById('draftLive').style.display='block';\n if(typeof zpbSyncHome==='function') zpbSyncHome();\n processUntilUserTurn();", 1),
 ("updateStepper home sync",
  "function updateStepper(){\n const el = document.getElementById('stepper'); if(!el) return;",
  "function updateStepper(){\n if(typeof zpbSyncHome==='function') zpbSyncHome();\n const el = document.getElementById('stepper'); if(!el) return;", 1),
 ("setActiveTab home sync (after view toggles - updateStepper runs BEFORE the toggles)",
  " if(btnId==='tabDraftBtn') fillDraftGuide();\n}",
  " if(btnId==='tabDraftBtn') fillDraftGuide();\n if(typeof zpbSyncHome==='function') zpbSyncHome();\n if(typeof zpbFadeScan==='function') zpbFadeScan();\n}", 1),
 ("startNewDraftFlow reset",
  "function startNewDraftFlow(){\n seasonState = null; league100 = null;",
  "function startNewDraftFlow(){\n if(typeof zpbClearTeamTheme==='function') zpbClearTeamTheme();\n if(typeof zpbRewireGuide==='function') zpbRewireGuide();\n seasonState = null; league100 = null;", 1),
 # ---- draft board: "Flex x (-y)" only ----
 ("flexTxt -> Flex x (-y)",
  'const flexTxt = r=> r.flex ? ` <span class="narr">(flex \u2192 ${LABELS[r.slot]||r.slot}, \u2212${r.pen})</span>',
  'const flexTxt = r=> r.flex ? ` <span class="narr">Flex ${LABELS[r.slot]||r.slot} (-${r.pen})</span>', 1),
 ("priority chart flex note",
  "${r.flex?' \u00b7 flexed \u2212'+r.pen:''}",
  "${r.flex?' \u00b7 Flex (-'+r.pen+')':''}", 1),
 ("lineupCell flex note",
  "return {text:`${e.name} (${eff}${pen?` <span class=\"narr\">\u00b7 flexed \u2212${pen}</span>`:''})`, val:eff};",
  "return {text:`${e.name} (${eff}${pen?` <span class=\"narr\">Flex (-${pen})</span>`:''})`, val:eff};", 1),
 ("slot dropdown flex note",
  "o.textContent = (LABELS[s]||s) + (pen ? ' (flex \\u2212'+pen+')' : '');",
  "o.textContent = (LABELS[s]||s) + (pen ? ' (-'+pen+')' : '');", 1),
 ("remove 'also fits' altTxt",
  """   const alt = r.slot ? (flexAlt[r.p[0]]||[]).filter(x=>x.slot!==r.slot && x.v>r.v-0.15 && x.g!==r.g).sort((a,b)=>b.v-a.v)[0] : null;
   const altTxt = alt ? `<div class="narr" title="The other spot he could fill, with the value he would have there">also fits: ${LABELS[alt.slot]||alt.slot} ${fmtWar(alt.v)}${alt.flex?' (\\u2212'+alt.pen+' flex)':''}</div>` : '';
   const fills = r.slot ? `${LABELS[r.slot]||r.slot}${flexTxt(r)}${altTxt}""",
  "   const fills = r.slot ? `${LABELS[r.slot]||r.slot}${flexTxt(r)}", 1),
 # ---- draft board: franchise-colored rows ----
 ("cards row team frame",
  'h += `<div class="prow"><div>${topTag(r)}<b>${r.p[0]}</b> <span class="narr">${r.p[3]} OVR \u00b7 ${TEAM_ABBR[r.p[2]]||r.p[2]}',
  'h += `<div class="prow zpb-trow" style="${typeof zpbRowVars===\'function\'?zpbRowVars(r.p[2]):\'\'}"><div>${topTag(r)}<b>${r.p[0]}</b> <span class="narr">${r.p[3]} OVR \u00b7 ${typeof zpbTeamChips===\'function\'?zpbTeamChips(r.p[2]):\'\'}${TEAM_ABBR[r.p[2]]||r.p[2]}', 1),
 ("table row team frame",
  'h += `<tr><td class="dc-name">${topTag(r)}${r.p[0]}</td><td data-label="Pos">${POS_DISPLAY[r.p[1]]||r.p[1]}</td><td data-label="Team">${TEAM_ABBR[r.p[2]]||r.p[2]}</td>',
  'h += `<tr class="zpb-trow" style="${typeof zpbRowVars===\'function\'?zpbRowVars(r.p[2]):\'\'}"><td class="dc-name">${topTag(r)}${r.p[0]}</td><td data-label="Pos">${POS_DISPLAY[r.p[1]]||r.p[1]}</td><td data-label="Team">${typeof zpbTeamChips===\'function\'?zpbTeamChips(r.p[2]):\'\'}${TEAM_ABBR[r.p[2]]||r.p[2]}</td>', 1),
 ("recent picks franchise frame",
  """  ? all.map(p=>`<div style="${p.isUser?'color:var(--accent);font-weight:700;':''}">R${p.round}.${String(p.pickInRound).padStart(2,'0')} (#${p.overall}) \u00b7 ${teamLabel(p.teamIndex)} \u2014 ${p.player[0]} (${POS_DISPLAY[p.player[1]]||p.player[1]}, ${p.player[3]} OVR)</div>`).join('')""",
  """  ? all.map(p=>{ const _zs=(typeof zpbRowVars==='function')?zpbRowVars(draftSim.teamNames[p.teamIndex]):''; const _zc=(p.isUser?'color:var(--accent);font-weight:700;':''); return `<div class="zpb-trow" style="${_zs}${_zc}">R${p.round}.${String(p.pickInRound).padStart(2,'0')} (#${p.overall}) \u00b7 ${teamLabel(p.teamIndex)} \u2014 ${p.player[0]} (${POS_DISPLAY[p.player[1]]||p.player[1]}, ${p.player[3]} OVR)</div>`; }).join('')""", 1),
 ("draft roster sidebar my-team frame",
  'return `<div class="depth-row dgrid"><span class="slotname">${extra||\'\'}${LABELS[sl]||sl}</span>',
  'return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbUserRowVars===\'function\'?zpbUserRowVars():\'\'}"><span class="slotname">${extra||\'\'}${LABELS[sl]||sl}</span>', 1),
 # ---- post-draft: rosters wear their franchise colors ----
 ("renderDepthChartHTML owner param",
  "function renderDepthChartHTML(slotmap, pickRounds){\n return DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{",
  "function renderDepthChartHTML(slotmap, pickRounds, owner){\n const zst = (owner && typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';\n return DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{", 1),
 ("renderDepthChartHTML row frame",
  'return `<div class="depth-row"><span class="slotname">${LABELS[s]||s}</span>',
  'return `<div class="depth-row${e&&e.name&&zst?\' zpb-trow\':\'\'}"${e&&e.name&&zst?` style="${zst}"`:\'\'}><span class="slotname">${LABELS[s]||s}</span>', 1),
 ("fillDetail depth chart owner",
  'let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds)}`;',
  'let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds, e.teamName)}`;', 1),
 ("renderYourRosterTab my-frame var",
  "function renderYourRosterTab(container, myEntry, rankAmongReal){\n const realTeams = Object.keys(TEAM_DATA);",
  "function renderYourRosterTab(container, myEntry, rankAmongReal){\n const realTeams = Object.keys(TEAM_DATA);\n const zstM = (typeof zpbRowVars==='function') ? zpbRowVars(myEntry.teamName) : '';", 1),
 ("renderYourRosterTab row frame",
  'slotRows += `<tr><td>${LABELS[s]||s}</td>',
  'slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td>', 1),
 ("renderYourRosterTab depth owner",
  '${renderDepthChartHTML(myEntry.slotmap, myEntry.pickRounds)}',
  '${renderDepthChartHTML(myEntry.slotmap, myEntry.pickRounds, myEntry.teamName)}', 1),
 ("renderLineupTableHTML owners",
  """function renderLineupTableHTML(slotmapLeft, slotmapRight){
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<tr>
    <td style="${l.val>r.val?'font-weight:700;color:var(--good);':''}">${l.text}</td>
    <td class="narr" style="text-align:center;">${LABELS[s]||s}</td>
    <td style="${r.val>l.val?'font-weight:700;color:var(--good);':''}text-align:right;">${r.text}</td>
   </tr>`;
  });
 });""",
  """function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<tr>
    <td class="${l.text!=='\u2014'&&zL?'zpb-trow':''}" style="${l.val>r.val?'font-weight:700;color:var(--good);':''}${l.text!=='\u2014'&&zL?zL:''}">${l.text}</td>
    <td class="narr" style="text-align:center;">${LABELS[s]||s}</td>
    <td class="${r.text!=='\u2014'&&zR?'zpb-trow':''}" style="${r.val>l.val?'font-weight:700;color:var(--good);':''}text-align:right;${r.text!=='\u2014'&&zR?zR:''}">${r.text}</td>
   </tr>`;
  });
 });""", 1),
 ("homeCmp lineup owners",
  '${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b])}',
  '${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b)}', 1),
 ("game lineup owners",
  '${renderLineupTableHTML(awaySlotmap, homeSlotmap)}',
  '${renderLineupTableHTML(awaySlotmap, homeSlotmap, awayTeam, homeTeam)}', 1),
 ("comparison lineup owners",
  '${renderLineupTableHTML(a.slotmap, b.slotmap)}',
  '${renderLineupTableHTML(a.slotmap, b.slotmap, a.teamName, b.teamName)}', 1),
 # ================= sixth wave (Owner, 25 Oct) =================
 ("v6: draft-page tagline + Draft/Season/Playoffs/Champion stepper removed (hero header gone)",
  '<header class="hero">\n  \n  <div class="hero-text"><div class="tagline">Draft, Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>?</div></div>\n  <ol class="stepper" id="stepper"><li data-step="draft" class="on">Draft</li><li data-step="season">Season</li><li data-step="playoffs">Playoffs</li><li data-step="champ">Champion</li></ol>\n </header>',
  '', 1),
 ("v6: setActiveTab hero guard (the hero no longer exists)",
  "document.querySelector('.hero').style.display = t ? 'none' : '';",
  "const _zh=document.querySelector('.hero'); if(_zh) _zh.style.display = t ? 'none' : '';", 1),
 ("v6: drafting-as banner - crest badge, no 'you hold' text, right-aligned live (round.pick)",
  '`<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> \u2014 you hold the #${userIndex+1} overall pick (Round 1)</div>`',
  '`<div class="zpb-das-logo">${typeof zpbTeamLogo===\'function\'&&zpbTeamLogo(userTeamName)?zpbTeamLogo(userTeamName):abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b></div><span class="zpb-nextpick" id="zpbNextPick" title="Your next pick: (round.pick)"></span>`', 1),
 ("v6: the user's next pick, live and right-aligned as (round.pick)",
  "is on the clock...`;\n const all = draftSim.log.slice().reverse();",
  "is on the clock...`;\n { const npEl=document.getElementById('zpbNextPick'); if(npEl){ const nx=draftSim.order.indexOf(draftSim.userIndex,draftSim.pos); npEl.textContent = nx>=0 ? '('+(Math.floor(nx/32)+1)+'.'+((nx%32)+1)+')' : ''; } }\n const all = draftSim.log.slice().reverse();", 1),
 ("v6: board cards wear the franchise crest, not the abbreviation",
  "${r.p[3]} OVR \u00b7 ${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}${TEAM_ABBR[r.p[2]]||r.p[2]}",
  "${r.p[3]} OVR \u00b7 ${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}", 1),
 ("v6: board table Team column wears the franchise crest",
  '<td data-label="Team">${typeof zpbTeamChips===\'function\'?zpbTeamChips(r.p[2]):\'\'}${TEAM_ABBR[r.p[2]]||r.p[2]}</td>',
  '<td data-label="Team">${typeof zpbTeamChips===\'function\'?zpbTeamChips(r.p[2]):\'\'}${typeof zpbTeamCell===\'function\'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}</td>', 1),
 ("v6: recent picks feed carries the franchise crest",
  "(#${p.overall}) \u00b7 ${teamLabel(p.teamIndex)} \u2014 ${p.player[0]}",
  "(#${p.overall}) \u00b7 ${typeof zpbTeamLogo==='function'&&draftSim.teamNames[p.teamIndex]?zpbTeamLogo(draftSim.teamNames[p.teamIndex]):''}${teamLabel(p.teamIndex)} \u2014 ${p.player[0]}", 1),
 ("v6: star toggle removed from the position chips",
  '<span class="star" data-star="${g}" title="How much you care about ${WV_NAMES[g].toLowerCase()}: \u2605\u2605 = must-fill (counts 1.5\u00d7 in Priority), \u2605 = normal, \u2606 = low (0.5\u00d7). Click to change.">${PRIO_STAR[prioOf(g)]}</span>',
  '', 1),
 ("v6: star explainer removed (Owner quote)",
  '<div class="narr" style="margin:-4px 0 8px;">Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: \u2605\u2605 must-fill (Priority \u00d71.5), \u2605 normal, \u2606 low (\u00d70.5). Click a star to change it.</div>',
  '', 1),
 ("v6: roster sidebar star removed",
  '<span class="narr">${filled[g]||0}/${SLOT_TOTALS[g]} \u00b7 ${PRIO_STAR[prioOf(g)]}</span></h4>',
  '<span class="narr">${filled[g]||0}/${SLOT_TOTALS[g]}</span></h4>', 1),
 ("v6: star click handler branch removed",
  "\n  else if(t.dataset.star){ const g = t.dataset.star, c = prioOf(g); draftUI.prio[g] = c===1 ? 2 : (c===2 ? 0 : 1); }",
  '', 1),
 ("v6: priority weighting pinned to default (star system gone)",
  "function prioOf(g){ return draftUI.prio[g]==null ? 1 : draftUI.prio[g]; }",
  "function prioOf(g){ return 1; } // Z-post-blue: the star system is gone - priority always uses the default weight", 1),
 ("v6: PRIO_STAR const retired",
  "const PRIO_MULT = {2:1.5, 1:1, 0:0.5}, PRIO_STAR = {2:'\u2605\u2605', 1:'\u2605', 0:'\u2606'};",
  "const PRIO_MULT = {2:1.5, 1:1, 0:0.5};", 1),
 ("v6: pick-priority bar wears the identity (Owner: not always green)",
  '<i style="width:${gp/maxW*100}%;background:var(--good);"></i>',
  '<i style="width:${gp/maxW*100}%;background:var(--accent);"></i>', 1),
 ("v6: board cards bar wears the identity too",
  '<div class="mbar"><i style="width:${gp/mx*100}%;background:var(--good);"></i>',
  '<div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i>', 1),
 ("v6: 'Value here' column header removed",
  '<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>',
  '', 1),
 ("v6: Priority header tooltip reworded (no 'Value here')",
  'title="Value here minus what you would probably still find at that position at your next pick. High = waiting costs you."',
  'title="What picking him now adds over waiting for your next pick. High = waiting costs you."', 1),
 ("v6: 'Value here' cells removed",
  '<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>',
  '', 1),
 ("v6: 'Sort: value here' option removed",
  '<option value="value">Sort: value here</option>',
  '', 1),
 ("v6: guide section title drops 'Value here' and 'stars'",
  "sec('Reading the draft board (Wins, Value here, Priority, Gone, stars)', board, false)",
  "sec('Reading the draft board (Wins, Priority, Gone)', board, false)", 1),
 ("v6: guide 'Value here' bullet removed (no user-facing Value-here explanations)",
  '<li><b>Value here</b> \u2014 the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>\n  ',
  '', 1),
 ("v6: guide Priority bullet reworded (no 'Value here')",
  '<li><b>Priority</b> \u2014 Value here minus the best you could expect to still find at that spot at your next pick.',
  '<li><b>Priority</b> \u2014 what picking him now adds over the best you could expect to still find at that spot at your next pick.', 1),
 ("v6: guide values intro matches the trimmed bullet list",
  'One row per starting spot, sorted from the most valuable to the least. Two things are shown for each, and they answer different questions:</p>',
  'One row per starting spot, sorted from the most valuable to the least:</p>', 1),
 ("v6: star arm removed from the chips click delegation",
  "const t = e.target.closest('[data-tog],[data-star],[data-all],[data-none]');",
  "const t = e.target.closest('[data-tog],[data-all],[data-none]');", 1),
 ("v6: FLEX VALUE badge removed (value-here derived, green; flexTxt + cards rows)",
  "${r.v!=null && bestNat[r.g]!=null && r.v>bestNat[r.g]+1e-9 ? ' <span class=\"toptag\" style=\"background:var(--good);\" title=\"Even after the flex penalty he adds more wins here than any natural player still available.\">FLEX VALUE</span>' : ''}",
  '', 1),
]

for label, old, new, cnt in REPLACEMENTS:
    found = html.count(old)
    if found != cnt:
        sys.exit(f"ABORT: [{label}] expected {cnt} occurrence(s), found {found}")
    html = html.replace(old, new)
    print(f"[ok] {label}")

# payload-introduced strings that a LATER replacement fully removes (the hero
# header): payload_count must not keep counting their tokens ("20-0", zpb-shine)
HERO_BLOCK = next(old for label, old, new, cnt in REPLACEMENTS
                  if label.startswith("v6: draft-page tagline"))
REMOVED_SUBSTRINGS = [HERO_BLOCK]

# =================== seventh wave (Owner, 25 Oct) ===================
# ---- GROUP_DEFS: labels lose their parentheses; team units run Offense ->
#      Defense in the draft-board roster pattern. Rebuilt at build time. ----
import re as _re7
_gs = html.index("const GROUP_DEFS = ")
_ge = html.index("];", _gs)
GROUP_DEFS_OLD = html[_gs:_ge+2]
assert GROUP_DEFS_OLD.endswith("];")
_gd = json.loads(GROUP_DEFS_OLD[len("const GROUP_DEFS = "):-1])
assert len(_gd) == 62, f"GROUP_DEFS parity: {len(_gd)}"
_PAREN7 = _re7.compile(r"\s*\([^)]*\)\s*$")
for _e in _gd:
    _lbl = _PAREN7.sub("", _e["label"]).strip()
    if _lbl: _e["label"] = _lbl
_order_off = ["RB","WR","TE","RECV","OT","OGUARDS","OG","OL","RUN","PASS","SKILL","OFFENSE"]
_order_def = ["EDGE","DT","DL","LB","FRONT7","CB","S","SEC","PRIMCOV","DLCB","RUND","PASSD","ZONE","DEFENSE"]
_by7 = {e["key"]: e for e in _gd}
assert set(_order_off) <= set(_by7) and set(_order_def) <= set(_by7)
_seen7 = set(_order_off) | set(_order_def)
_offE = [_by7[k] for k in _order_off]
_defE = [_by7[k] for k in _order_def]
_others7 = [e for e in _gd if e["key"] not in _seen7]
_posO = [e for e in _others7 if e["cat"] == "Offense — Positions"]
_posD = [e for e in _others7 if e["cat"] == "Defense — Positions"]
_comb = [e for e in _others7 if e["cat"] == "Combined Units"]
_spec = [e for e in _others7 if e["cat"] == "Specialists"]
assert len(_posO)+len(_posD)+len(_comb)+len(_spec) == len(_others7)
_new7 = _posO + _offE + _posD + _defE + _comb + _spec
assert len(_new7) == 62 and len({e["key"] for e in _new7}) == 62
assert not _re7.search(r"\([^)]*\)", " ".join(e["label"] for e in _new7))
GROUP_DEFS_NEW = "const GROUP_DEFS = " + json.dumps(_new7, ensure_ascii=False, separators=(",", ":")) + ";"
assert html.count(GROUP_DEFS_OLD) == 1
html = html.replace(GROUP_DEFS_OLD, GROUP_DEFS_NEW)
print(f"[ok] GROUP_DEFS rebuilt: {len(_new7)} groups, no parentheses, offense->defense order")

LINEUP_GROUPS_OLD = "const LINEUP_GROUPS = [['Offense',['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C']],['Offensive line',['OT1','OT2','OG1','OG2','C']],['Receiving (WR+TE)',['WR1','WR2','WR3','TE1','TE2']],['Defense',['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS']],['Defensive line',['DE1','DE2','DT1','DT2']],['Linebackers',['MIKE','WILL','SAM']],['Secondary (CB+S)',['CB1','CB2','CB3','SS','FS']]];"
LINEUP_GROUPS_NEW = "const LINEUP_GROUPS = [['Offense',['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C']],['Receiving',['WR1','WR2','WR3','TE1','TE2']],['Offensive line',['OT1','OT2','OG1','OG2','C']],['Defense',['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS']],['Defensive line',['DE1','DE2','DT1','DT2']],['Linebackers',['MIKE','WILL','SAM']],['Secondary',['CB1','CB2','CB3','SS','FS']]];"

DETAIL_KEYS_OLD = "const DETAIL_KEYS = ['OFFENSE','DEFENSE','OL','DL','SEC','PRIMCOV','QB','RB','WR','TE','RUN','PASS','RUND','PASSD'];"
DETAIL_KEYS_NEW = "const DETAIL_KEYS = ['QB','RB','WR','TE','OL','RUN','PASS','OFFENSE','DL','SEC','PRIMCOV','RUND','PASSD','DEFENSE'];"

# ---- v7 exact replacements ----
V7_EXACT = [
 (LINEUP_GROUPS_OLD, LINEUP_GROUPS_NEW, 1),
 (DETAIL_KEYS_OLD, DETAIL_KEYS_NEW, 1),
 # meta description follows the new phrasing (Owner: remove the old tagline everywhere)
 ('<meta name="description" content="Draft, Season, Playoffs, Super Bowl. Can you go 20-0?">',
  '<meta name="description" content="Play the season. Coach your team to the Super Bowl. Can you go 20-0?">', 1),
 # draft-complete line: Owner's phrasing, right-aligned
 ('  <p class="dsub">Your draft is in the books. Play the season. Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>?</p>',
  '  <p class="dsub" style="text-align:right;">Your draft is in the books. Play the season. Coach your team to the Super Bowl. Can you go <b class="zpb-shine">20-0</b>?</p>', 1),
 # "Play a Season" (goSeason, draft done): panel gone, bare shimmering Start Season in the DRAFT font/side
 ('''  host.innerHTML = `<div class="panel hero-panel">
   <h2 style="margin-top:0;">Play a Season</h2>
   <p style="font-size:1.18rem;line-height:1.55;">Your 26 starters are done. Run your team through a full 17-game regular season against the other 31 drafted rosters, real NFL divisions, playoffs, and the Super Bowl!</p>
   <ol class="gl"><li>Starting the season builds the schedule. Nothing is simulated yet.</li><li>On the Preseason page you choose your <b>coaching philosophy</b> (offensive and defensive style) and who plays where, including any flexes. Then simulate one week at a time or the rest of the season.</li><li>New to the terms? The <b>Guide</b> link at the bottom of the page explains every style, package and number on this site.</li></ol>
   <button class="resetbtn" id="startSeasonHeroBtn" style="width:auto;padding:14px 34px;font-size:1.05rem;">Start Season</button>''',
  '''  host.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">Start Season</button>''', 1),
 # "Play a Season" (renderSeasonTabInner, no season yet): same treatment
 ('''  container.innerHTML = `<div class="panel">
   <h3 style="margin-top:0;">Play a Season</h3>
   <p style="font-size:1.2rem;line-height:1.5;">Simulate a full 17-game regular season with your drafted team against the other 31 simulated rosters, organized into real NFL divisions and conferences, then take your team through the playoffs to the Super Bowl!</p>
   <ol class="gl"><li>Starting the season builds the schedule. Nothing is simulated yet.</li><li>On the Preseason page you choose your <b>coaching philosophy</b> (offensive and defensive style) and who plays where, including any flexes. Then simulate one week at a time or the rest of the season.</li><li>New to the terms? The <b>Guide</b> tab explains every style, package and number on this site.</li></ol>
   <button class="resetbtn" id="startSeasonBtn" style="width:auto;padding:12px 28px;font-size:0.95rem;">Start Season</button>
  </div>`;''',
  '''  container.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">Start Season</button>
  </div>`;''', 1),
 # season options: heading + warning line removed
 ('''function seasonOptionsHTML(){
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Season options</h4>
  <p class="narr" style="margin-top:0;">These throw away the season in progress.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="tabbtn" id="restartSeasonBtn">Start a new season (same roster)…</button><button class="tabbtn" id="newDraftFromSeasonBtn">Start a new draft…</button></div></div>`;
}''',
  '''function seasonOptionsHTML(){
 return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;"><button class="tabbtn" id="restartSeasonBtn">Start a new season (same roster)…</button><button class="tabbtn" id="newDraftFromSeasonBtn">Start a new draft…</button></div>`;
}''', 1),
 # both destructive actions open the Caution screen
 ('''function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
 if(a) a.addEventListener('click', ()=> confirmDialog('This discards the current season (results, stats and awards) and starts week 1 again with the same roster and a new schedule.', 'Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));
 if(b) b.addEventListener('click', ()=> confirmDialog('This discards your drafted roster and the current season and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow));
}''',
  '''function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
 if(a) a.addEventListener('click', ()=> zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));
 if(b) b.addEventListener('click', ()=> zpbCaution('Yes, start a new draft', startNewDraftFlow));
}''', 1),
 # the old orange Start Season rule and the 1rem size pin are retired (zpb-startbtn owns the look)
 ('#startSeasonBtn{background:linear-gradient(90deg,#ff8a4a,#ffc43c);color:#2b1700;box-shadow:0 8px 24px rgba(255,160,60,.35);}', '', 1),
 ('#beginSeasonBtn,#beginSeasonBtn2,#startSeasonBtn,#startDraftBtn,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn{font-size:1rem !important;padding:13px 30px !important;}',
  '#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn{font-size:1rem !important;padding:13px 30px !important;}', 1),
 # preseason: the "Three optional settings" line is gone
 ('''</div>
  <p class="narr" style="margin:8px 0 0;">Three optional settings, preselected with recommended values. Philosophy and aggressiveness lock at Week 1; lineup and returner stay editable.</p></div>`;''',
  '''</div></div>`;''', 1),
 # preseason: Auto explainer + deviation note collapse into one simplified dropdown; style tables get their own dropdowns
 ('''  <div class="detail-item" style="margin:10px 0;"><b>Why we recommend Auto.</b> Auto tests every offensive setup (15 combinations of personnel and run/pass lean) and every defensive one (6) against an average opponent, with <i>your</i> lineup, and keeps whichever gives the best chance of winning. It also re-checks each week against the actual opponent. Picking something else is allowed, and the tables below show what it costs on paper, but it will rarely win more games than the math's pick. Some reasons to override anyway: you want to see how a heavy-run team plays, you want a bigger gamble as an underdog, or you just like a style.${isAuto?'':' <b>You have overridden Auto.</b>'}</div>
  <p class="narr" style="margin:6px 0;">If you deviate from your philosophy during the season (three of the last four games the same new look), opponents notice and plan for it, and the recaps will point it out. Your game-plan mode each week is separate: <b>Auto</b> (the math picks), <b>My coaching philosophy</b> (always your style) or <b>Custom</b> (you pick every piece).</p>
  <h4 style="margin:12px 0 4px;">Offense: every style with your roster</h4>${tabs.off}
  <h4 style="margin:14px 0 4px;">Defense: every style with your roster</h4>${tabs.def}''',
  '''  ${zpbAutoWhyHTML(isAuto)}
  <details class="zpb-dd"><summary>Offense: every style with your roster</summary><div style="margin-top:8px;">${tabs.off}</div></details>
  <details class="zpb-dd"><summary>Defense: every style with your roster</summary><div style="margin-top:8px;">${tabs.def}</div></details>''', 1),
 # lineup advice: the "Current lineup:" line is gone (the math stays); keep the accumulator
 (''' let h = `<p class="narr" style="margin:4px 0;">Current lineup: <b>${fmtWar(adv.curWins - base70)}</b> wins vs. a 70s lineup${nOff?`, with ${nOff} flexed starter${nOff===1?'':'s'}`:''}.</p>`;
''', " let h = '';\n", 1),
 # group scores parenthetical: "wins added" dropped
 ('<b>Group scores</b> (wins added · flex penalties included)', '<b>Group scores</b> (flex penalties included)', 1),
 # draft recap: the narrative is removed for every team
 ('''   html += `<h4 style="margin-top:14px;">Draft Recap</h4>${generateDraftRecap({...e, rankAmongReal}, metrics, draftSim.log)}`;
''', '', 1),
 # draft recap: the Your-Roster tab carries the same narrative - gone too
 ('''\n   ${generateDraftRecap({...myEntry, rankAmongReal}, metrics, draftSim.log)}\n  </div>''',
  '''\n  </div>''', 1),
 # game review: journalist paragraphs + pregame details off the page
 ('''  ${game.summary||''}
  ${renderKeyPlayersHTML(game)}
  <details open style="margin-top:10px;"><summary class="narr" style="cursor:pointer;">Team stats</summary>${renderTeamStatsHTML(game)}</details>
  ${game.preview ? `<details style="margin-top:6px;"><summary class="narr" style="cursor:pointer;">Pregame preview</summary><div style="margin-top:8px;">${game.preview}</div></details>` : ''}
  <details style="margin-top:6px;"><summary class="narr" style="cursor:pointer;">Pregame matchup math</summary><div style="margin-top:8px;">${matchupMathInner(game.home, game.away, game.plans?game:null)}</div></details>''',
  '''  ${renderKeyPlayersHTML(game)}
  <details style="margin-top:10px;"><summary class="narr" style="cursor:pointer;">Team stats</summary>${renderTeamStatsHTML(game)}</details>''', 1),
 # regular season review: the long narrative collapses into a dropdown
 ('   ${generateRegularSeasonRecap()}',
  '   <details class="zpb-dd" style="margin-top:8px;"><summary>The season in words</summary><div style="margin-top:8px;">${generateRegularSeasonRecap()}</div></details>', 1),
 # week sim: play the replay for the user's game
 (''' seasonState.weekSimulated = true;
}''',
  ''' seasonState.weekSimulated = true;
 if(typeof zpbGameReplay==='function'){ const ug = games.find(x=>x.home===user||x.away===user); if(ug && ug.result && ug.result.homeEvents && ug.result.homeEvents.length) zpbGameReplay(ug, user); }
}''', 1),
 # playoff round: the replay plays for the user's game too
 (" if(rk==='wildcard') seasonState.playoffRounds.divisional = buildDivisionalRound(seasonState.seeds, games);",
  ''' if(typeof zpbGameReplay==='function'){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); }
 if(rk==='wildcard') seasonState.playoffRounds.divisional = buildDivisionalRound(seasonState.seeds, games);''', 1),
 # lineup editor: names compress to the last name on narrow windows
 (''' const ap = document.getElementById(hostId+'Apply'); if(ap) ap.addEventListener('click', ()=>{ applyLineup(roster, lineupAdvice(roster).best); onChange(); });
}''',
  ''' const ap = document.getElementById(hostId+'Apply'); if(ap) ap.addEventListener('click', ()=>{ applyLineup(roster, lineupAdvice(roster).best); onChange(); });
 if(typeof zpbFitLineupNames==='function') zpbFitLineupNames();
}''', 1),
]

# ---- v7 range replacements: whole-function rewrites (anchor kept) ----
NEW_SCHED = '''function renderUserScheduleHTML(){
 const user = seasonUserTeam();
 const mine = seasonState.schedule.filter(g=>g.home===user||g.away===user).sort((a,b)=>a.week-b.week);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const tiles = mine.map(g=>{
  const home = g.home===user, opp = home ? g.away : g.home;
  let res = '<span class="zst-res zst-t">\u00b7</span>', cls = 'zst-tile';
  if(g.played){
   const fs = home?g.result.homeScore:g.result.awayScore, os = home?g.result.awayScore:g.result.homeScore;
   const o = fs>os?'W':fs<os?'L':'T';
   res = `<span class="zst-res zst-${o.toLowerCase()}">${o}</span><span class="zst-score">${fs}\u2013${os}</span>`;
   cls += ' zst-played';
  }
  return `<div class="${cls}" data-wk="${g.week}" title="Week ${g.week}${g.divisional?' \u00b7 division game':''}"><span class="zst-wk">${g.week}</span><span class="zst-at">${home?'vs':'@'}</span><span class="zst-logo">${lg(opp)}</span><span class="zst-opp">${opp}</span>${res}</div>`;
 }).join('');
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Your Schedule &amp; Results <span class="narr" style="font-weight:400;">(tap a played week for the recap)</span></h4><div class="zst-grid">${tiles}</div><div class="zst-details">${mine.filter(g=>g.played&&g.summary).map(g=>`<div class="zst-detail" id="sg-detail-${g.week}" style="display:none;"><div class="detailwrap">${renderGameResultHTML(g, user)}</div></div>`).join('')}</div></div>`;
}
function wireScheduleClicks(container){
 container.querySelectorAll('.zst-played').forEach(el=>{
  el.addEventListener('click', ()=>{
   const row = document.getElementById('sg-detail-'+el.dataset.wk);
   if(!row) return;
   row.style.display = row.style.display==='none' ? 'block' : 'none';
   if(row.style.display==='block') row.scrollIntoView({block:'nearest', behavior:'smooth'});
  });
 });
}

'''
NEW_STAND = '''function renderStandingsHTML(){
 const standings = computeStandings(seasonState.schedule, teamNames());
 const user = seasonUserTeam();
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const divTable = (div, minor)=>{
  const rows = divisionStandings(div, standings, seasonState.schedule);
  if(minor){
   return `<div class="zpb-smdiv"><h6>${div}</h6>${rows.map(r=>`<div class="zpb-smrow ${r.team===user?'zpb-smrow-me':''}"><span>${lg(r.team)}${r.team}</span><span class="narr">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</span></div>`).join('')}</div>`;
  }
  return `<div class="divtable zpb-divmain"><h5>${div}</h5><table><thead><tr><th></th><th>W-L</th><th>PF/G</th><th>PA/G</th><th>Diff</th></tr></thead><tbody>${rows.map(r=>{
    const gp = r.wins+r.losses+r.ties;
    return `<tr class="${r.team===user?'user-row':''} zpb-standrow" style="${(typeof zpbRowVars==='function')?zpbRowVars(r.team):''}"><td>${lg(r.team)}${r.team}</td><td class="score">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</td><td class="narr">${gp?(r.pf/gp).toFixed(1):'\u2014'}</td><td class="narr">${gp?(r.pa/gp).toFixed(1):'\u2014'}</td><td class="narr">${r.diff>=0?'+':''}${r.diff}</td></tr>`;
   }).join('')}</tbody></table></div>`;
 };
 const myDiv = divisionOfTeam(user);
 const conf = conferenceOfTeam(user);
 const otherDivs = [];
 Object.keys(CONFERENCES).forEach(c=> CONFERENCES[c].forEach(d=>{ if(d!==myDiv) otherDivs.push(d); }));
 const ordered = otherDivs.filter(d=>d.indexOf(conf)===0).concat(otherDivs.filter(d=>d.indexOf(conf)!==0));
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Standings <span class="narr" style="font-weight:400;">(your division first)</span></h4>
  ${divTable(myDiv, false)}
  <div class="zpb-stand-minor">${ordered.map(d=>divTable(d, true)).join('')}</div>
 </div>`;
}
'''
NEW_IDENT = '''function renderIdentityPanel(team, title, open, isUser){
 const S = seasonState, rt = S.unitRatings[team], rk = S.unitRanks[team];
 const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
 const rows = Object.keys(UNIT_INFO).map(u=>{
  const r = rk[u] || 32;
  const w = Math.max(5, Math.round((33-r)/32*100));
  const tone = r<=8 ? 'var(--good)' : r>=25 ? 'var(--bad)' : 'var(--text)';
  return `<div class="zpb-rkrow" style="${st}"><span class="zpb-rkname">${UNIT_INFO[u].label}</span><span class="zpb-rkbar"><i style="width:${w}%;"></i></span><b class="zpb-rkval" style="color:${tone};">#${r}</b><span class="zpb-rkgrade">${rt[u].toFixed(1)}</span></div>`;
 }).join('');
 return `<details class="panel zpb-glowpanel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">${title} <span class="narr" style="font-weight:400;">(${team})</span></summary>
  <div style="margin-top:10px;" class="zpb-rkgrid">${rows}</div></details>`;
}
function renderTeamIdentityHTML(open){ return renderIdentityPanel(seasonUserTeam(), "Your Team's Identity", open, true); }
function renderScoutingHTML(opp){ return renderIdentityPanel(opp, 'Opponent Scouting Report', true, false); }

'''
NEW_LU = '''function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<div class="zpb-lu-grp">${gname}</div>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${l.text!=='\u2014'&&zL?'zpb-trow':''} ${l.val>r.val?'zpb-lu-win':''}" style="${l.text!=='\u2014'&&zL?zL:''}">${l.text}</span>
    <span class="zpb-lu-c">${LABELS[s]||s}</span>
    <span class="zpb-lu-cell zpb-lu-r ${r.text!=='\u2014'&&zR?'zpb-trow':''} ${r.val>l.val?'zpb-lu-win':''}" style="${r.text!=='\u2014'&&zR?zR:''}">${r.text}</span>
   </div>`;
  });
 });
 return `<div class="zpb-lu">${rows}</div><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings \u2014 players flexed out of position carry their penalty.</p>`;
}
'''
NEW_WHY = '''function scriptWhyHTML(team){
 const S = seasonState, R = S.unitRatings[team], lg = S.league, rk = S.unitRanks[team], id = S.identity[team], auto = teamIdentity(R, lg);
 const exp = {off:NEUTRAL_OFF, def:DEFAULT_DEF};
 const rows = OFF_OPTS.map(o=>({o, m:matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}), u:offUtil(R, lg, lg, o, exp, id.def, 0)})).sort((a,b)=>b.u-a.u);
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const best = units.slice().sort((a,b)=>rk[a]-rk[b]).slice(0,2), worst = units.slice().sort((a,b)=>rk[b]-rk[a])[0];
 const top3 = rows.slice(0,3);
 const mx = Math.max(...top3.map(r=>r.u), 0.5);
 const bar = r=>`<div class="zpb-whyrow"><span class="zpb-whyname">${planText(r.o)}</span><span class="zpb-whybar"><i style="width:${Math.max(8,r.u/mx*100).toFixed(0)}%;"></i></span><b>${(r.u*100).toFixed(0)}%</b></div>`;
 const override = (id.source==='user' && JSON.stringify(auto.off)!==JSON.stringify(id.off))
  ? `<p class="narr" style="margin:8px 0 0;">You picked your own way to play \u2014 the computer's pick was a little safer on paper.</p>` : '';
 return `<details class="zpb-dd"><summary>Why this style? (the simple math)</summary>
  <div style="margin-top:8px;">
   <p class="narr" style="margin:0 0 8px;">The computer tried all 15 ways to play and kept the one that wins the most with your team. Your strongest parts are ${shortUnit(best[0])} (#${rk[best[0]]}) and ${shortUnit(best[1])} (#${rk[best[1]]}); the shaky part is ${shortUnit(worst)} (#${rk[worst]}).</p>
   ${top3.map(bar).join('')}
   <p class="narr" style="margin:8px 0 0;">Bars show the chance of beating an average team. The label stays the same all season \u2014 the plays called can still change each week when the matchup asks for it.</p>
   ${override}
  </div></details>`;
}
'''
NEW_PLANCARDS = '''function planCardsHTML(g){
 const S = seasonState, user = seasonUserTeam(), plans = ensureGamePlans(g);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const card = (team, side)=>{
  const p = plans[side], id = S.identity[team], fx = planFxLive(g, side), mine = team===user;
  const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
  return `<div class="zpb-plan" style="${st}${mine?'border-color:var(--accent);':''}">
   <div class="zpb-plan-hd">${lg(team)}<div><b>${mine?'You \u00b7 ':''}${team}</b><span class="narr">${capFirst(offStyleName(id.off))} \u00b7 ${capFirst(defStyleName(id.def))}</span></div></div>
   <div class="zpb-plan-row"><span class="narr">Offense</span><b>${planText(p.off)}</b></div>
   <div class="zpb-plan-row"><span class="narr">Defense</span><b>${defPlanText(p.def)}</b></div>
   <div class="zpb-plan-fx">${fx.pts>=0?'+':'\u2212'}${Math.abs(fx.pts).toFixed(1)} pts vs. balanced 11</div>
  </div>`;
 };
 return `<div class="zpb-plans">${card(g.away,'away')}${card(g.home,'home')}</div>`;
}
'''
NEW_AGGR = '''function aggrControlHTML(user){
 const S = seasonState; S.aggr = S.aggr||{}; const cur = S.aggr[user]||'balanced';
 return `<p style="margin:4px 0;">How bold is your coach on <b>2-Pt Convs</b> and <b>4th downs</b>? This changes <i>how</i> your team scores, not how many points it is worth: the real-world numbers say a bold coach and a careful one come out about even, so the sim treats them as roughly equal and the difference shows up in the box score and in game-to-game swings.</p>
  <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style<select id="aggrSel" ${S.scriptLocked?'disabled':''}>${Object.keys(AGGR_INFO).map(k=>`<option value="${k}" ${k===cur?'selected':''}>${AGGR_INFO[k].label}</option>`).join('')}</select></label>
  <p style="margin:6px 0;" id="aggrDesc">${AGGR_INFO[cur].desc}</p>
  <details class="zpb-dd"><summary>How a 2-Pt Conv works</summary>
   <div style="margin-top:8px;">
    <div class="zpb-twop">
     <div><b>Kick</b><span>1 point \u00b7 makes it about 94% of the time</span></div>
     <div><b>Go for 2</b><span>2 points from the 2-yard line \u00b7 makes it about 48% of the time</span></div>
    </div>
    <p class="narr" style="margin:8px 0 0;">Both choices are worth about the same over many tries, so the call is about the game situation. One rule above all: <b>losing by 8 or 11 late, every team goes for 2</b> \u2014 that is the try that ties the game or leaves a field goal to tie. Every other team has its own style too, and the recap says when a team went for 2.</p>
   </div></details>`;
}
'''
NEW_MM = '''function matchupMathInner(homeTeam, awayTeam, g){
 const S = seasonState, lg = S.league;
 const H = S.unitRatings[homeTeam], A = S.unitRatings[awayTeam];
 const pl = g ? ensureGamePlans(g) : DEFAULT_PLAN_PAIR;
 const mh = matchupModel(H, A, lg, {off:pl.home.off, def:pl.away.def}), ma = matchupModel(A, H, lg, {off:pl.away.off, def:pl.home.def});
 const projH = mh.structPts + HOME_FIELD, projA = ma.structPts;
 const stA = (typeof zpbRowVars==='function') ? zpbRowVars(awayTeam) : '';
 const stH = (typeof zpbRowVars==='function') ? zpbRowVars(homeTeam) : '';
 const units = ['olRun','olPass','rb','qb','rec','passRush','frontRun','coverage','kicker'];
 const mx = Math.max(...units.map(u=>Math.max(H[u]||0, A[u]||0)), 1);
 const row = u=>{
  const hv = H[u]||0, av = A[u]||0, ra = S.unitRanks[awayTeam][u], rh = S.unitRanks[homeTeam][u];
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b>${av.toFixed(1)}</b><span class="narr">#${ra}</span><span class="zpb-mbar"><i style="width:${(av/mx*100).toFixed(0)}%;"></i></span></div><span class="zpb-mlab">${UNIT_INFO[u].label}</span><div class="zpb-mcell zpb-mc-h" style="${stH}"><span class="zpb-mbar"><i style="width:${(hv/mx*100).toFixed(0)}%;"></i></span><b>${hv.toFixed(1)}</b><span class="narr">#${rh}</span></div></div>`;
 };
 const sgn = v => (v>=0?'+':'\u2212') + Math.abs(v).toFixed(1);
 const chans = [['Ground game','run'],['Passing game','pass'],['Turnovers','to'],['Sacks','sack'],['Kicking','kick']];
 const chan = ([lab,k])=>{
  const a = ma.channels[k], h = mh.channels[k];
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b class="${a>h?'zpb-mwin':''}">${sgn(a)}</b></div><span class="zpb-mlab">${lab}</span><div class="zpb-mcell zpb-mc-h"><b class="${h>a?'zpb-mwin':''}">${sgn(h)}</b></div></div>`;
 };
 return `<div class="zpb-mhead"><span>${nick(awayTeam)} ${projA.toFixed(1)}</span><span class="narr">model \u00b7 home field +${HOME_FIELD.toFixed(1)}</span><span>${projH.toFixed(1)} ${nick(homeTeam)}</span></div>
  <div class="zpb-mgrid">${units.map(row).join('')}${chans.map(chan).join('')}</div>`;
}
'''
NEW_STARS = '''function starsFaceoffHTML(g){
 const rowsFor = team=>{
  const sm = seasonState.teams[team].slotmap;
  return ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
 };
 const A = rowsFor(g.away), H = rowsFor(g.home);
 const n = Math.max(A.length, H.length);
 const cell = (x, team, side)=>{
  if(!x) return '<div class="zpb-star-cell"></div>';
  const mine = team===seasonUserTeam();
  const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
  return `<div class="zpb-star-cell ${side} ${x.ovr>=90?'sf90':''}" style="${st}">${x.ovr>=90?'<span class="zpb-sglow">\u2605</span>':''}<span class="${mine?'ub':''}">${x.name}</span><span class="narr">${LABELS[x.slot]||x.slot}</span><b>${x.ovr}</b></div>`;
 };
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 let body = '';
 for(let i=0;i<n;i++) body += `<div class="zpb-star-row">${cell(A[i], g.away, 'zsc-l')}${cell(H[i], g.home, 'zsc-r')}</div>`;
 return `<div class="zpb-stars"><div class="zpb-stars-hd"><div>${lg(g.away)} ${nick(g.away)}</div><div>${nick(g.home)} ${lg(g.home)}</div></div>${body||'<div class="narr" style="padding:10px;">No 85+ starters</div>'}</div>`;
}
function renderPreviewPanel(g, mode){
 if(!g.preview) g.preview = generatePreviewHTML(g, mode);
 if(!g.headline) g.headline = previewHeadline(g, mode);
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">${mode==='playoff'?'Playoff preview':'Game preview'}</div>${zpbPreviewStripHTML(g)}${starsFaceoffHTML(g)}</div>`;
}

'''
NEW_MATCHUP = '''function matchupCardHTML(g, sub){
 const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const rv = n=> (typeof zpbRowVars==='function') ? zpbRowVars(n) : '';
 return `<div class="zpb-mu">
  <div class="zpb-mu-team" style="${rv(g.away)}"><div class="zpb-mu-logo">${lg(g.away)}</div><div class="zpb-mu-name">${g.away}</div><div class="zpb-mu-rec">${sub(g,'away')}</div></div>
  <div class="zpb-mu-at"><span>${g.neutral?'VS':'@'}</span></div>
  <div class="zpb-mu-team" style="${rv(g.home)}"><div class="zpb-mu-logo">${lg(g.home)}</div><div class="zpb-mu-name">${g.home}</div><div class="zpb-mu-rec">${sub(g,'home')}</div></div>
 </div>`;
}
'''

V7_RANGES = [
 ("v7: schedule = crest week tiles (panel table gone)",
  "function renderUserScheduleHTML(){", "// ---------- phase views ----------", NEW_SCHED),
 ("v7: standings - your division first, others compact",
  "function renderStandingsHTML(){", "function seedLabel(g, sideKey){", NEW_STAND),
 ("v7: identity + scouting = rank bars (paragraphs gone)",
  "function renderIdentityPanel(team, title, open, isUser){", "// ---------- journalist-style previews ----------", NEW_IDENT),
 ("v7: lineups - floaty rows, not a boxy table",
  "function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight){", "function countLineupEdges(slotmapA, slotmapB){", NEW_LU),
 ("v7: why-this-style dropdown, simplified + visualized",
  "function scriptWhyHTML(team){", "function renderGamePlanPanel(g){", NEW_WHY),
 ("v7: game plan cards with crests",
  "function planCardsHTML(g){", "function confirmDialog(msg, yesLabel, onYes){", NEW_PLANCARDS),
 ("v7: aggressiveness - desc matches intro font, 2-Pt dropdown",
  "function aggrControlHTML(user){", "function wireAggr(){", NEW_AGGR),
 ("v7: matchup math - side-by-side bars",
  "function matchupMathInner(homeTeam, awayTeam, g){", "function renderMatchupMathHTML(homeTeam, awayTeam, g){", NEW_MM),
 ("v7: stars faceoff aligned + preview panel goes visual",
  "function starsFaceoffHTML(g){", "// ================= REVIEW FRAGMENTS (v2) =================", NEW_STARS),
 ("v7: matchup card = logo versus (panel gone)",
  "function matchupCardHTML(g, sub){", "function renderUserScheduleHTML(){", NEW_MATCHUP),
 ("v7: draft recap narrative function deleted",
  "function generateDraftRecap(entry, metrics, log){", "function categoryRating(pool, key){", ""),
]

REMOVED_V7 = []
for _v7old, new, cnt in V7_EXACT:
    found = html.count(_v7old)
    if found != cnt:
        sys.exit(f"ABORT: [v7] {_v7old[:60]!r} expected {cnt} occurrence(s), found {found}")
    html = html.replace(_v7old, new)
    REMOVED_V7.append(_v7old)
    print(f"[ok] [v7] {_v7old[:56]!r}")

for label, startm, endm, new in V7_RANGES:
    if html.count(startm) != 1:
        sys.exit(f"ABORT: [v7-range] {label}: start marker count {html.count(startm)}")
    i = html.index(startm)
    j = html.find(endm, i + len(startm))
    if j < 0:
        sys.exit(f"ABORT: [v7-range] {label}: end marker not found")
    REMOVED_V7.append(html[i:j])
    html = html[:i] + new + html[j:]
    print(f"[ok] [v7-range] {label}")

# ---- v8 exact replacements ----
V8_EXACT = [
 # 1. real footer at the bottom of the page; the hint lives right above it
 #    (anchored before </body>: the base .wrap never explicitly closes, so a
 #    footer placed earlier would land inside it and never pin to the bottom)
 ("v8: footer element as the last body child",
  "</body>",
  "<footer class=\"zpb-foot\"><p class=\"zpb-hint\"><a href=\"#\" id=\"zpbHintGuide\">see guide for details</a></p>"
  "<div class=\"zpb-footline\"><span class=\"zpb-fmark\">20-0</span></div></footer>\n</body>", 1),
 ("v8: hint wiring moves to the static footer hint (DOM-ready safe)",
  "function fillDraftGuide(){ const h = document.getElementById('draftGuideHost'); if(h && !h.dataset.ready){ h.dataset.ready = '1'; h.innerHTML = '<p class=\"zpb-hint\"><a href=\"#\" id=\"zpbHintGuide\">see guide for details</a></p>'; const a = document.getElementById('zpbHintGuide'); if(a) a.addEventListener('click', e=>{ e.preventDefault(); setActiveTab('viewGuide','tabGuideBtn'); }); } }",
  "function fillDraftGuide(){ const wire = ()=>{ const a = document.getElementById('zpbHintGuide'); if(a && !a.dataset.ready){ a.dataset.ready = '1'; a.addEventListener('click', e=>{ e.preventDefault(); setActiveTab('viewGuide','tabGuideBtn'); }); } }; if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', wire); } else { wire(); } }", 1),
 ("v8: hint sits tight above the footer",
  ".zpb-hint{margin:0;padding:30px 10px 8px;text-align:center;}",
  ".zpb-hint{margin:0;padding:8px 10px 5px;text-align:center;}", 1),
 ("v8: .wrap bottom padding tightened (hint/footer adjacency)",
  ".wrap{max-width:1200px;margin:0 auto;padding:20px 16px 60px;}",
  ".wrap{max-width:1200px;margin:0 auto;padding:20px 16px 14px;}", 1),
 # 2. home dropdowns: shrink in place, side by side, never stack
 ("v8: home selects side by side (desktop rule)",
  "#draftSetup .filters select{min-width:250px;font-size:.98rem;padding:11px 36px 11px 14px;text-align:left;}",
  "#draftSetup .filters select{min-width:0;width:auto;flex:1 1 0;max-width:300px;font-size:.98rem;padding:11px 30px 11px 12px;text-align:left;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}", 1),
 ("v8: home selects side by side (narrow rule, was min-width:100% = stacking)",
  " #draftSetup .filters select{min-width:100%;}",
  " #draftSetup .filters{flex-wrap:nowrap;gap:7px;}\n #draftSetup .filters select{width:auto !important;flex:1 1 0;max-width:100%;font-size:.8rem;padding:9px 24px 9px 10px;}", 1),
 # 3. logos: no bubbles anywhere (dark-mode ivory discs -> a whisper of shadow)
 ("v8: crest discs removed (pure logos in dark mode too)",
  ":root[data-theme=\"dark\"] .zpb-logo{background:radial-gradient(circle,#fdf6e8,#f3e3c6);border-radius:50%;}\n@media (prefers-color-scheme: dark){\n :root:not([data-theme=\"light\"]) .zpb-logo{background:radial-gradient(circle,#fdf6e8,#f3e3c6);border-radius:50%;}\n}",
  ":root[data-theme=\"dark\"] .zpb-logo{filter:drop-shadow(0 1px 2px rgba(0,0,0,.55));}\n@media (prefers-color-scheme: dark){\n :root:not([data-theme=\"light\"]) .zpb-logo{filter:drop-shadow(0 1px 2px rgba(0,0,0,.55));}\n}", 1),
 # 4. the three team-color bubbles go UNDER the crest in the board's Team cell
 ("v8: board Team cell = crest with the color bubbles underneath",
  "<td data-label=\"Team\">${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}</td>",
  "<td data-label=\"Team\"><span class=\"zpb-teamcol\">${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}</span></td>", 1),
 # 5. "No picks yet." and "needed" are gone
 ("v8: 'No picks yet.' removed (recent picks + roster total)",
  ": 'No picks yet.';", ": '';", 2),
 ("v8: 'needed' filler removed from empty depth slots",
  "${p?p[0]:'needed'}${oopTag}", "${p?p[0]:''}", 1),
 # 6. who-got-flexed mentions removed (roster rows)
 ("v8: roster Flexed badge declaration removed",
  "  const oopTag = oop ? `<span class=\"badge badge-passfail\" style=\"margin-left:6px;\" title=\"Playing a flexed/non-natural position\">Flexed</span>` : '';\n", "", 1),
 # 7. who-got-flexed mentions removed (preseason lineup rows)
 ("v8: preseason lineup Flexed badge declaration removed",
  "   const oopTag = oop ? `<span class=\"badge badge-passfail\" style=\"margin-left:6px;\">Flexed</span>` : '';\n", "", 1),
 ("v8: preseason lineup Flexed badge usage removed",
  "${rndTag}${oopTag}", "${rndTag}", 1),
 # 8. who-got-flexed mentions removed (season slot table)
 ("v8: slot table flex penalty cell simplified",
  "  const effCell = oop\n   ? `<span style=\"color:var(--bad);font-weight:700;\">${myVal} <span class=\"narr\" style=\"font-weight:400;\">(${e.ovr} \u2212 ${flexPenaltyFor(e.pos,s)}, flexed)</span></span>`\n   : `<span class=\"score\">${e?e.ovr:'\u2014'}</span>`;",
  "  const effCell = `<span class=\"score\">${e?e.ovr:'\u2014'}</span>`;", 1),
 ("v8: 'Flexed from' badge removed from the slot table",
  "${e&&e.name?e.name:'\u2014'}${oop?` <span class=\"badge badge-passfail\">Flexed from ${e.pos}</span>`:''}",
  "${e&&e.name?e.name:'\u2014'}", 1),
 # 9. "by your next pick" hides on compression; the Flex suffix is gone
 ("v8: next-pick phrase wrapped + Flex suffix removed",
  " \u00b7 ${fmtWar(r.v)} wins \u00b7 ${pctTxt(r.gone)} gone by your next pick${r.flex?' \u00b7 Flex (-'+r.pen+')':''}</div></div></div>`;",
  " \u00b7 ${fmtWar(r.v)} wins \u00b7 ${pctTxt(r.gone)} gone<span class=\"zpb-nxpick\"> by your next pick</span></div></div></div>`;", 1),
 # 10. confetti follows the selected team's palette (the standing green piece is gone under takeover)
 ("v8: fx palette helper (identity colors when a team is picked)",
  "const COLORS = ['#4f8cff','#ffffff','#ffc43c','#ff6b4a','#3ecf8e','#b48cff'], GOLD = ['#ffc43c','#ffd75e','#fff6c4','#ffffff','#e8a317'];",
  "const COLORS = ['#4f8cff','#ffffff','#ffc43c','#ff6b4a','#3ecf8e','#b48cff'], GOLD = ['#ffc43c','#ffd75e','#fff6c4','#ffffff','#e8a317'];\n"
  " const FXC = ()=>{ try{ if(typeof zpbState!=='undefined' && zpbState.teamName && typeof zpbPackFor==='function'){ const pk=zpbPackFor(zpbState.teamName); if(pk&&pk.raw) return [pk.raw[0],pk.raw[1],pk.raw[2],'#ffffff','#ffc43c']; } }catch(e){} return COLORS; };", 1),
 ("v8: small burst wears the identity", "confetti(70, COLORS,", "confetti(70, FXC(),", 1),
 ("v8: medium bursts wear the identity",
  "confetti(110, COLORS, W*0.1, H*0.95, 1.1, 15); confetti(110, COLORS, W*0.9, H*0.95, 1.1, 15)",
  "confetti(110, FXC(), W*0.1, H*0.95, 1.1, 15); confetti(110, FXC(), W*0.9, H*0.95, 1.1, 15)", 1),
 ("v8: conference bursts wear the identity",
  "confetti(140, COLORS, W*0.1, H*0.95, 1.0, 17); confetti(140, COLORS, W*0.9, H*0.95, 1.0, 17)",
  "confetti(140, FXC(), W*0.1, H*0.95, 1.0, 17); confetti(140, FXC(), W*0.9, H*0.95, 1.0, 17)", 1),
 ("v8: delayed burst wears the identity", "confetti(120, COLORS, W/2, H*0.9, 1.6, 15)", "confetti(120, FXC(), W/2, H*0.9, 1.6, 15)", 1),
 ("v8: superbowl bursts mix gold + identity",
  "confetti(170, GOLD.concat(COLORS), W*0.08, H*0.97, 1.0, 19); confetti(170, GOLD.concat(COLORS), W*0.92, H*0.97, 1.0, 19)",
  "confetti(170, GOLD.concat(FXC()), W*0.08, H*0.97, 1.0, 19); confetti(170, GOLD.concat(FXC()), W*0.92, H*0.97, 1.0, 19)", 1),
 # 11. the slot picker no longer says Flex either (the eff number carries the cost)
 ("v8: slot picker Flex suffix removed",
  "${pen?` <span class=\"narr\">Flex (-${pen})</span>`:''}", "", 1),
]

# ---- v8 range replacement: the roster-building flex paragraph (Owner: remove) ----
V8_RANGES = [
 ("v8: roster-building flex paragraph deleted",
  " if(isUser){\n  const B = buildGrades()[team];",
  "return out;",
  " return out;"),
]

V8_REMOVED = []
for _label, _v8old, new, cnt in V8_EXACT:
    found = html.count(_v8old)
    if found != cnt:
        sys.exit(f"ABORT: [v8] {_label}: expected {cnt} occurrence(s), found {found}")
    html = html.replace(_v8old, new)
    V8_REMOVED.append(_v8old)
    print(f"[ok] [v8] {_label}")

for label, startm, endm, new in V8_RANGES:
    if html.count(startm) != 1:
        sys.exit(f"ABORT: [v8-range] {label}: start marker count {html.count(startm)}")
    i = html.index(startm)
    j = html.find(endm, i + len(startm))
    if j < 0:
        sys.exit(f"ABORT: [v8-range] {label}: end marker not found")
    V8_REMOVED.append(html[i:j])
    html = html[:i] + new + html[j + len(endm):]
    print(f"[ok] [v8-range] {label}")

# ------------------------------------------------- ninth wave (Owner, 25 Oct)
# ~48 directives: draft exit button, team-colored dropdowns, full-bleed bar,
# board height, 100-season tab + graphical report + working back button, Start
# Season centering/shimmer, flex text size, personnel chips, Why Auto removal,
# style tables sorted by Personnel, preview strip redo (parallelogram, no %,
# no model text, side-aligned edges), oscillating key players, scouting bars
# fixed (good = vibrant), lineups below key players with team-color/shimmer
# rules, schedule tiles redo, standings nicknames, Play-the-X primary button,
# 30-60 s replay with turnovers/team colors/star/no timeout, clutch + playoff
# + Super Bowl cinematics, game review floating rows, box-score quarters,
# Can-you-go breathing, 360-degree drips, stats/awards player cards, pick
# analysis visual, merged advanced stats, rest-of-season summary, playoff
# elimination -> season complete, strengths/weaknesses tiles, Try-again panel.
V9_EXACT = [
 ("v9: draft-complete line gets the breathing Can-you-go + shimmering ?",
  "Your draft is in the books. Play the season. Coach your team to the Super Bowl. Can you go <b class=\"zpb-shine\">20-0</b>?",
  "Your draft is in the books. Play the season. Coach your team to the Super Bowl. <span class=\"zpb-cyg\">Can you go </span><b class=\"zpb-shine\">20-0</b><b class=\"zpb-shine zpb-cygq\">?</b>", 1),
 ("v9: style tables - 'Setup used' -> 'Personnel'",
  "<th>Style</th><th>Setup used</th>", "<th>Style</th><th>Personnel</th>", 1),
 ("v9: style tables carry the compact class",
  "return {off:`<table>${head}<tbody>${o}</tbody></table>`, def:`<table>${head}<tbody>${d}</tbody></table>`, auto};",
  "return {off:`<table class=\"zpb-styletb\">${head}<tbody>${o}</tbody></table>`, def:`<table class=\"zpb-styletb\">${head}<tbody>${d}</tbody></table>`, auto};", 1),
 ("v9: offense styles sorted by personnel, then win chance",
  "const offRows = Object.keys(OFF_STYLE_INFO).map(k=>{ const o = resolveOffStyle(team, k); return {k, o, u:offUtil(R, lg, lg, o, exp, id.def, 0)}; }).sort((a,b)=>b.u-a.u);",
  "const offRows = Object.keys(OFF_STYLE_INFO).map(k=>{ const o = resolveOffStyle(team, k); return {k, o, u:offUtil(R, lg, lg, o, exp, id.def, 0)}; }).sort((a,b)=>persOrd(planText(a.o))-persOrd(planText(b.o)) || b.u-a.u);", 1),
 ("v9: defense styles sorted by setup, then win chance",
  "const defRows = Object.keys(DEF_STYLE_INFO).map(k=>{ const d = {pkg:DEF_STYLE_INFO[k].pkg, focus:DEF_STYLE_INFO[k].focus}; return {k, d, u:defUtil(R, lg, lg, d, exp, id.off, 0)}; }).sort((a,b)=>b.u-a.u);",
  "const defRows = Object.keys(DEF_STYLE_INFO).map(k=>{ const d = {pkg:DEF_STYLE_INFO[k].pkg, focus:DEF_STYLE_INFO[k].focus}; return {k, d, u:defUtil(R, lg, lg, d, exp, id.off, 0)}; }).sort((a,b)=>defPlanText(a.d).localeCompare(defPlanText(b.d)) || b.u-a.u);", 1),
 ("v9: personnel win-chance bars become chips with the delta baked in",
  " const bar = r=>`<div class=\"zpb-whyrow\"><span class=\"zpb-whyname\">${planText(r.o)}</span><span class=\"zpb-whybar\"><i style=\"width:${Math.max(8,r.u/mx*100).toFixed(0)}%;\"></i></span><b>${(r.u*100).toFixed(0)}%</b></div>`;",
  " const bar = r=>`<div class=\"zpb-whychip${r.u===top3[0].u?' zpb-whybest':''}\"><span>${planText(r.o)}</span><b>${(r.u*100).toFixed(0)}%</b><i>${r.u===top3[0].u?'the math\\u2019s pick':'\\u2212'+((top3[0].u-r.u)*100).toFixed(1)+' pts vs. best'}</i></div>`;", 1),
 ("v9: chips wrapper replaces the bars + caption sentence",
  "   ${top3.map(bar).join('')}\n   <p class=\"narr\" style=\"margin:8px 0 0;\">Bars show the chance of beating an average team. The label stays the same all season — the plays called can still change each week when the matchup asks for it.</p>",
  "   <div class=\"zpb-whychips\">${top3.map(bar).join('')}</div>", 1),
 ("v9: plan fx label 'vs. balanced 11' -> 'vs. auto'",
  "<div class=\"zpb-plan-fx\">${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} pts vs. balanced 11</div>",
  "<div class=\"zpb-plan-fx\">${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} pts vs. auto</div>", 1),
 ("v9: matchup math runs in the Your-roster order (QB RB WR/TE OL DL SEC K)",
  "const units = ['olRun','olPass','rb','qb','rec','passRush','frontRun','coverage','kicker'];",
  "const units = ['qb','rb','rec','olPass','olRun','passRush','frontRun','coverage','kicker'];", 3),
 ("v9: the 'model · home field' readout leaves the matchup math (it lives in the Guide now)",
  "<span class=\"narr\">model · home field +${HOME_FIELD.toFixed(1)}</span>", "", 1),
 ("v9: home field +1.7 documented on the Guide page",
  "sec('Coaching: personnel, styles and game plans', coach, false)",
  "sec('Coaching: personnel, styles and game plans', coach + '<p class=\"narr\" style=\"margin:8px 0 0;\">Home field is worth +1.7 points a game in the model. It is baked into every projection — one reason home teams win slightly more often.</p>', false)", 1),
 ("v9: scouting rank rows tagged top/bottom so good reads vibrant, bad reads faded",
  "  const tone = r<=8 ? 'var(--good)' : r>=25 ? 'var(--bad)' : 'var(--text)';\n  return `<div class=\"zpb-rkrow\" style=\"${st}\">",
  "  const tone = r<=8 ? 'var(--good)' : r>=25 ? 'var(--bad)' : 'var(--text)';\n  const rc = r<=6 ? ' zpb-rktop' : (r>=24 ? ' zpb-rkbot' : '');\n  return `<div class=\"zpb-rkrow${rc}\" style=\"${st}\">", 1),
 ("v9: 'Simulate Week N' becomes the big primary 'Play the X'",
  "<button class=\"resetbtn\" id=\"simWeekBtn\" style=\"width:auto;margin:0;padding:10px 24px;\">Simulate Week ${week}</button>",
  "<button class=\"resetbtn zpb-ctabig\" id=\"simWeekBtn\" style=\"width:auto;margin:0;padding:12px 30px;\">${myGame?'Play the '+nick(myGame.home===user?myGame.away:myGame.home):'Simulate Week '+week}</button>", 1),
 ("v9: 'Sim Rest of Season' becomes the quiet secondary (both sites)",
  "<button class=\"tabbtn\" id=\"simSeasonBtn\">Sim Rest of Season ▸ Review</button>",
  "<button class=\"tabbtn zpb-ctasmall\" id=\"simSeasonBtn\">Sim rest of season</button>", 2),
 ("v9: lineups move directly below the key players",
  "html += renderPreviewPanel(myGame, 'regular') + renderGamePlanPanel(myGame) + renderScoutingHTML(opp) + renderMatchupMathHTML(myGame.home, myGame.away, myGame) + renderLineupComparisonHTML(myGame.home, myGame.away);",
  "html += renderPreviewPanel(myGame, 'regular') + renderLineupComparisonHTML(myGame.home, myGame.away) + renderGamePlanPanel(myGame) + renderScoutingHTML(opp) + renderMatchupMathHTML(myGame.home, myGame.away, myGame);", 1),
 ("v9: the user's score wears the team color in every game-review score line",
  "<div class=\"sl-score\">${r.awayScore} – ${r.homeScore}${r.ot?' <span class=\"narr\" style=\"font-size:0.7rem;\">OT</span>':''}</div>",
  "<div class=\"sl-score\"><span class=\"${game.away===focusTeam?'zpb-usscore':''}\">${r.awayScore}</span> – <span class=\"${game.home===focusTeam?'zpb-usscore':''}\">${r.homeScore}</span>${r.ot?' <span class=\"narr\" style=\"font-size:0.7rem;\">OT</span>':''}</div>", 1),
 ("v9: standings main table uses the nickname",
  "<td>${lg(r.team)}${r.team}</td><td class=\"score\">${r.wins}-",
  "<td>${lg(r.team)}${nick(r.team)}</td><td class=\"score\">${r.wins}-", 1),
 ("v9: standings minor tables use the nickname",
  "<span>${lg(r.team)}${r.team}</span><span class=\"narr\">${r.wins}-",
  "<span>${lg(r.team)}${nick(r.team)}</span><span class=\"narr\">${r.wins}-", 1),
]
V9_REMOVED = []
for _label, _v9old, new, cnt in V9_EXACT:
    found = html.count(_v9old)
    if found != cnt:
        sys.exit(f"ABORT: [v9] {_label}: expected {cnt} occurrence(s), found {found}")
    html = html.replace(_v9old, new)
    V9_REMOVED.append(_v9old)
    print(f"[ok] [v9] {_label}")

# ---------------------------------------------------------------- tenth wave
import zpb_v10 as _v10
html, V10_EXACT, V10_REMOVED = _v10.apply(html)

# --------------------------------------------------------------- eleventh wave
import zpb_v11 as _v11
html, V11_EXACT, V11_REMOVED = _v11.apply(html)

# ---------------------------------------------------------------- post-checks
STYLE_BLOCK_LABEL = "zpb theme style block + fonts"
def payload_count(needle):
    n = (ZPB_CSS.count(needle) + ZPB_CSS_V7.count(needle) + ZPB_CSS_V8.count(needle)
         + ZPB_CSS_V9.count(needle) + ZPB_CSS_V10.count(needle) + ZPB_CSS_V11.count(needle))
    for _label, _old, new, _cnt in REPLACEMENTS:
        if _label == STYLE_BLOCK_LABEL:
            n += new.count(needle) - ZPB_CSS.count(needle) - ZPB_CSS_V7.count(needle) - ZPB_CSS_V8.count(needle)  # only the head extras
            continue
        n += new.count(needle)
    for _v7old, new, _cnt in V7_EXACT:
        n += new.count(needle)
    for _label, _start, _end, new in V7_RANGES:
        n += new.count(needle)
    for _label, _v8old, new, _cnt in V8_EXACT:
        n += new.count(needle)
    for _label, _start, _end, new in V8_RANGES:
        n += new.count(needle)
    for _label, _v9old, new, _cnt in V9_EXACT:
        n += new.count(needle)
    for _label, _v10old, new, _cnt in V10_EXACT:
        n += new.count(needle)
    for _label, _v11old, new, _cnt in V11_EXACT:
        n += new.count(needle)
    for r in REMOVED_SUBSTRINGS + REMOVED_V7 + V8_REMOVED + V9_REMOVED + V10_REMOVED + V11_REMOVED:
        n -= r.count(needle)
    return n

import re as _re
html_nodata = _re.sub(r'data:image/png;base64,[A-Za-z0-9+/=]+', '', html)  # base64 noise can contain "v23"
checks = {
    "old display name remaining": (html.count("NFL Draft Simulator"), 0),
    "'Football Sim' display strings": (html.count("Football Sim"), 0),
    "'Start Draft' leftovers": (html.count("Start Draft"), 0),
    "emoji hero ball leftovers": (html.count('hero-ball">\U0001F3C8'), 0),
    "'v23' leftovers": (html_nodata.count("v23") + html_nodata.count("V23"), 0),
    "'Set Up Your Draft' leftovers": (html.count("Set Up Your Draft"), 0),
    "'Draft as' label leftovers": (html.count(">Draft as"), 0),
    "'Draft pick #' label leftovers": (html.count("Draft pick #"), 0),
    "'zpbmotto' leftovers": (html.count("zpbmotto"), 0),
    "'also fits' leftovers": (html.count("also fits"), 0),
    "'Fits as' leftovers": (html.count("Fits as"), 0),
    "old '(flex \\u2192' leftovers": (html.count("(flex \u2192"), 0),
    "'flexed \u2212' leftovers": (html.count("flexed \u2212"), 0),
    "'20-0' occurrences": (1 if "20-0" in html else 0, 1),
    "zpb-shine refs": (html.count("zpb-shine"), 11),
    "zpbtheme block": (html.count('id="zpbtheme"'), 1),
    "zpb-drips refs": (1 if "zpb-drips" in html else 0, 1),
    "zpb-orb refs": (html.count("zpb-orb") + html.count("zpborb") + html.count("hero-ball") + html.count("heroBounce"), 0),
    "playerPager refs": (html.count("playerPager"), payload_count("playerPager")),
    "marquee tracks": (html.count("zpbMqA"), payload_count("zpbMqA")),
    "site bar": (html.count('class="zpb-bar"'), payload_count('class="zpb-bar"')),
    "bar home link": (html.count('class="zpb-home"'), payload_count('class="zpb-home"')),
    "Cinzel Decorative font": (1 if "Cinzel Decorative" in html else 0, 1),
    "hero pointer leftovers": (html.count(".hero-text{cursor:pointer"), 0),
    "old hero h1 theme rule": (html.count(".hero h1{position:relative"), 0),
    "select shimmer rule": (1 if "zpbselg" in html else 0, 1),
    "team frames class": (1 if "zpb-trow" in html else 0, 1),
    "guide fade class": (html.count("zpb-guidefade"), 5),
    "Sim Guide heading": (html.count("Sim Guide"), payload_count("Sim Guide")),
    "'How the site works' leftovers": (html.count("How the site works"), 0),
    "home hint": (html.count("zpb-hint"), payload_count("zpb-hint")),
    "'See Guide for details' leftovers": (html.count("See Guide for details"), 0),
    "'see guide for details'": (html.count("see guide for details"), payload_count("see guide for details")),
    "scroll fade class": (html.count("zpb-fade"), 15),
    "drawn dash bar leftovers": (html.count("width:.30em;height:.058em"), 0),
    "team-color table": (html.count("ZPB_TEAM_COLORS"), payload_count("ZPB_TEAM_COLORS")),
    "team override selector": (1, 1 if "data-zpbteam" in html else 0),
    "display font link": (1, 1 if "fonts.googleapis.com/css2?family=Bodoni+Moda" in html else 0),
    # ---- sixth wave ----
    "'Value here' visible leftovers (ci)": (html.count("Value here") + html.count("value here"), 0),
    "'FLEX VALUE' badge leftovers": (html.count("FLEX VALUE"), 0),
    "star system leftovers": (html.count("data-star") + html.count("PRIO_STAR") + html.count("Click a star") + html.count("must-fill"), 0),
    "'you hold' leftovers": (html.count("you hold"), 0),
    "draft-page hero/stepper leftovers": (html.count('<header class="hero"') + html.count('class="stepper"'), 0),
    "prioOf pinned to default": (html.count("function prioOf(g){ return 1; }"), 1),
    "green bar segment leftovers": (html.count('width:${gp/maxW*100}%;background:var(--good)') + html.count('width:${gp/mx*100}%;background:var(--good)'), 0),
    "franchise logo fn": (html.count("zpbTeamLogo"), payload_count("zpbTeamLogo")),
    "logo class": (html.count("zpb-logo"), 10),
    "logo data table": (html.count("ZPB_LOGOS"), payload_count("ZPB_LOGOS")),
    "next-pick indicator": (html.count("zpbNextPick"), payload_count("zpbNextPick")),
    "slotchg palette rule": (html.count("a.slotchg"), payload_count("a.slotchg")),
    "search expand rule": (html.count("#draftSearch2:focus"), payload_count("#draftSearch2:focus")),
    "solid-rose marquee leftover": (html.count("letter-spacing:.22em;color:var(--rose)"), 0),
    "2s fade pacing": (html.count("transition:opacity 2s ease,transform 2s ease"), payload_count("transition:opacity 2s ease,transform 2s ease")),
    # ---- seventh wave ----
    "'Play a Season' leftovers": (html.count("Play a Season"), 0),
    "'Season options' leftovers": (html.count("Season options"), 0),
    "'These throw away' leftovers": (html.count("These throw away"), 0),
    "'Current lineup:' leftovers": (html.count("Current lineup:"), 0),
    "'wins added' leftovers": (html.count("wins added"), 0),
    "'Three optional settings' leftovers": (html.count("Three optional settings"), 0),
    "'Why we recommend Auto' leftovers": (html.count("Why we recommend Auto"), 0),
    "'More than anything' leftovers": (html.count("More than anything, this draft"), 0),
    "'Draft Recap' leftovers": (html.count("Draft Recap") + html.count("generateDraftRecap"), 0),
    "old tagline in meta": (html.count("Draft, Season, Playoffs, Super Bowl"), 0),
    "right-aligned dsub": (html.count('class="dsub" style="text-align:right;"'), 1),
    "coach-your-team phrasing": (html.count("Coach your team to the Super Bowl"), 3),
    "group-label parentheses leftovers": (html.count("(QB+RB+WR+TE+OL)") + html.count("(RB1+RB2)") + html.count("(OT+OG+C)") + html.count("(WR+TE)") + html.count("(WR1-3)") + html.count("(TE1+TE2)") + html.count("(OT1+OT2)") + html.count("(OG1+OG2)") + html.count("(OL+RBs)") + html.count("(RB+WR+TE)") + html.count("(DE1+DE2)") + html.count("(DT1+DT2)") + html.count("(DT+Edge)") + html.count("(MIKE+WILL+SAM)") + html.count("(CB1-4)") + html.count("(FS+SS)") + html.count("(CB+S)") + html.count("(DL+LB)") + html.count("(DL+LB+Secondary)"), 0),
    "DETAIL_KEYS offense->defense order": (html.count("['QB','RB','WR','TE','OL','RUN','PASS','OFFENSE','DL','SEC','PRIMCOV','RUND','PASSD','DEFENSE']"), 1),
    "good/bad identity remap": (html.count(":root[data-zpbteam]{ --good:var(--tA2); --bad:var(--tA3); }"), 1),
    "goldTone fix present": (html.count("const goldTone = h=>"), 1),
    "caution screen text": (html.count("Caution: Your current season will be erased"), payload_count("Caution: Your current season will be erased")),
    "return-to-season button": (html.count("Return to the season"), payload_count("Return to the season")),
    "caution fn": (html.count("zpbCaution"), payload_count("zpbCaution")),
    "matchup card component": (html.count("zpb-mu"), payload_count("zpb-mu")),
    "matchup-card old class gone from markup": (html.count('class="matchup-card"'), 0),
    "stars faceoff rows": (1 if "zpb-star-row" in html else 0, 1),
    "schedule tiles": (1 if "zst-tile" in html else 0, 1),
    "rank bars": (1 if "zpb-rkrow" in html else 0, 1),
    "matchup bars": (html.count("zpb-mrow"), payload_count("zpb-mrow")),
    "floaty lineups": (1 if "zpb-lu-row" in html else 0, 1),
    "plan cards": (1 if "zpb-plan-hd" in html else 0, 1),
    "simplified dropdowns": (html.count('class="zpb-dd"'), payload_count('class="zpb-dd"')),
    "start season intro": (1 if "zpb-stageintro" in html else 0, 1),
    "start season font": (1 if "zpb-startbtn" in html else 0, 1),
    "preview strip fn": (html.count("zpbPreviewStripHTML"), payload_count("zpbPreviewStripHTML")),
    "replay fn": (html.count("zpbGameReplay"), payload_count("zpbGameReplay")),
    "replay hooks": (html.count("zpbGameReplay(ug, user)") + html.count("zpbGameReplay(_ug, _u)"), 2),
    "pregame details removed": (html.count("Pregame preview") + html.count("Pregame matchup math"), 0),
    "review narrative collapsed": (html.count("The season in words"), payload_count("The season in words")),
    "lineup name compression": (html.count("zpbFitLineupNames"), payload_count("zpbFitLineupNames")),
    # ---- v8 ----
    "footer element": (html.count('class="zpb-foot"'), payload_count('class="zpb-foot"')),
    "footer hint anchor": (html.count('id="zpbHintGuide"'), payload_count('id="zpbHintGuide"')),
    "footer mark": (html.count("zpb-fmark"), 2),  # v8 css rule + the v11 display:none retire
    "'No picks yet.' gone": (html.count("No picks yet"), 0),
    "'needed' filler gone": (html.count(":'needed'"), 0),
    "'Flexed' badges gone": (html.count(">Flexed</span>") + html.count(">Flexed from "), 0),
    "'Flex (-' priority suffix gone": (html.count("Flex (-"), 0),
    "roster-building paragraph gone": (html.count("On the roster-building side"), 0),
    "ivory disc gone": (html.count("f3e3c6"), 0),
    "teamcol under crest": (html.count("zpb-teamcol"), 7),
    "nxpick span": (html.count("zpb-nxpick"), payload_count("zpb-nxpick")),
    "sort indicator css": (html.count("sort-sel"), payload_count("sort-sel")),
    "fx identity colors": (html.count("FXC()"), payload_count("FXC()")),
    "compact board breakpoint": (html.count("max-width:1120px"), payload_count("max-width:1120px")),
    "home selects nowrap": (html.count("#draftSetup .filters{flex-wrap:nowrap"), payload_count("#draftSetup .filters{flex-wrap:nowrap")),
    "confetti green under identity": (html.count("3ecf8e"), 2),  # the fallback COLORS const only (2: hex + rgb refs)
    # ---- ninth wave ----
    "'Why Auto?' leftovers": (html.count("Why Auto?"), 0),
    "'Setup used' leftovers": (html.count("Setup used"), 0),
    "Personnel header present": (html.count("<th>Personnel</th>"), 3),
    "style table class": (html.count('class="zpb-styletb"'), 2),
    "personnel sort present": (html.count("persOrd(planText(a.o))"), 1),
    "personnel chips": (1 if "zpb-whychips" in html else 0, 1),    "'Bars show the chance' leftovers": (html.count("Bars show the chance"), 0),
    "'pts vs. balanced 11' leftovers": (html.count("pts vs. balanced 11"), 0),
    "'pts vs. auto' present": (html.count("pts vs. auto"), 1),
    "'model · home field' leftovers": (html.count("model · home field"), 0),
    "home field on Guide": (html.count("Home field is worth +1.7"), 1),
    "roster-order matchup math": (html.count("['qb','rb','rec','olPass','olRun','passRush','frontRun','coverage','kicker']"), 2),
    "can-you-go breathing spans": (html.count('class="zpb-cyg"'), 1),
    "can-you-go question mark": (html.count("zpb-cygq"), 5),  # css x2 + dsub + try-again + reduced-motion
    "scouting top/bottom tags": (1 if "zpb-rktop" in html else 0, 1),    "'Simulate Week ${week}' leftovers": (html.count("Simulate Week ${week}"), 0),
    "Play the X primary": (html.count("Play the '+nick("), 1),
    "'Sim Rest of Season' leftovers": (html.count("Sim Rest of Season"), 0),
    "quiet sim-rest secondary": (html.count('"tabbtn zpb-ctasmall" id="simSeasonBtn"'), 2),
    "lineups after key players": (html.count("renderPreviewPanel(myGame, 'regular') + renderLineupComparisonHTML"), 1),
    "user score color class": (1 if "zpb-usscore" in html else 0, 1),    "standings nicknames": (html.count("${lg(r.team)}${nick(r.team)}"), 2),
    "replay redefined": (html.count("function zpbGameReplay(g, focusTeam)"), 2),
    "replay silent flag": (html.count("__zpbSilent"), 5),  # guard, rest set/clear, playoff set/clear
    "replay star": (1 if "zpb-rep-star" in html else 0, 1),    "replay turnovers": (html.count("'TO'"), 2),
    "replay intro": (1 if "zpb-rep-intro" in html else 0, 1),    "replay continue btn": (html.count("zrepGo"), 2),
    "replay never time out": (html.count("setTimeout(()=>{ finish(false); }, t + 700)"), 1),
    "100 report graphical": (1 if "zpb-100hero" in html else 0, 1),    "100 tab in tabs row": (html.count("'100 SEASONS';"), 1),    "rest summary": (1 if "function zpbRestSummary" in html else 0, 1),    "elim auto-complete": (html.count("userPlayoffStatus(u).status === 'eliminated'"), 1),
    "team dropdowns": (1 if "zpb-selwrap" in html else 0, 1),    "team dropdown options": (1 if "zpb-selopt" in html else 0, 1),    "schedule tiles rebuilt": (html.count('class="zst-opp"'), 1),  # dead v7 code, live fn has no zst-opp
    "schedule current shimmer": (1 if "zst-now" in html else 0, 1),    "schedule mine color": (1 if "zst-mine" in html else 0, 1),    "lineup hd row": (1 if "zpb-lu-hd" in html else 0, 1),    "lineup parenthetical gone from live fn": (html.count('renderLineupComparisonHTML = function('), 1),  # live v9 override
    "shimmer class": (1 if "zpb-shm" in html else 0, 1),
    "player cards": (1 if "zpb-pcards" in html else 0, 1),    "pick analysis visual": (1 if "zpb-pvrow" in html else 0, 1),    "'Replaying the draft' gone from view": (html.count("Replaying the draft"), 1),  # dead base code only, never rendered
    "key players rebuilt": (1 if "zpb-kprow" in html else 0, 1),    "game ball text gone from rendered view": (html.count("renderKeyPlayersHTML = function(g){"), 1),  # live v9 override
    "why tiles": (1 if "zpb-whygrid" in html else 0, 1),    "season glance": (1 if "zpb-glance" in html else 0, 1),    "strengths tiles": (1 if "zpb-strengths" in html else 0, 1),    "try again panel": (1 if "zpb-tryagain" in html else 0, 1),    "advanced merged": (html.count("advancedStatsHTML = function(){ return ''; };"), 1),
    "new draft exit": (1 if "Start A New Draft" in html else 0, 1),    "board height": (html.count("min-height:56vh"), 1),
    "full-bleed bar": (html.count("width:100vw;margin-left:calc(50% - 50vw)"), 1),
    "flex text smaller": (html.count("#draftCards .zpb-trow"), 1),
    "cardify": (html.count("function zpbCardify"), 1),
    "360 drips": (html.count("--dr:150deg"), 1),
    # ---- tenth wave ----
    "'see guide for details' gone": (html.count("see guide for details"), 0),
    "weights explainer gone": (html.count("scaled so the biggest spot"), 0),
    "badge emojis gone": (html.count("\U0001F3C3") + html.count("\U0001F6E1") + html.count("\U0001F6AB"), 0),
    "pager gone": (html.count("pgPrev") + html.count("pgNext"), 0),
    "'On your current weights' gone": (html.count("On your current weights"), 0),
    "'Drafting as' gone": (html.count("Drafting as"), 0),
    "'Draft Complete' gone": (html.count("Draft Complete"), 0),
    "NEW DRAFT present": (html.count(">NEW DRAFT<"), 1),
    "100 SEASONS present": (html.count("100 SEASONS"), 2),
    "'Run 100' gone": (html.count("Run 100"), 0),
    "'100-Season Report' gone": (html.count("100-Season Report"), 0),
    "sim tab gone": (html.count("resultsSimBtn"), 0),
    "Type column gone": (html.count("<th>Type</th>"), 0),
    "Sort labels one word": (html.count(">Sort: "), 0),
    "Table/Cards segmented": (html.count('id="draftViewSeg"'), 1),
    "guide intro panel gone": (html.count("Short reference sections"), 0),
    "Glossary present": (html.count("Glossary"), 1),
    "positions-ranked graphic": (html.count("zpbPosRankHTML"), 2),
    "cumulative series graphic": (html.count("zpbSeriesHTML"), 2),
    "star-wars fading blocks": (1 if "zpb-sw-in" in html else 0, 1),
    "personnel boxes": (html.count("zpb-persbox"), 6),
    "package viz": (html.count("zpbPkgVizHTML"), 3),
    "'What it means' gone": (html.count("What it means"), 0),
    "'What each style means' stripped": (html.count("What each style means</h5>"), 0),
    "style lists fn body only": (html.count("Offensive styles</h5>"), 1),
    "built-in cost negative": (html.count("−0.2 to −0.5 points a game"), 1),
    "2-Pt Conversions full word": (html.count("2-Pt Conversions"), 7),
    "'2-Pt Convs' gone": (html.count("2-Pt Convs"), 0),
    "philosophy never locks": (html.count(".scriptLocked = false"), 2),
    "philosophy selects never disabled": (html.count("S.scriptLocked?'disabled'"), 0),
    "KR label present": (html.count('data-zslot="KR"'), 1),
    "PR wired": (html.count("zpbWireReturners"), 3),
    "wins-of-optimal card": (html.count("zpb-optwins"), 4),
    "selected bubbles": (html.count("zpb-selbubble"), 6),
    "base toggle hosts": (html.count("zpbBaseToggleHost"), 5),
    "FB in roster slots": (html.count("'TE2','FB','OT1'") + html.count("'RB1','RB2','FB'") + html.count("K','P']"), 6),
    "punter slot present": (html.count("P:['P']"), 1),
    "OLB_FLEX present": (html.count("OLB_FLEX"), 3),
    "QB flex RB/WR": (html.count("QB:{RB:6, WR:6}"), 1),
    "K<->P free": (html.count("K:{P:0}, P:{K:0}"), 1),
    "3-4 spec adjust fn": (html.count("zpbAdjSpec"), 2),
    "hover full names": (html.count("ZPB_FULL"), 3),
    "cinematic fn": (html.count("zpbMaybeFinishCine"), 3),
    "glimmer under start season": (html.count("zpb-cygline"), 4),
    "cmp lineup shimmer": (html.count("val>=90?'zpb-shm'"), 2),
    "strongest/shakiest cards": (html.count("zpb-optcard\"><b>Strongest"), 1),
    "flex foot": (html.count("zpb-flexfoot"), 4),
    "v10 payloads": (html.count("zpb-swgroup"), 4),
    # ---- eleventh wave ----
    "theme toggle not pink": (html.count("#themeToggleBtn{color:var(--rose);}"), 0),
    "footer nav caps": (html.count(">SIMULATOR<") + html.count(">MADDEN RANKINGS<") + html.count(">PLAYER BROWSER<")
                        + html.count(">POSITION RANKINGS<") + html.count(">TEAM COMPARISON<") + html.count(">GUIDE<"), 7),  # TEAM COMPARISON also names the results tab
    "footer nav at bottom": (html.count("zpb-footnav"), 1),
    "sort arrows gone": (html.count("sort-sel[data-dir"), 0),
    "visible legacy blues gone": (html.count("#6aa6ff") - 1, 0),  # the one survivor is the dead v23 stepper token
    "flo neutral-hue fix": (html.count("c.l<0.18 || c.s<0.15"), 1),
    "pick dropdown enhanced": (html.count("'draftSlotSelect', 'draftPickNumberSelect', 'teamFilter'"), 1),
    "team filter state": (html.count("teamFilter:null"), 1),
    "team-icon filter wiring": (html.count("zpb-tfilter"), 5),
    "on-the-clock line gone": (html.count("On the clock \u2014 Round"), 0),
    "priority panel toggle": (html.count("if(_pp) _pp.style.display"), 1),
    "fade note": (html.count("zpb-fadenote"), 3),
    "lineups winner shimmer": (html.count("'zpb-lu-win zpb-shm'"), 2),
    "receiving corps label": (html.count("label:'Receiving corps'"), 1),
    "run blocking label": (html.count("label:'Run blocking'"), 1),
    "identity QB-first order": (html.count("['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker']"), 2),
    "matchup channel rows gone": (html.count("Ground game"), 0),
    "matchup right integers": (html.count("zpb-mnum"), 2),
    "SCHEDULE heading": (html.count(">SCHEDULE<"), 2),
    "STANDINGS heading": (html.count(">STANDINGS</h4>"), 1),
    "STATS section": (html.count(">Stats</div>"), 1),
    "RUN+ chips": (html.count("'RUN+'"), 1),
    "season ops button": (html.count("id=\"seasonOpsBtn\""), 1),
    "Start Season renamed": (html.count(">Start Season<"), 0),
    "ranks fade block": (html.count("zpb-ranks-fade"), 8),
    "entry suffixes gone": (html.count("\u2014 Fantasy Draft") + html.count("\u2014 Actual Roster"), 0),
    "duel blocks": (html.count("zpbDuelHTML"), 2),
    "replay TD badge": (html.count("zrl-td"), 1),
    "replay FG badge": (html.count(">FG</span>"), 1),
    "turnover detail": (html.count(" strips "), 1),
    "spaced final score": (html.count("FINAL \u00b7 ' + as + ' - ' + hs"), 1),
    "turnovers footer gone": (html.count("Turnovers \u00b7 "), 0),
    "try again to go": (html.count("Try again to go"), 1),
    "replay panel +50%": (html.count("width:min(840px,96vw)"), 1),
}
ok = True
for k, (got, want) in checks.items():
    mark = "ok" if got == want else "MISMATCH"
    if got != want:
        ok = False
    print(f"[chk] {k}: {got} (expected {want}) {mark}")
if os.environ.get("ZPB_DEBUG_WRITE"):
    open(os.environ["ZPB_DEBUG_WRITE"], "w", encoding="utf-8").write(html)
    print(f"[dbg] wrote debug copy to {os.environ['ZPB_DEBUG_WRITE']}")
if not ok:
    sys.exit("ABORT: post-check mismatch")

# ---- v8: green census under takeover - no fixed green may leak into season UI ----
_green_hits = []
for _g in ("#3ecf8e", "#4c9a67", "#72c18e", "rgba(62,207,142", "rgba(76,154,103"):
    _c = html.count(_g)
    if _c:
        _green_hits.append(f"{_g} x{_c}")
print(f"[chk] fixed green hexes present (theme defaults + fx fallback only): {_green_hits if _green_hits else 'none'}")

inv_after = {k: html.count(k) for k in INVARIANTS}
drift = {k: (inv_before[k], inv_after[k]) for k in INVARIANTS if inv_before[k] != inv_after[k]}
# Owner tenth wave explicitly extends the roster: FB + Punter join the draft
# (NATURAL_SLOT_MAP gains P/FB entries), and the 3-4 mode consults natural
# slots in isNaturalSlot. Everything else must stay byte-identical.
ALLOWED_DRIFT = {"NATURAL_SLOT_MAP": {(3, 5)}}
bad = {k: v for k, v in drift.items() if v not in ALLOWED_DRIFT.get(k, set())}
if bad:
    sys.exit(f"ABORT: protected invariant drift: {bad}")
if drift:
    print(f"[ok] invariant drift (Owner-directed only): {drift}")
print(f"[ok] protected invariants unchanged across {len(INVARIANTS)} markers")

# sanity: the core JS must be valid enough to parse (balanced braces in payloads)
for name, js in (("ZPB_CORE_JS", ZPB_CORE_JS), ("NEW_RENDER", NEW_RENDER)):
    if js.count("{") != js.count("}"):
        sys.exit(f"ABORT: unbalanced braces in {name}: {js.count('{')} vs {js.count('}')}")
print("[ok] payload brace balance")

# ---- v7: JS syntax gate - every inline <script> must parse (node --check) ----
import subprocess as _sp, tempfile as _tfm
_scripts = _re.findall(r'<script>(.*?)</script>', html, _re.S)
_badjs = 0
for _n, _js in enumerate(_scripts):
    with _tfm.NamedTemporaryFile('w', suffix='.js', delete=False) as _tf:
        _tf.write(_js); _tfp = _tf.name
    _r = _sp.run(['node', '--check', _tfp], capture_output=True, text=True)
    os.unlink(_tfp)
    if _r.returncode != 0:
        _badjs += 1
        print(f"[js] script #{_n} FAILED: {_r.stderr[:500]}")
if _badjs:
    sys.exit(f"ABORT: {_badjs} inline script(s) fail node --check")
print(f"[ok] {len(_scripts)} inline scripts parse clean (node --check)")

# ---- v8 prototype mode: badge the page as logo package B ----
if LOGO_SET == "B":
    if html.count("<title>20-0</title>") != 1 or html.count("<body>") != 1:
        sys.exit("ABORT: [v8-B] title/body anchors drifted")
    html = html.replace("<title>20-0</title>", "<title>20-0 \u00b7 logo package B</title>")
    html = html.replace("<body>", "<body data-zpblogopkg=\"B\">")
    print("[ok] [v8-B] prototype badge applied (title + body attr)")

open(OUT, "w", encoding="utf-8").write(html)
out_sha = hashlib.sha256(html.encode("utf-8")).hexdigest()
print(f"[done] wrote {OUT}")
print(f"[done] size {len(html.encode('utf-8'))} bytes | sha256 {out_sha}")

