SPEAKER: porca | TASK: implications and improvements for cakepanz / the UI-UX shell over Claude's engine | DATE: 2026-11-21T03:12Z
FOR: S15 (work-order sitting; no matching live P- row)
IDEA: after reviewing the published S15 tree, these are the improvements I would file next. They are proposals, not edits; I wrote nothing in the delivery or in colors/.

## The frame: what S15 actually changed, and the implication

S15 moved the "top three" recommendation from a *row decoration* (the ring) into the *action itself*: one Draft button per row, all buttons pulse, the three graduate to a sheen + a TOP badge + one reason line. That is a real improvement over S14 — it puts the recommendation where the click happens, keeps the engine sort as the single source of truth (first three array positions, L24), and removes a second pick control. But it also means the shell now carries **five new stable class names** (`.cp-top3`, `.cp-draftbtn`, `.cp-istop`, `.cp-toptag`, `.cp-why`) that batteries, probes and tools all depend on. S15 found the seventh dependency the brief missed (`tools/shell-status.mjs:114`) only by hand. The durable lesson is I1 below.

---

### I1 — GENERATE the selector contract; never hand-maintain it (risk → defect class, high value)
The hand-over still lists `deliveries/S15-SELECTOR-NOTE.md` as NOT DONE. A hand-written note will drift the moment a seat adds a probe. **Proposal:** `scripts/selector-note.mjs` emits the note from (a) the selectors actually used by `batteries/*.mjs` + `tools/*.mjs`, and (b) the classes present in `src/lib/components/*.svelte`; fail if a battery/tool selector has no source match. That single check would have caught `shell-status.mjs:114` automatically, and would have caught the L21 `cp-quick` assertion miss the hand-over had to fix by hand. Add its output to MANIFEST via regen. **Law:** new gate `G-SEL`; falsifier: plant `.cp-quick` in a battery → G-SEL must DIE. Blast radius: tools only; no product bytes. Label: INFERRED (mechanism reasoned, not run).

### I2 — Bridge the reason to the Draft button for screen readers (small, concrete, high UX value)
Today `cp-why` is a non-focusable sibling span (BoardRow.svelte:58-64) and the Draft button only says "one of your top three priorities" in its aria-label (:56). A keyboard/screen-reader user learns *that* the player is recommended but not *why* without leaving the control and reading the row in browse mode. Add an id to the why span and point the button's `aria-describedby` at it. This snippet was checked with the Svelte 5 autofixer at the tree's pinned version (`svelte ^5.57.3`): **0 issues, 0 suggestions**.

```svelte
<button class={['cp-draftbtn', { 'cp-istop': suggest }]}
  onclick={() => (onpickDirect ?? onpick)(r.id, r.slotLabel)}
  disabled={busy}
  aria-label="Draft {r.name} at {r.slotLabel}{suggest ? ' — one of your top three priorities' : ''}"
  aria-describedby={suggest && why ? `cp-why-${r.id}` : undefined}>Draft at {r.slotLabel}</button>
{#if suggest && why}
  <span class="cp-why" id={`cp-why-${r.id}`}>{why}</span>
{/if}
```
(The `class={[...]}` form is the autofixer's style suggestion; keeping the existing `class:cp-istop={suggest}` is equally valid — the DOM and the L27 law are unchanged either way.)
**Law:** L31 — the three Draft buttons' `aria-describedby` resolves to their own `.cp-why` text; no other button has one. Falsifier F31: remove the attribute → L31 must DIE. Blast radius: one component + one battery. Label: INFERRED.

### I3 — Make the pulse a guide that retires, not a permanent state (motion + perf w89 did not need)
w89's own comment (`:12847`) calls the all-button pulse "a visual guide". On the cakepanz board that means roughly 50–57 buttons animating `filter` + `box-shadow` continuously; reduced-motion is handled correctly, but a user who never sets the OS flag gets permanent peripheral motion for the whole draft. **Proposal:** keep the pulse on pick 1 for onboarding; after the first successful PICK, drop a `guided=false` flag so only the top-three sheen remains (the recommendation signal, not the click-me signal). Add a Settings "calm board" toggle for people who want it off from the start. Two laws: L29 (pulse present at pick 1) and L32 (absent after first pick, sheen unchanged); reduced-motion still kills both at every point. Blast radius: App.svelte flag + shell.css + board battery. This is a reversible cosmetic call — Architect's to make, no need to ask the Owner. Label: INFERRED (I did not profile frame cost).

### I4 — On phones, the TOP badge and the Draft button end up on different lines
BoardRow.svelte:116-120 wraps `.cp-btnwrap` to its own full-width line at ≤430 px, while the badge stays in `.cp-main`'s name cell (:34). The "recommended → act" pairing is therefore split vertically on exactly the devices where glanceability matters most. w89's badge-in-name/button-in-cell parity is worth keeping on desktop. **Proposal to evaluate (not a directive):** at ≤430 px, move the badge into the button wrap with CSS `order` on a single DOM badge (do **not** duplicate the node — L26/L27/L28 count badge nodes per row), or place a small TOP marker on the `.cp-draftbtn` while keeping the name badge. Needs a 390 px visual-battery law (W15) and a screenshot side-by-side. Label: INFERRED from the CSS; I did not render it.

### I5 — The manifest contract has three implementations; collapse to one (follows F1 of my review)
`regen-manifest.mjs` writes sha256, `gate-manifest.mjs` verifies sha256 with matching exclusions, `tools/verify-package.mjs` still parses md5. The gate passes while the documented portable verifier fails on its own package. **Proposal:** extract `scripts/manifest-rules.mjs` (hash algo, `isReceipt`, self-ref set, skip dirs) and import it in all three; add `verify-package` (or its replacement) as acceptance-run step 14b so the drift cannot recur. Falsifier: corrupt one listed file → DIES; plant an unlisted one → DIES. Blast radius: scripts/tools only. Label: VERIFIED defect (see review F1), proposed fix INFERRED.

### I6 — Freeze the *generated* engine mirror as well as the source fence (cutover risk)
The app compiles `src/engine` (seam.ts:9-27, no vite alias) and that tree is byte-identical to the pin — good. But `src/engine-node/` is a second copy that `verify-package.mjs:44` explicitly skips (`SKIP_DIRS`), so tampering there is invisible to packaging while node batteries run against it. **Proposal:** at build time assert hash parity between the two engine trees, or stop shipping `engine-node` and generate it in the acceptance script. This protects the "engine is the truth" rule on both sides of the seam. Label: INFERRED (I did not find an existing parity gate; if one exists in gate-manifest, cite it and drop this).

### I7 — Rename the L26/L27 law wording, not the behaviour
"EXACTLY on the three" is false as written whenever C′1's tie extension marks a fourth row (SHELL-STATUS:32 measures exactly that). The assertion is set-equality, which is correct. Rename to "the top-three **set** (3 rows, extended on a display tie)" in the battery header, hand-over and cutover docs. Otherwise a future seat will "fix" the tie rule to satisfy a law that never asked for it. Trivial docs edit, no product bytes. Label: VERIFIED wording mismatch.

---

## Standing constraints I did not cross
No product/engine/pin/governance/queue file was edited; no build or gate re-run (I did not execute the batteries, the composite, or the falsifiers — their counts in the tree are REPORTED receipts, not my VERIFIED results). The one Svelte snippet above was run through the Svelte 5 autofixer at `5.57.3` (0 issues / 0 suggestions). All design-parity claims about w89 were re-measured from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B) this sitting.
