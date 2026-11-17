SPEAKER: pickle | ROLE: council | TASK: P-333 macro — what matters most next | DATE: 2026-11-17T20:50Z

FOR: P-333

Written without reading DS's or GLM's answers. Three questions, answered separately.

---

## Q1 — The single most important problem: there is no tree that is newest shell + current pin + green, and nothing in the process notices when that stops being true.

The product is two finished halves and no join, and the join has no acceptance test.

What I measured on 16 Nov (VERIFIED, this seat, extracts to
`/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/`):

- The tree that actually deploys (`origin/gh-pages`, `67-cakepanz/`, `66096fb1`)
  is **red on its own engine suite: 277 pass / 9 fail of 286**. The nine are six
  flex laws, two 3-4/4-3 base laws and one pinned `E5` stamp — carried
  expectations that did not move when `src/engine/` and `tools/mathlab/flex.json`
  did. (`node --test test/` in the extract; the list is in
  `inbox/20261116-2109-pickle-CAKEPANZ-SHELL-pin-and-suite.md`.) Whether each of
  the nine is a stale expectation or a regression is still the open measurement —
  that is Part 4b of this round, and it should be run before anyone says "reviewed".
- The newest shell (`s5`) carries **a different pin** (`4ca9a071`, 52 files) than
  the deployed slice-1 tree (`d3bd81d2`, 57 files). Neither is
  latest + current pin + green.
- The seam the merge needs **does not exist**: 65 engine imports across 15 app
  files = 36 runtime imports in 10 files over 32 module paths, 9 of them
  `.svelte`; no adapter, no `SNAPSHOT.md`, no `SHELL-STATUS`. (VERIFIED,
  `inbox/20261116-2120-pickle-CAKEPANZ-SHELL-cone-one-door.md`.)

Why this is the most important, not merely the most urgent:

1. It is the only problem whose solution converts the last two weeks into
   something a user can open. Engine 406/406 on the Architect's branch and shell
   slices 1–5 on Z.ai's are both real work that currently reaches nobody.
2. It is upstream of decisions the Owner cannot currently make honestly. Eleven
   Cakepanz rulings, the shell of record, the palette and cutover all presume a
   shell that is real. A red deployed tree is not a shell of record; it is a draft.
3. It is the same failure that produced this week's other errors. The red
   deployment, the re-pin that moved the engine but not the laws, and the advisory
   CI gate are one defect seen three times: **nothing in the process refuses a tree
   that is not green.** Fix the refusal and the class of error closes with it.

The framing I would push back on: this is not "polish before the engine is right".
The engine being right and the shell being reviewed are both true and both useless
until one artifact holds them, and every further engine node (state-bucket, yards)
makes the eventual join larger by one more pinned path.

## Q2 — One concrete next step: write and run the merge gate, and make the re-pin its first pass.

One read-only command that decides "mergeable", so the answer stops being a
judgement per seat:

```
node tools/merge-gate.mjs <tree> --pin <sha>
```

Checks, in order, each exiting non-zero with its own name:

1. **Pin integrity** — every file under `src/engine/**` is blob-identical
   (`git hash-object`) to the pin's `colors/src/**` at `<sha>`, and
   `tools/mathlab/flex.json` is identical too (expect zero diff).
2. **Flex shape** — `flex.json` parses and is rule-for-rule equal to the pin's
   copy, and the rule count and the value multiset (how many rules sit at 12, 6, 2,
   0) are taken **from the pin**, not hardcoded. Two breakdowns circulate for the
   99-rule table and both sum to 99; a gate that hardcodes one of them would fail a
   correct tree. Print the multiset so the round can settle which is in the file.
3. **Green suite** — `node --test test/` in the extract exits 0, and the test
   count is printed (so a suite that silently runs 0 tests fails).
4. **Honest pin line** — the tree's own README / `SNAPSHOT.md` pin string equals
   the pin the tree actually carries (catches `4ca9a071`-in-the-README while
   `d3bd81d2` is in the tree, which is what is deployed today).
5. **Seam closed** — zero engine imports outside the seam directory
   (`grep -rn "engine" src --include='*.svelte' --include='*.ts'` minus the seam
   files), so "one door" is measured, not asserted.

Run it today, on the same day this is filed, on both trees:
deployed fails 3 and 4; `s5` fails 1. That is the whole argument in two exits.

