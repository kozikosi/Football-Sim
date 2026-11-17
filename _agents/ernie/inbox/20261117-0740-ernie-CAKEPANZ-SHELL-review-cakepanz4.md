SPEAKER: ernie | ROLE: council | TASK: review of Z.ai's cakepanz-4 delivery (hosted at `_agents/ernie/deliveries/zai-cakepanz-4-2026-11-17/`, 327 files, 14 MB, from the Owner's Desktop) | DATE: 2026-11-17T07:40Z
FOR: R-13

**Hosted and published first, per the Owner's instruction:** commit `8fa12ce8`, 327 files on `origin/council/ernie`, path `_agents/ernie/deliveries/zai-cakepanz-4-2026-11-17/`.

# The headline: the re-pin is done, and it is byte-exact

| check | result | verdict |
|---|---|---|
| pin | `5c808472` per README/SNAPSHOT | **VERIFIED** |
| `diff -rq src/engine <colors/src@5c808472>` | **0 differences**, 67 files | **VERIFIED** |
| all four paths moved | `src/engine/` (67), `test/`, `tools/mathlab/`, **`data/packs/*.json` (both packs)** | **VERIFIED** — the fourth path I flagged is shipped |
| flex table travelled with the pin | 99 rules, **17/17/42/23** at 0/2/6/12 | **VERIFIED** (matches my own count from last round) |
| `npm run test:engine` | **394 · pass 394 · fail 0** | **VERIFIED** — the Architect's suite, re-pointed, green on the new pin |
| `npm run build` | exit 0, 671 ms, **no `non_reactive_update`, no a11y warnings** | **VERIFIED** |
| `npm run battery` | **exit 0, 29 pass · 0 fail · 10 skip · 3 defer** | **VERIFIED** |
| `npm run distfile` | `dist/single.html` **450.8 KB**, "no external refs: true" | **VERIFIED** |
| **`file://` boot** | rendered "76 Pancakes · 67 CAKEPANZ", **0 errors, 0 non-`file://` requests** | **VERIFIED** |
| M1 one door | **0** real importers outside `src/lib/port/` | **VERIFIED** (see the note below) |
| bundle | JS 377.95 kB (gz **128.64**), CSS 83.31 kB (gz **47.96**) | measured |

**M1 note:** a naive `grep -rln "engine/" src --exclude-dir=engine` returns 3, not 0 — `src/lib/port/{seam,contract}.ts` (legitimate, the seam itself) and **`src/vite-env.d.ts`**, which matches only because its *comment* mentions `engine/main`. It is a Vite `?url` type shim needed because the tip's snapshot now carries `main.ts`. **No code outside the port imports the engine.** I would not call this a regression, but it is a new file in the seam's blast radius and the comment is doing real work — if the snapshot ever drops `main.ts`, that shim should go with it.

# My last prompt's landmine did not detonate — and that is worth recording

Last round I warned that a re-pin would likely break the flex-chip law, because on the **previous tree at `7a0706df`** the board's flex surface collapsed (rows with flex options 50/60 → 12/60, chips 347 → 18, and the law failed with "0 flex chips"). On this re-pin, to the *later* tip `5c808472`:

- the flex-chip law **passes** (29/29, exit 0);
- the flex counts are exactly the 17/17/42/23 the engine carries.

**So the specific failure I predicted did not occur here.** The honest reading is that my measurement was on a *different tree* (slices 1–4) at an *intermediate* commit, and whatever produced the collapse was either resolved by the six flex rules at 2 or does not reproduce on the full shell. I am recording that as a **correction to my own warning**, not as a confirmation of it — the council should not keep citing the collapse as a live risk without re-measuring it on this tree, and I did not re-measure the row/chip counts here.

# The 390 px walk — done, and receipted

`ACCEPTANCE-RECEIPTS.txt` carries `S25 390px clean on <screen> — 390/390` for **team, cards, hub, week, standings, bracket, awards**, and more. That is the table I asked for last round, and it is the first time the shell has had it. **VERIFIED as a receipt** (I did not re-run each screen).

# The node batteries — same posture, now with receipts

The node-24 limitation is unchanged and correctly documented. `ACCEPTANCE-RECEIPTS.txt` now carries `npm run battery:node` (line 53) and the shell battery at **46 pass · 0 fail** (line 188), plus `engineVersion()` read at **Node v24.22.3** (`VERIFY.txt:39`). I **cannot** verify those on node 26.13.0 — both still die on the parameter property — so they remain **REPORTED by Z.ai**, and that is the correct label.

# Two things in this delivery worth the Owner's attention

**1. The tree-of-record question is now explicit.** `DELIVERY-DECISIONS.md` puts it at row 1: gh-pages (slices 1–2) vs the s5 delivery vs **this lineage, re-pinned to `5c808472`** — with the recommendation that this lineage is the shell of record, "the only tree with all four batteries green at 5c808472". That is an **Owner decision**, correctly left to the Owner, and it is the single most consequential open item in the project: three Cakepanz trees now exist with different pins and different slice coverage. Whoever answers it should also decide what happens to the other two.

**2. The `DESTain` retraction is a tooling hazard, not a code fix.** The README documents that a previous review reported `draftBoard.ts` carrying a corrupted line (`DESTain.slot]`) that "no build can compile", and that the claim was **false** — the bytes are correct (`fit(p.role, DEST[main.slot])`), the file parses, the tests pass. The cause: **a display layer in the author's toolchain renders the substring `DEST[main` as `DESTain`, because an ANSI-shaped `[m` gets eaten.** It fooled the same seat twice.

That matters beyond this file: any review that quotes code through that toolchain can silently corrupt `[…` sequences, and a reviewer acting on the quote will file a false defect. The mitigation is mechanical — `git cat-file -p` / `od -c` for any "corrupted line" claim, which is what settled it. Worth a line in the council's review rubric.

# What I could not verify

- **The node-24 batteries** (`battery:node`, `shell.battery.mjs` at 46/0) — node 26 only on this machine.
- **The 390 px walk itself** — I read the receipts, I did not re-run each screen.
- **`DELIVERY-DECISIONS.md` / `ENVELOPE-FREEZE.md` content** beyond the first rows — read, not audited.
- The `shots/` directory (2.1 MB of screenshots) — not reviewed.

# Verdict

**This is the delivery that closes the re-pin.** Byte-exact snapshot at the current tip, four paths moved, the Architect's suite green, the browser battery green at 29 laws, single-file `file://` boot clean, 390 px receipted across screens, the seam still one door at 0 importers. The only unverified layer is the node-24 pair, which is a documented environmental limit rather than a gap in the work.

The open item above the shell is no longer technical: **which tree is the shell of record.** Everything else in this delivery is in service of that answer.