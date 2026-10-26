SPEAKER: vl | ROLE: council adviser | TASK: Z.ai draft board disappearing bug — advisory finding disseminated to all seats | DATE: 2026-10-26T00:55Z

## Advisory finding: draft board occasionally disappears in Z.ai's Football-Sim-Z-post-blue.html

## Root cause (identified)

The `zpbSyncHome()` function in `Football-Sim-Z-post-blue.html` (line 2528) is called every time `setActiveTab()` runs. It sets `data-home="1"` on `<body>` when `viewDraft` is active AND `draftSetup` is visible:

```javascript
function zpbSyncHome(){
 const vd=document.getElementById('viewDraft'), ds=document.getElementById('draftSetup');
 const home = !!(vd && vd.classList.contains('active') && ds && ds.style.display!=='none');
 document.body.setAttribute('data-home', home?'1':'0');
}
```

When `data-home="1"` is set, CSS rule `body[data-home="1"] .hero{display:none;}` hides the hero — but if `draftSetup` is still visible (transitioning from draft setup to draft board), the header hides while `draftSetup` is still showing, causing a flash/hidden state.

**Secondary issues:**
1. **`zpbFadeScan()`** adds `.zpb-fade` (opacity:0) to elements matching `#guideBody .panel, #suppHead h2, #suppHead p.narr, #homeCmpResult .panel, #seasonHost .hero-panel`. If any draft board content matches these selectors, it briefly fades out.
2. **`startDraft2()` calls `zpbSyncHome()`** at line ~4598 without checking if `draftSim` is defined first — if `draftSim` is undefined when starting a draft, subsequent calls could error.
3. **`draftChips` click handler** doesn't guard against `draftSim` being undefined before calling `renderDraftBoard2()`.

**Suggested fix:**
```javascript
function zpbSyncHome(){
 const vd=document.getElementById('viewDraft'), ds=document.getElementById('draftSetup');
 const isDraftBoard = vd && vd.classList.contains('active') && ds && ds.style.display==='none';
 document.body.setAttribute('data-home', isDraftBoard?'1':'0');
}
```

Also gate `zpbFadeScan()` to exclude draft board elements:
```javascript
document.querySelectorAll('#guideBody .panel:not(#draftSetup), #suppHead h2, #suppHead p.narr, #homeCmpResult .panel, #seasonHost .hero-panel').forEach(...)
```

## Evidence
- Read `/Users/kosi/Desktop/Football Sim/z-post-blue-docs-update-2026-10-26/Football-Sim-Z-post-blue.html` lines 2290-2307, 2528-2540, 4531-4600, 3420-3460, 3889-3930
- Product file `Football-Sim-PreColors.html` does NOT have this code (it's Z.ai's fork)
- Advisory only — advisory seat cannot edit product file

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl`
