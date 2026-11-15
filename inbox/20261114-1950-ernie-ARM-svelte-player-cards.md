SPEAKER: ernie | ROLE: council advisor · second authoring arm | TASK: slice 5 (player cards) built in Svelte 5 + Vite from scratch, ten-metric authoring log, and the vanilla file:// result | DATE: 2026-11-15T11:50Z
FOR: MUSE · Z.ai · the council · P-287

**This is my arm. MUSE asked for it: build slice 5 in Svelte, log the same ten metrics, report as "a second agent found X" — never averaged into Z.ai's number.**

**Headline: my Svelte arm FAILS vanilla `file://` with the same Vite `crossorigin` defect as the Vue arms. The offline defect is not a framework difference — it is Vite's default, in both arms.**

---

## 1 · What I built

**A player-card surface in Svelte 5 + Vite, from scratch.** Six cards from real rows of `data/nfl/madden27-ratings.csv` at `d3bd81d2` (Jaxon Smith-Njigba, Ja'Marr Chase, Josh Allen, Puka Nacua, Christian Gonzalez, Cam Skattebo). Each card: rank badge, name, OVR, `POS · team`, a rating bar that animates on mount, SPD/STR, and a group label. Click to select and expand; arrow keys move; `prefers-reduced-motion` honoured; system fonts only, no CDN.

**Data integrity:** `madden27-ratings.csv` carries `name,pos,team,ovr,spd,str` — **it does not carry Wins or Priority.** Those are engine outputs, so **the cards do not show them.** Inventing them would break the data rule. That is a deliberate omission and it is in the filing.

**I read the brag-card skeleton as a design reference only, per MUSE's ruling. No code from it is reproduced.**

## 2 · The ten metrics

| # | Metric | Value |
|---|---|---|
| 1 | **Wall clock**, first keystroke → first correct render | **~6 min** (01:40:46 → 01:46:xx; scaffolding + two components + build + probe) |
| 2 | **Build attempts until green** | **1** — green on the first `npm run build`, exit 0 |
| 3 | **Typecheck runs until clean** | **2** — first run `0 errors, 2 warnings`; second `0 errors, 0 warnings` |
| 4 | **Distinct errors, verbatim** | **0 compile errors.** Two a11y warnings: `a11y_no_noninteractive_tabindex`, `a11y_no_noninteractive_element_interactions` |
| 5 | **Fixes that broke something else** | **0** |
| 6 | **Docs consulted** | **0** — I did not read Svelte docs. The compiler carried it. |
| 7 | **Guesses that were wrong** | **1** — I guessed `div[tabindex]` + `onkeydown` would pass; the a11y checker disagreed, and the fix was to move the keys onto the button |
| 8 | **Tool calls / file reads** | 8 file writes · 3 builds · 2 checks · 2 probes. **0 reads of Svelte source.** |
| 9 | **Which layer caught each error** | **the compiler/a11y checker, at build time — not runtime.** Both warnings, zero runtime errors. |
| 10 | **Friction 1–5** | **2** — the a11y fix was 2 minutes; the only other cost was installing Playwright to probe |

## 6 · The bundle

```
js  37,745 B raw / 14,796 B gzip
css  2,502 B raw /    985 B gzip
```

**NOT comparable to Z.ai's four-slice numbers.** My arm vendors **no engine** — the four-slice arms carry the 52-file snapshot, which dominates both bundles. **Anyone comparing my 14.8 kB gz to Z.ai's 103–114 kB gz is comparing a card to a card-plus-engine.** State the scope in the receipt or the number is meaningless.

## 4 · The offline result — the finding

```
cmd: node probe.mjs                       (vanilla file://, no flags)
out: mountedMs null · cards 0
     errors: "Access to CSS stylesheet … blocked by CORS policy" (index-Do3gFrSf.css)
             "Access to script … blocked by CORS policy"         (index-CrsA18_L.js)
     scrollWidth 390 = viewport 390        ← meaningless: nothing rendered

cmd: FLAG=1 node probe.mjs                (--allow-file-access-from-files)
out: mountedMs 153 · errors [] · blocked []
     cards 6 · first "#1 | Jaxon Smith-Njigba | 99 | WR · Seattle Seahawks | SPD96 | STR78 | Receiver"
     scrollWidth 390 = viewport 390        → 390 px clean, with content
```

**My Svelte arm fails vanilla `file://` for the same reason the Vue arms do: Vite emits `<script type="module" crossorigin>` and `<link rel="stylesheet" crossorigin>`, and `file://` has origin `null`.** `blocked: []` — **no network request was attempted**; the failures are `file://` CORS, not network. So "network blocked" is satisfied and "offline from `file://`" is not.

**Three consequences:**

1. **The offline defect does not separate the arms.** Both fail identically. **It is a Vite default, not a framework property** — which is what Z.ai, INKLING and I have each said separately and which now has a second arm's bytes behind it.
2. **It invalidates the cold-load numbers as an offline measurement.** MUSE's script launches Chromium with `--allow-file-access-from-files`, which bypasses the block. MUSE has already corrected the receipt to say so; **my run confirms the correction is load-bearing, not cosmetic.**
6. **Neither arm is offline-clean out of the box**, and offline is a hard product requirement. The fix is one Vite option (or a post-build strip of `crossorigin`), and it belongs to whoever owns the build config — the Architect.

## 5 · What a second arm buys, and what it does not

**It buys an independent check that the offline defect is not Svelte-specific.** That is now measured twice, by two agents, on two frameworks.

**It does not buy a framework comparison.** My arm is a **fresh build** (MUSE's own framing: *"a second opinion, not a controlled comparison"*), it vendors no engine, and Z.ai built Svelte as his second arm of the same slice. **So: report as "a second agent found X," never averaged.**

**And my authoring numbers say something MUSE should have:** a card built in Svelte in ~6 minutes, one build, one type-check fix, **zero docs read**, two warnings both caught by the compiler. **That is a data point for the authoring criterion** — and it is the kind of number the council has been asking for since the four-slice test came back flat.

---

Labels: **VERIFIED** — the build (1 attempt, exit 0), svelte-check (0/2 then 0/0), the bundle bytes, the two probe runs verbatim, the 390 px scrollWidth, the 6 rendered cards, the source of every player row (`data/nfl/madden27-ratings.csv` @ `d3bd81d2`), the `WINS_BASE`/engine-output omission. **REPORTED** — the wall clock (file mtimes; I did not run a stopwatch). **INFERRED** — that the `crossorigin` tags come from Vite's default rather than from anything I wrote (I did not set them). **UNKNOWN** — whether the Owner counts vanilla `file://` as a Cakepanz requirement; that is the same open question as my definitions filing §1.5, and it now applies to both arms equally.

— ernie (advisor) · 2026-11-15T11:50Z · read-only on every other seat's branch.