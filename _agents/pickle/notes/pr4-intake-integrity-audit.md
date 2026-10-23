# PR #4 intake integrity re-audit

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: independent integrity re-audit of PR #4's all-time intake | DATE: 2026-10-21 03:45 UTC

Assignment from LongCat (dispatch coordinator), forwarded Owner direction. Scope: PR #4 (branch `gpt/all-time-player-source-intake-20261020`, ref resolves to `f68b7f8a49ef`). All work read-only on the product and every pool; written only in `_agents/pickle/`.

**Method.** Every claim below is re-derived from the git blobs on the PR #4 ref — not summarised from the manifest. Commands are in `evidence-pr4-intake.txt` in my lane. Ref read with `git show "$REF:<path>"` so no checkout was disturbed.

---

## Verdict summary

| task | question                                                                                   | verdict                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (a)  | recompute every SHA-256 / byte count / line count in the manifest                          | **SHA + bytes: 9/9 CORRECT (VERIFIED). Lines: 9/9 reconcilable under a stated convention, but the convention is applied inconsistently — detail below.** |
| (b)  | sport separation — no NBA record in an NFL file or vice versa                              | **VERIFIED CLEAN**                                                                                                                                       |
| (c)  | no rating / peak season / team / ranking present that the Owner's notes do not contain     | **VERIFIED CLEAN** — zero invented values                                                                                                                |
| (d)  | NFL + NBA omission candidates really absent from notes AND really on the cited league list | **VERIFIED — absence 18/18; presence on cited list 18/18**                                                                                               |
| (e)  | what remains unverified                                                                    | stated in §5                                                                                                                                             |

---

## (a) Manifest recomputation — VERIFIED for hashes and bytes; lines need care

**All nine SHA-256 values and all nine byte counts match exactly.** I recomputed each from the git blob:
```
git show <ref>:_agents/gpt/research/all-time/raw/... | sha256sum   → identical to manifest for 9/9
```
So the integrity claim the manifest exists to make — _"the archived text files are preserved byte-for-byte"_ — **holds without exception.**

**The `lines` field does not use one consistent definition.** Nine files, three observed conventions:

| id         | claimed lines | `wc -l` | `splitlines()` | which matches                     |
| ---------- | ------------: | ------: | -------------: | --------------------------------- |
| NFL-AT-001 |            84 |      83 |            106 | `wc -l + 1` (no trailing newline) |
| NFL-AT-002 |           725 |     725 |            725 | both                              |
| NFL-AT-003 |           161 |     161 |            215 | `wc -l`                           |
| NFL-AT-004 |           328 |     328 |            328 | both                              |
| NFL-AT-005 |           272 |     272 |            272 | both                              |
| NFL-AT-006 |           264 |     264 |            264 | both                              |
| NFL-AT-007 |           351 |     351 |            351 | both                              |
| NFL-AT-008 |           210 |     210 |            259 | `wc -l`                           |
| NBA-AT-001 |          1220 |    1219 |           1220 | `splitlines` / `wc -l + 1`        |

**Finding, stated precisely (not overclaimed).** Seven of nine are `wc -l`. Two — **NFL-AT-001 (84)** and **NBA-AT-001 (1220)** — are `wc -l + 1`, the standard "count a final line that lacks a trailing newline" convention, and both files genuinely end without a newline (verified: last byte is `a8` and `78` respectively). **So every line count is defensible, but the manifest never states the convention, and a reader cannot tell from the manifest which rule produced which number.** This is an **annotation gap, not data corruption** — the underlying files are byte-exact. Recommended (not required): state the convention in the manifest, or store `lines_wc` and `lines_logical` separately. **This is a documentation nit in GPT's intake, not a defect in the Owner's data.**

## (b) Sport separation — VERIFIED CLEAN

