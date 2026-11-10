SPEAKER: super | ROLE: Council Adviser | TASK: P-195 Engine acceptance tests E1-E9 | DATE: 2026-11-10T01:07Z
FOR: P-195

## Summary

P-195: Write the engine acceptance tests E1-E9 (ENGINE-MATH-SPEC §7) as a runnable spec for the Architect's V23 build. **Snippets only — no product edits.** Each test names the break that makes it fail. Source: `_agents/ENGINE-MATH-SPEC.md` REV 5 §7 (read in full via `git show origin/council/muse:_agents/ENGINE-MATH-SPEC.md`).

Status per §7: E1–E4, E8, E10 are runnable in the lab now (`run-all.sh` prints `ALL ENGINE-MATH TESTS PASS`, VERIFIED 26 Oct and re-verified 27 Oct with DL5). E5–E7, E9 "await the build" — they need the V23 product file with the patched math. This filing marks each test runnable-now vs. awaits-build, gives the exact command, the pass criterion, and the break that fails it. All file/line claims checked against `origin/council/muse` and `origin/architect/engine-and-seats`; labels VERIFIED / INFERRED / UNKNOWN as noted.

---

## E1 — engine-derived integers equal the table

**What it checks:** `check-design.mjs` refits the engine and confirms every derived integer weight equals the design table (§2) with |Δ| ≤ 10 and 0 inversions at gap ≥ 30. All 29 (REV 4) / 30 (REV 4+DL5) / 32 (REV 5) spots.

**Command:** `node tools/mathlab/check-design.mjs <fit-file>` where `<fit-file>` is `results/fit-precolors-2026-10-27-dl5.json` (30-spot DL5 fit) or `results/fit-precolors-2026-10-28-recv.json` (32-spot REV 5 fit).

**Pass:** `check-design.mjs` exits 0, prints max |derived − design| = 0 and 0 inversions (VERIFIED on both fits, 27 and 28 Oct).

**Break that fails it:** any design value changed without refitting (e.g. QB 1000 → 900) produces max |Δ| > 10 or an inversion; `check-design.mjs` exits non-zero. E8 is the explicit corruption variant of this test.

**Label:** VERIFIED (ran in lab 27/28 Oct, `run-all.sh` ALL ENGINE-MATH TESTS PASS).

---

## E2 — QB = 1000, all weights end in 0

**What it checks:** same `check-design.mjs` run verifies QB spot = 1000 and every weight is a whole number ending in 0 (a 5 only where it clearly improves accuracy).

**Command:** `node tools/mathlab/check-design.mjs results/fit-precolors-2026-10-28-recv.json`

**Pass:** exit 0; QB weight prints as 1000; all weights match `/[0-9]*0$/`.

**Break that fails it:** QB set to anything other than 1000, or any weight ending in a non-zero digit (e.g. DE1 523).

**Label:** VERIFIED (same lab run as E1).

---

## E3 — flex: flexparse + flexcheck + flexdl5 + flexengine

**What it checks:** the flex guide REV 2 (95 rules) compiles correctly into the engine's table form.
- `flexparse.mjs` re-derives all 95 rules from the Owner's text and equals `flex.json`.
- `flexcheck.mjs` validates penalties ∈ {0, 2, 4, 6} (no unknown slot, role without row).
- `flexdl5.mjs` derives the DL5 destination rules from `flex.json` (DT/EDGE natural at DL5; other roles at cheaper of role→DT and role→EDGE).
- `flexengine.js <html>` loads the compiled table into the live engine and asks `flexPenaltyFor` for 21 tags × 29 slots (609 cells) plus 23 spot checks from the Owner's text.

**Command:**
```
node tools/mathlab/flexparse.mjs
node tools/mathlab/flexcheck.mjs
node tools/mathlab/flexdl5.mjs
node tools/mathlab/flexengine.js file://$PWD/Football-Sim-PreColors.html
```

**Pass:** all four exit 0; `flexengine.js` prints `FLEXENGINE OK: the engine reproduces the Owner guide on every tag x slot` (VERIFIED 26 Oct; E3c spot check `['TE3','TE2'], ['TE4'...]` confirms TE3 == TE2 and WR4 == WR3 for all 21 tags).

**Break that fails it:** corrupting one rule (e.g. WR→DIME 4→2) makes `flexengine.js` exit 1 (VERIFIED break test in §7). `flexcheck.mjs` exits 1 on any penalty outside {0,2,4,6} — note this means `flexcheck.mjs` on `council/muse` **cannot validate the post-items-3+7 tier-12 table** (see P-193 F5; the architect branch `flexcheck.mjs` was already updated to accept 12).

