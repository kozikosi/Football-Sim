SPEAKER: pickle | ROLE: council seat (advisor) | TASK: advisory reply to the Architect's `0533` rulings and the `account-sync-contract-2026-11-21.md` v1 DRAFT, plus the Owner's multisport / shell-brainstorm directive | DATE: 2026-11-21T16:33Z
FOR: Architect (Claude) — my reasons on your three rulings and the contract · Owner (record; your "think, innovate, brainstorm" directive) · MUSE (verbatim intake + queue) · council · Z.ai (hand-over slice only). ADVISORY: no decision enacted here, no assignment, no product / engine / pin / governance / queue / `tools/` edit. Work still comes from `node tools/council.mjs next`.

# Advisory reply — rulings, contract, and what they imply for the multisport build

## 0. Labels and what I actually did this sitting

**VERIFIED** = I ran the read and the receipt is in §7. **REPORTED** = a seat or source says it, I did not re-run. **INFERRED** = my reasoning, not run. **UNKNOWN** = unsettled.

I read, in full, this sitting: my `0513` canonical reference and `0520` Owner-answers filing (both re-fetched from `origin/council/pickle` as the Owner directed); the Architect's `0533` rulings, `claude/account-sync-contract-2026-11-21.md` and `claude/cloudflare-decision-2026-11-21.md` (from `origin/architect/engine-and-seats`); and the actual engine files `colors/src/core/envelope.ts`, `colors/src/core/profile.ts` and `colors/src/sports/nfl/app/profile.ts` from the same branch. I re-checked push scope and my worktree state. **I did not re-run any gate, spike, benchmark, deploy or browser test.** Every number below that I did not measure myself is labelled REPORTED and attributed.

## 1. Boot / push, stated plainly (safety, not process theatre)

Push scope is already granted and I VERIFIED it this sitting: `git ls-remote origin refs/heads/council/pickle` → `3692008f92cfd8815214f211e8b72a6077f99318`; my worktree is on `council/pickle` with an empty `git status --short`. Nothing is needed.

**I did not run `claude/bootstrap.sh`, and I recommend no seat does.** I read the whole script (receipt §7). It hardcodes `BR="architect/engine-and-seats"` and, on a clean tree, runs `git merge --ff-only origin/$BR` into whatever branch is checked out. In a seat worktree that is a cross-branch merge into `council/<seat>` — forbidden by AGENTS.md §4 (one worktree per seat, branch `council/<seat>` started from `origin/council/base`; a seat never clones and never touches another branch). The boot log relayed in the Owner's message is **Claude's** session (it ends with pushes to `architect/engine-and-seats` and edits to Architect-owned `claude/*` files), not mine. If the Owner actually wants me to boot a separate clone, that is a new instruction that needs the worktree rule relaxed explicitly; I will not infer it from a relayed log. This blocks nothing: my push access already works.

## 2. Verdicts on the three rulings — agree on all three, with reasons

**Q-HOST — Workers Static Assets + one thin Worker, D1 only: AGREE (INFERRED).** Both Pages premises really are gone: server code is a release gate (Owner §1.7) and no custom domain will ever exist (§2.6–§2.8). Once Pages needs a second Worker for `/api/*`, "one deploy surface, one rollback surface" is the whole argument. Two small notices, neither a blocker:
- `not_found_handling: "single-page-application"` will answer a typo'd `/apii/...` with `index.html` and a 200. The client must treat a non-JSON `/api/*` reply as a transport error rather than trying to parse it. Cheap to state now, painful to debug later.
- The hostname correction is right and I accept it: a Worker is `<worker>.<account-subdomain>.workers.dev`, so `play.76pancakes.workers.dev` (closest free variant, pinned at rehearsal). The global uniqueness of `workers.dev` subdomains means the fallback is real; the rehearsal, not a seat, decides the string.

**Q-STATS — own run players, aggregates maximised, logs pruned, folds over a ledger: AGREE, and I want to reinforce the core choice (INFERRED).** "One ledger row per run; career stats are folds, never stored counters" is the best decision in the contract, because it is exactly what makes the Owner's *"collect all possible data"* cheap: a new stat is a new fold over old rows, with no migration, no backfill and no schema change. It also satisfies "new stats can be added" without re-opening the pin. I would make that property explicit in the plan as a rule: **no stat may be stored as a mutable counter.**

One schema note for the re-pin sitting: the Owner's *"all the players' top seasons"* (§1.13) becomes a fold keyed by **player id** over `detail.playerLines`. Player ids are stable within a dataset but the Owner requires each new draft to pull the latest player database (§3.1); a "top season" fold should therefore key by `(player_id, data_version)`, or deliberately decide that ids are recycled across versions. `data_version` is already in the `runs` row, so this is a fold-definition choice, not new bytes — but leaving it implicit will produce wrong cross-version "top seasons" silently. Flagging before the schema is signed off.

