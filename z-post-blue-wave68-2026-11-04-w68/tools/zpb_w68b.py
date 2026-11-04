#!/usr/bin/env python3
"""w68 chain step 2 — Owner item 2B: the dash/dot law across every game-score surface.
Records and single-game scores read DASHES; projections/ratings/ranges keep the dot
(flagged in the ledger). Asserts every anchor; input is step 1's output."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP1_MD5 = '1b98617187ff4d34b21818bb84f7a6df'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP1_MD5, 'step1 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- the replay's final scoreline (ABBR x - y ABBR, the style-guide #3 law) ----
rep("""   const scoreLine = '<div class="zpb-rep-fscore"><b style="color:' + _cA + ';">' + _abA + '</b> <span style="color:' + _cA + ';">' + as + '</span> <i>·</i> <span style="color:' + _cH + ';">' + hs + '</span> <b style="color:' + _cH + ';">' + _abH + '</b></div>';""",
    """   const scoreLine = '<div class="zpb-rep-fscore"><b style="color:' + _cA + ';">' + _abA + '</b> <span style="color:' + _cA + ';">' + as + '</span> <i>-</i> <span style="color:' + _cH + ';">' + hs + '</span> <b style="color:' + _cH + ';">' + _abH + '</b></div>'; // W68 (Owner): a single-game score reads the DASH""",
    'replay final scoreline dash')

# ---- the Super Bowl page's score separator ----
rep("""   + '<div class="zpb-sbfin-score"><b style="color:' + (pkA ? (pkA.txd||pkA.accD) : 'var(--accent)') + ';">' + (TEAM_ABBR[S.sbFinal.away]||S.sbFinal.away) + ' ' + S.sbFinal.as + '</b><i>\\u00b7</i><b style="color:' + (pkH ? (pkH.txd||pkH.accD) : 'var(--accent)') + ';">' + S.sbFinal.hs + ' ' + (TEAM_ABBR[S.sbFinal.home]||S.sbFinal.home) + '</b></div>'""",
    """   + '<div class="zpb-sbfin-score"><b style="color:' + (pkA ? (pkA.txd||pkA.accD) : 'var(--accent)') + ';">' + (TEAM_ABBR[S.sbFinal.away]||S.sbFinal.away) + ' ' + S.sbFinal.as + '</b><i>-</i><b style="color:' + (pkH ? (pkH.txd||pkH.accD) : 'var(--accent)') + ';">' + S.sbFinal.hs + ' ' + (TEAM_ABBR[S.sbFinal.home]||S.sbFinal.home) + '</b></div>' // W68 (Owner): the Super Bowl final reads the DASH""",
    'SB page score dash')

# ---- the sim-playoffs round card's score separator ----
rep("""    + '<div class="zpb-porun-score"><b>' + lg(user) + ' ' + ab(user) + '</b><b class="zpb-porun-num">' + st.fs + '</b><i>\\u00b7</i><b class="zpb-porun-num">' + st.os + '</b><b>' + ab(st.opp) + ' ' + lg(st.opp) + '</b></div>'""",
    """    + '<div class="zpb-porun-score"><b>' + lg(user) + ' ' + ab(user) + '</b><b class="zpb-porun-num">' + st.fs + '</b><i>-</i><b class="zpb-porun-num">' + st.os + '</b><b>' + ab(st.opp) + ' ' + lg(st.opp) + '</b></div>' // W68 (Owner): the round card's score reads the DASH""",
    'porun score dash')

# ---- the how-the-game-was-decided fin + the series tag ----
rep(""" const fin = `${Math.max(hs,as)}·${Math.min(hs,as)}`, B = n=>`<b>${n}</b>`;""",
    """ const fin = `${Math.max(hs,as)}-${Math.min(hs,as)}`, B = n=>`<b>${n}</b>`; // W68 (Owner): the game score reads the DASH""",
    'decided fin dash')

rep(""" const tag = ()=> h===a ? `tied ${h}·${a}` : h>a ? `${nick(g.home)} ${h}·${a}` : `${nick(g.away)} ${a}·${h}`;""",
    """ const tag = ()=> h===a ? `tied ${h}-${a}` : h>a ? `${nick(g.home)} ${h}-${a}` : `${nick(g.away)} ${a}-${h}`; // W68 (Owner): the series score reads the DASH""",
    'series tag dash')

# ---- the replay story: the tie, the half, the third quarter, the OT, every final ----
rep("""  p1 = `${prefix}${T('home')} and ${T('away')} played to a ${hs}·${as} tie.`;""",
    """  p1 = `${prefix}${T('home')} and ${T('away')} played to a ${hs}-${as} tie.`; // W68 (Owner)""",
    'story tie dash')

