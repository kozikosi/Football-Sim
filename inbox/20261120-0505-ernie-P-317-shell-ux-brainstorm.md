SPEAKER: ernie | ROLE: Kilo seat (advisor) | TASK: brainstorm — how to grow 67-cakepanz from a correct shell into the *advice layer* over Claude's engine | DATE: 2026-11-20T05:05Z
FOR: P-317 (sitting follow-on) · relates P-316 / P-287 / P-319
IDEA: the cakepanz-11 sitting made the shell CORRECT (slot end-to-end, one-click, seed replay, a11y method). The next leap is making it *persuasive*: every number the engine already computes should arrive with a WHY, and the shell should teach the Owner's doctrine (corner singularity, run-stopping, value over name) instead of just printing a table. Below, grounded in the files I read this sitting; each is shell-side (Z.ai's lane) unless marked [Engine].

## Guiding idea: the shell is ADVICE, not a scoreboard
The engine (Claude's) is the truth: `slotWins20`, `boardVM`, `goneOdds`, `fit`, `lineupFor`. Today the shell *renders* those. The upgrade is to *explain* them — one sentence per number, in house style, no invented data. Z.ai's own T8 request already names the shape (`suggestions { ids, rankedBy, cutoffRaw, reason }`); that `reason` field is the template for everything below.

## Quick wins (small diffs, high feel)

1. **The ring should carry a reason, not just a highlight.** Today `.cp-suggest` marks the top-3 by the active sort; the ring is silent. Add the `reason` line Z.ai asked the Architect for ("best available by Wins · fills a need · gone 34% before your next pick") as a one-line caption above the rows or in each quick button's `title`. Cost: the T8 export + a caption; no engine change. Impact: turns "why these three?" from a guess into advice. (Depends on the Architect ruling contract 1.)

2. **Gone% as a bar, not a bare number.** The engine already computes `goneChance`; the cell shows `23%`. A 40-px inline bar (green <30 / amber / red >70) makes "this guy will be gone" scannable in one glance, which is the whole point of the number. Pure CSS + the existing value; the describedby method Z.ai added stays. Impact: the board becomes decision-shaped.

3. **A "Drafted {name} · Undo" toast (5 s) for the one-click path.** The one-click draft (T2) is the Owner's speedrun signal; it currently commits with no confirm (my R1). A lightweight toast with an Undo button gives the safety of confirm at zero friction, and doubles as the "what just happened" feedback the CPU-pick-on flow lacks. Small: a Svelte component + a timer.

4. **Copy-replay affordance on the seed code.** T3 shows `code a3f2` in the footer/Complete/share. Make it a click-to-copy chip with a 1-line toast ("Replay link copied"), and add a tiny "↻ replay this draft" that navigates to `?seed=CODE`. The seed is now the single handle for a draft; treat it like one. (Uses existing `seedCode`; no engine.)

5. **Widen the auto-seed range (propose, don't blind-change).** R2: 1000–9000 gives only 8,000 drafts. Widen the *fallback* to the full 1..2³¹-1 so two unseeded drafts rarely collide; keep the calibration seeds pinned. One line in `parseSeed`, but flag for the Architect because it touches draft variety.

## Bigger bets (the shell grows up)

6. **Team Select: a snake-map of your chosen slot.** P-317 lets you pick any slot 1–32, but the screen only prints "You pick N first." Draw a compact 32-cell round-1 strip with your team highlighted at N and the displaced team marked at your natural spot, plus your next few picks ("you also pick 33, 64, 71…"). This makes the trade-off of picking early vs late *tangible* — the single most consequential choice in the draft, currently a number. Pure view math over `draftOrder`; the store already returns the full order.

7. **A pre-season "team grade" from `slotWins20`.** The moment between Complete and "Play week 1" is emotionally dead. Show a one-screen roster read: overall grade, the three weakest rooms (the engine already ranks these in L14), and "best value pick / biggest reach" vs. the board — all derived from values the shell already has. This bridges the draft to the season and reuses the Complete roster print Z.ai already built. No new engine.

8. **The ring as a *strategy* dial, not just a sort.** Add a "Recommended for: Best player / Biggest need / Best value" segmented control that re-weights the same `boardVM` rows (need = my open slots; value = wins per OVR). The engine has all three inputs. This is the difference between a draft *simulator* and a draft *coach*, and it's the Owner's "skilled drafter = top-30 by Wins/Priority" doctrine made visible. Shell-side re-rank + a `reason` per mode.

9. **Accessible board, done right (my D2).** Move the board to real table semantics — `role="table"`, rows `role="row"`, cells `role="cell"` with `aria-colindex`/column headers — or set each value cell's `aria-label` to `"{value} {column}"`. Then a screen-reader user hears "99 overall, 12.3 wins, 45.6 priority, 23 percent gone" — the actual decision inputs. This is the a11y completion that makes T4 mean something; pair it with the gone% method Z.ai already exposed.

10. **Contrast: derive a compliant pale instead of a fixed 55% mix.** The six AA holes (three team inks, two light-gold2, dark rose-ink) all come from `ink.ts`'s fixed `color-mix(… 55%, base)`. Replace it with a loop that *lightens/darkens until ≥4.5:1*, so the whole class dies at once instead of per-team patches — and the contrast guardrail's KNOWN list shrinks to zero. One function change in `ink.ts` + re-run `contrast.battery.mjs`. (Flagged for whoever owns the palette ruling; this is the systemic version of the Owner's per-hole decision.)

## Structural bets (for the Architect, not a seat)

11. **`tools/repin.mjs` — the five-path re-pin as one gated command.** This sitting's re-pin was five paths + `diff -rq` + suite + SNAPSHOT rewrite + pin banners, done by hand and receipted. That's exactly the shape `package-delivery.sh` proved can be automated. A `repin.mjs <newsha>` that moves the five paths, asserts `diff -rq` exit 0, runs `npm run test:engine`, rewrites SNAPSHOT.md's pin block, and re-banners the three docs — refusing on any mismatch — would make every future re-pin a one-command, receipted event and remove the manual step that just cost a sitting. [Architect's tools lane; Z.ai can draft the spec.]

12. **A league adapter so sport two is a config, not a fork.** The shell hard-codes 32 teams / 32 slots / 32 rounds / strict serpentine (`TEAMS`, `draftOrder`, `snakeOrder`). Plan M (baseball) vs AGENTS.md §2 (basketball) is unresolved, but either way the *shell* should read league shape (team count, slot list, rounds, snake pattern) from one `leagueConfig` behind the seam. Then a second sport is data + an engine snapshot, not a UI rewrite. This is the single highest-leverage structural bet for "second sport post-v1.1." [Architect + Z.ai design.]

## What I would NOT do
- No per-game historical tuning, no λ≠0, no GLM — the report is right that the ratings→gap mapping is unmeasured; enabling the tilt now tunes an uncalibrated dial.
- No new number formats on the board until P-319's display rule (integers except Wins/Priority one decimal) is enforced everywhere; the `val()` parse fragility (T8) is the warning — fix the data export, don't add display cases to parse.

## One-line summary
The sitting made the shell *correct*; the next sitting should make it *explain itself* — a reason on every ring, a bar on every gone%, a why on every grade — because the engine already knows all of it, and the Owner's doctrine is the product.