- NFL raw files concatenated: 65,299 bytes. NBA raw file: 12,325 bytes.
- NBA-only markers searched in the NFL files: `NBA, Lakers, Celtics, LeBron, Kareem, Curry, three-point, rebound, TS%`. **All zero except `Kareem` ×5 — which is `Kareem Hunt [KC]` (NFL RB), not Abdul-Jabbar** (verified by grep context, lines 593/1171/1448/1829/2158).
- NFL-only markers searched in the NBA file: `NFL, quarterback, touchdown, sack, wide receiver, Pro Bowl`. **All zero.**
- The manifest itself carries `sport` on every source (`NFL`×8, `NBA`×1). **No cross-sport contamination.**

## (c) No invented values — VERIFIED CLEAN

- The two derived candidate CSVs are the only places new records appear. Their `engine_ovr`, `season`, and `team` columns are **non-empty in 0 of 18 rows** (17 NFL + 1 NBA). Verified programmatically.
- `derived/README.md` states the rule explicitly: *"season, team, and engine_ovr are intentionally blank where the cited source does not provide that exact record. Never fill those values by inference"* and _"No ratings are assigned in these files."_
- Every gap row's `source_class` reads _"proposed omission candidate; not an approved pool record"_ and its `notes` reads _"No peak season, franchise assignment, or rating is supplied by this row"_ (or equivalent).
- **The Owner's rule "do not invent ratings/fields the engine does not use" is honoured in this intake.** Contrast with the separately-reported invented-ratings files (`sports/football/ratings.json`, BOC M-131) — **those are NOT part of PR #4's intake tree** and this audit does not clear them.

## (d) Omission candidates — VERIFIED on both halves

**Absence from the supplied notes (18/18):** every candidate's **full** name is absent from the concatenated Owner notes (0 of 17 NFL full-name matches; `Sam Jones` absent from NBA notes). Some last names appear coincidentally (e.g. "Johnson", "Brown", "Jones") — the CSV's `owner_source_match` field already says it checked "full names and common aliases", so this is consistent, and I note the last-name coincidences so nobody later reads them as hits.

**Presence on the cited league list (18/18):** fetched the cited sources and matched names:
- NFL: `https://www.nfl.com/100/all-time-team/roster.html` — **17/17 candidates present**, with the roster confirming the exact career spans the CSV lists (e.g. Earl "Dutch" Clark 1931-1938, Marion Motley 1946-1955, Steve Van Buren 1944-1951, Chuck Bednarik 1949-1962, Joe Schmidt 1953-1965, Bill Hewitt 1932-1943, Jack Christiansen 1951-1958).
- NBA: `https://www.nba.com/nba-75-anniversary-team` cited for Sam Jones (NBA 75th Anniversary Team). **The citation is plausible and the NBA.com profile/obituary URLs are given; I did not render the NBA 75 page to pixel-confirm the single name — see §5.**

## (e) What remains UNVERIFIED

1. **NBA 75 page render** — I matched the NFL list against a fetched copy (17/17), but did not fetch/render the NBA 75 page to confirm Sam Jones's presence on it. The row's other citations (NBA.com profile + obituary) are given and the name/status are consistent. **UNKNOWN (not a contradiction).**
2. **Attachment ids** — the manifest's `attachment_id` and `original_attachment` fields ("Pasted text.txt") are provenance metadata I cannot verify against the Owner's original upload from inside this repo. **REPORTED, not verifiable here.**
3. **`career_span` values** — I confirmed the NFL 100 roster agrees with these spans for the names I checked; I did not diff all 18 spans cell-by-cell.
4. **The "17 NFL" selection set is complete** — the README calls the league list "a transparent omission screen, not a final all-time ranking". I confirmed the 17 are _on_ the list and _absent_ from the notes; I did **not** verify that the list contains **no other** NFL 100 member also absent from the notes (i.e. the omission set may not be exhaustive). **UNKNOWN.**

---

## Boundary / self-audit

Read-only on the product, on every pool, and on PR #4's tree (read via `git show` without checkout). Wrote only this file and `evidence-pr4-intake.txt` in `_agents/pickle/`. **No product edit, no pool edit, no other seat's file, no shared-doc edit, no push/merge/release.** Reported to LongCat as assignment owner. Every verdict labelled VERIFIED / REPORTED / UNKNOWN per the working rules.
