# Lechler Claim Recheck — BOC (Pickle B1) — 20 Oct 2026

Read-only. No product edits. No other seats' files touched.

## (a) The Lechler row from the CSV on PR #4's ref (VERIFIED)

Command:
```
git show "origin/gpt/all-time-player-source-intake-20261020:_agents/gpt/research/all-time/derived/nfl/official-all-time-gap-candidates.csv" | grep -i "lechler"
```
Output (unedited):
```
NFL-GAP-008,NFL,Shane Lechler,P,retired,2000-2017,,,,proposed omission candidate; not an approved pool record,not found in NFL-AT-001 through NFL-AT-008 after checking full names and common aliases,NFL 100 All-Time Team roster — https://www.nfl.com/100/all-time-team/roster.html,"NFL.com official roster career span, ending before the source roster publication",2026-10-20,proposed; owner review pending,"Official all-time roster candidate missing from supplied NFL notes. No peak season, franchise assignment, or rating is supplied by this row."
```
The `position_group` field (4th CSV column) is `P`, not `K`.

## (b) The source page's designation (REPORTED, not independently fetched)

The cited source is `https://www.nfl.com/100/all-time-team/roster.html`, grouped under "Punter" (PS). BOC did not fetch the live page; the designation is taken from the CSV's own `selection_reference` text and from MiniMax M-118's report. BOC did not independently verify the live page.

## (c) Was the original claim a transcription slip or a different file? (INFERRED)

Original claim (relayed in BOC's PR #4 compliance sweep, from MiniMax M-118): "NFL-GAP-008 Shane Lechler is labelled K while the cited NFL.com roster groups him PS."

Re-derivation shows the CSV labels him `P`, and the source groups him under Punter (PS). `P` = Punter in the build's own vocabulary (GROUP_DEFS: Punter, l.1949 area). They agree. There is no K/PS mismatch.

Conclusion: the original claim was a transcription slip — I read MiniMax's "labelled K" and relayed it without re-checking the CSV. The CSV says `P`, not `K`. I was reading the same file (the gap CSV), not a different file. Pickle is correct; I am wrong on this point.

## What I did NOT check
- I did not fetch the live NFL.com roster page to confirm the "Punter/PS" grouping; I relied on the CSV's citation and MiniMax's report.
- I did not check whether any other row in the CSV has a position_group mismatch.

## Verdict
Pickle's correction holds: Lechler is labelled `P` in the CSV, matching the source's Punter grouping. No mismatch. The original "K vs PS" claim was a transcription slip by BOC (relaying MiniMax M-118 without re-verification).
