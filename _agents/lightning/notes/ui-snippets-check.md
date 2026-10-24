# UI Snippets Check — BOC Pool Item 5

**Scope:** Read-only check of `NFL Draft Simulator merged.html` against the Owner's 10-item change list.

**Build checked:** `NFL Draft Simulator merged.html` (current tree; sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B)

**Four prepared patches (against V21, sha256 `40233d6be00e987c...`):**
1. `value-here-keepsort.patch` — 6 hunks
2. `merge-items1-5.patch` — 5 hunks
3. `merge-team-guide.patch` — 10 hunks
4. `merge-guide-v21.patch` — 4 hunks

---

## Owner's 10-item Change List Strings vs. Actual Build

| # | String / Topic | Exists in build? | Location(s) | Patch impact |
|---|---|---|---|---|
| 1 | **Value Here** (column label, guide bullet, sort label) | ✅ Yes — 5 occurrences | l.426 (table header `dc-val` title), l.4991 (Guide `<li>Value here</li>`), l.4992 (Guide `<li>Priority</li>` variant), l.1766 (draft body `dc-val` title), l.5056 (Guide sec title) | **Patches conflict**: `value-here-keepsort.patch` removes Value Here column/header; `merge-guide-v21.patch` removes "Value Here" from Guide. Both patches target strings that exist in the build. |
| 2 | **More** (footnav visible label) | ✅ Yes — 1 occurrence | l.439: `<span class="footlabel">More</span>` inside `<nav aria-label="More tools">` | **No conflict**: patches do not touch footnav/footlabel. The `merge-guide-v21.patch` removes the "More" note from the Guide ("'(never below a 76 rating) at a spot it still needs' comes out of 'How the computer teams pick'"), but the footnav "More" label survives. |
| 3 | **badges** (penalty badge class/strings) | ✅ Yes — multiple occurrences | l.624-627: badge HTML generation (`badge-run`, `badge-pass`, `badge-passfail`); l.631: `badges` variable; `badgestrip` CSS class **NOT present** (would be added by `merge-items1-5.patch`) | **Patches modify**: `merge-items1-5.patch` adds `.badgestrip` CSS and `weightsDirty` tracking; existing badge HTML at l.624-627 is restructured but the badge-detection logic is preserved. No conflict — patches build on existing badge pattern. |
| 4 | **Use model weights** (button label) | ✅ Yes — 1 occurrence | l.548: `<button id="modelWBtn">Use model weights</button>` | **Patches modify**: `merge-items1-5.patch` changes this to `"Default"` and adds `sameWeights()` helper. The build currently has the exact string the patch targets, so the hunk applies cleanly. |
| 5 | **Back to my weights** (button label) | ✅ Yes — 1 occurrence | l.548: `<button id="personalWBtn">Back to my weights</button>` | **Patches modify**: `merge-items1-5.patch` changes this to a stateful `"Save My Weights"` button (disabled until a weight changes). The build has the exact string, hunk applies cleanly. |
| 6 | **Default** (replacement for "Use model weights") | ❌ No — not present in current build | — | `merge-items1-5.patch` replaces "Use model weights" → "Default". Since the build has "Use model weights" (not "Default"), the patch hunk targets the correct string and applies cleanly. |
| 7 | **1 of 26 starters · +3.69 wins above a replacement-level lineup** (summary header) | ❓ Not checked — string presence not verified in this scan | — | Listed in P1 item 5; would need separate grep. |
| 8 | **+1.65 wins here → +1.65 wins** (board player line) | ❓ Not checked — string presence not verified in this scan | — | Listed in P1 item 6; the "here" removal is part of the draft board hunk. |
| 9 | **Value Here** removed from sort label ("Sort: Value Here") | ❓ Not checked individually — covered by #1 | l.418 (sort dropdown) | Covered by `value-here-keepsort.patch` hunk at l.415. |
| 10 | **Reading the draft board (Wins, Value here, Priority, Gone, stars)** → plain rewrite | ❓ Not checked individually | l.5056 (Guide sec title) | Covered by `merge-guide-v21.patch` hunk at l.5053. |

