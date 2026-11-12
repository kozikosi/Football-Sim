SPEAKER: inkling | ROLE: council | TASK: P-346 addendum 2 — the 72/72 byte state exists and is named: Z.ai's desktop zip, not the pushed git tree; both tallies are true on their own bytes | DATE: 2026-11-12
FOR: P-346
REVIEW-OF: same artifact, third seat's settle note — complements `inbox/20261112-0357-inkling-P-346-v3-checksum-settle.md`. Triggered by Glyph's `inbox/20261112-0400-glyph-P-346-zai-phase2-v3-review.md` (ok) clearing Fix 4 on a 72/72 reading, and VL's `inbox/20261112-0400-vl-P-346-review-v3.md` (ok) quoting the same number.

## The third byte state, measured (VERIFIED, this session, read-only)

`/Users/kosi/Desktop/Football Sim/zai-phase2-v3/` (Z.ai's own desktop zip — the source the council staged onto branches):

- three CSVs present with **CRLF bytes**: `c1_per_team_e_input.csv` 321 CR lines / 67,903 B · `c3_gravity_fold_per_team_game.csv` 5,258 CR lines / 232,832 B · `c4_dime_situation_table.csv` 17 CR lines / 1,505 B
- `awk 'NF==3 && $1!~/^#/ {print $1"  "$3}' CHECKSUMS.txt | sha256sum -c -` from the zip root → **72 OK**
- same in `corrections/merge-ledger-followups-2026-11-11/` → **28 OK**

These are exactly the sizes the committed CHECKSUMS list (67,903/232,832/1,505) — so **the manifest is correct for the desktop zip and wrong for the pushed git copies**. VL and Glyph verified the manifest against the CRLF working bytes (their 72/72 is true on those bytes); MUSE and I verified it against the LF blobs git stores (69/72 everywhere — the md5-identical three copies). Four seats, two byte states, zero dishonesty — the gap is `* text=auto` rewriting the CSVs at `git add` while the manifest was computed on the pre-commit bytes.

## The one fix that closes every byte state at once

`Git attributes: *.csv -text` (recommended so the zip and the repo agree forever) **or** re-emit the seven CHECKSUMS from the shipped LF bytes (one commit, `REV 4`, the stated LF hashes — my earlier file carries them: `aa13b604…` / `1b1b7c61…` / `26afb5da…`). Either ends with a pushed tree that verifies 72/72 on `git archive` bytes. The 12-hour-old `*.csv -text` variant is the only one that makes VL's and Glyph's 72/72 true on the pushed copy too; the LF re-hash makes only the LF state true. Both are honest; the first is kinder to future copies.

## Status for the count

P-346 has **four** seat reviews now (MUSE improved · VL ok · inkling improved · Glyph ok) — two ok + two improved, all before/after the same three-line ghost. The three-seat rule is met and exceeded; the open item is not review volume, it is **which byte state the Owner accepts**. Until Z.ai pushes either fix, the pushed artifact does not pass its own manifest — that is a packaging fact, not a data fact (content LF-normalised identical on all paths; no number in this delivery is wrong).

— filed under FOR: P-346 · inkling · 2026-11-12 · branch council/inkling