Then the re-pin to `65673a00` is **one atomic commit whose acceptance is that
command going 5/5 on both trees**, and the cap on the round is: nothing about
Cakepanz is reviewed again until one artifact passes. Part 3b of this round
already asks Z.ai to *prepare* the re-pin — good; the gate is what makes it
countable, and it is the piece nobody has asked for.

This needs no Owner decision, no engine edit and no Z.ai edit. It is a council
tool over existing commands, and I have run four of the five checks by hand this
week already (that is how the two trees' states are known).

## Q3 — What is being done that is waste, and what is pointed the wrong way.

**Waste: direction (A), the principled formula that derives flex prices to close
the 4-3/3-4 gap.** Take the round's own numbers as stated (REPORTED, KG's brief),
and follow them:

- the table gap is ~700 units ≈ 0.09 wins over a season;
- the measured real-roster bias is ~1144 units;
- re-pricing cannot close the measured bias below ~947 units.

If those three numbers mean what they say, then a formula that drives the *table*
gap to zero leaves a *measured* real-roster gap of about 947 — larger than the 720
measured today. In other words: the only re-pricing that closes the real gap is one
that makes 3-4 structurally cheaper than 4-3 by roughly 950 units, which is the
destination-weight principle inverted. So (A) is aimed at a target its own
principles forbid reaching, and it is chasing a prize worth under a tenth of a win
per season (INFERRED from the stated numbers; if the four numbers are wrong, the
argument needs restating, and that correction would itself be the finding).

What to do instead of a seventh formula: state the thesis the gap must express
(3-4 is better when a bad DT2 is left on the board with good linebackers — already
articulated and measured "in part"), define the *criterion of correctness* on real
rosters — the value the gap should have, not zero — and then stop. The scale of the
prize says the cost of leaving it is small; its systematicity says don't forget it.

**Misdirected: sequencing, not effort.** Building the yards-given-class node and
reviewing shell slices before the join is good work aimed at a product nobody can
open. Neither is wrong; both are early. The cheapest correction in the whole
project right now is ordering: the merge gate first, then the engine nodes land into
a product that exists, and every shell review has a green tree to review against.
That is a change of days, not of strategy.

## The direction nobody has named: nobody has ever checked that Wins means wins.

The game shows the user exactly three numbers — Wins, Priority, OVR — and tells him
that Wins is how many wins a player adds and Priority is those wins per unit of
draft cost. Every engine round to date has measured *conformance*: cosine 120/120,
suite green, class rates, lab parity. Not one measurement asks the product's actual
question: **if you draft the higher-Wins team, do you win more, by the margin the
number promised?**

At 3,900 games/s this costs an afternoon:

- draft N rosters by Wins (greedy from the board), N by anti-Wins, N at random;
- simulate the same season length with a fixed seed set;
- compare realized win differential to the predicted Wins delta.

Three outcomes, all useful. Calibrated — then the three numbers the user sees carry
weight, and Cakepanz's player cards and sorting are built on something true.
Miscalibrated — every UI polish downstream of Priority is decoration, and that is
far more important to learn before cutover than after. Overconfident — the draft
feels more deterministic than football is, which is a product judgement the Owner
should make with a number in front of him.

The companion measurement, same afternoon: **the 20-0 rate.** How often does the
best-drafted team finish 20-0? The 1972 Dolphins are one perfect season in fifty
years of football. If the sim hands 20-0 to a few percent of good drafts the promise
in the product's name is cheap; if it is effectively unreachable for twenty friends,
the promise is false. One table at 3,900 games/s decides whether "see if he can go
20-0" is a true sentence, and nobody has printed it.

I would put that measurement ahead of the yards node, because it tests the claim the
user is told, not only the mechanism behind it.

---

BLOCKED: nothing for Q2's gate — it is a council tool over commands already in the
tree. The gate's check 3 (green suite) cannot pass until the carried expectations
are re-pinned, which is the Architect's (Part 3b/4b of this round).

OPEN (Owner): whether a calibration measurement is worth a round before the yards
node; and the 4-3/3-4 target — the value the gap *should* have, if not zero.

NEXT (1–3):
1. `tools/merge-gate.mjs` written and run on both trees; the two exit codes pasted
   in a filing.
2. Part 4b — the exact list of the nine carried failures, each stamped
   stale-expectation or regression.
3. The Wins-calibration / 20-0-rate table, if the Owner wants it before the yards
   node.
