#!/usr/bin/env node
// dump the exact bytes of the step-2 anchor lines (search by substring, print JSON lines)
const s = require('fs').readFileSync('/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html', 'utf8');
const lines = s.split('\n');
const probes = [
  'const fin = `${Math.max(hs,as)}·${Math.min(hs,as)}`',
  'const tag = ()=> h===a ? `tied',
  'played to a ${hs}·${as} tie',
  'const hiLo = q =>',
  'It was tied ${A[2].h}·${A[2].a} at the half',
  'outscored ${T(other(big3))}',
  'still led ${hiLo(3)} after three',
  'It was tied ${A[3].h}·${A[3].a} after three',
  'Regulation ended tied ${A[4].h}',
  'closed on a ${q4W}·${q4L} run',
  'outscored ${ln} ${q4W}·${q4L} down the stretch',
  'edged it ${wS}·${lS} in a game',
  'pulled away in the fourth quarter, ${wS}·${lS}',
  'held on for a ${wS}·${lS} win',
  'survived a tense finish, ${wS}·${lS}',
  'kept pouring it on and won going away',
  'coasted home, ${wS}·${lS}',
  'The lead changed hands ${flow.changes} times',
  'a ${wS}·${lS} shootout',
  'did just enough to win ${wS}·${lS}',
  'finished it off, ${wS}·${lS}',
  'zst-score">${fs}·${os}',
  'a ${big.fs}·${big.os} rout',
  'demolition of the ${nick(big.opp)}',
  'The best win on paper was the',
  'a ${worst.fs}·${worst.os} loss',
  'beating at the hands of the ${nick(worst.opp)}',
  'win the Super Bowl, beating the ${nick(l)}',
  'fell to\'} the ${nick(g.opp)} ${g.won',
  'won ${sc.fs}·${sc.os} in Week',
  'taking the game ball',
  'when the ${nick(w)} won ${sc.fs}·${sc.os}',
  'lost ${s.os}·${s.fs} when it mattered',
  'it lasted one game: they lost',
  'run ended against the ${nick(s.opp)}',
  'won the Super Bowl, ${Math.max(sb.result.homeScore',
  'lost to\'} the ${nick(s.opp)} ${g.won?s.fs',
  'a ${s.fs}·${s.os} game that could have gone',
  '<i>·</i> <span style="color:\' + _cH',
  'S.sbFinal.as + \'</b><i>\\u00b7</i><b',
  'st.fs + \'</b><i>\\u00b7</i><b class="zpb-porun-num"',
];
for (const p of probes) {
  const i = s.indexOf(p);
  if (i < 0) { console.log('MISS: ' + p); continue; }
  const ln = s.slice(0, i).split('\n').length;
  console.log(ln + ': ' + JSON.stringify(lines[ln - 1]));
}
