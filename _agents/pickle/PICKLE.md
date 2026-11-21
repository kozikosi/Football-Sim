# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (`git merge-base HEAD origin/council/base`, re-verified 21 Nov 2026).

## Current state (21 Nov 2026, 33rd sitting) — sweep check; final Z.ai order completed

PICKLE is an **adviser**. No product, engine, pin, governance, queue or `tools/` file has ever been
edited by this seat; every deliverable is an `inbox/` filing, a bulletin entry, or a read-only byte
mirror in this lane. Head at session end: `9dacd3540a7ee1127e5058e92db882aa74432f56` (pushed,
ls-remote verified).

**The single durable reference** is
`inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md`
(371+ lines): every Owner quote verbatim, the locked set, the future set, the do-not-redesign list,
defects + withdrawn claims, hosting status, questions by audience, the fence, and a source index. Its
live addendum is `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`
(three Owner questions to Claude). `0508` master relay and `0455`/`0458` domain advice are SUPERSEDED
(struck: no domain, no nameservers, no registrar).

**The final sendable Z.ai order** is
`inbox/20261121-0551-pickle-TO-ZAI-FINAL-SELF-CONTAINED-complete-briefing-and-work-order.md`
(supersedes `0537`, `0539`, `0545`, `0550`). Fully self-contained: Owner words verbatim, Claude's
three rulings, exact D1 digest fix + converse check, ring-law retirement by name with new floors,
all defects, F27–F30, S14 floors, brag P-209, visual bar, Workers hand-over, local seam, fence,
hand-over, DoD, both seat disagreements (§12), and — added this sitting to §8 — the two standing
Owner rules: **finish ALL work before responding** (single zip; "push after every file" is the
council's rule, not Z.ai's; a stated blocker is the only reason to reply with work outstanding) and
**innovate / think around the issue** (challenge a wrong line with the byte that proves it).

**Claude's three rulings are DECIDED** (`a17c323de` / `0533`, read in full): hosting = Workers Static
Assets + one thin Worker, D1 only (no KV/R2/DO), explicit `wrangler deploy`, hostname
`play.76pancakes.workers.dev`; stats = the user's own run players, one ledger row/run, aggregates
maximised, logs pruned, 3 payload fields deferred to one re-pin sitting after the merge (seam golden
`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8` must hold); auth = Better Auth
in the Worker, GitHub v1, Google only on a passing spike, Clerk rejected (needs an owned domain).
Domain is "free now and always" — no domain ever. Release gates (mandatory, not future): accounts +
security, cross-run career stats, cross-device sync, offline conflict resolution, local-save
migration, brag share. Sign-in optional for the player, mandatory to build. P-254 conflict rule is
fixed by the Owner: per-slot whole-envelope LWW, rung-back, keep-both at slot level, additive
`deviceId`; no field merge, no CRDT, no mutation log.

**Owner product-direction rulings filed verbatim:** no scouting / full-GM experience; long-term
playbooks + player/field visualizations, players as badges spatially with no faces (`0324`);
screenshots 01 and 02 "the real goals of our site", faces replaced by "more of a badge format"
(`0358`) — long-term, **not** a v1 gate and not folded into the w89 visual bar; stat scope
"record 17-0 and 20-0, all the players' top seasons … collect all possible data" (`0520`, stat #2
no longer open).

**This sitting's work (sweep check):** verified from the bytes that the canonical reference already
covers every durable MUSE sweep item. Found one real gap and closed it — `0551` lacked the two
standing Owner rules, now inlined in §8. Recorded in canonical §15: DS's BoardRow a11y patch
(`council/ds` `8de747340`, REPORTED, not re-run; ring-on-41/60 likely antiquated) and the two still-
owed items (Claude's `account-sync-contract-2026-11-21.md` absent at `a17c323de`; P-208 needs a
"Perfect season (20-0)" 11th row). Receipt in `bulletin/20261121-0325-pickle.md`.

## What the next session needs
0. Use `0513` (with addendum `0520`) as the one reference; use `0551` as the one Z.ai order. Do not
   re-ask the Owner substrate/IdP/stat #2 — answered at `a17c323de`/`0533`. Do not tell Z.ai to
   rebuild slices 1–5 (BUILT per `0110`/`0301` + `SLICE-STATUS-2026-11-20.md`) or to reword ring
   laws (retire by name with new floors). If a newer written Claude order contradicts `0551`, stop
   and report the conflicting lines with hashes — do not implement both.
1. Do not implement; propose only. Nobody but the Architect writes `Football-Sim-*.html` / `colors/**`.
   Work comes from `node tools/council.mjs next` on `origin/council/muse` (v11 tool there; v8 on
   architect prints empty `next`). `council/base` is a stale ghost — never take work from it.
2. Engine fence stays frozen: tree `8d8a8a1e81386e99f53f995492904348cb7d8345`, pin `408410477`,
   `draftBoard.ts` sha256 `e9e6e01a…`, zero engine bytes for UI/account work. `rawSort` label
   (WITHDRAWN vs REOPENED) is Claude's call. D5 stale `ENGINE_PIN` (`App.svelte:83/:88` stamps
   `d3bd81d2`) must be fixed before any server compares `engineVersion`.
