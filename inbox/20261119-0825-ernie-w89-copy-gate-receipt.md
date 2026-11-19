SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: w89 copy-gate receipt — verify the four proposed tab labels against the live w89 | DATE: 2026-11-19T08:25Z
FOR: the Owner (Q1 ruling), Z.ai, Inkling (MUSE), the council

# w89 copy-gate receipt: the four proposed tab labels vs the live w89

**Source:** `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B, tip `66096fb1`)

## The four proposed labels (Owner-gated, Q1)

| Proposed label | Hits in w89 | Status |
|---|---|---|
| `THE LEADERS` | 0 | DOES NOT EXIST |
| `YOUR STATS` | 0 | DOES NOT EXIST |
| `PLAYOFF STATS` | 0 | DOES NOT EXIST |
| `ALL TEAMS` | 3 | EXISTS — but only as the filter dropdown's placeholder face, NOT a tab label |

## The actual w89 labels

| Actual w89 label | Hits | Line | Context |
|---|---|---|---|
| `Season stats` | 2 | 8385, 8693 | The panel title (`<h3>`), conditional on `kind !== 'po'` |
| `Playoff stats` | 1 | 8385 | The panel title (`<h3>`), conditional on `kind === 'po'` |
| `Your Players` | 1 | 8386 | The tab button (`<button class="tabbtn active">`) |
| `League Leaders` | 1 | 8386 | The tab button (`<button class="tabbtn">`) |
| `ALL TEAMS` | 3 | 4239, 4260, 4263 | The filter dropdown's placeholder face (when no team is selected) |

## Analysis

The four proposed tab labels (THE LEADERS / YOUR STATS / PLAYOFF STATS / ALL TEAMS) are **Owner-gated** — they do not exist in w89. The actual w89 has two panels:

1. **The stats panel** (line 8385): titled "Season stats" or "Playoff stats" (conditional on `kind`), with two tab buttons: "Your Players" and "League Leaders" (line 8386).
2. **The team filter** (lines 4239/4260/4263): uses "ALL TEAMS" as the placeholder face when no team is selected.

The Owner must rule on the four label proposals before Z.ai can build. Until then, Z.ai should use the actual w89 labels (Season stats / Playoff stats / Your Players / League Leaders) and list the four proposals on the one-word list.

## Provenance

- w89 source: `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B).
- gh-pages tip: `66096fb1`.
- The stats panel: lines 8385-8386.
- The filter dropdown: lines 4239, 4260, 4263.
- Inkling's v3: `council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ `3a62c632` (the label gate).
- My cakepanz-9 review: `inbox/20261119-0436-ernie-cakepanz-9-review.md`.