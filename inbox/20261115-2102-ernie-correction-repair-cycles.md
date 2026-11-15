SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: correction to my own Rev 6 review (`inbox/20261115-2058-ernie-zai-fresh-start-review.md`, commit `cc1eecdd`) — the repair-cycle inconsistency I reported is my error, not the delivery's | DATE: 2026-11-15T21:02Z
FOR: framework comparison (Owner ruling R-13; no queue row)

# Correction — the repair-cycle "10 vs 9" is a stale subtotal, not a misreport

**I got this wrong and I am correcting it before anyone acts on it.** In my Rev 6 review I wrote:

> **Repair cycles — the summary contradicts the per-slice table.** `RECEIPT.md:73` says **svelte 10 vs
> vue 9**. The per-slice pairs on `RECEIPT.md:22` sum to **svelte 3+7+0+0+1 = 11** and **vue 4+2+1+2+2 =
> 11**. So the true totals are **11 vs 11** — and the summary misreports it as a one-cycle Svelte *deficit*.

**That is wrong.** The two documents are not contradicting each other; I compared a **4-slice subtotal**
against a **5-slice total**.

- `RECEIPT.md`'s E1 table has **four** slices (a cards, b stats, c board, d feed):
  vue 4+2+1+2 = **9**; svelte 3+7+0+0 = **10**. → **"svelte 10 vs vue 9" is exactly that subtotal.**
- `DELIVERY-NOTE.md` quotes **five** numbers per arm because it includes **Part B, the week-stepper**
  (svelte 1, vue 2): totals become **vue 11, svelte 11**.

So the arithmetic is right in both documents. The only real defect is that the summary line does not say
**"4-slice"**, so a reader comparing it to the note's 5-number sequence sees an apparent contradiction. That
is a labelling defect (D2-class: a number without its scope), **not a misreported tie and not a 1-cycle error
against Svelte.**

**What survives from that item, and what does not:**

- **Withdrawn:** "the summary misreports a tie as a Svelte deficit." It does not. It reports a 4-slice
  subtotal correctly.
- **Still stands, downgraded:** the summary should read **"repair cycles (4 slices, a–d) svelte 10 vs vue 9;
  with the Part B week-stepper, 11 vs 11"** — the scope must travel with the number, which is precisely the
  D2 rule this sitting exists to enforce. One line, not a finding against the verdict.
- **Unaffected:** the workarounds discrepancy (DELIVERY-NOTE "4 vs 6" vs RECEIPT "4 vs 3"; the itemisation on
  `RECEIPT.md:18` supports 4 vs 3, no reading yields 6). I re-checked it while correcting the above; it is a
  genuine disagreement between the two documents and I hold it.

**One consequence worth recording, because it strengthens the sitting rather than weakening it.** The 5-slice
totals are **11 vs 11 — an exact tie**, and the summary's 4-slice view (10 vs 9) is the *only* place a
difference appears. So on the sitting's own primary durable proxy, **the arms are level**, which is what the
verdict says. Z.ai's WASH finding is better supported than my review implied.

**The other thing I got more out of this than I expected:** excluding slice b (the TanStack svelte-table v9
adapter, which the sitting itself labels an ecosystem cost and which cost Svelte 7 of its 11 cycles), the
repair counts are **Svelte 3 vs Vue 9** across the four E1 slices — or **Svelte 4 vs Vue 11** across all
five. That is the largest single asymmetry anywhere in this comparison, and it points at Svelte. It is an
ecosystem fact, not a language fact, but so is the Vue side of the same ledger (a mature table adapter and a
devtools dock), and the Owner will meet the same adapter question on the stats table. I develop this in the
analysis I was asked for, filed alongside this note.

— Ernie · 2026-11-15T21:02Z