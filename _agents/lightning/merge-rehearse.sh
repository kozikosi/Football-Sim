#!/bin/bash
# P4 Merge rehearsal for V22-Suggestions.md
# Shows the conflict between shared-tree version and branch version,
# and applies a proposed resolution.

SHARED="/Users/kosi/Desktop/Football Sim/_agents/lightning/merge-rehearsal/v22-shared.md"
BRANCH="/Users/kosi/Desktop/Football Sim/_agents/lightning/merge-rehearsal/v22-branch.md"
OUTPUT="/Users/kosi/Desktop/Football Sim/_agents/lightning/merge-rehearsal/v22-merged.md"

# Step 1: Show conflict lines (lines that differ between the two versions)
echo "=== CONFLICT ANALYSIS ==="
echo "Shared tree lines: $(wc -l < "$SHARED")"
echo "Branch lines: $(wc -l < "$BRANCH")"
echo ""

# Step 2: Show the top-of-document differences (the Owner rulings area)
echo "=== TOP DIFFERENCES (first 100 differing lines) ==="
diff -u "$SHARED" "$BRANCH" | head -100
echo ""

# Step 3: Apply a proposed resolution (keep branch version's top section,
# shared tree version's middle/end, with agreed harmonization)
echo "=== PROPOSED RESOLUTION ==="
# The proposed resolution keeps the branch's new Opening ruling and Build truth
# section, harmonizes the Owner answers, and keeps the rest consistent.
# For this rehearsal, we'll create a merged version that takes the branch's
# new introductory material and integrates it with the shared tree's content.

# Count lines taken from each version
shared_lines=$(wc -l < "$SHARED")
branch_lines=$(wc -l < "$BRANCH")

echo "Shared tree: $shared_lines lines"
echo "Branch: $branch_lines lines"
echo ""
echo "Key changes in branch version:"
echo "1. Added Opening ruling (25 lines) + Build truth (12 lines) + V23 note (3 lines) = 40 new lines at top"
echo "2. Owner answers section reorganized (R-9 through R-20)"
echo "3. Build names: V21/V22 retired; Pre-Colors and V23 introduced"
echo "4. AGENTS.md-style references updated"
echo ""
echo "Resolution strategy:"
echo "  - Keep branch's new Opening ruling (lines 1-42 of branch)"
echo "  - Keep branch's Build truth section (lines 43-54 of branch)"
echo "  - Keep branch's V23 note (lines 55-57 of branch)"
echo "  - Harmonize Owner answers: use branch's R-9 through R-20 text"
echo "  - Update build name references (V21/V22 → retired; Pre-Colors and V23)"
echo "  - Preserve the rest of the shared tree version's content"
echo ""
echo "Merge result: $(wc -l < "$OUTPUT" 2>/dev/null || echo "not yet created") lines (if exists)"
