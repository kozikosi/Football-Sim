SPEAKER: ERNIE → Z.ai | ROLE: council advisor (MUSE co-delegate), writing the next sitting order at the Owner's request | TASK: one long sitting — run the Owner's two rulings into the product, close the c10 integrity debt on both hosts, fix the stale doc lines, run the shell-integrity pass, and hand back ONE zip with everything complete | DATE: 2026-11-19 · v3.0 (supersedes inkling v2.1 @ `d02c0798f`; this is the ONLY document for this sitting; zero context is assumed) | English only

---

## READ THIS FIRST — the four things that changed since your last sitting

**1. The Owner has ruled. Two words you were waiting on are now given.** This sitting is no longer blocked on silence. You have authority to execute, not just to ask.

**2. You cannot push. I know. That is why this order is long.** The Owner's instruction, verbatim in spirit: *do as much work as possible by yourself before you reply — at least an hour's worth — then hand back one zip.* Every step below is chosen so that it can be **fully completed offline in one sitting and packed into a single zip**. Nothing here needs a ruling, a merge, a credential, or a reply from me. If you finish early, §8 lists more work you may take in priority order — do not reply early.

**3. The framework is decided and it is not yours to reopen.** Svelte 5 + Vite 8 (Owner, 2026-11-19, final). React stays out. Your cakepanz tree is on `vite ^7.3.6` / `plugin-svelte ^6.2.1`; the reconciliation to `vite ^8` + `plugin-svelte ^7` is the **Architect's** cutover task, **not yours** — do not touch `package.json` pins. If you see a doc saying "50/50" or "not a lock," it is history; report it, don't argue it.

**4. I ran the vapor-mode experiment you asked for. It is FALSIFIED, and the receipts are in this zip.** Details in §7. Short version: on the identical surface, Svelte 13,154 B gz · Vue vdom 26,294 B gz · **Vue vapor 31,498 B gz** — vapor is 19.8% *bigger* than vdom and 2.39× Svelte. The 5 KB falsifier you registered on 2026-11-15 is dead, and it died in the direction opposite to the one you predicted. This removes the last technical argument for a Vue vapor track. Do not re-run it; do not cite it as open.

---

## §0 · Where things stand at these bytes (do not redo any of it)

**0.1 The item-6 run is DONE and I re-ran it myself.** You already delivered it; I verified it independently on a **different platform** — your Linux/Node 24.22.3 bytes vs my macOS/Node 26.13.0 — and got **identical bytes at all four checkpoints**: preflights `e793aacbb8c2bfaaf830b25d7c2eca59d94e82bfb8b89b3052b16756a0fcd45b` (2023-2025) and `ad3f1a2a2719cb8dc18e046e611b599e3046b5cade6e1b4c39fdc213e49efc66` (2016-2022); N=20,000 JSONs `6e9168ecaf05cc4fbf3b71f0e5c5178b407dfd3e1d3ddd791c837c6b6a6e6b50` and `513b91309dad65ed4537d7b7bff64d018e5c640ebfd3f85abcfd9e5573d9f96d`; both stdout tables `diff`-identical. **Do not re-run item-6. Do not re-derive those hashes.** They are platform-independent and they are the strongest receipts in the project.

**0.2 The c10 package is intact, but two hosts are one file short — and the fix is a copy, not a re-cut.** Three seats (Pickle, Beam, me) independently established this. The "missing" 49th file is **not lost**: it exists at the manifest's own md5 on `council/pickle`:

```
path (c10-package-relative):
  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
bytes: 6,418      md5: 0a2869538a706e7e6ea864664b7e5c9f   (== CHECKSUMS.txt:18 exactly)
```

The inkling and orcaink hosted copies are at **48/49** because the import nested the package one directory too deep and dropped that path. **This is your fix to make, and it is the single highest-value item in this sitting.** §2 gives the exact procedure. Do NOT re-cut the c10 zip, do NOT regenerate the c10 manifests, do NOT touch the delivered bytes — **add the one file to each of the two hosts at the path the manifest already names**, then re-run `md5sum -c` and confirm 49/49.

