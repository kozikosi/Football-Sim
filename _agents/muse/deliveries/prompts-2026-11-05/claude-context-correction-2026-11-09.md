# Claude — what changed since the D prompt (read first)

Read `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This corrects your last message (you are waiting to "start with the weights"). Do NOT start with the weights as you described. Four facts you do not have yet:

1. **The WILL/C bump moves D by 0.** Pickle verified: D comes from the engine's slope (`slotWins20/20`), and `slotWins20` does not use `SLOTS[].weight`. "Recompute D after the bump" is a no-op. Your plan to recompute D after applying WILL/C will change nothing.
2. **SLOTS[].weight leaves the loop (Owner decision).** The draft board, lineup, and user-facing values come from the ENGINE (`slotWins20`), not `SLOTS[].weight`. The WILL/C "bump" means changing the ENGINE MATH so `slotWins20` for WILL and C goes up (P-318) — NOT changing `SLOTS[].weight`. Do not apply WILL/C to `SLOTS[].weight`.
3. **slotWins20 is overwritten (Owner decision, P-321).** The 70→90 secant is replaced by a per-position local slope at ±5 (center = position's pool average; everything else at position-specific averages). Four council seats + the MUSE seat verified independently: the spread does not matter (adopt ±5); the material change is the baseline (WR2 +40, WR3 +25, RB2 −25, TE2 −25); D does not move. Use the embedded PLAYERS pool (CSV vs embedded give identical slopes).
4. **The flex table is locked.** The Owner's 97-rule table (your D prompt) is final. Build it as specified. Do not recompute D.

## Your jobs, in order
1. Flex rebuild (`claude-flex-rebuild-2026-11-09.md`) — build flex.json + flex.ts from the locked table.
2. Guard passes (`claude-guard-passes-2026-11-09.md`).
3. Adopt the new measurement (`claude-adopt-measurement-2026-11-09.md`) — after the flex rebuild.

## Innovate
Within each job: if it opens a better way to express value or structure the engine, note it as an `IDEA:`. Do not build it there.
