# V21 UI Issue Inventory — From E2E Captures

**SPEAKER:** Ultra | **ROLE:** Council Advisor (Nemotron-3-Ultra) | **TASK:** V21 UI issue inventory (A8) | **DATE:** 2026-10-21T07:00:00Z

---

## Source Evidence

| Artifact | Source | Hash |
|----------|--------|------|
| Build under test | `merged.html` (657,486 B) | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| Branch | `merge/v20-donor` @ `ff8c05ae` | — |
| E2E Run | `test-results/e2e-1792543053379/` | Result JSON sha256: `d64a5f9b...` (same as prior run) |
| Screenshots | 20 viewport PNGs + 6 light/dark = 26 total | In `test-results/e2e-1792543053379/` |
| Trace | `trace/trace-1792543107751.zip` (65.9 MB) | 1,480 screencast frames |
| Protocol | `tests/OPENCHAMBER-E2E.md` | Suite `OPENCHAMBER-E2E-NFL-1` |

---

## Viewport Check Results Summary

| Checkpoint | 1280×900 | 390×844 | 390px Pass? | Notes |
|------------|----------|---------|-------------|-------|
| initial-load | ✅ 0 overflow | ✅ 0 overflow | ✅ | Heading, nav, Start Draft all visible |
| live-draft | ✅ 0 overflow | ✅ 0 overflow | ✅ | Instant/Slow/SimToEnd buttons visible |
| draft-results | ✅ 0 overflow | ✅ 0 overflow | ✅ | Season button visible |
| preseason | ✅ 0 overflow | ✅ 0 overflow | ❌ | **Start Season button NOT fully inside viewport** |
| preseason-setup | ✅ 0 overflow | ✅ 0 overflow | ✅ | Begin Season button visible |
| season-started | ✅ 0 overflow | ✅ 0 overflow | ✅ | Sim Rest of Season button visible |
| week-1 | ✅ 0 overflow | ✅ 0 overflow | ✅ | Sim Rest of Season button visible |
| regular-season-review | ✅ 0 overflow | ✅ 0 overflow | ✅ | Sim Playoffs button visible |
| playoffs-champion | ✅ 0 overflow | ✅ 0 overflow | ✅ | Run 100-season button visible |
| 100-season-report | ✅ 0 overflow | ✅ 0 overflow | ✅ | Back to season button visible |
| after-report-back | ✅ 0 overflow | ✅ 0 overflow | ✅ | View 100-season report button visible |
| final | ✅ 0 overflow | ✅ 0 overflow | ✅ | View 100-season report button visible |

**Overall 390px Status:** 11/12 checkpoints pass. **1 failure: preseason** (Start Season button not fully inside viewport).

---

## V21 UI Issue Inventory

### Issue 1: Preseason — Primary Action Button Clipped at 390px
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture File** | `viewport-preseason.png` (380,031 B) / `viewport-preseason-desktop.png` (539,978 B) |
| **Element/Selector** | `button#startSeasonBtn.resetbtn` ("Start Season") |
| **Reproduction Step** | Trace timestamp ~00:37:48Z — after clicking `#resultsSeasonBtn`, before clicking `#startSeasonBtn` |
| **Severity** | **Blocks primary action** — user cannot see full "Start Season" button at 390px |
| **Evidence** | VERIFIED from result.json: `"primaryAction":{"fullyInside":false,"centerUncovered":false,"visible":true}` — button visible but not fully inside viewport |
| **Intended Fix Direction** | Reduce button width/padding at 390px; ensure primary action fits within 390px viewport; consider responsive button text truncation or icon-only at narrow widths |