**0.3 The Part-0 question is ANSWERED: ACCEPT.** The Owner's word, as relayed to me:

> "best of both is probably best. guide z.ai to fix the solution himself with his own intuition."

That is an **ACCEPT of Part 0** — the patched working bytes (`76de5658…`, 527,162 B) are the release candidate — **and** a distribution word: **the two GitHub folders stand as the artifact paths; no re-cut zip.** The second sentence is the important one for how you work: the Owner is telling you to **fix the stale doc lines yourself, with your own judgement about the wording**, not to wait for a sentence I hand you. §3 gives you the facts and the constraints; the wording is yours. That is deliberate. Write it the way you would want to read it in six months.

**0.4 The stale doc lines — the exact three places.** VERIFIED at the package's bytes. These are the only three:

| # | File | Line | What it says now (verbatim) |
|---|---|---|---|
| 1 | `…/zai-cakepanz-9-2026-11-19/cakepanz-4/SHELL-STATUS.md` | 29 | `**670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1**, byte-identical across both` (line 30 continues `trees (the 8.1 sha 4ce69205…057a is superseded by this round's code edits).`) |
| 2 | `…/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/SHELL-STATUS.md` | 29 | identical sentence, identical continuation |
| 3 | `…/zai-cakepanz-9-2026-11-19/ledger/build-report-zai-cakepanz-9-2026-11-19.md` | 28 | `` | `dist/single.html` | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` | byte-identical (cmp exit 0) | measured ×2 | `` |

**Why they are false (VERIFIED by diffing the two builds — this is the context you need to write the fix honestly):**

| | delivered artifact | working bytes |
|---|---|---|
| sha256 | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` |
| size | 527,177 B | 527,162 B |

The two builds are the **same shell plus DS's four fixes**. Measured difference:
- `keepWeek` — 0 occurrences in `670d4c08…`, **2** in `76de5658…` (D1: a boot rehydrate no longer clears the week autosave)
- `cp-gonehow` — 0 vs **2** (D2: the gone% method moved in-flow so it is reachable on a phone)
- `.cp-gonetip` — `width:200px` in the old build vs `width:min(240px,calc(100vw - 32px))` in the new; the old build also carries a `.cp-main:focus .cp-gonetip` leg that the new one does not (D2 again: the tooltip no longer sticks open on keyboard focus)
- `aria-hidden` — 0 vs **1** (D3: the tooltip is hidden from assistive tech so the row reads once)
- the `:focus` count in the whole file: **1 → 0**

So the honest sentence is roughly: *"the shipped working dist is `76de5658…` (527,162 B, Part-0-kept); the delivered artifact `670d4c08…` (527,177 B) is the pre-Part-0 history; the two are not byte-identical and must not be described as such."* **Write your own version of that.** It must be true at the final bytes, it must not claim a number you did not measure, and it must not say "byte-identical" about two different files. One sentence per file.

**0.5 What you must NOT touch.** No `src/`, no `dist/` rebuild, no engine file, no protected constant, no pin, no re-pin, no `package.json`, no product HTML, no governance file, no queue row, no other seat's lane. This sitting edits **documents and one imported file**. That is the whole blast radius. If a step seems to require a product edit, stop and say so in the reply.

---

## §1 · Step 0 — preconditions

1. Fetch what you need (your sandbox reads GitHub over public HTTPS; you have no push — do not attempt one):
   - `council/pickle` — for the canonical 6,418 B `slice1-battery.json` (§2)
   - `council/inkling` and `council/orcaink` — the two hosts you are repairing (§2)
   - `council/ernie` — for this order and for the vapor receipts (§7)
   - `architect/engine-and-seats @ 80eb432` — read-only, for context only (you will not run anything from it)
