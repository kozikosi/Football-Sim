# V21 Flow Audit — Load → Draft → Season → Playoffs → Super Bowl

**SPEAKER:** Ultra | **ROLE:** Council Advisor (Nemotron-3-Ultra) | **TASK:** V21 interaction-flow audit | **DATE:** 2026-10-21T10:00:00Z

---

## State Pin (VERIFIED)

| Item | Value |
|------|-------|
| Branch | `gpt/council-reliability-scorecard` |
| HEAD | `4558e81106c341446d19334bd67c01e7fa01c000` |
| Artifact | `merged.html` (657,486 B) |
| SHA-256 | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| Build Identity | **V20 merge candidate** (not V21) |

---

## Complete Click Path (VERIFIED)

| Step | Phase | Control ID | Visible Label | Action | Receipt |
|------|-------|------------|---------------|--------|---------|
| 1 | Load | — | — | Page loads, "Start Draft" visible | Snapshot 1 |
| 2 | Draft | `#startDraftBtn` | **Start Draft** | Click → Draft board appears | Snapshot 2 |
| 3 | Draft | `#simToEndBtn` | **Sim to End** | Click → Draft completes (832 picks) | Snapshot 3 |
| 4 | Draft Complete | `#resultsSeasonBtn` | **Season** (tab) | Click → Season landing | Snapshot 4 |
| 5 | Season Landing | `#startSeasonBtn` | **Start Season** | Click → Preseason setup | Snapshot 5 |
| 6 | Preseason | `#beginSeasonBtn` | **Begin the season →** | Click → Week 1 appears | Snapshot 6 |
| 7 | Week 1 | `#simSeasonBtn` | **Sim Rest of Season ▸ Review** | Click → Regular Season Review | Snapshot 7 |
| 8 | Regular Season Review | `#simPlayoffsBtn` | **Sim Playoffs** | Click → Super Bowl completes | Snapshot 8 |
| 9 | Super Bowl | — | **Season Review →** | (Auto) Champion crowned | Snapshot 9 |

---

## Step Count

**Total clicks for complete draft→championship playthrough: 8 clicks**

| Phase | Clicks |
|-------|--------|
| Draft | 2 (Start Draft, Sim to End) |
| Draft → Season | 1 (Season tab) |
| Season → Preseason | 1 (Start Season) |
| Preseason → Week 1 | 1 (Begin the season →) |
| Week 1 → Season Review | 1 (Sim Rest of Season ▸ Review) |
| Season Review → Playoffs | 1 (Sim Playoffs) |
| **Total** | **8** |

---

## Stall Points (Where User Could Get Stuck)

| Location | Issue | Severity | Evidence |
|----------|-------|----------|----------|
| **After Draft Complete** | "Season" is a **tab**, not a button. User sees "Draft Complete" + "Start a new draft…" but no obvious "Play Season" button. Must discover "Season" tab in bottom nav. | **HIGH** — Most likely stall | Snapshot 3: Only "Start a new draft…" button visible; "Season" is a tab in bottom nav with no visual affordance as "next step" |
| **After Season Tab** | "Start Season" button is at **bottom of long page** (below 32-team rankings table). User must scroll past full rankings to find it. | **MEDIUM** | Snapshot 4: Button at y=754, below 32-row table |
| **Preseason Page** | "Begin the season →" button is at **very bottom** of extremely long page (y=0 in snapshot, but page height 7483px). User must scroll through 26 lineup dropdowns, coaching philosophy, aggressiveness, etc. | **MEDIUM** | Snapshot 5: Button at bottom of 7483px page; 26 lineup dropdowns above it |
| **Week 1 Screen** | Button label **"Sim Rest of Season ▸ Review"** is ambiguous. Does it simulate one week or all? The "▸ Review" suffix suggests it jumps to review, but user might expect "Simulate Week 1" (which exists as separate button). | **LOW-MEDIUM** | Snapshot 6: Two buttons: "Simulate Week 1" and "Sim Rest of Season ▸ Review" — purpose not immediately distinct |
| **Regular Season Review** | **"Sim Playoffs"** button is clear and prominent. No stall observed. | **NONE** | Snapshot 7: Button prominently at top |

---

## Dead Ends

| State | Description | Recovery |
|-------|-------------|----------|
| **None found** | Every screen has at least one visible forward action. No true dead ends. | — |