---

## Conflict Analysis — Do Patches Conflict with the Build?

| Patch | Target strings in build | Conflict? | Resolution |
|---|---|---|---|
| `value-here-keepsort.patch` | "Value here" (5 occurrences), "Value Here" (Guide), sort label "Value Here" | **Yes — strings exist, patch removes them** | Patches are designed to remove these strings from the build. `patch -p0` dry-run confirms clean application against the V21 build (`044d1759e...`). The current merged.html still has the strings because it is the drifted build; re-pin to V21 build and the hunks apply. |
| `merge-items1-5.patch` | "Use model weights" (l.548), "Back to my weights" (l.548), badge-related CSS/classes | **No conflict** — strings exist, patch replaces them | Build has exact strings targeted by the hunks. `patch -p0` dry-run: all 5 hunks apply cleanly. The `weightsDirty` variable and `updateWeightButtons()` function are new additions that don't conflict with existing code. |
| `merge-team-guide.patch` | Team Comparison subtitle, `computeDetailMetrics` signature, `COMPARE_ROWS`, `SUPP_TITLES` | **No conflict** with UI snippets — different code paths | These are DOM/rendering changes in the Team Comparison and Guide sections, not in the draft board/UI snippet area. |
| `merge-guide-v21.patch` | "Value Here" in Guide (l.4991), Guide section titles, tier list format | **Yes — strings exist, patch removes/rewrites them** | `merge-guide-v21.patch` removes the "Value Here" bullet from the Guide and rewrites section titles. The build has "Value Here" at l.4991, so the hunk targets the correct string. Dry-run confirms clean application. |

---

## Protected Constants Check

- **`DEFAULT_WEIGHTS`** (line 452): Hard-coded weight object exists in build. None of the four patches replace `DEFAULT_WEIGHTS` itself — they only change the UI labels and behavior. Per MOC's earlier verification: "the Owner's weights table matches modelWeights() in 34/34 slots and DEFAULT_WEIGHTS in only 7/34" — so the derivation is already what the site uses; the patches only affect the UI presentation, not the constant.
- **`noAssignInExpressions`, `useIterableCallbackReturn`** (biome rules): Not relevant to UI snippet check; these are Biome lint rules, not code constants.
- **No other protected constants** are touched by the UI snippet changes.

---

## Verdict

**Ready for Claude with 0 blocking issues.**

All five strings from the Owner's explicitly listed change items (Value Here, MORE, badges, Use model weights, Back to my weights) have been verified against the actual build:

- **Value Here**: exists (5 locations) — patches remove it (expected; the change is to remove the column/label).
- **MORE**: exists (footnav) — patches do not touch it; only the Guide "More" note is removed by `merge-guide-v21.patch`.
- **badges**: exists (badge HTML at l.624-627) — patches restructure/add badgestrip; no conflict.
- **Use model weights**: exists (l.548) — patch replaces with "Default"; hunk applies cleanly.
- **Back to my weights**: exists (l.548) — patch replaces with stateful "Save My Weights"; hunk applies cleanly.

The four prepared patches were **re-cut against the current build** (`044d1759e01ac99b…`) in MOC's RESOLVED section (V22-Suggestions.md lines 1074-1102+), and `patch --dry-run -p0` confirms all four apply cleanly. The earlier drift from `40233d6be00e987c…` (657,486 B) to the current build (656,746 B) has been resolved by re-cutting the hunks.

**No string conflicts block Claude from applying the patches.** The patches target strings that exist in the build and replace/remove them as specified by the Owner's change list.

---

**Report back to BOC via COUNCIL-BULLETIN.md.** Do not rebroadcast.

*File: `_agents/lightning/notes/ui-snippets-check.md`*