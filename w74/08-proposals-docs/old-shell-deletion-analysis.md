# Old-shell deletion analysis (Z.ai's, per the DO-NOT-START carve-out: Claude owns the timing, I own the analysis)

**The ruling (Claude, 551af1b §8):** delete the old shell rather than wrap it. **This file answers: what
references the old shell, and what breaks if it is deleted.** Labels: VERIFIED = grepped this session against
`origin/main`, `origin/gh-pages`, and the branch worktree at `425f72a`.

## What "the old shell" is, concretely (four artifact groups)

1. `Football-Sim-PreColors.html` (657,486 B, md5-pinned in BASELINES.md; sits on `council/base`, also in lane roots).
2. The Z-post-blue line on `origin/main`: `z-core/01-html/Football-Sim-Z-post-blue.html` (1,237,864 B),
   `-logosB.html` variant, and `z-core/01-html/z-post-blue-netlify/index.html` (same bytes).
3. The gh-pages wave shells: `Football-Sim-Z-post-blue-w44 … w70.html` (published builds; the w70 file is the
   1.8 MB "before" anchor of the 1.8 MB → 15 KB story).
4. Lane-held build copies (BASELINES.md itself flags the wave-13 copy on `council/zai` as "to be removed once
   the Owner holds it; lanes hold no build copies").

## Who references them (complete map, VERIFIED)

| Referencer | Kind | Breaks on deletion? |
|---|---|---|
| `BASELINES.md` pin table | process (the one verification table) | **Yes** — its rows `sha256sum`/`md5` the shell files. Fix before deleting: re-point each row's "Where" to the frozen archive (gh-pages tag, below) — the table survives, the bytes just move address. |
| `CLAUDE-START-HERE.md` (origin/main) + `z-core/02-for-claude/*` handoffs, `03-guides/*` (STYLE-GUIDE-Z-POST-BLUE, REWEIGHT-BRIEF), `04-governance/DRIFT-AUDIT` | historical onboarding/analysis docs | Not fatally — they describe the shell in past tense; they are the record. Fix: leave the docs, they now describe an archived artifact; add one line to CLAUDE-START-HERE pointing at the archive tag. |
| `z-core/06-tools/zpostblue_build.py` | build tool for THAT shell | **Yes — goes dead.** Delete it in the same commit (it is the shell's tool, not a product tool). |
| `colors/src/sports/nfl/view/theme.ts`, `view/teamColors.ts` (+ `theme.test.ts`) | provenance COMMENTS only (the md5 of the source table the constants were ported from) | **No** — comments reference history, not files. They stay (same rule as the `zpb:` provenance mentions in P-258). |
| `colors/src`, `colors/test` code | product code | **Zero references** (grepped: the only hits are the two comment files above). Nothing in the new build imports, loads, or links a shell file. |
| `tools/mathlab` | measurement harness "the file tools/mathlab measures" (BASELINES.md row) | Not on origin/main (grepped, 0 hits) — it lives on a lane; if its lane still measures a wave shell, it measures the gh-pages copy, which stays. |
| `z-core/01-html/z-post-blue-netlify/` | deployable copy | Goes dead — delete with the group; the deployment story is the Vite SPA now. |

## What MUST survive the deletion (the receipts worth keeping — Claude's "one receipt" instinct, made concrete)

1. **The w70 anchor bytes + md5 on gh-pages** — the "before" picture of the 1.8 MB → 15 KB story (my w72 §9
   item, unchanged by w74). gh-pages is the right home: published, cheap, already versioned.
2. **BASELINES.md itself** — it is the pin table, not shell code; it survives with re-pointed rows.
3. **The provenance comments in `colors/src`** — where the ported constants came from is a permanent fact.
4. **An archive tag** `old-shell-archive/<date>` containing groups 1–2 exactly as deleted — one tag, zero
   runtime cost, makes every future "what did the shell actually do?" answerable by `git show`.

## The deletion sequence (for Claude's call on timing)

1. Cut the archive tag (groups 1–2; gh-pages already holds group 3; group 4 is deleted without archiving —
   BASELINES.md itself rules lane copies out of existence).
2. Re-point BASELINES.md rows to the tag/gh-pages (one commit, the table's "Where" column only).
3. Delete groups 1, 2, 4 + `zostblue_build.py` + the netlify dir. Add the one CLAUDE-START-HERE line.
4. Run the BASELINES.md checks against the new locations (`git show <tag>:<file> | sha256sum`) — the table's
   promise ("if bytes do not match, STOP") still holds, now against the archive.

**Nothing else breaks.** The product (colors/) has no dependency; the council's verification workflow keeps its
table; the history keeps its receipts. The one deliberate non-action: do NOT wrap or shim any shell URL — the
ruling is delete, and the analysis shows the blast radius is documentation, not code.
