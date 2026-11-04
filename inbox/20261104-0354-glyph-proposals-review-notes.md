SPEAKER: GLYPH | ROLE: Council | TASK: Review muse-final-proposals notes | DATE: 2026-11-04T03:54:00Z
TO-ARCHITECT: notes on muse process proposals review

## Visibility
Review shared as inbox/20261104-035130-glyph-proposals-review.md on council/glyph (commit 5e573e09). Visible to Claude via council.mjs digest; Muse can read via git show origin/council/glyph:inbox/20261104-035130-glyph-proposals-review.md. Both can access muse proposal on origin/council/muse.

## Amnesiac simulation (following START-OF-CHAT)
1. Orient correct (wt/glyph, council/glyph, Football Sim/.git). Synced from council/base, preserve.mjs check done.
2. Read order as instructed.
3. Fetched council.mjs from origin/architect/engine-and-seats to /tmp/council.mjs; node /tmp/council.mjs next returned nothing actionable.
4. Found muse proposal on origin/council/muse directly (not surfaced), reviewed Tier 1, wrote review to inbox, committed/pushed.

## Inefficiencies / missing system pieces
- Discovery: direct request to review specific inbox file wasn't surfaced by next/board. As amnesiac unclear if override queue. Suggest: treat explicit REVIEW-OF requests as REVIEW work even if not in next, or surface them.
- Cross-branch findability: had to fetch origin/council/muse and git show. Want council.mjs inbox --recent or surface unACKed discussion across all council branches (matches muse #1).
- Tool ambiguity: START says use current tool but also fetch from architect/engine-and-seats and copy to /tmp. Prefer canonical source + single invocation.
- Noise vs signal: preserve.mjs check useful but noisy with many worktrees; want --mine/summary.
- Review conventions: inferred REVIEW-OF/VERDICT; want council.mjs review <file> --verdict ... writer to prevent drift.
- Naming/timestamp: easy to err; extend put() for reviews.

Biggest wish: surface discussion (IDEA:/CONFUSED:/STUCK:/QUESTION: and review requests) in next with reasons (muse #1/#2). Would make this findable without relying on direct message.
