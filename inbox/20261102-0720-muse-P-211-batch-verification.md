SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-211 (self-assigned) | DATE: 2026-11-02T07:20:00Z

FOR: P-211

# Batch verification: V23 text-removal/UI items vs the shipped build

## Method

Script extracted every quoted string (3–80 chars) from each live P0/P1 item's title + council-work columns and counted occurrences in `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B). 135 P0/P1 items scanned; 75 had quotable strings.

**What the counts prove:** a "remove X" item with X present ≥1x in render code is STILL OPEN (strong signal). A "remove X" item with X at 0x is a CANDIDATE BUILT — absence is weaker evidence (could be reworded, or the page may not exist in this build). Anything needing render-time, responsive, or color judgment is UNCLEAR. **No item is marked for RETIRED here** — candidates need Owner/Architect confirmation per the new protocol.

Spot-checks performed: "undefined" (14x) is all `typeof x !== 'undefined'` JS guards — NOT rendered text, so P-167's complaint is unconfirmed by this method. "Stars (85+ OVR)" confirmed inside a rendered `<div>`. "No picks yet." confirmed in two JS render fallbacks. "by your next pick" confirmed in a column header + tooltip.

## Verdicts

### STILL OPEN (14) — target text present in the build

| ID | Evidence |
|---|---|
| P-043 | "Stars (85+ OVR)" 1x, "★★ must-fill (Priority ×1.5)" 1x, "★ normal" 1x, "☆ low (×0.5)" 1x, "Click a star to change it" 1x — star system not removed |
| P-061 | "★★ must-fill" 1x, "★ normal" 1x, "☆ low" 1x — same star system, draft-board section |
| P-075 | "No picks yet." 2x in render fallbacks |
| P-048 | "Play a Season" 2x — panel text not removed |
| P-056 | "Season options" 1x — text not removed |
| P-153 | "Sort:" 8x, "Drafting as" 1x — both should be gone per item |
| P-155 | "Draft Complete" 1x — should be removed (partial; "Play the season." 2x present, cinematic unverified) |
| P-156 | "CPU draft" 1x, "Every Starter, Graded vs. the League" 1x — both should be removed (partial) |
| P-143 | "When to wait" 1x, "Where the wins come from" 2x, "Who decides" 1x, "Football and site terms" 1x, "Do not forget you can flex" 1x — guide text not removed |
| P-144 | "What is a flex" 2x, "Where the wins come from" 2x — should be replaced by the graphic |
| P-176 | ", on offense and on defense. It names your team's style all season, and" 1x, "The label stays the same" 1x, "Why we recommend Auto" 1x — copy not rewritten (partial) |
| P-145 | "BASE" 28x — item says remove the word (partial; hover text also absent) |
| P-166 | "Touchdown" 2x in log output — item says never print the word |
| P-125 | "Start A New Draft" 0x — button does not exist; item asks for it to be added |

### CANDIDATE BUILT (23) — all target strings at 0x; needs Owner/Architect confirm

P-044, P-050, P-052, P-054, P-055, P-057, P-059, P-060, P-063, P-069 ("see guide for details" 0x), P-107 ("setup used" 0x; "Personnel" 5x present as the rename target), P-108 ("model 22.9" 0x), P-115, P-116 ("(game ball)" 0x), P-121, P-160 (all eight strings 0x), P-161, P-162, P-163, P-170, P-171, P-172, P-183 ("see guide for details" and "Back to Simulator" both 0x).

### UNCLEAR (13) — string check cannot decide

| ID | Why |
|---|---|
| P-076 | "by your next pick" 2x present, but the item is about *responsive hiding* on compress — needs a render check |
| P-077 | "Can you go 20-0?" / "20-0?" 0x — item says KEEP it shimmering; absent text leans STILL OPEN but the page may not exist in this build |
| P-078 | color change ("Math's pick"), not a string removal |
| P-117 | all strings 0x — could be BUILT (removed from wrong places) or the pages don't exist here |
| P-124 | "Try again to 20-0?" 0x — same ambiguity as P-117 |
| P-047 | header text 0x — item wants it present; absent leans STILL OPEN |
| P-152 | "R1.31" 0x — format string may differ |
| P-164 | "Play the <opponent name>" 0x — template placeholder, never literal |
| P-165 | "TB 29-34 NO" etc. 0x — example formats, never literal |
| P-167 | "undefined" 14x all in JS guards — needs a render check for visible "undefined" |
| P-168 | "balanced" 34x is a common word — can't isolate the game-plan lines by grep |
| P-169 | "Play the Titans" 0x — example text |
| P-046 | "Pick priority" 1x present — item is about *green color* in the menu, not the string |

### NOQUOTES (60) — no quotable strings; needs manual review

P-007, P-008, P-010, P-012, P-013, P-014, P-016, P-017, P-021, P-022, P-023, P-040, P-041, P-051, P-053, P-058, P-062, P-064, P-067, P-068, P-071, P-073, P-074, P-079, P-100, P-101, P-102, P-103, P-104, P-105, P-109, P-110, P-111, P-112, P-113, P-118, P-119, P-120, P-122, P-123, P-128, P-131, P-140, P-141, P-173, P-174, P-175, P-185, P-186, P-187, P-190, P-191, P-192, P-193, P-194, P-195, P-196, P-198, P-199, P-200, P-201, P-202, P-203, P-204, P-205, P-206, P-207. (P-208+ are new and live by definition.)

## Recommended next steps

1. Owner/Architect confirms the 23 CANDIDATE BUILT items (spot-check 3–4; if they hold, the rest can move to RETIRED as BUILT in one edit).
2. The 14 STILL OPEN items stay live — several (P-043/P-061, P-143/P-144, P-153) cluster into natural work bundles.
3. The 13 UNCLEAR items need render-time checks (390px + desktop) — a Playwright pass, or Z.ai's eyeballs during the next wave.
4. The 60 NOQUOTES items need a second triage method (behavioral, not textual).

## Evidence labels

- VERIFIED: the occurrence counts (script output above; re-runnable), the four spot-checks
- INFERRED: the verdict interpretations (absence ≠ built; presence in render code = open)
- REPORTED: none

Script: inline python in this session (extraction + counting); raw output saved at `/tmp/p211_raw.txt` on the MUSE worktree (ephemeral — the table above is the record).
