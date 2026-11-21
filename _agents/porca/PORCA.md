# PORCA — lane file (rewritten at session end 2026-11-21T16:17Z, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor (admitted by the Owner 2026-11-19). ID block: none filed.
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`.
- **Evidence standard:** every claim carries a fresh command receipt (`git show`, `git grep`, `git cat-file`, `shasum`, `node`, file read). No shared-tree writes, no product/engine/pin/governance/queue file, no other seat's file. A wrong claim stays in the record with a superseding correction.

## Current work and state (session 19 — mandatory launch features, Owner rulings, canonical reference, Z.ai close-out handoff; 2026-11-21T16:17Z)
- Owner raised launch scope: sign-in must be *completed* before deploy (optional remains true, game playable with no account); Accounts are not a future goal; sync saves, resolving offline changes and migrating local saves across devices are mandatory with brag share; expansion into other sports, interactive visuals/photos and multiplayer are future goals. "locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i can setup the cloudflare but i need direction".
- Owner delegated hosting substrate and auth provider to Claude, phrased as a council consensus recommendation/question: "this should be phrased as a recommendation by consensus from the council and as a question to claude"; "I don't know personally; should be phrased as a question to claude with the full context of the council recommendations".
- **Filed this arc:** `inbox/20261121-0455-porca-P-208-accounts-sync-plan.md` (launch-blocking plan), `0459` (corrected Owner verbatim + Cloudflare direction), `0508` (full verbatim handoff), `0525` (advisory reply to Claude's Q-HOST/Q-STATS/Q-AUTH), `0539` (long Z.ai prompt from Claude ruling + canonical reference), `0730` (MUSE-sweep addendum, unique catches only). Bulletins folded into these commits.
- **FACT — canonical reference read:** `inbox/20261121-0513-pickle-CANONICAL-REFERENCE…md` and `0520` addendum; permanent Owner/decision reference. No engine/protected-constant change was made or proposed.
- **FACT — Claude ruling** (`a17c323de`, `claude/cloudflare-decision-2026-11-21.md`, reviewed complete and internally consistent): Workers Static Assets + one thin Worker; D1 only, no KV/R2/DO at v1; explicit `wrangler deploy`; no Git auto-deploy. Hostname corrected to `play.76pancakes.workers.dev` or closest free variant — no registrar, nameservers or custom domain ever. Better Auth in the Worker, GitHub at v1, Google only if spike passes; Clerk rejected (production guide requires owned domain).
- **FACT — stats decisions:** record both 17-0 and 20-0; "players' top seasons" means the user's own drafted/frozen players across runs; aggregates maximised; raw logs stay pruned; one ledger row per run; whole-league awards deferred. `playerLines`, `pickOverall`, `seeding` are later pin-byte fields for Claude after Z.ai merges; seam golden `e8fed8ab…` must hold; engine pin `408410477`.
- **FACT — P-254 conflict law:** whole-save per-slot LWW, rung-back, keep-both at slot level. No CRDT, field merge, mutation log or action replay. No downloads, export/import, hidden full save, field-level merge, engine-byte diff or protected-constant change.
- **FACT — MUSE catch adopted:** preserve the display-rounded-oracle caveat in top-three copy; fix D5 with its law, lying toast and two seed defects; side-by-side needs a panel-bearing season screen; local brag is P-209 text + build-time deployed URL.
- **FACT — long-term rival scope:** playbooks + badge-only spatial players/fields + yellow drive-progress line; no faces, scouting or full GM; future, not release-blocking. Already captured in canonical reference.
- **Not done:** no account/sync/stats build; no product, engine, pin, governance, queue or tools bytes edited. Awaiting Claude's account-sync contract (`claude/account-sync-contract-2026-11-21.md`) before any build.

## Prior sessions (compressed — full detail in the filed inbox items)
- **18 (03:13Z):** published Owner's S15 WIP folder verbatim (`cb86c6932`, 545 files, 18 MB, `diff -rq` clean); review verdict `improved`; F1–F4 blocked verified/cutover; filed UI/UX implications (I1–I7). See `0311`/`0312` and `bulletin/0313`.
- **17 (02:55Z):** reviewed supplementary work order and other seats' filings; `0253` (two factual corrections, ring-scope self-correction) and `0254` (Owner work-order relay). Confirmed stale-ref false negatives, falsifier defect, v8 premise error, pin drift.
- **16 (00:33Z):** reviewed Architect timeout (no new commit after `dfdb887`; empty diff; both architect worktrees clean/stale) and filed long Z.ai continuation order `0033`.
- **15 (00:31Z):** Owner delegated Cloudflare *how* to Claude + council; filed reply draft `0031`; corrected self — `cp-quick` is the only one-click path.
- **14 (00:26Z):** reviewed `dfdb887` (`0026`, improved); S13 gate floors in v8/S14 gate; hy4 w89 glow inversion; `rawSort` REOPENED.
- **13 (23:59Z):** cross-seat S14 review `2359` (improved); only pickle/hy4 caught the 22:30Z ring ruling. **12:** relayed desktop S14 verbatim (468/468), S14 review + six-item brainstorm; composite PARTIAL; falsifiers died by name.

## What the next session needs
- **Read first:** `inbox/20261121-0513-pickle-CANONICAL-REFERENCE…md` → `inbox/20261121-0520...` → `inbox/20261121-0539-porca-PROMPT-to-Z.ai…md` → `inbox/20261121-0730-porca-MUSE-SWEEP…md`.
- **Do not redo:** the account/sync/stats plan, canonical reference review, Claude ruling review, long Z.ai prompt and MUSE addendum; the S15 publication/review; C1–C12, A1/A2/A3, S13/S14 review rounds, P-287 review, `dfdb887` verification.
- **Session-end gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees and the Owner's shared `Football Sim` tree only; do not touch them. This branch must read `0 dirty, 0 unpushed, OK`, 0 stashes, 0 local-only commits after this session's commit.
- **Do not adopt** MUSE's ring-law range `L13, L16–L25` without byte verification; canonical says ring removal voids L13/L16–L22, with L23–L28 corrected/new laws.

## Open questions (not mine to decide)
- Claude: publish the account-sync contract; after Z.ai merges, add `playerLines`/`pickOverall`/`seeding` pin bytes while seam golden `e8fed8ab…` holds.
- MUSE/custodian: action the P-208 expansion row "Perfect season (20-0)" (11th stat); intake verbatim Owner notes; reconcile pin/H2 lines and hostname/R2 correction; add supersession lines.
- Z.ai: close out S15 per `0539` + `0730` (D1 checksum policy + converse check, F27–F30 DIED by name, uninterrupted composite, regenerated docs/gates, packaging, D5/toast/seed fixes, panel-bearing side-by-side). No assignment by this seat.
- Owner: provision free Cloudflare account/subdomain, GitHub OAuth App and Worker secrets after hostname pin; no secret in repo, bundle or chat.
- Architect: rule on the seven S15 UI improvements; rule the REOPENED `rawSort`; publish corrected v8; record the Cloudflare decision.

## Live files in this lane
- `_agents/porca/PORCA.md` — this file. `67-cakepanz-15-WIP-2026-11-21/` — Owner-requested verbatim S15 publication on `council/porca` (not a lane build copy).
- `inbox/20261121-0455-porca-P-208-accounts-sync-plan.md`, `0459`, `0508`, `0525`, `0539`, `0730` — the account/sync/stats arc and Z.ai close-out handoff.
- `inbox/20261121-0311-porca-S15-review.md`, `0312` (UI improvements), `0253`, `0254`, `0033`, `0031`, `0026`; `bulletin/20261121-0313-porca.md` and later.
- `_agents/porca/deliverables/zip-root-cakepanz-{10,12,13,14}/` — verbatim relays from earlier S14 work. Historical idea files kept, superseded but not deleted.

## Role
General advisor. Propose, test, dissent, measure; never build or rule. Work comes from the ranked queue, never from an assignment.
