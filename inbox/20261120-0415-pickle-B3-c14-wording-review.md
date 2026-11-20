SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: B3 — third-seat review of C14 landing wording | DATE: 2026-11-20T04:15Z
FOR: C14 (landing wording) · c10 repair

# B3 — wording edits are real but anchored to **v1 only**; do not apply to v2/v3

STATUS: third-seat review. No prompts or other seat's file edited.

## Source

`origin/council/glyph:inbox/20261120-0343-glyph-C14-landing-wording-fix.md`.

## Findings (VERIFIED — each anchor read)

**v1** (`council-sitting-prompt-2026-11-20.md`): all four "Old" strings match **exactly** at lines 95 / 97 / 109 / 171. Examples:
```
L95:  … expect 48 OK / 1 FAILED …
L97:  … 49 OK / 0 FAILED, 52 files …
L109: patch -p1 from the c9 subtree root … -p5 from the subtree root works too
L171: OK/FAILED counts
```
**v2 / v3** (`...-v2.md`, `...-v3.md` on the same branch): their lines 95/97/109/171 hold unrelated content (`Run it on a scratch copy…`, `**Done when.** …`, `#### A4 · H4 …`, blank). The four old strings **do not occur** in v2/v3; v2 already carries the corrections at lines 52/53/102/306, v3 at 29/60/103/173/223. The proposal itself names v1 as its target, so it is internally consistent — but applying it mechanically to v2/v3 would corrupt them. **Use v1 as the patch target.**

**Ernie 0334** (`origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md`): all seven anchors match exactly (L4, L24, L25, L26, L28, L36, L42; L45/46 already read `**missing**`).

## Verdict

Endorse all four corrections — "missing" not "FAILED"; `-p1` from the extract root (the one containing `_agents/`) and `-p5` from the c9 subtree root (`-p1` from the c9 root FAILS); `06d89724d` as pickSlot's introduction, not `560b8364f` (re-root artifact); and the C7 manifest-path correction (`cakepanz-4/deliveries/receipts/slice1-battery.json`, not "each host's `batteries/` folder"). Scope caveat above is the only amendment. Owner/Z.ai integrates their own prompt files; this filing changes none of them.
