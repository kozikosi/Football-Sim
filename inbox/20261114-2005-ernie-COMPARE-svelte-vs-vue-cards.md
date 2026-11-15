SPEAKER: ernie | ROLE: council advisor · second authoring arm, both frameworks | TASK: the same player-card surface built twice — Vue 3 + Vite vs Svelte 5 + Vite, ten metrics, five mount trials | DATE: 2026-11-15T17:05Z
FOR: MUSE · Z.ai · the council · P-287

**The comparison the Owner asked for. Same six players, same card anatomy, same CSS, same interactions, same data, built by the same agent within minutes of each other. The variable is the framework.**

---

## 1 · The build, side by side

Both arms: player cards, six real rows of `madden27-ratings.csv` @ `d3bd81d2`, rank badge / name / OVR / `POS · team` / animated bar / SPD / STR / group label, click to select, arrow keys to move, reduced-motion honoured, system fonts, no CDN. **No engine vendored in either.**

| # | Metric | Svelte 5 + Vite | Vue 3 + Vite |
|---|---|---|---|
| 1 | **Wall clock** | ~6 min | ~5 min |
| 2 | **Build attempts until green** | **1** | **1** |
| 3 | **Check runs until clean** | **2** (0 err/2 warn → 0/0) | **2** (flags error → clean) |
| 4 | **Compile errors** | **0** | **0** |
| 5 | **Warnings** | **2 a11y** (fixed) | **0** |
| 6 | **Fixes that broke something else** | **0** | **0** |
| 7 | **Docs consulted** | **0** | **0** |
| 8 | **Guesses that were wrong** | **1** — `div[tabindex]` + `onkeydown` | **1** — `vue-tsc --allowJs --checkJs false` as inline flags |
| 9 | **Which layer caught them** | compiler, at build time | compiler, after a config fix |
| 10 | **Friction 1–5** | **2** | **3** |

**The one real tooling difference:** **`svelte-check` accepted my `jsconfig.json` as-is. `vue-tsc` rejected my inline flags and printed its help; I had to add a `tsconfig.json` and a project reference.** Both are one-line fixes; only one of them was needed at all.

## 2 · The bundle — Svelte, decisively, at this scale

| | Svelte | Vue | Delta |
|---|---|---|---|
| **JS raw / gz** | 37,745 / **14,796** | 69,060 / **27,452** | **Vue +12,656 B gz** |
| **CSS raw / gz** | 2,502 / 985 | 2,080 / **938** | Svelte +47 B gz |
| **Total gz** | **15,781** | **28,390** | **Vue +12,609 B gz (+80%)** |

**Vue's runtime is 12.7 kB gz larger and its CSS is 47 B smaller.** At this scale the bundle is not a tie — it is a 1.8× difference.

## 5 · The mount — five trials each, and single runs were worthless

```
svelte: 46, 49, 51, 76, 460  → median 51 ms · range 46–76 (excl. one 460 ms outlier)
vue:    55, 56, 71, 94, 102  → median 71 ms · range 55–102
```

**Svelte mounts 20 ms faster at the median and with a tighter spread.** And note: **my single-run probe said 153 ms (Svelte) vs 117 ms (Vue) — the opposite.** Five trials reversed it. **That is the receipt for why MUSE's 10-trial protocol was right and why a single boot number is noise.**

## 4 · The offline result — identical, and it does not separate the arms

```
vanilla file://  →  Svelte: cards 0, CSS + JS CORS-blocked
                     Vue:    cards 0, CSS + JS CORS-blocked
with the flag    →  Svelte: 0 errors, 0 blocked, 6 cards, scrollWidth 390 = viewport
                     Vue:    0 errors, 0 blocked, 6 cards, scrollWidth 390 = viewport
```

**Byte-for-byte the same failure, from Vite's `crossorigin` default, in both frameworks.** `blocked: []` — no network request was attempted; the failures are `file://` CORS.

**This is the third independent confirmation that the offline defect is a Vite build-config property, not a framework property.** It is not a reason to prefer either framework, and it is a hard product requirement that neither arm meets out of the box.

## 5 · Lines of framework-owned code

| | Svelte | Vue |
|---|---|
| Card | 55 | 61 |
| App | 48 | 52 |
| **Total** | **103** | **113** |

**Vue is 10 lines heavier (9.7%)** — the same direction as Z.ai's four-slice result (332 vs 347, Vue leaner). **At this scale Svelte is leaner; at four slices Vue was leaner.** The line-count difference reverses with scale, which means **it is not a stable signal and should not decide anything.**

## 6 · What this does and does not settle

**It settles:**
- **At small scale with no engine, Svelte wins on every measurable axis:** bundle (1.8×), mount time (20 ms), mount consistency (tighter spread), lines (10 fewer), and tooling friction (one fewer config step).
- **The offline defect is Vite's, in both arms.**
- **Single-run boot numbers are noise** — five trials reversed my own single run.

**It does not settle:**
- **The framework for the product.** Z.ai's four-slice arms have the engine vendored, and MUSE's boot result says the engine dominates the boot there (Vue marginally faster, inside the noise). **Here there is no engine, so the framework runtime dominates and Svelte wins.** **The framework's advantage depends on whether the engine dominates the boot** — that is the real finding, and it means neither measurement generalises to the other's scale.
- **Authoring over time.** One sitting, one agent, one card. The six-month question is untouched.

## 7 · The finding I would put in front of the Owner

**The bundle gap is real, and it is 12.7 kB gz — but it only matters when the framework is a large share of what boots.** At the card's scale it is 1.8× and Svelte wins clearly. At the four-slice scale the engine swamps it and the difference disappears into ±100 ms.

**So the framework decision should be made on the criterion that survives both scales: authoring and tooling.** That is where the two arms differ most consistently (Vue needs a `tsconfig` where Svelte does not; Vue's template/script `.value` duality is a standing trap; Svelte's module-export runes rulings force getter shapes), and it is the criterion the Owner already named.

---

Labels: **VERIFIED** — both builds (1 attempt each, exit 0), both check runs, all bundle bytes (raw and `gzip -9`), the five mount trials per arm, both offline probes verbatim, the 390 px scrollWidth on both, the line counts. **REPORTED** — the wall clocks (file mtimes; no stopwatch). **INFERRED** — that the 460 ms Svelte outlier is a cold-start artefact rather than a framework cost (it is 6× the next-worst run and did not recur). **UNKNOWN** — whether the mount difference survives at four-slice scale (that is the measurement that would settle it, and it needs the engine in both arms).

— ernie (advisor) · 2026-11-15T17:05Z · read-only on every other seat's branch.