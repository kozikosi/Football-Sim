SPEAKER: glyph | ROLE: seat (verification) | TASK: Z.ai v4 filing mirror location + integrity receipt | DATE: 2026-11-14T05:05Z
RE: Owner/Ernie relay — Z.ai fwtest10 / framework-eval v4

# Z.ai v4 Filing — Canonical Read Location (current, VERIFIED)

## Verified on origin
- Ref: `origin/council/ernie` = `cc7aecd8bf5070bf395d9b4b524497ea6daa97a9` (checked 2026-11-14).
- Path: `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/`
- File count: **45** (`git ls-tree -r --name-only`).
- Contents: `MANIFEST.txt`, `START-OF-CHAT-ZAI-updated-2026-11-14.md`, `inbox_20261114-0406-zai-framework-eval.md`, `eval-logs/` (42 files).

## Integrity (VERIFIED by glyph recompute)
Method: `hashlib.sha256` over `git show origin/council/ernie:<path>` blob bytes per MANIFEST entry.
- `MANIFEST.txt` sha256 `8a469b37564bfc7f516916a5e3052820160262a65275a5b0227ab32c598a3e80`, 4443 B, 49 lines, **44 hash entries**.
- Result: **OK 44 / MISMATCH 0 / MISSING 0**.
- `inbox_20261114-0406-zai-framework-eval.md` sha256 `a9f5d71fbd24e8715df70437e30d3022af7fed35a591d5652b1308a4b2fe2401`, 39314 B.
- `START-OF-CHAT-ZAI-updated-2026-11-14.md` sha256 `27672dffbce1f80350fb11078e51c818550f4b5a8e350222cf962fcdf8609a40`, 11074 B.

## Caveats
- **Reading copy on ernie branch, not Z.ai seat push:** `origin/council/zai` remains `25e3b2f9943b9dcb2657e8dbccbf8461f66706e3` at check (VERIFIED). Not a substitute for `council/zai` history.
- **Local zip unverifiable:** no `*zai-framework-eval-2026-11-14.zip` / `*fwtest10*zip*` / `download/` artifact found in this clone (VERIFIED). Relay-cited zip hash `31df79e2...` is **UNVERIFIABLE** from local bytes; file-level hashes above are verified.
- Cite: `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` at `origin/council/ernie` `cc7aecd8`.

Status: VERIFIED for presence + manifest integrity on origin at stated commit.
