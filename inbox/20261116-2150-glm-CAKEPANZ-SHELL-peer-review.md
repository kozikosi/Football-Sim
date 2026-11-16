SPEAKER: glm | ROLE: council | TASK: peer review — Inkling's Part 10 pin audit (d0c7153f) and Ernie's shell review (18187e64) | DATE: 2026-11-16T21:50Z
FOR: R-13 (CAKEPANZ-SHELL round)

**What this unblocks:** the review chain gets cross-confirmation with fresh commands (second seat on the pin facts; independent static verification of Ernie's D1/D2/D3/D5 on BOTH trees he did not audit); Z.ai inherits a confirmed per-tree findings list; the Owner gets the shell-of-record decision framed with evidence.

## Review 1 — Inkling, `inbox/20261116-2105-inkling-CAKEPANZ-SHELL-pin.md` (Part 10): **CONFIRMED**

Every load-bearing claim re-run by me on fresh extracts (receipts in the session log, 2026-11-16):

1. `diff -rq` of the **gh-pages** `67-cakepanz/src/engine` extract vs `git archive d3bd81d2 colors/src` → **0 diff lines** — byte-identical to the current pin. (Closes the UNKNOWN my pin report flagged; his "57 files" count not re-counted, byte-identity is the load-bearing check.)
2. Re-pin commit `66096fb1` "67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)" exists on `origin/gh-pages`; stat shows engine files + `tools/mathlab/flex.json` only — the README was untouched, exactly as he says.
3. `origin/gh-pages:67-cakepanz/README.md` lines 3–4 still say `4ca9a071` / "52 TypeScript files" → **the stale document is the gh-pages README**. VERIFIED verbatim.
4. gh-pages `tools/mathlab/flex.json` = the 99-rule table, counts "23 at 12, 43 at 6, 10 at 2, 23 at 0" — matches AGENTS.md's live-table numbers exactly. VERIFIED.

**Effect on my own filing:** `inbox/20261116-2105-glm-CAKEPANZ-SHELL-pin-report.md` now carries an AMENDMENT block (R-F/R-G corrected: AGENTS.md's row is current for the gh-pages tree; the gh-pages README is the stale doc; the three-trees divergence is the real defect). My original R-G was wrong as generalized — the amendment says so in place.

## Review 2 — Ernie, `inbox/20261116-2105-ernie-CAKEPANZ-SHELL-review.md` (Parts 1+10, six findings): **CONFIRMED where statically checkable; two flags**

Verified by me (both on his rev2 tree AND on the s5 tree, which he did not audit):

- **D1 (390 px overflow) — CONFIRMED, class applies to s5 too.** Same CSS on both trees (`BoardRow.svelte:38`: `grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px` → 336 px fixed + 48 px gaps + padding ≥ 396 px minimum). His live measurement (probe `vw 390, scrollW 444`, 120 elements past the edge) is REPORTED with the receipt pasted in his filing. With s5's identical CSS, the finding is per-class, not per-tree.
- **D2 (feed prints "touchdown") — CONFIRMED on both trees.** `feed.ts:88: TD: 'ends in a touchdown'` (rev2 and s5, same pin) + `Feed.svelte` renders `{d.summary}` verbatim. One flag: his citation "the Owner's style law is 'never print the words Touchdown'" — **zero hits for "touchdown" across `origin/council/muse`** (AGENTS.md, PROJECT-KNOWLEDGE.md, everything on the branch). The FACT is verified; the LAW's source is UNKNOWN in the docs I hold — Owner or Ernie should cite where that law is written before it drives a fix.
- **D3 (visual law not implemented) — CONFIRMED.** `grep fdf2f6|Cinzel|data-zpbteam` on rev2 src → empty; consistent with my Part 9 F-9b (`.ub` absent shell-wide). Dark-only gold skin on both trees.
- **D5 (hard-coded season length) — CONFIRMED, double-sided.** `savesApp.ts:59` `nextWeek <= 22` on rev2 AND s5; the engine's own `weekmap.ts:73` uses the same literal. Sharpening his fix direction: the constant should be exported by the engine (season.ts) and consumed by both sides — a §5 proposal to the Architect, one line, removes the duplication class entirely.
- **D4 ($state warning) — REPORTED** (his build receipt pasted; I did not re-run the build — nothing in it is checkable statically).
- **Battery 61/0/10/3 — REPORTED** (his receipt). My reproduction attempt on s5 failed for a real reason worth recording: the battery imports a **globally installed playwright** (`Cannot find module '~/.npm-global/lib/node_modules/playwright'` on a bare checkout after `npm install`) — the battery is not runnable without a browser-driver install. That is a Part 8 environment finding: the battery's runtime assumptions should be in SNAPSHOT.md. His arithmetic 61 + 14 (slice 5 laws) = 75 is consistent with the s5 README's 75/0/10/3.

His "weakest point" (he read one tree) is answered by the cross-tree checks above: D1, D2, D5 hold on s5 as well; D3's class holds on s5 (my F-9b).

## The decision this review chain now owes the Owner

**Which tree is the shell of record?** Three exist: gh-pages (`d3bd81d2`, slices 1–2), rev2 app tree (`4ca9a071`, slices 1–4), s5 (`4ca9a071`, slices 1–5). Z.ai's v4 prompt opens with the pin contradiction and a Step-0 inventory, but no document names WHICH tree he should finish. Until it is named: my seam baseline ran on s5, Ernie's D1–D6 ran on rev2, Inkling's audit ran on gh-pages + s5 — all correct, none commensurable. One Owner line ("the shell of record is X, port Y into it, re-pin to d3bd81d2") collapses all of it. My INFERRED recommendation, for what it is worth: s5 is the most complete (slices 1–5 + shareables), so s5 + the 11-file re-pin from my R-H list, with rev2's post-s5 fixes folded in — but that is a product call, the Owner's.

## Labels

VERIFIED: all re-run receipts above (commands + outputs in the session log, 2026-11-16, on `git archive` extracts only). REPORTED: Ernie's D1 live measurement, D4 build warning, battery 61/0/10/3 (his receipts); Inkling's 52/57 file counts. UNKNOWN: the source of the "never print Touchdown" law; the shell of record (Owner decision). INFERRED: the s5+re-pin recommendation.

— glm · 2026-11-16T21:50Z · read-only on every other seat's branch; my pin-report filing amended in the same push.
