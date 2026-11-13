# Z.ai — the next work order (2026-11-13)

**From:** KG (the Owner). **Drafted for hand-off by:** the INKLING seat, 2026-11-13T04:47Z, at the Owner's request. **Acting on it:** Z.ai, High Councillor. **FOR:** the multisport build · P-341 · P-345 · P-346 · P-354 · the framework test · the Owner's 2026-11-12/13 rulings.

This is **the** work order. It supersedes nothing — it sequences, gates and binds the work that is already owed to you, and freezes today's verified state so it does not drift. Read it top to bottom; do not start work until §0–§2; stop and report if you hit a gate in §4 that the Owner has not ruled on.

You have already shipped (2026-11-13, reviewed by INKLING; reviews pushed on `council/inkling`, `6fa14618`): the five-arm framework test (all five rebuild GREEN — INKLING verified on a clean machine), the 284/284 green engine-suite result at the pin (`4ca9a071`, INKLING re-ran it: **284/284 PASS**), the runtime purity harness (**3/3 PASS at the pin**, INKLING re-ran it), A1/A2/A3/A4 (A3's check script re-ran clean — **exit 0, ALL 11 ROWS REPRODUCE**), and CHECKSUMS `466/466` verified by INKLING. **Do not re-litigate any of it.** Where this prompt repeats a settled fact, it is so your batch does not drift from it — cite it, do not redo it.

---

## §0 — Who you are in this batch, and what "done" means

- You are **Z.ai** — High Councillor, Executor of Z-post-blue and 67 Cakepanz. You never edit the product file (`Football-Sim-*.html`), `colors/src/`, `flex.json`, `flex.ts`, `specs.ts`, `MERGE-MANIFEST.md`, or the Architect's planning documents. The Architect integrates; you build and propose; the Owner decides product direction.
- "Done" means: **one zip**, one response, **CHECKSUMS.txt sha256 LABELLED**, computed on the shipped bytes, verified from a **fresh extraction** (your own rule — honor it). Because your sandbox cannot push (`git push` hangs; no credentials — INKLING verified you have no `gh`), the zip is the delivery, and the Owner hand-copies it to `origin/council/glyph` (where the Owner just landed your last wave as `5903ccb6`). Also ship the primary files **individually**, named plainly, for the Owner's download UI.
- **INKLING reviews what you ship** (and has receipted all of your recent work). Assume every CHECKSUMS bundle will be re-verified, every claim will be re-run where cheap, and every "done" will be checked against the state below. That is the standard, and it has been met by your last two deliveries. Keep meeting it.
- **Label every claim** VERIFIED / REPORTED / INFERRED / UNKNOWN. Prefer "blocked, with the precise cause and the 15-minute unblock procedure" over a quiet shortcut. That is what A.1 did — it was right.

## §1 — Verified ground truth (do not re-derive; cite)

**Two-current-truths, commit-scoped** (state every number with its commit):

| Fact | Value | Verified by |
|---|---|---|
| Engine suite at the pin `4ca9a071` (archive extraction, colors+data+tools) | **284/284 PASS** | Z.ai (sha) + INKLING re-run 2026-11-13 (Node v26.13.0) |
| Engine suite at the Architect tip `bebe8e0b` | **320 tests / 318 pass / 2 fail** — lineup base-totals **2700≠2400**; versions **PIN_ENGINE `nfl1.14a4e9333e888a` vs `nfl1.108bcc20a9f253`** | INKLING re-run 2026-11-13 (identical pair to the 2026-11-11 recheck) |
| `packages/colors` has no app entry | `git rev-list --all -- colors/src/main.ts` → empty; 0 `.svelte` files | INKLING 2026-11-13 |
| 67 Cakepanz is the runnable application | `main.ts` + `App.svelte`; only runtime dep `svelte ^5.57.3`; 10 `.svelte` files | INKLING 2026-11-13 |
| Fork vs library engine | **21/25 same-name files byte-identical** (draft/flex/slots/value differ); fork = library minus `events.ts, fold.ts, keyedrng.ts, pack.ts, legacyprovider.ts` | INKLING 2026-11-13 |
| `design.json` | **sha `8dab60a6b71c11f9…` identical on Architect branch and fork** | INKLING 2026-11-13 |
| `.github/` | empty on main, architect/engine-and-seats, gh-pages, council/muse | GLM + INKLING cross-checked |
| Root `package.json` | absent; the Colors suite reads `data/` and `tools/` at the repo ROOT | Z.ai systems report + INKLING |

**Settled rulings (Owner; never re-open in this batch):** 0.20/0.40 binary FALSE; λ objective NOT decided — third objective + fluctuating dial are live; per-slot C>OG = **both spots** (V3 resolution); **emerge, don't mirror**; user sees **only Wins, Priority, OVR** with consistency — the dual-display is dead; flex prices stay **consistent** through the year; no injuries in any sport; form visible as green/red arrow, no text/emoji; calibration targets **static**; draft class fixed; user never sees raw prices/mae/λ; **basketball is design-only** until football ships; **Priority-not-Wins**; 32 rounds kept; **no per-player clutch metrics**; OVR + preferred position are the only true inputs; the 99 is a guide, not a target, not a mirror — the model emerges.

**Settled state you shipped and INKLING verified (commit-bound):** five framework arms, all green (Svelte+Vite 280 ms; React 291 ms; Vue 362 ms; SvelteKit adapter-static 1.59 s; SolidStart Nitro OK — INKLING re-built all five) · leakage **zero** in arm-owned code and for the public API boundary · round-2 zero-arm-owned-edits across five arms · your CHECKSUMS 466/466 OK · A.3's script exits 0 with 11/11 rows · A4's E3 sentence now correct · the two red tests at the tip belong to the Architect (re-pin or revert — his call, not yours).

## §2 — Read these three prompts in this order before working

They are the substantive specs; this order letter points at them (no AGENTS.md reads; your seat file is assumed read):

1. **`git show origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/zai-dynamic-engine-2026-11-11.md`** — **the nine dynamic-engine filings D.1–D.9** (offensive focus; matchup-aware slot value; form; group synergies; gravity/double-teams + the advanced-stats surface; the clutch visual; cross-side stars; the data cuts; "what else is static?"). **This batch is P1** — it is the biggest outstanding block of owed thinking, and nothing in the Owner's rulings relieves it.
2. **`git show origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/zai-next-comprehensive-2026-11-11.md`** — **Parts B, C, D** (Part A landed 2026-11-13; do not redo). Part B = the third objective work (creative testing; the stable structure with the dial as a parameter; the fluctuating dial — name the concepts and the receipt for each; B.2 the emergence-report shape for the flip table; B.3 the display options written for the Owner — dual-display noted dead, metrics pitch as your own proposal; B.4 the LOO direction analysis as a receipt). Part C = the gated items (C.1 era-snapshot staging **waits on the Owner** — prepare both options, build nothing; C.2 gravity-fold consumption **waits on the Architect's `air_yards` spec** — spec it, invent no proxy; C.3 DIME re-anchor **via the Architect**, target 0.126 not 0.15, engine files untouched; C.4 the P-347..P-353 four paragraphs, one per item touching your lane (P-347, P-348, P-350, P-353) — *what you'd do if ratified, what you'd do instead if not*; C.5 the B-numbers confirmed-or-corrected one-liners in your README). Part D = the open innovation questions (D.1 third objective frame; D.2 display/metrics pitch; D.3 the emerging-formula question; D.4 basketball duty table — design-only; D.5 frontier attempt at ≥96/97 with mae ≤1.10, negative results allowed); D.6 the variance budget real-data half; D.7 what else is static — do not stop at λ).
3. **`git show origin/council/glyph:zai-framework-test-systems-parta-2026-11-13/results/FRAMEWORK-TEST-RESULTS-2026-11-13.md`** — your own filing (verified together with INKLING's re-runs). Its open items are **not yours to close alone**: D1 (fresh-session protocol — disrupted in the sandbox), D3 (Vue-via-Vite chosen; Nuxt untested — flagged for the Owner), and the measured vs judgment half split (you will not score your own arms; the judgment-half scoring is the council's under GPT's weights; the executed Playwright spec ships as your one-command-per-arm instrument — you do not run it unless separately directed).

If any of these paths moved, say so with the actual tip you read — never guess content from memory.

## §3 — The work, in order

**Part 1 — D.1–D.9.** One inbox filing per question, filed in your own inbox then zipped. Each filing: the proposal, the receipt (script+README+CHECKSUMS when cheap; a precise named receipt when not — "someone else could run this"), the failure mode (when does the thing break / become a trap?), the open Owner-question it carries. Do NOT build any of it into the product. D.6 (your singled-out job) — the clutch visual — deserves the most thought, not the most length. D.8 — the two open data cuts (HFA in playoffs; upsets in rivalry games) — run them if they are cheap (they are: groupBy on P-344 games, ~30 min); do not cite stale aggregates.

**Part 2 — B + C + D from the comprehensive prompt.** Work them exactly as scoped there. Re-read Part B settled criteria verbatim: (a) the testing programme (name the tests, the order, what each settles — run the first if cheap); (b) the shipped module + fit tables with the dial as a parameter, shown with the parameter visible; (c) the fluctuating-dial concepts named with a test for each — paired with your Part 1 D.2/D.9 work, coordinate so the two filings cohere (file one cross-reference line in each); (B.2) one 11-row table in the emergence-report shape with the Owner's table as reference column — keep or kill by its own quality; (B.3) the display options ready for the Owner, not decided; (B.4) the form × refit-rule × direction count table; (C) the C.1–C.5 paragraphs exactly as spec'd; (D) D.1–D.7 filings, honest negatives accepted.

**Part 3 — Framework-test judgment-half preparation (three concrete outputs, nothing else).** (i) The arms decision packet for the Owner: five arms as built vs the frozen four-design; the incumbent double-use (the Svelte+Vite arm is the reference implementation of the offensive-focus feature on the product's own stack — name it that); the D3 Vue/Nuxt call; expected direction of judgment-half scoring per GPT's weights — written as *input*, never as verdict. (ii) The executed-evidence instrument: the exact command lines per arm for the Playwright spec (`npx playwright test playwright/offensive-focus.spec.ts` from each arm root with its server started by the arm's own `npm run preview` or equivalent), plus the list of what a red result would mean (contract violation vs arm-specific defect). (iii) The round-2 hash evidence for a formal re-run, if the Owner orders one: capture arm-owned sha256 manifests before/after a **sixth** synthetic focus; label the single-author confound loudly. No sixth focus exists; do not create one unless directed.

**Part 4 — Record-hygiene lines (one line each, into your delivery README).** Every correction outstanding from the last two waves: the five v3 corrections re-checked post-Fix-4 (state 72/72 or what remains); the REV 4 "structurally impossible" README wording if it survived A.1; the C2 D4 field (relabelled, not deleted); the freeze status of `VLOC`'s raw-parquet re-runs (B.1); your $reports\ of the 2 red tip tests (named: lineup `2700≠2400`; PIN_ENGINE `nfl1.14a4e9333e888a` vs `nfl1.108bcc20a9f253`) as "owed by the Architect".

## §4 — Owner gates (stop and wait; do not resolve)

1. **C.1 era-snapshot staging** — data consumed or static + spot-table: **the Owner's call; prepare both; build nothing.**
2. **Framework questions** — the arms set, D3, a formal fresh-session re-run, the Playwright execution run, the final framework verdict: **the Owner decides; the council scores; you provide raw input.**
3. **A.1's blocked 72/72 re-run** — the raw nflverse parquet is MUSE's local workspace. Either the Owner instructs MUSE (the custodian) to run it (~15 min, the unblock procedure is in A1-PATCHES-NOTE), or it is permanently marked BLOCKED-with-cause and the README wording gets fixed in this batch — the Owner will say which. You cannot fix this by yourself; do not route around it.
4. **P-316 (slice 3) / P-317** — **not authorized in this batch.** P-317 remains blocked on Claude's store change; P-316 waits on an explicit Owner go.
5. **Anything hitting a protected constant** (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS), any engine-file edit (this includes the contract vendored files — they stay byte-identical), any product-file edit, any ratings/data change: **stop, explain, wait.**

If one of these blocks you, reply with the blocker named exactly (which asset is missing, which decision is needed, and what the 15-minute unblock looks like) — do not ship a partial silently.

## §5 — What to include in your delivery (the shape)

- `inbox/` one file per filing (Part 1 + Part 2 D), in `<UTC>-zai-<id>-<slug>.md` form with your seat header and `FOR:` lines.
- `deliveries/framework-test-judgment-packet/` (Part 3): the Owner packet (one page), the spec command lines, the round-2 hash protocol.
- `deliveries/partb-emerge-spec/` (if Part B produced tables/scripts): the module sketch with the dial as a parameter (as a file, not prose only), the emergence table, the B.4 direction table, the display-options page, named with dates.
- `README-DELIVERY-<date>.md` at the root: every correction/decision/flag outstanding (Part 4), CHECKSUMS.txt, and the explicit list of what you did **not** do and why (D.6's simulated half? the re-run? the C2 relabel? — name each).
- A top-line **flags for the Owner** section in your reply text: the two or three questions you could not settle by yourself, each with your recommended default and the consequence of being wrong. The Owner answers or hands back.

## §6 — What to explicitly not do

No partnered edits of any kind outside your lane. No injuries mechanics. No per-player clutch metrics (form ≠ clutch attribution). No flex-price fluctuation proposals (flex is consistent). No draft-class-variable proposals. No calibration-target "improvements" framed as features. No multi-sport *builds* (basketball = design filings only; no simulation runs, no UI, no pack code). No claims of user acceptance (you cannot observe it). No academy-style rewrites of the product for "server-ready" reasons — commands-in/results-out is the ceiling of that line here (the Architect lands that, in his files, on his review cycle). No §-numbering drift: Parts and D-references in this document are stable labels — use them as-is.

## §7 — Done checklist for the Owner's final read

- [ ] Part 1: nine filings filed (D.1–D.9), each with proposal + receipt + failure mode + the Owner-question it carries
- [ ] Part 2: Part B settled criteria met (programme proposed; dial-as-parameter shipped as file; fluctuating concepts with receipts; B.2 one 11-row emergence table; B.3 options page + metrics pitch; B.4 direction-count table) · Part C touch items written (era-snapshot both-options proposal; air_yards spec; DIME proposal; four P-347..P-353 paragraphs; README B-lines confirmed/corrected one each) · Part D filings (D.1–D.7; negatives labelled as such)
- [ ] Part 3: Owner packet; per-arm spec command lines; round-2 hash protocol
- [ ] Part 4: README line-items all present or flagged with cause
- [ ] CHECKSUMS.txt sha256 LABELLED on shipped bytes; fresh-extraction verify reported; individual files named for the Owner's download
- [ ] "What I did not do, and why" section present and honest
- [ ] No protected constant moved; no engine file edited; no assumption smuggled past a gate in §4
- [ ] One response, all parts complete, or the named blocker with the unblock procedure

*The batch rule binds: complete everything, one zip, one response.* Silence on a task means "not understood" — if the prompt is ambiguous anywhere, say so in your reply rather than improvising past it.
