# Gate Blind Spot — BOC (DS dispatch, BATCH-GLM-B2) — 22 Oct 2026

Build: `NFL Draft Simulator merged.html`, 656,746 B, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (V22 candidate, not V22). Read-only; no product edits.

## 1. Is `inVp` still horizontal-only? (VERIFIED)

Yes. `e2e-smoke.mjs` l.141:
```js
const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0) : false;
```
It checks horizontal bounds only (`left`, `right`, `width`). It never checks `top`, `bottom`, or `height`. A button at `top=963` in an 844px viewport passes this gate.

## 2. Does the suite contain any vertical/below-the-fold assertion? (VERIFIED)

No. The smoke suite (`e2e-smoke.mjs`) has no `fullyInside`, `centerUncovered`, or `bottom <= vh` check. The only vertical-adjacent code is `visibleWithoutScrolling: absTop >= 0 && absTop < vh && r.bottom > 0` (l.186) in the PRIMARY_PROBE — but that is a *probe* that records a boolean, not an *assertion* that fails the gate. The gate's `E_viewportUsable` (l.654 area) is built from `clippedCount`, `coveredCount`, `unscrollable`, and `hiddenClipped` — all horizontal. `primaryAction.inViewport` is reported but not asserted as a pass/fail condition.

## 3. Every assertion the smoke suite actually makes (VERIFIED)

| Check | What it tests | Axis | Can fail on |
|-------|--------------|------|-------------|
| 390.1 | `document.documentElement.scrollWidth` vs viewport | horizontal | page-level overflow |
| 390.2 | `body.scrollWidth` vs viewport | horizontal | body-level overflow |
| 390.3 | heading/primary action `inVp` (horizontal only) | horizontal | horizontal clipping of heading/button |
| 390.4 | `elementFromPoint(cx,cy)` at control centre (cx within vw, cy within innerHeight) | both (but only for covered check) | overlay covering a control |
| 390.5 | offender scan: `rect.width > viewportWidth + 1` | horizontal only | elements wider than viewport |
| 390.6 | intentional scrollers (`overflow-x: auto/scroll`) can scroll horizontally | horizontal | broken horizontal scrollers |
| 390.7 | hidden-clipped elements (`overflow-x: hidden/clip` with wider content) | horizontal | clipped content (reported, not asserted) |
| A | 100-season report renders (`reportRendered === true`) | n/a | report crash |
| B | `offenderCount === 0` after mobile→desktop→mobile | horizontal | overflow elements |
| C | `pageErrors.length === 0` | n/a | uncaught page errors |

**What it structurally cannot fail on:** A primary action positioned below the fold (vertical axis). The `#startSeasonBtn` at `top=963` in an 844px viewport passes `inVp` because its horizontal bounds (left/right/width) are all within viewport. The gate has no vertical bound check.

## 4. What v2 catches that smoke cannot (VERIFIED)

`tests/openchamber-e2e-v2.spec.js` (11 occurrences of `fullyInside`/`centerUncovered`) implements:

```js
const fullyInside = (el) => {
  const r = el.getBoundingClientRect();
  return (r.left >= -1 && r.right <= vw + 1 && r.top >= -1 && r.bottom <= vh + 1);
};
const centerUncovered = (el) => {
  const r = el.getBoundingClientRect();
  const x = Math.min(vw - 1, Math.max(0, r.left + r.width / 2));
  const y = Math.min(vh - 1, Math.max(0, r.top + r.height / 2));
  const hit = document.elementFromPoint(x, y);
  return !!hit && (hit === el || el.contains(hit) || hit.contains(el));
};
```

v2 checks **both axes** (`top >= -1 && bottom <= vh + 1`) and whether the element's centre is covered by an overlay. The smoke suite checks only horizontal bounds. Therefore v2 catches the below-the-fold `#startSeasonBtn` (fullyInside fails because `bottom > vh + 1`), while the smoke gate passes it. The two instruments disagree by construction.

## Verdict

The gate's blind spot is **real and structural**: `inVp` at l.141 is horizontal-only, and `E_viewportUsable` (l.654 area) is built from horizontal-only counts. A green gate does not close the preseason primary-action P0. The six runs that reported `E_viewportUsable: true` with `clippedCount: 0` all passed a weaker test than the protocol requires.

**What BOC did not check:** whether the v2 spec's `fullyInside` check is actually wired into the pass/fail verdict (it reports `fullyInside` in the describe output, but BOC did not trace whether it gates the exit code); whether the gate's `primaryAction.inViewport` field is asserted anywhere (it appears to be reported only). Live browser execution of either instrument was not performed.
