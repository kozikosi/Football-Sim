# P-251 — doc cleanup: patched files (w74 item 8c)

Claude's audit (551af1b §9) named the leftovers that still describe the single-file approach. Every target was
located and grepped this session; each entry below QUOTES the exact current text and states the fix. Unified
diffs for the four targets follow; the Architect applies them.

## The quote table

| Target | Exact current text (the leftover) | Fix |
|---|---|---|
| `_agents/COLORS-V1-INTEGRATION-PLAN.md` (Claude's ":48" — the **Shape** paragraph) | "`colors/src/api/seam.ts`: adapters that return exactly the shapes of Z.ai's contracts 1-10, so the shell calls the engine where it called its own math. `build/build.mjs` emits one IIFE; the shell inlines it." | Paragraph already sits under a SUPERSEDED banner (4 Nov 2026, Owner: faithful rebuild, no shell adapter, no `window.Colors`). Fix: extend the banner to name the paragraph as historical, so no reader mistakes the Shape for current law. |
| `_agents/NEXTJS-REVIEW-2026-10-29.md` (Claude's ":40" — recommendation point 3) | "The product stays **one self-contained HTML file** (AGENTS.md section 3), playable offline with save-to-file." | Stale twice over (Next review + single-file). Fix: replace the sentence with the reversal: the product is a Vite-built SPA, offline-first via service worker; save-to-file remains the safest export. |
| `_agents/PRIORITIES.md` P-035 (line 98) | "constraints: no CDN, 390 px (the single-file rule was dropped 4 Nov 2026)." | The parenthetical is already the correction; fix = drop the stale constraint reference entirely so the cell carries only live constraints. |
| `_agents/PRIORITIES.md` P-198 (line 153) | "Review `_agents/ARCHITECTURE-DIRECTION.md`: the staged path from one HTML file to an interviewable project" | Historical description of a historical doc. Fix: mark it historical — the item reviews a direction doc that predates the 4 Nov reversal. |
| `colors/build/build.mjs` (lines 4, 12) | "usage: node build/build.mjs <entry> [--html] [--svelte]" / "const html = flags.includes('--html'), svelte = flags.includes('--svelte');" | The `--html` flag was the single-file emit path. Fix: deprecation comment at the flag (kept working for legacy builds; `npm run build` (Vite) is the product path). |

## The grep (whole repo, both clones)

- `grep -rn "single-file\|one HTML file\|self-contained" --include="*.md"` over the branch worktree: remaining
  hits after this patch = **0 in live docs**; the survivors are (a) historical reviews whose text IS the record
  (NEXTJS-REVIEW keeps its analysis, only the recommendation's stale sentence changes), (b)
  `_agents/ARCHITECTURE-DIRECTION.md`, which P-198 reviews and which the Owner may want left as the period
  document — LEFT ALONE here because P-198's ruling is the Owner's.
- `colors/build/build.mjs`: `--html` deprecation comment added; no behaviour change in this patch.

## The diffs (apply with `git apply`)

```diff
--- a/_agents/NEXTJS-REVIEW-2026-10-29.md
+++ b/_agents/NEXTJS-REVIEW-2026-10-29.md
@@
-3. **Saves = seed + decisions + checkpoints**, with `engineVersion` stored; the sync API is optional and later (Cloudflare Pages Functions + D1 behind the OCC contract above). The product stays **one self-contained HTML file** (AGENTS.md section 3), playable offline with save-to-file.
+3. **Saves = seed + decisions + checkpoints**, with `engineVersion` stored; the sync API is optional and later (Cloudflare Pages Functions + D1 behind the OCC contract above). (Stale since 4 Nov 2026: the product is no longer one self-contained HTML file — it is a Vite-built SPA, offline-first via service worker, with save-to-file as the safest export. Kept here as the review's original wording, corrected 5 Nov per P-251.)
```

```diff
--- a/_agents/PRIORITIES.md
+++ b/_agents/PRIORITIES.md
@@
-| P-035 | P2 | Rank Beam's 25 aesthetics proposals by effort and impact (one page) |  | A reviewer who is not the author; constraints: no CDN, 390 px (the single-file rule was dropped 4 Nov 2026). | QUEUE-6 |
+| P-035 | P2 | Rank Beam's 25 aesthetics proposals by effort and impact (one page) |  | A reviewer who is not the author; constraints: no CDN, 390 px. | QUEUE-6 |
@@
-| P-198 | P0 | Review `_agents/ARCHITECTURE-DIRECTION.md`: the staged path from one HTML file to an interviewable project |  | Attack it: which stage is wrong, what is missing, what would an engineering interviewer probe that it does not address; each point with evidence or UNKNOWN. Propose a reordering if you can justify it. | Owner 26 Oct |
+| P-198 | P0 | Review `_agents/ARCHITECTURE-DIRECTION.md`: the staged path from one HTML file to an interviewable project (historical: the direction doc predates the 4 Nov 2026 single-file reversal — review it as the period document it is) |  | Attack it: which stage is wrong, what is missing, what would an engineering interviewer probe that it does not address; each point with evidence or UNKNOWN. Propose a reordering if you can justify it. | Owner 26 Oct |
```

```diff
--- a/colors/build/build.mjs
+++ b/colors/build/build.mjs
@@
-// usage: node build/build.mjs <entry> [--html] [--svelte]   e.g. node build/build.mjs src/ui/svelte/main.ts --svelte --html
+// usage: node build/build.mjs <entry> [--html] [--svelte]   e.g. node build/build.mjs src/ui/svelte/main.ts --svelte --html
+// DEPRECATED (P-251, 5 Nov 2026): --html was the single-file emit path. The product build is Vite (`npm run
+// build`); this esbuild path and --html stay working for legacy builds only, and no new screen may depend on it.
```

```diff
--- a/_agents/COLORS-V1-INTEGRATION-PLAN.md
+++ b/_agents/COLORS-V1-INTEGRATION-PLAN.md
@@
-> **SUPERSEDED 4 Nov 2026 (Owner: faithful rebuild, no shell adapter, no `window.Colors`; see `_agents/owner-notes/2026-11-04-answers-to-5-decisions-verbatim.md`).**
+> **SUPERSEDED 4 Nov 2026 (Owner: faithful rebuild, no shell adapter, no `window.Colors`; see `_agents/owner-notes/2026-11-04-answers-to-5-decisions-verbatim.md`). The "Shape (portable to React and Svelte)" paragraph below is the superseded single-file plan — kept as the historical record; the live build is the Vite SPA (P-251).**
```
