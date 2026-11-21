# ERNIE — lane file (rewritten 2026-11-21 session end, v4)

## Identity
- **I AM ERNIE. Always speak as myself.** Everything I author carries `SPEAKER: ERNIE`. When I quote or review another seat's text, their name stays on the quote. (2026-11-20: I once mislabeled my own prompt as `SPEAKER: MUSE` — the Owner corrected it. Do not repeat.)
- **Seat:** ernie · **Model / how reached:** kimi-k3 (Kilo) · **State:** advisor
- **ID block:** S-ernie (submissions/reviews) · **First seen:** 2026-11-20
- **Strengths shown (evidence, not claims):** independent reviews of Z.ai's cakepanz-11/12/13/14 sittings (each verdict `improved`, each defect re-measured at my machine, never read from prose); broke the 6-seat "T8 blocked" deadlock by finding the bytes on disk; found the macOS `md5 -c` false-green by tamper; re-planted the F25 mutant myself to prove the laws are not tautologies.

## Current work
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base origin/council/base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **This session (2026-11-21, 02:50–07:35Z) — the release-scope session.** The Owner turned accounts, cross-run career stats, save sync, offline-conflict resolution, local→account migration and brag share from "future" into **release-blocking**, then settled the stats scope as **cross-run career stats** (P-208's ten, plus *"we would record 17-0 and 20-0"* and *"we should collect all possible data"*), kept **sign-in optional for the player / mandatory to build**, and locked **"free now and always"** (no domain, ever → `workers.dev` is permanent).
  - **Hosted** Z.ai's `67-cakepanz-14-2026-11-20` read-only (468 files, `verify-package` 467 OK / 0 / 0 converse clean) and **re-ran every S14 gate**: engine 430/430 (69/69 byte-identical to pin `408410477`, `draftBoard.ts` `e9e6e01a…`), node 35/35, board 19/0, visual 18/0, slot 28/0, shell 48/0, slice 29/0/10/3, contrast 2/0, viewport 45/45, golden MATCH. **Verdict `improved`** with five defects: **D1** (merge-blocker) the tree cannot pass both its own manifest gates — `regen-manifest.mjs` writes sha256, `verify-package.mjs` parses md5, so after a regen every file reads EXTRA; **D2** composite PARTIAL + stale 16/0,17/0 step labels; **D3** `SHELL-STATUS.md` describes an earlier build; **D4** the W14 notice says the local save is untouched, then one START overwrites the autosave; **D5** `App.svelte:83` stamps the **previous** pin `d3bd81d2` into every save, so `Saves.svelte:80` warns the user about their own build.
  - **Filed** the S14 review, a runnable hand-over checklist, the shell brainstorm, the rival-product intake + design take, the Cloudflare recommendation, the **final implementation plan as 40 questions** (LOCKED quoted / MANDATORY / per-question defaults + blockers + who decides), the **Cloudflare runbook for the Owner** (16 steps), the **review of every seat's latest** (pickle/hy4/porca/iceman/beam/glyph), the **full briefing** (the Owner verbatim in-session + from files, per-role obligations), the **reply to Q-HOST/Q-STATS/Q-AUTH**, the **Z.ai work prompt**, and the **MUSE close-out-order assessment**.
  - **Corrections I owe and have recorded:** P-208 was **locked**, not open; P-210 was **done** (muse + beam), not open; the **paid-domain** recommendation violated free-only and is withdrawn; my **Clerk** recommendation is withdrawn (Clerk's production guide requires *"a domain you own"* + DNS records, verified) — **Better Auth** is correct; my origin warning is scoped to **signed-out local saves only** and is now closed by construction (no domain, ever); the ring was **already dead** when I reviewed S14 (Owner 20 Nov 22:30Z), so L13/L16–L25 retire with it and my "v8 glow inversion kills L23" point is moot for S15.
- **Blocked / waiting on:** nothing of mine. **Owed by others:** Claude's **account + sync contract** (his next deliverable), the **P-208 expansion row** ("Perfect season (20-0)" as the 11th stat), and **D5** in Z.ai's tree (a gate, not a defect — no server-side `engine_version` comparison is testable until it is true).

## What the next session needs
1. **Read first:** `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` + its addendum `…0520…`, then `origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`. The reference is the permanent record; the rulings are the decisions.
2. **The three questions are settled:** Q-HOST Workers Static Assets + thin Worker, D1 only; Q-STATS both 17-0 and 20-0, aggregates not logs, reading (a); Q-AUTH Better Auth + GitHub (Clerk out on the domain requirement).
3. **Still open:** the account/sync contract (Claude) and the P-208 expansion row (MUSE). Nothing else is blocked on me.

## Open questions
- Whether "collect all possible data" means raw log retention (I argue no: aggregates at elimination, logs stay pruned) — needs one Owner word only if he wants logs.
- Whether `SeasonPayload` carries per-player counting stats; if not, "players' top seasons" needs a field and a deliberate re-pin sitting.
- The toast defect in MUSE's close-out order has no filed receipt I could find — ask for the byte.

## Live files in my lane (all on `council/ernie`)
- Reviews: `inbox/20261121-0301-…cakepanz-14-review.md` · `…0415-…v8-review-before-relay.md` · `…0450-…account-and-stats-plan-found.md` · `…0500-…review-pickle-signin-prompt.md` · `…0520-…review-seats-latest-pickles-final-plan.md` · `…0735-…muse-closeout-order-whats-worth-keeping.md`
- Plans: `…0305-…handover-verification-checklist.md` · `…0420-…cloudflare-portfolio-reassessment.md` · `…0430-…cloudflare-REVISED-accounts-are-mandatory.md` · `…0440-…cloudflare-REVISED-accounts-are-mandatory.md` · `…0505-…FINAL-IMPLEMENTATION-PLAN-as-questions.md` · `…0525-…FULL-BRIEFING-everything-to-know.md` · `…0535-…REPLY-Q-HOST-Q-STATS-Q-AUTH.md`
- Prompts: `…0455-…COUNCIL-PROMPT-accounts-before-deploy.md` · `…0510-…cloudflare-runbook-for-owner.md` · `…0545-…TO-ZAI-work-prompt-s15-close-slices-visuals.md`
- Rival reference: `…0330-…owner-note-intake-pfd-rival.md` · `…0335-…pfd-lessons-playbook-and-spatial-badges.md` · capture at `_agents/ernie/deliveries/pfd-reference-2026-11-21/` (glyph's `_reference/rivals/` is canonical — mine is the duplicate to delete)
- Receipts: `_agents/ernie/deliveries/ernie-cakepanz-14-rerun-receipts-2026-11-21/` (01–04)

## Standing lessons
- **Re-run, never trust prose.** Every verdict I have filed came from a command at my machine; the receipt is in the text.
- **Run batteries on your own fresh port.** Another seat's preview on :4179 served a different build; `assertFreshServer` is why that was caught.
- **A law that cannot die is not a law.** Re-plant a mutant yourself before you believe a count.
- **Read the canonical reference first.** I twice reported items as open that were already locked (P-208, P-210) because I read a stale queue instead of `council/muse`.