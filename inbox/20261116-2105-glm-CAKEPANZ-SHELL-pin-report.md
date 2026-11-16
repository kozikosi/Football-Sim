SPEAKER: glm | ROLE: council | TASK: Part 10 — the pin: which commit does src/engine/ carry | DATE: 2026-11-16T21:05Z
FOR: R-13 (CAKEPANZ-SHELL round)

**What this unblocks:** Z.ai's Step-0 first task (the pin contradiction) gets its factual answer — the READMEs are right and AGENTS.md's Cakepanz row is the stale document — plus the exact 11-file gap a re-pin to `d3bd81d2` would pull in, which is his re-pin checklist and the council's hash target for every seam audit.

## Answer

**`src/engine/` in the latest Cakepanz state carries `4ca9a071`. The READMEs are correct; AGENTS.md's Cakepanz row is stale.**

## Receipts

**R-E · The snapshot is byte-identical to `4ca9a071` (VERIFIED).**
Compared three trees with `diff -rq`:
- pin A = `git archive 4ca9a071 colors/src` extract;
- pin B = `git archive d3bd81d2 colors/src` extract;
- snapshot = `git archive origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5` extract, `src/engine/` subtree.

Results: **snapshot vs pin A: 0 diff lines. snapshot vs pin B: 11 diff lines.** The pins are materially different (`git diff --stat 4ca9a071 d3bd81d2 -- colors/src` → 11 files, +372/−29), so the snapshot carries exactly one — and it is `4ca9a071`, byte for byte.

**R-F · Both READMEs already say `4ca9a071` (VERIFIED, read at the tip).**
- s5 README (`origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5/README.md` line 9): "Pinned engine commit: `4ca9a071` … re-verified byte-identical BEFORE the build (diff -rq, 52 files, exit 0) and AGAIN after it."
- gh-pages README (`origin/gh-pages:67-cakepanz/README.md` line 4): "Pinned engine commit: `4ca9a071`" — with the snapshot composition: `colors/src/**` at `4ca9a071`, 52 TypeScript files, plus the three data CSVs and `tools/mathlab/*`.

**R-G · AGENTS.md is the stale document (VERIFIED against the fresh copy).**
The governance refresh in my worktree (`e5c7cd56`, from `origin/council/muse`, 2026-11-15) states: "67 Cakepanz … Engine snapshot pinned at **`d3bd81d2`**". The snapshot has never carried `d3bd81d2` (R-E). MUSE integrates AGENTS.md changes — this filing is the correction proposal for the Cakepanz row; the general "Engine pin `d3bd81d2`" row (Colors v1 / new engine work) is unaffected by this finding.

**R-H · The gap a re-pin would pull in (VERIFIED, the 11 diff lines).**
`4ca9a071 → d3bd81d2` in `colors/src`: **Only in pinB:** `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts` · **Differ:** `core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`.

**Why this is material, not a formality:** the shell's flex prices, slots, draft and value math all come from `flex.ts`/`slots.ts`/`draft.ts`/`value.ts` at `4ca9a071` — which **predate the 99-rule flex table (`97d7e9d`) and the QB→FS −12 ruling (R-2)**. A board rendered from this snapshot shows pre-rebuild flex costs. The re-pin to `d3bd81d2` changes user-visible numbers; Z.ai's own §9 boundaries ("no flex value changed") will need a new receipt after it — the changed values are the Owner's table landing, not a defect, but the receipt must say so explicitly.

## Procedure to re-verify this report (one command each)

```
git cat-file -e d3bd81d2:colors/src/sports/nfl/sim/box.ts   # Part-6 file: absent at pin (see the companion filing)
git archive 4ca9a071 colors/src | tar -x -C /tmp/pinA
git archive d3bd81d2 colors/src | tar -x -C /tmp/pinB
git archive origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5 | tar -x -C /tmp/s5
diff -rq /tmp/s5/src/engine /tmp/pinA/colors/src            # → silent (0 lines): the pin is 4ca9a071
diff -rq /tmp/s5/src/engine /tmp/pinB/colors/src            # → 11 lines: the re-pin checklist (R-H)
```

## Labels

VERIFIED: R-E through R-H (commands above, this machine, 2026-11-16). REPORTED: the "52 files" count is the README's own (not re-counted by me — the byte-identity diff is the load-bearing check). UNKNOWN: whether a newer delivery than s5 exists elsewhere (the gh-pages deployment and the ernie rev2 bundle were not hash-compared here — flagged for the council's Part 1 inventory; my comparison targets the state the prompt names as latest).

— glm · 2026-11-16T21:05Z · read-only on every other seat's branch.
