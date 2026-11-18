SPEAKER: glyph | ROLE: council | TASK: parallel round — Part 1 blocked (MUSE drafts absent), Part 10 review sign-up, Part 9 workflow notes | DATE: 2026-11-18T00:18Z
FOR: P-342, R-13

## Start-of-chat orientation (VERIFIED, this worktree)

- `pwd`: `/Users/kosi/Desktop/wt/glyph`
- `git branch --show-current`: `council/glyph`
- `git rev-parse --git-common-dir`: `/Users/kosi/Desktop/Football Sim/.git` (ends in `Football Sim/.git`)
- `git fetch -q origin && git show origin/council/base:tools/sync-base.sh | sh`: merged `council/base` into `council/glyph` (`merged council/base; base won on 3 file(s) you did not own -> 6f99780e`; files: `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `_agents/START-HERE.md`)
- `node tools/preserve.mjs check`: exit 1; reported unsaved work in other worktrees and 1 local-only commit on `council/glyph` before push (`6f99780e ... merge council/base...`). No stash remediation performed by me.
- Push: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push origin council/glyph` -> `9b751b33..6f99780e  council/glyph -> council/glyph` (exit 0). Verified: `git ls-remote --heads origin council/glyph` = `6f99780e10afad5fc27f2a165a541dc229d759a4 refs/heads/council/glyph`.
- Read: `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `COUNCIL-BULLETIN.md` (top/current sections), `_agents/V23-OWNER-REQUESTS.md`, `_agents/glyph/GLYPH.md`.
- Queue tool (live): `git fetch -q origin && git show origin/architect/engine-and-seats:tools/council.mjs > /tmp/council.mjs && node /tmp/council.mjs next` -> exit 0, no output printed (VERIFIED run; meaning UNKNOWN from output alone).

## Part 1 — seven MUSE drafts are absent from all fetched refs (BLOCKED)

**VERIFIED (2026-11-18T00:05Z–00:18Z):** searched every `refs/remotes/origin/*` tree for the seven filenames named by the round prompt:
1. `inbox/20261117-2257-muse-part2-yards-battery-comparison.md`
2. `inbox/20261117-2258-muse-part5-slot-save-contract-review.md`
3. `inbox/20261117-2259-muse-review-glm-verifications-seats.md`
4. `inbox/20261117-2300-muse-part4-d3-landing-review.md`
5. `inbox/20261117-2301-muse-review-glm-mechanism-seats.md`
6. `inbox/20261117-2302-muse-macro-pickle-claims-check.md`
7. `inbox/20261117-2303-muse-review-cakepanz5-seats.md`

Commands/receipts: `git ls-tree -r --name-only origin/council/muse | grep '20261117-22[5-9]-muse|20261117-23[0-3]-muse'` -> only `inbox/20261117-2230-muse-CAKEPANZ-5-review.md` (not in the seven). `git for-each-ref ... refs/remotes/origin | xargs git ls-tree ... | grep` over all council refs -> no matches for the seven basename patterns except unrelated hits (none for `2257|2258|2259|2300|2301|2302|2303-muse` as the named files). `origin/council/muse` tip: `11ca6fde57e017620362534ba598eb3c3d3bb05e` (`MUSE: merged Cakepanz-6 prompt for Z.ai...`). Local muse worktree `/Users/kosi/Desktop/wt/muse` checked read-only: no matching files in inbox; branch `council/muse` at `036cf2a7` locally (dirty), not containing the seven. **Consequence:** I cannot verify any of the seven drafts; per round rule they remain drafts (not council findings) until a non-author seat verifies them from the pushed files/blobs.

**REPORTED (corroborating):** Pickle filed `inbox/20261118-0005-pickle-P-342-seven-drafts-not-pushed.md` and Ernie filed `inbox/20261117-2359-ernie-round-hygiene-part10-signup.md` reporting the same absence (read from their branches; I did not re-run their exact commands).

**Eligibility note (if drafts land):** I have not authored a yards battery, P-317/S3/S4 checklist, D3 proposal, GLM mechanism adjudication, or the macro claims being judged; I did author recent GLM/Cakepanz peer reviews and a Cakepanz-vs-w89 aesthetic audit. I will take any draft I am eligible for once the exact text/blob is pushed, and I will state eligibility explicitly in that verification filing.

## Part 10 — Cakepanz-6 review sign-up (R-13)

When the Cakepanz-6 zip lands, I will take: **takeover screenshots/visual verification + M3 log presence checks** — verify takeover screenshots exist for two teams at 1180px and 390px, light and dark, before/after as specified; verify M3 logs exist under the cited names; verify the slogan/shimmer/value-label/2PT-chip states are present or explicitly called out against the prompt's mechanical requirements (factual check against delivered artifacts, not an Owner decision). I will re-run/inspect gate outputs available in the delivered trees where feasible and report what I could and could not run (e.g. Node-major falsifiers, fresh-clone D-1) with receipts. I will not activate the prepared re-pin (Owner's word).

## Part 9 — workflow/future notes (proposals, INFERRED)

1. **Round-open blob manifest:** every round prompt that cites N draft files should list `path + blob SHA (+ size)` and the commit that contains them; first seat action is `git cat-file -e <sha>` for each and file one BLOCKED line per missing blob before doing other parts. Check: "drafts present N/N" in first filings within 10 minutes of round open.
2. **Router + per-part prompt files:** split long parallel prompts into a <=1-screen router (parts, eligibility, denominators/definitions, deliverables) plus one file per part to reduce context/timeouts and lost unpushed work. Check: more first filings per session and fewer "could not hold full prompt" reports.
3. **Denominator contract as a header block:** for metrics with multiple denominators (e.g. inc:downs per-4th-down-pass-play vs per-incompletion), require a one-line `DENOM:` field in every filing that cites the metric; tooling/lint can grep for it later. Check: zero denominator-ambiguous flags in review rounds.

## Platform/future (INFERRED, brainstorm)

- After GLM default decision and Cakepanz cutover stability work, prioritize **measurement-first acceptance surfaces** (shell-visible gates, deterministic replay receipts, calibration protocols) before adding new sim complexity; this keeps multi-sport/platform ambitions feasible because each sport becomes a module with explicit receipts, not narrative parity claims.
- For "99-is-a-guide" / portable formula direction: acceptance should be a battery comparing formula output to the hand-priced table and to measured outcomes across roster contexts (distribution of misses, worst-case miss, stability under small input perturbations, and explainability of each deviation), not a single global fit score.

BLOCKED: MUSE must push the seven Part 1 drafts (or Owner/MUSE restate Part 1/2/4/5 to source filings) before any seat can convert those drafts into reviews.
OPEN (Owner): value label choice (Value vs Model Value, "Engine Value" ruled out), dark --text fix, Bodoni Moda, 2PT chip, prepared re-pin activation, GLM default, λ value/ratification, 4-3/3-4 target/stop-continue, calibration round timing.
NEXT:
1. MUSE: push the seven Part 1 draft files with blob SHAs; I will verify the first draft I am eligible for.
2. On Cakepanz-6 zip arrival: execute my Part 10 sign-up checks and file receipts immediately.
3. If drafts do not land but source filings are sufficient, I can take a non-draft dependent reconciliation/review item (e.g. review an existing ratified-battery or tool filing) on request of the round state.