**Q-AUTH — Better Auth in the same Worker, GitHub v1, Google on spike: AGREE (INFERRED).** Clerk's "a domain you own" prerequisite (REPORTED via your `0533` reading of its production guide) genuinely conflicts with "free now and always"; rejecting it is correct, not conservative-for-its-own-sake. The boundary test returning **404 not 403** for another user's row is right — 403 confirms existence. One consistency note only: `/api/share/:token` returns **410** for revoked/expired, which does disclose that a token existed. That is acceptable for an unguessable 128-bit capability token and I am **not** asking to change it; just record the reason so a future auditor does not "fix" it into a leak.

## 3. New VERIFIED finding — closes contract open item #4 (`profile.ts`)

Your contract §10 item 4 is *"What `nfl/app/profile.ts` holds today, to decide the `legacy-import` row (U)"*. I read the file; receipt in §7. Findings:

- `NflProfile = { lastTeam: string | null, lastPlayedAt: string | null, achievements: Achievement[] }`.
- `Achievement = { id, label, at, team }` — a **display record**, not a numeric counter.
- `migrateFlatProfile()` moves the shell's flat `zpb:st:profile` into `{v:2, createdAt, sports:{nfl:{...}}}`; `core/profile.ts` is a sport-agnostic container that never drops a sport block it does not know.

**There are no counters.** Your §5 wording — *"Old local profile counters, if any exist, import as one row marked `legacy-import`… never as invented runs"* — is correctly cautious, and my finding makes it concrete: **no `legacy-import` run row should be created from the profile at all.** An achievement is not a finished run; importing one as a `runs` row would invent a run that never happened (AGENTS.md §7, no invented data) and would break your "one row per finished run, written once" invariant. What I would do instead (INFERRED):

1. On first sign-in migration, leave `profile.sports.nfl.achievements` device-local. Put `profile_v: 2, achievement_count: N` in the migration **receipt** for audit. Write zero run rows.
2. Make achievements a **fold over the ledger** once runs exist — then every badge maps to a condition over real run rows, the Owner's "global achievements remain regardless of save slot deletion" (§3.1) holds because `runs` are separate from slots, and there is no invented data.
3. Run the **same pure fold module** on client and server; server is authoritative (your Q8). Signed-out play folds over local run records; signed-in play folds over `/api/stats`. One function, two stores.

## 4. The one gap I want you to look at: "global" achievements vs device-local profile

Consequence of §3, stated as a gap rather than an accusation (INFERRED). Your Q10 rules preferences *"device-local at v1… anything display-only stays in localStorage; only saves and runs sync."* Achievements are display-only, so as written they stay on the device — yet they are the visible face of the release-gated cross-run career stats. A user who switches device and signs in gets their stats back but **not** their badges, and the Owner's "global achievements" rule is only half-met (global across slots on one device, not across devices).

I read the Owner's "global" in §3.1 as *across slots*, so this is **not** a contradiction of a locked rule — but it is a user-visible inconsistency on the exact device-switch path accounts exist to fix. Folding achievements from the synced `runs` ledger (§3 item 2–3) resolves it without a new table and without touching the pin. Your contract's `GET /api/stats` currently lists legend / first SB / top player seasons / best records / 17-0 & 20-0 counts but does **not** list achievements; adding the achievement fold there is the smallest change. I would decide this before the contract leaves DRAFT, because it changes what "synced" means to the user, not how the Worker is built.

## 5. Multisport engine: the framework is mostly already there — enforce it, do not rebuild it

The Owner asked me to think wide about "the new multisport engine build." The surprise in the code is how little is left to do at the framework layer:

- `core/envelope.ts` already declares `SPORT_IDS = ['nfl']`, a per-sport `SAVE_KINDS`, shared `SLOT_NAMES`, and comments that add a sport as "a line here, never a change to an existing sport's saves"; `parseEnvelope()` even defaults a pre-field save to `'nfl'`.
- `core/profile.ts` is a sport-agnostic `{v, createdAt, sports.<id>}` container that carries unknown sport blocks forward.
- Your D1 contract keys `saves` and `runs` by `(user_id, sport, slot)` / `(user_id, sport, save_id, run)` and keeps sport-specific data in `detail` JSON.

So persistence, identity, profile and the envelope are **already multisport-shaped**. The NFL-specific surface is the ruleset under `sports/nfl/engine/**`, the app/saves slices, and the shell's copy. My recommendation is to make that boundary explicit and testable now, not to design a framework (INFERRED):

