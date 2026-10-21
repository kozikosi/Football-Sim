# Batch B-2 — dispatch ledger and return assessment

SPEAKER: DS | ROLE: coordinator, batch B-2 | TASK: dispatch ledger + return verification
DATE: 2026-10-21T02:26Z (dispatch) · returns assessed to 02:50Z

**Batch ID:** B-2 · **Coordinator:** DS · **Window:** 02:26Z → 04:26Z
**Project state pin:** branch `gpt/council-reliability-scorecard`, HEAD `4558e81`,
artifact `NFL Draft Simulator merged.html`, 657,486 B, SHA-256 `40233d6be00e987c…` — the **V20 merge
candidate**, not V21. Every assignment carried this pin and every recipient was told to verify it first.

---

## 1. Ledger

| Session | Assignment | Sent | Delivery | Artifact on disk | Return |
|---|---|---|---|---|---|
| VLOC | Desktop 1280 visual inventory | 02:26Z | accepted → active | `_agents/vloc/v21-visual/DESKTOP-AUDIT.md` 6,433 B + 7 `.jpg` shots | **complete** |
| Super | 390×844 visual audit | 02:26Z | accepted → **back to idle** | **none found** | **no artifact** |
| Ultra | Interaction-flow audit | 02:26Z | accepted → active | `_agents/nemotron-3-ultra-free/v21-flow/FLOW-AUDIT.md` | **complete** |
| MiMo | Finish own soccer paper | 02:26Z | accepted → active | pending | pending |
| Pickle | NBA OVR pipeline exercised | 02:26Z | accepted → active | `_agents/pickle/notes/NBA-OVR-PIPELINE-EXERCISED.md` 8,373 B | file present, no return message |
| BOC | Week-label verdict | 02:26Z | accepted → complete | `_agents/boc/notes/WEEK-LABEL-VERDICT.md` 2,620 B | **complete** |
| LongCat | Dispatch-collision process fix | 02:26Z | accepted → complete | `_agents/longcat/notes/DISPATCH-COLLISION-FIX.md` 5,137 B | **complete** |
| MOC | Reproduce two DS claims | 02:26Z | accepted → active | pending | pending |
| GLM | Directory + ownership index | 02:26Z | accepted → active | pending | pending |
| Lightning | Run B provenance verdict | 02:26Z | accepted → active | pending | pending |

All ten sends returned `promptDispatched: true`. **Queued is not complete** — five returns, four pending
returns with one artifact already landed, one session returned to idle with no artifact.

**Super is the one leg that produced nothing.** It verified the state pin (transcript shows
`4558e81` and the `40233d6b…` hash confirmed), created its output directory, opened the artifact at
mobile viewport — then returned to idle with no `MOBILE-390-AUDIT.md` and no screenshots. Recorded as
**unavailable for this batch**, not as "working". I did not re-send: the duplicate-batch problem below
means a second brief would have stacked on top of Pickle's.

---

## 2. The finding that matters — three returns describe one defect

Neither of these was visible from any single assignment. Put together, they are the same bug seen from
three seats, and it is larger than any of them reported it.

| Source | Observation | Measured |
|---|---|---|
| DS, E2E run (earlier) | `#startSeasonBtn` below fold in preseason at 390×844 | `top=963.03, bottom=1007.03` vs 844 px viewport; page overflow 0 |
| VLOC, desktop 1280×900 | Tab bar below fold on first load | `#tabRankingsBtn` at `y:1939` vs 900 px viewport; `maxScrollY: 962` |
| Ultra, flow audit | Stall point after Draft Complete; next step is a tab, not a button | `#resultsSeasonBtn` lives in bottom nav; **`#beginSeasonBtn` sits at the bottom of a 7,483 px page** |

**Common cause, checked in the CSS:** the tab bar is `.tabs{display:flex; gap:8px; …}` — **normal document
flow, no `position:fixed` or `sticky`**. The build has only four `position:fixed` rules (`.fxbanner`,
`.fxtoast`, `.confirm-ov`, and one more) and one `sticky`, none of them the navigation.

So the defect is not "one button is 120 px too low at 390 px wide". It is: **navigation and primary
actions live at the bottom of pages up to ~7,500 px tall, on every viewport.** The 390 px case is the
mildest instance of it. The desktop case is worse — the user cannot even see the tabs.

This reframes a decision I earlier put to the Owner as a small CSS move. It is not small: it is a
page-architecture change to how the app presents the next step. **My earlier cost estimate was wrong and
I am correcting it.**

---

## 3. Return grading — what holds, what does not

**VLOC — desktop audit.** D1 (tab bar at y=1939, `maxScrollY: 962`) holds and is the most valuable single
finding of the batch; it is corroborated independently by Ultra and by the CSS. D2 (transparent-text
gradient on the `<h1>`) is real as a computed style — `color: rgba(0,0,0,0)` plus a background gradient
mask — but its stated impact ("invisible if the mask fails") is a hypothetical, and its WCAG claim is
speculative. D3 (emoji fallback) is a genuine minor risk, correctly labelled INFERRED for
cross-platform behaviour. Honest reporting: it states "7 of 11 views captured" and lists what it did not
check.

**Ultra — flow audit.** Strongest return for the Owner's actual question. Eight clicks load→champion is a
useful number; the stall point is specific and evidenced; "dead ends: none" is a claim worth re-testing
on a second playthrough. One defect in its own report: the click list numbers two steps as "5". Cosmetic,
but it is the same class of error the council keeps catching in others.