---

## Control Label Mismatches

| Control ID | Label | Actual Behavior | Mismatch |
|------------|-------|-----------------|----------|
| `#simSeasonBtn` | **Sim Rest of Season ▸ Review** | Simulates all remaining weeks + goes to Regular Season Review | "▸ Review" suffix suggests it only goes to review, but it actually simulates first |
| `#resultsSeasonBtn` | **Season** (tab) | Opens season landing page | Tab masquerades as "next step" button — no visual distinction |

---

## Single Most Likely Stall Point

> **After Draft Complete — the user sees "Draft Complete" and "Start a new draft…" but no obvious "Play Season" button. The "Season" tab in the bottom navigation is the only forward path, but it looks like a navigation tab, not a "next step" button.**

**Evidence (VERIFIED):**
- Snapshot 3 (Draft Complete): Only interactive element is "Start a new draft…" button (id `#newDraftBtn`)
- The "Season" tab (`#resultsSeasonBtn`) is in the bottom navigation bar (`y=267`), visually separated from the draft completion message
- No "Play Season" or "Continue to Season" button on the draft completion screen
- User must recognize that the bottom navigation tabs are the phase progression mechanism

**Why this is the #1 stall:** The draft completion screen is designed as an endpoint ("Your draft is in the books"), but the only forward path is a navigation tab that doesn't visually signal "this is what you do next." A first-time user who just finished a 20-minute draft will see a completion screen with a "Start a new draft" button and no obvious "Play the season" call-to-action.

---

## Step Table

| # | Phase | From | To | Control | Label | Clicks |
|---|-------|------|----|---------|-------|--------|
| 1 | Load | — | Draft Setup | `#startDraftBtn` | Start Draft | 1 |
| 2 | Draft | Draft Setup | Draft Complete | `#simToEndBtn` | Sim to End | 1 |
| 3 | Draft Complete | Draft Complete | Season Landing | `#resultsSeasonBtn` | Season (tab) | 1 |
| 4 | Season Landing | Season Landing | Preseason | `#startSeasonBtn` | Start Season | 1 |
| 5 | Preseason | Preseason | Week 1 | `#beginSeasonBtn` | Begin the season → | 1 |
| 6 | Week 1 | Week 1 | Season Review | `#simSeasonBtn` | Sim Rest of Season ▸ Review | 1 |
| 7 | Season Review | Season Review | Super Bowl | `#simPlayoffsBtn` | Sim Playoffs | 1 |
| 8 | Super Bowl | Super Bowl | Champion | — | (auto) | 0 |

**Total: 8 clicks**

---

## Receipts

| Snapshot | Phase | Key Evidence |
|----------|-------|--------------|
| 1 | Initial Load | `#startDraftBtn` visible, "Start Draft" label |
| 2 | Draft Board | `#simToEndBtn` visible, "Sim to End" label |
| 3 | Draft Complete | `#newDraftBtn` only button; `#resultsSeasonBtn` in bottom nav |
| 4 | Season Landing | `#startSeasonBtn` at y=754 (below rankings) |
| 5 | Preseason | `#beginSeasonBtn` at bottom of 7483px page |
| 6 | Week 1 | `#simSeasonBtn` ("Sim Rest of Season ▸ Review") + `#simWeekBtn` ("Simulate Week 1") |
| 7 | Season Review | `#simPlayoffsBtn` ("Sim Playoffs") visible |
| 8 | Super Bowl | Champion crowned (NY Giants 30-24 vs BAL) |
| 9 | Champion | "Season Review →" button appears |

---

## Conclusion

**The single most likely stall point is after Draft Complete.** The completion screen presents "Start a new draft…" as the only prominent button, while the only forward path (the "Season" tab) is visually indistinguishable from other navigation tabs and carries no "next step" signaling.

**Recommended fix:** Add a prominent "Play Season →" or "Continue to Season →" button on the Draft Complete screen, or visually highlight the "Season" tab as the active next step (e.g., pulse animation, badge, or "Next: Season" label).

---

**END OF FLOW AUDIT**

SPEAKER: Ultra | ROLE: Council Advisor (Nemotron-3-Ultra) | TASK: V21 interaction-flow audit | DATE: 2026-10-21T10:30:00Z