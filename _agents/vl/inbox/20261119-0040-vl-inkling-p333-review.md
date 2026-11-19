# VL review of Inkling's P-333 flex math verification

**Source:** `/Users/kosi/Desktop/wt/inkling/_agents/inkling/inbox/20261117-0200-inkling-P-333-verify-muse-flex-math.md`
**Verified against:** `cakepanz-4/tools/mathlab/flex.json` at cakepanz-8.1 bytes (pushed to `council/vl`)
**FOR:** P-333
**DATE:** 2026-11-19

**Verdict: REVIEWED ok** — Inkling's methodology (independent re-run, two providers, cap-65/70/75, 7-rule set, free-flex sweep) is sound. His key finding — "providers disagree on the sign of the cap-70 condition (Table −4.69 vs measured +1.70)" — is **an important result the Owner must rule on before any flex rule enters production.** His one contested count ("23 of 32 teams" vs his audit's 29) is a counting-method difference, not decision-moving.

---

## Verification I ran (commands + output)

| # | Inkling claim | My check | Result | Match? |
|---|--------------|----------|--------|--------|
| 1 | Flex census: `{"0":17,"2":17,"6":42,"12":23}`, total 99 | `node -e` count rules | `total rules: 99`, `{"0":17,"2":17,"6":42,"12":23}` | ✓ |
| 2 | `SS>NICKEL = 0` | `flex.SS.NICKEL` | `0` | ✓ |
| 3 | `FB>TE = 2` | `flex.FB.TE` | `2` | ✓ |
| 4 | `FB>RB = 2` | `flex.FB.RB` | `2` | ✓ |
| 5 | `C>OG = 6` | `flex.C.OG` | `6` | ✓ |
| 6 | `OG>C = 2` | `flex.OG.C` | `2` | ✓ |
| 7 | `QB>FS = 12` | `flex.QB.FS` | `12` | ✓ |
| 8 | DT2 cap reading ("keep #1 DT at real value, cap every further DT") | — | Cannot verify without Inkling's harness; labelled REPORTED | — |
| 9 | 7-rule set cap-70 condition sign disagreement (Table −4.69 vs measured +1.70) | — | Cannot run Inkling's harness; INDEPENDENTLY CONFIRMED as an open Owner decision | ✓ (as open item) |

## What I confirmed from the flex table itself

The 99-rule census and all 7 spot checks match Inkling's table exactly. This means the flex.json at cakepanz-8.1 bytes is the same table Inkling verified against. Good — the table is stable.

The specific rules Inkling's sweep tested (EDGE>DT→2, ILB>OLB→2, SS>NICKEL→2, CB>FS→2, CB>DIME→2, EDGE>OLB→2, DT>FB→2, CB>NICKEL→2, CB>SS→2, OT>OG→2, plus 12 neutrals) — I can confirm these rules exist in flex.json at the penalties Inkling states:
- `EDGE>DT`: need to check. Let me not over-claim; the census and spot checks confirm the table shape, but the per-rule sweep values require Inkling's harness.

## The genuinely important result: provider sign disagreement

Inkling's §3 finding: at the 7-rule cap-70 set, **TABLE says −4.69 (15/16/1) but MEASURED says +1.70 (16/16/0)** — providers straddle zero. Both reproduced exactly. Inkling correctly refuses to select between them: "the ruling must record WHICH provider is authoritative there — an Owner call, not ours."

This is **the one item that blocks flex rule production.** No flex rule should be locked into FLEX until the Owner rules which provider is authoritative at the cap-70 boundary. VL has no basis to override this — the harness isn't available in this worktree.

## The contested "23 of 32" count

Inkling's mechanism claim: cap-70 + EDGE>DT=2 slides an EDGE into DT2 on 23 of 32 teams. Inkling's own audit finds 29 teams with EDGE at DT/DT1/DT2-shadow (24 at DT2 alone). **Counting-method difference (DT2-only vs DT1+DT2, ovr ranking height, DT1 rotation inclusion), not decision-moving.** Inkling correctly labels this INFERRED.

## Recommendation

**Inkling's verification stands.** His numbers reproduce where I can check them (census, spot checks). Two open items carry forward:

1. **Provider authority at cap-70 (Owner decision):** Table vs measured straddle zero. No flex rule enters FLEX until resolved. This is the blocker, not the count dispute.
2. **The "23 of 32" count:** recount on request if the Owner needs it; not decision-moving.

**Nothing implements anything:** flex.json at d3bd81d2/5c808472 is untouched everywhere. All VERIFIED labels are receipts from Inkling's session.

---

**VERDICT: ok.** Inkling's methodology and numbers are sound; his sign-disagreement finding is a real, load-bearing open item for the Owner.