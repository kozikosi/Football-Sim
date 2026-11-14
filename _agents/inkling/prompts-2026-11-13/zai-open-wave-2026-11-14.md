SPEAKER: KG (Owner) + inkling | ROLE: Z.ai | TASK: open license — the product round; your imagination; receipts always | DATE: 2026-11-14 | Audience: Z.ai only

# INKLING — the open license, v2 (2026-11-14, incorporating all council reviews)

**This brief changes what you work ON and nothing about how you work.** How you work stays exactly as always: VERIFIED/REPORTED/INFERRED/UNKNOWN; four lines per claim; labels or silence; no frameworks ranked; imagination licensed; one handoff; the Owner relays; the engine consumes and never edits; `FLEX`/protected constants untouched; free tooling only; no writes to public repos or `colors/`.


## 0.55 · Errata in force — INKLING-reconciled (read before your first command of anything)

Four-seat receipts close the loop. Supersession of any conflicting text in §0 follows from this:

1. **Tier 1 is settled.** 104/104 ×3 (yours, Node 24) and ×3 more elsewhere on this wave (INKLING re-ran on Node 26: identical hashes). **No** re-run for this.
2. **The ratification-relevant block is the budget table.** Re-issue it per **Ernie's errata prompt** (`council/ernie: inbox/20261114-0740-ernie-inkling-review-and-zai-errata-prompt.md` — read it; Tone is correction, not rebuke). INKLING has answered his five claims in `inbox/20261114-0738-inkling-answers-ernie-errata.md` — W1 needs the smoke-vs-full-runs honesty; D32R needs min/median/max with both run-1 outliers **named (1583.09, 1101.23)**; recordBytes is **187,078–187,079**; the W1 row labels which receipt ships each number; nothing else changes in §0's receipts ledger above.
3. **The two genuinely broken artifacts:** (a) the engine-vendor digest — receipts say `432a1701…` (all four JSONs), prose says `cd298e99…` with NO receipt; INKLING's rerun says `753997bac4…` with 57 files. **State which one is authoritative, its how, and why 112 ≠ 57.** INKLING cannot adjudicate; your one line does. (b) `receipts/a3.json` — absent. Either ship it or downgrade REPORT §5 to REPORTED = **UNKNOWN**; no VERIFIED stand on missing bytes.
4. **ENG-2/ENG-3 are receipted under `timings.W4` — cite them, don't add them.** All four JSONs carry `W4.seasonMs` and `W4.p95GameMs`. Ernie's "no entry" is wrong on this one point; INKLING's errata answer names the exact keys and values so you can copy-paste instead of re-measuring.
5. **The "three artifacts owed" stay owed** — `a3.json` and `*-analysis.json` are what the Owner can't ratify on. Ship them with this wave; if not possible, file the verbatim blocker.
6. **Nothing below the license moves.** Tier-2 untouched; engine untouched; arms untouched; product untouched; FLEX and protected constants never; no framework word anywhere; imagination licensed as before.

## 0. Read in this order, every time, no skipping

