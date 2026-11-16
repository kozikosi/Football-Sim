# INNOVATION.md — two ideas, developed (item 13)

Seat: Z.ai · 2026-11-15 · each idea: the mechanism, why it matters, and what would prove it wrong.

## Idea 1 — "THE WITNESS SCREEN": the season becomes the watchable, the draft becomes the collectible

**The mechanism.** This sitting accidentally built the pieces of a product loop nobody asked for: the
season sim runs in 130 ms from the fixture's own draft log; the player cards render any roster as
collectibles with a PNG share; the feed replays any game from a stored seed. Put them on one rail: at
the end of a drafted season, the app generates the season's "collectible sheet" — every playoff game's
feed (13 games, each replayable from its own stored fork seed) + the champion's roster as a printable
card grid + the standings table. One button: "SEASON BOOK" — a single self-contained HTML (the w89
single-file discipline!) that the user can save and keep. The engine already stores every game's seed
("a game's seed is a stored integer and replaying it gives the SAME result" — seasonrun.ts); the book is
just the RENDERING of the record the engine already keeps. No new engine work: the season result, the
feed VMs, the card drawer — all of it exists as of this sitting.

**Why it matters.** The product's retention problem is that a finished season currently leaves nothing
behind: the standings screen is numbers, the playoff games are invisible (season-missing-vms.txt names
the missing bracket VM), and the user's championship roster exists only as rows on a board. A season
book converts a finished save into an artifact the user keeps and shares — the same instinct as slice
5's PNG cards, applied to the whole season. It is also the cheapest possible "watchable" surface: no
live simulation UI, no week-stepper needed for v1 — the replay is per-game deterministic, so the book
can embed each game's seed and let the reader "replay" any of the 13 playoff games into the existing
feed panel. And it honours the Owner's single-file law: the book IS a Z-post-blue-style HTML.

**What would prove it wrong.** (1) Size: a book embedding 13 games' feed VMs + a 60-card grid + the
table could blow past the single-file comfort zone — measure it: if the book exceeds ~400 KB gz (the
w87 wave is 1.9 MB raw, so there is headroom), the idea needs lazy per-game replay instead of embedded
data, which changes the offline promise. (2) The real test: build the book for the seed-2027 season and
put it in front of the Owner — if the championship roster's cards and the Super Bowl feed do not make
him want to save the file, the retention story is wrong. (3) Falsifier: if a plain text recap of the
season (the engine's own recap.ts, already written) tests as equally satisfying, the book is decoration,
not product.

## Idea 2 — "THE FLIP BENCH": authoring cost measured by the second arm's HANDICAP, not by its clock

**The mechanism.** Every authoring measurement so far (including mine) has a hole: the second arm pays
less because the instrumentation exists (my own receipts: 34 min vs 9 min, 7 min vs 4 min — almost all
of that is the probe, not the framework). The flip bench removes the hole by construction: for the NEXT
slice, author arm A's code, then give arm B's author ONLY (a) arm A's receipt-level artefacts — the
shared framework-free files, the probe, the protocol — and (b) a HARD BUDGET of wall-clock. Never the
arm-A framework code. The measured quantity is not "who is faster" but the HANDICAP RATIO: how much of
arm A's total wall-clock survives when the shared cost is pre-paid. If Svelte's ratio is systematically
higher across two agents and two slices, that is authoring cost with the confound squeezed from both
ends. The protocol already exists (measurements/PROTOCOL-FOR-A-SECOND-AGENT.md) — the bench adds one
rule: shared instrumentation is authored ONCE, before either arm, and both arms start their clocks with
it on disk.

**Why it matters.** The Owner's decision (Vue vs Svelte) is currently resting on one DECIDES row — the
store idiom — whose cost has never been measured under time; it has only been COUNTED (lines). The flip
bench converts it into a number: how many seconds per module-level reactive export does the getter-
wrapper idiom actually cost a cold author, holding the instrumentation constant? If the answer is
"seconds, not minutes", MUSE's lean loses its best row and the honest verdict becomes "even, pick by
ecosystem". If it is "minutes per sitting, forever", the verdict hardens. Either way the Owner gets a
number instead of a leaned table.

**What would prove it wrong.** (1) The handicap ratio is unmeasurable if the shared instrumentation is
not actually framework-neutral — the probe itself is written in one framework's idiom (my probes are
plain playwright, so this holds, but it must be checked per slice). (2) Two agents × two slices is
4 measurements; if the variance across agents is larger than the variance between frameworks (Ernie's
own correction, which this sitting confirmed), the bench needs a THIRD agent before any number is
decision-grade — at which point the cheap honest answer is MUSE's: the call is low-stakes and
reversible, and the 62% verdict stands until the number exists. (3) The bench's own falsifier: if arm
B's author, given only the shared files, finishes FASTER than arm A did with the same head start on two
independent slices, the "authoring cost" category is noise for this product and both framework rows
should be demoted to NOISE in CATEGORY-WINNERS.md — that would itself be a decision.
