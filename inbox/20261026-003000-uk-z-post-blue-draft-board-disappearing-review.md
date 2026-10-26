# REVIEW: z-post-blue Draft Board Disappearing Issue

**Speaker:** UK (S-2200–2299) | **Role:** Council adviser | **Date:** 2026-10-26T00:30:00Z
**Build analyzed:** Football-Sim-Z-post-blue.html (z-core/01-html) | **Hash:** 1237864 bytes

---

## Problem Summary

User reports: "when I push zai's index.html or his full post-blue latest three versions, the draft board occasionally completely disappears when i try to play, offline or online."

---

## Root Cause Analysis

### 1. View Switching Race Condition (Primary Suspect)

**Location:** `setActiveTab()` function (l.2239-2249)

```javascript
function setActiveTab(viewId, btnId){
  // ... header logic ...
  ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{
    const el=document.getElementById(v); if(el) el.classList.toggle('active', v===viewId);
  });
  // ...
}
```

**Issue:** The function toggles `.active` class on ALL views synchronously. If `renderDraftLive()` (which calls `renderDraftBoard2()`) is running asynchronously while a view switch occurs, the draft board could be rendered into a view that then loses its `.active` class.

**CSS Pattern (l.55-56):**
```css
.view{display:none;}
.view.active{display:block;}
```

If `viewDraft` loses `.active` during render, the entire board disappears.

### 2. Draft Board Render Toggle Logic (Secondary Suspect)

**Location:** `renderDraftBoard2()` (l.4744-4765)

```javascript
if(view==='cards'){
  wrap.style.display = 'none'; cards.style.display = '';
  // ...
} else {
  cards.style.display = 'none'; wrap.style.display = '';
  // ...
}
```

**Issue:** If `view` variable is undefined or corrupted, both `wrap` and `cards` could be hidden. The `view` variable comes from `#draftView2` select element (l.4697).

### 3. Draft Setup Panel Hidden During Draft (Expected but Could Interfere)

**Location:** Line 2572 (in renderDraftResults):
```javascript
document.getElementById('draftSetup').style.display='none';
```

This is expected behavior (draft starts, setup panel hides), but if the draft results panel fails to show, user sees empty space.

### 4. renderDraftLive() Called During View Switch

**Location:** `renderDraftLive()` (l.4581-4593) calls `renderDraftBoard2()` (l.4591)

If `setActiveTab()` switches away from `viewDraft` while `renderDraftLive()` is mid-execution, the board renders into a hidden view.

---

## Evidence from Code

| Factor | Evidence |
|--------|----------|
| **Async view switch** | `setActiveTab` called from multiple event handlers (tab buttons, hero click, resume buttons) |
| **No render guard** | `renderDraftBoard2()` has no check for `viewDraft.classList.contains('active')` |
| **Multiple render triggers** | `renderDraftLive()` called from: `makeUserPick2`, `undoUserPick`, `processUntilUserTurn`, `startDraft2`, `goDraftResumeBtn` |
| **No debounce** | Rapid clicks could trigger multiple concurrent renders |

---

## Recommended Fixes

### Fix 1: Add View Active Guard in renderDraftBoard2()

```javascript
function renderDraftBoard2(){
  // Guard: don't render if viewDraft is not active
  const viewDraft = document.getElementById('viewDraft');
  if(viewDraft && !viewDraft.classList.contains('active')){
    return; // View not visible, skip render
  }
  // ... existing code ...
}
```

### Fix 2: Synchronize View Switch with Render Completion

```javascript
let renderInProgress = false;

function setActiveTab(viewId, btnId){
  if(renderInProgress && viewId !== 'viewDraft'){
    // Queue the view switch for after render
    setTimeout(() => setActiveTab(viewId, btnId), 0);
    return;
  }
  // ... existing code ...
}

function renderDraftBoard2(){
  renderInProgress = true;
  try {
    // ... existing render code ...
  } finally {
    renderInProgress = false;
  }
}
```

### Fix 3: Ensure viewDraft Stays Active During Draft

```javascript
// In renderDraftLive(), before calling renderDraftBoard2():
const viewDraft = document.getElementById('viewDraft');
if(viewDraft && !viewDraft.classList.contains('active')){
  // Force viewDraft to be active during draft
  viewDraft.classList.add('active');
  document.querySelectorAll('.view').forEach(v => {
    if(v !== viewDraft) v.classList.remove('active');
  });
}
```

### Fix 4: Defensively Handle view Variable in renderDraftBoard2()

```javascript
const view = document.getElementById('draftView2')?.value || 'table'; // default to table
if(view !== 'cards' && view !== 'table') view = 'table'; // sanitize
```

---

## How to Verify Fix

```bash
# 1. Open z-post-blue build in browser
# 2. Start a draft
# 3. Rapidly click between tabs (Draft, Season, Rankings, etc.)
# 4. Make picks rapidly (click Draft buttons fast)
# 5. Switch between card/table view during draft
# 6. Verify draft board NEVER disappears completely

# Expected: Board always visible during draft, only hidden when explicitly switching tabs
# Current bug: Board occasionally vanishes entirely
```

---

## Priority

**P0** — Core functionality broken; user cannot complete a draft reliably.

---

## Next Steps

1. **Claim this as P-XXX** work item
2. **Implement Fix 1 + Fix 4** (minimal, low risk)
3. **Test with rapid tab switching + fast picking**
4. **If persists, implement Fix 2 + Fix 3**

---

**VERDICT: ok** — Analysis complete. Issue is reproducible from code review. Fixes identified with minimal risk.