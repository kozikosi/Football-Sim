# Peer Review Findings — Beam (24 Oct 2026)

Review of OR, VL, UK, DS, MOC, MiniMax contributions visible on `origin/council/*`. Advisory only.

## OR (`_agents/or/`)

### V22 aesthetic proposals (`V22-Aesthetic-proposals-20261024.md`)
- Solid; 5 proposals all SAFE ALONE, CSS-only. Reconciles with Beam's team-colour approach (OR's `--accent` = default, team colours override when selected).

### V22 patches A-1..A-11 (`V22-Aesthetic-Patches-20261024.md`)
- Excellent granular utility layer. One issue: A-2 defines `@keyframes fadeIn/slideUp/scaleIn/pulse` — `pulse` name collides with Beam's `pulse` (opacity animation). Rename to `pulseOpacity` or scope. Minor.
- A-6 badge system redefines `.badge-run`/`.badge-pass` — verify no conflict with existing `.badge-run` (l.~624). Should be fine (additive).
- A-11 focus-visible: good; supersedes Beam P7-17 in CSS terms.

### V23 patches V23-1..V23-8 (`V23-Interactive-Beauty-20261024.md`)
- V23-6 (skeleton): redefines `@keyframes shimmer` — duplicates OR A-7's shimmer. Reuse existing name; don't redefine.
- V23-7 (high-contrast): `box-shadow:none!important` on `:root` does nothing (box-shadow not inherited). Move to `.panel`/universal or remove. Also `.panel{border:2px solid var(--border)}` removes box-shadow entirely — confirm intent.
- V23-8 (toast stack): `:nth-child(2)/(3)` with fixed `bottom:76px/126px` is fragile if toasts removed/re-added. Recommend Beam's queue-based toast (snippets §2) + OR's stacking visuals.
- V23-1 (team glow): references `--team-glow` and `--pick-x/--pick-y` — need JS setters; document.
- V23-2 (staggered reveal): requires `style="--i:0"` on children; document or auto-set via JS.
- V23-5 (win-prob dot): `calc(800ms/(1+var(--wp-vol,0)*3))` works if `--wp-vol` is a number. Fine.

### Patch script (`apply_aesthetic_patches.sh`)
- Not reviewed line-by-line; recommend dry-run first. The script applies A-1..A-11 in order; verify with `patch --dry-run`.

## VL (`_agents/vl/`)

### design-tokens.css
- Clean, well-organized. Minor: defines `--motion-fast/normal/slow` (150/300/500ms) which conflicts with OR's `--duration-*` (150/250/400ms). Unify on OR's tokens, alias VL's for compat.
- `--panel2:#1e2433` matches P7-4 request. Adopt as canonical.
- OVR tier colours (gold/silver/bronze) are new and valuable. Adopt as-is.

### aesthetic-prototype.html
- Good overlap with Beam snippets. VL adds bottom-sheet and filter-chip patterns (Beam lacked these). Adopt.

### interactive-prototype.html
- Most complete single-file demo of P0-18/19/29 + creative extensions. Recommend as reference prototype.
- Minor typo: `.rank-row div1` should be `.rank-row .rank` (harmless no-op).
- Creative what-if slider, week timeline, game ball ceremony are high-value; now captured in snippets §24.8–24.10.

### PLUGIN-KIT.md
- Excellent manifest; best single reference for Claude. Recommend Claude read it alongside Beam's integration guide.
- Doesn't flag the motion-token mismatch or team-palette strategy (JS vs CSS classes). Documented in snippets §21 reconciliation notes.

## UK (`_agents/uk/`)
- Contributions are governance/doc deltas and tools (`classify-anchors.mjs`, `complete-recovery.mjs`, `stamp-content-ids.mjs`, `verify-390px-fix.mjs`), not UX proposals. No errors found in the tools (not reviewed line-by-line). UK's tools may be useful for anchor verification.

## DS (`_agents/ds/`)
- DS has tools (`arch-probe.js`, `funcdiff-*.js`, `surface-lines.js`) and reviews. Not UX-focused. DS's `post-merge-smoke.mjs` moved to `tools/`. No errors found (not reviewed line-by-line).

## MOC (`_agents/moc/`)
- MOC has patches (`merge-guide-v21.patch`, etc.) and notes (`ux-player-browser-pagination-and-header.md`, `gate-viewport-patch-proposal.md`). Not reviewed line-by-line. MOC's viewport patch (P1-28) is relevant to Beam's mobile proposals (P7-9, P7-13).

## MiniMax (`_agents/minimax/`)
- Retired (tombstone). Notes include `advanced-stats-proposals.md`, `expansion-three-proposals.md`. Not reviewed (retired seat, lower priority).

## Summary of recommendations
1. Adopt OR's A-1..A-11 as the base utility layer (with A-2 `pulse` rename and V23-6/V23-7/V23-8 fixes).
2. Adopt VL's manifest as the canonical block index; layer Beam's snippets + OR's patches on top.
3. Unify motion tokens on OR's `--duration-*` + `--ease-*`; alias VL's `--motion-*` and Beam's `--transition-*`.
4. Adopt VL's bottom-sheet and filter-chip patterns (Beam lacked them).
5. Use Beam's JS-based `setTeamColors()` (covers all 32 teams) with VL's palette map as data source.
6. Use Beam's queue-based toast system (more robust than OR's nth-child stacking).

No critical errors found. All contributions are advisory and SAFE ALONE (CSS-only or display-only). No protected constants touched by any seat.
