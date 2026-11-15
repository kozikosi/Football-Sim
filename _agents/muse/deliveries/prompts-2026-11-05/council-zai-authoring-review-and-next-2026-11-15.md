# Council prompt — Review Z.ai's authoring sitting + decide what's next (framework comparison)

**Revision 1 — 2026-11-15. For the council. KG sends this. Do not send it yourself.**

## Context

Z.ai's authoring sitting (Rev 5) is done and published — verdict: **Vue 3 + Vite, narrow, 62% confidence**. Two design reviews (OR, Glyph) answered the beauty question but not the experiment-design questions. Your job: review Z.ai's sitting, answer the design questions still open, and say what happens next.

## Deliverable

File under `inbox/<UTC>-<seat>-zai-authoring-review.md`, **FOR: P-345** (the framework comparison). Push after every finished file. Answer each question in the format given — one decision per question, then one line of why.

## Questions

1. **Z.ai's verdict — do you agree?** The package (see reference) picks Vue narrow, 62%, on row 9 (store maintainability: the compiler-forced getter-wrapper idiom) plus tie-breaks, against Svelte's checker-precision rows. Is the pick supported? Is row 9 the right DECIDES row, or is another row the real separator? *Format: agree/disagree + one line why; name the one row you would challenge; does the pick hold?*
2. **Settle rule — which candidate is PRIMARY?** (Still open from Rev 2.) The candidates: Glyph's correction-effort composite, Ernie's paired variance-relative rule, Inkling's live time-to-green rule, Beam's repair-cycles rule, OR's repair-cycles + wall-clock rule. Does Z.ai's pick hold under your primary, or would a different rule change the pick? *Format: name your primary rule + one line why; does Vue still win under it?*
3. **Fresh-start experiments — do E0–E4 still proceed?** Z.ai's sitting ran on the four-slice arms (which he built, so familiarity affects his numbers). The fresh-start experiments (E0 static audit + Cardboard Ringers, E1 authoring sitting, E2 maintenance, E3 tool audit, E4 survey) run in the clean standalone repos. Does the four-slice sitting supersede them, or do they still add value? *Format: proceed / superseded / proceed-with-changes + one line why.*
4. **Slice-done proposal — ratify, amend, or reject?** Z.ai proposed seven gates of "done" for a slice (probe before measurement, numeric cross-arm fidelity, zero console errors on flagged file://, 390px clean, both typecheckers clean, canon purity + workaround audit, receipts before the reply). KG ruled "done" is agreed by the council. *Format: ratify / amend (name the gate to change) / reject + one line why.*
5. **Week-stepper + second agent — go?** Z.ai asks for the Owner's go on the week-stepper sitting (the store-heavy tie-breaker for row 9) and a second agent to run his protocol (`measurements/PROTOCOL-FOR-A-SECOND-AGENT.md`, ready). Should the week-stepper go ahead, and who runs the second-agent protocol? *Format: go / no-go for the week-stepper + one line why; name a seat or "any seat" for the protocol.*
6. **Platform — confirm the synthesis or side with VL?** (Still open from Rev 2.) Five of six seats converged on Sim Lab v0 with the receipt diff as its core and DIALS content as read-only presets, DIALS last. VL is the outlier (DIALS first). *Format: confirm / VL + one line why; name the one constraint that keeps it honest.*
7. **verified-as-of.json — adopt it?** (Still open from Rev 2.) Glyph proposed a machine-readable claim→ref/sha/command in every future prompt and in CI. Z.ai's package carries two stale premises (w85 throughout; a degated-tests note that describes the pre-rewrite state) — is that the evidence for it, or against it? *Format: adopt / don't adopt + one line why; what falsifies it?*
8. **Innovations — queue them?** Z.ai proposed two: the Season Book (a finished season as a collectible single HTML — every playoff game's feed + the champion's roster as a card grid) and the Flip Bench (authoring cost measured by the second arm's handicap, not its clock). Review the mechanism + falsifiers for each. *Format: queue / don't queue + one line why, for each.*

Innovate freely — if you see a better experiment, a better settle rule, or a falsifier that would kill your own preference, propose it. Flag disagreements, don't smooth them away.

## Reference — what you're reviewing

**Z.ai's authoring sitting (Rev 5).** One delivery, published byte-identical on four branches (inkling, ernie, beam, vl — VL's under `zai-pass-through/`; MANIFEST.txt and CHECKSUMS.txt match across all four, so there is one version, not four). Path: `_agents/<seat>/deliveries/zai-sitting-2026-11-15-authoring/`. Key files: `README.md` (the verdict), `AUTHORING-COST.md` (a measured tie, one small asymmetry against Svelte: the file-system idiom + the getter-wrapper idiom; svelte-check's a11y audit is the counterpoint), `CATEGORY-WINNERS.md` (24 categories, a winner in every one, then the DECIDES/TIE-BREAKS/NOISE weighting), `measurements/AGENTIC-ERGONOMICS-VERDICT.txt` (honest verdicts per arm), `SLICE-DONE-PROPOSAL.md` (seven gates), `INNOVATION.md` (Season Book + Flip Bench), `measurements/PROTOCOL-FOR-A-SECOND-AGENT.md` (ready for a second agent). The sitting ran on the four-slice arms at pin `d3bd81d2` (slice 5 player cards, season standings, arc panels, week-save hydration). The cold-load replication FLIPPED MUSE's direction (Svelte +32 ms FCP / −10 ms mounted — direction flips session-to-session, all inside the per-trial spread) — boot is noise, confirmed. The vapor falsifier ran cleanly and did NOT fire. The training-data mix is stated as an unseparable confound (the sitting says so plainly).

**Three flags in the package (check these, don't repeat them):**
- **w85 throughout** (README, INNOVATION.md "w85 single-file discipline", SLICE-DONE-PROPOSAL "The w85 bar"). It traces to the sent Rev 5 prompt's Bounds ("live site w85") — the stale premise came from the prompt, not from Z.ai. Live site is w89.
- **Bundle figures conflict.** Z.ai cites 10,530 B (season surface), 10,969 B (four-slice), 10.7 kB (vapor), ~10.5 KB (README). The shipped `two-arm-bundles.txt` receipt says 11,569 B (JS-only gz). Different asset sets/surfaces/pins — reconcile which is canonical before citing any of them.
- **Degated-tests note is stale.** Z.ai's `filings/degated-tests-note.md` says the two de-gated tests fail (with reasons). But `5a3bb75e` (which rewrote both as structural assertions) IS an ancestor of pin `d3bd81d2` — verified by merge-base — so at the pin Z.ai consumed, the tests were already rewritten. The note describes the pre-rewrite state. (Suite 351/351 at `9acf1992`.)

**Design reviews (OR, Glyph) — what they covered and what they didn't.** Both verified the two fresh-start scaffolds are ground zero (ZERO w89 beauty tokens) and recommend a shared design-token layer first (OR: `:root` custom properties + bubble/shine component + championship branding; Glyph: token layer + app shell + motion/accessibility + Vue/Svelte-specific guidance + a 5-criterion "visually on-track" definition). Both answer Q5 (beauty) thoroughly. **Neither answers Q1–Q4 or Q6–Q8** (slices, settle rule, E0, E4 battery, methodology, platform, verified-as-of.json) — those are still open, and they are Q2/Q3/Q6/Q7 in this prompt.

**Open items (not for this prompt to decide, but know they exist):** OT clock defect is PRESENT at pin `d3bd81d2` (Z.ai's test expectedly fails; the Architect fixes it, KG ruled "fix"). Vanilla file:// boot FAILS in both arms (tie — both fail; vite-level fix, Route B/C, filed for the Architect; the Owner question — vanilla file:// for Cakepanz or only for the final product — is still unanswered). P-317 waits on Claude's store change. Devtools row is evidence NONE this sitting (row 7 in CATEGORY-WINNERS) — unknown, excluded from the decision.

## Verified-as-of (load-bearing premises only, stated positively)

- Live site is **w89** (verified by fetch 2026-11-15; `origin/gh-pages` tip `3e69567c`).
- Z.ai's authoring sitting verdict is **Vue narrow, 62% confidence** (package Rev 5, byte-identical on inkling/ernie/beam/vl).
- The two de-gated tests are **closed** (rewritten as structural assertions at `5a3bb75e`, an ancestor of pin `d3bd81d2`; suite 351/351 at `9acf1992`).
- Bundle delta is **11,569 B** JS-only gz per the shipped `two-arm-bundles.txt` receipt; Z.ai's package cites 10,530 B (season) and 10,969 B (four-slice) — reconcile before citing.
- Cakepanz's engine snapshot is **re-pinned to `d3bd81d2`** (99-rule flex, QB→FS 12) at gh-pages `66096fb1`.
- OT clock defect is **present at pin `d3bd81d2`** (Z.ai's test expectedly fails; Architect's fix).
- The four-slice arms **stay in the Football-Sim repo as evidence**; do not port them. The fresh-start repos are `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte`.

## Revision ledger

- **Rev 1 (2026-11-15):** new prompt (not a revision of the fresh-start prompt). Written after the council prompt Rev 2 was sent and Z.ai's authoring sitting (Rev 5) was published. Asks the council to review the sitting, answer the design questions Rev 2 left open (Q2 settle rule, Q3 E0, Q6 methodology, Q7 platform, Q8 verified-as-of.json), decide whether the fresh-start experiments still proceed, ratify the slice-done proposal, rule on the week-stepper + second agent, and review the two innovations. Applies the prompt-efficiency learnings from MUSE's self-improvement notes (items 21–30): questions first, deliverable up front, one decision per question, single source of truth, short verified-as-of block, no standalone Innovation section.
