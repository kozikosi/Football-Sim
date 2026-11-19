# The shell's next five things — a proposal, not a build

Date: 2026-11-19 · Seat: Z.ai · TASK 7.3 (v3.0 §7) · English only.
Grounded in files and lines I read this sitting; nothing here is built. Order = what I would do
first, and why.

1. **Make the draft deterministic: the `?seed=` seam.** `App.svelte:109` is
   `seed = 1000 + Math.floor(Math.random() * 9000);` and the only URL parameter in the app is
   `?dev` (`App.svelte:54`). Every UI walk is an unseeded sample — this sitting's own ring
   measurements differ from Ernie's at the same pick (my 31 vs his 46 ringed at pick 13) because
   of exactly that. Read `?seed=<n>` (validated to 1000–9999) at draft start, fall back to random.
   It is the precondition for deterministic battery runs, for paired what-if comparisons, and for
   reproducing any screen the Owner reports. Cheapest item, biggest leverage.

2. **C′1: rank the suggestion ring on raw values.** The defect is measured and mechanized: the
   ring extends on the PARSED DISPLAY STRING (`DraftBoard.svelte` suggestIds —
   `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,''))`), so at the pick-27 state all 60 rows
   show `+0.0` wins and all 60 ring. The fix is one line in the component — but it needs the raw
   `{ wins, priority }` on `BoardRowVM`, which is an engine-view export (or a re-pin), so it is
   the Architect's call first. This is also the item that pulls the shell toward the Owner's w89
   preference ("the ring looks worse than the glowing button in w89" — w89 rings EXACTLY 3 rows,
   each with its own Draft button; measured this sitting).

3. **One-click drafting on the suggested rows (the w89 affordance).** w89's pick flow is ONE
   click — the glowing suggestion row carries its own "Draft" button (`zpb-ctabig`, measured).
   cakepanz needs three interactions (expand row → "Draft at <slot>" chip → "Confirm the pick").
   Putting a direct "Draft at <slot>" button on the top-3 ringed rows (or making the ringed row's
   main button draft directly) would give the Owner's preferred feel without touching the save
   system. Product change — Architect's; recorded because it is the concrete shape of the Owner's
   w89 comment.

4. **Finish the a11y half of D3: associate the row with its detail panel.** `aria-describedby`
   count in the shipped src is 0 (measured). The tooltip is aria-hidden (D3 landed), and the row
   button carries aria-expanded/aria-controls for the disclosure — the missing piece is
   describing the row by its detail content so assistive tech gets the method text without
   expanding. One attribute + an id; product change, tiny.

5. **The stats screens' labels at cutover: the Owner's four strings.** SEASON STATS / PLAYOFF
   STATS / YOUR PLAYERS / LEAGUE LEADERS — ALL CAPS, w89 titles, closing GPT's copy gate. Not a
   build item — a recorded ruling for the product track to apply when Colors / 76 Pancakes ships
   (the fence forbids product edits this sitting).

Not proposed, deliberately: any re-zip of the c10 package (the Owner's distribution ruling: the
two GitHub folders are the artifact paths, no re-cut); any framework work (Svelte 5 + Vite 8 is
final; the pin reconciliation to Vite 8 is the Architect's cutover task); vapor-mode anything
(falsified and receipted — 31,498 B gz vs Svelte's 13,154 B gz on the identical surface).
