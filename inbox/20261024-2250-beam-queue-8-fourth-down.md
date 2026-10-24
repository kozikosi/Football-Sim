SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-8 4th-down rule vs on-screen copy | DATE: 2026-10-24T22:50Z

FOR: QUEUE-8

WHERE: Football-Sim-PreColors.html — aggressiveness system (l.1970-1974 AGGR_INFO, l.2699-2710 LAMBDA scoring, l.5080-5096 copy).

old -> new: N/A (analysis task, no code change).

WHY: QUEUE-8 asks for the code that decides 4th downs, the copy that describes it, and any mismatch (both quoted).

SAFE ALONE?: N/A (no edit).

HOW TO CHECK: grep AGGR_INFO, LAMBDA, and the copy blocks (l.5080-5096).

EVIDENCE: VERIFIED (code and copy quoted from Pre-Colors).

--- CODE THAT DECIDES ---

AGGR_INFO (l.1970-1974):
  cautious:  {label:'Cautious',  two:0.45, td:0.96, fg:1.08, desc:'Kicks the extra point almost every time and takes the field goal on most 4th downs inside the 35. Fewer 2-Pt Convs, a few more field goals, fewer touchdowns.'}
  balanced:  {label:'Balanced',  two:1.00, td:1.00, fg:1.00, desc:'Follows the usual NFL chart: kicks the extra point most of the time, goes for 2 in situations where the numbers say to, and goes for it on 4th down when it is short and the field position is good.'}
  aggressive:{label:'Aggressive',two:1.90, td:1.05, fg:0.86, desc:'Goes for 2 early and often, and goes for it on 4th down instead of kicking. More 2-Pt Convs, more touchdowns, fewer field goals, and a few more failed 4th downs.'}

LAMBDA (l.2699-2710):
  const AG = AGGR_INFO[ag];
  const LAMBDA = {td:2.6*AG.td, fg:1.05*AG.fg, six:0.07*AG.two, eight:0.022*AG.two, saf:0.012};

So the aggressiveness setting scales scoring RATES (td multiplier up for aggressive, fg multiplier down), NOT an explicit 4th-down decision. There is no code that says "on 4th down, go for it vs kick". The td/fg lambdas adjust how many TDs vs FGs a team scores over a game.

--- COPY THAT DESCRIBES IT ---

l.5080: "How bold is your coach on 2-Pt Convs and 4th downs? This changes how your team scores, not how many points it is worth: the real-world numbers say a bold coach and a careful one come out about even, so the sim treats them as roughly equal and the difference shows up in the box score and in game-to-game swings."

l.5096: "Three decisions, all optional: who plays where (including any flexes, and who returns kicks and punts), your coaching philosophy and your game-day aggressiveness on 2-Pt Convs and 4th downs. The recommended settings are already selected; changing nothing is a perfectly good choice. Your coaching philosophy and aggressiveness are locked in once you simulate Week 1; the lineup and returner stay editable all season."

--- MISMATCH ---

The copy says aggressiveness changes "how your team scores" and affects "4th downs" — implying a decision point (go for it vs kick). But the code has NO explicit 4th-down decision. It only scales the TD/FG scoring lambdas (td: 2.6*AG.td, fg: 1.05*AG.fg). A "cautious" coach scores fewer TDs and more FGs; an "aggressive" coach scores more TDs and fewer FGs. This is a rate adjustment, not a 4th-down choice.

The copy is not technically wrong (the outcome is "more field goals vs more touchdowns"), but it implies a mechanism (4th-down decisions) that the code does not implement. The user is told their coach "goes for it on 4th down" but the sim never actually decides a 4th down — it just shifts the TD/FG ratio.

Also: the copy claims "a bold coach and a careful one come out about even" (real-world). The code's lambdas make aggressive coaches score slightly more TDs and fewer FGs, but since TDs (6-7 pts) > FGs (3 pts), aggressive coaches actually score MORE points, not "about even". The real-world equivalence claim is not reflected in the math (td multiplier 1.05 vs fg 0.86 for aggressive → more TDs, fewer FGs, net positive for aggressive).

--- RECOMMENDATION ---

Either:
1. Adjust copy to match code: "Your aggressiveness setting changes the mix of touchdowns and field goals your team scores — a bold coach scores more touchdowns and fewer field goals, a careful coach the reverse. The total points come out about even."
2. Or adjust code to match copy: implement an explicit 4th-down decision (go/fg) based on field position, with the td/fg lambdas as the outcome.

Option 1 is safer (no math change). Option 2 requires protected-constant-level care (LAMBDA is part of the sim core).

Also: the `desc` strings in AGGR_INFO say "goes for it on 4th down when it is short and the field position is good" (balanced) and "goes for it on 4th down instead of kicking" (aggressive) — these imply a decision the code doesn't make. Recommend rewording to "scores more touchdowns relative to field goals" language.

EVIDENCE: VERIFIED (code at l.1970-1974, l.2699-2710; copy at l.5080, l.5096).