**Label:** VERIFIED for E3a–E3d on REV 2 (95 rules). REPORTED for the tier-12 table (items 3+7 not yet applied; `flexcheck.mjs` on council/muse rejects penalty 12).

---

## E4 — real-roster realism tripwire

**What it checks:** `realcheck.js` computes team strength from 32 real rosters (best players at natural slots, missing slots = 70, DIME installed) and correlates with 2025 final wins. Requires r ≥ 0.60 and spread 4.0–5.5 pts/g.

**Command:** `node tools/mathlab/realcheck.js Football-Sim-PreColors.html results/fit-precolors-2026-10-27-dl5.json wins2025.json cfg.json`

**Pass:** r ≥ 0.60 (measured 0.663 with DL5 vs 0.665 without — no change, VERIFIED) and spread within 4.0–5.5 pts/g (measured 4.42).

**Break that fails it:** making QB nearly worthless fails it (spread 3.77, VERIFIED as a deliberate break). Finer hierarchy errors pass — this is a coarse tripwire only (n = 32, standard error of r ≈ 0.11).

**Label:** VERIFIED (lab run 27 Oct). UNKNOWN whether it catches subtle hierarchy errors (acknowledged limitation in §4).

---

## E5 — kick + punt return split sums to RET_PTS

**What it checks:** the return-game terms satisfy KR_PTS + PR_PTS = RET_PTS (= 2.36) at equal scores, with the Owner's split kick 1.50 / punt 0.86.

**Command:** to be written against the V23 product file — `tools/mathlab/` has no standalone E5 script yet; inspect the `RET_PTS` term in the product's inline script and confirm `KR_PTS + PR_PTS === RET_PTS` and `KR_PTS / RET_PTS ≈ 1.50/2.36`, `PR_PTS / RET_PTS ≈ 0.86/2.36`.

**Pass:** `KR_PTS + PR_PTS === RET_PTS` holds; split within rounding of 1.50 / 0.86.

**Break that fails it:** `KR_PTS + PR_PTS !== RET_PTS`, or the split materially different from 1.50 / 0.86 (e.g. kick 2.0 / punt 0.36).

**Label:** AWAITS BUILD — needs the V23 product file. `RET_PTS = 2.36`, kick 1.50 / punt 0.86 are specified in §3 but marked UNKNOWN-calibrated (P-191: PFR refused our fetch; PFF gives only the 76% return rate).

---

## E6 — 3-4 equivalence (OLB = WILL, ILB = MIKE)

**What it checks:** in a 3-4 base, OLB slots use the WILL row of every spec and ILB slots use the MIKE row. `matchupModel` / `teamRatings` / `slotWinsTable` must give identical results whether a slot is labelled WILL/OLB or MIKE/ILB at the same OVR.

**Command:** to be written against the V23 product file — evaluate a 3-4 lineup with OLB1/OLB2 vs WILL row and ILB1/ILB2 vs MIKE row; confirm identical wins contribution at equal OVR.

**Pass:** OLB1 == WILL and ILB1 == MIKE in all spec lookups (frontBase, frontNick, frontRun, coverage, passRush).

**Break that fails it:** Z.ai's `zpbAdjSpec` audit (VERIFIED by reading) found ILB2 keeps WILL weights (should be MIKE: front-run 1.1 vs 0.91) and OLB2 lacks WILL's pass-rush share — that is the break this test catches.

**Label:** AWAITS BUILD. Break is IDENTIFIED (ILB2 WILL weights, OLB2 missing pass-rush share) but not yet executed against V23.

---

## E7 — Guide, draft board and Position Rankings read one weight source

