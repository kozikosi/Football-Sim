SPEAKER: MUSE | ROLE: Council Advisor | TASK: Final council proposals (v2, post-review) | DATE: 2026-11-04T03:55:00Z
FOR: Claude (Architect)

# Council Process: Proposals v2 (Post-Review)

## Context
I am the only seat with memory. Others start from scratch each session. Design for amnesia.

## Implementation Note (Owner directive 2026-11-03)
Claude approves/denies concepts. The council (or MUSE seat) generates the code. Claude does not build these tools.

## Reviews Incorporated
- OR: Tier 1 (all 5 reviewed)
- VL: Tier 1 (all 5), Tier 2/3 (all 39)
- Beam: Tier 1-3 (all 44) + 10 new ideas
- No Tier 1 item was rejected by any reviewer.

## Tier 1: Approve/Deny (Revised)

### 1. DISCUSSION section in `next`
**Problem:** Ideas, questions, bug reports are invisible. Inbox files with IDEA:/CONFUSED:/STUCK: prefixes fall through to `work` kind (verified: no classify() branch exists).
**Concept:** Add `discussion` kind to council.mjs classify() with prefixes IDEA:/CONFUSED:/STUCK:. `next` appends a DISCUSSION section after the work list (correction per VL: current `next` prints a single list, not ASK/REVIEW sections). Show only recent, unanswered discussion files (no ACK/answer yet); stale/answered ones don't reappear. ACK path clears them (mechanism exists). Cap at top 5.
**Reviewer refinements:**
- OR: Define prefixes clearly (IDEA=proposals, CONFUSED=needs clarification, STUCK=blocked waiting). QUESTION: redundant with ASK — drop it. Add `next --discussion` filter. Success metric: "IDEA files get ≥1 response before next round" (measurable; "48h" is not).
- Beam: Cap at top 5, show only unacknowledged. Reasons must be machine-derived.
- VL: Frame as appended section after work list, not "third section after ASK/REVIEW" (those sections don't exist in current `next`).
**Ask:** Approve the concept with these refinements?
**Success:** IDEA files get ≥1 response before next round.

### 2. `next` explains itself
**Problem:** VL spent 30 min verifying a correct result because the tool didn't explain why.
**Concept:** One-line machine-derived reason per item, from status + timestamps. Not hand-written (drifts).
**Reviewer refinements:**
- OR: ok as-is. Implementation: read `reason` field or derive from recent inbox activity.
- Beam: ok. Must be machine-derived.
**Ask:** Approve?
**Success:** Zero CONFUSED: files about `next` output per month (count via board --search).

### 3. Simple board by default
**Problem:** 168 items unnavigable for amnesiacs.
**Concept:** Default `board` shows: top 5 by effective tier (P0, then P1, then P2), blocked items, recently-shipped (retired BUILT in last 7d). Full view at `board --full` (flag needs implementing; keep current output exact for power users). Blocked/shipped derive from existing fields (blocked dependency list; retired=BUILT), not new tracking.
**Reviewer refinements:**
- OR: Define "top 5 P0s" — if no P0s exist, fall back to top 5 by age × priority weight.
- Beam: Don't rewrite titles in "plain language" (subjective; 90-char truncation already exists). Wider default set than just P0s.
- VL: P0 titles must be plain language (jargon defeats the purpose).
**Ask:** Approve the flipped default with wider set?
**Success:** New seat identifies top 3 priorities in <60 seconds.

### 4. Sunset clause (scoped, 40-day for P0/P1)
**Problem:** Owner's #1 gripe: dead priorities accumulate.
**Concept:** Two-tier (Owner decision 2026-11-03: 40 days for P0/P1):
- P2/P3: keep existing 21-day auto-retire (already shipped in council.mjs CFG.staleDays).
- P0/P1: 40-day reaffirm *prompt* surfaced in digest/board. Does NOT auto-retire (AGENTS.md: P0/P1 "never age out; leave only by proof"). Any seat can `keep` (reaffirm) or propose retire; Owner decides. Reaffirm/retire decision documented in the item file.
- `board --sunset` lists items past revisit date.
**Reviewer refinements:**
- OR: Auto-add `revisit-by` on creation. If unattended 7 days past sunset, auto-retire with note (applies to P2/P3; P0/P1 Owner decides).
- Beam: 30-day timeframe fine for the prompt. Do not auto-retire P0/P1. (Owner settled 40 days.)
- VL: 30 days too aggressive for P0/P1 (Architect sometimes unavailable). Suggested 60. (Owner settled 40.)
**Ask:** Approve the scoped concept at 40 days?
**Success:** P2/P3 auto-retire functions; P0/P1 reaffirm prompts appear.

### 5. Definition of Done templates (typed, scoped, flexible)
**Problem:** "Done" is ambiguous. Leads to rework.
**Concept:** Typed templates, auto-applied via `council.mjs add --type X`:
- ENGINE-FIX: tests pass, no benchmark regression, docs updated
- UI: 390px check passes, no console errors, accessibility audit
- DATA: schema validated, sample queries run, lineage documented
- "Done when:" with 1–3 criteria (not rigidly 3; simple items need 1, complex need verifiable checks).
- Each criterion must be checkable (command + expected output), e.g. "Done when: `node tools/council.mjs show P-005` prints REVIEWED by two seats."
- Required for P0/P1 and items with concrete deliverables. Optional for P2/P3 (brief suffices).
**Reviewer refinements:**
- OR: Typed by category (not generic "(1)___, (2)___, (3)___").
- Beam: Optional except P0/P1. Overhead concern is real for 168 items. Require ≥1 verifiable check when present.
- VL: 1–3 criteria, not exactly 3. Each checkable.
**Ask:** Approve typed + scoped + flexible?
**Success:** Zero "is it done?" disputes per month.

## Tier 2: High Value (Revised per VL)

6. **150-line rule → focused-read guidance.** VL: hard 150-line cap is wrong (some functions legitimately exceed it; invites gaming). Codify as guidance: "default to focused grep/read of the specific function; read the whole file when the task needs architecture, duplication, dependency, or integrity checks; state the reason." Add to START-OF-CHAT §2 or §9.
7. **"Needs approval" obvious.** VL: don't create separate `--needs-approval`; `board` already shows BLOCKED() prefix. Make blocked items visually distinct in default board + add `board --blocked`. Beam: merge with #44. Adopt: single implementation.
8. **Engine diff tool (read-only).** VL: scope to read-only lane tool (`tools/engine-diff.mjs`) diffing architect/engine-and-seats vs council/base, grepping changed anchors. Council proposes; Architect decides whether to adopt. (Seats don't write product file.)
9. **Auto-generate filenames.** All reviewers: ok. Beam verified `put()` already generates names. Just document in inbox/README.
10. **Define "can do well."** All reviewers: ok. One line in START-OF-CHAT §3.

## Tier 3: Accepted with Modifications

Per VL's detailed review (all items ok/improved except 5 rejected below):
- #11 plain language: ok (already AGENTS.md §3; codify as seat norm)
- #14 example-driven docs: improved (require ≤10KB static HTML mock for UI P-items)
- #15 templates by type: improved (add one-line `TYPE:` field to inbox headers for filtering)
- #16 "why" field: ok (doc convention)
- #17 standardized lanes: improved (update TEMPLATE-LANE.md with standard sections)
- #19 last-touched: improved (expose `touched` in board output; already tracked)
- #20 shipped vs complete: improved (add SHIPPED as retired why; don't rename existing states)
- #21 auto-link: improved (auto-emit RELATED: in show/digest via needs arrays)
- #22 async default: ok (codify in START-OF-CHAT)
- #23 stuck format: ok (pairs with #1)
- #24 5-minute rule: ok (codify in START-OF-CHAT)
- #26 review checkboxes: improved (enforce existing AGENTS.md §5 patch form, don't add new checkboxes)
- #27 specific feedback: ok (codify in COUNCIL.md)
- #28 owner directive template: ok (doc convention)
- #29 BLOCKING → rename PENDING-ARCHITECT (avoid conflation with `blocked` dependency state)
- #30 IDEA prefix: ok (already used; part of #1)
- #31 category tags: improved (optional TAGS: field; `board --tag X` filter)
- #33 ack: ok (already exists)
- #34 --help: ok (expand header text)
- #35 auto-assign IDs: improved (derive from PRIORITIES.md max+1; allow override)
- #36 sunset mark files: improved (ensure retired items keep OP file; show reason)
- #37 sunset appeal: improved (revive IS the appeal; no 90-day cooldown needed)
- #38 sunset search: ok (add `board --retired`)
- #40 session brief: ok (`next --brief` flag)
- #41 search: ok (`board --search <term>`)
- #43 plain-language renames: ok (Architect approval + update all refs)

## Subtracted (Rejected by Reviewers)

- **#12 one-line setup:** VL rejected as duplicate (AGENTS.md §4.2 already defines `tools/new-seat-worktree.sh`). Resolution: no new script; document existing in START-OF-CHAT §1.
- **#18 health dashboard:** VL rejected (overhead; digest+board already surface health; would rot). Beam's "defer to P2" noted but VL's rot concern wins.
- **#25 challenge priority:** VL rejected (AGENTS.md §5: Architect owns ranking). Seats can already note via inbox.
- **#32 release work gracefully:** VL rejected as vague; Beam's "WIP commit + lane note" is already END-OF-CHAT. No new mechanism.
- **#39 merge board/next:** VL rejected (different concerns: board=global, next=personal). Beam agrees (keep separate; add `next --board` shortcut instead).

## New Ideas (Beam's 10)

45. **Preflight one-liner.** `node tools/preflight.mjs`: preserve check + board count + last commit + lane size, 5 lines. Replaces 3 session-start commands.
46. **Review skeleton generator.** `council.mjs review-skeleton <file>`: creates inbox file with headers + "What I checked" stub. Prevents malformed reviews.
47. **PRIORITIES diff.** `council.mjs priorities-diff [--since <commit>]`: added/retired items since ref. Amnesiacs currently re-read whole table.
48. **Quiet next.** `next --quiet`: only top action line.
49. **Review quality in board.** Append each seat's unique-catch rate to board output. Surfaces rubber-stamping.
50. **Auto-archive applied ops.** Inbox RETIRE/KEEP/PROBE files older than 14d, effect reflected in derived state → `_archive/inbox/`. Keeps inbox scannable.
51. **Lane size guard.** `council.mjs lane-check`: warns if lane >250KB, lists largest files.
52. **Session delta.** `next --delta`: reads lane "as of" date, shows newer inbox files.
53. **Validation on push.** Optional pre-push hook: check-tasks.mjs + inbox filename regex.
54. **One-screen digest.** `council.mjs mine`: my pending reviews + my authored items' status + my unanswered asks.

## Notes
- Beam's weakest-point critique adopted: success metrics now reference measurable sources (counts via board --search, board --json).
- VL's Tier 1 review (from his header): 1 improved, 2 ok, 3 improved, 4 improved, 5 improved; none rejected.
- Beam added 2 P3 items to queue (preflight one-liner, review skeleton generator).
- Beam offers to implement council.mjs changes once Architect approves concepts.
