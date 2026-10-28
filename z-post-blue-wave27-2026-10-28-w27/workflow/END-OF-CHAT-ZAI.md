# END OF CHAT — Z.ai · SANDBOX EDITION

Run every step, every chat, **before** your final reply. No exceptions — the Owner's law: *"Each time you return a message to me, present me the latest finished version to download"* and *"tell yourself to provide all documents you updated in a zip at the end of the chat."* A chat that ends without a fresh zip link is a failed chat.

---

## 1 · Rewrite the lane file `_agents/zai/ZAI.md` (whole file, never append)

Council format (see `origin/council/zai:_agents/zai/ZAI.md` for the shape): **Identity** (1–2 lines, incl. "chat-only, no git push; work reaches GitHub via Owner/`import-zip.sh zai`") · **Current work** (wave, md5, what shipped this chat) · **What the next session needs** (≤3 read items — this is the amnesia killer) · **Do not redo** · **Files in this lane** · **Rules that changed**. Invent no history.

## 2 · Update `START-OF-CHAT-ZAI.md` §3 LAST-KNOWN-STATE

Rewrite the block: date/time, wave, product md5 + bytes, lane commit, queue state, ledger tail, open vetoes, last zip filename, next action. This block outranks every other copy (§4 truth table).

## 3 · Worklog

Append one section to `/home/z/my-project/worklog.md` (`---` / Task ID / Agent / Task / Work Log / Stage Summary). Sandbox-internal memory — cheap insurance when even the zip is out of reach.

## 4 · Commit the lane

`git add -- <only your paths>` (no `-A` into shared trees) · `git commit -m "Z.ai session end: <what>"`. The lane is local-only and ephemeral — steps 1–2 and the zip carry the real memory, this is just good hygiene. **Never push (§5 rule 8 of START doc).**

## 5 · THE ZIP (Owner's standing law)

Build or refresh **one daily zip**: `z-post-blue-docs-update-<YYYY-MM-DD>.zip` (product-touched chats may also carry a fuller `…-updates-<date>.zip`).

MUST contain **every file you authored or edited this chat**:
- the product HTML (if it moved — with its md5 stated in UPDATE-README)
- all edited/new documents (`_agents/zai/…` paths preserved so extraction over a repo working copy just works)
- tools/build/verify scripts touched
- `START-OF-CHAT-ZAI.md`, `END-OF-CHAT-ZAI.md`, `ZAI.md` (the workflow trio — always, even if unedited, so the Owner's push keeps them current)
- refreshed `UPDATE-README.md` (one changelog line per chat at §4) + regenerated `CHECKSUMS.txt`

Then verify: `unzip -t` clean AND `md5sum -c CHECKSUMS.txt` roundtrip clean in a temp extract. Never ship an unverified zip.

## 6 · Seat-save block (so the council machinery can ingest you)

Print **one** block in your final reply, in the exact `tools/seat-save.mjs` format (Owner or Beam as scribe runs `node tools/seat-save.mjs zai <file>` → commits+pushes `council/zai`):

```
=== FILE: _agents/zai/ZAI.md ===
<the full rewritten lane file from step 1>
=== END ===
```

(Alternatively the Owner hands the whole zip to `tools/import-zip.sh zai <zip>` — then the block is optional; include it anyway, it costs 15 lines.)

## 7 · Final reply ORDER (law)

1. **Links first**: ① the zip from step 5 ② the latest product HTML (standalone) — with md5 + byte count.
2. ≤150-word summary of what shipped.
3. One next-step suggestion (what you would do first next chat, or what decision the Owner owes — e.g. vetoes).

## 8 · Last line, exactly

```
SESSION END — Z.ai | state pinned (wave <N>, md5 <first8>…) | zip delivered: <filename> | next session reads: ZAI.md → START-OF-CHAT-ZAI.md §3 → PRIORITIES.md
```

— Z.ai · pin the state, pack the zip, print the block, ship the links.