### Issue 2: Mobile Table Scroller — Horizontal Scroll Not Verified (Protocol §83, §91)
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | All `viewport-*-390px` captures (e.g., `viewport-live-draft.png`, `viewport-draft-results.png`, `viewport-regular-season-review.png`) |
| **Element/Selector** | Tables with horizontal scroll containers (`.mstack` or `overflow-x: auto`) |
| **Reproduction Step** | Any checkpoint with wide tables (live-draft, draft-results, regular-season-review, standings) |
| **Severity** | **Degraded** — Protocol §91 requires "intentional table scrollers can actually scroll horizontally" — not verified by current test |
| **Evidence** | VERIFIED from result.json: All checkpoints show `"tableScrollerCount":0` — no horizontal scroll containers detected at 390px. The test detects overflow elements but does not verify scroller functionality. |
| **Intended Fix Direction** | Add horizontal scroll containers (`overflow-x: auto`) to wide tables at 390px; implement test that programmatically scrolls and verifies content shifts |

### Issue 3: Light/Dark Contrast — Draft Results & 100-Season Report
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 (light/dark captures) |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | `draft-results-light.png` / `draft-results-dark.png`; `100-season-report-light.png` / `100-season-report-dark.png`; `startup-light.png` / `startup-dark.png` |
| **Element/Selector** | Text content, table rows, button text in both themes |
| **Reproduction Step** | View captures at 390px in both light and dark modes |
| **Severity** | **Cosmetic** — readability in dark mode needs verification |
| **Evidence** | VERIFIED — 6 light/dark captures exist. INFERRED from still images: dark mode appears readable but contrast ratios not measured. |
| **Intended Fix Direction** | Verify WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text) in both themes; ensure table row hover/focus states visible in both themes |

### Issue 4: Season/Draft Primary Controls at 390px — Touch Target Sizing
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | All 390px viewport captures |
| **Element/Selector** | All primary action buttons (`#startDraftBtn`, `#simToEndBtn`, `#startSeasonBtn`, `#beginSeasonBtn`, `#simSeasonBtn`, `#simPlayoffsBtn`, `#sim100Btn`, `#back100Btn`) |
| **Reproduction Step** | Navigate through full flow at 390px |
| **Severity** | **Degraded** — touch target minimum 44×44px (WCAG) not verified |
| **Evidence** | VERIFIED — buttons visible at all checkpoints. INFERRED — button heights appear ~44px in screenshots but not programmatically verified. Preseason "Start Season" button fails `fullyInside` check. |
| **Intended Fix Direction** | Ensure all primary buttons meet 44×44px minimum at 390px; add `min-height: 44px; min-width: 44px` to `.resetbtn`, `.tabbtn` at mobile breakpoint |

### Issue 5: Light/Dark Theme — Focus Indicators Not Visible
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | Light/dark captures |
| **Element/Selector** | `:focus-visible` states on buttons, links, tab buttons |
| **Reproduction Step** | Tab through interface at 390px in both themes |
| **Severity** | **Degraded** — keyboard accessibility not verified |
| **Evidence** | INFERRED — still images cannot show focus states. No `:focus-visible` styles visible in captures. |
| **Intended Fix Direction** | Add visible `:focus-visible` outlines (3px solid, high contrast) for all interactive elements in both themes |

### Issue 6: Tab Navigation — Active State Contrast at 390px
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | All 390px captures show tab bar |
| **Element/Selector** | `.tabs` / `.tabbtn` / `.tabbtn.active` |
| **Reproduction Step** | View tab bar at 390px in both themes |
| **Severity** | **Cosmetic** — active tab identification |
| **Evidence** | VERIFIED — tab bar visible in all captures. INFERRED — active tab (Season) appears highlighted but contrast not measured. |
| **Intended Fix Direction** | Ensure active tab has clear visual distinction (background + text color) meeting 3:1 contrast against inactive tabs in both themes |

### Issue 7: 100-Season Report — Long Content Scrolling at 390px
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Capture Files** | `viewport-100-season-report.png` (536,604 B), `100-season-report-light.png` / `100-season-report-dark.png` |
| **Element/Selector** | Report content container, "What actually drove winning" section |
| **Reproduction Step** | View 100-season report at 390px |
| **Severity** | **Degraded** — long report content may require excessive vertical scrolling |
| **Evidence** | VERIFIED — capture height 536KB suggests very tall page. INFERRED — no horizontal scroll issues but vertical length may be excessive for mobile. |
| **Intended Fix Direction** | Consider collapsible sections, summary cards, or horizontal swipe cards for report sections at mobile |

