# RUNBOOK — running the cutover acceptance batteries

## The one-line version

```bash
node batteries/accept.js --file <path-or-URL-of-a-build> [--adapter ./batteries/adapters/w76.js] [--shots /tmp/cutover_shots]
```

Exit 0 = accepted (84/0/0) · 1 = failures · 2 = crash · 3 = skips (adapter gaps).

## The environment

- **Node** ≥ 18 (written on v24).
- **Playwright** — resolved in order: local `require('playwright')`, then the Z-sandbox global (`~/.npm-global/lib/node_modules/playwright`). In a normal project, `npm i -D playwright` is enough.
- **Browser** — set `ZPB_CHROME=/path/to/chrome` to pin a browser; unset lets Playwright use its own managed Chromium (`npx playwright install chromium` once).
- **Builds** — `--file` takes a local path (becomes `file://`) or an http(s) URL (a deployed build works identically).

## The three runs

```bash
# 1 · REFERENCE — prove the harness on the frozen shell (re-run before every acceptance)
node batteries/accept.js --file /path/to/Football-Sim-Z-post-blue-w76.html
#    expect: == RESULT · 84 pass · 0 fail ==   (exit 0)

# 2 · ACCEPTANCE — the port's verdict
node batteries/accept.js --file /path/to/pancakes-build --adapter ./batteries/adapters/pancakes.js

# 3 · DELTA — the FAIL/SKIP lines are the port's work list; nothing else
```

## Reading the output

- `   PASS  <law>  — <measured detail>` — the detail strings are DATA (player names, grades, champions). They differ run to run — the simulator is nondeterministic; the LABELS are the law and never drift.
- `   SKIP  <law> — UNRUNNABLE (engine.xxx)` — the adapter lacks a key. Fill it or escalate. Skips exit 3.
- `   adapter gaps: …` — the full list of unfilled keys, printed at the end.
- Screenshots land in `--shots` (default `/tmp/cutover_shots`): chips_390, chips_desktop, preseason_plain_headers, command_center, porun_round, guide_ladder_32 — the six evidence angles from the w76 battery.

## Writing the port adapter (76 Pancakes)

1. `cp batteries/adapters/pancakes.stub.js batteries/adapters/pancakes.js`
2. Fill every `sel/val/fixtures` key with the port's selectors and view values.
3. Fill every `engine.*` key with a page-context IIFE returning the documented shape — the same OBSERVATION the w76 adapter makes, against the port's internals.
4. Run the ACCEPTANCE run above. 84/0/0 = accepted.
5. Never stub a key to force a pass — an unfilled key SKIPs honestly; a false key is a lie in the law archive.

## Known adaptation points (decide WITH the council, not silently)

- `zpbCutFade` / `fxshine` animation names (keep them, or the Owner re-names the laws).
- `engine.explainerProbe` reads the retired generator in w76; the port reads the line's live home (the Guide — flag 5 of the answers doc).
- `V0`'s all-database-median anchor (76) — if the port drops that concept, the re-anchor is an Owner decision.
- The empty-state header is not behaviorally asserted (known gap §5 of the spec) — the port's component tests should cover it.
