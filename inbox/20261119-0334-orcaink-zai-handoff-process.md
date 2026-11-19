SPEAKER: orcaink | ROLE: Council Advisor | TASK: record the handoff process to z.ai — how the Architect chose to transfer work, the rules riding it, and what remains open | DATE: 2026-11-19T03:34Z
FOR: the Owner · the Architect · Z.ai · the council (informational record; binding only when the Owner rules and MUSE puts it in the docs)

Sources (both read this sitting): the Owner's directive as filed by inkling — `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md` — and the Architect's reply — `origin/architect/engine-and-seats` commit `06d89724` (`claude/absorb-work-answer-2026-11-19.md` + `claude/NOW.md`, both new in that commit). Labels: VERIFIED (I ran/byte-checked this sitting) · REPORTED (seats/Architect) · INFERRED (my reasoning) · UNKNOWN (not checked — stated).

## 1. Why this handoff exists
The Owner directed (2026-11-19): the Architect is much more limited by token usage; a plan is needed for Z.ai to absorb more of the Architect's remaining work. The Architect's answer carries the load: he answers the tier question, sketches Ask 2's concrete inventory, and rejects the tier model on Ask 3 in favour of dividing by interface once the view-model contract is frozen. This document is the record of that process — every rule below either cites him or names its origin.

## 2. The four tiers, after his ruling (REPORTED, his file)
- **Tier 1 (shell ops, Z.ai takes, no protocol change) — YES, all of it.** Includes: per-commit fresh-clone receipts (`npm ci` + full tests + tsc + build + pin-watch, filed as receipts), manifest/CHECKSUMS regeneration and `datacheck.py`, item-5/item-6 RUNS (with seeds + fixed N, output JSON; not the reading), cited-check runner once specced.
- **Tier 2 (exact patches, Z.ai takes, Architect diff review per item) — YES, under diff review.** Named: `cite-check.mjs` from a spec; re-pin *verification* (re-pin itself stays Tier 4); the gold2/text split once contrast is ruled; the `go()`/router fork if ruled; `simpleRows` if ruled. P-317 he did himself (save-format-adjacent — the refusal case).
- **Tier 3 (build-under-spec, UI only) — YES, once the framework is settled or the work is framework-neutral.** Z.ai builds, council verifies, Architect reads the diff — never pushes to his branch.
- **Tier 4 — NEVER delegates:** engine semantics, λ, protected constants/re-pins, the unrelated-histories merge, final acceptance, every Owner-gated call.
- **Honest capacity (his words):** UNKNOWN; best guess 3 short engine sittings a week.

## 3. The path fence (the one structural lesson of P-317 — VERIFIED this sitting)
P-317 was labelled "small, Tier 2, store wiring". It was not: the saved record never stored an order; `restoreDraft` rebuilds the default snake; a bare `order` passed to `newDraft` would work live and throw `out of order` on every reload — so the fix touched `appstate.ts`, `saves.ts`, `app/store.ts` and the tests. **Task-type tiers cannot see persistence; the risk follows file paths, not task labels.** The Architect's proposed fence: a check that FAILS if a Z.ai branch touches fenced paths — suggested fenced set: `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `app/saves.ts`, `data/**`, `tools/mathlab/**`. Status: **INFERRED-adoptable; not yet ratified anywhere** — needs Owner word + MUSE integration into the checks, or CI-side-check in the colors tree (Architect's tree, his engine). Until ratified: no Z.ai branch touches fenced paths; that is the seat rule *by practice today*, not by automation.

## 4. The interface split (what replaces Tier 3 on the UI — his "what I would do instead", MEDIUM confidence)
Divide by interface, not task type: **Z.ai owns the whole UI tree against a frozen view-model contract the Architect publishes** (TypeScript types + contract tests + migration notes). The Architect reviews *contract changes*, not UI diffs. Costs he named: the API must be frozen first; cutover integration needs one joint pass. **Prerequisite:** the framework decision, or a framework-neutral contract. This is the biggest review-cost reduction available to him and also the biggest ask of Z.ai; neither has been scheduled. INFERRED: the contract freeze is the critical-path item for any UI handoff beyond Tier 1.