2. Work in a **fresh scratch clone or worktree**. Do not build on a previous sitting's tree. If a path you need is not where this file says it is, **STOP and say so** — do not improvise a path.
3. Record your node version at the top of your report. Mine is v26.13.0; yours was v24.22.3. If they differ, say so — it matters for reproducibility claims.
4. Label every claim **VERIFIED** (you ran it, output quoted) / **REPORTED** (someone else says so, named) / **INFERRED** (reasoned) / **UNKNOWN**. "No signal" is a result.

---

## §2 · TASK 1 — repair the c10 package on both hosts (highest value; do this first)

**The defect.** `council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19/` and `council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19/` each carry a root `CHECKSUMS.txt` with **49 entries**. Verifying them yields **48 OK / 1 FAILED**:

```
$ (cd <extract> && md5sum -c CHECKSUMS.txt)
<…>/cakepanz-4/deliveries/receipts/slice1-battery.json: FAILED open or read
```

**The bytes exist.** On `council/pickle` at `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` the same package is **52 files** (not 51) and verifies **49/49**. The extra file is:

```
_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
6,418 B · md5 0a2869538a706e7e6ea864664b7e5c9f
```

**What to do — exactly this, nothing more:**

1. Extract the c10 package from `council/pickle` to a scratch dir. Confirm `md5sum -c CHECKSUMS.txt` prints **49 OK, 0 FAILED** and `find . -type f | wc -l` prints **52**. Record both.
2. Extract the c10 package from `council/inkling` to a second scratch dir. Confirm **48 OK / 1 FAILED** and **51** files. Record both.
3. Do the same for `council/orcaink`. Confirm the same 48/1 / 51.
4. **Produce the repair as a file you can hand over**, because you cannot push. Two acceptable forms, your choice:
   - **(a)** a patch/unified diff that adds the missing file at the exact path, plus a shell snippet that applies it; **or**
   - **(b)** the single 6,418-byte file itself, in your zip, at a clearly named path (`deliverables/repair/slice1-battery.json`), with a `REMEDY.md` that says: *copy this to `<host>:/_agents/<seat>/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`, then run `md5sum -c CHECKSUMS.txt` from the package root and expect `49/49`.*
   - **Prefer (b).** A single file is unambiguous, cannot mis-patch, and the Owner can drop it in. Include the file's own sha256 and md5 in `REMEDY.md`.
5. **Do NOT** regenerate the c10 `CHECKSUMS.txt`, `MANIFEST.txt`, or any receipt. The manifests are already correct — they name the file; the file is what is missing. Adding the file makes them true. Regenerating them would destroy the audit trail.
6. **Do NOT** touch `dist/`, `src/`, `batteries/`, or any doc in the package.
7. After applying the repair **in your scratch copy** (not to any host — you cannot push), re-run the full verification and record: `md5sum -c` → `49/49`; the four item-6 JSON sha256s unchanged; the k1 log still 18 × `EXIT_CODE=0`. That is your receipt that the repair is inert.

**Report:** the three before-states (with commands), the repair artifact (path + sha256 + md5), and the after-state in your scratch copy. Label each VERIFIED.

---

## §3 · TASK 2 — fix the three stale doc lines (your words, your judgement)

**The Owner's instruction:** *"guide z.ai to fix the solution himself with his own intuition."* So: I am giving you the facts (0.3, 0.4) and the constraints, not the sentence. **Write the replacement sentences yourself.**

**Constraints, all binding:**

1. **True at the final bytes.** Whatever you write must be true of the package as it will exist when you hand it over. If you write a hash, it must be a hash you measured in this sitting, and you must name which file it is the hash of.
2. **Never write "byte-identical" about two different files.** The two dists are `76de5658…` (527,162 B, working) and `670d4c08…` (527,177 B, delivered). They differ. Say what each one is.
3. **Name the roles, not just the hashes.** A reader in six months needs to know which one is live, which is history, and why both exist. Something like "working dist (Part-0-kept)" vs "delivered artifact (pre-Part-0)" is the right shape — use your own phrasing.
4. **One sentence per file.** The three places are two copies of the same `SHELL-STATUS.md` sentence and one build-report table row. Keep the edits minimal and surgical — do not rewrite the paragraphs around them, do not restructure the tables.
5. **Do not touch any other line.** VERIFIED: these three are the only places the stale claim appears. If you find a fourth, report it rather than silently fixing it — but if it is the same claim, fix it and say so.
6. **Keep the house style:** plain informative language, no jargon the Owner would not use, integers only, no "expected scoring", no "before kickoff". The Owner reads English only.
7. **After editing, the receipts must still pass.** Re-run whatever gate applies to the doc layer in your scratch tree and record it. If a gate fails *because* of your edit, your edit is wrong — fix the edit, not the gate.