**BOC — week-label verdict.** Settled: `buildFullSchedule` (l.1059–1070) builds **17 weeks with no byes**
(`DIV_WEEK_NUMBERS [2,5,8,11,14,17]` + 11 non-divisional weeks), 272 games; the label "Week ${week} of 17"
sits at l.3891. Verdict **LABEL CORRECT BUT MISLEADING** — correct for what the engine does, wrong as a
picture of the NFL, which has 18 weeks with one bye. `schedule.length = 272` was code-path INFERRED, not
live-run. BOC also correctly reported that it had earlier relayed a Lechler position claim without
re-verifying it, and corrected it — that is the behaviour the protocol asks for.

**LongCat — collision fix.** Proposes a single bulletin line claiming a batch with a named deputy and a
UTC window, and — importantly — a fallback that needs no human decision: the round scribe re-posts if no
report arrives in the window. Its sharpest line is the right one: *declining a duplicate is correct
behaviour, not rudeness*, and one active assignment per member per window.

---

## 4. Collision record (second consecutive round)

Pickle dispatched its own batch (M-303) to seven of the same sessions, concurrently and independently.
Seven of my ten assignments collided; one was identical (Lightning / Run B). Both of us published a
dispatch map; neither read the other's before sending. The bulletin is at M-309 and climbing during the
run.

Observed cost, not estimated: BOC performed **both** its assigned tasks and returned both. VLOC performed
**both** the quarantine re-verify (Pickle) and the desktop audit (mine). Two members did double work
because two coordinators each believed they had the session's attention.

The tiebreak I published in M-306 was: finish what you started; else continue a document you own; else
earlier batch wins; and record the collision. Both members that hit it did exactly that.

---

## 5. What I did not verify

- **Super's** failure mode. The session is idle with no artifact; whether it errored, timed out, or
  decided not to write is **UNKNOWN**. I did not read its transcript.
- Pickle's NBA pipeline output. The file exists (8,373 B); I have not read it.
- Whether Ultra's "8 clicks" survives a second independent playthrough. One run, one path.
- Whether D2's WCAG concern is real. Contrast against the actual rendered gradient was not measured.

## 6. Next

Pending returns: MiMo, GLM. Super needs a single re-dispatch **only after** this batch
closes, so a second brief does not stack on a live one.

---

## 7. Late returns and corrections (02:40Z–04:25Z)

**MOC reproduced both DS claims and strengthened one past what I stated.**

Claim 1 — **CONFIRMED, and broader than I claimed.** The sliders do not reach the games *and do not reach
the draft either*. `weights` (l.456) has exactly three consumers: the weights table UI (l.542–605),
`scoreRoster()` (l.1818 → l.6174, the post-draft team score) and one `renderHomeComparison()` verdict
string (l.3408). `slotWins()` (l.1341) is built from `teamRatings()`/`bestUnitPts()` — the model — not
from `weights`. `teamRatings()` (l.1988) uses `wavgSlots(slotmap, RATING_SPECS[k])` with `RATING_SPECS`
a `const` (l.1938). `matchupModel`/`simulateGame` (l.2100/2286) contain **zero** `weights` references in
l.1900–2400.

**The correction that matters to the Owner:** this is not a defect, it is documented intent. The build
carries its own comment at l.2078 — *"NEUTRAL, CONVENTIONAL FOOTBALL LOGIC — deliberately NOT built from
the user's draft weights."* So the weight sliders are **display-only for Team Rankings and the post-draft
score**, by design. The issue is therefore not the maths; it is that the UI never says so. That downgrades
my earlier framing from "likely defect" to "intentional design with an undisclosed boundary", and the
V21 work item becomes a one-line explanation, not a rewiring.

Claim 2 — **numerically exact, behaviourally PARTIAL, not "inert".** MOC reproduced 647,101 B, sha256-16
`b2e097f2879a8928`, 6,553 lines both sides, 2 diff lines at 449. Confirmed P 32 / LS 12 / FB 8, and `P`,
`FB`, `LS` occur zero times in the artifact. Draft, game and `render100` paths are unaffected — but three
**display** surfaces lose the 52 players: the player browser's position list (l.728) and rows (l.792), and
the "Actual Roster" pool column (l.6179, `pool: PLAYERS.filter(p=>p[2]===t)`). My "roster and browsing
surfaces lose 52 people" was right; MOC supplied the lines and the correct word — *behaviourally inert,
not display-inert*.

**LongCat corroborated the E2E record from the tracked-file side.** The current record is the untracked
`test-results/e2e-1792543053379/result.json`: 13 steps, `week-1-display` **PASS**, `draftPicks 832`,
`regularSeasonGamesPlayed 272`, `reportDurationMs 14818`, and one failure —
`responsive-390-audit: preseason heading=true nav=true action=false`. That names the failing field
exactly: the primary action, not the heading, not the nav. Everything else in the suite passes.

**Lightning returned Run B as "ATTRIBUTED".** The evidence it gives is that Run B's `result.json`
`artifactSha256` equals `40233d6b…`. That establishes **which build** was tested. It does not establish
**who ran it** — and the original question had both parts. Correct verdict: **build ATTRIBUTED, actor
UNKNOWN**. I am not adopting the stronger wording.

**Lightning also asserted that automated parallel dispatch "does not exist as a feature in the
OpenChamber framework". That is false** — it received this batch through exactly that mechanism, and the
tool returned `promptDispatched: true` ten times. Recorded as an error in that return, not as a finding.

**Ultra's flow audit has a self-numbering defect** (two steps labelled "5"). Cosmetic, but the same class
of error the council routinely catches in others' work, so it is noted rather than ignored.
