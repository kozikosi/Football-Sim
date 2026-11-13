# GLYPH HANDOFF (stable, latest)
**Seat:** glyph (`council/glyph`) | **Updated:** 2026-11-13T22:28Z | **Canonical source:** `origin/council/glyph:_agents/glyph/HANDOFF.md` (this file). Immutable session record: `_agents/glyph/inbox/20261113-2228-glyph-session-handoff-and-council-work-requests.md` on same ref.
**Head at update:** `origin/council/glyph@dcfa7ca66f38f2a4ebb8be8b75584a3cf36e5ab5`
**Rule:** byte-check everything (Owner 2026-11-13). VERIFIED = `ref@sha + path + command + hash/output`; else REPORTED/INFERRED/UNKNOWN.

## Self-recovery from basic reboot prompt
If started with only: `git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly — do that, then **immediately** read canonical glyph state from your own branch (not just local worktree copies, which may be stale):
- `git fetch -q origin`
- `git show origin/council/glyph:_agents/glyph/GLYPH.md`
- `git show origin/council/glyph:_agents/glyph/HANDOFF.md` (this file)

`GLYPH.md` = lane boot/status/priorities; `HANDOFF.md` = full receipts, work requests, prompts, insights. After reading, follow START-HERE work/review flow and take next action from live queue (`origin/council/muse`) or complete a WR/review you can finish with receipts.

## Current state (carry-forward)
- Governance docs synced locally to `origin/council/muse@35e841dafafe62905e58238c60a62e94687e2cb2` (4/4 sha256 recorded in inbox wave report). Known MUSE-owned doc defects unpatched: AGENTS 99-rules/97d7e9d note; PROJECT-KNOWLEDGE 97-rule/105-expected and old PRIORITIES header.
- **Z.ai fwtest v2 (VERIFIED):** `origin/council/beam@208738ec7ee7978e5d746d4100c92574a8028e5b:zai-fwtest7-dynamic-engine-2026-11-13/` (538 tracked, 7 arms). CHECKSUMS `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec` (539) — fresh extraction `sha256sum -c` showed **2 unreadable/missing listed** `fwtest-7/arm-next/next-env.d.ts` (L17), `tsconfig.tsbuildinfo` (L74); “0 missing” not reproduced. Canonical contract `40a1be21...`, all 7 arm contracts `6c5f7c39...` (nuxt `app/engine-contract`; canonical differs only by `tools/`), all goldens `0ccb6319...`. Arm-owned forbidden scan clean (excl engine-contract). Round2/manifests/logs REPORTED (not rerun).
- **Glyph independent rerun (VERIFIED, Node 26.13/npm 11.20/Playwright 1.64.1, cached Chromium, `/tmp`):** builds rc 0 all 7. Playwright 5/5: `arm-react, arm-vue, arm-svelte, arm-sveltekit, arm-next, arm-nuxt`; **`arm-solidstart` 0/5** (SSR shell `<div id="app"><!--!$e000000--><!--!$/e000000--></div>`, no `data-testid`s/hydrated UI; `:3000` occupied locally in run). Harness copy fixed spec bug `async boardRows` returning Promise used as locator for `.count()` (disclosed). Ranking (non-final): Tier A react, svelte, vue, sveltekit, next, nuxt; Tier B solidstart.
- **INKLING arms (VERIFIED inspection):** `origin/council/inkling@0938db96221a6001de8589c53641b37cc1c80a2e:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` (arm-lit, arm-solid) contract/golden parity `6c5f7c39...`/`0ccb6319...`; builds/tests REPORTED.
- **Z.ai v3:** work order `origin/council/inkling@79c9b478a78fda4ed76b1382b89eab2c9c16f4fd:_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` reviewed; prompt sent by Owner. **WR-G1:** byte-check v3 on delivery (fresh extraction/CHECKSUMS 0 unreadable, spec fix, 9 arms, contracts/goldens/leakage/round2, independent build+Playwright per arm, solidstart disposition).

## Key filings (glyph inbox, `origin/council/glyph`)
- `20261113-1905-glyph-RULE-byte-check-everything.md`, `20261113-1905-glyph-organizer-and-prompts.md`
- `20261113-2117-glyph-fwtest-wave-report.md`, `20261113-2126-glyph-review-zai-fwtest7-v2.md`, `20261113-2137-glyph-playwright-review-rank-zai-fwtest7.md`
- `20261113-2228-glyph-session-handoff-and-council-work-requests.md` (**immutable full handoff record**)
- Earlier: `0132` multisport plan, `0145-0149` reviews, `0150` lambda, `0315` council review

## Formal work requests (any seat may take; glyph can review)
- **WR-G1:** Verify Z.ai fwtest v3 on delivery (full byte-check + independent reruns, per-arm PASS/FAIL/BLOCKED/ELIMINATED).
- **WR-G2:** Map Owner’s 8 stacks vs tested arms (incl. INKLING arm-solid/arm-lit, v3) with VERIFIED/REPORTED/UNVERIFIED gaps.
- **WR-G3:** Maintainer-inspector uniform pass (“add focus from data alone”, pristine copy, contract resync, rebuild, `diff -rq` arm-owned touched count).
- **WR-G4:** Solidstart root-cause/fix investigation (console/network/assets/dev vs start, 5/5 or elimination evidence).
- **WR-G5:** Measurement-only scoring/aggregation packet (no winner).
- **WR-G6:** Staged GitHub Actions plan (minimal football now; multisport/multiuser later) with concrete YAML sketches.
- **WR-G7:** Engine-intent specs/proposals for #11/#13 + dynamic engine/layering with invariants and determinism/test plans.
- **WR-G8:** Flex/weights authority evidence map (99-rule live truth, mirrors/drift, open decisions).
- **WR-G9:** Lambda (P-345) synthesis aligned to Owner ruling (not 0.20-vs-0.40 binary).

## Standing Owner rulings (carry forward)
Football first; basketball/multisport design-only until football ships. Svelte not a lock; 8 stacks under test (Svelte+Vite, SvelteKit, React+Vite, Next.js, Vue+Vite, Vue+Nuxt, Solid+Vite, SolidStart). Do not delete React until ruled out. Framework-neutral plain TS core. Z.ai test = definitive data; council evaluates/verifies/extends. Server-ready deterministic core (defined I/O, no browser/UI/localStorage/framework dependence in core, explicit time/randomness/env, seeded/versioned replay target). No injuries. Wins static/Priority dynamic. Flex consistent through year. Draft class fixed. Form ~±5–6 OVR visible arrows/reset per season. User sees only Wins/Priority/OVR. λ 0.20-vs-0.40 binary false (context dial open). Per-slot C>OG both spots. Emerge-don’t-mirror. Lineage: Pre-Colors -> Colors/Claude (76 Pancakes v1), Cakepanz w89 shell; merge when Claude ready. 76 Pancakes saves preferred.

## Open gaps
Z.ai v3 artifact not yet delivered/verified; 9-arm consolidated picture pending; solidstart root cause unresolved; framework decision not ready; CI plan not delivered; 8-stack coverage mapping incomplete.

## Session-close procedure (glyph)
Update `GLYPH.md` + `HANDOFF.md` (stable) and immutable inbox handoff, add bulletin entry, `git add` by path, commit, `git push origin council/glyph`, record hashes/tip. Never edit product/governance/queue/shared files or other branches.
