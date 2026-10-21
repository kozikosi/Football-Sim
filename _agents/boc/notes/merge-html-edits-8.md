# Copy-Pasteable Edit: Item 8 — Player Browser ~15 cap + footer tabs always visible (MOC request) — BOC — 21 Oct 2026

Build: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.

## (a) Item 8 — Player Browser cap (~15 on desktop)

### Current code (l.791–815)
`renderPlayers()` filters PLAYERS, sorts, then renders ALL matching rows:
```
 let h = '';
 rows.forEach(p=>{ ... h += `<tr>...</tr>`; });
 body.innerHTML = h;
```
With 1,200+ players and no filter, the entire list renders. On desktop this is far more than ~15 visible.

### Proposed edit (two parts)

**Part A — cap the rendered list (l.791, renderPlayers)**
Add a page-size variable and slice. Insert after the sort (before the forEach):
```
 const PAGE_SIZE = window.innerWidth <= 760 ? 10 : 15;
 const shown = rows.slice(0, PAGE_SIZE);
 const hidden = rows.length - shown.length;
```
Change `rows.forEach` → `shown.forEach`. After the loop, append a "Show more" control:
```
 if(hidden > 0){
   h += `<tr><td colspan="10" style="text-align:center;padding:8px;">
     <button class="tabbtn" id="showMorePlayersBtn" style="width:auto;padding:8px 20px;">Show ${hidden} more</button>
   </td></tr>`;
 }
 body.innerHTML = h;
 const btn = document.getElementById('showMorePlayersBtn');
 if(btn) btn.addEventListener('click', ()=>{ playerFilters._pageSize = (playerFilters._pageSize||PAGE_SIZE)+PAGE_SIZE; renderPlayers(); });
```
And modify the slice to use a growing page size:
```
 const pageSize = playerFilters._pageSize || PAGE_SIZE;
 const shown = rows.slice(0, pageSize);
```
Reset `_pageSize` to 0 on filter change (pos/team/search changes) so the cap re-applies.

**Part B — footer tabs always visible (CSS, l.239)**
Current: `.footnav{...;margin:34px auto 0;...}` — scrolls away.
Change to sticky:
```
 .footnav{...;position:sticky;bottom:8px;...}
```
Or `position:fixed;bottom:8px;left:50%;transform:translateX(-50%);` if sticky is insufficient (sticky needs a scroll container). Recommended: `position: sticky; bottom: 8px; z-index: 50;` — simpler, stays in flow, always visible at bottom of viewport when scrolling.

### Recommendation on "how the reader reaches the rest"
**Recommendation: "Show more" button (incremental), not a pager.** Reasons:
- Filters (pos/team/search) already narrow the list; a pager would reset on every filter change and be confusing.
- "Show more" preserves scroll position and is one click.
- On mobile, show 10 at a time (PAGE_SIZE = 10 when viewport ≤ 760).
- The "playerCount" text (l.800) already shows total count, so the user knows how many remain.

### What BOC did not check
- Whether `playerFilters` object can hold `_pageSize` without breaking existing filter logic (it's a plain object, so yes, but Claude should verify).
- Whether the player browser view is inside a scroll container that supports sticky (if `.wrap` has `overflow: hidden`, sticky won't work; use fixed instead).
- Whether the footer tabs are already "always visible" via some other mechanism (grep found `.footnav` at l.239 with margin, not fixed).

## (b) Item 3 question — badge strip

**MOC's measured result:** with default weights, no team carries a badge → strip reads "No team carries a penalty badge on these weights." Badges only appear when penalty thresholds are moved.

**BOC's answer:**
- **Show the "no badges" message.** An empty strip with no explanation looks like a bug ("did it fail to render?"). The message "No team carries a penalty badge on these weights" is informative — it tells the user that the current weights produce no penalty flags, which is itself useful information. It also disappears naturally when badges appear, so it doesn't clutter.
- **Strip sits UNDER the two buttons** (MOC's build). This matches the Owner's instruction "under Back to my weights" (now "Save My Weights"). At the very bottom of the page would separate the badges from the weights controls that produce them, making the relationship less clear.

No product edits by BOC. No other seats' files touched.
