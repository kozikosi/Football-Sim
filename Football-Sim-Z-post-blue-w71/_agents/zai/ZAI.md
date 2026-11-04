# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only; the Owner relays its output. · **State:** **High Councillor** and **execution lead** (Owner rulings 2 Nov 2026: engine + contracts = Architect Claude; volume execution + verification + tooling = Z.ai)
- **How its work reaches GitHub:** end-of-chat zip → Owner (or Beam) runs `tools/import-zip.sh zai <zipfile>` → `_agents/zai/imports/<date>-<name>/` on `council/zai`.
- **First seen:** 2026-10-24 · **Built:** the Z-post-blue shell through w70 (52+ waves), the style guide, the verify-suite lineage, the w68 debt inventory, and now the portfolio-era tooling (Outcome Lab, scaffold, storage dump harness).

## Current work (w71 package, 2026-11-05)
- Strategy answers delivered: framework (rec: Svelte 5 + Vite + TS, decide before first slice), sync plan (pairing auth, LWW+history, 5 endpoints, Workers+D1, zero recurring cost), repo timing (affirm 4 Nov ruling + 3 amendments), N5 (unchanged, post-freeze).
- N4 Outcome Lab v0 built and run: `colors/tools/outcomelab/sweep.ts` (3 populations × 200/40/200 seasons, engine untouched). Two findings await the Architect: home win rate ~55% vs the 53.2±1.5 band everywhere; parity band holds on the test synthetic (SD 3.10) but not on drafted-Madden leagues (SD 2.20).
- Debt inventory v2a: storage dump harness + evidence; envelope law verified statically; Architect's Q4 open item CLOSED; his P0 dump dependency SATISFIED.
- N1 council exhibit outline: drafted, PENDING OWNER REVIEW.
- Scaffold proof: `football-sim-next/` — Svelte5+Vite+TS+Vitest+GitHub Actions+wrangler; check 0 errors, 4/4 tests, build 15.05 KB gzip; browser-verified; framework-separable on purpose.

## What the next session needs
- **Read first:** this §3 in `START-OF-CHAT-ZAI.md`; the Owner's rulings on the w71 package (framework, N1, sync); the Architect's rulings on the Outcome Lab findings.
- **Then:** if framework = decided and Claude's contracts have landed, begin the first-slice port (team select, draft board, roster) INTO the scaffold; if not, continue debt v2b (screen × state matrix batches) — it gates port order.
- **Do not redo:** the w70 UI fixes (all six verified); the envelope-law verification (done, cite it); the Outcome Lab bands discussion (it's in FINDINGS-for-architect.md).
- **Watch for:** the Owner pushing w70 to gh-pages (still w69 live as of this chat); the fresh-repo cutover checklist work (my amendment 2 — not yet drafted, ~1 session).

## Files in this lane
- `deliveries/` documents (style guide, handoffs, advisories)
- `tools/` build scripts, verify suites
- `builds/` non-product pins
- `notes/` prompts, corrections, worklog
- This session's additions live in the w71 zip: `inbox/20261105-*` (intake, strategy answers, debt v2a, N1 outline), `inbox/w71-storage-dump/` (evidence), `colors/tools/outcomelab/` (harness + report + findings), `football-sim-next/` (scaffold), `_agents/zai/START-OF-CHAT-ZAI.md` + this file (updated).
