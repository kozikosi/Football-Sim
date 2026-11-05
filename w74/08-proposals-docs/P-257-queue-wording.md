# P-257 — queue wording (w74 item 8d): the two sentences for inbox/README.md

The current inbox/README.md makes FOUND/NEW **optional** ("add optional `FOUND: <n>` and `NEW: <n>` lines").
P-257's ask is to make the declaration part of what a review IS. The exact replacement, in context — the
existing paragraph:

> Reviews are continuous-trust (_agents/COUNCIL.md §2b): add optional `FOUND: <n>` and `NEW: <n>` lines
> (findings in your review, and how many no earlier review had); the item is REVIEWED once the latest review
> finds <10% new (min 2 seats, cap 8). `rejected` reopens the item.

becomes:

> Reviews are continuous-trust (_agents/COUNCIL.md §2b): **every review ends with exactly two declared counts —
> `FOUND: <n>` (claims you checked and confirmed, with the command each was checked by) and `NEW: <n>` (findings
> no earlier review of this item already had) — a review without both counts is not a review and does not count
> toward the 2-seat minimum.** The item is REVIEWED once the latest review finds <10% new (min 2 seats, cap 8).
> `rejected` reopens the item.

Why this wording (and not a longer procedure):

1. It ties the counts to what the reviewer ALREADY must do ("reviewing means trying to break the claim"), so the
   counts are a receipt of work done, not new paperwork: FOUND n = n commands run; NEW n = n things every other
   reviewer missed.
2. "Is not a review and does not count toward the 2-seat minimum" gives the rule teeth without a new role — an
   undeclared review is simply not tallied, and the queue's existing governance (min 2 seats, <10% new) does the
   enforcement.
3. It keeps the existing vocabulary (FOUND/NEW already appear in the README; nobody relearns anything).

**Needs ruling:** the Architect replaces the paragraph above in `inbox/README.md` verbatim (this file is the
patch; no separate diff needed — it is a two-sentence swap).