## 5. The review protocol that rides every Tier-2/3 output (his Ask 2/3, verbatim intent)
- **Receipt law (global, applies to everyone now):** a receipt = working directory + exact command + output tail; fresh-clone when verifying bytes. (Already practiced: this sitting's `_agents/orcaink/receipts/g8-manifest-fresh-extract-receipt-2026-11-19.txt`.)
- **Patch format (his ask):** diff stat + named test names + a fenced-path report; Architect reads the cheap summary first, then the diff. **Diff cap:** ~1 file or ~150 lines per patch.
- **Rollback rule (his ask):** seams out; revert and re-hand if a review fails — one bad patch does not poison the branch.
- **Review is not free:** his review time is the budget; Tier-1 receipts that nobody reads turn into "green means tested again" — the named CI-honesty failure. Seats reading receipts is the counter (the council's current practice).
- **Specs:** ≥ one page per item (cite-check.mjs, the S4 async store); no spec, no handoff — verbal direction doesn't travel.

## 6. This week / next two (his inventory, INFERRED-capacity, not a schedule)
- **This week (Tier 1):** per-commit fresh-clone receipts; manifest/CHECKSUMS regeneration + `datacheck.py`; **item-5 and item-6 RUNS, not reading** — the Architect must hand the exact command, seeds and output path first (his ~half hour).
- **Next two weeks (Tier 1/2):** `cite-check.mjs` from a spec; a merge dry-run that *only lists conflicts* (he runs, Architect decides); the 390px/desktop smoke once the UI home lands; S4 async store as Tier 3 with an interface (INFERRED; he re-reads NOW first).
- **Kept regardless:** engine semantics; the packs; λ; protected constants and re-pins; the save envelope and sequence; the cutover merge; final acceptance; Owner-gated calls.
- **Reflex work he names to stop doing:** re-running the full suite after a tiny edit; hand-writing report tables; re-reading own reports to re-verify (that role stays with the seats).

## 7. How the council rides it (what registrations exist vs what doesn't)
- **CI honesty stands:** `ci.yml`: tsc and tests are `continue-on-error`; CI green = build gate + pin-watch self-test only; tests/tsc evidence = the command and its output — the Architect's standing note. Never reads as pass evidence.
- **The seats already verify:** 8.1's receipt-defect chain closed across seats; today, fresh-extract gate-manifest PASS receipt filed by this seat; engine 394/406 and battery 33/33 re-run today; items-5/6 review of the *runs* is a legitimate council job once the JSON lands.
- **Nothing binds until it's in the queue (`_agents/QUEUE.md`), MUSE's call.** Proposals: (1) a P2 item for the path-fence check; (2) a P3 for the view-model contract freeze → UI handoff pipeline; (3) seat agreements to countersign per-commit receipts before they enter the ledger. `PRIORITY+:` lines in the relevant bulletin — as of filing, neither exists; **UNKNOWN whether MUSE will add them; this is the record seats cite until then.**

## 8. Explicit non-goals (his words, unchanged)
No new product direction rides on this; no public deployment; no gh-pages changes (w89 live until 76 Pancakes ships, Owner 2026-11-19); no protected-constant movement; no Tier-3 work without a written brief; framework stays **parked** (Vue-vs-Svelte; R-13 at cutover decides — seats' votes logged: this seat 65/35 Svelte, GPT 70/30, Inkling 70/30, Ernie ~60/40, Architect LOW-confidence Vue). Multisport is post-v1.1.

## 9. Status and open items (as of filing)
- **Ratified by the Owner:** the directive itself (2026-11-19); the sitting's boot and push; P-317's push (`06d89724` — verified this sitting).
- **Not ratified / open:** the path fence (Owner word + CI/colors integration); the view-model contract freeze + who writes it; whether Z.ai's Tier-1 per-commit receipts are queued; item-5/item-6 handoff mechanics (command/seeds/output path); MUSE queue registrations for items 1-3 of §7.
- **This document is not policy:** it records the process; AGENTS.md/CLAUDE.md wording belongs to MUSE; tier boundaries stand only as far as the Architect's word and the Owner's rulings already landed.
