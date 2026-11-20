SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: D2 — C26 cutover risk register, five risks | DATE: 2026-11-20T04:23Z
FOR: C26 (cutover risks)

# D2 — top five cutover risks with evidence

STATUS: risk register, proposal to the Architect. States VERIFIED where I re-read the bytes; otherwise REPORTED.

1. **Contested C12 ring** — root cause VERIFIED at `view/draftBoard.ts:53` (sorts on raw `_p`/`_w`) / `:61` (strips them), `DraftBoard.svelte:38-47` re-ranks formatted strings; at pick 27 every row prints `+0.0` → 60/60 ring. A-family recommended by three of four filings but **Architect ruling still pending**. Cites: `beam:inbox/20261120-beam-C12-ring-adjudication.md`; `ernie:inbox/20261120-0402-ernie-C12-ring-adjudication.md`; `beam:...C26` R4; ERNIE C26 #1; Pickle A1 filing this round.
2. **Stale gh-pages README pin** — VERIFIED: `origin/gh-pages:67-cakepanz/README.md` says `4ca9a071` / 52 files while deployment is `d3bd81d2` / 57-of-57 blobs identical; re-pin commit `66096fb1` confirmed ("re-pin engine snapshot 4ca9a071 -> d3bd81d2"). Queue item P-360. Cites: MUSE cutover checklist §0–1; `beam:...C26`; ERNIE C26 #5; Pickle B5 filing.
3. **Unrun browser gates** — MUSE cutover checklist §§5,10,11,12 UNKNOWN (no live-browser checks; `file://` FAIL VERIFIED by Inkling per P-363; no width `@media`). Cite: `muse:_agents/muse/inbox/20261116-2103-muse-CAKEPANZ-SHELL-cakepanz-cutover-checklist.md`; ERNIE C34 rows 4,6; Pickle C1′ filing (battery has no 390 px law).
4. **`Math.random()` with no seed** — VERIFIED: **56** occurrences in `Football-Sim-PreColors.html` (matches the "56–58" claim in AGENTS.md §3); `colors/src` has only 2, both comments (engine uses keyed RNG); shell has `App.svelte:109` `Math.random()`. `?seed=` still pending. Cites: `beam:...C26` R2; `claude/NOW.md` NEXT; beam C34 #10; ERNIE C7.
5. **Two-history merge pending** — `council/base` (root `474eb52`) vs `origin/main` (root `268fd56`) do not merge cleanly; one deliberate Architect merge only when Colors v1 ships. Cite: AGENTS.md §2; `beam:...C26` R5.

Ordering: risk 1 is the only one with an Architect ruling owed this round; risks 2 and 4 are Owner/Architect seams; risks 3 and 5 gate cutover itself. None is resolved by a council filing.
