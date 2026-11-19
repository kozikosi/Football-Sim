# VL review of ernie's w89 team-takeover finding (P-366)

**Source:** `/Users/kosi/Desktop/wt/ernie/_agents/ernie/inbox/20261117-2255-ernie-w89-team-takeover-unwired.md`
**Verified against:** `cakepanz-4/src/lib/assets/tokens-w89.css` and `src/lib/port/tokens.ts` at cakepanz-8.1 bytes (pushed to `council/vl`)
**FOR:** P-366
**DATE:** 2026-11-19

**Verdict: REVIEWED improved** — ernie's end-to-end trace (table → remap → DOM → CSS rule) is correct as a diagnostic method. His specific finding — "`[data-zpbteam]` blocks are empty, takeover 0% delivered" — is **correct for cakepanz-5 / deployed w89 but already fixed in cakepanz-8.1**. The review should be marked "stale-for-8.1, open-for-cakepanz-5-and-w89" rather than carried as a current defect against the 8.1 bytes.

---

## Verification I ran (commands + output)

| # | Check | ernie's claim | My result (cakepanz-8.1) | Match? |
|---|-------|--------------|--------------------------|--------|
| 1 | `grep -rn "zpb-t1" src/` | `tokens.ts:43` writes `--zpb-t1/2/3` | `tokens.ts:170-172` writes `--zpb-t1/2/3` + `_L`/`_D` mode variants | ✓ (line numbers moved, mechanism intact) |
| 2 | `grep -rn "var(--zpb" src/` | **0 hits** (nothing reads the stops) | **10 hits** in `tokens-w89.css:138-166` — `--gold2/--goldm/--gold3`/`--rosehair`/`--hairline`/`--panel2` all read `var(--zpb-t1L|2L|3L|1D|2D|3D)` | ✗ — finding is **fixed** in 8.1 |
| 3 | `[data-zpbteam]` CSS blocks | 3 empty blocks (`tokens-w89.css:104-112`) | **Filled** at lines 136-167: light, system-dark, dark blocks all remap golds/rosehair/hairline/panel2 from `var(--zpb-t*)` | ✗ — finding is **fixed** in 8.1 |
| 4 | `teamRemap()` exists | `tokens.ts:41-44` | Present: `return { attr: teamName, vars: { '--zpb-t1': c1, ... } }` | ✓ |
| 5 | `applyTeam()` sets DOM | `tokensApply.ts:13-14` | Sets `document.documentElement.dataset.zpbteam = teamName` + the 3 custom properties | ✓ |

## End-to-end trace (ernie's table, re-verified)

| stage | exists? | where | 8.1 status |
|-------|---------|-------|------------|
| 32-team × 3-stop table | yes | `zpb-team-colors.json` | ✓ |
| pure remap (`teamRemap()`) | yes | `tokens.ts:170-172` | ✓ |
| DOM half (attribute + properties) | yes | `tokensApply.ts` | ✓ |
| CSS rule reading attribute/properties | **no** (ernie) | **yes** (8.1) | `tokens-w89.css:136-167` — **fixed** |

## What changed between cakepanz-5 and cakepanz-8.1

The cakepanz-8.1 tree fills all three `[data-zpbteam]` blocks (light, system-dark, dark), remapping:
- `--gold2/--goldm/--gold3` ← `var(--zpb-t1L/2L/3L)` (light) or `var(--zpb-t1D/2D/3D)` (dark)
- `--rosehair` ← color-mix of team accent toward mode bg
- `--hairline` ← `--rosehair`
- `--panel2` ← ≤3% whisper of team chip into panel

The block comment at `tokens-w89.css:124-135` documents this as "WIRED this sitting." `--zcream`, `--bg`, `--panel`, `--text` are deliberately NOT remapped (Owner's laws: neutral + contrast table).

## Recommendation

**Mark ernie's finding as resolved for cakepanz-8.1.** The team takeover is wired; picking a team now remaps the gold/rosehair/hairline/panel2 tokens. The trace ernie built is the right verification method and should be reused for the deployed w89 (which still has empty blocks per his grep).

For w89/deployed: fill `tokens-w89.css:104-112` (or the equivalent w89 locations) with the same remap recipe. ernie's recommended ~30 lines of CSS (`--gold2/--goldm/--gold3`, `--hairline`/`--rosehair`, `--panel2`) is the correct shape.

**Do NOT land ernie's "0% delivered" verdict against cakepanz-8.1 bytes** — it contradicts the filled blocks at `tokens-w89.css:136-167`.

---

**VERDICT: improved.** ernie's method is right; his specific "empty blocks" finding is stale against 8.1 bytes (fixed this sitting) but valid against cakepanz-5 and deployed w89. The review transfers cleanly: apply the same remap to w89, verify `grep -c "var(--zpb" src/` returns >0.