1. `_agents/zai/START-OF-CHAT-ZAI.md` — the standing laws (unless amended).
2. **`_agents/ernie/deliveries/WR-BENCH2-zai-product-round-2026-11-14.md` at `origin/council/ernie` (commit `8a083ecd`, 257 lines)** — this is the work order of record. Read it completely. It already carries: the phase list A→J, the constraints, the receipt-law, and the thesis (BENCH-1's output was a data structure, not a framework verdict; this round is the same shape). If anything in this INKLING brief conflicts with Ernie's brief, **Ernie's wins and this brief is where it contradicts itself, not the other way round.**
3. `inbox/20261114-0727-inkling-bench1-v1-errata.md` (INKLING) — the repaired receipts record. Key facts, so they cannot be missed:
   - W1 parse+freeze per run: **19.81 / 40.13 / 10.38 / 9.73(smoke)**; inkling-rerun 6.30.
   - D-32R per run: run1 **772.4–1,583.1** (outlier 1583.09, mean 915.7 — JIT/GC INFERRED, you should warm up before measuring D-32R), run2 771.9–821.7, run3 785.7–840.2.
   - `W4.seasonMs` **IS receipted** (335.3 / 339.9 / 349.9 / 341.5-smoke; INKLING-rerun 257.3) · `W4.p95GameMs` 0.075–0.079 · `recordBytes` 187,078/187,079 with u31 carrying the extra byte.
   - `G5 600/600 ×2 runs` VERIFIED by three independent readers (INKLING/Beam/Glyph) + INKLING's own headless re-run of the harness: **104/104 exit 0**.
   - What is NOT receipted anywhere: `receipts/a3.json`, `receipts/*-analysis.json`, lanes B–F JSON outputs, watchlist repair logs — everything `REPORT.md §5/§8` treated as packed evidence. **Run `tools/driver/a3.mjs` and `analyze.mjs` if you possibly can; the outputs ride inside this handoff.**

**State of record (VERIFIED by three seats this window):** 104/104 gates ×3, hash identity across runs, engine byte-identical vs tip `d3bd81d` in both arms (`diff -rq` empty, 57 paths matched each), arm-fairness holds (≈124 LOC vue vs ≈133 svelte), run-1 vs run-2 wiring gap exactly reproduces (alerk 5,130/7,415/5,078 vue vs 1,235/2,333/1,599 svelte), corrected-wiring parity in run 2 (1.6 s class, both arms, same 11 goneOdds-heavy picks), G5 600/600.

## 1. The phases available — order is yours

The Owner ruled 2026-11-14: **no scope guard; Z.ai is licensed to wander.** Ernie's A→J ordering is his suggestion, not your cage — execution order, phase selection, and depth per phase are entirely yours; nothing here or in any brief fences you into a sequence. INKLING's recommendation (errata first, ratification benefits most from clean numbers before anything else) is advice, not law. The reading map, one line each, with INKLING's favourite order noted where it matters:

- **A · Save schema + resume test.** Highest-value lane. Build the save envelope you recommend; prove the save→quit→relaunch→resume identical-next-pick incl RNG position, on both shells; audit the BENCH-1 187,078 B record for the fields achievements/tendencies/best-seasons/favourites/brag-share need; size it after a full season and three.
- **B · Phone-class measurement** — CPU×4/6 throttle and slow 3G (native flag); the goneOdds cells on both arms; a phone-class number quoted with stated basis (device or stated factor; do not borrow averages).
- **C · Offline for real.** file:// + no display refreshables + no runtime font fetch (w89's Google fonts are the known risk). Surface every console error in the offline run verbatim.
- **D · The library test** (WR-BENCH2, Ernie's full spec inside the product round file): virtualized+persisted+filtered board over the full pool vs both shells. Vue's ecosystem bet is VueUse; Svelte's comparable is TanStack. Which tool each arm uses is the test's content — you invent it and defend it. Report whether the solution was easier in Svelte 5 or Vue 3 (or no different) for this feature with receipts; no comparison-by-narrative allowed.
- **E · Achievements as data**, tendencies, best seasons, favourites; one real data-file entry added = proof of extensibility.
- **F · Brag-share end-of-season card** — client-side; w89-idiomatic; a user would actually post; the design problem of the wave.
- **G · Conflict rule** with deliberately wrong clocks — highest-progress-wins; loser retained and disclosed once.
- **H · ≥44 px touch targets; embedded type (not required to be Cinzel); 360/390 clean.**
- **I · Shell determinism** — same seed → byte-identical board/log/summary text, not just engine.
- **J · Agent-defect pilot** — one bounded feature on one shell, counts by class, honest columns.

**Owner ruling 2026-11-14 (the one clause that outranks every other rule in this brief): no scope guard. You are licensed to wander.** Skip a phase, merge two, invent one nobody specified, end the wave early if you run out of buildable imagination, or file at 06:00 with six phases unopened — all legal. The record wants honest receipts from where you went, not dutiful coverage of where you didn't.

**Order is yours to choose. Depth per phase is yours to budget.** If any phase is blocked on your machine, log the block verbatim (it is a finding, not a failure), move on, and resume at the next session. Do the receipts BM that match your machine.

## 2. The extras (INKLING-licensed; imagination rewarded; nobody forced to play)

1. **The W89 essence skin** (`zai-w89-watchlist-run-2026-11-14.md` file at `a5c103d5`): star + filter + count persisted; w89 tokens extracted first (`w89-quirks.md` with byte offsets); `w89-shine` CSS analog for starred 90+ rows; Cinzel/Bodoni stack; espresso ground; champagne-gold body; NO white; OVR gold bubbles (85 vibrant / 90 shimmer); CAN YOU GO 20-0? header jingle; team-colour user-team label; ribbon quick-strip; **one self-invented stretch-N nobody proposed yet** — log it as "Stretch-N", screenshot it, and expect the Owner to ruling on whether it ships.
2. **Lane C/E/F** — the tooling shootout + perf instrument parity + heap/DOM tax (scripts ready, zero derivation).
3. **BENCH-1.5 — Pick Reveal** — Owner approved (see Glyph's filing `…-0655-…pick-reveal.md`, at `3e563749`). **Errata INKLING filed so you cite it accurately** — the file map you will find names bytes that do not exist (there is no `receipt.json` or `tests/board.spec.ts` in the published arms; wiring at `src-bench/Board.vue:20`/`Board.svelte:18`). Overarching goal only: **make the user's committed pick feel like a moment in the w89 language**. Which tools you reach for (one library, any bundle, raw CSS, both savings, whatever works and passes your own bar; the conventional suggestion is `@vueuse/motion` for Vue / built-ins for Svelte — but that is a hint, not a constraint) and how far you push it — your call. The deliverable is the receipt: a working reveal, plus your honest answer to one question — was it easier to build in Svelte 5 or Vue 3 for this feature? — answered with repair-log evidence either way (or no different).
4. **Stretch list — do whichever strikes you; all are optional; all need receipts:** the brag-share card (E/F merged lane with a single cultural criterion: "would I post this?"); the 20-0 card (one shimmer event at season end); the phone-singular thumb run; a second copy of any run as agent-defect pilot ground; whatever you notice in the w89 bytes that nobody noticed.
5. **Deep-dive bet nobody has made yet:** one genuinely large layout pass — **make the verdict himself on the phone layout**: build the one screen you'd show a non-fan phone, and put w89's spirit inside it flawlessly. This wave's own statement: only more beautiful and more dynamic.

## 3. Deliverable (one handoff; relay publishes it)

`download/zai-open-wave-2026-11-14/` — ONE package, containing, in order of importance: REPORT.md · w89-quirks.md (or the phase outputs) · receipts/ (raw logs, JSONs, screenshots) · arms/ (artifacts) · **MANIFEST.txt** sha256 each (232+ entries) · the two missing-artifacts files if you produced them. **One zip or nothing; no separate fix-it or caveat zips later.** Commit by path in whatever checkout you build; never push; never `--force`; engine untouched; only your lane's files.

## 4. The honest ledger (what stands and what fell, recorded this window)

| Item | Status |
|---|---|
| 104/104 gates ×3 | VERIFIED ×3 seats (INKLING re-run included) |
| datasetHash identity | VERIFIED (all seats, agree) |
| G5 600/600 ×2 | VERIFIED (INKLING recomputed; Glyph recomputed; Beam recomputed) |
| Wiring gap run1→run2 | VERIFIED (analysis-time tie-rule application between is still noted UNKNOWN without the missing `*-analysis.json`) |
| W1/ENG-1 numbers | CORRECTED this pass per `inbox/20261114-0727-…errata.md` |
| `a3.json` / `*-analysis.json` / lanes B–F receipts | UNKNOWN — absent; owed inside the package |
| Node 22 (A2) | UNKNOWN — never run, never promised, costated honest |
| Vendor digest basis `cd298e99` vs `432a1701` | INKLING logs both, refuses to pick — the bytes agree |
| `timings.W4.seasonMs` receipted | YES (disproving the "no season run receipt" reading) |

## 5. What INKLING needs back from this run

**One line for the relay and the ratification packet:** "rows W1/ENG-1/ENG-2/ENG-3/SAVE-1 PASS BY WIDE MARGINS EVERY TIME; UX-1/UX-2 UNSIGNABLE FOR NOW; A2 UNKNOWN; analysis-time NOT APPLIED; run2 G5 PARITY HELD ×2." A handoff that carries those two sentences and one zip is a success; anything more than that is bonus.

Every artifact labelled as always. No words about which framework is better, anywhere, including in file comments. Commit by path. Never push.

— KG + inkling (redrawn post-council audit; INKLING signs for receipts, not votes)
