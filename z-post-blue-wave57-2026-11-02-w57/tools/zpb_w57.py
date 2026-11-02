#!/usr/bin/env python3
# zpb_w57.py — the Owner's round-57. Asserted exact replacements only; re-runs clean from the pristine w56 baseline.
# Baseline: my w56 bytes (md5 42af55f794180910f1f9086fe0c68a3d).
import hashlib, sys

SRC = '/home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html'
BASE = '/home/z/my-project/w57/base/Football-Sim-Z-post-blue-w56.html'
import shutil
shutil.copyfile(BASE, SRC)
html = open(SRC, encoding='utf-8').read()
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

# ---------- R1 · the phone draft card reads in TWO lines again (the Owner's round-57 shape):
# line 1 = name + the Draft button (FILLS directly under the button), line 2 = pos · team · ovr ·
# wins · priority · gone spread out. The w56 three-line block is superseded (this block wins the
# cascade); the labels stay (the w56 label law stands). ----------
old = """@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) #draftTable2 td.dc-ovr,:root:not([data-theme="dark"]) #draftTable2 td[data-label="Pos"],
 :root:not([data-theme="dark"]) #draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
}
</style>"""
new = """@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) #draftTable2 td.dc-ovr,:root:not([data-theme="dark"]) #draftTable2 td[data-label="Pos"],
 :root:not([data-theme="dark"]) #draftTable2 td[data-label="Team"]{color:var(--nm,var(--tn,var(--text)));}
}
</style>
<style id="zpb-w57-css">
/* ================= Z-POST-BLUE W57 (the Owner's round-57) =================
   The draft card returns to TWO lines — name · Draft on top, the six stats spread on the
   bottom (FILLS sits right under the button) — the priority number wears the gone/wins ink,
   the pregame marquee pins to the top of the phone stage so the key players never cover the
   logos, and the badge cascade runs 0.25s faster. Desktop untouched. */

/* 1 · THE PHONE DRAFT CARD — two lines, labeled, in the Owner's order:
   pos · team · ovr · wins · priority · gone, with FILLS right under the Draft button. */
@media (max-width:760px){
 #draftTable2 td[data-label]::before{display:block;line-height:1.05;margin-right:0;}
 #draftTable2 td.dc-ovr::before{display:block;margin-right:0;}
 #draftTable2 tr{row-gap:2px;padding:4px 8px;}
 #draftTable2 td.dc-name{grid-column:1/9;grid-row:1;}
 #draftTable2 td.dc-btn{grid-column:9/13;grid-row:1;}
 #draftTable2 td[data-label="Pos"]{grid-column:1/2;grid-row:2;}
 #draftTable2 td[data-label="Team"]{grid-column:2/4;grid-row:2;}
 #draftTable2 td.dc-ovr{grid-column:4/5;grid-row:2;font-size:.68rem;padding:0 !important;background:none !important;border-radius:0;} /* w57: the w55 chip wash retires from the plain bottom-line stat */
 #draftTable2 td.dc-wins{grid-column:5/6;grid-row:2;}
 #draftTable2 td.dc-pri{grid-column:6/8;grid-row:2;}
 #draftTable2 td.dc-gone{grid-column:8/10;grid-row:2;text-align:left !important;} /* w57: 2 cols — the GONE label must fit (1 col clipped it to GONI) */
 #draftTable2 td.dc-fills{grid-column:10/13;grid-row:2;text-align:right !important;}
 #draftTable2 td:nth-child(2),#draftTable2 td:nth-child(3),#draftTable2 td.dc-wins,#draftTable2 td.dc-pri,#draftTable2 td.dc-gone,#draftTable2 td.dc-fills{font-size:.68rem;}
 #draftTable2 td .zpb-ovrchips{display:none;} /* the team chips retire from the phone OVR cell — the Team cell carries the crest */
}

/* 2 · THE PRIORITY NUMBER WEARS THE GONE/WINS INK — the accent2 family, the exact same
   declarations the gone value carries, in every theme state (the w56 gold retires on the card). */
@media (max-width:760px){
 #draftTable2 td.dc-pri{color:var(--accent2,var(--accent));}
 :root[data-theme="dark"] #draftTable2 td.dc-pri,:root:not([data-theme="light"]) #draftTable2 td.dc-pri{color:var(--accent2,var(--accent));}
 :root:not([data-theme="dark"]) #draftTable2 td.dc-pri,:root[data-theme="light"] #draftTable2 td.dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));} /* w57: the gone/wins mixes deepen to the same bar - pri matches gone exactly */
}
@media (max-width:760px) and (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) #draftTable2 td.dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));}
}
@media (max-width:760px) and (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) #draftTable2 td.dc-pri{color:var(--accent2,var(--accent));}
}

/* 3 · THE PREGAME MARQUEE PINS TO THE TOP on a phone — the title · logos · sub block sits at
   the top of the stage and the key-player pairs fan out BELOW it, so the first pair can never
   land on the logos again (the w52 Super Bowl logos shrink to fit the same law). */
@media (max-width:600px){
 .zpb-rep-intro{justify-content:flex-start;padding-top:22px;gap:9px;}
 .zpb-intro-logos{gap:12px;}
 .zpb-replay:not(.zpb-sb) .zpb-intro-logos img{width:50px;height:50px;}
 .zpb-replay.zpb-sb .zpb-intro{padding-top:56px;} /* w57: the rising cup keeps the sky above the marquee */
 .zpb-replay.zpb-sb .zpb-intro-logos img{width:54px;height:54px;}
 .zpb-replay.zpb-sb .zpb-intro-vs{font-size:1.5rem;}
 .zpb-replay.zpb-sb .zpb-intro-title{font-size:1.3rem;} /* w57: the SB marquee tightens so the fan clears it with room for the fade drift */
 .zpb-replay.zpb-sb .zpb-intro-cup{top:2%;font-size:2.1rem;}
 .zpb-replay.zpb-sb .zpb-intro-banner{bottom:2%;} /* w57: the landed banner clears the last fan pair (the entrance slides it up 12px) */
}
</style>"""
rep(old, new, 1, 'R1/R2/R4c w57 css block')

