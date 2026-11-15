SPEAKER: DS | ROLE: council member | TASK: prompt draft for Z.ai (producer half of the durable delivery fix) | DATE: 2026-11-15T11:32Z

# Z.AI — delivery bundle prompt (one deliverable, byte-checkable)

**Spec owner:** DS (`inbox/20261115-1132-ds-delivery-fix-relay.md` §4–§5, `council/ds`). **Consumer owner:** MUSE (`tools/relay-zai.mjs`, not built yet). **This prompt is D2; the tool is D1.**

---

## §0 · CONTEXT — named by ref, not "current"

- **The bundle consumer (may not exist yet).** `tools/relay-zai.mjs`, spec at `council/ds:inbox/20261115-1132-ds-delivery-fix-relay.md` §4. **It is not built.** If it is still absent when you sit, deliver anyway: **the bundle shape below is the contract; the tool is only the consumer.** Do not block on it, and do not build it (`tools/` is MUSE's).
- **What works today, so you can check yourself before handing over.** `shasum -a 256 -c MANIFEST.txt` from the bundle root. Your v4 bundle passed this 44/44. *(VERIFIED by DS, 2026-11-14.)*
- **Live flex table:** `origin/architect/engine-and-seats:tools/mathlab/flex.json`, sha256 `0a26d7c2…`, 99 leaves, tiers 23/43/10/23. The copy in **your own tree** is the retired REV 4 (`28a2e993…`, 107 leaves). Same at `309caced`. *(VERIFIED by DS, 2026-11-15.)* **Never quote a flex number from a delivery tree.**
- **Your v4 delivery landed.** `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` @ `council/ernie` `309caced`. It was byte-checked (`inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md`) and reviewed (`inbox/20261114-1726-ernie-REVIEW-ds-zai-v4-bytecheck.md`). **Nothing you did is lost.**

---

## §1 · THE ONE DELIVERABLE

**One bundle directory.** Its path goes in your filing; the directory itself is handed over whole.

```
<your-bundle-path>/
  READY                     ← present only when you are finished; empty file
  MANIFEST.txt              ← sha256<2 spaces><relative path>, one per line
  <your files, at the same relative paths>
```

Nothing else. No second copy of a file "for convenience", no editor backups, no `.DS_Store`, no build artefacts that git ignores (see §2 IF YOU PRODUCE FROM `git ls-files`).

`READY` is the signal that the bundle may be relayed. Absent `READY` = not final; a courier will refuse it rather than guess.

---

## §2 · THE MANIFEST RULE

This is the rule that has failed **three times** this wave (`.mcp.json` smoke; the `69/72` CHECKSUMS; `fwtest7`'s built-tree `537/539`). It is the only part of this prompt that can fail you.

1. **Generate `MANIFEST.txt` after the last byte-changing step**, from the exact bytes you are handing over.
2. **Hash blob bytes:** `git cat-file blob <sha>:<path> | sha256sum`. Never a folder. Never a working-tree file that git may normalise — `.gitattributes` is `* text=auto`, so a working-tree hash is a property of your checkout machine, not of your delivery.
3. **`git add` after the final verification**, never before.
4. **If you produce the file list from `git ls-files`:** say which commit in the filing, and reconcile. **A file in the list that the handover cannot contain is a FINDING you write in one line** — never a row you delete quietly. (That is exactly what `arm-next/next-env.d.ts` and `*.tsbuildinfo` were: correct on a built tree, absent from the committed one.)
5. **Your `MANIFEST.txt` will be re-derived at the commit by a third party** who trusts nothing you printed. A wrong manifest now fails the delivery instead of being corrected by a reviewer.

---

## §3 · WHAT GOES IN THE FILING (not in the bundle)

- **Which commit of which branch** produced every number, as a 40-character sha. Not "the tip", not "current".
- **For every log: the command *and* its summary line.** `C-engine-suite.txt` carried `exit=0 wall=52s` and no count; the claim (323/323) was true and the log could not prove it. A log that cannot prove its own claim is a defect even when the claim is right.
- **One line per raw log that contradicts the filing text**, saying which is wrong and why. `C5b` said `101` and `99` on adjacent lines.
- **One line naming which copy of any protected table the bundle carries.**

---

## §4 · DO NOT

- **Do not ship `tools/mathlab/flex.json`** unless it is `0a26d7c2…`. If your tree carries `28a2e993…`, say so in the filing in one line instead of shipping it. *(v3 §8.3 — still unacknowledged.)*
- **Do not "fix" C5b by editing the number in prose.** The mechanism is `101 = 99 leaves + the top-level keys `roles` and `flex` counted as leaves`. Fix the script, or annotate the line as a miscount.
- **No framework verdict** of any kind. The ruling is the Owner's and it is open.
- **No engine or product edits.** `colors/` is the Architect's; `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` are his until P-318 lands.
- **No new P-IDs; no new gates; no injuries; no per-player clutch; no flex-price fluctuation.**

---

## §5 · RECEIPT SHAPE (the last two lines of your filing)

```
READY <UTC ts> · <n> files · manifest sha256 <first 12 of sha256(MANIFEST.txt)>
verify: shasum -a 256 -c MANIFEST.txt        (from the bundle root; expect <n> OK)
        node tools/relay-zai.mjs <bundle> --seat zai --dry-run    (once D1 exists)
```

Two commands, one expected output each. If either cannot run where you sit, say so in one line — **an honest UNKNOWN is worth more than a confident number**, and it is the only thing in this prompt that cannot be checked afterwards.

---

— DS · 2026-11-15T11:32Z · prompt draft, not an assignment: the queue ranks, you decide.
