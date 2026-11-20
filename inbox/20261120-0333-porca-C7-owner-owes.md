SPEAKER: PORCA | ROLE: advisor | TASK: C7 | DATE: 2026-11-20T03:33Z

# C7 — one page: everything the Owner owes (and what stays blocked)

Sources: `zai-this-sitting-report-2026-11-19-v3.md` §11 and §10.4 (on `origin/council/ernie`),
Z.ai's 2026-11-20 order §5, the passGap decision block (Architect `408410477` tree), and PORCA's
C3/C4/C9 receipts on this branch. No item invented; each maps to a named source.

## THE PAGE

**1 · Land the c10 repair on inkling and orcaink — RECOMMENDED DEFAULT: do it.**
Copy `deliverables/repair/slice1-battery.json` (md5 `0a2869538a706e7e6ea864664b7e5c9f`, 6,418 B) into
each host's `batteries/` folder, replacing the missing file; then re-run the battery. Expected:
49 OK / 0 FAILED / 52 files on both. Receipt: `inbox/20261120-0328-porca-C3-c10-repair-rehearsal.md`.
Unblocks: both hosts stop verifying 48/49. Risk if skipped: the c10 package keeps contradicting its
own manifest. Blocked meanwhile: nothing else in c10.

**2 · Land the doc fixes in three byte-states + edit three CHECKSUMS md5 lines in the SAME action —
RECOMMENDED DEFAULT: do it.**
Apply `deliverables/doc-fixes/hosted-c9.diff` (clean `patch -p1`, no fuzz/rejects) using FIX-NOTES §5–§6;
resulting md5s must be `08f30249…`, `aba2f58a…`, `ad1e0a96…` and the delivered after-files must be
byte-identical to the hosts'. Receipt: `inbox/20261120-0328-porca-C4-doc-fix-landing-simulation.md`,
paths in `inbox/20261120-0328-porca-C9-c10-landing-audit.md`. Unblocks: byte-truth table in §10 of
the v3 report. Risk if skipped: the two dists keep disagreeing in the docs. Note: inkling/orcaink's
own c9 dists are both `670d4c08…` (527,177 B) — byte-true already, leave them alone.

**3 · Rule the hosted-c9 policy (three byte-true copies, one edited copy) — RECOMMENDED DEFAULT:
leave the byte-true copies alone and edit only the delivered after-files.** One sentence in the bulletin
is enough. Unblocks: Z.ai's byte-truth table can be marked final. Risk if skipped: a later seat
"fixes" a copy that was never broken. Evidence: C9 audit (`diff -rq` shows only the `deliveries/`
repair subtree differs; working dist `76de5658…` vs delivered `670d4c08…` is history, not a defect).

**4 · Confirm the four ALL-CAPS tab names (SEASON STATS / PLAYOFF STATS / YOUR PLAYERS / LEAGUE
LEADERS) — RECOMMENDED DEFAULT: keep the current four, defer the styling decision to cutover.**
Source: v3 report §11.4. Unblocks: Z.ai's c10 tab-copy work. Risk if skipped: another round of tab
renames after the land. This is a product-direction call; my default is advisory.

**5 · Rule the C′1 ring export (`raw: { wins, priority }` on BoardRowVM vs a `suggestions` object) —
RECOMMENDED DEFAULT: approve the minimal raw-key export at the next re-pin; `d3bd81d2` is already the
newest snapshot.** Source: v3 report §11.2; the Architect owns the actual change. My design input is in
`inbox/20261120-0333-porca-C5-ring-fix-proposal.md` (recommend the minimal `rawSort` shape; the
suggestions-object shape is the alternative if the ring becomes a product concept). Unblocks: Z.ai's
T8 ring work. Risk if skipped: the ring keeps ringing up to 60 rows on rounded-string ties.

**6 · Part-0 quote discrepancy (v3 report §10.4) — RECOMMENDED DEFAULT: leave as reported, no new
re-measurement.** The report already records both byte-true readings with the fence noted. Unblocks:
nothing; this is a record-keeping call. Risk if skipped: a seat re-measures a fourth time against the
fence.

**7 · Distribution: two GitHub folders are artifact paths, not a new release — RECOMMENDED DEFAULT:
keep as settled (A8); no v2 re-zip.** Unblocks: nothing. Risk if skipped: a second zip with a second
set of hashes.

## ORDER TO DO THEM IN

1 → 2 (one host action, same window: copy the repair and the three doc files, then edit the three
CHECKSUMS lines); then 3 and 4 (two bulletin sentences); then 5 (Architect's call, can land at the
next re-pin); 6 and 7 need no action unless the Owner overrules the defaults.

## WHAT IS NOT ON THIS PAGE

- No tuning, no ratings generation, no rally/cap hit, no flex-table change — those are post-cutover or
  the Owner's separate product track, and the 18 Nov ruling says tune after shipping.
- I did not ask the Owner anything; this is one advisor's collection with recommended defaults. The
  Architect and MUSE decide what, if anything, enters the queue.
