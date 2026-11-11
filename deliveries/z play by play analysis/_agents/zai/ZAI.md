# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only; no git push (sandbox reads GitHub but has no credentials). Work reaches this branch via the Owner relaying the end-of-chat zip (`tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…`) or `tools/seat-save.mjs`.
- **State:** High Councillor (below the Architect, above advisors; Owner ruling 24 Oct 2026). Architect and builder of Z-post-blue; Executor of the Z-post-blue and 67 Cakepanz lanes.

## Current work
- **This chat (2026-11-11): DESIGN ANSWER, no build.** Answered MUSE's prompt `zai-play-level-question-2026-11-10.md` — should the engine go play-level? Shipped `deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` (~5,000 words + worked appendix).
- **The answer in one line:** build the **Plays Ledger**, not a play-level simulator — drives stay authoritative, plays are staged inside them as an additive audit trail (the box score is the existence proof). The FB/socialism headache and new-role pricing DISSOLVE (exposure measured from personnel); C>OT survives but splits into ability (≈6, measured from plays) vs guard (12–14, from measured slot values) with no gate needed; the translation problem upgrades from fitting constants to authoring mechanisms with measured consequences.
- **New formula proposal (the load-bearing idea):** `price = tier( max(ability, E_src × guard) )` — the Owner's socialism as arithmetic: the guard is weighted by the source role's measured snap exposure. Fixes every row the plain guard breaks (FB>RB 18→2, OLB>ILB 10→6) while keeping C>OT at 12; gate-free, exception-free, pair-tracking-free. Worked 11-row table in Appendix A.
- **Path proposed (5 steps):** 1 snap ledger (no sequencer needed — kills the FB problem first) → 2 play sequencer v0 → 3 personnel+attribution → 4 measured derivation (validate: nflverse snap shares, P-339 center diagnostic, 99 as guide, LOO) → 5 gravity ledger (Owner Q8 + advanced stats P-036).

## What the next session needs
- **Read first:** `deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` (this chat's answer); `_agents/muse/deliveries/questionnaire-flex-derivation-QA-2026-11-10.md` (Owner's law); `_agents/muse/deliveries/derivation-ideas-agreeing-with-owner-2026-11-10.md`.
- **If the Owner responds to the answer:** intake-ledger his lines first (START §2.2), then work. The three Owner questions in §8 of my answer (FB share discovered-vs-tuned · C>OT answers to ladder-vs-hub · ledger in lab-first) are the decision points.
- **Do not redo:** the exposure-guard arithmetic (Appendix A verified); the drive/play split argument (§4 — the box score is the precedent, do not re-derive it).

## Rules that changed / stand
- No gates, no floor, no named exceptions, no pair-tracking (Owner Q&A 2026-11-10). The 99 are a guide, not a target. Beautiful and portable wins. Gravity is NOW (P-335). Snap share may not be intuited — but may be GENERATED (my §2.1 reconciliation; flagged for Owner confirmation).
- Council chain (QUEUE.md on council/muse): work → 3 reviews → Architect builds. Write only `_agents/zai/**` and `inbox/`. Never push.

## Files in this lane
- `deliveries/` — documents (this chat: `ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md`; earlier: style guide, playbook, reweight brief, governance, wisdom, handoff, build report)
- `tools/` — build scripts, verify suites (v8..v13), logo scripts · `builds/` — the two Z-post-blue HTML files (pins in BASELINES.md) · `notes/` — prompts, corrections, worklog