rep("""  const hiLo = q => `${Math.max(A[q].h,A[q].a)}·${Math.min(A[q].h,A[q].a)}`;""",
    """  const hiLo = q => `${Math.max(A[q].h,A[q].a)}-${Math.min(A[q].h,A[q].a)}`; // W68 (Owner): quarter scores read the DASH""",
    'hiLo dash')

rep("""  const half = lh ? pick([`${capFirst(T(lh))} led ${hiLo(2)} at the half.`, `At the break it was ${nick(nameOf(lh))} ${hiLo(2)}.`]) : `It was tied ${A[2].h}·${A[2].a} at the half.`;""",
    """  const half = lh ? pick([`${capFirst(T(lh))} led ${hiLo(2)} at the half.`, `At the break it was ${nick(nameOf(lh))} ${hiLo(2)}.`]) : `It was tied ${A[2].h}-${A[2].a} at the half.`; // W68 (Owner)""",
    'half dash')

rep("""  if(big3) third = `${capFirst(T(big3))} outscored ${T(other(big3))} ${Math.max(d3h,d3a)}·${Math.min(d3h,d3a)} in the third quarter ${l3===big3?'to go up':'to '+(l3?'close within':'tie it at')} ${l3?hiLo(3):A[3].h+'·'+A[3].a}.`;""",
    """  if(big3) third = `${capFirst(T(big3))} outscored ${T(other(big3))} ${Math.max(d3h,d3a)}-${Math.min(d3h,d3a)} in the third quarter ${l3===big3?'to go up':'to '+(l3?'close within':'tie it at')} ${l3?hiLo(3):A[3].h+'-'+A[3].a}.`; // W68 (Owner)""",
    'third qtr dash')

rep("""  else third = l3 ? `${capFirst(T(l3))} still led ${hiLo(3)} after three quarters.` : `It was tied ${A[3].h}·${A[3].a} after three quarters.`;""",
    """  else third = l3 ? `${capFirst(T(l3))} still led ${hiLo(3)} after three quarters.` : `It was tied ${A[3].h}-${A[3].a} after three quarters.`; // W68 (Owner)""",
    'after three dash')

rep("""   fin = `Regulation ended tied ${A[4].h}·${A[4].a}, and ${wn} won it in overtime, ${wS}·${lS}.`;""",
    """   fin = `Regulation ended tied ${A[4].h}-${A[4].a}, and ${wn} won it in overtime, ${wS}-${lS}.`; // W68 (Owner)""",
    'OT dash')

rep("""   fin = pick([`Then ${wn} closed on a ${q4W}·${q4L} run to steal a ${wS}·${lS} win.`, `${capFirst(wn)} outscored ${ln} ${q4W}·${q4L} down the stretch and won ${wS}·${lS}.`]);""",
    """   fin = pick([`Then ${wn} closed on a ${q4W}-${q4L} run to steal a ${wS}-${lS} win.`, `${capFirst(wn)} outscored ${ln} ${q4W}-${q4L} down the stretch and won ${wS}-${lS}.`]); // W68 (Owner)""",
    'Q4 run dash')

rep("""   fin = margin<=3 ? `${capFirst(wn)} edged it ${wS}·${lS} in a game that came down to the final possession.` : `${capFirst(wn)} pulled away in the fourth quarter, ${wS}·${lS}.`;""",
    """   fin = margin<=3 ? `${capFirst(wn)} edged it ${wS}-${lS} in a game that came down to the final possession.` : `${capFirst(wn)} pulled away in the fourth quarter, ${wS}-${lS}.`; // W68 (Owner)""",
    'edged dash')

rep("""   fin = pick([`${capFirst(wn)} held on for a ${wS}·${lS} win.`, `${capFirst(wn)} survived a tense finish, ${wS}·${lS}.`]);""",
    """   fin = pick([`${capFirst(wn)} held on for a ${wS}-${lS} win.`, `${capFirst(wn)} survived a tense finish, ${wS}-${lS}.`]); // W68 (Owner)""",
    'held on dash')

rep("""   fin = (wS-wA3) > (lS-lA3) ? `${capFirst(wn)} kept pouring it on and won going away, ${wS}·${lS}.` : `${capFirst(wn)} coasted home, ${wS}·${lS}.`;""",
    """   fin = (wS-wA3) > (lS-lA3) ? `${capFirst(wn)} kept pouring it on and won going away, ${wS}-${lS}.` : `${capFirst(wn)} coasted home, ${wS}-${lS}.`; // W68 (Owner)""",
    'poured on dash')

