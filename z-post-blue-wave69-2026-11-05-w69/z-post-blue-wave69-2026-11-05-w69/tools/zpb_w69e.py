#!/usr/bin/env python3
"""w69 chain step 5 — UI 6: the award lines carry the CREST, not the written team name.
Crest BEFORE the name on the All-Pro/Pro-Bowl chips, the All-Playoff chips; the COTY line
and the playoff round cards' score lines read crests (the SB-MVP line joins the dash law).
Input: step 4's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = 'e5e45d1bd65e7004811f882ed15fc904'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-4 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# --- 1 · the REGULAR awards' All-Pro / Pro-Bowl chips: the crest leads the chip ---
rep("""    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip'+(c.team===user?' zpb-mygold':'')+'" style="'+stv(c.team)+'"><b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name))||c.team===user)?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(c.team):nick(c.team))+'</i></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join(''); // W68 (Owner): the user's players glow for ANY award — the golden border + the glow, the name shimmers // w47 (Owner): the crest leads the chip — the team name retires from the honor rows // w19: first-team All-Pro names always shimmer · w38 (R1, Owner): the rankings ink on every chip · w44 (O2, Owner): an All-Pro first-team name is gold in the Pro Bowl placement too""",
    """    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip'+(c.team===user?' zpb-mygold':'')+'" style="'+stv(c.team)+'"><i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(c.team):nick(c.team))+'</i> <b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name))||c.team===user)?'zpb-shm':'')+'">'+c.name+'</b></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join(''); // W69 (Owner, UI 6): the crest leads the chip — before the name, his lean // W68 (Owner): the user's players glow for ANY award — the golden border + the glow, the name shimmers // w19: first-team All-Pro names always shimmer · w44 (O2, Owner): an All-Pro first-team name is gold in the Pro Bowl placement too""",
    'regular honor chips crest-first')

# --- 2 · the ALL-PLAYOFF chips: the crest replaces the written nick, and leads ---
rep("""  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip'+(a.team===user?' zpb-mygold':'')+'" style="'+stv(a.team)+'"><b class="zpb-gname '+((_ap1g&&_ap1g.has(a.name))||a.team===user?'zpb-shm':'')+'">'+a.name+'</b> <i class="narr">'+nick(a.team)+'</i></span></div>').join(''); // W68 (Owner): the user's All-Playoff players glow // w44 (O2, Owner): the All-Playoff chips read the first-team gold too""",
    """  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip'+(a.team===user?' zpb-mygold':'')+'" style="'+stv(a.team)+'"><i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(a.team):nick(a.team))+'</i> <b class="zpb-gname '+((_ap1g&&_ap1g.has(a.name))||a.team===user?'zpb-shm':'')+'">'+a.name+'</b></span></div>').join(''); // W69 (Owner, UI 6): the crest replaces the written team name and leads the chip // W68 (Owner): the user's All-Playoff players glow // w44 (O2, Owner): the All-Playoff chips read the first-team gold too""",
    'all-playoff chips crest')

# --- 3 · the COTY line: the crest replaces the written team name ---
rep("""   : aw(a.title, (a.coach? (a.team===user?'YOU':a.coach)+' \\u00b7 ':'')+(a.team||''), a.team, '', _why, a.team===user); }).join(''); // w52 (Owner, M3): the coach's name reads YOU when it is his team""",
    """   : aw(a.title, (a.coach? (a.team===user?'YOU':a.coach)+' \\u00b7 ':'')+'<i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(a.team):(a.team||''))+'</i>', a.team, '', _why, a.team===user); }).join(''); // W69 (Owner, UI 6): the crest replaces the written team name on the coach line // w52 (Owner, M3): the coach's name reads YOU when it is his team""",
    'coty line crest')

# --- 4 · the playoff ROUND cards: the crests carry the score (the SB-page law), dashes between ---
rep("""  (P.rounds||[]).forEach(r=>{ if(r.items && r.items.length) lines.push('<div class="zpb-awline"><span class="zpb-awround">'+rl(r.label)+'</span>'+r.items.map(i=>aw(rl(r.label), i.p, i.g.away+' '+i.g.result.awayScore+', '+i.g.home+' '+i.g.result.homeScore, i.p && i.p.team===user)).join('')+'</div>'); });""",
    """  (P.rounds||[]).forEach(r=>{ if(r.items && r.items.length) lines.push('<div class="zpb-awline"><span class="zpb-awround">'+rl(r.label)+'</span>'+r.items.map(i=>aw(rl(r.label), i.p, ((typeof zpbTeamLogo==='function')?zpbTeamLogo(i.g.away):i.g.away)+' '+i.g.result.awayScore+' - '+i.g.result.homeScore+' '+((typeof zpbTeamLogo==='function')?zpbTeamLogo(i.g.home):i.g.home), i.p && i.p.team===user)).join('')+'</div>'); }); // W69 (Owner, UI 6): the crests carry the round finals — no written team names; the dash law rides the score""",
    'playoff round cards crests')

# --- 5 · the SB-MVP line's score separator joins the dash law ---
rep("""'+P.sbMvp.game.result.awayScore+' \\u00b7 '+P.sbMvp.game.result.homeScore+'""",
    """'+P.sbMvp.game.result.awayScore+' - '+P.sbMvp.game.result.homeScore+'""",
    'sb-mvp score dash')

# --- post-checks ---
assert src.count('<i class="narr zpb-aplog">') >= 3
assert "aw(rl(r.label), i.p, ((typeof zpbTeamLogo==='function')?zpbTeamLogo(i.g.away)" in src
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step5 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
