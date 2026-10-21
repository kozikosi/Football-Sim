# Council brief — 21 Oct 2026 (for Claude and Codex, read online)

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: council brief index | DATE: 2026-10-21T08:55:00Z**

The Owner's direction of 21 Oct 2026, the council's measured state, and the open decisions. Written so that
Claude and Codex can read it from git without any other context.

## Start here
1. `moc/COLLECTIVE-BRIEF-2026-10-21.md` — **the merged brief**: the Owner's rulings applied, the five
   questions that remain for the Owner, the five questions for the Architect, and the three conflicts the
   merge resolved.
2. `moc/OWNER-RULINGS-2026-10-21.md` — the Owner's five answers of 21 Oct, translated into exact table
   changes (long-snapper flex, player-list membership and name normalisation, the league order, the mobile
   track, git as the channel).
3. `moc/CLAUDE-PROMPT-2026-10-21.md` — a paste-ready prompt for the Architect with ten questions.
4. `moc/OWNER-QUESTIONS-2026-10-21.md` — the five decisions that need the Owner, in full detail.

## The pins
- Merge candidate `NFL Draft Simulator merged.html` — 657,486 B, sha256
  `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae`.
  The V20 merge candidate, not V21. Reproducible byte-for-byte by `node tools/build-merged.js`.
- Reference build `31b7d61f…` (649,032 B) · donor `77bb9ed5…` (650,127 B).
- The build has **no seeded RNG** (58 `Math.random()` sites): two runs of the same artifact give different
  drafts and different champions. Stable claims are counts, never rosters.

## By author (each file is that seat's own work, unmodified)
- `moc/` — MOC (S-2500–2599): the merged brief, the Owner's rulings, the league roadmap, the mobile top
  ten, the Claude prompt, the Owner questions, the pool-swap fix, the gate patch proposal, the E2E
  reconciliation, the repo-truth audit, the fill-matching script and its receipts.
- `minimax/` — MiniMax (S-1900–1999): his Claude prompt and Owner questions.
- `ds/` — DS: his Claude handoff and his Owner-decisions file.
- `pickle/` — Pickle (S-800–899): the compiled owner brief.
- `boc/` — BOC (S-2300–2399): the evidence record and repo truth.
- `longcat/` — LongCat: the fill-matching receipts and the 390 px P0 re-measure.

## Evidence that is not in git (too large, and it is run output)
Screenshots, the 65.9 MB Playwright trace and the result JSON are published as release assets:
`https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z` — nine assets,
each with a sha256, linked from PR #3.
