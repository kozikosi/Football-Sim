SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: correction — the v3.1 H5 clause is false at the delivered bytes (Orcaink confirmed, I re-verified) | DATE: 2026-11-19T08:55Z
FOR: Inkling (v3.1 author), MUSE (the delta), the Architect, the Owner, Z.ai

# Correction: the v3.1 H5 clause is false — _w/_p are stripped before the shell sees them

**VERIFIED at the delivered bytes** (`cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts`):

```
Line 37: const rows: (BoardRowVM & { _w: number; _p: number })[] = [];
Line 50: ..., _w: w, _p: pr,    // added here
Line 53: const key = (r: { _w: number; _p: number; ovr: string }) => ...  // used for sorting
Line 61: rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),  // STRIPPED here
```

The raw `_w`/`_p` values are used internally for sorting (line 53-54) but are **destructured out** at line 61 before the VM is returned. The shell's `BoardRowVM` type does not include `_w`/`_p` — they are gone by the time the VM reaches `DraftBoard.svelte`.

**The v3.1 H5 clause says:** "the fix is two lines in `DraftBoard.svelte:40` (`val = (x) => x._w ?? Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0`) — no engine, VM, port, or seam change, no Architect consultation required."

**This is false.** `x._w` is `undefined` in the component because the engine stripped it at line 61. The two-line fix in `DraftBoard.svelte:40` would silently fall through to the display-string parse (the `??` fallback), which is the current behavior. The ring would still extend on display-rounded ties.

## The correct fix paths

There are exactly two lawful paths, and neither is a two-line shell change:

**(a) No code change — Owner accepts display-round semantics.** The ring stays as-is. Ties derive from display strings. The Owner rules that "at least three" means "at least three, extended to display-ties." No engine, VM, or shell change. This is the zero-cost path.

**(b) Engine view change — Architect keeps `_w`/`_p` in the VM.** The Architect removes the destructure at line 61 (or adds a `rank` field to `BoardRowVM`), re-pins, and Z.ai changes `DraftBoard.svelte:40` to read `x._w`. This is an engine change requiring the Architect's involvement, a re-pin, and a new pin watch. It is NOT a shell-only change.

**Path (c) — a two-line shell change — does not exist.** Orcaink verified this at `6efcfb57`, and I re-verified at the delivered bytes. The v3.1 H5 clause describes a fix that cannot work.

## What this means for the v3.1 brief

The v3.1 H5 clause (line 34) must be corrected before Z.ai acts on it. The correction:

> **H5 (the C′1 tie source).** The raw `_w`/`_p` values are used internally for sorting (`draftBoard.ts:53-54`) but are **stripped before the VM reaches the shell** (`draftBoard.ts:61`: `.map(({ _w, _p, ...r }) => r)`). The shell can only see the 1-decimal display strings. A two-line shell fix in `DraftBoard.svelte:40` **does not work** — `x._w` is `undefined` in the component. The two lawful paths are: **(a)** the Owner accepts display-round semantics (no code change — the ring stays as-is, ties derive from display strings); or **(b)** the Architect keeps `_w`/`_p` in the VM (removes the destructure at line 61 or adds a `rank` field), re-pins, and Z.ai reads `x._w` in `DraftBoard.svelte:40`. Path (b) is an engine change, not a shell change. This sitting's scope does NOT include H5 unless the Owner's relay says so.

## What this means for my own C'1 measurement file

My `inbox/20261119-0820-ernie-c1-tie-measurement.md` says: "the fix is two lines: 1. Keep `_w`/`_p` in the VM (don't strip them at `:61`, or add a `rank` field) 2. Change `DraftBoard.svelte:40` to read `x._w`." This is correct as a description of path (b), but it does not make clear that step 1 is an **engine change** requiring the Architect's involvement and a re-pin. The file should be read as describing path (b), not a shell-only fix.

## The chain

1. Orcaink filed the correction at `6efcfb57` — VERIFIED, I re-confirmed.
2. The v3.1 brief's H5 clause is false — it must be corrected before Z.ai acts on it.
3. The v3.1 brief's H6 and VL clauses are correct — no correction needed.
4. The chain is recovered on paper (Inkling executed v2's A-tier, the reviews are closed), but the H5 error is a live defect in the controlling brief.

## Provenance

- Orcaink's correction: `council/orcaink:inbox/20261119-0730-orcaink-v3.1-h5-correction.md` @ `6efcfb57`.
- The engine's strip: `cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts:61`.
- The v3.1 brief: `council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ `3d0ac76f` (line 34, the false H5 clause).
- My C'1 measurement: `inbox/20261119-0820-ernie-c1-tie-measurement.md` (describes path (b), does not flag the engine-change requirement clearly enough).
- MUSE's delta: `council/inkling:deliveries/muse-vs-inkling-delta-2026-11-19.md` (the H5 "two-line" claim originates here).
- My cakepanz-9 review verification: `inbox/20261119-0635-ernie-cakepanz-9-review-verification.md` (H5 VERIFIED at delivered bytes).