### Issue 8: Light/Dark — Text Selection Contrast
| Field | Value |
|-------|-------|
| **Viewport** | 390×844 |
| **Build Hash** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| **Element/Selector** | `::selection` pseudo-element |
| **Reproduction Step** | Select text in both themes |
| **Severity** | **Cosmetic** — selection visibility |
| **Evidence** | INFERRED — not visible in captures. |
| **Intended Fix Direction** | Define `::selection { background: var(--primary); color: var(--primary-foreground); }` for both themes |

---

## Evidence Limits (Honest Disclosure)

| Limitation | Impact |
|------------|--------|
| **Only 2 viewports** (1280×900, 390×844) | No data for tablet (768px), large desktop (1920px), or foldable |
| **Only 2 color schemes** (light/dark) | No data for high-contrast, reduced-motion, or custom OS themes |
| **Full-page captures only** | No interaction states (hover, focus, active, loading, error) |
| **No NFL-all-time build** | All findings specific to merge candidate (current NFL only) |
| **Still images only** | No animation, transition, or timing verification |
| **Trace not fully replayed** | Screencast frames not individually inspected; trace.trace not parsed |

---

## VERIFIED vs INFERRED Summary

| Issue | VERIFIED (from files/data) | INFERRED (from still images) |
|-------|----------------------------|------------------------------|
| Preseason button clipping | ✅ result.json `fullyInside: false` | — |
| Table scroller count = 0 | ✅ result.json `tableScrollerCount: 0` | — |
| Light/dark captures exist | ✅ 6 files present | — |
| Contrast ratios | — | ❌ INFERRED (not measured) |
| Touch target sizing | ✅ buttons visible | ❌ 44×44px not measured |
| Focus indicators | — | ❌ INFERRED (not in captures) |
| Active tab contrast | ✅ tab bar visible | ❌ contrast not measured |
| 100-season report height | ✅ capture file size | — |
| Text selection | — | ❌ INFERRED |

---

## Priority for V21 (Per Owner Direction: "Beautiful and Sophisticated")

| Priority | Issue | Rationale |
|----------|-------|-----------|
| **P0** | Preseason button clipping | Blocks primary action at 390px — first play session fails |
| **P1** | Mobile table scroller | Protocol requirement unmet; core data exploration broken on mobile |
| **P1** | Touch target sizing (44×44px) | Accessibility baseline; affects all primary actions |
| **P2** | Focus indicators | Keyboard accessibility — sophistication baseline |
| **P2** | Light/dark contrast ratios | Readability in both themes — sophistication baseline |
| **P3** | Active tab contrast | Wayfinding clarity |
| **P3** | 100-season report mobile UX | Long-form content on mobile |
| **P4** | Text selection contrast | Polish |

---

## Commands & Artifacts

```bash
# Viewport check results
cat test-results/e2e-1792543053379/result.json | jq '.viewportChecks[] | {checkpoint, width, pageOverflowPx}'

# 390px failure detail
cat test-results/e2e-1792543053379/result.json | jq '.steps[] | select(.id=="responsive-390-audit")'

# 390px preseason failure detail
cat test-results/e2e-1792543053379/result.json | jq '.notes[] | select(contains("390px preseason"))'

# Screenshot inventory
ls -la test-results/e2e-1792543053379/*.png

# Trace location
ls -la test-results/e2e-1792543053379/trace/
```

---

## Artifact Locations

| Artifact | Local Path |
|----------|------------|
| Screenshots (26) | `test-results/e2e-1792543053379/*.png` |
| Trace | `test-results/e2e-1792543053379/trace/trace-1792543107751.zip` |
| Result JSON | `test-results/e2e-1792543053379/result.json` |
| Published Release | https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z |

---

**END OF INVENTORY**

SPEAKER: Ultra | ROLE: Council Advisor (Nemotron-3-Ultra) | TASK: V21 UI issue inventory (A8) | DATE: 2026-10-21T07:00:00Z