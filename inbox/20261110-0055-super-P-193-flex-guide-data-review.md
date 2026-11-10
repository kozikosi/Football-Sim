SPEAKER: super | ROLE: Council Adviser | TASK: P-193 Review the Owner's flex guide as data | DATE: 2026-11-10T00:55Z
FOR: P-193

## Summary

P-193 asks to review the Owner's flex guide as data: `tools/mathlab/flex.json` against the Owner's text. The review cannot be done as originally scoped — P-193 was written for flex guide **REV 2 (95 rules)** and `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt`, but `flex.json` is now **REV 4 (107 rules, Owner 29 Oct)** on `council/muse`, and the Architect's branch carries a **third, 97-rule version (Owner 9 Nov)**. The two live versions disagree on rule count, tier distribution, and the QB->FS penalty. Items 3 and 7 (Owner's 9 Nov answers) have **not** been applied to either version — neither contains any tier-12 rule.

Key blockers for applying items 3 + 7:
1. `council/muse` `tools/mathlab/flexcheck.mjs` only accepts penalties `[0, 2, 4, 6]` plus a QB=10 special case. It **rejects penalty 12**, so it cannot validate the tier-12 table items 3 + 7 require. (The architect branch's `flexcheck.mjs` was already updated to accept 12; `council/muse` was not.)
2. `council/muse` `tools/mathlab/flexengine.js` spot checks are stale vs REV 4 (e.g. expects `QB->WR1 = 6`, but REV 4 removed QB->WR entirely).

All file/line claims below were checked against `origin/council/muse` and `origin/architect/engine-and-seats` with `git show`. Commands and outputs are shown where relevant.

---

## Files reviewed

| File | Branch | What it is |
|---|---|---|
| `tools/mathlab/flex.json` | `origin/council/muse` | REV 4, 107 rules, Owner 29 Oct 10:00 HST |
| `tools/mathlab/flex.json` | `origin/architect/engine-and-seats` | 97 rules, Owner 9 Nov 2026, D picks + 9 corrections |
| `tools/mathlab/flexcheck.mjs` | `origin/council/muse` | validator, accepts [0,2,4,6] + QB=10 |
| `tools/mathlab/flexcheck.mjs` | `origin/architect/engine-and-seats` | updated, mentions 12, no [0,2,4,6] cap, no QB=10 special case |
| `tools/mathlab/flexengine.js` | `origin/council/muse` | compiles flex.json into engine table; spot-checks against Owner text |
| `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt` | `origin/council/muse` | flex guide REV 2 (26 Oct), verbatim |
| `_agents/muse/deliveries/prompts-2026-11-05/claude-reply-flex-answers-2026-11-09.md` | `origin/council/muse` | Owner's answers to flex questions (9 Nov), items 1-7 + skill-profile idea |

---

## Findings

### F1 — P-193's premise is stale: flex.json is REV 4, not REV 2 (VERIFIED)

P-193 was written for flex guide REV 2 (95 rules) parsed from `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt`. The live `flex.json` on `council/muse` is **REV 4**:

```
"_source": "REV 4, Owner 29 Oct 10:00 HST: QB flexes ONLY to FS, at -10 (QB->RB removed). Owner, 26 Oct 2026 01:45 HST (flex guide REV 2, adds DIME; supersedes the 25 Oct guide). ... | REV 3, Owner 28 Oct 17:27 HST: ..."
```

VERIFIED: `git show origin/council/muse:tools/mathlab/flex.json` — `_source` field reads REV 4 / REV 3 / REV 2 cumulatively; `roles` array has 17 roles; `flex.QB = {"FS": 10}`.

Consequence: P-193's instruction to "check all 95 rules" cannot be applied literally — REV 4 has 107 rules. The review below scores the current (REV 4) table against the Owner's latest text (9 Nov answers), not REV 2.

---

### F2 — Three versions of the table disagree on rule count and tiers (VERIFIED)

I counted rules by penalty tier for each version:

| Tier | council/muse REV 4 | architect branch (9 Nov) | Owner's expected after items 3+7 |
|---|---|---|---|
| 0 (free) | 16 | 23 | 26 |
| 2 | 8 | 15 | 16 |
| 4 | 38 | 0 | — (no tier-4 tier expected) |
| 6 | 44 | 40 | 40 |
| 10 | 1 (QB->FS) | 0 | — |
| 12 | 0 | 19 | 23 |
| **Total** | **107** | **97** | **105** |

Commands:
- council/muse REV 4: `git show origin/council/muse:tools/mathlab/flex.json | node -e '...'` → TOTAL 107, BY TIER {"0":16,"2":8,"4":38,"6":44,"10":1}
- architect branch: `git show origin/architect/engine-and-seats:tools/mathlab/flex.json | node -e '...'` → TOTAL 97, BY TIER {"0":23,"2":15,"6":40,"12":19}, source "FLEX TABLE, tiers -2 / -6 / -12, 97 rules (Owner 9 Nov 2026, D picks + 9 corrections...)"

Expected (Owner 9 Nov answers): "23 at 12, 40 at 6, 16 at 2, 26 at 0 — 105 rules."

Consequence: council/muse REV 4 and the architect branch are **out of sync** (107 vs 97 rules; tier 4 and tier 10 exist only on REV 4; tier 12 exists only on the architect branch). Neither matches the Owner's expected post-items-3+7 state (105 rules). The Architect must decide which is authoritative before applying items 3 + 7.

---

### F3 — Items 3 + 7 (Owner's 9 Nov answers) are not applied to either version (VERIFIED)

Owner answers (verbatim, 9 Nov):

- **Item 3:** "set TE>FS to 12, and add ILB>FS 12 and OLB>FS 12. ... TE>NICKEL stays at 6, and at SS OLB is 6, so TE>SS stays at 6." (TE>DIME 6→12, TE>FS 6→12, new ILB>FS 12, new OLB>FS 12.)
- **Item 7:** "Add SAM as a destination mirroring OLB: EDGE>SAM 0, FS>SAM 6, ILB>SAM 0, OLB>SAM 0, SS>SAM 2, TE>SAM 6."

VERIFIED: neither `flex.json` contains any of these. council/muse REV 4 has **zero tier-12 rules**; architect branch's tier-12 rules are theta-priced (QB->FS, RB->WR, RB->SS, RB->FS, TE->WR, TE->OT, TE->EDGE, TE->DT, TE->ILB, C->OT, C->DT, EDGE->SS, ILB->EDGE, ILB->DIME, OLB->EDGE, OLB->DIME, SS->WR, SS->RB, FS->WR) — none are TE->DIME, TE->FS, ILB>FS, OLB>FS, or any SAM rule. Item 3's "TE>NICKEL stays 6 / TE>SS stays 6" holds on both versions (TE: {NICKEL:6, SS:6} on REV 4; architect branch TE->NICKEL/SS not tier 12).

Consequence: items 3 + 7 are pending work. The Owner's next step ("Apply items 3 and 7, then re-pin...") cannot be verified until they land.

---

### F4 — QB->FS penalty conflict: 10 (REV 4) vs 12 (architect branch) (VERIFIED)

- council/muse REV 4: `flex.QB = {"FS": 10}` — REV 4 source: "QB flexes ONLY to FS, at -10 (QB->RB removed)."
- architect branch: `flex.QB = {"FS": 12}` — QB->FS is theta-priced by D@90 at theta 1.0, rounded to tier 12 (cut point 9), **not** an Owner override. Source: "the other 44 rules are priced by D@90 at theta 1.0 ..., rounded to the nearest tier of 0/2/6/12 (cut points 1 / 4 / 9)."

VERIFIED: both `git show` outputs above; `flex.QB` is `{"FS":10}` on council/muse and `{"FS":12}` on architect branch.

The Owner's 9 Nov answers do not set QB->FS at all (item 3 covers TE/LB->FS, not QB). Conflict: REV 4 says QB->FS = 10; architect branch says 12. The Owner's latest explicit word on QB->FS is REV 4's "-10" (29 Oct), but the architect branch (9 Nov, newer) prices it at 12 via theta. Needs Owner/Architect clarification.

---

### F5 — council/muse flexcheck.mjs cannot validate a tier-12 table (VERIFIED)

council/muse `flexcheck.mjs` validates penalties:

```js
if (![0, 2, 4, 6].includes(p) && !(f === 'QB' && p === 10)) bump(f + '->' + d + ' penalty ' + p);
```

So it accepts `[0, 2, 4, 6]` plus a special case `QB->FS = 10`. It **rejects penalty 12**.

VERIFIED: `git show origin/council/muse:tools/mathlab/flexcheck.mjs` — the validation line above.

The architect branch table has 19 tier-12 rules and the Owner's expected state has 23 tier-12 rules. council/muse `flexcheck.mjs` would FAIL on either (it bumps on penalty 12). The architect branch's `flexcheck.mjs` was already updated (VERIFIED: it does NOT contain `[0,2,4,6]`, does NOT contain the QB=10 special case, and DOES mention `12`).

Consequence: before items 3 + 7 can be applied and validated on `council/muse`, `flexcheck.mjs` must be updated to accept penalty 12 (and drop or generalize the QB=10 special case). This is a blocker — flagged so it is not discovered late.

---

### F6 — Tier-4 rules on council/muse REV 4 have no home in the Owner's expected state (VERIFIED)

council/muse REV 4 has **38 tier-4 rules** (e.g. WR->CB 6? no—WR->CB is 6; tier-4 examples: RB->WR 4, WR->RB/TE/SS/FS/NICKEL/DIME 4, OT->DT/FB 4, OG->OT/DT/FB 4, C->OT/DT/FB 4, DT->OG/C/EDGE/FB/ILB/OLB 4, EDGE->ILB 4, ILB->DT/FB 4, OLB->EDGE/NICKEL 4, SS->OLB 4, FS->CB/WR/ILB/OLB 4, CB->WR/ILB/OLB 4).

The Owner's expected state uses tiers `{0, 2, 6, 12}` only — no tier 4. The architect branch already removed all tier-4 rules (tier4: 0, VERIFIED above).

Consequence: the 38 tier-4 rules on council/muse REV 4 must be re-priced to 0/2/6/12 (or removed) before the table matches the Owner's intended tier set. The architect branch shows this is possible (it reached 97 rules with no tier 4).

---

### F7 — flexengine.js spot checks are stale vs REV 4 (REPORTED)

council/muse `flexengine.js` spot checks include `['QB', 'WR1', 6]` (expects QB->WR1 penalty 6) and `['QB', 'RB1', 8]`. But REV 4 `flex.QB = {"FS": 10}` — QB flexes ONLY to FS; QB->WR was removed in REV 3 ("QB->SS and QB->WR removed") and REV 4 keeps "QB flexes ONLY to FS". So the engine would return emergency penalty (8) for QB@WR1, not 6.

VERIFIED (code read): `git show origin/council/muse:tools/mathlab/flexengine.js` — spot array contains `['QB', 'WR1', 6]`; REV 4 `flex.QB = {"FS":10}` has no WR destination.

REPORTED (not run): `flexengine.js` requires Playwright + a built product page; I did not execute it. But the spot check `['QB', 'WR1', 6]` is textually inconsistent with REV 4, so `flexengine.js` would fail its own spot checks against REV 4 unless updated.

Note: `flexengine.js` is supposed to `Exit 1 on any failure`, so if run against REV 4 it would likely fail — but this needs execution to confirm.

---

### F8 — "QB-to-S at -6 can be gamed" is no longer a live issue (VERIFIED)

P-193's DoD asks to check "any way QB-to-S at -6 can be gamed." In REV 2, QB had `-6 WR, S`. REV 3 removed QB->SS and QB->WR ("QB->FS 6, QB->SS and QB->WR removed"). REV 4 keeps "QB flexes ONLY to FS, at -10". So QB->S at -6 no longer exists in any live version.

VERIFIED: REV 2 owner-notes guide (`QB: -6 WR, S`); REV 3/4 `flex.json` source (`QB->SS and QB->WR removed`; `QB flexes ONLY to FS`).

No action needed on this point.

---

## Recommended next steps (council work, no product edits)

1. **Decide which `flex.json` is authoritative** — council/muse REV 4 (107 rules, QB->FS=10) or architect branch (97 rules, QB->FS=12). They disagree; both predate items 3 + 7. Label: the choice is an Owner/Architect product call; council reports the divergence only.

2. **Update `council/muse` `flexcheck.mjs` to accept penalty 12** — mirror the architect branch version (drop `[0,2,4,6]` cap and QB=10 special case; accept 0/2/6/12). This unblocks validation of items 3 + 7. DoD: `flexcheck.mjs` passes on a tier-12 table (command + output).

3. **Apply items 3 + 7** to the authoritative `flex.json`, then re-pin and report: tier counts (expected 23@12, 40@6, 16@2, 26@0 = 105 rules), new 3-4 base total and cheapest arrangement (TE3 = 50, not 100), test suite status. This is the Owner's stated next step; council can verify once built (P-323).

4. **Update `flexengine.js` spot checks** to match the authoritative table (e.g. remove `['QB', 'WR1', 6]` which contradicts "QB only to FS").

5. **P-322 (skill profile)** — the Owner supports replacing hand-set rules with a per-role skill profile ("MY FLEX TABLE IS MERELY A GUIDE FOR YOU TO UNDERSTAND HOW I WOULD LIKE THE ENGINE TO WORK"). The divergence in F2/F4 and the tier-4/tier-12 mismatch in F5/F6 motivate this: a skill profile would derive prices from one place instead of maintaining 97–107 hand-set rules across diverging branches. Design only; do not build.

---

## Evidence labels

- F1, F2, F3, F4, F5, F6, F8: **VERIFIED** — checked with `git show origin/council/muse:<path>` and `git show origin/architect/engine-and-seats:<path>`, plus a node rule-count script (outputs shown above).
- F7: **REPORTED** — code read, not executed (flexengine.js needs Playwright + built page).

## HOW TO CHECK

- `git show origin/council/muse:tools/mathlab/flex.json | node -e '...count rules by tier...'` → 107 rules, {"0":16,"2":8,"4":38,"6":44,"10":1}
- `git show origin/architect/engine-and-seats:tools/mathlab/flex.json | node -e '...count rules by tier...'` → 97 rules, {"0":23,"2":15,"6":40,"12":19}
- `git show origin/council/muse:tools/mathlab/flexcheck.mjs` → validation rejects penalty != [0,2,4,6] except QB=10
- `git show origin/architect/engine-and-seats:tools/mathlab/flexcheck.mjs` → mentions 12, no [0,2,4,6] cap, no QB=10 special case
- `grep -n "TE>DIME\|TE>FS\|ILB>FS\|OLB>FS\|SAM" tools/mathlab/flex.json` (on either branch) → item-3/item-7 rules absent

---

VERDICT: improved — P-193 re-scoped from REV 2 (95 rules) to the current state (REV 4 on council/muse; 97-rule version on architect branch). Findings F1–F8 filed; none require a product edit. F5 (flexcheck.mjs penalty-12) is a blocker for items 3 + 7 and should be fixed before the Architect re-pins.
