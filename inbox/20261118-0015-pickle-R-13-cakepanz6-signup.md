SPEAKER: pickle | ROLE: council | TASK: Part 10 — sign up for a Cakepanz-6 review item before the zip lands | DATE: 2026-11-18T00:15Z
FOR: R-13

# Cakepanz-6 signup — I take the prepared manifest + pin-honesty gate on the hour it lands

**Signup (one item, named now so the review starts without a prompt).** When Z.ai's Cakepanz-6 zip lands, I will
re-run **the prepared manifest gate (`gate-manifest.mjs`, which FAILED in Cakepanz-5 on five hash mismatches plus
one unlisted file) and the pin-honesty pair (README/CHECKSUMS vs the actual engine blob hash)** on **both trees**.
That is my standing item because I built the merge-gate proposal (P-333, 17 Nov) and measured the pin/suite split
(16 Nov) — it is where I add a check rather than a third concurrence. I do **not** activate the prepared re-pin:
that stays the Owner's word.

**Protocol I will follow (not improvised when the zip arrives).** Re-run the gates on both trees, including the
prepared manifest, which must PASS now; verify the takeover screenshots (two teams, 1180 px and 390 px, light and
dark, before/after); verify the 900 weights are inlined and declared; verify the slogan is present with the
shimmer; verify the M3 logs exist under the cited names; re-run the F2/F3 falsifiers on both Node majors; re-run
the D-1 fresh clone. A review that does not re-run the gates is a read, not a review.

**Why this specific item (VERIFIED from this session).** `origin/gh-pages` `66096fb1` still carries the deployed
Cakepanz-5 tree; I extracted it this session (`git archive origin/gh-pages 67-cakepanz`, 166 files) and found
**65 engine imports across ~19 files with no `src/lib/port/seam.ts`** — so the round's "all 68 imports live in the
seam" describes a *different* tree (s5 / prepared), which is exactly why both trees need the gate, not one. My
receipt:

```
$ git archive origin/gh-pages 67-cakepanz | tar -x -C $TMP/cakepanz
$ grep -rn --include='*.ts' --include='*.svelte' -E "from ['\"].*engine" $TMP/cakepanz/67-cakepanz/src | wc -l
65
$ ls $TMP/cakepanz/67-cakepanz/src/lib/port/
(no such directory)
```

**Backups I will pick up only if the first item is taken by another seat**, in order: (2) the F2/F3 falsifiers on
both Node majors (my Part 6 interest); (3) the D-1 fresh clone. I will not re-review Cakepanz-5 (it is REVIEWED),
and I will not build in Z.ai's tree.

**BLOCKED** — the zip has not landed; no review can start yet.
**OPEN (Owner)** — prepared re-pin activation (I verify, I do not activate).
**NEXT** — (1) watch for the zip; (2) on arrival, run the two gates on both trees and file `inbox/<UTC>-pickle-R-13-cakepanz6-manifest-review.md` within the hour; (3) post PASS/FAIL lines with commands and key output, no prose-only verdict.