**What it checks:** the Guide page, the draft board Wins column, and the Position Rankings dropdown all display the same single weight source (the engine's `slotWins20` / design table), not divergent hand-set values.

**Command:** to be written against the V23 product file — grep the product inline script for all places weights are read for display; confirm a single source of truth. Cross-check against `tools/mathlab/design.json`.

**Pass:** one weight source feeds all three displays; `design.json` matches what the board shows.

**Break that fails it:** the board shows `SLOTS[].weight` while the Guide shows `slotWins20` (the divergence P-318/P-319 are meant to resolve), or two different weight tables in the product.

**Label:** AWAITS BUILD. This is the core of P-318/P-319 (slotWins20 drives the board; display rule: integers except Wins/Priority one decimal).

---

## E8 — corrupting a weight fails E1

**What it checks:** E1 is sensitive — changing one weight breaks it. Explicitly VERIFIED in §7.

**Command:** take a copy of Pre-Colors, edit one design literal (e.g. K 200 → 600), run `check-design.mjs` on the refit.

**Pass:** E1 exits non-zero; §7 reports K = 600 → 21 failures.

**Break that fails it:** E8 itself is the break test — if `check-design.mjs` still exits 0 after a weight corruption, E8 fails (the test suite is not sensitive enough).

**Label:** VERIFIED (§7: "changing one literal, PUNT_PTS 1.084→2.4, fails it with P 100→220"; K = 600 → 21 failures).

---

## E9 — DIME: empty slot = 70; share fixed; sensitivity bounded

**What it checks:** DIME (slot #29) is a fixed 15% share of coverage, not a game-plan package.
- Empty DIME slot = 70 OVR.
- DIME cannot be selected as a game plan (no DIME entry in `DEF_OPTS`).
- Shifting `DIME_W` 0.10 → 0.20 moves no other spot by more than 20 points.

**Command:** to be written against the V23 product file — inspect `DEF_SPECS.covDime` and the `coverage = (1−0.15)·coverage_pkg + 0.15·covDime` line; confirm `DIME_W = 0.15`, empty-DIME default 70, no DIME package option; sensitivity run shifting `DIME_W`.

**Pass:** empty DIME = 70; no DIME in `DEF_OPTS`; sensitivity |Δ| ≤ 20 points per spot (VERIFIED in lab: w 0.10 → DIME 20, 0.15 → 40, 0.20 → 50; other spots move ≤ 20).

**Break that fails it:** DIME modelled as a `DEF_OPTS` package (would run dime every snap and overvalue the slot ~10x, per §3 reasoning); empty DIME default ≠ 70; sensitivity |Δ| > 20 for some spot.

**Label:** AWAITS BUILD. Sensitivity VERIFIED in lab pre-build (§3); product-file checks await V23.

---

## E10 — pasted literals reproduce the fit (bonus test from §7)

**What it checks:** `apply-math-patch.mjs` edits a copy of Pre-Colors by exact anchors (aborts on any mismatch) and `verify-patched.js` re-measures the patched file directly, confirming max difference 0.0 wins vs the fit.

**Command:**
```
node tools/mathlab/apply-math-patch.mjs Football-Sim-PreColors.html out.html results/fit-precolors-2026-10-28-recv.json cfg.json
node tools/mathlab/verify-patched.js out.html results/fit-precolors-2026-10-28-recv.json
```

**Pass:** `apply-math-patch.mjs` exits 0 (all anchors matched); `verify-patched.js` prints max difference 0.0 wins.

**Break that fails it:** any anchor mismatch aborts the patch (exit non-zero, "fail loudly"); changing one pasted literal (e.g. PUNT_PTS 1.084 → 2.4) makes `verify-patched.js` fail (VERIFIED: P 100 → 220).

**Label:** VERIFIED (lab run 26/28 Oct; exact-hash reconciliation done).

---

## Test status summary

| Test | Runnable now? | Status | Break identified? |
|---|---|---|---|
| E1 table integers | YES | VERIFIED | weight corruption (E8) |
| E2 QB=1000, weights end 0 | YES | VERIFIED | non-1000 QB / non-0-ending weight |
| E3 flex pipeline | YES (REV 2) | VERIFIED / REPORTED | corrupt one rule (WR→DIME 4→2) |
| E4 real-roster r/spread | YES | VERIFIED | QB nearly worthless (spread 3.77) |
| E5 RET_PTS split | NO — awaits build | UNKNOWN | KR+PR ≠ RET_PTS |
| E6 3-4 equivalence | NO — awaits build | IDENTIFIED | ILB2 WILL weights / OLB2 no rush |
| E7 one weight source | NO — awaits build | UNKNOWN | two divergent weight tables |
| E8 corruption fails E1 | YES | VERIFIED | K=600 → 21 failures |
| E9 DIME fixed share | PARTIAL (lab only) | VERIFIED (lab) | DIME as DEF_OPTS package |
| E10 pasted literals | YES | VERIFIED | anchor mismatch / literal edit |

**Note:** E5–E7, E9 (product-file checks) await the V23 build. Per §7: "E5–E7, E9 await the build." This filing provides the exact command and break for each so any seat can run them once V23 exists.

**HOW TO CHECK:**
- `git show origin/council/muse:_agents/ENGINE-MATH-SPEC.md` §7 — the authoritative test list (E1–E4, E8, E10 runnable; E5–E7, E9 await build).
- `git show origin/council/muse:tools/mathlab/run-all.sh` — the lab runner that prints `ALL ENGINE-MATH TESTS PASS`.
- `git show origin/council/muse:tools/mathlab/results/fit-precolors-2026-10-28-recv.json` — the 32-spot REV 5 fit used by E1/E2/E10.

**VERDICT:** ok — P-195 filed as snippets-only test spec. No product edits, no protected constants touched. The Architect can copy these into the V23 test order; E1–E4/E8/E10 are already VERIFIED passing in the lab.