rep("""   fin = `The lead changed hands ${flow.changes} times before ${wn} finally pulled away, ${wS}·${lS}.`;""",
    """   fin = `The lead changed hands ${flow.changes} times before ${wn} finally pulled away, ${wS}-${lS}.`; // W68 (Owner)""",
    'lead changes dash')

rep("""   fin = `Both offenses moved the ball at will, but ${wn} had the last answer in a ${wS}·${lS} shootout.`;""",
    """   fin = `Both offenses moved the ball at will, but ${wn} had the last answer in a ${wS}-${lS} shootout.`; // W68 (Owner)""",
    'shootout dash')

rep("""   fin = `Points were hard to come by, and ${wn} did just enough to win ${wS}·${lS}.`;""",
    """   fin = `Points were hard to come by, and ${wn} did just enough to win ${wS}-${lS}.`; // W68 (Owner)""",
    'hard to come dash')

rep("""  } else fin = `${capFirst(wn)} finished it off, ${wS}·${lS}.`;""",
    """  } else fin = `${capFirst(wn)} finished it off, ${wS}-${lS}.`; // W68 (Owner)""",
    'finished off dash')

# ---- the schedule tiles' result score ----
rep("""   res = `<span class="zst-res zst-${o.toLowerCase()}">${o}</span><span class="zst-score">${fs}·${os}</span>`;""",
    """   res = `<span class="zst-res zst-${o.toLowerCase()}">${o}</span><span class="zst-score">${fs}-${os}</span>`; // W68 (Owner): the tile score reads the DASH""",
    'schedule tile dash')

# ---- the season-in-words game scores ----
rep("""   `The signature blowout came in Week ${big.week}, a ${big.fs}·${big.os} rout of the ${nick(big.opp)}.`,
   `Nothing was more convincing than the ${big.fs}·${big.os} demolition of the ${nick(big.opp)} in Week ${big.week}.`""",
    """   `The signature blowout came in Week ${big.week}, a ${big.fs}-${big.os} rout of the ${nick(big.opp)}.`,
   `Nothing was more convincing than the ${big.fs}-${big.os} demolition of the ${nick(big.opp)} in Week ${big.week}.` // W68 (Owner)""",
    'words blowout dash')

rep("""  if(marquee.week!==big.week) parts.push(`The best win on paper was the ${marquee.fs}·${marquee.os} victory over the ${nick(marquee.opp)} (${st[marquee.opp].wins}-${st[marquee.opp].losses}) in Week ${marquee.week}.`);""",
    """  if(marquee.week!==big.week) parts.push(`The best win on paper was the ${marquee.fs}-${marquee.os} victory over the ${nick(marquee.opp)} (${st[marquee.opp].wins}-${st[marquee.opp].losses}) in Week ${marquee.week}.`); // W68 (Owner)""",
    'words marquee dash')

rep("""   `The low point was a ${worst.fs}·${worst.os} loss to the ${nick(worst.opp)} in Week ${worst.week}.`,
   `The ugliest result came in Week ${worst.week}, a ${worst.os}·${worst.fs} beating at the hands of the ${nick(worst.opp)}.`""",
    """   `The low point was a ${worst.fs}-${worst.os} loss to the ${nick(worst.opp)} in Week ${worst.week}.`,
   `The ugliest result came in Week ${worst.week}, a ${worst.os}-${worst.fs} beating at the hands of the ${nick(worst.opp)}.` // W68 (Owner)""",
    'words low point dash')

# ---- the playoff retrospectives and the Super Bowl lines ----
rep("""  sbLine = ` The ${nick(w)} went on to win the Super Bowl, beating the ${nick(l)} ${ws}·${ls}.`;""",
    """  sbLine = ` The ${nick(w)} went on to win the Super Bowl, beating the ${nick(l)} ${ws}-${ls}.`; // W68 (Owner)""",
    'sb season line dash')

rep(""" const games = plog.map(g=>`${g.won?'beat':'fell to'} the ${nick(g.opp)} ${g.won?g.fs:g.os}·${g.won?g.os:g.fs} in the ${g.round}`);""",
    """ const games = plog.map(g=>`${g.won?'beat':'fell to'} the ${nick(g.opp)} ${g.won?g.fs:g.os}-${g.won?g.os:g.fs} in the ${g.round}`); // W68 (Owner)""",
    'playoff games dash')

rep("""  if(prior){ const w = prior.result.homeScore>prior.result.awayScore ? prior.home : prior.away, sc = scoreFor(prior, w); h2h = ` They have already met once: the ${nick(w)} won ${sc.fs}·${sc.os} in Week ${prior.week}${g.divisional?', and the division race remembers it':''}.`; }""",
    """  if(prior){ const w = prior.result.homeScore>prior.result.awayScore ? prior.home : prior.away, sc = scoreFor(prior, w); h2h = ` They have already met once: the ${nick(w)} won ${sc.fs}-${sc.os} in Week ${prior.week}${g.divisional?', and the division race remembers it':''}.`; } // W68 (Owner)""",
    'h2h dash')

