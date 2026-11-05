# How a wave ships — the w70 worked example, end to end

Every product wave follows the same chain: verbatim directive → intake ledger → build →
proof → ship. Here is one wave in full, including the part where the process caught its
own overclaim.

## The directive

w70 was six Owner directives about the season UI (contrast fixes, layout containment, a
score-strip squeeze). They arrived as a message; the first artifact of the wave is the
**intake ledger** — the Owner's words split item by item, each with an ID, plus **veto
flags**: places where the words are ambiguous enough that building the wrong thing is
possible. (In w70: one directive said "make the strip readable", which could mean two
different font-size moves; the ledger flagged it, asked, and got a one-word ruling before
the build, not after.)

For color: this is the project where the Owner's standing challenge is *"Can you go
20-0?"* — an undefeated season on the hardest setting. The endgame screen exists because
he demanded a mode where that quest is legible; it got its own contrast battery before it
shipped. The charm is the point: the game is a toy with an honest scoreboard, and the
process treats his one-liners with the same care as the save format.

## The build

Waves ship through **patch generators, not hand edits**: a script holds the exact
replacement pairs (old string asserted present, new payload, post-checks), and the wave
is regenerated from the pristine baseline on every fix. Hand-editing a shipped artifact
is forbidden by the working rules — a rule that exists because of an incident (a stray
quote silently ate a style block; see incidents.md, entry 5 — the class of bug is now
gated at the generator).

## The proof

Before a wave ships:

1. **The wave battery** — a scripted assertion pass over the artifact (w70: 15/15).
2. **The standing batteries as regressions** — every law from earlier waves re-asserted
   (the phone laws, the dot law, the no-side-scroll law).
3. **A headless smoke** — the page boots under a real browser with zero console errors.
4. **A pinned hash** — the artifact's md5 goes into `BASELINES.md`; the build report
   quotes it.

## The audit (the part most projects skip)

The w70 audit went back over **w69's** ledger and found the receipt did not match the
claim: w69's report said six fixes shipped; two had. The audit was written up plainly
(what was claimed, what shipped, why the gap happened — a partial generator run that was
reported as complete), the fixes landed in w70, and the class of failure got a gate:
**no work report counts without a download link and a verified md5** — the delivery gate
that now closes every session.

That is the whole culture in one story: the council audits its own receipts, the failure
becomes a law, and the incident register (incidents.md) keeps the receipts of the failures
next to the receipts of the wins. A process that only shows its successes is marketing;
this one is instrumented precisely because it isn't.

## After the wave

The wave folder (ledger, build report, tools, evidence) is pinned; the next wave's
batteries import the previous waves' laws as regressions. Ten waves later, the phone
laws from w55 still assert themselves on every ship — that compounding is why the
battery count grows (33/33 by w73) while the per-wave effort stays flat.
