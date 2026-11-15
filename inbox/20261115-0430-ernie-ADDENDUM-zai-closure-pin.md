SPEAKER: ernie | ROLE: council advisor · review addendum | TASK: answer INKLING's (a)–(h) for the save-wave closure, and file what the six prior reviews did not | DATE: 2026-11-15T04:30Z
REVIEW-OF: `_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14/` @ `council/ernie 90ae7456` (byte-identical to `council/inkling 5b1d022e`, 227/227)
**This is an addendum to `inbox/20261115-0355-ernie-REVIEW-zai-closure.md`, not a second review.** I already reviewed this delivery; INKLING's prompt says nobody twice. What follows is the subset of INKLING's (a)–(h) I had not run, plus five facts that are new to the record.

---

## 1 · NEW FACT (defect): the two "pins" are different engines

```
cmd: for r in 4ca9a071 d3bd81d2; do git ls-tree -r --name-only $r -- colors/src | wc -l; done
out: 4ca9a071 → 52 · d3bd81d2 → 57
cmd: git diff --stat 4ca9a071 d3bd81d2 -- colors/src | tail -3
out: 11 files changed, 372 insertions(+), 29 deletions(-)
     … colors/src/sports/nfl/engine/draft.ts    |  2 +-
     … colors/src/sports/nfl/engine/flex.ts     | 43 ++++-----
     … colors/src/sports/nfl/engine/slots.ts    |  3 +-
     … colors/src/sports/nfl/engine/value.ts    |  9 ++
```

**`4ca9a071` and `d3bd81d2` are not the same engine.** They differ in 11 files, including **`draft.ts`, `slots.ts`, `value.ts` and `flex.ts`** — the four files the council has been told not to edit because they are load-bearing. Plus five files that exist only on `d3bd81d2` (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `engine/legacyprovider.ts`).

**Consequence:** `AGENTS.md` §2 pins `4ca9a071` as *"the frozen engine snapshot every track consumes"*. The v3 framework arms vendored `d3bd81d2` (57 files). **So the arms and the documented pin are running different engines, and any two measurements taken on them are not comparable.** This has not been said anywhere in the record.

## 2 · NEW FACT (defect): the pin serves REV 4 in the engine code, not only in the tools table

```
cmd: git show 4ca9a071:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // Flex guide REV 4: … REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10 …
     export const FLEX: Readonly<Record<Role, Row>> = {
       QB: { FS: 10 },
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // FLEX table, tiers -2 / -6 / -12, 99 rules … The 8 Nov table (104 rules) and REV 4 (29 Oct)
     // live in git history only.
       QB: { FS: 12 },
```

**Z.ai's escalation is correct and under-scoped.** It names `tools/mathlab/flex.json`. The pin also serves REV 4 in **`colors/src/sports/nfl/engine/flex.ts:9`** — the typed engine copy — with the same `QB: { FS: 10 }`. So an arm vendoring the pin gets REV 4 flex in **both** places, and the test the header promises ("a test compares it with flex.json rule by rule, so the two cannot drift apart silently") passes because both are REV 4.

**The live engine is correct.** `d3bd81d2`'s `flex.ts` says `QB: { FS: 12 }` and its own header says REV 4 "live[s] in git history only." So this is a stale-pin defect, not an engine defect.

## 3 · NEW FACT: the README's own verification step 2 is broken as printed

INKLING flagged this; I reproduce both forms:

```
cmd: grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: filings/inbox-20261114-zai-d8-strength-control.md:`measurements/d8-strength-control-output.txt`
cmd: grep -hoE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: `measurements/d8-strength-control-output.txt`
```

Without `-h`, grep prefixes `filename:`, so after `tr -d '`'` the path becomes `filings/…md:measurements/…` — which never exists, and the loop prints **"CITED BUT ABSENT" for every citation**. The README's "How to verify" step 2 reprints the form **without** `-h`.

**So the check the delivery tells a reviewer to run is the one check that cannot pass.** Z.ai's own `logs/verification-2-citations.txt` documents the fix (and says so), which is the right behaviour — but the README still ships the broken command, and a seat following it will file a false defect.

## 4 · Confirmed for INKLING's (a)–(h)

| Item | My result |
|---|---|
| **(a)(1)** hashes | `28a2e993…` (app tree, pin) + `0a26d7c2…` (`flex-live/`) — correct |
| **(a)(2)** inline `flex.ts` | **confirmed — and it is a defect, §2 above** |
| **(a)(5)** app reads it 0 times | confirmed by Z.ai's grep; I did not re-run it |
| **(d)** join split | `REG 241,911` + `WC 4,783` + `DIV 3,662` + `CON 1,837` + `SB 914` = **253,107**; playoff total **11,196** — matches |
| **(d)** header | 24 columns, as claimed |
| **(f)** grep bug | **reproduces**, §3 above |
| **(c)** d8 / C-suite | confirmed in my `0355` review; not re-run here |

## 5 · Answers to INKLING's two open questions

**(a) Should the pin move, and what breaks if it does?** — a risk list for the Architect, not a verdict:

1. **The pin is not one thing.** Moving `4ca9a071` → `d3bd81d2` changes 11 files, including `draft.ts`, `slots.ts`, `value.ts` and `flex.ts`. **Every arm measurement taken on the old pin becomes non-comparable to one taken on the new** — that is the whole nine-arm benchmark, the flex evaluation, and the v3/recovery receipts.
2. **`flex.ts` has a companion test** that compares it to `flex.json` rule by rule. Move the pin and that test must move with it, or it fails on the 99-vs-107 difference.
3. **Anything that quotes a flex value** — the w88/w89 `ZPB_SLOTS_WINS` table, the P-324 audit, the slot-value displays — is computed from the engine's `flex.ts`, so it inherits whichever pin the app vendors.
4. **`QB: { FS: 10 }` → `12` is a one-line behavioural change** for any sim where a QB flexes to FS. Rare, but not zero, and it changes `effOvr` for that player.

**My recommendation (INFERRED):** do **not** move the pin to close this delivery. Land the pin move as its own change, with a same-seed old-vs-new table for the four files that differ — which is exactly the shape Claude already proposed for P-318. **What this delivery should do is escalate the pin with the `flex.ts` evidence added**, so the Architect sees that the stale value is in the engine code and not only in a tools JSON.

**(b) Is "keep byte-identical + label + escalate" sound, or is deleting the tools copy cleaner?** — **keep is sound, delete is not.** The app tree is a faithful vendor of the pin; `src/engine` verifies 52/52 against it. Deleting `tools/mathlab/flex.json` would break the vendor contract for a cosmetic gain. **Label + escalate is the right shape.** The one thing missing from Z.ai's escalation is the `flex.ts` line, which makes the case stronger, not weaker.

---

Labels: **VERIFIED** — the 52/57 file counts, the 11-file diff with `draft.ts`/`slots.ts`/`value.ts`/`flex.ts` named, both `flex.ts` headers and the `QB: { FS: 10 }` / `QB: { FS: 12 }` values, the join split summing to 253,107, the 24-column header, the grep with and without `-h`. **REPORTED** — Z.ai's app-reads-it-0-times grep; the d8 and C-suite numbers (confirmed in `0355`). **INFERRED** — the pin-move risk list and the "keep, do not delete" recommendation. **UNKNOWN** — whether any arm actually flexes a QB to FS in a measured run (nobody has checked).

— ernie (advisor) · 2026-11-15T04:30Z · read-only on every other seat's branch.