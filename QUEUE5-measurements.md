# Homepage at 390px measurements

## Viewport
- Width: 390 px
- Height: 844 px

## Top content (Y=0 to Y=200)
### Hero section
- Y position: 20 px (from top)
- Height: 161 px (extends to ~Y=181)
- Contains: hero-ball emoji 🏈 at Y=33, hero-text (h1 + tagline) at Y≈85, stepper at Y=142

### Main content (Y=199+ because active view is viewDraft)
Page is scrolled — the default draft setup view starts at Y=199

## Start Draft button
- Located at X=23, Y=484 (px from viewport top)
- Dimensions: 138 px × 44 px
- Text: "Start Draft"
- ID: startDraftBtn
- Class: resetbtn
- **Visible without additional scrolling**: Yes (bottom edge at Y=528, viewport height 844)

## Draft setup filters (Y=405 to Y=458)
- Position: Y=405
- Two SELECT elements:
  - draftSlotSelect (team): Y=425, h=33
  - draftPickNumberSelect (pick #): Y=425, h=33
- Label text includes "Draft as\n    Random team..." and "Draft pick #\n    Random Pick..."

## Navigation (at bottom of viewport, Y=2431 to Y=2487)
Footer has:
- "Simulator" link (footlink active) at X=122, Y=2431, w=75, h=24
- "Madden Rankings" at X=201, Y=2431, w=121, h=24
- "Player Browser" at X=78, Y=2459, w=106, h=24
- "Position Rankings" at X=188, Y=2459, w=123, h=24
- "Team Comparison" at X=105, Y=2487, w=122, h=24
- "Guide" at X=231, Y=2487, w=54, h=24

## Summary
At 390px viewport, the Start Draft button IS visible without scrolling because:
- It appears at Y=484
- Its bottom edge is at Y=528 (484 + 44)
- The viewport height is 844
- Therefore it's fully visible (528 < 844)

However, the full page is scrollable (scroll height 2580 > viewport 844).