# REV-9-ERRATA.md — every change from Rev 8 to Rev 9, with file, old → new, command, output

Seat: Z.ai · 2026-11-16 · Rev 9 merged sitting. Format follows Rev 8's errata.

## 0.1 — verified-as-of.json manifest claim
- OLD `"358/358 OK"` → NEW `"360/360 OK, re-verified by shasum -a 256 -c CHECKSUMS.txt (run from inside REV-5.1-addendum/) on 2026-11-16, exit 0"` + the cwd trap documented. Command + exit: `(cd REV-5.1-addendum && shasum -a 256 -c CHECKSUMS.txt)` → 360/360 OK, exit 0.

## 0.2 — VERIFY.txt §1 root-manifest count
- OLD "658 entries" (×2) → NEW the actual regenerated count (the Rev 8 manifest already had 659 sha rows; Rev 9's final count is stated in VERIFY.txt §1 and must match file AND gate). Reason: "recount after any edit; the count must match both the file and the gate's output".

## 0.3 — r51_patch.py shipped
- OLD (Rev 8 erratum 0.5): "UNVERIFIABLE" → NEW: `scripts/r51_patch.py` + `scripts/r51-patches.json` SHIP. `--verify-shipped REV-5.1-addendum` → 19/19, exit 0; `--reproduce <pre-patch> <rev6-addendum>` → 12/12 byte-identical, exit 0. The receipt's 17/17 counted fix-table rows; the byte diff atomizes to 19 hunks over the same 12 files. REV-5.1-ADDENDUM.md's note rewritten accordingly (its hash re-pinned by the regenerated addendum manifests).

## 0.4 — C2 gate vacuous pass (the gate, not only the manifest)
- OLD: a manifest parsing to 0 sha-entries PASSED → NEW: UNPARSEABLE → FAIL, exit 1 (also prose junk lines fail). Probe receipt: receipts/gate-c2-rev9-unparseable-probe.txt (exit 1). Live catch: REV-5.1-addendum/MANIFEST.txt was 47 lines of prose → converted to a 359-entry sha-list (+comment header), CHECKSUMS.txt regenerated → 360/360, gate PASS. The Rev 8 gate receipts that showed "0 entries → PASS" remain as history.

## 0.5 — E3 interpretation line
- verified-as-of.json e3 entry + DELIVERY-NOTE: added the interpretation of countBeforeSort/ovrTopAfterSort (draft-board footer VM, identical by construction).

## 0.6 — CI wiring
- NEW .github/workflows/rev9-gates.yml (delivery root, enforcing) + .github/workflows/gates.yml per repo (byte-identical; manifest gate enforcing over the NEW repo CHECKSUMS.txt; numerals gate REPORT-ONLY in-repo with expiry 2027-11-15 — after which it fails with "EXPIRED … promote to enforcing or remove").

## 0.7 — repo CHECKSUMS.txt (new)
- NEW in both repos: sha256 over everything except node_modules/.git/dist/.github and itself. Purpose: the repo's manifest gate is ENFORCING, not vacuous, and the bench-critical bytes (probes/truth.json, probes/season-seed-2027.json, fixture.json, shared layer, CSVs) are pinned. Regenerated at packaging (any file change invalidates).
- **Rev 10 correction: the entry counts this erratum originally typed ("129 vue / 132 svelte entries") were WRONG on the shipped tree** — the shipped manifests verify 141 (vue) / 142 (svelte) entries, counted three ways (grep -cE, an independent python count, gate-manifest.mjs's own per-manifest line). Either the counts were stale when written or the repos were re-pinned after drafting. The counts are now COMPUTED, not typed: `node scripts/regen-manifest.mjs counts` prints every manifest's entry count and the packaging receipts paste that output. Falsifier: add one file to a repo, regenerate, the printed number moves (receipts/checksum-counts-falsifier.txt: 142 → 143).

## 0.8 — nested manifest converted (0.4's companion)
- REV-5.1-addendum/MANIFEST.txt: OLD 47 lines of prose → NEW sha-list (359 entries, 19 header lines carrying the old inventory as comments); CHECKSUMS.txt: OLD 360 → NEW 360 (incl. the new MANIFEST bytes).

## R9.1 — SEALED-RECIPE ambiguity (the league construction)
- The recipe did not state the league→ratings construction; four hand-rolled engine-typed constructions failed to reproduce probes/truth.json. Resolution (shared layer, recipe-conformant): seasonVM.runSeason(pool, picks, 2027, 2027). Patched into SECOND-AGENT-HANDOFF.md preflight step 5.

## R9.2 — handoff preflight + stall list (R9.3 mechanical falsifier)
- SECOND-AGENT-HANDOFF.md: preflight (5 steps incl. the recipe sha FIRST and the gates green before authoring), stall list (the Rev 6 hang's process-group fix, install/stall/retry-once policy), and the falsifier as a mechanical rule (thresholds, no rounding, author-run caveat).

## 0.9 — tokens-w89.ts string bug
- The first cut had `Owner's` inside a single-quoted TS string → vue-tsc TS1005/TS1002 (5 errors); fixed in the generator, regenerated both repos, `npm run type-check` exit 0. Caught by the arm's own gate — the gates work.

## 0.10 — measured-provider memo bug (harness-side)
- p333-validate.mjs first memoized derivedWeights per SLOT (storing whole record objects → NaN cost matrix → the Hungarian's do-while spun forever). Fixed: memo the single per-base call. No shipped file changed (the pin engine was read-only throughout).

## 0.11 — "358/358|658 entries" grep
- Final-tree grep → zero live instances outside REV-8-ERRATA.md's historical record (and this file's old→new text). Old locations fixed: VERIFY.txt §1 (×2), RECEIPT.md Rev 8 section (→ 360/360 + cwd note), verified-as-of.json (0.1).
- **Rev 10 correction: "zero live instances" was self-contradicting** — a plain grep for the string returns TWO hits (RECEIPT.md Rev 9 Part 0 and this erratum), both lines quoting the old value in order to correct it, so nothing was substantively stale, but a line saying "absent" that contains the string fails its own test. Reworded to "zero live CLAIMS" and the self-lint excludes the errata/correction lines it is describing (receipts/self-lint-rev10.txt: the correction lines still grep, the live-CLAIM count is 0).