# ---------- R4 · the pregame star lanes remap on narrow (the JS half of the marquee fix) ----------
old = "   const narrow = (window.innerWidth||1280) <= 600;\n"
new = ("   const narrow = (window.innerWidth||1280) <= 600;\n"
       "   const syMap0 = {50:38, 27:60, 78:82, 34:40, 66:68}; // w57 (Owner): on a phone the marquee pins to the top and the pairs fan out BELOW it — the first pair never lands on the logos\n"
       "   const syMap = {}; for (const k in syMap0) syMap[k] = syMap0[k] + (isSB ? 5 : 0); // w57: the Super Bowl marquee wears the bigger title - its fan sits a touch deeper\n")
rep(old, new, 1, 'R4 sy map (narrow fan)')

old = "    slots.push(Object.assign({}, awayStars[st[0]], {sx:laneA, sy:st[1], beat:beat, side:' zpb-st-side', f:fitF(awayStars[st[0]])}));"
new = "    slots.push(Object.assign({}, awayStars[st[0]], {sx:laneA, sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side', f:fitF(awayStars[st[0]])})); // w57: the narrow fan (syMap) — desktop keeps the w39 lanes"
rep(old, new, 1, 'R4 away star sy remap')

old = "    slots.push(Object.assign({}, homeStars[st[0]], {sx:laneH, sy:st[1], beat:beat, side:' zpb-st-side-r', f:fitF(homeStars[st[0]])}));"
new = "    slots.push(Object.assign({}, homeStars[st[0]], {sx:laneH, sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side-r', f:fitF(homeStars[st[0]])})); // w57: the narrow fan (syMap) — desktop keeps the w39 lanes"
rep(old, new, 1, 'R4 home star sy remap')

