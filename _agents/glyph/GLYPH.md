# GLYPH — council seat

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits.

## Read first (next glyph session)
1. `git fetch origin`
2. `git show origin/council/muse:_agents/START-HERE.md` and take work via `node tools/council.mjs next` fetched from `origin/council/muse:tools/council.mjs` (live queue is on muse; base queue is stale).
3. `git show origin/council/glyph:_agents/glyph/inbox/20261113-2228-glyph-session-handoff-and-council-work-requests.md` — full session handoff, verified receipt ledger, formal work requests (WR-G1..G9), copy-paste council prompt, insights, future avenues.
4. Byte-check everything (Owner 2026-11-13): VERIFIED claims require `ref@sha + path + command + hash/output`; otherwise REPORTED/INFERRED/UNKNOWN.

## Current state (2026-11-13T22:28Z close)
- **Synced governance docs** (glyph worktree) to `origin/council/muse@35e841dafafe62905e58238c60a62e94687e2cb2` (4/4 sha256 match recorded in `20261113-2117-glyph-fwtest-wave-report.md`). Known source defects left unpatched (MUSE-owned): AGENTS 99-rules/97d7e9d note; PROJECT-KNOWLEDGE 97-rule/105-expected and old PRIORITIES header.
- **Z.ai fwtest v2 (VERIFIED review):** `origin/council/beam@208738ec7ee7978e5d746d4100c92574a8028e5b:zai-fwtest7-dynamic-engine-2026-11-13/` (538 tracked paths, 7 arms). CHECKSUMS `4f5cf86e...` (539) but fresh extraction `sha256sum -c` reported **2 unreadable/missing listed files** (`fwtest-7/arm-next/next-env.d.ts`, `tsconfig.tsbuildinfo`); README “0 missing” not reproduced. Contract aggregates/goldens/arm-owned forbidden scan clean across 7 arms; canonical differs by `tools/` only. See `20261113-2126-glyph-review-zai-fwtest7-v2.md`.
- **Glyph independent Playwright/build (VERIFIED, Node 26.13/npm 11.20/Playwright 1.64.1, cached Chromium, isolated `/tmp`):** all 7 builds rc 0; acceptance 5/5 for `arm-react, arm-vue, arm-svelte, arm-sveltekit, arm-next, arm-nuxt`; **`arm-solidstart` 0/5** (served SSR shell, empty `#app`, no `data-testid`s/hydrated UI visible). Harness copied spec to fix `async boardRows` Promise-locator count bug (disclosed). Ranking/evidence in `20261113-2137-glyph-playwright-review-rank-zai-fwtest7.md`.
- **INKLING arms (VERIFIED by inspection):** `origin/council/inkling@0938db96221a6001de8589c53641b37cc1c80a2e:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` (arm-lit, arm-solid) contract/golden parity with Z.ai arms (`6c5f7c39...`, `0ccb6319...`); builds/tests REPORTED in delivery, not independently rerun by glyph.
- **Z.ai v3 prompt:** sent by Owner. Work order `origin/council/inkling@79c9b478a78fda4ed76b1382b89eab2c9c16f4fd:_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` reviewed by glyph (critique + rewritten prompt provided in chat). Await v3 artifact for WR-G1 byte-check.
- **Owner organizer/prompts filed:** `20261113-1905-glyph-organizer-and-prompts.md`; byte-check rule broadcast `20261113-1905-glyph-RULE-byte-check-everything.md`.

## Key filings this session (glyph inbox)
- `20261113-1905-glyph-RULE-byte-check-everything.md`, `20261113-1905-glyph-organizer-and-prompts.md`
- `20261113-2117-glyph-fwtest-wave-report.md` (Inkling wave, partial, blockers)
- `20261113-2126-glyph-review-zai-fwtest7-v2.md`
- `20261113-2137-glyph-playwright-review-rank-zai-fwtest7.md`
- `20261113-2228-glyph-session-handoff-and-council-work-requests.md` (**primary handoff**)
- Earlier: multisport plan/reviews/lambda (`0132,0145-0149,0150,0315`)

## Commits pushed (`origin/council/glyph`, this session)
`fd9383a1308e160884e734076a58fa735f156242`, `22acf4c11addccac3f7d2ecc0e025b9db590caa4`, `b65e6fcd7d76f8db8839383ed9da6b46b736987f`, `b358357ae04fce52e670f7dcc0d5c6178f247f46`, `e53e469e31a7af652aae3e86c65e7e0ac496dd48`, plus session-close commit (handoff + bulletin + this lane update).

## Next priorities for glyph (no assignment; pick up as available)
1. **WR-G1:** byte-check Z.ai fwtest v3 on delivery (fresh extraction/CHECKSUMS 0 unreadable, spec fix, 9-arm matrix, contracts/goldens/leakage/round2, independent build+Playwright per arm, solidstart disposition). File receipts.
2. **WR-G2:** map Owner’s 8 stacks vs tested arms (incl. INKLING arm-solid/arm-lit, v3) with VERIFIED/REPORTED gaps.
3. **WR-G3:** maintainer-inspector “focus from data alone” pass on available arms (pristine copies, diffs, rebuild).
4. **WR-G4:** solidstart root-cause/fix investigation if still failing in v3.
5. Support council verification/reviews and proposals (CI plan, #11/#13 engine-intent specs, lambda/flex authority evidence maps) — proposals/receipts only.

## Standing constraints/reminders
- Football first; Svelte not a lock; do not delete React until ruled out; framework-neutral plain TS core; Z.ai definitive data/council evaluates. Server-ready deterministic core direction. No injuries; Wins static/Priority dynamic; form ±5–6/reset; user sees Wins/Priority/OVR. Lineage: Pre-Colors -> Colors/Claude (76 Pancakes v1), Cakepanz w89 shell; merge when Claude ready.
- Glyph: own branch/inbox only; add by path; commit+push; no force-push/stash; no product/governance/queue/shared-file edits.
