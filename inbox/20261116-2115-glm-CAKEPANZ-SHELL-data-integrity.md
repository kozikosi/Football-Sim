SPEAKER: glm | ROLE: council | TASK: Part 9 — data integrity: can any number be produced without the engine | DATE: 2026-11-16T21:15Z
FOR: R-13 (CAKEPANZ-SHELL round)

**What this unblocks:** a receipted clean bill on the "no engine math in the shell" property for the latest Cakepanz state (s5), so Z.ai's re-pin and seam work has no hidden duplicated math to migrate — plus two named decisions for the Owner.

**Scope:** `_agents/inkling/deliveries/67-cakepanz-s5` (the state the prompt names as latest), `src/lib/**` + `src/data/**`, audited from a `git archive` extract. Read-only.

## Clean bills (VERIFIED, greps pasted in the session log)

1. **No flex math in the app.** `grep -rni flex src/lib` → only CSS `display:flex` lines, one comment, and `BoardRow.svelte:29` rendering `{f.flex}` — the string the engine VM composes (`view/draftBoard.ts:46`: `flex: x.pen === 0 ? '' : \`-${x.pen} flex\``). The engine's `fit` (flex.ts) is imported and called; no numeric flex table exists outside `src/engine/`.
2. **No ratings generated or corrected in the app.** The three CSVs in `src/data/` are read only by engine modules (`players.ts`, `playerids.ts`, per grep — zero app-code readers). No rating arithmetic anywhere in `src/lib`.
3. **The displayed numbers are engine-formatted strings.** `BoardRowVM` emits `wins: signed(showDecimal('wins', w))` (`view/draftBoard.ts:50`); `showDecimal` lives in the engine's `display.ts:22`. The shell prints `{r.ovr} {r.wins} {r.priority}` verbatim (`BoardRow.svelte:17-19`). `grep toFixed src/lib` → zero stat hits (the only `Math.round` is brag-card color blending, `bragCard.ts:21`). The one-decimal/integers rule is enforced engine-side — the right side.
4. **`valuation.ts` is pure mode state** — no numbers, `MODE_LABEL` travels with the numbers, the switch locks mid-draft. Exactly the label-travels-with-number property.

## Findings (2 — both decisions, not defects I can resolve)

- **F-9a · Mode label wording.** `valuation.ts:11` labels the measured default **"Model Value"**; the v4-1 ground truth calls it **"Engine Value"**. One-string rename — Owner rules which word ships.
- **F-9b · `.ub` absent from the whole shell.** `grep -rn '\.ub\b' index.html src` → empty. The "user's team in blue" law is not wired in slices 1–5. Scope UNKNOWN (the team-IS-the-palette `[data-zpbteam]` remap may make it redundant, or the law wiring may belong to a later slice) — flagged for Z.ai's states sweep; Owner rules whether `.ub` is required in the shell.

## Labels

VERIFIED: all four clean bills and both findings (grep + file:line receipts above, this machine, 2026-11-16, on the s5 extract). UNKNOWN: the s5 scope intent for `.ub`. REPORTED: nothing — everything above I ran myself.

— glm · 2026-11-16T21:15Z · read-only on every other seat's branch.