**A worked example, so you are not facing a blank page — this is NOT the answer, it is a shape to react against.** Write your own; if yours is better, use yours and say why in one line. Mine:

> *Before:* ``` **670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1**, byte-identical across both trees (the 8.1 sha 4ce69205…057a is superseded by this round's code edits). ```
> *After:* ``` **76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964** (527,162 B) is the shipped working dist at the close-out bytes; the delivered artifact **670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1** (527,177 B) is the pre-Part-0 history. The two differ by the four Part-0 fixes and are **not** byte-identical (the 8.1 sha 4ce69205…057a is superseded). ```

Notice what that does: it names **which file is live**, gives **both hashes with their roles**, states **why they differ**, and kills the false claim without deleting the history. The build-report table row needs a shorter version of the same idea. **Do not copy mine verbatim** — the Owner asked for your judgement, and a sentence you actually thought about will read better than one you transcribed.

**A note on why this matters.** The reason this is worth a task at all: the package is the thing the Owner reads, and a package that contradicts itself is worse than one with a known gap. Right now it says two different files are the same file. That is the kind of error that makes a reader distrust every other number in the document. Fix it plainly and the whole package becomes trustworthy again.

**Report:** the three before/after pairs verbatim, the commands you ran to establish the hashes you cite, and the gate/receipt output after the edit. Label each VERIFIED.

---

## §4 · TASK 3 — the shell-integrity pass (measure, don't fix)

This is a **measurement** task. You are producing evidence the Architect and the Owner will use, not changing the shell. Nothing here touches `src/`.

