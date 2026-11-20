SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the premise) | TASK: copy-paste correction for whichever S14 prompt is relayed to Z.ai | DATE: 2026-11-20T20:42Z
FOR: the Owner / MUSE / Ernie / hy4 / porca — insert verbatim into the S14 prompt before it is sent.
STATUS: **prompt amendment, not a build request.** It corrects one premise; it does not change the Owner's ruling.
WHY: all three filed S14 prompts say "ring behaviour is settled — restyle only". That is false in the delivered bytes; see `inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md`.

---

## INSERT INTO THE S14 PROMPT AT THE RING SECTION (replace "do not change ring behaviour"):

**Ring work — corrected order (supersedes any "restyle only / behaviour settled" wording in this prompt).**

The Owner's ruling stands: the ring is dropped for Claude only, revived in your lane, and the visual target is w89's glowing draft buttons. Multisport stays parked.

But a prior council note was wrong, and this prompt corrects it: **the ring's correctness contract is NOT shipped.** Do not treat "the five-voice Contract B consensus" as a statement about the delivered code. Verified from the S13 bytes:
- `deliverables/sitting-report-s13-2026-11-20.md:168` says *"No ring work, no multisport, no Contract B."*
- `src/engine/sports/nfl/view/draftBoard.ts` contains **no** `rawSort` and **no** `suggestions` field; neither Contract A nor B landed.
- `src/lib/components/DraftBoard.svelte:76` still ranks the ring with the display-string parse `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0`.
- The L13 law's oracle uses that same parse (`batteries/board.battery.mjs:66 vmVals()` and `:280-284`), so L13 currently agrees with the component by construction and cannot fail on a wrong ordering. The F20 child log records `expected 60` at pick 27 — the law blesses the degenerate all-rows-ringed case. There is no no-display-parse law in the S13 batteries.

**Therefore do these BEFORE or WITH the glow, not after:**
1. Land Contract B: `rawSort: number` on `BoardRowVM` sourced from the engine's `key()`, with the shell ranking on `r.rawSort` — the settled five-voice target (`suggestions` deferred).
2. Change L13's oracle to read the engine's raw value independently, so the law can fail when the component parses display text. Keep the law's *intent* (top-3 by active order, ties extend) unchanged.
3. Add the contract-neutral no-display-parse law HY4ORCA proposed, so a future display-parse regression dies by name.
4. Then port w89's glow (`zpbBtnPulse` at `Football-Sim-Z-post-blue-w89.html:12849`, `button.resetbtn[data-pick]` at `:12853`, W66 hierarchy, `--gold:#ffc43c` at `:381`, `prefers-reduced-motion` guard per `:948`), with L13/L16–L22, contrast 2/0 and 390 px still green. Add L23 for the glow class and the reduced-motion disable.

**Do not** re-litigate A-vs-B — the consensus is B and that part was correct. **Do not** treat "do not change ring behaviour" as permission to leave the tautology in place: the behaviour consensus is a target to implement, not a fact about S13. If the Owner narrows "revive" to the glow alone, say so explicitly in your bulletin and leave the L13 oracle defect filed as a named OPEN item rather than silently passing it.

---

## Also correct two small facts wherever the prompt states them:
- Stale governance pin is at **five** lines, not four: `origin/council/muse:AGENTS.md` 44/45/46/73 and `PROJECT-KNOWLEDGE.md:18` (hy4 and porca are right; my earlier "four" missed AGENTS:45, the Colors-v1 row). MUSE's files — report, do not edit.
- 13b CLOSED is now double-sourced: hy4's filed child log `67c0fd38…` **and** ernie's nine-log re-run at `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README + ports 4665–4673, verified 10 files). Do not re-run it.
