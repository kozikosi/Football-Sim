# UPDATE-README — z-post-blue-cutover-2026-11-06

**From:** Z.ai (High Councillor) · **Type:** CUTOVER SUPPORT — not a wave. The shell freeze holds; no product HTML changed; no wave number minted.

## What this package is

The acceptance batteries for the **76 Pancakes** port, drafted NOW — before the port starts — against the **frozen w76 shell** as the reference, exactly as offered in the w76 answers (the standing cutover-support line). Plus the council half: measured views on the five flags awaiting the Owner's call.

## What changed (files)

```
batteries/accept.js                      NEW — the acceptance runner: the w76 battery's 84 assertions,
                                         adapter-driven (--file <any build> --adapter <any hooks module>)
batteries/adapters/w76.js                NEW — the frozen reference adapter (hooks + 10 engine snippets)
batteries/adapters/pancakes.stub.js      NEW — the port's homework, annotated; unfilled key = loud SKIP
contract.json                            NEW — the machine-readable DOM contract (ids, law strings,
                                         retired strings, frozen values, w76 engine globals)
CUTOVER-BATTERIES.md                     NEW — the acceptance spec: all 84 assertions mapped to Owner law
RUNBOOK.md                               NEW — the three-run ritual + environment notes
20261106-zai-answers-to-muse.md          NEW — the five flags' measured views + the freeze + the record
shots/                                   NEW — six evidence shots from the reference run
_agents/zai/START-OF-CHAT-ZAI.md         REV 20 — §3 rewritten; §0 the battery law; §1 gh-pages-first;
                                         §5 the assertion rule + the re-pointing pattern
_agents/zai/ZAI.md                       rewritten
_agents/zai/END-OF-CHAT-ZAI.md           rewritten for this chat
CHECKSUMS.txt                            NEW — md5s for every file in the zip
```

**UNTOUCHED:** `Football-Sim-Z-post-blue-w76.html` — md5 `4f363452a4ad33709244ca08d4ab3b00` · 1,830,164 B, re-verified from gh-pages 367d8e3e at chat start and unchanged at close. The frozen reference stands.

## The proof

- The reference run: `accept.js` against the w76 bytes → **84 pass · 0 fail · exit 0**.
- Semantic identity: every PASS/FAIL line diffed against the original w76 battery — **the labels are byte-identical**; detail strings drift only where the simulator is nondeterministic (proven by re-running the original battery twice against itself).
- Zero page errors across the run; six evidence screenshots re-taken.

## How the Owner (or the Architect) uses it

See `RUNBOOK.md`. Short form:

```bash
# prove the harness on the frozen shell (before every acceptance)
node batteries/accept.js --file /path/to/Football-Sim-Z-post-blue-w76.html

# the port's verdict, once 76 Pancakes has a build
node batteries/accept.js --file /path/to/pancakes-build --adapter ./batteries/adapters/pancakes.js
```

Accepted = **84 pass · 0 fail · 0 skip**. Fails are the port's work list; skips are unfilled adapter keys — never silence them.

## The five flags (the Owner's calls — views in 20261106-zai-answers-to-muse.md)

1. **Veto (b)** — Z.ai: KEEP the 40 %-of-games floor (sample hygiene, `max(3, 40%)`) + KEEP the TRUE OVR test (rules read the book number).
2. **The twin header** — Z.ai: KEEP (it IS the no-rooms empty state — load-bearing); if the Owner wants U1-consistent silence, collapse the empty section entirely.
3. **The casing** — caps is the only honest render; measured from the font (the lowercase codepoints are cap-height outlines; the casing only toggles plain vs swash forms). The DOM already carries his typed "Cutdown Day".
4. **SEASON RATING** — reads right; keep (it's the Owner's own words, and it can't be confused with the OVR badge).
5. **The explainer's home** — the line already lives in the Guide (asserted live); delete the retired recap assembly at cutover and never port it.

## Placement on gh-pages (on push)

Unzip at the gh-pages root → `z-post-blue-cutover-2026-11-06/` beside the wave folders; `_agents/zai/imports/2026-11-06-cutover/` on `council/zai` via the import tool if Beam carries it.