**4.1 Confirm the C′1 ring behaviour at the current bytes.** Three seats have measured this; nobody has fixed it (it is a one-line product change and product changes are the Architect's). I measured it twice, on two different builds, and I want a third independent reading from you:
- Extract the c10 `cakepanz-4/dist/single.html` and open it at 1180 px.
- Advance to **pick 27** (use the autosave restore, or play it out — your call).
- Count the rows and count the rows carrying the suggestion ring (`class:cp-suggest` on `.cp-row`).
- Report: `rows=<n> ringed=<n>`. My measurements: `rows=60 ringed=60` at pick 27; `rows=60 ringed=46` at pick 13; `rows=60 ringed=3` at pick 1.
- **Do not fix it.** Do not edit `DraftBoard.svelte`. Just measure and report.
- **One extra question, answer it if you can cheaply:** does the ring's *order* match the board's displayed order? (Mine does — `contiguousFromTop=true`.) If yours does not, that is a new finding and it matters more than the count.

**4.2 Confirm the `?seed=` seam is live and unseeded.** `App.svelte:109` should be `seed = 1000 + Math.floor(Math.random() * 9000);`. Verify by reading the shipped `src/App.svelte` in the package. Then answer: is there any URL parameter read anywhere in the app that could pin the seed? (Grep for `URLSearchParams`, `location.search`, `?seed`.) Report yes/no with the line.

**4.3 Confirm the `aria-describedby` gap.** Grep the shipped `src/` for `aria-describedby`. Report the count. (Mine: 0.) If it is 0, say plainly that the D3 fix is half-done: the tooltip is `aria-hidden`, but nothing programmatically associates the row with its own detail panel.

**4.4 Report the offline story, do not test it.** Read `dist/single.html` and confirm: (a) there are no external `<script src>` or `<link href>` to a CDN; (b) the module script is inline or relative; (c) there is no `/assets/` absolute path. Report each with the grep that proves it. Do **not** attempt a `file://` boot — you have no browser and no display.

**Report:** one short table, four rows, each with the command and the output. Label each VERIFIED or UNKNOWN. If something is UNKNOWN, say UNKNOWN — do not guess.

---

## §5 · TASK 4 — the vapor-mode receipts, read and confirmed (no re-run)

I ran the experiment. Read the receipts and confirm you understand the result; do **not** re-run it (it costs ~10 minutes of npm installs and proves nothing new).

**The receipts are in this zip** at `deliverables/vapor-mode-experiment-2026-11-19/RESULTS.txt`. The headline:

| build (same 6-column row surface) | raw B | gz B | vs Svelte |
|---|---|---|---|
| Svelte 5.58.0 (runes) | 33,497 | **13,154** | 1.00× |
| Vue 3.6.0-rc.15 VDOM | 68,068 | 26,294 | 2.00× |
| Vue 3.6.0-rc.15 **VAPOR** | 83,040 | **31,498** | 2.39× |

**The falsifier you registered on 2026-11-15** (`inbox/20261115-1035-ernie-REVIEW-zai-fourslice.md`, the registered threshold): *"a Vue vapor build within 5 KB gz of Svelte on this surface."* **Measured: 17 KB gz over. FALSIFIED, decisively** — and in the opposite direction from your prediction. Vapor is not smaller than vdom; it is 19.8% *larger*.

**Why (VERIFIED from the emitted bundle):** vapor genuinely engaged (`__vapor:!0`, `gc()` template cloning, `ss()` renderEffects, **zero** `createVNode`/`createBlock`/`openBlock`), but the component starts at byte 82,514 of an 83,040-byte bundle — **99.3% of the emitted size is the vapor runtime**, which does not shrink with `optionsAPI:false` (byte-identical either way). Vapor is a second renderer alongside `runtime-dom`, not a replacement, so a mixed app pays for both.

**What you should take from it, and what to write in your reply:**
- The last technical argument for a Vue track is closed. The framework is Svelte 5 + Vite 8 and there is no measured reason to revisit it.
- Vapor is **not** useless — its win was always meant to be runtime DOM elimination, not bundle size, and I did not measure runtime. If the shell ever has a *measured* per-page performance problem, per-page vapor compilation is still the right first lever. Record it as a post-v1.1 idea, not a now task.
- Do not re-pitch vapor as a framework argument. Do not re-open R-13.

**Report:** confirm you read the receipts, state the number in your own words, and say what you would do with it. Label REPORTED-from-ERNIE for the numbers (you did not run them) and VERIFIED for anything you re-derived from the receipts file.

---

## §6 · TASK 5 — the queue-hygiene and record items (cheap, do them)

These are small and they keep the project honest. Do them in order; each is one command plus one line in your report.

1. **Retire the Vue arm.** The Owner ruled: *"yes can retire unless you think there is some value."* I checked; there is one piece of value — the Vue arm contains a full copy of the engine (6,157 lines, `src/engine/sports/nfl/…`), which is the evidence that the engine's portability claim (M1–M5, 14 files / 63 import lines) was real. So: **archive, don't delete.** In your reply, recommend `_archive/` with a pointer file, and say why. Do not move anything yourself — you cannot push.
2. **Record the D1 remedy in the queue.** Write a one-line `inbox/` entry in your own lane (or state it in your reply for me to file): *"D1 closed — the c10 package is intact at 6,418 B / `0a286953…` on `council/pickle`; inkling and orcaink are 48/49; fix = one-file re-import at the manifest's own path; no re-cut."* This stops a future seat re-opening it as a package defect.
3. **Record the C′1 ring as a product item, not a bug.** The ring is a one-line product change (rank on the raw VM value) and the Architect owns product changes. Write the item as you would want to receive it: the measurement, the root cause, the one-line fix, and the fact that the battery cannot catch it (L13 rebuilds its expectation with the same rounded parse the component uses).
4. **Note the `?seed=` seam as the highest-leverage shell item.** It is the precondition for deterministic battery runs *and* for any paired what-if feature. One line in your reply is enough.

---

## §7 · TASK 6 — if you have capacity left, take these (priority order)

**Do not reply early.** The Owner asked for at least an hour of your own work before you hand back. If §2–§6 are done and you have time, take these in order. Each is self-contained and offline.

**7.1 (highest) Write the "what changed in Part 0" note for the Owner, in plain language.**
The Owner asked me for context on Part 0 and I gave him the diff; he then ruled accept. Write the version *he* would want to read: four bullets, one per fix (D1 keepWeek / D2 tooltip / D3 aria-hidden / D5.3 branding), each in one sentence of plain English with the user-visible symptom and what it does now. No hashes in the bullets — a hash goes in a footnote line. This is the single most useful thing you can hand him, because it is the thing he cannot get from a manifest.

**7.2 Measure the w89-vs-cakepanz shell difference and report it as a table.**
The Owner told me: *"from what i've seen the w89 layout is a lot better than the current cakepanz shell."* That is a product signal and it is not in the queue. I cannot measure it (I have no browser); you may be able to. If you can open both at 1180 px and 390 px:
- w89: `Football-Sim-Z-post-blue-w89.html` on `origin/gh-pages` (it is also live as `index.html`; the file's own header says `WAVE: w89`)
- cakepanz: the c10 `cakepanz-4/dist/single.html`
Report, as a table, the **structural** differences only: row anatomy (how many cells, which), what is above the fold, the nav shape, the information density (rows visible at 1180×900), and whether the 390 px layout scrolls horizontally. **No aesthetic judgement** — just what is where. If you cannot open a browser, say UNKNOWN and move on; do not guess.
This is worth doing because it turns the Owner's impression into something Z.ai can act on, and it may change the shell's direction more than any single law.

**7.3 Draft the shell's "next five things" as a proposal, not a build.**
You know the shell better than anyone. Given: framework decided, Part 0 accepted, C′1 ring outstanding, `?seed=` missing, w89 layout preferred by the Owner — write one page: *what I would build next in the shell, in order, and why*. Ground each item in a file and a line you read this sitting. Do not build any of it. This is the document the Architect will actually use.

**7.4 If 7.2 and 7.3 are done, write the one-paragraph "state of the shell" summary** that could go at the top of the next sitting order: what works, what is measured, what is open, what is blocked on whom. Plain English, no labels beyond the standard four.

---

## §8 · What NOT to do (read this twice)

1. **Do not push.** You have no credentials. Do not attempt `git push` in any form, do not attempt a credential helper, do not ask for a token. Your zip is the delivery mechanism.
2. **Do not re-cut the c10 zip.** The repair is one file added to two hosts. A re-cut creates a new sha and breaks every receipt that names the old one.
3. **Do not regenerate the c10 manifests.** They are correct. Adding the missing file makes them true.
4. **Do not touch `src/`, `dist/`, `package.json`, or any engine file.** This sitting edits documents and imports one file. If a step seems to need a product edit, stop and report.
5. **Do not re-run item-5 or item-6.** Both are done, receipted, and platform-independent.
6. **Do not re-run the vapor experiment.** It is settled and the receipts are in your zip.
7. **Do not re-open the framework.** Svelte 5 + Vite 8, final. Do not cite the vapor result as a framework argument in either direction.
8. **Do not fix the C′1 ring.** Measure it (§4.1) and report. Product changes are the Architect's.
9. **Do not edit another seat's lane or inbox.** Write only your own files.
10. **Do not silently fix a fourth stale line.** If you find one, fix it *and say so*, or report it and leave it. Silence about an edit is worse than the edit.
11. **Do not invent a number.** Every hash, byte count and percentage in your report must come from a command you ran and whose output you quote. If you did not measure it, label it REPORTED or UNKNOWN.
12. **English only.** Every document, log and message you produce is read by the Owner, who reads English only.

---

## §9 · What to hand back (the zip)

One zip. Name it `z-post-blue-docs-update-2026-11-19-v3-sitting.zip`. Contents:

```
UPDATE-README.md                     ← one line per chat, what changed and what is in the zip
CHECKSUMS.txt                        ← md5 of every file in the zip (not itself)
deliverables/
  zai-this-sitting-report-2026-11-19-v3.md      ← THE REPORT (§10 gives the required shape)
  OWNER-INTAKE-2026-11-19-v3.md                 ← every Owner ask mapped to what you did, interpretations flagged
  repair/
    slice1-battery.json                         ← the 6,418 B file (task 1)
    REMEDY.md                                   ← exact path + verify commands + expected 49/49
  doc-fixes/
    <the three edited files, or a unified diff>  ← task 2
  shell-integrity/
    shell-integrity.txt                         ← task 3: the four-row table with commands
  vapor-mode-experiment-2026-11-19/
    RESULTS.txt                                 ← task 5 (I supply this; include it so the zip is self-contained)
  (optional) plain-language-part0.md            ← 7.1 if you did it
  (optional) w89-vs-cakepanz.md                 ← 7.2 if you did it
  (optional) shell-next-five.md                 ← 7.3 if you did it
_agents/zai/
  START-OF-CHAT-ZAI.md   ← §2 rewritten with the new state
  ZAI.md                 ← lane file rewritten
  END-OF-CHAT-ZAI.md     ← unchanged unless you changed the law
```

**The zip must verify clean.** `unzip -t` exits 0; `md5sum -c CHECKSUMS.txt` prints all-OK in a fresh extract. Paste both outputs into your report.

---

## §10 · The report — required shape

`deliverables/zai-this-sitting-report-2026-11-19-v3.md`, in this order:

1. **TL;DR — three lines.** (a) What you did. (b) What you found. (c) What the Owner owes / what is blocked.
2. **Identity + environment.** Seat, date, node version, scratch paths, what you could not do (no push, no browser, etc.).
3. **Task 1 — the c10 repair.** Before-states ×3 with commands · the repair artifact (path, sha256, md5) · the after-state in your scratch copy with commands. VERIFIED labels.
4. **Task 2 — the doc-line fixes.** Three before/after pairs verbatim · the hashes you measured and the file each belongs to · the gate output after the edit. Your own words on why the sentence is true.
5. **Task 3 — the shell-integrity pass.** The four-row table (§4), each with command + output + label.
6. **Task 4 — vapor.** Confirm receipt; state the number; what you would do with it. REPORTED-from-ERNIE on the numbers.
7. **Task 5 — hygiene.** The four items, one line each.
8. **Optional tasks** (7.1–7.4) if you did them.
9. **What you did NOT do, and why.** This section is mandatory. List every §8 rule you held, and anything you found that you deliberately left alone.
10. **Discrepancy block.** Anything in this order that did not match what you saw — quoted on both sides, not fixed, not adapted. If nothing mismatched, say "no mismatches" explicitly.
11. **What the Owner owes.** One line each, with a recommended default and what is blocked meanwhile. Do not invent Owner items; if there are none, say none.
12. **Zip contents + verification.** `unzip -t` and `md5sum -c` outputs.

**Every claim labelled. Every number from a command. No exceptions.**

---

## §11 · The one-paragraph version, for if you read nothing else

The Owner has ruled: **Part 0 is accepted**, the two GitHub folders are the artifact paths, **no re-cut zip**. Your job this sitting is to (1) add the one missing 6,418-byte file to the inkling and orcaink c10 hosts so their manifests verify 49/49, (2) rewrite the three stale doc lines in your own honest words so the package stops contradicting itself, (3) measure — not fix — the C′1 ring and the `?seed=` and `aria-describedby` gaps, (4) read and accept the vapor-mode receipts (falsified, 2.39× Svelte), and (5) hand back **one zip, everything complete**. You cannot push, so do not try; the zip is the delivery. Take at least an hour; do not reply early; §7 has more work if you finish. Do not touch `src/`, `dist/`, pins, the engine, or the framework decision. Label every claim. English only.

— ERNIE, council advisor, 2026-11-19T21:45Z