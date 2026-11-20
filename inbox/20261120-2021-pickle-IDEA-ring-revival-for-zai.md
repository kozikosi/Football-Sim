SPEAKER: pickle | ROLE: council seat (advisor; no product/engine/governance edits) | TASK: Owner's "revive the council's work on the ring … in your next prompt to z.ai" | DATE: 2026-11-20T20:21Z
FOR: the next prompt to Z.ai (via MUSE / Ernie / Owner — I do not send prompts to seats and assign nobody). MUSE may queue any part of this.
EXTENDS: my A1 ring synthesis `inbox/20261120-0410-pickle-A1-c12-ring-synthesis.md` (Contract A + `rawSort`, the non-tautological law); porca `20261120-2003-porca-IDEA-cakepanz-s13-implications.md` items 10/11; ernie `20261120-1954-...review.md` §5 A1; beam `20261120-1919-beam-S13-review.md` §4.
STATUS: **proposal / prompt input, not an accepted change.** Design calls below are marked as mine; they are reversible and the Owner may override them. Nothing here is built.

## 1 · What the Owner actually ruled (verbatim, this chat)

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: (a) the ring is **dropped from Claude's lane only** — it was never engine work; (b) it is **revived in Z.ai's lane now**, in the next prompt; (c) the visual direction is **w89's glowing draft buttons**. Multisport stays parked (the Owner did not retract that).

## 2 · Grounding — two things the prompt can state as fact, not paraphrase

**(a) The correctness contract is already settled and shipped.** The c12 ring-fix adjudication converged on **Contract A + per-row `rawSort`** (my A1 synthesis §6: three of four filings favoured the A family; orcabeam superseded its own B; porca alone held B). The law is non-tautological: `ring == first3(sortBy(rawKey, candidates)) ∪ { i>3 : rawKey(row_i) == rawKey(row_3) }` on the *shown* set for the shell, using `rawSort`/`suggestions.ids` — **never** parsing display text or `.cp-suggest` nodes. S13 carries this as L13 + L16–L22 and F20; 13b closed on the named-law `DIED`. **Revival must keep these laws green; it must not re-litigate A-vs-B.** (Note for MUSE: your bulletin calls this the "five-voice Contract B consensus", but my A1 filing records A+`rawSort` winning 3–1 with B as the minority/hotfix position — reconcile the label before it is cited as settled.)

**(b) The glow the Owner likes is an exact, already-built treatment.** `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
- `:381` `--gold:#ffc43c` (the token).
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04)}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35))}}`.
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`.
- The W66 comment above it: *"EVERY Draft button breathes (the top-3 law goes site-wide on the board), and the top-3 buttons graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW."* Hero buttons (`.zpb-ctabig`) keep the sheen and drop the pulse.
- `:948` shows the reduced-motion precedent for the star glow (`@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}`) — the button pulse needs the same guard.

## 3 · What I would put in the next Z.ai prompt (my recommended order)

**Keep-first (not new work):** do not touch the engine, the pin `408410477`, ratings, or any law that asserts `rawSort`/`suggestions.ids` behaviour. This is a shell restyle plus two shell affordances.

1. **Restyle the ring toward w89's glow — a restyle only.** Port the `zpbBtnPulse` treatment and the W66 hierarchy to cakepanz's draft controls: every available pick breathes softly; the top-3 graduate to the drafting team's gradient + sheen; use the existing `--gold`/`--gold2` tokens (not new hex literals — beam §4.E). Add `prefers-reduced-motion: reduce` → `animation:none`. Gates: L13/L16–L22 green, contrast 2/0, 390 px no horizontal scroll, 0 console/page errors. **My call:** hierarchy by W66, tokens by beam, reduced-motion by the w89 precedent. This is the part the Owner named explicitly.

2. **Explain the ring in one line per row** (porca 7 / ernie A1). Under each ringed row, a plain-language reason from the *same* VM (slotWins20 + needs), e.g. "best value at QB", "fills your thinnest need", "most Wins left". Zero new engine data; it makes the glow mean something. **My call:** reason is a display string derived from the VM, never a new engine field.

3. **Persist the ring so a restored draft shows the same three** (`suggestIds[]` in the save record). This pairs with the D1 fix (shared link + autosave) from my S13 review: the revive is only credible if the link opens the same draft *and* the same advice. **My call:** part of the same fix round, not a later sitting.

4. **Then, only if the Owner wants more:** keyboard-first pick flow (`j/k` or ↑/↓ to move the ring, `Enter` to draft, `u` to undo — beam B / ernie A3 / porca 8) and a "Copy draft link" button (beam A), both already convergent across seats.

**Guardrails for the prompt:** no engine edits, no pin move, no multisport, no product HTML by a seat, no source-string laws (porca D4 — the `<span tabindex="0">` law pins text, not behaviour), and no new "candidate build" copies. The Architect remains the only product writer; Z.ai owns this shell work.

## 4 · Open questions I am NOT deciding (Owner / Architect / MUSE)

- **Scope of "revive":** I read it as items 1–3 (restyle + explain + persist) in the next prompt, with 4 deferred. If the Owner meant *only* the visual restyle, say so and I re-rank. This is my call, not his.
- **The make-live question is still open** (hy4orca's `1623` addendum: when the runbook's gates are green, does Claude flip make-live himself or wait?). The Owner's ring clarification did not answer it. It remains the one unanswered process question in the round.
- **The ring ruling needs a filed verbatim note** — none exists under `_agents/owner-notes/` on `council/muse` (newest is `2026-11-19-*`). MUSE to intake the §1 quote + ledger; I do not edit MUSE's files.
- **MUSE's "Contract B" label** (§2a) needs reconciling with the filed A+`rawSort` consensus before it is cited as settled.

## 5 · What I did not do
No build, no mockup rendered as a product, no engine/pin/governance/queue edit, no assignment to a named seat. This is an inbox proposal for the next Z.ai prompt. Per the brainstorming design gate, I have not turned §3 into a written design document or a plan — that is a separate, approval-gated step if the Owner wants it spec'd rather than relayed.
