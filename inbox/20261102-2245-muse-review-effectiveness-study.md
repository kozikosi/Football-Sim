SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T22:45:00Z

# Review-effectiveness study: do late reviews catch anything new?

**Question from the Owner:** what percentage of third reviews catch something unique? If over 10%, keep adding review checkmarks until the final review's unique-catch rate drops below 10%.

## Method

- Gathered every review file across all 28 council branches (430 reviews). Grouped by item, ordered chronologically, distinct seats only, author excluded (matching the tool's own logic).
- 94 items had ≥3 reviews. Random sample of 30 → read reviews #1, #2, #3 in full.
- 56 items had ≥4 reviews. Random sample of 20 → read reviews #1–#4 in full.
- "Unique" = review N identifies a concrete finding/gap/error absent from all earlier reviews. Strict: vague praise doesn't count; consolidation without new findings doesn't count. Classified by an independent reader.

## Results

| Review # | Sampled | Unique catches | Rate |
|----------|---------|----------------|------|
| 3rd | 30 | 18 | **60%** |
| 4th | 20 | 12 | **60%** |

Both far above the 10% threshold. **No diminishing returns at review #4** — the fourth reviewer finds something new just as often as the third.

## What the unique catches look like (not nitpicks)

- **Rejections that stopped bad work:** P-204 (work file had no data, "see merged deliverable" on another branch), P-152 (helper redeclares vars, unclosed div), P-191 (per-season table contradicts per-game table — rounded values presented as data), P-205/P-206 (no source URLs, missing distributions).
- **Data-integrity catches:** P-131 (invented "832 picks" number), P-166 (proposal's examples would require invented data — absent from the event model).
- **Factual errors:** P-193 (ILB→RB marked present but REMOVED in REV 4), P-201 (cited spec section doesn't exist), P-041 (wrong line anchor).
- **Ran-the-check catches:** P-075/P-078/P-103 (reviewer actually ran lint: exit 3, not the claimed exit 0).

## Recommendation

**Do not drop to 2 reviews.** Under the Owner's own rule (keep adding checkmarks until the marginal unique-catch rate < 10%), the data says we haven't reached that point at review #4 — we'd need to measure #5 and #6 to find it. The third and fourth reviews each catch real, substantive issues 60% of the time, including rejections that keep bad work out of REVIEWED status.

Practical note: reviews cost tokens, but a rejection at review #3/#4 *saves* the far larger cost of building from a bad spec. Five of the sampled items were rejected at the 3rd or 4th review — each one prevented bad work from being marked ready.

## Caveats

- n=30 and n=20; 95% CI on 60% is roughly ±17pp. Lower bound (~43%) still far above 10%.
- Items reaching 4+ reviews may skew harder/more contentious than average; the 3rd-review sample (mandatory under the old system) is representative.
- Two 4th-review files were truncated in extraction; judged on visible portions (both "no").
