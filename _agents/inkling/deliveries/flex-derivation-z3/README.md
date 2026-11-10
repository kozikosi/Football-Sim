# z-post-blue / Z.ai flex derivation z3 — staged for council read-access (2026-11-10)

**Why this is here:** the Owner (Kosi) directed this folder onto my branch on 2026-11-10 so that MUSE and Claude (and the rest of the council) can read it. Source: `/Users/kosi/Desktop/Football Sim/z.ai flex derivation z3/` (Desktop copy, copied 2026-11-10; the shared tree was **not** edited). Precedent: `flex-derivation-z2/` (commit 61454866 + README c775fbc3).

**Integrity:** all 7 files match `CHECKSUMS.txt` (md5; the manifest says md5, not sha256 — checked with `md5 -q`, 7/7 identical):

```
8762a9ead6c05733204b5c36c3162a63  _agents/zai/deliveries/FLEX-DERIVATION-ZAI-D2-2026-11-10.md
eef3ae84ae1db138d9a33b97b493e022  _agents/zai/tools/zai_d2_derivation.py
c3b0f37e8a198951841331a17ccc7755  _agents/zai/evidence/zai-d2-run-2026-11-10.txt
9e2e64e566c2ac67331c87834e842da8  _agents/zai/ZAI.md
eb4910432c22a61e62955e3cdcc01fe5  _agents/zai/START-OF-CHAT-ZAI.md
e52c0ddb9c31a4e6e05d7fb6a7c433a3  _agents/zai/END-OF-CHAT-ZAI.md
78663ded5263403e0533b373ee57a985  UPDATE-README.md
```

**What it is:** Z.ai's Q&A-era design, **ZAI-D2** — per its own header, a "gated-market formula" claiming **99/99 exact / 0 fiat**, with gravity-in-value-layer, big-nickel and DL5 emergence tests, and an 11-row Owner decision list. **No product HTML is in the package** (UPDATE-README says wave 19, `Football-Sim-Z-post-blue.html` md5 `1215639c…` unchanged; lane docs `ZAI.md`, `START-OF-CHAT-ZAI.md`, `END-OF-CHAT-ZAI.md` are carried with it).

**Status of the claims — REPORTED, not verified by anyone but Z.ai.** The 99/99 / 0-fiat claim is exactly the kind of claim the council is currently stress-testing elsewhere (all five merged/own designs land at ~93–96/99 with 3–6 named residuals *including* the Owner's anti-D cells, and I measured C>OT as needing the *guard*, not "gated" machinery — someone will want to diff D2's answer against that). Whoever reviews this should:
- re-run `python3 tools/zai_d2_derivation.py` against the live 99-table (`tools/mathlab/flex.json` — note the branch carries an older REV 4 107-rule copy in some worktrees; pull the real one, sha `0a26d7c2…` if it still matches),
- check whether the "0 exceptions / 99-exact" survives contact with (a) the three forbid conflicts the Q1 analysis found (DT>C, EDGE>C, TE>EDGE — Q15 "more b"), (b) the anti-D family, (c) leave-one-role-out,
- say plainly which Owner answers D2 leans on (it says MUSE relay) and whether the gravity-in-value-layer placement overlaps MUSE-D2's claim or VL v3's placement (mine is a separate γ_g hook, default 0).

**Rules:** do not edit these files in this copy (it is a frozen handoff snapshot; corrections go in your own inbox as reviews, addressing `flex-derivation-z3`). The Architect decides what is built. Nothing here is adopted by landing this folder.
