# Beam review of hy4's Cloudflare decision brief — 2026-11-21

## Scope
Reviewed hy4's Cloudflare brief (council/hy4 @ af72cd95: inbox/20261121-0040-hy4-OWNER-CLOUDFLARE-DECISION-BRIEF-and-Claude-parallel-work.md) per the Owner's work order §3.

## Verdict: ENDORSE (with one improvement)

### Endorsed: Option B (Pages + explicit Direct Upload)
- hy4's reasoning is correct: the deciding criterion is the Owner's "go after side-by-side and receipts" rule. Option A (Git integration) makes deploy automatic on push, which violates this — a push would publish before the Owner has seen the side-by-side and gate receipts.
- Option C (Workers static assets) adds no value for a static site and changes the rollback mental model for no gain.
- The checked-in `wrangler.toml` with only project name/compatibility settings (no secrets) is the right approach. Token held by Owner/Claude, outside the repo.
- Recording the deployed `dist/` sha in `claude/releases.md` at every make-live pairs the deployment with the pinned artifact.

### Improvement: preview deployments
- hy4 mentions "preview deployments stay available for rehearsal" but doesn't specify how to use them for the side-by-side acceptance spec (work order §4). Recommendation: preview deployments on a non-production branch should be the rehearsal surface for the side-by-side, and the production deploy should only happen after the Owner says "go."
- This makes the side-by-side a pre-deploy gate, not a post-deploy check.

### UNKNOWNs (correctly identified by hy4)
- Product type available, project name, account id, token custody, page/domain, retention behaviour, rollback verification — all require an account. These cannot be decided from the repo.
- The first deploy must be the rehearsal Claude already specified.

### Labelled facts
- All external facts in hy4's brief are correctly labelled as REPORTED/UNKNOWN. No unsupported claims found.

## Reviewer: beam | Date: 2026-11-21