3. MUSE's files (do not edit): pin drift in `AGENTS.md:44-46,73` + `PROJECT-KNOWLEDGE.md:18`
   (four pin values: `65673a0` CI fixture, `d3bd81d2` live doc, `408410477` engine, `4ca9a071` stale
   base); 21 Nov Owner rulings into `_agents/owner-notes/` + intake ledger; re-rank P-208/209/210;
   supersession line on the 1 Nov "no accounts" brief. Architect's files: Biome selftest (exit 3,
   nested-root config + deprecated `recommended`), pin-watch CI gate, `releases.md` schema,
   `account-sync-contract`, P-208 "Perfect season (20-0)" row.
4. Step 0 governance refresh from `origin/council/muse` each new chat. No named-seat assignments.
   Never edit product/engine/pin/governance/queue or another seat's lane/inbox. Run
   `node tools/preserve.mjs check` at clean-up; other seats' dirty trees (`council/q`, `council/vloc`
   at this check) are not ours to touch.

## Open questions (not mine to decide)
- Visual bar timing: the Architect's w89 visual spec (03:02Z) predates the Owner's 03:24Z/03:58Z
  01/02-with-badges rulings. `0513` declares **no conflict for S15** — live w89 is the S15 bar;
  01/02-with-badges is the long-term goal. Owner/Architect to confirm that reading.
- P-208 stat #2 is a **pair** now (17-0 regular-season + 20-0 perfect season), not a swap; the 11th
  row still needs adding. "Playoffs/reach each round" expanded scope is Claude's payload-ruling.
- Identity provider rehearsal (Google on a `workers.dev` origin; Better Auth/Kysely-D1) UNKNOWN until
  a spike. Owner provisions the free Cloudflare account + GitHub OAuth App and hands over secrets;
  no secret in repo, bundle or chat.

## Live files
- Reference + orders: `inbox/20261121-0513-…-CANONICAL-REFERENCE-…md`, `…0520-…-OWNER-ANSWERS-…md`,
  `…0551-…-TO-ZAI-FINAL-SELF-CONTAINED-…md`; exact digest fix `…0303-pickle-S15-manifest-drift-fix.md`;
  side-by-side spec `…0250-pickle-S15-side-by-side-spec.md`.
- Owner verbatim filings: `…0018`, `…0028`, `0324`, `0358`, `0420`, `0508` (all `inbox/` this lane).
- Reviews: `…0032-pickle-REVIEW-dfdb887-v8-cp-quick-premise-false.md`, `…0004-…-other-seats-s14.md`,
  `20261120-2349-pickle-S14-review.md`. Z.ai continuation `…0110-pickle-TO-ZAI-continuation-v2-S15.md`.
- Hosted read-only mirrors: `_agents/pickle/deliverables/67-cakepanz-15-WIP-2026-11-21/` (545 files,
  18 MB, no node_modules) and `…/67-cakepanz-14-2026-11-20/cakepanz-4/`; rival ref images at
  `_agents/pickle/deliverables/ref-pro-football-dynasty-2026-11-21/` (26 images, 4.7 MB, 26 OK exit 0;
  pixels not seen by me — content UNVERIFIED).
- Claude docs (read via `git show`, never edit): `claude/NOW.md`, `cloudflare-decision-2026-11-21.md`,
  `cutover-runbook`, `dispatchasync-contract`, `zai-work-order-v8`, `visual-acceptance-spec` on
  `origin/architect/engine-and-seats`.
- Bulletin: `bulletin/20261121-0325-pickle.md` (this session's single entry, with the 07:31Z receipt).

## History (compressed — full detail in the filed inbox files)
- Sessions 26–32: hosted + reviewed the S15 WIP (verdict improved, not accepted); filed the S15
  manifest digest fix, UX implications, the 32-capture side-by-side spec and the 9-section hand-over
  checklist; Biome 2.6.2 selftest RAN and FAILED (exit 3); filed canonical reference, three Owner
  answers, reviewed Claude's `a17c323de` ruling, and wrote the final self-contained Z.ai order.
  Three seat disagreements resolved: ring laws retired by name; KV/R2 + Clerk Hobby superseded by
  Claude's D1-only + Better Auth; slices 1–5 BUILT. Operational lesson: chat-only replies to Claude
  were not durable — file them verbatim on `council/pickle` when the Owner wants a record.
- Earlier sessions: reviewed cakepanz-10/11/12/13/14; executed v4 sitting order; meta-reviewed peer
  reviews; contract/resume audit; Cloudflare rollback research (REPORTED, not executed); devgame
  keep/retire asked repeatedly, default **keep** stands; multisport parked per Owner 20 Nov.
- Operational rule: self-contained replies beat pointers; label VERIFIED / REPORTED / INFERRED /
  UNKNOWN; a number without a command is prose; every count names its unit; no force-push, no stash,
  no images in lanes, no dated/merged/final copies in the root.
