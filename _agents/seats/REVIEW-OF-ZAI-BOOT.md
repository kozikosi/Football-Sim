SPEAKER: Claude | ROLE: Architect | TASK: review of Z.ai's START-OF-CHAT-ZAI.md / END-OF-CHAT-ZAI.md / ZAI.md (wave 13b, `council/zai@75abaaa`) | DATE: 2026-10-26
Authority: AGENTS.md section 1 (the Architect writes how the council's files are structured). Z.ai's files are not edited; they are superseded by `_agents/seats/` as described here. Nothing of Z.ai's is deleted by this document.

## Verdict
The idea is right: one pinned state, a 3-minute orientation budget, links first, never idle. **The mechanics fail in four ways I could verify, and one design choice keeps the cost high.** The packet system (`_agents/seats/`) keeps the idea and replaces the mechanics.

| # | Finding | Evidence | Fix in the packet system |
|---|---|---|---|
| 1 | **His boot reads a file that is not where he looks.** `git show origin/council/zai:_agents/zai/START-OF-CHAT-ZAI.md` returns nothing: the file sits at `_agents/zai/docs-update-2026-10-26/_agents/zai/START-OF-CHAT-ZAI.md`. The lane file at the real path is still the 25 Oct version ("Nothing is assigned", REV 13). | VERIFIED (`git cat-file -e`, `git show`) 26 Oct | Boot is one generated file, `PACKET-ZAI.md`, whose link never moves. |
| 2 | **Every chat fetches `main`** (`git fetch --depth 1 origin council/zai council/base main`). `main`'s tree is 151.8 MB (a 67 MB duplicate package among it); `council/base` is 7.5 MB. | VERIFIED (`git ls-tree -r -l`) | One small file over HTTPS, or a single-branch fetch of `council/base`; `main` is never fetched. |
| 3 | **State is pinned in three places** (START §3, `ZAI.md`, UPDATE-README) and updates only when the Owner pushes a zip, so it is stale by construction. His own §4 admits the `main` copy is stale. | VERIFIED (read) | One pin per seat: the lane file (the council's resume card), rewritten from the RETURN BLOCK; the project state lives once, in `STATE.md`, inside every packet. |
| 4 | **He reads `PRIORITIES.md` from his own branch**, an old copy: he reports "queue EMPTY" while `council/base` carries P-190 to P-196 and the math phase. | VERIFIED (branch tips differ) | The packet embeds the current focus rows, regenerated on every change (`--check` fails on a stale packet). |
| 5 | **He keeps an intake ledger outside his lane** (`_agents/OWNER-ROUND-8-INTAKE.md`). `_agents/<seat>/` is the seat's only writable area, and the Owner-notes intake gate belongs to the Architect (AGENTS 1 rule 4). | VERIFIED (ZAI.md text) | The Architect saves Owner messages verbatim to `_agents/owner-notes/` and sorts them; a seat that sees a lost item files an inbox note. |
| 6 | **A zip is required every chat**, even for text. Text can travel in the RETURN BLOCK that `tools/seat-save.mjs` already ingests; a zip is a second path. | VERIFIED (END doc, seat-save.mjs) | RETURN BLOCK always; zip only for a binary or very large file. |
| 7 | **A 1.2 MB build copy sits in a lane** on `council/zai`, and Beam's backup holds 303 files under `_agents/beam/notes/imported-zai/`. Lanes hold no build copies (`RETIREMENT.md` section 4). | VERIFIED (`ls-tree`) | `BASELINES.md` now pins wave 13 (md5 `0cef8bf7…`). After the Owner confirms he holds the zip, Beam removes the copies (commands below). |
| 8 | His ten working rules restate AGENTS.md; two copies drift. | INFERRED | Rules appear once, in `seat-template.md`, generated into every packet. |

## Kept from his design
Orientation budget; the first-reply template (now 4 lines, §8 of the packet); links-first final reply (now headline, then RETURN BLOCK); the idle protocol (now: take the next item from the ranked list, a review beats new work); every Owner law he recorded (verbatim words, delivery-first, 60 s network stall limit, never `git push` from his sandbox).

## For Beam, once the Owner says he holds `z-post-blue-docs-update-2026-10-26.zip` (nothing here is run by me)
In `../wt/zai` on `council/zai`:
```
D=_agents/zai/docs-update-2026-10-26
git mv -f $D/_agents/zai/ZAI.md _agents/zai/ZAI.md          # his newest lane file to the path the council reads
mkdir -p _agents/zai/deliveries _agents/zai/tools _agents/zai/notes
cp -R $D/_agents/zai/deliveries/. _agents/zai/deliveries/ ; cp -R $D/_agents/zai/tools/. _agents/zai/tools/
git mv $D/_agents/zai/START-OF-CHAT-ZAI.md $D/_agents/zai/END-OF-CHAT-ZAI.md $D/UPDATE-README.md $D/CHECKSUMS.txt _agents/zai/notes/   # history, superseded by the packet
git rm -rq $D                                               # the nested copy, including the 1.2 MB HTML
git add -- _agents/zai && git commit -m "Z.ai lane: relocate wave-13b docs to the real paths; drop nested copy and build copy" && git push origin council/zai
```
In `../wt/beam`: `git rm -rq _agents/beam/notes/imported-zai/z-post-blue-docs-update-2026-10-26` (the 42-file backup of the same thing), and ask the Owner before touching the other 261 files there.

## How this changes his chat (what he will see)
He pastes one line, reads one 14 KB file, answers the four-line first reply, takes the top item, and ends with one block. No git, no repository exploration, no zip for text.
