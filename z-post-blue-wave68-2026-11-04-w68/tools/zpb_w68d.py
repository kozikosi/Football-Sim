#!/usr/bin/env python3
"""w68 chain step 4 — Owner item 4: the user's award winners GLOW.
Every award card / All-Pro / Pro Bowl / All-Playoff chip whose winner is the user's wears the
golden border AND the outer glow; chip names shimmer for any award; the season-in-badges
honor cards gain the glow. Also plants the w68 style+script payload blocks (the victory page
lands in step 6's script)."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP3_MD5 = 'ace0d38b44a5b4deba1e8ba6c0a74ed6'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP3_MD5, 'step3 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- the live regular-awards renderer: the card glows when the winner is the user's ----
rep("""  const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey)=>'<div class="zpb-pcard zpb-awcard zpb-awgold" style="'+stv(team||'')+'">'""",
    """  const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey)=>'<div class="zpb-pcard zpb-awcard zpb-awgold'+(star?' zpb-mygold':'')+'" style="'+stv(team||'')+'">' // W68 (Owner): the user's award winners wear the golden border AND the glow""",
    'award cards glow')

# ---- the live renderer's All-Pro / Pro Bowl chips: the user's glow + shimmer (any award) ----
rep("""  const posRows = (box, shm)=> HONOR_ORDER.map(pos=>'<div class="zpb-aprow"><span class="zpb-apos">'+pos+'</span>'
    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip" style="'+stv(c.team)+'"><b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name)))?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(c.team):nick(c.team))+'</i></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join(''); // w47 (Owner): the crest leads the chip — the team name retires from the honor rows // w19: first-team All-Pro names always shimmer · w38 (R1, Owner): the rankings ink on every chip · w44 (O2, Owner): an All-Pro first-team name is gold in the Pro Bowl placement too""",
    """  const posRows = (box, shm)=> HONOR_ORDER.map(pos=>'<div class="zpb-aprow"><span class="zpb-apos">'+pos+'</span>'
    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip'+(c.team===user?' zpb-mygold':'')+'" style="'+stv(c.team)+'"><b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name))||c.team===user)?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(c.team):nick(c.team))+'</i></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join(''); // W68 (Owner): the user's players glow for ANY award — the golden border + the glow, the name shimmers // w47 (Owner): the crest leads the chip — the team name retires from the honor rows // w19: first-team All-Pro names always shimmer · w38 (R1, Owner): the rankings ink on every chip · w44 (O2, Owner): an All-Pro first-team name is gold in the Pro Bowl placement too""",
    'honor chips glow')

# ---- the playoff awards renderer: the same two laws ----
rep("""  const aw = (title, p, sub2, star)=>'<div class="zpb-pcard zpb-awcard zpb-awgold zpb-awcol" style="'+stv(p?p.team:'')+(star?';--zrb:var(--accent)':'')+'">' // w41: the user's shimmer keeps the accent law""",
    """  const aw = (title, p, sub2, star)=>'<div class="zpb-pcard zpb-awcard zpb-awgold zpb-awcol'+(star?' zpb-mygold':'')+'" style="'+stv(p?p.team:'')+(star?';--zrb:var(--accent)':'')+'">' // W68 (Owner): the user's award winners glow // w41: the user's shimmer keeps the accent law""",
    'playoff award cards glow')

rep("""  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip" style="'+stv(a.team)+'"><b class="zpb-gname '+((_ap1g&&_ap1g.has(a.name))?'zpb-shm':'')+'">'+a.name+'</b> <i class="narr">'+nick(a.team)+'</i></span></div>').join(''); // w44 (O2, Owner): the All-Playoff chips read the first-team gold too""",
    """  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip'+(a.team===user?' zpb-mygold':'')+'" style="'+stv(a.team)+'"><b class="zpb-gname '+((_ap1g&&_ap1g.has(a.name))||a.team===user?'zpb-shm':'')+'">'+a.name+'</b> <i class="narr">'+nick(a.team)+'</i></span></div>').join(''); // W68 (Owner): the user's All-Playoff players glow // w44 (O2, Owner): the All-Playoff chips read the first-team gold too""",
    'all-playoff chips glow')

# ---- the season-in-badges honor cards gain the glow (they are ALL the user's honors) ----
rep(""".zpb-shonor{border-color:var(--gold3,var(--accent));}""",
    """.zpb-shonor{border-color:var(--gold3,var(--accent));box-shadow:0 0 14px color-mix(in srgb,var(--gold2,var(--accent)) 42%,transparent),0 0 5px color-mix(in srgb,var(--gold2,var(--accent)) 38%,transparent) inset;} /* W68 (Owner): the user's honored players glow — the golden border AND the glow */""",
    'shonor cards glow')

# ---- the w68 style block: the golden celebration + (placeholder) the victory page CSS ----
NEW_CSS = '''<style id="zpb-w68-css">
/* ============ Z-POST-BLUE W68 · THE OWNER'S ROUND ============ */
/* UI 4 (Owner): the user's award winners GLOW — the golden border AND the outer glow, both.
   The gold is the celebration metal (the zpb-sb-gold badge language); never white. */
.zpb-mygold{border-color:var(--gold3,#d9a94c) !important;box-shadow:0 0 14px color-mix(in srgb,var(--gold2,#d9a94c) 52%,transparent),0 0 5px color-mix(in srgb,var(--gold2,#d9a94c) 40%,transparent) inset !important;}
:root[data-theme="dark"] .zpb-mygold{box-shadow:0 0 18px color-mix(in srgb,var(--gold2,#d9a94c) 62%,transparent),0 0 6px color-mix(in srgb,var(--gold2,#d9a94c) 48%,transparent) inset !important;}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-mygold{box-shadow:0 0 18px color-mix(in srgb,var(--gold2,#d9a94c) 62%,transparent),0 0 6px color-mix(in srgb,var(--gold2,#d9a94c) 48%,transparent) inset !important;}
}
</style>
</body>'''
rep('</style>\n</body>', NEW_CSS, 'w68 style block planted')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step4 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
