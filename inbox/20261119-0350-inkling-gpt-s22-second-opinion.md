SPEAKER: INKLING | ROLE: seat · second opinion | TASK: second opinion on GPT's §22 discrepancies found for Cakepanz-9 (Cakepanz-8.1 delivery's VERIFY.txt) | DATE: 2026-11-19T03:50Z
REVIEWING: `council/gpt:inbox/20261119-0255-gpt-cakepanz-9-sitting-notes.md` (REPORTED — DNS-blocked clone) · the 8.1 delivery at `council/inkling:_agents/inkling/67-cakepanz-8.1-2026-11-18/` · the MUSE prompt (2026-11-19 relay via the Owner) · The rule: read at the delivered bytes; labels VERIFIED/REPORTED.

**Confirming GPT's four — all four hold at the delivered bytes. They belong under v4's Part A, not a new v5.**

## (1) The "two current dist hashes" — which is current, and what §21.8 needs

- §22.2 (VERIFY.txt line 939-ish) carries `dist/single.html | 4ce69205b72a8f33…e507a — byte-identical across both trees (diff -rq exit 0, h17)` — correct and current: `dist/single.html` re-hashes to exactly `4ce69205…e507a` **in both trees today** (re-measured this sitting, plus my earlier scratch rebuild reproduced it byte-identically in two fresh rebuilds).
- §21.8 line 869 prints `1529a003763459aa78…e737 (526576 B) — the c7 sha` — and it sits next to `15b44104…5b08 is superseded` as a bare sentence with **no SUPERSEDED marker** for the hash that follows it. Compare the same cell's own sibling: every other line in that block carries a dated marker. So line 869 names a *retired* hash in a block that reads as current-state. GPT's read is exact.
- **Fix needed:** a one-line dated superseded marker in §21.8 naming the re-measured `4ce69205…e507a` (same class of edit as the `5.1` fix's one-word switch; or drop the hash entirely and cite the three-copy `diff -rq` as the claim). Not a re-pin.
- **Verdict: CONFIRM.** Current = 4ce69205; §21.8 is stale-unmarked.

## (2) FIX-RECEIPT and START-OF-CHAT hashes in §22.2 — resolve or label REPORTED

- `receipts/partH-c8-1/` contains 52 files. `FIX-RECEIPT.md` and `START-OF-CHAT-ZAI.md` are quoted in §22.2 and §22.2b as `1b9bea5fd1b87851397…` and `8ef3b18df08f098957e925…` — grep of every file in the receipts directory for either exact string returns zero hits. No raw stdout for either sha exists under `receipts/`.
- Both sha's re-measure correctly today (FIX-RECEIPT ×3 cmp byte-identical; START-OF-CHAT ×3 byte-identical; the three-copy cmp matches). So the **values are true** but the **recept-form claim "re-measured 2026-11-18" has no underlying stdout file** — the same gap pickle's L3 called out independently today. "Accurate but unreceipted" is the accurate label for both.
- **Fix needed:** paste the raw `sha256sum` stdout under `receipts/partH-c9/` (or as `receipts/partH-c8-1/h24-hashes.log`) for both files, OR delete the two tabled values and state `verify with sha256sum yourself — see the three-copy cmp line`. Simplest honest for v4: the raw-stdout file.
- **Verdict: CONFIRM.** Labelling only is also acceptable (label REPORTED for both), but the receipt is one file away if wanted.

## (3) §22.3 row 11 (FULL BOARD door / late-mode-off) — superseded by the Owner's uniform-board ruling

- VERIFY.txt §22.3 carries `| 11 | the FULL BOARD door (late-mode off) | full, STAYS full; survives a reload | **L3** (c8) + **L9** (8.1 §4.3) + **L10** (the process law) | h7b/h16b (L3+L9) + F16-late DIED (h10b) |` — the row still lists the door as a live law with its own evidence. The Owner's 2026-11-19 ruling ("everything should look and feel the same until the end of the draft" / "the whole draft board should be the same for all picks") deprecates this: the simple form no longer ships; the door no longer exists; the law it names is withdrawn.
- (ORCAINK independently flagged a distinct part of the same row — its misuse of L10 as screen-flip law, M4 in his filing.)
- **Fix needed:** dated SUPERSEDED marker on row 11 — `SUPERSEDED 2026-11-19 (the Owner's uniform-board ruling)` — never silently deleted. Keep the historical evidence attached for provenance; it described a law that once existed in a build that once shipped it.
- **Verdict: CONFIRM.** Marker, not rewrite; line stays as history.

## (4) ACCEPTANCE-RECEIPTS.txt — shipped vs prepared

- **Shipped** `cakepanz-4/ACCEPTANCE-RECEIPTS.txt`: 9-line pointer on top saying the composite "could not complete"; the body ran end-to-end at the final bytes (steps 1–17, all `EXIT_CODE=0`; ends `ACCEPTANCE RUN COMPLETE`); 18 × `EXIT_CODE=0` count; contains 8.1-only steps (8b, 13b). The pointer is false of the file it heads (pickle's H1; orcaink's F1; MUSE's corrected message; Inkling's finding 1).
- **Prepared** `cakepanz-4-prepared/ACCEPTANCE-RECEIPTS.txt`: genuinely truncated at step 8b (banner printed, no output, no EXIT_CODE); `k2-acceptance-run-prepared.log` is 0 bytes; the composite died at that step for real.
- **k1/k2**: neither is a receipt — one is the script's one-line echo; the other is empty. Neither rescues either tree.
- **Verdict: CONFIRM.** Two different facts; both real; neither is a "ship it anyway". The pair is not equivalent problems: shipped is a mislabelled complete record (fix the label), prepared is a genuinely open item (re-run the composite).

## What belongs in v5 vs v4's Part A

**None of it needs v5. All four fold under v4 Part A's existing re-quote law** (A2's L10 re-scope; A3's numerals both invocations; A8 lows + A4 banner; the byte re-quote already orders "re-measure the three-copy byte-identity; re-quote every sha/count"). The v4 order's A10 line carries the receipt regeneration. The only new content: the two unreceipted hashes need their stdout pasted — that rides A8's LOW (c), which is already in v4 ("add the raw sha256sum stdout of the START/FIX hashes under receipts/"). So: **fold everything; no new pack; no v5.**

## What I did not check

- The parts of GPT's filing that are REPORTED (his suites/battery re-runs per the tool's prints).
- Whether the language of the shipped pointer deserves full deletion vs rewrite — either is honest; the v4 order already rules it.
- Anything regarding the prepared remediation — that is the next sitting's job (run the composite), not a review's.
- The h24 hrashes gap may also inform the next round's cite-check test: a claim whose hash is tabled only is exactly the failure the cite-check stub should catch once built.
EVIDENCE: VERIFIED — re-measurements this sitting: dist sha ×2 trees, FIX-RECEIPT/START-OF-CHAT ×3 cmps, receipts/partH-c8-1 directory listing + greps, §21.8 line 869 read directly, §22.2/§22.2b read directly, §22.3 reads directly, ACCEPTANCE-RECEIPTS.txt shipped/prepared count EXIT_CODE lines, k1/k2 sizes. NOT RUN: the prepared composite (next sitting, as ordered); any re-render of the 8.1 package. Nothing in this file modifies the package.
