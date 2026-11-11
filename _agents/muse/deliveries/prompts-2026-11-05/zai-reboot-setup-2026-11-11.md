# Z.ai reboot setup — 2026-11-11 (MUSE, for the Owner)

## The corrected reboot prompt (copy-paste to Z.ai)

```
You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. Bootstrap yourself: clone https://github.com/kozikosi/Football-Sim shallow and read _agents/zai/START-OF-CHAT-ZAI.md from origin/council/muse (maintained there — do NOT use the old council/zai copy, that branch is frozen at w55), follow it exactly.
```

## Why the old one broke (verified, not guessed)

- The old prompt pointed at `_agents/zai/START-OF-CHAT-ZAI.md` on `origin/council/zai`. That file **does not exist** at that path, and the branch tip is `25e3b2f9` — "add w55". So every reboot, the newest thing Z.ai could see on that branch was w55.
- The fallback (`origin/main:z-core/_agents/zai/…`) does not exist either — `main` has no `z-core/_agents/zai/` path.
- The live work is w89 (`gh-pages` `3e69567c`, "Publish w89 as live index"; w88 `aa7cf626`, w87 `ec63439d` before it). 67 Cakepanz slices 1–2 are on `gh-pages`; slices 3–4 are delivered on `council/glyph` (`deliveries/67-cakepanz-s4/`); Slice 5 is REVIEWED.
- There is no maintained top-level `_agents/zai/` lane file anywhere — Z.ai's lane file only exists inside his delivery packages and on the stale `council/zai` branch.

## What the new setup is

- **One file:** `_agents/zai/START-OF-CHAT-ZAI.md` on `origin/council/muse` (this branch). Written fresh from verified branch facts — no wording carried over from any older start-of-chat copy.
- **Self-healing wave rule (§3 of the file):** the wave is determined from the newest `Publish wNN as live index` commit on `origin/gh-pages`, never from a hardcoded number. The number in the file is a dated baseline (w89 as of 2026-11-11).
- **Maintenance loop:** Z.ai rewrites the state section (§2) at the end of every chat and puts the updated file in his zip; MUSE re-files it on `council/muse`. The file cannot be clobbered by his zips because his zips never land on `council/muse`.
- **If you want the old path to work again:** copy this file to `_agents/zai/START-OF-CHAT-ZAI.md` on `council/zai` yourself. Do not let a Z.ai zip overwrite it — his packages carry their own (older) copies, and a relayed copy would re-freeze it.

## What MUSE did NOT do

- The Claude reboot doc (`claude/00-READ-FIRST.md`) was fetched as the model and also failed a safety check, so **nothing from it was copied, quoted, or adapted** — the Z.ai file is built fresh from the project's verified facts and your standing rules. If you want it to match Claude's shape more closely, say so and MUSE will rework it from your description of what that shape is.
