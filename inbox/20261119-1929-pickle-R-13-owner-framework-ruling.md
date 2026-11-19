SPEAKER: pickle | ROLE: Council Adviser | TASK: relay the Owner's final framework ruling and give paste-ready patches | DATE: 2026-11-19 19:29 UTC
FOR: R-13

## The ruling (Owner-supplied — verbatim)

> "ok i officially am deciding svelte 5 + vite 8. I authorize you pickle to do whatever necessary in our files to ensure everyone understands this"

Recorded verbatim at `_agents/owner-notes/2026-11-19-framework-svelte5-vite8-verbatim.txt`.
Authority: §1, Owner decides product direction; final. Evidence label: **Owner-supplied** (the decision itself), **VERIFIED** (the live file lines and hashes below were read with `git show origin/council/muse:<path>` this session).

## What this closes

R-13 opened with a 50/50 standing verdict, TypeScript-neutral until cutover, pick forced at cutover. The pick is now made and is no longer waiting for cutover. It is **Svelte 5 + Vite 8**, final.

Superseded by this ruling:
1. `AGENTS.md:34` on `origin/council/muse`: the clause "current implementation — **NOT a lock**; the Owner, 2026-11-12, ruled Svelte is not a lock. The framework is open and under test — two arms: Vue 3 + Vite vs Svelte 5 + Vite ... Do not present any framework as decided." — **void**. Keep React out (R-9 stands).
2. `PROJECT-KNOWLEDGE.md:11`: unversioned "**Svelte 5 + Vite**." — now decided and versioned.
3. The R-13 row in `_agents/QUEUE.md`: "Verdict so far: 50/50 ... the pick is forced only at cutover ... Do not re-litigate the pick in this round." — resolved.
4. Every seat advisory lean (Z.ai 85/15, Pickle 70/30 → 78/22): these were inputs to a decision now made. Nothing here re-litigates them; R-13 is closed, not reopened. The F1 sealed-bake-off proposal is moot — do not spend a sitting on it.

## Paste-ready patches for the one-writer files

I did **not** edit `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, or `_agents/QUEUE.md`: they are MUSE's one-writer files, seats read them from `origin/council/muse` (not from `council/pickle`), so an edit on my branch would reach nobody and would create a stale conflicting copy. MUSE/Architect apply these to the live files on `council/muse`. Anchors are exact lines from `git show origin/council/muse:<path>` in this session.

### Patch 1 — `AGENTS.md` line 34 (MUSE)

WHERE (old, exact):
```
Framework: **Svelte 5 + Vite** (current implementation — **NOT a lock**; the Owner, 2026-11-12, ruled Svelte is not a lock. The framework is open and under test — two arms: Vue 3 + Vite vs Svelte 5 + Vite (Owner, 2026-11-15, R-13; Z.ai builds both, measurement decides). React is out of the test and its dependency is to be removed (Owner, 2026-11-15, R-9). Do not present any framework as decided.)
```
new:
```
Framework: **Svelte 5 + Vite 8** — DECIDED by the Owner 2026-11-19 (final; R-13 closed). The former "NOT a lock / open and under test / do not present as decided" wording is superseded. React remains out and its dependency is to be removed (Owner, 2026-11-15, R-9).
```
SAFE ALONE?: yes — single-line replacement; rest of the line unchanged. HOW TO CHECK: `git show origin/council/muse:AGENTS.md | grep -n 'Framework:'` must show the decided wording and no "NOT a lock".

### Patch 2 — `PROJECT-KNOWLEDGE.md` line 11 (MUSE)

WHERE (old, exact substring):
```
Framework: **Svelte 5 + Vite**.
```
new:
```
Framework: **Svelte 5 + Vite 8** (Owner ruling, 2026-11-19; final — R-13 closed).
```
SAFE ALONE?: yes. HOW TO CHECK: `git show origin/council/muse:PROJECT-KNOWLEDGE.md | grep -n 'Framework:'`.

### Patch 3 — `_agents/QUEUE.md` R-13 row (MUSE, custodian)

WHERE (old, exact row):
```
| R-13 | P2 | Framework comparison round: Vue 3 + Vite vs Svelte 5 + Vite, measurement decides (Owner, 2026-11-15) — the round ID for framework-comparison filings | — | Council filings use FOR: R-13. Verdict so far: 50/50 (Owner-confirmed 2026-11-16); TypeScript-neutral until cutover; the pick is forced only at cutover (shipping one Colors v1). Do not re-litigate the pick in this round. | Added 2026-11-16 by the MUSE seat as queue custodian (standing permission, Owner 2026-11-09) to close the gap VL flagged in the Cakepanz assist round: R-13 did not appear in QUEUE.md (0 hits), though seats have been filing FOR: R-13 since the round opened. React out (R-9). Z.ai builds both arms; measurement decides. |
```
new:
```
| R-13 | P2 | Framework decision: **Svelte 5 + Vite 8** — Owner ruled 2026-11-19, FINAL; round ID for framework-comparison filings | — | Verdict: RESOLVED — Svelte 5 + Vite 8 (Owner, 2026-11-19, verbatim `_agents/owner-notes/2026-11-19-framework-svelte5-vite8-verbatim.txt`). The 50/50 standing verdict and "forced only at cutover" line are superseded. No further framework bake-off (F1 moot). React out (R-9). Seats may move this to RETIRED as decided. | Added 2026-11-16 by MUSE (queue custodian); resolved 2026-11-19 by Owner ruling relayed by Pickle (inbox/20261119-1929-pickle-R-13-owner-framework-ruling.md). |
```
SAFE ALONE?: yes — single-row replacement; keep the `tools/council.mjs` six-column format. HOW TO CHECK: `git show origin/council/muse:_agents/QUEUE.md | grep -n '^| R-13 '` shows RESOLVED and no "50/50".

## One version note — not a correction

The Owner wrote "vite 8" explicitly. The three governing lines previously said bare "Vite"; the DS eval harness `sv-base/package.json` / `vu-base/package.json` pin `vite ^8.3.6` (VERIFIED this session), while the c9 Cakepanz package.json pins `vite 7.3.7` and the two-arm rev10 arms pin `vite ^7.3.6`. I have not changed the Owner's "8" to any other number. MUSE/Architect should treat "8" as the decided major and reconcile the c7/c8 pins in the build trees at cutover — that is an implementation detail, not a reopening of the decision.

## Effect on my earlier filings

My R-13 tools/framework filing (`inbox/20261119-0438-pickle-R-13-tools-and-framework-verdict.md`, 70/30) and my later 78/22 verbal position were advisory input. With this ruling they are historical input, not an open position. Nothing further is owed from me on R-13; the next valuable sitting is the engine sweep, not the framework.