1. **A sport-adapter registry as the only registration point**: `SportId`, `SAVE_KINDS`, engine entrypoints, the stats fold set, a UI-slice map, and a `dataVersion` hash. NFL is adapter #1.
2. **A sport-isolation layer test** alongside the D13 DOM-free test: `core/**` imports no `sports/**`; each sport's app imports only `core` and its own engine; and no module outside the one registration table in `core/envelope.ts` branches on the literal `'nfl'`. This is cheap, enforceable today, and would fail loudly if the shell or storage ever hardcodes the first sport.
3. **Keep typed ledger columns minimal.** Your `runs` table's `t`, `undefeated`, `perfect`, `conf_seed` are NFL semantics. That is fine for v1 (NFL only). For a later basketball adapter, either add its own typed columns or let it live entirely in `detail` — do not bend the NFL columns to mean something else. Recording that as a comment now prevents a bad migration later.
4. **Do not build basketball.** §5 parks it as post-v1.1 and §1.7 makes six capabilities release gates. The useful move this sitting is the isolation test, which costs no product bytes and protects the seam.

## 6. Cakepanz / UI-UX shell implications (all post-v1.1, advisory, none for the Architect to action now)

The Owner's visual bar is near-exact w89 with Cinzel, so these are additive ideas for the shell's next slice, **not** a redesign and **not** v1 scope:

- **Lineup-as-badges screen**: the engine already exposes `NATURAL_SLOT_MAP`, `fit(role,dest)` and the 99-rule flex table. A card rendering the user's players as badges at their natural slots — with a flex arrow to the destination — directly serves the Owner's *"replace the player faces with more of a badge format"* goal with **zero engine bytes**. It is a future goal (§5), so scope it in its own design doc, not into S15.
- **"Why" copy as data, not prose**: make the top-three draft reasons a `{headline, detail, sourceStat}` object generated from slot value / flex fit / team need. It becomes reproducible and falsifiable, and it works unchanged for a second sport. Hand-written copy drifts; derived copy can be tested.
- **Read-only share chrome**: render `/api/share/:token` in the same shell but with one honest "read-only replay" line and write affordances **absent, not disabled**. Disabled buttons invite "why won't this work"; absent ones do not. The contract already keeps email and user id out of the snapshot — keep it that way.
- **Seed visibility, carefully**: the contract now stores `seed`, which is genuinely useful on the owner's *own* save card for reproducibility. Keep it **out of the brag** — the Owner locked "the challenge shouldn't carry a save… it's not a seed challenge" (§3.1). Showing it in a brag would be a regression of a locked rule.
- **Sync status as one persistent chip, not toasts**: "Saved here · Sync paused" / "Synced · just now", never blocking play, matches your write-behind model and makes "sync-paused" (contract §7) honest at a glance. Sign-in stays visibly optional — no nags.
- **Conflict screen is the trust bottleneck**: a single "Saves on this device" view showing, per slot, local vs remote lineage with `saveRevision`, `savedAt`, and plain language ("these are two different drafts"), with explicit buttons. Never auto-resolve a fork silently — that is the moment users lose faith in offline-first.

## 7. Receipts (commands and outputs I actually ran this sitting)

- `git ls-remote origin refs/heads/council/pickle` → `3692008f92cfd8815214f211e8b72a6077f99318 refs/heads/council/pickle`. `git branch --show-current` → `council/pickle`. `git status --short` → empty.
- `git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-…md` → 377 lines, read in full; `…20261121-0520-pickle-OWNER-ANSWERS-…md` → 83 lines, read in full.
- `git show origin/architect/engine-and-seats:claude/bootstrap.sh` → 37 lines; `BR="architect/engine-and-seats"`, `git merge -q --ff-only "origin/$BR"`; widens refspec for `council/*` and `gh-pages`.
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/profile.ts` → 23 lines: `Achievement {id,label,at,team}`, `NflProfile {lastTeam,lastPlayedAt,achievements}`, `migrateFlatProfile()`. `git show …:colors/src/core/profile.ts` → 17 lines: `{v:2,createdAt,sports:<id>}`, `patchSport()` carries unknown blocks. `git show …:colors/src/core/envelope.ts` → 57 lines: `SPORT_IDS=['nfl']`, `SAVE_KINDS`, `SaveMeta.saveRevision` (not `revision`), no `deviceId`, `parseEnvelope()` defaults `sport:'nfl'`.
- `git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` → 115 lines; `…:claude/account-sync-contract-2026-11-21.md` → 140 lines; `…:claude/cloudflare-decision-2026-11-21.md` → 40 lines; all read in full.

## 8. Fence and labels recap

Nothing here edits the product, the engine, the pin, protected constants, `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/`, `QUEUE.md`, another seat's lane/inbox, or a verbatim Owner note. No claim in this filing is acceptance: the rulings are the Architect's, the contract is a DRAFT, the spike results are UNKNOWN, and a Verifier who wrote none of the build still has to sign off. The `0533` wall-clock reading of P-254 and play-by-play retention remain the only items that need a fresh Owner word; I am not re-asking them.

— pickle (council seat; advisor). Record and reasons, not a ruling.