rep("""  if(prev){ const sc = scoreFor(prev, c.team), mvp = prev.detail.mvp; hist.push(`The ${c.N} got here by ${sc.fs>sc.os?'beating':'surviving'} the ${nick(sc.opp)} ${sc.fs}·${sc.os}, with ${mvp.name} (${mvp.group}) taking the game ball.`); }""",
    """  if(prev){ const sc = scoreFor(prev, c.team), mvp = prev.detail.mvp; hist.push(`The ${c.N} got here by ${sc.fs>sc.os?'beating':'surviving'} the ${nick(sc.opp)} ${sc.fs}-${sc.os}, with ${mvp.name} (${mvp.group}) taking the game ball.`); } // W68 (Owner)""",
    'conf hist dash')

rep(""" if(meets.length){ const one = m=>{ const w = m.result.homeScore>m.result.awayScore ? m.home : m.away, sc = scoreFor(m, w); return `Week ${m.week}, when the ${nick(w)} won ${sc.fs}·${sc.os}${m.result.ot?' in overtime':''}`; };""",
    """ if(meets.length){ const one = m=>{ const w = m.result.homeScore>m.result.awayScore ? m.home : m.away, sc = scoreFor(m, w); return `Week ${m.week}, when the ${nick(w)} won ${sc.fs}-${sc.os}${m.result.ot?' in overtime':''}`; }; // W68 (Owner)""",
    'meets dash')

rep("""  ? `The ${N} went ${rec} and made it all the way to the Super Bowl, but lost ${s.os}·${s.fs} when it mattered most.`""",
    """  ? `The ${N} went ${rec} and made it all the way to the Super Bowl, but lost ${s.os}-${s.fs} when it mattered most.` // W68 (Owner)""",
    'retro SB dash')

rep("""     ? `The ${N} went ${rec} and made the postseason, but it lasted one game: they lost to the ${nick(s.opp)} in the ${last.round}, ${s.os}·${s.fs}.`""",
    """     ? `The ${N} went ${rec} and made the postseason, but it lasted one game: they lost to the ${nick(s.opp)} in the ${last.round}, ${s.os}-${s.fs}.` // W68 (Owner)""",
    'retro one game dash')

rep("""     : `The ${N} went ${rec} and won ${numWord(plog.filter(g=>g.won).length)} playoff game${plog.filter(g=>g.won).length===1?'':'s'} before their run ended against the ${nick(s.opp)} in the ${last.round}, ${s.os}·${s.fs}.`);""",
    """     : `The ${N} went ${rec} and won ${numWord(plog.filter(g=>g.won).length)} playoff game${plog.filter(g=>g.won).length===1?'':'s'} before their run ended against the ${nick(s.opp)} in the ${last.round}, ${s.os}-${s.fs}.`); // W68 (Owner)""",
    'retro run ended dash')

rep("""  if(sb && sb.result){ const w = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away; return `The bracket played out without them. The ${nick(w)} won the Super Bowl, ${Math.max(sb.result.homeScore,sb.result.awayScore)}·${Math.min(sb.result.homeScore,sb.result.awayScore)}.`; }""",
    """  if(sb && sb.result){ const w = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away; return `The bracket played out without them. The ${nick(w)} won the Super Bowl, ${Math.max(sb.result.homeScore,sb.result.awayScore)}-${Math.min(sb.result.homeScore,sb.result.awayScore)}.`; } // W68 (Owner)""",
    'bracket w/o dash')

rep("""  return `${g.round}: ${g.won?'beat':'lost to'} the ${nick(s.opp)} ${g.won?s.fs:s.os}·${g.won?s.os:s.fs}. ${ballFor}. ${why}`;""",
    """  return `${g.round}: ${g.won?'beat':'lost to'} the ${nick(s.opp)} ${g.won?s.fs:s.os}-${g.won?s.os:s.fs}. ${ballFor}. ${why}`; // W68 (Owner)""",
    'champ round dash')

rep("""  return `Even champions have close calls. The nearest the ${N} came to losing was the ${closest.round} against the ${nick(s.opp)}, a ${s.fs}·${s.os} game that could have gone either way.`;""",
    """  return `Even champions have close calls. The nearest the ${N} came to losing was the ${closest.round} against the ${nick(s.opp)}, a ${s.fs}-${s.os} game that could have gone either way.`; // W68 (Owner)""",
    'close calls dash')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step2 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
