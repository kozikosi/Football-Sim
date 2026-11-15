SPEAKER: beam | TASK: Fresh-start Vue vs Svelte experiments — design review (beauty direction) | DATE: 2026-11-15T13:30:00Z

## Scope

Review of the Owner's beauty direction for the two fresh-start experiment repos (Vue 3 + Vite, Svelte 5 + Vite): every slice must resemble the beauty and colors of w89 (live `https://kozikosi.github.io/Football-Sim/`, WAVE w89). Design references read: live site (fetched) and `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html` on `origin/council/ernie` (dark/gold, `--tc` team-color variable, animated shine). The four-slice arms stay in Football-Sim as evidence; the new repos start clean. React is out of the test (R-9).

## What I checked

- `origin/council/ernie:_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html` — fetched via `git show`. Confirmed dark bg `#0b0703`, gold palette `#ffc43c` / `#ecd9ad` / `#a08b62`, `--tc:#FB4F14` team-color variable, `Cinzel` + `Cinzel Decorative` fonts, radial-gradient championship halo, animated shine button (`fxshine`), 24px radius card, grid stats with 1px gold borders.
- Live site `https://kozikosi.github.io/Football-Sim/` — fetched; app shell (draft board, roster, sim controls) on dark chrome. Visual language matches brag-card: dark background, gold accents, team-color theming.
- Queue (origin/council/muse) — no P-row yet for experiment design review; this file is the design note, not a build.

## Design language (w89) — the standard every slice must meet

1. Background: near-black `#0b0703` → `#140d06` radial gradient, never pure white or neutral grey.
2. Gold palette: primary `#ffc43c`, body `#ecd9ad`, muted `#a08b62`, borders `rgba(201,162,75,.4)`.
3. Team color: CSS variable `--tc` (e.g. Broncos `#FB4F14`), applied via `color-mix(in srgb, var(--tc) …)` for halos, shine, accents. No hardcoded team colors in component CSS.
4. Typography: `Cinzel` for body/UI, `Cinzel Decorative` for headlines; letter-spacing on caps (`.22em`–`.5em`).
5. Championship feel: radial halo behind hero, 24px card radius, animated shine on primary CTAs, text-shadow glow on titles.
6. No horizontal scroll at 390 px (product rule, §10 of AGENTS.md) — slices must pass the 390 px check even in experiment form.

## Design standard for experiment slices (acceptance gate)

A slice is NOT done unless all of the following hold:

- Uses the w89 token set above (bg, gold palette, `--tc`, Cinzel fonts) — no default Vite/Svelte/Vue starter theme, no Tailwind defaults, no unstyled scaffold.
- Team color flows from a single `--tc` variable set at the root; components never hardcode `#FB4F14` etc.
- Dark background with gold accent on primary actions; primary CTA has the animated shine treatment (or an approved equivalent).
- 390 px width: no horizontal scroll, tap targets ≥ 44 px.
- A screenshot/mockup of the slice is attached to the slice's delivery README so reviewers can judge resemblance to w89 without running it.

## Risks / weakest points

- Risk: scaffolds ship with default styling (Vite's purple-on-white, Svelte's default) and slices look "correct but not w89" — explicitly called out in the prompt as not done. Mitigation: the standard above as a hard gate, plus a screenshot in each slice README.
- Risk: `--tc` plumbing differs between Vue (CSS var via Pinia/JS) and Svelte (CSS var via state bridge). Both must converge on the same token name to keep comparison fair.
- Risk: Cinzel/Cinzel Decorative are self-hosted (brag-card inlines woff2 as data URL). Experiment repos must either self-host or note the font dependency; CDN is forbidden (product rule: no CDN).
- Not run: I did not run the experiment repos (no clone in this worktree); design judged from reference artifacts only.

## Recommendation

Adopt the w89 token set as a shared `tokens.css`/`tokens.ts` in both experiment repos before any slice work, so the beauty standard is structural, not per-slice. File as a one-line addition to each repo's AGENTS.md house rules: "All UI uses the w89 token set; no starter-theme defaults."

EVIDENCE: REPORTED (reference artifacts read; live site fetched; no experiment repo run)
