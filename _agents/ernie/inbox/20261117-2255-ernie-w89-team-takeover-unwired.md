SPEAKER: ernie | ROLE: council | TASK: the w89 round, one question only — is the shell's team takeover actually wired? | DATE: 2026-11-17T22:55Z
FOR: P-366

**Scope note: this is not the full w89 comparison — Beam filed that (`inbox/20261117-2300-beam-cakepanz-beauty-audit.md`). This is one question from it, answered with a command rather than an eye, because it is the question the Owner's palette ruling turns on and it is decidable from the source.**

**Tree: the shipped `cakepanz-4/` I hosted at `_agents/ernie/deliveries/cakepanz-5-2026-11-17/`.** Engine pin 5c808472. All line numbers are that tree.

# The finding

**The shell sets the team colour and nothing reads it. The team takeover is not wired.**

**VERIFIED — the three custom properties are written and never consumed:**

```
$ grep -rn "zpb-t1" src/
src/lib/port/tokens.ts:43:  return { attr: teamName, vars: { '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3 } };

$ grep -rn "var(--zpb" src/
(no output)
```

`--zpb-t1`, `--zpb-t2`, `--zpb-t3` are produced by `teamRemap()` (`src/lib/port/tokens.ts:41-44`), set on `document.documentElement` by `applyTeam()` (`src/lib/bindings/tokensApply.ts:13-14`), and **read by zero CSS rules anywhere in the tree**.

**VERIFIED — the `[data-zpbteam]` blocks are empty.** `src/lib/assets/tokens-w89.css:104-112`:

```css
:root[data-zpbteam] {
  /* light-mode team remap — see zpb-team-colors.json + the JS hook */
}
:root:not([data-theme="light"])[data-zpbteam] {
  /* system-dark team remap */
}
:root[data-theme="dark"][data-zpbteam] {
  /* dark team remap */
}
```

Three empty rules with comments. The sheet's own header (`tokens-w89.css:99-103`) says the stops "land in `--tc-like` UI hooks the app owns" and that "the per-team VALUES ride in the JSON (96 stops), not in this sheet" — but the hooks the app owns do not exist, and the sheet's blocks are where they would be.

**So the end-to-end trace the round asks for is:**

| stage | exists? | where |
|---|---|---|
| the 32-team × 3-stop table | yes | `src/lib/assets/zpb-team-colors.json` |
| the pure remap | yes | `tokens.ts:41-44` `teamRemap()` |
| the DOM half (attribute + properties) | yes | `bindings/tokensApply.ts:10-15` |
| **a CSS rule that reads the attribute or the properties** | **no** | `tokens-w89.css:104-112` — three empty blocks |

**A user who picks a team sees the attribute change and the properties change, and no pixel change.** That is the finding, and it is the opposite of what the token sheet claims ("Variant L (live-w89) … the team colour via zpb-team-colors.json beside the sheet, applied by setting data-zpbteam plus three custom properties"). The mechanism is described accurately; it is simply not connected at the last step.

**This is not a small gap.** The Owner's ruling is "every team's color changes almost every aspect of the color palette" (2026-11-15). The shell has the palette, the table, the applier and the attribute — and the final hop from token to rule is missing. On the evidence above, **the team-takeover part of the beauty ruling is 0% delivered**, however complete the plumbing beneath it looks.

# What I did NOT do

I did not run the browser comparison (Beam's filing covers the visual side; I have only node on this machine and my Chromium is a symlink hack for the batteries). I did not judge any other part of the w89 round — default mode, dark mode, type, labels, the 2PT chip, the slogan, contrast. Those are Beam's and I have not checked them.

**One thing I can say from the source without a browser, labelled INFERRED:** because no rule consumes the stops, the *dark-mode* half of the same question is also unwired — there is no dark team remap either, so a team's colours do not change in dark mode any more than in light. That follows from the empty blocks, not from a render.

# Recommendation

**One fix shape, and it is small:** fill the three `[data-zpbteam]` blocks so each maps the three stops onto the accent tokens the sheet already defines — at minimum `--gold2`, `--goldm`, `--gold3`, `--hairline`/`--rosehair`, and `--panel2` — reading `var(--zpb-t1|2|3)`. That is ~30 lines of CSS and it is the whole of the Owner's palette ruling on the shell side.

**But it is not mine to land and it may not be Z.ai's alone:** the choice of *which* tokens a team re-tints is a product decision under the Owner's ruling ("almost every aspect"), and the shell's own comment defers it to "UI hooks the app owns". So the right shape is a §5 proposal to the Architect with a recommended token set, not an edit by a seat.

**I would also fix the token sheet's claim in the same change.** It currently says the remap is applied; until the blocks are filled, that sentence is false, and this round exists because a seat read it and believed it.

BLOCKED: nothing.
OPEN: which tokens a team re-tints (a product call under the Owner's ruling); whether Z.ai or the Architect fills the blocks.
NEXT: (1) the Architect or Z.ai fills `tokens-w89.css:104-112` and I verify with `grep -c "var(--zpb" src/` returning a non-zero count plus two team screenshots; (2) Beam's audit and this finding should be read together — his is the visual list, this is the one entry that is a missing wire rather than a stray value; (3) the token sheet's "Variant L (live-w89)" line should not claim the takeover until (1) lands.