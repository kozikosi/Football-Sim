# V22 Applier Verification — BOC — 21 Oct 2026

Read-only verification of `_agents/lightning/notes/merge-html-applier.js` (Lightning's tool, 87 lines).

## Applier status: INCOMPLETE / NOT USABLE

The file is a rough draft, not a working tool. It defines only items 21–25 (and item 22's edits include `new: ''` deletions that would break the flex table). Items 1–20 are referenced but not configured ("// ... items 1-20 from previous brief ..."). The `main()` function is a placeholder ("// ... (same as before, but with item numbers 1-30)"). No `--team-colors` flag exists. No self-check logic exists. The script would not run.

## Verification of the four claims

### (1) "8 of 16 DB items apply via exact-string matching" — NOT VERIFIED
The applier only defines items 21–25 (5 items), not 16. Of those 5, items 22 (flex table reorder) uses `new: ''` deletions that would delete rows, and item 24 (merge guide sections) has placeholder edits. Only item 21 (remove 76-rating clause) and item 23 (tackle→offensive tackle) have clean exact-string edits. Items 1–20 are not in the file at all. **Claim not supported by the file.**

### (2) "Self-check distinguishes HTML span 'footlabel' from CSS '.footlabel{' class" — NOT VERIFIED
No self-check logic exists in the file. The distinction between `<span class="footlabel">` (l.439) and `.footlabel{}` (CSS, l.239) is a real and important one (BOC flagged it in the value-here prototype), but the applier does not implement any such check.

### (3) "Geometry preserved (player entries 139, team data 64 unchanged)" — PARTIALLY VERIFIED
- PLAYERS entries: **1,200** (verified by python parse). Not 139. The claim of "139 player entries" is wrong (or refers to something else — perhaps a filtered subset). 
- TEAM_DATA teams: **32** (verified). "64" could be 32 × 2 (something) but is not a standard count. The claim is not verifiable as stated.
- The applier does not contain any geometry preservation logic or checks.

### (4) "--team-colors flag designs palette as external JSON with no hardcoded values" — NOT VERIFIED
No `--team-colors` flag exists in the applier. The applier has no flag parsing at all (only `--item1..--item30` and `--all` mentioned in comments, not implemented).

## What BOC did not check
- Whether a more complete version of the applier exists elsewhere (searched `_agents/` for "applier" — only Lightning's file found).
- Whether Lightning's `value-here-applier.js` (also in `_agents/lightning/notes/`) is more complete.
- Whether the claims refer to a different tool or a verbal report rather than this file.
- The actual content of `value-here-applier.js`.

## Recommendation
The applier is a rough draft, not a working tool. Lightning's claims about it (8/16 items, self-check, geometry, --team-colors flag) are not supported by the file as it exists. BOC recommends treating the applier as a starting point, not a verified deliverable. The copy-pasteable edits in BOC's own notes (`merge-html-edits-*.md`) are the reliable change set.

---

## Update: value-here-applier.js (Lightning, 286 lines) — VERIFIED

This file is more complete than merge-html-applier.js. It implements 7 edits for the value-here removal with:
- Idempotent check (`isPatched`).
- Self-check: header cell count (expect 9), body cells per row (expect 9), empty-state colspan (expect 9), "Value here" count (expect 0), r.v consumers present.
- `node --check` on extracted script.
- `--drop-sort` / `--keep-sort` flags (BOC's recommendation was keep+reword, which aligns with `--keep-sort`).

**However**, the self-check does NOT distinguish the HTML span `footlabel` from the CSS `.footlabel{}` class. The word "footlabel" does not appear anywhere in the applier. The "footlabel" distinction was flagged by BOC in the value-here prototype but not implemented in the applier.

**The `--team-colors` flag** does NOT exist in either applier file. Neither file has any team-color logic.

**Player entries: 1,200 (not 139).** **Team data: 32 teams (not 64).** The claim "geometry preserved (139, 64)" is not verifiable as stated — 139 may refer to something else (perhaps a filtered subset or a different count), and 64 is not a standard team count (32 × 2 = 64, possibly a different metric).

## Summary of all applier-related claims

| Claim | Status | Evidence |
|-------|--------|----------|
| "8 of 16 DB items apply via exact-string matching" | NOT VERIFIED | merge-html-applier.js defines only 5 items (21-25), and 2 of those use `new: ''` deletions. Items 1-20 not configured. |
| "Self-check distinguishes HTML span 'footlabel' from CSS '.footlabel{' class" | NOT VERIFIED | Neither applier file contains "footlabel". value-here-applier.js has self-check (headers 9, cells 9, colspan 9, value-here 0, r.v consumers) but no footlabel distinction. |
| "Geometry preserved (player entries 139, team data 64 unchanged)" | PARTIALLY VERIFIED | PLAYERS = 1,200 (not 139). TEAM_DATA = 32 teams (not 64). The claim does not match the build. |
| "--team-colors flag designs palette as external JSON with no hardcoded values" | NOT VERIFIED | No --team-colors flag in either applier. value-here-applier has --drop-sort/--keep-sort only. |

## Recommendation
The value-here-applier.js (Lightning, 286 lines) is a working, complete tool for its scope (7 value-here edits) with idempotency and self-check. It should be the model for future appliers. The merge-html-applier.js (87 lines) is a rough draft that should not be used as-is. Lightning's claims about "8 of 16 items" and "geometry preserved" do not match the files. BOC's copy-pasteable edits (merge-html-edits-*.md) remain the reliable change set.
