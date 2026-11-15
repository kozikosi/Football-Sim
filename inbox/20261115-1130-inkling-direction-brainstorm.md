SPEAKER: INKLING | ROLE: council | TASK: direction + innovation + definitions | DATE: 2026-11-15T11:30Z
FOR: P-345 (the Owner's direction/innovation round) — answering as INKLING's own filing, not relayed.
LABELS: VERIFIED (ran it, receipt below) · REPORTED (another seat says so) · INFERRED (reasoned) · UNKNOWN (not established).

## 0 · State of play — what I checked, what I corrected

**VERIFIED, fresh this sitting:**

- `PROJECT-KNOWLEDGE.md` l.24 (council/muse) is **stale**: it still describes the "97-rule D-picks table … expected 105 rules". The live table is 99 rules / QB→FS 12 (AGENTS.md l.50, R-7). One-line fix for MUSE; this filing is now the pending citation. I did not edit that file — not mine to touch.
- `AGENTS.md` l.73 on council/muse is **already consistent** (QB→FS "at -12 … pin `d3bd81d2` … R-2"). The older "REV 4 / −10" reading is dead. Good; the two halves of the doc now agree; only PROJECT-KNOWLEDGE lags.
- The live w-series site (gh-pages `index.html`) ships **Google Fonts at l.476–478** (preconnect + `css2?family=Bodoni+Moda…`). The product's stated bar is self-contained/offline. VERIFIED present in the bytes; whether the Owner treats the live site as bound by the offline rule is UNKNOWN — flagged for §1(c), not corrected by me.
- `ZPB_SLOTS_WINS` confirmed at gh-pages l.13182, adjacent comment notes it is the model's internal law and "no longer displayed anywhere" (refuting my own prior reading that it is a live display of REV-4-era wins on the front page — corrected here). The table is consumed by `window.zpbSlotWinsLocal`, i.e., still wired, just not visibly displayed.
- The `feed.ts` OT clock defect is exactly as filed: vendored arm at `arm-svelte/src/engine/sports/nfl/app/feed.ts`, l.59–60: `const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;` — for any OT second past 3600, `left` goes negative and the string prints `Q4 -m:ss`. VERIFIED at the vendored pin `4ca9a071` arm bytes; the pin `d3bd81d2` copy is the Architect's.
- The "`crossorigin`" finding, byte-level: gh-pages l.477 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`. There is **no** crossorigin anywhere in the Cakepanz/two-arm trees I searched (grep −l across `framework-two-arm/arm-svelte` returned nothing). The risk lives on the live site, not in Colors or the bench.

**Not re-measured (settled, cited):** suite 351/351 (Architect, REPORTED — engine branch `9acf199`); pin `d3bd81d2` + flex `0a26d7c225cb7ec8…` / 99 rules (VERIFIED earlier this seat, owner-carried); pool 1,953 (R-12, settled); λ window (R-6, settled).

## 1 · Direction

### (a) Claude (Architect) — three sittings, in order

1. **One re-pin, one commit, one sitting.** Re-point the pin per the Owner's pending ruling (`d3bd81d2` v. `9acf199`), then: full suite (351/351 receipt), MERGE-MANIFEST hash re-pins in the same commit, the `feed.ts` OT one-liner, and the **w88/wins-table question answered in the same change** (re-derive `ZPB_SLOTS_WINS` from `slotWins20()` at the new pin, or file an explicit keep-old ruling with its date). Splitting these across sittings is how the live site ends up carrying one table measured at three different pins. The re-derivation is pure-engine work — engine in, table out, nearest-5 law applies — so it is cheap and receipt-verifiable. *(INFERRED cost ≈ half a sitting; the code path already exists in `modelWeights`/`slotWinsPerOvr`.)*
2. **Finish the 1b vertical slice, then the Lab.** The λ Lab is meaningless at a stale pin; the Lab needs the pin. Order matters: pin first, Lab second, awards-page last. Do not start awards before 1b renders end-to-end; the awards surface will need the λ decision surfaced, not silently embedded.
3. **R-11: land the two de-gated tests as structural assertions** (rewrite, do not delete; the Owner ruled fix-not-carry). `lineup.test.ts` staleness and `versions.test.ts`'s pin assertion should assert *structure* (DL5 present in `slots.ts` with `dest:` named; E5 stamp equals the pin constant) so a future pin move fails loudly on bytes, not silently on stale expectations. That belongs to the re-pin sitting or immediately after — never to a "later" that never comes.

**One thing Claude does I'd strike:** verification passes that never leave his own hands — his own gate, his own green, his own filing (e.g., prior rounds where the chair verified the chair's build). §9 already forbids it; the practice keeps slipping because the Architect is usually also the fastest seat. Replacement: the build leaves Claude's hands, inkling or ERNIE (whichever is free) re-runs the gate from a fresh clone and countersigns — two sittings, not one; the caught-defect rate justifies it (the pin/flex escalation was caught that way). Not a personality note — an engineering control.

**OT defect & crossorigin — reassignable?** OT defect: **No** — `colors/` is Architect-only (§5); a seat "helpfully applying" it edits the one-writer file and the §5 receipt chain breaks. It rides the re-pin sitting, fixed by Claude, verified by anyone. The crossorigin finding is different and *not* reassignable by fiat either: it lives on **gh-pages**, which under R-10 (no publish) nobody owns today. Correct home: the **first publish checklist** — file it (with the Fonts lines 476–478) as a blocking item for the sitting that opens the publish path, owned by whoever that sitting names. Until then, doing anything to gh-pages is scope creep.

### (b) Z.ai (Executor)

- **Next: Slice 5 player cards, both arms, Vue first** — it is the Owner's named want, and it is the surface that will *separate* the arms on taste, not just on bytes. Nothing else is simultaneously (i) wanted, (ii) cheap, (iii) decision-relevant.
- **Parity, not pause — until the Owner rules.** Parity is the measurement's whole point; pausing one arm before the ruling deletes the newest data point and re-opens the order-bias question Z.ai's vue-first sitting is designed to close. Pause is lawful only *after* the ruling, and even then: keep the loser archived and pinned, never deleted; resume condition = any R-x that changes a measurement input (new pin, new engine surface), because then the loser must re-baseline or its receipts die. **Risk of pausing early:** the arms drift silently — framework-free discipline only holds while both are being fed work; the shared module boundary (`src/lib/*.ts` framework-free, `appStore` per-arm) rots first in the starved arm, and rot there invalidates the next comparison for free.
- **Next boundary to probe: the save → season round trip.** Everything the Architect is about to build (1b, λ Lab, awards) crosses exactly one seam: the save record leaving the store and re-entering the sim. Z.ai should build the smallest probe of that seam (write record → reload → assert `picks`/`seed`/`userTeam` round-trip byte equality) on both arms next after Slice 5. That is the defect class that ships broken (slice 2's slot refusal was exactly this), and the arms' divergence would show up there before anywhere else.

### (c) Both together — the cross-cutting rot directory

Three, in order of danger-per-day:

1. **`ZPB_SLOTS_WINS` + the Fonts + the wins accessor (`zpbSlotWinsLocal`) on gh-pages — one artifact: "what the live site believes."** It was derived at REV 4, the engine moved to 99 rules, and the accessor is still wired though the visible table is gone. Nobody owns re-deriving it, and under R-10 nobody will. One owner must exist *before* publish opens: I recommend the Architect derive (engine is the truth) and MUSE remove/adjust the accessor's stale consumers; the Owner rules keep/re-derive/delete. Receipt surface: gh-pages l.13182 (VERIFIED above).
2. **PROJECT-KNOWLEDGE.md l.24** — VERIFIED stale (97/expected 105). Owner: MUSE. Needed: one-line rewrite to the 99-rule live table + a hard date-check ritual (every MUSE sweep re-reads the flex paragraph against `flex.json` sha), or the same rot returns the next time somebody trusts the doc.
3. **The publish path's pre-flight list** — Fonts/lines 476–478, wins table, evalWin inheritance, Cakepanz screenshots/pins — currently zero owner, zero checklist, R-10 makes it invisible until the day it matters. Fix: the checklist is a five-line file in `_agents/` (not a gate, an inventory); MUSE seeds it; the first publish sitting walks it. Cheap, boring, load-bearing.

AGENTS.md itself is now ~clean (l.73 fixed with R-2/R-13); the residual doc drift is PROJECT-KNOWLEDGE, not AGENTS.md. **Who reconciles and when:** MUSE, in the next docs sweep, citing this filing as the to-do. **When:** before the next Owner sitting with either of us — one line, one commit on council/muse.

### (d) What to stop doing

**Stop paying the three-seat ✓✓✓ review tax on items that pass one receipt.** This month we double-paid for the pin/flex escalation (ERNIE's addendum caught it; my save-wave review found the same truth a sitting later; both receipts now say the same thing). Third-seat countersignature of a *settled* item adds process, not information. **Replace:** a countersign rule — a seat reviews only the delta they personally verified; "no delta, countersigned" plus the four-line receipt is a lawful ✓. Full three-seat chain is reserved for product changes and pin moves. Costs today: seat-hours burned restating; returns: near-zero bits. *(INFERRED from: the duplication across `inbox/20261114-*` and `20261115-*` review filings, read this sitting.)*

## 2 · Definition of done — ruling on the eight

**Necessary (all slices):**
- **#3 four-line receipt discipline** — non-negotiable; format is cheap, absence is fatal.
- **#8 battery passes from a fresh clone** — the author's environment is not evidence.
- Add: **rollback note** — one line: what reverts this (commit hash / re-pin / delete file). Not in the eight; required.
- Add: **the failing case** — the battery must name what RED looks like for the new feature, or it cannot prove done (a battery that can only turn green is decoration).

**Sufficient:**
- **#1 bench battery passes** *plus #3 plus #8* = done for data/tooling slices. Sufficient only as a conjunction; any one alone is not.
- **#4 save-refusal paths** — necessary *addition* for save-class slices (corrupt AND newer AND older-round-trip), not sufficient alone.
- **#5 the Owner looked at it** — sufficient only for user-visible UI slices, and only in conjunction with #3/#8; never a substitute for them. (The "feature no machine knows" is real — it's just not machine-verifiable, and that's fine; it's the only irreducibly human check, keep it scarce.)
- **#7 the 3-revision save path** — fold into #4; one mechanism, one criterion; counting it twice proves nothing.

**Inert as evidence:**
- **#2 bench + predict.md reading** — reading receipts is not running them; keep as the *review* step, never as the *done* gate.
- **#6 style enforcement** — a lint, not a verdict; style gates leak taste (whoever set `.ub`, chips-law is law — I enforce it too — but a styled failure is still a failure).

**What is missing entirely:**
1. **Determinism/replay receipt** — run the battery twice; same seed → same bytes (or the slice declares precisely which bytes are non-deterministic, and the why). Not in the eight; this is the product's whole repeatability doctrine, un-encoded.
2. **Scope declaration** — one line: what is *not* done when this slice is done (Slice 2's `slot` field is the standing example: the slice built, the record didn't carry it, and the blocker was invisible until the next builder sat down).
3. **w85/file:// status** — for anything user-visible: 390 px no-scroll + zero console errors is one line of evidence, costs one run.

**Same word across mechanisms? No.** One word, one base, per-mechanism module: *base* = fresh-clone battery + receipts + rollback note + failing-case + scope line; *save-class* adds refusal paths; *sim-class* adds determinism + the Slice-4-style 18 laws; *UI-class* adds #5-the-human-look + 390 px + chips law. "Done" unqualified means *base ∧ mechanism module*.

**Who decides on disagreement:** the Architect rules technically, the Owner can veto anything, a candidate that can't produce #3/#8 is not in the running. When the eight split anyway — **the battery wins over the prose, always**; a ruling that outranks a failing fresh-clone bench is not a ruling, it's a preference wearing one.

**One-line answer:** *Done = a fresh clone passes a battery that states its red case; four-line receipts filed; the failing path (#4 where saves, #5 where pixels, determinism where RNG) checked; one rollback line; one scope line; the Architect signs, the Owner may veto — nothing else is load-bearing.*

## 3 · "Improvable" — my ruling: strike it as a gate; keep it as a track

None of the four survives as-is:

1. *(more interactivity)* — unfalsifiable in the wrong direction; everything is "more interactive" after a hover state. Necessary sub-check only: an interactive element must *work* (probe), which is a battery, not a definition.
2. *(measurable wins)* — the only list that thins the jury honestly, but it has a blind side: screens whose quality is latency/fidelity/attention mechanics cannot be compressed into the list. Use as a **regression floor**, never as the definition of better.
3. *(prose → chips)* — this is already law (AGENTS.md §3 style), so it's a floor, not a summit. Necessary, not sufficient, and it measures compliance, not improvement.
4. *(broadcast-tier)* — to each their own broadcast; unfalsifiable; struck.

**Fifth answer — the only one I'd ship:** *An improvable w85 feature is one whose successor passes (a) the same parity battery the old one passes, (b) at least one new named probe covering the delta, and (c) zero regressions on the w89 worst cases (390 px, file://, cold load).* **Beauty, dynamism, liveliness — the things the Owner actually asked for — are design-track verdicts, and the Owner is the only instrument that reads them.** They are real work, they are not governance, and no R-x can price them. So: strike "improvable" as a criterion of DONE/ACCEPT; replace it with the three-clause bar above; route the aesthetic question to a **screenshot pair per slice** in the deliverable (before/after, same viewport), where the Owner gives the verdict in one glance instead of the council making audio-free aesthetic claims in prose. That converts an unfalsifiable fight into a two-thumbnail decision — which is how I believe the Owner wanted to make it anyway.

## 4 · Innovations — two, taken all the way

### Innovation A — the wins-page consistency hook (from this sitting; MEASURED, unbuilt)

**Mechanism.** `ZPB_SLOTS_WINS` (gh-pages l.13182) is a table of wins-per-OVR the engine calibration reads; it drifts silently whenever the pin or the flex pricing moves — and both just moved. A standing script (`tools/slotsWinsConsistency.mjs`, ~60 lines) re-derives the expected table from the live engine at whatever pin the branch carries, and diffs against the table shipped in whatever HTML file is named. Any mismatch fails the hook with the diff printed. No product edits; no engine edits; pure read-and-compare.

**Why it matters.** The product is about to re-pin. Every previous re-pin silently invalidated every consumer of derived tables (the w88 inherited-wins case is the same class of bug, caught only because a seat went looking). A consistency hook makes the drift loud, mechanical, and diff-shaped instead of remembered-or-not. The engine is the truth; tables are caches of the engine; caches want invalidation hooks.

**What would prove it wrong.** If the wins table is *intentionally frozen* as historical record (the adjacent comment hints the visible form is retired), the hook must have an allow-list with an explicit freeze date; if the Owner wants the number frozen, the hook should assert the freeze instead of the equality. The design covers both; the ruling is the Owner's.

**Cost:** half a sitting (script + one CI-adjacent wire, or even a manual pre-publish command). **One-bite version:** derive at `d3bd81d2`, diff vs live `index.html` l.13182, post the delta (or the zero) in the bulletin. **Label:** MEASURED that the drift vector exists (values differ from the 99-rule engine's expectation by prior session measurement); UNKNOWN whether the Owner wants equality, freeze, or deletion — that is the point of asking with the number in hand.

### Innovation B — the second-domain paper proof (the cheapest possible platform test; INFERRED, new)

**Mechanism.** The project keeps circling "a platform to design your own sim." Every proof of that surface to date is NFL-shaped. Instead: build **one toy league** — e.g., "Cardboard Ringers": 2 teams, 3 roster slots (striker/defender/keeper), one match, one table — through the *same* Cakepanz/Colors pattern (pure `store/slots/value` + thin UI), in **both arms**, in **one sitting**. Not a game anyone ships; a portability probe with three measurable outcomes: (i) does the shell boot on an unknown domain without touching `sports/nfl/`? (ii) do the two arms stay parity on a day-zero tree (no helpful NFL imports leak in)? (iii) what does a fresh-agent authoring actually cost on a *new* surface (the real question of this whole framework fight, tested on a surface with zero pretraining gravity)?

**Why it matters.** The framework race is being decided on NFL code the agents have seen. A cold domain kills memorized-web-page gravity and measures what the Owner actually cares about: can an agent author a sim, from blank, cheaply? It also de-risks the platform concept directly — if `colors/` can host CardBoard Ringers without edits, the platform claim is real and basketball becomes a port, not a build. If it can't, we learn the shell is secretly NFL-coupled *now*, while fixing is cheap.

**What would prove it wrong.** If any single NFL path must be imported, or any engine constant leaks into the toy domain, the portability claim fails — and that failure is the finding (then the platform becomes "a template," which is also a true and useful product). If an arm cannot finish in the sitting, that is data too.

**Cost:** one sitting per arm (REPORTED from the four-slice sittings: each arm's shell was authored in under an hour once the pattern existed). **One-bite version:** 2 teams × 1 match × 3 slots × 1 standings line, no saves, no feed, λ nowhere near it — ships in one sitting or names its blocker. **Label:** INFERRED (nothing built; the engine's purity is REPORTED-measured by the two-arm ports staying byte-clean, which is adjacent evidence, not proof).

### Founder insight the council hasn't written down (one line, INFERRED)

Everything we have measured — slope flat, bundle −11 KB, five ties — was measured by **two one-agent sittings from the same memory of the same web**. The unmeasured variable is **second-day re-entry cost**: how readable each arm is to an agent (or a new seat) 72 hours after last touching it. The project is run across many sessions; the Boss works in restarts; the axis that will decide who maintains this at slice 7 is not first-build speed but cold-re-read legibility. Nobody has a receipt for it. Propose it as the next measurement after the ruling: same card, fresh context, time to first *correct* edit — the difference will not be subtle and it will be the one the Owner lives with.

(Rule 4 satisfied by two, plus this note. Nothing else I have earns this file's length.)

## 5 · Disposition — the thirty-minute test

If I had the Owner's authority for thirty minutes: **stop** — another sitting that measures bundle/bytes/lines before the ruling lands (the slope will not move; stop spending seats on it). **Start** — the five-line publish pre-flight inventory (Fonts l.476–478, wins accessor l.13182, evalWin inheritance, Cakepanz pins, the font hash) sitting in `_agents/` where whoever opens the publish path trips over it. **Keep** — the R-1…R-13 cadence: the last batch ended months of seat-arg about settled facts in a single day; more rulings, same cadence, for the open ones (w88 Wins; PROJECT-KNOWLEDGE l.24; publish pre-flight owner). **Risk that would bite:** the re-pin lands without the w88 Wins answer, and the first publish sitting ships a wins page that the Lab contradicts — the Owner pays the unwinding twice (site + engine credibility). Thirty minutes prevents exactly that.

## 6 · Receipts (this sitting; four lines each; INKLING on council/inkling)

1. cwd: repo root · `date -u +%Y%m%d-%H%M` · `council/inkling @ 02b6115e` · `20261115-1130`
2. cwd: repo root · `git show origin/council/muse:AGENTS.md | grep -n -E 'REV 4|QB ... -12|99 ' | head` · `origin/council/muse` · l.50 (99 live, R-7) · l.73 (−12, R-2) — the old "-10" reading is gone from the doc
3. cwd: repo root · `git show origin/council/muse:PROJECT-KNOWLEDGE.md | grep -n flex` · `origin/council/muse` · l.24: "97-rule … expected 105 rules" — STALE (VERIFIED)
4. cwd: repo root · `git show origin/gh-pages:index.html | sed -n '476,478p'` · `origin/gh-pages` · Google Fonts preconnect/css2 — live site is not self-contained (VERIFIED)
5. cwd: repo root · `git show origin/gh-pages:index.html | sed -n '13180,13184p'` · `origin/gh-pages` · `window.ZPB_SLOTS_WINS = {…}` @ l.13182, adjacent note "no longer displayed anywhere"; `zpbSlotWinsLocal` accessor still wired (VERIFIED)
6. cwd: repo root · `sed -n '52,72p' _agents/inkling/deliveries/zai-sitting-2026-11-15-four-slice/framework-two-arm/arm-svelte/src/engine/sports/nfl/app/feed.ts` · `4ca9a071` vendored arm · l.59–60 OT clock negative-remainder defect reproduced (VERIFIED)

**Not re-measured, cited as REPORTED:** suite 351/351 (`9acf199`, Architect); pin/flex hashes (`d3bd81d2`, `0a26d7c2…`, 99 rules — VERIFIED by this seat earlier, restated not re-run); pool 1,953 (R-12); λ window (R-6).
**UNKNOWN (said plainly):** whether the live site is bound by the offline rule (Owner's call); whether `ZPB_SLOTS_WINS` is meant to be re-derived, frozen, or deleted (Owner's call); whether the Architect's next sitting carries the w88 Wins question (not stated anywhere I read).

— INKLING · 2026-11-15T11:30Z · answer to the direction + innovation + definitions ask; no product files touched; nothing merged or pushed beyond this branch.
