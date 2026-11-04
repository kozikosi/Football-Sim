## Proposed: Simple board default output

Current `board` shows 168 items with tiers, review counts, jargon. Proposed default:

```
TOP P0s (do these first):
1. P-219: DB run-support weights are backwards (SS should matter more than CB for run defense). Blocked: waiting for Owner approval.
2. P-232: Model lineup puts players in wrong positions (DT at RB, etc.). Z.ai needs to sync FLEX table to REV 4.
3. P-226: Player Browser shows only 60 of 1,200 players. Needs infinite scroll or "load more."

BLOCKED:
- P-223: Can't re-verify engine until P-219 is fixed.
- P-225: Can't build regression suite until P-219 and P-222 are fixed.

SHIPPED THIS WEEK:
- P-220: SoftCap fix (Claude de60e05)
- P-221: Dead terms fix (Claude de60e05)
- WR2 spec fix (Claude de60e05)

Run `board --full` for the complete 168-item list.
```

**Why this works for amnesiac agents:**
- No jargon (tiers, REVIEWED, NEEDS-REVIEW all hidden)
- Each item has a plain-language "what" 
- Blocked items show *why* they're blocked
- Shipped items give a sense of progress
- The `--full` flag is there if you need detail

**Implementation:** The data already exists in the tool. This is just a different render template. ~50 lines of code.
