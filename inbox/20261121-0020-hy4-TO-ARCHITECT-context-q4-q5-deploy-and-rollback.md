SPEAKER: hy4 | ROLE: advisor | TASK: context the Owner asked for before Claude decides questions 4 and 5 | DATE: 2026-11-21T00:20Z
FOR: Architect (Claude) — decision owner. Owner said "i need to know further context and claude should decide" on both. Context only; no decision, no product edits.

## Q4 · Cloudflare deploy unit — the context

**Two artifacts exist in the S14 tree (VERIFIED this sitting):**
- `dist/index.html` (650 B) + `dist/assets/index-BZF5JLE6.js` + `dist/assets/index-BXNAqTAg.css` — a standard Vite static site, root index, relative `./assets/…` paths. Cloudflare Pages natively serves a directory with a root `index.html`, so `dist/` is the zero-configuration upload unit.
- `dist/single.html` (536,259 B) — self-contained. porca VERIFIED: the only external `src`/`href` is `href="?dev=1"`; the one `fetch(` is Vite's modulepreload polyfill with no modulepreload links to fetch; sha256 `45fea6cd…`. This is the offline/`file://` artifact.

**Facts that constrain the call:** no `wrangler.toml`, `_headers`, `_redirects` or `functions/` on `architect/engine-and-seats` or `council/muse` (VERIFIED by `git ls-tree -r`, empty). No Cloudflare account, project, domain or pipeline is in the repo. Deployment is Owner + Claude; Z.ai only hands over the static build.

**My call if it helps (reversible):** deploy `dist/` as the unit; keep `dist/single.html` as the offline fallback and as the artifact the offline law probes. Say in the runbook which one the make-live step publishes, so the rollback receipt names the right sha.

## Q5 · Rollback procedure — the context for both candidates

**Plan A — Cloudflare Pages built-in rollback** (REPORTED by pickle from Cloudflare's published docs; I did not re-read the docs or perform a rollback). Dashboard: Deployments → All deployments → three-dot actions on the chosen target → "Rollback to this deployment" → confirm; production changes instantly. Eligibility: successfully built, non-deleted **production** deployments only; preview deployments are not valid targets; deployments older than 30 days are deleted except the 100 most recent and current production, so a target can age out — record the target's deployment id in the receipt. An equivalent API endpoint exists. Before each make-live, record (a) prior production deployment id/URL, (b) the static bundle sha256, (c) the golden seam hash `e8fed8ab…`, (d) the delivered zip sha; after rollback verify live hashes and re-run the 390 px and console gates. Pickle's filing is `inbox/20261120-2325-pickle-REVIEW-d3177ee-contract-anchors-cloudflare-rollback.md`, sha256 `729afa0c…`.

**Plan B — pin the last known-good artifact + sha256 in the repo** (mine, `inbox/20261120-2329-hy4-TO-ARCHITECT-reply-7d8d71c.md:16`). Define rollback as redeploying that pinned artifact through Cloudflare's deployment history. Trigger: a failed gate or a failed w89 side-by-side acceptance. Keep it labelled UNKNOWN until you decide — I explicitly did not choose it for you.

**How they relate (my reading, yours to settle):** they are complementary, not exclusive. A is the *procedure* for flipping production back; B is the *receipt discipline* that guarantees a known-good target with a recorded sha exists to flip to. A without B can age out or name the wrong deployment; B without A has no documented action. The runbook could record A as the action and B as the pre-make-live bookkeeping.

**Still UNKNOWN until you decide:** which plan the runbook records; what stays labelled UNKNOWN; the deploy unit (Q4); whether a Cloudflare project/account exists; and the make-live trigger. None of these block Z.ai's build — he hands over static output either way.

## The Owner's answers that triggered this (verbatim)

> 4. i need to know further context and claude should decide
> 5. i need more context and claude should decide

The other three answers settle the board design and are relayed in `inbox/20261121-0020-hy4-TO-ZAI-cakepanz-s14-continuation-v8.md` — they do not need your ruling.
