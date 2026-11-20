SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C30 — the Owner-owes list as a runnable checklist (merged: Beam 11 + ERNIE 6 + v3 §3) | DATE: 2026-11-20T04:34Z

FOR: the Owner
VERDICT: **ready to run top to bottom.** Ten actions; each has a command (or a decision) and an expected result. Nothing here is a council task — it is the Owner's list, de-duplicated.

**One correction to the earlier lists: the c10 repair is four hosts, not two.** Inkling, orcaink, **beam** and **glyph** each carry a c10 package at 48 OK / 1 missing; pickle is the control at 49/49. I ran the C13 script on beam and glyph too (VERIFIED): both go **48/1 → 49/0/52**, exit 0.

---

## 1 · Land the c10 repair on four hosts (inkling, orcaink, beam, glyph)

```
sh land-c10-repair.sh <c10-root> <zip>/deliverables/repair/slice1-battery.json
```

Expected per host: `before: 48 OK / 1 missing / 51 files` → `after: 49 OK / 0 missing / 52 files`, exit 0. A second run is a no-op. The script is at `_agents/ernie/deliveries/tools/land-c10-repair.sh`; it verifies the repair's bytes (`6,418 B / 0a286953…`) before touching anything and refuses a wrong root (exit 2).

**Unblocks:** every citation of the c10 package stops being a known-broken receipt. **Risk if skipped:** the package contradicts its own manifest.

## 2 · Land the doc fixes and the three CHECKSUMS md5 lines in the same action

```
patch -p1 < doc-fixes/hosted-c9.diff      # from the extract root (the one containing _agents/)
patch -p1 < doc-fixes/c10-package.diff    # from the c10 root
```

Then set the three md5 lines in each `CHECKSUMS.txt` to the FIX-NOTES §6 values: `08f30249…`, `aba2f58a…`, `ad1e0a96…`. Expected: the three files hash to those values and the manifest matches. **Do the manifest lines in the same action** or the gate reports three false failures.

## 3 · Rule the hosted-c9 byte-state policy

Three byte-true copies exist (inkling's c9, orcaink's c9, pickle's hosted c9) and one was edited (pickle's). Rule: accept the edit, or revert it and say so. **Unblocks:** an unambiguous record of which copies are authoritative.

## 4 · Confirm the four ALL-CAPS stats tabs

`SEASON STATS` · `PLAYOFF STATS` · `YOUR PLAYERS` · `LEAGUE LEADERS`. A one-word pass; they close the copy gate.

## 5 · Note the ring export shape

The council recommends **Contract A** (`suggestions` from the engine view). The Architect rules; the Owner notes it. **Unblocks:** the most visible defect (60 rows ringed at pick 27).

## 6 · Confirm Part 0's word

No verbatim record exists in any branch (ERNIE C24); Z.ai's seat is UNKNOWN. If "accept" was your word, say so; if not, correct the relay. **Unblocks:** a single Part-0 state in every future order.

## 7 · The gh-pages two-file fix (your click)

Point `index.html` at w89 (the live wave). **Unblocks:** the live site stops serving the older wave.

## 8 · The contrast split (light gold2 value)

Two AA holes: light gold2 (1.51/1.65:1) and dark rose-ink (3.17:1). Owner-gated; the measurement is done. **Unblocks:** the a11y/golden track.

## 9 · Rule sport two at MS-2 (not now)

Basketball is the recorded line (AGENTS.md §2, 13 Nov batch item 14/15); plan M recommends baseball. The Owner settles it at the post-cutover MS-2 gate. **Not needed now.**

## 10 · Approve the cutover definition

Adopt C34's one sentence: "fully functioning Colors v1" = rows 1–8 done, 9–11 done, 12 resolved, 13 confirmed. **Unblocks:** a date and a checklist everyone can measure.

---

## What is NOT on this list (do not add)

- No new product asks from the council. No re-cut of the c10 zip; no manifest regeneration beyond the three lines in §2; no per-game historical tuning (ship first).

## What I did not check
- The gh-pages click and the contrast value are yours; I did not perform either.
- The doc-fix application on a real host (scratch only, ERNIE C4 + Beam/Porca/Glyph).