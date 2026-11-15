SPEAKER: inkling | ROLE: council | TASK: review — Ernie's Vue-vs-Svelte player-cards comparison (P-345 round) | DATE: 2026-11-15T02:35Z
FOR: P-345

REVIEW-OF: `inbox/20261114-2005-ernie-COMPARE-svelte-vs-vue-cards.md` (origin/council/ernie, commit `4a79dddb`)
VERDICT: ok

## What I ran (this machine, node v26.13.0, Playwright 1.65.0, cwd `/private/var/…/T/opencode/ernie-arms`; his arms rebuilt from `git archive`, fresh `npm install`)

1. **Both arms build exit 0** — `npm run build`: svelte ✓ (438 ms; hashes byte-identical to his route-A receipt: `index-CrsA18_L.js` 37,745 B / `index-Do3gFrSf.css` 2,502 B) · vue ✓ (286 ms; `index-DPVYDG0W.js` 69,057 B / css 2,084 B). **VERIFIED.**
2. **Bundle, re-measured with `gzip -9`** (raw / gz9):
   | | Svelte (his) | Vue (his) | Delta (mine) |
   |---|---|---|---|
   | JS | 37,745 / 14,778 (14,796) | 69,057 / 27,434 (27,452) | **Vue +31,312 raw · +12,656 gz** (his: +12,656; JS raw his 37,745/69,060) |
   | CSS | 2,502 / 966 (985) | 2,084 / 919 (938) | Vue −418 raw · −47 gz |
   | Total gz | 15,744 (15,781) | 28,353 (28,390) | **Vue +12,609 B gz (+80 %)** |
   Every figure reproduces within ~37 B — a constant ~18–19 B delta on every gzip value (archive/gzip-level nuance), relative deltas identical. **VERIFIED: at this scale Svelte wins the bundle 1.8×.**
3. **Lines: 103 / 113 — VERIFIED** (`PlayerCard.svelte 55 + App.svelte 48 = 103 · PlayerCard.vue 61 + App.vue 52 = 113`). Reverses direction vs the four-slice sitting (Vue leaner there), so lines are not a decision input — his own conclusion, agreed.
4. **Mount, 5 trials each, `--allow-file-access-from-files`** (his `.pcard` selector, 390×800): svelte 30/30/34/37/125 (median 34) · vue 30/33/44/50/155 (median 44). Direction holds (Svelte faster by ~10 ms, tighter top-of-range 37 vs 50) but **magnitude does not** on this unthrottled machine — and both arms carry the same single-run cold-start outlier his own single-run probe was reversed by (his 153 vs 117 ≠ 5-trial 51 vs 71). **VERIFIED as a *direction*; his millisecond numbers are machine-class, not law.** His OUTLIER footnote (460 ms → why MUSE's 10-trial protocol is right) is confirmed on my box too (125/155 ms).
5. **`svelte-check` 0/0 and `vue-tsc` exit 0** on the committed trees. **VERIFIED.**
6. **390 px clean** (multi-probes + his shot): sw 390 = vw 390, and his `shot-390.png` is intact in git (58,222 B, sha256 `e44e41c3…`, blob matches his CHECKSUMS). **Renders 6 cards** — J. Smith-Njigba / Ja'Marr Chase / Josh Allen / Puka Nacua / Christian Gonzalez / Cam Skattebo, SPD bars, OVR, keyboard hint line — animated bars + glimmer-free (this arm has no shimmer), consistent with his claims. I eyeballed it; it is real UI, not a placeholder. **VERIFIED.**

## Where I disagree / would change (not blocking; for the author)

- **Routing**: `FOR: P-287` — this is the framework round (P-345), not P-287. A `PRIORITY+` line or a re-tag would help the Architect collect it.
- **§ numbering** runs 2 → 5 → 4 (cosmetic).
- **The mount table should state the machine class inline** (unthrottled macOS, ~1900/2400 ms class boot, vs MUSE's 6× throttle file:// protocol). His `unknown` on whether the mount gap survives at four-slice scale with the engine vendored is the right unknown — and MUSE's boot data (REPORTED: Vue median mounted 2185 vs Svelte 2344, −159 ms, Vue-favoured) says the engine **dominates** the boot, i.e. **his "Svelte wins at this scale" and MUSE's "Vue faster at product scale" are the same finding at two scales, not competing ones**. The only cross-scale criterion that survives is the one he names: authoring + tooling — and on that axis his sitting shows Svelte = 103 lines/1 build/1 config-step-fewer vs Vue's `vue-tsc` tsconfig break + `.value` duality standing trap, i.e. **his arm is the authoring win at small scale; the four-slice sitting's defect tally (Svelte: 7 defects / 10 repair cycles vs Vue: fewer — phase-J ledger) says the authoring win narrows with surface size**. Authoring is not decided by one sitting; it needs the cold-task design (P-345 filing, Q2/Q3).
- **Line-count frame**: at this scale Vue is +9.7 %; do not use mid-sitting deltas to settle anything — his own §5 last line already concedes the sign flip; keep that in front of the Owner.

## Weakest point

Two arms, one agent, one card, same-machine, no CPU throttle, no low-end profile, engine absent — the comparison is clean and honest **but it measures the empty-shell regime only**; it cannot rank frameworks for the product. His §6/§7 say exactly this; the council must quote §7 (not the headline) when the Owner asks "which framework".

Labels: **VERIFIED** — items 1–6. **REPORTED** — wall clocks, single-build attempts, his millisecond medians (machine-class). **UNKNOWN** — mount gap at product scale (shared unknown with MUSE's boot; two independent protocols now say "engine dominates").

— inkling (advisor seat) · 2026-11-15T02:35Z · read-only on every other seat's branch
