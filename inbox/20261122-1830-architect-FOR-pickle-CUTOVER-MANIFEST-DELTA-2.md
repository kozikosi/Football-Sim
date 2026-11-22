SPEAKER: Architect (Claude) | TASK: answers to the Owner's Q3-Q6 after Delta 1 | FOR: Owner, pickle, council
DATE: 2026-11-22 18:30Z | PLAN ONLY. Nothing created, moved, connected, purged or deployed.
Labels: V = read/run this sitting · R = reported · I = my reasoning · U = unchecked. Rulings recorded: `claude/rulings/2026-11-22-owner-via-pickle-76pancakes-name-ratings-hide.md`. I am not a lawyer; the rights questions below are facts and options, not legal advice.

## New facts (V) that drive the answers
- Old repo is public: anonymous `GET api.github.com/repos/kozikosi/football-sim` = `private:false, visibility:public, fork:false, forks_count:0, stargazers_count:0, archived:false`.
- **The live page already serves the ratings.** `origin/gh-pages:index.html` (w89, 1,922,769 B) contains the real rows, e.g. `["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,…]`, `Josh Allen … 99,87,81`; the CSV rows for the same players read `99,96,73` and `99,89,81` (first three numeric fields match; Allen's SPD differs, 87 vs 89, so it is not a byte copy; U which table). `gh-pages` also carries the CSV itself twice (`67-cakepanz/data/nfl/madden27-ratings.csv`, `67-cakepanz/src/data/madden27-ratings.csv`), both blob `18d254ad…`, identical to the one on this branch. That the page is publicly served is R (13 Nov assessment).
- 125 remote heads (`git ls-remote --heads origin`), any of which may contain the CSV in history (I; not scanned).
- `data/nfl/README.md` (V) calls the files "Madden NFL 27 ratings … as pasted by the Owner"; it records provenance but no license.

## 3. Old repo after cutover
**Recommendation (I): make it private after Cloudflare go-live and after the Exhibit has a static export; do not rewrite history; do not delete.**
| Option | For | Against |
|---|---|---|
| Public read-only archive | Keeps the one-URL Exhibit and process history visible to employers (R, pickle) | Keeps serving the ratings from HEAD and 125 branches indefinitely, which is the thing you asked to hide |
| **Private** | Reversible (flip public later if you rule the data fine); no force-push; keeps provenance for you; ends distribution via the repo | Exhibit links to it go dead for visitors, so the Exhibit needs a static export in the new repo (see 6). On GitHub Free, Pages likely needs a public repo (I, unchecked), so `gh-pages` goes down: fine only **after** go-live |
| Purge/rewrite | Only way to publish the history with the data gone | Rewrites up to 125 heads plus both `gh-pages` copies; needs force-push (I never do; yours to order); GitHub may keep cached commits until support clears them (I); breaks every pinned old hash the new `ARCHIVE.md` cites; forks 0 today (V) but clones are unknowable (U) |
| Delete | Strongest | Destroys the provenance you decided to keep (R, 4 Nov) |
**What would change it:** your ruling that the data may be public means public archive; a takedown or complaint means purge/delete at once; if public process history matters more to you than hiding, public archive after a CSV-only rewrite, accepting the cost above.

## 4. Public `dist/` containing ratings
Today's exposure is unchanged by shipping the new build: the live page already embeds the table (V). Repo-hiding and dist-hiding are separate; hiding the repo copy does not hide the site (and the merged UI imports the CSV into the bundle, R `claude/cutover-runbook-2026-11-20.md:24`). Options:
1. **Ship with embedded data** (exposure same as w89 today). Honors "hide from the new repo", not "stop serving". Needs one recorded sentence from you in the `releases.md` row.
2. **Hold the new deploy and take the old page down** (unpublish `gh-pages`). The only option that truly stops serving; nothing is public until your ruling, so it directly stops ship-first.
3. **Ship behind access control** (a restricted Worker). Possible, extra setup, a Cloudflare Access policy (I/U, not verified here). Not public, so no "first public release".
4. **Gate/substitute the data:** a dataset provider with no file supplied, or invented names/ratings. Not before a ruling: it changes the product (real names stay, R 4 Nov), `dataVersion` (V `colors/src/core/envelope.ts:19`) and the pinned tests (Delta 1 H5).
**My recommendation (I): option 1, only if your goal is "keep EA-derived data out of the repo I show employers"; option 2 if your goal is "stop serving it now".** Which goal it is, is yours. Either way the first release's `dist/` is **built from the old repo**: the new repo cannot build it without the CSV (R, runbook:24).

## 5. Order: confirmed, ship-first-then-move is required
Move-first only works if the new repo can both pass its gate and build the product without the CSV. Gate: yes, via Delta 1 H1-H2 (pass + skipped = 434). Build: no, unless a dataset seam exists (U whether the merged UI tolerates an absent file). So no honest move-first path today unless you rule on the data (then the CSV crosses and move-first becomes viable). **Before the move, all must be true:** (1) ratings ruling/NOTICE, or your recorded acceptance of a data-less public repo; (2) M-0 one queue, digest empty (MUSE); (3) CI/pin-watch de-historized; (4) runbook merge landed and v1 live with a `releases.md` row; (5) repo owner/name and LICENSE holder given; (6) old-repo disposition (3) and Exhibit export (6) chosen; (7) Delta 1 receipts 1-7 pass.

## 6. Exhibit
**Cleanest receipt-safe (I): pointer in commit 1, content in a later commit 3.** Commit 1 adds a `docs/EXHIBIT.md` pointer (old-repo URL, `ARCHIVE.md` mapping); the full exhibit lands in commit 3 after receipts 1-7 pass, so commit 0 stays a copy and receipts stay unaffected. **If the old repo goes private (3), commit 3 must be a static export** (the w74 generator reads refs by name, R pickle) and must be checked for ratings before it is committed. **Choose otherwise if** employers get the new URL before commit 3 and the Exhibit is the main exhibit: then put a minimal static page in commit 1, never in commit 0.

## What I need from you
1. GitHub owner/org + exact repo name (case-sensitive; e.g. `<owner>/76Pancakes`). 2. LICENSE holder line as it should read (`Copyright (c) 2026 <holder>`). 3. Old-repo choice (3). 4. Dist choice 1/2/3 and the goal behind it (4). 5. Exhibit location (6), if you want other than pointer-then-commit 3.

## Not checked (U)
Which CSV vintage the live page embeds (Allen SPD differs); whether the page is currently served (R only); history contents of the 125 heads; Pages on private repos on Free; Cloudflare Access setup; any ratings license terms.
