SPEAKER: hy4 | ROLE: advisor | TASK: Owner directive on Cloudflare decision + what Claude can do while Z.ai builds | DATE: 2026-11-21T00:40Z
FOR: Owner · Architect (Claude) · MUSE · council. Decision brief and parallel-work list; no product edits, no decision made by me.

## 0 · Owner directive, verbatim (this chat)

> i want claude and the council to deicde oh how to deploy to cloudflare. what else can claude do now or are we just waiting on z.ai for ui/ux slices?

This **supersedes** the Owner's earlier answers 4 and 5 to me ("i need more context and claude should decide"): the call is now **Claude together with the council**, not Claude alone. My context filing (`inbox/20261121-0020-hy4-TO-ARCHITECT-context-q4-q5-deploy-and-rollback.md`) still supplies the facts; the decision owner is now Claude + council.

## 1 · Cloudflare: what can be decided now, and what cannot

**Verified fact (again this sitting):** no `wrangler.toml`, deploy script, Cloudflare config, account, project or domain exists in `architect/engine-and-seats` or `council/muse`. No Cloudflare decision brief exists on `council/muse` inbox. `claude/releases.md` does not exist at tip `dfdb887` (it is merge-time work per Claude's report).

**Mechanism is decidable now; account facts are not.** Three realistic shapes:

| Option | Shape | Fit with the Owner's rules |
|---|---|---|
| **A — Pages + Git integration** (auto-deploy on push) | Connect repo, build `colors/`, output `dist/`; preview deployments per branch | **Fails the make-live trigger**: a push would publish before the Owner has seen the side-by-side and gate receipts. Cloudflare history rollback works, but "go" is no longer a deliberate act. |
| **B — Pages + explicit Direct Upload** (`wrangler pages deploy dist`, pinned `wrangler.toml`, API token held by Owner/Claude) | Deploy only when a human runs the command | **Best fit**: deploy is an explicit act after "go"; the uploaded `dist/` has a recorded sha that pairs with the pinned-artifact fallback; preview deployments stay available for rehearsal. |
| **C — Workers static assets** (`wrangler deploy`) | More config, different rollback screen/versioning | Static site gains nothing; rollback UI and mental model change. Not recommended unless the council wants Workers-specific features. |

**My recommendation (not a decision): B.** The deciding criterion is the Owner's "go after side-by-side and receipts" — A makes that unenforceable. Add a checked-in `wrangler.toml` with only the project name/compatibility settings (no secrets), keep the token out of the repo, and record the deployed `dist/` sha in `claude/releases.md` at every make-live.

**Still UNKNOWN regardless of the choice (needs an account, which only the Owner can create):** product type actually available, project name, account id, token custody, page/domain, retention behaviour, and whether Cloudflare's documented rollback works. Those cannot be decided from the repo; the first deploy must be the rehearsal Claude already specified. I cannot create the account — if the council picks B, the Owner needs to provision the Pages project and hand Claude the deploy token.

## 2 · Claude is NOT purely blocked on Z.ai — parallel work, ranked

0. **Fix the two `dfdb887` defects I filed** (`inbox/20261121-0030-hy4-REVIEW-architect-dfdb887.md`): w89's pulse is on every Draft button with top-3 opting out (`:12853-12855`), and removing `cp-quick` requires re-pointing six `visual.battery.mjs` selectors including W14 leg A at `:292`. Two small doc edits in his files; both block Z.ai's start. Highest value right now.
1. **Decide the Cloudflare mechanism with the council** (§1) and record it in the runbook; leave account-specific fields UNKNOWN.
2. **Playwright pin in `colors/` now** — verified absent from `colors/package.json` (only svelte, vite, plugin, types, TS). Choose and pin a version, regenerate the lockfile, `npm ci` clean, print `npx playwright --version`, install chromium, CI cache. Independent of Z.ai's build; doing it now removes a merge-day surprise.
3. **`claude/releases.md` schema now, empty** — agree the columns (deployment id/URL, `dist/` sha256, zip sha, golden seam `e8fed8ab…`, source commit, date) before the first deploy so the receipt format is not invented under pressure.
4. **Visual-acceptance harness** — fix the exact screenshot set (Team Select, board with a top-3 row, pick confirm, finished draft at 390×844 and 1180×950) and the token assertions, so pickle can coordinate the side-by-side the moment a build exists. Can be written before the build.
5. **devgame keep/retire** — one line in NOW.md; hy4's standing advice is keep as `src/devgame.ts`.
6. **D13 purity test over core/view/app** — a test-only addition, safe while the pin is frozen. Likewise the pin-watch CI gate.
7. **MUSE, not Claude:** the pin drift in `AGENTS.md` (`d3bd81d2` vs `408410477`) and council intake of the Owner's verbatim directives.

**Must wait / must not be done now:** the merge, gate reruns at final bytes, the filed side-by-side, and make-live all need Z.ai's slices. Save export/import, migration scaffold, quota class and multi-tab guard are listed as optional in NOW.md, but they change engine bytes — they should stay **after cutover** so the `408410477` pin remains frozen for the merge. Ship-first still governs.

## 3 · Bottom line for the Owner

Not just waiting: Claude has two blocking doc fixes, a Cloudflare mechanism decision, and four pieces of merge prep he can finish today. The **shipping** critical path is still Z.ai's UI/UX slices — nothing product-facing can be accepted until they land. The only thing that requires you personally is provisioning the Cloudflare account/project (and deciding whether a council seat holds the deploy token), because no amount of repo work creates an external account.

Filed as advisory. I edited no product, engine, pin, governance or queue file.
— hy4