# ---------- R5 · the badge cascade runs 0.25s faster — the season-in-badges rail and the unit
# report card both advance a quarter second; the veil that follows the rail keeps pace ----------
old = "animation:zpbsbeat .7s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}"
new = "animation:zpbsbeat .7s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s - .25s);} /* w57 (Owner): the cascade runs 0.25s faster — the cut still leads it */"
rep(old, new, 1, 'R5 badge delay -0.25s')
old = "animation:zpbsbeat .8s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}"
new = "animation:zpbsbeat .8s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s - .25s);} /* w57 (Owner): the cascade runs 0.25s faster — the cut still leads it */"
rep(old, new, 2, 'R5 star-card + report-card delay -0.25s')
old = " else setTimeout(show, Math.min(total*1000 + 1200, 90000));"
new = " else setTimeout(show, Math.min(total*1000 + 650, 90000)); // w57 (Owner): the veil follows the faster cascade — the last badge lands at (total-1)s+0.45, +1.2s of air"
rep(old, new, 1, 'R5 veil follows the cascade')

# ---------- R6pre2 - the priority matches gone/wins on the DESKTOP board too (the Owner's law
# was framed on the cards; the same mix clears the audit's 15 desktop teams at 3.9-4.4) ----------
old = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-pri,:root[data-theme=\"light\"] #draftTable2 td.dc-pri{color:var(--gold3,#a8791c);}"
new = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-pri,:root[data-theme=\"light\"] #draftTable2 td.dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));} /* w57 (Owner): the priority wears the gone/wins ink everywhere, not just the card - the exact gone mix */"
rep(old, new, 1, 'R6pre2 desktop pri ink')

# ---------- R6pre - the w39 light value mixes deepen to the same bar (the Owner's contrast gate):
# wins 78/22 and gone 62/38 toward --text measured 3.99-4.43 on the washed panels - the mixes
# now target the deeper neutral cream and hold 4.5+ for every franchise, hue untouched ----------
old = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-gone,:root[data-theme=\"light\"] #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,#cf8a60) 62%,var(--text));}"
new = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-gone,:root[data-theme=\"light\"] #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));} /* w57: deepens 4.4 -> 5.3 */"
rep(old, new, 1, 'R6pre gone light mix')
old = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-wins,:root[data-theme=\"light\"] #draftTable2 td.dc-wins{color:color-mix(in srgb,var(--good,#4c9a67) 78%,var(--text));}"
new = ":root:not([data-theme=\"dark\"]) #draftTable2 td.dc-wins,:root[data-theme=\"light\"] #draftTable2 td.dc-wins{color:color-mix(in srgb,var(--good,#4c9a67) 65%,var(--zcream,#53382b));} /* w57: deepens 4.0 -> 4.7 */"
rep(old, new, 1, 'R6pre wins light mix')

# ---------- R6 - THE CONTRAST PASS (the Owner's round-57 quality gate) ----------
old = """ .zpb-replay.zpb-sb .zpb-intro-cup{top:2%;font-size:2.1rem;}
 .zpb-replay.zpb-sb .zpb-intro-banner{bottom:2%;} /* w57: the landed banner clears the last fan pair (the entrance slides it up 12px) */
}
</style>"""
new = """ .zpb-replay.zpb-sb .zpb-intro-cup{top:2%;font-size:2.1rem;}
 .zpb-replay.zpb-sb .zpb-intro-banner{bottom:2%;} /* w57: the landed banner clears the last fan pair (the entrance slides it up 12px) */
}

/* 4 - THE CONTRAST PASS - the audit's failing pairs, light and dark, every team. */

/* 4a - the raw --tA2 consumers read the LIGHT accent in dark today (the rc-title measured 1.1:1 -
   invisible); the takeover's own dark accents already ride tA2d - the raw var joins them */
:root[data-theme="dark"][data-zpbteam]{--tA2:var(--tA2d) !important;} /* !important: the pack paints --tA2 inline on the root */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"])[data-zpbteam]{--tA2:var(--tA2d) !important;} }

/* 4b - the UNIT REPORT CARD title + grade wear the halfway ink in light, gold2 in dark */
.zpb-rc-title{color:var(--tTxM,var(--tA2,var(--gold3)));}
:root[data-theme="dark"] .zpb-rc-title,:root:not([data-theme="light"]) .zpb-rc-title{color:var(--gold2,#e8c87e);}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-rc-title{color:var(--gold2,#e8c87e);} }
:root[data-theme="light"] .zpb-rc-grade,:root:not([data-theme="dark"]) .zpb-rc-grade{color:var(--tTxM,var(--tA2,var(--gold3)));}
:root[data-theme="dark"] .zpb-rc-grade,:root:not([data-theme="light"]) .zpb-rc-grade{color:var(--tTxMd,var(--tA2d,var(--gold3)));} /* w57: the tile's own row vars paint --tA2 inline - the dark grade rides tTxMd above them */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-rc-grade{color:var(--tTxMd,var(--tA2d,var(--gold3)));} }
@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) .zpb-rc-grade{color:var(--tTxM,var(--tA2,var(--gold3)));} }

/* 4c - the pick-grade slot chip's ink - ongold resolves cream for dark-accent franchises (1.6:1) */
.zpb-pg-slot{color:#2c1e0c;}

/* 4d - the DRAFT button joins the halfway-rose law it already carries on the start button */
#draftTable2 td.dc-btn .resetbtn{color:var(--tTxM,var(--tA2,var(--accent2,var(--accent))));}
:root[data-theme="dark"] #draftTable2 td.dc-btn .resetbtn,:root:not([data-theme="light"]) #draftTable2 td.dc-btn .resetbtn{color:var(--tTxMd,var(--tA2d,var(--accent2,var(--accent))));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) #draftTable2 td.dc-btn .resetbtn{color:var(--tTxMd,var(--tA2d,var(--accent2,var(--accent))));} }

/* 4e - the card's colored values (wins . priority . gone) lift to the halfway mix in dark */
:root[data-theme="dark"] #draftTable2 td.dc-wins,:root:not([data-theme="light"]) #draftTable2 td.dc-wins,
:root[data-theme="dark"] #draftTable2 td.dc-pri,:root:not([data-theme="light"]) #draftTable2 td.dc-pri,
:root[data-theme="dark"] #draftTable2 td.dc-gone,:root:not([data-theme="light"]) #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,var(--accent)) 50%,var(--text));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) #draftTable2 td.dc-wins,:root:not([data-theme="light"]) #draftTable2 td.dc-pri,:root:not([data-theme="light"]) #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,var(--accent)) 50%,var(--text));} }

/* 4f - the FILLS link rides the halfway ink too */
#draftTable2 a.slotchg{color:var(--tTxM,var(--tA2,var(--selfg)));}
:root[data-theme="dark"] #draftTable2 a.slotchg,:root:not([data-theme="light"]) #draftTable2 a.slotchg{color:var(--tTxMd,var(--tA2d,var(--selfg)));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) #draftTable2 a.slotchg{color:var(--tTxMd,var(--tA2d,var(--selfg)));} }

/* 4g - the honor title (FIRST-TEAM ALL-PRO) - the halfway gold mix in light, gold2 in dark */
.zpb-shonor-t{color:color-mix(in srgb,var(--gold3,#9a6b1f) 45%,var(--text));}
:root[data-theme="dark"] .zpb-shonor-t,:root:not([data-theme="light"]) .zpb-shonor-t{color:var(--gold2,#e8c87e);}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-shonor-t{color:var(--gold2,#e8c87e);} }

/* 4i - the anchor's muted line rides the theme's own sub ink (the tSud/anchId pair dipped) */
.zpb-anch .narr{color:color-mix(in srgb,var(--anchI,var(--sub,#6b4634)) 72%,var(--zcream,#53382b));} /* w57: the light anchor mixes its own ink toward the deep cream */
:root[data-theme="dark"] .zpb-anch .narr,:root:not([data-theme="light"]) .zpb-anch .narr{color:color-mix(in srgb,var(--anchId,var(--sub,#c99cae)) 72%,var(--zcream,#53382b));} /* w57: the dark anchor mixes its lighter ink toward the light cream */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-anch .narr{color:color-mix(in srgb,var(--anchId,var(--sub,#c99cae)) 72%,var(--zcream,#53382b));} }

/* 4h - the shimmer's light sweep deepens to the burnished bronze pair; the dark sweep untouched */
:root[data-theme="light"] .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;background-size:230% 100% !important;} /* w57: fixed bronze - the pale zshim default dragged the mean to 2.7 */
@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;background-size:230% 100% !important;} }
</style>"""
rep(old, new, 1, 'R6 contrast css block')

# ---------- R6i - the muted ink deepens in light ----------
old = " --text:#8e5566; --sub:#a2687d; --rosehair:#e6c3d2;\n --zcream:#53382b;"
new = " --text:#8e5566; --sub:#885261; --rosehair:#e6c3d2; /* w57 (Owner): the muted ink deepens one step - 3.7:1 to 5.0:1 on the panels, the same rose family */\n --zcream:#53382b;"
rep(old, new, 1, 'R6i light sub (default rule)')
old = ' :root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; --text:#8e5566; --sub:#a2687d; --rosehair:#e6c3d2; --zcream:#53382b; }'
new = ' :root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; --text:#8e5566; --sub:#885261; --rosehair:#e6c3d2; --zcream:#53382b; } /* w57: the muted ink deepens with it */'
rep(old, new, 1, 'R6i light sub (auto-light rule)')
old = " --text:var(--tTx); --sub:var(--tSu); --border:var(--tHr); --rosehair:var(--tHr);"
new = " --text:var(--tTx); --sub:color-mix(in srgb,var(--tSu) 55%,var(--zcream,#53382b)); --border:var(--tHr); --rosehair:var(--tHr); /* w57 (Owner): the team soft muted tone deepens toward the neutral cream */"
rep(old, new, 1, 'R6i takeover sub deepens')

# ---------- R6j - the badge values grow to the large-text floor ----------
old = ".zpb-sbadge b{font-size:1.06rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;}"
new = ".zpb-sbadge b{font-size:1.17rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;} /* w57 (Owner): 18.7px bold - the large-text bar; the ink he loves stays */"
rep(old, new, 1, 'R6j badge value size')

# ---------- R6k - the pick-grade letter badge grows with it ----------
old = ".zpb-pg-grade{position:absolute;top:7px;right:9px;font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.02rem;"
new = ".zpb-pg-grade{position:absolute;top:7px;right:9px;font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.17rem; /* w57 (Owner): the large-text bar */"
rep(old, new, 1, 'R6k pg grade size')

open(SRC, 'w', encoding='utf-8').write(html)
print('written:', len(html), 'bytes (delta %+d)' % (len(html)-n0))

# ---------- post-checks ----------
checks = [
 ('w57 css present', 'zpb-w57-css' in html),
 ('two-line card: name row 1', '#draftTable2 td.dc-name{grid-column:1/9;grid-row:1;}' in html),
 ('two-line card: button row 1', '#draftTable2 td.dc-btn{grid-column:9/13;grid-row:1;}' in html),
 ('two-line card: pos first', '#draftTable2 td[data-label="Pos"]{grid-column:1/2;grid-row:2;}' in html),
 ('two-line card: ovr fourth', '#draftTable2 td.dc-ovr{grid-column:4/5;grid-row:2;' in html),
 ('two-line card: pri sixth', '#draftTable2 td.dc-pri{grid-column:6/8;grid-row:2;}' in html),
 ('two-line card: gone last', '#draftTable2 td.dc-gone{grid-column:8/10;grid-row:2;' in html),
 ('fills under the button', '#draftTable2 td.dc-fills{grid-column:10/13;grid-row:2;text-align:right !important;}' in html),
 ('ovr label back to block', '#draftTable2 td.dc-ovr::before{display:block;margin-right:0;}' in html),
 ('ovr chips retire on phone', '#draftTable2 td .zpb-ovrchips{display:none;}' in html),
 ('pri ink dark = accent2', ':root[data-theme="dark"] #draftTable2 td.dc-pri,:root:not([data-theme="light"]) #draftTable2 td.dc-pri{color:var(--accent2,var(--accent));}' in html),
 ('pri ink light = gone mix (45 zcream, card + desktop)', ':root:not([data-theme="dark"]) #draftTable2 td.dc-pri,:root[data-theme="light"] #draftTable2 td.dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));}' in html),
 ('pri light leftover 62% retired', '62%,var(--text));}\n}\n\n/* 3 · THE PREGAME' not in html and 'dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 62%,var(--text));}' not in html),
 ('marquee pins top', '.zpb-rep-intro{justify-content:flex-start;padding-top:22px;gap:9px;}' in html),
 ('sb logos shrink on phone (54px final)', '.zpb-replay.zpb-sb .zpb-intro-logos img{width:54px;height:54px;}' in html),
 ('sy map present', 'const syMap0 = {50:38, 27:60, 78:82, 34:40, 66:68};' in html),
 ('away fan remap', "sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side'" in html),
 ('home fan remap', "sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side-r'" in html),
 ('badge delay -0.25 (sb7)', 'forwards;animation-delay:calc(var(--beat,0)*1s - .25s);} /* w57 (Owner): the cascade runs 0.25s faster — the cut still leads it */' in html),
 ('delay count = 3', html.count('calc(var(--beat,0)*1s - .25s)') == 3),
 ('veil follows cascade', 'Math.min(total*1000 + 650, 90000)' in html),
 ('restov pace untouched', 'animation-delay:calc(var(--beat,0)*.9s);}' in html),
 ('w55 block intact', 'zpb-w55-css' in html),
 ('w56 block intact', 'zpb-w56-css' in html),
 ('w56 dime guard intact', "zst = d ? ((typeof zpbNeutralUserRowVars==='function')" in html),
 ('contrast 4a tA2 dark', ':root[data-theme="dark"][data-zpbteam]{--tA2:var(--tA2d) !important;}' in html),
 ('contrast 4b rc-title dark gold', ':root[data-theme="dark"] .zpb-rc-title,:root:not([data-theme="light"]) .zpb-rc-title{color:var(--gold2,#e8c87e);}' in html),
 ('contrast 4c slot ink', '.zpb-pg-slot{color:#2c1e0c;}' in html),
 ('contrast 4d button rose', '#draftTable2 td.dc-btn .resetbtn{color:var(--tTxM,var(--tA2,var(--accent2,var(--accent))));}' in html),
 ('contrast 4e dark value mix', 'td.dc-gone{color:color-mix(in srgb,var(--accent2,var(--accent)) 50%,var(--text));}' in html),
 ('contrast 4f slotchg ink', '#draftTable2 a.slotchg{color:var(--tTxM,var(--tA2,var(--selfg)));}' in html),
 ('contrast 4g honor title', '.zpb-shonor-t{color:color-mix(in srgb,var(--gold3,#9a6b1f) 45%,var(--text));}' in html),
 ('contrast 4h light shimmer bronze', ':root[data-theme="light"] .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%' in html),
 ('contrast sub deepens', '--sub:#885261' in html),
 ('contrast takeover sub mix', '--sub:color-mix(in srgb,var(--tSu) 55%,var(--zcream,#53382b))' in html),
 ('contrast badge size', 'font-size:1.17rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;}' in html),
 ('contrast pg grade size', "font-weight:900;font-size:1.17rem; /* w57 (Owner): the large-text bar */" in html),
 ('ovr chip retired phone', 'background:none !important;border-radius:0;} /* w57: the w55 chip wash retires' in html),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks: print(('ok   ' if okc else 'FAIL ') + n)
if bad: sys.exit(1)
print('zpb_w57: all replacements + post-checks passed')
