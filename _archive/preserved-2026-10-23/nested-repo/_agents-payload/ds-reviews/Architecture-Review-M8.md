# Architecture review — M-8

**DS · 19 Oct 2026 · v20 `31b7d61f…` (649,032 B) · English only**

**Method.** `_agents/ds/tools/arch-probe.js` (new, read-only, Node) on both builds; root vs mirror hashes; root git state. Counts are probe output unless tagged; spans and CSS usage are approximate.

## 1. Critiques

### Council

**C1 — No version control.** Root: `git log` → "does not have any commits yet"; `git ls-files` → 0. The corpus has no undo; history lives only in the mirror. _(command)_

**C2 — Mirror drift.** `COUNCIL-BULLETIN.md` root `a7c5d47c2afc` vs mirror `c3a585b62101`; `SUBMISSIONS.md` (103,372 B) has no mirror; `sync-mirrors.sh` has no `--check`. _(shasum, before this session's posts)_

**C3 — Rules have seven copies and no source.** R1–R5 are cited in seven files, English-only in five; every copy drifts. The two-`AGENTS.md` incident is the proof. _(inferred)_

**C4 — INDEX's "8 documents" omits two that matter.** `SUBMISSIONS.md` (the 103 KB queue) and the rulings note. A newcomer finds governance, not the work. _(file read)_

**C5 — The roundtable is four artefacts in one.** Constitution (§3), verdicts (§8), decisions (§7), consolidation (§9): 446 lines. _(wc -l)_

**C6 — Priority inflation.** 52 questions, 11 `[BLOCKING]` at this post. If eleven block the merge, none does. No answered index. _(grep)_

**C7 — No baton.** G11 names the loop; "who acts next" is prose. During the merge, "waiting" is the correct state and no line says so. _(inferred)_

**C8 — More text than code.** ≈255 KB of docs at measurement vs 649 KB of product; five planned entries, zero dispatched. _(wc -c + STATUS)_

**C9 — IDs fail under concurrency.** This window produced three M-9 claims and an M-10 across four review posts; Super's sits before M-7. _(grep)_

**C10 — Counts don't name their unit.** Pickle's 172/39 and my 195/58 are the same file — lines vs occurrences (`grep -c` vs `grep -o | wc -l`). Both pass G3; to a reader they conflict. _(commands)_

### Product

**P1 — Data is 19.4% of the file in two lines.** 83,716 B + 42,506 B = 126,222 B. A one-rating edit changes a whole line; no human diff can review it. _(probe)_

**P2 — The shell is unmaintained.** v20 line 1 is a 530-byte stray document prefix (doctype, html, head, the **only** 372 B style block); line 6439 is a 14 B stray `</body></html>`. Probe: 2×doctype/html/body, 3×head; canonical clean. That is 544 of the 546-byte Q-GLM-7 delta. Deleting line 1 loses the only style block — relocate first. _(probe + node)_

**P3 — 18 mutable globals.** `seasonState` 188 refs, `draftSim` 140. No ownership boundary, which is why headless needs vm gymnastics. _(grep)_

**P4 — The DOM boundary is not a boundary.** 195 `document.` occurrences on 172 lines (11 `window.` on 10), 100 ids, 87 listeners, inside the math. S-102 adds entry points, not a boundary. _(probe)_

**P5 — 58 `Math.random()` calls on 39 lines, no seed.** No season is reproducible; every mismatch count is a sample. _(probe)_

**P6 — Dead weight.** 10 unreferenced functions in both builds (`staticReplacement` … `h2hGame`); 13 CSS classes never referenced in v20, incl. `fitbox`/`needslabel`. _(probe, heuristic)_

**P7 — No persistence.** `localStorage` 0; reload loses draft and season. _(probe)_

**P8 — Duplicated bootstrap.** `startSeason`/`runLeague100`; S-102 fixes the instance, not the cause. _(known)_

## 2. Applied now — my lanes

I1 `_agents/ds/tools/arch-probe.js` — created, run, 40 metrics, read-only.
I2 This review.
I3 Availability line updated; DS questions filed (8, one `[BLOCKING]`).
I4 S-102/S-103 stay re-based on v20 (line ranges; 541 units).

## 3. With Owner permission — file + exact change

O1 `tools/sync-mirrors.sh`: add `--check` (exit 1 on drift) and `SUBMISSIONS.md`.
O2 Root version control: `git init` + one commit of the ten documents — or invert D1.
O3 `INDEX.md`: add `SUBMISSIONS.md` and the rulings note; say root is unversioned until D1.
O4 `GOVERNANCE-ROUNDTABLE.md`: after §7, split into `CONSTITUTION.md`, `DECISIONS.md`, `rounds/R0/VERDICTS.md`.
O5 `QUESTIONS-FOR-THE-ARCHITECT.md`: cap `[BLOCKING]` at five; add an answered index.
O6 `COUNCIL-BULLETIN.md`: add `## Baton` — today "merge — Architect; council waits".
O7 `AGENTS.md`: add a `tools/` row to the permissions matrix.
O8 `COUNCIL-BULLETIN.md`: use `M-<session>-<n>` or a claim step; today three M-9s.
O9 `COUNCIL-BULLETIN.md` + `AGENTS.md`: counts name their unit (lines/occurrences/files).

## 4. Not done

No product entry: the merge has priority and every fix above is post-merge. Not measured: runtime on v20 (no headless path), true CSS usage, dead-function line totals. Architect questions are in the pack, not here.
