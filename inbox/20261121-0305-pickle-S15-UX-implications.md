SPEAKER: pickle | ROLE: council seat | TASK: further implications and improvements for the Cakepanz shell over Claude's engine | DATE: 2026-11-21T03:05Z
FOR: S15 (Cakepanz UI/UX shell)

TO-ARCHITECT: five proposals arising from the S15 byte review. Items 1–2 close holes found in the
published tree; items 3–5 are innovations that keep the Owner's w89 parity and the engine fence intact.
None edits product or engine files here — these are snippets and specs for the Architect's tree.

## 1. Make the one-click toast tell the truth (RISK, INFERRED from code; not run)

`DraftBoard.svelte:37-46` sets `draftedToast` synchronously before `onpick`, which is now the async
`App.svelte:194` `pick()`. S32 correctly surfaces "illegal fit" from a refused PICK, but the toast
still announces "Drafted · <name>" — two contradictory messages on one screen.

Exact shape (three coordinated edits, no engine change):

```ts
// App.svelte — pick(): return the truth to the caller
async function pick(playerId: string, slot: string): Promise<boolean> {
  if (busy) return false;
  ...
  const st = await store.dispatchAsync({ type: 'PICK', playerId, slot });
  error = st.error ?? '';
  ...
  return !st.error;                       // before the early done-navigation? return after it
}

// DraftBoard.svelte — prop type
onpick: (id: string, slot: string) => boolean | Promise<boolean>;

// quickDraft(): await the engine, then toast only on success
const ok = await onpick(id, slot);
if (ok === false) return;                 // S32's error line is the only message
draftedToast = { name: vm.rows.find((r) => r.id === id)?.name ?? 'the pick' };
```

Keep the 380 ms guard (it must be set before the await). New law **L31**: plant an illegal fit →
error line shown AND zero `.cp-drafted-toast`; the next legal pick shows the toast and clears the error.
Falsify it (F31) in the same sitting. SAFE ALONE? no — the three edits travel together.

## 2. The side-by-side must capture a panel-bearing screen (CALIBRATION QUESTION)

`.cp-panel` renders on season screens only; z.ai's own smoke probe saw `panelRadius` fall back to
body on the board. The glass restyle (S33) therefore changes nothing visible on the draft board — the
screen this slice is about. The Owner's required side-by-side (my `inbox/20261121-0250-pickle-S15-side-by-side-spec.md`,
32 captures) should add Hub + Week to the four scenes, or the Architect should explicitly scope the
glass claim to season screens. Recommendation: add Hub to the matrix; it is the first screen after a
pick and carries the largest glass surface. Do not invent a `.cp-panel` on the board to make a test
pass — that would change L12's uniform-board anatomy.

## 3. Bounded motion: pulse as wayfinding, not wallpaper (INNOVATION)

w89's W66 puts the pulse on every Draft button; keeping that is the Owner's parity call. But 60
simultaneous infinite box-shadow animations on a phone is a real battery/noise cost, and a guide that
never stops is no longer a guide. Two additions preserve the "every button breathes" law:

- stagger with `animation-delay: calc(var(--cp-row-i, 0) * 40ms)` (set `--cp-row-i` per row from the
  index; the pulse still exists on every button, and L23's `animationName/duration` assertion holds);
- pause the pulse while the pointer is inside `.cp-rows` (`:hover` on the container sets
  `animation-play-state: paused` on descendants) — the user has already found the board; the sheen
  on the three remains. Reduced-motion still kills both exactly as today.

Gate it behind the existing `body.cp-reduced` pattern so it can be A/B'd in the side-by-side without
a second build. INFERRED perf benefit — measure with the motion shots before claiming it.

## 4. Name the sort in the badge (INNOVATION)

`BoardRow.svelte:34` says "One of your top three priorities right now" for every sort. The three are
the first three ARRAY POSITIONS of the *active* sort (`L24`), so under the OVR sort the badge claims a
model priority that the engine did not compute. Make the title carry the sort:
`title={'One of your top three by ' + sortLabel}` with `sortLabel` from the existing VM/sort state.
The badge text stays "TOP" (w89 parity); only the tooltip becomes honest. This is the same doctrine
as the gone% method tooltip (S15's T4): the shell explains what it computed, never invents a reason.

## 5. Focus continuation after a pick (INNOVATION)

The new `busy` flag disables every `.cp-draftbtn` while a dispatch is in flight (`BoardRow.svelte:55`,
`BoardFooter`, `TeamSelect`), and the picked row leaves the board. A keyboard drafter therefore loses
focus after each pick and must tab back from the top. Add a post-dispatch focus target: after a
successful PICK, focus the Draft button of the row that moved into the picked row's position (or the
board heading when the draft completes). One engine-owned state transition, one shell-owned focus call
— no engine change. New law L32: keyboard-only, two consecutive picks without a Tab to the top. This
is the biggest practical UX gain of the five for repeated drafting.

## Cross-cutting: a "new law must be falsified" gate (PROCESS)

F27–F30, S32 and S33 have no DIED receipts in the published tree — they are asserted in prose. A law
that has never been falsified may be a tautology, and the whole point of the falsifier suite is to
prevent that. Proposal for the Architect/MUSE: in `acceptance-run.sh`, fail the run if any law name
introduced in the current sitting lacks a `DIED` line in the falsifier stdout. Cheap version: a
`CP_NEW_LAWS` env list checked against the receipt text. This closes the drift class at the source —
the same class as the manifest-format defect in `inbox/20261121-0303-pickle-S15-manifest-drift-fix.md`.

EVIDENCE: items 1–4 are VERIFIED code reads at the published commit; their behaviours and perf claims
are INFERRED (not run in a browser this sitting). Item 5 is a proposal grounded in the verified
`disabled={busy}` sites. No files outside `inbox/` edited.
