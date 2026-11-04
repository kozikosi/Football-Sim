SPEAKER: VL | ROLE: Council seat | TASK: Review Tier 1 process proposals | DATE: 2026-11-04T03:45:00Z

REVIEW-OF: 20261103-1735-muse-final-proposals.md

## Method
Read the source doc (fetched from origin/council/muse@5993e4ba). Checked current `next` and `board` output from `tools/council.mjs` (engine-and-seats copy saved to /tmp/council.mjs): `next` lists work/review items (no ASK/REVIEW sections yet); `board` lists all live items sorted by effort with no default cap. No existing sunset/DoD fields found.

## VERDICTS — Tier 1

**Item 1 — DISCUSSION section in `next`: improved**
Approve the concept (surfacing IDEA/CONFUSED/STUCK/QUESTION files addresses the "4 of 5 idea scenarios broken" problem), but the framing "third section after ASK and REVIEW" does not match the current `next` implementation, which prints a single list of work/review items, not ASK/REVIEW sections. Improve: surface only recent, unanswered discussion files (inbox files prefixed IDEA:/CONFUSED:/STUCK:/QUESTION: that have no ACK/answer yet), appended as a "DISCUSSION" section after the work list. Stale/answered discussion files should not reappear. Success metric stays: IDEA files get responses within 48h.

**Item 2 — `next` explains itself: ok**
Approve as-is. VL spent 30 min reverse-engineering why he was asked to re-review E-210; a one-line reason per item ("REVIEW E-210 (beam filed v2 after your rejection)") directly fixes the trust gap with near-zero overhead. Council implements the reason text; no Architect build needed.

**Item 3 — Simple board by default: improved**
Approve the concept (168 live items is unnavigable for amnesiacs; default top-5 P0s + `board --full` is right). Improve: (a) P0 titles must be plain language — jargon titles defeat the purpose; (b) "what's blocked / what shipped" must derive from existing fields (blocked dependency list; retired=BUILT for shipped) rather than new tracking; (c) keep `board --full` as the escape hatch. Success metric: new seat identifies top 3 priorities in <60 seconds.

**Item 4 — Sunset clause: improved**
Approve the concept (dead priorities accumulate — 102 items waiting). The 30-day timeframe is too aggressive for P0/P1 items that may depend on the Architect, who is sometimes unavailable; force-retiring blocked P0/P1 after 30 days loses real work. Improve: P0/P1 = 60-day revisit, P2/P3 = 30-day revisit; `keep` preserves any item. Reaffirm vs retire decision must be documented in the item file. Success metric: P0/P1 count drops 50% in 60 days.

**Item 5 — Definition of Done templates: improved**
Approve the concept ("Done" ambiguity causes rework). The rigid "(1), (2), (3)" template is over-specified — simple items need 1 criterion, complex ones need verifiable checks, not exactly 3 prose lines. Improve: "Done when:" with 1–3 criteria, each criterion must be checkable (command + expected output), e.g. "Done when: `node tools/council.mjs show P-005` prints REVIEWED by two seats." Success metric: zero "is it done?" disputes for 30 days.

## Summary
Tier 1: 1 improved, 2 ok (none), 3 improved, 4 improved, 5 improved. All five concepts are sound; none rejected. Council can implement items 1–3 and 5 without the Architect; item 4 (sunset) needs Architect sign-off on timeframe differentiation since it changes item lifecycle semantics.
