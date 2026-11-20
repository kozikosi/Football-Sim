SPEAKER: ernie | ROLE: Kilo seat (advisor) | TASK: brainstorm — cakepanz-12's implications + how to grow the shell into an *advice layer* over Claude's engine | DATE: 2026-11-20T16:05Z
FOR: P-317 (follow-on to `20261120-1559-ernie-P-317-cakepanz-12-review.md`) · relates P-287 / P-291 / P-316 / P-355
IDEA: cakepanz-12 made the shell *correct and safe* (unambiguous seed, one-click guard, a11y values, restore reassurance). The next leap is to make it *legible* — every number the engine already computes should arrive with a WHY and a shape you can scan — and to make the shell *re-pointable without a rewrite* so each engine pin is a one-command, contract-tested event. All of it is shell-side (Z.ai's lane) unless marked [Engine] / [Architect].

## Part 1 · What cakepanz-12 changes (the implications to build on)

1. **The `b36:` code is now the canonical shareable handle.** Every draft mints `seedToCode(seed)`, the URL carries it, the share card stamps it. That turns the code into *infrastructure*, and infrastructure wants three things it does not yet have: a **check digit**, a **copy affordance**, and a **replay link**. (Cheap, high feel — see Q1/Q2/Q3.)
2. **The random draw is 9.9 M (100k–9.99M).** Birthday collisions are gone; two unseeded drafts no longer collide. The corollary: the *fallback* path is now safe to widen further if ever needed, and the shareable handle can be treated as permanent.
3. **One-click + guard + Undo toast is a proven pattern.** It is the template for every destructive-but-fast action in the shell. Extend it (Q4).
4. **The restore path is the last shareability gap** (review D2). `loadDraft` sets `seed` but not the URL. Fix it, then the "every draft shareable" claim is actually true.
5. **The falsifier now has a stale-server guard.** That guard is generally useful — the other browser batteries still trust a blind sleep/port (Q6, structural).
6. **The slice battery's run-variance is the root cause of the whole T8 class** (a manifest-pinned receipt that cannot be regenerated). A deterministic seed retires the class (S1).

## Part 2 · Quick wins (small diffs, high feel — each is shell-side)

**Q1 — The seed code as a copy chip + a replay link.** `Complete.svelte:58` and the share card already print `code b36:…`. Make it a `<button>` that copies `?seed=b36:…` (absolute URL from `location.origin`) and toasts "Replay link copied"; add a `↻ Replay this draft` that navigates to it. The seed is the single handle for a draft — treat it like one. No engine change; reuses `seedToCode`/`writeSeedToUrl`.

**Q2 — A check digit on the code (typo → "invalid code", not a silent wrong draft).** Today `?seed=b36:abc` typo loads a *different valid seed* silently — the exact failure class T2 just fixed for display, still open for typing. Append one base-36 check char (a weighted sum mod 36) to the displayed code and the share text; `parseSeedCode` verifies it and falls back to the random draw on mismatch, with a one-line note ("that code did not check out — started a fresh draft"). This is the difference between a shareable *link* and a shareable *key*. ~15 lines in `seedCode.ts`; add a law (bad check char → random draw, never a wrong seed).

**Q3 — Announce the code's job in the UI, not just its value.** A first-run user sees `b36:35ckh` and does not know it is a replay handle. One line under the board footer: "This draft is seed `b36:35ckh` — the same code replays the same draft." (House style, no jargon.) Pairs with Q1.

**Q4 — Keyboard-first drafting (the speedrun, made real).** L17c already proves Tab→Enter drafts; a *global* key map makes it fast: `j`/`k` (or ↑/↓) move a focus ring through the rows, `Enter` drafts the focused row, `u` undoes, `/` focuses search. The one-click guard (380 ms) already protects against auto-repeat. This is the single biggest "feel" upgrade for the Owner's speedrun signal, and it is pure shell (a `svelte:window on:keydown` handler + a focus index). Zero engine change.

**Q5 — Board search + position-group filter.** The pool is 1,953 players; the board shows 60 rows and the only filter is "my needs". A name search and a position-group chip row (QB / RB / WR / OL / DL / LB / DB / ST) is the highest-leverage board improvement — it turns the board from a top-60 window into a usable draft tool. Shell-side: filter `vm.rows` on `pos` and `name` before the ring computation (the ring then rides the filtered set, which L13's `shown` already supports).

**Q6 — Gone% as an inline bar, and a "what just happened" line.** The gone% cell is the board's decision signal (`23%`). A 40-px inline bar (green <30 / amber / red >70) makes it scannable in one glance — pure CSS over the existing value, method copy untouched. Separately, after each user pick the CPU takes ~31 players; the "Drafted {name} · Undo" toast is the seed of a **"CPU picked 31 · you're on the clock at 2.14"** line (the engine's `goneOdds` already knows `picksBetween`), so the user understands why the board jumped. Both reuse values the shell already has.

**Q7 — Mobile nav: 14 tabs → a bottom bar.** `App.svelte:300` renders 14 `.cp-navbtn`s. At 390 px that is a multi-row wall (the 390 laws cover the board, not the nav). A 5-item bottom bar (TEAM · DRAFT · SEASON · REVIEW · MORE) with the rest behind a sheet cuts the nav to one row and is standard mobile. This is P-037's mobile-audit territory; the shell can do it without waiting.

## Part 3 · Bigger bets (the shell grows up)

**B1 — The advice layer: a `reason` on every ring.** The ring marks the top 3 by the active sort but is silent. Add a one-line caption above the rows (or the quick button's `title`): "Best available by Wins · fills a need · gone 34% before your next pick." The engine computes every input (`boardVM` sort, `openSlots`, `goneOdds`); the shell composes the sentence. This is the Owner's doctrine ("skilled = top-30 by Wins/Priority") made visible. Depends on the Architect's C′1 contract ruling; the council's prepared position is Contract B (`rawSort` on `BoardRowVM`).

**B2 — Team Select: the snake-map of your chosen slot.** P-317 lets you pick any slot 1–32, but the screen only prints a number. Draw a 32-cell round-1 strip with your team at N and the displaced team marked, plus "you also pick 33, 64, 71…". The slot choice is the most consequential decision in the draft; today it is a number. Pure view math over the store's `draftOrder` (no engine change).

**B3 — A pre-season "team grade" from the values the shell already has.** The moment between Complete and "Play week 1" is emotionally dead. Show overall grade, the three weakest rooms (L14 already ranks them), and **best value / biggest reach vs. the board** — derived from `slotWins20` vs. the player's position peers. This bridges draft → season and reuses the Complete roster print already shipped.

**B4 — A strategy dial, not just a sort.** A segmented control — **Best player / Biggest need / Best value** — that re-ranks the same `boardVM` rows shell-side (need = open slots; value = wins per OVR). This is the difference between a draft *simulator* and a draft *coach*, and it is the Owner's doctrine as a control.

## Part 4 · Structural bets (for the Architect / the tools lane)

**S1 — Deterministic slice battery seed (retires the T8 class).** Make the slice battery accept a fixed seed for its random-draw laws (env `CP_SEED` or `?seed=`), record the seed in the receipt JSON, and default the package path to it. Then `slice1-battery.json` is reproducible, any manifest-pinned receipt can be regenerated byte-for-byte, and the entire "repair bytes missing" failure mode (T8) cannot recur. This is the highest-leverage structural fix in the review and it is small.

**S2 — A seam contract/golden test.** The shell consumes a *frozen engine snapshot* through `src/lib/port/seam.ts`. Add a golden-file test: `boardVM` / `goneOdds` / `lineupFor` outputs for a fixed seed, snapshotted at the pinned engine and regenerated ONLY on a deliberate re-pin (the re-pin commit updates the golden). Then a re-pin that silently changes engine output fails at build, not at the Owner's first draft. This is the shell-side counterpart to the Architect's engine suite and the thing that makes each pin safe.

**S3 — The stale-server guard as a shared harness.** `falsify-board.mjs` now carries the D-2 guard (lsof kill, polled readiness, served-hash === copy-hash, UNRUNNABLE-is-failure). The other browser batteries (`board`, `slot`, `visual`, `shell`) still trust a blind sleep and a port. Extract `tools/serve-guard.mjs` and use it everywhere — one place to fix, one place to audit.

**S4 — `tools/repin.mjs` (carried from my v3).** The re-pin is five paths + `diff -rq` + suite + SNAPSHOT rewrite + pin banners, done by hand and receipted. That is exactly the shape `package-delivery.sh` proved can be automated: `repin.mjs <newsha>` moves the five paths, asserts `diff -rq` exit 0, runs `npm run test:engine`, rewrites SNAPSHOT.md, re-banners the docs, refuses on any mismatch. Every future pin becomes one receipted command.

**S5 — League config behind the seam (carried from my v3).** The shell hard-codes 32 teams / 32 slots / 32 rounds / strict serpentine. Either second sport (MLB plan M vs. NBA per AGENTS.md §2) should be data + an engine snapshot, not a UI fork: read team count, slot list, rounds and snake pattern from one `leagueConfig` behind the seam. Highest-leverage structural bet for "second sport post-v1.1."

**S6 — A "blocked-claim" discipline (process, from review D1).** A "not found / blocked" claim should name the search scope (roots, depths, branches). T8 said "not in any branch" (true) and "not on disk" (never checked) — the scope gap cost an item. One line in the inbox/README template.

## What I would NOT do
- No engine edits, no pin moves, no ratings (the Owner's alone) — every idea above is shell-side or a tools-lane proposal.
- No new number formats on the board until P-319's display rule (integers except Wins/Priority one decimal) is enforced everywhere; the `val()` string-parse in `DraftBoard.svelte`/`suggestIds` is the warning — fix the data export (S2), do not add display cases to parse.
- No per-game historical tuning / λ≠0 / GLM — the ratings→gap mapping is unmeasured; enabling a tilt now tunes an uncalibrated dial.
- No deterministic multiplayer, no 20-0 roguelike, no cross-era draft pools (the four rejected features) — not re-pitched.

## One-line summary
cakepanz-12 made the shell *safe*; the next sitting should make it *legible* (a reason on every ring, a bar on every gone%, a check digit on every code) and *durable* (a deterministic slice seed + a seam golden test), because the engine already knows all of it and the shell's job is to explain it — not to add features the engine would have to grow.