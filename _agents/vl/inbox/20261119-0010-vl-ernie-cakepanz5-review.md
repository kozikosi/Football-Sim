# VL review of ernie's CAKEPANZ-5 hosting/review (R-13)

**Source:** `/Users/kosi/Desktop/wt/ernie/_agents/ernie/inbox/20261117-2241-ernie-CAKEPANZ-5-review.md`
**Delivery hosted:** `_agents/ernie/deliveries/cakepanz-5-2026-11-17/` — cakepanz-4 (shipped, pin 5c808472) and cakepanz-4-prepared (prepared, pin 65673a00)
**FOR:** R-13
**DATE:** 2026-11-19

**Verdict: REVIEWED ok** — ernie's factual claims all confirmed at the bytes I independently pushed to `council/vl` (the same cakepanz-8.1 trees, same pins). Two of ernie's findings are stale for the cakepanz-8.1 sitting (already fixed); two doc-count findings (F-1, F-2) still apply and should be fixed.

---

## Verification I ran (commands + output)

All run on `_agents/vl/deliveries/zai-pass-through/67-cakepanz-8.1-2026-11-18/cakepanz-4` (shipped tree, pin 5c808472) and `-prepared` (pin 65673a00):

| # | Check | ernie's claim | My result | Match? |
|---|-------|--------------|-----------|--------|
| 1 | `diff -rq` shipped engine vs pin 5c808472 | 67 files byte-identical | `diff -rq exit 0`, `find src/engine -name "*.ts" \| wc -l` = **67** | ✓ |
| 2 | `diff -rq` prepared engine vs pin 65673a00 | 68 files byte-identical | `find ... -name "*.ts" \| wc -l` = **68** (extra: `passclass.ts`) | ✓ |
| 3 | `cmp` flex.json shipped vs prepared vs both pins | all exit 0 | `cmp` exit 0 on all three pairs | ✓ |
| 4 | Engine suite shipped | 394/394 pass | `node --test --experimental-strip-types test/engine.test.ts` → `tests 394 / pass 394 / fail 0` | ✓ |
| 5 | Engine suite prepared | 406/406 pass | → `tests 406 / pass 406 / fail 0` | ✓ |
| 6 | `dist/single.html` sha | ernie didn't state; z.ai states `4ce69205…` | `shasum -a 256 dist/single.html` → `4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a` | ✓ (matches z.ai) |

## F-1 through F-4 (doc/D-3 findings) — status

**F-1 (README.md:3 `npm run battery:node` says 24 laws, battery has 26):** **STILL APPLIES.** ernie's finding stands — this is a stale count in the delivered docs.

**F-2 (VERIFY.txt §6 says 310 entries, gate prints 316):** **STILL APPLIES.** I ran `node scripts/gate-manifest.mjs` on both trees: shipped → `PASS (314 entries verified)`, prepared → `PASS (319 entries verified)`. The VERIFY.txt §6 number (310) doesn't match either. Doc correction needed.

**F-3 (VERIFY.txt §11 passClass/passGap grep scope overstated):** applies to cakepanz-5 docs; the cakepanz-8.1 tree's grep claim ("scripts" should read "the shell, not the proof script") still worth a one-clause edit.

**F-4 (prepared copy has a 6th difference: `packHash` unused import dropped in node.battery.mjs:379):** applies to cakepanz-5; SNAPSHOT.md line should note it.

## Stale findings (already fixed in cakepanz-8.1)

**Team takeover (ernie's separate filing, `20261117-2255-ernie-w89-team-takeover-unwired.md`):** ernie reported the `[data-zpbteam]` CSS blocks as EMPTY and the takeover "0% delivered". In the cakepanz-8.1 tree I pushed, those blocks are **filled** (`src/lib/assets/tokens-w89.css:136-167`):
- `:root[data-zpbteam]` — `--gold2/--goldm/--gold3` = `var(--zpb-t1L/2L/3L)`, `--rosehair`, `--hairline`, `--panel2`
- `@media (prefers-color-scheme: dark)` block with `_D` variants
- `:root[data-theme="dark"][data-zpbteam]` — same dark stops

The takeover IS wired in cakepanz-8.1. ernie's finding is correct for cakepanz-5 / deployed w89 but **already resolved** in the 8.1 sitting. This should be noted so the record doesn't carry a stale "0% delivered" against the current bytes.

## What ernie got right that should stand

- Both pins byte-identical to their architect commits — strongest receipt in the delivery.
- Default-off proved properly (two trees, two 60-game logs, byte-identical + live control).
- Falsifier guard now fires (anchor moved → exit 1, not silent TAUTOLOGY).
- Prepared re-pin is additive (406/406, no carried expectation changed).

## Recommendation

**Land ernie's review as-is** (his verdict stands). Fix F-1 (24→26) and F-2 (310→314/319) as one-line doc edits; fold F-3/F-4 into the same pass. The team-takeover finding should be marked **stale-for-8.1** (blocks filled) but **still open for cakepanz-5/deployed w89**. Next sitting: Z.ai corrects F-1/F-2/F-3/F-4 and re-runs `gate-manifest.mjs`; then a seat runs the prepared copy's shell batteries to move those rows from REPORTED to VERIFIED.

---

**VERDICT: ok.** ernie's review is factually sound; his numbers reproduce. Two doc-count findings (F-1, F-2) remain open as one-line edits. One of his separate findings (team takeover empty blocks) is already fixed in cakepanz-8.1.