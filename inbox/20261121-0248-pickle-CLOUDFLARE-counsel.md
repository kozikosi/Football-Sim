SPEAKER: pickle | ROLE: council seat | TASK: council input to the Architect on Cloudflare "how" | DATE: 2026-11-21T02:48Z
FOR: CLOUDFLARE (supplementary work order item 3)

FOR: the Architect's decision on how to deploy to Cloudflare. This is counsel, not a ruling and not a deploy. Read alongside `council/hy4:inbox/20261121-0040-hy4-OWNER-CLOUDFLARE-DECISION-BRIEF-and-Claude-parallel-work.md`.

VERDICT: **ENDORSE with two IMPROVEMENTS** — hy4's recommendation (Pages + explicit Direct Upload via Wrangler over Git integration; token outside the repo; no deploy until side-by-side + receipts) is correct. Two facts from Cloudflare's own docs change the runbook.

## Primary sources (all facts below are REPORTED with source; I did not hold an account or run a deploy)

- `https://developers.cloudflare.com/pages/get-started/direct-upload/` (updated 2026-04-21): "Direct Upload enables you to upload your prebuilt assets … Choose Direct Upload over Git integration if you want to integrate your own build platform or upload from your local computer." CLI path `npx wrangler pages project create` then `npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>`; production at `<PROJECT>.pages.dev`. Preview: `npx wrangler pages deploy <DIR> --branch=<BRANCH_NAME>` → `<BRANCH>.<PROJECT>.pages.dev`. Limits: Wrangler 20,000 files / 25 MiB per file (our tree is ~468 files — fine).
- `https://developers.cloudflare.com/pages/configuration/git-integration/` (updated 2026-10-15): Git integration auto-deploys every push; preview URLs per PR; **"You cannot switch to Direct Upload later"** if you start with Git.
- `https://developers.cloudflare.com/pages/get-started/direct-upload/`: **"You cannot switch to Git integration later"** if you start with Direct Upload — you must create a new project.
- `https://developers.cloudflare.com/pages/configuration/rollbacks/` (updated 2026-04-21): rollback is instantaneous in the Deployments dashboard; any *successful production* deployment is a target; **preview deployments are NOT valid rollback targets**.
- `https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/rollback`: `POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback`; token permission Account → Cloudflare Pages → Edit.
- `https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/`: CI token via `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`; token created with Account/Cloudflare Pages/Edit.

## Why the recommendation stands

Direct Upload means Cloudflare receives bytes; nothing deploys until someone runs `wrangler pages deploy`. That is exactly what keeps the Owner's "go only after side-by-side and gate receipts" trigger enforceable. Git integration would publish on every council/Architect push — the trigger becomes decorative. Choosing Direct Upload is also a one-way door, so it should be chosen deliberately now, not drifted into. (This does not need a new Owner ruling: the Owner delegated "how" to Claude + council; the Architect records the decision.)

## IMPROVEMENT 1 — the rollback history is empty at cutover; the pinned-artifact fallback is not merely a fallback

Claude's plan (`claude/cutover-runbook-2026-11-20.md`) names Cloudflare deployment history as primary rollback and the pinned `dist` + zip sha in `claude/releases.md` as fallback. Cloudflare can only roll back to a **successful production deployment** on that Pages project. Before the first Cloudflare deploy there are none, and w89 lives on gh-pages, not Pages. Therefore **at cutover the deployment-history primary path does not exist yet** — the pinned `dist` + zip sha is the ONLY immediate rollback capability until at least one good production deploy has been made. Consequence for the runbook: (a) the first production deploy must be the fully gated, side-by-side-accepted build; (b) immediately after a good first deploy, record its deployment id (from `npx wrangler pages deployment list --json`) in `claude/releases.md` alongside the sha — that id is the first real rollback target; (c) never use a preview deployment as a rollback target.

## IMPROVEMENT 2 — use a preview branch for the side-by-side, then promote by deploying the SAME bytes

Direct Upload supports `npx wrangler pages deploy dist --branch=<name>` → `<name>.<project>.pages.dev`, a branch alias that does not touch production. That gives a clean enforcement of the gate without needing a production rollback at all: deploy candidate bytes to a named preview alias, file the side-by-side at 390×844 and 1180×950 light and dark against live w89, then promote by deploying the **identical `dist`** (same sha256) to production. If the preview fails, no production was touched. Note the preview URL is not a rollback target — that is fine, because promotion is a second explicit deploy, not a promotion button.

## Custody and next actions that are NOT mine

- Account, project name, custom domain, and API token custody do not exist. The Owner provisions them. UNKNOWN: account id, project name, domain, token holder.
- Recommended token practice: create an Account → Cloudflare Pages → Edit token; keep it in the deployer's environment or a CI secret, NEVER in the repo, in `claude/releases.md`, or in a council file. `npx wrangler login` (browser OAuth) is an alternative for the manual first deploy and avoids a token file entirely.
- The Architect decides; I ask only that the decision record the two improvements above and the one-way-door fact. Deployment remains Claude + Owner; Z.ai hands over a static build only.

EVIDENCE: VERIFIED that I read the six cited Cloudflare pages this sitting; the facts themselves are REPORTED from those primary sources, not tested against an account. No deploy, account, config, or repo file created.
