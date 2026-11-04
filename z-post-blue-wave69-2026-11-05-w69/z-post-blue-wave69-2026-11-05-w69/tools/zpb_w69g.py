#!/usr/bin/env python3
"""w69 chain step 7 — the probe-and-battery round:
(a) UI 6: the COTY crest moves OUT of the name <b> (the w60 name ladder owns the b's
    content and wiped the crest — data-nmfull rebuild) — it rides as a sibling after the
    name, crest-first order preserved.
(b) UI 1: the sweep's glint stop softens to an 82/18 mix of --tOn with --tOn2 — the stop
    stays near the readable candidate on every team's gradient (the battery caught the
    raw --tOn2 stop reading 2.52:1 on the Steelers' gold)."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = '8fba2f6c15bc2d9f9995abbe583a6630'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-6 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# (a) the aw() gains the crest sibling
rep("""  const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey)=>'<div class="zpb-pcard zpb-awcard zpb-awgold'+(star?' zpb-mygold':'')+'" style="'+stv(team||'')+'">' // W68 (Owner): the user's award winners wear the golden border AND the glow""",
    """  const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey, crest)=>'<div class="zpb-pcard zpb-awcard zpb-awgold'+(star?' zpb-mygold':'')+'" style="'+stv(team||'')+'">' // W68 (Owner): the user's award winners wear the golden border AND the glow""",
    'aw signature crest')

rep("""   + '<b class="zpb-gname '+((rec&&rec.ovr!=null)?(rec.ovr>=90?'zpb-shm':(rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+name+'</b>' // W69 (Owner, UI 3): the card name rides the TIER LAW from the winner's own OVR - 90+ shimmers, 85+ bold, the rest the neutral 0.50 ink; the AP1-gold overlay retires from the cards (the chips keep it; the coach's YOU keeps the w66 shimmer; the w68 glow stays on the card)""",
    """   + '<b class="zpb-gname '+((rec&&rec.ovr!=null)?(rec.ovr>=90?'zpb-shm':(rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+name+'</b>' // W69 (Owner, UI 3): the card name rides the TIER LAW from the winner's own OVR - 90+ shimmers, 85+ bold, the rest the neutral 0.50 ink; the AP1-gold overlay retires from the cards (the chips keep it; the coach's YOU keeps the w66 shimmer; the w68 glow stays on the card)
   + (crest?' <i class="narr zpb-aplog" style="margin-left:4px;">'+crest+'</i>':'') // W69 (Owner, UI 6): the crest rides BESIDE the name - the w60 ladder owns the b's content, so the crest can never live inside it""",
    'aw crest sibling')

rep("""   : aw(a.title, (a.coach? (a.team===user?'YOU':a.coach)+' \\u00b7 ':'')+'<i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(a.team):(a.team||''))+'</i>', a.team, '', _why, a.team===user); }).join(''); // W69 (Owner, UI 6): the crest replaces the written team name on the coach line // w52 (Owner, M3): the coach's name reads YOU when it is his team""",
    """   : aw(a.title, (a.coach? (a.team===user?'YOU':a.coach):''), a.team, '', _why, a.team===user, null, false, null, ((typeof zpbTeamLogo==='function')?zpbTeamLogo(a.team):(a.team||''))); }).join(''); // W69 (Owner, UI 6): the crest replaces the written team name on the coach line, beside the name (the ladder owns the b) // w52 (Owner, M3): the coach's name reads YOU when it is his team""",
    'coty crest sibling call')

# (b) the glint stop softens (three gradient lines)
rep(""".zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOn,var(--ongold,#2c1e0c)),var(--tOn2,var(--tOn,#fffaf2)) 50%,var(--tOn,var(--ongold,#2c1e0c))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}""",
    """.zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOn,var(--ongold,#2c1e0c)),color-mix(in srgb,var(--tOn,var(--ongold,#2c1e0c)) 82%,var(--tOn2,var(--tOn,#fffaf2))) 50%,var(--tOn,var(--ongold,#2c1e0c))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}""",
    'shine glint light')
rep(""":root[data-theme="dark"] .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),var(--tOnd2,var(--tOnd,#fffaf2)) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;}""",
    """:root[data-theme="dark"] .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,var(--tOnd2,var(--tOnd,#fffaf2))) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;}""",
    'shine glint dark-attr')
rep("""@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),var(--tOnd2,var(--tOnd,#fffaf2)) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;} }""",
    """@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,var(--tOnd2,var(--tOnd,#fffaf2))) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;} }""",
    'shine glint dark-media')

# post-checks
assert src.count("(title, name, team, sub, why, star, rec, stackTitle, winKey, crest)") == 1
assert src.count('color-mix(in srgb,var(--tOn,var(--ongold,#2c1e0c)) 82%') == 1
assert src.count('color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%') == 2
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step7 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
