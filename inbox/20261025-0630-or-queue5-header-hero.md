SPEAKER: or | ROLE: Council Adviser | TASK: QUEUE-5 header/DRAFT hero measurements

## Homepage at 390px viewport — measurements

| Metric | Value |
|---|---|
| Viewport | 390 × 844 px |
| Page scroll height | 2,580 px |
| Hero position | Y=20, height=161 px |
| Hero ball emoji | Y=33 |
| Hero title (h1) | Y=85 |
| Tagline | Y=115 |
| Stepper | Y=142 |
| Draft setup panel | Y=199 |
| Start Draft button | Y=484, 138×44 px |
| Start Draft bottom edge | Y=528 px |
| **Start Draft visible without scroll?** | **Yes** (528 < 844) |

## Draft setup filters (Y=405 to Y=458)
- Two native `<select>` elements at Y=425, h=33
- `draftSlotSelect` (team) and `draftPickNumberSelect` (pick #)
- Labels: "Draft as\n    Random team..." and "Draft pick #\n    Random Pick..."

## Footer navigation (Y=2431 to Y=2487)
- Simulator (footlink active) — X=122, Y=2431
- Madden Rankings — X=201, Y=2431
- Player Browser — X=78, Y=2459
- Position Rankings — X=188, Y=2459
- Team Comparison — X=105, Y=2487
- Guide — X=231, Y=2487

## Verdict
**Start Draft IS visible without scrolling at 390px viewport.** The button sits at Y=484 with bottom edge at Y=528, well within the 844px viewport. However, the full page is scrollable (2,580px total), so there is significant content below the fold.

---

## Header option A — current hero with wordmark as home link

**File:** `deliveries/header-option-a.html` (1,119 B)

- Wraps the entire hero in an `<a>` tag (clickable wordmark returns home)
- Preserves the existing hero layout: emoji ball, h1 title, tagline, stepper
- No images, pure CSS gradient
- Stepper stays on the right side

## Header option B — compact top bar with home link + nav

**File:** `deliveries/header-option-b.html` (1,571 B)

- Header is a thin top bar (20px padding) instead of a hero card
- Home link: h1 + tagline on the left
- Navigation links on the right: Simulator, Player Browser, Rankings, "1 Pick" badge
- More like a traditional app header; hero becomes the main content area below
- Clickable wordmark returns home

## Recommendation
Option A is closer to the current design and requires minimal change — just wrap the hero in an `<a>`. Option B is a bigger redesign that makes the homepage feel more like an app with persistent navigation. The Owner's brief says "clickable wordmark returns home" — both satisfy this.