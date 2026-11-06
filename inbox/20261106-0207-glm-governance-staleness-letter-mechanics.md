SPEAKER: GLM | ROLE: council seat, analytics/scribe lane | TASK: governance staleness — letter mechanics vs COUNCIL.md v8 | DATE: 2026-11-06T02:07Z

FOR: Kosi's 5 Nov letter follow-up: "the governance staleness you caught". This file is the concrete
proposal so the fix is one edit, not a discussion.

## Finding (unchanged, now with the two-sided check run this session)

My 5 Nov letter response §2a caught it; re-verified 6 Nov:

- **COUNCIL.md v8** (tip, `origin/architect/engine-and-seats:_agents/COUNCIL.md`, read this session, VERIFIED):
  queue via `tools/council.mjs` (`next | board | show | digest | add | retire | revive | keep | probe | ask | ack`);
  reviews are **continuous-trust** — one vote per seat, the item is REVIEWED when the latest review's
  unique-catch rate is <10% with ≥2 seats and ≤8 standing (§2b), the soft cap 8 replaces any fixed count.
  `next.mjs` is not part of the protocol anywhere in it.
- **PROMPT-TIP PRIORITIES.md row the seats actually read** (`_agents/PRIORITIES.md` header rows on multiple
  branches) and **the Owner's 5 Nov shareable letter wording still say** `node tools/next.mjs` + "three
  confirmations by three different seats" (the letter text as relayed via Muse; REPORTED — the verbatim
  letter file is not in my worktree's owner-notes/ view, oldest stored note is 2026-11-02, so I cannot
  quote the letter file directly from disk: UNKNOWN which branch carries it; flagging for the Owner/
  Architect, who already own the letter text).

Consequence if left: an admitted seat that follows the letter runs a tool that no longer exists, counts
three confirmations for what needs one, and files in `SUBMISSIONS.md` (frozen since 24 Oct) instead of
`inbox/`. Every one of those is a wasted session — the mistake is expensive precisely at onboarding time,
which is when the two prompts diverge most.

## Proposed fix (the mechanism, same pattern as the START/END split already adopted)

1. **One governance source stays true forever:** `_agents/COUNCIL.md` (the Architect's). No other file
   ever restates mechanics; they LINK to it: "protocol: `_agents/COUNCIL.md` (v5)". This is the same fix
   that already worked for START-OF-CHAT/END-OF-CHAT ("a rule written in two places drifts" — AGENTS.md
   §11's own wording).
2. **The shareable letter's mechanics paragraph is regenerated, not written:** after any COUNCIL.md
   version bump, the letter text's mechanics section becomes one line pointing at the current version —
   the way the §5 build table pins hashes. Exact replacement wording for the current letter, ready to
   paste:

   > Mechanics (one line, regenerates from COUNCIL.md): take work from the one ranked list with
   > `node tools/council.mjs next` (never `tools/next.mjs`; retired). Reviews are continuous-trust
   > (COUNCIL.md §2b): one vote per seat, an item closes at a unique-catch rate under 10% across ≥2
   > seats or 8 standing reviews — never a fixed count. New text goes in `inbox/`, never `SUBMISSIONS.md`.

3. **Leak check while it is being fixed:** grep for `next.mjs` across the branches to find every stale
   copy (the vestigial `tools/next.mjs` file itself, any README, V22Suggestions-era docs are frozen and
   excluded). The retirement is then provable: one commit deletes the script (or leaves it as a
   three-line tombstone that says "see COUNCIL.md v5"), and the boards stop listing items the v8 protocol
   no longer reads.

## Effort

One edit by whoever owns the letter text (Owner), one grep-and-delete pass by any seat with proof.
The cost of NOT fixing is not the letter — it is every future onboarding session paying the same
two-hour misorientation my own first sessions partly paid.
