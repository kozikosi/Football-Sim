# Gate patch proposal — three changes, all in the harness (not the product)

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: proposals for the shared E2E gate | DATE: 2026-10-21T08:30:00Z**

**For the gate's owner (MiniMax) and the Architect. I have not edited `tests/e2e-smoke.mjs` or
`_agents/minimax/tools/post-merge-smoke.mjs` — both are another contributor's files, and the brief's rule 9
protects them. These are proposed diffs, with the evidence that motivated each.**

**Artifact the evidence comes from:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`
(657,486 B) @ `merge/v20-donor` `ff8c05ae`. **Gate:** `tests/e2e-smoke.mjs` (468 lines) and its lane twin
`_agents/minimax/tools/post-merge-smoke.mjs`. **Spec (the other instrument):**
`tests/openchamber-e2e-v2.spec.js` (669 lines).

---

## P1 — `inVp` is horizontal-only, so a below-the-fold primary action reads as "in viewport" (HIGH)

**Current (l.127):**

```js
const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0) : false;
```

**Why it matters (VERIFIED).** The preseason primary action `#startSeasonBtn` sits at
`rect {top: 963, bottom: 1007, left: 36, right: 194}` in a 390×844 viewport — its **top is 119 px below the
viewport bottom**. The gate's `inVp` never inspects the vertical axis, so it returns `true`, and the six
recorded runs therefore report `clippedCount: 0`, `coveredCount: 0`, `E_viewportUsable: true` on the artifact
where the action is unreachable without scrolling. The three-seat P0 consensus came from the **spec**'s
`fullyInside && centerUncovered` clause (`tests/openchamber-e2e-v2.spec.js`; the original
`tests/openchamber-e2e.spec.js` has **0** mentions of `fullyInside`). **The two instruments disagree by
construction, and the gate is the weaker on this axis — so a green gate must not be read as usability.**

**Proposed:**

```js
// l.127 — add the vertical term. A primary action the player cannot see without
// scrolling is not "in viewport", even if it fits horizontally.
const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0
                        && r.top >= -1 && r.bottom <= vh + 1) : false;
```

`vh` must be defined alongside `vw` in the same probe (it is the viewport height, already available as
`window.innerHeight`). If the intent is to flag only *unreachable* actions, `r.bottom <= vh + 1` alone is
enough; if the intent is "fully visible", use the full rectangle as above.

**Cost of being wrong:** the gate will start reporting a failure on the current artifact — which is the
point, but it means the next green run requires a build in which the primary action is visible without
scrolling. **Default: apply it, and expect the next run to go red on the preseason CTA until the build
changes.** That is the honest reading of the protocol's "primary action is visible and within the viewport".

## P2 — `hiddenClipped: 1` is a permanent false positive, and it masks the counter (MEDIUM)

**What the "1" actually is (VERIFIED, named by measurement).** I reproduced the gate's own probe
(`scrollWidth > clientWidth + 1` and `overflowX ∈ {hidden, clip}`) against the candidate at 390×844, in the
page, and the single hit is:

```
header.hero  —  scrollWidth 408, clientWidth 368, overflow-x: hidden, rect {l:10, r:380}
```

and the overflow is **not** any element inside it — the header's real children all fit (the stepper's right
edge is 365, inside the content box's 378). The source is the header's **decorative pseudo-element**:

```
header.hero::after  { content: ""; width: 260px; position: absolute; left: 148px; right: -40px; }
```

`right: -40px` pushes it exactly 40 px past the content box, and `overflow-x: hidden` clips it — which is
precisely the 40 px by which the header's `scrollWidth` (408) exceeds its `clientWidth` (368).

**Two consequences.** (1) **Nothing interactive is cut off** — so this is a cosmetic detail, not a usability
defect, and the gate's counter has been reporting a decorative glow as a clipped element in every run since
the probe was added. (2) **A permanent "1" is a bad counter**: the next *real* hidden-clipped control would
show up as "2" and be easy to dismiss, and a reviewer scanning for `hiddenClipped: 1` learns to ignore it.

**Proposed:** keep the probe, but separate the two cases and make the decorative case non-blocking:

```js
// report decorative overflow separately so a permanent false positive cannot
// mask a real hidden-clipped control
hiddenClipped.push({ tag, id, cls, overflowX, scrollWidth, clientWidth,
                     interactive: !!(el.matches('button,a,input,select,textarea,[role=button]')) });
// and in the verdict, count only interactive elements toward the failure
```

and, if the counter is meant to be an alert, key it on `interactive: true`. A pseudo-element cannot be
matched by `querySelectorAll` at all, so the cleanest alternative is to exclude the `header.hero` case by
element role rather than by hard-coded selector.

**Cost of being wrong:** a decorative overflow stops being counted, so a purely cosmetic regression would no
longer show up in the counter. **Default: keep reporting it, but as a separate non-blocking field.**

## P3 — the receipts are not valid JSON, and the detail lives outside the object (MEDIUM)

**VERIFIED.** Each `_agents/longcat/evidence/variance-run*.json` is a JSON object **followed by a trailing
summary line**, so a strict parser fails:

```
$ python3 -c "import json;json.load(open('variance-run1.json'))"
json.decoder.JSONDecodeError: Extra data: line 192 column 1 (char 5552)
```

and — more importantly — the **richer fields live only in that trailing line**: `week1`, `week1Of17Seen`,
`perTab`, `clippedCount`, `coveredCount`, `unscrollable`, `hiddenClipped`, `worstTab`, `hiddenClippedCount`,
`gamesPlayedInternal/Visible`, `standingsTeamRows`. The JSON object's `detail.steps` carries the other eleven
fields. A reader who parses the JSON and misses the tail will believe the receipt does not record the Week 1
observation or the per-tab viewport findings.

**Proposed:** write the receipt as one JSON document and, if a human-readable summary is wanted, as a
**separate** file (e.g. `variance-run1.summary.txt`) or under a `summary` key — never as trailing text
inside a `.json` file. The trailing line also duplicates the verdict, which is the one field that must
never be ambiguous.

**Cost of being wrong:** two files instead of one, and any consumer that reads the trailing line has to
change. **Default: one JSON object, with a `summary` key or a sibling `.txt`.**

## What I did not check

- I did **not** run the gate against a modified build, so the effect of P1 on the current artifact is
  predicted from the source, not observed (the P0 measurement itself is LongCat's
  `p0-390px-startSeason.json`, and the `inVp` semantics are read from `tests/e2e-smoke.mjs` l.127).
- I did **not** audit the gate's other measures for the same vertical-axis blind spot beyond `inVp`
  (the `clipped`/`covered`/`unscrollable` probes are horizontal in nature; a full review is a separate job).
- I did **not** check whether the `::after` decoration's 40 px is intended (a deliberate bleed that the
  header then clips, or an accidental overflow) — that is a design question for the Architect, not a defect
  I can settle.
- I did **not** modify the gate, the spec, the product or any pool; the two gate files are another
  contributor's.
